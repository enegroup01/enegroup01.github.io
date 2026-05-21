# 慶鴻精密有限公司 Landing Page

高端 B2B 工業科技一頁式網站，使用 Next.js、TypeScript、Tailwind CSS、GSAP ScrollTrigger、Framer Motion、Lenis，並整合改寫自 Radiant Shaders 的 Canvas Kinetic Grid / Flow Field。

## 檔案結構

- `app/layout.tsx`：SEO metadata、字體與全域 layout
- `app/page.tsx`：一頁式 section 組裝
- `app/globals.css`：Tailwind、品牌色、金屬面板、掃描 CTA、全域質感
- `components/Hero.tsx`：4 組主視覺輪播、拆字進場、掃描 CTA
- `components/RadiantKineticGrid.tsx`：Radiant Kinetic Grid 改寫版，白底可見度更高的彈性網格與脈衝互動
- `components/RadiantFlowField.tsx`：Radiant Flow Field 改寫版，保留為後續局部流場特效可重用元件
- `components/TrustStats.tsx`：信任數據 count-up 與 icon 描邊
- `components/ProductGrid.tsx`：Mitutoyo 9 項 placeholder 產品
- `components/MachiningStory.tsx`：精密加工 scrollytelling
- `components/SiemensShowcase.tsx`：Siemens tabs / gallery reveal
- `components/TechDivider.tsx`：品牌化 shader 穿插區
- `components/AboutContact.tsx`：About、Contact、Footer
- `components/SectionHeader.tsx`：共用 section 標題
- `hooks/useLenis.ts`：平滑滾動
- `hooks/useGsapReveal.ts`：section reveal / stagger 動畫
- `lib/data.ts`：可替換文案、產品、聯絡資料、nav
- `lib/simplex.ts`：Radiant Flow Field 所需 Simplex noise

## 替換真實素材的位置

- Mitutoyo 產品：更新 `lib/data.ts` 的 `mitutoyoProducts`，將 `image` 改成真實圖片路徑或 Next Image 資料。
- Siemens 產品：更新 `lib/data.ts` 的 `siemensProducts`，後續可在 `components/SiemensShowcase.tsx` 將 placeholder gallery 換成真實截圖陣列。
- 聯絡資訊：更新 `lib/data.ts` 的 `contactItems`。
- Hero 文案與 CTA：更新 `lib/data.ts` 的 `heroSlides`。

## 設計規範

- 主背景：`carbon #f7f9fc`
- 面板：`graphite #ffffff` 搭配細灰線與玻璃質感
- 主文字：`ink #14171f`
- 次文字：`steel #5f6b7a`
- 慶鴻主色：`chingBlue #4f8fd8`、`chingViolet #4b48a5`
- Mitutoyo accent：`#f36b21`
- Siemens accent：`#008f7e`
- 光學藍：`#2d7fd1`

## 效能策略

- Shader 使用 Canvas 2D，mobile 自動降低粒子量。
- DPR capped at 1.75，避免高解析螢幕過度耗 GPU/CPU。
- `prefers-reduced-motion` 會使用靜態 fallback。
- ScrollTrigger 僅綁定必要元素；產品 grid 以 stagger reveal 取代大量持續動畫。

## 開發

```bash
npm install
npm run dev
```
