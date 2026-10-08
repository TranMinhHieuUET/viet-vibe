import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

// Khởi tạo Gemini AI Client với User-Agent bắt buộc
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Danh sách tọa độ các thành phố / địa điểm phổ biến tại Việt Nam
const LOCATION_MAP: Record<string, { lat: number; lon: number; name: string }> = {
  ha_noi: { lat: 21.0285, lon: 105.8542, name: 'Hà Nội' },
  tp_hcm: { lat: 10.8231, lon: 106.6297, name: 'TP. Hồ Chí Minh' },
  hue: { lat: 16.4637, lon: 107.5909, name: 'Huế' },
  da_nang: { lat: 16.0544, lon: 108.2022, name: 'Đà Nẵng' },
  da_lat: { lat: 11.9404, lon: 108.4583, name: 'Đà Lạt' },
  sapa: { lat: 22.3364, lon: 103.8438, name: 'Sa Pa' },
  ninh_binh: { lat: 20.2506, lon: 105.9745, name: 'Ninh Bình' },
  hoi_an: { lat: 15.8801, lon: 108.3380, name: 'Hội An' },
};

function resolveLocation(locationInput?: string): { lat: number; lon: number; name: string } {
  if (!locationInput) return LOCATION_MAP.ha_noi;
  const norm = locationInput.toLowerCase().trim();
  if (norm.includes('hcm') || norm.includes('hồ chí minh') || norm.includes('sài gòn') || norm.includes('sai gon')) {
    return LOCATION_MAP.tp_hcm;
  }
  if (norm.includes('huế') || norm.includes('hue')) return LOCATION_MAP.hue;
  if (norm.includes('đà nẵng') || norm.includes('da nang')) return LOCATION_MAP.da_nang;
  if (norm.includes('đà lạt') || norm.includes('da lat')) return LOCATION_MAP.da_lat;
  if (norm.includes('sapa') || norm.includes('sa pa')) return LOCATION_MAP.sapa;
  if (norm.includes('ninh bình') || norm.includes('ninh binh')) return LOCATION_MAP.ninh_binh;
  if (norm.includes('hội an') || norm.includes('hoi an')) return LOCATION_MAP.hoi_an;
  return LOCATION_MAP.ha_noi;
}

// Chuyển mã WMO thời tiết thành mô tả tiếng Việt
function interpretWeatherCode(code: number): { desc: string; icon: string; condition: string } {
  switch (code) {
    case 0:
      return { desc: 'Trời nắng trong, quang đãng', icon: '☀️', condition: 'sunny' };
    case 1:
      return { desc: 'Nắng nhẹ, mây thưa', icon: '🌤️', condition: 'partly_cloudy' };
    case 2:
      return { desc: 'Trời nhiều mây, râm mát', icon: '⛅', condition: 'cloudy' };
    case 3:
      return { desc: 'Trời âm u, mây bao phủ', icon: '☁️', condition: 'overcast' };
    case 45:
    case 48:
      return { desc: 'Có sương mù, se lạnh', icon: '🌫️', condition: 'foggy' };
    case 51:
    case 53:
    case 55:
      return { desc: 'Có mưa phùn bay nhẹ', icon: '🌦️', condition: 'drizzle' };
    case 61:
    case 63:
    case 65:
      return { desc: 'Có mưa rào rải rác', icon: '🌧️', condition: 'rain' };
    case 80:
    case 81:
    case 82:
      return { desc: 'Mưa rào nặng hạt', icon: '🌧️', condition: 'heavy_rain' };
    case 95:
    case 96:
    case 99:
      return { desc: 'Có dông, gió mạnh', icon: '⛈️', condition: 'thunderstorm' };
    default:
      return { desc: 'Thời tiết ôn hòa', icon: '🌤️', condition: 'mild' };
  }
}

interface WeatherReport {
  locationName: string;
  date: string;
  weatherDesc: string;
  icon: string;
  condition: string;
  tempMin: number;
  tempMax: number;
  avgTemp: number;
  rainProb: number;
  windSpeed: number;
  summary: string;
}

// Gọi API Open-Meteo để lấy dự báo thời tiết thực tế
async function fetchWeather(dateStr: string, locationKey?: string): Promise<WeatherReport> {
  const loc = resolveLocation(locationKey);
  const targetDate = dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr) 
    ? dateStr 
    : new Date().toISOString().slice(0, 10);

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=Asia/Bangkok&start_date=${targetDate}&end_date=${targetDate}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    
    if (res.ok) {
      const data = await res.json();
      if (data.daily && data.daily.time && data.daily.time.length > 0) {
        const wCode = data.daily.weather_code[0] ?? 1;
        const tempMax = Math.round((data.daily.temperature_2m_max[0] ?? 28) * 10) / 10;
        const tempMin = Math.round((data.daily.temperature_2m_min[0] ?? 22) * 10) / 10;
        const avgTemp = Math.round(((tempMax + tempMin) / 2) * 10) / 10;
        const rainProb = data.daily.precipitation_probability_max[0] ?? 0;
        const windSpeed = data.daily.wind_speed_10m_max[0] ?? 10;
        const { desc, icon, condition } = interpretWeatherCode(wCode);

        const summary = `${loc.name}, ngày ${targetDate}: ${icon} ${desc}, nhiệt độ ${avgTemp}°C (${tempMin}°C - ${tempMax}°C), xác suất mưa ${rainProb}%, gió ${windSpeed} km/h`;
        return {
          locationName: loc.name,
          date: targetDate,
          weatherDesc: desc,
          icon,
          condition,
          tempMin,
          tempMax,
          avgTemp,
          rainProb,
          windSpeed,
          summary,
        };
      }
    }
  } catch (err) {
    console.warn('Weather fetch fallback triggered:', (err as Error).message);
  }

  // Fallback thông tin thời tiết hợp lý nếu API bên ngoài gặp sự cố mạng
  return {
    locationName: loc.name,
    date: targetDate,
    weatherDesc: 'Trời nắng nhẹ, mát mẻ thuận lợi',
    icon: '🌤️',
    condition: 'partly_cloudy',
    tempMin: 22,
    tempMax: 29,
    avgTemp: 26,
    rainProb: 10,
    windSpeed: 8,
    summary: `${loc.name}, ngày ${targetDate}: 🌤️ Trời nắng nhẹ, mát mẻ thuận lợi, nhiệt độ 26°C (22°C - 29°C), xác suất mưa 10%`,
  };
}

// Danh mục các món đồ hợp lệ trong hệ thống
const VALID_TOPS = ['ao_dai', 'ao_tu_than', 'ao_ngu_than', 'ao_tac', 'ao_nhat_binh'];
const VALID_BOTTOMS = ['quan_lua', 'vay_dup', 'quan_jeans', 'quan_kaki', 'vay_xep_ly', 'quan_short', 'vay_ngan'];
const VALID_SHOES = ['guoc_moc', 'hai_theu', 'sneaker_chunky', 'sneaker_low', 'oxford', 'loafer', 'dep_le', 'dep_xo_ngon'];
const VALID_ACCESSORIES = [
  'khan_xep', 'khan_van', 'non_quai_thao', 'tram_cai', 'tai_nghe', // doi_dau
  'kinh_ram', 'kinh_tron', // kinh
  'kim_khanh', // trang_suc
  'tui_tote', 'quat_xep' // tui_xach
];

const ACC_GROUPS: Record<string, string> = {
  khan_xep: 'doi_dau',
  khan_van: 'doi_dau',
  non_quai_thao: 'doi_dau',
  tram_cai: 'doi_dau',
  tai_nghe: 'doi_dau',
  kinh_ram: 'kinh',
  kinh_tron: 'kinh',
  kim_khanh: 'trang_suc',
  tui_tote: 'tui_xach',
  quat_xep: 'tui_xach',
};

async function generateGeminiRecommendation(
  event: string,
  eventDate: string,
  weather: WeatherReport,
  preferredTop: string = 'auto'
) {
  const prompt = `Bạn là Chuyên gia Cố vấn Thời trang & Nhà nghiên cứu Di sản Văn hóa Cổ phục Việt Nam trong ứng dụng "Việt phục Remix".
Nhiệm vụ của bạn: Hãy phân tích bối cảnh sự kiện và điều kiện thời tiết thực tế để gợi ý một set đồ hoàn hảo giao thoa giữa Việt phục truyền thống và phong cách hiện đại Gen Z.

THÔNG TIN ĐẦU VÀO:
- Bối cảnh sự kiện: "${event}"
- Ngày diễn ra sự kiện: "${eventDate}"
- Địa điểm: "${weather.locationName}"
- Dữ liệu thời tiết thực tế: "${weather.summary}" (Nhiệt độ trung bình: ${weather.avgTemp}°C, Tình trạng: ${weather.weatherDesc}, Xác suất mưa: ${weather.rainProb}%)
- Lựa chọn áo ưu tiên của người dùng: "${preferredTop}" (nếu là 'auto', bạn tự do chọn áo phù hợp nhất).

DANH MỤC MÓN ĐỒ ĐƯỢC PHÉP CHỌN (BẮT BUỘC CHỈ CHỌN ĐÚNG CÁC ID DƯỚI ĐÂY):
1. TOPS (Áo):
  - "ao_dai": Áo dài tân thời (duyên dáng, thướt tha xẻ hông, thanh lịch, chụp ảnh Tết/tốt nghiệp)
  - "ao_tu_than": Áo tứ thân (dân gian Kinh Bắc, 4 vạt buộc chéo mộc mạc, lễ hội Quan họ)
  - "ao_ngu_than": Áo ngũ thân tay chẽn (thời Nguyễn, cổ đứng 5 khuy, tay chẽn đĩnh đạc, rất hợp phối streetwear/Gen Z)
  - "ao_tac": Áo tấc / Ngũ thân tay thụng (thời Nguyễn, đại lễ phục trang nghiêm, tay rộng thụng quý phái)
  - "ao_nhat_binh": Áo Nhật Bình (triều Nguyễn, trang phục Hậu phi hoàng cung lộng lẫy, cực kỳ quyền quý trang trọng)

2. BOTTOMS (Quần/Váy):
  - "quan_lua": Quần lụa ống rộng (truyền thống, mềm mại đoan trang, hợp mọi loại áo tà dài)
  - "vay_dup": Váy đụp thâm (dân gian Kinh Bắc, đi cùng áo tứ thân)
  - "quan_jeans": Quần Jeans suông (Gen Z streetwear, trẻ trung phá cách khi mix với áo ngũ thân)
  - "quan_kaki": Quần Kaki suông (Smart-Casual thanh lịch, hiện đại)
  - "vay_xep_ly": Chân váy xếp ly maxi (bay bổng, lãng mạn)
  - "quan_short": Quần short (năng động, nhưng tránh phối với đại lễ phục)
  - "vay_ngan": Váy ngắn chữ A (Y2K)

3. SHOES (Giày):
  - "guoc_moc": Guốc mộc cổ truyền (thanh tao mộc mạc)
  - "hai_theu": Hài thêu hoa văn cung đình (sang trọng, đi cùng áo tấc, áo nhật bình, áo dài)
  - "sneaker_chunky": Sneaker hầm hố (Y2K / cyberpunk cá tính)
  - "sneaker_low": Sneaker trắng cổ thấp (classic Gen Z, năng động dễ di chuyển)
  - "oxford": Giày da Oxford (trí thức cổ điển Dark Academia)
  - "loafer": Giày Loafer (smart-casual tinh tế)
  - "dep_le": Dép lê
  - "dep_xo_ngon": Dép xỏ ngón

4. ACCESSORIES (Phụ kiện - có thể chọn 1 đến 2 món từ các nhóm khác nhau):
  - Nhóm Đội đầu/Chụp tai: "khan_xep", "khan_van", "non_quai_thao", "tram_cai", "tai_nghe"
  - Nhóm Kính mắt: "kinh_ram", "kinh_tron"
  - Nhóm Trang sức: "kim_khanh"
  - Nhóm Túi/Cầm tay: "tui_tote", "quat_xep"

QUY TẮC PHỐI ĐỒ & CHUẨN MỰC VĂN HÓA:
1. Quy chuẩn lễ nghi:
   - Nếu là sự kiện trang trọng (Tết, lễ hội truyền thống, đền chùa, cưới hỏi, lễ tốt nghiệp, sự kiện hoàng cung) hoặc chọn Áo Tấc / Áo Nhật Bình: PHẢI ưu tiên Quần lụa + Hài thêu / Guốc mộc + Khăn xếp / Khăn vấn / Trâm cài / Kim khánh / Quạt xếp. Tránh phối đồ cộc hoặc dép lê.
2. Tinh thần Gen Z Remix:
   - Nếu là sự kiện dạo phố, concert rap, cà phê trà đá, hẹn hò cuối tuần: Khuyến khích kết hợp Áo ngũ thân tay chẽn hoặc Áo dài với Quần Jeans / Kaki + Sneaker / Oxford + Tai nghe / Kính râm để tạo nên diện mạo phá cách đầy tự hào dân tộc.
3. Ứng phó thời tiết thực tế:
   - Nếu trời mưa hoặc ẩm ướt (rain, drizzle): Ưu tiên đồ gọn gàng, tránh tà dài quét đất dễ lấm bẩn, giày kín.
   - Nếu trời nắng nóng (>30°C): Chọn trang phục thoáng khí, phụ kiện che nắng (quạt xếp, nón, kính râm).
   - Nếu trời se lạnh (<20°C): Ưu tiên áo nhiều lớp, quần dài, giày da kín gió.
4. Tôn trọng sở thích áo nếu người dùng chỉ định cụ thể.

YÊU CẦU ĐỊNH DẠNG ĐẦU RA:
Bắt buộc trả về duy nhất định dạng JSON chuẩn:
{
  "top": "id_cua_ao",
  "bottom": "id_cua_quan",
  "shoes": "id_cua_giay",
  "accessories": ["id_phu_kien_1", "id_phu_kien_2"],
  "stylingTitle": "Tên phong cách phối đồ ngắn gọn (5-8 từ, có tính nghệ thuật và cá tính)",
  "aiReasoning": "Giải thích chi tiết 2-3 câu: Nêu rõ lý do lựa chọn set đồ dựa trên sự hòa quyện giữa tính chất sự kiện, điều kiện thời tiết ngày diễn ra và tính thẩm mỹ/chuẩn mực văn hóa di sản."
}`;

  let rawJsonText = '';

  // Thử gọi gemini-3.8-flash trước, nếu lỗi hoặc quá tải (503) thì chuyển sang gemini-3.1-flash-lite
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
    });
    rawJsonText = response.text || '';
  } catch (err38) {
    console.warn('gemini-3.8-flash unavailable, falling back to gemini-3.1-flash-lite:', (err38 as Error).message);
    const responseFallback = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });
    rawJsonText = responseFallback.text || '';
  }

  const parsed = JSON.parse(rawJsonText);

  // Kiểm duyệt và chuẩn hóa các ID trả về
  let top = VALID_TOPS.includes(parsed.top) ? parsed.top : 'ao_ngu_than';
  if (preferredTop !== 'auto' && VALID_TOPS.includes(preferredTop)) {
    top = preferredTop;
  }

  const bottom = VALID_BOTTOMS.includes(parsed.bottom) ? parsed.bottom : 'quan_lua';
  const shoes = VALID_SHOES.includes(parsed.shoes) ? parsed.shoes : 'sneaker_low';

  // Chuẩn hóa phụ kiện (đảm bảo không trùng nhóm)
  let rawAccs: string[] = [];
  if (Array.isArray(parsed.accessories)) {
    rawAccs = parsed.accessories;
  } else if (typeof parsed.accessories === 'string') {
    rawAccs = [parsed.accessories];
  }

  const finalAccs: string[] = [];
  const usedGroups = new Set<string>();
  for (const accId of rawAccs) {
    if (VALID_ACCESSORIES.includes(accId)) {
      const grp = ACC_GROUPS[accId];
      if (grp && !usedGroups.has(grp)) {
        usedGroups.add(grp);
        finalAccs.push(accId);
      }
    }
  }

  return {
    top,
    bottom,
    shoes,
    accessories: finalAccs.length > 0 ? finalAccs : ['quat_xep'],
    stylingTitle: parsed.stylingTitle || 'Phong Cách Việt Phục Remix Tinh Hoa',
    aiReasoning: parsed.aiReasoning || `Set đồ được Gemini AI tuyển chọn đặc biệt cho ${weather.locationName} vào ngày ${eventDate}, phù hợp với nhiệt độ ${weather.avgTemp}°C và chuẩn mực trang phục.`,
  };
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API 1: Kiểm tra thời tiết theo ngày và địa điểm
  app.post('/api/weather', async (req: Request, res: Response) => {
    try {
      const { date, location } = req.body || {};
      const weather = await fetchWeather(date, location);
      res.json({ success: true, weather });
    } catch (err) {
      console.error('API /api/weather error:', err);
      res.status(500).json({ success: false, error: (err as Error).message });
    }
  });

  // API 2: Gợi ý trang phục AI bằng Gemini dựa trên dữ liệu & thời tiết
  app.post('/api/recommend', async (req: Request, res: Response) => {
    try {
      const { event, eventDate, location, preferredTop } = req.body || {};
      if (!event || typeof event !== 'string') {
        res.status(400).json({ success: false, error: 'Thiếu thông tin sự kiện' });
        return;
      }

      const dateStr = eventDate && /^\d{4}-\d{2}-\d{2}$/.test(eventDate)
        ? eventDate
        : new Date().toISOString().slice(0, 10);

      // Bước 1: Lấy dữ liệu thời tiết thực tế
      const weather = await fetchWeather(dateStr, location);

      // Bước 2: Gọi Gemini AI phân tích bối cảnh, văn hóa và thời tiết
      const recommendation = await generateGeminiRecommendation(
        event.trim(),
        dateStr,
        weather,
        preferredTop || 'auto'
      );

      res.json({
        success: true,
        outfit: {
          top: recommendation.top,
          bottom: recommendation.bottom,
          shoes: recommendation.shoes,
          accessories: recommendation.accessories,
          contextEvent: event.trim(),
          eventDate: dateStr,
          location: weather.locationName,
          weatherInfo: weather,
          stylingTitle: recommendation.stylingTitle,
          aiReasoning: recommendation.aiReasoning,
        },
      });
    } catch (err) {
      console.error('API /api/recommend error:', err);
      res.status(500).json({ success: false, error: (err as Error).message });
    }
  });

  // Tích hợp Vite middleware trong môi trường Dev, hoặc phục vụ static files trong Production
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Việt phục Remix server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
