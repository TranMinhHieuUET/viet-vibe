import React, { useState, useMemo } from 'react';
import { 
  Info, 
  Sparkles, 
  AlertTriangle, 
  AlertOctagon, 
  CheckCircle2, 
  RotateCcw, 
  Shuffle, 
  Palette, 
  Layers, 
  BookOpen, 
  X,
  Shirt,
  Footprints,
  Glasses,
  Scissors,
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  CloudSun,
  Sun,
  CloudRain,
  Thermometer,
  Wind,
  Loader2
} from 'lucide-react';

// --- BẢNG MÀU CHUẨN ---
interface ColorOption {
  id: string;
  name: string;
  hex: string;
  borderClass: string;
}

const COLOR_PALETTE: ColorOption[] = [
  { id: 'do_do', name: 'Đỏ đô', hex: '#8B1E2D', borderClass: 'border-red-900' },
  { id: 'vang_lua', name: 'Vàng lụa', hex: '#D4A345', borderClass: 'border-amber-600' },
  { id: 'xanh_ngoc', name: 'Xanh ngọc', hex: '#2E8B7E', borderClass: 'border-teal-700' },
  { id: 'den', name: 'Đen', hex: '#1E293B', borderClass: 'border-slate-800' },
  { id: 'trang', name: 'Trắng', hex: '#F8FAFC', borderClass: 'border-slate-300' },
];

// --- DỮ LIỆU MÓN ĐỒ & LỊCH SỬ VĂN HÓA ---
export type AccessoryGroup = 'doi_dau' | 'kinh' | 'trang_suc' | 'tui_xach';

export interface AccessoryGroupInfo {
  id: AccessoryGroup;
  name: string;
  badge: string;
  desc: string;
}

export const ACCESSORY_GROUPS: AccessoryGroupInfo[] = [
  { 
    id: 'doi_dau', 
    name: 'Đội đầu & Chụp tai', 
    badge: 'Đội đầu', 
    desc: 'Khăn xếp, khăn vấn, nón quai thao, trâm cài & tai nghe' 
  },
  { 
    id: 'kinh', 
    name: 'Kính mắt thời trang', 
    badge: 'Kính mắt', 
    desc: 'Kính râm đen cool-kid, kính tròn trí thức' 
  },
  { 
    id: 'trang_suc', 
    name: 'Trang sức & Đeo cổ', 
    badge: 'Đeo cổ', 
    desc: 'Kim khánh hoàng gia, bội tinh cung đình' 
  },
  { 
    id: 'tui_xach', 
    name: 'Túi xách & Cầm tay', 
    badge: 'Cầm tay', 
    desc: 'Túi tote canvas, quạt xếp lụa tao nhã' 
  },
];

export interface ItemData {
  id: string;
  name: string;
  category: 'ao' | 'quan' | 'phukien' | 'giay';
  era: string;
  desc: string;
  history: string;
  accGroup?: AccessoryGroup;
}

const TOPS: ItemData[] = [
  {
    id: 'ao_dai',
    name: 'Áo dài tân thời',
    category: 'ao',
    era: 'Thế kỷ 20 - Nay',
    desc: 'Tà áo thướt tha xẻ hông, cổ cao duyên dáng kết hợp truyền thống và nét đẹp cơ thể hiện đại.',
    history: 'Phát triển từ áo ngũ thân từ thập niên 1930 qua bàn tay họa sĩ Lemur Cát Tường và Lê Phổ, áo dài trở thành biểu tượng quốc phục thanh lịch của Việt Nam.'
  },
  {
    id: 'ao_tu_than',
    name: 'Áo tứ thân',
    category: 'ao',
    era: 'Thế kỷ 12 - Đầu TK 20',
    desc: 'Trang phục dân gian miền Bắc với 4 vạt áo, vạt trước buộc chéo tôn vòng eo con kiến.',
    history: 'Gắn liền với hình ảnh phụ nữ Kinh Bắc và hát Quan họ. Bốn vạt tượng trưng cho tứ thân phụ mẫu (cha mẹ mình và cha mẹ chồng), thể hiện sự hiếu kính và mộc mạc.'
  },
  {
    id: 'ao_ngu_than',
    name: 'Áo ngũ thân tay chẽn',
    category: 'ao',
    era: 'Thời Nguyễn (TK 18 - 19)',
    desc: 'Áo cổ đứng cài 5 khuy lệch, ống tay may ôm chẽn cổ tay gọn gàng, tôn dáng đĩnh đạc.',
    history: 'Được Chúa Nguyễn Phúc Khoát định hình năm 1744 và vua Minh Mạng chuẩn hóa toàn quốc. Năm thân áo tượng trưng cho tứ thân phụ mẫu và bản thân người mặc, 5 khuy là Nhân-Lễ-Nghĩa-Trí-Tín.'
  },
  {
    id: 'ao_tac',
    name: 'Áo tấc (Ngũ thân tay thụng)',
    category: 'ao',
    era: 'Thời Nguyễn',
    desc: 'Lễ phục trang trọng với tay áo rộng và thụng hình chữ nhật buông dài uy nghiêm.',
    history: 'Còn gọi là áo thụng, lễ phục phổ biến thời Nguyễn từ quan lại đến thứ dân dùng trong dịp tế lễ, hỷ sự và yết kiến bề trên. Mang phong thái ung dung, nho nhã.'
  },
  {
    id: 'ao_nhat_binh',
    name: 'Áo Nhật Bình',
    category: 'ao',
    era: 'Triều đình nhà Nguyễn',
    desc: 'Cổ áo hình chữ nhật ghép dải ngũ hành rực rỡ, hai tay áo có dải ngũ sắc hoàng cung.',
    history: 'Thường phục của Hậu phi, Công chúa và Cung tần triều Nguyễn. Hoa văn trước ngực và cổ áo tượng trưng cho sự chính trực và trật tự tôn ti chốn hoàng cung tôn quý.'
  }
];

const BOTTOMS: ItemData[] = [
  {
    id: 'quan_lua',
    name: 'Quần lụa ống rộng',
    category: 'quan',
    era: 'Truyền thống',
    desc: 'Quần lụa mềm mại rủ nhẹ, ống suông rộng thoải mái và quý phái.',
    history: 'Món đồ kinh điển kết hợp cùng Áo dài và Áo ngũ thân. Thường may bằng lụa tơ tằm Vạn Phúc tạo bước đi nhẹ nhàng, đoan trang.'
  },
  {
    id: 'vay_dup',
    name: 'Váy đụp thâm',
    category: 'quan',
    era: 'Dân gian Bắc Bộ',
    desc: 'Váy xòe dài màu đen/nâu nhuộm củ nâu, rộng rãi thuận tiện cho lao động đồng quê.',
    history: 'Trang phục căn bản của người phụ nữ nông thôn Bắc Bộ xưa, tạo nên bộ đôi chuẩn mực "Áo tứ thân - yếm đào - váy đụp".'
  },
  {
    id: 'quan_jeans',
    name: 'Quần Jeans suông',
    category: 'quan',
    era: 'Hiện đại (Gen Z)',
    desc: 'Quần denim ống đứng trẻ trung, phá cách khi mix cùng áo tà cổ điển.',
    history: 'Biểu tượng của văn hóa streetwear thế giới, mang tinh thần tự do và cá tính của giới trẻ thế kỷ 21.'
  },
  {
    id: 'quan_kaki',
    name: 'Quần Kaki suông',
    category: 'quan',
    era: 'Hiện đại Smart-Casual',
    desc: 'Quần vải chinos/kaki form đứng thanh lịch, tối giản và thời thượng.',
    history: 'Phom dáng tối giản hiện đại giúp làm nổi bật đường cắt cổ phục mà không bị rườm rà.'
  },
  {
    id: 'vay_xep_ly',
    name: 'Chân váy xếp ly maxi',
    category: 'quan',
    era: 'Hiện đại Romantique',
    desc: 'Chân váy maxi dập ly chuyển động bay bổng, tạo hiệu ứng xếp lớp thị giác.',
    history: 'Sự hòa quyện giữa nét nữ tính hiện đại và tính chất thướt tha vốn có của trang phục phương Đông.'
  },
  {
    id: 'quan_short',
    name: 'Quần short',
    category: 'quan',
    era: 'Hiện đại Năng động',
    desc: 'Quần đùi ngắn trên đầu gối mát mẻ cho mùa hè.',
    history: 'Món đồ thể thao, dạo phố hiện đại; tuy nhiên đối với cổ phục tà dài sẽ gây xung đột về độ kín đáo truyền thống.'
  },
  {
    id: 'vay_ngan',
    name: 'Váy ngắn chữ A',
    category: 'quan',
    era: 'Hiện đại Y2K',
    desc: 'Chân váy ngắn năng động, tôn chân dài của phong cách trẻ.',
    history: 'Biểu tượng của thời trang giải phóng thập niên 60-70 và xu hướng Y2K ngày nay.'
  }
];

const ACCESSORIES: ItemData[] = [
  // 1. NHÓM ĐỘI ĐẦU & CHỤP TAI
  {
    id: 'khan_xep',
    name: 'Khăn xếp',
    category: 'phukien',
    accGroup: 'doi_dau',
    era: 'Thế kỷ 19 - Nay',
    desc: 'Khăn quấn sẵn hình khối trang nhã đội trên đầu theo lối nam/nữ truyền thống.',
    history: 'Phát triển từ khăn vấn tự quấn bằng tay để tiện lợi hơn trong đời sống thời Nguyễn và đầu thế kỷ 20.'
  },
  {
    id: 'khan_van',
    name: 'Khăn vấn',
    category: 'phukien',
    accGroup: 'doi_dau',
    era: 'Thời Lê - Nguyễn',
    desc: 'Tóc độn khăn vấn tròn quanh đầu gọn gàng khoe vầng trán thanh tú.',
    history: 'Nét đẹp thuần phong mỹ tục của phụ nữ xưa, tượng trưng cho sự nề nếp, đoan chính của tiểu thư khuê các.'
  },
  {
    id: 'non_quai_thao',
    name: 'Nón quai thao',
    category: 'phukien',
    accGroup: 'doi_dau',
    era: 'Dân gian Kinh Bắc',
    desc: 'Nón tròn dẹt vành rộng đan lá cọ có quai tơ thao thao buông dài chấm ngực.',
    history: 'Gắn liền với các liền chị Quan họ Bắc Ninh trong những ngày hội Lim, đi cùng áo tứ thân mớ ba mớ bảy.'
  },
  {
    id: 'tram_cai',
    name: 'Trâm cài mạ vàng',
    category: 'phukien',
    accGroup: 'doi_dau',
    era: 'Cổ phong quý tộc',
    desc: 'Trâm kim loại uốn họa tiết phượng hoàng hoặc hoa sen đính đá quý.',
    history: 'Vật trang sức quý giá cố định búi tóc của phụ nữ quý tộc xưa, thường là tín vật gia truyền hoặc kỷ vật đính ước.'
  },
  {
    id: 'tai_nghe',
    name: 'Tai nghe chụp tai',
    category: 'phukien',
    accGroup: 'doi_dau',
    era: 'Cyber / Gen Z',
    desc: 'Headphone Over-ear công nghệ cao mang vibe Cyberpunk đường phố.',
    history: 'Món phụ kiện công nghệ biểu tượng cho phong cách sống năng động kết nối của thế hệ số.'
  },

  // 2. NHÓM KÍNH MẮT
  {
    id: 'kinh_ram',
    name: 'Kính râm đen',
    category: 'phukien',
    accGroup: 'kinh',
    era: 'Hiện đại Cool-kid',
    desc: 'Mắt kính thời trang tối màu góc cạnh tạo điểm nhấn ngầu và bí ẩn.',
    history: 'Món phụ kiện giúp biến set đồ cổ phong thành một tuyên ngôn thời trang streetwear thời thượng.'
  },
  {
    id: 'kinh_tron',
    name: 'Kính tròn Retro',
    category: 'phukien',
    accGroup: 'kinh',
    era: 'Vintage / Y2K',
    desc: 'Kính gọng tròn mảnh ánh kim mang vibe trí thức hoài niệm.',
    history: 'Phổ biến từ thập niên 1920-1930 thời Đông Dương, biểu trưng cho giới tân học trí thức Việt Nam xưa.'
  },

  // 3. NHÓM TRANG SỨC & ĐEO CỔ
  {
    id: 'kim_khanh',
    name: 'Kim khánh quý tộc',
    category: 'phukien',
    accGroup: 'trang_suc',
    era: 'Triều Nguyễn',
    desc: 'Khánh chạm vàng hình khánh nhạc treo trước ngực có tua rua đỏ lộng lẫy.',
    history: 'Bội tinh ban thưởng của triều đình Nguyễn dành cho người có công hoặc trang sức tế lễ hoàng tộc.'
  },

  // 4. NHÓM TÚI XÁCH & CẦM TAY
  {
    id: 'tui_tote',
    name: 'Túi Tote Canvas',
    category: 'phukien',
    accGroup: 'tui_xach',
    era: 'Eco-Fashion Hiện đại',
    desc: 'Túi vải canvas mộc mạc tiện dụng mang theo sách vở và laptop.',
    history: 'Được giới trẻ và sinh viên yêu thích nhờ tính ứng dụng cao và tinh thần sống xanh thân thiện môi trường.'
  },
  {
    id: 'quat_xep',
    name: 'Quạt xếp lụa đỏ',
    category: 'phukien',
    accGroup: 'tui_xach',
    era: 'Cổ phong Tao nhã',
    desc: 'Quạt nan tre bọc lụa thêu hoa văn, vật tùy thân thanh lịch tao nhã.',
    history: 'Vật phẩm bất ly thân của tao nhân mặc khách, vừa để đón gió mát vừa là đạo cụ giao duyên ý nhị.'
  }
];

const SHOES: ItemData[] = [
  {
    id: 'guoc_moc',
    name: 'Guốc mộc',
    category: 'giay',
    era: 'Cổ truyền Việt Nam',
    desc: 'Guốc gỗ đẽo tay mộc mạc quai da/vải son, tạo âm thanh lách cách vui tai.',
    history: 'Gắn bó hàng trăm năm với bước chân người Việt khắp thôn quê đến phố thị, tôn nét thanh tao thuần khiết.'
  },
  {
    id: 'hai_theu',
    name: 'Hài thêu hoa văn',
    category: 'giay',
    era: 'Cung đình & Quý tộc',
    desc: 'Hài mũi cong thêu chỉ ngũ sắc chỉ vàng hình hoa mẫu đơn và mây cuộn.',
    history: 'Đôi hài đi cùng áo tấc, áo nhật bình chốn quyền quý, từng bước chân đoan trang nhẹ tựa cánh hoa.'
  },
  {
    id: 'sneaker_chunky',
    name: 'Sneaker hầm hố',
    category: 'giay',
    era: 'Streetwear Y2K',
    desc: 'Giày thể thao đế thô dày cộm mạnh mẽ mang vibe vị lai cá tính.',
    history: 'Trào lưu sneaker chunky thống trị thời trang đường phố toàn cầu, phá vỡ mọi quy chuẩn truyền thống.'
  },
  {
    id: 'sneaker_low',
    name: 'Sneaker cổ thấp',
    category: 'giay',
    era: 'Hiện đại Classic',
    desc: 'Giày sneaker trắng tối giản phom thanh gọn, dễ ứng dụng hàng ngày.',
    history: 'Item "must-have" của giới trẻ, khi kết hợp với áo ngũ thân hay áo dài tạo nét hòa trộn Đông-Tây trẻ trung.'
  },
  {
    id: 'oxford',
    name: 'Giày Oxford',
    category: 'giay',
    era: 'Cổ điển phương Tây',
    desc: 'Giày da buộc dây lịch lãm phong cách học đường Anh quốc (Dark Academia).',
    history: 'Sự giao thoa thanh lịch mang lại khí chất trí thức hiện đại khi kết hợp cùng áo ngũ thân.'
  },
  {
    id: 'loafer',
    name: 'Giày Loafer',
    category: 'giay',
    era: 'Smart Modern',
    desc: 'Giày da lười xỏ chân thanh thoát, đế nhẹ tinh tế.',
    history: 'Mang lại sự chỉn chu không cầu kỳ, rất phù hợp với phong cách tân thời giao thoa.'
  },
  {
    id: 'dep_le',
    name: 'Dép lê',
    category: 'giay',
    era: 'Thường nhật bình dân',
    desc: 'Dép quai ngang nhựa/xốp đi ở nhà thoải mái.',
    history: 'Món đồ tiện lợi khi ở nhà hoặc đi chợ, tuy nhiên rất kiêng kỵ khi mặc cùng trang phục lễ nghi nghiêm túc.'
  },
  {
    id: 'dep_xo_ngon',
    name: 'Dép xỏ ngón',
    category: 'giay',
    era: 'Dã ngoại / Đi biển',
    desc: 'Dép kẹp cao su ngón chân siêu tối giản.',
    history: 'Phù hợp khi đi biển dạo mát, hoàn toàn lạc quẻ và làm mất đi sự tôn nghiêm kín đáo của cổ phục.'
  }
];

const ALL_ITEMS = [...TOPS, ...BOTTOMS, ...ACCESSORIES, ...SHOES];

// --- ĐỊNH NGHĨA ROUTING, THỜI TIẾT & AI ENGINE ---
export type Screen = 'ONBOARDING' | 'LOADING' | 'MIX_MATCH';

export interface WeatherInfo {
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

export interface OutfitRecommendation {
  top: string;
  bottom: string;
  shoes: string;
  accessories: string | string[];
  contextEvent?: string;
  eventDate?: string;
  location?: string;
  weatherInfo?: WeatherInfo;
  stylingTitle?: string;
  preferredTop?: string;
  aiReasoning?: string;
}

/**
 * Hàm giả lập AI (mockAIEngine) dự phòng khi offline hoặc preview độc lập:
 * Nhận vào (Sự kiện, Ngày, Địa điểm, Loại trang phục ưu tiên, Thời tiết)
 * và phân tích kết hợp giữa bối cảnh sự kiện + thời tiết + quy chuẩn di sản.
 */
export function mockAIEngine(
  event: string,
  eventDate: string = new Date().toISOString().slice(0, 10),
  location: string = 'Hà Nội',
  preferredTop: string = 'auto',
  weather?: WeatherInfo
): OutfitRecommendation {
  const norm = event.toLowerCase().trim();

  // Kiểm tra từ khóa Truyền thống / Lễ / Tết
  const isTraditional = /truyền thống|truyen thong|tết|tet|lễ|le|tốt nghiệp|tot nghiep|chùa|chua|cưới|cuoi|hỷ sự|cung đình|cúng|dâng hương|đền/.test(norm);
  // Kiểm tra từ khóa Dạo phố / Concert / Hiện đại
  const isStreetOrModern = /dạo phố|dao pho|concert|rap|trà đá|tra da|cuối tuần|cuoi tuan|cafe|cà phê|chill|quán xá|phố đi bộ|street|cháy|chơi|party|bạn bè/.test(norm);

  const weatherDesc = weather ? `${weather.icon} ${weather.weatherDesc}, ${weather.avgTemp}°C` : 'Thời tiết thu mát mẻ, nắng nhẹ';

  if (isTraditional) {
    const top = preferredTop !== 'auto'
      ? preferredTop
      : (norm.includes('tốt nghiệp') || norm.includes('tết') ? 'ao_dai' : 'ao_tac');
    return {
      top,
      bottom: 'quan_lua',
      shoes: 'hai_theu',
      accessories: ['khan_xep', 'quat_xep'],
      contextEvent: event,
      eventDate,
      location,
      weatherInfo: weather,
      stylingTitle: 'Trang Phục Lễ Nghi & Di Sản Tôn Kính',
      preferredTop,
      aiReasoning: `Bối cảnh trang trọng (${event}) tại ${location} vào ngày ${eventDate} (${weatherDesc}): Gợi ý cổ phục tà dài kết hợp Quần lụa và Hài thêu đoan trang, tôn vinh nét đẹp văn hóa ngàn năm và giữ chuẩn mực lễ nghi.`
    };
  }

  if (isStreetOrModern) {
    const top = preferredTop !== 'auto' ? preferredTop : 'ao_ngu_than';
    return {
      top,
      bottom: 'quan_jeans',
      shoes: 'sneaker_low',
      accessories: ['tai_nghe', 'kinh_ram'],
      contextEvent: event,
      eventDate,
      location,
      weatherInfo: weather,
      stylingTitle: 'Cyber Cổ Phục Gen Z Dạo Phố',
      preferredTop,
      aiReasoning: `Bối cảnh trẻ trung năng động (${event}) ngày ${eventDate} (${weatherDesc}): Áo ngũ thân tay chẽn gọn gàng phối Quần Jeans và Sneaker cổ thấp cùng tai nghe/kính râm – phong cách hòa trộn Đông-Tây cá tính chuẩn Gen Z.`
    };
  }

  // Trường hợp bối cảnh khác: dựa trên sở thích áo hoặc phối Smart-Casual
  let top = preferredTop !== 'auto' ? preferredTop : 'ao_ngu_than';
  let bottom = 'quan_kaki';
  let shoes = 'oxford';
  let accessories: string[] = ['kinh_tron', 'tui_tote'];
  let stylingTitle = 'Smart-Casual Tân Thời Giao Thoa';
  let reasoning = `Bản phối Smart-Casual thanh lịch cho ${event} tại ${location} ngày ${eventDate} (${weatherDesc}): Cân bằng hoàn hảo giữa nét cổ điển Á Đông và phong thái hiện đại.`;

  if (top === 'ao_tac' || top === 'ao_nhat_binh') {
    bottom = 'quan_lua';
    shoes = 'hai_theu';
    accessories = ['khan_xep', 'kim_khanh'];
    stylingTitle = 'Cung Đình Hoàng Gia Uy Nghiêm';
    reasoning = `Lễ phục quý tộc cung đình sang trọng cho sự kiện ${event} ngày ${eventDate} (${weatherDesc}).`;
  } else if (top === 'ao_tu_than') {
    bottom = 'vay_dup';
    shoes = 'guoc_moc';
    accessories = ['non_quai_thao'];
    stylingTitle = 'Hồn Quê Kinh Bắc Thắt Đáy Lưng Ong';
    reasoning = `Bản phối mộc mạc dân gian Kinh Bắc cho ${event} ngày ${eventDate} (${weatherDesc}).`;
  } else if (top === 'ao_dai') {
    bottom = 'quan_lua';
    shoes = 'guoc_moc';
    accessories = ['tram_cai', 'quat_xep'];
    stylingTitle = 'Áo Dài Tân Thời Duyên Dáng';
    reasoning = `Áo dài tân thời thướt tha mềm mại tôn vinh vẻ đẹp truyền thống cho ${event} ngày ${eventDate} (${weatherDesc}).`;
  }

  return {
    top,
    bottom,
    shoes,
    accessories,
    contextEvent: event,
    eventDate,
    location,
    weatherInfo: weather,
    stylingTitle,
    preferredTop,
    aiReasoning: reasoning
  };
}

interface MixMatchScreenProps {
  initialOutfit: OutfitRecommendation;
  onBack: () => void;
}

export function MixMatchScreen({ initialOutfit, onBack }: MixMatchScreenProps) {
  // Trạng thái lựa chọn món đồ - Khởi tạo từ initialOutfit do AI gợi ý
  const [selectedTop, setSelectedTop] = useState<string>(initialOutfit.top || 'ao_ngu_than');
  const [selectedBottom, setSelectedBottom] = useState<string>(initialOutfit.bottom || 'quan_lua');
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(() => {
    if (Array.isArray(initialOutfit.accessories)) return initialOutfit.accessories;
    return initialOutfit.accessories ? [initialOutfit.accessories] : [];
  });
  const [selectedShoe, setSelectedShoe] = useState<string>(initialOutfit.shoes || 'sneaker_low');

  // Đồng bộ khi initialOutfit thay đổi
  React.useEffect(() => {
    if (initialOutfit.top) setSelectedTop(initialOutfit.top);
    if (initialOutfit.bottom) setSelectedBottom(initialOutfit.bottom);
    if (initialOutfit.shoes) setSelectedShoe(initialOutfit.shoes);
    if (initialOutfit.accessories) {
      setSelectedAccessories(
        Array.isArray(initialOutfit.accessories)
          ? initialOutfit.accessories
          : [initialOutfit.accessories]
      );
    }
  }, [initialOutfit]);

  // Lựa chọn giới tính avatar (Nam / Nữ)
  const [gender, setGender] = useState<'female' | 'male'>('female');

  // Trạng thái màu sắc
  const [topColor, setTopColor] = useState<ColorOption>(COLOR_PALETTE[0]); // Đỏ đô
  const [bottomColor, setBottomColor] = useState<ColorOption>(COLOR_PALETTE[3]); // Đen

  // Tab điều khiển đang mở
  const [activeTab, setActiveTab] = useState<'ao' | 'quan' | 'phukien' | 'giay'>('ao');

  // Modal / Tooltip thông tin lịch sử
  const [infoItem, setInfoItem] = useState<ItemData | null>(null);

  // Xử lý chọn / bỏ chọn phụ kiện (Hỗ trợ 0, 1 hoặc nhiều phụ kiện; cùng nhóm thì loại trừ lẫn nhau)
  const toggleAccessory = (itemId: string) => {
    const item = ACCESSORIES.find(a => a.id === itemId);
    if (!item) return;
    const group = item.accGroup;

    setSelectedAccessories(prev => {
      const isAlreadySelected = prev.includes(itemId);
      if (isAlreadySelected) {
        // Bấm vào món đang chọn -> Bỏ chọn (toggle off)
        return prev.filter(id => id !== itemId);
      } else {
        // Loại bỏ món cùng nhóm hiện có (nếu có), thêm món mới vào
        const withoutSameGroup = prev.filter(id => {
          const existing = ACCESSORIES.find(a => a.id === id);
          return existing?.accGroup !== group;
        });
        return [...withoutSameGroup, itemId];
      }
    });
  };

  const clearAllAccessories = () => {
    setSelectedAccessories([]);
  };

  // --- HỆ THỐNG CẢNH BÁO VĂN HÓA (CULTURAL GUARDRAILS) ---
  const culturalAlerts = useMemo(() => {
    const alerts: Array<{
      id: string;
      level: 'red' | 'orange' | 'green';
      title: string;
      message: string;
    }> = [];

    const isNhatBinhOrTac = selectedTop === 'ao_nhat_binh' || selectedTop === 'ao_tac';
    const isLePhucIncompatible = 
      selectedBottom === 'vay_dup' || 
      selectedBottom === 'quan_short' || 
      selectedBottom === 'vay_ngan' ||
      selectedShoe === 'sneaker_chunky' ||
      selectedShoe === 'dep_le' ||
      selectedShoe === 'dep_xo_ngon' ||
      selectedAccessories.includes('non_quai_thao');

    // LUẬT 1: Phạm quy Lễ phục
    if (isNhatBinhOrTac && isLePhucIncompatible) {
      alerts.push({
        id: 'rule_1',
        level: 'red',
        title: 'Phạm quy hoàng gia / lễ nghi',
        message: '🚨 Không phối lễ phục cung đình với đồ bình dân, đường phố hoặc đồ ngắn. Hãy chọn quần lụa, hài thêu/guốc mộc.'
      });
    }

    // LUẬT 2: Cấu trúc gãy gập
    const isTaDai = ['ao_dai', 'ao_ngu_than', 'ao_tac', 'ao_nhat_binh'].includes(selectedTop);
    const isDoNgan = selectedBottom === 'quan_short' || selectedBottom === 'vay_ngan';
    if (isTaDai && isDoNgan) {
      alerts.push({
        id: 'rule_2',
        level: 'orange',
        title: 'Lỗi cấu trúc trang phục',
        message: '⚠️ Áo tà dài xẻ hông mặc cùng đồ ngắn sẽ để lộ chân, làm mất đi sự kín đáo đặc trưng của cổ phục.'
      });
    }

    // LUẬT 3: Mất chất dân gian
    const isTuThan = selectedTop === 'ao_tu_than';
    const isTuThanIncompatible = ['quan_lua', 'quan_jeans', 'quan_kaki'].includes(selectedBottom) || selectedShoe === 'oxford';
    if (isTuThan && isTuThanIncompatible) {
      alerts.push({
        id: 'rule_3',
        level: 'orange',
        title: 'Mất chất dân gian',
        message: '💡 Áo tứ thân sinh ra để đi cùng váy đụp thắt lưng ong. Phối cùng quần hiện đại sẽ làm hỏng form dáng mộc mạc.'
      });
    }

    // LUẬT 4: Đại kỵ giày dép (Cổ phục không mang dép lê/xỏ ngón)
    const isDep = selectedShoe === 'dep_le' || selectedShoe === 'dep_xo_ngon';
    if (selectedTop && isDep) {
      alerts.push({
        id: 'rule_4',
        level: 'red',
        title: 'Báo động thẩm mỹ',
        message: '🚨 Cổ phục luôn mang tính lịch sự, trang trọng. Mang dép xỏ ngón/dép lê sẽ phá hỏng hoàn toàn giá trị văn hóa!'
      });
    }

    // LUẬT 5: Khuyến khích Remix
    const isRemixTop = selectedTop === 'ao_ngu_than' || selectedTop === 'ao_dai';
    const isRemixAccOrShoe = 
      selectedAccessories.includes('tai_nghe') || 
      selectedAccessories.includes('kinh_ram') || 
      selectedAccessories.includes('kinh_tron') || 
      selectedShoe === 'sneaker_low';
    // Chỉ kích hoạt khi không bị lỗi nghiêm trọng
    if (isRemixTop && isRemixAccOrShoe && !alerts.some(a => a.level === 'red')) {
      alerts.push({
        id: 'rule_5',
        level: 'green',
        title: 'Remix sáng tạo chuẩn gu',
        message: '✨ Remix phá cách: Giao thoa Tân - Cổ rất tuyệt cho dạo phố, tạo nên vibe Cyber-Cổ phục cực chất!'
      });
    }

    return alerts;
  }, [selectedTop, selectedBottom, selectedAccessories, selectedShoe]);

  // Bộ preset ngẫu nhiên hoặc chuẩn mực
  const applyPreset = (type: 'traditional' | 'cyber' | 'quanho') => {
    if (type === 'traditional') {
      setSelectedTop('ao_tac');
      setSelectedBottom('quan_lua');
      setSelectedAccessories(['khan_xep']);
      setSelectedShoe('hai_theu');
      setTopColor(COLOR_PALETTE[1]); // Vàng lụa
      setBottomColor(COLOR_PALETTE[4]); // Trắng
    } else if (type === 'cyber') {
      setSelectedTop('ao_ngu_than');
      setSelectedBottom('quan_jeans');
      setSelectedAccessories(['tai_nghe', 'kinh_ram']);
      setSelectedShoe('sneaker_low');
      setTopColor(COLOR_PALETTE[0]); // Đỏ đô
      setBottomColor(COLOR_PALETTE[3]); // Đen
    } else if (type === 'quanho') {
      setSelectedTop('ao_tu_than');
      setSelectedBottom('vay_dup');
      setSelectedAccessories(['non_quai_thao']);
      setSelectedShoe('guoc_moc');
      setTopColor(COLOR_PALETTE[2]); // Xanh ngọc
      setBottomColor(COLOR_PALETTE[3]); // Đen thâm
    }
  };

  const handleRandomize = () => {
    const randomTop = TOPS[Math.floor(Math.random() * TOPS.length)].id;
    const randomBottom = BOTTOMS[Math.floor(Math.random() * BOTTOMS.length)].id;
    const randomShoe = SHOES[Math.floor(Math.random() * SHOES.length)].id;
    const randomColor1 = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
    const randomColor2 = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
    
    // Ngẫu nhiên chọn 0 đến 2 phụ kiện từ các nhóm khác nhau
    const groups: AccessoryGroup[] = ['doi_dau', 'kinh', 'trang_suc', 'tui_xach'];
    const count = Math.floor(Math.random() * 3); // 0, 1 hoặc 2 món
    const shuffledGroups = [...groups].sort(() => 0.5 - Math.random()).slice(0, count);
    const randomAccs: string[] = [];
    shuffledGroups.forEach(grp => {
      const itemsInGrp = ACCESSORIES.filter(a => a.accGroup === grp);
      if (itemsInGrp.length > 0) {
        randomAccs.push(itemsInGrp[Math.floor(Math.random() * itemsInGrp.length)].id);
      }
    });

    setSelectedTop(randomTop);
    setSelectedBottom(randomBottom);
    setSelectedAccessories(randomAccs);
    setSelectedShoe(randomShoe);
    setTopColor(randomColor1);
    setBottomColor(randomColor2);
  };

  const currentTopItem = TOPS.find(i => i.id === selectedTop);
  const currentBottomItem = BOTTOMS.find(i => i.id === selectedBottom);
  const currentAccItems = ACCESSORIES.filter(i => selectedAccessories.includes(i.id));
  const currentShoeItem = SHOES.find(i => i.id === selectedShoe);
  const hasClasped = true;
  const hasWideSleeve = selectedTop === 'ao_tac' || selectedTop === 'ao_nhat_binh';

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col font-sans text-neutral-800">
      {/* HEADER */}
      <header className="bg-white/95 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-50 px-4 lg:px-8 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-800 via-amber-600 to-amber-400 flex items-center justify-center text-white shadow-sm font-bold text-lg">
            VP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg lg:text-xl font-bold tracking-tight text-neutral-900 font-serif">
                Việt phục Remix
              </h1>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-full font-semibold border border-neutral-200">
                Gen Z Edition
              </span>
            </div>
            <p className="text-xs text-neutral-500 hidden sm:block">
              Phối đồ cổ phục & thời trang hiện đại • Hệ thống chuẩn mực văn hóa
            </p>
          </div>
        </div>

        {/* Action presets and Back button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white shadow-xs transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quay lại</span>
          </button>
          <button
            onClick={() => applyPreset('cyber')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition"
            title="Áo ngũ thân + Jeans + Headphone"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Vibe Cyber
          </button>
          <button
            onClick={() => applyPreset('traditional')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition"
            title="Áo tấc + Quần lụa + Hài thêu"
          >
            <BookOpen className="w-3.5 h-3.5 text-rose-700" />
            Lễ Nghi
          </button>
          <button
            onClick={handleRandomize}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition active:scale-95"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Phối ngẫu nhiên</span>
            <span className="xs:hidden">Random</span>
          </button>
        </div>
      </header>

      {/* AI RECOMMENDATION RESULT BANNER */}
      <div className="bg-gradient-to-r from-amber-50 via-rose-50/40 to-amber-50 border-b border-amber-200/90 px-4 lg:px-8 py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100/90 px-2.5 py-0.5 rounded-full border border-rose-200">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                Gemini AI Stylist
              </span>

              {initialOutfit.weatherInfo && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-900 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                  <CloudSun className="w-3.5 h-3.5 text-sky-600" />
                  <span>{initialOutfit.weatherInfo.icon} {initialOutfit.weatherInfo.locationName} ({initialOutfit.weatherInfo.date}): {initialOutfit.weatherInfo.avgTemp}°C • {initialOutfit.weatherInfo.weatherDesc}</span>
                </span>
              )}

              {initialOutfit.contextEvent && (
                <span className="text-xs text-neutral-600">
                  Bối cảnh: <strong className="text-neutral-900 font-semibold">{initialOutfit.contextEvent}</strong>
                  {initialOutfit.eventDate && <span className="ml-1 text-neutral-500">({initialOutfit.eventDate})</span>}
                </span>
              )}
            </div>

            {initialOutfit.stylingTitle && (
              <div className="text-sm font-bold text-neutral-900 font-serif flex items-center gap-1.5">
                <span>✨</span>
                <span>{initialOutfit.stylingTitle}</span>
              </div>
            )}

            <p className="text-sm font-semibold text-neutral-900">
              Màn hình phối đồ - Trang phục AI gợi ý là:{' '}
              <code className="text-xs sm:text-sm font-mono font-medium bg-white px-2.5 py-1 rounded-md border border-amber-300 text-amber-950 inline-block shadow-2xs mt-1 sm:mt-0">
                {JSON.stringify({
                  top: initialOutfit.top,
                  bottom: initialOutfit.bottom,
                  shoes: initialOutfit.shoes,
                  accessories: initialOutfit.accessories
                })}
              </code>
            </p>

            {initialOutfit.aiReasoning && (
              <p className="text-xs text-neutral-600 italic">
                💡 {initialOutfit.aiReasoning}
              </p>
            )}
          </div>

          <button
            onClick={onBack}
            className="self-start sm:self-center px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0 active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Quay lại
          </button>
        </div>
      </div>

      {/* MAIN CONTAINER: 2 CỘT (40% PREVIEW - 60% CONTROLS) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-0">
        
        {/* CỘT TRÁI (LIVE PREVIEW - 40% ~ 5/12) */}
        <section className="lg:col-span-5 bg-white rounded-3xl border border-neutral-200 p-4 lg:p-6 shadow-sm flex flex-col items-center relative isolate overflow-hidden">
          
          {/* Header Preview & Tên Outfit */}
          <div className="w-full flex items-center justify-between pb-3 border-b border-neutral-100 mb-2">
            <div>
              <span className="text-[11px] font-semibold text-rose-700 tracking-wider uppercase">
                Khung Hình Thời Trang
              </span>
              <h2 className="text-sm font-bold text-neutral-900 truncate">
                {currentTopItem?.name} × {currentBottomItem?.name}
              </h2>
            </div>
            {/* LỰA CHỌN GIỚI TÍNH & NÚT RESET */}
            <div className="flex items-center gap-1.5">
              <div className="bg-neutral-100 p-0.5 rounded-xl flex items-center text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                    gender === 'female'
                      ? 'bg-white text-rose-700 shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                  title="Avatar Nữ"
                >
                  <span>👩</span>
                  <span className="text-[11px]">Nữ</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                    gender === 'male'
                      ? 'bg-white text-sky-700 shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                  title="Avatar Nam"
                >
                  <span>👨</span>
                  <span className="text-[11px]">Nam</span>
                </button>
              </div>

              <button
                onClick={() => applyPreset('cyber')}
                title="Khôi phục mặc định"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* VÙNG AVATAR SVG CANVAS (TẤT CẢ DÙNG CHUNG VIEWBOX 0 0 300 600) */}
          <div className="relative isolate w-full max-w-[320px] aspect-[1/2] bg-radial from-neutral-50 to-neutral-200/70 rounded-2xl border border-neutral-200/80 shadow-inner flex items-center justify-center p-2 overflow-hidden">
            
            {/* Lưới sàn thẩm mỹ tối giản */}
            <div className="absolute bottom-6 inset-x-8 h-8 rounded-[100%] bg-neutral-300/40 blur-[3px] pointer-events-none" />

            {/* Z-INDEX 10: BASE AVATAR THEO GIỚI TÍNH & TƯ THẾ (Chắp tay cho tất cả trang phục) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              <BaseAvatarSvg gender={gender} isClasped={hasClasped} />
            </div>

            {/* Z-INDEX 20: QUẦN / VÁY */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              <BottomSvg itemId={selectedBottom} color={bottomColor.hex} gender={gender} />
            </div>

            {/* Z-INDEX 30: ÁO NGOÀI (ĐÈ LÊN HÔNG QUẦN) */}
            <div className="absolute inset-0 z-30 pointer-events-none">
              <TopSvg itemId={selectedTop} color={topColor.hex} gender={gender} isClasped={hasClasped} />
            </div>

            {/* Z-INDEX 25/35: BÀN TAY (KHỚP NỐI CHUẨN XÁC VỚI CỬA TAY ÁO) */}
            <div className={`absolute inset-0 pointer-events-none ${hasWideSleeve ? 'z-[25]' : 'z-[35]'}`}>
              <HandsSvg gender={gender} isClasped={hasClasped} />
            </div>

            {/* Z-INDEX 32: GIÀY DÉP */}
            <div className="absolute inset-0 z-[32] pointer-events-none">
              <ShoeSvg itemId={selectedShoe} />
            </div>

            {/* Z-INDEX 40: PHỤ KIỆN (NGOÀI CÙNG - HỖ TRỢ ĐA PHỤ KIỆN, ĐƯỢC CÔ LẬP TRONG STACKING CONTEXT) */}
            <div className="absolute inset-0 z-40 pointer-events-none">
              <AccessorySvg itemIds={selectedAccessories} />
            </div>
          </div>

          {/* CHÚ THÍCH CÁC MÓN ĐỒ ĐANG MẶC TRÊN NGƯỜI */}
          <div className="w-full mt-4 pt-3 border-t border-neutral-100">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: topColor.hex }} />
                <div className="truncate">
                  <div className="text-[10px] text-neutral-400 font-medium">Áo</div>
                  <div className="font-semibold text-neutral-800 truncate">{currentTopItem?.name}</div>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: bottomColor.hex }} />
                <div className="truncate">
                  <div className="text-[10px] text-neutral-400 font-medium">Hạ phục</div>
                  <div className="font-semibold text-neutral-800 truncate">{currentBottomItem?.name}</div>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center gap-2">
                <Glasses className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <div className="truncate">
                  <div className="text-[10px] text-neutral-400 font-medium">
                    Phụ kiện ({selectedAccessories.length})
                  </div>
                  <div 
                    className="font-semibold text-neutral-800 truncate"
                    title={currentAccItems.length > 0 ? currentAccItems.map(i => i.name).join(', ') : 'Không dùng'}
                  >
                    {selectedAccessories.length === 0 ? 'Không chọn' : currentAccItems.map(i => i.name).join(', ')}
                  </div>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center gap-2">
                <Footprints className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <div className="truncate">
                  <div className="text-[10px] text-neutral-400 font-medium">Giày dép</div>
                  <div className="font-semibold text-neutral-800 truncate">{currentShoeItem?.name}</div>
                </div>
              </div>
            </div>
          </div>

          {/* HỆ THỐNG CẢNH BÁO VĂN HÓA (ALERTS HIỂN THỊ NỔI BẬT) */}
          <div className="w-full mt-4 space-y-2">
            {culturalAlerts.map(alert => (
              <div
                key={alert.id}
                className={`p-3 rounded-2xl border text-xs transition-all animate-fadeIn ${
                  alert.level === 'red'
                    ? 'bg-rose-50 border-rose-200 text-rose-900 shadow-xs'
                    : alert.level === 'orange'
                    ? 'bg-amber-50 border-amber-200 text-amber-900 shadow-xs'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-900 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {alert.level === 'red' && <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                  {alert.level === 'orange' && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
                  {alert.level === 'green' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                  <div className="flex-1">
                    <div className="font-bold mb-0.5 flex items-center justify-between">
                      <span>{alert.title}</span>
                      <span className="text-[10px] uppercase tracking-wider font-semibold opacity-75">
                        {alert.level === 'red' ? 'Nghiêm cấm' : alert.level === 'orange' ? 'Cân nhắc' : 'Khen ngợi'}
                      </span>
                    </div>
                    <p className="leading-relaxed opacity-95">{alert.message}</p>
                  </div>
                </div>
              </div>
            ))}

            {culturalAlerts.length === 0 && (
              <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-500 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-neutral-400" />
                <span>Phối đồ hài hòa, không vi phạm các quy tắc văn hóa cổ phục.</span>
              </div>
            )}
          </div>
        </section>

        {/* CỘT PHẢI (CONTROL PANEL - 60% ~ 7/12) */}
        <section className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200 p-4 lg:p-6 shadow-sm flex flex-col">
          
          {/* 4 TABS: ÁO, QUẦN/VÁY, PHỤ KIỆN, GIÀY DÉP */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-2xl mb-6">
            <button
              onClick={() => setActiveTab('ao')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'ao'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <Shirt className="w-3.5 h-3.5" />
              <span>ÁO</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-neutral-200/60 ml-0.5">{TOPS.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('quan')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'quan'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>QUẦN / VÁY</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-neutral-200/60 ml-0.5">{BOTTOMS.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('phukien')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'phukien'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <Glasses className="w-3.5 h-3.5" />
              <span>PHỤ KIỆN</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ml-0.5 ${
                selectedAccessories.length > 0 ? 'bg-rose-100 text-rose-700 font-bold' : 'bg-neutral-200/60'
              }`}>
                {selectedAccessories.length > 0 ? `${selectedAccessories.length} chọn` : ACCESSORIES.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('giay')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'giay'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <Footprints className="w-3.5 h-3.5" />
              <span>GIÀY DÉP</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-neutral-200/60 ml-0.5">{SHOES.length}</span>
            </button>
          </div>

          {/* BẢNG CHỌN MÀU (CHO ÁO HOẶC QUẦN) */}
          {(activeTab === 'ao' || activeTab === 'quan') && (
            <div className="mb-6 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-rose-700" />
                  <span className="text-xs font-bold text-neutral-800">
                    Bảng màu sắc {activeTab === 'ao' ? 'Áo' : 'Quần/Váy'} (5 Gam màu biểu trưng)
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-neutral-500">
                  Đang chọn: {activeTab === 'ao' ? topColor.name : bottomColor.name}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                {COLOR_PALETTE.map(color => {
                  const isSelected = (activeTab === 'ao' ? topColor.id : bottomColor.id) === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => {
                        if (activeTab === 'ao') setTopColor(color);
                        else setBottomColor(color);
                      }}
                      className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                        isSelected 
                          ? 'bg-white border-neutral-900 shadow-xs ring-2 ring-neutral-900/10' 
                          : 'bg-white/60 border-neutral-200 hover:bg-white text-neutral-600'
                      }`}
                    >
                      <span 
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0 shadow-xs group-hover:scale-110 transition"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* DANH SÁCH MÓN ĐỒ THEO TAB */}
          <div className="flex-1 space-y-3 overflow-y-auto max-h-[580px] pr-1">
            {activeTab === 'ao' && TOPS.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                isSelected={selectedTop === item.id}
                onSelect={() => setSelectedTop(item.id)}
                onOpenInfo={() => setInfoItem(item)}
                colorHex={selectedTop === item.id ? topColor.hex : undefined}
              />
            ))}

            {activeTab === 'quan' && BOTTOMS.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                isSelected={selectedBottom === item.id}
                onSelect={() => setSelectedBottom(item.id)}
                onOpenInfo={() => setInfoItem(item)}
                colorHex={selectedBottom === item.id ? bottomColor.hex : undefined}
              />
            ))}

            {activeTab === 'phukien' && (
              <div className="space-y-4">
                {/* THANH ĐIỀU KHIỂN & TRẠNG THÁI CHỌN PHỤ KIỆN */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-neutral-50 to-rose-50/40 border border-neutral-200/90 flex items-center justify-between shadow-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-900">
                        Đang phối: <span className="text-rose-700 font-extrabold">{selectedAccessories.length} phụ kiện</span>
                      </span>
                      <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-neutral-200/70 text-neutral-600 font-semibold">
                        Tối đa 1 món / nhóm
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      {selectedAccessories.length === 0 
                        ? 'Chưa chọn phụ kiện nào (bấm vào món để đeo lên avatar)'
                        : `Đã chọn: ${currentAccItems.map(i => i.name).join(' + ')}`}
                    </p>
                  </div>

                  {selectedAccessories.length > 0 && (
                    <button
                      onClick={clearAllAccessories}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-rose-700 hover:text-white hover:bg-rose-600 border border-rose-300 hover:border-rose-600 transition flex items-center gap-1 shadow-2xs"
                      title="Bỏ tất cả phụ kiện trên người"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Bỏ chọn hết</span>
                    </button>
                  )}
                </div>

                {/* DANH SÁCH PHÂN THEO CÁC NHÓM PHỤ KIỆN (ĐỘI ĐẦU, KÍNH, TRANG SỨC, CẦM TAY) */}
                {ACCESSORY_GROUPS.map(group => {
                  const itemsInGroup = ACCESSORIES.filter(item => item.accGroup === group.id);
                  const selectedInGroup = itemsInGroup.find(item => selectedAccessories.includes(item.id));

                  return (
                    <div key={group.id} className="p-3 rounded-2xl bg-neutral-50/60 border border-neutral-200/70 space-y-2.5">
                      {/* Tiêu đề nhóm */}
                      <div className="flex items-center justify-between px-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                            {group.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-white border border-neutral-200 text-neutral-500 font-semibold">
                            {itemsInGroup.length} tùy chọn
                          </span>
                        </div>
                        {selectedInGroup ? (
                          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                            <span className="truncate max-w-[130px]">✓ {selectedInGroup.name}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleAccessory(selectedInGroup.id);
                              }}
                              className="hover:text-rose-600 hover:bg-emerald-100/60 p-0.5 rounded-full transition"
                              title="Gỡ phụ kiện này"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-neutral-400 font-medium">Chưa chọn</span>
                        )}
                      </div>

                      {/* Danh sách món đồ trong nhóm */}
                      <div className="space-y-2">
                        {itemsInGroup.map(item => {
                          const isSelected = selectedAccessories.includes(item.id);
                          return (
                            <ItemCard
                              key={item.id}
                              item={item}
                              isSelected={isSelected}
                              onSelect={() => toggleAccessory(item.id)}
                              onOpenInfo={() => setInfoItem(item)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'giay' && SHOES.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                isSelected={selectedShoe === item.id}
                onSelect={() => setSelectedShoe(item.id)}
                onOpenInfo={() => setInfoItem(item)}
              />
            ))}
          </div>

          {/* FOOTER TIP VĂN HÓA NHANH */}
          <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-neutral-400" />
              Tọa độ viewBox 300×600 xếp lớp chính xác theo chuẩn phục chế
            </span>
            <span>Gen Z x Cổ phong Việt</span>
          </div>
        </section>
      </main>

      {/* POPUP / MODAL CHI TIẾT LỊCH SỬ KHI BẤM NÚT (i) */}
      {infoItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-100 relative animate-scaleUp">
            <button
              onClick={() => setInfoItem(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-rose-800 mb-2">
              <BookOpen className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-bold">Lược sử văn hóa trang phục</span>
            </div>

            <h3 className="text-xl font-bold text-neutral-900 font-serif mb-1">
              {infoItem.name}
            </h3>

            <div className="inline-block px-2.5 py-0.5 bg-neutral-100 text-neutral-600 rounded-md text-xs font-medium mb-3">
              Thời kỳ: {infoItem.era}
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed mb-4">
              {infoItem.desc}
            </p>

            <div className="bg-rose-50/70 border border-rose-100 rounded-2xl p-4 text-xs text-neutral-800 leading-relaxed">
              <div className="font-semibold text-rose-900 mb-1 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-rose-700" />
                Nguồn gốc & Ý nghĩa biểu trưng:
              </div>
              <p>{infoItem.history}</p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setInfoItem(null)}
                className="px-4 py-2 text-xs font-semibold bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// MÀN HÌNH 1: ONBOARDING (CHỌN BỐI CẢNH & GỢI Ý VỚI GEMINI & THỜI TIẾT)
// ==========================================
interface OnboardingScreenProps {
  onStartRecommendation: (event: string, eventDate: string, location: string, preferredTop: string) => void;
}

const PRESET_EVENT_TAGS = [
  { label: 'Đi chụp ảnh Tết', icon: '🏮' },
  { label: 'Dự lễ tốt nghiệp', icon: '🎓' },
  { label: 'Dạo phố cuối tuần', icon: '☕' },
  { label: 'Dự sự kiện truyền thống', icon: '🏛️' },
  { label: 'Đi xem concert rap', icon: '🎤' },
  { label: 'Đi trà đá vỉa hè', icon: '🍵' },
];

const PREFERRED_TOP_OPTIONS = [
  { id: 'auto', label: 'Để AI tự chọn', desc: 'Gemini AI phân tích bối cảnh & thời tiết để chọn loại áo tối ưu' },
  { id: 'ao_dai', label: 'Áo dài', desc: 'Áo dài tân thời duyên dáng, thướt tha' },
  { id: 'ao_ngu_than', label: 'Áo ngũ thân', desc: 'Ngũ thân tay chẽn gọn gàng, đĩnh đạc' },
  { id: 'ao_tac', label: 'Áo tấc', desc: 'Lễ phục uy nghiêm, tay thụng rộng sang trọng' },
  { id: 'ao_nhat_binh', label: 'Áo Nhật Bình', desc: 'Trang phục cung đình hoàng gia lộng lẫy' },
];

const POPULAR_LOCATIONS = [
  { id: 'Hà Nội', name: 'Hà Nội', badge: 'Thủ đô ngàn năm' },
  { id: 'TP. Hồ Chí Minh', name: 'TP. Hồ Chí Minh', badge: 'Năng động' },
  { id: 'Huế', name: 'Cố đô Huế', badge: 'Hoàng cung' },
  { id: 'Đà Nẵng', name: 'Đà Nẵng / Hội An', badge: 'Phố cổ & Biển' },
  { id: 'Đà Lạt', name: 'Đà Lạt', badge: 'Se lạnh sương mù' },
  { id: 'Sa Pa', name: 'Sa Pa', badge: 'Vùng cao Tây Bắc' },
  { id: 'Ninh Bình', name: 'Ninh Bình', badge: 'Cố đô Hoa Lư' },
];

function getTomorrowDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
}

function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

function getWeekendString(): string {
  const d = new Date();
  const day = d.getDay();
  const daysUntilSaturday = (6 - day + 7) % 7 || 7;
  const weekend = new Date(d);
  weekend.setDate(d.getDate() + daysUntilSaturday);
  return weekend.toISOString().slice(0, 10);
}

function OnboardingScreen({ onStartRecommendation }: OnboardingScreenProps) {
  const [eventInput, setEventInput] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>(getTomorrowDateString());
  const [location, setLocation] = useState<string>('Hà Nội');
  const [preferredTop, setPreferredTop] = useState<string>('auto');

  // Preview thời tiết nhanh khi người dùng chọn ngày & địa điểm
  const [weatherPreview, setWeatherPreview] = useState<WeatherInfo | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(false);

  // Tự động kiểm tra thời tiết khi đổi ngày hoặc địa điểm
  React.useEffect(() => {
    let isCancelled = false;
    async function loadWeatherPreview() {
      setIsLoadingWeather(true);
      try {
        const res = await fetch('/api/weather', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date: eventDate, location }),
        });
        if (res.ok) {
          const data = await res.json();
          if (!isCancelled && data.success && data.weather) {
            setWeatherPreview(data.weather);
            setIsLoadingWeather(false);
            return;
          }
        }
      } catch {
        // Dự báo thời tiết cục bộ nếu offline
      }
      if (!isCancelled) {
        setWeatherPreview({
          locationName: location,
          date: eventDate,
          weatherDesc: 'Trời nắng nhẹ, mát mẻ thuận lợi',
          icon: '🌤️',
          condition: 'partly_cloudy',
          tempMin: 22,
          tempMax: 29,
          avgTemp: 26,
          rainProb: 0,
          windSpeed: 8,
          summary: `${location}, ngày ${eventDate}: 🌤️ Trời nắng nhẹ, mát mẻ, nhiệt độ 26°C (22°C - 29°C), xác suất mưa 0%`,
        });
        setIsLoadingWeather(false);
      }
    }

    loadWeatherPreview();
    return () => {
      isCancelled = true;
    };
  }, [eventDate, location]);

  const handleSelectTag = (tag: string) => {
    setEventInput(tag);
  };

  const isFormValid = eventInput.trim().length > 0 && eventDate.length > 0;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isFormValid) return;
    onStartRecommendation(eventInput.trim(), eventDate, location, preferredTop);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-amber-50/20 to-neutral-100 flex flex-col font-sans text-neutral-800">
      {/* Top minimal header */}
      <header className="px-4 lg:px-8 py-3.5 flex items-center justify-between border-b border-neutral-200/80 bg-white/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-800 via-amber-600 to-amber-400 flex items-center justify-center text-white shadow-xs font-bold text-base">
            VP
          </div>
          <div>
            <h1 className="text-base font-bold text-neutral-900 font-serif leading-none">
              Việt phục Remix
            </h1>
            <span className="text-[10px] text-neutral-500 font-medium">Gemini AI Stylist & Weather Intelligence</span>
          </div>
        </div>
        <div className="text-xs text-neutral-500 hidden sm:block">
          Bước 1 / 2: Chọn bối cảnh & kiểm tra thời tiết
        </div>
      </header>

      {/* Main onboarding form */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl w-full bg-white rounded-3xl border border-neutral-200/80 shadow-xl p-6 sm:p-10 space-y-7">
          {/* Header Title */}
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200/60 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              Gemini AI Stylist & Dự Báo Thời Tiết Thực Tế
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-neutral-900 tracking-tight">
              Bạn muốn mặc Việt phục đi đâu?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto">
              Nhập sự kiện và chọn ngày diễn ra. AI sẽ kết nối dự báo thời tiết và phân tích quy chuẩn di sản để sáng tạo set đồ Việt phục Remix tối ưu nhất.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PHẦN 1 - GỢI Ý SỰ KIỆN (TAGS/CHIPS) */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Phần 1: Gợi ý sự kiện
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_EVENT_TAGS.map(tag => {
                  const isSelected = eventInput === tag.label;
                  return (
                    <button
                      key={tag.label}
                      type="button"
                      onClick={() => handleSelectTag(tag.label)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-rose-700 text-white shadow-xs scale-102 ring-2 ring-rose-700/20'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80 hover:text-neutral-900'
                      }`}
                    >
                      <span>{tag.icon}</span>
                      <span>{tag.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PHẦN 2 - TỰ NHẬP SỰ KIỆN (INPUT FIELD) */}
            <div className="space-y-2">
              <label htmlFor="custom-event" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Phần 2: Tự nhập sự kiện
              </label>
              <div className="relative">
                <input
                  id="custom-event"
                  type="text"
                  value={eventInput}
                  onChange={e => setEventInput(e.target.value)}
                  placeholder="Ví dụ: Đi xem concert rap, Đi trà đá vỉa hè, Đi chụp ảnh cổ phong..."
                  className="w-full px-4 py-3 text-sm sm:text-base rounded-2xl border border-neutral-300 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 outline-none transition bg-neutral-50/50 hover:bg-white focus:bg-white text-neutral-900 placeholder:text-neutral-400"
                />
                {eventInput && (
                  <button
                    type="button"
                    onClick={() => setEventInput('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* PHẦN MỚI: CHỌN NGÀY DIỄN RA SỰ KIỆN & ĐỊA ĐIỂM (DÙNG ĐỂ KIỂM TRA THỜI TIẾT) */}
            <div className="space-y-3 p-4.5 rounded-2xl bg-amber-50/60 border border-amber-200/80">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-700" />
                  <span>Ngày diễn ra sự kiện & Địa điểm (Kiểm tra thời tiết)</span>
                </label>
                <span className="text-[11px] font-medium text-amber-700 bg-amber-100/90 px-2 py-0.5 rounded-md">
                  Weather API
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Chọn ngày sự kiện */}
                <div className="space-y-1.5">
                  <label htmlFor="event-date" className="block text-[11px] font-semibold text-neutral-700">
                    Chọn ngày diễn ra:
                  </label>
                  <input
                    id="event-date"
                    type="date"
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300/80 bg-white text-sm text-neutral-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                  {/* Nút bấm nhanh ngày */}
                  <div className="flex gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setEventDate(getTodayDateString())}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                        eventDate === getTodayDateString()
                          ? 'bg-amber-700 text-white border-amber-700'
                          : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      Hôm nay
                    </button>
                    <button
                      type="button"
                      onClick={() => setEventDate(getTomorrowDateString())}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                        eventDate === getTomorrowDateString()
                          ? 'bg-amber-700 text-white border-amber-700'
                          : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      Ngày mai
                    </button>
                    <button
                      type="button"
                      onClick={() => setEventDate(getWeekendString())}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                        eventDate === getWeekendString()
                          ? 'bg-amber-700 text-white border-amber-700'
                          : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      Cuối tuần
                    </button>
                  </div>
                </div>

                {/* Chọn địa điểm tổ chức */}
                <div className="space-y-1.5">
                  <label htmlFor="event-location" className="block text-[11px] font-semibold text-neutral-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Địa điểm / Thành phố:</span>
                  </label>
                  <select
                    id="event-location"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300/80 bg-white text-sm text-neutral-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  >
                    {POPULAR_LOCATIONS.map(loc => (
                      <option key={loc.id} value={loc.name}>
                        {loc.name} ({loc.badge})
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-neutral-500 leading-tight pt-1">
                    Hệ thống sẽ gọi API thời tiết theo tọa độ thực tế của địa điểm này.
                  </p>
                </div>
              </div>

              {/* Hộp Preview thời tiết trực tiếp */}
              <div className="mt-2.5 p-3 rounded-xl bg-white/90 border border-amber-200 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-lg shrink-0">
                    {isLoadingWeather ? <Loader2 className="w-4 h-4 text-sky-600 animate-spin" /> : (weatherPreview?.icon || '🌤️')}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-neutral-900 truncate">
                      {location} • {eventDate}
                    </div>
                    <div className="text-[11px] text-neutral-600 truncate">
                      {isLoadingWeather
                        ? 'Đang kiểm tra thời tiết...'
                        : `${weatherPreview?.weatherDesc || 'Nắng nhẹ'} • Nhiệt độ: ${weatherPreview?.avgTemp || 26}°C • Mưa: ${weatherPreview?.rainProb || 0}%`}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0 pl-2">
                  <span className="text-xs font-bold text-amber-900">
                    {weatherPreview ? `${weatherPreview.avgTemp}°C` : '26°C'}
                  </span>
                </div>
              </div>
            </div>

            {/* PHẦN 3 - SỞ THÍCH TRANG PHỤC (DROPDOWN/RADIO) */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Phần 3: Sở thích trang phục
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PREFERRED_TOP_OPTIONS.map(opt => {
                  const isChecked = preferredTop === opt.id;
                  return (
                    <label
                      key={opt.id}
                      onClick={() => setPreferredTop(opt.id)}
                      className={`flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'border-amber-600 bg-amber-50/70 shadow-xs ring-1 ring-amber-600/30'
                          : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="preferredTop"
                        value={opt.id}
                        checked={isChecked}
                        onChange={() => setPreferredTop(opt.id)}
                        className="mt-0.5 text-rose-700 focus:ring-rose-500 h-4 w-4"
                      />
                      <div className="flex-1">
                        <div className="text-xs sm:text-sm font-semibold text-neutral-900">
                          {opt.label}
                        </div>
                        <div className="text-[11px] text-neutral-500 leading-snug mt-0.5">
                          {opt.desc}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* NÚT CTA: AI GỢI Ý TRANG PHỤC */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-3.5 px-6 rounded-2xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
                  isFormValid
                    ? 'bg-gradient-to-r from-rose-700 via-rose-600 to-amber-600 hover:from-rose-800 hover:to-amber-700 text-white shadow-lg shadow-rose-900/20 active:scale-[0.99] cursor-pointer'
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                <span>AI Gợi ý Trang Phục (Phân tích Bối cảnh & Thời tiết)</span>
              </button>
              {!isFormValid && (
                <p className="text-center text-xs text-neutral-400 mt-2">
                  * Vui lòng chọn hoặc tự nhập bối cảnh sự kiện và chọn ngày để kích hoạt nút gợi ý
                </p>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

// ==========================================
// MÀN HÌNH 2: LOADING (GEMINI AI & WEATHER ANALYZING)
// ==========================================
function LoadingScreen({ 
  eventText, 
  eventDate, 
  location 
}: { 
  eventText: string; 
  eventDate: string; 
  location: string;
}) {
  const [stepIndex, setStepIndex] = useState<number>(0);

  React.useEffect(() => {
    const t1 = setTimeout(() => setStepIndex(1), 700);
    const t2 = setTimeout(() => setStepIndex(2), 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const steps = [
    { text: `Đang gọi API thời tiết kiểm tra ngày ${eventDate} tại ${location}...`, icon: CloudSun },
    { text: 'Đang gửi dữ liệu bối cảnh và quy chuẩn di sản đến Gemini AI...', icon: BookOpen },
    { text: 'Gemini AI đang sáng tạo bản phối Việt phục Remix hoàn hảo...', icon: Sparkles },
  ];

  const CurrentIcon = steps[stepIndex]?.icon || Sparkles;

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-amber-50/30 to-neutral-100 flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200/80 shadow-2xl max-w-md w-full flex flex-col items-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-800 via-amber-600 to-amber-400 flex items-center justify-center text-white shadow-md animate-bounce">
            <CurrentIcon className="w-8 h-8" />
          </div>
          <div className="absolute -inset-2 rounded-3xl bg-rose-500/10 animate-ping -z-10" />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold font-serif text-neutral-900 mb-2">
          AI đang phân tích bối cảnh và chọn trang phục...
        </h2>

        <p className="text-xs sm:text-sm text-neutral-500 mb-4">
          Tích hợp dữ liệu thời tiết thực tế và quy chuẩn di sản cổ phục cho:
        </p>

        <div className="space-y-1.5 w-full mb-5">
          <div className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 font-semibold text-sm max-w-full truncate shadow-2xs">
            "{eventText || 'Bối cảnh sự kiện'}"
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
            <span>📅 {eventDate}</span>
            <span>•</span>
            <span>📍 {location}</span>
          </div>
        </div>

        {/* Dynamic step info */}
        <div className="w-full text-left p-3 rounded-xl bg-neutral-50 border border-neutral-200/60 mb-5 text-xs text-neutral-700 flex items-center gap-2">
          <Loader2 className="w-4 h-4 text-rose-700 animate-spin shrink-0" />
          <span className="font-medium animate-fadeIn">{steps[stepIndex]?.text}</span>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden relative">
          <div 
            className="bg-gradient-to-r from-rose-700 via-amber-500 to-rose-700 h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: stepIndex === 0 ? '35%' : stepIndex === 1 ? '70%' : '95%' }}
          />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// ROOT COMPONENT: QUẢN LÝ LUỒNG CHUYỂN MÀN HÌNH
// ==========================================
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('ONBOARDING');
  const [chosenEvent, setChosenEvent] = useState<string>('');
  const [chosenDate, setChosenDate] = useState<string>(getTomorrowDateString());
  const [chosenLocation, setChosenLocation] = useState<string>('Hà Nội');
  const [initialOutfit, setInitialOutfit] = useState<OutfitRecommendation>({
    top: 'ao_ngu_than',
    bottom: 'quan_jeans',
    shoes: 'sneaker_low',
    accessories: ['tai_nghe', 'kinh_ram'],
  });

  const handleStartRecommendation = async (
    event: string, 
    eventDate: string, 
    location: string, 
    preferredTop: string
  ) => {
    setChosenEvent(event);
    setChosenDate(eventDate);
    setChosenLocation(location);
    setCurrentScreen('LOADING');

    const startTime = Date.now();

    try {
      // Gọi API full-stack: kiểm tra thời tiết + phân tích Gemini AI
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event,
          eventDate,
          location,
          preferredTop,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.outfit) {
          // Đảm bảo loading hiển thị tối thiểu 1.2s để người dùng quan sát hiệu ứng phân tích
          const elapsed = Date.now() - startTime;
          const remainingDelay = Math.max(0, 1400 - elapsed);
          setTimeout(() => {
            setInitialOutfit(data.outfit);
            setCurrentScreen('MIX_MATCH');
          }, remainingDelay);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend API unavailable, using client-side fallback:', err);
    }

    // Dự phòng khi gọi API mạng gặp lỗi hoặc chạy preview client-only
    setTimeout(() => {
      const fallbackOutfit = mockAIEngine(event, eventDate, location, preferredTop);
      setInitialOutfit(fallbackOutfit);
      setCurrentScreen('MIX_MATCH');
    }, 1800);
  };

  const handleBackToOnboarding = () => {
    setCurrentScreen('ONBOARDING');
  };

  if (currentScreen === 'ONBOARDING') {
    return <OnboardingScreen onStartRecommendation={handleStartRecommendation} />;
  }

  if (currentScreen === 'LOADING') {
    return (
      <LoadingScreen 
        eventText={chosenEvent} 
        eventDate={chosenDate} 
        location={chosenLocation} 
      />
    );
  }

  return (
    <MixMatchScreen
      initialOutfit={initialOutfit}
      onBack={handleBackToOnboarding}
    />
  );
}

// --- ITEM CARD COMPONENT ---
interface ItemCardProps {
  item: ItemData;
  isSelected: boolean;
  onSelect: () => void;
  onOpenInfo: () => void;
  colorHex?: string;
}

function ItemCard({ item, isSelected, onSelect, onOpenInfo, colorHex }: ItemCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`group relative flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
        isSelected
          ? 'bg-rose-50/30 border-rose-600 ring-2 ring-rose-600/10 shadow-xs'
          : 'bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 pr-2">
        <div 
          className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition ${
            isSelected 
              ? 'border-rose-600 bg-rose-600 text-white' 
              : 'border-neutral-300 bg-neutral-50 text-transparent'
          }`}
        >
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-neutral-900 truncate">
              {item.name}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-500 font-medium shrink-0">
              {item.era}
            </span>
          </div>
          <p className="text-xs text-neutral-500 truncate mt-0.5">
            {item.desc}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
        {colorHex && (
          <span 
            className="w-4 h-4 rounded-full border border-black/10 shadow-xs" 
            style={{ backgroundColor: colorHex }} 
            title="Màu hiện tại"
          />
        )}
        <button
          onClick={onOpenInfo}
          title="Xem nguồn gốc lịch sử"
          className="p-1.5 rounded-xl text-neutral-400 hover:text-rose-700 hover:bg-rose-50 transition"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// =========================================================================
// SVG ASSETS GENERATION - FLAT MINIMALIST GEOMETRIC STYLE
// TẤT CẢ DÙNG CHUNG HỆ TỌA ĐỘ viewBox="0 0 300 600"
// =========================================================================

// 1. BASE AVATAR (z-index 10) - Tọa độ cân đối trung tâm theo Giới tính (Nam / Nữ) & Tư thế (Thả lỏng / Chắp tay)
function BaseAvatarSvg({ gender, isClasped = false }: { gender: 'female' | 'male'; isClasped?: boolean }) {
  const isMale = gender === 'male';

  return (
    <svg viewBox="0 0 300 600" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* LỚP 1: TÓC DÀI NỮ BUÔNG SAU LƯNG (Vẽ ĐẦU TIÊN để nằm hoàn toàn sau đầu, sau tai và sau lưng) */}
      {!isMale && (
        <g>
          {/* Suối tóc dài đen óng ả buông xõa từ sau gáy buông dài xuống hai bên vai đến hông (y=80..270) */}
          {/* Lọn tóc buông bên trái ngoài vai */}
          <path 
            d="M130 80 C114 125 106 180 104 270 C104 275 118 275 118 270 C118 180 126 135 134 80 Z" 
            fill="#201A19" 
          />
          {/* Lọn tóc buông bên phải ngoài vai */}
          <path 
            d="M170 80 C186 125 194 180 196 270 C196 275 182 275 182 270 C182 180 174 135 166 80 Z" 
            fill="#201A19" 
          />
          {/* Mảng tóc sau gáy và lưng mềm mại */}
          <path 
            d="M130 80 C120 140 114 200 112 272 C130 276 170 276 188 272 C186 200 180 140 170 80 Z" 
            fill="#140F0E" 
          />
        </g>
      )}

      {/* LỚP 2: ĐẦU (Vẽ đè lên tóc sau lưng để toàn bộ khuôn mặt hoàn toàn sáng tỏ, không bị che khuất) */}
      <circle cx="150" cy="95" r={isMale ? 28 : 26} fill="#F3D3BD" />

      {/* LỚP 3: CỔ */}
      <rect x={isMale ? 143 : 144} y="118" width={isMale ? 14 : 12} height="24" rx="3" fill="#E8C3AC" />

      {/* LỚP 4: THÂN TRÊN (Vai & Ngực: Nam vai rộng x=106..194, Nữ thon thả x=110..190) */}
      <path 
        d={isMale ? "M106 142 L194 142 L180 285 L120 285 Z" : "M110 142 L190 142 L178 285 L122 285 Z"} 
        fill="#F3D3BD" 
      />

      {/* LỚP 5: TÓC ĐỈNH ĐẦU (Chỉ ôm trán trên và đỉnh đầu y=66..86, TUYỆT ĐỐI KHÔNG CHE NỬA MẶT DƯỚI) */}
      {isMale ? (
        // Tóc Nam: Tóc ngắn gọn gàng hoặc búi tó nam tính thời xưa
        <g>
          <path d="M123 92 C123 62 177 62 177 92 L177 98 L170 98 L170 86 C170 70 130 70 130 86 L130 98 L123 98 Z" fill="#221C1B" />
          <path d="M125 78 C135 66 160 66 175 76 C160 70 138 72 125 78 Z" fill="#171211" />
          <circle cx="150" cy="65" r="7" fill="#221C1B" />
        </g>
      ) : (
        // Tóc Nữ: Mái tóc bồng bềnh phủ che trọn vẹn phần trán, buông suối tóc dài nữ tính phía sau
        <g>
          {/* Mái tóc đỉnh đầu và tóc mái phủ che kín trọn vẹn phần trán (y=64..86.5) */}
          <path 
            d="M124 90 C123 64 177 64 176 90 C173 87 170 85 166 85.5 C160 86.5 155 86.8 150 86.8 C145 86.8 140 86.5 134 85.5 C130 85 127 87 124 90 Z" 
            fill="#241E1D" 
          />
          {/* Lọn tóc mái uốn cong mềm mại phủ kín trán */}
          <path 
            d="M126 88 C132 84 140 85 150 85 C160 85 168 84 174 88 C172 82 165 72 150 72 C135 72 128 82 126 88 Z" 
            fill="#1B1615" 
          />
          {/* Ánh bóng tóc óng ả trên đỉnh đầu */}
          <path 
            d="M134 73 C142 69 158 69 166 73 C158 71 142 71 134 73 Z" 
            fill="#3F3432" 
            opacity="0.85" 
          />
          {/* Tóc mai hai bên ôm nhẹ gò má ngoài */}
          <path d="M124 90 C123 96 125 105 127 112 C128 112 128.5 106 127.5 98 C126.8 93 125.5 91 124 90 Z" fill="#201A19" />
          <path d="M176 90 C177 96 175 105 173 112 C172 112 171.5 106 172.5 98 C173.2 93 174.5 91 176 90 Z" fill="#201A19" />
          {/* Trâm cài tóc ngọc hoa đỏ tinh tế */}
          <circle cx="166" cy="74" r="2.5" fill="#D4A345" />
          <circle cx="169" cy="72" r="1.5" fill="#E11D48" />
        </g>
      )}

      {/* CÁNH TAY & BÀN TAY: HỖ TRỢ 2 DÁNG (CHẮP TAY CHO ÁO TẤC/NHẬT BÌNH & THẢ LỎNG CHO ÁO KHÁC) */}
      {isClasped ? (
        <g>
          {/* Cánh tay trái cong tròn qua khuỷu (62..74, 226) chắp hướng về giữa bụng */}
          <path 
            d={isMale 
              ? "M106 142 L72 214 Q62 226 74 238 L136 268 L144 250 L86 216 L120 156 Z" 
              : "M110 142 L76 214 Q66 226 78 238 L136 268 L144 252 L88 216 L122 156 Z"} 
            fill="#E8C3AC" 
          />
          {/* Cánh tay phải cong tròn qua khuỷu (226..238, 226) chắp hướng về giữa bụng */}
          <path 
            d={isMale 
              ? "M194 142 L228 214 Q238 226 226 238 L164 268 L156 250 L214 216 L180 156 Z" 
              : "M190 142 L224 214 Q234 226 222 238 L164 268 L156 252 L212 216 L178 156 Z"} 
            fill="#E8C3AC" 
          />
          {/* Hai bàn tay chắp cung kính lồng vào nhau ở trung tâm bụng */}
          <path 
            d="M136 262 C136 250 164 250 164 262 C164 274 153 277 150 277 C147 277 136 274 136 262 Z" 
            fill="#F3D3BD" 
          />
          <path d="M142 258 Q150 263 158 258" stroke="#E2BAA1" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M141 263 Q150 268 159 263" stroke="#E2BAA1" strokeWidth="0.9" fill="none" strokeLinecap="round" />
          <path d="M143 268 Q150 272 157 268" stroke="#E2BAA1" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        </g>
      ) : (
        <g>
          {/* Cánh tay trái: Từ vai buông tự nhiên với khuỷu tay uốn tròn mềm mại xuống cổ tay (y=320) */}
          <path 
            d={isMale 
              ? "M106 142 L86 214 Q81 230 86 246 L88 320 L104 320 L104 230 L120 156 Z" 
              : "M110 142 L89 214 Q85 230 88 246 L90 320 L104 320 L104 230 L122 156 Z"} 
            fill="#E8C3AC" 
          />
          {/* Bàn tay trái nhô ra tự nhiên từ cổ tay (y=320..342) */}
          <path 
            d={isMale 
              ? "M88 320 L104 320 L103 342 C101 346 91 346 89 342 Z" 
              : "M90 320 L104 320 L103 340 C101 344 93 344 91 340 Z"} 
            fill="#F3D3BD" 
          />

          {/* Cánh tay phải: Từ vai buông tự nhiên với khuỷu tay uốn tròn mềm mại xuống cổ tay (y=320) */}
          <path 
            d={isMale 
              ? "M194 142 L214 214 Q219 230 214 246 L212 320 L196 320 L196 230 L180 156 Z" 
              : "M190 142 L211 214 Q215 230 212 246 L210 320 L196 320 L196 230 L178 156 Z"} 
            fill="#E8C3AC" 
          />
          {/* Bàn tay phải nhô ra tự nhiên từ cổ tay (y=320..342) */}
          <path 
            d={isMale 
              ? "M196 320 L212 320 L211 342 C209 346 199 346 197 342 Z" 
              : "M196 320 L210 320 L209 340 C207 344 199 344 197 340 Z"} 
            fill="#F3D3BD" 
          />
        </g>
      )}

      {/* Hông */}
      <rect x="122" y="278" width="56" height="22" rx="4" fill="#E2BAA1" />

      {/* Chân trái */}
      <path d="M125 295 L144 295 L140 535 L127 535 Z" fill="#F3D3BD" />
      {/* Chân phải */}
      <path d="M156 295 L175 295 L173 535 L160 535 Z" fill="#E8C3AC" />

      {/* Bàn chân trần */}
      <path d="M127 535 L140 535 L143 548 L122 548 Z" fill="#E2BAA1" />
      <path d="M160 535 L173 535 L178 548 L157 548 Z" fill="#E2BAA1" />

      {/* Chi tiết mặt theo giới tính (Được vẽ rõ nét, không bị che khuất) */}
      {isMale ? (
        <g>
          {/* Lông mày ngang nam tính */}
          <line x1="138" y1="88" x2="147" y2="88" stroke="#372722" strokeWidth="2" strokeLinecap="round" />
          <line x1="153" y1="88" x2="162" y2="88" stroke="#372722" strokeWidth="2" strokeLinecap="round" />
          <circle cx="142.5" cy="94" r="2" fill="#372722" />
          <circle cx="157.5" cy="94" r="2" fill="#372722" />
          {/* Môi nam tối giản */}
          <line x1="146" y1="105" x2="154" y2="105" stroke="#C57E6B" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ) : (
        <g>
          {/* Lông mày lá liễu nữ tính cong nhẹ */}
          <path d="M139 89 Q143 87 147 89" stroke="#4A3B32" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <path d="M153 89 Q157 87 161 89" stroke="#4A3B32" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          {/* Mắt bồ câu đen láy */}
          <circle cx="143" cy="94" r="2" fill="#372722" />
          <circle cx="157" cy="94" r="2" fill="#372722" />
          {/* Phấn má hồng e ấp */}
          <circle cx="136" cy="99" r="4" fill="#F43F5E" fillOpacity="0.2" />
          <circle cx="164" cy="99" r="4" fill="#F43F5E" fillOpacity="0.2" />
          {/* Môi son duyên dáng tươi tắn, hoàn toàn sáng tỏ ở nửa mặt dưới */}
          <path d="M147 105 Q150 108 153 105" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      )}
    </svg>
  );
}

// 2. QUẦN / VÁY (z-index 20)
interface BottomSvgProps {
  itemId: string;
  color: string;
  gender: 'female' | 'male';
}

function BottomSvg({ itemId, color, gender }: BottomSvgProps) {
  const isMale = gender === 'male';

  return (
    <svg viewBox="0 0 300 600" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 2.1 QUẦN LỤA ỐNG RỘNG (Nam ống đứng rộng thẳng đực / Nữ suông mềm rủ xòe) */}
      {itemId === 'quan_lua' && (
        <g>
          {/* Cạp quần */}
          <path d={isMale ? "M114 280 L186 280 L188 318 L112 318 Z" : "M118 280 L182 280 L186 315 L114 315 Z"} fill={color} />
          {/* Ống quần trái */}
          <path d={isMale ? "M112 318 L148 318 L146 535 L108 535 Z" : "M114 315 L148 315 L146 535 L104 535 Z"} fill={color} />
          {/* Ống quần phải */}
          <path d={isMale ? "M152 318 L188 318 L192 535 L154 535 Z" : "M152 315 L186 315 L196 535 L154 535 Z"} fill={color} />
          {/* Đường bóng nếp gấp lụa */}
          <path d={isMale ? "M128 322 L127 530 M172 322 L173 530" : "M124 320 L120 530 M176 320 L180 530"} stroke="#000" strokeOpacity="0.15" strokeWidth="2" />
        </g>
      )}

      {/* 2.2 VÁY ĐỤP THÂM (Nữ: Dáng váy đụp phồng xòe truyền thống / Nam: Phom váy đụp / khố lụa sĩ tử dân gian) */}
      {itemId === 'vay_dup' && (
        <g>
          <path 
            d={isMale 
              ? "M116 280 C110 320 102 380 100 485 L200 485 C198 380 190 320 184 280 Z" 
              : "M120 280 C110 320 96 380 92 485 L208 485 C204 380 190 320 180 280 Z"} 
            fill={color === '#F8FAFC' ? '#3B3A36' : color} 
          />
          <path d="M135 285 Q130 380 128 482 M165 285 Q170 380 172 482" stroke="#000" strokeOpacity="0.2" strokeWidth="2.5" />
          <path d="M150 285 L150 484" stroke="#000" strokeOpacity="0.15" strokeWidth="2" />
        </g>
      )}

      {/* 2.3 QUẦN JEANS SUÔNG (Nam: Relaxed baggy / Nữ: High-waist straight fit) */}
      {itemId === 'quan_jeans' && (
        <g>
          <path d={isMale ? "M114 280 L186 280 L188 322 L112 322 Z" : "M118 280 L182 280 L184 320 L116 320 Z"} fill={color} />
          <path d={isMale ? "M112 320 L148 320 L145 532 L114 532 Z" : "M116 315 L148 315 L145 530 L118 530 Z"} fill={color} />
          <path d={isMale ? "M152 320 L188 320 L186 532 L155 532 Z" : "M152 315 L184 315 L182 530 L155 530 Z"} fill={color} />
          <path d="M125 282 Q132 295 125 305 M175 282 Q168 295 175 305" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="2 1" />
          <path d="M131 526 L145 526 M155 526 L169 526" stroke="#F59E0B" strokeWidth="1.5" />
        </g>
      )}

      {/* 2.4 QUẦN KAKI SUÔNG (Nam: Chinos ống đứng nam tính / Nữ: Tapered thon thả) */}
      {itemId === 'quan_kaki' && (
        <g>
          <path d={isMale ? "M114 280 L186 280 L187 320 L113 320 Z" : "M119 280 L181 280 L183 318 L117 318 Z"} fill={color} />
          <path d={isMale ? "M113 318 L148 318 L146 532 L116 532 Z" : "M117 316 L148 316 L146 532 L120 532 Z"} fill={color} />
          <path d={isMale ? "M152 318 L187 318 L184 532 L154 532 Z" : "M152 316 L183 316 L180 532 L154 532 Z"} fill={color} />
          <line x1={isMale ? "131" : "133"} y1="318" x2={isMale ? "131" : "133"} y2="528" stroke="#000" strokeOpacity="0.15" strokeWidth="1.5" />
          <line x1={isMale ? "169" : "167"} y1="318" x2={isMale ? "169" : "167"} y2="528" stroke="#000" strokeOpacity="0.15" strokeWidth="1.5" />
        </g>
      )}

      {/* 2.5 CHÂN VÁY XẾP LY MAXI */}
      {itemId === 'vay_xep_ly' && (
        <g>
          <path d={isMale ? "M116 280 L184 280 L200 525 L100 525 Z" : "M120 280 L180 280 L204 525 L96 525 Z"} fill={color} />
          {[112, 126, 140, 150, 160, 174, 188].map((x, i) => (
            <line key={i} x1={120 + i * 8.5} y1="280" x2={(isMale ? 100 : 96) + i * 15.5} y2="525" stroke="#000" strokeOpacity="0.18" strokeWidth="1.5" />
          ))}
        </g>
      )}

      {/* 2.6 QUẦN SHORT (Nam: Bermuda ngang đầu gối / Nữ: Short đùi năng động) */}
      {itemId === 'quan_short' && (
        <g>
          {isMale ? (
            <path d="M114 280 L186 280 L189 420 L154 420 L150 345 L146 420 L111 420 Z" fill={color} />
          ) : (
            <path d="M118 280 L182 280 L185 365 L153 365 L150 330 L147 365 L115 365 Z" fill={color} />
          )}
          <line x1={isMale ? "111" : "115"} y1={isMale ? "415" : "360"} x2={isMale ? "146" : "147"} y2={isMale ? "415" : "360"} stroke="#000" strokeOpacity="0.2" strokeWidth="2" />
          <line x1={isMale ? "154" : "153"} y1={isMale ? "415" : "360"} x2={isMale ? "189" : "185"} y2={isMale ? "415" : "360"} stroke="#000" strokeOpacity="0.2" strokeWidth="2" />
        </g>
      )}

      {/* 2.7 VÁY NGẮN CHỮ A */}
      {itemId === 'vay_ngan' && (
        <g>
          <path d={isMale ? "M116 280 L184 280 L198 395 L102 395 Z" : "M120 280 L180 280 L195 375 L105 375 Z"} fill={color} />
          <line x1={isMale ? "104" : "108"} y1={isMale ? "390" : "370"} x2={isMale ? "196" : "192"} y2={isMale ? "390" : "370"} stroke="#000" strokeOpacity="0.15" strokeWidth="2" />
        </g>
      )}
    </svg>
  );
}

// 3. ÁO NGOÀI (z-index 40) - ĐÈ LÊN PHẦN HÔNG VÀ CẠP QUẦN
interface TopSvgProps {
  itemId: string;
  color: string;
  gender: 'female' | 'male';
  isClasped?: boolean;
}

function TopSvg({ itemId, color, gender, isClasped = false }: TopSvgProps) {
  const isMale = gender === 'male';

  return (
    <svg viewBox="0 0 300 600" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 4.1 ÁO DÀI TÂN THỜI (Nam: Suông đứng chữ A đĩnh đạc / Nữ: Chiết eo tôn dáng) */}
      {itemId === 'ao_dai' && (
        <g>
          {isMale ? (
            // ÁO DÀI NAM: Phom suông đứng chữ A thẳng tắp, không chiết eo, cổ cao lập lĩnh nam quyền, vạt áo rộng phẳng
            <g>
              {/* Cổ áo đứng cao lập lĩnh nam */}
              <path d="M138 130 L162 130 L160 144 L140 144 Z" fill={color} stroke="#000" strokeOpacity="0.15" />
              <line x1="150" y1="130" x2="150" y2="144" stroke="#D4A345" strokeWidth="1" />
              {/* Tay áo dài nam: Che kín toàn bộ cánh tay, ôm khít cổ tay */}
              <path d="M104 140 L70 213 Q59 226 72 240 L135 271 L146 248 L84 214 L121 158 Z" fill={color} />
              <line x1="135" y1="271" x2="146" y2="248" stroke="#000" strokeOpacity="0.2" strokeWidth="1.5" />
              {/* Tay áo phải nam */}
              <path d="M196 140 L230 213 Q241 226 228 240 L165 271 L154 248 L216 214 L179 158 Z" fill={color} />
              <line x1="165" y1="271" x2="154" y2="248" stroke="#000" strokeOpacity="0.2" strokeWidth="1.5" />
              {/* Hai bàn tay chắp cung kính giữa hai cửa tay áo dài nam */}
              <g>
                <path d="M136 262 C136 250 164 250 164 262 C164 274 153 277 150 277 C147 277 136 274 136 262 Z" fill="#F3D3BD" />
                <path d="M142 258 Q150 263 158 258" stroke="#E2BAA1" strokeWidth="1" fill="none" strokeLinecap="round" />
                <path d="M141 263 Q150 268 159 263" stroke="#E2BAA1" strokeWidth="0.9" fill="none" strokeLinecap="round" />
              </g>
              {/* Thân áo nam thẳng đứng (KHÔNG CHIẾT EO) */}
              <path d="M104 141 L196 141 L188 260 L112 260 Z" fill={color} />
              {/* Tà áo nam rộng phẳng buông đứng oai nghiêm */}
              <path d="M112 260 L188 260 L194 485 L106 485 Z" fill={color} />
              {/* Cúc áo nam & nẹp cài vạt lệch đĩnh đạc */}
              <path d="M148 144 L165 155 L165 240" stroke="#D4A345" strokeWidth="1.5" fill="none" />
              <circle cx="165" cy="165" r="2.2" fill="#D4A345" />
              <circle cx="165" cy="195" r="2.2" fill="#D4A345" />
              <circle cx="165" cy="225" r="2.2" fill="#D4A345" />
              <line x1="116" y1="262" x2="114" y2="480" stroke="#000" strokeOpacity="0.15" strokeWidth="2" />
              <line x1="184" y1="262" x2="186" y2="480" stroke="#000" strokeOpacity="0.15" strokeWidth="2" />
            </g>
          ) : (
            // ÁO DÀI NỮ: Chiết eo tôn dáng, che kín toàn bộ thân trên và tay vừa vặn, không quá rộng
            <g>
              <path d="M140 133 L160 133 L158 145 L142 145 Z" fill={color} stroke="#000" strokeOpacity="0.1" />
              {/* Tay áo ôm thon nữ: Che phủ toàn bộ cánh tay vừa vặn, mép cổ tay ôm sát bàn tay chắp */}
              <path d="M108 140 L74 213 Q63 226 76 240 L135 271 L146 250 L86 214 L123 158 Z" fill={color} />
              <line x1="135" y1="271" x2="146" y2="250" stroke="#000" strokeOpacity="0.18" strokeWidth="1.2" />
              {/* Tay áo phải nữ: Che phủ toàn bộ cánh tay vừa vặn, mép cổ tay ôm sát bàn tay chắp */}
              <path d="M192 140 L226 213 Q237 226 224 240 L165 271 L154 250 L214 214 L177 158 Z" fill={color} />
              <line x1="165" y1="271" x2="154" y2="250" stroke="#000" strokeOpacity="0.18" strokeWidth="1.2" />
              {/* Hai bàn tay chắp cung kính giữa hai cửa tay áo dài nữ */}
              <g>
                <path d="M136 262 C136 250 164 250 164 262 C164 274 153 277 150 277 C147 277 136 274 136 262 Z" fill="#F3D3BD" />
                <path d="M142 258 Q150 263 158 258" stroke="#E2BAA1" strokeWidth="1" fill="none" strokeLinecap="round" />
                <path d="M141 263 Q150 268 159 263" stroke="#E2BAA1" strokeWidth="0.9" fill="none" strokeLinecap="round" />
                <path d="M143 268 Q150 272 157 268" stroke="#E2BAA1" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                <circle cx="137" cy="261" r="2.5" fill="#059669" />
              </g>
              {/* Thân áo nữ: Che phủ toàn bộ thân trên của avatar, lượn eo duyên dáng (118..182 tại y=258), không lộ da thịt */}
              <path d="M108 141 L192 141 L182 258 L118 258 Z" fill={color} />
              {/* Tà áo dài buông thướt tha, che kín hông và đùi */}
              <path d="M118 258 L182 258 L185 485 L115 485 Z" fill={color} />
              <path d="M146 144 Q165 152 170 175" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="1 3" />
              <circle cx="168" cy="172" r="2" fill="#D4A345" />
              <path d="M121 258 L117 483 M179 258 L183 483" stroke="#000" strokeOpacity="0.12" strokeWidth="1.5" />
            </g>
          )}
        </g>
      )}

      {/* 4.2 ÁO TỨ THÂN (Nam: Áo cánh tứ thân mộc mạc đai lưng / Nữ: Yếm đào lưng ong thắt nơ vạt) */}
      {itemId === 'ao_tu_than' && (
        <g>
          {isMale ? (
            // ÁO CÁNH TỨ THÂN NAM
            <g>
              <path d="M134 140 L166 140 L174 200 L168 280 L132 280 L126 200 Z" fill="#F1E5D1" />
              <path d="M144 135 C146 130 154 130 156 135 L160 146 L140 146 Z" fill="#E6D5B8" />
              <path d="M112 260 L188 260 L192 460 L108 460 Z" fill={color} />
              <line x1="150" y1="260" x2="150" y2="458" stroke="#000" strokeOpacity="0.2" strokeWidth="2" />
              {/* Tay áo tứ thân nam: Che kín toàn bộ cánh tay, ôm khít cổ tay */}
              <path d="M104 140 L70 213 Q59 226 72 240 L135 271 L146 248 L84 214 L121 158 Z" fill={color} />
              <line x1="135" y1="271" x2="146" y2="248" stroke="#000" strokeOpacity="0.18" strokeWidth="1.5" />
              <path d="M196 140 L230 213 Q241 226 228 240 L165 271 L154 248 L216 214 L179 158 Z" fill={color} />
              <line x1="165" y1="271" x2="154" y2="248" stroke="#000" strokeOpacity="0.18" strokeWidth="1.5" />
              {/* Hai bàn tay chắp cung kính giữa hai cửa tay áo tứ thân nam */}
              <g>
                <path d="M136 262 C136 250 164 250 164 262 C164 274 153 277 150 277 C147 277 136 274 136 262 Z" fill="#F3D3BD" />
                <path d="M142 258 Q150 263 158 258" stroke="#E2BAA1" strokeWidth="1" fill="none" strokeLinecap="round" />
                <path d="M141 263 Q150 268 159 263" stroke="#E2BAA1" strokeWidth="0.9" fill="none" strokeLinecap="round" />
              </g>
              <path d="M106 142 L138 146 L142 270 L112 270 Z" fill={color} />
              <path d="M194 142 L162 146 L158 270 L188 270 Z" fill={color} />
              <rect x="110" y="262" width="80" height="14" rx="2" fill="#78350F" />
              <rect x="144" y="262" width="12" height="14" fill="#92400E" />
              <path d="M132 276 L146 276 L144 355 L130 355 Z" fill={color} stroke="#000" strokeOpacity="0.15" />
              <path d="M154 276 L168 276 L170 355 L156 355 Z" fill={color} stroke="#000" strokeOpacity="0.15" />
            </g>
          ) : (
            // ÁO TỨ THÂN NỮ: Vạt sau và hai vạt trước che kín toàn bộ thân trên của avatar, yếm đào ở giữa, tay áo ôm khít vừa vặn
            <g>
              {/* Vạt sau áo tứ thân: Che phủ toàn bộ thân trên của avatar phía sau yếm, không lộ da thịt */}
              <path d="M108 141 L192 141 L182 260 L118 260 Z" fill={color} />
              {/* Cổ yếm & thân yếm đào duyên dáng */}
              <path d="M142 126 C145 120 155 120 158 126 L165 146 L135 146 Z" fill="#E11D48" />
              <path d="M141 132 Q150 140 159 132" stroke="#FFE4E6" strokeWidth="1.2" fill="none" />
              <path d="M128 144 L172 144 L180 200 L172 282 L128 282 L120 200 Z" fill="#BE123C" />
              <line x1="150" y1="146" x2="150" y2="280" stroke="#FDA4AF" strokeWidth="1" strokeOpacity="0.4" />
              {/* Váy đổng dưới */}
              <path d="M116 260 L184 260 L190 460 L110 460 Z" fill={color} />
              <line x1="150" y1="260" x2="150" y2="458" stroke="#000" strokeOpacity="0.2" strokeWidth="1.5" />
              {/* Tay áo tứ thân nữ: Che kín toàn bộ cánh tay vừa vặn, mép cổ tay ôm sát bàn tay chắp */}
              <path d="M108 140 L74 213 Q63 226 76 240 L135 271 L146 250 L86 214 L123 158 Z" fill={color} />
              <line x1="135" y1="271" x2="146" y2="250" stroke="#000" strokeOpacity="0.15" strokeWidth="1.2" />
              <path d="M192 140 L226 213 Q237 226 224 240 L165 271 L154 250 L214 214 L177 158 Z" fill={color} />
              <line x1="165" y1="271" x2="154" y2="250" stroke="#000" strokeOpacity="0.15" strokeWidth="1.2" />
              {/* Hai bàn tay chắp cung kính giữa hai cửa tay áo tứ thân nữ */}
              <g>
                <path d="M136 262 C136 250 164 250 164 262 C164 274 153 277 150 277 C147 277 136 274 136 262 Z" fill="#F3D3BD" />
                <path d="M142 258 Q150 263 158 258" stroke="#E2BAA1" strokeWidth="1" fill="none" strokeLinecap="round" />
                <path d="M141 263 Q150 268 159 263" stroke="#E2BAA1" strokeWidth="0.9" fill="none" strokeLinecap="round" />
                <circle cx="137" cy="261" r="2.5" fill="#059669" />
              </g>
              {/* Hai vạt trước áo tứ thân buông hai bên ngực */}
              <path d="M108 141 L136 148 L142 268 L114 268 Z" fill={color} />
              <line x1="136" y1="148" x2="142" y2="268" stroke="#000" strokeOpacity="0.18" strokeWidth="2" />
              <path d="M192 141 L164 148 L158 268 L186 268 Z" fill={color} />
              <line x1="164" y1="148" x2="158" y2="268" stroke="#000" strokeOpacity="0.18" strokeWidth="2" />
              {/* Đai thắt lưng lụa bao sáp & ruột tượng */}
              <rect x="114" y="262" width="72" height="12" rx="3" fill="#EC4899" />
              <rect x="118" y="265" width="64" height="6" fill="#F43F5E" />
              <ellipse cx="150" cy="274" rx="7" ry="5.5" fill={color} stroke="#000" strokeOpacity="0.2" />
              <path d="M146 276 C140 300 130 335 125 365 L138 368 C144 335 151 300 152 278 Z" fill={color} stroke="#000" strokeOpacity="0.15" />
              <path d="M154 276 C160 300 170 335 175 365 L162 368 C156 335 149 300 148 278 Z" fill={color} stroke="#000" strokeOpacity="0.15" />
              <path d="M147 274 Q142 308 140 342 L144 342 Q149 308 151 274 Z" fill="#FB7185" />
              <path d="M153 274 Q158 308 160 342 L156 342 Q151 308 149 274 Z" fill="#F43F5E" />
            </g>
          )}
        </g>
      )}

      {/* 4.3 ÁO NGŨ THÂN TAY CHẼN (Dáng chắp tay lễ nghi - Che kín toàn bộ thân trên và cánh tay vừa vặn, không quá rộng) */}
      {itemId === 'ao_ngu_than' && (
        <g>
          {/* Cổ áo lập lĩnh đứng nẹp viền vàng */}
          <path d={isMale ? "M138 130 L162 130 L160 144 L140 144 Z" : "M140 132 L160 132 L159 144 L141 144 Z"} fill={color} stroke="#D4A345" strokeWidth={isMale ? 1.5 : 1} />
          
          {/* Thân áo ngũ thân dài quá gối: Che kín toàn bộ thân trên của avatar (108..192 tại vai, 118..182 tại eo), vừa vặn lịch thiệp */}
          <path d={isMale ? "M104 141 L196 141 L186 260 L188 465 L112 465 L114 260 Z" : "M108 141 L192 141 L182 260 L186 465 L114 465 L118 260 Z"} fill={color} />
          
          {/* Tay áo chẽn trái: Che phủ toàn bộ cánh tay vừa vặn, mép cổ tay ôm sát bàn tay chắp */}
          <path 
            d={isMale 
              ? "M104 140 L70 213 Q59 226 72 240 L135 271 L146 248 L84 214 L121 158 Z" 
              : "M108 140 L74 213 Q63 226 76 240 L135 271 L146 250 L86 214 L123 158 Z"} 
            fill={color} 
          />
          <line x1="135" y1="271" x2="146" y2={isMale ? "248" : "250"} stroke="#D4A345" strokeWidth="1.5" />

          {/* Tay áo chẽn phải: Che phủ toàn bộ cánh tay vừa vặn, mép cổ tay ôm sát bàn tay chắp */}
          <path 
            d={isMale 
              ? "M196 140 L230 213 Q241 226 228 240 L165 271 L154 248 L216 214 L179 158 Z" 
              : "M192 140 L226 213 Q237 226 224 240 L165 271 L154 250 L214 214 L177 158 Z"} 
            fill={color} 
          />
          <line x1="165" y1="271" x2="154" y2={isMale ? "248" : "250"} stroke="#D4A345" strokeWidth="1.5" />

          {/* Hai bàn tay chắp cung kính giữa hai cửa tay áo chẽn */}
          <g>
            <path 
              d="M136 262 C136 250 164 250 164 262 C164 274 153 277 150 277 C147 277 136 274 136 262 Z" 
              fill="#F3D3BD" 
            />
            <path d="M142 258 Q150 263 158 258" stroke="#E2BAA1" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M141 263 Q150 268 159 263" stroke="#E2BAA1" strokeWidth="0.9" fill="none" strokeLinecap="round" />
            <path d="M143 268 Q150 272 157 268" stroke="#E2BAA1" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          </g>

          {/* Hàng khuy cài nẹp áo ngũ thân đặc trưng */}
          <path d="M150 144 L164 152 L164 220" stroke="#D4A345" strokeWidth={isMale ? 2 : 1.5} fill="none" />
          <circle cx="150" cy="144" r={isMale ? 2.5 : 2} fill="#D4A345" />
          <circle cx="160" cy="150" r={isMale ? 2.5 : 2} fill="#D4A345" />
          <circle cx="164" cy="170" r={isMale ? 2.5 : 2} fill="#D4A345" />
          <circle cx="164" cy="195" r={isMale ? 2.5 : 2} fill="#D4A345" />
          <circle cx="164" cy="220" r={isMale ? 2.5 : 2} fill="#D4A345" />
          <line x1={isMale ? "112" : "114"} y1={isMale ? "462" : "461"} x2={isMale ? "188" : "186"} y2={isMale ? "462" : "461"} stroke="#000" strokeOpacity="0.15" strokeWidth="2" />
        </g>
      )}

      {/* 4.4 ÁO TẤC (Tay theo dáng cánh tay chắp, không rũ xuống dưới) */}
      {itemId === 'ao_tac' && (
        <g>
          {/* Cổ áo đứng lập lĩnh cung đình nẹp viền vàng */}
          <path d={isMale ? "M138 130 L162 130 L160 144 L140 144 Z" : "M140 132 L160 132 L159 144 L141 144 Z"} fill={color} stroke="#F59E0B" strokeWidth="1.2" />
          
          {/* Thân áo dài thụng chùng buông thẳng tới ngang ống chân */}
          <path d={isMale ? "M106 142 L194 142 L186 260 L194 480 L106 480 L114 260 Z" : "M110 142 L190 142 L182 260 L190 475 L110 475 L118 260 Z"} fill={color} />
          
          {/* TAY ÁO TẤC TRÁI: Ôm theo dáng cánh tay chắp (không rũ xuống dưới) */}
          <g>
            <path 
              d={isMale 
                ? "M106 142 C82 155 58 190 56 226 C56 250 82 278 136 274 L136 248 C94 230 84 200 120 156 Z" 
                : "M110 142 C86 155 62 190 60 226 C60 250 84 278 136 274 L136 250 C96 230 86 200 122 156 Z"} 
              fill={color} 
            />
            {/* Cửa tay áo trái viền vàng hoàng cung */}
            <line x1="136" y1={isMale ? "248" : "250"} x2="136" y2="274" stroke="#F59E0B" strokeWidth="2" />
            <line x1="134" y1={isMale ? "249" : "251"} x2="134" y2="273" stroke="#000" strokeOpacity="0.2" strokeWidth="1" />
            {/* Nếp gấp vải lụa tấc mềm mại theo cánh tay */}
            <path d="M66 226 C76 254 100 272 134 272" stroke="#000" strokeOpacity="0.15" strokeWidth="1.2" fill="none" />
          </g>

          {/* TAY ÁO TẤC PHẢI: Ôm theo dáng cánh tay chắp (không rũ xuống dưới) */}
          <g>
            <path 
              d={isMale 
                ? "M194 142 C218 155 242 190 244 226 C244 250 218 278 164 274 L164 248 C206 230 216 200 180 156 Z" 
                : "M190 142 C214 155 238 190 240 226 C240 250 216 278 164 274 L164 250 C204 230 214 200 178 156 Z"} 
              fill={color} 
            />
            {/* Cửa tay áo phải viền vàng hoàng cung */}
            <line x1="164" y1={isMale ? "248" : "250"} x2="164" y2="274" stroke="#F59E0B" strokeWidth="2" />
            <line x1="166" y1={isMale ? "249" : "251"} x2="166" y2="273" stroke="#000" strokeOpacity="0.2" strokeWidth="1" />
            {/* Nếp gấp vải lụa tấc mềm mại theo cánh tay */}
            <path d="M234 226 C224 254 200 272 166 272" stroke="#000" strokeOpacity="0.15" strokeWidth="1.2" fill="none" />
          </g>

          {/* HAI BÀN TAY CHẮP LỄ NGHI (HIỂN THỊ TRANG TRỌNG GIỮA HAI CỬA TAY ÁO) */}
          <g>
            <path 
              d="M136 262 C136 250 164 250 164 262 C164 274 153 277 150 277 C147 277 136 274 136 262 Z" 
              fill="#F3D3BD" 
            />
            {/* Các nét ngón tay đan xen lễ nghi */}
            <path d="M142 258 Q150 263 158 258" stroke="#E2BAA1" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M141 263 Q150 268 159 263" stroke="#E2BAA1" strokeWidth="0.9" fill="none" strokeLinecap="round" />
            <path d="M143 268 Q150 272 157 268" stroke="#E2BAA1" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            {/* Vòng ngọc thanh nhã ở cổ tay (Nữ: Ngọc cẩm thạch xanh) */}
            {!isMale && (
              <circle cx="137" cy="261" r="2.5" fill="#059669" />
            )}
          </g>

          {/* Hàng khuy cài cúc ngọc vàng hoàng gia */}
          <circle cx="150" cy="144" r="2.5" fill="#F59E0B" />
          <circle cx="154" cy="165" r="2.5" fill="#F59E0B" />
          <circle cx="154" cy="190" r="2.5" fill="#F59E0B" />
          <circle cx="154" cy="215" r="2.5" fill="#F59E0B" />
          <circle cx="154" cy="238" r="2.5" fill="#F59E0B" />
          
          {/* Đường viền tà áo */}
          <line x1={isMale ? "106" : "110"} y1={isMale ? "476" : "470"} x2={isMale ? "194" : "190"} y2={isMale ? "476" : "470"} stroke="#F59E0B" strokeWidth="2" />
        </g>
      )}

      {/* 4.5 ÁO NHẬT BÌNH / BỔ PHỤC HOÀNG GIA (Chuẩn phục chế theo ảnh tư liệu cung đình: Dáng chắp tay lễ nghi & dải ngũ sắc buông rủ) */}
      {itemId === 'ao_nhat_binh' && (
        <g>
          {isMale ? (
            // BỔ PHỤC HOÀNG GIA TRIỀU NGUYỄN CHO NAM (Dáng chắp tay bệ vệ)
            <g>
              {/* Thân áo bổ phục dài rộng */}
              <path d="M104 142 L196 142 L186 260 L192 475 L108 475 L114 260 Z" fill={color} />
              
              {/* Tay áo thụng trái: Ôm theo dáng cánh tay chắp (không rũ xuống dưới) */}
              <g>
                <path d="M104 142 C80 155 58 190 56 226 C56 250 82 278 136 274 L136 248 C94 230 84 200 120 156 Z" fill={color} />
                <path d="M66 226 C76 254 100 272 134 272" stroke="#000" strokeOpacity="0.18" strokeWidth="1.2" fill="none" />
              </g>
              
              {/* Tay áo thụng phải: Ôm theo dáng cánh tay chắp (không rũ xuống dưới) */}
              <g>
                <path d="M196 142 C220 155 242 190 244 226 C244 250 218 278 164 274 L164 248 C206 230 216 200 180 156 Z" fill={color} />
                <path d="M234 226 C224 254 200 272 166 272" stroke="#000" strokeOpacity="0.18" strokeWidth="1.2" fill="none" />
              </g>

              {/* Dải ngũ sắc hoàng cung ở cửa tay áo chắp */}
              {/* Tay trái ngũ sắc (x=116..136, y=246..274) */}
              <g>
                <rect x="116" y="246" width="4" height="28" fill="#047857" />
                <rect x="120" y="246" width="4" height="28" fill="#F8FAFC" />
                <rect x="124" y="246" width="4" height="28" fill="#0284C7" />
                <rect x="128" y="246" width="4" height="28" fill="#EAB308" />
                <rect x="132" y="246" width="4" height="28" fill="#DC2626" />
                <line x1="116" y1="246" x2="116" y2="274" stroke="#D4A345" strokeWidth="1" />
                <line x1="136" y1="246" x2="136" y2="274" stroke="#D4A345" strokeWidth="1.5" />
              </g>

              {/* Tay phải ngũ sắc đối xứng (x=164..184, y=246..274) */}
              <g>
                <rect x="164" y="246" width="4" height="28" fill="#DC2626" />
                <rect x="168" y="246" width="4" height="28" fill="#EAB308" />
                <rect x="172" y="246" width="4" height="28" fill="#0284C7" />
                <rect x="176" y="246" width="4" height="28" fill="#F8FAFC" />
                <rect x="180" y="246" width="4" height="28" fill="#047857" />
                <line x1="184" y1="246" x2="184" y2="274" stroke="#D4A345" strokeWidth="1" />
                <line x1="164" y1="246" x2="164" y2="274" stroke="#D4A345" strokeWidth="1.5" />
              </g>

              {/* HAI BÀN TAY CHẮP LỄ NGHI GIỮA HAI CỬA TAY */}
              <g>
                <path 
                  d="M136 262 C136 250 164 250 164 262 C164 274 153 277 150 277 C147 277 136 274 136 262 Z" 
                  fill="#F3D3BD" 
                />
                <path d="M142 258 Q150 263 158 258" stroke="#E2BAA1" strokeWidth="1" fill="none" strokeLinecap="round" />
                <path d="M141 263 Q150 268 159 263" stroke="#E2BAA1" strokeWidth="0.9" fill="none" strokeLinecap="round" />
              </g>

              {/* Nẹp cổ bổ phục & Bổ tử rồng oai nghiêm */}
              <path d="M130 142 L170 142 L170 240 L158 240 L158 154 L142 154 L142 240 L130 240 Z" fill="#D4A345" />
              <rect x="136" y="165" width="28" height="28" rx="2" fill="#B45309" stroke="#F59E0B" strokeWidth="1.5" />
              <circle cx="150" cy="179" r="6" fill="#FDE047" />
              <path d="M145 179 Q150 175 155 179" stroke="#B45309" strokeWidth="1.5" fill="none" />
              <circle cx="150" cy="210" r="3" fill="#0284C7" />
              <circle cx="150" cy="235" r="3" fill="#0284C7" />
            </g>
          ) : (
            // ÁO NHẬT BÌNH NỮ (Tái hiện trung thực theo ảnh mẫu phục chế cung đình)
            <g>
              {/* Lớp lót cổ áo trắng bên trong */}
              <path d="M140 126 C144 120 156 120 160 126 L164 140 L136 140 Z" fill="#FFFBEB" stroke="#E2E8F0" strokeWidth="0.8" />
              
              {/* Thân áo Nhật Bình dáng dài buông thẳng */}
              <path d="M106 142 L194 142 L182 260 L190 475 L110 475 L118 260 Z" fill={color} />
              
              {/* HOA VĂN SÓNG NƯỚC THỦY BA TAM SƠN NGŨ SẮC Ở GẤU ÁO (Giống hệt ảnh mẫu) */}
              <g>
                {/* Dải sóng nước tam sơn ở giữa */}
                <path d="M110 440 L190 440 L190 475 L110 475 Z" fill="#0284C7" />
                {/* Đỉnh núi tam sơn */}
                <path d="M136 465 Q150 415 164 465 Z" fill="#0F766E" />
                <path d="M143 465 Q150 425 157 465 Z" fill="#F59E0B" />
                {/* Các dải tia sóng nước ngũ sắc tỏa ra 2 bên */}
                <line x1="114" y1="475" x2="135" y2="440" stroke="#F8FAFC" strokeWidth="2.5" />
                <line x1="120" y1="475" x2="141" y2="440" stroke="#DC2626" strokeWidth="2.5" />
                <line x1="126" y1="475" x2="147" y2="440" stroke="#EAB308" strokeWidth="2.5" />
                <line x1="186" y1="475" x2="165" y2="440" stroke="#F8FAFC" strokeWidth="2.5" />
                <line x1="180" y1="475" x2="159" y2="440" stroke="#DC2626" strokeWidth="2.5" />
                <line x1="174" y1="475" x2="153" y2="440" stroke="#EAB308" strokeWidth="2.5" />
                {/* Viền sóng nước cuộn dưới chân */}
                <path d="M110 472 Q120 467 130 472 Q140 467 150 472 Q160 467 170 472 Q180 467 190 472" stroke="#FEF08A" strokeWidth="1.5" fill="none" />
              </g>

              {/* TAY ÁO THỤNG TRÁI: Ôm theo dáng cánh tay chắp (không rũ xuống dưới) */}
              <g>
                <path 
                  d="M106 142 C82 155 60 190 58 226 C58 250 82 278 136 274 L136 250 C96 230 86 200 122 156 Z" 
                  fill={color} 
                />
                {/* Nếp gấp rủ vải gấm vạt thụng trái mềm mại theo cánh tay */}
                <path d="M66 226 C76 254 100 272 134 272" stroke="#000" strokeOpacity="0.16" strokeWidth="1.2" fill="none" />
              </g>

              {/* TAY ÁO THỤNG PHẢI: Ôm theo dáng cánh tay chắp (không rũ xuống dưới) */}
              <g>
                <path 
                  d="M194 142 C218 155 240 190 242 226 C242 250 218 278 164 274 L164 250 C204 230 214 200 178 156 Z" 
                  fill={color} 
                />
                {/* Nếp gấp rủ vải gấm vạt thụng phải mềm mại theo cánh tay */}
                <path d="M234 226 C224 254 200 272 166 272" stroke="#000" strokeOpacity="0.16" strokeWidth="1.2" fill="none" />
              </g>

              {/* HOA VĂN ĐOÀN HOA / ĐOÀN PHƯỢNG TRÊN VAI VÀ TAY ÁO (Đặc trưng phục chế hoàng tộc) */}
              <g>
                {/* Vai trái */}
                <circle cx="94" cy="190" r="7" fill="none" stroke="#FDE047" strokeWidth="1.2" strokeDasharray="3 1" />
                <circle cx="94" cy="190" r="3.5" fill="#047857" fillOpacity="0.7" />
                {/* Vai phải */}
                <circle cx="206" cy="190" r="7" fill="none" stroke="#FDE047" strokeWidth="1.2" strokeDasharray="3 1" />
                <circle cx="206" cy="190" r="3.5" fill="#047857" fillOpacity="0.7" />
              </g>

              {/* DẢI NGŨ SẮC HOÀNG CUNG Ở CỬA TAY ÁO CHẮP (5 DẢI MÀU ÔM LẤY CỔ TAY) */}
              {/* Cửa tay áo trái (x=116..136, y=246..274) */}
              <g>
                <rect x="116" y="246" width="4" height="28" fill="#047857" />
                <rect x="120" y="246" width="4" height="28" fill="#F8FAFC" />
                <rect x="124" y="246" width="4" height="28" fill="#0284C7" />
                <rect x="128" y="246" width="4" height="28" fill="#EAB308" />
                <rect x="132" y="246" width="4" height="28" fill="#DC2626" />
                <line x1="116" y1="246" x2="116" y2="274" stroke="#F59E0B" strokeWidth="1" />
                <line x1="136" y1="246" x2="136" y2="272" stroke="#F59E0B" strokeWidth="1.8" />
              </g>

              {/* Cửa tay áo phải đối xứng (x=164..184, y=246..274) */}
              <g>
                <rect x="164" y="246" width="4" height="28" fill="#DC2626" />
                <rect x="168" y="246" width="4" height="28" fill="#EAB308" />
                <rect x="172" y="246" width="4" height="28" fill="#0284C7" />
                <rect x="176" y="246" width="4" height="28" fill="#F8FAFC" />
                <rect x="180" y="246" width="4" height="28" fill="#047857" />
                <line x1="184" y1="246" x2="184" y2="274" stroke="#F59E0B" strokeWidth="1" />
                <line x1="164" y1="246" x2="164" y2="272" stroke="#F59E0B" strokeWidth="1.8" />
              </g>

              {/* HAI BÀN TAY CHẮP LỄ NGHI (ĐẶT TRANG TRỌNG GIỮA HAI DẢI NGŨ SẮC HOÀNG CUNG) */}
              <g>
                <path 
                  d="M136 262 C136 250 164 250 164 262 C164 274 153 277 150 277 C147 277 136 274 136 262 Z" 
                  fill="#F3D3BD" 
                />
                <path d="M142 258 Q150 263 158 258" stroke="#E2BAA1" strokeWidth="1" fill="none" strokeLinecap="round" />
                <path d="M141 263 Q150 268 159 263" stroke="#E2BAA1" strokeWidth="0.9" fill="none" strokeLinecap="round" />
                <path d="M143 268 Q150 272 157 268" stroke="#E2BAA1" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                {/* Vòng ngọc cẩm thạch hoàng gia ở cổ tay */}
                <circle cx="137" cy="261" r="2.5" fill="#059669" />
              </g>

              {/* CỔ ÁO NHẬT BÌNH HÌNH CHỮ NHẬT & DẢI HOA VĂN CUNG ĐÌNH */}
              <g>
                {/* Nẹp cổ xanh lam chữ nhật */}
                <path d="M130 140 L170 140 L170 245 L158 245 L158 154 L142 154 L142 245 L130 245 Z" fill="#0369A1" stroke="#F59E0B" strokeWidth="1.2" />
                {/* Họa tiết mây vàng trên nẹp cổ */}
                <path d="M134 148 Q150 144 166 148" stroke="#FEF08A" strokeWidth="1.2" fill="none" />
                <path d="M136 170 Q139 166 142 170 M158 170 Q161 166 164 170" stroke="#FEF08A" strokeWidth="1" fill="none" />
                <path d="M136 195 Q139 191 142 195 M158 195 Q161 191 164 195" stroke="#FEF08A" strokeWidth="1" fill="none" />
                <path d="M136 220 Q139 216 142 220 M158 220 Q161 216 164 220" stroke="#FEF08A" strokeWidth="1" fill="none" />
                
                {/* Khánh ngọc & dải ngọc bội cung đình rủ giữa ngực */}
                <circle cx="150" cy="180" r="5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.2" />
                <circle cx="150" cy="180" r="2.5" fill="#38BDF8" />
                <line x1="150" y1="185" x2="150" y2="238" stroke="#DC2626" strokeWidth="1.5" />
                <circle cx="150" cy="238" r="2" fill="#F59E0B" />
              </g>
            </g>
          )}
        </g>
      )}
    </svg>
  );
}

// 4. BÀN TAY (z-index 45) - Luôn khớp nối chuẩn xác (Hỗ trợ dáng thả lỏng tại y=320 & dáng chắp tay cung kính tại trung tâm bụng)
function HandsSvg({ gender, isClasped = false }: { gender: 'female' | 'male'; isClasped?: boolean }) {
  const isMale = gender === 'male';

  return (
    <svg viewBox="0 0 300 600" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {isClasped ? (
        /* Hai bàn tay chắp cung kính lồng vào nhau ở trung tâm bụng */
        <g>
          <path 
            d="M136 262 C136 250 164 250 164 262 C164 274 153 277 150 277 C147 277 136 274 136 262 Z" 
            fill="#F3D3BD" 
          />
          <path d="M142 258 Q150 263 158 258" stroke="#E2BAA1" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M141 263 Q150 268 159 263" stroke="#E2BAA1" strokeWidth="0.9" fill="none" strokeLinecap="round" />
          <path d="M143 268 Q150 272 157 268" stroke="#E2BAA1" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          {!isMale && (
            <circle cx="137" cy="261" r="2.5" fill="#059669" />
          )}
        </g>
      ) : (
        /* Hai bàn tay buông tự nhiên hai bên hông */
        <g>
          {/* Bàn tay trái nhô ra từ cửa tay áo tại y=320 (Nam: 88..104, Nữ: 90..104) */}
          <g>
            <path 
              d={isMale 
                ? "M88 320 L104 320 L103 342 C101 346 91 346 89 342 Z" 
                : "M90 320 L104 320 L103 340 C101 344 93 344 91 340 Z"} 
              fill="#F3D3BD" 
            />
            {/* Nét ngón tay búp măng tinh tế */}
            <line 
              x1={isMale ? "94" : "95"} 
              y1={isMale ? "330" : "328"} 
              x2={isMale ? "94" : "95"} 
              y2={isMale ? "340" : "338"} 
              stroke="#E2BAA1" 
              strokeWidth={isMale ? "1.2" : "0.8"} 
              strokeLinecap="round" 
            />
            <line 
              x1={isMale ? "98" : "99"} 
              y1={isMale ? "328" : "326"} 
              x2={isMale ? "98" : "99"} 
              y2={isMale ? "342" : "339"} 
              stroke="#E2BAA1" 
              strokeWidth={isMale ? "1.2" : "0.8"} 
              strokeLinecap="round" 
            />
          </g>

          {/* Bàn tay phải nhô ra từ cửa tay áo tại y=320 (Nam: 196..212, Nữ: 196..210) */}
          <g>
            <path 
              d={isMale 
                ? "M196 320 L212 320 L211 342 C209 346 199 346 197 342 Z" 
                : "M196 320 L210 320 L209 340 C207 344 199 344 197 340 Z"} 
              fill="#F3D3BD" 
            />
            {/* Nét ngón tay búp măng tinh tế */}
            <line 
              x1={isMale ? "202" : "201"} 
              y1={isMale ? "328" : "326"} 
              x2={isMale ? "202" : "201"} 
              y2={isMale ? "342" : "339"} 
              stroke="#E2BAA1" 
              strokeWidth={isMale ? "1.2" : "0.8"} 
              strokeLinecap="round" 
            />
            <line 
              x1={isMale ? "206" : "205"} 
              y1={isMale ? "330" : "328"} 
              x2={isMale ? "206" : "205"} 
              y2={isMale ? "340" : "338"} 
              stroke="#E2BAA1" 
              strokeWidth={isMale ? "1.2" : "0.8"} 
              strokeLinecap="round" 
            />
          </g>
        </g>
      )}
    </svg>
  );
}

// 5. GIÀY DÉP (z-index 50)
function ShoeSvg({ itemId }: { itemId: string }) {
  return (
    <svg viewBox="0 0 300 600" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 5.1 GUỐC MỘC TRUYỀN THỐNG (Đế gỗ uốn cong gót, quai vải son) */}
      {itemId === 'guoc_moc' && (
        <g>
          {/* Guốc trái */}
          <path d="M120 540 L145 540 L145 550 C138 550 135 546 128 546 L124 550 L120 550 Z" fill="#92400E" />
          <path d="M125 540 Q132 534 140 540" stroke="#DC2626" strokeWidth="3" fill="none" />
          
          {/* Guốc phải */}
          <path d="M155 540 L180 540 L180 550 C173 550 170 546 163 546 L159 550 L155 550 Z" fill="#92400E" />
          <path d="M160 540 Q167 534 175 540" stroke="#DC2626" strokeWidth="3" fill="none" />
        </g>
      )}

      {/* 5.2 HÀI THÊU HOA VĂN (Mũi cong hoàng cung) */}
      {itemId === 'hai_theu' && (
        <g>
          {/* Hài trái mũi cong */}
          <path d="M122 534 C122 534 144 534 146 542 C146 548 118 548 118 542 C118 538 120 535 122 534 Z" fill="#DC2626" />
          <path d="M116 540 Q118 535 122 536" stroke="#F59E0B" strokeWidth="2" fill="none" />
          <circle cx="132" cy="542" r="1.5" fill="#F59E0B" />

          {/* Hài phải mũi cong */}
          <path d="M154 534 C154 534 176 534 178 542 C178 548 150 548 150 542 C150 538 152 535 154 534 Z" fill="#DC2626" />
          <path d="M180 540 Q178 535 174 536" stroke="#F59E0B" strokeWidth="2" fill="none" />
          <circle cx="164" cy="542" r="1.5" fill="#F59E0B" />
        </g>
      )}

      {/* 5.3 SNEAKER CHUNKY (Đế bánh mì hầm hố hiện đại) */}
      {itemId === 'sneaker_chunky' && (
        <g>
          {/* Sneaker trái dày cộm */}
          <path d="M116 532 L146 532 L148 554 L114 554 Z" fill="#18181B" />
          <path d="M112 546 L150 546 L150 556 L112 556 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          <line x1="124" y1="536" x2="138" y2="536" stroke="#38BDF8" strokeWidth="2" />

          {/* Sneaker phải dày cộm */}
          <path d="M154 532 L184 532 L186 554 L152 554 Z" fill="#18181B" />
          <path d="M150 546 L188 546 L188 556 L150 556 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          <line x1="162" y1="536" x2="176" y2="536" stroke="#38BDF8" strokeWidth="2" />
        </g>
      )}

      {/* 5.4 SNEAKER CỔ THẤP (Minimalist white sneaks) */}
      {itemId === 'sneaker_low' && (
        <g>
          <path d="M120 535 L144 535 L146 550 L118 550 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
          <rect x="117" y="547" width="30" height="4" rx="1" fill="#E2E8F0" />
          <path d="M156 535 L180 535 L182 550 L154 550 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
          <rect x="153" y="547" width="30" height="4" rx="1" fill="#E2E8F0" />
        </g>
      )}

      {/* 5.5 GIÀY OXFORD (Da cổ điển thanh lịch) */}
      {itemId === 'oxford' && (
        <g>
          <path d="M120 534 L144 534 L145 548 L119 548 Z" fill="#451A03" />
          <rect x="119" y="547" width="26" height="3" fill="#18181B" />
          <path d="M127 537 L137 537" stroke="#D97706" strokeWidth="1" strokeDasharray="1 1" />

          <path d="M156 534 L180 534 L181 548 L155 548 Z" fill="#451A03" />
          <rect x="155" y="547" width="26" height="3" fill="#18181B" />
          <path d="M163 537 L173 537" stroke="#D97706" strokeWidth="1" strokeDasharray="1 1" />
        </g>
      )}

      {/* 5.6 GIÀY LOAFER (Lười da hiện đại) */}
      {itemId === 'loafer' && (
        <g>
          <path d="M120 536 L144 536 L145 548 L119 548 Z" fill="#1E293B" />
          <rect x="127" y="538" width="10" height="2" fill="#D4A345" />

          <path d="M156 536 L180 536 L181 548 L155 548 Z" fill="#1E293B" />
          <rect x="163" y="538" width="10" height="2" fill="#D4A345" />
        </g>
      )}

      {/* 5.7 DÉP LÊ (Quai ngang xuề xòa) */}
      {itemId === 'dep_le' && (
        <g>
          {/* Dép trái */}
          <rect x="118" y="545" width="26" height="4" rx="2" fill="#3B82F6" />
          <rect x="123" y="539" width="16" height="5" fill="#1D4ED8" />

          {/* Dép phải */}
          <rect x="156" y="545" width="26" height="4" rx="2" fill="#3B82F6" />
          <rect x="161" y="539" width="16" height="5" fill="#1D4ED8" />
        </g>
      )}

      {/* 5.8 DÉP XỎ NGÓN (Kẹp ngón cao su) */}
      {itemId === 'dep_xo_ngon' && (
        <g>
          <ellipse cx="131" cy="546" rx="12" ry="3" fill="#10B981" />
          <path d="M125 545 L131 539 L137 545" stroke="#047857" strokeWidth="2" fill="none" />

          <ellipse cx="169" cy="546" rx="12" ry="3" fill="#10B981" />
          <path d="M163 545 L169 539 L175 545" stroke="#047857" strokeWidth="2" fill="none" />
        </g>
      )}
    </svg>
  );
}

// 6. PHỤ KIỆN (z-index 60) - NẰM NGOÀI CÙNG (Hỗ trợ 0, 1 hoặc nhiều phụ kiện cùng lúc)
function AccessorySvg({ itemId, itemIds }: { itemId?: string; itemIds?: string[] }) {
  const ids = itemIds ?? (itemId ? [itemId] : []);
  if (ids.length === 0) return null;

  return (
    <svg viewBox="0 0 300 600" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {ids.map(id => (
        <g key={id}>
          {/* 6.1 KHĂN XẾP (Đội ngang đầu theo lớp xếp nếp) */}
          {id === 'khan_xep' && (
            <g>
              <ellipse cx="150" cy="80" rx="30" ry="12" fill="#1E293B" />
              <ellipse cx="150" cy="76" rx="28" ry="10" fill="#0F172A" />
              <path d="M126 80 Q150 86 174 80" stroke="#475569" strokeWidth="1.5" fill="none" />
              <path d="M128 76 Q150 82 172 76" stroke="#475569" strokeWidth="1.5" fill="none" />
            </g>
          )}

          {/* 6.2 KHĂN VẤN (Tóc vấn khăn tròn vành thanh nhã) */}
          {id === 'khan_van' && (
            <g>
              <path 
                d="M120 84 C120 62 180 62 180 84 C175 70 165 66 150 66 C135 66 125 70 120 84 Z" 
                fill="#831843" 
              />
              <ellipse cx="150" cy="72" rx="22" ry="7" fill="#9D174D" />
              <circle cx="166" cy="72" r="2.5" fill="#F59E0B" />
            </g>
          )}

          {/* 6.3 NÓN QUAI THAO (Nón thúng tròn vành to Kinh Bắc) */}
          {id === 'non_quai_thao' && (
            <g>
              <ellipse cx="150" cy="62" rx="75" ry="18" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
              <ellipse cx="150" cy="60" rx="66" ry="14" fill="#FEF3C7" />
              <circle cx="150" cy="58" r="6" fill="#D97706" />
              <path d="M100 66 Q88 160 115 250" stroke="#7C2D12" strokeWidth="2.5" fill="none" />
              <path d="M200 66 Q212 160 185 250" stroke="#7C2D12" strokeWidth="2.5" fill="none" />
              <circle cx="115" cy="252" r="3" fill="#DC2626" />
              <circle cx="185" cy="252" r="3" fill="#DC2626" />
            </g>
          )}

          {/* 6.4 TRÂM CÀI (Trâm vàng cài đầu) */}
          {id === 'tram_cai' && (
            <g>
              <path d="M165 72 L185 58" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="185" cy="58" r="4" fill="#DC2626" />
              <circle cx="183" cy="56" r="2" fill="#F59E0B" />
              <line x1="185" y1="62" x2="185" y2="75" stroke="#F59E0B" strokeWidth="1" />
              <circle cx="185" cy="76" r="1.5" fill="#DC2626" />
            </g>
          )}

          {/* 6.5 KIM KHÁNH (Khánh vàng đeo trước ngực) */}
          {id === 'kim_khanh' && (
            <g>
              <path d="M138 136 Q150 162 162 136" stroke="#DC2626" strokeWidth="1.5" fill="none" />
              <path d="M142 162 Q150 158 158 162 L155 172 Q150 176 145 172 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
              <line x1="150" y1="174" x2="150" y2="194" stroke="#DC2626" strokeWidth="2" />
              <circle cx="150" cy="195" r="2" fill="#DC2626" />
            </g>
          )}

          {/* 6.6 TAI NGHE CHỤP TAI (Cyber Over-ear Headphone Gen Z) */}
          {id === 'tai_nghe' && (
            <g>
              <path d="M120 96 C120 62 180 62 180 96" stroke="#0F172A" strokeWidth="4" fill="none" strokeLinecap="round" />
              <rect x="114" y="86" width="10" height="20" rx="4" fill="#38BDF8" stroke="#0F172A" strokeWidth="2" />
              <rect x="176" y="86" width="10" height="20" rx="4" fill="#38BDF8" stroke="#0F172A" strokeWidth="2" />
            </g>
          )}

          {/* 6.7 KÍNH RÂM ĐEN (Cool-kid Shades) */}
          {id === 'kinh_ram' && (
            <g>
              <rect x="135" y="90" width="13" height="8" rx="2" fill="#09090B" />
              <rect x="152" y="90" width="13" height="8" rx="2" fill="#09090B" />
              <line x1="147" y1="93" x2="153" y2="93" stroke="#09090B" strokeWidth="1.5" />
              <line x1="135" y1="92" x2="128" y2="90" stroke="#09090B" strokeWidth="1" />
              <line x1="165" y1="92" x2="172" y2="90" stroke="#09090B" strokeWidth="1" />
              <line x1="137" y1="91" x2="142" y2="96" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
              <line x1="154" y1="91" x2="159" y2="96" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
            </g>
          )}

          {/* 6.8 TÚI TOTE CANVAS (Eco Gen Z Bag) */}
          {id === 'tui_tote' && (
            <g>
              <path d="M106 170 Q88 230 84 290" stroke="#78716C" strokeWidth="2" fill="none" />
              <path d="M112 170 Q94 230 90 290" stroke="#78716C" strokeWidth="2" fill="none" />
              <rect x="70" y="285" width="38" height="52" rx="3" fill="#F5F5F4" stroke="#D6D3D1" strokeWidth="1.5" />
              <circle cx="89" cy="308" r="8" fill="#F43F5E" />
              <text x="89" y="325" fontSize="5" fill="#44403C" textAnchor="middle" fontWeight="bold">REMIX</text>
            </g>
          )}

          {/* 6.9 KÍNH TRÒN RETRO (Vintage round glasses) */}
          {id === 'kinh_tron' && (
            <g>
              <circle cx="142" cy="94" r="5" stroke="#D4A345" strokeWidth="1.2" fill="none" />
              <circle cx="158" cy="94" r="5" stroke="#D4A345" strokeWidth="1.2" fill="none" />
              <line x1="147" y1="94" x2="153" y2="94" stroke="#D4A345" strokeWidth="1.2" />
              <line x1="137" y1="94" x2="130" y2="91" stroke="#D4A345" strokeWidth="1" />
              <line x1="163" y1="94" x2="170" y2="91" stroke="#D4A345" strokeWidth="1" />
              <path d="M140 92 Q143 91 144 95" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.6" fill="none" />
              <path d="M156 92 Q159 91 160 95" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.6" fill="none" />
            </g>
          )}

          {/* 6.10 QUẠT XẾP LỤA ĐỎ (Cổ phong tao nhã) */}
          {id === 'quat_xep' && (
            <g>
              <path d="M154 260 L184 232 C190 238 194 248 192 260 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
              <path d="M154 260 L176 238 M154 260 L183 246 M154 260 L188 254" stroke="#F59E0B" strokeWidth="0.8" />
              <circle cx="154" cy="260" r="2.2" fill="#D4A345" />
              <line x1="154" y1="262" x2="154" y2="282" stroke="#DC2626" strokeWidth="1.2" />
              <circle cx="154" cy="283" r="2" fill="#DC2626" />
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
