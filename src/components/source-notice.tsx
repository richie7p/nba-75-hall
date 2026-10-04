import { CHECKED_AT, MEMBERSHIP_SOURCE, PLAYER_SOURCES } from "@/data/provenance";

export function SourceNotice({ playerId }: { playerId?: string }) {
  const sources = playerId ? PLAYER_SOURCES[playerId] ?? [] : [];
  return <aside className="mt-4 rounded-lg border border-border p-3 text-xs leading-relaxed text-muted" aria-label="來源與核對範圍">
    <p>資料核對：{CHECKED_AT}。<a className="underline" href={MEMBERSHIP_SOURCE}>官方 75 週年名單</a>僅支持入選資格。</p>
    <p>生涯數字、高中／大學榮譽與未列來源的敘述仍待逐欄查核；彙總只反映本資料庫，並非即時官方統計。</p>
    {sources.length > 0 && <ul className="mt-2 space-y-1">{sources.map(s => <li key={s.url}><a className="underline" href={s.url}>{s.scope}</a>（來源日期：{s.published}）</li>)}</ul>}
    <p className="mt-2">肖像授權未確認，暫以字母與號碼展出。非 NBA 官方網站。</p>
  </aside>;
}
