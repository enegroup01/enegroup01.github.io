import {
  Binary,
  Box,
  CircleGauge,
  Cpu,
  DraftingCompass,
  Factory,
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
  { label: "工業軟體", href: "#software" },
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

export const mitutoyoProducts = [
  {
    name: "外徑測微器",
    englishName: "Digimatic Outside Micrometer (QuantuMike Series)",
    image: "/images/mitutoyo-01-outside-micrometer.png",
    features: [
      "快速進給機構，螺桿螺距為一般測微器的 4 倍，大幅提升量測效率。",
      "IP65 防塵防水等級，無懼切削液濺灑，適合現場加工環境。"
    ],
    spec: "量程 0-1\" / 分辨率 0.001mm (.00005\")"
  },
  {
    name: "卡尺",
    englishName: "Digimatic Caliper (ABSOLUTE Series)",
    image: "/images/mitutoyo-02-caliper.png",
    features: [
      "採用 Mitutoyo 專利 ABSOLUTE 靜電容量式感應器，開機免重設原點。",
      "滑行順暢舒適，人體工學設計大幅降低長時間使用的手部疲勞。"
    ],
    spec: "量程 0-150mm (0-6\") / 分辨率 0.01mm (.0005\")"
  },
  {
    name: "數位式量錶",
    englishName: "Digimatic Indicator (ID-C Series ABSOLUTE)",
    image: "/images/mitutoyo-03-digimatic-indicator.png",
    features: [
      "大型液晶顯示幕搭配類比條狀圖，動態公差判定一目了然。",
      "支援 330° 螢幕旋轉，無論安裝於何種角度的治具上皆易於讀數。"
    ],
    spec: "分辨率 0.001mm / 具備 ABSOLUTE 原點記憶功能"
  },
  {
    name: "指示量錶",
    englishName: "Dial Indicator (No. 1900A-10)",
    image: "/images/mitutoyo-04-dial-indicator.png",
    features: [
      "經典高精度機械指針式量錶，Full Jeweled 寶石軸承設計，摩擦力極小。",
      "完善防震結構，確保嚴苛環境下的耐用度與指針穩定度。"
    ],
    spec: "刻度值 1um (0.001mm) / 平滑倒置式背蓋"
  },
  {
    name: "槓桿式量錶",
    englishName: "Dial Test Indicator (Pocket Type)",
    image: "/images/mitutoyo-05-dial-test-indicator.png",
    features: [
      "專為量測表面平直度、真圓度及對心校正設計，觸針可雙向感應。",
      "結構緊湊輕巧，適合治具內部或窄小空間的精密量測。"
    ],
    spec: "刻度值 0.01mm / 紅寶石或碳化鎢測針"
  },
  {
    name: "量錶應用及測微台",
    englishName: "Granite Comparator Stand",
    image: "/images/mitutoyo-06-comparator-stand.png",
    features: [
      "高硬度天然花崗岩黑石底座，質地穩定、不易變形且不生鏽。",
      "高剛性垂直支柱搭配微調機構，是精密比較量測的必備工作台。"
    ],
    spec: "微動調整功能 / 適用多款標準夾徑量錶"
  },
  {
    name: "高度計",
    englishName: "Digimatic Height Gage (ABSOLUTE Linear Encoder)",
    image: "/images/mitutoyo-07-height-gage.png",
    features: [
      "用於精密劃線與工件高度、階差量測，大尺寸手輪讓微進給更順暢。",
      "高剛性結構有效確保量測時的垂直度與重現性。"
    ],
    spec: "最大量程 300mm / 具備數據輸出接口"
  },
  {
    name: "深度計",
    englishName: "Digimatic Depth Gage",
    image: "/images/mitutoyo-08-depth-gage.png",
    features: [
      "寬大且精磨的底座接觸面，穩固貼合工件，精確量測盲孔、階差及槽深。",
      "尺身刻度清晰，數位顯示幕讀數直覺，有效避免人為視差。"
    ],
    spec: "量程 0-200mm / 分辨率 0.01mm"
  },
  {
    name: "三點內徑測微器",
    englishName: "Digimatic Holtest (Three-Point Internal Micrometer)",
    image: "/images/mitutoyo-09-holtest.png",
    features: [
      "三點式觸頭具備自動定心功能，能獲得高重現性的真圓內徑量測數據。",
      "測頭表面經鈦合金鍍層處理，耐磨性極佳，延長使用壽命。"
    ],
    spec: "IP65 防塵防水等級 / 棘輪裝置確保恆定測力"
  }
];

export const machiningSteps = [
  { title: "設計圖", text: "讀取 2D/3D 工程資料，確認公差、材質與關鍵尺寸。", icon: DraftingCompass },
  { title: "加工", text: "以 CNC 金屬切削、治具配置與製程參數控制穩定成形。", icon: Cpu },
  { title: "量測", text: "使用精密儀器進行首件、巡檢與交付前驗證。", icon: Microscope },
  { title: "成品交付", text: "提供可追溯的品質紀錄與可靠交期，支援後續量產。", icon: Box }
];

export const siemensProducts = [
  {
    id: "nx",
    title: "Siemens NX",
    category: "CAD / Design",
    chineseName: "Siemens NX 高階電腦輔助設計軟體",
    englishName: "Siemens NX (Computer-Aided Design)",
    image: "/images/siemens-01-nx.png",
    text: "整合高階三維建模、大型組合件管理、MBD/PMI 與 AI 智能助理，支援從設計到下游製造的一致工程資料流。",
    coreFunctions: [
      "高階三維實體與曲面建模，支援 Synchronous Technology 直接編輯第三方 CAD 幾何。",
      "Large Assembly Management 可流暢處理數萬個零件組成的複雜系統。",
      "支援 MBD/PMI，在三維模型上直接標註製造資訊，銜接無紙化設計流程。",
      "AI Copilot 依操作情境提供建模、PMI 生成與產品模擬指引。"
    ],
    features: ["CAD / CAE / CAM 共享單一數據源", "參數化設計與 AI 智慧建議提升複雜幾何修改效率"],
    modules: ["Synchronous Modeling", "Large Assembly", "MBD / PMI", "AI Copilot"],
    accent: "#008f7e"
  },
  {
    id: "flotherm",
    title: "Simcenter Flotherm",
    category: "Thermal CFD",
    chineseName: "Simcenter Flotherm 電子散熱模擬軟體",
    englishName: "Simcenter Flotherm",
    image: "/images/siemens-02-flotherm.jpg",
    text: "針對 PCB、晶片封裝、伺服器機櫃與電子設備進行 CFD 與熱傳導模擬，協助在設計早期找出熱瓶頸。",
    coreFunctions: [
      "電子系統專用 CFD 求解器，適用 PCB、晶片封裝、機櫃與散熱模組。",
      "以三維流線與熱動態等高線呈現風扇、散熱片與熱累積區域。",
      "支援主流 EDA 板面佈局與銅箔層幾何資料導入，快速建立熱模擬網格。"
    ],
    features: ["電子散熱領域常用標準工具", "在原型前預測 hotspots，降低實體打樣成本"],
    modules: ["Electronic CFD", "Thermal Flow", "EDA Import", "Hotspot Review"],
    accent: "#4f8fd8"
  },
  {
    id: "solid-edge-simulation",
    title: "Solid Edge Simulation",
    category: "FEA / Simulation",
    chineseName: "Solid Edge 結構與有限元素分析模組",
    englishName: "Solid Edge Simulation",
    image: "/images/siemens-03-solid-edge.jpg",
    text: "內嵌於 Solid Edge 設計環境的設計驗證工具，可在建模當下同步評估零件強度、變形與應力集中。",
    coreFunctions: [
      "支援靜力學、動力學、模態分析與挫曲模擬，驗證零件與組合件結構。",
      "自動將複雜幾何轉換為高階有限元素網格，降低前處理門檻。",
      "以 Von Mises Stress 彩色圖譜精準標示受載時的應力集中點。"
    ],
    features: ["Design-Centric CAE 直接嵌入設計流程", "可配合 Generative Design 進行數位輕量化"],
    modules: ["FEA Stress", "Mesh Generation", "Modal Check", "Generative Design"],
    accent: "#4b48a5"
  },
  {
    id: "nx-cam",
    title: "NX CAM",
    category: "CAM / Manufacturing",
    chineseName: "NX CAM 電腦輔助製造與數控加工軟體",
    englishName: "NX CAM (Computer-Aided Manufacturing)",
    image: "/images/siemens-04-nx-cam.png",
    text: "支援多軸 CNC 編程、機床與夾具模擬、CAM Assist 智慧刀路建議，降低撞機風險並提升加工效率。",
    coreFunctions: [
      "支援 2.5 軸、3 軸、5 軸聯動、車銑複合與機器人加工路徑生成。",
      "在虛擬環境復現機床、刀具、工件與夾具運動軌跡，進行加工前驗證。",
      "CAM Assist 自動識別零件幾何特徵，推薦切削參數、粗加工與精加工刀路。"
    ],
    features: ["機床碰撞與干涉檢查降低下機風險", "AI 特徵辨識與高速銑削路徑縮短 CNC 編程與切削工時"],
    modules: ["CNC Programming", "Machine Simulation", "CAM Assist", "Collision Check"],
    accent: "#008f7e"
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
