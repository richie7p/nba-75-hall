import { L as notFound, R as require_jsx_runtime, _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-BHVBa4JV.mjs";
import { a as GraduationCap, c as ArrowLeft, i as School, o as Globe, s as ArrowRight, t as Trophy } from "../_libs/lucide-react.mjs";
import { n as Route } from "./router-CtSVshhF.mjs";
import { g as peakIsCurrent, h as neighborIds, i as PLAYERS, m as lastStint, o as POS_LABEL, p as hofLine, r as ERA_LABEL, s as Portrait, u as getPlayer } from "./hall-Bw1DG_-s.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/player._id-D4q-HvjC.js
var import_jsx_runtime = require_jsx_runtime();
function PlayerExhibit() {
	const { id } = Route.useParams();
	const player = getPlayer(id);
	if (!player) throw notFound();
	const { prev, next } = neighborIds(PLAYERS, player.id);
	const nba = player.nba;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-bg text-fg",
		style: {
			["--color-team"]: player.color,
			["--color-team-2"]: player.color2
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass-nav sticky top-0 z-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {}), "回到殿堂"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [prev && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							asChild: true,
							"aria-label": "上一座展櫃",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/player/$id",
								params: { id: prev },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {})
							})
						}), next && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							asChild: true,
							"aria-label": "下一座展櫃",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/player/$id",
								params: { id: next },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})
							})
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative overflow-hidden border-b border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
						player,
						eager: true,
						className: "h-full min-h-80"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-veil absolute inset-0" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[18rem_1fr] lg:items-end lg:py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "cabinet-frame hidden overflow-hidden rounded-xl p-2 lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "vitrine-pane overflow-hidden rounded-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
								player,
								eager: true
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-strong rounded-xl px-5 py-6 sm:px-7 sm:py-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs tracking-[0.18em] text-muted",
								children: [
									POS_LABEL[player.pos],
									" · ",
									ERA_LABEL[player.era],
									player.active ? ` · 現役 ${lastStint(player).teamZh}` : ` · 代表隊 ${player.peakTeam}`
								]
							}),
							player.active && !peakIsCurrent(player) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs tracking-wide text-faint",
								children: [
									"代表隊 ",
									player.peakTeam,
									"（球衣與配色依巔峰時期）"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 font-display text-4xl leading-tight font-medium sm:text-5xl",
								children: player.nameZh
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-lg text-muted",
								children: player.name
							}),
							player.aka.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-faint",
								children: player.aka.join(" · ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-2xl text-base leading-relaxed text-fg/90",
								children: player.intro
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-6 grid grid-cols-3 gap-3 sm:max-w-md",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
										label: "得分",
										value: player.sig.pts
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
										label: "籃板",
										value: player.sig.reb
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
										label: "助攻",
										value: player.sig.ast
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-sm text-muted",
								children: [
									player.from,
									" · ",
									player.ht,
									" · ",
									player.born.slice(0, 4),
									" 年生 · ",
									nba.years
								]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl space-y-10 px-4 py-10 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HonorChip, {
								label: "總冠軍",
								value: nba.championships.length ? String(nba.championships.length) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HonorChip, {
								label: "總決賽 MVP",
								value: nba.finalsMvp.length ? String(nba.finalsMvp.length) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HonorChip, {
								label: "年度 MVP",
								value: nba.mvp.length ? String(nba.mvp.length) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HonorChip, {
								label: "全明星",
								value: String(nba.allStar)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Room, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(School, { className: "size-4" }),
						title: "高中",
						subtitle: player.hs.school,
						items: player.hs.honors
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Room, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-4" }),
						title: "大學",
						subtitle: player.uni ? `${player.uni.school}${player.uni.years ? ` · ${player.uni.years}` : ""}` : "未走 NCAA",
						items: player.uni?.honors ?? ["高中或海外直接進入職業"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4" }),
						title: "職業聯賽",
						subtitle: nba.years
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-xl p-5 sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HonorList, {
								label: "總冠軍",
								values: nba.championships
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HonorList, {
								label: "總決賽 MVP",
								values: nba.finalsMvp
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HonorList, {
								label: "年度 MVP",
								values: nba.mvp
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HonorList, {
								label: "最佳防守球員",
								values: nba.dpoy
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HonorList, {
								label: "年度新人",
								values: nba.roy ? [nba.roy] : []
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HonorList, {
								label: "得分王",
								values: nba.scoring
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "全明星",
								value: `${nba.allStar} 次`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "最佳陣容",
								value: nba.allNba
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "最佳防守陣容",
								value: nba.allDef
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HonorList, {
								label: "退役背號",
								values: nba.retired
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "名人堂",
								value: hofLine(player)
							}),
							nba.extras.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-1.5 border-t border-border pt-4 text-sm text-muted",
								children: nba.extras.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: x }, x))
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Room, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4" }),
						title: "國際賽事",
						subtitle: "奧運 / 世界盃 / 國家隊",
						items: player.intl
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
							title: "轉會與生涯路徑",
							subtitle: `${player.path.length} 站`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "relative space-y-0",
							children: player.path.map((stint, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "grid grid-cols-[1rem_1fr] gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-3 rounded-full bg-accent" }), i < player.path.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-px flex-1 bg-border" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pb-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-lg leading-tight",
											children: stint.teamZh
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-muted",
											children: [
												stint.team,
												" · ",
												stint.years
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-faint",
											children: stint.how
										})
									]
								})]
							}, `${stint.team}-${stint.years}`))
						}),
						player.trades.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass mt-2 rounded-xl p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs tracking-[0.2em] text-muted uppercase",
								children: "交易紀錄"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-4",
								children: player.trades.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "grid gap-1 sm:grid-cols-[7.5rem_1fr]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
										className: "text-sm tabular-nums text-accent",
										children: t.date
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm leading-relaxed text-fg/90",
										children: t.deal
									})]
								}, t.date))
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "生涯未被交易，路徑以選秀與自由球員為主。"
						})
					] })
				]
			})
		]
	});
}
function Mini({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-md px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[0.65rem] tracking-[0.16em] text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-display text-xl tabular-nums",
			children: value
		})]
	});
}
function HonorChip({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-lg px-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[0.7rem] tracking-[0.18em] text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-3xl leading-none tabular-nums",
			children: value
		})]
	});
}
function Header({ icon, title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-4 flex items-end justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "flex items-center gap-2 font-display text-2xl font-medium",
			children: [icon, title]
		}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: subtitle
		})]
	});
}
function Room({ icon, title, subtitle, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
		icon,
		title,
		subtitle
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "glass rounded-xl px-5 py-4",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "border-b border-border py-2.5 text-sm last:border-b-0",
			children: item
		}, item))
	})] });
}
function HonorList({ label, values }) {
	if (!values.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
		label,
		value: values.join(" · ")
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1 border-b border-border py-3 last:border-b-0 sm:grid-cols-[8rem_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm leading-relaxed",
			children: value
		})]
	});
}
//#endregion
export { PlayerExhibit as component };
