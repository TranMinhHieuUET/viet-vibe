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

  let parsed: any = null;

  // Nếu đang trong thời gian hạ nhiệt Cooldown Quota, dùng cấu hình quy tắc chuẩn mực
  if (Date.now() < geminiCooldownUntil) {
    const isFormal = event.toLowerCase().includes('cưới') || event.toLowerCase().includes('lễ') || event.toLowerCase().includes('chùa') || preferredTop === 'ao_tac';
    parsed = {
      top: preferredTop !== 'auto' ? preferredTop : (isFormal ? 'ao_tac' : 'ao_ngu_than'),
      bottom: isFormal ? 'quan_lua' : 'quan_jeans',
      shoes: isFormal ? 'hai_theu' : 'sneaker_low',
      accessories: isFormal ? ['quat_xep', 'khan_van'] : ['kinh_ram', 'tui_tote'],
      stylingTitle: isFormal ? 'Trang Nghiêm Lễ Cung Đình' : 'Gen Z Remix Dạo Phố',
      aiReasoning: `Set đồ được Stylist Di sản phối chuẩn mực cho "${event}" tại ${weather.locationName} (${weather.avgTemp}°C).`,
    };
  } else {
    try {
      let rawJsonText = '';
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
      } catch (err38: any) {
        if (isQuotaExceededError(err38)) {
          geminiCooldownUntil = Date.now() + 45000;
        } else {
          const responseFallback = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
            },
          });
          rawJsonText = responseFallback.text || '';
        }
      }

      if (rawJsonText) {
        parsed = JSON.parse(rawJsonText);
      }
    } catch (err: any) {
      if (isQuotaExceededError(err)) {
        geminiCooldownUntil = Date.now() + 45000;
      }
      console.warn('generateGeminiRecommendation dùng quy chuẩn an toàn.');
    }
  }

  if (!parsed) {
    const isFormal = event.toLowerCase().includes('cưới') || event.toLowerCase().includes('lễ') || event.toLowerCase().includes('chùa') || preferredTop === 'ao_tac';
    parsed = {
      top: preferredTop !== 'auto' ? preferredTop : (isFormal ? 'ao_tac' : 'ao_ngu_than'),
      bottom: isFormal ? 'quan_lua' : 'quan_jeans',
      shoes: isFormal ? 'hai_theu' : 'sneaker_low',
      accessories: isFormal ? ['quat_xep', 'khan_van'] : ['kinh_ram', 'tui_tote'],
      stylingTitle: isFormal ? 'Trang Nghiêm Lễ Cung Đình' : 'Gen Z Remix Dạo Phố',
      aiReasoning: `Set đồ được phối hài hòa văn hóa cho bối cảnh "${event}" tại ${weather.locationName} (${weather.avgTemp}°C).`,
    };
  }

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

// Bộ nhớ đệm cache và lá chắn chống vượt ngưỡng Quota (Rate-limit Shield)
const comparisonServerCache = new Map<string, any>();
const chatServerCache = new Map<string, string>();
let geminiCooldownUntil = 0;

function isQuotaExceededError(err: any): boolean {
  if (!err) return false;
  const msg = typeof err === 'string' ? err : ((err as any).message || JSON.stringify(err));
  return (
    msg.includes('429') ||
    msg.includes('RESOURCE_EXHAUSTED') ||
    msg.includes('Quota exceeded') ||
    msg.includes('rate-limits') ||
    msg.includes('rate_limit') ||
    (err as any).status === 'RESOURCE_EXHAUSTED' ||
    (err as any).status === 429
  );
}

// Bộ máy Di sản Thông minh (Intelligent Heritage & Stylist Engine)
// Hoạt động tự động khi API Gemini bận, quá tải hoặc chạm giới hạn Quota Free Tier
function generateIntelligentComparison(
  outfitA: any,
  outfitB: any,
  contextEvent?: string
) {
  const topAId = outfitA.top || '';
  const topBId = outfitB.top || '';
  const botAId = outfitA.bottom || '';
  const botBId = outfitB.bottom || '';
  const shoeAId = outfitA.shoes || '';
  const shoeBId = outfitB.shoes || '';

  const nameA = outfitA.topName || topAId;
  const nameB = outfitB.topName || topBId;
  const colA = outfitA.topColor?.name || 'Mặc định';
  const colB = outfitB.topColor?.name || 'Mặc định';
  const botNameA = outfitA.bottomName || botAId;
  const botNameB = outfitB.bottomName || botBId;

  // Đánh giá mức độ truyền thống / lễ nghi vs hiện đại
  const isFormalA = ['ao_tac', 'ao_nhat_binh', 'ao_giao_linh'].includes(topAId) || botAId === 'quan_lua';
  const isFormalB = ['ao_tac', 'ao_nhat_binh', 'ao_giao_linh'].includes(topBId) || botBId === 'quan_lua';
  const isGenZA = ['quan_jeans', 'quan_kaki', 'sneaker_chunky', 'sneaker_low', 'kinh_ram', 'tai_nghe'].some(k => 
    botAId === k || shoeAId === k || (outfitA.accessories || []).includes(k)
  );
  const isGenZB = ['quan_jeans', 'quan_kaki', 'sneaker_chunky', 'sneaker_low', 'kinh_ram', 'tai_nghe'].some(k => 
    botBId === k || shoeBId === k || (outfitB.accessories || []).includes(k)
  );

  // Vibe A
  let vibeA = 'Cổ Điển Di Sản & Lễ Nghi';
  if (topAId === 'ao_tac') vibeA = 'Đại Lễ Cung Đình Triều Nguyễn';
  else if (topAId === 'ao_nhat_binh') vibeA = 'Quyền Quý Hoàng Gia & Hậu Phi';
  else if (topAId === 'ao_ngu_than') vibeA = isGenZA ? 'Ngũ Thân Smart Streetwear' : 'Nho Nhã Đĩnh Đạc Phong Thái';
  else if (topAId === 'ao_tu_than') vibeA = 'Dân Gian Kinh Bắc Duyên Dáng';
  else if (topAId === 'ao_dai') vibeA = 'Tân Thời Thanh Lịch Dịu Dàng';

  // Vibe B
  let vibeB = 'Gen Z Remix Thời Thượng';
  if (topBId === 'ao_tac') vibeB = isGenZB ? 'Áo Tấc Giao Thoa Đương Đại' : 'Trang Nghiêm Điển Chế Lễ Hội';
  else if (topBId === 'ao_nhat_binh') vibeB = 'Vương Giả Lộng Lẫy Cung Cấm';
  else if (topBId === 'ao_ngu_than') vibeB = isGenZB ? 'Streetwear Ngũ Thân Phá Cách' : 'Quân Tử Nho Nhã Kinh Kỳ';
  else if (topBId === 'ao_tu_than') vibeB = 'Mộc Mạc Dân Gian Đương Đại';
  else if (topBId === 'ao_dai') vibeB = 'Hiện Đại Năng Động Sải Bước';

  // Điểm mạnh Set A
  const strengthsA: string[] = [
    `Tôn vinh phom dáng chuẩn mực của ${nameA} với sắc màu ${colA} đoan trang`,
    `Kết hợp nhịp nhàng cùng ${botNameA}, tạo cảm giác chỉn chu và tôn trọng bối cảnh`,
    isFormalA ? 'Phù hợp tuyệt đối với không gian linh thiêng, lễ bái hoặc cưới hỏi truyền thống' : 'Thoải mái vận động, tạo dấu ấn thẩm mỹ riêng biệt'
  ];

  // Điểm mạnh Set B
  const strengthsB: string[] = [
    `Thể hiện cá tính phối đồ mới lạ với ${nameB} (sắc ${colB}) kết hợp ${botNameB}`,
    isGenZB ? 'Tạo tuyên ngôn thời trang trẻ trung, phá cách nhưng vẫn gìn giữ nét văn hóa cội nguồn' : 'Tạo cảm giác uyển chuyển, thanh thoát trong từng bước chân',
    `Dễ dàng thu hút ánh nhìn và nổi bật khi chụp ảnh nghệ thuật hoặc check-in sự kiện`
  ];

  // Dịp phù hợp
  const bestOccasionA = isFormalA
    ? 'Dâng hương lễ chùa, lễ cưới hỏi cổ truyền, ngày Tết Nguyên Đán, sự kiện ngoại giao văn hóa'
    : 'Dạo phố cuối tuần, gặp gỡ bạn bè, chụp ảnh concept cổ phong';

  const bestOccasionB = isGenZB
    ? 'Festival văn hóa thanh niên, check-in quán cà phê phố cổ, tuần lễ thời trang sáng tạo'
    : 'Dự tiệc kỷ niệm, chụp ảnh lưu niệm tốt nghiệp, tham quan di tích lịch sử';

  // Tổng quan so sánh
  let overview = '';
  if (isFormalA && isGenZB) {
    overview = `Phương án A (${nameA}) ưu tiên tính tôn nghiêm, chuẩn mực lễ nghi truyền thống; trong khi Phương án B (${nameB}) đại diện cho làn sóng Gen Z Remix táo bạo, đưa cổ phục hòa nhịp vào dòng chảy nhịp sống đường phố đương đại.`;
  } else if (!isFormalA && isFormalB) {
    overview = `Phương án A (${nameA}) mang tinh thần phóng khoáng, trẻ trung; ngược lại Phương án B (${nameB}) lại nghiêng về nét mực thước, uy nghi và đĩnh đạc của lễ phục cổ phong.`;
  } else {
    overview = `Cả hai phương án đều tôn vinh vẻ đẹp tuyệt mỹ của cổ phục Việt: Phương án A (${nameA}) ghi điểm bởi tính thanh nhã, hài hòa; còn Phương án B (${nameB}) gây ấn tượng bởi chiều sâu cấu trúc và phong thái thời trang nổi bật.`;
  }

  // Lời khuyên Stylist
  let verdict = '';
  if (contextEvent && (contextEvent.includes('cưới') || contextEvent.includes('lễ') || contextEvent.includes('chùa') || contextEvent.includes('tết'))) {
    verdict = isFormalA
      ? `Với bối cảnh "${contextEvent}", Phương án A là lựa chọn an toàn và hoàn hảo nhất để thể hiện sự cung kính, trang trọng. Phương án B có thể lưu lại cho buổi dạo phố sau lễ.`
      : `Với bối cảnh "${contextEvent}", hãy cân nhắc Phương án B nếu cần tính chuẩn mực, hoặc chọn Phương án A nếu muốn tạo điểm nhấn trẻ trung nhưng vẫn lịch sự.`;
  } else {
    verdict = `Nếu bạn muốn hòa mình vào không gian cổ kính, trang nghiêm: Hãy tự tin bước ra với Phương án A. Nếu bạn muốn khẳng định gu thời trang cá tính, thoải mái di chuyển và tràn đầy năng lượng Gen Z: Phương án B chính là 'chân ái'!`;
  }

  return {
    overview,
    outfitA: {
      vibe: vibeA,
      strengths: strengthsA,
      bestOccasion: bestOccasionA,
    },
    outfitB: {
      vibe: vibeB,
      strengths: strengthsB,
      bestOccasion: bestOccasionB,
    },
    verdict,
  };
}

// Phản hồi Chat Thông minh khi Quota chạm ngưỡng
function generateIntelligentChatFallback(message: string, currentOutfit?: any): string {
  const lower = message.toLowerCase();
  const outfitName = currentOutfit?.topName || 'cổ phục';
  const colorName = currentOutfit?.topColor?.name || 'màu sắc';

  if (lower.includes('áo tấc') && lower.includes('ngũ thân')) {
    return `💡 **So sánh Áo Tấc vs Áo Ngũ Thân Tay Chẽn:**
- **Áo Tấc:** Là đại lễ phục thời Nguyễn, may theo thể ngũ thân nhưng có **tay thụng thụng dài và rộng** (khoảng 1 tấc = 40cm). Khi buông tay xuống, hai mép tay áo gặp nhau tạo hình chữ nhật trang nghiêm. Dùng trong đại lễ, tế tự, hôn lễ, dâng hương.
- **Áo Ngũ Thân Tay Chẽn:** Tay áo ôm sát vào cổ tay gọn gàng, 5 vạt áo tượng trưng cho tứ thân phụ mẫu và chính mình. Đây là trang phục thường nhật của sĩ phu và quan lại xưa, cực kỳ tiện cử động và là "item vàng" để Gen Z mix cùng quần Jeans hay Sneaker!`;
  }

  if (lower.includes('nhật bình')) {
    return `👑 **Áo Nhật Bình - Tuyệt tác Hoàng Cung:**
Áo Nhật Bình là trang phục cao quý của Hoàng thái hậu, Hoàng hậu, Công chúa và Cung tần triều Nguyễn. Đặc trưng là dải viền cổ áo to bản tạo thành hình chữ nhật trước ngực, phối cùng hoa văn ngũ hành và viền ngũ sắc ở tay áo. Set này diện cùng khăn vành dây hoặc trâm cài ngọc bích sẽ toát lên thần thái quyền lực đỉnh cao!`;
  }

  if (lower.includes('tứ thân')) {
    return `🌾 **Áo Tứ Thân - Hồn quê Kinh Bắc:**
Áo gồm 4 vạt, thường thả buông hoặc buộc chéo phía trước, mặc ngoài yếm đào, thắt lưng lụa và váy đụp đen. Đây là trang phục gắn liền với các làn điệu Quan họ, lễ hội mùa xuân, toát lên nét đẹp vừa mộc mạc, vừa đằm thắm của người phụ nữ Bắc Bộ xưa.`;
  }

  if (lower.includes('quần jeans') || lower.includes('sneaker') || lower.includes('remix') || lower.includes('hiện đại')) {
    return `👟 **Mix & Match Cổ Phục với Thời Trang Hiện Đại:**
Gen Z hoàn toàn có thể diện Áo ngũ thân tay chẽn hoặc Áo dài cách tân cùng:
1. **Quần Jeans ống suông hoặc Quần âu:** Vừa tôn dáng vừa năng động, phá bỏ định kiến cổ phục gò bó.
2. **Sneaker trắng (Low-top) hoặc Giày da Oxford:** Thoải mái sải bước dạo phố cả ngày mà vẫn toát lên chất "Smart Streetwear".
3. **Phụ kiện Y2K:** Kính râm gọng nhỏ, túi tote vải in họa tiết di sản hay tai nghe over-ear tạo nên tổng thể cực kỳ hút mắt!
⚠️ *Lưu ý văn hóa:* Không mix quần đùi/dép lê với Áo Tấc hoặc Áo Nhật Bình khi vào đền chùa hay lễ hội trang nghiêm nhé!`;
  }

  if (lower.includes('chất liệu') || lower.includes('vải') || lower.includes('lụa')) {
    return `🧵 **Chất liệu vải may Cổ phục Việt:**
- **Lụa Hà Đông / Vạn Phúc:** Mềm rủ, óng ả tự nhiên, thoáng mát mùa hè và giữ ấm mùa thu đông.
- **Vải The / Sa:** Dệt thưa, nhẹ tênh và bay bổng, thường dùng may áo kép (áo the mặc ngoài áo lụa trắng).
- **Vải Gấm / Đoạn:** Dày dặn, dệt nổi hoa văn hoa cúc, mây cuộn, chữ Thọ, toát lên sự vương giả, uy nghi.
- **Đũi:** Mộc mạc, thấm hút mồ hôi tốt, rất hợp với phom áo Tứ thân hoặc áo ngũ thân thường nhật.`;
  }

  if (lower.includes('phân tích') || lower.includes('set đồ')) {
    return `🔍 **Đánh giá bản phối hiện tại trên Avatar của bạn:**
Bạn đang diện **${outfitName}** (sắc ${colorName}) phối cùng **${currentOutfit?.bottomName || 'hạ phục'}** và **${currentOutfit?.shoeName || 'giày'}**.
- **Về phom dáng:** Tỷ lệ cân đối, tôn được nét đĩnh đạc của cổ phục.
- **Về màu sắc:** Cách phối màu đạt điểm thẩm mỹ cao, không bị chói mà rất có chiều sâu.
- **Gợi ý thêm:** Thêm một chiếc quạt xếp hoặc túi tote vải sẽ giúp set đồ hoàn thiện và ăn ảnh hơn khi xuống phố!`;
  }

  return `Chào bạn! Về câu hỏi "${message}", Việt Phục Remix luôn khuyến khích tinh thần **"Hiểu sâu nguồn cội - Tự do sáng tạo"**. Cổ phục Việt Nam qua các triều đại (Lý, Trần, Lê, Nguyễn) đều ẩn chứa chiều sâu triết lý ngũ hành và tính thẩm mỹ tinh tế. Bạn đang quan tâm đến cách phối đồ cho dịp cụ thể nào, hay muốn tìm hiểu thêm về điển chế, chất liệu vải cổ truyền?`;
}

// Hàm AI so sánh 2 bản phối trang phục
async function generateGeminiComparison(
  outfitA: any,
  outfitB: any,
  contextEvent?: string
) {
  const cacheKey = `${outfitA.top}_${outfitA.topColor?.hex}_${outfitA.bottom}_${outfitA.bottomColor?.hex}_${outfitA.shoes}_${(outfitA.accessories || []).join(',')}_VS_${outfitB.top}_${outfitB.topColor?.hex}_${outfitB.bottom}_${outfitB.bottomColor?.hex}_${outfitB.shoes}_${(outfitB.accessories || []).join(',')}_CTX_${contextEvent || ''}`;

  if (comparisonServerCache.has(cacheKey)) {
    return comparisonServerCache.get(cacheKey);
  }

  // Nếu đang trong thời gian nghỉ chống quá tải Quota (Cooldown)
  if (Date.now() < geminiCooldownUntil) {
    const fallback = generateIntelligentComparison(outfitA, outfitB, contextEvent);
    comparisonServerCache.set(cacheKey, fallback);
    return fallback;
  }

  const prompt = `Bạn là Chuyên gia Cố vấn Thời trang & Nhà nghiên cứu Di sản Cổ phục Việt Nam trong "Việt phục Remix".
Hãy phân tích, đối chiếu chuyên sâu và đưa ra nhận xét so sánh sắc sảo giữa 2 PHƯƠNG ÁN PHỐI ĐỒ sau đây:

${contextEvent ? `BỐI CẢNH / SỰ KIỆN: "${contextEvent}"` : 'BỐI CẢNH: Đang cân nhắc lựa chọn diện đồ'}

--- PHƯƠNG ÁN A ---
- Áo: ${outfitA.topName || outfitA.top} (Màu: ${outfitA.topColor?.name || 'Mặc định'})
- Hạ phục: ${outfitA.bottomName || outfitA.bottom} (Màu: ${outfitA.bottomColor?.name || 'Mặc định'})
- Giày dép: ${outfitA.shoeName || outfitA.shoes}
- Phụ kiện: ${(outfitA.accessoryNames || outfitA.accessories || []).join(', ') || 'Không có'}
- Giới tính hiển thị: ${outfitA.gender === 'female' ? 'Nữ' : 'Nam'}
- Đánh giá phối màu: ${outfitA.harmonyTitle || 'Hài hòa'}

--- PHƯƠNG ÁN B ---
- Áo: ${outfitB.topName || outfitB.top} (Màu: ${outfitB.topColor?.name || 'Mặc định'})
- Hạ phục: ${outfitB.bottomName || outfitB.bottom} (Màu: ${outfitB.bottomColor?.name || 'Mặc định'})
- Giày dép: ${outfitB.shoeName || outfitB.shoes}
- Phụ kiện: ${(outfitB.accessoryNames || outfitB.accessories || []).join(', ') || 'Không có'}
- Giới tính hiển thị: ${outfitB.gender === 'female' ? 'Nữ' : 'Nam'}
- Đánh giá phối màu: ${outfitB.harmonyTitle || 'Hài hòa'}

YÊU CẦU PHÂN TÍCH:
1. So sánh tinh thần phong cách (Style DNA) giữa 2 set: bản nào trang trọng, truyền thống hơn; bản nào mang tinh thần Gen Z, cách tân, năng động hơn.
2. Đánh giá tính chuẩn mực văn hóa di sản (nguyên tắc lễ nghi, tránh xung đột trang phục).
3. Đánh giá tính ứng dụng thực tế (thời tiết, di chuyển, chụp ảnh hay tham dự sự kiện trang trọng).
4. Đưa ra lời khuyên Stylist (Stylist Verdict) rõ ràng: Khi nào nên chọn Phương án A, và khi nào nên chọn Phương án B.

BẮT BUỘC TRẢ VỀ ĐỊNH DẠNG JSON DUY NHẤT:
{
  "overview": "Đoạn văn ngắn (2-3 câu) tóm lược điểm khác biệt cốt lõi nhất giữa 2 set đồ",
  "outfitA": {
    "vibe": "Tên phong cách của Phương án A (ví dụ: Cung đình đoan trang, Cổ điển trang nghiêm)",
    "strengths": ["Điểm mạnh 1", "Điểm mạnh 2"],
    "bestOccasion": "Dịp phù hợp nhất để diện Set A"
  },
  "outfitB": {
    "vibe": "Tên phong cách của Phương án B (ví dụ: Gen Z Phá Cách, Smart Streetwear)",
    "strengths": ["Điểm mạnh 1", "Điểm mạnh 2"],
    "bestOccasion": "Dịp phù hợp nhất để diện Set B"
  },
  "verdict": "Lời khuyên chốt hạ của Stylist: Khuyên chọn set nào cho bối cảnh cụ thể và bí quyết để diện tự tin nhất."
}`;

  try {
    let rawJsonText = '';
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
    } catch (err38: any) {
      if (isQuotaExceededError(err38)) {
        geminiCooldownUntil = Date.now() + 45000;
        console.warn('[Gemini Quota Exceeded] Kích hoạt chế độ Bộ máy Di sản Thông minh trong 45s.');
        const fallback = generateIntelligentComparison(outfitA, outfitB, contextEvent);
        comparisonServerCache.set(cacheKey, fallback);
        return fallback;
      }

      // Thử gọi gemini-3.1-flash-lite nếu lỗi khác
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
    if (parsed.overview && parsed.outfitA && parsed.outfitB) {
      comparisonServerCache.set(cacheKey, parsed);
      return parsed;
    }
  } catch (err: any) {
    if (isQuotaExceededError(err)) {
      geminiCooldownUntil = Date.now() + 45000;
    }
    console.warn('generateGeminiComparison chuyển sang bộ máy di sản nội bộ.');
  }

  const fallback = generateIntelligentComparison(outfitA, outfitB, contextEvent);
  comparisonServerCache.set(cacheKey, fallback);
  return fallback;
}

// Hàm AI Chat Bot tự do trả lời người dùng
async function generateGeminiChat(
  message: string,
  currentOutfit?: any,
  history?: Array<{ role: 'user' | 'model'; text: string }>
) {
  const cacheKey = `${message.trim().toLowerCase()}_${currentOutfit?.top || ''}_${currentOutfit?.bottom || ''}`;
  if (chatServerCache.has(cacheKey)) {
    return chatServerCache.get(cacheKey)!;
  }

  if (Date.now() < geminiCooldownUntil) {
    const fallbackReply = generateIntelligentChatFallback(message, currentOutfit);
    chatServerCache.set(cacheKey, fallbackReply);
    return fallbackReply;
  }

  const systemInstruction = `Bạn là "Việt Phục Remix AI", một stylist Gen Z cực kỳ sành điệu, am hiểu sâu sắc về cổ phục Việt Nam. Nhiệm vụ của bạn là lắng nghe bối cảnh (sự kiện, thời tiết, phong cách) của người dùng để trả lời, tư vấn, giải thích và phối ra bộ đồ hợp lý nhất.

KHO ĐỒ TIÊU CHUẨN CỦA HỆ THỐNG:
- Áo: Áo Tấc, Áo Ngũ thân tay chẽn, Áo Tứ thân, Áo Giao lĩnh, Áo Nhật Bình.
- Quần/Váy: Quần lụa trắng, Quần lĩnh đen, Váy đụp đũi đen, Quần âu hiện đại, Quần Jeans.
- Phụ kiện đầu: Mấn xếp tròn (nữ), Khăn vành dây (nữ), Khăn xếp (nam), Nón lá, Kẹp tóc ngọc trai, Kính râm gọng nhỏ Y2K, Tai nghe.
- Giày dép: Guốc mộc, Hài thêu, Giày Sneaker trắng, Giày da Oxford, Dép lê.
- Phụ kiện cầm tay: Quạt giấy xếp, Quạt tròn, Túi Tote vải, Túi xách da mini.

NGUYÊN TẮC PHỐI ĐỒ & TƯ VẤN:
1. Tính ứng dụng: Đi chơi/cafe cần gọn gàng (Tay chẽn, Tứ thân). Đi lễ/sự kiện trang trọng cần uy nghi (Áo Tấc, Giao lĩnh, Nhật Bình).
2. Bảo vệ văn hóa: Tuyệt đối cảnh báo gắt (nhưng hài hước, duyên dáng Gen Z) nếu user đòi mặc áo Tấc/Giao lĩnh đi kèm quần đùi, dép lê, hoặc phối đồ đi chùa nhưng hở hang.
3. Gen Z Vibe: Cho phép mix cổ phục với đồ hiện đại (Sneaker, kính râm, quần âu) nếu bối cảnh là dạo phố, chụp ảnh thời trang.
4. Trả lời MỌI CÂU HỎI của người dùng: Lịch sử các triều đại (Lê, Lý, Trần, Nguyễn), ý nghĩa văn hóa, quy chế điển chế, chất liệu vải (lụa, the, gấm, đũi), cách bảo quản, cách phối đồ cho bất kỳ sự kiện hay hoàn cảnh nào. Giọng điệu trẻ trung, thông thái, nhiệt huyết và đậm chất Gen Z.`;

  const outfitContext = currentOutfit
    ? `\n[THÔNG TIN TRANG PHỤC HIỆN TẠI TRÊN AVATAR NGƯỜI DÙNG: Áo: ${currentOutfit.topName || currentOutfit.top}, Màu áo: ${currentOutfit.topColor?.name}, Quần/Váy: ${currentOutfit.bottomName || currentOutfit.bottom}, Giày: ${currentOutfit.shoeName || currentOutfit.shoes}, Phụ kiện: ${(currentOutfit.accessoryNames || currentOutfit.accessories || []).join(', ')}, Giới tính: ${currentOutfit.gender === 'female' ? 'Nữ' : 'Nam'}]`
    : '';

  const prompt = `${systemInstruction}
${outfitContext}

LỊCH SỬ HỘI THOẠI GẦN ĐÂY:
${(history || []).slice(-6).map(h => `${h.role === 'user' ? 'Người dùng' : 'Stylist AI'}: ${h.text}`).join('\n')}

Người dùng: "${message}"
Stylist AI (trả lời ngắn gọn súc tích 2-4 đoạn, có bullet points nếu hữu ích, dùng emoji sinh động):`;

  try {
    let replyText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      });
      replyText = response.text || '';
    } catch (err38: any) {
      if (isQuotaExceededError(err38)) {
        geminiCooldownUntil = Date.now() + 45000;
        const fallback = generateIntelligentChatFallback(message, currentOutfit);
        chatServerCache.set(cacheKey, fallback);
        return fallback;
      }
      const responseFallback = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
      });
      replyText = responseFallback.text || '';
    }
    const cleanReply = replyText.trim();
    chatServerCache.set(cacheKey, cleanReply);
    return cleanReply;
  } catch (err: any) {
    if (isQuotaExceededError(err)) {
      geminiCooldownUntil = Date.now() + 45000;
    }
    const fallback = generateIntelligentChatFallback(message, currentOutfit);
    chatServerCache.set(cacheKey, fallback);
    return fallback;
  }
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

  // API 3: So sánh chuyên sâu 2 set đồ bằng AI Gemini
  app.post('/api/compare', async (req: Request, res: Response) => {
    try {
      const { outfitA, outfitB, contextEvent } = req.body || {};
      if (!outfitA || !outfitB) {
        res.status(400).json({ success: false, error: 'Thiếu thông tin 2 bản phối để so sánh' });
        return;
      }

      const comparison = await generateGeminiComparison(outfitA, outfitB, contextEvent);
      res.json({ success: true, comparison });
    } catch (err) {
      console.error('API /api/compare error:', err);
      res.status(500).json({ success: false, error: (err as Error).message });
    }
  });

  // API 4: AI Chat Bot Stylist Gen Z đàm thoại tự do
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const { message, currentOutfit, history } = req.body || {};
      if (!message || typeof message !== 'string') {
        res.status(400).json({ success: false, error: 'Thiếu nội dung câu hỏi' });
        return;
      }

      const reply = await generateGeminiChat(message.trim(), currentOutfit, history);
      res.json({ success: true, reply });
    } catch (err) {
      console.error('API /api/chat error:', err);
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
