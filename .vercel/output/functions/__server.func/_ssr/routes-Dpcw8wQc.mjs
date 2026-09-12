import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { R as require_jsx_runtime, _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as cn, t as Button } from "./button-BHVBa4JV.mjs";
import { r as Search } from "../_libs/lucide-react.mjs";
import { r as Route$1 } from "./router-CtSVshhF.mjs";
import { a as POSITIONS, c as clubLine, d as groupedByEra, f as hallStats, i as PLAYERS, l as filterPlayers, n as ERAS, o as POS_LABEL, r as ERA_LABEL, s as Portrait, t as DATA_AS_OF } from "./hall-Bw1DG_-s.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dpcw8wQc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CabinetCard({ player, index }) {
	const rings = player.nba.championships.length;
	const mvps = player.nba.mvp.length;
	const delay = Math.min(index, 12) * 40;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/player/$id",
		params: { id: player.id },
		className: "cabinet-frame group block rounded-xl p-2 focus-visible:outline-none",
		style: {
			["--color-team"]: player.color,
			["--color-team-2"]: player.color2,
			animationDelay: `${delay}ms`
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "vitrine-pane relative overflow-hidden rounded-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, { player }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "frost-plate absolute inset-x-0 bottom-0 px-3 pt-8 pb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[0.65rem] tracking-[0.18em] text-accent",
						children: [
							POS_LABEL[player.pos],
							" · ",
							clubLine(player)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1.5 flex items-end gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-2xl leading-none text-fg tabular-nums",
							children: player.jersey
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "truncate font-display text-base leading-tight font-medium text-fg",
								children: player.nameZh
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs tracking-wide text-muted",
								children: player.name
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2.5 flex items-center gap-1.5",
						"aria-hidden": "true",
						children: [
							rings > 0 && Array.from({ length: Math.min(rings, 11) }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "honor-pip" }, i)),
							rings === 0 && mvps > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[0.65rem] tracking-[0.16em] text-muted uppercase",
								children: ["MVP ×", mvps]
							}),
							rings === 0 && mvps === 0 && player.nba.hof && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[0.65rem] tracking-[0.16em] text-muted uppercase",
								children: ["名人堂 ", player.nba.hof]
							}),
							rings === 0 && mvps === 0 && !player.nba.hof && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[0.65rem] tracking-[0.16em] text-muted uppercase",
								children: ["全明星 ×", player.nba.allStar]
							})
						]
					})
				]
			})]
		})
	});
}
function Input({ className, type = "text", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("glass flex h-11 w-full rounded-md px-3 text-base text-fg", "placeholder:text-faint", "transition-[box-shadow] duration-150 ease-out", "focus-visible:outline-none focus-visible:shadow-[var(--shadow-border-hover)]", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
function Home() {
	const search = Route$1.useSearch();
	const q = search.q ?? "";
	const era = search.era ?? "all";
	const pos = search.pos ?? "all";
	const navigate = Route$1.useNavigate();
	const stats = (0, import_react.useMemo)(() => hallStats(PLAYERS), []);
	const filtered = (0, import_react.useMemo)(() => filterPlayers(PLAYERS, {
		q,
		era,
		pos
	}), [
		q,
		era,
		pos
	]);
	const rooms = (0, import_react.useMemo)(() => groupedByEra(filtered), [filtered]);
	const grouped = era === "all" && !q && pos === "all";
	function patch(next) {
		navigate({ search: (prev) => ({
			...prev,
			...next
		}) });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "relative overflow-hidden border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-6xl px-4 pt-10 pb-8 sm:px-6 sm:pt-14 sm:pb-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "stagger-in text-xs tracking-[0.28em] text-muted uppercase",
							children: "NBA 75th Anniversary Team"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "stagger-in mt-3 font-display text-4xl leading-[1.1] font-medium tracking-tight sm:text-6xl",
							children: "榮耀殿堂"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "stagger-in mt-4 max-w-xl text-base leading-relaxed text-muted",
							children: [
								"七十六座獨立展櫃。從高中、大學、職業聯賽到國際賽事，以及每一段轉會軌跡。資料更新至 ",
								DATA_AS_OF,
								"。"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "glass stagger-in mt-6 max-w-2xl rounded-lg px-4 py-3 text-sm leading-relaxed text-fg/90",
							children: "2026 總冠軍：紐約尼克 4–1 擊敗聖安東尼奧馬刺，總決賽 MVP Jalen Brunson。"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "stagger-in mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "傳奇展櫃",
									value: String(stats.count)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "總冠軍戒指",
									value: String(stats.rings)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "年度 MVP",
									value: String(stats.mvps)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "籃球名人堂",
									value: String(stats.hof)
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass-nav sticky top-0 z-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "relative block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: q,
								onChange: (e) => patch({ q: e.target.value }),
								placeholder: "搜尋中英文名、綽號、球隊…",
								className: "pl-10",
								"aria-label": "搜尋巨星"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: era === "all",
								onClick: () => patch({ era: "all" }),
								children: "全部年代"
							}), ERAS.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: era === e,
								onClick: () => patch({ era: e }),
								children: ERA_LABEL[e]
							}, e))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: pos === "all",
								onClick: () => patch({ pos: "all" }),
								children: "全部位置"
							}), POSITIONS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
								active: pos === p,
								onClick: () => patch({ pos: p }),
								children: [
									p,
									" ",
									POS_LABEL[p]
								]
							}, p))]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-6 text-sm text-muted",
						children: filtered.length === PLAYERS.length ? "76 座展櫃全開" : `找到 ${filtered.length} 座展櫃`
					}),
					filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-xl px-6 py-16 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl",
								children: "這條走廊暫時空著"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: "換個關鍵字，或清掉篩選再走一圈。"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-6",
								variant: "secondary",
								onClick: () => patch({
									q: "",
									era: "all",
									pos: "all"
								}),
								children: "重設篩選"
							})
						]
					}),
					grouped ? rooms.map((room) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mb-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "mb-5 flex items-end justify-between gap-4 border-b border-border pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-medium",
								children: room.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted tabular-nums",
								children: [room.players.length, " 座"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
							children: room.players.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CabinetCard, {
								player: p,
								index: i
							}, p.id))
						})]
					}, room.era)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
						children: filtered.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CabinetCard, {
							player: p,
							index: i
						}, p.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-border px-4 py-8 text-center text-xs leading-relaxed text-faint",
				children: [
					"2021 年 NBA 75 週年紀念隊因票數平手選出 76 人。榮譽與轉會紀錄更新至 ",
					DATA_AS_OF,
					"。 肖像取自維基百科公開檔案，僅供展示。"
				]
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-lg px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[0.7rem] tracking-[0.18em] text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-display text-2xl leading-none tabular-nums",
			children: value
		})]
	});
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-11 shrink-0 rounded-full px-4 text-sm transition-[background-color,color,box-shadow] duration-150", active ? "bg-accent text-accent-fg" : "glass text-muted hover:text-fg"),
		children
	});
}
//#endregion
export { Home as component };
