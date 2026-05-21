import {
  BadgeCheck,
  Binary,
  Box,
  CircleGauge,
  Cpu,
  DraftingCompass,
  Factory,
  Gauge,
  Layers3,
  Mail,
  Microscope,
  Phone,
  Ruler,
  ShieldCheck,
  Smartphone,
  Sparkles
} from "lucide-react";

export const navItems = [
  { label: "產品代理", href: "#mitutoyo" },
  { label: "精密加工", href: "#machining" },
  { label: "Siemens", href: "#siemens" },
  { label: "關於慶鴻", href: "#about" },
  { label: "聯絡", href: "#contact" }
];

export const heroSlides = [
  {
    id: "mitutoyo",
    eyebrow: "Authorized Product / Mitutoyo",
    title: "原廠授權的精密量測基準",
    subtitle: "從測微器、內徑量測到工業現場校準，建立可信賴的尺寸品質鏈。",
    cta: "查看量測產品",
    href: "#mitutoyo",
    accent: "#f36b21",
    mode: "orange"
  },
  {
    id: "machining",
    eyebrow: "Design-to-Manufacturing",
    title: "設計、加工、驗證一站式整合",
    subtitle: "讓 CAD 圖面落地為高精度金屬零件，並以量測資料回饋製程。",
    cta: "了解加工服務",
    href: "#machining",
    accent: "#4f8fd8",
    mode: "blue"
  },
  {
    id: "siemens",
    eyebrow: "Engineering Software / Siemens",
    title: "工程軟體與數位製造流程整合",
    subtitle: "串接設計、分析、製造與資料管理，打造可驗證的數位孿生流程。",
    cta: "探索 Siemens 方案",
    href: "#siemens",
    accent: "#008f7e",
    mode: "green"
  },
  {
    id: "license",
    eyebrow: "Professional Authorization",
    title: "以授權資格建立長期技術信任",
    subtitle: "代理、銷售、導入與售後協作，作為工業客戶可靠的技術夥伴。",
    cta: "聯絡技術顧問",
    href: "#contact",
    accent: "#4b48a5",
    mode: "white"
  }
] as const;

export const trustStats = [
  { value: 18, suffix: "+", label: "精密量測專業", icon: Gauge },
  { value: 2, suffix: "大", label: "授權品牌代理", icon: BadgeCheck },
  { value: 4, suffix: "段", label: "工程整合流程", icon: Layers3 },
  { value: 12, suffix: "+", label: "服務產業範圍", icon: Factory }
];

export const mitutoyoProducts = [
  { name: "外徑測微器", text: "高解析手感與穩定棘輪機構，適合精密外徑尺寸檢查。", image: "linear-gradient(135deg,#fff7f0,#f36b21 58%,#f8b27f)" },
  { name: "深度測微器", text: "用於槽深、階差與孔深量測，支援治具化檢驗流程。", image: "linear-gradient(135deg,#fff8f2,#e95e1a 55%,#d9e4f4)" },
  { name: "內徑測微器", text: "精準掌握孔徑與內槽尺寸，降低人工讀值偏差。", image: "linear-gradient(135deg,#fff4eb,#f36b21 50%,#6f7780)" },
  { name: "三點式內徑測微器", text: "三點接觸提升孔徑同心與重複量測穩定度。", image: "linear-gradient(135deg,#fff8f4,#d95f22 52%,#aeb8c5)" },
  { name: "游標卡尺", text: "日常檢驗與現場巡檢的基礎精密量測工具。", image: "linear-gradient(135deg,#fff6ed,#f36b21 45%,#edf2f7)" },
  { name: "高度規", text: "搭配平台量測高度、段差與加工基準建立。", image: "linear-gradient(135deg,#fff7f1,#f36b21 48%,#8d98a5)" },
  { name: "百分表 / 量表", text: "檢測平面度、偏擺、定位與製程中變動量。", image: "linear-gradient(135deg,#fff5ef,#e16022 50%,#f2f5f9)" },
  { name: "粗糙度量測儀", text: "掌握加工表面紋理與規格驗收的量化依據。", image: "linear-gradient(135deg,#fff8f2,#f36b21 42%,#4f8fd8)" },
  { name: "投影機 / 影像量測", text: "適合輪廓、角度與複合幾何的非接觸式檢測。", image: "linear-gradient(135deg,#fff4eb,#f36b21 52%,#4b48a5)" }
];

export const machiningSteps = [
  { title: "設計圖", text: "讀取 2D/3D 工程資料，確認公差、材質與關鍵尺寸。", icon: DraftingCompass },
  { title: "加工", text: "以 CNC 金屬切削、治具配置與製程參數控制穩定成形。", icon: Cpu },
  { title: "量測", text: "使用精密儀器進行首件、巡檢與交付前驗證。", icon: Microscope },
  { title: "成品交付", text: "提供可追溯的品質紀錄與可靠交期，支援後續量產。", icon: Box }
];

export const siemensProducts = [
  {
    id: "s1",
    title: "Siemens 產品 1",
    text: "建立從概念設計到製造資料的工程模型管理流程。",
    modules: ["CAD Modeling", "Revision Control", "Tooling Data", "Manufacturing Handoff"],
    accent: "#008f7e"
  },
  {
    id: "s3",
    title: "Siemens 產品 3",
    text: "結合模擬、檢核與流程節點，減少設計變更成本。",
    modules: ["Simulation", "Tolerance Check", "Workflow", "Report Pack"],
    accent: "#4f8fd8"
  },
  {
    id: "s4",
    title: "Siemens 產品 4",
    text: "串接製造現場與工程資料，提升工單透明度與追溯性。",
    modules: ["CAM Bridge", "Process Plan", "Shopfloor Sync", "Quality Link"],
    accent: "#f36b21"
  },
  {
    id: "s13",
    title: "Siemens 產品 13",
    text: "支援企業級數位孿生、資料治理與跨部門協作導入。",
    modules: ["Digital Twin", "Data Governance", "API Integration", "Training"],
    accent: "#4b48a5"
  }
];

export const contactItems = [
  { label: "Tel", value: "+886-2-0000-0000", icon: Phone },
  { label: "Mobile", value: "+886-900-000-000", icon: Smartphone },
  { label: "Email", value: "service@ching-hong.com", href: "mailto:service@ching-hong.com", icon: Mail }
];

export const capabilities = [
  { title: "原廠授權代理", icon: ShieldCheck },
  { title: "精密量測校準", icon: CircleGauge },
  { title: "工業軟體整合", icon: Binary },
  { title: "高精度製程服務", icon: Sparkles }
];
