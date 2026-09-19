import { createContext as e, createElement as t, forwardRef as n, useContext as r, useEffect as i, useMemo as a, useState as o } from "@webconsulting/shadcn-ui/react.js";
import { cn as s, defineShadcnApp as c, ui as l } from "@webconsulting/shadcn-ui/runtime.js";
import { jsx as u, jsxs as d } from "@webconsulting/shadcn-ui/jsx-runtime.js";
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
var f = (e) => e?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs
function p(e, t, n = []) {
	if (t == null) throw Error("[lucide]: iconNode is required when icon name is used");
	return {
		name: f(e),
		size: 24,
		node: t,
		...n.length > 0 ? { aliases: n } : {}
	};
}
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
var m = (e) => {
	let t = "", n = !1;
	for (let r of e) {
		if (r === "-" || r === "_" || r <= " ") {
			n = t.length > 0;
			continue;
		}
		t.length === 0 ? t += r.toLowerCase() : t += n ? r.toUpperCase() : r, n = !1;
	}
	return t;
}, ee = (e) => {
	let t = m(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, h = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), g = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
};
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs
function _(e) {
	return e != null;
}
function te(e, t = {}) {
	let n = t.attributeNames ?? {}, r = (e) => n[e] ?? e, i = e.size ?? e.width ?? g.width, a = e.size ?? e.height ?? g.height, o = e.aliases?.filter((e) => typeof e == "string" && e.trim() !== "").map((e) => `lucide-${e}`) ?? [], s = [...e.name ? [`lucide-${e.name}`] : [], ...o], c = t.className?.split(" ").filter(Boolean) ?? [], l = t.includeDefaultClasses === !1 ? h(...c) : h("lucide", ...s, ...c), u = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? g["stroke-width"]) * Number(e.size ?? e.width ?? g.width) / Number(t.size ?? t.width ?? g.width) : t.strokeWidth ?? g["stroke-width"];
	return [
		"svg",
		{
			...Object.entries(g).reduce((e, [t, n]) => (e[r(t)] = n, e), {}),
			..."color" in t && t.color && { [r("stroke")]: t.color },
			..."size" in t && _(t.size) && {
				[r("width")]: t.size,
				[r("height")]: t.size
			},
			..."width" in t && _(t.width) && { [r("width")]: t.width },
			..."height" in t && _(t.height) && { [r("height")]: t.height },
			[r("stroke-width")]: u,
			...l && { [r("class")]: l },
			[r("viewBox")]: `0 0 ${i} ${a}`,
			...t.hasA11yProp === !1 ? { [r("aria-hidden")]: "true" } : {},
			..."attributes" in t && t.attributes
		},
		e.node.map((e) => {
			let [n, i, a] = e, o = t.nonScalingStroke ? {
				[r("vector-effect")]: "non-scaling-stroke",
				...i
			} : i;
			return a ? [
				n,
				o,
				a
			] : [n, o];
		})
	];
}
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs
function ne(e, t = {}) {
	return te(e, {
		...t,
		attributeNames: {
			...t.attributeNames,
			class: "className",
			"stroke-width": "strokeWidth",
			"stroke-linecap": "strokeLinecap",
			"stroke-linejoin": "strokeLinejoin",
			"vector-effect": "vectorEffect"
		}
	});
}
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
var re = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, ie = e({}), ae = () => r(ie), oe = n(({ color: e, size: n, width: r, height: i, strokeWidth: a, absoluteStrokeWidth: o, nonScalingStroke: s, className: c = "", children: l, iconNode: u = [], icon: d = {
	node: u,
	aliases: [],
	size: 24
}, ...f }, p) => {
	let { size: m = 24, strokeWidth: ee = 2, absoluteStrokeWidth: g = !1, nonScalingStroke: _ = !1, color: te = "currentColor", className: ie = "" } = ae() ?? {}, oe = !!l || re(f), [v, y, se = []] = ne(d, {
		color: e ?? te,
		width: r ?? n ?? m,
		height: i ?? n ?? m,
		strokeWidth: a ?? ee,
		absoluteStrokeWidth: o ?? g,
		nonScalingStroke: s ?? _,
		className: h(ie, c),
		hasA11yProp: oe,
		attributes: f
	});
	return t(v, {
		ref: p,
		...y
	}, [...se.map(([e, n]) => t(e, n)), ...Array.isArray(l) ? l : [l]]);
});
//#endregion
//#region node_modules/lucide-react/dist/esm/createLucideIcon.mjs
function v(e, r = [], i = []) {
	let a = typeof e == "string" ? p(e, r, i) : e, o = n(({ className: e, ...n }, r) => t(oe, {
		ref: r,
		icon: a,
		className: e,
		...n
	}));
	return a.name && (o.displayName = ee(a.name)), o;
}
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/calendar.mjs
var y = {
	name: "calendar",
	size: 24,
	node: [
		["path", {
			d: "M8 2v3",
			key: "1ioesn"
		}],
		["path", {
			d: "M16 2v3",
			key: "otl347"
		}],
		["rect", {
			x: "3",
			y: "3",
			width: "18",
			height: "18",
			rx: "2",
			key: "h1oib"
		}],
		["path", {
			d: "M3 9h18",
			key: "1pudct"
		}]
	]
};
y.node;
var se = v(y), ce = {
	name: "chevron-right",
	size: 24,
	node: [["path", {
		d: "m9 18 6-6-6-6",
		key: "mthhwq"
	}]]
};
ce.node;
var le = v(ce), ue = {
	name: "copy",
	size: 24,
	node: [["rect", {
		width: "14",
		height: "14",
		x: "8",
		y: "8",
		rx: "2",
		ry: "2",
		key: "17jyea"
	}], ["path", {
		d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
		key: "zix9uf"
	}]]
};
ue.node;
var de = v(ue), fe = {
	name: "ellipsis",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "1",
			key: "41hilf"
		}],
		["circle", {
			cx: "19",
			cy: "12",
			r: "1",
			key: "1wjl8i"
		}],
		["circle", {
			cx: "5",
			cy: "12",
			r: "1",
			key: "1pcz8c"
		}]
	],
	aliases: ["more-horizontal"]
};
fe.node;
var pe = v(fe), me = {
	name: "external-link",
	size: 24,
	node: [
		["path", {
			d: "M15 3h6v6",
			key: "1q9fwt"
		}],
		["path", {
			d: "M10 14 21 3",
			key: "gplh6r"
		}],
		["path", {
			d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
			key: "a6xqqp"
		}]
	]
};
me.node;
var he = v(me), ge = {
	name: "eye-off",
	size: 24,
	node: [
		["path", {
			d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
			key: "ct8e1f"
		}],
		["path", {
			d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
			key: "151rxh"
		}],
		["path", {
			d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
			key: "13bj9a"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}]
	]
};
ge.node;
var _e = v(ge), ve = {
	name: "file-text",
	size: 24,
	node: [
		["path", {
			d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
			key: "1oefj6"
		}],
		["path", {
			d: "M14 2v5a1 1 0 0 0 1 1h5",
			key: "wfsgrz"
		}],
		["path", {
			d: "M10 9H8",
			key: "b1mrlr"
		}],
		["path", {
			d: "M16 13H8",
			key: "t4e002"
		}],
		["path", {
			d: "M16 17H8",
			key: "z1uh3a"
		}]
	]
};
ve.node;
var ye = v(ve), be = {
	name: "file",
	size: 24,
	node: [["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}], ["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}]]
};
be.node;
var xe = v(be), Se = {
	name: "folder",
	size: 24,
	node: [["path", {
		d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
		key: "1kt360"
	}]]
};
Se.node;
var Ce = v(Se), we = {
	name: "info",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M12 16v-4",
			key: "1dtifu"
		}],
		["path", {
			d: "M12 8h.01",
			key: "e9boi3"
		}]
	]
};
we.node;
var Te = v(we), Ee = {
	name: "layout-grid",
	size: 24,
	node: [
		["rect", {
			width: "7",
			height: "7",
			x: "3",
			y: "3",
			rx: "1",
			key: "1g98yp"
		}],
		["rect", {
			width: "7",
			height: "7",
			x: "14",
			y: "3",
			rx: "1",
			key: "6d4xhi"
		}],
		["rect", {
			width: "7",
			height: "7",
			x: "14",
			y: "14",
			rx: "1",
			key: "nxv5o0"
		}],
		["rect", {
			width: "7",
			height: "7",
			x: "3",
			y: "14",
			rx: "1",
			key: "1bb6yr"
		}]
	]
};
Ee.node;
var De = v(Ee), Oe = {
	name: "pencil",
	size: 24,
	node: [["path", {
		d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
		key: "1a8usu"
	}], ["path", {
		d: "m15 5 4 4",
		key: "1mk7zo"
	}]]
};
Oe.node;
var b = v(Oe), ke = {
	name: "plus",
	size: 24,
	node: [["path", {
		d: "M5 12h14",
		key: "1ays0h"
	}], ["path", {
		d: "M12 5v14",
		key: "s699le"
	}]]
};
ke.node;
var Ae = v(ke), je = {
	name: "refresh-cw",
	size: 24,
	node: [
		["path", {
			d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
			key: "v9h5vc"
		}],
		["path", {
			d: "M21 3v5h-5",
			key: "1q7to0"
		}],
		["path", {
			d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
			key: "3uifl3"
		}],
		["path", {
			d: "M8 16H3v5",
			key: "1cv678"
		}]
	]
};
je.node;
var Me = v(je), x = {
	name: "search",
	size: 24,
	node: [["path", {
		d: "m21 21-4.34-4.34",
		key: "14j7rj"
	}], ["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}]]
};
x.node;
var S = v(x), C = {
	name: "settings",
	size: 24,
	node: [["path", {
		d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
		key: "1i5ecw"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "3",
		key: "1v7zrd"
	}]]
};
C.node;
var Ne = v(C), w = {
	name: "trash",
	size: 24,
	node: [
		["path", {
			d: "M10 11v6",
			key: "nco0om"
		}],
		["path", {
			d: "M14 11v6",
			key: "outv1u"
		}],
		["path", {
			d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
			key: "miytrc"
		}],
		["path", {
			d: "M3 6h18",
			key: "d0wm0j"
		}],
		["path", {
			d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
			key: "e791ji"
		}]
	],
	aliases: ["trash-2"]
};
w.node;
var Pe = v(w), Fe = {
	name: "triangle-alert",
	size: 24,
	node: [
		["path", {
			d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
			key: "wmoenq"
		}],
		["path", {
			d: "M12 9v4",
			key: "juzpu7"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}]
	],
	aliases: ["alert-triangle"]
};
Fe.node;
var Ie = v(Fe), Le = {
	name: "x",
	size: 24,
	node: [["path", {
		d: "M18 6 6 18",
		key: "1bl5f8"
	}], ["path", {
		d: "m6 6 12 12",
		key: "d8bk6v"
	}]]
};
Le.node;
var Re = v(Le), ze = {
	name: "zap",
	size: 24,
	node: [["path", {
		d: "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",
		key: "1v7up4"
	}]]
};
ze.node;
var Be = v(ze), { Badge: Ve } = l;
function T({ group: e, children: t }) {
	return /* @__PURE__ */ d("section", {
		"aria-labelledby": `${e.id}-title`,
		className: "scroll-mt-4 space-y-4",
		id: e.id,
		children: [/* @__PURE__ */ d("header", {
			className: "space-y-1.5",
			children: [
				/* @__PURE__ */ u("h2", {
					className: "text-base font-semibold",
					id: `${e.id}-title`,
					children: e.title
				}),
				/* @__PURE__ */ u("p", {
					className: "max-w-prose text-muted-foreground",
					children: e.description
				}),
				/* @__PURE__ */ u("p", {
					className: "flex flex-wrap gap-1",
					children: e.components.map((e) => /* @__PURE__ */ u(Ve, {
						className: "font-mono font-normal",
						variant: "outline",
						children: e
					}, e))
				})
			]
		}), /* @__PURE__ */ u("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: t
		})]
	});
}
function E({ title: e, className: t, wide: n = !1, children: r }) {
	return /* @__PURE__ */ d("figure", {
		className: s("min-w-0 rounded-lg border bg-card", n && "md:col-span-2"),
		children: [/* @__PURE__ */ u("figcaption", {
			className: "border-b px-3 py-1.5 text-muted-foreground",
			children: e
		}), /* @__PURE__ */ u("div", {
			className: s("p-4", t),
			children: r
		})]
	});
}
//#endregion
//#region Build/Frontend/demo/sections/actions.tsx
var { Badge: D, Button: O, DropdownMenu: He, DropdownMenuContent: Ue, DropdownMenuItem: k, DropdownMenuLabel: We, DropdownMenuSeparator: Ge, DropdownMenuShortcut: Ke, DropdownMenuTrigger: qe, Kbd: A, KbdGroup: Je, Spinner: Ye, Tooltip: Xe, TooltipContent: Ze, TooltipTrigger: Qe, toast: $e } = l;
function et({ group: e }) {
	let [t, n] = o(!1);
	return /* @__PURE__ */ d(T, {
		group: e,
		children: [
			/* @__PURE__ */ d(E, {
				title: "Variants and sizes",
				children: [/* @__PURE__ */ d("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ u(O, { children: "Save" }),
						/* @__PURE__ */ u(O, {
							variant: "secondary",
							children: "Save and close"
						}),
						/* @__PURE__ */ u(O, {
							variant: "outline",
							children: "Preview"
						}),
						/* @__PURE__ */ u(O, {
							variant: "ghost",
							children: "Cancel"
						}),
						/* @__PURE__ */ u(O, {
							variant: "link",
							children: "View page"
						}),
						/* @__PURE__ */ u(O, {
							variant: "destructive",
							children: "Delete page"
						})
					]
				}), /* @__PURE__ */ d("div", {
					className: "mt-3 flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ u(O, {
							size: "xs",
							children: "Extra small"
						}),
						/* @__PURE__ */ u(O, {
							size: "sm",
							children: "Small"
						}),
						/* @__PURE__ */ u(O, {
							size: "default",
							children: "Default"
						}),
						/* @__PURE__ */ u(O, {
							size: "lg",
							children: "Large"
						}),
						/* @__PURE__ */ u(O, {
							"aria-label": "Edit",
							size: "icon",
							children: /* @__PURE__ */ u(b, {})
						}),
						/* @__PURE__ */ u(O, {
							"aria-label": "More",
							size: "icon-sm",
							variant: "outline",
							children: /* @__PURE__ */ u(pe, {})
						})
					]
				})]
			}),
			/* @__PURE__ */ u(E, {
				title: "Busy and disabled",
				children: /* @__PURE__ */ d("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ d(O, {
							disabled: t,
							onClick: () => {
								n(!0), setTimeout(() => {
									n(!1), $e.success("Caches cleared", { description: "Page and frontend caches for all sites." });
								}, 900);
							},
							variant: "outline",
							children: [u(t ? Ye : Me, {}), t ? "Clearing…" : "Clear all caches"]
						}),
						/* @__PURE__ */ d(O, {
							disabled: !0,
							children: [/* @__PURE__ */ u(Be, {}), "Publish workspace"]
						}),
						/* @__PURE__ */ d(Xe, { children: [/* @__PURE__ */ u(Qe, {
							asChild: !0,
							children: /* @__PURE__ */ u(O, {
								variant: "ghost",
								children: "Why disabled?"
							})
						}), /* @__PURE__ */ u(Ze, { children: "Publishing needs the reviewer stage to be complete." })] })
					]
				})
			}),
			/* @__PURE__ */ u(E, {
				title: "Badges for states",
				children: /* @__PURE__ */ d("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ u(D, { children: "Live" }),
						/* @__PURE__ */ u(D, {
							variant: "secondary",
							children: "Draft"
						}),
						/* @__PURE__ */ u(D, {
							variant: "outline",
							children: "Workspace: Autumn"
						}),
						/* @__PURE__ */ u(D, {
							variant: "destructive",
							children: "Hidden"
						}),
						/* @__PURE__ */ u(D, {
							className: "border-warning/50 bg-warning/10 text-warning-foreground",
							variant: "outline",
							children: "Needs review"
						}),
						/* @__PURE__ */ u(D, {
							className: "border-success/50 bg-success/10",
							variant: "outline",
							children: "Published"
						})
					]
				})
			}),
			/* @__PURE__ */ u(E, {
				title: "Keyboard hints",
				children: /* @__PURE__ */ d("div", {
					className: "flex flex-wrap items-center gap-4",
					children: [
						/* @__PURE__ */ d("span", {
							className: "flex items-center gap-2",
							children: ["Command palette", /* @__PURE__ */ d(Je, { children: [/* @__PURE__ */ u(A, { children: "⌘" }), /* @__PURE__ */ u(A, { children: "K" })] })]
						}),
						/* @__PURE__ */ d("span", {
							className: "flex items-center gap-2",
							children: ["Send message ", /* @__PURE__ */ u(A, { children: "Enter" })]
						}),
						/* @__PURE__ */ d("span", {
							className: "flex items-center gap-2",
							children: ["New line", /* @__PURE__ */ d(Je, { children: [/* @__PURE__ */ u(A, { children: "Shift" }), /* @__PURE__ */ u(A, { children: "Enter" })] })]
						})
					]
				})
			}),
			/* @__PURE__ */ u(E, {
				title: "Record actions menu",
				wide: !0,
				children: /* @__PURE__ */ d("div", {
					className: "flex items-center justify-between rounded-md border px-3 py-2",
					children: [/* @__PURE__ */ d("span", { children: [
						/* @__PURE__ */ u("span", {
							className: "font-medium",
							children: "About us"
						}),
						" ",
						/* @__PURE__ */ u("span", {
							className: "font-mono text-muted-foreground",
							children: "#12"
						})
					] }), /* @__PURE__ */ d(He, { children: [/* @__PURE__ */ u(qe, {
						asChild: !0,
						children: /* @__PURE__ */ u(O, {
							"aria-label": "Actions for About us",
							size: "icon-sm",
							variant: "ghost",
							children: /* @__PURE__ */ u(pe, {})
						})
					}), /* @__PURE__ */ d(Ue, {
						align: "end",
						className: "w-56",
						children: [
							/* @__PURE__ */ u(We, { children: "Page 12" }),
							/* @__PURE__ */ d(k, { children: [
								/* @__PURE__ */ u(b, {}),
								"Edit",
								/* @__PURE__ */ u(Ke, { children: "E" })
							] }),
							/* @__PURE__ */ d(k, { children: [/* @__PURE__ */ u(he, {}), "View in frontend"] }),
							/* @__PURE__ */ d(k, { children: [/* @__PURE__ */ u(de, {}), "Copy"] }),
							/* @__PURE__ */ d(k, { children: [/* @__PURE__ */ u(_e, {}), "Hide"] }),
							/* @__PURE__ */ u(Ge, {}),
							/* @__PURE__ */ d(k, {
								variant: "destructive",
								children: [/* @__PURE__ */ u(Pe, {}), "Delete"]
							})
						]
					})] })]
				})
			})
		]
	});
}
//#endregion
//#region Build/Frontend/demo/fixtures.ts
var j = [
	{
		uid: 1,
		title: "Home",
		slug: "/",
		doktype: "Standard",
		hidden: !1,
		updated: "Today, 09:12"
	},
	{
		uid: 12,
		title: "About us",
		slug: "/about",
		doktype: "Standard",
		hidden: !1,
		updated: "Yesterday"
	},
	{
		uid: 14,
		title: "Team",
		slug: "/about/team",
		doktype: "Standard",
		hidden: !0,
		updated: "3 days ago"
	},
	{
		uid: 27,
		title: "News",
		slug: "/news",
		doktype: "Standard",
		hidden: !1,
		updated: "1 week ago"
	},
	{
		uid: 40,
		title: "Imprint",
		slug: "/imprint",
		doktype: "Standard",
		hidden: !1,
		updated: "2 months ago"
	},
	{
		uid: 41,
		title: "Downloads",
		slug: "/downloads",
		doktype: "Folder",
		hidden: !1,
		updated: "4 months ago"
	}
], tt = [
	{
		name: "Anna Berger",
		initials: "AB",
		role: "Editor",
		online: !0
	},
	{
		name: "Jonas Weber",
		initials: "JW",
		role: "Admin",
		online: !1
	},
	{
		name: "Mira Holzer",
		initials: "MH",
		role: "Reviewer",
		online: !0
	}
], nt = [
	{
		value: "0",
		label: "English (default)"
	},
	{
		value: "1",
		label: "Deutsch"
	},
	{
		value: "2",
		label: "Français"
	}
], rt = [
	{
		value: "301",
		label: "301 · Moved permanently"
	},
	{
		value: "302",
		label: "302 · Found"
	},
	{
		value: "307",
		label: "307 · Temporary redirect"
	}
], it = [
	{
		table: "pages",
		uid: 12,
		title: "About us",
		action: "Edited",
		when: "09:12"
	},
	{
		table: "tt_content",
		uid: 388,
		title: "Hero: Autumn campaign",
		action: "Created",
		when: "08:51"
	},
	{
		table: "sys_redirect",
		uid: 19,
		title: "/old-team → /about/team",
		action: "Created",
		when: "Yesterday"
	}
], at = [
	{
		role: "user",
		text: "Which pages still link to /old-team?"
	},
	{
		role: "assistant",
		text: "Two pages link to **/old-team**: *About us* (12) in the intro text and *News* (27) in a teaser. Both links can point to `/about/team` instead. Want me to update them?"
	},
	{
		role: "user",
		text: "Yes, both."
	}
], { Attachment: ot, AttachmentAction: st, AttachmentActions: ct, AttachmentContent: lt, AttachmentDescription: ut, AttachmentGroup: dt, AttachmentMedia: ft, AttachmentTitle: pt, Bubble: mt, BubbleContent: ht, Markdown: gt, Marker: M, MarkerContent: N, MarkerIcon: _t, Message: vt, MessageContent: yt, MessageHeader: bt, Reasoning: xt, ReasoningContent: St, ReasoningTrigger: Ct, Shimmer: wt, Suggestion: Tt, Suggestions: Et, Tool: Dt, ToolContent: Ot, ToolHeader: kt, ToolInput: At, ToolOutput: jt } = l;
function Mt({ group: e }) {
	let [t, n] = o("");
	return /* @__PURE__ */ d(T, {
		group: e,
		children: [
			/* @__PURE__ */ u(E, {
				title: "A transcript",
				wide: !0,
				children: /* @__PURE__ */ d("div", {
					className: "space-y-4",
					children: [at.map((e, t) => /* @__PURE__ */ u(vt, {
						align: e.role === "user" ? "end" : "start",
						children: /* @__PURE__ */ d(yt, { children: [e.role === "user" ? null : /* @__PURE__ */ d(bt, {
							className: "px-0",
							children: [/* @__PURE__ */ u("span", { children: "Assistant" }), /* @__PURE__ */ u("span", {
								className: "ms-2",
								children: "09:14"
							})]
						}), /* @__PURE__ */ u(mt, {
							align: e.role === "user" ? "end" : "start",
							variant: e.role === "user" ? "default" : "ghost",
							children: /* @__PURE__ */ u(ht, { children: e.role === "user" ? /* @__PURE__ */ u("p", {
								className: "whitespace-pre-wrap",
								children: e.text
							}) : /* @__PURE__ */ u(gt, { children: e.text }) })
						})] })
					}, t)), /* @__PURE__ */ d(M, {
						"aria-live": "polite",
						role: "status",
						children: [/* @__PURE__ */ u(_t, { children: /* @__PURE__ */ u(b, {}) }), /* @__PURE__ */ u(N, { children: /* @__PURE__ */ u(wt, { children: "Updating two links…" }) })]
					})]
				})
			}),
			/* @__PURE__ */ u(E, {
				title: "A tool call",
				children: /* @__PURE__ */ d(Dt, {
					defaultOpen: !0,
					children: [/* @__PURE__ */ u(kt, {
						state: "completed",
						title: "Search"
					}), /* @__PURE__ */ d(Ot, { children: [/* @__PURE__ */ u(At, { input: {
						query: "/old-team",
						tables: ["tt_content"]
					} }), /* @__PURE__ */ u(jt, {
						isError: !1,
						output: "2 hits in tt_content (uid 388, uid 412)."
					})] })]
				})
			}),
			/* @__PURE__ */ u(E, {
				title: "Reasoning, collapsed by default",
				children: /* @__PURE__ */ d(xt, { children: [/* @__PURE__ */ u(Ct, { label: "Reasoning · round 2" }), /* @__PURE__ */ u(St, { children: "The link appears in two content elements. Both point at the old slug, so both need the same replacement." })] })
			}),
			/* @__PURE__ */ u(E, {
				title: "Attachments",
				children: /* @__PURE__ */ d(dt, { children: [/* @__PURE__ */ d(ot, { children: [
					/* @__PURE__ */ u(ft, { children: /* @__PURE__ */ u(ye, {}) }),
					/* @__PURE__ */ d(lt, { children: [/* @__PURE__ */ u(pt, { children: "Redirect-plan.pdf" }), /* @__PURE__ */ u(ut, { children: "PDF · 412 KB" })] }),
					/* @__PURE__ */ u(ct, { children: /* @__PURE__ */ u(st, {
						"aria-label": "Remove Redirect-plan.pdf",
						children: /* @__PURE__ */ u(Re, {})
					}) })
				] }), /* @__PURE__ */ d(ot, {
					state: "uploading",
					children: [/* @__PURE__ */ u(ft, { children: /* @__PURE__ */ u(ye, {}) }), /* @__PURE__ */ d(lt, { children: [/* @__PURE__ */ u(pt, { children: "Sitemap.xlsx" }), /* @__PURE__ */ u(ut, { children: "Uploading…" })] })]
				})] })
			}),
			/* @__PURE__ */ d(E, {
				title: "Openers",
				wide: !0,
				children: [/* @__PURE__ */ u(Et, { children: [
					"Show me the page tree below the site root.",
					"Which pages link to /old-team?",
					"What errors were logged today?"
				].map((e) => /* @__PURE__ */ u(Tt, {
					onClick: n,
					suggestion: e
				}, e)) }), /* @__PURE__ */ u("p", {
					className: "mt-3 text-muted-foreground",
					children: t === "" ? "Pick one to see what the composer would receive." : `Composer would receive: ${t}`
				})]
			}),
			/* @__PURE__ */ u(E, {
				title: "Status rows",
				children: /* @__PURE__ */ d("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ u(M, {
							variant: "separator",
							children: /* @__PURE__ */ u(N, { children: "New conversation" })
						}),
						/* @__PURE__ */ d(M, { children: [/* @__PURE__ */ u(_t, { children: /* @__PURE__ */ u(S, {}) }), /* @__PURE__ */ u(N, { children: /* @__PURE__ */ u(wt, { children: "Running Search…" }) })] }),
						/* @__PURE__ */ u(M, {
							variant: "border",
							children: /* @__PURE__ */ u(N, { children: "The turn was cancelled." })
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region Build/Frontend/demo/sections/data.tsx
var { Alert: Nt, AlertDescription: Pt, AlertTitle: Ft, Badge: It, Checkbox: Lt, Progress: Rt, Skeleton: P, Spinner: zt, Table: Bt, TableBody: Vt, TableCaption: Ht, TableCell: F, TableHead: I, TableHeader: Ut, TableRow: Wt } = l;
function Gt({ group: e }) {
	let [t, n] = o(64), [r, a] = o([12]);
	i(() => {
		let e = setInterval(() => n((e) => e >= 100 ? 8 : e + 4), 900);
		return () => clearInterval(e);
	}, []);
	let s = (e) => a((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	return /* @__PURE__ */ d(T, {
		group: e,
		children: [
			/* @__PURE__ */ u(E, {
				className: "p-0",
				title: "Pages",
				wide: !0,
				children: /* @__PURE__ */ d(Bt, { children: [
					/* @__PURE__ */ d(Ht, { children: [
						r.length,
						" of ",
						j.length,
						" pages selected"
					] }),
					/* @__PURE__ */ u(Ut, { children: /* @__PURE__ */ d(Wt, { children: [
						/* @__PURE__ */ u(I, {
							className: "w-8",
							children: /* @__PURE__ */ u("span", {
								className: "sr-only",
								children: "Select"
							})
						}),
						/* @__PURE__ */ u(I, {
							className: "w-14",
							children: "uid"
						}),
						/* @__PURE__ */ u(I, { children: "Title" }),
						/* @__PURE__ */ u(I, { children: "Slug" }),
						/* @__PURE__ */ u(I, { children: "Type" }),
						/* @__PURE__ */ u(I, { children: "Visibility" }),
						/* @__PURE__ */ u(I, {
							className: "text-end",
							children: "Updated"
						})
					] }) }),
					/* @__PURE__ */ u(Vt, { children: j.map((e) => /* @__PURE__ */ d(Wt, {
						"data-state": r.includes(e.uid) ? "selected" : void 0,
						children: [
							/* @__PURE__ */ u(F, { children: /* @__PURE__ */ u(Lt, {
								"aria-label": `Select ${e.title}`,
								checked: r.includes(e.uid),
								onCheckedChange: () => s(e.uid)
							}) }),
							/* @__PURE__ */ u(F, {
								className: "font-mono text-muted-foreground",
								children: e.uid
							}),
							/* @__PURE__ */ u(F, {
								className: "font-medium",
								children: e.title
							}),
							/* @__PURE__ */ u(F, {
								className: "font-mono",
								children: e.slug
							}),
							/* @__PURE__ */ u(F, { children: e.doktype }),
							/* @__PURE__ */ u(F, { children: e.hidden ? /* @__PURE__ */ d(It, {
								className: "gap-1",
								variant: "outline",
								children: [/* @__PURE__ */ u(_e, {}), "Hidden"]
							}) : /* @__PURE__ */ u(It, {
								className: "border-success/50 bg-success/10",
								variant: "outline",
								children: "Visible"
							}) }),
							/* @__PURE__ */ u(F, {
								className: "text-end text-muted-foreground",
								children: e.updated
							})
						]
					}, e.uid)) })
				] })
			}),
			/* @__PURE__ */ d(E, {
				title: "Progress",
				children: [/* @__PURE__ */ d("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ d("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ u("span", {
								className: "font-medium",
								children: "Indexing site “Main”"
							}), /* @__PURE__ */ d("span", {
								className: "font-mono text-muted-foreground",
								children: [t, "%"]
							})]
						}),
						/* @__PURE__ */ u(Rt, {
							"aria-label": "Indexing progress",
							value: t
						}),
						/* @__PURE__ */ d("p", {
							className: "text-muted-foreground",
							children: [Math.round(412 * t / 100), " of 412 pages sent to Solr."]
						})
					]
				}), /* @__PURE__ */ d("div", {
					className: "mt-6 flex items-center gap-2 text-muted-foreground",
					children: [/* @__PURE__ */ u(zt, {}), "Waiting for the scheduler…"]
				})]
			}),
			/* @__PURE__ */ u(E, {
				title: "Skeleton while loading",
				children: /* @__PURE__ */ d("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ d("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ u(P, { className: "size-9 rounded-full" }), /* @__PURE__ */ d("div", {
								className: "flex-1 space-y-1.5",
								children: [/* @__PURE__ */ u(P, { className: "h-3.5 w-1/2" }), /* @__PURE__ */ u(P, { className: "h-3 w-1/3" })]
							})]
						}),
						/* @__PURE__ */ u(P, { className: "h-24 w-full" }),
						/* @__PURE__ */ d("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ u(P, { className: "h-8 w-20" }), /* @__PURE__ */ u(P, { className: "h-8 w-16" })]
						})
					]
				})
			}),
			/* @__PURE__ */ u(E, {
				title: "Alerts",
				wide: !0,
				children: /* @__PURE__ */ d("div", {
					className: "grid gap-3 md:grid-cols-2",
					children: [/* @__PURE__ */ d(Nt, { children: [
						/* @__PURE__ */ u(Te, {}),
						/* @__PURE__ */ u(Ft, { children: "You are in workspace “Autumn”" }),
						/* @__PURE__ */ u(Pt, { children: "Changes are staged for review and are not visible to visitors until published." })
					] }), /* @__PURE__ */ d(Nt, {
						variant: "destructive",
						children: [
							/* @__PURE__ */ u(Ie, {}),
							/* @__PURE__ */ u(Ft, { children: "The Solr core is unreachable" }),
							/* @__PURE__ */ u(Pt, { children: "Search results may be stale. The index queue keeps the changes until the connection is back." })
						]
					})]
				})
			})
		]
	});
}
//#endregion
//#region Build/Frontend/demo/sections/forms.tsx
var { Button: Kt, Checkbox: qt, Field: L, FieldDescription: Jt, FieldError: Yt, FieldGroup: Xt, FieldLabel: R, FieldLegend: Zt, FieldSet: Qt, Input: z, InputGroup: $t, InputGroupAddon: en, InputGroupButton: tn, InputGroupInput: nn, InputGroupText: rn, Label: B, Select: an, SelectContent: on, SelectItem: sn, SelectTrigger: cn, SelectValue: ln, Switch: un, Textarea: dn, toast: fn } = l;
function pn({ group: e }) {
	let [t, n] = o("/old-team"), [r, i] = o("/about/team"), [a, s] = o("301"), [c, l] = o(!1), [f, p] = o(!0), m = t.startsWith("/") ? null : "The source path has to start with a slash.";
	return /* @__PURE__ */ d(T, {
		group: e,
		children: [
			/* @__PURE__ */ u(E, {
				title: "Create a redirect",
				wide: !0,
				children: /* @__PURE__ */ u("form", {
					className: "max-w-xl",
					onSubmit: (e) => {
						e.preventDefault(), m === null && fn.success("Redirect created", { description: `${t} → ${r} (${a})` });
					},
					children: /* @__PURE__ */ d(Xt, { children: [/* @__PURE__ */ d(Qt, { children: [
						/* @__PURE__ */ u(Zt, { children: "Redirect" }),
						/* @__PURE__ */ u(Jt, { children: "Visitors of the source path are sent to the target." }),
						/* @__PURE__ */ d(Xt, { children: [
							/* @__PURE__ */ d(L, {
								"data-invalid": m !== null || void 0,
								children: [
									/* @__PURE__ */ u(R, {
										htmlFor: "demo-source",
										children: "Source path"
									}),
									/* @__PURE__ */ u(z, {
										"aria-invalid": m !== null,
										id: "demo-source",
										onChange: (e) => n(e.currentTarget.value),
										value: t
									}),
									m === null ? /* @__PURE__ */ u(Jt, { children: "Relative to the site root, without the domain." }) : /* @__PURE__ */ u(Yt, { children: m })
								]
							}),
							/* @__PURE__ */ d(L, { children: [/* @__PURE__ */ u(R, {
								htmlFor: "demo-target",
								children: "Target"
							}), /* @__PURE__ */ d($t, { children: [
								/* @__PURE__ */ u(en, { children: /* @__PURE__ */ u(rn, { children: "t3://" }) }),
								/* @__PURE__ */ u(nn, {
									id: "demo-target",
									onChange: (e) => i(e.currentTarget.value),
									value: r
								}),
								/* @__PURE__ */ u(en, {
									align: "inline-end",
									children: /* @__PURE__ */ u(tn, {
										"aria-label": "Browse pages",
										size: "icon-xs",
										children: /* @__PURE__ */ u(S, {})
									})
								})
							] })] }),
							/* @__PURE__ */ d("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ d(L, { children: [/* @__PURE__ */ u(R, {
									htmlFor: "demo-status",
									children: "Status code"
								}), /* @__PURE__ */ d(an, {
									onValueChange: s,
									value: a,
									children: [/* @__PURE__ */ u(cn, {
										className: "w-full",
										id: "demo-status",
										children: /* @__PURE__ */ u(ln, {})
									}), /* @__PURE__ */ u(on, { children: rt.map((e) => /* @__PURE__ */ u(sn, {
										value: e.value,
										children: e.label
									}, e.value)) })]
								})] }), /* @__PURE__ */ d(L, { children: [/* @__PURE__ */ u(R, {
									htmlFor: "demo-language",
									children: "Language"
								}), /* @__PURE__ */ d(an, {
									defaultValue: "0",
									children: [/* @__PURE__ */ u(cn, {
										className: "w-full",
										id: "demo-language",
										children: /* @__PURE__ */ u(ln, {})
									}), /* @__PURE__ */ u(on, { children: nt.map((e) => /* @__PURE__ */ u(sn, {
										value: e.value,
										children: e.label
									}, e.value)) })]
								})] })]
							}),
							/* @__PURE__ */ d(L, {
								orientation: "horizontal",
								children: [/* @__PURE__ */ u(qt, {
									checked: c,
									id: "demo-query",
									onCheckedChange: (e) => l(e === !0)
								}), /* @__PURE__ */ u(R, {
									className: "font-normal",
									htmlFor: "demo-query",
									children: "Respect query parameters"
								})]
							}),
							/* @__PURE__ */ d(L, {
								orientation: "horizontal",
								children: [/* @__PURE__ */ u(un, {
									checked: f,
									id: "demo-active",
									onCheckedChange: p
								}), /* @__PURE__ */ u(R, {
									className: "font-normal",
									htmlFor: "demo-active",
									children: f ? "Active" : "Disabled"
								})]
							})
						] })
					] }), /* @__PURE__ */ d(L, {
						orientation: "horizontal",
						children: [/* @__PURE__ */ u(Kt, {
							type: "submit",
							children: "Create redirect"
						}), /* @__PURE__ */ u(Kt, {
							type: "button",
							variant: "ghost",
							children: "Cancel"
						})]
					})] })
				})
			}),
			/* @__PURE__ */ u(E, {
				title: "Textarea with a counter",
				children: /* @__PURE__ */ d("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ u(B, {
							htmlFor: "demo-abstract",
							children: "Abstract"
						}),
						/* @__PURE__ */ u(dn, {
							className: "field-sizing-content min-h-20",
							defaultValue: "The team behind the site — who does what, and how to reach them.",
							id: "demo-abstract",
							maxLength: 160
						}),
						/* @__PURE__ */ u("p", {
							className: "text-muted-foreground",
							children: "Shown in search results and social previews. Up to 160 characters."
						})
					]
				})
			}),
			/* @__PURE__ */ u(E, {
				title: "Disabled and read-only",
				children: /* @__PURE__ */ d("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ d("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ u(B, {
							htmlFor: "demo-uid",
							children: "Record uid"
						}), /* @__PURE__ */ u(z, {
							defaultValue: "12",
							id: "demo-uid",
							readOnly: !0
						})]
					}), /* @__PURE__ */ d("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ u(B, {
							htmlFor: "demo-locked",
							children: "Slug (locked by a redirect)"
						}), /* @__PURE__ */ u(z, {
							defaultValue: "/about/team",
							disabled: !0,
							id: "demo-locked"
						})]
					})]
				})
			})
		]
	});
}
//#endregion
//#region Build/Frontend/demo/sections/layout.tsx
var { Accordion: mn, AccordionContent: V, AccordionItem: H, AccordionTrigger: U, Avatar: hn, AvatarFallback: gn, Badge: _n, Breadcrumb: vn, BreadcrumbItem: W, BreadcrumbLink: yn, BreadcrumbList: bn, BreadcrumbPage: xn, BreadcrumbSeparator: Sn, Button: G, Card: Cn, CardAction: wn, CardContent: Tn, CardDescription: En, CardFooter: Dn, CardHeader: On, CardTitle: kn, Collapsible: An, CollapsibleContent: jn, CollapsibleTrigger: Mn, Empty: Nn, EmptyContent: Pn, EmptyDescription: Fn, EmptyHeader: In, EmptyMedia: Ln, EmptyTitle: Rn, Item: zn, ItemActions: Bn, ItemContent: Vn, ItemDescription: Hn, ItemGroup: Un, ItemMedia: Wn, ItemSeparator: Gn, ItemTitle: Kn, ScrollArea: qn, Separator: Jn, Tabs: Yn, TabsContent: K, TabsList: Xn, TabsTrigger: q } = l;
function Zn({ group: e }) {
	return /* @__PURE__ */ d(T, {
		group: e,
		children: [
			/* @__PURE__ */ u(E, {
				title: "Card with tabs",
				children: /* @__PURE__ */ d(Cn, { children: [
					/* @__PURE__ */ d(On, { children: [
						/* @__PURE__ */ u(kn, { children: "About us" }),
						/* @__PURE__ */ u(En, { children: "Page 12 · /about · English" }),
						/* @__PURE__ */ u(wn, { children: /* @__PURE__ */ u(_n, {
							variant: "secondary",
							children: "Draft"
						}) })
					] }),
					/* @__PURE__ */ u(Tn, { children: /* @__PURE__ */ d(Yn, {
						defaultValue: "general",
						children: [
							/* @__PURE__ */ d(Xn, { children: [
								/* @__PURE__ */ u(q, {
									value: "general",
									children: "General"
								}),
								/* @__PURE__ */ u(q, {
									value: "seo",
									children: "SEO"
								}),
								/* @__PURE__ */ u(q, {
									value: "access",
									children: "Access"
								})
							] }),
							/* @__PURE__ */ u(K, {
								className: "pt-3 text-muted-foreground",
								value: "general",
								children: "Title, navigation title and the page type. Changes here show on the next publish."
							}),
							/* @__PURE__ */ u(K, {
								className: "pt-3 text-muted-foreground",
								value: "seo",
								children: "Meta description is 148 characters; canonical follows the page."
							}),
							/* @__PURE__ */ u(K, {
								className: "pt-3 text-muted-foreground",
								value: "access",
								children: "Visible to everyone. Not scheduled."
							})
						]
					}) }),
					/* @__PURE__ */ d(Dn, {
						className: "gap-2",
						children: [/* @__PURE__ */ u(G, {
							size: "sm",
							children: "Save"
						}), /* @__PURE__ */ u(G, {
							size: "sm",
							variant: "ghost",
							children: "Discard"
						})]
					})
				] })
			}),
			/* @__PURE__ */ u(E, {
				title: "Recent records",
				children: /* @__PURE__ */ u(Un, {
					className: "rounded-md border",
					children: it.map((e, t) => /* @__PURE__ */ d("div", { children: [t > 0 ? /* @__PURE__ */ u(Gn, {}) : null, /* @__PURE__ */ d(zn, {
						size: "sm",
						children: [
							/* @__PURE__ */ u(Wn, {
								variant: "icon",
								children: e.table === "pages" ? /* @__PURE__ */ u(xe, {}) : /* @__PURE__ */ u(Ce, {})
							}),
							/* @__PURE__ */ d(Vn, { children: [/* @__PURE__ */ u(Kn, { children: e.title }), /* @__PURE__ */ d(Hn, { children: [
								e.table,
								" ",
								/* @__PURE__ */ d("span", {
									className: "font-mono",
									children: ["#", e.uid]
								}),
								" · ",
								e.action,
								" ",
								e.when
							] })] }),
							/* @__PURE__ */ u(Bn, { children: /* @__PURE__ */ u(G, {
								size: "icon-sm",
								variant: "ghost",
								children: /* @__PURE__ */ u(le, {})
							}) })
						]
					})] }, `${e.table}-${e.uid}`))
				})
			}),
			/* @__PURE__ */ d(E, {
				title: "Breadcrumb and avatars",
				children: [
					/* @__PURE__ */ u(vn, { children: /* @__PURE__ */ d(bn, { children: [
						/* @__PURE__ */ u(W, { children: /* @__PURE__ */ u(yn, {
							href: "#layout",
							children: "Site"
						}) }),
						/* @__PURE__ */ u(Sn, {}),
						/* @__PURE__ */ u(W, { children: /* @__PURE__ */ u(yn, {
							href: "#layout",
							children: "About us"
						}) }),
						/* @__PURE__ */ u(Sn, {}),
						/* @__PURE__ */ u(W, { children: /* @__PURE__ */ u(xn, { children: "Team" }) })
					] }) }),
					/* @__PURE__ */ u(Jn, { className: "my-4" }),
					/* @__PURE__ */ u("ul", {
						className: "space-y-2",
						children: tt.map((e) => /* @__PURE__ */ d("li", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ u(hn, {
									className: "size-8",
									children: /* @__PURE__ */ u(gn, { children: e.initials })
								}),
								/* @__PURE__ */ d("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ u("span", {
										className: "block font-medium",
										children: e.name
									}), /* @__PURE__ */ u("span", {
										className: "block text-muted-foreground",
										children: e.role
									})]
								}),
								/* @__PURE__ */ u("span", {
									className: `size-2 rounded-full ${e.online ? "bg-success" : "bg-border-strong"}`,
									title: e.online ? "Online" : "Offline"
								})
							]
						}, e.name))
					})
				]
			}),
			/* @__PURE__ */ d(E, {
				title: "Accordion and collapsible",
				children: [
					/* @__PURE__ */ d(mn, {
						collapsible: !0,
						defaultValue: "routing",
						type: "single",
						children: [
							/* @__PURE__ */ d(H, {
								value: "routing",
								children: [/* @__PURE__ */ u(U, { children: "Routing" }), /* @__PURE__ */ u(V, { children: "Slugs are generated from the title. Two route enhancers are active: news and the site search." })]
							}),
							/* @__PURE__ */ d(H, {
								value: "languages",
								children: [/* @__PURE__ */ u(U, { children: "Languages" }), /* @__PURE__ */ u(V, { children: "English is the default. German and French fall back to English for untranslated content." })]
							}),
							/* @__PURE__ */ d(H, {
								value: "errors",
								children: [/* @__PURE__ */ u(U, { children: "Error handling" }), /* @__PURE__ */ u(V, { children: "404 and 403 show page 40 (Imprint) until a dedicated error page exists." })]
							})
						]
					}),
					/* @__PURE__ */ u(Jn, { className: "my-4" }),
					/* @__PURE__ */ d(An, { children: [/* @__PURE__ */ u(Mn, {
						asChild: !0,
						children: /* @__PURE__ */ d(G, {
							size: "sm",
							variant: "outline",
							children: [/* @__PURE__ */ u(Ne, {}), "Advanced settings"]
						})
					}), /* @__PURE__ */ u(jn, {
						className: "mt-3 rounded-md border bg-muted/40 p-3 text-muted-foreground",
						children: "Base variants, entry points per environment, and the Solr core the site indexes into."
					})] })
				]
			}),
			/* @__PURE__ */ u(E, {
				title: "Empty state",
				children: /* @__PURE__ */ d(Nn, {
					className: "border-dashed",
					children: [/* @__PURE__ */ d(In, { children: [
						/* @__PURE__ */ u(Ln, {
							variant: "icon",
							children: /* @__PURE__ */ u(Ce, {})
						}),
						/* @__PURE__ */ u(Rn, { children: "No redirects yet" }),
						/* @__PURE__ */ u(Fn, { children: "Redirects send visitors from an old URL to a new one. Create the first one, or import a list." })
					] }), /* @__PURE__ */ u(Pn, { children: /* @__PURE__ */ d("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ d(G, {
							size: "sm",
							children: [/* @__PURE__ */ u(Ae, {}), "Create redirect"]
						}), /* @__PURE__ */ u(G, {
							size: "sm",
							variant: "outline",
							children: "Import CSV"
						})]
					}) })]
				})
			}),
			/* @__PURE__ */ u(E, {
				className: "p-0",
				title: "Scroll area",
				children: /* @__PURE__ */ u(qn, {
					className: "h-48",
					children: /* @__PURE__ */ u("ul", {
						className: "divide-y",
						children: Array.from({ length: 24 }, (e, t) => /* @__PURE__ */ d("li", {
							className: "flex items-center justify-between px-4 py-2",
							children: [/* @__PURE__ */ d("span", { children: ["Content element ", /* @__PURE__ */ d("span", {
								className: "font-mono text-muted-foreground",
								children: ["#", 380 + t]
							})] }), /* @__PURE__ */ u("span", {
								className: "text-muted-foreground",
								children: t % 3 == 0 ? "Text & media" : t % 3 == 1 ? "Header" : "Image"
							})]
						}, t))
					})
				})
			})
		]
	});
}
//#endregion
//#region Build/Frontend/demo/sections/overlays.tsx
var { Button: J, Command: Qn, CommandEmpty: $n, CommandGroup: Y, CommandInput: er, CommandItem: X, CommandList: tr, CommandShortcut: nr, Dialog: rr, DialogContent: ir, DialogDescription: ar, DialogFooter: or, DialogHeader: sr, DialogTitle: cr, DialogTrigger: lr, Input: Z, Label: Q, Popover: ur, PopoverContent: dr, PopoverTrigger: fr, Sheet: pr, SheetContent: mr, SheetDescription: hr, SheetFooter: gr, SheetHeader: _r, SheetTitle: vr, SheetTrigger: yr, Textarea: br, toast: $ } = l;
function xr({ group: e }) {
	let [t, n] = o(!1);
	return /* @__PURE__ */ d(T, {
		group: e,
		children: [
			/* @__PURE__ */ d(E, {
				title: "Confirm a deletion",
				children: [/* @__PURE__ */ d(rr, { children: [/* @__PURE__ */ u(lr, {
					asChild: !0,
					children: /* @__PURE__ */ d(J, {
						variant: "destructive",
						children: [/* @__PURE__ */ u(Pe, {}), "Delete page “Team”"]
					})
				}), /* @__PURE__ */ d(ir, { children: [/* @__PURE__ */ d(sr, { children: [/* @__PURE__ */ u(cr, { children: "Delete this page?" }), /* @__PURE__ */ u(ar, { children: "“Team” (14) and its 6 content elements move to the recycler. Two pages link here; the links will break." })] }), /* @__PURE__ */ d(or, { children: [/* @__PURE__ */ u(J, {
					variant: "outline",
					children: "Cancel"
				}), /* @__PURE__ */ u(J, {
					onClick: () => {
						n(!0), $("Page deleted", {
							description: "Team (14) is in the recycler.",
							action: {
								label: "Undo",
								onClick: () => n(!1)
							}
						});
					},
					variant: "destructive",
					children: "Delete"
				})] })] })] }), t ? /* @__PURE__ */ u("p", {
					className: "mt-2 text-muted-foreground",
					children: "Deleted (in this demo only)."
				}) : null]
			}),
			/* @__PURE__ */ u(E, {
				title: "Edit in a sheet",
				children: /* @__PURE__ */ d(pr, { children: [/* @__PURE__ */ u(yr, {
					asChild: !0,
					children: /* @__PURE__ */ u(J, {
						variant: "outline",
						children: "Edit “About us”"
					})
				}), /* @__PURE__ */ d(mr, { children: [
					/* @__PURE__ */ d(_r, { children: [/* @__PURE__ */ u(vr, { children: "About us" }), /* @__PURE__ */ u(hr, { children: "Page 12 · quick edit" })] }),
					/* @__PURE__ */ d("div", {
						className: "grid gap-4 px-4",
						children: [
							/* @__PURE__ */ d("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ u(Q, {
									htmlFor: "sheet-title",
									children: "Title"
								}), /* @__PURE__ */ u(Z, {
									defaultValue: "About us",
									id: "sheet-title"
								})]
							}),
							/* @__PURE__ */ d("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ u(Q, {
									htmlFor: "sheet-nav",
									children: "Navigation title"
								}), /* @__PURE__ */ u(Z, {
									defaultValue: "About",
									id: "sheet-nav"
								})]
							}),
							/* @__PURE__ */ d("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ u(Q, {
									htmlFor: "sheet-abstract",
									children: "Abstract"
								}), /* @__PURE__ */ u(br, {
									defaultValue: "Who we are and what we stand for.",
									id: "sheet-abstract"
								})]
							})
						]
					}),
					/* @__PURE__ */ u(gr, { children: /* @__PURE__ */ u(J, {
						onClick: () => $.success("Saved", { description: "About us (12)" }),
						children: "Save"
					}) })
				] })] })
			}),
			/* @__PURE__ */ u(E, {
				title: "Popover",
				children: /* @__PURE__ */ d(ur, { children: [/* @__PURE__ */ u(fr, {
					asChild: !0,
					children: /* @__PURE__ */ d(J, {
						variant: "outline",
						children: [/* @__PURE__ */ u(se, {}), "Publish on…"]
					})
				}), /* @__PURE__ */ d(dr, {
					className: "w-72 space-y-3",
					children: [
						/* @__PURE__ */ d("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ u("p", {
								className: "font-medium",
								children: "Schedule publication"
							}), /* @__PURE__ */ u("p", {
								className: "text-muted-foreground",
								children: "The page goes live at this time in the site's timezone."
							})]
						}),
						/* @__PURE__ */ d("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ u(Q, {
								htmlFor: "pop-date",
								children: "Date and time"
							}), /* @__PURE__ */ u(Z, {
								defaultValue: "2026-10-01T09:00",
								id: "pop-date",
								type: "datetime-local"
							})]
						}),
						/* @__PURE__ */ u(J, {
							className: "w-full",
							size: "sm",
							children: "Schedule"
						})
					]
				})] })
			}),
			/* @__PURE__ */ u(E, {
				title: "Toasts",
				children: /* @__PURE__ */ d("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ u(J, {
							onClick: () => $("Indexing started", { description: "412 pages queued for Solr." }),
							variant: "outline",
							children: "Default"
						}),
						/* @__PURE__ */ u(J, {
							onClick: () => $.success("Published", { description: "Workspace “Autumn” is live." }),
							variant: "outline",
							children: "Success"
						}),
						/* @__PURE__ */ u(J, {
							onClick: () => $.warning("Cache is stale", { description: "Clear it after the deploy." }),
							variant: "outline",
							children: "Warning"
						}),
						/* @__PURE__ */ u(J, {
							onClick: () => $.error("Upload failed", { description: "The file exceeds 20 MB." }),
							variant: "outline",
							children: "Error"
						})
					]
				})
			}),
			/* @__PURE__ */ u(E, {
				className: "p-0",
				title: "Command (inline, also behind ⌘K)",
				wide: !0,
				children: /* @__PURE__ */ d(Qn, {
					className: "rounded-lg border-0",
					children: [/* @__PURE__ */ u(er, { placeholder: "Go to a page or module…" }), /* @__PURE__ */ d(tr, { children: [
						/* @__PURE__ */ u($n, { children: "Nothing matches." }),
						/* @__PURE__ */ u(Y, {
							heading: "Pages",
							children: j.slice(0, 4).map((e) => /* @__PURE__ */ d(X, {
								value: `${e.title} ${e.slug}`,
								children: [
									/* @__PURE__ */ u(xe, {}),
									e.title,
									/* @__PURE__ */ u(nr, { children: e.slug })
								]
							}, e.uid))
						}),
						/* @__PURE__ */ d(Y, {
							heading: "Modules",
							children: [/* @__PURE__ */ d(X, { children: [/* @__PURE__ */ u(De, {}), "Page"] }), /* @__PURE__ */ d(X, { children: [/* @__PURE__ */ u(S, {}), "Redirects"] })]
						})
					] })]
				})
			})
		]
	});
}
//#endregion
//#region Build/Frontend/demo/main.tsx
var { Badge: Sr, Button: Cr, ScrollArea: wr, Toaster: Tr } = l, Er = {
	actions: et,
	layout: Zn,
	forms: pn,
	data: Gt,
	overlays: xr,
	chat: Mt
};
function Dr({ props: e, shell: t }) {
	let n = a(() => Or(e.groups), [e.groups]), [r, s] = o(n[0]?.id ?? "");
	return i(() => {
		t.setContext({
			view: "components",
			section: r
		});
	}, [t, r]), /* @__PURE__ */ d("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [
			/* @__PURE__ */ d("header", {
				className: "flex flex-wrap items-center gap-x-3 gap-y-2 border-b px-4 py-3",
				children: [
					/* @__PURE__ */ u("h1", {
						className: "text-base font-semibold",
						children: "shadcn/ui components"
					}),
					/* @__PURE__ */ d(Sr, {
						variant: "secondary",
						children: [kr(n), " components"]
					}),
					/* @__PURE__ */ u("p", {
						className: "text-muted-foreground",
						children: "Every component the runtime ships, in a TYPO3 backend module."
					}),
					/* @__PURE__ */ u(Cr, {
						className: "ms-auto",
						onClick: t.openChat,
						size: "sm",
						variant: "outline",
						children: "Ask the assistant"
					})
				]
			}),
			/* @__PURE__ */ d("div", {
				className: "flex min-h-0 flex-1",
				children: [/* @__PURE__ */ u("nav", {
					"aria-label": "Sections",
					className: "hidden w-44 shrink-0 border-e p-3 md:block",
					children: /* @__PURE__ */ u("ul", {
						className: "space-y-0.5",
						children: n.map((e) => /* @__PURE__ */ u("li", { children: /* @__PURE__ */ u("a", {
							"aria-current": r === e.id ? "true" : void 0,
							className: "block rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none aria-[current]:bg-accent aria-[current]:text-accent-foreground",
							href: `#${e.id}`,
							onClick: () => s(e.id),
							children: e.title
						}) }, e.id))
					})
				}), /* @__PURE__ */ u(wr, {
					className: "min-w-0 flex-1",
					children: /* @__PURE__ */ u("div", {
						className: "space-y-10 p-4 pb-16",
						children: n.length === 0 ? /* @__PURE__ */ u("p", {
							className: "text-muted-foreground",
							children: "This module was rendered without any groups."
						}) : n.map((e) => {
							let t = Er[e.id];
							return t === void 0 ? null : /* @__PURE__ */ u(t, { group: e }, e.id);
						})
					})
				})]
			}),
			/* @__PURE__ */ u(Tr, {})
		]
	});
}
function Or(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = typeof e.id == "string" ? e.id : "";
		r in Er && t.push({
			id: r,
			title: typeof e.title == "string" ? e.title : r,
			description: typeof e.description == "string" ? e.description : "",
			components: Array.isArray(e.components) ? e.components.filter((e) => typeof e == "string") : []
		});
	}
	return t;
}
function kr(e) {
	return new Set(e.flatMap((e) => e.components)).size;
}
c("shadcn_ui/components", Dr);
//#endregion
