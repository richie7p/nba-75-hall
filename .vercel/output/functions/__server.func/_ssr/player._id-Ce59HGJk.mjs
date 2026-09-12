import { R as require_jsx_runtime, _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-BHVBa4JV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/player._id-Ce59HGJk.js
var import_jsx_runtime = require_jsx_runtime();
function PlayerMissing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-dvh flex-col items-center justify-center bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.24em] text-muted uppercase",
				children: "Exhibit 404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-3xl",
				children: "這座展櫃尚未開燈"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-sm text-sm text-muted",
				children: "名單裡找不到這位巨星。回到殿堂再走一圈。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "回到殿堂"
				})
			})
		]
	});
}
//#endregion
export { PlayerMissing as notFoundComponent };
