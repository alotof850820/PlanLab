# PlanLab 財務規劃儀表板

PlanLab 是一個用 Nuxt、Vue、Tailwind CSS 與 Chart.js 製作的個人財務規劃網頁。它參考 ProjectionLab 類型產品的首頁節奏，先用深色 Landing Page 呈現產品定位，再透過 `Start planning` 進入實際的財務規劃工作區。

## 線上觀看

Vercel production URL：

https://planlab-alotof850820.vercel.app/

此網址連到 `main` 分支的 Vercel production deployment。原本的 `nuxt-hybrid-tailwind-20260610-15454.vercel.app` 仍可用，但主要展示網址已改為 PlanLab 命名。

## 主要功能

- **首頁入口**：`/` 是 ProjectionLab-style 深色首頁，包含品牌導覽、產品主張、`Start planning` CTA 與儀表板預覽。
- **財務總覽**：`/dashboard` 顯示總資產、資產變化趨勢與資產配置。
- **股票規劃**：`/stocks` 可調整月投入、年化報酬、規劃年數、停止投入與提領設定。
- **買房規劃**：`/house` 可啟用買房情境，設定買房年度、頭期款、月付與貸款年限。
- **年度明細**：`/details` 逐年列出期初、投入、房貸、增值、頭期、提領與期末資產。
- **本金設定**：`/settings` 可調整初始本金。
- **互動趨勢圖**：使用 Chart.js 呈現資產趨勢，支援 hover 查看數值，並保留 X/Y 量化軸。

## 使用方式

1. 開啟首頁 `/`。
2. 點擊 `Start planning` 進入 `/dashboard`。
3. 到 `/stocks` 設定投資年限、每月投入與預期報酬。
4. 到 `/house` 啟用買房情境，調整頭期款與貸款參數。
5. 回到 `/dashboard` 查看總資產、趨勢圖與股票 / 買房配置。
6. 到 `/details` 檢查逐年現金流與期末資產變化。

## AI Agent 協作方式

這個專案是透過 AI coding agent 逐步完成與驗證的。流程大致如下：

1. **需求釐清**：先確認使用者希望參考 ProjectionLab 的首頁 UI，並讓 `Start planning` 進入既有功能。
2. **視覺方向選擇**：用本地 visual companion 做 A/B/C 首頁入口 mockup，最後選定「首頁 Landing Page + app route」方案。
3. **規格與計畫**：將設計寫入 `docs/specs/`，再把實作步驟寫入 `docs/plans/`，保留可追蹤的工作紀錄。
4. **測試先行**：新增 `npm run test:homepage-entry`，先確認新首頁入口行為在實作前會失敗，再改程式讓測試轉綠。
5. **實作搬移**：把原首頁儀表板搬到 `/dashboard`，重新製作 `/` Landing Page，並更新側邊欄導覽。
6. **品質驗證**：使用 Playwright、contrast audit、runtime HTTP checks 與 Nuxt build 驗證路由、圖表、文字對比、手機版 layout 與 production build。
7. **版本紀錄**：把完成狀態寫入 `docs/progress.md` 和 `docs/feature_list.json`，並用 git commit 保存成果。

## 本機開發

```bash
npm install
npm run dev
npm run build
```

常用驗證：

```bash
npm run test:homepage-entry
npm run test:home-trend
npm run test:tabler-types
npm run audit:contrast
npm run build
```

如果要指定本機測試網址：

```powershell
$env:TARGET_URL='http://127.0.0.1:3100'
npm run test:homepage-entry
```

## 技術架構

- Nuxt 4 / Vue 3
- Tailwind CSS v4
- Chart.js
- Tabler Icons
- Playwright
- Vercel

## 專案結構

- `app/pages/index.vue`：首頁 Landing Page。
- `app/pages/dashboard.vue`：財務成果總覽。
- `app/pages/stocks.vue`：股票與投資設定。
- `app/pages/house.vue`：買房規劃。
- `app/pages/details.vue`：年度收支明細。
- `app/pages/settings.vue`：本金設定。
- `app/composables/useFinancialPlan.ts`：共用財務規劃狀態與計算邏輯。
- `app/components/AssetTrendChart.client.vue`：資產趨勢圖。
- `scripts/`：Playwright 與型別 / 對比驗證腳本。
- `docs/`：規格、計畫、功能狀態與進度紀錄。
