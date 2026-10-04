# NBA 75 榮耀殿堂
https://island-hazel-orbit-granite.grok.me/
**繁體中文** fan museum for the [NBA 75th Anniversary Team](https://www.nba.com/75/).

七十六座獨立展櫃。從高中、大學、職業聯賽到國際賽事，以及每一段轉會軌跡。**2026 年 8 月編輯快照，部分交易於 2026-10-04 依官方來源更正；其餘數據尚待逐欄核對。**

> 非官方粉絲專案。公開可見不等同可重用授權；無授權證據的 76 張照片已停止提供。NBA 商標等權利仍需 owner 核對。

PDF 逐項修正與限制：[AUDIT-FOLLOWUP](docs/AUDIT-FOLLOWUP.md)。此分支尚未部署，上方線上站可能仍是舊版。

## 特色

- **76 座展櫃**：NBA 75 大巨星一人一櫃，以名字縮寫、球衣號碼、代表配色呈現
- **榮譽年表**：高中 → 大學 → NBA（總冠軍、FMVP、MVP、防守、全明星、年度隊、得分王、退役球衣、名人堂）→ 國際賽
- **轉會軌跡**：效力路徑與交易說明
- **末筆球隊／代表隊**：標示資料快照的最後一站或生涯代表隊，非即時名單
- **搜尋與篩選**：姓名、綽號、球隊；依年代與位置分廳
- **毛玻璃博物館 UI**：展櫃玻璃、frosted plate、字體展櫃

## 技術棧

| 層 | 選用 |
| --- | --- |
| UI | React 19、TanStack Router / Start、Tailwind CSS v4 |
| 元件 | Radix UI、lucide-react |
| 資料 | 靜態 TypeScript（無需帳號、無需資料庫） |
| 建置 | Vite 8、Node 22 |

## 快速開始

需要 [Node.js 22](https://nodejs.org/) 與 npm。

```bash
git clone https://github.com/richie7p/nba-75-hall.git
cd nba-75-hall
npm ci
npm run dev
```

瀏覽器開啟提示的本機網址（預設埠 `8080`）。

```bash
npm run typecheck   # TypeScript
npm run build       # 正式建置
```

## 專案結構

```text
src/
  data/
    types.ts          球員、榮譽、轉會型別
    players-a.ts      巨星資料（A–J）
    players-b.ts      巨星資料（K–Z）
    photos.ts         暫停提供照片的空映射
    provenance.ts     官方來源、日期與窄範圍核對說明
    index.ts          PLAYERS、DATA_AS_OF
  components/
    cabinet.tsx       殿堂展櫃卡
    portrait.tsx      肖像（球衣 fallback）
    jersey.tsx        球衣號
  routes/
    index.tsx         殿堂大廳、搜尋、年代廳
    player.$id.tsx    單人展櫃
  lib/hall.ts         篩選、統計、現役／名人堂文案
docs/portrait-audit.json  已移除照片的來源缺口與雜湊清單
```

每位巨星的資料形狀見 [`src/data/types.ts`](src/data/types.ts)。新增或勘誤請改 `players-a.ts` / `players-b.ts`，並同步 `DATA_AS_OF`。

## 資料說明

- 榮譽次數為本目錄的生涯匯總，未逐欄驗證，也不是即時官方統計。
- 官方來源只核對頁面列明的特定主張；入選名單來源不代表生涯敘述與數字都已驗證。
- 照片原始檔頁、作者與授權未保留；恢復提供之前需逐圖取得可追溯證據。

## License

MIT。內容與商標仍歸原權利人。
