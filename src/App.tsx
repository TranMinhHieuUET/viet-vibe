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
  Loader2,
  Search,
  Bookmark,
  Crown,
  ShieldAlert,
  ExternalLink,
  Landmark,
  ChevronRight,
  Check,
  Scale,
  Share2,
  Copy,
  Trash2,
  Heart,
  Users,
  MessageSquare,
  Send,
  ShoppingBag,
  Navigation,
  Phone,
  Tag,
  Bot,
  Store,
  Clock,
  Compass,
  MessageCircle,
  Plus,
  Wand2,
  Edit2
} from 'lucide-react';

// ==========================================
// TÍNH NĂNG 1: BẢNG MÀU CHUẨN & KIỂM TRA HÀI HÒA MÀU SẮC (COLOR HARMONY CHECKER)
// ==========================================
export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  borderClass: string;
}

export const COLOR_PALETTE: ColorOption[] = [
  { id: 'do_do', name: 'Đỏ đô', hex: '#7B1113', borderClass: 'border-red-900' },
  { id: 'vang_lua', name: 'Vàng lụa', hex: '#EEDC82', borderClass: 'border-amber-400' },
  { id: 'xanh_ngoc', name: 'Xanh ngọc', hex: '#40E0D0', borderClass: 'border-teal-500' },
  { id: 'den', name: 'Đen', hex: '#111111', borderClass: 'border-neutral-900' },
  { id: 'trang', name: 'Trắng lụa', hex: '#F5F5F5', borderClass: 'border-neutral-300' },
];

export interface ColorHarmonyResult {
  title: string;
  badge: string;
  badgeClass: string;
  description: string;
  fullText: string;
  vibeTip: string;
}

/**
 * Đánh giá tính hài hòa màu sắc giữa Áo và Hạ Phục dựa trên lý thuyết phối màu
 */
export function evaluateColorHarmony(
  topColorInput: ColorOption | string, 
  bottomColorInput: ColorOption | string
): ColorHarmonyResult {
  const topId = typeof topColorInput === 'string' 
    ? (COLOR_PALETTE.find(c => c.id === topColorInput || c.hex.toLowerCase() === topColorInput.toLowerCase())?.id || topColorInput)
    : topColorInput.id;
  const bottomId = typeof bottomColorInput === 'string'
    ? (COLOR_PALETTE.find(c => c.id === bottomColorInput || c.hex.toLowerCase() === bottomColorInput.toLowerCase())?.id || bottomColorInput)
    : bottomColorInput.id;

  // 1. Cùng màu (Tone-sur-tone / Monochromatic)
  if (topId === bottomId) {
    return {
      title: 'Đồng bộ (Monochromatic)',
      badge: 'Tone-sur-Tone',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Giúp tôn dáng, cao ráo',
      fullText: 'Đồng bộ (Monochromatic): Giúp tôn dáng, cao ráo.',
      vibeTip: 'Tạo cảm giác liền mạch thanh thoát cho vóc dáng, tối giản và hiện đại.'
    };
  }

  // 2. Đen/Trắng + Bất kỳ màu nào => "An toàn & Tinh tế (Neutral)"
  if (topId === 'den' || bottomId === 'den' || topId === 'trang' || bottomId === 'trang') {
    return {
      title: 'An toàn & Tinh tế (Neutral)',
      badge: 'Trung tính Tinh tế',
      badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
      description: 'An toàn, thanh lịch và trường tồn',
      fullText: 'An toàn & Tinh tế (Neutral): Dễ phối, thanh lịch và không bao giờ lỗi mốt.',
      vibeTip: 'Cân bằng hoàn hảo giữa nét cổ phong và tính ứng dụng linh hoạt thường nhật.'
    };
  }

  // 3. Đỏ đô + Xanh ngọc => "Tương phản mạnh (Complementary): Nổi bật, cá tính"
  if ((topId === 'do_do' && bottomId === 'xanh_ngoc') || (topId === 'xanh_ngoc' && bottomId === 'do_do')) {
    return {
      title: 'Tương phản mạnh (Complementary)',
      badge: 'Nổi bật & Cá tính',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
      description: 'Nổi bật, cá tính',
      fullText: 'Tương phản mạnh (Complementary): Nổi bật, cá tính.',
      vibeTip: 'Tạo điểm nhấn thị giác bùng nổ, chuẩn chất Gen Z Avant-garde phá cách.'
    };
  }

  // 4. Đỏ đô + Vàng lụa => "Hài hòa cổ điển: Sang trọng, mang đậm chất cung đình"
  if ((topId === 'do_do' && bottomId === 'vang_lua') || (topId === 'vang_lua' && bottomId === 'do_do')) {
    return {
      title: 'Hài hòa cổ điển',
      badge: 'Sang trọng Cung đình',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
      description: 'Sang trọng, mang đậm chất cung đình',
      fullText: 'Hài hòa cổ điển: Sang trọng, mang đậm chất cung đình.',
      vibeTip: 'Sắc vàng son hoàng gia triều Nguyễn, biểu tượng của phú quý và uy nghiêm dịp lễ Tết.'
    };
  }

  // 5. Vàng lụa + Xanh ngọc => Tươi sáng, thanh nhã (Analogous)
  if ((topId === 'vang_lua' && bottomId === 'xanh_ngoc') || (topId === 'xanh_ngoc' && bottomId === 'vang_lua')) {
    return {
      title: 'Hài hòa tươi sáng (Analogous)',
      badge: 'Tươi tắn & Thanh tân',
      badgeClass: 'bg-teal-100 text-teal-800 border-teal-300',
      description: 'Thanh nhã, ngập tràn sức sống mùa xuân',
      fullText: 'Hài hòa tươi sáng: Thanh nhã, trẻ trung và mang lại cảm giác tươi mới rực rỡ.',
      vibeTip: 'Lý tưởng cho các buổi du xuân, dạo phố cổ và chụp ảnh kỷ yếu ngập tràn năng lượng.'
    };
  }

  // Mặc định
  return {
    title: 'Hài hòa tự do',
    badge: 'Phối màu sáng tạo',
    badgeClass: 'bg-neutral-100 text-neutral-800 border-neutral-300',
    description: 'Bản phối mang đậm dấu ấn cá nhân tự do',
    fullText: 'Hài hòa tự do: Đột phá quy chuẩn, thể hiện gu thời trang độc bản.',
    vibeTip: 'Tự tin khẳng định phong cách cá nhân riêng biệt.'
  };
}

// Cấu trúc Outfit cho Draft và Lookbook
export interface OutfitState {
  id?: string;
  name?: string;
  top: string;
  bottom: string;
  shoes: string;
  accessories: string[];
  topColor: ColorOption;
  bottomColor: ColorOption;
  gender: 'female' | 'male';
  createdAt?: string;
  stylingTitle?: string;
}

export interface LookbookItem extends OutfitState {
  id: string;
  name: string;
  createdAt: string;
  tags?: string[];
}

// --- PHÂN NHÓM PHỤ KIỆN ---
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

// =========================================================================
// CẤU TRÚC DATABASE CHUẨN HÓA VĂN HÓA (CULTURAL DATABASE - NOSQL / JSON)
// Chuẩn bị sẵn sàng migrate lên Firebase Firestore
// =========================================================================

export interface CulturalItemRules {
  tags: string[];             // Danh mục nhãn (hoang_gia, le_phuc, co_phuc_ta_dai, binh_dan, hien_dai, quan_ngan...)
  forbiddenPairs: string[];   // ID các item kỵ nhau khi phối đồ
  conflictMessage: string;    // Thông báo lỗi cụ thể khi vi phạm forbiddenPairs
}

export interface CulturalItem {
  id: string;
  name: string;
  altNames: string[];
  period: string;
  dynasty?: string;
  region: string;
  targetUser: string;
  socialClass: string[];
  occasions: string[];
  historicalContext: string;
  visualTraits: string;
  traditionalPairing: string[];
  culturalSignificance: string;
  academicSources: string[];
  rules: CulturalItemRules;
  category: 'ao' | 'quan' | 'phukien' | 'giay';
  accGroup?: AccessoryGroup;
  era: string;                // Tương thích ngược với UI cũ
  desc: string;               // Tương thích ngược với UI cũ
  history: string;            // Tương thích ngược với UI cũ
}

export type ItemData = CulturalItem;

export const culturalDatabase: Record<string, CulturalItem> = {
  // ----------------------------------------------------
  // 1. ÁO NHẬT BÌNH
  // ----------------------------------------------------
  ao_nhat_binh: {
    id: 'ao_nhat_binh',
    name: 'Áo Nhật Bình',
    altNames: ['Áo đối khâm phi phong', 'Nhật Bình y', 'Lễ phục Hậu phi triều Nguyễn'],
    period: 'Thế kỷ 19 - Nửa đầu thế kỷ 20',
    dynasty: 'Triều Nguyễn (Gia Long đến Bảo Đại)',
    region: 'Kinh đô Huế (Trung Bộ)',
    targetUser: 'Nữ (Hậu phi, Công chúa, Cung tần & Mệnh phụ)',
    socialClass: ['Hoàng tộc', 'Hậu phi', 'Công chúa', 'Cung tần', 'Mệnh phụ phu nhân'],
    occasions: ['Thường triều', 'Tiết Vạn Thọ / Thiên Thu', 'Hỷ sự hoàng gia', 'Yết kiến Thái hậu', 'Đại lễ cung đình'],
    historicalContext: 'Được định chế quy chuẩn y phục từ năm Gia Long thứ 6 (1807) và hoàn thiện vào thời vua Minh Mạng (Khâm định Đại Nam hội điển sự lệ). Xuất phát từ dáng áo Phi Phong đối khâm thời Minh, triều Nguyễn đã bản địa hóa độc đáo với dải cổ chữ nhật to bản ghép ngũ hành và tay áo dải ngũ sắc, trở thành biểu tượng đỉnh cao của lễ phục nữ giới chốn cung cấm.',
    visualTraits: 'Cổ áo hình chữ nhật ghép dải ngũ hành rực rỡ đối xứng trước ngực, vạt áo trước xẻ đối khâm cài khuy ngọc/kim loại. Hai tay áo may dải ngũ sắc (xanh, đỏ, vàng, trắng, đen) tượng trưng cho ngũ hành tương sinh.',
    traditionalPairing: ['Quần lụa bạch (trắng)', 'Khăn vành dây quấn bội', 'Hài thêu phụng chỉ vàng', 'Kim khánh hoàng cung', 'Trâm phượng ngũ châu'],
    culturalSignificance: 'Biểu trưng cho phẩm trật tối thượng, tôn ti trật tự chốn hậu cung và nét uy nghiêm quyền quý của mỹ thuật triều đình Huế.',
    academicSources: [
      'Ngàn năm áo mũ - Trần Quang Đức',
      'Khảo cứu trang phục triều Nguyễn - Trịnh Bách',
      'Đại Nam thực lục - Quốc sử quán triều Nguyễn',
      'Khâm định Đại Nam hội điển sự lệ'
    ],
    rules: {
      tags: ['hoang_gia', 'le_phuc', 'trang_trong', 'co_phuc', 'co_phuc_ta_dai'],
      forbiddenPairs: ['vay_dup', 'quan_short', 'vay_ngan', 'dep_le', 'dep_xo_ngon', 'sneaker_chunky', 'non_quai_thao'],
      conflictMessage: '🚨 Phạm quy hoàng gia: Áo Nhật Bình là phẩm phục cao quý chốn cung đình triều Nguyễn. Tuyệt đối không phối cùng trang phục dân gian bình dân (váy đụp, nón quai thao), đồ ngắn hở hang (quần short, váy ngắn) hoặc dép lê tùy tiện!'
    },
    category: 'ao',
    era: 'Triều đình nhà Nguyễn',
    desc: 'Cổ áo hình chữ nhật ghép dải ngũ hành rực rỡ, hai tay áo có dải ngũ sắc hoàng cung.',
    history: 'Thường phục của Hậu phi, Công chúa và Cung tần triều Nguyễn. Hoa văn trước ngực và cổ áo tượng trưng cho sự chính trực và trật tự tôn ti chốn hoàng cung tôn quý.'
  },

  // ----------------------------------------------------
  // 2. ÁO NGŨ THÂN TAY CHẼN
  // ----------------------------------------------------
  ao_ngu_than: {
    id: 'ao_ngu_than',
    name: 'Áo Ngũ Thân tay chẽn',
    altNames: ['Áo chẽn', 'Áo năm thân', 'Thường phục triều Nguyễn', 'Trực lĩnh ngũ thân'],
    period: 'Thế kỷ 18 - Thế kỷ 20',
    dynasty: 'Thời Chúa Nguyễn & Triều Nguyễn',
    region: 'Toàn quốc (khởi nguồn từ Đàng Trong)',
    targetUser: 'Cả hai (Nam và Nữ)',
    socialClass: ['Quý tộc', 'Quan lại', 'Nho sĩ', 'Thị dân', 'Trí thức'],
    occasions: ['Công vụ thường nhật', 'Dạo phố', 'Giao tế', 'Hỷ sự', 'Lễ tiết gia tộc'],
    historicalContext: 'Được Chúa Nguyễn Phúc Khoát định chế năm 1744 tại Đàng Trong nhằm khẳng định bản sắc văn hóa độc lập. Sau đó vua Minh Mạng ban hành các sắc dụ từ năm 1827-1837 chuẩn hóa y phục ngũ thân trên toàn lãnh thổ Đại Nam ("Tiền triều y phục bức tranh vân").',
    visualTraits: 'Cổ đứng vuông góc cài 5 khuy lệch sang sườn phải. Thân áo ghép từ 5 mảnh vải: 2 thân trước, 2 thân sau và 1 thân con (tả tiểu lót bên trong). Tay áo may thon chẽn ôm sát cổ tay gọn gàng, tôn phong thái đĩnh đạc.',
    traditionalPairing: ['Quần lụa trắng hoặc đen', 'Khăn xếp (khăn đóng) / Khăn vấn', 'Guốc mộc hoặc hài da', 'Quạt xếp lụa'],
    culturalSignificance: 'Năm thân áo tượng trưng cho "tứ thân phụ mẫu" (cha mẹ đẻ và cha mẹ vợ/chồng) che chở bản thân người mặc ở giữa. Năm hạt khuy đại diện cho Ngũ Thường Nho gia: Nhân - Lễ - Nghĩa - Trí - Tín.',
    academicSources: [
      'Ngàn năm áo mũ - Trần Quang Đức',
      'Khảo cứu trang phục triều Nguyễn - Trịnh Bách',
      'Lịch triều hiến chương loại chí - Phan Huy Chú',
      'Đại Nam thực lục chính biên'
    ],
    rules: {
      tags: ['co_phuc', 'co_phuc_ta_dai', 'lich_su', 'trang_trong', 'nho_nha'],
      forbiddenPairs: ['quan_short', 'vay_ngan', 'dep_le', 'dep_xo_ngon'],
      conflictMessage: '⚠️ Xung đột phong cách: Áo ngũ thân có tà dài kín đáo theo đạo lý Nho gia. Tuyệt đối không phối cùng quần cộc, váy ngắn hoặc dép lê vì làm mất vẻ đĩnh đạc, nho nhã.'
    },
    category: 'ao',
    era: 'Thời Nguyễn (TK 18 - 19)',
    desc: 'Áo cổ đứng cài 5 khuy lệch, ống tay may ôm chẽn cổ tay gọn gàng, tôn dáng đĩnh đạc.',
    history: 'Được Chúa Nguyễn Phúc Khoát định hình năm 1744 và vua Minh Mạng chuẩn hóa toàn quốc. Năm thân áo tượng trưng cho tứ thân phụ mẫu và bản thân người mặc, 5 khuy là Nhân-Lễ-Nghĩa-Trí-Tín.'
  },

  // ----------------------------------------------------
  // 3. ÁO TẤC (NGŨ THÂN TAY THỤNG)
  // ----------------------------------------------------
  ao_tac: {
    id: 'ao_tac',
    name: 'Áo Tấc (Ngũ thân tay thụng)',
    altNames: ['Áo thụng', 'Áo lễ ngũ thân', 'Đại lễ phục thời Nguyễn'],
    period: 'Thế kỷ 18 - Giữa thế kỷ 20',
    dynasty: 'Triều Nguyễn',
    region: 'Toàn quốc',
    targetUser: 'Cả hai (Nam và Nữ)',
    socialClass: ['Mọi tầng lớp (từ vua quan đến thứ dân khi hành lễ)'],
    occasions: ['Tế lễ trời đất', 'Tôn miếu', 'Đám cưới hỷ sự', 'Yết bái bề trên', 'Lễ hội trọng đại'],
    historicalContext: 'Là dạng thức lễ phục phổ biến và tôn nghiêm nhất thời Nguyễn. Tên gọi "áo tấc" bắt nguồn từ phần viền tay áo may thụng rộng đúng một tấc ta (khoảng 40cm), buông dài phủ kín bàn tay khi đứng chắp tay vái chào.',
    visualTraits: 'Cổ đứng cài 5 khuy tương tự áo ngũ thân chẽn nhưng hai tay áo may thụng rất rộng hình chữ nhật buông dài. Phong thái ung dung, trang trọng và nho nhã bậc nhất.',
    traditionalPairing: ['Quần lụa trắng', 'Khăn xếp hoặc khăn vành', 'Hài thêu chỉ ngũ sắc', 'Guốc mộc quai son'],
    culturalSignificance: 'Biểu tượng của sự kính cẩn trước tổ tiên, bề trên và trời đất; phản ánh văn hóa ứng xử cung kính, nề nếp gia phong của người Việt.',
    academicSources: [
      'Ngàn năm áo mũ - Trần Quang Đức',
      'Khảo cứu trang phục triều Nguyễn - Trịnh Bách',
      'Nghi lễ triều Nguyễn - Tôn Thất Bình'
    ],
    rules: {
      tags: ['hoang_gia', 'le_phuc', 'trang_trong', 'co_phuc', 'co_phuc_ta_dai'],
      forbiddenPairs: ['vay_dup', 'quan_short', 'vay_ngan', 'dep_le', 'dep_xo_ngon', 'sneaker_chunky'],
      conflictMessage: '🚨 Phạm quy lễ phục: Áo tấc là lễ phục tế tự trang nghiêm. Tuyệt đối kiêng kỵ phối cùng quần cộc, váy ngắn, dép lê hoặc giày thể thao hầm hố!'
    },
    category: 'ao',
    era: 'Thời Nguyễn',
    desc: 'Lễ phục trang trọng với tay áo rộng và thụng hình chữ nhật buông dài uy nghiêm.',
    history: 'Còn gọi là áo thụng, lễ phục phổ biến thời Nguyễn từ quan lại đến thứ dân dùng trong dịp tế lễ, hỷ sự và yết kiến bề trên. Mang phong thái ung dung, nho nhã.'
  },

  // ----------------------------------------------------
  // 4. ÁO DÀI TÂN THỜI
  // ----------------------------------------------------
  ao_dai: {
    id: 'ao_dai',
    name: 'Áo dài tân thời',
    altNames: ['Áo dài Lemur', 'Áo dài Lê Phổ', 'Quốc phục tân thời'],
    period: 'Thập niên 1930 - Nay',
    dynasty: 'Thời kỳ Cận - Hiện đại',
    region: 'Toàn quốc',
    targetUser: 'Nữ (chủ yếu) & Nam',
    socialClass: ['Đại chúng', 'Nữ sinh', 'Trí thức', 'Văn nghệ sĩ'],
    occasions: ['Lễ cưới', 'Tết Nguyên Đán', 'Sự kiện ngoại giao', 'Dạo phố'],
    historicalContext: 'Cải biến từ áo ngũ thân vào những năm 1930 bởi nhóm họa sĩ trường Mỹ thuật Đông Dương như Cát Tường (Lemur) và Lê Phổ, lược bớt thân con, tôn đường cong cơ thể phụ nữ phương Đông.',
    visualTraits: 'Hai tà áo dài thướt tha xẻ hông cao, cổ đứng 2-4cm, ôm sát eo ngực thanh lịch, buông dài ngang bắp chân.',
    traditionalPairing: ['Quần lụa ống suông trắng/đen', 'Nón lá', 'Guốc mộc cao gót', 'Vòng kiềng bạc'],
    culturalSignificance: 'Biểu tượng nhan sắc và tinh hoa văn hóa người phụ nữ Việt Nam, giao thoa giữa truyền thống và tinh thần giải phóng phụ nữ tân thời.',
    academicSources: [
      'Ngàn năm áo mũ - Trần Quang Đức',
      'Lịch sử trang phục Việt Nam - Đoàn Thị Tình'
    ],
    rules: {
      tags: ['co_phuc', 'co_phuc_ta_dai', 'thanh_lich', 'quoc_phuc'],
      forbiddenPairs: ['quan_short', 'vay_ngan', 'dep_le', 'dep_xo_ngon'],
      conflictMessage: '⚠️ Sai lệch cấu trúc: Áo dài xẻ tà cao khi mặc cùng quần đùi hoặc váy ngắn sẽ để lộ hông đùi phản cảm, phá vỡ nét thanh tao đoan chính.'
    },
    category: 'ao',
    era: 'Thế kỷ 20 - Nay',
    desc: 'Tà áo thướt tha xẻ hông, cổ cao duyên dáng kết hợp truyền thống và nét đẹp cơ thể hiện đại.',
    history: 'Phát triển từ áo ngũ thân từ thập niên 1930 qua bàn tay họa sĩ Lemur Cát Tường và Lê Phổ, áo dài trở thành biểu tượng quốc phục thanh lịch của Việt Nam.'
  },

  // ----------------------------------------------------
  // 5. ÁO TỨ THÂN KINH BẮC
  // ----------------------------------------------------
  ao_tu_than: {
    id: 'ao_tu_than',
    name: 'Áo tứ thân Kinh Bắc',
    altNames: ['Áo bốn vạt', 'Áo mớ ba mớ bảy', 'Trang phục Quan họ'],
    period: 'Thế kỷ 12 - Đầu thế kỷ 20',
    dynasty: 'Thời Lý, Trần, Lê sơ, Lê Trung Hưng',
    region: 'Bắc Bộ (Đồng bằng sông Hồng)',
    targetUser: 'Nữ',
    socialClass: ['Phụ nữ nông thôn', 'Liền chị Quan họ', 'Thị dân miền Bắc'],
    occasions: ['Hội Lim', 'Hội làng mùa xuân', 'Lao động đồng ruộng', 'Dân ca Quan họ'],
    historicalContext: 'Trang phục dân gian đặc sắc gắn liền với đời sống người Việt Bắc Bộ hàng nghìn năm. Thường mặc kết hợp với áo yếm cổ xây bên trong và dải yếm đào thắt dải lụa sồi bay bổng.',
    visualTraits: 'Áo dài không cài khuy phía trước, lưng ghép từ 2 mảnh vải (sống áo), hai vạt trước buông rời để buộc thắt nút trước bụng, khoe yếm đào bên trong.',
    traditionalPairing: ['Váy đụp thâm', 'Yếm đào', 'Thắt lưng lụa bao xanh', 'Khăn mỏ quạ', 'Nón quai thao'],
    culturalSignificance: 'Bốn vạt tượng trưng cho tứ thân phụ mẫu (cha mẹ mình và cha mẹ chồng), hai vạt trước buộc vào nhau thể hiện tình nghĩa vợ chồng son sắt keo sơn.',
    academicSources: [
      'Ngàn năm áo mũ - Trần Quang Đức',
      'Văn minh Đại Việt - Nguyễn Đăng Thục',
      'Dân tộc học Việt Nam - Viện Dân tộc học'
    ],
    rules: {
      tags: ['dan_gian', 'bac_bo', 'binh_dan', 'co_phuc'],
      forbiddenPairs: ['quan_lua', 'quan_jeans', 'quan_kaki', 'oxford', 'sneaker_chunky'],
      conflictMessage: '💡 Mất chất dân gian: Áo tứ thân Kinh Bắc sinh ra để phối cùng yếm đào và váy đụp. Phối với quần âu, quần jeans hay giày da âu phục sẽ làm gãy dáng mộc mạc.'
    },
    category: 'ao',
    era: 'Thế kỷ 12 - Đầu TK 20',
    desc: 'Trang phục dân gian miền Bắc với 4 vạt áo, vạt trước buộc chéo tôn vòng eo con kiến.',
    history: 'Gắn liền với hình ảnh phụ nữ Kinh Bắc và hát Quan họ. Bốn vạt tượng trưng cho tứ thân phụ mẫu (cha mẹ mình và cha mẹ chồng), thể hiện sự hiếu kính và mộc mạc.'
  },

  // ----------------------------------------------------
  // 6. VÁY ĐỤP THÂM
  // ----------------------------------------------------
  vay_dup: {
    id: 'vay_dup',
    name: 'Váy đụp thâm',
    altNames: ['Váy thâm', 'Váy xống', 'Váy dân gian Kinh Bắc'],
    period: 'Thời Lý - Trần đến đầu thế kỷ 20',
    dynasty: 'Lê sơ, Lê Trung Hưng, Dân gian truyền thống',
    region: 'Bắc Bộ (Đồng bằng sông Hồng)',
    targetUser: 'Nữ',
    socialClass: ['Nông dân', 'Bình dân', 'Thứ dân miền Bắc'],
    occasions: ['Lao động cấy lúa', 'Sinh hoạt làng quê', 'Lễ hội dân gian'],
    historicalContext: 'Trang phục hạ thân cổ xưa và phổ biến nhất của phụ nữ Đại Việt. Dù triều Nguyễn từng ban sắc lệnh cải cách bắt mặc quần hai ống ("Tháng chín có chiếu vua ra / Cấm quần không đáy người ta hãi hùng"), váy đụp vẫn bền bỉ tồn tại trong đời sống nông thôn Bắc Bộ suốt nhiều thế kỷ.',
    visualTraits: 'Dáng váy xòe rộng, không xẻ ống ("quần không đáy"), cạp váy mềm luồn dải rút, thường nhuộm màu thâm củ nâu hoặc chàm tối màu để tiện lao động lấm bùn.',
    traditionalPairing: ['Áo yếm (yếm đào, yếm nâu)', 'Áo tứ thân', 'Thắt lưng lụa bao xanh', 'Khăn mỏ quạ', 'Nón quai thao'],
    culturalSignificance: 'Biểu tượng cho nét đẹp mộc mạc, tần tảo, chịu thương chịu khó của người phụ nữ nông thôn Bắc Bộ và nền văn minh lúa nước sông Hồng.',
    academicSources: [
      'Ngàn năm áo mũ - Trần Quang Đức',
      'Văn minh Đại Việt - Nguyễn Đăng Thục',
      'Trang phục Việt Nam qua các thời kỳ - Đoàn Thị Tình'
    ],
    rules: {
      tags: ['binh_dan', 'dan_gian', 'bac_bo'],
      forbiddenPairs: ['ao_nhat_binh', 'ao_tac', 'oxford', 'sneaker_chunky'],
      conflictMessage: '🚨 Lệch pha giai cấp & bối cảnh: Váy đụp thâm dân gian mộc mạc không thể kết hợp cùng đại lễ phục cung đình (Áo Nhật Bình, Áo Tấc) hay giày tây học đường phương Tây.'
    },
    category: 'quan',
    era: 'Dân gian Bắc Bộ',
    desc: 'Váy xòe dài màu đen/nâu nhuộm củ nâu, rộng rãi thuận tiện cho lao động đồng quê.',
    history: 'Trang phục căn bản của người phụ nữ nông thôn Bắc Bộ xưa, tạo nên bộ đôi chuẩn mực "Áo tứ thân - yếm đào - váy đụp".'
  },

  // ----------------------------------------------------
  // 7. QUẦN SHORT HIỆN ĐẠI
  // ----------------------------------------------------
  quan_short: {
    id: 'quan_short',
    name: 'Quần short hiện đại',
    altNames: ['Quần đùi', 'Bermuda shorts', 'Shorts thời trang'],
    period: 'Thế kỷ 20 - Nay',
    dynasty: 'Thời kỳ Hiện đại',
    region: 'Toàn cầu / Thời trang đương đại',
    targetUser: 'Cả hai (Nam và Nữ)',
    socialClass: ['Đại chúng', 'Giới trẻ Gen Z', 'Thời trang đường phố'],
    occasions: ['Dạo phố mùa hè', 'Thể thao', 'Du lịch biển'],
    historicalContext: 'Phát triển từ âu phục thể thao phương Tây thế kỷ 20, sau đó trở thành trang phục giải phóng cơ thể và biểu tượng cho phong cách trẻ trung đường phố toàn cầu.',
    visualTraits: 'Ống cắt ngắn trên gối hoặc giữa đùi, chất liệu cotton, khaki hoặc denim khỏe khoắn, để lộ cẳng chân.',
    traditionalPairing: ['Áo phông T-shirt', 'Sneaker', 'Mũ lưỡi trai', 'Túi chéo'],
    culturalSignificance: 'Đại diện cho sự năng động, tự do, phóng khoáng trong nhịp sống đô thị đương đại.',
    academicSources: [
      'Lịch sử thời trang thế giới thế kỷ 20',
      'Streetwear Culture & Modern Wardrobe Study'
    ],
    rules: {
      tags: ['hien_dai', 'quan_ngan', 'duong_pho', 'nang_dong'],
      forbiddenPairs: ['ao_nhat_binh', 'ao_tac', 'ao_ngu_than', 'ao_dai'],
      conflictMessage: '⚠️ Xung đột cấu trúc & lễ nghi: Quần ngắn làm hở chân qua tà áo cổ phục dài, phá vỡ tỷ lệ trang trọng và nét kín đáo cốt lõi của mỹ học truyền thống.'
    },
    category: 'quan',
    era: 'Hiện đại Năng động',
    desc: 'Quần đùi ngắn trên đầu gối mát mẻ cho mùa hè.',
    history: 'Món đồ thể thao, dạo phố hiện đại; tuy nhiên đối với cổ phục tà dài sẽ gây xung đột về độ kín đáo truyền thống.'
  },

  // ----------------------------------------------------
  // 8. QUẦN LỤA ỐNG RỘNG
  // ----------------------------------------------------
  quan_lua: {
    id: 'quan_lua',
    name: 'Quần lụa ống rộng',
    altNames: ['Quần bạch lụa', 'Quần lụa tơ tằm', 'Quần đổng'],
    period: 'Thế kỷ 18 - Nay',
    dynasty: 'Thời Chúa Nguyễn đến nay',
    region: 'Toàn quốc',
    targetUser: 'Cả hai (Nam và Nữ)',
    socialClass: ['Mọi tầng lớp', 'Nho sĩ', 'Quý tộc', 'Thị dân'],
    occasions: ['Mặc cùng áo dài, áo ngũ thân, áo tấc trong mọi dịp trang trọng'],
    historicalContext: 'Chúa Nguyễn Phúc Khoát quy định mặc quần hai ống năm 1744, tạo nên bộ đôi "Áo dài / ngũ thân - Quần lụa" chuẩn mực trường tồn của y phục truyền thống Việt.',
    visualTraits: 'Ống suông rộng mềm mại rủ nhẹ từ hông xuống gót chân, may bằng lụa Vạn Phúc hoặc tơ tằm mềm mại màu trắng hoặc đen.',
    traditionalPairing: ['Áo ngũ thân', 'Áo dài', 'Áo tấc', 'Áo Nhật Bình', 'Hài thêu', 'Guốc mộc'],
    culturalSignificance: 'Tôn vinh bước đi uyển chuyển, đoan trang, kín đáo và quý phái của phong thái Á Đông.',
    academicSources: [
      'Ngàn năm áo mũ - Trần Quang Đức',
      'Khảo cứu trang phục triều Nguyễn - Trịnh Bách'
    ],
    rules: {
      tags: ['truyen_thong', 'trang_trong', 'nho_nha', 'chuan_muc'],
      forbiddenPairs: [],
      conflictMessage: ''
    },
    category: 'quan',
    era: 'Truyền thống',
    desc: 'Quần lụa mềm mại rủ nhẹ, ống suông rộng thoải mái và quý phái.',
    history: 'Món đồ kinh điển kết hợp cùng Áo dài và Áo ngũ thân. Thường may bằng lụa tơ tằm Vạn Phúc tạo bước đi nhẹ nhàng, đoan trang.'
  },

  // ----------------------------------------------------
  // 9. QUẦN JEANS SUÔNG
  // ----------------------------------------------------
  quan_jeans: {
    id: 'quan_jeans',
    name: 'Quần Jeans suông',
    altNames: ['Denim straight pants', 'Quần bò ống đứng'],
    period: 'Thế kỷ 20 - Nay',
    dynasty: 'Thời kỳ Hiện đại',
    region: 'Toàn cầu',
    targetUser: 'Cả hai',
    socialClass: ['Giới trẻ Gen Z', 'Thời trang đường phố'],
    occasions: ['Dạo phố', 'Đi học', 'Đi làm casual', 'Remix văn hóa'],
    historicalContext: 'Xuất phát từ trang phục lao động Mỹ, trở thành biểu tượng tự do và năng lượng tuổi trẻ toàn cầu.',
    visualTraits: 'Chất vải denim xanh đứng form, ống suông gọn gàng, đường may chỉ nổi cá tính.',
    traditionalPairing: ['Áo thun', 'Hoodie', 'Sneaker'],
    culturalSignificance: 'Biểu tượng tinh thần tự do, độc lập và cá tính của giới trẻ thế kỷ 21.',
    academicSources: ['Denim: Fashion\'s Frontier - Emma McClendon'],
    rules: {
      tags: ['hien_dai', 'streetwear', 'gen_z'],
      forbiddenPairs: ['ao_nhat_binh', 'ao_tac'],
      conflictMessage: '⚠️ Quần jeans đường phố không phù hợp với đại lễ phục cung đình trang nghiêm như Áo Nhật Bình hay Áo Tấc.'
    },
    category: 'quan',
    era: 'Hiện đại (Gen Z)',
    desc: 'Quần denim ống đứng trẻ trung, phá cách khi mix cùng áo tà cổ điển.',
    history: 'Biểu tượng của văn hóa streetwear thế giới, mang tinh thần tự do và cá tính của giới trẻ thế kỷ 21.'
  },

  // ----------------------------------------------------
  // 10. QUẦN KAKI SUÔNG
  // ----------------------------------------------------
  quan_kaki: {
    id: 'quan_kaki',
    name: 'Quần Kaki suông',
    altNames: ['Chinos pants', 'Quần âu kaki'],
    period: 'Hiện đại Smart-Casual',
    dynasty: 'Thời kỳ Hiện đại',
    region: 'Toàn cầu',
    targetUser: 'Cả hai',
    socialClass: ['Trí thức trẻ', 'Smart Casual'],
    occasions: ['Đi làm', 'Hội thảo', 'Dạo phố lịch sự'],
    historicalContext: 'Phát triển từ âu phục thế kỷ 20, mang phong thái tối giản lịch lãm và trang nhã.',
    visualTraits: 'Vải kaki phẳng phiu đứng form, ống suông thanh thoát màu be hoặc nâu trầm.',
    traditionalPairing: ['Áo sơ mi', 'Blazer', 'Loafer', 'Oxford'],
    culturalSignificance: 'Sự giao thoa thanh lịch giữa nét cổ điển nhã nhặn và sự năng động của thời đại số.',
    academicSources: ['Modern Menswear & Casual Tailoring Studies'],
    rules: {
      tags: ['hien_dai', 'smart_casual', 'thanh_lich'],
      forbiddenPairs: ['ao_nhat_binh'],
      conflictMessage: '⚠️ Quần kaki không tương thích với lễ phục Hậu phi triều đình.'
    },
    category: 'quan',
    era: 'Hiện đại Smart-Casual',
    desc: 'Quần vải chinos/kaki form đứng thanh lịch, tối giản và thời thượng.',
    history: 'Phom dáng tối giản hiện đại giúp làm nổi bật đường cắt cổ phục mà không bị rườm rà.'
  },

  // ----------------------------------------------------
  // 11. CHÂN VÁY XẾP LY MAXI
  // ----------------------------------------------------
  vay_xep_ly: {
    id: 'vay_xep_ly',
    name: 'Chân váy xếp ly maxi',
    altNames: ['Pleated maxi skirt', 'Váy dập ly dài'],
    period: 'Hiện đại Romantique',
    dynasty: 'Thời kỳ Hiện đại',
    region: 'Toàn cầu',
    targetUser: 'Nữ',
    socialClass: ['Thời trang hiện đại'],
    occasions: ['Dạo phố', 'Dự tiệc nhẹ', 'Chụp ảnh nghệ thuật'],
    historicalContext: 'Hòa quyện giữa thẩm mỹ xếp ly phương Tây và độ xòe thướt tha truyền thống phương Đông.',
    visualTraits: 'Các nếp gấp dọc đều đặn buông dài qua bắp chân, chuyển động bồng bềnh bay bổng.',
    traditionalPairing: ['Áo kiểu', 'Cardigan', 'Hài thêu hoặc Giày búp bê'],
    culturalSignificance: 'Nét duyên dáng, nữ tính mềm mại tương thích tốt với độ rủ của áo dài và áo ngũ thân.',
    academicSources: ['Contemporary Fashion Aesthetics & Eastern Silhouettes'],
    rules: {
      tags: ['hien_dai', 'thanh_lich', 'bay_bong'],
      forbiddenPairs: ['ao_nhat_binh', 'ao_tu_than'],
      conflictMessage: '⚠️ Váy xếp ly hiện đại không phối cùng áo tứ thân mộc mạc hay áo Nhật Bình hoàng gia.'
    },
    category: 'quan',
    era: 'Hiện đại Romantique',
    desc: 'Chân váy maxi dập ly chuyển động bay bổng, tạo hiệu ứng xếp lớp thị giác.',
    history: 'Sự hòa quyện giữa nét nữ tính hiện đại và tính chất thướt tha vốn có của trang phục phương Đông.'
  },

  // ----------------------------------------------------
  // 12. VÁY NGẮN CHỮ A
  // ----------------------------------------------------
  vay_ngan: {
    id: 'vay_ngan',
    name: 'Váy ngắn chữ A',
    altNames: ['A-line mini skirt', 'Chân váy Y2K'],
    period: 'Hiện đại Y2K',
    dynasty: 'Thời kỳ Hiện đại',
    region: 'Toàn cầu',
    targetUser: 'Nữ',
    socialClass: ['Giới trẻ Gen Z'],
    occasions: ['Party', 'Dạo phố hè', 'Streetwear'],
    historicalContext: 'Trào lưu giải phóng thời trang mini-skirt thập niên 60 và tái bùng nổ trong làn sóng Y2K.',
    visualTraits: 'Dáng xòe nhẹ chữ A, dài trên gối để lộ chân tôn dáng.',
    traditionalPairing: ['Crop top', 'Sneaker chunky', 'Túi kẹp nách'],
    culturalSignificance: 'Tuyên ngôn trẻ trung, gợi cảm và tự tin của phái đẹp hiện đại.',
    academicSources: ['Y2K Style Chronicles & Youth Subcultures'],
    rules: {
      tags: ['hien_dai', 'quan_ngan', 'y2k'],
      forbiddenPairs: ['ao_nhat_binh', 'ao_tac', 'ao_ngu_than', 'ao_dai'],
      conflictMessage: '⚠️ Lỗi cấu trúc & lễ nghi: Váy ngắn làm lộ đùi khi tà áo cổ phục bay, phá vỡ nét đoan trang kín đáo.'
    },
    category: 'quan',
    era: 'Hiện đại Y2K',
    desc: 'Chân váy ngắn năng động, tôn chân dài của phong cách trẻ.',
    history: 'Biểu tượng của thời trang giải phóng thập niên 60-70 và xu hướng Y2K ngày nay.'
  },

  // ----------------------------------------------------
  // 13. KHĂN XẾP
  // ----------------------------------------------------
  khan_xep: {
    id: 'khan_xep',
    name: 'Khăn xếp',
    altNames: ['Khăn đóng', 'Khăn xếp thời Nguyễn'],
    period: 'Thế kỷ 19 - Nay',
    dynasty: 'Triều Nguyễn đến nay',
    region: 'Toàn quốc',
    targetUser: 'Nam & Nữ',
    socialClass: ['Mọi tầng lớp', 'Nho sĩ', 'Quan lại'],
    occasions: ['Hỷ sự', 'Tế lễ', 'Tết Nguyên Đán', 'Sự kiện ngoại giao'],
    historicalContext: 'Cải tiến từ khăn vấn quấn tay sang dạng may sẵn định hình để tiện lợi hơn trong đời sống thời Nguyễn và đầu thế kỷ 20.',
    visualTraits: 'Vải gấm hoặc đoạn quấn thành nhiều vòng nếp xếp đều đặn quanh đầu, đỉnh hở, nếp chữ Nhất hoặc chữ Nhân.',
    traditionalPairing: ['Áo ngũ thân', 'Áo tấc', 'Áo dài'],
    culturalSignificance: 'Biểu trưng của sự nề nếp, đĩnh đạc và phong thái tề chỉnh của con người truyền thống.',
    academicSources: ['Khảo cứu trang phục triều Nguyễn - Trịnh Bách'],
    rules: {
      tags: ['co_phuc', 'trang_trong', 'doi_dau'],
      forbiddenPairs: ['quan_short', 'vay_ngan'],
      conflictMessage: '⚠️ Khăn xếp trang nghiêm kiêng kỵ phối cùng đồ ngắn hở hang.'
    },
    category: 'phukien',
    accGroup: 'doi_dau',
    era: 'Thế kỷ 19 - Nay',
    desc: 'Khăn quấn sẵn hình khối trang nhã đội trên đầu theo lối nam/nữ truyền thống.',
    history: 'Phát triển từ khăn vấn tự quấn bằng tay để tiện lợi hơn trong đời sống thời Nguyễn và đầu thế kỷ 20.'
  },

  // ----------------------------------------------------
  // 14. KHĂN VẤN
  // ----------------------------------------------------
  khan_van: {
    id: 'khan_van',
    name: 'Khăn vấn',
    altNames: ['Khăn vành dây', 'Tóc vấn khăn'],
    period: 'Thời Lê - Nguyễn',
    dynasty: 'Triều Lê, Triều Nguyễn',
    region: 'Toàn quốc',
    targetUser: 'Nữ',
    socialClass: ['Khuê các', 'Phụ nữ truyền thống'],
    occasions: ['Lễ cưới', 'Hội hè', 'Tiệc gia đình'],
    historicalContext: 'Phong tục vấn tóc tròn gọn quanh đầu bằng vải của phụ nữ Việt có lịch sử từ hàng trăm năm trước triều Nguyễn.',
    visualTraits: 'Khăn bọc trọn tóc vấn tròn quanh đỉnh trán thanh tú, có thể đính ngọc hoặc trâm cài.',
    traditionalPairing: ['Áo dài', 'Áo ngũ thân', 'Áo tấc', 'Trâm cài'],
    culturalSignificance: 'Nét đẹp dịu dàng, đoan chính của tiểu thư khuê các Việt Nam.',
    academicSources: ['Ngàn năm áo mũ - Trần Quang Đức'],
    rules: {
      tags: ['co_phuc', 'trang_trong', 'doi_dau'],
      forbiddenPairs: ['quan_short'],
      conflictMessage: '⚠️ Khăn vấn đoan trang không phối cùng đồ ngắn thiếu chỉn chu.'
    },
    category: 'phukien',
    accGroup: 'doi_dau',
    era: 'Thời Lê - Nguyễn',
    desc: 'Tóc độn khăn vấn tròn quanh đầu gọn gàng khoe vầng trán thanh tú.',
    history: 'Nét đẹp thuần phong mỹ tục của phụ nữ xưa, tượng trưng cho sự nề nếp, đoan chính của tiểu thư khuê các.'
  },

  // ----------------------------------------------------
  // 15. NÓN QUAI THAO
  // ----------------------------------------------------
  non_quai_thao: {
    id: 'non_quai_thao',
    name: 'Nón quai thao',
    altNames: ['Nón thúng', 'Nón ba tầm'],
    period: 'Dân gian Kinh Bắc',
    dynasty: 'Thời Lê - Nguyễn',
    region: 'Bắc Bộ',
    targetUser: 'Nữ',
    socialClass: ['Liền chị Quan họ', 'Phụ nữ Kinh Bắc'],
    occasions: ['Hội Lim', 'Hội xuân làng quê', 'Hát quan họ'],
    historicalContext: 'Biểu tượng bất ly thân của các liền chị Quan họ Bắc Ninh khi trẩy hội xuân giao duyên.',
    visualTraits: 'Nón tròn dẹt vành rộng đan lá cọ có quai tơ thao thao buông dài chấm ngực gắn tua đỏ.',
    traditionalPairing: ['Áo tứ thân', 'Váy đụp', 'Khăn mỏ quạ'],
    culturalSignificance: 'Vẻ đẹp e ấp, duyên dáng và trữ tình của văn hóa đồng bằng sông Hồng.',
    academicSources: ['Văn minh Đại Việt - Nguyễn Đăng Thục'],
    rules: {
      tags: ['dan_gian', 'bac_bo', 'doi_dau'],
      forbiddenPairs: ['ao_nhat_binh', 'ao_tac'],
      conflictMessage: '🚨 Phạm quy: Nón quai thao dân gian Kinh Bắc không đội cùng đại lễ phục cung đình triều Nguyễn như Áo Nhật Bình!'
    },
    category: 'phukien',
    accGroup: 'doi_dau',
    era: 'Dân gian Kinh Bắc',
    desc: 'Nón tròn dẹt vành rộng đan lá cọ có quai tơ thao thao buông dài chấm ngực.',
    history: 'Gắn liền với các liền chị Quan họ Bắc Ninh trong những ngày hội Lim, đi cùng áo tứ thân mớ ba mớ bảy.'
  },

  // ----------------------------------------------------
  // 16. TRÂM CÀI MẠ VÀNG
  // ----------------------------------------------------
  tram_cai: {
    id: 'tram_cai',
    name: 'Trâm cài mạ vàng',
    altNames: ['Kim trâm', 'Trâm phượng'],
    period: 'Cổ phong quý tộc',
    dynasty: 'Triều Lê, Nguyễn',
    region: 'Toàn quốc',
    targetUser: 'Nữ',
    socialClass: ['Quý tộc', 'Tiểu thư khuê các'],
    occasions: ['Hỷ sự', 'Dạ yến', 'Lễ tiết'],
    historicalContext: 'Món trang sức quý giá cố định búi tóc của phụ nữ quý tộc xưa, thường là tín vật gia truyền hoặc sính lễ đính ước.',
    visualTraits: 'Trâm kim loại uốn hoa sen hoặc chim phượng đính ngọc, có dây châu rủ nhẹ bên tai.',
    traditionalPairing: ['Khăn vấn', 'Áo dài', 'Áo tấc', 'Áo Nhật Bình'],
    culturalSignificance: 'Tượng trưng cho sự cao quý, gia giáo và trinh khiết của người phụ nữ.',
    academicSources: ['Khảo cứu trang phục triều Nguyễn - Trịnh Bách'],
    rules: {
      tags: ['co_phuc', 'quy_toc', 'doi_dau'],
      forbiddenPairs: [],
      conflictMessage: ''
    },
    category: 'phukien',
    accGroup: 'doi_dau',
    era: 'Cổ phong quý tộc',
    desc: 'Trâm kim loại uốn họa tiết phượng hoàng hoặc hoa sen đính đá quý.',
    history: 'Vật trang sức quý giá cố định búi tóc của phụ nữ quý tộc xưa, thường là tín vật gia truyền hoặc kỷ vật đính ước.'
  },

  // ----------------------------------------------------
  // 17. TAI NGHE CHỤP TAI
  // ----------------------------------------------------
  tai_nghe: {
    id: 'tai_nghe',
    name: 'Tai nghe chụp tai',
    altNames: ['Headphone Over-ear', 'Tai nghe Cyber'],
    period: 'Cyber / Gen Z',
    dynasty: 'Thời kỳ Hiện đại',
    region: 'Toàn cầu',
    targetUser: 'Cả hai',
    socialClass: ['Giới trẻ Gen Z', 'Cộng đồng công nghệ số'],
    occasions: ['Dạo phố', 'Nghe nhạc', 'Remix streetwear'],
    historicalContext: 'Biểu tượng phong cách sống số năng động và độc lập của thế hệ Z thế kỷ 21.',
    visualTraits: 'Thiết kế over-ear công nghệ cao, màu sắc vị lai tương phản mạnh với cổ phục.',
    traditionalPairing: ['Áo ngũ thân remix', 'Quần jeans', 'Sneaker'],
    culturalSignificance: 'Tuyên ngôn giao thoa giữa di sản quá khứ và nhịp sống công nghệ hiện đại.',
    academicSources: ['Youth Culture & Cyber Aesthetics in 21st Century'],
    rules: {
      tags: ['hien_dai', 'cyber', 'doi_dau'],
      forbiddenPairs: ['ao_nhat_binh', 'ao_tac'],
      conflictMessage: '⚠️ Tai nghe công nghệ phá vỡ không gian linh thiêng của đại lễ phục cung đình tế tự.'
    },
    category: 'phukien',
    accGroup: 'doi_dau',
    era: 'Cyber / Gen Z',
    desc: 'Headphone Over-ear công nghệ cao mang vibe Cyberpunk đường phố.',
    history: 'Món phụ kiện công nghệ biểu tượng cho phong cách sống năng động kết nối của thế hệ số.'
  },

  // ----------------------------------------------------
  // 18. KÍNH RÂM ĐEN
  // ----------------------------------------------------
  kinh_ram: {
    id: 'kinh_ram',
    name: 'Kính râm đen',
    altNames: ['Black Shades', 'Kính mát Cool-kid'],
    period: 'Hiện đại Cool-kid',
    dynasty: 'Thời kỳ Hiện đại',
    region: 'Toàn cầu',
    targetUser: 'Cả hai',
    socialClass: ['Giới trẻ Gen Z', 'Streetwear'],
    occasions: ['Dạo phố nắng hè', 'Chụp ảnh lookbook'],
    historicalContext: 'Phụ kiện thời trang kinh điển mang lại vẻ ngầu, bí ẩn và khí chất hiện đại.',
    visualTraits: 'Tròng kính tối màu góc cạnh, gọng đen bóng tạo điểm nhấn thị giác sắc nét.',
    traditionalPairing: ['Áo ngũ thân', 'Quần jeans', 'Sneaker low'],
    culturalSignificance: 'Biến set đồ cổ phong thành một tuyên ngôn thời trang đường phố cá tính.',
    academicSources: ['Visual Subcultures & Fashion Identity'],
    rules: {
      tags: ['hien_dai', 'streetwear', 'kinh'],
      forbiddenPairs: ['ao_nhat_binh'],
      conflictMessage: '⚠️ Kính râm không phù hợp với quy chuẩn lễ nghi chốn cung đình.'
    },
    category: 'phukien',
    accGroup: 'kinh',
    era: 'Hiện đại Cool-kid',
    desc: 'Mắt kính thời trang tối màu góc cạnh tạo điểm nhấn ngầu và bí ẩn.',
    history: 'Món phụ kiện giúp biến set đồ cổ phong thành một tuyên ngôn thời trang streetwear thời thượng.'
  },

  // ----------------------------------------------------
  // 19. KÍNH TRÒN RETRO
  // ----------------------------------------------------
  kinh_tron: {
    id: 'kinh_tron',
    name: 'Kính tròn Retro',
    altNames: ['Kính thầy đồ tân thời', 'Kính trí thức Đông Dương'],
    period: 'Vintage / Y2K',
    dynasty: 'Thời kỳ Cận đại (Đông Dương 1920-1945)',
    region: 'Việt Nam & Phương Tây',
    targetUser: 'Cả hai',
    socialClass: ['Trí thức', 'Văn nhân Đông Dương'],
    occasions: ['Hội thảo văn hóa', 'Dạo phố hoài niệm', 'Đọc sách'],
    historicalContext: 'Phổ biến từ thập niên 1920-1930 thời Đông Dương, gắn với hình ảnh giới tân học trí thức mặc áo ngũ thân mang kính gọng tròn.',
    visualTraits: 'Tròng tròn kim loại ánh vàng thanh mảnh, tạo khí chất nho nhã hoài cổ.',
    traditionalPairing: ['Áo ngũ thân', 'Khăn xếp', 'Quần lụa', 'Giày Oxford'],
    culturalSignificance: 'Biểu trưng cho thời kỳ giao thời Á - Âu và tầng lớp trí thức tiến bộ đầu thế kỷ 20.',
    academicSources: ['Văn hóa phục trang thời kỳ Pháp thuộc tại Việt Nam'],
    rules: {
      tags: ['hien_dai', 'vintage', 'kinh', 'tri_thuc'],
      forbiddenPairs: [],
      conflictMessage: ''
    },
    category: 'phukien',
    accGroup: 'kinh',
    era: 'Vintage / Y2K',
    desc: 'Kính gọng tròn mảnh ánh kim mang vibe trí thức hoài niệm.',
    history: 'Phổ biến từ thập niên 1920-1930 thời Đông Dương, biểu trưng cho giới tân học trí thức Việt Nam xưa.'
  },

  // ----------------------------------------------------
  // 20. KIM KHÁNH QUÝ TỘC
  // ----------------------------------------------------
  kim_khanh: {
    id: 'kim_khanh',
    name: 'Kim khánh quý tộc',
    altNames: ['Kim khánh bài', 'Bội tinh hoàng triều'],
    period: 'Triều Nguyễn',
    dynasty: 'Triều Nguyễn',
    region: 'Kinh đô Huế',
    targetUser: 'Cả hai',
    socialClass: ['Hoàng thân', 'Đại thần', 'Mệnh phụ cao cấp'],
    occasions: ['Đại lễ triều đình', 'Tế Nam Giao', 'Hỷ sự cung đình'],
    historicalContext: 'Bội tinh bằng vàng hình chiếc khánh của triều đình nhà Nguyễn dùng để ban thưởng công trạng hoặc đeo trong đại lễ.',
    visualTraits: 'Khánh chạm vàng rực rỡ có tua rua son đỏ buông trước ngực, hoa văn rồng mây hoặc chữ Thọ.',
    traditionalPairing: ['Áo Nhật Bình', 'Áo Tấc', 'Khăn vành dây'],
    culturalSignificance: 'Phẩm hàm danh giá và đỉnh cao nghệ thuật kim hoàn mỹ nghệ cung đình Huế.',
    academicSources: ['Khâm định Đại Nam hội điển sự lệ', 'Khảo cứu trang phục triều Nguyễn - Trịnh Bách'],
    rules: {
      tags: ['hoang_gia', 'quy_toc', 'le_phuc', 'trang_suc'],
      forbiddenPairs: ['vay_dup', 'quan_short', 'dep_le'],
      conflictMessage: '🚨 Kim khánh hoàng tộc đại kỵ đeo cùng trang phục dân gian bình dân hay đồ ngắn dạo phố.'
    },
    category: 'phukien',
    accGroup: 'trang_suc',
    era: 'Triều Nguyễn',
    desc: 'Khánh chạm vàng hình khánh nhạc treo trước ngực có tua rua đỏ lộng lẫy.',
    history: 'Bội tinh ban thưởng của triều đình Nguyễn dành cho người có công hoặc trang sức tế lễ hoàng tộc.'
  },

  // ----------------------------------------------------
  // 21. TÚI TOTE CANVAS
  // ----------------------------------------------------
  tui_tote: {
    id: 'tui_tote',
    name: 'Túi Tote Canvas',
    altNames: ['Eco bag', 'Túi vải canvas Gen Z'],
    period: 'Eco-Fashion Hiện đại',
    dynasty: 'Thời kỳ Hiện đại',
    region: 'Toàn cầu',
    targetUser: 'Cả hai',
    socialClass: ['Sinh viên', 'Giới trẻ Gen Z'],
    occasions: ['Đi học', 'Dạo phố', 'Cà phê cuối tuần'],
    historicalContext: 'Món đồ tiện ích được giới trẻ ưa chuộng nhằm lan tỏa lối sống xanh và sự tiện lợi thường nhật.',
    visualTraits: 'Vải bố canvas màu mộc, in họa tiết Remix đương đại, quai đeo vai khỏe khoắn.',
    traditionalPairing: ['Áo ngũ thân', 'Quần kaki', 'Sneaker low'],
    culturalSignificance: 'Tinh thần sống xanh, hiện đại kết hợp tiện ích thực tế khi dạo phố cùng cổ phục.',
    academicSources: ['Sustainable Fashion & Gen Z Urban Culture'],
    rules: {
      tags: ['hien_dai', 'eco', 'tui_xach'],
      forbiddenPairs: ['ao_nhat_binh', 'ao_tac'],
      conflictMessage: '⚠️ Túi vải canvas đường phố không phù hợp với đại lễ phục tôn nghiêm cung đình.'
    },
    category: 'phukien',
    accGroup: 'tui_xach',
    era: 'Eco-Fashion Hiện đại',
    desc: 'Túi vải canvas mộc mạc tiện dụng mang theo sách vở và laptop.',
    history: 'Được giới trẻ và sinh viên yêu thích nhờ tính ứng dụng cao và tinh thần sống xanh thân thiện môi trường.'
  },

  // ----------------------------------------------------
  // 22. QUẠT XẾP LỤA ĐỎ
  // ----------------------------------------------------
  quat_xep: {
    id: 'quat_xep',
    name: 'Quạt xếp lụa đỏ',
    altNames: ['Quạt the', 'Quạt lụa cầm tay'],
    period: 'Cổ phong Tao nhã',
    dynasty: 'Thời Lê, Nguyễn đến nay',
    region: 'Toàn quốc',
    targetUser: 'Cả hai',
    socialClass: ['Tao nhân mặc khách', 'Nho sĩ', 'Khuê các'],
    occasions: ['Dạo phố', 'Ngâm thơ', 'Hỷ sự', 'Chụp ảnh nghệ thuật'],
    historicalContext: 'Vật phẩm tùy thân bất ly thân của người xưa, vừa tạo gió mát vừa là đạo cụ giao duyên ý nhị và biểu lộ khí chất văn nhã.',
    visualTraits: 'Nan tre chuốt bóng bọc lụa son đỏ hoặc the đen, đầu gắn ngọc hoặc tua rua buông lơi.',
    traditionalPairing: ['Áo ngũ thân', 'Áo dài', 'Áo tấc'],
    culturalSignificance: 'Biểu trưng của sự thanh tao, nho nhã và phong thái an nhiên tự tại.',
    academicSources: ['Ngàn năm áo mũ - Trần Quang Đức'],
    rules: {
      tags: ['co_phuc', 'tao_nha', 'tui_xach'],
      forbiddenPairs: [],
      conflictMessage: ''
    },
    category: 'phukien',
    accGroup: 'tui_xach',
    era: 'Cổ phong Tao nhã',
    desc: 'Quạt nan tre bọc lụa thêu hoa văn, vật tùy thân thanh lịch tao nhã.',
    history: 'Vật phẩm bất ly thân của tao nhân mặc khách, vừa để đón gió mát vừa là đạo cụ giao duyên ý nhị.'
  },

  // ----------------------------------------------------
  // 23. GUỐC MỘC
  // ----------------------------------------------------
  guoc_moc: {
    id: 'guoc_moc',
    name: 'Guốc mộc',
    altNames: ['Guốc gỗ', 'Guốc quai son'],
    period: 'Cổ truyền Việt Nam',
    dynasty: 'Thời Lý, Trần, Lê, Nguyễn',
    region: 'Toàn quốc',
    targetUser: 'Cả hai',
    socialClass: ['Mọi tầng lớp'],
    occasions: ['Thường nhật', 'Lễ hội', 'Dạo phố'],
    historicalContext: 'Gắn bó hàng nghìn năm với bước chân người Việt từ nông thôn đến chốn kinh kỳ hoa lệ, tạo âm thanh lách cách vui tai.',
    visualTraits: 'Đế đẽo từ gỗ mộc mạc, quai bằng da hoặc vải gấm thêu hoa văn tinh tế.',
    traditionalPairing: ['Áo dài', 'Áo tứ thân', 'Áo ngũ thân'],
    culturalSignificance: 'Biểu tượng của nét đẹp thuần khiết, thanh bần và mộc mạc của tâm hồn Việt.',
    academicSources: ['Văn minh Đại Việt - Nguyễn Đăng Thục', 'Trang phục Việt Nam - Đoàn Thị Tình'],
    rules: {
      tags: ['co_phuc', 'dan_gian', 'thanh_nha'],
      forbiddenPairs: [],
      conflictMessage: ''
    },
    category: 'giay',
    era: 'Cổ truyền Việt Nam',
    desc: 'Guốc gỗ đẽo tay mộc mạc quai da/vải son, tạo âm thanh lách cách vui tai.',
    history: 'Gắn bó hàng trăm năm với bước chân người Việt khắp thôn quê đến phố thị, tôn nét thanh tao thuần khiết.'
  },

  // ----------------------------------------------------
  // 24. HÀI THÊU HOA VĂN
  // ----------------------------------------------------
  hai_theu: {
    id: 'hai_theu',
    name: 'Hài thêu hoa văn',
    altNames: ['Hài cung đình', 'Hài phụng', 'Hài cong mũi'],
    period: 'Cung đình & Quý tộc',
    dynasty: 'Triều Nguyễn',
    region: 'Kinh đô Huế',
    targetUser: 'Cả hai (đặc biệt là Nữ)',
    socialClass: ['Hoàng tộc', 'Quan lại', 'Quý phái'],
    occasions: ['Đại lễ', 'Hỷ sự cung đình', 'Tế tự'],
    historicalContext: 'Món đồ đi chân nghi lễ sang trọng chốn quyền quý triều Nguyễn, giúp từng bước đi trở nên đoan trang, khoan thai.',
    visualTraits: 'Mũi hài cong vút nhẹ nhàng, bọc gấm sa thêu chỉ ngũ sắc chỉ vàng hình hoa mẫu đơn, mây cuộn và chim phượng.',
    traditionalPairing: ['Áo Nhật Bình', 'Áo Tấc', 'Quần lụa bạch'],
    culturalSignificance: 'Đỉnh cao của nghệ thuật thủ công thêu thùa và phẩm hạnh đoan trang cung đình.',
    academicSources: ['Khảo cứu trang phục triều Nguyễn - Trịnh Bách'],
    rules: {
      tags: ['hoang_gia', 'co_phuc', 'trang_trong', 'le_phuc'],
      forbiddenPairs: ['quan_short', 'vay_ngan', 'vay_dup'],
      conflictMessage: '🚨 Hài thêu cung đình tôn nghiêm không phối cùng đồ ngắn hay váy đụp lao động.'
    },
    category: 'giay',
    era: 'Cung đình & Quý tộc',
    desc: 'Hài mũi cong thêu chỉ ngũ sắc chỉ vàng hình hoa mẫu đơn và mây cuộn.',
    history: 'Đôi hài đi cùng áo tấc, áo nhật bình chốn quyền quý, từng bước chân đoan trang nhẹ tựa cánh hoa.'
  },

  // ----------------------------------------------------
  // 25. SNEAKER HẦM HỐ (CHUNKY)
  // ----------------------------------------------------
  sneaker_chunky: {
    id: 'sneaker_chunky',
    name: 'Sneaker hầm hố (Chunky)',
    altNames: ['Dad shoes', 'Chunky sneakers'],
    period: 'Streetwear Y2K',
    dynasty: 'Thời kỳ Hiện đại',
    region: 'Toàn cầu',
    targetUser: 'Cả hai',
    socialClass: ['Streetwear Gen Z'],
    occasions: ['Dạo phố', 'Concert rap', 'Chụp ảnh đường phố'],
    historicalContext: 'Trào lưu sneaker chunky thống trị thời trang đường phố toàn cầu, tạo hiệu ứng thị giác mạnh mẽ.',
    visualTraits: 'Đế thô dày cộm hầm hố, phối màu tương phản cao mang vibe vị lai cyberpunk.',
    traditionalPairing: ['Quần jeans', 'Quần short', 'Áo ngũ thân remix'],
    culturalSignificance: 'Phá vỡ mọi quy chuẩn truyền thống, thể hiện cái tôi nổi loạn đầy sức sống của thế hệ số.',
    academicSources: ['Sneakers: Fashion, Gender, and Subculture - Yuniya Kawamura'],
    rules: {
      tags: ['hien_dai', 'streetwear', 'chunky'],
      forbiddenPairs: ['ao_nhat_binh', 'ao_tac'],
      conflictMessage: '🚨 Sneaker hầm hố quá khập khiễng và làm mất đi sự tôn nghiêm của đại lễ phục cung đình.'
    },
    category: 'giay',
    era: 'Streetwear Y2K',
    desc: 'Giày thể thao đế thô dày cộm mạnh mẽ mang vibe vị lai cá tính.',
    history: 'Trào lưu sneaker chunky thống trị thời trang đường phố toàn cầu, phá vỡ mọi quy chuẩn truyền thống.'
  },

  // ----------------------------------------------------
  // 26. SNEAKER CỔ THẤP
  // ----------------------------------------------------
  sneaker_low: {
    id: 'sneaker_low',
    name: 'Sneaker cổ thấp',
    altNames: ['Low-top classic', 'Sneaker trắng tối giản'],
    period: 'Hiện đại Classic',
    dynasty: 'Thời kỳ Hiện đại',
    region: 'Toàn cầu',
    targetUser: 'Cả hai',
    socialClass: ['Đại chúng Gen Z'],
    occasions: ['Dạo phố', 'Đi học', 'Du lịch'],
    historicalContext: 'Món đồ kinh điển của giới trẻ toàn cầu, dễ phối với hầu hết mọi loại trang phục.',
    visualTraits: 'Đế cao su phẳng thanh gọn, da hoặc vải canvas trắng tinh tế, phom dáng nhẹ nhàng.',
    traditionalPairing: ['Áo ngũ thân', 'Áo dài', 'Quần jeans', 'Quần kaki'],
    culturalSignificance: 'Sự hòa trộn tinh tế giữa vẻ cổ điển Á Đông và phong cách sống hiện đại năng động.',
    academicSources: ['Sneaker Culture Studies'],
    rules: {
      tags: ['hien_dai', 'classic', 'nang_dong'],
      forbiddenPairs: ['ao_nhat_binh'],
      conflictMessage: '⚠️ Sneaker không phù hợp với lễ phục Hậu phi hoàng cung.'
    },
    category: 'giay',
    era: 'Hiện đại Classic',
    desc: 'Giày sneaker trắng tối giản phom thanh gọn, dễ ứng dụng hàng ngày.',
    history: 'Item "must-have" của giới trẻ, khi kết hợp với áo ngũ thân hay áo dài tạo nét hòa trộn Đông-Tây trẻ trung.'
  },

  // ----------------------------------------------------
  // 27. GIÀY OXFORD
  // ----------------------------------------------------
  oxford: {
    id: 'oxford',
    name: 'Giày Oxford',
    altNames: ['Oxford shoes', 'Giày da học đường'],
    period: 'Cổ điển phương Tây',
    dynasty: 'Hiện đại & Cận đại',
    region: 'Châu Âu & Đông Dương',
    targetUser: 'Cả hai',
    socialClass: ['Trí thức', 'Dark Academia'],
    occasions: ['Lễ tốt nghiệp', 'Hội thảo', 'Sự kiện trang trọng'],
    historicalContext: 'Biểu tượng giày da buộc dây học thuật danh giá từ Anh quốc, du nhập Việt Nam thời kỳ Đông Dương.',
    visualTraits: 'Da bóng viền chỉ đục lỗ tinh xảo, buộc dây lịch lãm, phom cứng cáp đĩnh đạc.',
    traditionalPairing: ['Áo ngũ thân', 'Quần kaki', 'Kính tròn retro'],
    culturalSignificance: 'Khí chất học giả, trí thức giao thoa Đông - Tây đầy chiều sâu văn hóa.',
    academicSources: ['History of Western Footwear & Eastern Adoption'],
    rules: {
      tags: ['hien_dai', 'co_dien_tay', 'tri_thuc'],
      forbiddenPairs: ['vay_dup'],
      conflictMessage: '⚠️ Giày Oxford âu phục phương Tây lạc quẻ hoàn toàn khi phối cùng váy đụp thâm dân gian Kinh Bắc.'
    },
    category: 'giay',
    era: 'Cổ điển phương Tây',
    desc: 'Giày da buộc dây lịch lãm phong cách học đường Anh quốc (Dark Academia).',
    history: 'Sự giao thoa thanh lịch mang lại khí chất trí thức hiện đại khi kết hợp cùng áo ngũ thân.'
  },

  // ----------------------------------------------------
  // 28. GIÀY LOAFER
  // ----------------------------------------------------
  loafer: {
    id: 'loafer',
    name: 'Giày Loafer',
    altNames: ['Giày lười da', 'Penny Loafer'],
    period: 'Smart Modern',
    dynasty: 'Thời kỳ Hiện đại',
    region: 'Toàn cầu',
    targetUser: 'Cả hai',
    socialClass: ['Smart Casual', 'Trí thức trẻ'],
    occasions: ['Dạo phố', 'Công sở', 'Dự tiệc'],
    historicalContext: 'Mẫu giày xỏ chân tiện lợi kết hợp nét sang trọng và phóng khoáng.',
    visualTraits: 'Da trơn mềm mại, không dây buộc, đế thấp thanh lịch mang lại cảm giác thoải mái.',
    traditionalPairing: ['Áo ngũ thân', 'Áo dài', 'Quần kaki', 'Quần lụa'],
    culturalSignificance: 'Phong thái chỉn chu, đĩnh đạc nhưng không quá gò bó của nhịp sống hiện đại.',
    academicSources: ['Modern Footwear & Smart-Casual Culture'],
    rules: {
      tags: ['hien_dai', 'smart_casual', 'thanh_lich'],
      forbiddenPairs: ['ao_nhat_binh'],
      conflictMessage: '⚠️ Giày lười dạo phố không dùng cho lễ phục hoàng gia triều đình.'
    },
    category: 'giay',
    era: 'Smart Modern',
    desc: 'Giày da lười xỏ chân thanh thoát, đế nhẹ tinh tế.',
    history: 'Mang lại sự chỉn chu không cầu kỳ, rất phù hợp với phong cách tân thời giao thoa.'
  },

  // ----------------------------------------------------
  // 29. DÉP LÊ
  // ----------------------------------------------------
  dep_le: {
    id: 'dep_le',
    name: 'Dép lê',
    altNames: ['Dép quai ngang', 'Dép đi trong nhà'],
    period: 'Thường nhật bình dân',
    dynasty: 'Thời kỳ Hiện đại',
    region: 'Toàn quốc',
    targetUser: 'Cả hai',
    socialClass: ['Bình dân thường nhật'],
    occasions: ['Đi chợ', 'Ở nhà', 'Đi mưa'],
    historicalContext: 'Món đồ tiện ích tối đa cho sinh hoạt hàng ngày trong gia đình.',
    visualTraits: 'Quai ngang nhựa hoặc cao su xốp, thiết kế tối giản phục vụ tiện ích.',
    traditionalPairing: ['Quần short', 'Đồ mặc nhà'],
    culturalSignificance: 'Thuần túy tính năng sinh hoạt, hoàn toàn không mang giá trị lễ nghi.',
    academicSources: ['Everyday Life & Domestic Material Culture'],
    rules: {
      tags: ['binh_dan', 'thuong_nhat'],
      forbiddenPairs: ['ao_nhat_binh', 'ao_tac', 'ao_ngu_than', 'ao_dai'],
      conflictMessage: '🚨 Đại kỵ thẩm mỹ: Cổ phục luôn đòi hỏi sự đoan trang, nghiêm túc. Mang dép lê làm mất hoàn toàn sự tôn nghiêm và giá trị văn hóa của y phục!'
    },
    category: 'giay',
    era: 'Thường nhật bình dân',
    desc: 'Dép quai ngang nhựa/xốp đi ở nhà thoải mái.',
    history: 'Món đồ tiện lợi khi ở nhà hoặc đi chợ, tuy nhiên rất kiêng kỵ khi mặc cùng trang phục lễ nghi nghiêm túc.'
  },

  // ----------------------------------------------------
  // 30. DÉP XỎ NGÓN
  // ----------------------------------------------------
  dep_xo_ngon: {
    id: 'dep_xo_ngon',
    name: 'Dép xỏ ngón',
    altNames: ['Dép kẹp', 'Flip-flops'],
    period: 'Dã ngoại / Đi biển',
    dynasty: 'Thời kỳ Hiện đại',
    region: 'Toàn cầu',
    targetUser: 'Cả hai',
    socialClass: ['Đại chúng'],
    occasions: ['Đi biển', 'Bể bơi', 'Dạo mát mùa hè'],
    historicalContext: 'Món đồ bảo hộ chân tối giản cho các hoạt động thể thao dưới nước và bãi biển.',
    visualTraits: 'Quai chữ Y kẹp ngón chân, đế mỏng dẹt hoàn toàn.',
    traditionalPairing: ['Đồ bơi', 'Quần đi biển'],
    culturalSignificance: 'Phục vụ hoạt động nghỉ dưỡng dã ngoại ngoài trời.',
    academicSources: ['Beachwear and Casual Lifestyle Evolution'],
    rules: {
      tags: ['thuong_nhat', 'di_bien'],
      forbiddenPairs: ['ao_nhat_binh', 'ao_tac', 'ao_ngu_than', 'ao_dai'],
      conflictMessage: '🚨 Phản cảm văn hóa: Dép xỏ ngón đi biển phá hỏng hoàn toàn nét kín đáo, tôn nghiêm và phép tắc lễ nghi của cổ phục truyền thống!'
    },
    category: 'giay',
    era: 'Dã ngoại / Đi biển',
    desc: 'Dép kẹp cao su ngón chân siêu tối giản.',
    history: 'Phù hợp khi đi biển dạo mát, hoàn toàn lạc quẻ và làm mất đi sự tôn nghiêm kín đáo của cổ phục.'
  }
};

// TRÍCH XUẤT CÁC DANH SÁCH TỪ DATABASE CHUẨN HÓA
export const ALL_ITEMS: CulturalItem[] = Object.values(culturalDatabase);
export const TOPS: CulturalItem[] = ALL_ITEMS.filter(item => item.category === 'ao');
export const BOTTOMS: CulturalItem[] = ALL_ITEMS.filter(item => item.category === 'quan');
export const ACCESSORIES: CulturalItem[] = ALL_ITEMS.filter(item => item.category === 'phukien');
export const SHOES: CulturalItem[] = ALL_ITEMS.filter(item => item.category === 'giay');

// =========================================================================
// HÀM KIỂM TRA QUY TẮC VĂN HÓA (VALIDATE OUTFIT ENGINE)
// Đọc động từ culturalDatabase (Không dùng if/else cứng)
// =========================================================================

export interface OutfitAlert {
  id: string;
  level: 'red' | 'orange' | 'green';
  title: string;
  message: string;
  itemA?: string;
  itemB?: string;
}

export function validateOutfit(
  topId: string,
  bottomId: string,
  shoesId: string,
  accessoryIds: string[] | string
): OutfitAlert[] {
  const accList = Array.isArray(accessoryIds) ? accessoryIds : (accessoryIds ? [accessoryIds] : []);
  const activeIds = [topId, bottomId, shoesId, ...accList].filter(Boolean);
  
  // Lookup trực tiếp vào culturalDatabase
  const activeItems = activeIds
    .map(id => culturalDatabase[id])
    .filter((item): item is CulturalItem => Boolean(item));

  const alerts: OutfitAlert[] = [];
  const addedKeys = new Set<string>();

  // 1. DUYỆT QUA FORBIDDEN PAIRS GIỮA TỪNG CẶP ITEM
  for (const itemA of activeItems) {
    if (!itemA.rules?.forbiddenPairs) continue;
    for (const itemB of activeItems) {
      if (itemA.id === itemB.id) continue;
      if (itemA.rules.forbiddenPairs.includes(itemB.id)) {
        const key = `forbidden_${itemA.id}_${itemB.id}`;
        const reverseKey = `forbidden_${itemB.id}_${itemA.id}`;
        if (!addedKeys.has(key) && !addedKeys.has(reverseKey)) {
          addedKeys.add(key);
          alerts.push({
            id: key,
            level: 'red',
            title: `Đại kỵ phối đồ: ${itemA.name} × ${itemB.name}`,
            message: itemA.rules.conflictMessage || `🚨 Không phối ${itemA.name} cùng ${itemB.name} do xung đột lễ nghi nghiêm ngặt.`,
            itemA: itemA.id,
            itemB: itemB.id,
          });
        }
      }
    }
  }

  // 2. MỞ RỘNG CHECK BẰNG TAGS
  // a) Tag 'hoang_gia' vs 'binh_dan' -> Lỗi giai cấp lịch sử (Cảnh báo ĐỎ)
  const hoangGiaItem = activeItems.find(i => i.rules.tags?.includes('hoang_gia'));
  const binhDanItem = activeItems.find(i => i.rules.tags?.includes('binh_dan'));
  if (hoangGiaItem && binhDanItem) {
    const key = `class_conflict_${hoangGiaItem.id}_${binhDanItem.id}`;
    if (!addedKeys.has(key)) {
      addedKeys.add(key);
      alerts.push({
        id: key,
        level: 'red',
        title: 'Lỗi giai cấp lịch sử',
        message: `🚨 Lỗi giai cấp lịch sử: Kết hợp ${hoangGiaItem.name} (biểu tượng hoàng gia/quý tộc) với ${binhDanItem.name} (trang phục bình dân) mâu thuẫn bối cảnh lễ nghi phong kiến.`,
        itemA: hoangGiaItem.id,
        itemB: binhDanItem.id,
      });
    }
  }

  // b) Tag 'co_phuc_ta_dai' vs 'quan_ngan' -> Lỗi cấu trúc trang phục (Cảnh báo CAM)
  const taDaiItem = activeItems.find(i => i.rules.tags?.includes('co_phuc_ta_dai'));
  const quanNganItem = activeItems.find(i => i.rules.tags?.includes('quan_ngan'));
  if (taDaiItem && quanNganItem) {
    const key = `structure_conflict_${taDaiItem.id}_${quanNganItem.id}`;
    if (!addedKeys.has(key)) {
      addedKeys.add(key);
      alerts.push({
        id: key,
        level: 'orange',
        title: 'Lỗi cấu trúc trang phục',
        message: `⚠️ Lỗi cấu trúc trang phục: Cổ phục tà dài (${taDaiItem.name}) kết hợp với ${quanNganItem.name} phá vỡ tỷ lệ trang trọng và kết cấu trang phục truyền thống.`,
        itemA: taDaiItem.id,
        itemB: quanNganItem.id,
      });
    }
  }

  // c) Dép lê / Dép xỏ ngón với cổ phục tà dài (Kiểm tra thẩm mỹ)
  const coPhucItem = activeItems.find(i => i.rules.tags?.includes('co_phuc'));
  const depItem = activeItems.find(i => i.id === 'dep_le' || i.id === 'dep_xo_ngon');
  if (coPhucItem && depItem) {
    const key = `dep_conflict_${coPhucItem.id}_${depItem.id}`;
    if (!addedKeys.has(key)) {
      addedKeys.add(key);
      alerts.push({
        id: key,
        level: 'red',
        title: 'Báo động thẩm mỹ & lễ nghi',
        message: `🚨 Cổ phục luôn mang tính trang nghiêm, lịch sự. Mang ${depItem.name} làm mất đi hoàn toàn sự tôn nghiêm và giá trị văn hóa!`,
        itemA: coPhucItem.id,
        itemB: depItem.id,
      });
    }
  }

  // d) Khuyến khích Remix sáng tạo chuẩn gu nếu không bị cảnh báo đỏ
  const hasRedAlert = alerts.some(a => a.level === 'red');
  const hasCoPhuc = activeItems.some(i => i.rules.tags?.includes('co_phuc'));
  const hasModern = activeItems.some(i => 
    i.rules.tags?.includes('hien_dai') || 
    i.rules.tags?.includes('cyber') || 
    i.rules.tags?.includes('streetwear')
  );
  if (hasCoPhuc && hasModern && !hasRedAlert) {
    alerts.push({
      id: 'remix_creative_harmony',
      level: 'green',
      title: 'Remix sáng tạo chuẩn gu',
      message: '✨ Remix phá cách: Giao thoa Tân - Cổ rất tuyệt cho dạo phố, tạo nên vibe Cyber-Cổ phục cực chất!',
    });
  }

  return alerts;
}

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

// =========================================================================
// GIAO DIỆN TAB: THƯ VIỆN SỬ THI (EPIC LIBRARY UI)
// Thiết kế bách khoa toàn thư mini hiển thị đầy đủ 14 trường thông tin
// =========================================================================

interface EpicLibraryViewProps {
  selectedId: string;
  onSelectId: (id: string) => void;
  onEquipItem: (item: CulturalItem) => void;
  onBackToMixMatch?: () => void;
  hasInProgressOutfit?: boolean;
  currentOutfitDesc?: string;
}

function EpicLibraryView({ 
  selectedId, 
  onSelectId, 
  onEquipItem,
  onBackToMixMatch,
  hasInProgressOutfit,
  currentOutfitDesc
}: EpicLibraryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ao' | 'quan' | 'phukien' | 'giay'>('all');

  // Lọc danh sách theo từ khóa & danh mục
  const filteredItems = useMemo(() => {
    return ALL_ITEMS.filter(item => {
      // Lọc danh mục
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Lọc tìm kiếm
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchAlt = item.altNames?.some(alt => alt.toLowerCase().includes(q));
      const matchPeriod = item.period?.toLowerCase().includes(q);
      const matchDynasty = item.dynasty?.toLowerCase().includes(q);
      const matchRegion = item.region?.toLowerCase().includes(q);
      const matchSources = item.academicSources?.some(src => src.toLowerCase().includes(q));
      const matchTags = item.rules?.tags?.some(tag => tag.toLowerCase().includes(q));
      const matchClass = item.socialClass?.some(sc => sc.toLowerCase().includes(q));
      return matchName || matchAlt || matchPeriod || matchDynasty || matchRegion || matchSources || matchTags || matchClass;
    });
  }, [searchQuery, selectedCategory]);

  const currentItem = culturalDatabase[selectedId] || filteredItems[0] || ALL_ITEMS[0];

  // Chuẩn bị ID trang phục để render hình minh họa AvatarComposite
  const previewTopId = currentItem.category === 'ao' ? currentItem.id : 'ao_ngu_than';
  const previewBottomId = currentItem.category === 'quan' ? currentItem.id : 'quan_lua';
  const previewShoeId = currentItem.category === 'giay' ? currentItem.id : 'hai_theu';
  const previewAccIds = currentItem.category === 'phukien' ? [currentItem.id] : [];

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-3 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fadeIn">
      {/* CỘT TRÁI (30% ~ 4/12): DANH SÁCH MÓN ĐỒ & THANH TÌM KIẾM - CỐ ĐỊNH MỤC LỤC SỬ THI */}
      <section className="lg:col-span-4 bg-white/90 backdrop-blur-md rounded-3xl border border-amber-900/10 p-4 shadow-md flex flex-col lg:sticky lg:top-20 lg:h-[calc(100vh-6.5rem)] lg:max-h-[calc(100vh-6.5rem)] z-10">
        {/* Banner quay lại bản phối dở nếu có */}
        {hasInProgressOutfit && onBackToMixMatch && (
          <div className="mb-3 p-2.5 rounded-2xl bg-amber-50 border border-amber-300/80 flex items-center justify-between gap-2 shrink-0 animate-fadeIn">
            <div className="min-w-0 text-[11px]">
              <span className="font-bold text-neutral-900 block truncate">
                Đang phối dở: <span className="text-rose-800">{currentOutfitDesc}</span>
              </span>
            </div>
            <button
              type="button"
              onClick={onBackToMixMatch}
              className="px-2.5 py-1 rounded-lg bg-neutral-900 text-amber-300 text-[11px] font-bold shrink-0 hover:bg-black transition cursor-pointer"
            >
              Phối tiếp ↗
            </button>
          </div>
        )}

        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3 shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-rose-800" />
            <h2 className="text-base font-bold text-neutral-900 font-serif">Mục lục Sử thi</h2>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 bg-[#FAF6EE] text-amber-900 border border-amber-900/15 rounded-full">
            {filteredItems.length} món đồ
          </span>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="relative mb-3 shrink-0">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên, triều đại, nguồn học thuật..."
            className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-[#FAF6EE] border border-amber-900/15 focus:bg-white focus:border-rose-600 focus:ring-1 focus:ring-rose-500/20 transition outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Bộ lọc danh mục */}
        <div className="flex flex-wrap gap-1 mb-3 pb-3 border-b border-neutral-100 text-xs shrink-0">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'ao', label: 'Áo' },
            { id: 'quan', label: 'Hạ phục' },
            { id: 'phukien', label: 'Phụ kiện' },
            { id: 'giay', label: 'Giày dép' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer text-[11px] active:scale-95 ${
                selectedCategory === cat.id
                  ? 'bg-neutral-900 text-amber-300 shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Danh sách items cuộn mượt mà trong khung cố định */}
        <div className="space-y-1.5 overflow-y-auto flex-1 pr-1">
          {filteredItems.length === 0 ? (
            <div className="p-6 text-center text-xs text-neutral-400">
              Không tìm thấy trang phục phù hợp với từ khóa "{searchQuery}"
            </div>
          ) : (
            filteredItems.map(item => {
              const isSelected = item.id === currentItem.id;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectId(item.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-rose-50/70 border-rose-600 shadow-xs ring-1 ring-rose-500/20'
                      : 'bg-white border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-50/60'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                        item.category === 'ao' ? 'bg-amber-100 text-amber-900' :
                        item.category === 'quan' ? 'bg-indigo-100 text-indigo-900' :
                        item.category === 'phukien' ? 'bg-emerald-100 text-emerald-900' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {item.category === 'ao' ? 'Áo' : item.category === 'quan' ? 'Hạ phục' : item.category === 'phukien' ? 'Phụ kiện' : 'Giày'}
                      </span>
                      {item.dynasty && (
                        <span className="text-[10px] text-neutral-500 truncate">
                          {item.dynasty.split('(')[0]}
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-xs text-neutral-900 truncate">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-neutral-500 truncate mt-0.5">
                      {item.period}
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition ${isSelected ? 'text-rose-700 translate-x-0.5' : 'text-neutral-300'}`} />
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* CỘT PHẢI (70% ~ 8/12): GIAO DIỆN TẠP CHÍ DI SẢN (EDITORIAL & CÓ HÌNH MINH HỌA) */}
      <section className="lg:col-span-8 bg-white/95 backdrop-blur-md rounded-3xl border border-amber-900/10 p-5 lg:p-8 shadow-md space-y-6">
        {/* HERO SHOWCASE: HÌNH MINH HỌA & THÔNG TIN CHÍNH */}
        <div className="pb-6 border-b border-neutral-100 flex flex-col sm:flex-row items-start gap-6">
          {/* HÌNH MINH HỌA CỔ PHỤC (AVATAR COMPOSITE SHOWCASE) */}
          <div className="w-full sm:w-44 md:w-52 aspect-[1/1.7] rounded-2xl bg-gradient-to-b from-[#FAF8F5] via-[#F5EFEB] to-[#ECE5DC] border border-amber-900/15 p-2 relative shrink-0 shadow-inner flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#b45309_0.75px,transparent_0.75px)] [background-size:14px_14px] opacity-15 pointer-events-none" />
            <AvatarComposite
              topId={previewTopId}
              bottomId={previewBottomId}
              shoeId={previewShoeId}
              accessoryIds={previewAccIds}
              topColorHex="#7B1113"
              bottomColorHex="#FAF6EE"
              gender="female"
              className="w-full h-full"
            />
            <div className="absolute bottom-2 inset-x-2 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-xs text-white text-[10px] text-center font-medium">
              Minh họa phục dựng
            </div>
          </div>

          {/* THÔNG TIN ĐẦU MỤC */}
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-900 border border-rose-200">
                  {currentItem.category === 'ao' ? 'Thượng phục (Áo)' : currentItem.category === 'quan' ? 'Hạ phục (Quần/Váy)' : currentItem.category === 'phukien' ? 'Phụ kiện' : 'Hài lý (Giày dép)'}
                </span>
                <span className="font-mono text-[11px] text-neutral-500 px-2 py-0.5 bg-neutral-100 rounded-md">
                  ID: {currentItem.id}
                </span>
              </div>

              {/* Nút hành động */}
              <div className="flex items-center gap-2">
                {hasInProgressOutfit && onBackToMixMatch && (
                  <button
                    type="button"
                    onClick={onBackToMixMatch}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 transition cursor-pointer"
                  >
                    Quay lại bản phối dở
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onEquipItem(currentItem)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-800 to-amber-700 hover:from-rose-900 hover:to-amber-800 text-white text-xs font-bold shadow-sm transition active:scale-95 cursor-pointer"
                >
                  <Shirt className="w-3.5 h-3.5" />
                  <span>Phối món này trên Avatar</span>
                </button>
              </div>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold font-serif text-neutral-900 tracking-tight">
              {currentItem.name}
            </h1>

            {currentItem.altNames && currentItem.altNames.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-500">
                <span className="font-medium text-neutral-400">Tên gọi khác:</span>
                {currentItem.altNames.map((alt, idx) => (
                  <span key={idx} className="italic text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-md">
                    "{alt}"
                  </span>
                ))}
              </div>
            )}

            {/* THẺ TÓM LƯỢC NHANH ĐỂ ĐỌC LƯỚT */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-amber-900/10">
                <span className="text-[10px] text-neutral-400 uppercase font-bold block">Triều đại</span>
                <span className="text-xs font-bold text-neutral-800 truncate block">{currentItem.dynasty || 'Dân gian truyền thống'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-amber-900/10">
                <span className="text-[10px] text-neutral-400 uppercase font-bold block">Niên đại</span>
                <span className="text-xs font-bold text-neutral-800 truncate block">{currentItem.period}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-amber-900/10">
                <span className="text-[10px] text-neutral-400 uppercase font-bold block">Khu vực</span>
                <span className="text-xs font-bold text-neutral-800 truncate block">{currentItem.region}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-amber-900/10">
                <span className="text-[10px] text-neutral-400 uppercase font-bold block">Đối tượng mặc</span>
                <span className="text-xs font-bold text-neutral-800 truncate block">{currentItem.targetUser}</span>
              </div>
            </div>
          </div>
        </div>

        {/* BỐI CẢNH LỊCH SỬ & KHỞI NGUYÊN DI SẢN (THIẾT KẾ ĐỌC LƯỚT RÕ RÀNG) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-rose-900 font-serif font-bold text-sm">
            <Landmark className="w-4 h-4 text-rose-700" />
            <span>Bối cảnh lịch sử & Khởi nguyên di sản</span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-serif pl-3.5 border-l-2 border-rose-800/40 py-1 bg-amber-50/20 rounded-r-xl">
            {currentItem.historicalContext}
          </p>
        </div>

        {/* ĐẶC ĐIỂM CẮT MAY & Ý NGHĨA VĂN HÓA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/70">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs uppercase tracking-wider">
              <Scissors className="w-3.5 h-3.5 text-neutral-600" />
              <span>Đặc điểm nhận diện & Cắt may</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {currentItem.visualTraits}
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-rose-50/40 border border-rose-200/60">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-rose-700" />
              <span>Ý nghĩa văn hóa & Mỹ học</span>
            </div>
            <p className="text-xs text-neutral-700 leading-relaxed">
              {currentItem.culturalSignificance}
            </p>
          </div>
        </div>

        {/* LỐI PHỐI TRUYỀN THỐNG & QUY TẮC AN TOÀN */}
        <div className="space-y-3 p-4 rounded-2xl bg-[#FAF6EE] border border-amber-900/10">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
              Lối phối truyền thống & Quy chuẩn
            </span>
            <div className="flex flex-wrap gap-1">
              {currentItem.rules?.tags?.map((t, idx) => (
                <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-amber-900/10 text-neutral-600">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-[11px] text-neutral-500 font-medium">Khuyên phối cùng:</span>
            {currentItem.traditionalPairing?.map((pair, idx) => (
              <span key={idx} className="text-xs px-2.5 py-0.5 rounded-lg bg-white border border-neutral-200 text-neutral-800 font-medium">
                ✓ {pair}
              </span>
            ))}
          </div>

          {currentItem.rules?.forbiddenPairs && currentItem.rules.forbiddenPairs.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center pt-2 border-t border-amber-900/10">
              <span className="text-[11px] text-rose-700 font-semibold">Cần tránh phối cùng:</span>
              {currentItem.rules.forbiddenPairs.map(forbiddenId => {
                const forbiddenItem = culturalDatabase[forbiddenId];
                return (
                  <span 
                    key={forbiddenId}
                    className="text-xs px-2 py-0.5 rounded-lg bg-rose-100 text-rose-900 font-semibold border border-rose-200"
                  >
                    ✕ {forbiddenItem?.name || forbiddenId}
                  </span>
                );
              })}
            </div>
          )}

          {currentItem.rules?.conflictMessage && (
            <p className="text-xs text-rose-800 italic bg-white/80 p-2.5 rounded-xl border border-rose-200/60">
              💡 Lưu ý: {currentItem.rules.conflictMessage}
            </p>
          )}
        </div>

        {/* NGUỒN TÀI LIỆU HỌC THUẬT */}
        <div className="pt-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Nguồn tài liệu khảo cứu</span>
          </div>
          <div className="space-y-1 text-[11px] text-neutral-500">
            {currentItem.academicSources?.map((source, idx) => (
              <div key={idx} className="flex items-baseline gap-1.5">
                <span className="text-rose-700 font-bold">[{idx + 1}]</span>
                <span className="font-serif italic text-neutral-700">{source}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// =========================================================================
// THÀNH PHẦN AVATAR COMPOSITE DÙNG CHUNG (TÁI SỬ DỤNG CHO PREVIEW, SO SÁNH VÀ LOOKBOOK)
// Tọa độ chuẩn xác viewBox="0 0 300 600"
// =========================================================================
interface AvatarCompositeProps {
  topId: string;
  bottomId: string;
  shoeId: string;
  accessoryIds: string[];
  topColorHex: string;
  bottomColorHex: string;
  gender: 'female' | 'male';
  className?: string;
}

export function AvatarComposite({
  topId,
  bottomId,
  shoeId,
  accessoryIds,
  topColorHex,
  bottomColorHex,
  gender,
  className = "w-full max-w-[320px] aspect-[1/2]"
}: AvatarCompositeProps) {
  const hasClasped = topId === 'ao_tac' || topId === 'ao_nhat_binh' || topId === 'ao_ngu_than' || topId === 'ao_dai' || topId === 'ao_tu_than';
  const hasWideSleeve = topId === 'ao_tac' || topId === 'ao_nhat_binh';

  return (
    <div className={`relative isolate bg-radial from-neutral-50 to-neutral-200/70 rounded-2xl border border-neutral-200/80 shadow-inner flex items-center justify-center p-2 overflow-hidden ${className}`}>
      {/* Lưới sàn thẩm mỹ tối giản */}
      <div className="absolute bottom-6 inset-x-8 h-8 rounded-[100%] bg-neutral-300/40 blur-[3px] pointer-events-none" />

      {/* Z-INDEX 10: BASE AVATAR THEO GIỚI TÍNH & TƯ THẾ */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <BaseAvatarSvg gender={gender} isClasped={hasClasped} />
      </div>

      {/* Z-INDEX 20: QUẦN / VÁY */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <BottomSvg itemId={bottomId} color={bottomColorHex} gender={gender} />
      </div>

      {/* Z-INDEX 30: ÁO NGOÀI */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <TopSvg itemId={topId} color={topColorHex} gender={gender} isClasped={hasClasped} />
      </div>

      {/* Z-INDEX 25/35: BÀN TAY */}
      <div className={`absolute inset-0 pointer-events-none ${hasWideSleeve ? 'z-[25]' : 'z-[35]'}`}>
        <HandsSvg gender={gender} isClasped={hasClasped} />
      </div>

      {/* Z-INDEX 32: GIÀY DÉP */}
      <div className="absolute inset-0 z-[32] pointer-events-none">
        <ShoeSvg itemId={shoeId} />
      </div>

      {/* Z-INDEX 40: PHỤ KIỆN */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <AccessorySvg itemIds={accessoryIds} />
      </div>
    </div>
  );
}

// =========================================================================
// TÍNH NĂNG 2: MODAL SO SÁNH PHƯƠNG ÁN (OUTFIT COMPARISON MODAL)
// =========================================================================
interface ComparisonModalProps {
  draftA: OutfitState;
  draftB: OutfitState;
  contextEvent?: string;
  onSelectOutfit: (outfit: OutfitState) => void;
  onClose: () => void;
  onClearDrafts: () => void;
}

export function ComparisonModal({
  draftA,
  draftB,
  contextEvent,
  onSelectOutfit,
  onClose,
  onClearDrafts
}: ComparisonModalProps) {
  const itemTopA = culturalDatabase[draftA.top];
  const itemBottomA = culturalDatabase[draftA.bottom];
  const itemShoeA = culturalDatabase[draftA.shoes];
  const harmonyA = evaluateColorHarmony(draftA.topColor, draftA.bottomColor);

  const itemTopB = culturalDatabase[draftB.top];
  const itemBottomB = culturalDatabase[draftB.bottom];
  const itemShoeB = culturalDatabase[draftB.shoes];
  const harmonyB = evaluateColorHarmony(draftB.topColor, draftB.bottomColor);

  const [aiAnalysis, setAiAnalysis] = useState<{
    overview?: string;
    outfitA?: { vibe: string; strengths: string[]; bestOccasion: string };
    outfitB?: { vibe: string; strengths: string[]; bestOccasion: string };
    verdict?: string;
  } | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(true);

  // Khóa nhận diện duy nhất cho cặp so sánh hiện tại để tránh gọi trùng lặp
  const comparisonKey = React.useMemo(() => {
    const a = `${draftA.top}_${draftA.topColor?.hex || ''}_${draftA.bottom}_${draftA.bottomColor?.hex || ''}_${draftA.shoes}_${(draftA.accessories || []).join(',')}`;
    const b = `${draftB.top}_${draftB.topColor?.hex || ''}_${draftB.bottom}_${draftB.bottomColor?.hex || ''}_${draftB.shoes}_${(draftB.accessories || []).join(',')}`;
    return `${a}_VS_${b}_CTX_${contextEvent || 'default'}`;
  }, [
    draftA.top,
    draftA.topColor?.hex,
    draftA.bottom,
    draftA.bottomColor?.hex,
    draftA.shoes,
    draftA.accessories,
    draftB.top,
    draftB.topColor?.hex,
    draftB.bottom,
    draftB.bottomColor?.hex,
    draftB.shoes,
    draftB.accessories,
    contextEvent
  ]);

  const clientCacheRef = React.useRef<Record<string, any>>({});
  const lastFetchedKeyRef = React.useRef<string>('');

  const fetchComparisonAnalysis = React.useCallback(async (force = false) => {
    // Nếu đã có cache và không yêu cầu cưỡng chế tải lại
    if (!force && clientCacheRef.current[comparisonKey]) {
      setAiAnalysis(clientCacheRef.current[comparisonKey]);
      setIsLoadingAi(false);
      lastFetchedKeyRef.current = comparisonKey;
      return;
    }

    // Tránh gửi liên tiếp khi đang phân tích cùng 1 cấu hình
    if (!force && lastFetchedKeyRef.current === comparisonKey) {
      return;
    }

    lastFetchedKeyRef.current = comparisonKey;
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          outfitA: {
            top: draftA.top,
            topName: itemTopA?.name || draftA.top,
            topColor: draftA.topColor,
            bottom: draftA.bottom,
            bottomName: itemBottomA?.name || draftA.bottom,
            bottomColor: draftA.bottomColor,
            shoes: draftA.shoes,
            shoeName: itemShoeA?.name || draftA.shoes,
            accessories: draftA.accessories,
            accessoryNames: draftA.accessories.map(id => culturalDatabase[id]?.name || id),
            gender: draftA.gender,
            harmonyTitle: harmonyA.title,
          },
          outfitB: {
            top: draftB.top,
            topName: itemTopB?.name || draftB.top,
            topColor: draftB.topColor,
            bottom: draftB.bottom,
            bottomName: itemBottomB?.name || draftB.bottom,
            bottomColor: draftB.bottomColor,
            shoes: draftB.shoes,
            shoeName: itemShoeB?.name || draftB.shoes,
            accessories: draftB.accessories,
            accessoryNames: draftB.accessories.map(id => culturalDatabase[id]?.name || id),
            gender: draftB.gender,
            harmonyTitle: harmonyB.title,
          },
          contextEvent: contextEvent || 'Lựa chọn phong cách Việt Phục',
        }),
      });

      if (!res.ok) throw new Error('API compare error');
      const data = await res.json();
      if (data.success && data.comparison) {
        clientCacheRef.current[comparisonKey] = data.comparison;
        setAiAnalysis(data.comparison);
      } else {
        throw new Error('Comparison data invalid');
      }
    } catch {
      // Fallback thông minh am hiểu di sản văn hóa
      const fallbackAnalysis = {
        overview: `Phương án A (${itemTopA?.name || 'Set A'}) chuẩn chỉ lễ nghi truyền thống, trong khi Phương án B (${itemTopB?.name || 'Set B'}) mang đậm tinh thần remix năng động của thế hệ Gen Z.`,
        outfitA: {
          vibe: 'Cổ Điển Di Sản & Lễ Nghi',
          strengths: [
            `Tôn vinh chuẩn mực của ${itemTopA?.name || 'áo cổ phục'}`,
            `Hài hòa màu sắc ${draftA.topColor.name} + ${draftA.bottomColor.name} tao nhã`,
            `Phù hợp các không gian linh thiêng, lễ bái hoặc cưới hỏi`
          ],
          bestOccasion: 'Dâng hương lễ chùa, sự kiện cưới hỏi, chụp ảnh cổ phong truyền thống'
        },
        outfitB: {
          vibe: 'Gen Z Remix Thời Thượng',
          strengths: [
            `Phom dáng hạ phục ${itemBottomB?.name || 'hiện đại'} phóng khoáng, dễ vận động`,
            `Giao thoa hoàn hảo giữa nét cổ kính và tinh thần streetwear`,
            `Tạo điểm nhấn phong cách cá tính không lẫn vào đâu`
          ],
          bestOccasion: 'Dạo phố cuối tuần, check-in cà phê, concert hay sự kiện nghệ thuật'
        },
        verdict: `Nếu bạn cần sự đoan trang, lịch thiệp và đúng chuẩn phép tắc di sản: Hãy chọn Phương án A. Nếu bạn muốn bộc lộ phong cách tự tin, trẻ trung và thoải mái bước đi: Phương án B là người bạn đồng hành hoàn hảo!`
      };
      clientCacheRef.current[comparisonKey] = fallbackAnalysis;
      setAiAnalysis(fallbackAnalysis);
    } finally {
      setIsLoadingAi(false);
    }
  }, [comparisonKey, draftA, draftB, contextEvent, itemTopA?.name, itemBottomA?.name, itemShoeA?.name, harmonyA.title, itemTopB?.name, itemBottomB?.name, itemShoeB?.name, harmonyB.title]);

  React.useEffect(() => {
    fetchComparisonAnalysis(false);
  }, [fetchComparisonAnalysis]);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-neutral-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full p-4 sm:p-6 md:p-7 shadow-2xl border border-neutral-200 relative animate-scaleUp my-auto max-h-[94vh] flex flex-col">
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-neutral-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <Scale className="w-4 sm:w-5 h-4 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base md:text-lg font-bold text-neutral-900 font-serif">
                  So sánh Trực quan Phương án Phối đồ
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  <Sparkles className="w-2.5 h-2.5 text-amber-600" /> AI Phân tích
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-neutral-500 font-medium">
                Đặt 2 set đồ cạnh nhau & lắng nghe phân tích chuyên sâu từ AI Stylist
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={onClearDrafts}
              className="text-xs text-neutral-500 hover:text-rose-700 px-2 sm:px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer flex items-center gap-1"
              title="Xóa danh sách bản nháp"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Xóa nháp</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Cuộn mượt mà trên mobile & desktop */}
        <div className="overflow-y-auto flex-1 py-3 sm:py-4 space-y-4 sm:space-y-6 pr-1">
          {/* 2 Nửa So Sánh: Split-screen Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* PHƯƠNG ÁN A */}
            <div className="p-3.5 sm:p-5 rounded-2xl bg-neutral-50/90 border border-neutral-200 flex flex-col items-center justify-between space-y-3.5 relative group hover:border-amber-400 transition-all shadow-2xs">
              <div className="w-full flex items-center justify-between pb-2 border-b border-neutral-200">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-neutral-900 text-white flex items-center gap-1">
                  <span>Phương án A</span>
                </span>
                <span className="text-[11px] text-neutral-500">
                  {draftA.createdAt ? `Lưu lúc ${draftA.createdAt}` : 'Bản nháp 1'}
                </span>
              </div>

              {/* Avatar A */}
              <div className="w-full flex justify-center py-1">
                <AvatarComposite
                  topId={draftA.top}
                  bottomId={draftA.bottom}
                  shoeId={draftA.shoes}
                  accessoryIds={draftA.accessories}
                  topColorHex={draftA.topColor.hex}
                  bottomColorHex={draftA.bottomColor.hex}
                  gender={draftA.gender}
                  className="w-full max-w-[170px] sm:max-w-[190px] aspect-[1/2]"
                />
              </div>

              {/* Chi tiết trang phục A */}
              <div className="w-full space-y-2 text-xs">
                <div className="font-bold text-sm text-neutral-900 truncate text-center">
                  {itemTopA?.name || draftA.top} × {itemBottomA?.name || draftA.bottom}
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-neutral-200/80 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-500">Phối màu:</span>
                    <div className="flex items-center gap-1 font-semibold text-neutral-800">
                      <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: draftA.topColor.hex }} />
                      <span>{draftA.topColor.name}</span>
                      <span>+</span>
                      <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: draftA.bottomColor.hex }} />
                      <span>{draftA.bottomColor.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-500">Thẩm mỹ:</span>
                    <span className={`px-2 py-0.2 rounded-full font-bold ${harmonyA.badgeClass}`}>
                      {harmonyA.badge}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-500">Giày / Dép:</span>
                    <span className="font-medium text-neutral-800 truncate max-w-[160px]">{itemShoeA?.name || 'Tự do'}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-500">Phụ kiện:</span>
                    <span className="font-medium text-neutral-800">{draftA.accessories.length} món</span>
                  </div>
                </div>
              </div>

              {/* Nút Chọn Set A */}
              <button
                type="button"
                onClick={() => onSelectOutfit(draftA)}
                className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-neutral-900 hover:bg-neutral-800 text-white shadow-xs hover:shadow transition cursor-pointer active:scale-98 flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Chọn set này (Phương án A)</span>
              </button>
            </div>

            {/* PHƯƠNG ÁN B */}
            <div className="p-3.5 sm:p-5 rounded-2xl bg-neutral-50/90 border border-neutral-200 flex flex-col items-center justify-between space-y-3.5 relative group hover:border-amber-400 transition-all shadow-2xs">
              <div className="w-full flex items-center justify-between pb-2 border-b border-neutral-200">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-rose-700 text-white flex items-center gap-1">
                  <span>Phương án B</span>
                </span>
                <span className="text-[11px] text-neutral-500">
                  {draftB.createdAt ? `Lưu lúc ${draftB.createdAt}` : 'Bản nháp 2 / Đang mặc'}
                </span>
              </div>

              {/* Avatar B */}
              <div className="w-full flex justify-center py-1">
                <AvatarComposite
                  topId={draftB.top}
                  bottomId={draftB.bottom}
                  shoeId={draftB.shoes}
                  accessoryIds={draftB.accessories}
                  topColorHex={draftB.topColor.hex}
                  bottomColorHex={draftB.bottomColor.hex}
                  gender={draftB.gender}
                  className="w-full max-w-[170px] sm:max-w-[190px] aspect-[1/2]"
                />
              </div>

              {/* Chi tiết trang phục B */}
              <div className="w-full space-y-2 text-xs">
                <div className="font-bold text-sm text-neutral-900 truncate text-center">
                  {itemTopB?.name || draftB.top} × {itemBottomB?.name || draftB.bottom}
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-neutral-200/80 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-500">Phối màu:</span>
                    <div className="flex items-center gap-1 font-semibold text-neutral-800">
                      <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: draftB.topColor.hex }} />
                      <span>{draftB.topColor.name}</span>
                      <span>+</span>
                      <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: draftB.bottomColor.hex }} />
                      <span>{draftB.bottomColor.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-500">Thẩm mỹ:</span>
                    <span className={`px-2 py-0.2 rounded-full font-bold ${harmonyB.badgeClass}`}>
                      {harmonyB.badge}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-500">Giày / Dép:</span>
                    <span className="font-medium text-neutral-800 truncate max-w-[160px]">{itemShoeB?.name || 'Tự do'}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-500">Phụ kiện:</span>
                    <span className="font-medium text-neutral-800">{draftB.accessories.length} món</span>
                  </div>
                </div>
              </div>

              {/* Nút Chọn Set B */}
              <button
                type="button"
                onClick={() => onSelectOutfit(draftB)}
                className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-rose-700 hover:bg-rose-800 text-white shadow-xs hover:shadow transition cursor-pointer active:scale-98 flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4 text-amber-300" />
                <span>Chọn set này (Phương án B)</span>
              </button>
            </div>
          </div>

          {/* KHỐI AI PHÂN TÍCH & ĐƯA RA NHẬN XÉT CỦA 2 BẢN PHỐI (DÙNG GEMINI AI) */}
          <div className="rounded-2xl border border-amber-300/80 bg-gradient-to-br from-amber-50/80 via-rose-50/40 to-orange-50/60 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-amber-200/70 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-600 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-4 h-4 text-amber-200" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-900 font-serif flex items-center gap-1.5">
                    <span>AI Stylist Phân Tích & So Sánh 2 Bản Phối</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-amber-200/80 text-amber-900 font-bold">Gemini AI</span>
                  </h3>
                  <p className="text-[11px] text-neutral-600">
                    Đối chiếu chuẩn mực văn hóa di sản & phong cách thời trang đương đại
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => fetchComparisonAnalysis(true)}
                disabled={isLoadingAi}
                className="px-2.5 py-1 text-[11px] font-bold text-amber-900 bg-white/90 hover:bg-white border border-amber-300 rounded-xl transition flex items-center gap-1 cursor-pointer disabled:opacity-50 shadow-2xs"
                title="Yêu cầu AI phân tích lại"
              >
                <RotateCcw className={`w-3 h-3 ${isLoadingAi ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Phân tích lại</span>
              </button>
            </div>

            {isLoadingAi ? (
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-2">
                <Loader2 className="w-6 h-6 animate-spin text-amber-600" />
                <p className="text-xs font-semibold text-neutral-700">
                  Gemini AI đang phân tích phom dáng, phối màu và tính ứng dụng của 2 bản phối...
                </p>
                <span className="text-[11px] text-neutral-500">
                  Đối chiếu điển chế triều đại và phong cách Gen Z đương đại
                </span>
              </div>
            ) : aiAnalysis ? (
              <div className="space-y-3.5 text-xs">
                {/* Tóm lược tổng quan */}
                {aiAnalysis.overview && (
                  <div className="bg-white/90 p-3 rounded-xl border border-amber-200/70 text-neutral-800 leading-relaxed italic shadow-2xs">
                    <span className="font-bold text-amber-900 not-italic mr-1.5">💡 Tổng quan so sánh:</span>
                    {aiAnalysis.overview}
                  </div>
                )}

                {/* Phân tích 2 bên: Set A vs Set B */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Card A */}
                  <div className="bg-white/90 p-3 rounded-xl border border-neutral-200/80 space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between pb-1.5 border-b border-neutral-100">
                      <span className="font-bold text-neutral-900 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-neutral-900" />
                        Phương án A
                      </span>
                      {aiAnalysis.outfitA?.vibe && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-neutral-100 text-neutral-700 border border-neutral-200">
                          {aiAnalysis.outfitA.vibe}
                        </span>
                      )}
                    </div>
                    {aiAnalysis.outfitA?.strengths && (
                      <ul className="space-y-1 text-[11px] text-neutral-700">
                        {aiAnalysis.outfitA.strengths.map((str, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold shrink-0">✓</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {aiAnalysis.outfitA?.bestOccasion && (
                      <div className="pt-1.5 border-t border-neutral-100 text-[11px]">
                        <span className="text-neutral-500">Dịp lý tưởng: </span>
                        <span className="font-semibold text-neutral-800">{aiAnalysis.outfitA.bestOccasion}</span>
                      </div>
                    )}
                  </div>

                  {/* Card B */}
                  <div className="bg-white/90 p-3 rounded-xl border border-neutral-200/80 space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between pb-1.5 border-b border-neutral-100">
                      <span className="font-bold text-rose-900 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-rose-700" />
                        Phương án B
                      </span>
                      {aiAnalysis.outfitB?.vibe && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
                          {aiAnalysis.outfitB.vibe}
                        </span>
                      )}
                    </div>
                    {aiAnalysis.outfitB?.strengths && (
                      <ul className="space-y-1 text-[11px] text-neutral-700">
                        {aiAnalysis.outfitB.strengths.map((str, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-rose-600 font-bold shrink-0">✓</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {aiAnalysis.outfitB?.bestOccasion && (
                      <div className="pt-1.5 border-t border-neutral-100 text-[11px]">
                        <span className="text-neutral-500">Dịp lý tưởng: </span>
                        <span className="font-semibold text-neutral-800">{aiAnalysis.outfitB.bestOccasion}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stylist Verdict */}
                {aiAnalysis.verdict && (
                  <div className="bg-gradient-to-r from-amber-100/90 to-rose-100/90 p-3 rounded-xl border border-amber-300 text-neutral-900 flex items-start gap-2 shadow-2xs">
                    <Crown className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div className="text-[11px] leading-relaxed">
                      <span className="font-bold text-amber-950 block mb-0.5">Lời khuyên chốt hạ của Stylist AI:</span>
                      <span>{aiAnalysis.verdict}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TÍNH NĂNG 3: MODAL LƯU VÀO LOOKBOOK
// =========================================================================
interface LookbookSaveModalProps {
  currentTop: string;
  currentBottom: string;
  currentShoes: string;
  currentAccessories: string[];
  topColor: ColorOption;
  bottomColor: ColorOption;
  gender: 'female' | 'male';
  nameInput: string;
  onChangeName: (name: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export function LookbookSaveModal({
  currentTop,
  currentBottom,
  currentShoes,
  currentAccessories,
  topColor,
  bottomColor,
  gender,
  nameInput,
  onChangeName,
  onSave,
  onClose
}: LookbookSaveModalProps) {
  const topItem = culturalDatabase[currentTop];
  const bottomItem = culturalDatabase[currentBottom];

  const PRESET_SUGGESTIONS = [
    'Set đồ đi quẩy Tết 🏮',
    'Dạo phố Tràng Tiền ☕',
    'Kỷ yếu Cổ phong 🎓',
    'Check-in Hoàng thành Huế 👑',
    'Tiệc cưới Truyền thống 💐'
  ];

  return (
    <div className="fixed inset-0 z-[115] flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-100 relative animate-scaleUp space-y-4">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-rose-800">
          <Bookmark className="w-5 h-5" />
          <span className="text-xs uppercase tracking-wider font-extrabold">Lookbook Việt Vibe</span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-neutral-900 font-serif mb-1">
            Lưu vào Bộ Sưu Tập Lookbook 📖
          </h3>
          <p className="text-xs text-neutral-500">
            Đặt tên cho bản phối để dễ dàng quản lý, so sánh và tạo thiệp chia sẻ cùng bạn bè!
          </p>
        </div>

        {/* Input đặt tên */}
        <div className="space-y-1.5">
          <label htmlFor="lookbook-name" className="block text-xs font-bold text-neutral-700">
            Tên set đồ của bạn:
          </label>
          <input
            id="lookbook-name"
            type="text"
            value={nameInput}
            onChange={(e) => onChangeName(e.target.value)}
            placeholder="Ví dụ: Set đồ đi quẩy Tết..."
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-300 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 outline-none transition bg-neutral-50 focus:bg-white text-neutral-900"
            autoFocus
          />
        </div>

        {/* Gợi ý tên nhanh */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-neutral-400">Gợi ý tên nhanh:</span>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_SUGGESTIONS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onChangeName(preset)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-rose-50 hover:text-rose-700 text-neutral-600 border border-neutral-200/80 transition cursor-pointer"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Preview tóm tắt */}
        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center gap-3">
          <div className="w-16 h-24 shrink-0 rounded-lg overflow-hidden border border-neutral-200 bg-white">
            <AvatarComposite
              topId={currentTop}
              bottomId={currentBottom}
              shoeId={currentShoes}
              accessoryIds={currentAccessories}
              topColorHex={topColor.hex}
              bottomColorHex={bottomColor.hex}
              gender={gender}
              className="w-full h-full"
            />
          </div>
          <div className="min-w-0 flex-1 text-xs space-y-1">
            <div className="font-bold text-neutral-900 truncate">
              {topItem?.name} × {bottomItem?.name}
            </div>
            <div className="flex items-center gap-1.5 text-neutral-500 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: topColor.hex }} />
              <span>{topColor.name}</span>
              <span>•</span>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: bottomColor.hex }} />
              <span>{bottomColor.name}</span>
            </div>
            <div className="text-[11px] text-neutral-400">
              {currentAccessories.length} phụ kiện đi kèm
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition cursor-pointer"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onSave}
            className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-800 to-amber-600 hover:from-rose-900 hover:to-amber-700 rounded-xl shadow-xs hover:shadow transition cursor-pointer active:scale-95"
          >
            Lưu vào Lookbook 📸
          </button>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TÍNH NĂNG 3: TAB GIAO DIỆN "LOOKBOOK CỦA TÔI" (LOOKBOOK VIEW UI)
// =========================================================================
interface LookbookViewProps {
  lookbooks: LookbookItem[];
  onEquipOutfit: (item: LookbookItem) => void;
  onDeleteOutfit: (id: string) => void;
  onShareOutfit: (item: LookbookItem) => void;
  onGoToMixMatch: () => void;
  onOpenVendor?: (item: LookbookItem) => void;
  onUpdateName?: (id: string, newName: string) => void;
}

export function LookbookView({
  lookbooks,
  onEquipOutfit,
  onDeleteOutfit,
  onShareOutfit,
  onGoToMixMatch,
  onOpenVendor,
  onUpdateName
}: LookbookViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  // Lọc theo tên bản phối
  const filteredLookbooks = useMemo(() => {
    if (!searchQuery.trim()) return lookbooks;
    const q = searchQuery.toLowerCase().trim();
    return lookbooks.filter(b => b.name.toLowerCase().includes(q));
  }, [lookbooks, searchQuery]);

  const handleStartEdit = (item: LookbookItem) => {
    setEditingId(item.id);
    setEditingName(item.name);
  };

  const handleSaveEdit = (id: string) => {
    if (editingName.trim() && onUpdateName) {
      onUpdateName(id, editingName.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-6">
      {/* Thanh điều khiển tối giản: Tìm kiếm, Số bản phối và Nút Phối đồ mới */}
      <div className="bg-white/85 backdrop-blur-md rounded-2xl border border-amber-900/10 p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Thanh tìm kiếm theo tên bản phối */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên bản phối..."
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl bg-[#FAF6EE] border border-amber-900/15 focus:bg-white focus:border-rose-600 focus:ring-1 focus:ring-rose-500/20 outline-none transition text-neutral-800 placeholder-neutral-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Nút số bản phối và nút phối đồ mới */}
        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
          <div className="px-3 py-1.5 rounded-xl bg-amber-100/90 border border-amber-300/80 text-amber-950 font-bold text-xs flex items-center gap-1.5 shadow-2xs">
            <Bookmark className="w-3.5 h-3.5 text-amber-700" />
            <span>{filteredLookbooks.length} / {lookbooks.length} bản phối</span>
          </div>

          <button
            type="button"
            onClick={onGoToMixMatch}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs shadow-xs cursor-pointer active:scale-95 transition-all hover:-translate-y-0.5 flex items-center gap-1.5"
          >
            <Shirt className="w-3.5 h-3.5" />
            <span>+ Phối đồ mới</span>
          </button>
        </div>
      </div>

      {/* Grid Danh sách Lookbook */}
      {filteredLookbooks.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-amber-900/10 p-12 text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto text-2xl shadow-inner">
            📷
          </div>
          <h3 className="text-lg font-bold text-neutral-800 font-serif">
            {searchQuery ? 'Không tìm thấy bản phối phù hợp' : 'Lookbook của bạn đang trống'}
          </h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            {searchQuery 
              ? `Không có bản phối nào khớp với từ khóa "${searchQuery}".` 
              : 'Hãy chuyển sang tab "Phối đồ", chọn những món Việt phục và hạ phục bạn yêu thích, sau đó nhấn nút "Lưu vào Lookbook" nhé!'}
          </p>
          <button
            type="button"
            onClick={onGoToMixMatch}
            className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all hover:-translate-y-0.5 cursor-pointer active:scale-95 shadow-sm"
          >
            <Shirt className="w-4 h-4" />
            <span>Bắt đầu phối đồ ngay</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLookbooks.map((item) => {
            const topItem = culturalDatabase[item.top];
            const bottomItem = culturalDatabase[item.bottom];
            const shoeItem = culturalDatabase[item.shoes];
            const harmony = evaluateColorHarmony(item.topColor, item.bottomColor);
            const isEditingThis = editingId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white/90 backdrop-blur-md rounded-3xl border border-amber-900/10 p-5 shadow-xs hover:shadow-md hover:border-amber-500/30 transition-all flex flex-col justify-between space-y-4 group"
              >
                {/* Header card: Cho phép sửa tên bản phối */}
                <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-neutral-100">
                  <div className="min-w-0 flex-1">
                    {isEditingThis ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit(item.id);
                            if (e.key === 'Escape') setEditingId(null);
                          }}
                          className="w-full px-2.5 py-1 text-xs sm:text-sm font-bold border border-rose-400 rounded-lg outline-none bg-rose-50/50 text-neutral-900"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(item.id)}
                          className="p-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
                          title="Lưu tên mới"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="p-1 rounded-lg bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition"
                          title="Hủy"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 group/title">
                        <h3 className="text-base font-bold text-neutral-900 font-serif truncate" title={item.name}>
                          {item.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => handleStartEdit(item)}
                          className="p-1 rounded text-neutral-300 hover:text-amber-700 hover:bg-amber-50 transition cursor-pointer shrink-0"
                          title="Sửa tên bản phối này"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onDeleteOutfit(item.id)}
                    className="p-1.5 rounded-lg text-neutral-300 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer shrink-0"
                    title="Xóa set đồ này khỏi Lookbook"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Avatar Preview Box */}
                <div className="w-full flex justify-center py-1">
                  <AvatarComposite
                    topId={item.top}
                    bottomId={item.bottom}
                    shoeId={item.shoes}
                    accessoryIds={item.accessories}
                    topColorHex={item.topColor.hex}
                    bottomColorHex={item.bottomColor.hex}
                    gender={item.gender}
                    className="w-full max-w-[170px] aspect-[1/2]"
                  />
                </div>

                {/* Chi tiết trang phục & Phối màu */}
                <div className="space-y-2 text-xs">
                  <div className="bg-[#FAF6EE] p-2.5 rounded-xl border border-amber-900/10 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-neutral-500 font-medium">Áo:</span>
                      <div className="flex items-center gap-1 font-semibold text-neutral-800 truncate max-w-[170px]">
                        <span className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: item.topColor.hex }} />
                        <span className="truncate">{topItem?.name || item.top}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-neutral-500 font-medium">Hạ phục:</span>
                      <div className="flex items-center gap-1 font-semibold text-neutral-800 truncate max-w-[170px]">
                        <span className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: item.bottomColor.hex }} />
                        <span className="truncate">{bottomItem?.name || item.bottom}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-neutral-500 font-medium">Hài / Giày:</span>
                      <span className="font-semibold text-neutral-800 truncate max-w-[170px]">
                        {shoeItem?.name || 'Tự do'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-neutral-500 font-medium">Hài hòa màu:</span>
                      <span className={`px-2 py-0.2 rounded-full font-bold text-[10px] ${harmony.badgeClass}`}>
                        {harmony.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons: Mặc lại set này & Nút Share & Nơi thuê/may */}
                <div className="space-y-2 pt-1 border-t border-neutral-100">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onEquipOutfit(item)}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all hover:-translate-y-0.5 cursor-pointer active:scale-95 shadow-2xs"
                      title="Mặc set đồ này vào Avatar chính"
                    >
                      <Shirt className="w-3.5 h-3.5" />
                      <span>Mặc lại set này</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onShareOutfit(item)}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold transition-all hover:-translate-y-0.5 cursor-pointer active:scale-95"
                      title="Chia sẻ thiệp Lookbook"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Chia sẻ</span>
                    </button>
                  </div>

                  {onOpenVendor && (
                    <button
                      type="button"
                      onClick={() => onOpenVendor(item)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all hover:-translate-y-0.5 cursor-pointer active:scale-95"
                      title="Tìm nơi thuê hoặc may đo set đồ này"
                    >
                      <Store className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Thuê / May set này ở đâu?</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Dữ liệu mẫu khởi tạo cho Lookbook
export const INITIAL_LOOKBOOK: LookbookItem[] = [
  {
    id: 'lookbook-1',
    name: 'Hoàng Triều Lễ Nhạc 👑',
    top: 'ao_nhat_binh',
    bottom: 'quan_lua',
    shoes: 'oxford',
    accessories: ['tram_cai', 'quat_xep'],
    topColor: COLOR_PALETTE[0], // Đỏ đô #7B1113
    bottomColor: COLOR_PALETTE[4], // Trắng lụa #F5F5F5
    gender: 'female',
    createdAt: 'Gợi ý Cung đình',
    tags: ['Cung đình', 'Tết Nguyên Đán', 'Quý phái']
  },
  {
    id: 'lookbook-2',
    name: 'Gen Z Phố Cổ Remix ⚡',
    top: 'ao_ngu_than',
    bottom: 'quan_jeans',
    shoes: 'sneaker_low',
    accessories: ['khan_dong', 'kinh_ram'],
    topColor: COLOR_PALETTE[1], // Vàng lụa #EEDC82
    bottomColor: COLOR_PALETTE[3], // Đen #111111
    gender: 'male',
    createdAt: 'Gợi ý Dạo phố',
    tags: ['Giao thoa', 'Dạo phố', 'Streetwear']
  }
];

// ==========================================
// MOCK DATABASE CỬA HÀNG (VENDOR DATABASE)
// ==========================================
export interface VendorStore {
  id: string;
  name: string;
  isOpen: boolean;
  address: string;
  rating: number;
  distance: number;
  priceRange: string;
  specialty: string[];
  phone: string;
}

export const vendorDatabase: VendorStore[] = [
  {
    id: 'store-1',
    name: 'Ỷ Vân Hiên',
    isOpen: true,
    address: '122 Ngõ Giếng, Phố Hoàng Cầu, Đống Đa, Hà Nội',
    rating: 4.9,
    distance: 1.2,
    priceRange: 'Từ 1.500.000đ (May đo) • 450k/ngày (Thuê)',
    specialty: ['May đo cao cấp', 'Triều Nguyễn', 'Phục dựng di sản', 'Tơ tằm Vạn Phúc'],
    phone: '0988 123 456'
  },
  {
    id: 'store-2',
    name: 'Cổ Phục Hoa Niên',
    isOpen: true,
    address: 'Tầng 2, 28A Lê Thánh Tôn, Bến Nghé, Quận 1, TP.HCM',
    rating: 4.8,
    distance: 3.5,
    priceRange: '200k - 500k/ngày • Bán sẵn từ 850.000đ',
    specialty: ['Cách tân Gen Z', 'Dạo phố & Cafe', 'Áo ngũ thân', 'Bán sẵn'],
    phone: '0903 888 999'
  },
  {
    id: 'store-3',
    name: 'Đông Phong Cổ Phục',
    isOpen: true,
    address: '16 Ngõ 20 Huỳnh Thúc Kháng, Láng Hạ, Đống Đa, Hà Nội',
    rating: 4.7,
    distance: 2.8,
    priceRange: '180k - 350k/ngày',
    specialty: ['Cho thuê sinh viên', 'Chụp ảnh concept', 'Kỷ yếu trường học', 'Áo Tấc'],
    phone: '0912 345 678'
  },
  {
    id: 'store-4',
    name: 'Đại Nam Chân Ảnh',
    isOpen: false,
    address: '45 Phố Quán Thánh, Ba Đình, Hà Nội',
    rating: 5.0,
    distance: 5.2,
    priceRange: '350k - 800k/ngày',
    specialty: ['Trang sức kim hoàn', 'Trâm cài bạc', 'Lễ phục cưới', 'Quạt giấy Chàng Sơn'],
    phone: '0977 654 321'
  },
  {
    id: 'store-5',
    name: 'Vạn Thiên Y',
    isOpen: true,
    address: '88 Phố Hàng Bông, Hoàn Kiếm, Hà Nội',
    rating: 4.6,
    distance: 4.1,
    priceRange: '250k - 600k/ngày',
    specialty: ['Áo Nhật Bình', 'Áo Giao Lĩnh', 'Cho thuê phụ kiện', 'Tư vấn lễ nghi'],
    phone: '0934 567 890'
  }
];

// ==========================================
// COMPONENT MÀN HÌNH TAB MỚI: TIỆM CỔ PHỤC (STORE LOCATOR SCREEN)
// ==========================================
interface StoreLocatorScreenProps {
  onCallStore: (store: VendorStore) => void;
  onGoToMixMatch: () => void;
}

export function StoreLocatorScreen({ onCallStore, onGoToMixMatch }: StoreLocatorScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'default'>('distance');
  const [filterOnlyOpen, setFilterOnlyOpen] = useState(false);

  // Xử lý logic tìm kiếm và lọc thời gian thực (real-time filtering)
  const filteredStores = useMemo(() => {
    let list = vendorDatabase.filter(store => {
      const q = searchQuery.toLowerCase().trim();
      const matchNameOrAddr = 
        !q ||
        store.name.toLowerCase().includes(q) ||
        store.address.toLowerCase().includes(q) ||
        store.specialty.some(s => s.toLowerCase().includes(q));
      const matchOpen = filterOnlyOpen ? store.isOpen : true;
      return matchNameOrAddr && matchOpen;
    });

    if (sortBy === 'distance') {
      list = [...list].sort((a, b) => a.distance - b.distance);
    } else if (sortBy === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [searchQuery, sortBy, filterOnlyOpen]);

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-6">
      {/* PHẦN A: BỘ CÔNG CỤ TÌM KIẾM & LỌC (Search & Filter Bar) */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-amber-900/10 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Thanh tìm kiếm: Tìm theo tên tiệm hoặc địa chỉ */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm theo tên tiệm, địa chỉ hoặc thế mạnh..."
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-[#FAF6EE] border border-amber-900/15 text-xs sm:text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Nút Sàn phối đồ */}
          <button
            type="button"
            onClick={onGoToMixMatch}
            className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm transition shadow-xs cursor-pointer active:scale-95 flex items-center justify-center gap-1.5 shrink-0 self-end md:self-auto hover:-translate-y-0.5"
          >
            <Shirt className="w-4 h-4" />
            <span>Sàn phối đồ</span>
          </button>
        </div>

        {/* Các nút Lọc (Filter Chips) */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
            {/* Lọc theo khoảng cách: Gần nhất -> Xa nhất */}
            <button
              type="button"
              onClick={() => setSortBy(sortBy === 'distance' ? 'default' : 'distance')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                sortBy === 'distance'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Gần nhất</span>
            </button>

            {/* Lọc theo đánh giá: Cao -> Thấp */}
            <button
              type="button"
              onClick={() => setSortBy(sortBy === 'rating' ? 'default' : 'rating')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                sortBy === 'rating'
                  ? 'bg-amber-500 text-neutral-950 font-extrabold shadow-2xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <span>⭐ Đánh giá cao</span>
            </button>

            {/* Lọc theo trạng thái: Chỉ hiện tiệm đang Mở cửa */}
            <button
              type="button"
              onClick={() => setFilterOnlyOpen(!filterOnlyOpen)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                filterOnlyOpen
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${filterOnlyOpen ? 'bg-white' : 'bg-emerald-500'}`} />
              <span>Chỉ tiệm đang Mở cửa</span>
            </button>
          </div>

        <div className="flex items-center justify-between text-xs text-neutral-500 pt-1 border-t border-neutral-100">
          <span>Tìm thấy <strong>{filteredStores.length}</strong> / {vendorDatabase.length} tiệm cổ phục</span>
          {(searchQuery || filterOnlyOpen || sortBy !== 'distance') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSortBy('distance');
                setFilterOnlyOpen(false);
              }}
              className="text-emerald-700 hover:underline font-semibold cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* PHẦN B: DANH SÁCH CỬA HÀNG (Vendor Cards) */}
      {filteredStores.length === 0 ? (
        <div className="bg-white rounded-3xl border border-neutral-200 p-12 text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto text-2xl">
            🏪
          </div>
          <h3 className="text-lg font-bold text-neutral-800 font-serif">
            Không tìm thấy tiệm phù hợp
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
            Hãy thử tìm bằng từ khóa khác hoặc bỏ chọn bộ lọc "Chỉ tiệm đang Mở cửa".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStores.map(store => (
            <div
              key={store.id}
              className="bg-white rounded-3xl border border-neutral-200 p-5 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Dòng 1: Tên tiệm (font đậm, to) + Badge Trạng thái */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-neutral-900 font-serif group-hover:text-emerald-900 transition">
                    {store.name}
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold text-white shrink-0 shadow-2xs ${
                      store.isOpen ? 'bg-emerald-600' : 'bg-rose-600'
                    }`}
                  >
                    {store.isOpen ? 'Đang mở cửa' : 'Đóng cửa'}
                  </span>
                </div>

                {/* Dòng 2: Khoảng cách + Rating */}
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>Cách bạn {store.distance} km</span>
                  </span>
                  <span className="flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                    <span>⭐ {store.rating.toFixed(1)}</span>
                  </span>
                </div>

                {/* Dòng 3: Địa chỉ */}
                <div className="flex items-start gap-1.5 text-xs text-neutral-600">
                  <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{store.address}</span>
                </div>

                {/* Dòng 4: Mức giá */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200/60">
                  <Tag className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{store.priceRange}</span>
                </div>

                {/* Dòng 5: Các tag Thế mạnh */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {store.specialty.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium text-neutral-600 bg-neutral-100 px-2.5 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dòng cuối: Nút Call-to-action (CTA) trải dài toàn thẻ */}
              <div className="pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => onCallStore(store)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-800 hover:from-black hover:to-neutral-900 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span> Liên hệ Đặt lịch ({store.phone})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// TÍNH NĂNG NÂNG CAO 3: GỢI Ý NHÀ CUNG CẤP (VENDOR RECOMMENDATIONS - O2O)
// ==========================================
export interface VendorItem {
  id: string;
  name: string;
  type: string;
  badge: string;
  distance: string;
  address: string;
  city: string;
  rating: number;
  reviewsCount: number;
  priceRange: string;
  phone: string;
  features: string[];
}

export const MOCK_VENDORS: VendorItem[] = [
  {
    id: 'vendor-1',
    name: 'Ỷ Vân Hiên',
    type: 'May đo cao cấp & Phục dựng Triều Nguyễn',
    badge: 'Chuẩn cứ lịch sử 🏛️',
    distance: '1.2 km',
    address: '122 Ngõ Giếng, Phố Hoàng Cầu, Đống Đa, Hà Nội',
    city: 'Hà Nội',
    rating: 4.9,
    reviewsCount: 480,
    priceRange: 'Thuê từ 450.000đ/ngày • May đo từ 3.200.000đ',
    phone: '0988 123 456',
    features: ['Vải tơ tằm Vạn Phúc tự nhiên', 'Thợ thêu tay lành nghề', 'Chuyên Áo Tấc, Nhật Bình, Ngũ Thân']
  },
  {
    id: 'vendor-2',
    name: 'Đông Phong Cổ Phục',
    type: 'Cho thuê trang phục & Chụp ảnh concept',
    badge: 'Giá tốt sinh viên 🎓',
    distance: '2.8 km',
    address: '16 Ngõ 20 Huỳnh Thúc Kháng, Đống Đa, Hà Nội',
    city: 'Hà Nội',
    rating: 4.8,
    reviewsCount: 320,
    priceRange: 'Thuê chỉ từ 180.000đ/ngày • Combo phụ kiện +50k',
    phone: '0912 345 678',
    features: ['Hơn 500+ bộ Ngũ Thân & Áo Tấc', 'Có sẵn mấn, quạt xếp, guốc mộc', 'Chụp ảnh kỷ yếu & dạo phố']
  },
  {
    id: 'vendor-3',
    name: 'Cổ Phục Hoa Niên',
    type: 'Bán sẵn cách tân & Thuê đồ dạo phố Gen Z',
    badge: 'Gen Z Favorite ⚡',
    distance: '4.5 km',
    address: 'Tầng 2, 28A Lê Thánh Tôn, Bến Nghé, Quận 1, TP.HCM',
    city: 'TP.HCM / Ship toàn quốc',
    rating: 4.9,
    reviewsCount: 610,
    priceRange: 'Bán sẵn từ 850.000đ • Thuê từ 220.000đ/ngày',
    phone: '0903 888 999',
    features: ['Form dáng trẻ trung, hiện đại', 'Vải đũi tơ mát mẻ bốn mùa', 'Dễ mix với sneaker & phụ kiện Y2K']
  },
  {
    id: 'vendor-4',
    name: 'Đại Nam Chân Ảnh',
    type: 'Studio Cổ phong & Trang sức truyền thống',
    badge: 'Nghệ nhân kim hoàn 👑',
    distance: '5.8 km',
    address: '45 Phố Quán Thánh, Ba Đình, Hà Nội',
    city: 'Hà Nội',
    rating: 5.0,
    reviewsCount: 195,
    priceRange: 'Thuê phụ kiện từ 50.000đ • Set hoàn chỉnh từ 350.000đ',
    phone: '0977 654 321',
    features: ['Trâm bạc mạ vàng tinh xảo', 'Quạt giấy Chàng Sơn dát điệp', 'Guốc mộc truyền thống thủ công']
  }
];

interface VendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetOutfit?: OutfitState;
  onShowToast: (msg: string) => void;
}

export function VendorRecommendationModal({
  isOpen,
  onClose,
  targetOutfit,
  onShowToast
}: VendorModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 850);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const topName = targetOutfit ? (culturalDatabase[targetOutfit.top]?.name || 'Áo Cổ Phục') : 'Áo Việt Phục';
  const bottomName = targetOutfit ? (culturalDatabase[targetOutfit.bottom]?.name || 'Hạ phục') : 'Hạ phục';

  return (
    <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-neutral-900 text-white flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-[11px] font-bold border border-white/10 mb-2">
              <Store className="w-3.5 h-3.5" />
              <span>Mạng Lưới Đối Tác O2O • Đã Kiểm Định Chất Lượng</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif">
              Gợi Ý Nơi Thuê & May Đo Cổ Phục 🛍️
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-1">
              Định vị các tiệm phục dựng uy tín, xưởng may tơ tằm và studio cho thuê gần bạn nhất.
            </p>

            {targetOutfit && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/30 backdrop-blur-md border border-white/15 text-xs text-amber-200">
                <Shirt className="w-3.5 h-3.5" />
                <span>Đang tìm tiệm cho set: <strong>{topName}</strong> + <strong>{bottomName}</strong></span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer shrink-0"
            title="Đóng modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin flex items-center justify-center" />
                <Compass className="w-7 h-7 text-emerald-700 absolute inset-0 m-auto animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-800">
                  Đang quét định vị tiệm cổ phục quanh bạn...
                </h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-sm">
                  AI đang đối chiếu danh mục trang phục cần thuê/may đo với mạng lưới 4 xưởng may và đối tác uy tín tại Hà Nội & TP.HCM.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
                <span>Tìm thấy <strong>4 địa chỉ tiêu biểu</strong> phù hợp với set đồ của bạn</span>
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <MapPin className="w-3.5 h-3.5" /> Bán kính gần bạn (~5km)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_VENDORS.map(vendor => (
                  <div
                    key={vendor.id}
                    className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                  >
                    <div>
                      {/* Tên tiệm & Badge */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 inline-block mb-1">
                            {vendor.badge}
                          </span>
                          <h4 className="text-base font-bold text-neutral-900 group-hover:text-emerald-900 transition">
                            {vendor.name}
                          </h4>
                          <p className="text-xs text-neutral-500 font-medium">{vendor.type}</p>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                            <span>★</span>
                            <span>{vendor.rating}</span>
                          </div>
                          <span className="text-[10px] text-neutral-400 block mt-0.5">
                            ({vendor.reviewsCount} đánh giá)
                          </span>
                        </div>
                      </div>

                      {/* Địa chỉ & Khoảng cách */}
                      <div className="mt-3 space-y-1 text-xs text-neutral-600">
                        <div className="flex items-start gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                          <span>{vendor.address}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-neutral-500 text-[11px]">
                          <Navigation className="w-3 h-3 text-emerald-600" />
                          <span>Cách bạn: <strong>{vendor.distance}</strong></span>
                          <span>•</span>
                          <Phone className="w-3 h-3 text-neutral-400" />
                          <span>Hotline: <strong>{vendor.phone}</strong></span>
                        </div>
                      </div>

                      {/* Giá & Đặc điểm */}
                      <div className="mt-3 p-2.5 rounded-xl bg-white border border-neutral-200/80 space-y-1.5">
                        <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          <span>{vendor.priceRange}</span>
                        </div>
                        <ul className="text-[11px] text-neutral-600 space-y-0.5 list-disc list-inside">
                          {vendor.features.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Nút hành động */}
                    <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-neutral-200/60">
                      <button
                        type="button"
                        onClick={() => onShowToast(`Đang mở Google Maps dẫn đường đến ${vendor.name} (${vendor.address})... 🗺️`)}
                        className="py-2 px-2 text-center rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] transition cursor-pointer flex items-center justify-center gap-1 active:scale-95 shadow-2xs"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>Chỉ đường</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onShowToast(`Đang kết nối hotline ${vendor.phone} của ${vendor.name}... 📲`)}
                        className="py-2 px-2 text-center rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 font-bold text-[11px] border border-neutral-200 transition cursor-pointer flex items-center justify-center gap-1 active:scale-95"
                      >
                        <Phone className="w-3 h-3 text-emerald-600" />
                        <span>Gọi tư vấn</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onShowToast(`Đã áp dụng mã voucher [VIETVIBE10] - Giảm ngay 10% tại ${vendor.name}! 🎟️`)}
                        className="py-2 px-2 text-center rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-[11px] border border-amber-200 transition cursor-pointer flex items-center justify-center gap-1 active:scale-95"
                      >
                        <span>Mã -10% 🎁</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-100 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Cam kết quy chuẩn may đúng cổ chế & hỗ trợ chỉnh sửa form theo yêu cầu cá nhân</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold transition cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// TÍNH NĂNG NÂNG CAO 1: DIỄN ĐÀN CỘNG ĐỒNG (SOCIAL HUB / FORUM)
// ==========================================
export interface ForumComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
}

export interface ForumPost {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    badge: string;
  };
  caption: string;
  tags: string[];
  timestamp: string;
  outfit: OutfitState;
  likes: number;
  isLiked?: boolean;
  comments: ForumComment[];
}

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    author: {
      name: 'Linh Chi',
      handle: '@linhchi.vietvibe',
      avatar: 'LC',
      badge: 'Stylist Gen Z ⚡'
    },
    caption: 'Nay mình mặc Áo Ngũ Thân tay chẽn vàng lụa phối quần âu đen và sneaker trắng đi cafe Nhà Thờ sáng Chủ Nhật. Vừa gọn gàng dễ vận động vừa toát lên nét thư thái cổ điển! Kính râm Y2K giúp set đồ bớt cứng nhắc hơn nhiều ✨☕💛',
    tags: ['#NguThan', '#CafePhoCo', '#GenZRemix', '#Streetwear'],
    timestamp: '2 giờ trước',
    outfit: {
      top: 'ao_ngu_than',
      bottom: 'quan_au',
      shoes: 'sneaker_low',
      accessories: ['kinh_ram', 'khan_xep'],
      topColor: COLOR_PALETTE[1], // Vàng lụa #EEDC82
      bottomColor: COLOR_PALETTE[3], // Đen #111111
      gender: 'female'
    },
    likes: 184,
    isLiked: false,
    comments: [
      { id: 'c1', author: 'Minh Quân', avatar: 'MQ', text: 'Mix với sneaker trắng nhìn khỏe khoắn mà vẫn giữ nét duyên dáng nha bạn!', time: '1 giờ trước' },
      { id: 'c2', author: 'Hà My', avatar: 'HM', text: 'Màu vàng lụa này lên ảnh tôn da dã man luôn á ✨ Bấm thử mặc set này luôn!', time: '35 phút trước' }
    ]
  },
  {
    id: 'post-2',
    author: {
      name: 'Hoàng Long',
      handle: '@long.heritage',
      avatar: 'HL',
      badge: 'Nghiên cứu Cổ phục 🏛️'
    },
    caption: 'Set Áo Tấc đỏ đô phối quần lụa trắng và hài thêu mình diện đi dự lễ tốt nghiệp và dâng hương tại Văn Miếu. Cảm giác bước đi trong tà áo tấc rộng uy nghi, tự hào khí phách di sản vô cùng! Anh em lưu set này nếu có dịp trang trọng nha! 🎓🏮🇻🇳',
    tags: ['#AoTac', '#LePhuc', '#VanMieu', '#TuHaoVietNam'],
    timestamp: '5 giờ trước',
    outfit: {
      top: 'ao_tac',
      bottom: 'quan_lua',
      shoes: 'oxford',
      accessories: ['khan_xep', 'quat_xep'],
      topColor: COLOR_PALETTE[0], // Đỏ đô #7B1113
      bottomColor: COLOR_PALETTE[4], // Trắng lụa #F5F5F5
      gender: 'male'
    },
    likes: 329,
    isLiked: true,
    comments: [
      { id: 'c3', author: 'Thanh Trúc', avatar: 'TT', text: 'Chuẩn quy thức lễ phục luôn anh ơi, 10 điểm uy nghiêm trang trọng!', time: '4 giờ trước' }
    ]
  },
  {
    id: 'post-3',
    author: {
      name: 'Mai Anh',
      handle: '@maianh.retro',
      avatar: 'MA',
      badge: 'Cung Đình Creator 🌸'
    },
    caption: 'Đi lễ phủ Tây Hồ đầu tháng, mình chọn Áo Nhật Bình cổ chéo phối quần lụa trắng và cài trâm bạc hoa sen. Nhắc nhẹ các nàng: Nhật Bình là trang phục hoàng gia tôn nghiêm, chớ dại mix quần cộc hay dép lê kẻo bị Cố vấn Gemini nhắc nhở nha quý dzị 😂🌸',
    tags: ['#NhatBinh', '#DiLeDauThang', '#ChuanMucDiSan', '#HaNoi'],
    timestamp: '1 ngày trước',
    outfit: {
      top: 'ao_nhat_binh',
      bottom: 'quan_lua',
      shoes: 'hai_theu',
      accessories: ['tram_cai', 'quat_xep'],
      topColor: COLOR_PALETTE[2], // Xanh ngọc #40E0D0
      bottomColor: COLOR_PALETTE[4], // Trắng lụa #F5F5F5
      gender: 'female'
    },
    likes: 412,
    isLiked: false,
    comments: [
      { id: 'c4', author: 'Quốc Đạt', avatar: 'QD', text: 'Nhật bình xanh ngọc quý phái thoát tục thật sự! Nhìn là thấy vibe hoàng tộc liền.', time: '20 giờ trước' },
      { id: 'c5', author: 'Bảo Trân', avatar: 'BT', text: 'Cố vấn Gemini bắt lỗi chuẩn lắm, mặc vầy là bao đẹp đúng chuẩn!', time: '18 giờ trước' }
    ]
  },
  {
    id: 'post-4',
    author: {
      name: 'Bảo Nam',
      handle: '@baonam.indie',
      avatar: 'BN',
      badge: 'Streetwear Vintage 🎸'
    },
    caption: 'Thử nghiệm chút phong cách dân dã Bắc Bộ kết hợp bụi bặm: Áo Tứ Thân nâu mix Quần jeans ống suông và túi tote canvas. Đi nghe nhạc acoustic cuối tuần vibe cực nghệ luôn anh em ạ! Vừa mộc mạc vừa cá tính 📻⚡',
    tags: ['#TuThan', '#Streetwear', '#IndieVibe', '#PhucDung'],
    timestamp: '2 ngày trước',
    outfit: {
      top: 'ao_tu_than',
      bottom: 'quan_jeans',
      shoes: 'sneaker_chunky',
      accessories: ['tui_tote'],
      topColor: COLOR_PALETTE[3], // Đen #111111
      bottomColor: COLOR_PALETTE[3], // Đen #111111
      gender: 'female'
    },
    likes: 156,
    isLiked: false,
    comments: [
      { id: 'c6', author: 'Đức Huy', avatar: 'DH', text: 'Vibe mộc mạc mà chiến đét! Bấm thử mặc set này lên avatar liền nè 🔥', time: '1 ngày trước' }
    ]
  }
];

interface CommunityForumViewProps {
  posts: ForumPost[];
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onCloneOutfit: (outfit: OutfitState, authorName: string) => void;
  onOpenVendorForOutfit: (outfit: OutfitState) => void;
  onOpenCreatePost: () => void;
  onGoToMixMatch: () => void;
}

export function CommunityForumView({
  posts,
  onLikePost,
  onAddComment,
  onCloneOutfit,
  onOpenVendorForOutfit,
  onOpenCreatePost,
  onGoToMixMatch
}: CommunityForumViewProps) {
  const [filter, setFilter] = useState<'all' | 'trending' | 'street' | 'ceremony'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCommentsId, setExpandedCommentsId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const filteredPosts = useMemo(() => {
    let result = posts;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.author.name.toLowerCase().includes(q) ||
        p.author.handle.toLowerCase().includes(q) ||
        p.caption.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (filter === 'trending') {
      return [...result].sort((a, b) => b.likes - a.likes);
    }
    if (filter === 'street') {
      return result.filter(p => p.tags.some(t => t.toLowerCase().includes('street') || t.toLowerCase().includes('cafe')));
    }
    if (filter === 'ceremony') {
      return result.filter(p => p.tags.some(t => t.toLowerCase().includes('le') || t.toLowerCase().includes('chuan')));
    }
    return result;
  }, [posts, filter, searchQuery]);

  const handleSendComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    onAddComment(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-6">
      {/* THANH ĐIỀU KHIỂN TỐI GIẢN (KHÔNG KHUNG GIỚI THIỆU): TÌM KIẾM + NÚT ĐĂNG BÀI + NÚT SÀN PHỐI ĐỒ */}
      <div className="bg-white/85 backdrop-blur-md rounded-2xl border border-amber-900/10 p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Thanh tìm kiếm bài viết */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tác giả, nội dung bài viết, hashtag..."
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl bg-[#FAF6EE] border border-amber-900/15 focus:bg-white focus:border-rose-600 focus:ring-1 focus:ring-rose-500/20 outline-none transition text-neutral-800 placeholder-neutral-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Giữ lại nút đăng bài chia sẻ và nút sàn phối đồ */}
        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
          <button
            type="button"
            onClick={onOpenCreatePost}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs shadow-xs cursor-pointer active:scale-95 transition-all hover:-translate-y-0.5 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Đăng bài chia sẻ</span>
          </button>
          <button
            type="button"
            onClick={onGoToMixMatch}
            className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-xs cursor-pointer active:scale-95 transition-all hover:-translate-y-0.5 flex items-center gap-1.5"
          >
            <Shirt className="w-4 h-4" />
            <span>Sàn phối đồ</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-neutral-200">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filter === 'all'
                ? 'bg-neutral-900 text-amber-300 shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Tất cả bài viết ({filteredPosts.length})
          </button>

          <button
            type="button"
            onClick={() => setFilter('trending')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
              filter === 'trending'
                ? 'bg-rose-700 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <span>Thịnh hành 🔥</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('street')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
              filter === 'street'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <span>Dạo phố & Cafe ☕</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('ceremony')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
              filter === 'ceremony'
                ? 'bg-purple-800 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <span>Lễ hội & Cung đình 🏮</span>
          </button>
        </div>

        <span className="text-xs text-neutral-500 font-medium hidden sm:inline-block">
          Hiển thị <strong>{filteredPosts.length}</strong> bài đăng cảm hứng
        </span>
      </div>

      {/* Posts Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPosts.map(post => {
          const topItem = culturalDatabase[post.outfit.top];
          const bottomItem = culturalDatabase[post.outfit.bottom];
          const shoeItem = culturalDatabase[post.outfit.shoes];
          const harmony = evaluateColorHarmony(post.outfit.topColor, post.outfit.bottomColor);
          const isCommentsOpen = expandedCommentsId === post.id;

          return (
            <article
              key={post.id}
              className="bg-white rounded-3xl border border-neutral-200/90 shadow-xs hover:shadow-md transition-all p-5 sm:p-6 flex flex-col justify-between space-y-4"
            >
              {/* Header Post: Tác giả & Thời gian */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-700 via-amber-600 to-amber-400 flex items-center justify-center text-white font-extrabold text-sm shadow-xs shrink-0">
                    {post.author.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-neutral-900 truncate">
                        {post.author.name}
                      </h3>
                      <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-rose-50 text-rose-800 border border-rose-200 shrink-0">
                        {post.author.badge}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                      <span>{post.author.handle}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.timestamp}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenVendorForOutfit(post.outfit)}
                  className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold transition cursor-pointer flex items-center gap-1 shrink-0"
                  title="Tìm tiệm cho thuê/may đo set đồ này"
                >
                  <Store className="w-3 h-3 text-emerald-600" />
                  <span className="hidden sm:inline">Nơi thuê/may</span>
                </button>
              </div>

              {/* Caption bài viết */}
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                {post.caption}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-semibold text-rose-800 bg-rose-50/80 hover:bg-rose-100 px-2.5 py-0.5 rounded-full transition cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Box Render Outfit & Chi tiết món đồ */}
              <div className="p-3 sm:p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col sm:flex-row items-center gap-4">
                {/* Avatar Preview */}
                <div className="w-32 sm:w-36 shrink-0 flex justify-center py-1 bg-white rounded-xl border border-neutral-200/60 shadow-2xs">
                  <AvatarComposite
                    topId={post.outfit.top}
                    bottomId={post.outfit.bottom}
                    shoeId={post.outfit.shoes}
                    accessoryIds={post.outfit.accessories}
                    topColorHex={post.outfit.topColor.hex}
                    bottomColorHex={post.outfit.bottomColor.hex}
                    gender={post.outfit.gender}
                    className="w-full max-w-[120px] aspect-[1/2]"
                  />
                </div>

                {/* Outfit Info breakdown */}
                <div className="flex-1 w-full space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-500">Áo:</span>
                    <span className="font-bold text-neutral-800 flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: post.outfit.topColor.hex }} />
                      {topItem?.name || post.outfit.top}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-500">Hạ phục:</span>
                    <span className="font-bold text-neutral-800 flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: post.outfit.bottomColor.hex }} />
                      {bottomItem?.name || post.outfit.bottom}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-500">Giày dép:</span>
                    <span className="font-semibold text-neutral-800">{shoeItem?.name || 'Tự do'}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-500">Màu sắc:</span>
                    <span className={`px-2 py-0.2 rounded-full font-bold text-[10px] ${harmony.badgeClass}`}>
                      {harmony.badge}
                    </span>
                  </div>

                  {/* CTA "Thử mặc set này" ngay bên trong card */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onCloneOutfit(post.outfit, post.author.name)}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-800 hover:from-black hover:to-neutral-900 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 shadow-xs"
                      title="Mặc set đồ này vào Avatar của bạn"
                    >
                      <Wand2 className="w-3.5 h-3.5 text-amber-300" />
                      <span>Thử mặc set này (Clone Outfit)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Bar: Thả tim, Bình luận, Nơi thuê */}
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onLikePost(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer active:scale-90 font-bold ${
                      post.isLiked
                        ? 'text-rose-600 bg-rose-50 border border-rose-200'
                        : 'text-neutral-600 hover:text-rose-600 hover:bg-neutral-100'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
                    <span>{post.likes}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExpandedCommentsId(isCommentsOpen ? null : post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition cursor-pointer font-bold"
                  >
                    <MessageCircle className="w-4 h-4 text-neutral-500" />
                    <span>{post.comments.length} bình luận</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenVendorForOutfit(post.outfit)}
                  className="text-emerald-700 hover:text-emerald-800 font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Xem tiệm may</span>
                </button>
              </div>

              {/* Khung bình luận (Inline comments drawer) */}
              {isCommentsOpen && (
                <div className="pt-3 border-t border-neutral-100 space-y-3 animate-fadeIn">
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {post.comments.map(c => (
                      <div key={c.id} className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 text-xs flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-neutral-200 text-neutral-800 flex items-center justify-center font-bold text-[10px] shrink-0">
                          {c.avatar}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-neutral-900">{c.author}</span>
                            <span className="text-[10px] text-neutral-400">{c.time}</span>
                          </div>
                          <p className="text-neutral-700 mt-0.5">{c.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input gửi bình luận mới */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Viết bình luận cho bài đăng này..."
                      value={commentInputs[post.id] || ''}
                      onChange={e => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      onKeyDown={e => e.key === 'Enter' && handleSendComment(post.id)}
                      className="flex-1 bg-neutral-100 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleSendComment(post.id)}
                      className="p-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white transition cursor-pointer shrink-0 shadow-2xs"
                      title="Gửi bình luận"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

// Modal tạo bài viết chia sẻ lên Cộng đồng
interface ShareToCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentOutfit: OutfitState;
  onPublish: (caption: string, tags: string[]) => void;
}

export function ShareToCommunityModal({
  isOpen,
  onClose,
  currentOutfit,
  onPublish
}: ShareToCommunityModalProps) {
  const [caption, setCaption] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['#GenZRemix', '#VietVibe']);

  const SUGGESTED_TAGS = ['#GenZRemix', '#VietVibe', '#PhoCo', '#LeHoi', '#NguThan', '#AoTac', '#NhatBinh', '#Streetwear'];

  if (!isOpen) return null;

  const topItem = culturalDatabase[currentOutfit.top];
  const bottomItem = culturalDatabase[currentOutfit.bottom];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleConfirm = () => {
    const finalCaption = caption.trim() || `Hôm nay mình phối ${topItem?.name || 'Áo cổ phục'} cùng ${bottomItem?.name || 'Hạ phục'}. Mọi người thấy vibe này thế nào? ✨`;
    onPublish(finalCaption, selectedTags);
    setCaption('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[115] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 space-y-4 animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2 text-rose-800">
            <Users className="w-5 h-5" />
            <h3 className="text-base font-bold text-neutral-900 font-serif">
              Chia Sẻ Lên Diễn Đàn Cộng Đồng 📸
            </h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Outfit nhỏ */}
        <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center gap-3">
          <div className="w-14 h-20 bg-white rounded-xl border border-neutral-200/80 flex items-center justify-center overflow-hidden shrink-0">
            <AvatarComposite
              topId={currentOutfit.top}
              bottomId={currentOutfit.bottom}
              shoeId={currentOutfit.shoes}
              accessoryIds={currentOutfit.accessories}
              topColorHex={currentOutfit.topColor.hex}
              bottomColorHex={currentOutfit.bottomColor.hex}
              gender={currentOutfit.gender}
              className="w-full aspect-[1/2]"
            />
          </div>
          <div className="text-xs space-y-1 min-w-0">
            <span className="font-bold text-neutral-900 block truncate">
              {topItem?.name || currentOutfit.top}
            </span>
            <span className="text-neutral-500 block truncate">
              Phối cùng: {bottomItem?.name || currentOutfit.bottom}
            </span>
            <span className="text-[11px] text-amber-700 font-semibold block">
              Màu: {currentOutfit.topColor.name} + {currentOutfit.bottomColor.name}
            </span>
          </div>
        </div>

        {/* Nhập Caption */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-neutral-700">
            Caption chia sẻ của bạn:
          </label>
          <textarea
            rows={3}
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder="Chia sẻ lý do phối set đồ này, địa điểm đi cafe, chụp ảnh Tết..."
            className="w-full p-3 rounded-xl border border-neutral-200 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
          />
        </div>

        {/* Gắn thẻ Tags */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-neutral-700">
            Gắn thẻ chủ đề (Hashtags):
          </label>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_TAGS.map(tag => (
              <button
                type="button"
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                  selectedTags.includes(tag)
                    ? 'bg-rose-700 text-white shadow-2xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Nút hành động */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl border border-neutral-200 text-neutral-700 font-bold text-xs hover:bg-neutral-50 transition"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-700 to-amber-600 text-white font-bold text-xs hover:from-rose-800 hover:to-amber-700 transition shadow-xs"
          >
            Đăng lên Feed 🔥
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// TÍNH NĂNG NÂNG CAO 2: CỐ VẤN AI GEMINI (GEMINI AI ADVISOR)
// ==========================================
export interface ChatMessage {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  timestamp: string;
}

interface GeminiAdvisorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentOutfit: OutfitState;
  onAutoFixOutfit: () => void;
  onShowToast: (msg: string) => void;
}

export function GeminiAdvisorDrawer({
  isOpen,
  onClose,
  currentOutfit,
  onAutoFixOutfit,
  onShowToast
}: GeminiAdvisorDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'gemini',
      text: 'Xin chào! Mình là Cố vấn AI Gemini của Việt Vibe. Mình am hiểu sâu sắc về 54 dân tộc, điển chế triều Nguyễn, thời Lê - Trần cũng như phong cách Mix & Match đương đại cho Gen Z. Bạn muốn mình phân tích set đồ đang mặc, chỉnh sửa chuẩn lễ nghi hay tìm hiểu điển tích nào?',
      timestamp: 'Vừa xong'
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  if (!isOpen) return null;

  const topItem = culturalDatabase[currentOutfit.top];
  const bottomItem = culturalDatabase[currentOutfit.bottom];
  const shoeItem = culturalDatabase[currentOutfit.shoes];
  const harmony = evaluateColorHarmony(currentOutfit.topColor, currentOutfit.bottomColor);

  const handleSendPrompt = async (promptText: string) => {
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);

    const lower = promptText.toLowerCase();
    if (lower.includes('sửa lỗi') || lower.includes('chuẩn hóa')) {
      onAutoFixOutfit();
      onShowToast('Gemini đã chuẩn hóa trang phục trên Avatar của bạn! 👑✨');
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: promptText,
          currentOutfit: {
            top: currentOutfit.top,
            topName: topItem?.name || currentOutfit.top,
            topColor: currentOutfit.topColor,
            bottom: currentOutfit.bottom,
            bottomName: bottomItem?.name || currentOutfit.bottom,
            bottomColor: currentOutfit.bottomColor,
            shoes: currentOutfit.shoes,
            shoeName: shoeItem?.name || currentOutfit.shoes,
            accessories: currentOutfit.accessories,
            accessoryNames: currentOutfit.accessories.map(id => culturalDatabase[id]?.name || id),
            gender: currentOutfit.gender,
            harmonyTitle: harmony.title,
          },
          history: messages.slice(-6).map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          })),
        }),
      });

      if (!res.ok) throw new Error('API /api/chat error');
      const data = await res.json();
      const replyText = data.reply || (
        lower.includes('phân tích')
          ? `🔍 **Phân tích set đồ:** Bạn đang diện ${topItem?.name || 'Áo cổ phục'} phối cùng ${bottomItem?.name || 'Hạ phục'}, tông màu ${currentOutfit.topColor.name} + ${currentOutfit.bottomColor.name} (${harmony.title}). Phối cùng ${shoeItem?.name || 'giày'} tạo phong thái rất đặc trưng!`
          : `Chào bạn! Về câu hỏi "${promptText}", bạn có thể tự do phối hợp cổ phục với nét hiện đại để tạo nên phong cách độc đáo của riêng mình!`
      );

      setMessages(prev => [
        ...prev,
        {
          id: `g-${Date.now()}`,
          sender: 'gemini',
          text: replyText,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch {
      // Fallback nếu ngoại tuyến hoặc server bận
      let fallbackText = '';
      if (lower.includes('phân tích set đồ') || lower.includes('phân tích')) {
        const isConflict = topItem?.rules?.forbiddenPairs?.includes(currentOutfit.bottom);
        fallbackText = `🔍 **PHÂN TÍCH CHUYÊN SÂU TỪ CỐ VẤN GEMINI**:\n\n` +
          `1. **Thân Áo (${topItem?.name || currentOutfit.top})**:\n` +
          `• Thời kỳ: ${topItem?.period || 'Cổ truyền'}. Thuộc tầng lớp: ${topItem?.socialClass?.join(', ') || 'Truyền thống'}.\n` +
          `• Ý nghĩa: ${topItem?.culturalSignificance || topItem?.history || 'Trang phục di sản đặc trưng'}.\n\n` +
          `2. **Sự kết hợp Hạ phục (${bottomItem?.name || currentOutfit.bottom})**:\n` +
          `${isConflict ? `⚠️ **Cảnh báo chuẩn mực**: Bạn đang phối ${topItem?.name} với ${bottomItem?.name}. ${topItem?.rules?.conflictMessage || 'Cách phối này tạo độ lệch quy chuẩn lịch sử'}.` : `✨ **Đánh giá thẩm mỹ**: Phối cùng ${bottomItem?.name} tạo tổng thể hài hòa và tự nhiên.`}\n\n` +
          `3. **Bản phối màu sắc**:\n` +
          `• ${currentOutfit.topColor.name} + ${currentOutfit.bottomColor.name} => **${harmony.title}** (${harmony.description}).\n\n` +
          `💡 **Lời khuyên của Stylist**: Nếu bạn muốn chỉnh về đúng chuẩn mực cung đình/lễ phục cổ truyền, hãy bấm chip *"Sửa lỗi set đồ này cho chuẩn"* để mình tự động cân chỉnh nhé!`;
      } else if (lower.includes('sửa lỗi') || lower.includes('chuẩn')) {
        fallbackText = `👑 **GEMINI ĐÃ TỰ ĐỘNG TINH CHỈNH SET ĐỒ CỦA BẠN VỀ CHUẨN MỰC**:\n\n` +
          `✨ **Thay đổi đã áp dụng trực tiếp lên Avatar**:\n` +
          `• Áo: Giữ nguyên **${topItem?.name || 'Áo cổ phục'}** làm linh hồn set đồ.\n` +
          `• Hạ phục: Đổi sang **Quần lụa trắng** đoan trang, tạo vạt rủ thanh thoát.\n` +
          `• Giày dép: Chuyển về **Hài thêu / Guốc mộc** đúng lễ nghi.\n` +
          `• Phụ kiện: Đội khăn xếp/mấn và cầm quạt xếp tao nhã.\n\n` +
          `🎉 Bản phối của bạn hiện đã đạt **100% chuẩn mực lễ nghi**, sẵn sàng cho các dịp dâng hương, chụp ảnh cung đình và lễ kỷ niệm trang trọng!`;
      } else if (lower.includes('nhật bình') || lower.includes('điển tích')) {
        fallbackText = `📜 **ĐIỂN TÍCH VỀ ÁO NHẬT BÌNH TRIỀU NGUYỄN**:\n\n` +
          `• **Nguồn gốc tên gọi**: "Nhật Bình" bắt nguồn từ dạng cổ áo xẻ dọc, tạo thành hình chữ nhật lớn bao quanh cổ và ngực áo.\n` +
          `• **Thứ bậc cung đình**: Được ban hành quy chế từ năm 1807 thời vua Gia Long, Nhật Bình là thường phục cao quý của bậc Hoàng Thái Hậu, Hoàng Hậu, Công chúa và mệnh phụ quan lại.\n` +
          `• **Dải ngũ sắc diệu kỳ**: Viền tay áo có 5 dải màu (Lục, Vàng, Xanh, Trắng, Đỏ) đại diện cho **Ngũ hành tương sinh (Kim - Mộc - Thủy - Hỏa - Thổ)**, tượng trưng cho sự chở che và hài hòa vũ trụ.`;
      } else {
        fallbackText = `Chào bạn! Về "${promptText}", cổ phục Việt Nam là kho tàng phong phú và linh hoạt. Với tinh thần Gen Z, bạn hoàn toàn có thể kết hợp áo ngũ thân hoặc tứ thân cùng phụ kiện đương đại như sneaker, túi tote để tạo nên phong cách dạo phố độc đáo! 🌿`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: `g-${Date.now()}`,
          sender: 'gemini',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-[120] w-full sm:w-[480px] bg-white shadow-2xl flex flex-col border-l border-neutral-200 animate-slideLeft">
      {/* Header Drawer */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-900 via-neutral-900 to-amber-900 text-white flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-5 h-5 text-amber-200 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base font-serif">
                Cố Vấn AI Gemini
              </h3>
              <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Online
              </span>
            </div>
            <p className="text-[11px] text-neutral-300">
              Chuyên gia Sử liệu • Điển chế • Stylist Gen Z
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          title="Đóng chatbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-100/50">
        {messages.map(m => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-800 to-amber-500 flex items-center justify-center text-white shrink-0 shadow-2xs">
                  <Sparkles className="w-4 h-4 text-amber-200" />
                </div>
              )}
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs whitespace-pre-line ${
                  isUser
                    ? 'bg-gradient-to-r from-rose-800 to-rose-700 text-white rounded-tr-xs'
                    : 'bg-white text-neutral-800 border border-neutral-200/80 rounded-tl-xs'
                }`}
              >
                {m.text}
                <div
                  className={`text-[10px] mt-1 text-right ${
                    isUser ? 'text-rose-200' : 'text-neutral-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isThinking && (
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-800 to-amber-500 flex items-center justify-center text-white shrink-0">
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            </div>
            <div className="bg-white border border-neutral-200 p-3.5 rounded-2xl rounded-tl-xs text-xs text-neutral-600 flex items-center gap-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              <span>Gemini đang đối chiếu sử liệu và chuẩn tắc di sản... ⏳</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* GỢI Ý CÂU HỎI (ĐƯỢC ĐẶT NGAY TRÊN KHUNG NHẬP CÂU HỎI) */}
      <div className="px-3 pt-2.5 pb-2 bg-white border-t border-neutral-200/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <span className="text-[10px] font-bold text-neutral-400 shrink-0 uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-amber-600" /> Gợi ý:
        </span>
        <button
          type="button"
          onClick={() => handleSendPrompt('Phân tích chi tiết set đồ hiện tại của tôi')}
          className="px-2.5 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-[11px] font-bold text-rose-900 transition whitespace-nowrap cursor-pointer shrink-0 shadow-2xs flex items-center gap-1"
        >
          <Search className="w-3 h-3 text-rose-600" />
          <span>Phân tích set đồ này</span>
        </button>

        <button
          type="button"
          onClick={() => handleSendPrompt('Sửa lỗi set đồ này cho chuẩn lễ phục')}
          className="px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[11px] font-bold text-amber-900 transition whitespace-nowrap cursor-pointer shrink-0 shadow-2xs flex items-center gap-1"
        >
          <Wand2 className="w-3 h-3 text-amber-600" />
          <span>Sửa lỗi chuẩn lễ phục</span>
        </button>

        <button
          type="button"
          onClick={() => handleSendPrompt('Kể điển tích về Áo Nhật Bình và dải ngũ sắc')}
          className="px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-[11px] font-bold text-purple-900 transition whitespace-nowrap cursor-pointer shrink-0 shadow-2xs flex items-center gap-1"
        >
          <BookOpen className="w-3 h-3 text-purple-600" />
          <span>Điển tích Nhật Bình</span>
        </button>

        <button
          type="button"
          onClick={() => handleSendPrompt('Tư vấn mix đồ đi cafe dạo phố cuối tuần cho Gen Z')}
          className="px-2.5 py-1 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-[11px] font-bold text-neutral-800 transition whitespace-nowrap cursor-pointer shrink-0 shadow-2xs"
        >
          ☕ Dạo phố Gen Z
        </button>
      </div>

      {/* Input Chat */}
      <div className="p-3 bg-white border-t border-neutral-100">
        <form
          onSubmit={e => {
            e.preventDefault();
            if (input.trim() && !isThinking) {
              handleSendPrompt(input.trim());
              setInput('');
            }
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Hỏi Gemini về quy chuẩn, điển tích hoặc cách phối..."
            className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-800 to-amber-600 hover:from-rose-900 hover:to-amber-700 disabled:opacity-50 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Gửi</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export function getTomorrowDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
}

export function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getWeekendString(): string {
  const d = new Date();
  const day = d.getDay();
  const daysUntilSaturday = (6 - day + 7) % 7 || 7;
  const weekend = new Date(d);
  weekend.setDate(d.getDate() + daysUntilSaturday);
  return weekend.toISOString().slice(0, 10);
}

export const DEFAULT_INITIAL_OUTFIT: OutfitRecommendation = {
  top: 'ao_ngu_than',
  bottom: 'quan_jeans',
  shoes: 'sneaker_low',
  accessories: ['tai_nghe', 'kinh_ram'],
};

interface MixMatchScreenProps {
  initialOutfit?: OutfitRecommendation;
  onBack?: () => void;
}

export function MixMatchScreen({ initialOutfit = DEFAULT_INITIAL_OUTFIT, onBack }: MixMatchScreenProps = {}) {
  // Điều hướng giữa các chế độ: 'onboarding' (Khởi tạo bối cảnh), 'mix_match' (Phối đồ), 'epic_library' (Thư viện sử thi), 'lookbook' (Lookbook của tôi), 'community' (Cộng đồng), 'stores' (Tiệm cổ phục)
  const [viewMode, setViewMode] = useState<'onboarding' | 'mix_match' | 'epic_library' | 'lookbook' | 'community' | 'stores'>('onboarding');
  const [onboardingResetKey, setOnboardingResetKey] = useState<number>(0);
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState<boolean>(false);
  const [chosenEvent, setChosenEvent] = useState<string>('');
  const [chosenDate, setChosenDate] = useState<string>(getTomorrowDateString());
  const [chosenLocation, setChosenLocation] = useState<string>('Hà Nội');
  const [librarySelectedId, setLibrarySelectedId] = useState<string>('ao_nhat_binh');
  const [hasStartedOutfit, setHasStartedOutfit] = useState<boolean>(false);
  const [hoveredZone, setHoveredZone] = useState<'acc' | 'top' | 'bottom' | 'shoes' | null>(null);

  // Tính năng 1: Diễn đàn cộng đồng
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(INITIAL_FORUM_POSTS);
  const [isShareToCommunityOpen, setIsShareToCommunityOpen] = useState(false);

  // Tính năng 2: Cố vấn AI Gemini
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

  // Tính năng 3: Gợi ý nhà cung cấp O2O
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [vendorTargetOutfit, setVendorTargetOutfit] = useState<OutfitState | undefined>(undefined);

  // Trạng thái lựa chọn món đồ - Khởi tạo từ initialOutfit do AI gợi ý hoặc mặc định
  const [selectedTop, setSelectedTop] = useState<string>(initialOutfit.top || 'ao_ngu_than');
  const [selectedBottom, setSelectedBottom] = useState<string>(initialOutfit.bottom || 'quan_lua');
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(() => {
    if (Array.isArray(initialOutfit.accessories)) return initialOutfit.accessories;
    return initialOutfit.accessories ? [initialOutfit.accessories] : [];
  });
  const [selectedShoe, setSelectedShoe] = useState<string>(initialOutfit.shoes || 'sneaker_low');

  // Lựa chọn giới tính avatar (Nam / Nữ)
  const [gender, setGender] = useState<'female' | 'male'>('female');

  // Trạng thái màu sắc
  const [topColor, setTopColor] = useState<ColorOption>(COLOR_PALETTE[0]); // Đỏ đô #7B1113
  const [bottomColor, setBottomColor] = useState<ColorOption>(COLOR_PALETTE[3]); // Đen #111111

  // Tính năng 1: Đánh giá Hài hòa Màu sắc hiện tại
  const colorHarmony = useMemo(() => {
    return evaluateColorHarmony(topColor, bottomColor);
  }, [topColor, bottomColor]);

  // Tính năng 2: Quản lý bản nháp (draftOutfits) - Lưu tối đa 2 set đồ để so sánh
  const [draftOutfits, setDraftOutfits] = useState<OutfitState[]>([]);
  const [isComparing, setIsComparing] = useState<boolean>(false);

  // Tính năng 3: Quản lý Lookbook cá nhân (myLookbook)
  const [myLookbook, setMyLookbook] = useState<LookbookItem[]>(INITIAL_LOOKBOOK);
  const [isSavingLookbook, setIsSavingLookbook] = useState<boolean>(false);
  const [lookbookNameInput, setLookbookNameInput] = useState<string>('');

  // Toast thông báo tương tác nhanh Gen Z
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Helper lấy outfit state hiện tại
  const getCurrentOutfitState = (): OutfitState => ({
    top: selectedTop,
    bottom: selectedBottom,
    shoes: selectedShoe,
    accessories: [...selectedAccessories],
    topColor,
    bottomColor,
    gender
  });

  // Điều hướng "Phối đồ": Nếu đang phối đồ dở thì quay lại bản phối dở; nếu chưa có thì mở Onboarding
  const handleNavToPhoiDo = () => {
    if (hasStartedOutfit) {
      setViewMode('mix_match');
    } else {
      setViewMode('onboarding');
    }
  };

  // Khởi tạo lại bối cảnh / Đổi bối cảnh khi người dùng chủ động yêu cầu
  const handleResetContext = () => {
    setOnboardingResetKey(prev => prev + 1);
    setViewMode('onboarding');
    setHasStartedOutfit(false);
    if (onBack) onBack();
  };

  // Bắt đầu gợi ý AI từ Onboarding -> Loading -> chuyển tiếp sang màn hình Mix & Match
  const handleStartRecommendation = async (
    event: string, 
    eventDate: string, 
    location: string, 
    preferredTop: string
  ) => {
    setChosenEvent(event);
    setChosenDate(eventDate);
    setChosenLocation(location);
    setIsLoadingRecommendation(true);

    const startTime = Date.now();

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, eventDate, location, preferredTop }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.outfit) {
          const elapsed = Date.now() - startTime;
          const remainingDelay = Math.max(0, 1400 - elapsed);
          setTimeout(() => {
            if (data.outfit.top) setSelectedTop(data.outfit.top);
            if (data.outfit.bottom) setSelectedBottom(data.outfit.bottom);
            if (data.outfit.shoes) setSelectedShoe(data.outfit.shoes);
            if (data.outfit.accessories) {
              setSelectedAccessories(Array.isArray(data.outfit.accessories) ? data.outfit.accessories : [data.outfit.accessories]);
            }
            setHasStartedOutfit(true);
            setIsLoadingRecommendation(false);
            setViewMode('mix_match');
            showToast(`Gemini AI đã phối trang phục hoàn hảo cho "${event}"! ✨`);
          }, remainingDelay);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend API unavailable, using client-side fallback:', err);
    }

    setTimeout(() => {
      const fallback = mockAIEngine(event, eventDate, location, preferredTop);
      if (fallback.top) setSelectedTop(fallback.top);
      if (fallback.bottom) setSelectedBottom(fallback.bottom);
      if (fallback.shoes) setSelectedShoe(fallback.shoes);
      if (fallback.accessories) {
        setSelectedAccessories(Array.isArray(fallback.accessories) ? fallback.accessories : [fallback.accessories]);
      }
      setHasStartedOutfit(true);
      setIsLoadingRecommendation(false);
      setViewMode('mix_match');
      showToast(`Gemini AI đã phối trang phục hoàn hảo cho "${event}"! ✨`);
    }, 1600);
  };

  // Tương tác nút CTA "Liên hệ Đặt lịch" của Tiệm Cổ Phục
  const handleCallStore = (store: VendorStore) => {
    const msg = `Đang kết nối tới ${store.name} qua hotline ${store.phone}... 📞✨`;
    showToast(msg);
  };

  // Tương tác like bài viết trên Diễn đàn
  const handleLikePost = (postId: string) => {
    setForumPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likes: isLiked ? p.likes + 1 : p.likes - 1
        };
      }
      return p;
    }));
  };

  // Tương tác comment bài viết
  const handleAddComment = (postId: string, text: string) => {
    const newComment: ForumComment = {
      id: `c-${Date.now()}`,
      author: 'Bạn (Gen Z Stylist)',
      avatar: 'ME',
      text,
      time: 'Vừa xong'
    };
    setForumPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    }));
    showToast('Đã đăng bình luận của bạn lên bài viết! 💬');
  };

  // Clone outfit: Thử mặc set đồ từ Cộng đồng
  const handleCloneOutfit = (outfit: OutfitState, authorName: string) => {
    setSelectedTop(outfit.top);
    setSelectedBottom(outfit.bottom);
    setSelectedShoe(outfit.shoes);
    setSelectedAccessories([...outfit.accessories]);
    setTopColor(outfit.topColor);
    setBottomColor(outfit.bottomColor);
    setGender(outfit.gender);
    setViewMode('mix_match');
    showToast(`Đã sao chép và mặc set đồ của ${authorName} lên Avatar! 🪄✨`);
  };

  // Mở gợi ý tiệm may cho outfit cụ thể
  const handleOpenVendorForOutfit = (outfit: OutfitState) => {
    setVendorTargetOutfit(outfit);
    setIsVendorModalOpen(true);
  };

  // Mở gợi ý tiệm may cho outfit đang mặc
  const handleOpenVendorCurrent = () => {
    setVendorTargetOutfit(getCurrentOutfitState());
    setIsVendorModalOpen(true);
  };

  // Cố vấn Gemini tự động chuẩn hóa set đồ
  const handleAutoFixFromAdvisor = () => {
    if (selectedTop === 'ao_nhat_binh' || selectedTop === 'ao_tac') {
      setSelectedBottom('quan_lua');
      setSelectedShoe('oxford');
      setSelectedAccessories(['tram_cai', 'quat_xep']);
      setTopColor(COLOR_PALETTE[0]); // Đỏ đô
      setBottomColor(COLOR_PALETTE[4]); // Trắng lụa
    } else if (selectedTop === 'ao_tu_than') {
      setSelectedBottom('vay_dup');
      setSelectedShoe('guoc_moc');
      setSelectedAccessories(['non_quai_thao']);
      setBottomColor(COLOR_PALETTE[3]); // Đen
    } else {
      setSelectedBottom('quan_lua');
      setSelectedShoe('guoc_moc');
      setSelectedAccessories(['khan_xep']);
      setBottomColor(COLOR_PALETTE[4]);
    }
  };

  // Đăng outfit lên Diễn đàn cộng đồng
  const handlePublishToCommunity = (caption: string, tags: string[]) => {
    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      author: {
        name: 'Bạn (Gen Z Stylist)',
        handle: '@you.vietvibe',
        avatar: 'ME',
        badge: 'Tác giả mới ✨'
      },
      caption,
      tags,
      timestamp: 'Vừa xong',
      outfit: getCurrentOutfitState(),
      likes: 1,
      isLiked: true,
      comments: []
    };
    setForumPosts(prev => [newPost, ...prev]);
    showToast('Đã đăng bản phối của bạn lên Diễn đàn Cộng đồng thành công! 🎉🔥');
  };

  // Lưu bản nháp (tối đa 2 set đồ)
  const handleSaveDraft = () => {
    const currentOutfit: OutfitState = {
      id: `draft-${Date.now()}`,
      top: selectedTop,
      bottom: selectedBottom,
      shoes: selectedShoe,
      accessories: [...selectedAccessories],
      topColor,
      bottomColor,
      gender,
      createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setDraftOutfits(prev => {
      if (prev.length >= 2) {
        // Thay thế set cũ nhất hoặc giữ tối đa 2
        const updated = [prev[1], currentOutfit];
        showToast('Đã lưu vào Bản nháp 2 (Bộ nhớ tối đa 2 set) ✨');
        return updated;
      } else {
        showToast(`Đã lưu bản nháp thành công! (${prev.length + 1}/2 set) 📌`);
        return [...prev, currentOutfit];
      }
    });
  };

  // Mở modal so sánh 2 phương án
  const handleOpenCompare = () => {
    if (draftOutfits.length === 0) {
      showToast('Hãy nhấn "Lưu bản nháp" ít nhất 1 set để so sánh nhé! ⚖️');
      return;
    }
    setIsComparing(true);
  };

  // Áp dụng set đồ từ Modal so sánh
  const handleApplyDraftOutfit = (outfit: OutfitState) => {
    setSelectedTop(outfit.top);
    setSelectedBottom(outfit.bottom);
    setSelectedShoe(outfit.shoes);
    setSelectedAccessories([...outfit.accessories]);
    setTopColor(outfit.topColor);
    setBottomColor(outfit.bottomColor);
    setGender(outfit.gender);
    setIsComparing(false);
    showToast('Đã chuyển sang set đồ được chọn thành công! 🎉');
  };

  // Mở modal lưu vào Lookbook
  const handleOpenSaveLookbook = () => {
    const topItem = culturalDatabase[selectedTop];
    const bottomItem = culturalDatabase[selectedBottom];
    setLookbookNameInput(`${topItem?.name || 'Việt phục'} remix ${bottomItem?.name || 'Hạ phục'}`);
    setIsSavingLookbook(true);
  };

  // Xác nhận lưu vào Lookbook
  const handleConfirmSaveLookbook = () => {
    const finalName = lookbookNameInput.trim() || 'Set đồ Cổ phong Gen Z';
    const newLookbookItem: LookbookItem = {
      id: `lookbook-${Date.now()}`,
      name: finalName,
      top: selectedTop,
      bottom: selectedBottom,
      shoes: selectedShoe,
      accessories: [...selectedAccessories],
      topColor,
      bottomColor,
      gender,
      createdAt: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      tags: [colorHarmony.badge, gender === 'female' ? 'Nữ' : 'Nam']
    };

    setMyLookbook(prev => [newLookbookItem, ...prev]);
    setIsSavingLookbook(false);
    showToast(`Đã lưu "${finalName}" vào Lookbook của bạn! 📖✨`);
  };

  // Xóa set khỏi Lookbook
  const handleDeleteLookbook = (id: string) => {
    setMyLookbook(prev => prev.filter(item => item.id !== id));
    showToast('Đã xóa set đồ khỏi Lookbook! 🗑️');
  };

  // Trang bị set từ Lookbook ra màn Phối đồ
  const handleEquipFromLookbook = (item: LookbookItem) => {
    setSelectedTop(item.top);
    setSelectedBottom(item.bottom);
    setSelectedShoe(item.shoes);
    setSelectedAccessories([...item.accessories]);
    setTopColor(item.topColor);
    setBottomColor(item.bottomColor);
    setGender(item.gender);
    setViewMode('mix_match');
    showToast(`Đã mặc set "${item.name}" lên Avatar! 👘`);
  };

  // Chia sẻ set đồ (Giả lập: Thông báo Toast Gen Z theo đề bài)
  const handleShareLookbook = (_item: LookbookItem) => {
    showToast('Đã tạo thiệp Lookbook và sao chép link chia sẻ thành công! 📸✨');
  };

  // Hàm chọn món đồ từ Thư viện sử thi và tự động trang bị cho avatar
  const handleEquipFromLibrary = (item: CulturalItem) => {
    if (item.category === 'ao') {
      setSelectedTop(item.id);
    } else if (item.category === 'quan') {
      setSelectedBottom(item.id);
    } else if (item.category === 'giay') {
      setSelectedShoe(item.id);
    } else if (item.category === 'phukien') {
      const group = item.accGroup;
      setSelectedAccessories(prev => {
        const withoutSameGroup = prev.filter(id => {
          const existing = ACCESSORIES.find(a => a.id === id);
          return existing?.accGroup !== group;
        });
        return [...withoutSameGroup, item.id];
      });
    }
    setViewMode('mix_match');
  };

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

  // --- HỆ THỐNG CẢNH BÁO VĂN HÓA (REFACTOR: ĐỌC ĐỘNG TỪ CULTURAL DATABASE QUA VALIDATE OUTFIT) ---
  const culturalAlerts = useMemo(() => {
    return validateOutfit(selectedTop, selectedBottom, selectedShoe, selectedAccessories);
  }, [selectedTop, selectedBottom, selectedShoe, selectedAccessories]);

  // Bộ preset ngẫu nhiên hoặc phong cách được chọn (Cổ điển – Giao thoa – Hiện đại – Ngẫu nhiên)
  const [currentStyle, setCurrentStyle] = useState<'codien' | 'giaothoa' | 'hiendai' | 'ngaunhien'>('giaothoa');

  const applyStyle = (style: 'codien' | 'giaothoa' | 'hiendai' | 'ngaunhien') => {
    setCurrentStyle(style);
    if (style === 'codien') {
      setSelectedTop('ao_tac');
      setSelectedBottom('quan_lua');
      setSelectedAccessories(['khan_xep', 'quat_xep']);
      setSelectedShoe('hai_theu');
      setTopColor(COLOR_PALETTE[1]); // Vàng lụa
      setBottomColor(COLOR_PALETTE[4]); // Trắng
    } else if (style === 'giaothoa') {
      setSelectedTop('ao_ngu_than');
      setSelectedBottom('quan_kaki');
      setSelectedAccessories(['kinh_tron', 'tui_tote']);
      setSelectedShoe('oxford');
      setTopColor(COLOR_PALETTE[0]); // Đỏ đô
      setBottomColor(COLOR_PALETTE[3]); // Đen
    } else if (style === 'hiendai') {
      setSelectedTop('ao_ngu_than');
      setSelectedBottom('quan_jeans');
      setSelectedAccessories(['tai_nghe', 'kinh_ram']);
      setSelectedShoe('sneaker_low');
      setTopColor(COLOR_PALETTE[0]); // Đỏ đô
      setBottomColor(COLOR_PALETTE[3]); // Đen
    } else if (style === 'ngaunhien') {
      handleRandomize();
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
      <header className="bg-white/95 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-50 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 shadow-xs">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-gradient-to-tr from-rose-800 via-amber-600 to-amber-400 flex items-center justify-center text-white shadow-sm font-bold text-base sm:text-lg">
            VV
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-neutral-900 font-serif">
                Việt Vibe
              </h1>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-full font-semibold border border-neutral-200">
                Gen Z Edition
              </span>
            </div>
            <p className="text-xs text-neutral-500 hidden sm:block font-medium">
              Cổ điển, Tôn trọng, Nét Việt sáng trong
            </p>
          </div>
        </div>

        {/* NAVBAR ĐIỀU HƯỚNG GIỮA CÁC MÀN HÌNH: "PHỐI ĐỒ", "THƯ VIỆN SỬ THI", "LOOKBOOK", "CỘNG ĐỒNG", "TIỆM CỔ PHỤC" */}
        <nav className="flex items-center gap-1 sm:gap-2.5 bg-neutral-200/70 p-1 sm:p-1.5 rounded-2xl border border-neutral-300/50 shadow-xs backdrop-blur-md overflow-x-auto scrollbar-none w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={handleNavToPhoiDo}
            className={`px-3 sm:px-4.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
              viewMode === 'onboarding' || viewMode === 'mix_match'
                ? 'bg-neutral-900 text-amber-300 shadow-md ring-1 ring-black/20'
                : 'text-neutral-700 hover:text-neutral-950 hover:bg-white/70'
            }`}
          >
            <span>Phối đồ</span>
            {hasStartedOutfit && viewMode !== 'mix_match' && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" title="Đang có bản phối dở" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setViewMode('epic_library')}
            className={`px-3 sm:px-4.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap ${
              viewMode === 'epic_library'
                ? 'bg-neutral-900 text-amber-300 shadow-md ring-1 ring-black/20'
                : 'text-neutral-700 hover:text-neutral-950 hover:bg-white/70'
            }`}
          >
            <span>Thư viện sử thi</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('lookbook')}
            className={`px-3 sm:px-4.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap ${
              viewMode === 'lookbook'
                ? 'bg-neutral-900 text-amber-300 shadow-md ring-1 ring-black/20'
                : 'text-neutral-700 hover:text-neutral-950 hover:bg-white/70'
            }`}
          >
            <span>Lookbook</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('community')}
            className={`px-3 sm:px-4.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap ${
              viewMode === 'community'
                ? 'bg-neutral-900 text-amber-300 shadow-md ring-1 ring-black/20'
                : 'text-neutral-700 hover:text-neutral-950 hover:bg-white/70'
            }`}
          >
            <span>Cộng đồng</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('stores')}
            className={`px-3 sm:px-4.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap ${
              viewMode === 'stores'
                ? 'bg-neutral-900 text-amber-300 shadow-md ring-1 ring-black/20'
                : 'text-neutral-700 hover:text-neutral-950 hover:bg-white/70'
            }`}
          >
            <span>Tiệm cổ phục</span>
          </button>
        </nav>

        {/* Khung bên phải thanh nav - Tối giản không text rườm rà */}
        <div className="w-2 hidden lg:block" />
      </header>

      {/* TOAST MESSAGE THÔNG BÁO TƯƠNG TÁC GEN Z */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[120] bg-neutral-950/90 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-xl border border-white/20 backdrop-blur-md animate-fadeIn flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* NÚT NỔI: QUAY LẠI BẢN PHỐI ĐANG DỞ TỪ MỌI MÀN HÌNH NGOÀI PHỐI ĐỒ */}
      {hasStartedOutfit && viewMode !== 'mix_match' && viewMode !== 'onboarding' && (
        <div className="fixed bottom-6 left-6 z-[100] animate-fadeIn">
          <button
            type="button"
            onClick={() => setViewMode('mix_match')}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-neutral-900/95 text-white hover:bg-black text-xs font-bold shadow-xl border border-amber-400/30 backdrop-blur-md hover:-translate-y-0.5 transition cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Đang phối dở: <span className="text-amber-300">{currentTopItem?.name}</span></span>
            <span className="bg-amber-400 text-neutral-950 px-2 py-0.5 rounded-md text-[10px] font-extrabold ml-1">
              Phối tiếp ↗
            </span>
          </button>
        </div>
      )}

      {/* HIỂN THỊ CHẾ ĐỘ ONBOARDING / THƯ VIỆN SỬ THI / LOOKBOOK / CỘNG ĐỒNG / TIỆM CỔ PHỤC / MÀN HÌNH PHỐI ĐỒ */}
      {viewMode === 'onboarding' ? (
        isLoadingRecommendation ? (
          <LoadingScreen 
            eventText={chosenEvent} 
            eventDate={chosenDate} 
            location={chosenLocation} 
          />
        ) : (
          <OnboardingScreen 
            key={onboardingResetKey}
            onStartRecommendation={handleStartRecommendation} 
            hideHeader={true}
            hasInProgressOutfit={hasStartedOutfit}
            currentOutfitDesc={`${currentTopItem?.name || 'Áo'} + ${currentBottomItem?.name || 'Hạ phục'}`}
            onContinueOutfit={() => setViewMode('mix_match')}
          />
        )
      ) : viewMode === 'epic_library' ? (
        <EpicLibraryView
          selectedId={librarySelectedId}
          onSelectId={setLibrarySelectedId}
          onEquipItem={handleEquipFromLibrary}
          onBackToMixMatch={() => setViewMode('mix_match')}
          hasInProgressOutfit={hasStartedOutfit}
          currentOutfitDesc={`${currentTopItem?.name || 'Áo'} + ${currentBottomItem?.name || 'Hạ phục'}`}
        />
      ) : viewMode === 'lookbook' ? (
        <LookbookView
          lookbooks={myLookbook}
          onEquipOutfit={handleEquipFromLookbook}
          onDeleteOutfit={handleDeleteLookbook}
          onShareOutfit={handleShareLookbook}
          onOpenVendor={handleOpenVendorForOutfit}
          onGoToMixMatch={() => setViewMode('mix_match')}
          onUpdateName={(id, newName) => {
            setMyLookbook(prev => prev.map(item => item.id === id ? { ...item, name: newName } : item));
            showToast(`Đã đổi tên bản phối thành "${newName}" ✨`);
          }}
        />
      ) : viewMode === 'community' ? (
        <CommunityForumView
          posts={forumPosts}
          onLikePost={handleLikePost}
          onAddComment={handleAddComment}
          onCloneOutfit={handleCloneOutfit}
          onOpenVendorForOutfit={handleOpenVendorForOutfit}
          onOpenCreatePost={() => setIsShareToCommunityOpen(true)}
          onGoToMixMatch={() => setViewMode('mix_match')}
        />
      ) : viewMode === 'stores' ? (
        <StoreLocatorScreen
          onCallStore={handleCallStore}
          onGoToMixMatch={() => setViewMode('mix_match')}
        />
      ) : (
        /* MAIN CONTAINER: 2 CỘT (40% PREVIEW - 60% CONTROLS) */
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-0">
        
        {/* CỘT TRÁI (LIVE PREVIEW - 40% ~ 5/12) */}
        <section className="lg:col-span-5 bg-white/85 backdrop-blur-md rounded-3xl border border-amber-900/10 p-4 lg:p-6 shadow-md flex flex-col items-center relative isolate overflow-hidden">
          
          {/* Header Preview: Bộ chọn giới tính Nam/Nữ & Nút Quay về gợi ý ban đầu */}
          <div className="w-full pb-3 border-b border-neutral-100/80 mb-3 flex items-center justify-between gap-2">
            {/* LỰA CHỌN GIỚI TÍNH */}
            <div className="bg-neutral-100/90 p-0.5 rounded-xl flex items-center text-xs font-semibold shadow-inner">
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  gender === 'female'
                    ? 'bg-rose-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                title="Avatar Nữ"
              >
                <span>👩</span>
                <span className="text-[11px] font-bold">Nữ</span>
              </button>
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  gender === 'male'
                    ? 'bg-neutral-900 text-amber-300 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                title="Avatar Nam"
              >
                <span>👨</span>
                <span className="text-[11px] font-bold">Nam</span>
              </button>
            </div>

            {/* Button ghi rõ 'Quay về gợi ý ban đầu' */}
            <button
              type="button"
              onClick={() => {
                setSelectedTop(initialOutfit.top || 'ao_ngu_than');
                setSelectedBottom(initialOutfit.bottom || 'quan_lua');
                setSelectedShoe(initialOutfit.shoes || 'sneaker_low');
                setSelectedAccessories(
                  Array.isArray(initialOutfit.accessories)
                    ? initialOutfit.accessories
                    : initialOutfit.accessories
                    ? [initialOutfit.accessories]
                    : []
                );
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200/70 transition shadow-2xs cursor-pointer active:scale-95"
              title="Khôi phục gợi ý trang phục ban đầu"
            >
              <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
              <span>Quay về gợi ý ban đầu</span>
            </button>
          </div>

          {/* VÙNG AVATAR SVG CANVAS (KHUNG MÀU SÁNG, DI CHUYỂN VÀO TỪNG VÙNG HIỂN THỊ TÊN & BẤM XEM THÔNG TIN) */}
          <div className="relative isolate w-full max-w-[320px] aspect-[1/2] rounded-3xl border border-amber-900/15 bg-gradient-to-b from-[#FAF7F2] via-[#F5EFEB] to-[#ECE5DC] shadow-lg flex items-center justify-center p-2 overflow-hidden ring-1 ring-amber-900/10 group">
            
            {/* Họa tiết lưới nhẹ & Sàn pedestal phát sáng ấm áp */}
            <div className="absolute inset-0 bg-[radial-gradient(#b45309_0.75px,transparent_0.75px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
            <div className="absolute bottom-6 inset-x-8 h-8 rounded-[100%] bg-amber-400/25 blur-md pointer-events-none" />

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

            {/* Z-INDEX 40: PHỤ KIỆN (NGOÀI CÙNG - HỖ TRỢ ĐA PHỤ KIỆN) */}
            <div className="absolute inset-0 z-40 pointer-events-none">
              <AccessorySvg itemIds={selectedAccessories} />
            </div>

            {/* VÙNG TƯƠNG TÁC 1: ĐỘI ĐẦU & PHỤ KIỆN (0 - 25%) */}
            <div 
              className="absolute top-0 inset-x-0 h-[25%] z-50 cursor-pointer"
              onMouseEnter={() => setHoveredZone('acc')}
              onMouseLeave={() => setHoveredZone(null)}
              onClick={() => {
                if (currentAccItems.length > 0) {
                  setInfoItem(currentAccItems[0]);
                } else {
                  setActiveTab('phukien');
                }
              }}
              title="Bấm để xem thông tin chi tiết phụ kiện"
            >
              <div className={`absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-neutral-900/90 text-white text-[11px] font-semibold tracking-wide shadow-lg border border-amber-400/30 backdrop-blur-md transition-all duration-200 pointer-events-none whitespace-nowrap z-60 ${hoveredZone === 'acc' ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-1'}`}>
                <span>✨ {selectedAccessories.length > 0 ? currentAccItems.map(i => i.name).join(', ') : 'Chưa chọn phụ kiện'}</span>
                <span className="text-[10px] text-amber-300 ml-1.5 underline">Xem thông tin</span>
              </div>
            </div>

            {/* VÙNG TƯƠNG TÁC 2: ÁO NGOÀI (25% - 55%) */}
            <div 
              className="absolute top-[25%] inset-x-0 h-[30%] z-50 cursor-pointer"
              onMouseEnter={() => setHoveredZone('top')}
              onMouseLeave={() => setHoveredZone(null)}
              onClick={() => {
                if (currentTopItem) setInfoItem(currentTopItem);
              }}
              title="Bấm để xem thông tin chi tiết áo"
            >
              <div className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-neutral-900/90 text-white text-[11px] font-semibold tracking-wide shadow-lg border border-amber-400/30 backdrop-blur-md transition-all duration-200 pointer-events-none whitespace-nowrap z-60 ${hoveredZone === 'top' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <span>👘 {currentTopItem?.name} ({topColor.name})</span>
                <span className="text-[10px] text-amber-300 ml-1.5 underline">Xem thông tin</span>
              </div>
            </div>

            {/* VÙNG TƯƠNG TÁC 3: QUẦN / VÁY (55% - 82%) */}
            <div 
              className="absolute top-[55%] inset-x-0 h-[27%] z-50 cursor-pointer"
              onMouseEnter={() => setHoveredZone('bottom')}
              onMouseLeave={() => setHoveredZone(null)}
              onClick={() => {
                if (currentBottomItem) setInfoItem(currentBottomItem);
              }}
              title="Bấm để xem thông tin chi tiết hạ phục"
            >
              <div className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-neutral-900/90 text-white text-[11px] font-semibold tracking-wide shadow-lg border border-amber-400/30 backdrop-blur-md transition-all duration-200 pointer-events-none whitespace-nowrap z-60 ${hoveredZone === 'bottom' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <span>👖 {currentBottomItem?.name} ({bottomColor.name})</span>
                <span className="text-[10px] text-amber-300 ml-1.5 underline">Xem thông tin</span>
              </div>
            </div>

            {/* VÙNG TƯƠNG TÁC 4: GIÀY DÉP (82% - 100%) */}
            <div 
              className="absolute top-[82%] inset-x-0 h-[18%] z-50 cursor-pointer"
              onMouseEnter={() => setHoveredZone('shoes')}
              onMouseLeave={() => setHoveredZone(null)}
              onClick={() => {
                if (currentShoeItem) setInfoItem(currentShoeItem);
              }}
              title="Bấm để xem thông tin chi tiết giày dép"
            >
              <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-neutral-900/90 text-white text-[11px] font-semibold tracking-wide shadow-lg border border-amber-400/30 backdrop-blur-md transition-all duration-200 pointer-events-none whitespace-nowrap z-60 ${hoveredZone === 'shoes' ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-1'}`}>
                <span>👞 {currentShoeItem?.name}</span>
                <span className="text-[10px] text-amber-300 ml-1.5 underline">Xem thông tin</span>
              </div>
            </div>
          </div>

          {/* HỆ THỐNG CẢNH BÁO VĂN HÓA (ALERTS HIỂN THỊ NỔI BẬT DỰA TRÊN CULTURAL DATABASE) */}
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
                    {alert.itemA && (
                      <button
                        type="button"
                        onClick={() => {
                          setLibrarySelectedId(alert.itemA!);
                          setViewMode('epic_library');
                        }}
                        className="mt-1 text-[11px] font-bold underline opacity-80 hover:opacity-100 flex items-center gap-1 cursor-pointer"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>Tra cứu nguyên tắc trong Thư viện sử thi</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {culturalAlerts.length === 0 && (
              <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-500 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-neutral-400" />
                <span>Phối đồ chuẩn mực, không vi phạm các quy tắc văn hóa cổ phục.</span>
              </div>
            )}
          </div>

          {/* CÁC TÙY CHỌN ĐƯỢC CHUYỂN XUỐNG DƯỚI PHẦN CẢNH BÁO: LƯU BẢN NHÁP, SO SÁNH, THUÊ/MAY Ở ĐÂU?, ĐĂNG LÊN FEED, LƯU VÀO LOOKBOOK */}
          <div className="w-full mt-4 pt-4 border-t border-neutral-200/80 space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              {/* Nút Lưu bản nháp */}
              <button
                type="button"
                onClick={handleSaveDraft}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-neutral-800 bg-[#FAF6EE] hover:bg-white border border-amber-900/15 shadow-2xs hover:shadow-xs transition-all hover:-translate-y-0.5 cursor-pointer active:scale-95"
                title="Lưu set đồ hiện tại vào bộ nhớ so sánh tạm thời"
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-600" />
                <span>Lưu bản nháp ({draftOutfits.length}/2)</span>
              </button>

              {/* Nút So sánh phương án */}
              <button
                type="button"
                onClick={handleOpenCompare}
                className={`inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5 cursor-pointer active:scale-95 shadow-2xs ${
                  draftOutfits.length > 0
                    ? 'bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold shadow-sm'
                    : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                }`}
                title="Mở modal so sánh song song 2 bản phối"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>So sánh ({draftOutfits.length})</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Thuê / May ở đâu? (Bỏ icon thứ 2 sau text) */}
              <button
                type="button"
                onClick={handleOpenVendorCurrent}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 shadow-2xs transition-all hover:-translate-y-0.5 cursor-pointer active:scale-95"
                title="Gợi ý xưởng may đo & tiệm cho thuê cổ phục uy tín gần bạn"
              >
                <Store className="w-3.5 h-3.5 text-emerald-700" />
                <span>Thuê/May ở đâu?</span>
              </button>

              {/* Đăng lên feed (Bỏ icon thứ 2 sau text) */}
              <button
                type="button"
                onClick={() => setIsShareToCommunityOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 shadow-2xs transition-all hover:-translate-y-0.5 cursor-pointer active:scale-95"
                title="Đăng set đồ này lên Diễn đàn cộng đồng"
              >
                <Users className="w-3.5 h-3.5 text-purple-700" />
                <span>Đăng lên Feed</span>
              </button>
            </div>

            {/* Lưu vào Lookbook (Bỏ icon thứ 2 sau text) */}
            <button
              type="button"
              onClick={handleOpenSaveLookbook}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-rose-900 via-rose-800 to-amber-700 hover:from-rose-950 hover:to-amber-800 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer active:scale-95"
              title="Lưu set đồ này vào Lookbook Việt Vibe cá nhân"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Lưu vào Lookbook</span>
            </button>
          </div>
        </section>

        {/* CỘT PHẢI (CONTROL PANEL - 60% ~ 7/12) */}
        <div className="lg:col-span-7 space-y-4 flex flex-col">
          {/* THÔNG TIN BỐI CẢNH NGẮN GỌN PHÍA TRÊN CÁC THANH CHỌN ĐỒ */}
          <div className="p-3.5 rounded-2xl bg-[#FAF6EE] border border-amber-900/15 flex flex-wrap items-center justify-between gap-2 text-xs shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-rose-800 text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-xs">
                📍
              </div>
              <div className="min-w-0">
                <div className="font-bold text-neutral-900 truncate flex items-center gap-2">
                  <span>{chosenEvent || 'Trải nghiệm cổ phục'}</span>
                  <span className="text-[11px] font-normal text-neutral-500">• {chosenLocation}</span>
                </div>
                <div className="text-[11px] text-neutral-500 truncate flex items-center gap-2 mt-0.5">
                  <span>📅 {chosenDate}</span>
                  <span>• 🌤️ 26°C (Trời đẹp)</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleResetContext}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-amber-900 hover:text-rose-800 bg-amber-100/70 hover:bg-amber-100 border border-amber-300/60 transition cursor-pointer"
            >
              Đổi bối cảnh
            </button>
          </div>

          {/* BOX CHỌN TRANG PHỤC / PHỤ KIỆN */}
          <section className="bg-white/85 backdrop-blur-md rounded-3xl border border-amber-900/10 p-4 lg:p-6 shadow-md flex flex-col">
            
            {/* GÓC TRÊN CỦA BOX CHỌN TRANG PHỤC/PHỤ KIỆN: "Bạn muốn chọn đồ theo phong cách nào" với 4 options */}
            <div className="mb-5 pb-4 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
                  Bạn muốn chọn đồ theo phong cách nào?
                </span>
              </div>

              <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => applyStyle('codien')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1 cursor-pointer active:scale-95 ${
                    currentStyle === 'codien'
                      ? 'bg-neutral-900 text-amber-300 border-black shadow-sm'
                      : 'bg-[#FAF6EE] text-neutral-700 border-amber-900/15 hover:bg-white hover:text-neutral-950'
                  }`}
                >
                  <span>📜 Cổ điển</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyStyle('giaothoa')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1 cursor-pointer active:scale-95 ${
                    currentStyle === 'giaothoa'
                      ? 'bg-neutral-900 text-amber-300 border-black shadow-sm'
                      : 'bg-[#FAF6EE] text-neutral-700 border-amber-900/15 hover:bg-white hover:text-neutral-950'
                  }`}
                >
                  <span>⚡ Giao thoa</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyStyle('hiendai')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1 cursor-pointer active:scale-95 ${
                    currentStyle === 'hiendai'
                      ? 'bg-neutral-900 text-amber-300 border-black shadow-sm'
                      : 'bg-[#FAF6EE] text-neutral-700 border-amber-900/15 hover:bg-white hover:text-neutral-950'
                  }`}
                >
                  <span>👟 Hiện đại</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyStyle('ngaunhien')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1 cursor-pointer active:scale-95 ${
                    currentStyle === 'ngaunhien'
                      ? 'bg-neutral-900 text-amber-300 border-black shadow-sm'
                      : 'bg-[#FAF6EE] text-neutral-700 border-amber-900/15 hover:bg-white hover:text-neutral-950'
                  }`}
                >
                  <span>🎲 Ngẫu nhiên</span>
                </button>
              </div>
            </div>

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
            <div className="mb-6 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-3">
              <div className="flex items-center justify-between">
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
              
              <div className="flex flex-wrap items-center gap-2.5">
                {COLOR_PALETTE.map(color => {
                  const isSelected = (activeTab === 'ao' ? topColor.id : bottomColor.id) === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => {
                        if (activeTab === 'ao') setTopColor(color);
                        else setBottomColor(color);
                      }}
                      className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
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
        </section>
        </div>
      </main>
      )}

      {/* TÍNH NĂNG 2: MODAL SO SÁNH PHƯƠNG ÁN (KHI BẤM NÚT "SO SÁNH") */}
      {isComparing && (
        <ComparisonModal
          draftA={draftOutfits[0]}
          draftB={
            draftOutfits[1] || {
              top: selectedTop,
              bottom: selectedBottom,
              shoes: selectedShoe,
              accessories: selectedAccessories,
              topColor,
              bottomColor,
              gender,
              createdAt: 'Đang mặc trên người'
            }
          }
          contextEvent={chosenEvent}
          onSelectOutfit={handleApplyDraftOutfit}
          onClose={() => setIsComparing(false)}
          onClearDrafts={() => {
            setDraftOutfits([]);
            setIsComparing(false);
            showToast('Đã xóa tất cả bản nháp! 🧹');
          }}
        />
      )}

      {/* TÍNH NĂNG 3: POPUP/MODAL ĐẶT TÊN VÀ LƯU VÀO LOOKBOOK */}
      {isSavingLookbook && (
        <LookbookSaveModal
          currentTop={selectedTop}
          currentBottom={selectedBottom}
          currentShoes={selectedShoe}
          currentAccessories={selectedAccessories}
          topColor={topColor}
          bottomColor={bottomColor}
          gender={gender}
          nameInput={lookbookNameInput}
          onChangeName={setLookbookNameInput}
          onSave={handleConfirmSaveLookbook}
          onClose={() => setIsSavingLookbook(false)}
        />
      )}

      {/* POPUP / MODAL CHI TIẾT LỊCH SỬ KHI BẤM NÚT (i) */}
      {infoItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-100 relative animate-scaleUp">
            <button
              onClick={() => setInfoItem(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition cursor-pointer"
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
              Thời kỳ: {infoItem.period || infoItem.era}
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed mb-4">
              {infoItem.visualTraits || infoItem.desc}
            </p>

            <div className="bg-rose-50/70 border border-rose-100 rounded-2xl p-4 text-xs text-neutral-800 leading-relaxed mb-4">
              <div className="font-semibold text-rose-900 mb-1 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-rose-700" />
                Nguồn gốc & Ý nghĩa biểu trưng:
              </div>
              <p>{infoItem.culturalSignificance || infoItem.history}</p>
            </div>

            <div className="flex items-center justify-between gap-2 mt-5 pt-3 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => {
                  setLibrarySelectedId(infoItem.id);
                  setInfoItem(null);
                  setViewMode('epic_library');
                }}
                className="px-3.5 py-2 text-xs font-bold text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Xem trong Thư viện sử thi</span>
              </button>

              <button
                type="button"
                onClick={() => setInfoItem(null)}
                className="px-4 py-2 text-xs font-semibold bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition cursor-pointer"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TÍNH NĂNG 2: NÚT NỔI FAB HỎI CỐ VẤN AI GEMINI (GÓC DƯỚI BÊN PHẢI) */}
      {viewMode === 'mix_match' && (
        <button
          type="button"
          onClick={() => setIsAdvisorOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-rose-800 via-rose-700 to-amber-600 hover:from-rose-900 hover:to-amber-700 text-white font-bold text-xs sm:text-sm pl-4 pr-5 py-3.5 rounded-full shadow-2xl hover:shadow-rose-900/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 border border-white/25 cursor-pointer group"
          title="Trò chuyện với Cố vấn AI Gemini về điển tích & chuẩn tắc thời trang"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400" />
          </span>
          <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
          <span className="tracking-wide">Hỏi Cố vấn Gemini ✨</span>
        </button>
      )}

      {/* TÍNH NĂNG 2: CHATBOX CỐ VẤN AI GEMINI */}
      <GeminiAdvisorDrawer
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        currentOutfit={getCurrentOutfitState()}
        onAutoFixOutfit={handleAutoFixFromAdvisor}
        onShowToast={showToast}
      />

      {/* TÍNH NĂNG 3: MODAL GỢI Ý NHÀ CUNG CẤP (VENDOR O2O) */}
      <VendorRecommendationModal
        isOpen={isVendorModalOpen}
        onClose={() => setIsVendorModalOpen(false)}
        targetOutfit={vendorTargetOutfit || getCurrentOutfitState()}
        onShowToast={showToast}
      />

      {/* MODAL TẠO BÀI ĐĂNG CHIA SẺ LÊN CỘNG ĐỒNG */}
      <ShareToCommunityModal
        isOpen={isShareToCommunityOpen}
        onClose={() => setIsShareToCommunityOpen(false)}
        currentOutfit={getCurrentOutfitState()}
        onPublish={handlePublishToCommunity}
      />
    </div>
  );
}

// ==========================================
// MÀN HÌNH 1: ONBOARDING (CHỌN BỐI CẢNH & GỢI Ý VỚI GEMINI & THỜI TIẾT)
// ==========================================
interface OnboardingScreenProps {
  onStartRecommendation: (event: string, eventDate: string, location: string, preferredTop: string) => void;
  hideHeader?: boolean;
  hasInProgressOutfit?: boolean;
  currentOutfitDesc?: string;
  onContinueOutfit?: () => void;
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
  { id: 'auto', label: 'Để AI tự chọn', desc: 'Chọn loại áo tối ưu theo bối cảnh & thời tiết' },
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

function OnboardingScreen({ 
  onStartRecommendation, 
  hideHeader,
  hasInProgressOutfit,
  currentOutfitDesc,
  onContinueOutfit 
}: OnboardingScreenProps) {
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
    <div className="flex-1 bg-gradient-to-b from-neutral-50 via-amber-50/20 to-neutral-100 flex flex-col font-sans text-neutral-800">
      {/* Top minimal header */}
      {!hideHeader && (
        <header className="px-4 lg:px-8 py-3.5 flex items-center justify-between border-b border-neutral-200/80 bg-white/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-800 via-amber-600 to-amber-400 flex items-center justify-center text-white shadow-xs font-bold text-base">
              VV
            </div>
            <div>
              <h1 className="text-base font-bold text-neutral-900 font-serif leading-none">
                Việt Vibe
              </h1>
              <span className="text-[10px] text-neutral-500 font-medium">Cổ điển, Tôn trọng, Nét Việt sáng trong</span>
            </div>
          </div>
        </header>
      )}

      {/* Main onboarding form */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl w-full bg-white/90 backdrop-blur-md rounded-3xl border border-amber-900/10 shadow-xl p-6 sm:p-8 space-y-6">
          {/* Header Title */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-neutral-900 tracking-tight">
              Bạn muốn mặc Việt phục đi đâu?
            </h2>
          </div>

          {/* BANNER TIẾP TỤC BẢN PHỐI ĐANG DỞ */}
          {hasInProgressOutfit && onContinueOutfit && (
            <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-300/80 flex items-center justify-between gap-3 shadow-xs animate-fadeIn">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xl">👘</span>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-neutral-900 truncate">
                    Bản phối đang dở: <span className="text-rose-800">{currentOutfitDesc}</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 truncate">
                    Bạn có thể tiếp tục phối bản này mà không cần nhập lại
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={onContinueOutfit}
                className="px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-black text-amber-300 text-xs font-bold shrink-0 transition shadow-xs cursor-pointer active:scale-95"
              >
                Phối tiếp bản dở ↗
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* BỐI CẢNH & DỊP XUẤT HIỆN */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Bối cảnh & Dịp xuất hiện
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {PRESET_EVENT_TAGS.map(tag => {
                  const isSelected = eventInput === tag.label;
                  return (
                    <button
                      key={tag.label}
                      type="button"
                      onClick={() => handleSelectTag(tag.label)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-rose-700 text-white shadow-xs ring-2 ring-rose-700/20'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80 hover:text-neutral-900'
                      }`}
                    >
                      <span>{tag.icon}</span>
                      <span>{tag.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="relative">
                <input
                  id="custom-event"
                  type="text"
                  value={eventInput}
                  onChange={e => setEventInput(e.target.value)}
                  placeholder="Hoặc tự nhập sự kiện (ví dụ: Đi concert rap, Dạo phố Tràng Tiền...)"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-neutral-300 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 outline-none transition bg-neutral-50/50 hover:bg-white focus:bg-white text-neutral-900 placeholder:text-neutral-400"
                />
                {eventInput && (
                  <button
                    type="button"
                    onClick={() => setEventInput('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* NGÀY & ĐỊA ĐIỂM TỔ CHỨC */}
            <div className="space-y-2.5 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-700" />
                <span>Ngày & Địa điểm</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Chọn ngày sự kiện */}
                <div className="space-y-1">
                  <label htmlFor="event-date" className="block text-[11px] font-semibold text-neutral-700">
                    Ngày diễn ra:
                  </label>
                  <input
                    id="event-date"
                    type="date"
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-amber-300/80 bg-white text-xs text-neutral-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                {/* Chọn địa điểm tổ chức */}
                <div className="space-y-1">
                  <label htmlFor="event-location" className="block text-[11px] font-semibold text-neutral-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Địa điểm:</span>
                  </label>
                  <select
                    id="event-location"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-amber-300/80 bg-white text-xs text-neutral-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  >
                    {POPULAR_LOCATIONS.map(loc => (
                      <option key={loc.id} value={loc.name}>
                        {loc.name} ({loc.badge})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Hộp Preview thời tiết cơ bản */}
              <div className="mt-2 p-2.5 rounded-xl bg-white/95 border border-amber-200/80 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-lg shrink-0 border border-amber-200/60">
                    {isLoadingWeather ? <Loader2 className="w-3.5 h-3.5 text-amber-700 animate-spin" /> : (weatherPreview?.icon || '🌤️')}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-neutral-900 truncate">
                      {isLoadingWeather
                        ? 'Đang kiểm tra thời tiết...'
                        : (weatherPreview?.weatherDesc || 'Trời nắng nhẹ, mát mẻ')}
                    </div>
                    <div className="text-[10px] text-neutral-500 truncate">
                      {isLoadingWeather ? 'Vui lòng đợi' : `Xác suất mưa: ${weatherPreview?.rainProb ?? 0}%`}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0 pl-2">
                  <span className="text-xs sm:text-sm font-extrabold text-amber-900 font-serif">
                    {weatherPreview ? `${weatherPreview.avgTemp}°C` : '26°C'}
                  </span>
                </div>
              </div>
            </div>

            {/* LOẠI ÁO MONG MUỐN */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Loại áo mong muốn
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PREFERRED_TOP_OPTIONS.map(opt => {
                  const isChecked = preferredTop === opt.id;
                  return (
                    <label
                      key={opt.id}
                      onClick={() => setPreferredTop(opt.id)}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer ${
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
                        className="mt-0.5 text-rose-700 focus:ring-rose-500 h-3.5 w-3.5"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-neutral-900">
                          {opt.label}
                        </div>
                        <div className="text-[10px] text-neutral-500 truncate mt-0.5">
                          {opt.desc}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* NÚT CTA: TẠO BẢN PHỐI */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-3 px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                  isFormValid
                    ? 'bg-gradient-to-r from-rose-800 via-rose-700 to-amber-700 hover:from-rose-900 hover:to-amber-800 text-white shadow-md active:scale-[0.99] cursor-pointer'
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Tạo bản phối trang phục</span>
              </button>
              {!isFormValid && (
                <p className="text-center text-[11px] text-neutral-400 mt-1.5">
                  * Vui lòng chọn hoặc tự nhập bối cảnh để tiếp tục
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
// MÀN HÌNH 2: LOADING (GEMINI AI & WEATHER ANALYZING) - TỐI GIẢN
// ==========================================
function LoadingScreen({ 
  eventText, 
  location 
}: { 
  eventText: string; 
  eventDate?: string; 
  location: string;
}) {
  return (
    <div className="flex-1 bg-gradient-to-b from-[#FAF6EE] via-amber-50/20 to-[#FAF6EE] flex flex-col items-center justify-center p-6 text-center font-sans py-20 animate-fadeIn">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-amber-900/10 shadow-xl max-w-sm w-full flex flex-col items-center space-y-5">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-900 via-rose-800 to-amber-600 flex items-center justify-center text-white shadow-lg animate-pulse">
            <Sparkles className="w-8 h-8 text-amber-300" />
          </div>
          <div className="absolute -inset-1.5 rounded-3xl bg-amber-500/20 animate-ping -z-10" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-neutral-900">
            Đang sáng tạo bản phối...
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-medium">
            "{eventText || 'Bối cảnh sự kiện'}" • {location}
          </p>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden relative">
          <div className="bg-gradient-to-r from-rose-700 via-amber-500 to-rose-700 h-full w-full rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// ROOT COMPONENT: QUẢN LÝ LUỒNG CHUYỂN MÀN HÌNH
// ==========================================
export default function App() {
  return <MixMatchScreen />;
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
          <span className="font-bold text-sm text-neutral-900 truncate block">
            {item.name}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
        {colorHex && (
          <span 
            className="w-4 h-4 rounded-full border border-black/10 shadow-xs" 
            style={{ backgroundColor: colorHex }} 
            title="Màu hiện tại"
          />
        )}
        <button
          type="button"
          onClick={onOpenInfo}
          title="Bấm để xem thông tin chi tiết & nguồn gốc lịch sử"
          className="p-1.5 rounded-xl text-neutral-400 hover:text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition cursor-pointer"
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

  // Khi áo có màu vàng lụa (#EEDC82 / #D4A345), các họa tiết, hoa văn, viền nẹp và khuy cúc màu vàng sẽ bị chìm vào áo.
  // Điều chỉnh màu hoa văn khi áo màu vàng sang màu tương phản nổi bật theo quy chuẩn cung đình (đỏ son hoàng tộc #991B1B / #B91C1C, xanh chàm #1E3A8A, hoặc trắng bạc #F8FAFC).
  // ĐẢM BẢO: Giữ nguyên 100% màu sắc nguyên bản cho các option màu áo khác!
  const isYellowTop = color?.toLowerCase() === '#d4a345' || color?.toLowerCase() === '#eedc82';
  const goldAccent = isYellowTop ? '#991B1B' : '#D4A345';
  const amberAccent = isYellowTop ? '#B91C1C' : '#F59E0B';
  const lightGoldAccent = isYellowTop ? '#DC2626' : '#FDE047';
  const paleGoldCloud = isYellowTop ? '#F8FAFC' : '#FEF08A';
  const boPhucNep = isYellowTop ? '#1E3A8A' : '#D4A345';
  const boPhucDragon = isYellowTop ? '#DC2626' : '#FDE047';
  const mountainYellow = isYellowTop ? '#B91C1C' : '#F59E0B';
  const waveYellow = isYellowTop ? '#991B1B' : '#EAB308';

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
              <line x1="150" y1="130" x2="150" y2="144" stroke={goldAccent} strokeWidth="1" />
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
              <path d="M148 144 L165 155 L165 240" stroke={goldAccent} strokeWidth="1.5" fill="none" />
              <circle cx="165" cy="165" r="2.2" fill={goldAccent} />
              <circle cx="165" cy="195" r="2.2" fill={goldAccent} />
              <circle cx="165" cy="225" r="2.2" fill={goldAccent} />
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
              <circle cx="168" cy="172" r="2" fill={goldAccent} />
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
          <path d={isMale ? "M138 130 L162 130 L160 144 L140 144 Z" : "M140 132 L160 132 L159 144 L141 144 Z"} fill={color} stroke={goldAccent} strokeWidth={isMale ? 1.5 : 1} />
          
          {/* Thân áo ngũ thân dài quá gối: Che kín toàn bộ thân trên của avatar (108..192 tại vai, 118..182 tại eo), vừa vặn lịch thiệp */}
          <path d={isMale ? "M104 141 L196 141 L186 260 L188 465 L112 465 L114 260 Z" : "M108 141 L192 141 L182 260 L186 465 L114 465 L118 260 Z"} fill={color} />
          
          {/* Tay áo chẽn trái: Che phủ toàn bộ cánh tay vừa vặn, mép cổ tay ôm sát bàn tay chắp */}
          <path 
            d={isMale 
              ? "M104 140 L70 213 Q59 226 72 240 L135 271 L146 248 L84 214 L121 158 Z" 
              : "M108 140 L74 213 Q63 226 76 240 L135 271 L146 250 L86 214 L123 158 Z"} 
            fill={color} 
          />
          <line x1="135" y1="271" x2="146" y2={isMale ? "248" : "250"} stroke={goldAccent} strokeWidth="1.5" />

          {/* Tay áo chẽn phải: Che phủ toàn bộ cánh tay vừa vặn, mép cổ tay ôm sát bàn tay chắp */}
          <path 
            d={isMale 
              ? "M196 140 L230 213 Q241 226 228 240 L165 271 L154 248 L216 214 L179 158 Z" 
              : "M192 140 L226 213 Q237 226 224 240 L165 271 L154 250 L214 214 L177 158 Z"} 
            fill={color} 
          />
          <line x1="165" y1="271" x2="154" y2={isMale ? "248" : "250"} stroke={goldAccent} strokeWidth="1.5" />

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
          <path d="M150 144 L164 152 L164 220" stroke={goldAccent} strokeWidth={isMale ? 2 : 1.5} fill="none" />
          <circle cx="150" cy="144" r={isMale ? 2.5 : 2} fill={goldAccent} />
          <circle cx="160" cy="150" r={isMale ? 2.5 : 2} fill={goldAccent} />
          <circle cx="164" cy="170" r={isMale ? 2.5 : 2} fill={goldAccent} />
          <circle cx="164" cy="195" r={isMale ? 2.5 : 2} fill={goldAccent} />
          <circle cx="164" cy="220" r={isMale ? 2.5 : 2} fill={goldAccent} />
          <line x1={isMale ? "112" : "114"} y1={isMale ? "462" : "461"} x2={isMale ? "188" : "186"} y2={isMale ? "462" : "461"} stroke="#000" strokeOpacity="0.15" strokeWidth="2" />
        </g>
      )}

      {/* 4.4 ÁO TẤC (Tay theo dáng cánh tay chắp, không rũ xuống dưới) */}
      {itemId === 'ao_tac' && (
        <g>
          {/* Cổ áo đứng lập lĩnh cung đình nẹp viền vàng */}
          <path d={isMale ? "M138 130 L162 130 L160 144 L140 144 Z" : "M140 132 L160 132 L159 144 L141 144 Z"} fill={color} stroke={amberAccent} strokeWidth="1.2" />
          
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
            <line x1="136" y1={isMale ? "248" : "250"} x2="136" y2="274" stroke={amberAccent} strokeWidth="2" />
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
            <line x1="164" y1={isMale ? "248" : "250"} x2="164" y2="274" stroke={amberAccent} strokeWidth="2" />
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
          <circle cx="150" cy="144" r="2.5" fill={amberAccent} />
          <circle cx="154" cy="165" r="2.5" fill={amberAccent} />
          <circle cx="154" cy="190" r="2.5" fill={amberAccent} />
          <circle cx="154" cy="215" r="2.5" fill={amberAccent} />
          <circle cx="154" cy="238" r="2.5" fill={amberAccent} />
          
          {/* Đường viền tà áo */}
          <line x1={isMale ? "106" : "110"} y1={isMale ? "476" : "470"} x2={isMale ? "194" : "190"} y2={isMale ? "476" : "470"} stroke={amberAccent} strokeWidth="2" />
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
                <line x1="116" y1="246" x2="116" y2="274" stroke={goldAccent} strokeWidth="1" />
                <line x1="136" y1="246" x2="136" y2="274" stroke={goldAccent} strokeWidth="1.5" />
              </g>

              {/* Tay phải ngũ sắc đối xứng (x=164..184, y=246..274) */}
              <g>
                <rect x="164" y="246" width="4" height="28" fill="#DC2626" />
                <rect x="168" y="246" width="4" height="28" fill="#EAB308" />
                <rect x="172" y="246" width="4" height="28" fill="#0284C7" />
                <rect x="176" y="246" width="4" height="28" fill="#F8FAFC" />
                <rect x="180" y="246" width="4" height="28" fill="#047857" />
                <line x1="184" y1="246" x2="184" y2="274" stroke={goldAccent} strokeWidth="1" />
                <line x1="164" y1="246" x2="164" y2="274" stroke={goldAccent} strokeWidth="1.5" />
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
              <path d="M130 142 L170 142 L170 240 L158 240 L158 154 L142 154 L142 240 L130 240 Z" fill={boPhucNep} />
              <rect x="136" y="165" width="28" height="28" rx="2" fill="#B45309" stroke={amberAccent} strokeWidth="1.5" />
              <circle cx="150" cy="179" r="6" fill={boPhucDragon} />
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
                <path d="M143 465 Q150 425 157 465 Z" fill={mountainYellow} />
                {/* Các dải tia sóng nước ngũ sắc tỏa ra 2 bên */}
                <line x1="114" y1="475" x2="135" y2="440" stroke="#F8FAFC" strokeWidth="2.5" />
                <line x1="120" y1="475" x2="141" y2="440" stroke="#DC2626" strokeWidth="2.5" />
                <line x1="126" y1="475" x2="147" y2="440" stroke={waveYellow} strokeWidth="2.5" />
                <line x1="186" y1="475" x2="165" y2="440" stroke="#F8FAFC" strokeWidth="2.5" />
                <line x1="180" y1="475" x2="159" y2="440" stroke="#DC2626" strokeWidth="2.5" />
                <line x1="174" y1="475" x2="153" y2="440" stroke={waveYellow} strokeWidth="2.5" />
                {/* Viền sóng nước cuộn dưới chân */}
                <path d="M110 472 Q120 467 130 472 Q140 467 150 472 Q160 467 170 472 Q180 467 190 472" stroke={paleGoldCloud} strokeWidth="1.5" fill="none" />
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
                <circle cx="94" cy="190" r="7" fill="none" stroke={lightGoldAccent} strokeWidth="1.2" strokeDasharray="3 1" />
                <circle cx="94" cy="190" r="3.5" fill="#047857" fillOpacity="0.7" />
                {/* Vai phải */}
                <circle cx="206" cy="190" r="7" fill="none" stroke={lightGoldAccent} strokeWidth="1.2" strokeDasharray="3 1" />
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
                <line x1="116" y1="246" x2="116" y2="274" stroke={amberAccent} strokeWidth="1" />
                <line x1="136" y1="246" x2="136" y2="272" stroke={amberAccent} strokeWidth="1.8" />
              </g>

              {/* Cửa tay áo phải đối xứng (x=164..184, y=246..274) */}
              <g>
                <rect x="164" y="246" width="4" height="28" fill="#DC2626" />
                <rect x="168" y="246" width="4" height="28" fill="#EAB308" />
                <rect x="172" y="246" width="4" height="28" fill="#0284C7" />
                <rect x="176" y="246" width="4" height="28" fill="#F8FAFC" />
                <rect x="180" y="246" width="4" height="28" fill="#047857" />
                <line x1="184" y1="246" x2="184" y2="274" stroke={amberAccent} strokeWidth="1" />
                <line x1="164" y1="246" x2="164" y2="272" stroke={amberAccent} strokeWidth="1.8" />
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
                <path d="M130 140 L170 140 L170 245 L158 245 L158 154 L142 154 L142 245 L130 245 Z" fill="#0369A1" stroke={amberAccent} strokeWidth="1.2" />
                {/* Họa tiết mây vàng trên nẹp cổ */}
                <path d="M134 148 Q150 144 166 148" stroke={paleGoldCloud} strokeWidth="1.2" fill="none" />
                <path d="M136 170 Q139 166 142 170 M158 170 Q161 166 164 170" stroke={paleGoldCloud} strokeWidth="1" fill="none" />
                <path d="M136 195 Q139 191 142 195 M158 195 Q161 191 164 195" stroke={paleGoldCloud} strokeWidth="1" fill="none" />
                <path d="M136 220 Q139 216 142 220 M158 220 Q161 216 164 220" stroke={paleGoldCloud} strokeWidth="1" fill="none" />
                
                {/* Khánh ngọc & dải ngọc bội cung đình rủ giữa ngực */}
                <circle cx="150" cy="180" r="5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.2" />
                <circle cx="150" cy="180" r="2.5" fill="#38BDF8" />
                <line x1="150" y1="185" x2="150" y2="238" stroke="#DC2626" strokeWidth="1.5" />
                <circle cx="150" cy="238" r="2" fill={amberAccent} />
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
