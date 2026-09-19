import { i as e, n as t, t as n } from "./chunks/rolldown-runtime.js";
import { t as r } from "./chunks/react.js";
import { n as i, t as a } from "./chunks/client.js";
import { t as o } from "./chunks/jsx-runtime.js";
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
var s = (e) => e?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs
function c(e, t, n = []) {
	if (t == null) throw Error("[lucide]: iconNode is required when icon name is used");
	return {
		name: s(e),
		size: 24,
		node: t,
		...n.length > 0 ? { aliases: n } : {}
	};
}
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
var l = (e) => {
	let t = "", n = !1;
	for (let r of e) {
		if (r === "-" || r === "_" || r <= " ") {
			n = t.length > 0;
			continue;
		}
		t.length === 0 ? t += r.toLowerCase() : t += n ? r.toUpperCase() : r, n = !1;
	}
	return t;
}, u = (e) => {
	let t = l(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, d = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), f = {
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
function p(e) {
	return e != null;
}
function m(e, t = {}) {
	let n = t.attributeNames ?? {}, r = (e) => n[e] ?? e, i = e.size ?? e.width ?? f.width, a = e.size ?? e.height ?? f.height, o = e.aliases?.filter((e) => typeof e == "string" && e.trim() !== "").map((e) => `lucide-${e}`) ?? [], s = [...e.name ? [`lucide-${e.name}`] : [], ...o], c = t.className?.split(" ").filter(Boolean) ?? [], l = t.includeDefaultClasses === !1 ? d(...c) : d("lucide", ...s, ...c), u = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? f["stroke-width"]) * Number(e.size ?? e.width ?? f.width) / Number(t.size ?? t.width ?? f.width) : t.strokeWidth ?? f["stroke-width"];
	return [
		"svg",
		{
			...Object.entries(f).reduce((e, [t, n]) => (e[r(t)] = n, e), {}),
			..."color" in t && t.color && { [r("stroke")]: t.color },
			..."size" in t && p(t.size) && {
				[r("width")]: t.size,
				[r("height")]: t.size
			},
			..."width" in t && p(t.width) && { [r("width")]: t.width },
			..."height" in t && p(t.height) && { [r("height")]: t.height },
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
function h(e, t = {}) {
	return m(e, {
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
var g = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, _ = /* @__PURE__ */ e(r(), 1), v = (0, _.createContext)({}), y = () => (0, _.useContext)(v), b = (0, _.forwardRef)(({ color: e, size: t, width: n, height: r, strokeWidth: i, absoluteStrokeWidth: a, nonScalingStroke: o, className: s = "", children: c, iconNode: l = [], icon: u = {
	node: l,
	aliases: [],
	size: 24
}, ...f }, p) => {
	let { size: m = 24, strokeWidth: v = 2, absoluteStrokeWidth: b = !1, nonScalingStroke: x = !1, color: S = "currentColor", className: C = "" } = y() ?? {}, w = !!c || g(f), [T, E, D = []] = h(u, {
		color: e ?? S,
		width: n ?? t ?? m,
		height: r ?? t ?? m,
		strokeWidth: i ?? v,
		absoluteStrokeWidth: a ?? b,
		nonScalingStroke: o ?? x,
		className: d(C, s),
		hasA11yProp: w,
		attributes: f
	});
	return (0, _.createElement)(T, {
		ref: p,
		...E
	}, [...D.map(([e, t]) => (0, _.createElement)(e, t)), ...Array.isArray(c) ? c : [c]]);
});
//#endregion
//#region node_modules/lucide-react/dist/esm/createLucideIcon.mjs
function x(e, t = [], n = []) {
	let r = typeof e == "string" ? c(e, t, n) : e, i = (0, _.forwardRef)(({ className: e, ...t }, n) => (0, _.createElement)(b, {
		ref: n,
		icon: r,
		className: e,
		...t
	}));
	return r.name && (i.displayName = u(r.name)), i;
}
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/activity.mjs
var S = {
	name: "activity",
	size: 24,
	node: [["path", {
		d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
		key: "169zse"
	}]]
};
S.node;
var C = x(S), w = {
	name: "archive-restore",
	size: 24,
	node: [
		["rect", {
			width: "20",
			height: "5",
			x: "2",
			y: "3",
			rx: "1",
			key: "1wp1u1"
		}],
		["path", {
			d: "M4 8v11a2 2 0 0 0 2 2h2",
			key: "tvwodi"
		}],
		["path", {
			d: "M20 8v11a2 2 0 0 1-2 2h-2",
			key: "1gkqxj"
		}],
		["path", {
			d: "m9 15 3-3 3 3",
			key: "1pd0qc"
		}],
		["path", {
			d: "M12 12v9",
			key: "192myk"
		}]
	]
};
w.node;
var T = x(w), E = {
	name: "archive",
	size: 24,
	node: [
		["rect", {
			width: "20",
			height: "5",
			x: "2",
			y: "3",
			rx: "1",
			key: "1wp1u1"
		}],
		["path", {
			d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",
			key: "1s80jp"
		}],
		["path", {
			d: "M10 12h4",
			key: "a56b0p"
		}]
	]
};
E.node;
var D = x(E), O = {
	name: "arrow-down",
	size: 24,
	node: [["path", {
		d: "M12 5v14",
		key: "s699le"
	}], ["path", {
		d: "m19 12-7 7-7-7",
		key: "1idqje"
	}]]
};
O.node;
var k = x(O), A = {
	name: "arrow-up-right",
	size: 24,
	node: [["path", {
		d: "M7 7h10v10",
		key: "1tivn9"
	}], ["path", {
		d: "M7 17 17 7",
		key: "1vkiza"
	}]]
};
A.node;
var j = x(A), M = {
	name: "book-open-text",
	size: 24,
	node: [
		["path", {
			d: "M12 5v16",
			key: "1f6ucr"
		}],
		["path", {
			d: "M16 13h2",
			key: "weia3s"
		}],
		["path", {
			d: "M16 9h2",
			key: "1n7gjm"
		}],
		["path", {
			d: "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",
			key: "1fyvmf"
		}],
		["path", {
			d: "M6 13h2",
			key: "1cckiz"
		}],
		["path", {
			d: "M6 9h2",
			key: "1k7j9f"
		}]
	]
};
M.node;
var N = x(M), P = {
	name: "brain",
	size: 24,
	node: [
		["path", {
			d: "M12 18V5",
			key: "adv99a"
		}],
		["path", {
			d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4",
			key: "1e3is1"
		}],
		["path", {
			d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5",
			key: "1gqd8o"
		}],
		["path", {
			d: "M17.997 5.125a4 4 0 0 1 2.526 5.77",
			key: "iwvgf7"
		}],
		["path", {
			d: "M18 18a4 4 0 0 0 2-7.464",
			key: "efp6ie"
		}],
		["path", {
			d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517",
			key: "1gq6am"
		}],
		["path", {
			d: "M6 18a4 4 0 0 1-2-7.464",
			key: "k1g0md"
		}],
		["path", {
			d: "M6.003 5.125a4 4 0 0 0-2.526 5.77",
			key: "q97ue3"
		}]
	]
};
P.node;
var F = x(P), I = {
	name: "check",
	size: 24,
	node: [["path", {
		d: "M20 6 9 17l-5-5",
		key: "1gmf2c"
	}]]
};
I.node;
var ee = x(I), te = {
	name: "chevron-down",
	size: 24,
	node: [["path", {
		d: "m6 9 6 6 6-6",
		key: "qrunsl"
	}]]
};
te.node;
var ne = x(te), re = {
	name: "chevron-right",
	size: 24,
	node: [["path", {
		d: "m9 18 6-6-6-6",
		key: "mthhwq"
	}]]
};
re.node;
var L = x(re), ie = {
	name: "chevron-up",
	size: 24,
	node: [["path", {
		d: "m18 15-6-6-6 6",
		key: "153udz"
	}]]
};
ie.node;
var ae = x(ie), oe = {
	name: "circle-check",
	size: 24,
	node: [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "m16 9-5.5 5.5L8 12",
		key: "xofnsj"
	}]],
	aliases: ["check-circle-2"]
};
oe.node;
var se = x(oe), ce = {
	name: "circle-check-big",
	size: 24,
	node: [["path", {
		d: "M21.801 10A10 10 0 1 1 17 3.335",
		key: "yps3ct"
	}], ["path", {
		d: "m9 11 3 3L22 4",
		key: "1pflzl"
	}]],
	aliases: ["check-circle"]
};
ce.node;
var le = x(ce), ue = {
	name: "circle-question-mark",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
			key: "1u773s"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}]
	],
	aliases: ["help-circle", "circle-help"]
};
ue.node;
var de = x(ue), fe = {
	name: "circle-x",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "m15 9-6 6",
			key: "1uzhvr"
		}],
		["path", {
			d: "m9 9 6 6",
			key: "z0biqf"
		}]
	],
	aliases: ["x-circle"]
};
fe.node;
var pe = x(fe), me = {
	name: "circle",
	size: 24,
	node: [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]
};
me.node;
var he = x(me), ge = {
	name: "clock",
	size: 24,
	node: [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "M12 6v6l4 2",
		key: "mmk7yg"
	}]]
};
ge.node;
var _e = x(ge), ve = {
	name: "corner-down-left",
	size: 24,
	node: [["path", {
		d: "M20 4v7a4 4 0 0 1-4 4H4",
		key: "6o5b7l"
	}], ["path", {
		d: "m9 10-5 5 5 5",
		key: "1kshq7"
	}]]
};
ve.node;
var ye = x(ve), be = {
	name: "database",
	size: 24,
	node: [
		["ellipse", {
			cx: "12",
			cy: "5",
			rx: "9",
			ry: "3",
			key: "msslwz"
		}],
		["path", {
			d: "M3 5V19A9 3 0 0 0 21 19V5",
			key: "1wlel7"
		}],
		["path", {
			d: "M3 12A9 3 0 0 0 21 12",
			key: "mv7ke4"
		}]
	]
};
be.node;
var xe = x(be), Se = {
	name: "ellipsis-vertical",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "1",
			key: "41hilf"
		}],
		["circle", {
			cx: "12",
			cy: "5",
			r: "1",
			key: "gxeob9"
		}],
		["circle", {
			cx: "12",
			cy: "19",
			r: "1",
			key: "lyex9k"
		}]
	],
	aliases: ["more-vertical"]
};
Se.node;
var Ce = x(Se), we = {
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
we.node;
var Te = x(we), Ee = {
	name: "eye",
	size: 24,
	node: [["path", {
		d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
		key: "1nclc0"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "3",
		key: "1v7zrd"
	}]]
};
Ee.node;
var De = x(Ee), Oe = {
	name: "file-pen-line",
	size: 24,
	node: [
		["path", {
			d: "M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z",
			key: "ukzhwg"
		}],
		["path", {
			d: "M14.487 7.858A1 1 0 0 1 14 7V2",
			key: "1klhew"
		}],
		["path", {
			d: "M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516",
			key: "rxaxab"
		}],
		["path", {
			d: "M8 18h1",
			key: "13wk12"
		}]
	],
	aliases: ["file-signature"]
};
Oe.node;
var ke = x(Oe), Ae = {
	name: "file-plus-corner",
	size: 24,
	node: [
		["path", {
			d: "M11.35 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5.35",
			key: "17jvcc"
		}],
		["path", {
			d: "M14 2v5a1 1 0 0 0 1 1h5",
			key: "wfsgrz"
		}],
		["path", {
			d: "M14 19h6",
			key: "bvotb8"
		}],
		["path", {
			d: "M17 16v6",
			key: "18yu1i"
		}]
	],
	aliases: ["file-plus-2"]
};
Ae.node;
var je = x(Ae), Me = {
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
Me.node;
var Ne = x(Me), Pe = {
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
Pe.node;
var Fe = x(Pe), Ie = {
	name: "gauge",
	size: 24,
	node: [["path", {
		d: "m12 14 4-4",
		key: "9kzdfg"
	}], ["path", {
		d: "M3.34 19a10 10 0 1 1 17.32 0",
		key: "19p75a"
	}]]
};
Ie.node;
var Le = x(Ie), Re = {
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
Re.node;
var ze = x(Re), Be = {
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
Be.node;
var Ve = x(Be), He = {
	name: "layout-panel-top",
	size: 24,
	node: [
		["rect", {
			width: "18",
			height: "7",
			x: "3",
			y: "3",
			rx: "1",
			key: "f1a2em"
		}],
		["rect", {
			width: "7",
			height: "7",
			x: "3",
			y: "14",
			rx: "1",
			key: "1bb6yr"
		}],
		["rect", {
			width: "7",
			height: "7",
			x: "14",
			y: "14",
			rx: "1",
			key: "nxv5o0"
		}]
	]
};
He.node;
var Ue = x(He), We = {
	name: "loader-circle",
	size: 24,
	node: [["path", {
		d: "M21 12a9 9 0 1 1-6.219-8.56",
		key: "13zald"
	}]],
	aliases: ["loader-2"]
};
We.node;
var Ge = x(We), Ke = {
	name: "maximize",
	size: 24,
	node: [
		["path", {
			d: "M8 3H5a2 2 0 0 0-2 2v3",
			key: "1dcmit"
		}],
		["path", {
			d: "M21 8V5a2 2 0 0 0-2-2h-3",
			key: "1e4gt3"
		}],
		["path", {
			d: "M3 16v3a2 2 0 0 0 2 2h3",
			key: "wsl5sc"
		}],
		["path", {
			d: "M16 21h3a2 2 0 0 0 2-2v-3",
			key: "18trek"
		}]
	]
};
Ke.node;
var qe = x(Ke), Je = {
	name: "message-square-plus",
	size: 24,
	node: [
		["path", {
			d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
			key: "18887p"
		}],
		["path", {
			d: "M12 8v6",
			key: "1ib9pf"
		}],
		["path", {
			d: "M9 11h6",
			key: "1fldmi"
		}]
	]
};
Je.node;
var Ye = x(Je), Xe = {
	name: "message-square-text",
	size: 24,
	node: [
		["path", {
			d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
			key: "18887p"
		}],
		["path", {
			d: "M7 11h10",
			key: "1twpyw"
		}],
		["path", {
			d: "M7 15h6",
			key: "d9of3u"
		}],
		["path", {
			d: "M7 7h8",
			key: "af5zfr"
		}]
	]
};
Xe.node;
var Ze = x(Xe), Qe = {
	name: "message-square",
	size: 24,
	node: [["path", {
		d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
		key: "18887p"
	}]]
};
Qe.node;
var $e = x(Qe), et = {
	name: "messages-square",
	size: 24,
	node: [["path", {
		d: "M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
		key: "1n2ejm"
	}], ["path", {
		d: "M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1",
		key: "1qfcsi"
	}]]
};
et.node;
var tt = x(et), nt = {
	name: "minus",
	size: 24,
	node: [["path", {
		d: "M5 12h14",
		key: "1ays0h"
	}]]
};
nt.node;
var rt = x(nt), it = {
	name: "octagon-x",
	size: 24,
	node: [
		["path", {
			d: "m15 9-6 6",
			key: "1uzhvr"
		}],
		["path", {
			d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
			key: "2d38gg"
		}],
		["path", {
			d: "m9 9 6 6",
			key: "z0biqf"
		}]
	],
	aliases: ["x-octagon"]
};
it.node;
var at = x(it), ot = {
	name: "package-open",
	size: 24,
	node: [
		["path", {
			d: "M12 22v-9",
			key: "x3hkom"
		}],
		["path", {
			d: "M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z",
			key: "2ntwy6"
		}],
		["path", {
			d: "M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13",
			key: "1pmm1c"
		}],
		["path", {
			d: "M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z",
			key: "12ttoo"
		}]
	]
};
ot.node;
var st = x(ot), ct = {
	name: "panel-left-close",
	size: 24,
	node: [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M9 3v18",
			key: "fh3hqa"
		}],
		["path", {
			d: "m16 15-3-3 3-3",
			key: "14y99z"
		}]
	],
	aliases: ["sidebar-close"]
};
ct.node;
var lt = x(ct), ut = {
	name: "panel-left",
	size: 24,
	node: [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["path", {
		d: "M9 3v18",
		key: "fh3hqa"
	}]],
	aliases: ["sidebar"]
};
ut.node;
var dt = x(ut), ft = {
	name: "paperclip",
	size: 24,
	node: [["path", {
		d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
		key: "1miecu"
	}]]
};
ft.node;
var pt = x(ft), mt = {
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
mt.node;
var ht = x(mt), gt = {
	name: "pin",
	size: 24,
	node: [["path", {
		d: "M12 17v5",
		key: "bb1du9"
	}], ["path", {
		d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
		key: "1nkz8b"
	}]]
};
gt.node;
var _t = x(gt), vt = {
	name: "pin-off",
	size: 24,
	node: [
		["path", {
			d: "M12 17v5",
			key: "bb1du9"
		}],
		["path", {
			d: "M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89",
			key: "znwnzq"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11",
			key: "c9qhm2"
		}]
	]
};
vt.node;
var yt = x(vt), bt = {
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
bt.node;
var xt = x(bt), St = {
	name: "rotate-ccw-clock",
	size: 24,
	node: [
		["path", {
			d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
			key: "1357e3"
		}],
		["path", {
			d: "M3 3v5h5",
			key: "1xhq8a"
		}],
		["path", {
			d: "M12 7v5l4 2",
			key: "1fdv2h"
		}]
	],
	aliases: ["history"]
};
St.node;
var Ct = x(St), wt = {
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
wt.node;
var Tt = x(wt), Et = {
	name: "shield-question-mark",
	size: 24,
	node: [
		["path", {
			d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
			key: "oel41y"
		}],
		["path", {
			d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3",
			key: "mhlwft"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}]
	],
	aliases: ["shield-question"]
};
Et.node;
var Dt = x(Et), Ot = {
	name: "sparkles",
	size: 24,
	node: [
		["path", {
			d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
			key: "1s2grr"
		}],
		["path", {
			d: "M20 2v4",
			key: "1rf3ol"
		}],
		["path", {
			d: "M22 4h-4",
			key: "gwowj6"
		}],
		["circle", {
			cx: "4",
			cy: "20",
			r: "2",
			key: "6kqj1y"
		}]
	],
	aliases: ["stars"]
};
Ot.node;
var kt = x(Ot), At = {
	name: "square-pen",
	size: 24,
	node: [["path", {
		d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
		key: "1m0v6g"
	}], ["path", {
		d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
		key: "ohrbg2"
	}]],
	aliases: [
		"pen-box",
		"edit",
		"pen-square"
	]
};
At.node;
var jt = x(At), Mt = {
	name: "square",
	size: 24,
	node: [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}]]
};
Mt.node;
var Nt = x(Mt), Pt = {
	name: "text-cursor-input",
	size: 24,
	node: [
		["path", {
			d: "M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6",
			key: "1528k5"
		}],
		["path", {
			d: "M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7",
			key: "13ksps"
		}],
		["path", {
			d: "M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1",
			key: "1n9rhb"
		}],
		["path", {
			d: "M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1",
			key: "1mj8rg"
		}],
		["path", {
			d: "M9 6v12",
			key: "velyjx"
		}]
	]
};
Pt.node;
var Ft = x(Pt), It = {
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
It.node;
var Lt = x(It), Rt = {
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
Rt.node;
var zt = x(Rt), Bt = {
	name: "wrench",
	size: 24,
	node: [["path", {
		d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",
		key: "1ngwbx"
	}]]
};
Bt.node;
var Vt = x(Bt), Ht = {
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
Ht.node;
var Ut = x(Ht), Wt = /* @__PURE__ */ e(i(), 1), R = o();
function Gt(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = Gt(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function Kt() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Gt(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/class-variance-authority/dist/index.mjs
var qt = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Jt = Kt, Yt = (e, t) => (n) => {
	if (t?.variants == null) return Jt(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = qt(t) || qt(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return Jt(e, a, t?.compoundVariants?.reduce((e, t) => {
		let { class: n, className: r, ...a } = t;
		return Object.entries(a).every((e) => {
			let [t, n] = e;
			return Array.isArray(n) ? n.includes({
				...i,
				...o
			}[t]) : {
				...i,
				...o
			}[t] === n;
		}) ? [
			...e,
			n,
			r
		] : e;
	}, []), n?.class, n?.className);
}, Xt = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, Zt = (e, t) => ({
	classGroupId: e,
	validator: t
}), Qt = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), $t = "-", en = [], tn = "arbitrary..", nn = (e) => {
	let t = on(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return an(e);
			let n = e.split($t);
			return rn(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? Xt(i, t) : t : i || en;
			}
			return n[e] || en;
		}
	};
}, rn = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = rn(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join($t) : e.slice(t).join($t), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, an = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? tn + r : void 0;
})(), on = (e) => {
	let { theme: t, classGroups: n } = e;
	return sn(n, t);
}, sn = (e, t) => {
	let n = Qt();
	for (let r in e) {
		let i = e[r];
		cn(i, n, r, t);
	}
	return n;
}, cn = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		ln(i, t, n, r);
	}
}, ln = (e, t, n, r) => {
	if (typeof e == "string") {
		un(e, t, n);
		return;
	}
	if (typeof e == "function") {
		dn(e, t, n, r);
		return;
	}
	fn(e, t, n, r);
}, un = (e, t, n) => {
	let r = e === "" ? t : pn(t, e);
	r.classGroupId = n;
}, dn = (e, t, n, r) => {
	if (mn(e)) {
		cn(e(r), t, n, r);
		return;
	}
	t.validators === null && (t.validators = []), t.validators.push(Zt(n, e));
}, fn = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		cn(o, pn(t, a), n, r);
	}
}, pn = (e, t) => {
	let n = e, r = t.split($t), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = Qt(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, mn = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, hn = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), r = Object.create(null), i = (i, a) => {
		n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = r[e]) !== void 0) return i(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : i(e, t);
		}
	};
}, gn = "!", _n = ":", vn = [], yn = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), bn = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === _n) {
					t.push(e.slice(i, s)), i = s + 1;
					continue;
				}
				if (o === "/") {
					a = s;
					continue;
				}
			}
			o === "[" ? n++ : o === "]" ? n-- : o === "(" ? r++ : o === ")" && r--;
		}
		let s = t.length === 0 ? e : e.slice(i), c = s, l = !1;
		s.endsWith(gn) ? (c = s.slice(0, -1), l = !0) : s.startsWith(gn) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return yn(t, l, c, u);
	};
	if (t) {
		let e = t + _n, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : yn(vn, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, xn = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a);
		}
		return r.length > 0 && (r.sort(), n.push(...r)), n;
	};
}, Sn = (e) => ({
	cache: hn(e.cacheSize),
	parseClassName: bn(e),
	sortModifiers: xn(e),
	postfixLookupClassGroupIds: Cn(e),
	...nn(e)
}), Cn = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, wn = /\s+/, Tn = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(wn), l = "";
	for (let e = c.length - 1; e >= 0; --e) {
		let t = c[e], { isExternal: u, modifiers: d, hasImportantModifier: f, baseClassName: p, maybePostfixModifierPosition: m } = n(t);
		if (u) {
			l = t + (l.length > 0 ? " " + l : l);
			continue;
		}
		let h = !!m, g;
		if (h) {
			g = r(p.substring(0, m));
			let e = g && o[g] ? r(p) : void 0;
			e && e !== g && (g = e, h = !1);
		} else g = r(p);
		if (!g) {
			if (!h) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			if (g = r(p), !g) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			h = !1;
		}
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + gn : _, y = v + g;
		if (s.indexOf(y) > -1) continue;
		s.push(y);
		let b = i(g, h);
		for (let e = 0; e < b.length; ++e) {
			let t = b[e];
			s.push(v + t);
		}
		l = t + (l.length > 0 ? " " + l : l);
	}
	return l;
}, En = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = Dn(n)) && (i && (i += " "), i += r);
	return i;
}, Dn = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = Dn(e[r])) && (n && (n += " "), n += t);
	return n;
}, On = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = Sn(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = Tn(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(En(...e));
}, kn = [], An = (e) => {
	let t = (t) => t[e] || kn;
	return t.isThemeGetter = !0, t.themeKey = e, t;
}, jn = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Mn = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Nn = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Pn = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Fn = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, In = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, Ln = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Rn = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, zn = (e) => Nn.test(e), z = (e) => !!e && !Number.isNaN(Number(e)), Bn = (e) => !!e && Number.isInteger(Number(e)), Vn = (e) => e.endsWith("%") && z(e.slice(0, -1)), Hn = (e) => Pn.test(e), Un = () => !0, Wn = (e) => Fn.test(e) && !In.test(e), Gn = () => !1, Kn = (e) => Ln.test(e), qn = (e) => Rn.test(e), Jn = (e) => !B(e) && !V(e), Yn = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Xn = (e) => dr(e, hr, Gn), B = (e) => jn.test(e), Zn = (e) => dr(e, gr, Wn), Qn = (e) => dr(e, _r, z), $n = (e) => dr(e, yr, Un), er = (e) => dr(e, vr, Gn), tr = (e) => dr(e, pr, Gn), nr = (e) => dr(e, mr, qn), rr = (e) => dr(e, br, Kn), V = (e) => Mn.test(e), ir = (e) => fr(e, gr), ar = (e) => fr(e, vr), or = (e) => fr(e, pr), sr = (e) => fr(e, hr), cr = (e) => fr(e, mr), lr = (e) => fr(e, br, !0), ur = (e) => fr(e, yr, !0), dr = (e, t, n) => {
	let r = jn.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, fr = (e, t, n = !1) => {
	let r = Mn.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, pr = (e) => e === "position" || e === "percentage", mr = (e) => e === "image" || e === "url", hr = (e) => e === "length" || e === "size" || e === "bg-size", gr = (e) => e === "length", _r = (e) => e === "number", vr = (e) => e === "family-name", yr = (e) => e === "number" || e === "weight", br = (e) => e === "shadow", xr = /*#__PURE__*/ On(() => {
	let e = An("color"), t = An("font"), n = An("text"), r = An("font-weight"), i = An("tracking"), a = An("leading"), o = An("breakpoint"), s = An("container"), c = An("spacing"), l = An("radius"), u = An("shadow"), d = An("inset-shadow"), f = An("text-shadow"), p = An("drop-shadow"), m = An("blur"), h = An("perspective"), g = An("aspect"), _ = An("ease"), v = An("animate"), y = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], b = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], x = () => [
		...b(),
		V,
		B
	], S = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], C = () => [
		"auto",
		"contain",
		"none"
	], w = () => [
		V,
		B,
		c
	], T = () => [
		zn,
		"full",
		"auto",
		...w()
	], E = () => [
		Bn,
		"none",
		"subgrid",
		V,
		B
	], D = () => [
		"auto",
		{ span: [
			"full",
			Bn,
			V,
			B
		] },
		Bn,
		V,
		B
	], O = () => [
		Bn,
		"auto",
		V,
		B
	], k = () => [
		"auto",
		"min",
		"max",
		"fr",
		V,
		B
	], A = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], j = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], M = () => ["auto", ...w()], N = () => [
		zn,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], P = () => [
		s,
		zn,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...w()
	], F = () => [
		zn,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], I = () => [
		e,
		V,
		B
	], ee = () => [
		...b(),
		or,
		tr,
		{ position: [V, B] }
	], te = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], ne = () => [
		"auto",
		"cover",
		"contain",
		sr,
		Xn,
		{ size: [V, B] }
	], re = () => [
		Vn,
		ir,
		Zn
	], L = () => [
		"",
		"none",
		"full",
		l,
		V,
		B
	], ie = () => [
		"",
		z,
		ir,
		Zn
	], ae = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], oe = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], se = () => [
		z,
		Vn,
		or,
		tr
	], ce = () => [
		"",
		"none",
		m,
		V,
		B
	], le = () => [
		"none",
		z,
		V,
		B
	], ue = () => [
		"none",
		z,
		V,
		B
	], de = () => [
		z,
		V,
		B
	], fe = () => [
		zn,
		"full",
		...w()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [Hn],
			breakpoint: [Hn],
			color: [Un],
			container: [Hn],
			"drop-shadow": [Hn],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [Jn],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [Hn],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [Hn],
			shadow: [Hn],
			spacing: ["px", z],
			text: [Hn],
			"text-shadow": [Hn],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				zn,
				B,
				V,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				V,
				B
			] }],
			"container-named": [Yn],
			columns: [{ columns: [
				z,
				"auto",
				B,
				V,
				s
			] }],
			"break-after": [{ "break-after": y() }],
			"break-before": [{ "break-before": y() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: x() }],
			overflow: [{ overflow: S() }],
			"overflow-x": [{ "overflow-x": S() }],
			"overflow-y": [{ "overflow-y": S() }],
			overscroll: [{ overscroll: C() }],
			"overscroll-x": [{ "overscroll-x": C() }],
			"overscroll-y": [{ "overscroll-y": C() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: T() }],
			"inset-x": [{ "inset-x": T() }],
			"inset-y": [{ "inset-y": T() }],
			start: [{
				"inset-s": T(),
				start: T()
			}],
			end: [{
				"inset-e": T(),
				end: T()
			}],
			"inset-bs": [{ "inset-bs": T() }],
			"inset-be": [{ "inset-be": T() }],
			top: [{ top: T() }],
			right: [{ right: T() }],
			bottom: [{ bottom: T() }],
			left: [{ left: T() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				Bn,
				"auto",
				V,
				B
			] }],
			basis: [{ basis: [
				zn,
				"full",
				"auto",
				s,
				...w()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				z,
				zn,
				"auto",
				"initial",
				"none",
				B
			] }],
			grow: [{ grow: [
				"",
				z,
				V,
				B
			] }],
			shrink: [{ shrink: [
				"",
				z,
				V,
				B
			] }],
			order: [{ order: [
				Bn,
				"first",
				"last",
				"none",
				V,
				B
			] }],
			"grid-cols": [{ "grid-cols": E() }],
			"col-start-end": [{ col: D() }],
			"col-start": [{ "col-start": O() }],
			"col-end": [{ "col-end": O() }],
			"grid-rows": [{ "grid-rows": E() }],
			"row-start-end": [{ row: D() }],
			"row-start": [{ "row-start": O() }],
			"row-end": [{ "row-end": O() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": k() }],
			"auto-rows": [{ "auto-rows": k() }],
			gap: [{ gap: w() }],
			"gap-x": [{ "gap-x": w() }],
			"gap-y": [{ "gap-y": w() }],
			"justify-content": [{ justify: [...A(), "normal"] }],
			"justify-items": [{ "justify-items": [...j(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...j()] }],
			"align-content": [{ content: ["normal", ...A()] }],
			"align-items": [{ items: [...j(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...j(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": A() }],
			"place-items": [{ "place-items": [...j(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...j()] }],
			p: [{ p: w() }],
			px: [{ px: w() }],
			py: [{ py: w() }],
			ps: [{ ps: w() }],
			pe: [{ pe: w() }],
			pbs: [{ pbs: w() }],
			pbe: [{ pbe: w() }],
			pt: [{ pt: w() }],
			pr: [{ pr: w() }],
			pb: [{ pb: w() }],
			pl: [{ pl: w() }],
			m: [{ m: M() }],
			mx: [{ mx: M() }],
			my: [{ my: M() }],
			ms: [{ ms: M() }],
			me: [{ me: M() }],
			mbs: [{ mbs: M() }],
			mbe: [{ mbe: M() }],
			mt: [{ mt: M() }],
			mr: [{ mr: M() }],
			mb: [{ mb: M() }],
			ml: [{ ml: M() }],
			"space-x": [{ "space-x": w() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": w() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: N() }],
			"inline-size": [{ inline: ["auto", ...P()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...P()] }],
			"max-inline-size": [{ "max-inline": ["none", ...P()] }],
			"block-size": [{ block: ["auto", ...F()] }],
			"min-block-size": [{ "min-block": ["auto", ...F()] }],
			"max-block-size": [{ "max-block": ["none", ...F()] }],
			w: [{ w: [
				s,
				"screen",
				...N()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...N()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...N()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...N()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...N()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				"none",
				...N()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				ir,
				Zn
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				ur,
				$n
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				Vn,
				B
			] }],
			"font-family": [{ font: [
				ar,
				er,
				t
			] }],
			"font-features": [{ "font-features": [B] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				V,
				B
			] }],
			"line-clamp": [{ "line-clamp": [
				z,
				"none",
				V,
				Qn
			] }],
			leading: [{ leading: [
				"none",
				a,
				...w()
			] }],
			"list-image": [{ "list-image": [
				"none",
				V,
				B
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				V,
				B
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: I() }],
			"text-color": [{ text: I() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...ae(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				z,
				"from-font",
				"auto",
				V,
				Zn
			] }],
			"text-decoration-color": [{ decoration: I() }],
			"underline-offset": [{ "underline-offset": [
				z,
				"auto",
				V,
				B
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: w() }],
			"tab-size": [{ tab: [
				Bn,
				V,
				B
			] }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				V,
				B
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				V,
				B
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: ee() }],
			"bg-repeat": [{ bg: te() }],
			"bg-size": [{ bg: ne() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						Bn,
						V,
						B
					],
					radial: [
						"",
						V,
						B
					],
					conic: [
						"",
						Bn,
						V,
						B
					]
				},
				cr,
				nr
			] }],
			"bg-color": [{ bg: I() }],
			"gradient-from-pos": [{ from: re() }],
			"gradient-via-pos": [{ via: re() }],
			"gradient-to-pos": [{ to: re() }],
			"gradient-from": [{ from: I() }],
			"gradient-via": [{ via: I() }],
			"gradient-to": [{ to: I() }],
			rounded: [{ rounded: L() }],
			"rounded-s": [{ "rounded-s": L() }],
			"rounded-e": [{ "rounded-e": L() }],
			"rounded-t": [{ "rounded-t": L() }],
			"rounded-r": [{ "rounded-r": L() }],
			"rounded-b": [{ "rounded-b": L() }],
			"rounded-l": [{ "rounded-l": L() }],
			"rounded-ss": [{ "rounded-ss": L() }],
			"rounded-se": [{ "rounded-se": L() }],
			"rounded-ee": [{ "rounded-ee": L() }],
			"rounded-es": [{ "rounded-es": L() }],
			"rounded-tl": [{ "rounded-tl": L() }],
			"rounded-tr": [{ "rounded-tr": L() }],
			"rounded-br": [{ "rounded-br": L() }],
			"rounded-bl": [{ "rounded-bl": L() }],
			"border-w": [{ border: ie() }],
			"border-w-x": [{ "border-x": ie() }],
			"border-w-y": [{ "border-y": ie() }],
			"border-w-s": [{ "border-s": ie() }],
			"border-w-e": [{ "border-e": ie() }],
			"border-w-bs": [{ "border-bs": ie() }],
			"border-w-be": [{ "border-be": ie() }],
			"border-w-t": [{ "border-t": ie() }],
			"border-w-r": [{ "border-r": ie() }],
			"border-w-b": [{ "border-b": ie() }],
			"border-w-l": [{ "border-l": ie() }],
			"divide-x": [{ "divide-x": ie() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": ie() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...ae(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...ae(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: I() }],
			"border-color-x": [{ "border-x": I() }],
			"border-color-y": [{ "border-y": I() }],
			"border-color-s": [{ "border-s": I() }],
			"border-color-e": [{ "border-e": I() }],
			"border-color-bs": [{ "border-bs": I() }],
			"border-color-be": [{ "border-be": I() }],
			"border-color-t": [{ "border-t": I() }],
			"border-color-r": [{ "border-r": I() }],
			"border-color-b": [{ "border-b": I() }],
			"border-color-l": [{ "border-l": I() }],
			"divide-color": [{ divide: I() }],
			"outline-style": [{ outline: [
				...ae(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				z,
				V,
				B
			] }],
			"outline-w": [{ outline: [
				"",
				z,
				ir,
				Zn
			] }],
			"outline-color": [{ outline: I() }],
			shadow: [{ shadow: [
				"",
				"inner",
				"none",
				u,
				lr,
				rr
			] }],
			"shadow-color": [{ shadow: I() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				lr,
				rr
			] }],
			"inset-shadow-color": [{ "inset-shadow": I() }],
			"ring-w": [{ ring: ie() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: I() }],
			"ring-offset-w": [{ "ring-offset": [z, Zn] }],
			"ring-offset-color": [{ "ring-offset": I() }],
			"inset-ring-w": [{ "inset-ring": ie() }],
			"inset-ring-color": [{ "inset-ring": I() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				lr,
				rr
			] }],
			"text-shadow-color": [{ "text-shadow": I() }],
			opacity: [{ opacity: [
				z,
				V,
				B
			] }],
			"mix-blend": [{ "mix-blend": [
				...oe(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": oe() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [z] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": se() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": se() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": I() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": I() }],
			"mask-image-t-from-pos": [{ "mask-t-from": se() }],
			"mask-image-t-to-pos": [{ "mask-t-to": se() }],
			"mask-image-t-from-color": [{ "mask-t-from": I() }],
			"mask-image-t-to-color": [{ "mask-t-to": I() }],
			"mask-image-r-from-pos": [{ "mask-r-from": se() }],
			"mask-image-r-to-pos": [{ "mask-r-to": se() }],
			"mask-image-r-from-color": [{ "mask-r-from": I() }],
			"mask-image-r-to-color": [{ "mask-r-to": I() }],
			"mask-image-b-from-pos": [{ "mask-b-from": se() }],
			"mask-image-b-to-pos": [{ "mask-b-to": se() }],
			"mask-image-b-from-color": [{ "mask-b-from": I() }],
			"mask-image-b-to-color": [{ "mask-b-to": I() }],
			"mask-image-l-from-pos": [{ "mask-l-from": se() }],
			"mask-image-l-to-pos": [{ "mask-l-to": se() }],
			"mask-image-l-from-color": [{ "mask-l-from": I() }],
			"mask-image-l-to-color": [{ "mask-l-to": I() }],
			"mask-image-x-from-pos": [{ "mask-x-from": se() }],
			"mask-image-x-to-pos": [{ "mask-x-to": se() }],
			"mask-image-x-from-color": [{ "mask-x-from": I() }],
			"mask-image-x-to-color": [{ "mask-x-to": I() }],
			"mask-image-y-from-pos": [{ "mask-y-from": se() }],
			"mask-image-y-to-pos": [{ "mask-y-to": se() }],
			"mask-image-y-from-color": [{ "mask-y-from": I() }],
			"mask-image-y-to-color": [{ "mask-y-to": I() }],
			"mask-image-radial": [{ "mask-radial": [V, B] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": se() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": se() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": I() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": I() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [z] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": se() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": se() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": I() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": I() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: ee() }],
			"mask-repeat": [{ mask: te() }],
			"mask-size": [{ mask: ne() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				V,
				B
			] }],
			filter: [{ filter: [
				"",
				"none",
				V,
				B
			] }],
			blur: [{ blur: ce() }],
			brightness: [{ brightness: [
				z,
				V,
				B
			] }],
			contrast: [{ contrast: [
				z,
				V,
				B
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				lr,
				rr
			] }],
			"drop-shadow-color": [{ "drop-shadow": I() }],
			grayscale: [{ grayscale: [
				"",
				z,
				V,
				B
			] }],
			"hue-rotate": [{ "hue-rotate": [
				z,
				V,
				B
			] }],
			invert: [{ invert: [
				"",
				z,
				V,
				B
			] }],
			saturate: [{ saturate: [
				z,
				V,
				B
			] }],
			sepia: [{ sepia: [
				"",
				z,
				V,
				B
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				V,
				B
			] }],
			"backdrop-blur": [{ "backdrop-blur": ce() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				z,
				V,
				B
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				z,
				V,
				B
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				z,
				V,
				B
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				z,
				V,
				B
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				z,
				V,
				B
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				z,
				V,
				B
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				z,
				V,
				B
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				z,
				V,
				B
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": w() }],
			"border-spacing-x": [{ "border-spacing-x": w() }],
			"border-spacing-y": [{ "border-spacing-y": w() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				V,
				B
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				z,
				"initial",
				V,
				B
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				V,
				B
			] }],
			delay: [{ delay: [
				z,
				V,
				B
			] }],
			animate: [{ animate: [
				"none",
				v,
				V,
				B
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				V,
				B
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: le() }],
			"rotate-x": [{ "rotate-x": le() }],
			"rotate-y": [{ "rotate-y": le() }],
			"rotate-z": [{ "rotate-z": le() }],
			scale: [{ scale: ue() }],
			"scale-x": [{ "scale-x": ue() }],
			"scale-y": [{ "scale-y": ue() }],
			"scale-z": [{ "scale-z": ue() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: de() }],
			"skew-x": [{ "skew-x": de() }],
			"skew-y": [{ "skew-y": de() }],
			transform: [{ transform: [
				V,
				B,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: fe() }],
			"translate-x": [{ "translate-x": fe() }],
			"translate-y": [{ "translate-y": fe() }],
			"translate-z": [{ "translate-z": fe() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				Bn,
				V,
				B
			] }],
			accent: [{ accent: I() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: I() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				V,
				B
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scrollbar-thumb-color": [{ "scrollbar-thumb": I() }],
			"scrollbar-track-color": [{ "scrollbar-track": I() }],
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			"scroll-m": [{ "scroll-m": w() }],
			"scroll-mx": [{ "scroll-mx": w() }],
			"scroll-my": [{ "scroll-my": w() }],
			"scroll-ms": [{ "scroll-ms": w() }],
			"scroll-me": [{ "scroll-me": w() }],
			"scroll-mbs": [{ "scroll-mbs": w() }],
			"scroll-mbe": [{ "scroll-mbe": w() }],
			"scroll-mt": [{ "scroll-mt": w() }],
			"scroll-mr": [{ "scroll-mr": w() }],
			"scroll-mb": [{ "scroll-mb": w() }],
			"scroll-ml": [{ "scroll-ml": w() }],
			"scroll-p": [{ "scroll-p": w() }],
			"scroll-px": [{ "scroll-px": w() }],
			"scroll-py": [{ "scroll-py": w() }],
			"scroll-ps": [{ "scroll-ps": w() }],
			"scroll-pe": [{ "scroll-pe": w() }],
			"scroll-pbs": [{ "scroll-pbs": w() }],
			"scroll-pbe": [{ "scroll-pbe": w() }],
			"scroll-pt": [{ "scroll-pt": w() }],
			"scroll-pr": [{ "scroll-pr": w() }],
			"scroll-pb": [{ "scroll-pb": w() }],
			"scroll-pl": [{ "scroll-pl": w() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				V,
				B
			] }],
			fill: [{ fill: ["none", ...I()] }],
			"stroke-w": [{ stroke: [
				z,
				ir,
				Zn,
				Qn
			] }],
			stroke: [{ stroke: ["none", ...I()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": [
				"start",
				"end",
				"right",
				"left"
			],
			"inset-y": [
				"inset-bs",
				"inset-be",
				"top",
				"bottom"
			],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: [
				"ps",
				"pe",
				"pr",
				"pl"
			],
			py: [
				"pbs",
				"pbe",
				"pt",
				"pb"
			],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: [
				"ms",
				"me",
				"mr",
				"ml"
			],
			my: [
				"mbs",
				"mbe",
				"mt",
				"mb"
			],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": [
				"border-w-s",
				"border-w-e",
				"border-w-r",
				"border-w-l"
			],
			"border-w-y": [
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-b"
			],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": [
				"border-color-s",
				"border-color-e",
				"border-color-r",
				"border-color-l"
			],
			"border-color-y": [
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-b"
			],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": [
				"scroll-ms",
				"scroll-me",
				"scroll-mr",
				"scroll-ml"
			],
			"scroll-my": [
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mb"
			],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": [
				"scroll-ps",
				"scroll-pe",
				"scroll-pr",
				"scroll-pl"
			],
			"scroll-py": [
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pb"
			],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
});
//#endregion
//#region Build/Frontend/src/lib/utils.ts
function H(...e) {
	return xr(Kt(e));
}
function Sr(e) {
	if (!Number.isFinite(e) || e <= 0) return "0 B";
	let t = [
		"B",
		"kB",
		"MB",
		"GB"
	], n = Math.min(Math.floor(Math.log(e) / Math.log(1024)), t.length - 1), r = e / 1024 ** n;
	return `${r >= 10 || n === 0 ? Math.round(r) : r.toFixed(1)} ${t[n]}`;
}
function Cr(e) {
	return !Number.isFinite(e) || e < 0 ? "" : e < 1e3 ? `${Math.round(e)} ms` : e < 6e4 ? `${(e / 1e3).toFixed(1)} s` : `${Math.floor(e / 6e4)} min ${Math.round(e % 6e4 / 1e3)} s`;
}
function wr(e) {
	return new Intl.NumberFormat(void 0).format(Math.round(e));
}
function Tr(e) {
	if (!e) return "";
	let t = /* @__PURE__ */ new Date(e * 1e3), n = /* @__PURE__ */ new Date();
	return t.getFullYear() === n.getFullYear() && t.getMonth() === n.getMonth() && t.getDate() === n.getDate() ? t.toLocaleTimeString(void 0, {
		hour: "2-digit",
		minute: "2-digit"
	}) : t.toLocaleString(void 0, {
		day: "2-digit",
		month: "2-digit",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function Er(e) {
	return e.startsWith("typo3_") ? e.slice(6) : e;
}
//#endregion
//#region node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var Dr = Object.defineProperty, Or = (e, t) => Dr(e, "name", {
	value: t,
	configurable: !0
});
function kr(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
Or(kr, "setRef");
function Ar(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = kr(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : kr(e[t], null);
			}
		};
	};
}
Or(Ar, "composeRefs");
function U(...e) {
	return _.useCallback(Ar(...e), e);
}
Or(U, "useComposedRefs");
//#endregion
//#region node_modules/@radix-ui/react-slot/dist/index.mjs
var jr = Object.defineProperty, Mr = (e, t) => jr(e, "name", {
	value: t,
	configurable: !0
});
// @__NO_SIDE_EFFECTS__
function Nr(e) {
	let t = _.forwardRef((t, n) => {
		let { children: r, ...i } = t, a = null, o = !1, s = [];
		Hr(r) && typeof Kr == "function" && (r = Kr(r._payload)), _.Children.forEach(r, (e) => {
			if (Br(e)) {
				o = !0;
				let t = e, n = "child" in t.props ? t.props.child : t.props.children;
				Hr(n) && typeof Kr == "function" && (n = Kr(n._payload)), a = Lr(t, n), s.push(a?.props?.children);
			} else s.push(e);
		}), a ? a = _.cloneElement(a, void 0, s) : !o && _.Children.count(r) === 1 && _.isValidElement(r) && (a = r);
		let c = a ? zr(a) : void 0, l = U(n, c);
		if (!a) {
			if (r || r === 0) throw Error(o ? Gr(e) : Wr(e));
			return r;
		}
		let u = Rr(i, a.props ?? {});
		return a.type !== _.Fragment && (u.ref = n ? l : c), _.cloneElement(a, u);
	});
	return t.displayName = `${e}.Slot`, t;
}
Mr(Nr, "createSlot");
var Pr = /* @__PURE__ */ Nr("Slot"), Fr = Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Ir(e) {
	let t = /* @__PURE__ */ Mr((e) => "child" in e ? e.children(e.child) : e.children, "Slottable");
	return t.displayName = `${e}.Slottable`, t.__radixId = Fr, t;
}
Mr(Ir, "createSlottable");
var Lr = /* @__PURE__ */ Mr((e, t) => {
	if ("child" in e.props) {
		let t = e.props.child;
		return _.isValidElement(t) ? _.cloneElement(t, void 0, e.props.children(t.props.children)) : null;
	}
	return _.isValidElement(t) ? t : null;
}, "getSlottableElementFromSlottable");
function Rr(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
Mr(Rr, "mergeProps");
function zr(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
Mr(zr, "getElementRef");
function Br(e) {
	return _.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Fr;
}
Mr(Br, "isSlottable");
var Vr = Symbol.for("react.lazy");
function Hr(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === Vr && "_payload" in e && Ur(e._payload);
}
Mr(Hr, "isLazyComponent");
function Ur(e) {
	return typeof e == "object" && !!e && "then" in e;
}
Mr(Ur, "isPromiseLike");
var Wr = /* @__PURE__ */ Mr((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), Gr = /* @__PURE__ */ Mr((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), Kr = _.use, qr = Object.defineProperty, Jr = (e, t) => qr(e, "name", {
	value: t,
	configurable: !0
}), W = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let n = /* @__PURE__ */ Nr(`Primitive.${t}`), r = _.forwardRef((e, r) => {
		let { asChild: i, ...a } = e, o = i ? n : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, R.jsx)(o, {
			...a,
			ref: r
		});
	});
	return r.displayName = `Primitive.${t}`, {
		...e,
		[t]: r
	};
}, {});
function Yr(e, t) {
	e && Wt.flushSync(() => e.dispatchEvent(t));
}
Jr(Yr, "dispatchDiscreteCustomEvent");
//#endregion
//#region node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
var Xr = Object.defineProperty, Zr = (e, t) => Xr(e, "name", {
	value: t,
	configurable: !0
}), Qr = Object.freeze({
	position: "absolute",
	border: 0,
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	wordWrap: "normal"
}), $r = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ Zr(function(e, t) {
	return /* @__PURE__ */ (0, R.jsx)(W.span, {
		...e,
		ref: t,
		style: {
			...Qr,
			...e.style
		}
	});
}, "VisuallyHidden")), ei = Object.defineProperty, ti = (e, t) => ei(e, "name", {
	value: t,
	configurable: !0
});
// @__NO_SIDE_EFFECTS__
function ni(e, t) {
	let n = _.createContext(t);
	n.displayName = e + "Context";
	let r = /* @__PURE__ */ ti((e) => {
		let { children: t, ...r } = e, i = _.useMemo(() => r, Object.values(r));
		return /* @__PURE__ */ (0, R.jsx)(n.Provider, {
			value: i,
			children: t
		});
	}, "Provider");
	r.displayName = e + "Provider";
	function i(r, i = {}) {
		let { optional: a = !1 } = i, o = _.useContext(n);
		if (o) return o;
		if (t !== void 0) return t;
		if (!a) throw Error(`\`${r}\` must be used within \`${e}\``);
	}
	return ti(i, "useContext"), [r, i];
}
ti(ni, "createContext");
// @__NO_SIDE_EFFECTS__
function ri(e, t = []) {
	let n = [];
	function r(t, r) {
		let i = _.createContext(r);
		i.displayName = t + "Context";
		let a = n.length;
		n = [...n, r];
		let o = /* @__PURE__ */ ti((t) => {
			let { scope: n, children: r, ...o } = t, s = n?.[e]?.[a] || i, c = _.useMemo(() => o, Object.values(o));
			return /* @__PURE__ */ (0, R.jsx)(s.Provider, {
				value: c,
				children: r
			});
		}, "Provider");
		o.displayName = t + "Provider";
		function s(n, o, s = {}) {
			let { optional: c = !1 } = s, l = o?.[e]?.[a] || i, u = _.useContext(l);
			if (u) return u;
			if (r !== void 0) return r;
			if (!c) throw Error(`\`${n}\` must be used within \`${t}\``);
		}
		return ti(s, "useContext"), [o, s];
	}
	ti(r, "createContext");
	let i = /* @__PURE__ */ ti(() => {
		let t = n.map((e) => _.createContext(e));
		return /* @__PURE__ */ ti(function(n) {
			let r = n?.[e] || t;
			return _.useMemo(() => ({ [`__scope${e}`]: {
				...n,
				[e]: r
			} }), [n, r]);
		}, "useScope");
	}, "createScope");
	return i.scopeName = e, [r, ii(i, ...t)];
}
ti(ri, "createContextScope");
function ii(...e) {
	let t = e[0];
	if (e.length === 1) return t;
	let n = /* @__PURE__ */ ti(() => {
		let n = e.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return /* @__PURE__ */ ti(function(e) {
			let r = n.reduce((t, { useScope: n, scopeName: r }) => {
				let i = n(e)[`__scope${r}`];
				return {
					...t,
					...i
				};
			}, {});
			return _.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
		}, "useComposedScopes");
	}, "createScope");
	return n.scopeName = t.scopeName, n;
}
ti(ii, "composeContextScopes");
//#endregion
//#region node_modules/@radix-ui/react-collection/dist/index.mjs
var ai = Object.defineProperty, oi = (e, t) => ai(e, "name", {
	value: t,
	configurable: !0
});
// @__NO_SIDE_EFFECTS__
function si(e) {
	let t = e + "CollectionProvider", [n, r] = /* @__PURE__ */ ri(t), [i, a] = n(t, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	}), o = /* @__PURE__ */ oi((e) => {
		let { scope: t, children: n } = e, r = _.useRef(null), a = _.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ (0, R.jsx)(i, {
			scope: t,
			itemMap: a,
			collectionRef: r,
			children: n
		});
	}, "CollectionProvider");
	o.displayName = t;
	let s = e + "CollectionSlot", c = /* @__PURE__ */ Nr(s), l = _.forwardRef((e, t) => {
		let { scope: n, children: r } = e, i = U(t, a(s, n).collectionRef);
		return /* @__PURE__ */ (0, R.jsx)(c, {
			ref: i,
			children: r
		});
	});
	l.displayName = s;
	let u = e + "CollectionItemSlot", d = "data-radix-collection-item", f = /* @__PURE__ */ Nr(u), p = _.forwardRef((e, t) => {
		let { scope: n, children: r, ...i } = e, o = _.useRef(null), s = U(t, o), c = a(u, n);
		return _.useEffect(() => (c.itemMap.set(o, {
			ref: o,
			...i
		}), () => void c.itemMap.delete(o))), /* @__PURE__ */ (0, R.jsx)(f, {
			[d]: "",
			ref: s,
			children: r
		});
	});
	p.displayName = u;
	function m(t) {
		let n = a(e + "CollectionConsumer", t);
		return _.useCallback(() => {
			let e = n.collectionRef.current;
			if (!e) return [];
			let t = Array.from(e.querySelectorAll(`[${d}]`));
			return Array.from(n.itemMap.values()).sort((e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current));
		}, [n.collectionRef, n.itemMap]);
	}
	return oi(m, "useCollection"), [
		{
			Provider: o,
			Slot: l,
			ItemSlot: p
		},
		m,
		r
	];
}
oi(si, "createCollection");
var ci = /* @__PURE__ */ new WeakMap(), li = class e extends Map {
	static {
		oi(this, "OrderedDict");
	}
	#e;
	constructor(e) {
		super(e), this.#e = [...super.keys()], ci.set(this, !0);
	}
	set(e, t) {
		return ci.get(this) && (this.has(e) ? this.#e[this.#e.indexOf(e)] = e : this.#e.push(e)), super.set(e, t), this;
	}
	insert(e, t, n) {
		let r = this.has(t), i = this.#e.length, a = fi(e), o = a >= 0 ? a : i + a, s = o < 0 || o >= i ? -1 : o;
		if (s === this.size || r && s === this.size - 1 || s === -1) return this.set(t, n), this;
		let c = this.size + +!r;
		a < 0 && o++;
		let l = [...this.#e], u, d = !1;
		for (let e = o; e < c; e++) if (o === e) {
			let i = l[e];
			l[e] === t && (i = l[e + 1]), r && this.delete(t), u = this.get(i), this.set(t, n);
		} else {
			!d && l[e - 1] === t && (d = !0);
			let n = l[d ? e : e - 1], r = u;
			u = this.get(n), this.delete(n), this.set(n, r);
		}
		return this;
	}
	with(t, n, r) {
		let i = new e(this);
		return i.insert(t, n, r), i;
	}
	before(e) {
		let t = this.#e.indexOf(e) - 1;
		if (!(t < 0)) return this.entryAt(t);
	}
	setBefore(e, t, n) {
		let r = this.#e.indexOf(e);
		return r === -1 ? this : this.insert(r, t, n);
	}
	after(e) {
		let t = this.#e.indexOf(e);
		if (t = t === -1 || t === this.size - 1 ? -1 : t + 1, t !== -1) return this.entryAt(t);
	}
	setAfter(e, t, n) {
		let r = this.#e.indexOf(e);
		return r === -1 ? this : this.insert(r + 1, t, n);
	}
	first() {
		return this.entryAt(0);
	}
	last() {
		return this.entryAt(-1);
	}
	clear() {
		return this.#e = [], super.clear();
	}
	delete(e) {
		let t = super.delete(e);
		return t && this.#e.splice(this.#e.indexOf(e), 1), t;
	}
	deleteAt(e) {
		let t = this.keyAt(e);
		return t !== void 0 && this.delete(t);
	}
	at(e) {
		let t = ui(this.#e, e);
		if (t !== void 0) return this.get(t);
	}
	entryAt(e) {
		let t = ui(this.#e, e);
		if (t !== void 0) return [t, this.get(t)];
	}
	indexOf(e) {
		return this.#e.indexOf(e);
	}
	keyAt(e) {
		return ui(this.#e, e);
	}
	from(e, t) {
		let n = this.indexOf(e);
		if (n === -1) return;
		let r = n + t;
		return r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.at(r);
	}
	keyFrom(e, t) {
		let n = this.indexOf(e);
		if (n === -1) return;
		let r = n + t;
		return r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.keyAt(r);
	}
	find(e, t) {
		let n = 0;
		for (let r of this) {
			if (Reflect.apply(e, t, [
				r,
				n,
				this
			])) return r;
			n++;
		}
	}
	findIndex(e, t) {
		let n = 0;
		for (let r of this) {
			if (Reflect.apply(e, t, [
				r,
				n,
				this
			])) return n;
			n++;
		}
		return -1;
	}
	filter(t, n) {
		let r = [], i = 0;
		for (let e of this) Reflect.apply(t, n, [
			e,
			i,
			this
		]) && r.push(e), i++;
		return new e(r);
	}
	map(t, n) {
		let r = [], i = 0;
		for (let e of this) r.push([e[0], Reflect.apply(t, n, [
			e,
			i,
			this
		])]), i++;
		return new e(r);
	}
	reduce(...e) {
		let [t, n] = e, r = 0, i = n ?? this.at(0);
		for (let n of this) i = r === 0 && e.length === 1 ? n : Reflect.apply(t, this, [
			i,
			n,
			r,
			this
		]), r++;
		return i;
	}
	reduceRight(...e) {
		let [t, n] = e, r = n ?? this.at(-1);
		for (let n = this.size - 1; n >= 0; n--) {
			let i = this.at(n);
			r = n === this.size - 1 && e.length === 1 ? i : Reflect.apply(t, this, [
				r,
				i,
				n,
				this
			]);
		}
		return r;
	}
	toSorted(t) {
		let n = [...this.entries()].sort(t);
		return new e(n);
	}
	toReversed() {
		let t = new e();
		for (let e = this.size - 1; e >= 0; e--) {
			let n = this.keyAt(e), r = this.get(n);
			t.set(n, r);
		}
		return t;
	}
	toSpliced(...t) {
		let n = [...this.entries()];
		return n.splice(...t), new e(n);
	}
	slice(t, n) {
		let r = new e(), i = this.size - 1;
		if (t === void 0) return r;
		t < 0 && (t += this.size), n !== void 0 && n > 0 && (i = n - 1);
		for (let e = t; e <= i; e++) {
			let t = this.keyAt(e), n = this.get(t);
			r.set(t, n);
		}
		return r;
	}
	every(e, t) {
		let n = 0;
		for (let r of this) {
			if (!Reflect.apply(e, t, [
				r,
				n,
				this
			])) return !1;
			n++;
		}
		return !0;
	}
	some(e, t) {
		let n = 0;
		for (let r of this) {
			if (Reflect.apply(e, t, [
				r,
				n,
				this
			])) return !0;
			n++;
		}
		return !1;
	}
};
function ui(e, t) {
	if ("at" in Array.prototype) return Array.prototype.at.call(e, t);
	let n = di(e, t);
	return n === -1 ? void 0 : e[n];
}
oi(ui, "at");
function di(e, t) {
	let n = e.length, r = fi(t), i = r >= 0 ? r : n + r;
	return i < 0 || i >= n ? -1 : i;
}
oi(di, "toSafeIndex");
function fi(e) {
	return e !== e || e === 0 ? 0 : Math.trunc(e);
}
oi(fi, "toSafeInteger");
// @__NO_SIDE_EFFECTS__
function pi(e) {
	let t = e + "CollectionProvider", [n, r] = /* @__PURE__ */ ri(t), [i, a] = n(t, {
		collectionElement: null,
		collectionRef: { current: null },
		collectionRefObject: { current: null },
		itemMap: new li(),
		setItemMap: /* @__PURE__ */ oi(() => void 0, "setItemMap")
	}), o = /* @__PURE__ */ oi(({ state: e, ...t }) => e ? /* @__PURE__ */ (0, R.jsx)(c, {
		...t,
		state: e
	}) : /* @__PURE__ */ (0, R.jsx)(s, { ...t }), "CollectionProvider");
	o.displayName = t;
	let s = /* @__PURE__ */ oi((e) => {
		let t = h();
		return /* @__PURE__ */ (0, R.jsx)(c, {
			...e,
			state: t
		});
	}, "CollectionInit");
	s.displayName = t + "Init";
	let c = /* @__PURE__ */ oi((e) => {
		let { scope: t, children: n, state: r } = e, a = _.useRef(null), [o, s] = _.useState(null), c = U(a, s), [l, u] = r;
		return _.useEffect(() => {
			if (!o) return;
			let e = _i(() => {});
			return e.observe(o, {
				childList: !0,
				subtree: !0
			}), () => {
				e.disconnect();
			};
		}, [o]), /* @__PURE__ */ (0, R.jsx)(i, {
			scope: t,
			itemMap: l,
			setItemMap: u,
			collectionRef: c,
			collectionRefObject: a,
			collectionElement: o,
			children: n
		});
	}, "CollectionProviderImpl");
	c.displayName = t + "Impl";
	let l = e + "CollectionSlot", u = /* @__PURE__ */ Nr(l), d = _.forwardRef((e, t) => {
		let { scope: n, children: r } = e, i = U(t, a(l, n).collectionRef);
		return /* @__PURE__ */ (0, R.jsx)(u, {
			ref: i,
			children: r
		});
	});
	d.displayName = l;
	let f = e + "CollectionItemSlot", p = /* @__PURE__ */ Nr(f), m = _.forwardRef((e, t) => {
		let { scope: n, children: r, ...i } = e, o = _.useRef(null), [s, c] = _.useState(null), l = U(t, o, c), { setItemMap: u } = a(f, n), d = _.useRef(i);
		mi(d.current, i) || (d.current = i);
		let m = d.current;
		return _.useEffect(() => {
			let e = m;
			return u((t) => s ? t.has(s) ? t.set(s, {
				...e,
				element: s
			}).toSorted(gi) : (t.set(s, {
				...e,
				element: s
			}), t.toSorted(gi)) : t), () => {
				u((e) => !s || !e.has(s) ? e : (e.delete(s), new li(e)));
			};
		}, [
			s,
			m,
			u
		]), /* @__PURE__ */ (0, R.jsx)(p, {
			"data-radix-collection-item": "",
			ref: l,
			children: r
		});
	});
	m.displayName = f;
	function h() {
		return _.useState(new li());
	}
	oi(h, "useInitCollection");
	function g(t) {
		let { itemMap: n } = a(e + "CollectionConsumer", t);
		return n;
	}
	return oi(g, "useCollection"), [{
		Provider: o,
		Slot: d,
		ItemSlot: m
	}, {
		createCollectionScope: r,
		useCollection: g,
		useInitCollection: h
	}];
}
oi(pi, "createCollection");
function mi(e, t) {
	if (e === t) return !0;
	if (typeof e != "object" || typeof t != "object" || e == null || t == null) return !1;
	let n = Object.keys(e), r = Object.keys(t);
	if (n.length !== r.length) return !1;
	for (let r of n) if (!Object.prototype.hasOwnProperty.call(t, r) || e[r] !== t[r]) return !1;
	return !0;
}
oi(mi, "shallowEqual");
function hi(e, t) {
	return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
oi(hi, "isElementPreceding");
function gi(e, t) {
	return !e[1].element || !t[1].element ? 0 : hi(e[1].element, t[1].element) ? -1 : 1;
}
oi(gi, "sortByDocumentPosition");
function _i(e) {
	return new MutationObserver((t) => {
		for (let n of t) if (n.type === "childList") {
			e();
			return;
		}
	});
}
oi(_i, "getChildListObserver");
//#endregion
//#region node_modules/@radix-ui/primitive/dist/index.mjs
var vi = Object.defineProperty, yi = (e, t) => vi(e, "name", {
	value: t,
	configurable: !0
}), bi = !!(typeof window < "u" && window.document && window.document.createElement);
function G(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return /* @__PURE__ */ yi(function(r) {
		if (e?.(r), n === !1 || !r || !r.defaultPrevented) return t?.(r);
	}, "handleEvent");
}
yi(G, "composeEventHandlers");
function xi(e) {
	if (!bi) throw Error("Cannot access window outside of the DOM");
	return e?.ownerDocument?.defaultView ?? window;
}
yi(xi, "getOwnerWindow");
function Si(e) {
	if (!bi) throw Error("Cannot access document outside of the DOM");
	return e?.ownerDocument ?? document;
}
yi(Si, "getOwnerDocument");
function Ci(e, t = !1) {
	let { activeElement: n } = Si(e);
	if (!n?.nodeName) return null;
	if (wi(n) && n.contentDocument) return Ci(n.contentDocument.body, t);
	if (t) {
		let e = n.getAttribute("aria-activedescendant");
		if (e) {
			let t = Si(n).getElementById(e);
			if (t) return t;
		}
	}
	return n;
}
yi(Ci, "getActiveElement");
function wi(e) {
	return e.tagName === "IFRAME";
}
yi(wi, "isFrame");
//#endregion
//#region node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var Ti = globalThis?.document ? _.useLayoutEffect : () => {}, Ei = Object.defineProperty, Di = (e, t) => Ei(e, "name", {
	value: t,
	configurable: !0
}), Oi = _.useEffectEvent, ki = _.useInsertionEffect;
function Ai(e) {
	if (typeof Oi == "function") return Oi(e);
	let t = _.useRef(() => {
		throw Error("Cannot call an event handler while rendering.");
	});
	return typeof ki == "function" ? ki(() => {
		t.current = e;
	}) : Ti(() => {
		t.current = e;
	}), _.useMemo(() => ((...e) => t.current?.(...e)), []);
}
Di(Ai, "useEffectEvent");
//#endregion
//#region node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var ji = Object.defineProperty, Mi = (e, t) => ji(e, "name", {
	value: t,
	configurable: !0
}), Ni = _.useInsertionEffect || Ti;
function Pi({ prop: e, defaultProp: t, onChange: n = /* @__PURE__ */ Mi(() => {}, "onChange"), caller: r }) {
	let [i, a, o] = Fi({
		defaultProp: t,
		onChange: n
	}), s = e !== void 0;
	return [s ? e : i, _.useCallback((t) => {
		if (s) {
			let n = Ii(t) ? t(e) : t;
			n !== e && o.current?.(n);
		} else a(t);
	}, [
		s,
		e,
		a,
		o
	])];
}
Mi(Pi, "useControllableState");
function Fi({ defaultProp: e, onChange: t }) {
	let [n, r] = _.useState(e), i = _.useRef(n), a = _.useRef(t);
	return Ni(() => {
		a.current = t;
	}, [t]), _.useEffect(() => {
		i.current !== n && (a.current?.(n), i.current = n);
	}, [n, i]), [
		n,
		r,
		a
	];
}
Mi(Fi, "useUncontrolledState");
function Ii(e) {
	return typeof e == "function";
}
Mi(Ii, "isFunction");
var Li = Symbol("RADIX:SYNC_STATE");
function Ri(e, t, n, r) {
	let { prop: i, defaultProp: a, onChange: o, caller: s } = t, c = i !== void 0, l = Ai(o), u = [{
		...n,
		state: a
	}];
	r && u.push(r);
	let [d, f] = _.useReducer((t, n) => {
		if (n.type === Li) return {
			...t,
			state: n.state
		};
		let r = e(t, n);
		return c && !Object.is(r.state, t.state) && l(r.state), r;
	}, ...u), p = d.state, m = _.useRef(p);
	_.useEffect(() => {
		m.current !== p && (m.current = p, c || l(p));
	}, [
		p,
		m,
		c
	]);
	let h = _.useMemo(() => i === void 0 ? d : {
		...d,
		state: i
	}, [d, i]);
	return _.useEffect(() => {
		c && !Object.is(i, d.state) && f({
			type: Li,
			state: i
		});
	}, [
		i,
		d.state,
		c
	]), [h, f];
}
Mi(Ri, "useControllableStateReducer");
//#endregion
//#region node_modules/@radix-ui/react-presence/dist/index.mjs
var zi = Object.defineProperty, Bi = (e, t) => zi(e, "name", {
	value: t,
	configurable: !0
});
function Vi(e, t) {
	return _.useReducer((e, n) => t[e][n] ?? e, e);
}
Bi(Vi, "useStateMachine");
var Hi = /* @__PURE__ */ Bi((e) => {
	let { present: t, children: n } = e, r = Ui(t), i = typeof n == "function" ? n({ present: r.isPresent }) : _.Children.only(n), a = Gi(r.ref, qi(i));
	return typeof n == "function" || r.isPresent ? _.cloneElement(i, { ref: a }) : null;
}, "Presence");
function Ui(e) {
	let [t, n] = _.useState(), r = _.useRef(null), i = _.useRef(e), a = _.useRef("none"), o = _.useRef(void 0), [s, c] = Vi(e ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	return _.useEffect(() => {
		s === "mounted" ? (a.current = o.current ?? Ki(r.current), o.current = void 0) : a.current = "none";
	}, [s]), Ti(() => {
		let t = r.current, n = i.current;
		if (n !== e) {
			let r = a.current, s = Ki(t);
			e ? (o.current = s, c("MOUNT")) : s === "none" || t?.display === "none" ? c("UNMOUNT") : c(n && r !== s ? "ANIMATION_OUT" : "UNMOUNT"), i.current = e;
		}
	}, [e, c]), Ti(() => {
		if (t) {
			let e, n = t.ownerDocument.defaultView ?? window, o = /* @__PURE__ */ Bi((a) => {
				let o = Ki(r.current).includes(CSS.escape(a.animationName));
				if (a.target === t && o && (c("ANIMATION_END"), !i.current)) {
					let r = t.style.animationFillMode;
					t.style.animationFillMode = "forwards", e = n.setTimeout(() => {
						t.style.animationFillMode === "forwards" && (t.style.animationFillMode = r);
					});
				}
			}, "handleAnimationEnd"), s = /* @__PURE__ */ Bi((e) => {
				e.target === t && (a.current = Ki(r.current));
			}, "handleAnimationStart");
			return t.addEventListener("animationstart", s), t.addEventListener("animationcancel", o), t.addEventListener("animationend", o), () => {
				n.clearTimeout(e), t.removeEventListener("animationstart", s), t.removeEventListener("animationcancel", o), t.removeEventListener("animationend", o);
			};
		}
		c("ANIMATION_END");
	}, [t, c]), {
		isPresent: ["mounted", "unmountSuspended"].includes(s),
		ref: _.useCallback((e) => {
			if (e) {
				let t = getComputedStyle(e);
				r.current = t, o.current = Ki(t);
			} else r.current = null;
			n(e);
		}, [])
	};
}
Bi(Ui, "usePresence");
function Wi(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
Bi(Wi, "setRef");
function Gi(...e) {
	let t = _.useRef(e);
	return t.current = e, _.useCallback((e) => {
		let n = t.current, r = !1, i = n.map((t) => {
			let n = Wi(t, e);
			return !r && typeof n == "function" && (r = !0), n;
		});
		if (r) return () => {
			for (let e = 0; e < i.length; e++) {
				let t = i[e];
				typeof t == "function" ? t() : Wi(n[e], null);
			}
		};
	}, []);
}
Bi(Gi, "useStableComposedRefs");
function Ki(e) {
	return e?.animationName || "none";
}
Bi(Ki, "getAnimationName");
function qi(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
Bi(qi, "getElementRef");
//#endregion
//#region node_modules/@radix-ui/react-id/dist/index.mjs
var Ji = Object.defineProperty, Yi = (e, t) => Ji(e, "name", {
	value: t,
	configurable: !0
}), Xi = _.useId || (() => void 0), Zi = 0;
function Qi(e) {
	let [t, n] = _.useState(Xi());
	return Ti(() => {
		e || n((e) => e ?? String(Zi++));
	}, [e]), e || (t ? `radix-${t}` : "");
}
Yi(Qi, "useId");
//#endregion
//#region node_modules/@radix-ui/react-collapsible/dist/index.mjs
var $i = Object.defineProperty, ea = (e, t) => $i(e, "name", {
	value: t,
	configurable: !0
}), ta = "Collapsible", [na, ra] = /* @__PURE__ */ ri(ta), [ia, aa] = na(ta), oa = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ ea(function(e, t) {
	let { __scopeCollapsible: n, open: r, defaultOpen: i, disabled: a, onOpenChange: o, ...s } = e, [c, l] = Pi({
		prop: r,
		defaultProp: i ?? !1,
		onChange: o,
		caller: ta
	});
	return /* @__PURE__ */ (0, R.jsx)(ia, {
		scope: n,
		disabled: a,
		contentId: Qi(),
		open: c,
		onOpenToggle: _.useCallback(() => l((e) => !e), [l]),
		children: /* @__PURE__ */ (0, R.jsx)(W.div, {
			"data-state": fa(c),
			"data-disabled": a ? "" : void 0,
			...s,
			ref: t
		})
	});
}, "Collapsible")), sa = "CollapsibleTrigger", ca = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ ea(function(e, t) {
	let { __scopeCollapsible: n, ...r } = e, i = aa(sa, n);
	return /* @__PURE__ */ (0, R.jsx)(W.button, {
		type: "button",
		"aria-controls": i.open ? i.contentId : void 0,
		"aria-expanded": i.open || !1,
		"data-state": fa(i.open),
		"data-disabled": i.disabled ? "" : void 0,
		disabled: i.disabled,
		...r,
		ref: t,
		onClick: G(e.onClick, i.onOpenToggle)
	});
}, "CollapsibleTrigger")), la = "CollapsibleContent", ua = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ ea(function(e, t) {
	let { forceMount: n, ...r } = e, i = aa(la, e.__scopeCollapsible);
	return /* @__PURE__ */ (0, R.jsx)(Hi, {
		present: n || i.open,
		children: ({ present: e }) => /* @__PURE__ */ (0, R.jsx)(da, {
			...r,
			ref: t,
			present: e
		})
	});
}, "CollapsibleContent")), da = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ ea(function(e, t) {
	let { __scopeCollapsible: n, present: r, children: i, ...a } = e, o = aa(la, n), [s, c] = _.useState(r), l = _.useRef(null), u = U(t, l), d = _.useRef(0), f = d.current, p = _.useRef(0), m = p.current, h = o.open || s, g = _.useRef(h), v = _.useRef(void 0);
	return _.useEffect(() => {
		let e = requestAnimationFrame(() => g.current = !1);
		return () => cancelAnimationFrame(e);
	}, []), Ti(() => {
		let e = l.current;
		if (e) {
			v.current = v.current || {
				transitionDuration: e.style.transitionDuration,
				animationName: e.style.animationName
			}, e.style.transitionDuration = "0s", e.style.animationName = "none";
			let t = e.getBoundingClientRect();
			d.current = t.height, p.current = t.width, g.current || (e.style.transitionDuration = v.current.transitionDuration, e.style.animationName = v.current.animationName), c(r);
		}
	}, [o.open, r]), /* @__PURE__ */ (0, R.jsx)(W.div, {
		"data-state": fa(o.open),
		"data-disabled": o.disabled ? "" : void 0,
		id: o.contentId,
		hidden: !h,
		...a,
		ref: u,
		style: {
			"--radix-collapsible-content-height": f ? `${f}px` : void 0,
			"--radix-collapsible-content-width": m ? `${m}px` : void 0,
			...e.style
		},
		children: h && i
	});
}, "CollapsibleContentImpl"));
function fa(e) {
	return e ? "open" : "closed";
}
ea(fa, "getState");
var pa = oa, ma = ca, ha = ua, ga = Object.defineProperty, _a = (e, t) => ga(e, "name", {
	value: t,
	configurable: !0
}), va = _.createContext(void 0);
function ya(e) {
	let t = _.useContext(va);
	return e || t || "ltr";
}
_a(ya, "useDirection");
//#endregion
//#region node_modules/@radix-ui/react-accordion/dist/index.mjs
var ba = Object.defineProperty, xa = (e, t) => ba(e, "name", {
	value: t,
	configurable: !0
}), Sa = "Accordion", Ca = [
	"Home",
	"End",
	"ArrowDown",
	"ArrowUp",
	"ArrowLeft",
	"ArrowRight"
], [wa, Ta, Ea] = /* @__PURE__ */ si(Sa), [Da, Oa] = /* @__PURE__ */ ri(Sa, [Ea, ra]), ka = ra(), Aa = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ xa(function(e, t) {
	let { type: n, ...r } = e, i = r, a = r;
	return /* @__PURE__ */ (0, R.jsx)(wa.Provider, {
		scope: e.__scopeAccordion,
		children: n === "multiple" ? /* @__PURE__ */ (0, R.jsx)(Ia, {
			...a,
			ref: t
		}) : /* @__PURE__ */ (0, R.jsx)(Fa, {
			...i,
			ref: t
		})
	});
}, "Accordion")), [ja, Ma] = Da(Sa), [Na, Pa] = Da(Sa, { collapsible: !1 }), Fa = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ xa(function(e, t) {
	let { value: n, defaultValue: r, onValueChange: i = /* @__PURE__ */ xa(() => {}, "onValueChange"), collapsible: a = !1, ...o } = e, [s, c] = Pi({
		prop: n,
		defaultProp: r ?? "",
		onChange: i,
		caller: Sa
	});
	return /* @__PURE__ */ (0, R.jsx)(ja, {
		scope: e.__scopeAccordion,
		value: _.useMemo(() => s ? [s] : [], [s]),
		onItemOpen: c,
		onItemClose: _.useCallback(() => a && c(""), [a, c]),
		children: /* @__PURE__ */ (0, R.jsx)(Na, {
			scope: e.__scopeAccordion,
			collapsible: a,
			children: /* @__PURE__ */ (0, R.jsx)(za, {
				...o,
				ref: t
			})
		})
	});
}, "AccordionImplSingle")), Ia = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ xa(function(e, t) {
	let { value: n, defaultValue: r, onValueChange: i = /* @__PURE__ */ xa(() => {}, "onValueChange"), ...a } = e, [o, s] = Pi({
		prop: n,
		defaultProp: r ?? [],
		onChange: i,
		caller: Sa
	}), c = _.useCallback((e) => s((t = []) => [...t, e]), [s]), l = _.useCallback((e) => s((t = []) => t.filter((t) => t !== e)), [s]);
	return /* @__PURE__ */ (0, R.jsx)(ja, {
		scope: e.__scopeAccordion,
		value: o,
		onItemOpen: c,
		onItemClose: l,
		children: /* @__PURE__ */ (0, R.jsx)(Na, {
			scope: e.__scopeAccordion,
			collapsible: !0,
			children: /* @__PURE__ */ (0, R.jsx)(za, {
				...a,
				ref: t
			})
		})
	});
}, "AccordionImplMultiple")), [La, Ra] = Da(Sa), za = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ xa(function(e, t) {
	let { __scopeAccordion: n, disabled: r, dir: i, orientation: a = "vertical", ...o } = e, s = U(_.useRef(null), t), c = Ta(n), l = ya(i) === "ltr", u = G(e.onKeyDown, (e) => {
		if (!Ca.includes(e.key)) return;
		let t = e.target, n = c().filter((e) => !e.ref.current?.disabled), r = n.findIndex((e) => e.ref.current === t), i = n.length;
		if (r === -1) return;
		e.preventDefault();
		let o = r, s = i - 1, u = /* @__PURE__ */ xa(() => {
			o = r + 1, o > s && (o = 0);
		}, "moveNext"), d = /* @__PURE__ */ xa(() => {
			o = r - 1, o < 0 && (o = s);
		}, "movePrev");
		switch (e.key) {
			case "Home":
				o = 0;
				break;
			case "End":
				o = s;
				break;
			case "ArrowRight":
				a === "horizontal" && (l ? u() : d());
				break;
			case "ArrowDown":
				a === "vertical" && u();
				break;
			case "ArrowLeft":
				a === "horizontal" && (l ? d() : u());
				break;
			case "ArrowUp": a === "vertical" && d();
		}
		n[o % i].ref.current?.focus();
	});
	return /* @__PURE__ */ (0, R.jsx)(La, {
		scope: n,
		disabled: r,
		direction: i,
		orientation: a,
		children: /* @__PURE__ */ (0, R.jsx)(wa.Slot, {
			scope: n,
			children: /* @__PURE__ */ (0, R.jsx)(W.div, {
				...o,
				"data-orientation": a,
				ref: s,
				onKeyDown: r ? void 0 : u
			})
		})
	});
}, "AccordionImpl")), Ba = "AccordionItem", [Va, Ha] = Da(Ba), Ua = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ xa(function(e, t) {
	let { __scopeAccordion: n, value: r, ...i } = e, a = Ra(Ba, n), o = Ma(Ba, n), s = ka(n), c = Qi(), l = r && o.value.includes(r) || !1, u = a.disabled || e.disabled;
	return /* @__PURE__ */ (0, R.jsx)(Va, {
		scope: n,
		open: l,
		disabled: u,
		triggerId: c,
		children: /* @__PURE__ */ (0, R.jsx)(pa, {
			"data-orientation": a.orientation,
			"data-state": Xa(l),
			...s,
			...i,
			ref: t,
			disabled: u,
			open: l,
			onOpenChange: (e) => {
				e ? o.onItemOpen(r) : o.onItemClose(r);
			}
		})
	});
}, "AccordionItem")), Wa = "AccordionHeader", Ga = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ xa(function(e, t) {
	let { __scopeAccordion: n, ...r } = e, i = Ra(Sa, n), a = Ha(Wa, n);
	return /* @__PURE__ */ (0, R.jsx)(W.h3, {
		"data-orientation": i.orientation,
		"data-state": Xa(a.open),
		"data-disabled": a.disabled ? "" : void 0,
		...r,
		ref: t
	});
}, "AccordionHeader")), Ka = "AccordionTrigger", qa = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ xa(function(e, t) {
	let { __scopeAccordion: n, ...r } = e, i = Ra(Sa, n), a = Ha(Ka, n), o = Pa(Ka, n), s = ka(n);
	return /* @__PURE__ */ (0, R.jsx)(wa.ItemSlot, {
		scope: n,
		children: /* @__PURE__ */ (0, R.jsx)(ma, {
			"aria-disabled": a.open && !o.collapsible || void 0,
			"data-orientation": i.orientation,
			id: a.triggerId,
			...s,
			...r,
			ref: t
		})
	});
}, "AccordionTrigger")), Ja = "AccordionContent", Ya = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ xa(function(e, t) {
	let { __scopeAccordion: n, ...r } = e, i = Ra(Sa, n), a = Ha(Ja, n), o = ka(n);
	return /* @__PURE__ */ (0, R.jsx)(ha, {
		role: "region",
		"aria-labelledby": a.triggerId,
		"data-orientation": i.orientation,
		...o,
		...r,
		ref: t,
		style: {
			"--radix-accordion-content-height": "var(--radix-collapsible-content-height)",
			"--radix-accordion-content-width": "var(--radix-collapsible-content-width)",
			...e.style
		}
	});
}, "AccordionContent"));
function Xa(e) {
	return e ? "open" : "closed";
}
xa(Xa, "getState");
var Za = Aa, Qa = Ua, $a = Ga, eo = qa, to = Ya, no = Object.defineProperty, ro = (e, t) => no(e, "name", {
	value: t,
	configurable: !0
});
function io(e) {
	let t = _.useRef(e);
	return _.useEffect(() => {
		t.current = e;
	}), _.useMemo(() => ((...e) => t.current?.(...e)), []);
}
ro(io, "useCallbackRef");
//#endregion
//#region node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var ao = Object.defineProperty, oo = (e, t) => ao(e, "name", {
	value: t,
	configurable: !0
}), so = "dismissableLayer.update", co = "dismissableLayer.pointerDownOutside", lo = "dismissableLayer.focusOutside", uo, fo = _.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set(),
	dismissableSurfaces: /* @__PURE__ */ new Set()
}), po = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ oo(function(e, t) {
	let { disableOutsidePointerEvents: n = !1, deferPointerDownOutside: r = !1, onEscapeKeyDown: i, onPointerDownOutside: a, onFocusOutside: o, onInteractOutside: s, onDismiss: c, ...l } = e, u = _.useContext(fo), [d, f] = _.useState(null), p = d?.ownerDocument ?? globalThis?.document, [, m] = _.useState({}), h = U(t, f), g = Array.from(u.layers), [v] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), y = v ? g.indexOf(v) : -1, b = d ? g.indexOf(d) : -1, x = u.layersWithOutsidePointerEventsDisabled.size > 0, S = b >= y, C = _.useRef(!1), w = go((e) => {
		a?.(e), s?.(e), e.defaultPrevented || c?.();
	}, {
		ownerDocument: p,
		deferPointerDownOutside: r,
		isDeferredPointerDownOutsideRef: C,
		dismissableSurfaces: u.dismissableSurfaces,
		shouldHandlePointerDownOutside: _.useCallback((e) => {
			if (!(e instanceof Node)) return !1;
			let t = [...u.branches].some((t) => t.contains(e));
			return S && !t;
		}, [u.branches, S])
	}), T = _o((e) => {
		if (r && C.current) return;
		let t = e.target;
		[...u.branches].some((e) => e.contains(t)) || (o?.(e), s?.(e), e.defaultPrevented || c?.());
	}, p), E = d ? b === g.length - 1 : !1, D = io((e) => {
		e.key === "Escape" && (i?.(e), !e.defaultPrevented && c && (e.preventDefault(), c()));
	});
	return _.useEffect(() => {
		if (E) return p.addEventListener("keydown", D, { capture: !0 }), () => p.removeEventListener("keydown", D, { capture: !0 });
	}, [
		p,
		E,
		D
	]), _.useEffect(() => {
		if (d) return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (uo = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(d)), u.layers.add(d), vo(), () => {
			n && (u.layersWithOutsidePointerEventsDisabled.delete(d), u.layersWithOutsidePointerEventsDisabled.size === 0 && (p.body.style.pointerEvents = uo));
		};
	}, [
		d,
		p,
		n,
		u
	]), _.useEffect(() => () => {
		d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), vo());
	}, [d, u]), _.useEffect(() => {
		let e = /* @__PURE__ */ oo(() => m({}), "handleUpdate");
		return document.addEventListener(so, e), () => document.removeEventListener(so, e);
	}, []), /* @__PURE__ */ (0, R.jsx)(W.div, {
		...l,
		ref: h,
		style: {
			pointerEvents: x ? S ? "auto" : "none" : void 0,
			...e.style
		},
		onFocusCapture: G(e.onFocusCapture, T.onFocusCapture),
		onBlurCapture: G(e.onBlurCapture, T.onBlurCapture),
		onPointerDownCapture: G(e.onPointerDownCapture, w.onPointerDownCapture)
	});
}, "DismissableLayer"));
function mo() {
	let e = _.useContext(fo), [t, n] = _.useState(null);
	return _.useEffect(() => {
		if (t) return e.dismissableSurfaces.add(t), () => {
			e.dismissableSurfaces.delete(t);
		};
	}, [t, e.dismissableSurfaces]), n;
}
oo(mo, "useDismissableLayerSurface");
var ho = /* @__PURE__ */ oo(() => !0, "IS_TRUE");
function go(e, t) {
	let { ownerDocument: n = globalThis?.document, deferPointerDownOutside: r = !1, isDeferredPointerDownOutsideRef: i, dismissableSurfaces: a, shouldHandlePointerDownOutside: o = ho } = t, s = io(e), c = _.useRef(!1), l = _.useRef(!1), u = _.useRef(/* @__PURE__ */ new Map()), d = _.useRef(() => {});
	return _.useEffect(() => {
		function e() {
			l.current = !1, i.current = !1, u.current.clear();
		}
		oo(e, "resetOutsideInteraction");
		function t() {
			return Array.from(u.current.values()).some(Boolean);
		}
		oo(t, "isOutsideInteractionIntercepted");
		function f(e) {
			if (!l.current) return;
			let t = e.target;
			t instanceof Node && [...a].some((e) => e.contains(t)) || u.current.set(e.type, !0), e.type === "click" && window.setTimeout(() => {
				l.current && d.current();
			}, 0);
		}
		oo(f, "handleInteractionCapture");
		function p(e) {
			l.current && u.current.set(e.type, !1);
		}
		oo(p, "handleInteractionBubble");
		let m = /* @__PURE__ */ oo((a) => {
			if (a.target && !c.current) {
				let f = function() {
					n.removeEventListener("click", d.current);
					let r = t();
					e(), r || yo(co, s, p, { discrete: !0 });
				};
				if (oo(f, "handleAndDispatchPointerDownOutsideEvent"), !o(a.target)) {
					n.removeEventListener("click", d.current), e(), c.current = !1;
					return;
				}
				let p = { originalEvent: a };
				l.current = !0, i.current = r && a.button === 0, u.current.clear(), !r || a.button !== 0 ? f() : (n.removeEventListener("click", d.current), d.current = f, n.addEventListener("click", d.current, { once: !0 }));
			} else n.removeEventListener("click", d.current), e();
			c.current = !1;
		}, "handlePointerDown"), h = [
			"pointerup",
			"mousedown",
			"mouseup",
			"touchstart",
			"touchend",
			"click"
		];
		for (let e of h) n.addEventListener(e, f, !0), n.addEventListener(e, p);
		let g = window.setTimeout(() => {
			n.addEventListener("pointerdown", m);
		}, 0);
		return () => {
			window.clearTimeout(g), n.removeEventListener("pointerdown", m), n.removeEventListener("click", d.current);
			for (let e of h) n.removeEventListener(e, f, !0), n.removeEventListener(e, p);
		};
	}, [
		n,
		s,
		r,
		i,
		a,
		o
	]), { onPointerDownCapture: /* @__PURE__ */ oo(() => c.current = !0, "onPointerDownCapture") };
}
oo(go, "usePointerDownOutside");
function _o(e, t = globalThis?.document) {
	let n = io(e), r = _.useRef(!1);
	return _.useEffect(() => {
		let e = /* @__PURE__ */ oo((e) => {
			e.target && !r.current && yo(lo, n, { originalEvent: e }, { discrete: !1 });
		}, "handleFocus");
		return t.addEventListener("focusin", e), () => t.removeEventListener("focusin", e);
	}, [t, n]), {
		onFocusCapture: /* @__PURE__ */ oo(() => r.current = !0, "onFocusCapture"),
		onBlurCapture: /* @__PURE__ */ oo(() => r.current = !1, "onBlurCapture")
	};
}
oo(_o, "useFocusOutside");
function vo() {
	let e = new CustomEvent(so);
	document.dispatchEvent(e);
}
oo(vo, "dispatchUpdate");
function yo(e, t, n, { discrete: r }) {
	let i = n.originalEvent.target, a = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && i.addEventListener(e, t, { once: !0 }), r ? Yr(i, a) : i.dispatchEvent(a);
}
oo(yo, "handleAndDispatchCustomEvent");
//#endregion
//#region node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var bo = Object.defineProperty, xo = (e, t) => bo(e, "name", {
	value: t,
	configurable: !0
}), So = "focusScope.autoFocusOnMount", Co = "focusScope.autoFocusOnUnmount", wo = {
	bubbles: !1,
	cancelable: !0
}, To = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ xo(function(e, t) {
	let { loop: n = !1, trapped: r = !1, onMountAutoFocus: i, onUnmountAutoFocus: a, ...o } = e, [s, c] = _.useState(null), l = io(i), u = io(a), d = _.useRef(null), f = U(t, c), p = _.useRef({
		paused: !1,
		pause() {
			this.paused = !0;
		},
		resume() {
			this.paused = !1;
		}
	}).current;
	_.useEffect(() => {
		if (r) {
			let e = function(e) {
				if (p.paused || !s) return;
				let t = e.target;
				s.contains(t) ? d.current = t : Mo(d.current, { select: !0 });
			}, t = function(e) {
				if (p.paused || !s) return;
				let t = e.relatedTarget;
				t !== null && (s.contains(t) || Mo(d.current, { select: !0 }));
			}, n = function(e) {
				if (document.activeElement === document.body) for (let t of e) t.removedNodes.length > 0 && Mo(s);
			};
			xo(e, "handleFocusIn"), xo(t, "handleFocusOut"), xo(n, "handleMutations"), document.addEventListener("focusin", e), document.addEventListener("focusout", t);
			let r = new MutationObserver(n);
			return s && r.observe(s, {
				childList: !0,
				subtree: !0
			}), () => {
				document.removeEventListener("focusin", e), document.removeEventListener("focusout", t), r.disconnect();
			};
		}
	}, [
		r,
		s,
		p.paused
	]), _.useEffect(() => {
		if (s) {
			No.add(p);
			let e = document.activeElement;
			if (!s.contains(e)) {
				let t = new CustomEvent(So, wo);
				s.addEventListener(So, l), s.dispatchEvent(t), t.defaultPrevented || (Eo(Io(Oo(s)), { select: !0 }), document.activeElement === e && Mo(s));
			}
			return () => {
				s.removeEventListener(So, l), setTimeout(() => {
					let t = new CustomEvent(Co, wo);
					s.addEventListener(Co, u), s.dispatchEvent(t), t.defaultPrevented || Mo(e ?? document.body, { select: !0 }), s.removeEventListener(Co, u), No.remove(p);
				}, 0);
			};
		}
	}, [
		s,
		l,
		u,
		p
	]);
	let m = _.useCallback((e) => {
		if (!n && !r || p.paused) return;
		let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, i = document.activeElement;
		if (t && i) {
			let t = e.currentTarget, [r, a] = Do(t);
			r && a ? !e.shiftKey && i === a ? (e.preventDefault(), n && Mo(r, { select: !0 })) : e.shiftKey && i === r && (e.preventDefault(), n && Mo(a, { select: !0 })) : i === t && e.preventDefault();
		}
	}, [
		n,
		r,
		p.paused
	]);
	return /* @__PURE__ */ (0, R.jsx)(W.div, {
		tabIndex: -1,
		...o,
		ref: f,
		onKeyDown: m
	});
}, "FocusScope"));
function Eo(e, { select: t = !1 } = {}) {
	let n = document.activeElement;
	for (let r of e) if (Mo(r, { select: t }), document.activeElement !== n) return;
}
xo(Eo, "focusFirst");
function Do(e) {
	let t = Oo(e);
	return [ko(t, e), ko(t.reverse(), e)];
}
xo(Do, "getTabbableEdges");
function Oo(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: /* @__PURE__ */ xo((e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	}, "acceptNode") });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
xo(Oo, "getTabbableCandidates");
function ko(e, t) {
	let n = typeof t.checkVisibility == "function" && t.checkVisibility({ checkVisibilityCSS: !0 });
	for (let r of e) if (!(n ? !r.checkVisibility({ checkVisibilityCSS: !0 }) : Ao(r, { upTo: t }))) return r;
}
xo(ko, "findVisible");
function Ao(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
xo(Ao, "isHidden");
function jo(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
xo(jo, "isSelectableInput");
function Mo(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && jo(e) && t && e.select();
	}
}
xo(Mo, "focus");
var No = Po();
function Po() {
	let e = [];
	return {
		add(t) {
			let n = e[0];
			t !== n && n?.pause(), e = Fo(e, t), e.unshift(t);
		},
		remove(t) {
			e = Fo(e, t), e[0]?.resume();
		}
	};
}
xo(Po, "createFocusScopesStack");
function Fo(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
xo(Fo, "arrayRemove");
function Io(e) {
	return e.filter((e) => e.tagName !== "A");
}
xo(Io, "removeLinks");
//#endregion
//#region node_modules/@radix-ui/react-portal/dist/index.mjs
var Lo = Object.defineProperty, Ro = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ ((e, t) => Lo(e, "name", {
	value: t,
	configurable: !0
}))(function(e, t) {
	let { container: n, ...r } = e, [i, a] = _.useState(!1);
	Ti(() => a(!0), []);
	let o = n || i && globalThis?.document?.body;
	return o ? Wt.createPortal(/* @__PURE__ */ (0, R.jsx)(W.div, {
		...r,
		ref: t
	}), o) : null;
}, "Portal")), zo = Object.defineProperty, Bo = (e, t) => zo(e, "name", {
	value: t,
	configurable: !0
}), Vo = 0, Ho = null;
function Uo(e) {
	return Wo(), e.children;
}
Bo(Uo, "FocusGuards");
function Wo() {
	_.useEffect(() => {
		Ho ||= {
			start: Go(),
			end: Go()
		};
		let { start: e, end: t } = Ho;
		return document.body.firstElementChild !== e && document.body.insertAdjacentElement("afterbegin", e), document.body.lastElementChild !== t && document.body.insertAdjacentElement("beforeend", t), Vo++, () => {
			Vo === 1 && (Ho?.start.remove(), Ho?.end.remove(), Ho = null), Vo = Math.max(0, Vo - 1);
		};
	}, []);
}
Bo(Wo, "useFocusGuards");
function Go() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
Bo(Go, "createFocusGuard");
//#endregion
//#region node_modules/tslib/tslib.es6.mjs
var Ko = function() {
	return Ko = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, Ko.apply(this, arguments);
};
function qo(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function Jo(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
//#endregion
//#region node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var Yo = "right-scroll-bar-position", Xo = "width-before-scroll-bar", Zo = "with-scroll-bars-hidden", Qo = "--removed-body-scroll-bar-size";
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/assignRef.js
function $o(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useRef.js
function es(e, t) {
	var n = (0, _.useState)(function() {
		return {
			value: e,
			callback: t,
			facade: {
				get current() {
					return n.value;
				},
				set current(e) {
					var t = n.value;
					t !== e && (n.value = e, n.callback(e, t));
				}
			}
		};
	})[0];
	return n.callback = t, n.facade;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useMergeRef.js
var ts = typeof window < "u" ? _.useLayoutEffect : _.useEffect, ns = /* @__PURE__ */ new WeakMap();
function rs(e, t) {
	var n = es(t || null, function(t) {
		return e.forEach(function(e) {
			return $o(e, t);
		});
	});
	return ts(function() {
		var t = ns.get(n);
		if (t) {
			var r = new Set(t), i = new Set(e), a = n.current;
			r.forEach(function(e) {
				i.has(e) || $o(e, null);
			}), i.forEach(function(e) {
				r.has(e) || $o(e, a);
			});
		}
		ns.set(n, e);
	}, [e]), n;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/medium.js
function is(e) {
	return e;
}
function as(e, t) {
	t === void 0 && (t = is);
	var n = [], r = !1;
	return {
		read: function() {
			if (r) throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
			return n.length ? n[n.length - 1] : e;
		},
		useMedium: function(e) {
			var i = t(e, r);
			return n.push(i), function() {
				n = n.filter(function(e) {
					return e !== i;
				});
			};
		},
		assignSyncMedium: function(e) {
			for (r = !0; n.length;) {
				var t = n;
				n = [], t.forEach(e);
			}
			n = {
				push: function(t) {
					return e(t);
				},
				filter: function() {
					return n;
				}
			};
		},
		assignMedium: function(e) {
			r = !0;
			var t = [];
			if (n.length) {
				var i = n;
				n = [], i.forEach(e), t = n;
			}
			var a = function() {
				var n = t;
				t = [], n.forEach(e);
			}, o = function() {
				return Promise.resolve().then(a);
			};
			o(), n = {
				push: function(e) {
					t.push(e), o();
				},
				filter: function(e) {
					return t = t.filter(e), n;
				}
			};
		}
	};
}
function os(e) {
	e === void 0 && (e = {});
	var t = as(null);
	return t.options = Ko({
		async: !0,
		ssr: !1
	}, e), t;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/exports.js
var ss = function(e) {
	var t = e.sideCar, n = qo(e, ["sideCar"]);
	if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var r = t.read();
	if (!r) throw Error("Sidecar medium not found");
	return _.createElement(r, Ko({}, n));
};
ss.isSideCarExport = !0;
function cs(e, t) {
	return e.useMedium(t), ss;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/medium.js
var ls = os(), us = function() {}, ds = _.forwardRef(function(e, t) {
	var n = _.useRef(null), r = _.useState({
		onScrollCapture: us,
		onWheelCapture: us,
		onTouchMoveCapture: us
	}), i = r[0], a = r[1], o = e.forwardProps, s = e.children, c = e.className, l = e.removeScrollBar, u = e.enabled, d = e.shards, f = e.sideCar, p = e.noRelative, m = e.noIsolation, h = e.inert, g = e.allowPinchZoom, v = e.as, y = v === void 0 ? "div" : v, b = e.gapMode, x = qo(e, [
		"forwardProps",
		"children",
		"className",
		"removeScrollBar",
		"enabled",
		"shards",
		"sideCar",
		"noRelative",
		"noIsolation",
		"inert",
		"allowPinchZoom",
		"as",
		"gapMode"
	]), S = f, C = rs([n, t]), w = Ko(Ko({}, x), i);
	return _.createElement(_.Fragment, null, u && _.createElement(S, {
		sideCar: ls,
		removeScrollBar: l,
		shards: d,
		noRelative: p,
		noIsolation: m,
		inert: h,
		setCallbacks: a,
		allowPinchZoom: !!g,
		lockRef: n,
		gapMode: b
	}), o ? _.cloneElement(_.Children.only(s), Ko(Ko({}, w), { ref: C })) : _.createElement(y, Ko({}, w, {
		className: c,
		ref: C
	}), s));
});
ds.defaultProps = {
	enabled: !0,
	removeScrollBar: !0,
	inert: !1
}, ds.classNames = {
	fullWidth: Xo,
	zeroRight: Yo
};
//#endregion
//#region node_modules/get-nonce/dist/es2015/index.js
var fs = function() {
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
//#endregion
//#region node_modules/react-style-singleton/dist/es2015/singleton.js
function ps() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = fs();
	return t && e.setAttribute("nonce", t), e;
}
function ms(e, t) {
	e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function hs(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var gs = function() {
	var e = 0, t = null;
	return {
		add: function(n) {
			e == 0 && (t = ps()) && (ms(t, n), hs(t)), e++;
		},
		remove: function() {
			e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
		}
	};
}, _s = function() {
	var e = gs();
	return function(t, n) {
		_.useEffect(function() {
			return e.add(t), function() {
				e.remove();
			};
		}, [t && n]);
	};
}, vs = function() {
	var e = _s();
	return function(t) {
		var n = t.styles, r = t.dynamic;
		return e(n, r), null;
	};
}, ys = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, bs = function(e) {
	return parseInt(e || "", 10) || 0;
}, xs = function(e) {
	var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], i = t[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		bs(n),
		bs(r),
		bs(i)
	];
}, Ss = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return ys;
	var t = xs(e), n = document.documentElement.clientWidth, r = window.innerWidth;
	return {
		left: t[0],
		top: t[1],
		right: t[2],
		gap: Math.max(0, r - n + t[2] - t[0])
	};
}, Cs = vs(), ws = "data-scroll-locked", Ts = function(e, t, n, r) {
	var i = e.left, a = e.top, o = e.right, s = e.gap;
	return n === void 0 && (n = "margin"), `
  .${Zo} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${ws}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[
		t && `position: relative ${r};`,
		n === "margin" && `
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,
		n === "padding" && `padding-right: ${s}px ${r};`
	].filter(Boolean).join("")}
  }
  
  .${Yo} {
    right: ${s}px ${r};
  }
  
  .${Xo} {
    margin-right: ${s}px ${r};
  }
  
  .${Yo} .${Yo} {
    right: 0 ${r};
  }
  
  .${Xo} .${Xo} {
    margin-right: 0 ${r};
  }
  
  body[${ws}] {
    ${Qo}: ${s}px;
  }
`;
}, Es = function() {
	var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(e) ? e : 0;
}, Ds = function() {
	_.useEffect(function() {
		return document.body.setAttribute(ws, (Es() + 1).toString()), function() {
			var e = Es() - 1;
			e <= 0 ? document.body.removeAttribute(ws) : document.body.setAttribute(ws, e.toString());
		};
	}, []);
}, Os = function(e) {
	var t = e.noRelative, n = e.noImportant, r = e.gapMode, i = r === void 0 ? "margin" : r;
	Ds();
	var a = _.useMemo(function() {
		return Ss(i);
	}, [i]);
	return _.createElement(Cs, { styles: Ts(a, !t, i, n ? "" : "!important") });
}, ks = !1;
if (typeof window < "u") try {
	var As = Object.defineProperty({}, "passive", { get: function() {
		return ks = !0, !0;
	} });
	window.addEventListener("test", As, As), window.removeEventListener("test", As, As);
} catch {
	ks = !1;
}
var js = ks ? { passive: !1 } : !1, Ms = function(e) {
	return e.tagName === "TEXTAREA";
}, Ns = function(e, t) {
	if (!(e instanceof Element)) return !1;
	var n = window.getComputedStyle(e);
	return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !Ms(e) && n[t] === "visible");
}, Ps = function(e) {
	return Ns(e, "overflowY");
}, Fs = function(e) {
	return Ns(e, "overflowX");
}, Is = function(e, t) {
	var n = t.ownerDocument, r = t;
	do {
		if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host), zs(e, r)) {
			var i = Bs(e, r);
			if (i[1] > i[2]) return !0;
		}
		r = r.parentNode;
	} while (r && r !== n.body);
	return !1;
}, Ls = function(e) {
	return [
		e.scrollTop,
		e.scrollHeight,
		e.clientHeight
	];
}, Rs = function(e) {
	return [
		e.scrollLeft,
		e.scrollWidth,
		e.clientWidth
	];
}, zs = function(e, t) {
	return e === "v" ? Ps(t) : Fs(t);
}, Bs = function(e, t) {
	return e === "v" ? Ls(t) : Rs(t);
}, Vs = function(e, t) {
	return e === "h" && t === "rtl" ? -1 : 1;
}, Hs = function(e, t, n, r, i) {
	var a = Vs(e, window.getComputedStyle(t).direction), o = a * r, s = n.target, c = t.contains(s), l = !1, u = o > 0, d = 0, f = 0;
	do {
		if (!s) break;
		var p = Bs(e, s), m = p[0], h = p[1] - p[2] - a * m;
		(m || h) && zs(e, s) && (d += h, f += m);
		var g = s.parentNode;
		s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
	} while (!c && s !== document.body || c && (t.contains(s) || t === s));
	return (u && (i && Math.abs(d) < 1 || !i && o > d) || !u && (i && Math.abs(f) < 1 || !i && -o > f)) && (l = !0), l;
}, Us = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Ws = function(e) {
	return [e.deltaX, e.deltaY];
}, Gs = function(e) {
	return e && "current" in e ? e.current : e;
}, Ks = function(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}, qs = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, Js = 0, Ys = [];
function Xs(e) {
	var t = _.useRef([]), n = _.useRef([0, 0]), r = _.useRef(), i = _.useState(Js++)[0], a = _.useState(vs)[0], o = _.useRef(e);
	_.useEffect(function() {
		o.current = e;
	}, [e]), _.useEffect(function() {
		if (e.inert) {
			document.body.classList.add(`block-interactivity-${i}`);
			var t = Jo([e.lockRef.current], (e.shards || []).map(Gs), !0).filter(Boolean);
			return t.forEach(function(e) {
				return e.classList.add(`allow-interactivity-${i}`);
			}), function() {
				document.body.classList.remove(`block-interactivity-${i}`), t.forEach(function(e) {
					return e.classList.remove(`allow-interactivity-${i}`);
				});
			};
		}
	}, [
		e.inert,
		e.lockRef.current,
		e.shards
	]);
	var s = _.useCallback(function(e, t) {
		if ("touches" in e && e.touches.length === 2 || e.type === "wheel" && e.ctrlKey) return !o.current.allowPinchZoom;
		var i = Us(e), a = n.current, s = "deltaX" in e ? e.deltaX : a[0] - i[0], c = "deltaY" in e ? e.deltaY : a[1] - i[1], l, u = e.target, d = Math.abs(s) > Math.abs(c) ? "h" : "v";
		if ("touches" in e && d === "h" && u.type === "range") return !1;
		var f = window.getSelection(), p = f && f.anchorNode;
		if (p && (p === u || p.contains(u))) return !1;
		var m = Is(d, u);
		if (!m) return !0;
		if (m ? l = d : (l = d === "v" ? "h" : "v", m = Is(d, u)), !m) return !1;
		if (!r.current && "changedTouches" in e && (s || c) && (r.current = l), !l) return !0;
		var h = r.current || l;
		return Hs(h, t, e, h === "h" ? s : c, !0);
	}, []), c = _.useCallback(function(e) {
		var n = e;
		if (Ys.length && Ys[Ys.length - 1] === a) {
			var r = "deltaY" in n ? Ws(n) : Us(n), i = t.current.filter(function(e) {
				return e.name === n.type && (e.target === n.target || n.target === e.shadowParent) && Ks(e.delta, r);
			})[0];
			if (i && i.should) {
				n.cancelable && n.preventDefault();
				return;
			}
			if (!i) {
				var c = (o.current.shards || []).map(Gs).filter(Boolean).filter(function(e) {
					return e.contains(n.target);
				});
				(c.length > 0 ? s(n, c[0]) : !o.current.noIsolation) && n.cancelable && n.preventDefault();
			}
		}
	}, []), l = _.useCallback(function(e, n, r, i) {
		var a = {
			name: e,
			delta: n,
			target: r,
			should: i,
			shadowParent: Zs(r)
		};
		t.current.push(a), setTimeout(function() {
			t.current = t.current.filter(function(e) {
				return e !== a;
			});
		}, 1);
	}, []), u = _.useCallback(function(e) {
		n.current = Us(e), r.current = void 0;
	}, []), d = _.useCallback(function(t) {
		l(t.type, Ws(t), t.target, s(t, e.lockRef.current));
	}, []), f = _.useCallback(function(t) {
		l(t.type, Us(t), t.target, s(t, e.lockRef.current));
	}, []);
	_.useEffect(function() {
		return Ys.push(a), e.setCallbacks({
			onScrollCapture: d,
			onWheelCapture: d,
			onTouchMoveCapture: f
		}), document.addEventListener("wheel", c, js), document.addEventListener("touchmove", c, js), document.addEventListener("touchstart", u, js), function() {
			Ys = Ys.filter(function(e) {
				return e !== a;
			}), document.removeEventListener("wheel", c, js), document.removeEventListener("touchmove", c, js), document.removeEventListener("touchstart", u, js);
		};
	}, []);
	var p = e.removeScrollBar, m = e.inert;
	return _.createElement(_.Fragment, null, m ? _.createElement(a, { styles: qs(i) }) : null, p ? _.createElement(Os, {
		noRelative: e.noRelative,
		gapMode: e.gapMode
	}) : null);
}
function Zs(e) {
	for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
	return t;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/sidecar.js
var Qs = cs(ls, Xs), $s = _.forwardRef(function(e, t) {
	return _.createElement(ds, Ko({}, e, {
		ref: t,
		sideCar: Qs
	}));
});
$s.classNames = ds.classNames;
//#endregion
//#region node_modules/aria-hidden/dist/es2015/index.js
var ec = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, tc = /* @__PURE__ */ new WeakMap(), nc = /* @__PURE__ */ new WeakMap(), rc = {}, ic = 0, ac = function(e) {
	return e && (e.host || ac(e.parentNode));
}, oc = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = ac(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, sc = function(e, t, n, r) {
	var i = oc(t, Array.isArray(e) ? e : [e]);
	rc[n] || (rc[n] = /* @__PURE__ */ new WeakMap());
	var a = rc[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		e && !s.has(e) && (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		e && !c.has(e) && Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (tc.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				tc.set(e, c), a.set(e, l), o.push(e), c === 1 && i && nc.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), ic++, function() {
		o.forEach(function(e) {
			var t = tc.get(e) - 1, i = a.get(e) - 1;
			tc.set(e, t), a.set(e, i), t || (nc.has(e) || e.removeAttribute(r), nc.delete(e)), i || e.removeAttribute(n);
		}), ic--, ic || (tc = /* @__PURE__ */ new WeakMap(), tc = /* @__PURE__ */ new WeakMap(), nc = /* @__PURE__ */ new WeakMap(), rc = {});
	};
}, cc = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || ec(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), sc(r, i, n, "aria-hidden")) : function() {
		return null;
	};
}, lc = Object.defineProperty, uc = (e, t) => lc(e, "name", {
	value: t,
	configurable: !0
}), dc = "Dialog", [fc, pc] = /* @__PURE__ */ ri(dc), [mc, hc] = fc(dc), gc = /* @__PURE__ */ uc((e) => {
	let { __scopeDialog: t, children: n, open: r, defaultOpen: i, onOpenChange: a, modal: o = !0 } = e, s = _.useRef(null), c = _.useRef(null), [l, u] = Pi({
		prop: r,
		defaultProp: i ?? !1,
		onChange: a,
		caller: dc
	}), [d, f] = _.useState(0), [p, m] = _.useState(0);
	return /* @__PURE__ */ (0, R.jsx)(mc, {
		scope: t,
		triggerRef: s,
		contentRef: c,
		contentId: Qi(),
		titleId: Qi(),
		descriptionId: Qi(),
		titlePresent: d > 0,
		descriptionPresent: p > 0,
		setTitleCount: f,
		setDescriptionCount: m,
		open: l,
		onOpenChange: u,
		onOpenToggle: _.useCallback(() => u((e) => !e), [u]),
		modal: o,
		children: n
	});
}, "Dialog"), _c = "DialogTrigger", vc = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ uc(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = hc(_c, n), a = U(t, i.triggerRef);
	return /* @__PURE__ */ (0, R.jsx)(W.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i.open,
		"aria-controls": i.open ? i.contentId : void 0,
		"data-state": Rc(i.open),
		...r,
		ref: a,
		onClick: G(e.onClick, i.onOpenToggle)
	});
}, "DialogTrigger")), yc = "DialogPortal", [bc, xc] = fc(yc, { forceMount: void 0 }), Sc = /* @__PURE__ */ uc((e) => {
	let { __scopeDialog: t, forceMount: n, children: r, container: i } = e, a = hc(yc, t);
	return /* @__PURE__ */ (0, R.jsx)(bc, {
		scope: t,
		forceMount: n,
		children: _.Children.map(r, (e) => /* @__PURE__ */ (0, R.jsx)(Hi, {
			present: n || a.open,
			children: /* @__PURE__ */ (0, R.jsx)(Ro, {
				asChild: !0,
				container: i,
				children: e
			})
		}))
	});
}, "DialogPortal"), Cc = "DialogOverlay", wc = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ uc(function(e, t) {
	let n = xc(Cc, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = hc(Cc, e.__scopeDialog);
	return a.modal ? /* @__PURE__ */ (0, R.jsx)(Hi, {
		present: r || a.open,
		children: /* @__PURE__ */ (0, R.jsx)(Ec, {
			...i,
			ref: t
		})
	}) : null;
}, "DialogOverlay")), Tc = /* @__PURE__ */ Nr("DialogOverlay.RemoveScroll"), Ec = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ uc(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = hc(Cc, n), a = U(t, mo());
	return /* @__PURE__ */ (0, R.jsx)($s, {
		as: Tc,
		allowPinchZoom: !0,
		shards: [i.contentRef],
		children: /* @__PURE__ */ (0, R.jsx)(W.div, {
			"data-state": Rc(i.open),
			...r,
			ref: a,
			style: {
				pointerEvents: "auto",
				...r.style
			}
		})
	});
}, "DialogOverlayImpl")), Dc = "DialogContent", Oc = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ uc(function(e, t) {
	let n = xc(Dc, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = hc(Dc, e.__scopeDialog);
	return /* @__PURE__ */ (0, R.jsx)(Hi, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ (0, R.jsx)(kc, {
			...i,
			ref: t
		}) : /* @__PURE__ */ (0, R.jsx)(Ac, {
			...i,
			ref: t
		})
	});
}, "DialogContent")), kc = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ uc(function(e, t) {
	let n = hc(Dc, e.__scopeDialog), r = _.useRef(null), i = U(t, n.contentRef, r);
	return _.useEffect(() => {
		let e = r.current;
		if (e) return cc(e);
	}, []), /* @__PURE__ */ (0, R.jsx)(jc, {
		...e,
		ref: i,
		trapFocus: n.open,
		disableOutsidePointerEvents: n.open,
		onCloseAutoFocus: G(e.onCloseAutoFocus, (e) => {
			e.preventDefault(), n.triggerRef.current?.focus();
		}),
		onPointerDownOutside: G(e.onPointerDownOutside, (e) => {
			let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
			(t.button === 2 || n) && e.preventDefault();
		}),
		onFocusOutside: G(e.onFocusOutside, (e) => e.preventDefault())
	});
}, "DialogContentModal")), Ac = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ uc(function(e, t) {
	let n = hc(Dc, e.__scopeDialog), r = _.useRef(!1), i = _.useRef(!1);
	return /* @__PURE__ */ (0, R.jsx)(jc, {
		...e,
		ref: t,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		onCloseAutoFocus: (t) => {
			e.onCloseAutoFocus?.(t), t.defaultPrevented || (r.current || n.triggerRef.current?.focus(), t.preventDefault()), r.current = !1, i.current = !1;
		},
		onInteractOutside: (t) => {
			e.onInteractOutside?.(t), t.defaultPrevented || (r.current = !0, t.detail.originalEvent.type === "pointerdown" && (i.current = !0));
			let a = t.target;
			n.triggerRef.current?.contains(a) && t.preventDefault(), t.detail.originalEvent.type === "focusin" && i.current && t.preventDefault();
		}
	});
}, "DialogContentNonModal")), jc = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ uc(function(e, t) {
	let { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, ...o } = e, s = hc(Dc, n);
	return Wo(), /* @__PURE__ */ (0, R.jsx)(R.Fragment, { children: /* @__PURE__ */ (0, R.jsx)(To, {
		asChild: !0,
		loop: !0,
		trapped: r,
		onMountAutoFocus: i,
		onUnmountAutoFocus: a,
		children: /* @__PURE__ */ (0, R.jsx)(po, {
			role: "dialog",
			id: s.contentId,
			"aria-describedby": s.descriptionPresent ? s.descriptionId : void 0,
			"aria-labelledby": s.titlePresent ? s.titleId : void 0,
			"data-state": Rc(s.open),
			...o,
			ref: t,
			deferPointerDownOutside: !0,
			onDismiss: () => s.onOpenChange(!1)
		})
	}) });
}, "DialogContentImpl")), Mc = "DialogTitle", Nc = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ uc(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = hc(Mc, n), { setTitleCount: a } = i;
	return Ti(() => (a((e) => e + 1), () => a((e) => e - 1)), [a]), /* @__PURE__ */ (0, R.jsx)(W.h2, {
		id: i.titleId,
		...r,
		ref: t
	});
}, "DialogTitle")), Pc = "DialogDescription", Fc = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ uc(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = hc(Pc, n), { setDescriptionCount: a } = i;
	return Ti(() => (a((e) => e + 1), () => a((e) => e - 1)), [a]), /* @__PURE__ */ (0, R.jsx)(W.p, {
		id: i.descriptionId,
		...r,
		ref: t
	});
}, "DialogDescription")), Ic = "DialogClose", Lc = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ uc(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = hc(Ic, n);
	return /* @__PURE__ */ (0, R.jsx)(W.button, {
		type: "button",
		...r,
		ref: t,
		onClick: G(e.onClick, () => i.onOpenChange(!1))
	});
}, "DialogClose"));
function Rc(e) {
	return e ? "open" : "closed";
}
uc(Rc, "getState");
//#endregion
//#region node_modules/@radix-ui/react-avatar/dist/index.mjs
var zc = Object.defineProperty, Bc = (e, t) => zc(e, "name", {
	value: t,
	configurable: !0
}), Vc = "Avatar", [Hc, Uc] = /* @__PURE__ */ ri(Vc), Wc = [0, () => void 0], [Gc, Kc] = Hc(Vc), qc = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ Bc(function(e, t) {
	let { __scopeAvatar: n, ...r } = e, [i, a] = _.useState("idle"), [o, s] = el();
	return /* @__PURE__ */ (0, R.jsx)(Gc, {
		scope: n,
		imageLoadingStatus: i,
		setImageLoadingStatus: a,
		imageCount: o,
		setImageCount: s,
		children: /* @__PURE__ */ (0, R.jsx)(W.span, {
			...r,
			ref: t
		})
	});
}, "Avatar")), Jc = "AvatarImage", Yc = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ Bc(function(e, t) {
	let { __scopeAvatar: n, src: r, onLoadingStatusChange: i, ...a } = e, o = Kc(Jc, n);
	o.setImageCount;
	let s = Qc(r, {
		referrerPolicy: a.referrerPolicy,
		crossOrigin: a.crossOrigin,
		loadingStatus: o.imageLoadingStatus,
		setLoadingStatus: o.setImageLoadingStatus
	}), c = io((e) => {
		i?.(e);
	}), l = _.useRef(s);
	return Ti(() => {
		let e = l.current;
		l.current = s, s !== e && c(s);
	}, [s, c]), s === "loaded" ? /* @__PURE__ */ (0, R.jsx)(W.img, {
		...a,
		ref: t,
		src: r
	}) : null;
}, "AvatarImage")), Xc = "AvatarFallback", Zc = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ Bc(function(e, t) {
	let { __scopeAvatar: n, delayMs: r, ...i } = e, a = Kc(Xc, n), [o, s] = _.useState(r === void 0);
	return _.useEffect(() => {
		if (r !== void 0) {
			let e = window.setTimeout(() => s(!0), r);
			return () => window.clearTimeout(e);
		}
	}, [r]), o && a.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ (0, R.jsx)(W.span, {
		...i,
		ref: t
	}) : null;
}, "AvatarFallback"));
function Qc(e, { loadingStatus: t, setLoadingStatus: n, referrerPolicy: r, crossOrigin: i }) {
	return Ti(() => {
		if (!e) {
			n("error");
			return;
		}
		let t = new window.Image(), a = /* @__PURE__ */ Bc((e) => {
			let t = e.currentTarget;
			n($c(t));
		}, "handleLoad"), o = /* @__PURE__ */ Bc(() => n("error"), "handleError");
		return t.addEventListener("load", a), t.addEventListener("error", o), r && (t.referrerPolicy = r), t.crossOrigin = i ?? null, t.src = e, n($c(t)), () => {
			t.removeEventListener("load", a), t.removeEventListener("error", o), n("idle");
		};
	}, [
		e,
		i,
		r,
		n
	]), t;
}
Bc(Qc, "useImageLoadingStatus");
function $c(e) {
	return e.complete ? e.naturalWidth > 0 ? "loaded" : "error" : "loading";
}
Bc($c, "getImageLoadingStatus");
function el() {
	return Wc;
}
Bc(el, "useImageCount");
function tl(e) {}
Bc(tl, "useUpdateImageCount");
//#endregion
//#region node_modules/@radix-ui/react-use-size/dist/index.mjs
var nl = Object.defineProperty, rl = (e, t) => nl(e, "name", {
	value: t,
	configurable: !0
});
function il(e) {
	let [t, n] = _.useState(void 0);
	return Ti(() => {
		if (e) {
			n({
				width: e.offsetWidth,
				height: e.offsetHeight
			});
			let t = new ResizeObserver((t) => {
				if (!Array.isArray(t) || !t.length) return;
				let r = t[0], i, a;
				if ("borderBoxSize" in r) {
					let e = r.borderBoxSize, t = Array.isArray(e) ? e[0] : e;
					i = t.inlineSize, a = t.blockSize;
				} else i = e.offsetWidth, a = e.offsetHeight;
				n({
					width: i,
					height: a
				});
			});
			return t.observe(e, { box: "border-box" }), () => t.unobserve(e);
		}
		n(void 0);
	}, [e]), t;
}
rl(il, "useSize");
//#endregion
//#region node_modules/@radix-ui/react-checkbox/dist/index.mjs
var al = Object.defineProperty, ol = (e, t) => al(e, "name", {
	value: t,
	configurable: !0
}), sl = "Checkbox", [cl, ll] = /* @__PURE__ */ ri(sl), [ul, dl] = cl(sl);
function fl(e) {
	let { __scopeCheckbox: t, checked: n, children: r, defaultChecked: i, disabled: a, form: o, name: s, onCheckedChange: c, required: l, value: u = "on", internal_do_not_use_render: d } = e, [f, p] = Pi({
		prop: n,
		defaultProp: i ?? !1,
		onChange: c,
		caller: sl
	}), [m, h] = _.useState(null), [g, v] = _.useState(null), y = _.useRef(!1), [b, x] = _.useReducer((e) => e + 1, 0), S = !m || !!o || !!m.closest("form"), C = {
		checked: f,
		disabled: a,
		setChecked: p,
		control: m,
		setControl: h,
		name: s,
		form: o,
		value: u,
		hasConsumerStoppedPropagationRef: y,
		userInteractionCount: b,
		onUserInteraction: x,
		required: l,
		defaultChecked: !xl(i) && i,
		isFormControl: S,
		bubbleInput: g,
		setBubbleInput: v
	};
	return /* @__PURE__ */ (0, R.jsx)(ul, {
		scope: t,
		...C,
		children: bl(d) ? d(C) : r
	});
}
ol(fl, "CheckboxProvider");
var pl = "CheckboxTrigger", ml = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ ol(function({ __scopeCheckbox: e, onKeyDown: t, onClick: n, ...r }, i) {
	let { control: a, value: o, disabled: s, checked: c, required: l, setControl: u, setChecked: d, hasConsumerStoppedPropagationRef: f, onUserInteraction: p, isFormControl: m, bubbleInput: h } = dl(pl, e), g = U(i, u), v = _.useRef(c);
	return _.useEffect(() => {
		let e = a?.form;
		if (e) {
			let t = /* @__PURE__ */ ol(() => d(v.current), "reset");
			return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
		}
	}, [a, d]), /* @__PURE__ */ (0, R.jsx)(W.button, {
		type: "button",
		role: "checkbox",
		"aria-checked": xl(c) ? "mixed" : c,
		"aria-required": l,
		"data-state": Sl(c),
		"data-disabled": s ? "" : void 0,
		disabled: s,
		value: o,
		...r,
		ref: g,
		onKeyDown: G(t, (e) => {
			e.key === "Enter" && e.preventDefault();
		}),
		onClick: G(n, (e) => {
			p(), d((e) => xl(e) ? !0 : !e), h && m && (f.current = e.isPropagationStopped(), f.current || e.stopPropagation());
		})
	});
}, "CheckboxTrigger")), hl = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ ol(function(e, t) {
	let { __scopeCheckbox: n, name: r, checked: i, defaultChecked: a, required: o, disabled: s, value: c, onCheckedChange: l, form: u, ...d } = e;
	return /* @__PURE__ */ (0, R.jsx)(fl, {
		__scopeCheckbox: n,
		checked: i,
		defaultChecked: a,
		disabled: s,
		required: o,
		onCheckedChange: l,
		name: r,
		form: u,
		value: c,
		internal_do_not_use_render: ({ isFormControl: e }) => /* @__PURE__ */ (0, R.jsxs)(R.Fragment, { children: [/* @__PURE__ */ (0, R.jsx)(ml, {
			...d,
			ref: t,
			__scopeCheckbox: n
		}), e && /* @__PURE__ */ (0, R.jsx)(yl, { __scopeCheckbox: n })] })
	});
}, "Checkbox")), gl = "CheckboxIndicator", _l = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ ol(function(e, t) {
	let { __scopeCheckbox: n, forceMount: r, ...i } = e, a = dl(gl, n);
	return /* @__PURE__ */ (0, R.jsx)(Hi, {
		present: r || xl(a.checked) || a.checked === !0,
		children: /* @__PURE__ */ (0, R.jsx)(W.span, {
			"data-state": Sl(a.checked),
			"data-disabled": a.disabled ? "" : void 0,
			...i,
			ref: t,
			style: {
				pointerEvents: "none",
				...e.style
			}
		})
	});
}, "CheckboxIndicator")), vl = "CheckboxBubbleInput", yl = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ ol(function({ __scopeCheckbox: e, onClick: t, ...n }, r) {
	let { control: i, hasConsumerStoppedPropagationRef: a, userInteractionCount: o, checked: s, defaultChecked: c, required: l, disabled: u, name: d, value: f, form: p, bubbleInput: m, setBubbleInput: h } = dl(vl, e), g = U(r, h), v = il(i), y = _.useRef(!1), b = _.useRef(s), x = _.useRef(o);
	_.useEffect(() => {
		let e = m;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, n = Object.getOwnPropertyDescriptor(t, "checked").set, r = o !== x.current;
		x.current = o;
		let i = b.current !== s;
		b.current = s;
		let c = !(r && a.current);
		if (i && n) {
			y.current = !r;
			let t = new Event("click", { bubbles: c });
			e.indeterminate = xl(s), n.call(e, !xl(s) && s), e.dispatchEvent(t), y.current = !1;
		}
	}, [
		m,
		s,
		a,
		o
	]);
	let S = _.useRef(!xl(s) && s);
	return /* @__PURE__ */ (0, R.jsx)(W.input, {
		type: "checkbox",
		"aria-hidden": !0,
		defaultChecked: c ?? S.current,
		required: l,
		disabled: u,
		name: d,
		value: f,
		form: p,
		...n,
		tabIndex: -1,
		ref: g,
		onClick: G(t, (e) => {
			y.current && e.stopPropagation();
		}),
		style: {
			...n.style,
			...v,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0,
			transform: "translateX(-100%)"
		}
	});
}, "CheckboxBubbleInput"));
function bl(e) {
	return typeof e == "function";
}
ol(bl, "isFunction");
function xl(e) {
	return e === "indeterminate";
}
ol(xl, "isIndeterminate");
function Sl(e) {
	return xl(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
ol(Sl, "getState");
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var Cl = [
	"top",
	"right",
	"bottom",
	"left"
], wl = Math.min, Tl = Math.max, El = Math.round, Dl = Math.floor, Ol = (e) => ({
	x: e,
	y: e
}), kl = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Al(e, t, n) {
	return Tl(e, wl(t, n));
}
function jl(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Ml(e) {
	return e.split("-")[0];
}
function Nl(e) {
	return e.split("-")[1];
}
function Pl(e) {
	return e === "x" ? "y" : "x";
}
function Fl(e) {
	return e === "y" ? "height" : "width";
}
function Il(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Ll(e) {
	return Pl(Il(e));
}
function Rl(e, t, n) {
	n === void 0 && (n = !1);
	let r = Nl(e), i = Ll(e), a = Fl(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = ql(o)), [o, ql(o)];
}
function zl(e) {
	let t = ql(e);
	return [
		Bl(e),
		t,
		Bl(t)
	];
}
function Bl(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var Vl = ["left", "right"], Hl = ["right", "left"], Ul = ["top", "bottom"], Wl = ["bottom", "top"];
function Gl(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? Hl : Vl : t ? Vl : Hl;
		case "left":
		case "right": return t ? Ul : Wl;
		default: return [];
	}
}
function Kl(e, t, n, r) {
	let i = Nl(e), a = Gl(Ml(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Bl)))), a;
}
function ql(e) {
	let t = Ml(e);
	return kl[t] + e.slice(t.length);
}
function Jl(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function Yl(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : Jl(e);
}
function Xl(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Zl(e, t, n) {
	let { reference: r, floating: i } = e, a = Il(t), o = Ll(t), s = Fl(o), c = Ml(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = Nl(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Ql(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = jl(t, e), p = Yl(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = Xl(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = Xl(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var $l = 50, eu = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Ql
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Zl(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < $l && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Zl(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, tu = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = jl(e, t) || {};
		if (l == null) return {};
		let d = Yl(u), f = {
			x: n,
			y: r
		}, p = Ll(i), m = Fl(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = wl(d[_], T), D = wl(d[v], T), O = C - h[m] - D, k = C / 2 - h[m] / 2 + w, A = Al(E, k, O), j = !c.arrow && Nl(i) != null && k !== A && a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0, M = j ? k < E ? k - E : k - O : 0;
		return {
			[p]: f[p] + M,
			data: {
				[p]: A,
				centerOffset: k - A - M,
				...j && { alignmentOffset: M }
			},
			reset: j
		};
	}
}), nu = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = jl(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = Ml(r), _ = Il(o), v = Ml(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [ql(o)] : zl(o)), x = p !== "none";
			!d && x && b.push(...Kl(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = Rl(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === Il(t) || T.every((e) => Il(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = Il(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement": n = o;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function ru(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function iu(e) {
	return Cl.some((t) => e[t] >= 0);
}
var au = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = jl(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = ru(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: iu(e)
					} };
				}
				case "escaped": {
					let e = ru(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: iu(e)
					} };
				}
				default: return {};
			}
		}
	};
}, ou = /*#__PURE__*/ new Set(["left", "top"]);
async function su(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Ml(n), s = Nl(n), c = Il(n) === "y", l = ou.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = jl(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var cu = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await su(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, lu = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = jl(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = Il(i), p = Pl(f), m = u[p], h = u[f], g = (e, t) => Al(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
			o && (m = g(p, m)), s && (h = g(f, h));
			let _ = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, uu = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = jl(e, t), u = {
				x: n,
				y: r
			}, d = Il(i), f = Pl(d), p = u[f], m = u[d], h = jl(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: h.mainAxis ?? 0,
				crossAxis: h.crossAxis ?? 0
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = ou.has(Ml(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, du = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = jl(e, t), c = await i.detectOverflow(t, s), l = Ml(n), u = Nl(n), d = Il(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = wl(p - c[m], g), y = wl(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * Tl(c.left, c.right) : S = p - 2 * Tl(c.top, c.bottom)), await o({
				...t,
				availableWidth: C,
				availableHeight: S
			});
			let w = await i.getDimensions(a.floating);
			return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function fu() {
	return typeof window < "u";
}
function pu(e) {
	return gu(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function mu(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function hu(e) {
	return ((gu(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function gu(e) {
	return fu() ? e instanceof Node || e instanceof mu(e).Node : !1;
}
function _u(e) {
	return fu() ? e instanceof Element || e instanceof mu(e).Element : !1;
}
function vu(e) {
	return fu() ? e instanceof HTMLElement || e instanceof mu(e).HTMLElement : !1;
}
function yu(e) {
	return !fu() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof mu(e).ShadowRoot;
}
function bu(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = ju(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function xu(e) {
	return /^(table|td|th)$/.test(pu(e));
}
function Su(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Cu = /transform|translate|scale|rotate|perspective|filter/, wu = /paint|layout|strict|content/, Tu = (e) => !!e && e !== "none", Eu;
function Du(e) {
	let t = _u(e) ? ju(e) : e;
	return Tu(t.transform) || Tu(t.translate) || Tu(t.scale) || Tu(t.rotate) || Tu(t.perspective) || !ku() && (Tu(t.backdropFilter) || Tu(t.filter)) || Cu.test(t.willChange || "") || wu.test(t.contain || "");
}
function Ou(e) {
	let t = Nu(e);
	for (; vu(t) && !Au(t);) {
		if (Du(t)) return t;
		if (Su(t)) return null;
		t = Nu(t);
	}
	return null;
}
function ku() {
	return Eu ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Eu;
}
function Au(e) {
	return /^(html|body|#document)$/.test(pu(e));
}
function ju(e) {
	return mu(e).getComputedStyle(e);
}
function Mu(e) {
	return _u(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Nu(e) {
	if (pu(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || yu(e) && e.host || hu(e);
	return yu(t) ? t.host : t;
}
function Pu(e) {
	let t = Nu(e);
	return Au(t) ? (e.ownerDocument || e).body : vu(t) && bu(t) ? t : Pu(t);
}
function Fu(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Pu(e), i = r === e.ownerDocument?.body, a = mu(r);
	if (i) {
		let e = Iu(a);
		return t.concat(a, a.visualViewport || [], bu(r) ? r : [], e && n ? Fu(e) : []);
	}
	return t.concat(r, Fu(r, [], n));
}
function Iu(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function Lu(e) {
	let t = ju(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = vu(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = El(n) !== a || El(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Ru(e) {
	return _u(e) ? e : e.contextElement;
}
function zu(e) {
	let t = Ru(e);
	if (!vu(t)) return Ol(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Lu(t), o = (a ? El(n.width) : n.width) / r, s = (a ? El(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Bu = /*#__PURE__*/ Ol(0);
function Vu(e) {
	let t = mu(e);
	return !ku() || !t.visualViewport ? Bu : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Hu(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === mu(e);
}
function Uu(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Ru(e), o = Ol(1);
	t && (r ? _u(r) && (o = zu(r)) : o = zu(e));
	let s = Hu(a, n, r) ? Vu(a) : Ol(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = mu(a), t = _u(r) ? mu(r) : r, n = e, i = Iu(n);
		for (; i && t !== n;) {
			let e = zu(i), t = i.getBoundingClientRect(), r = ju(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = mu(i), i = Iu(n);
		}
	}
	return Xl({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Wu(e, t) {
	let n = Mu(e).scrollLeft;
	return t ? t.left + n : Uu(hu(e)).left + n;
}
function Gu(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Wu(e, n),
		y: n.top + t.scrollTop
	};
}
function Ku(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = hu(r), s = t ? Su(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = Ol(1), u = Ol(0), d = vu(r);
	if ((d || !a) && ((pu(r) !== "body" || bu(o)) && (c = Mu(r)), d)) {
		let e = Uu(r);
		l = zu(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Gu(o, c) : Ol(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function qu(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Ju(e) {
	let t = Mu(e), n = e.ownerDocument.body, r = Tl(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = Tl(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Wu(e), o = -t.scrollTop;
	return ju(n).direction === "rtl" && (a += Tl(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Yu = 25;
function Xu(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = mu(e), a = hu(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !ku() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Wu(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Yu && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function Zu(e, t) {
	let n = Uu(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = zu(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Qu(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Xu(e, n, t);
	else if (t === "document") r = Ju(hu(e));
	else if (_u(t)) r = Zu(t, n);
	else {
		let n = Vu(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return Xl(r);
}
function $u(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Fu(e, [], !1).filter((e) => _u(e) && pu(e) !== "body"), i = null, a = ju(e).position === "fixed", o = a ? Nu(e) : e;
	for (; _u(o) && !Au(o);) {
		let e = ju(o), t = Du(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = Nu(o);
	}
	return t.set(e, r), r;
}
function ed(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Su(t) ? [] : $u(t, this._c) : [].concat(n), r], o = Qu(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Qu(t, a[e], i);
		s = Tl(n.top, s), c = wl(n.right, c), l = wl(n.bottom, l), u = Tl(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function td(e) {
	let { width: t, height: n } = Lu(e);
	return {
		width: t,
		height: n
	};
}
function nd(e, t, n) {
	let r = vu(t), i = hu(t), a = n === "fixed", o = Uu(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = Ol(0);
	if ((r || !a) && ((pu(t) !== "body" || bu(i)) && (s = Mu(t)), r)) {
		let e = Uu(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Wu(i));
	let l = i && !r && !a ? Gu(i, s) : Ol(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function rd(e) {
	return ju(e).position === "static";
}
function id(e, t) {
	if (!vu(e) || ju(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return hu(e) === n && (n = n.ownerDocument.body), n;
}
function ad(e, t) {
	let n = mu(e);
	if (Su(e)) return n;
	if (!vu(e)) {
		let t = Nu(e);
		for (; t && !Au(t);) {
			if (_u(t) && !rd(t)) return t;
			t = Nu(t);
		}
		return n;
	}
	let r = id(e, t);
	for (; r && xu(r) && rd(r);) r = id(r, t);
	return r && Au(r) && rd(r) && !Du(r) ? n : r || Ou(e) || n;
}
var od = async function(e) {
	let t = this.getOffsetParent || ad, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: nd(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function sd(e) {
	return ju(e).direction === "rtl";
}
var cd = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Ku,
	getDocumentElement: hu,
	getClippingRect: ed,
	getOffsetParent: ad,
	getElementRects: od,
	getClientRects: qu,
	getDimensions: td,
	getScale: zu,
	isElement: _u,
	isRTL: sd
};
function ld(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function ud(e, t, n) {
	let r = null, i, a = hu(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = Dl(d), h = Dl(a.clientWidth - (u + f)), g = Dl(a.clientHeight - (d + p)), _ = Dl(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: Tl(0, wl(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!ld(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = mu(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function dd(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Ru(e), u = i || a ? [...l ? Fu(l) : [], ...t ? Fu(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? ud(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Uu(e) : null;
	c && g();
	function g() {
		let t = Uu(e);
		h && !ld(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var fd = cu, pd = lu, md = nu, hd = du, gd = au, _d = tu, vd = uu, yd = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...cd,
		...i.platform,
		_c: r
	};
	return eu(e, t, {
		...i,
		platform: a
	});
}, bd = typeof document < "u" ? _.useLayoutEffect : function() {};
function xd(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!xd(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !xd(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function Sd(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Cd(e, t) {
	let n = Sd(e);
	return Math.round(t * n) / n;
}
function wd(e) {
	let t = _.useRef(e);
	return bd(() => {
		t.current = e;
	}), t;
}
function Td(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: a, floating: o } = {}, transform: s = !0, whileElementsMounted: c, open: l } = e, [u, d] = _.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [f, p] = _.useState(r);
	xd(f, r) || p(r);
	let [m, h] = _.useState(null), [g, v] = _.useState(null), y = _.useCallback((e) => {
		e !== C.current && (C.current = e, h(e));
	}, []), b = _.useCallback((e) => {
		e !== w.current && (w.current = e, v(e));
	}, []), x = a || m, S = o || g, C = _.useRef(null), w = _.useRef(null), T = _.useRef(u), E = c != null, D = wd(c), O = wd(i), k = wd(l), A = _.useCallback(() => {
		if (!C.current || !w.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: f
		};
		O.current && (e.platform = O.current), yd(C.current, w.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: k.current !== !1
			};
			j.current && !xd(T.current, t) && (T.current = t, Wt.flushSync(() => {
				d(t);
			}));
		});
	}, [
		f,
		t,
		n,
		O,
		k
	]);
	bd(() => {
		l === !1 && T.current.isPositioned && (T.current.isPositioned = !1, d((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [l]);
	let j = _.useRef(!1);
	bd(() => (j.current = !0, () => {
		j.current = !1;
	}), []), bd(() => {
		if (x && (C.current = x), S && (w.current = S), x && S) {
			if (D.current) return D.current(x, S, A);
			A();
		}
	}, [
		x,
		S,
		A,
		D,
		E
	]);
	let M = _.useMemo(() => ({
		reference: C,
		floating: w,
		setReference: y,
		setFloating: b
	}), [y, b]), N = _.useMemo(() => ({
		reference: x,
		floating: S
	}), [x, S]), P = _.useMemo(() => {
		let e = {
			position: n,
			left: 0,
			top: 0
		};
		if (!N.floating) return e;
		let t = Cd(N.floating, u.x), r = Cd(N.floating, u.y);
		return s ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...Sd(N.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: n,
			left: t,
			top: r
		};
	}, [
		n,
		s,
		N.floating,
		u.x,
		u.y
	]);
	return _.useMemo(() => ({
		...u,
		update: A,
		refs: M,
		elements: N,
		floatingStyles: P
	}), [
		u,
		A,
		M,
		N,
		P
	]);
}
var Ed = (e) => {
	function t(e) {
		return {}.hasOwnProperty.call(e, "current");
	}
	return {
		name: "arrow",
		options: e,
		fn(n) {
			let { element: r, padding: i } = typeof e == "function" ? e(n) : e;
			return r && t(r) ? r.current == null ? {} : _d({
				element: r.current,
				padding: i
			}).fn(n) : r ? _d({
				element: r,
				padding: i
			}).fn(n) : {};
		}
	};
}, Dd = (e, t) => {
	let n = fd(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Od = (e, t) => {
	let n = pd(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, kd = (e, t) => ({
	fn: vd(e).fn,
	options: [e, t]
}), Ad = (e, t) => {
	let n = md(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, jd = (e, t) => {
	let n = hd(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Md = (e, t) => {
	let n = gd(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Nd = (e, t) => {
	let n = Ed(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Pd = Object.defineProperty, Fd = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ ((e, t) => Pd(e, "name", {
	value: t,
	configurable: !0
}))(function(e, t) {
	let { children: n, width: r = 10, height: i = 5, ...a } = e;
	return /* @__PURE__ */ (0, R.jsx)(W.svg, {
		...a,
		ref: t,
		width: r,
		height: i,
		viewBox: "0 0 30 10",
		preserveAspectRatio: "none",
		children: e.asChild ? n : /* @__PURE__ */ (0, R.jsx)("polygon", { points: "0,0 30,0 15,10" })
	});
}, "Arrow")), Id = Object.defineProperty, Ld = (e, t) => Id(e, "name", {
	value: t,
	configurable: !0
}), Rd = "Popper", [zd, Bd] = /* @__PURE__ */ ri(Rd), [Vd, Hd] = zd(Rd), Ud = /* @__PURE__ */ Ld((e) => {
	let { __scopePopper: t, children: n } = e, [r, i] = _.useState(null), [a, o] = _.useState(void 0);
	return /* @__PURE__ */ (0, R.jsx)(Vd, {
		scope: t,
		anchor: r,
		onAnchorChange: i,
		placementState: a,
		setPlacementState: o,
		children: n
	});
}, "Popper"), Wd = "PopperAnchor", Gd = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ Ld(function(e, t) {
	let { __scopePopper: n, virtualRef: r, ...i } = e, a = Hd(Wd, n), o = _.useRef(null), s = a.onAnchorChange, c = U(t, _.useCallback((e) => {
		o.current = e, e && s(e);
	}, [s])), l = _.useRef(null);
	_.useEffect(() => {
		if (!r) return;
		let e = l.current;
		l.current = r.current, e !== l.current && s(l.current);
	});
	let u = a.placementState && tf(a.placementState), d = u?.[0], f = u?.[1];
	return r ? null : /* @__PURE__ */ (0, R.jsx)(W.div, {
		"data-radix-popper-side": d,
		"data-radix-popper-align": f,
		...i,
		ref: c
	});
}, "PopperAnchor")), Kd = "PopperContent", [qd, Jd] = zd(Kd), Yd = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ Ld(function(e, t) {
	let { __scopePopper: n, side: r = "bottom", sideOffset: i = 0, align: a = "center", alignOffset: o = 0, arrowPadding: s = 0, avoidCollisions: c = !0, collisionBoundary: l = [], collisionPadding: u = 0, sticky: d = "partial", hideWhenDetached: f = !1, updatePositionStrategy: p = "optimized", onPlaced: m, ...h } = e, g = Hd(Kd, n), [v, y] = _.useState(null), b = U(t, y), [x, S] = _.useState(null), C = il(x), w = C?.width ?? 0, T = C?.height ?? 0, E = r + (a === "center" ? "" : "-" + a), D = typeof u == "number" ? u : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...u
	}, O = Array.isArray(l) ? l : [l], k = O.length > 0, A = {
		padding: D,
		boundary: O.filter($d),
		altBoundary: k
	}, { refs: j, floatingStyles: M, placement: N, isPositioned: P, middlewareData: F } = Td({
		strategy: "fixed",
		placement: E,
		whileElementsMounted: /* @__PURE__ */ Ld((...e) => dd(...e, { animationFrame: p === "always" }), "whileElementsMounted"),
		elements: { reference: g.anchor },
		middleware: [
			Dd({
				mainAxis: i + T,
				alignmentAxis: o
			}),
			c && Od({
				mainAxis: !0,
				crossAxis: !1,
				limiter: d === "partial" ? kd() : void 0,
				...A
			}),
			c && Ad({ ...A }),
			jd({
				...A,
				apply: /* @__PURE__ */ Ld(({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--radix-popper-available-width", `${n}px`), o.setProperty("--radix-popper-available-height", `${r}px`), o.setProperty("--radix-popper-anchor-width", `${i}px`), o.setProperty("--radix-popper-anchor-height", `${a}px`);
				}, "apply")
			}),
			x && Nd({
				element: x,
				padding: s
			}),
			ef({
				arrowWidth: w,
				arrowHeight: T
			}),
			f && Md({
				strategy: "referenceHidden",
				...A,
				boundary: k ? A.boundary : void 0
			})
		]
	}), I = g.setPlacementState;
	Ti(() => (I(N), () => {
		I(void 0);
	}), [N, I]);
	let [ee, te] = tf(N), ne = io(m);
	Ti(() => {
		P && ne?.();
	}, [P, ne]);
	let re = F.arrow?.x, L = F.arrow?.y, ie = F.arrow?.centerOffset !== 0, [ae, oe] = _.useState();
	return Ti(() => {
		v && oe(window.getComputedStyle(v).zIndex);
	}, [v]), /* @__PURE__ */ (0, R.jsx)("div", {
		ref: j.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...M,
			transform: P ? M.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: ae,
			"--radix-popper-transform-origin": [F.transformOrigin?.x, F.transformOrigin?.y].join(" "),
			...F.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: e.dir,
		children: /* @__PURE__ */ (0, R.jsx)(qd, {
			scope: n,
			placedSide: ee,
			placedAlign: te,
			onArrowChange: S,
			arrowX: re,
			arrowY: L,
			shouldHideArrow: ie,
			children: /* @__PURE__ */ (0, R.jsx)(W.div, {
				"data-side": ee,
				"data-align": te,
				...h,
				ref: b,
				style: {
					...h.style,
					animation: P ? h.style?.animation : "none"
				}
			})
		})
	});
}, "PopperContent")), Xd = "PopperArrow", Zd = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, Qd = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ Ld(function(e, t) {
	let { __scopePopper: n, ...r } = e, i = Jd(Xd, n), a = Zd[i.placedSide];
	return /* @__PURE__ */ (0, R.jsx)("span", {
		ref: i.onArrowChange,
		style: {
			position: "absolute",
			left: i.arrowX,
			top: i.arrowY,
			[a]: 0,
			transformOrigin: {
				top: "",
				right: "0 0",
				bottom: "center 0",
				left: "100% 0"
			}[i.placedSide],
			transform: {
				top: "translateY(100%)",
				right: "translateY(50%) rotate(90deg) translateX(-50%)",
				bottom: "rotate(180deg)",
				left: "translateY(50%) rotate(-90deg) translateX(50%)"
			}[i.placedSide],
			visibility: i.shouldHideArrow ? "hidden" : void 0
		},
		children: /* @__PURE__ */ (0, R.jsx)(Fd, {
			...r,
			ref: t,
			style: {
				...r.style,
				display: "block"
			}
		})
	});
}, "PopperArrow"));
function $d(e) {
	return e !== null;
}
Ld($d, "isNotNull");
var ef = /* @__PURE__ */ Ld((e) => ({
	name: "transformOrigin",
	options: e,
	fn(t) {
		let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = tf(n), u = {
			start: "0%",
			center: "50%",
			end: "100%"
		}[l], d = (i.arrow?.x ?? 0) + o / 2, f = (i.arrow?.y ?? 0) + s / 2, p = "", m = "";
		return c === "bottom" ? (p = a ? u : `${d}px`, m = `${-s}px`) : c === "top" ? (p = a ? u : `${d}px`, m = `${r.floating.height + s}px`) : c === "right" ? (p = `${-s}px`, m = a ? u : `${f}px`) : c === "left" && (p = `${r.floating.width + s}px`, m = a ? u : `${f}px`), { data: {
			x: p,
			y: m
		} };
	}
}), "transformOrigin");
function tf(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
Ld(tf, "getSideAndAlignFromPlacement");
var nf = Ud, rf = Gd, af = Yd, of = Qd, sf = Object.defineProperty, cf = (e, t) => sf(e, "name", {
	value: t,
	configurable: !0
}), lf = !1;
function uf() {
	let [e, t] = _.useState(lf);
	return _.useEffect(() => {
		lf || (lf = !0, t(!0));
	}, []), e;
}
cf(uf, "useIsHydrated");
var df = _.useSyncExternalStore;
function ff() {
	return () => {};
}
cf(ff, "subscribe");
function pf() {
	return df(ff, () => !0, () => !1);
}
cf(pf, "useIsHydratedModern");
var mf = typeof df == "function" ? pf : uf, hf = Object.defineProperty, gf = (e, t) => hf(e, "name", {
	value: t,
	configurable: !0
}), _f = "rovingFocusGroup.onEntryFocus", vf = {
	bubbles: !1,
	cancelable: !0
}, yf = "RovingFocusGroup", [bf, xf, Sf] = /* @__PURE__ */ si(yf), [Cf, wf] = /* @__PURE__ */ ri(yf, [Sf]), [Tf, Ef] = Cf(yf), Df = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ gf(function(e, t) {
	return /* @__PURE__ */ (0, R.jsx)(bf.Provider, {
		scope: e.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ (0, R.jsx)(bf.Slot, {
			scope: e.__scopeRovingFocusGroup,
			children: /* @__PURE__ */ (0, R.jsx)(Of, {
				...e,
				ref: t
			})
		})
	});
}, "RovingFocusGroup")), Of = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ gf(function(e, t) {
	let { __scopeRovingFocusGroup: n, orientation: r, loop: i = !1, dir: a, currentTabStopId: o, defaultCurrentTabStopId: s, onCurrentTabStopIdChange: c, onEntryFocus: l, preventScrollOnEntryFocus: u = !1, ...d } = e, f = _.useRef(null), p = U(t, f), m = ya(a), [h, g] = Pi({
		prop: o,
		defaultProp: s ?? null,
		onChange: c,
		caller: yf
	}), [v, y] = _.useState(!1), b = io(l), x = xf(n), S = _.useRef(!1), [C, w] = _.useState(0);
	return _.useEffect(() => {
		let e = f.current;
		if (e) return e.addEventListener(_f, b), () => e.removeEventListener(_f, b);
	}, [b]), /* @__PURE__ */ (0, R.jsx)(Tf, {
		scope: n,
		orientation: r,
		dir: m,
		loop: i,
		currentTabStopId: h,
		onItemFocus: _.useCallback((e) => g(e), [g]),
		onItemShiftTab: _.useCallback(() => y(!0), []),
		onFocusableItemAdd: _.useCallback(() => w((e) => e + 1), []),
		onFocusableItemRemove: _.useCallback(() => w((e) => e - 1), []),
		children: /* @__PURE__ */ (0, R.jsx)(W.div, {
			tabIndex: v || C === 0 ? -1 : 0,
			"data-orientation": r,
			...d,
			ref: p,
			style: {
				outline: "none",
				...e.style
			},
			onMouseDown: G(e.onMouseDown, () => {
				S.current = !0;
			}),
			onFocus: G(e.onFocus, (e) => {
				let t = !S.current;
				if (e.target === e.currentTarget && t && !v) {
					let t = new CustomEvent(_f, vf);
					if (e.currentTarget.dispatchEvent(t), !t.defaultPrevented) {
						let e = x().filter((e) => e.focusable);
						Pf([
							e.find((e) => e.active),
							e.find((e) => e.id === h),
							...e
						].filter(Boolean).map((e) => e.ref.current), u);
					}
				}
				S.current = !1;
			}),
			onBlur: G(e.onBlur, () => y(!1))
		})
	});
}, "RovingFocusGroupImpl")), kf = "RovingFocusGroupItem", Af = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ gf(function(e, t) {
	let { __scopeRovingFocusGroup: n, focusable: r = !0, active: i = !1, tabStopId: a, children: o, ...s } = e, c = Qi(), l = a || c, u = Ef(kf, n), d = u.currentTabStopId === l, f = xf(n), { onFocusableItemAdd: p, onFocusableItemRemove: m, currentTabStopId: h } = u, g = mf();
	return Ti(() => {
		if (g && r) return p(), () => m();
	}, [
		g,
		r,
		p,
		m
	]), _.useEffect(() => {
		if (!g && r) return p(), () => m();
	}, [
		g,
		r,
		p,
		m
	]), /* @__PURE__ */ (0, R.jsx)(bf.ItemSlot, {
		scope: n,
		id: l,
		focusable: r,
		active: i,
		children: /* @__PURE__ */ (0, R.jsx)(W.span, {
			tabIndex: d ? 0 : -1,
			"data-orientation": u.orientation,
			...s,
			ref: t,
			onMouseDown: G(e.onMouseDown, (e) => {
				r ? u.onItemFocus(l) : e.preventDefault();
			}),
			onFocus: G(e.onFocus, () => u.onItemFocus(l)),
			onKeyDown: G(e.onKeyDown, (e) => {
				if (e.key === "Tab" && e.shiftKey) {
					u.onItemShiftTab();
					return;
				}
				if (e.target !== e.currentTarget) return;
				let t = Nf(e, u.orientation, u.dir);
				if (t !== void 0) {
					if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
					e.preventDefault();
					let n = f().filter((e) => e.focusable).map((e) => e.ref.current);
					if (t === "last") n.reverse();
					else if (t === "prev" || t === "next") {
						t === "prev" && n.reverse();
						let r = n.indexOf(e.currentTarget);
						n = u.loop ? Ff(n, r + 1) : n.slice(r + 1);
					}
					setTimeout(() => Pf(n));
				}
			}),
			children: typeof o == "function" ? o({
				isCurrentTabStop: d,
				hasTabStop: h != null
			}) : o
		})
	});
}, "RovingFocusGroupItem")), jf = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function Mf(e, t) {
	return t === "rtl" ? e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e : e;
}
gf(Mf, "getDirectionAwareKey");
function Nf(e, t, n) {
	let r = Mf(e.key, n);
	if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))) return jf[r];
}
gf(Nf, "getFocusIntent");
function Pf(e, t = !1) {
	let n = document.activeElement;
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
gf(Pf, "focusFirst");
function Ff(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
gf(Ff, "wrapArray");
var If = Df, Lf = Af, Rf = Object.defineProperty, K = (e, t) => Rf(e, "name", {
	value: t,
	configurable: !0
}), zf = ["Enter", " "], Bf = [
	"ArrowDown",
	"PageUp",
	"Home"
], Vf = [
	"ArrowUp",
	"PageDown",
	"End"
], Hf = [...Bf, ...Vf], Uf = {
	ltr: [...zf, "ArrowRight"],
	rtl: [...zf, "ArrowLeft"]
}, Wf = {
	ltr: ["ArrowLeft"],
	rtl: ["ArrowRight"]
}, Gf = "Menu", [Kf, qf, Jf] = /* @__PURE__ */ si(Gf), [Yf, Xf] = /* @__PURE__ */ ri(Gf, [
	Jf,
	Bd,
	wf
]), Zf = Bd(), Qf = wf(), [$f, ep] = Yf(Gf), [tp, np] = Yf(Gf), rp = /* @__PURE__ */ K((e) => {
	let { __scopeMenu: t, open: n = !1, children: r, dir: i, onOpenChange: a, modal: o = !0 } = e, s = Zf(t), [c, l] = _.useState(null), u = _.useRef(!1), d = io(a), f = ya(i);
	return _.useEffect(() => {
		let e = /* @__PURE__ */ K(() => {
			u.current = !0, document.addEventListener("pointerdown", t, {
				capture: !0,
				once: !0
			}), document.addEventListener("pointermove", t, {
				capture: !0,
				once: !0
			});
		}, "handleKeyDown"), t = /* @__PURE__ */ K(() => u.current = !1, "handlePointer");
		return document.addEventListener("keydown", e, { capture: !0 }), () => {
			document.removeEventListener("keydown", e, { capture: !0 }), document.removeEventListener("pointerdown", t, { capture: !0 }), document.removeEventListener("pointermove", t, { capture: !0 });
		};
	}, []), _.useEffect(() => {
		if (!n) return;
		let e = /* @__PURE__ */ K(() => d(!1), "handleBlur");
		return window.addEventListener("blur", e), () => window.removeEventListener("blur", e);
	}, [n, d]), /* @__PURE__ */ (0, R.jsx)(nf, {
		...s,
		children: /* @__PURE__ */ (0, R.jsx)($f, {
			scope: t,
			open: n,
			onOpenChange: d,
			content: c,
			onContentChange: l,
			children: /* @__PURE__ */ (0, R.jsx)(tp, {
				scope: t,
				onClose: _.useCallback(() => d(!1), [d]),
				isUsingKeyboardRef: u,
				dir: f,
				modal: o,
				children: r
			})
		})
	});
}, "Menu"), ip = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { __scopeMenu: n, ...r } = e, i = Zf(n);
	return /* @__PURE__ */ (0, R.jsx)(rf, {
		...i,
		...r,
		ref: t
	});
}, "MenuAnchor")), ap = "MenuPortal", [op, sp] = Yf(ap, { forceMount: void 0 }), cp = /* @__PURE__ */ K((e) => {
	let { __scopeMenu: t, forceMount: n, children: r, container: i } = e, a = ep(ap, t);
	return /* @__PURE__ */ (0, R.jsx)(op, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ (0, R.jsx)(Hi, {
			present: n || a.open,
			children: /* @__PURE__ */ (0, R.jsx)(Ro, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
}, "MenuPortal"), lp = "MenuContent", [up, dp] = Yf(lp), fp = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let n = sp(lp, e.__scopeMenu), { forceMount: r = n.forceMount, ...i } = e, a = ep(lp, e.__scopeMenu), o = np(lp, e.__scopeMenu);
	return /* @__PURE__ */ (0, R.jsx)(Kf.Provider, {
		scope: e.__scopeMenu,
		children: /* @__PURE__ */ (0, R.jsx)(Hi, {
			present: r || a.open,
			children: /* @__PURE__ */ (0, R.jsx)(Kf.Slot, {
				scope: e.__scopeMenu,
				children: o.modal ? /* @__PURE__ */ (0, R.jsx)(pp, {
					...i,
					ref: t
				}) : /* @__PURE__ */ (0, R.jsx)(mp, {
					...i,
					ref: t
				})
			})
		})
	});
}, "MenuContent")), pp = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let n = ep(lp, e.__scopeMenu), r = _.useRef(null), i = U(t, r);
	return _.useEffect(() => {
		let e = r.current;
		if (e) return cc(e);
	}, []), /* @__PURE__ */ (0, R.jsx)(gp, {
		...e,
		ref: i,
		trapFocus: n.open,
		disableOutsidePointerEvents: n.open,
		disableOutsideScroll: !0,
		onFocusOutside: G(e.onFocusOutside, (e) => e.preventDefault(), { checkForDefaultPrevented: !1 }),
		onDismiss: () => n.onOpenChange(!1)
	});
}, "MenuRootContentModal")), mp = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let n = ep(lp, e.__scopeMenu);
	return /* @__PURE__ */ (0, R.jsx)(gp, {
		...e,
		ref: t,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		disableOutsideScroll: !1,
		onDismiss: () => n.onOpenChange(!1)
	});
}, "MenuRootContentNonModal")), hp = /* @__PURE__ */ Nr("MenuContent.ScrollLock"), gp = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { __scopeMenu: n, loop: r = !1, trapFocus: i, onOpenAutoFocus: a, onCloseAutoFocus: o, disableOutsidePointerEvents: s, onEntryFocus: c, onEscapeKeyDown: l, onPointerDownOutside: u, onFocusOutside: d, onInteractOutside: f, onDismiss: p, disableOutsideScroll: m, ...h } = e, g = ep(lp, n), v = np(lp, n), y = Zf(n), b = Qf(n), x = qf(n), [S, C] = _.useState(null), w = _.useRef(null), T = U(t, w, g.onContentChange), E = _.useRef(0), D = _.useRef(""), O = _.useRef(0), k = _.useRef(null), A = _.useRef("right"), j = _.useRef(0), M = m ? $s : _.Fragment, N = m ? {
		as: hp,
		allowPinchZoom: !0
	} : void 0, P = /* @__PURE__ */ K((e) => {
		let t = D.current + e, n = x().filter((e) => !e.disabled), r = document.activeElement, i = n.find((e) => e.ref.current === r)?.textValue, a = qp(n.map((e) => e.textValue), t, i), o = n.find((e) => e.textValue === a)?.ref.current;
		(/* @__PURE__ */ K((function e(t) {
			D.current = t, window.clearTimeout(E.current), t !== "" && (E.current = window.setTimeout(() => e(""), 1e3));
		}), "updateSearch"))(t), o && setTimeout(() => o.focus());
	}, "handleTypeaheadSearch");
	_.useEffect(() => () => window.clearTimeout(E.current), []), Wo();
	let F = _.useCallback((e) => A.current === k.current?.side && Yp(e, k.current?.area), []);
	return /* @__PURE__ */ (0, R.jsx)(up, {
		scope: n,
		searchRef: D,
		onItemEnter: _.useCallback((e) => {
			F(e) && e.preventDefault();
		}, [F]),
		onItemLeave: _.useCallback((e) => {
			F(e) || (w.current?.focus(), C(null));
		}, [F]),
		onTriggerLeave: _.useCallback((e) => {
			F(e) && e.preventDefault();
		}, [F]),
		pointerGraceTimerRef: O,
		onPointerGraceIntentChange: _.useCallback((e) => {
			k.current = e;
		}, []),
		children: /* @__PURE__ */ (0, R.jsx)(M, {
			...N,
			children: /* @__PURE__ */ (0, R.jsx)(To, {
				asChild: !0,
				trapped: i,
				onMountAutoFocus: G(a, (e) => {
					e.preventDefault(), w.current?.focus({ preventScroll: !0 });
				}),
				onUnmountAutoFocus: o,
				children: /* @__PURE__ */ (0, R.jsx)(po, {
					asChild: !0,
					disableOutsidePointerEvents: s,
					onEscapeKeyDown: l,
					onPointerDownOutside: u,
					onFocusOutside: d,
					onInteractOutside: f,
					onDismiss: p,
					children: /* @__PURE__ */ (0, R.jsx)(If, {
						asChild: !0,
						...b,
						dir: v.dir,
						orientation: "vertical",
						loop: r,
						currentTabStopId: S,
						onCurrentTabStopIdChange: C,
						onEntryFocus: G(c, (e) => {
							v.isUsingKeyboardRef.current || e.preventDefault();
						}),
						preventScrollOnEntryFocus: !0,
						children: /* @__PURE__ */ (0, R.jsx)(af, {
							role: "menu",
							"aria-orientation": "vertical",
							"data-state": Hp(g.open),
							"data-radix-menu-content": "",
							dir: v.dir,
							...y,
							...h,
							ref: T,
							style: {
								outline: "none",
								...h.style
							},
							onKeyDown: G(h.onKeyDown, (e) => {
								let t = e.target.closest("[data-radix-menu-content]") === e.currentTarget, n = e.ctrlKey || e.altKey || e.metaKey, r = e.key.length === 1;
								t && (e.key === "Tab" && e.preventDefault(), !n && r && P(e.key));
								let i = w.current;
								if (e.target !== i || !Hf.includes(e.key)) return;
								e.preventDefault();
								let a = x().filter((e) => !e.disabled).map((e) => e.ref.current);
								Vf.includes(e.key) && a.reverse(), Gp(a);
							}),
							onBlur: G(e.onBlur, (e) => {
								e.currentTarget.contains(e.target) || (window.clearTimeout(E.current), D.current = "");
							}),
							onPointerMove: G(e.onPointerMove, Xp((e) => {
								let t = e.target, n = j.current !== e.clientX;
								if (e.currentTarget.contains(t) && n) {
									let t = e.clientX > j.current ? "right" : "left";
									A.current = t, j.current = e.clientX;
								}
							}))
						})
					})
				})
			})
		})
	});
}, "MenuContentImpl")), _p = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ (0, R.jsx)(W.div, {
		role: "group",
		...r,
		ref: t
	});
}, "MenuGroup")), vp = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ (0, R.jsx)(W.div, {
		...r,
		ref: t
	});
}, "MenuLabel")), yp = "MenuItem", bp = "menu.itemSelect", xp = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { disabled: n = !1, onSelect: r, ...i } = e, a = _.useRef(null), o = np(yp, e.__scopeMenu), s = dp(yp, e.__scopeMenu), c = U(t, a), l = _.useRef(!1), u = /* @__PURE__ */ K(() => {
		let e = a.current;
		if (!n && e) {
			let t = new CustomEvent(bp, {
				bubbles: !0,
				cancelable: !0
			});
			e.addEventListener(bp, (e) => r?.(e), { once: !0 }), Yr(e, t), t.defaultPrevented ? l.current = !1 : o.onClose();
		}
	}, "handleSelect");
	return /* @__PURE__ */ (0, R.jsx)(Sp, {
		...i,
		ref: c,
		disabled: n,
		onClick: G(e.onClick, u),
		onPointerDown: (t) => {
			e.onPointerDown?.(t), l.current = !0;
		},
		onPointerUp: G(e.onPointerUp, (e) => {
			l.current || e.currentTarget?.click();
		}),
		onKeyDown: G(e.onKeyDown, (e) => {
			n || e.target !== e.currentTarget || (s.searchRef.current === "" || e.key !== " ") && zf.includes(e.key) && (e.currentTarget.click(), e.preventDefault());
		})
	});
}, "MenuItem")), Sp = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { __scopeMenu: n, disabled: r = !1, textValue: i, ...a } = e, o = dp(yp, n), s = Qf(n), c = _.useRef(null), l = U(t, c), [u, d] = _.useState(!1), [f, p] = _.useState("");
	return _.useEffect(() => {
		let e = c.current;
		e && p((e.textContent ?? "").trim());
	}, [a.children]), /* @__PURE__ */ (0, R.jsx)(Kf.ItemSlot, {
		scope: n,
		disabled: r,
		textValue: i ?? f,
		children: /* @__PURE__ */ (0, R.jsx)(Lf, {
			asChild: !0,
			...s,
			focusable: !r,
			children: /* @__PURE__ */ (0, R.jsx)(W.div, {
				role: "menuitem",
				"data-highlighted": u ? "" : void 0,
				"aria-disabled": r || void 0,
				"data-disabled": r ? "" : void 0,
				...a,
				ref: l,
				onPointerMove: G(e.onPointerMove, Xp((e) => {
					r ? o.onItemLeave(e) : (o.onItemEnter(e), e.defaultPrevented || e.currentTarget.focus({ preventScroll: !0 }));
				})),
				onPointerLeave: G(e.onPointerLeave, Xp((e) => o.onItemLeave(e))),
				onFocus: G(e.onFocus, () => d(!0)),
				onBlur: G(e.onBlur, () => d(!1))
			})
		})
	});
}, "MenuItemImpl")), Cp = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { checked: n = !1, onCheckedChange: r, ...i } = e;
	return /* @__PURE__ */ (0, R.jsx)(Ap, {
		scope: e.__scopeMenu,
		checked: n,
		children: /* @__PURE__ */ (0, R.jsx)(xp, {
			role: "menuitemcheckbox",
			"aria-checked": Up(n) ? "mixed" : n,
			...i,
			ref: t,
			"data-state": Wp(n),
			onSelect: G(i.onSelect, () => r?.(Up(n) ? !0 : !n), { checkForDefaultPrevented: !1 })
		})
	});
}, "MenuCheckboxItem")), [wp, Tp] = Yf("MenuRadioGroup", {
	value: void 0,
	onValueChange: /* @__PURE__ */ K(() => {}, "onValueChange")
}), Ep = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { value: n, onValueChange: r, ...i } = e, a = io(r);
	return /* @__PURE__ */ (0, R.jsx)(wp, {
		scope: e.__scopeMenu,
		value: n,
		onValueChange: a,
		children: /* @__PURE__ */ (0, R.jsx)(_p, {
			...i,
			ref: t
		})
	});
}, "MenuRadioGroup")), Dp = "MenuRadioItem", Op = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { value: n, ...r } = e, i = Tp(Dp, e.__scopeMenu), a = n === i.value;
	return /* @__PURE__ */ (0, R.jsx)(Ap, {
		scope: e.__scopeMenu,
		checked: a,
		children: /* @__PURE__ */ (0, R.jsx)(xp, {
			role: "menuitemradio",
			"aria-checked": a,
			...r,
			ref: t,
			"data-state": Wp(a),
			onSelect: G(r.onSelect, () => i.onValueChange?.(n), { checkForDefaultPrevented: !1 })
		})
	});
}, "MenuRadioItem")), kp = "MenuItemIndicator", [Ap, jp] = Yf(kp, { checked: !1 }), Mp = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { __scopeMenu: n, forceMount: r, ...i } = e, a = jp(kp, n);
	return /* @__PURE__ */ (0, R.jsx)(Hi, {
		present: r || Up(a.checked) || a.checked === !0,
		children: /* @__PURE__ */ (0, R.jsx)(W.span, {
			...i,
			ref: t,
			"data-state": Wp(a.checked)
		})
	});
}, "MenuItemIndicator")), Np = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ (0, R.jsx)(W.div, {
		role: "separator",
		"aria-orientation": "horizontal",
		...r,
		ref: t
	});
}, "MenuSeparator")), Pp = "MenuSub", [Fp, Ip] = Yf(Pp), Lp = /* @__PURE__ */ K((e) => {
	let { __scopeMenu: t, children: n, open: r = !1, onOpenChange: i } = e, a = ep(Pp, t), o = Zf(t), [s, c] = _.useState(null), [l, u] = _.useState(null), d = io(i);
	return _.useEffect(() => (a.open === !1 && d(!1), () => d(!1)), [a.open, d]), /* @__PURE__ */ (0, R.jsx)(nf, {
		...o,
		children: /* @__PURE__ */ (0, R.jsx)($f, {
			scope: t,
			open: r,
			onOpenChange: d,
			content: l,
			onContentChange: u,
			children: /* @__PURE__ */ (0, R.jsx)(Fp, {
				scope: t,
				contentId: Qi(),
				triggerId: Qi(),
				trigger: s,
				onTriggerChange: c,
				children: n
			})
		})
	});
}, "MenuSub"), Rp = "MenuSubTrigger", zp = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let n = ep(Rp, e.__scopeMenu), r = np(Rp, e.__scopeMenu), i = Ip(Rp, e.__scopeMenu), a = dp(Rp, e.__scopeMenu), o = _.useRef(null), { pointerGraceTimerRef: s, onPointerGraceIntentChange: c } = a, l = { __scopeMenu: e.__scopeMenu }, u = _.useCallback(() => {
		o.current && window.clearTimeout(o.current), o.current = null;
	}, []);
	_.useEffect(() => u, [u]), _.useEffect(() => {
		let e = s.current;
		return () => {
			window.clearTimeout(e), c(null);
		};
	}, [s, c]);
	let d = U(t, i.onTriggerChange);
	return /* @__PURE__ */ (0, R.jsx)(ip, {
		asChild: !0,
		...l,
		children: /* @__PURE__ */ (0, R.jsx)(Sp, {
			id: i.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": n.open,
			"aria-controls": n.open ? i.contentId : void 0,
			"data-state": Hp(n.open),
			...e,
			ref: d,
			onClick: (t) => {
				e.onClick?.(t), !(e.disabled || t.defaultPrevented) && (t.currentTarget.focus(), n.open || n.onOpenChange(!0));
			},
			onPointerMove: G(e.onPointerMove, Xp((t) => {
				a.onItemEnter(t), !t.defaultPrevented && !e.disabled && !n.open && !o.current && (a.onPointerGraceIntentChange(null), o.current = window.setTimeout(() => {
					n.onOpenChange(!0), u();
				}, 100));
			})),
			onPointerLeave: G(e.onPointerLeave, Xp((e) => {
				u();
				let t = n.content?.getBoundingClientRect();
				if (t) {
					let r = n.content?.dataset.side, i = r === "right", o = i ? -5 : 5, c = t[i ? "left" : "right"], l = t[i ? "right" : "left"];
					a.onPointerGraceIntentChange({
						area: [
							{
								x: e.clientX + o,
								y: e.clientY
							},
							{
								x: c,
								y: t.top
							},
							{
								x: l,
								y: t.top
							},
							{
								x: l,
								y: t.bottom
							},
							{
								x: c,
								y: t.bottom
							}
						],
						side: r
					}), window.clearTimeout(s.current), s.current = window.setTimeout(() => a.onPointerGraceIntentChange(null), 300);
				} else {
					if (a.onTriggerLeave(e), e.defaultPrevented) return;
					a.onPointerGraceIntentChange(null);
				}
			})),
			onKeyDown: G(e.onKeyDown, (t) => {
				e.disabled || t.target !== t.currentTarget || (a.searchRef.current === "" || t.key !== " ") && Uf[r.dir].includes(t.key) && (n.onOpenChange(!0), n.content?.focus(), t.preventDefault());
			})
		})
	});
}, "MenuSubTrigger")), Bp = "MenuSubContent", Vp = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let n = sp(lp, e.__scopeMenu), { forceMount: r = n.forceMount, align: i = "start", ...a } = e, o = ep(lp, e.__scopeMenu), s = np(lp, e.__scopeMenu), c = Ip(Bp, e.__scopeMenu), l = _.useRef(null), u = U(t, l);
	return /* @__PURE__ */ (0, R.jsx)(Kf.Provider, {
		scope: e.__scopeMenu,
		children: /* @__PURE__ */ (0, R.jsx)(Hi, {
			present: r || o.open,
			children: /* @__PURE__ */ (0, R.jsx)(Kf.Slot, {
				scope: e.__scopeMenu,
				children: /* @__PURE__ */ (0, R.jsx)(gp, {
					id: c.contentId,
					"aria-labelledby": c.triggerId,
					...a,
					ref: u,
					align: i,
					side: s.dir === "rtl" ? "left" : "right",
					disableOutsidePointerEvents: !1,
					disableOutsideScroll: !1,
					trapFocus: !1,
					onOpenAutoFocus: (e) => {
						s.isUsingKeyboardRef.current && l.current?.focus(), e.preventDefault();
					},
					onCloseAutoFocus: (e) => e.preventDefault(),
					onFocusOutside: G(e.onFocusOutside, (e) => {
						e.target !== c.trigger && o.onOpenChange(!1);
					}),
					onEscapeKeyDown: G(e.onEscapeKeyDown, (e) => {
						s.onClose(), e.preventDefault();
					}),
					onKeyDown: G(e.onKeyDown, (e) => {
						let t = e.currentTarget.contains(e.target), n = Wf[s.dir].includes(e.key);
						t && n && (o.onOpenChange(!1), c.trigger?.focus(), e.preventDefault());
					})
				})
			})
		})
	});
}, "MenuSubContent"));
function Hp(e) {
	return e ? "open" : "closed";
}
K(Hp, "getOpenState");
function Up(e) {
	return e === "indeterminate";
}
K(Up, "isIndeterminate");
function Wp(e) {
	return Up(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
K(Wp, "getCheckedState");
function Gp(e) {
	let t = document.activeElement;
	for (let n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
K(Gp, "focusFirst");
function Kp(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
K(Kp, "wrapArray");
function qp(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = Kp(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
K(qp, "getNextMatch");
function Jp(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e], s = t[a], c = o.x, l = o.y, u = s.x, d = s.y;
		l > r != d > r && n < (u - c) * (r - l) / (d - l) + c && (i = !i);
	}
	return i;
}
K(Jp, "isPointInPolygon");
function Yp(e, t) {
	return t ? Jp({
		x: e.clientX,
		y: e.clientY
	}, t) : !1;
}
K(Yp, "isPointerInGraceArea");
function Xp(e) {
	return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
K(Xp, "whenMouse");
var Zp = rp, Qp = ip, $p = cp, em = fp, tm = _p, nm = vp, rm = xp, im = Cp, am = Ep, om = Op, sm = Mp, cm = Np, lm = Lp, um = zp, dm = Vp, fm = Object.defineProperty, pm = (e, t) => fm(e, "name", {
	value: t,
	configurable: !0
}), mm = "DropdownMenu", [hm, gm] = /* @__PURE__ */ ri(mm, [Xf]), _m = Xf(), [vm, ym] = hm(mm), bm = /* @__PURE__ */ pm((e) => {
	let { __scopeDropdownMenu: t, children: n, dir: r, open: i, defaultOpen: a, onOpenChange: o, modal: s = !0 } = e, c = _m(t), l = _.useRef(null), [u, d] = Pi({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: mm
	});
	return /* @__PURE__ */ (0, R.jsx)(vm, {
		scope: t,
		triggerId: Qi(),
		triggerRef: l,
		contentId: Qi(),
		open: u,
		onOpenChange: d,
		onOpenToggle: _.useCallback(() => d((e) => !e), [d]),
		modal: s,
		children: /* @__PURE__ */ (0, R.jsx)(Zp, {
			...c,
			open: u,
			onOpenChange: d,
			dir: r,
			modal: s,
			children: n
		})
	});
}, "DropdownMenu"), xm = "DropdownMenuTrigger", Sm = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ pm(function(e, t) {
	let { __scopeDropdownMenu: n, disabled: r = !1, ...i } = e, a = ym(xm, n), o = _m(n), s = U(t, a.triggerRef);
	return /* @__PURE__ */ (0, R.jsx)(Qp, {
		asChild: !0,
		...o,
		children: /* @__PURE__ */ (0, R.jsx)(W.button, {
			type: "button",
			id: a.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": a.open,
			"aria-controls": a.open ? a.contentId : void 0,
			"data-state": a.open ? "open" : "closed",
			"data-disabled": r ? "" : void 0,
			disabled: r,
			...i,
			ref: s,
			onPointerDown: G(e.onPointerDown, (e) => {
				!r && e.button === 0 && e.ctrlKey === !1 && (a.onOpenToggle(), a.open || e.preventDefault());
			}),
			onKeyDown: G(e.onKeyDown, (e) => {
				r || (["Enter", " "].includes(e.key) && a.onOpenToggle(), e.key === "ArrowDown" && a.onOpenChange(!0), [
					"Enter",
					" ",
					"ArrowDown"
				].includes(e.key) && e.preventDefault());
			})
		})
	});
}, "DropdownMenuTrigger")), Cm = /* @__PURE__ */ pm((e) => {
	let { __scopeDropdownMenu: t, ...n } = e, r = _m(t);
	return /* @__PURE__ */ (0, R.jsx)($p, {
		...r,
		...n
	});
}, "DropdownMenuPortal"), wm = "DropdownMenuContent", Tm = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ pm(function(e, t) {
	let { __scopeDropdownMenu: n, ...r } = e, i = ym(wm, n), a = _m(n), o = _.useRef(!1);
	return /* @__PURE__ */ (0, R.jsx)(em, {
		id: i.contentId,
		"aria-labelledby": i.triggerId,
		...a,
		...r,
		ref: t,
		onCloseAutoFocus: G(e.onCloseAutoFocus, (e) => {
			o.current || i.triggerRef.current?.focus(), o.current = !1, e.preventDefault();
		}),
		onInteractOutside: G(e.onInteractOutside, (e) => {
			let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0, r = t.button === 2 || n;
			(!i.modal || r) && (o.current = !0);
		}),
		style: {
			...e.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
}, "DropdownMenuContent")), Em = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ pm(function(e, t) {
	let { __scopeDropdownMenu: n, ...r } = e, i = _m(n);
	return /* @__PURE__ */ (0, R.jsx)(tm, {
		...i,
		...r,
		ref: t
	});
}, "DropdownMenuGroup")), Dm = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ pm(function(e, t) {
	let { __scopeDropdownMenu: n, ...r } = e, i = _m(n);
	return /* @__PURE__ */ (0, R.jsx)(nm, {
		...i,
		...r,
		ref: t
	});
}, "DropdownMenuLabel")), Om = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ pm(function(e, t) {
	let { __scopeDropdownMenu: n, ...r } = e, i = _m(n);
	return /* @__PURE__ */ (0, R.jsx)(rm, {
		...i,
		...r,
		ref: t
	});
}, "DropdownMenuItem")), km = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ pm(function(e, t) {
	let { __scopeDropdownMenu: n, ...r } = e, i = _m(n);
	return /* @__PURE__ */ (0, R.jsx)(im, {
		...i,
		...r,
		ref: t
	});
}, "DropdownMenuCheckboxItem")), Am = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ pm(function(e, t) {
	let { __scopeDropdownMenu: n, ...r } = e, i = _m(n);
	return /* @__PURE__ */ (0, R.jsx)(am, {
		...i,
		...r,
		ref: t
	});
}, "DropdownMenuRadioGroup")), jm = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ pm(function(e, t) {
	let { __scopeDropdownMenu: n, ...r } = e, i = _m(n);
	return /* @__PURE__ */ (0, R.jsx)(om, {
		...i,
		...r,
		ref: t
	});
}, "DropdownMenuRadioItem")), Mm = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ pm(function(e, t) {
	let { __scopeDropdownMenu: n, ...r } = e, i = _m(n);
	return /* @__PURE__ */ (0, R.jsx)(sm, {
		...i,
		...r,
		ref: t
	});
}, "DropdownMenuItemIndicator")), Nm = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ pm(function(e, t) {
	let { __scopeDropdownMenu: n, ...r } = e, i = _m(n);
	return /* @__PURE__ */ (0, R.jsx)(cm, {
		...i,
		...r,
		ref: t
	});
}, "DropdownMenuSeparator")), Pm = /* @__PURE__ */ pm((e) => {
	let { __scopeDropdownMenu: t, children: n, open: r, onOpenChange: i, defaultOpen: a } = e, o = _m(t), [s, c] = Pi({
		prop: r,
		defaultProp: a ?? !1,
		onChange: i,
		caller: "DropdownMenuSub"
	});
	return /* @__PURE__ */ (0, R.jsx)(lm, {
		...o,
		open: s,
		onOpenChange: c,
		children: n
	});
}, "DropdownMenuSub"), Fm = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ pm(function(e, t) {
	let { __scopeDropdownMenu: n, ...r } = e, i = _m(n);
	return /* @__PURE__ */ (0, R.jsx)(um, {
		...i,
		...r,
		ref: t
	});
}, "DropdownMenuSubTrigger")), Im = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ pm(function(e, t) {
	let { __scopeDropdownMenu: n, ...r } = e, i = _m(n);
	return /* @__PURE__ */ (0, R.jsx)(dm, {
		...i,
		...r,
		ref: t,
		style: {
			...e.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
}, "DropdownMenuSubContent")), Lm = bm, Rm = Sm, zm = Cm, Bm = Tm, Vm = Em, Hm = Dm, Um = Om, Wm = km, Gm = Am, Km = jm, qm = Mm, Jm = Nm, Ym = Pm, Xm = Fm, Zm = Im, Qm = Object.defineProperty, $m = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ ((e, t) => Qm(e, "name", {
	value: t,
	configurable: !0
}))(function(e, t) {
	return /* @__PURE__ */ (0, R.jsx)(W.label, {
		...e,
		ref: t,
		onMouseDown: (t) => {
			t.target.closest("button, input, select, textarea") || (e.onMouseDown?.(t), !t.defaultPrevented && t.detail > 1 && t.preventDefault());
		}
	});
}, "Label")), eh = Object.defineProperty, th = (e, t) => eh(e, "name", {
	value: t,
	configurable: !0
});
function nh(e) {
	let t = _.useRef({
		value: e,
		previous: e
	});
	return _.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
th(nh, "usePrevious");
//#endregion
//#region node_modules/@radix-ui/number/dist/index.mjs
var rh = Object.defineProperty, ih = (e, t) => rh(e, "name", {
	value: t,
	configurable: !0
});
function ah(e, [t, n]) {
	return Math.min(n, Math.max(t, e));
}
ih(ah, "clamp");
//#endregion
//#region node_modules/@radix-ui/react-popover/dist/index.mjs
var oh = Object.defineProperty, sh = (e, t) => oh(e, "name", {
	value: t,
	configurable: !0
}), ch = "Popover", [lh, uh] = /* @__PURE__ */ ri(ch, [Bd]), dh = Bd(), [fh, ph] = lh(ch), mh = /* @__PURE__ */ sh((e) => {
	let { __scopePopover: t, children: n, open: r, defaultOpen: i, onOpenChange: a, modal: o = !1 } = e, s = dh(t), c = _.useRef(null), [l, u] = _.useState(!1), [d, f] = Pi({
		prop: r,
		defaultProp: i ?? !1,
		onChange: a,
		caller: ch
	});
	return /* @__PURE__ */ (0, R.jsx)(nf, {
		...s,
		children: /* @__PURE__ */ (0, R.jsx)(fh, {
			scope: t,
			contentId: Qi(),
			triggerRef: c,
			open: d,
			onOpenChange: f,
			onOpenToggle: _.useCallback(() => f((e) => !e), [f]),
			hasCustomAnchor: l,
			onCustomAnchorAdd: _.useCallback(() => u(!0), []),
			onCustomAnchorRemove: _.useCallback(() => u(!1), []),
			modal: o,
			children: n
		})
	});
}, "Popover"), hh = "PopoverAnchor", gh = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ sh(function(e, t) {
	let { __scopePopover: n, ...r } = e, i = ph(hh, n), a = dh(n), { onCustomAnchorAdd: o, onCustomAnchorRemove: s } = i;
	return _.useEffect(() => (o(), () => s()), [o, s]), /* @__PURE__ */ (0, R.jsx)(rf, {
		...a,
		...r,
		ref: t
	});
}, "PopoverAnchor")), _h = "PopoverTrigger", vh = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ sh(function(e, t) {
	let { __scopePopover: n, ...r } = e, i = ph(_h, n), a = dh(n), o = U(t, i.triggerRef), s = /* @__PURE__ */ (0, R.jsx)(W.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i.open,
		"aria-controls": i.open ? i.contentId : void 0,
		"data-state": kh(i.open),
		...r,
		ref: o,
		onClick: G(e.onClick, i.onOpenToggle)
	});
	return i.hasCustomAnchor ? s : /* @__PURE__ */ (0, R.jsx)(rf, {
		asChild: !0,
		...a,
		children: s
	});
}, "PopoverTrigger")), yh = "PopoverPortal", [bh, xh] = lh(yh, { forceMount: void 0 }), Sh = /* @__PURE__ */ sh((e) => {
	let { __scopePopover: t, forceMount: n, children: r, container: i } = e, a = ph(yh, t);
	return /* @__PURE__ */ (0, R.jsx)(bh, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ (0, R.jsx)(Hi, {
			present: n || a.open,
			children: /* @__PURE__ */ (0, R.jsx)(Ro, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
}, "PopoverPortal"), Ch = "PopoverContent", wh = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ sh(function(e, t) {
	let n = xh(Ch, e.__scopePopover), { forceMount: r = n.forceMount, ...i } = e, a = ph(Ch, e.__scopePopover);
	return /* @__PURE__ */ (0, R.jsx)(Hi, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ (0, R.jsx)(Eh, {
			...i,
			ref: t
		}) : /* @__PURE__ */ (0, R.jsx)(Dh, {
			...i,
			ref: t
		})
	});
}, "PopoverContent")), Th = /* @__PURE__ */ Nr("PopoverContent.RemoveScroll"), Eh = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ sh(function(e, t) {
	let n = ph(Ch, e.__scopePopover), r = _.useRef(null), i = U(t, r), a = _.useRef(!1);
	return _.useEffect(() => {
		let e = r.current;
		if (e) return cc(e);
	}, []), /* @__PURE__ */ (0, R.jsx)($s, {
		as: Th,
		allowPinchZoom: !0,
		children: /* @__PURE__ */ (0, R.jsx)(Oh, {
			...e,
			ref: i,
			trapFocus: n.open,
			disableOutsidePointerEvents: !0,
			onCloseAutoFocus: G(e.onCloseAutoFocus, (e) => {
				e.preventDefault(), a.current || n.triggerRef.current?.focus();
			}),
			onPointerDownOutside: G(e.onPointerDownOutside, (e) => {
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0, r = t.button === 2 || n;
				a.current = r;
			}, { checkForDefaultPrevented: !1 }),
			onFocusOutside: G(e.onFocusOutside, (e) => e.preventDefault(), { checkForDefaultPrevented: !1 })
		})
	});
}, "PopoverContentModal")), Dh = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ sh(function(e, t) {
	let n = ph(Ch, e.__scopePopover), r = _.useRef(!1), i = _.useRef(!1);
	return /* @__PURE__ */ (0, R.jsx)(Oh, {
		...e,
		ref: t,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		onCloseAutoFocus: (t) => {
			e.onCloseAutoFocus?.(t), t.defaultPrevented || (r.current || n.triggerRef.current?.focus(), t.preventDefault()), r.current = !1, i.current = !1;
		},
		onInteractOutside: (t) => {
			e.onInteractOutside?.(t), t.defaultPrevented || (r.current = !0, t.detail.originalEvent.type === "pointerdown" && (i.current = !0));
			let a = t.target;
			n.triggerRef.current?.contains(a) && t.preventDefault(), t.detail.originalEvent.type === "focusin" && i.current && t.preventDefault();
		}
	});
}, "PopoverContentNonModal")), Oh = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ sh(function(e, t) {
	let { __scopePopover: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, disableOutsidePointerEvents: o, onEscapeKeyDown: s, onPointerDownOutside: c, onFocusOutside: l, onInteractOutside: u, ...d } = e, f = ph(Ch, n), p = dh(n);
	return Wo(), /* @__PURE__ */ (0, R.jsx)(To, {
		asChild: !0,
		loop: !0,
		trapped: r,
		onMountAutoFocus: i,
		onUnmountAutoFocus: a,
		children: /* @__PURE__ */ (0, R.jsx)(po, {
			asChild: !0,
			disableOutsidePointerEvents: o,
			onInteractOutside: u,
			onEscapeKeyDown: s,
			onPointerDownOutside: c,
			onFocusOutside: l,
			onDismiss: () => f.onOpenChange(!1),
			deferPointerDownOutside: !0,
			children: /* @__PURE__ */ (0, R.jsx)(af, {
				"data-state": kh(f.open),
				role: "dialog",
				id: f.contentId,
				...p,
				...d,
				ref: t,
				style: {
					...d.style,
					"--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
					"--radix-popover-content-available-width": "var(--radix-popper-available-width)",
					"--radix-popover-content-available-height": "var(--radix-popper-available-height)",
					"--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
					"--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
				}
			})
		})
	});
}, "PopoverContentImpl"));
function kh(e) {
	return e ? "open" : "closed";
}
sh(kh, "getState");
var Ah = mh, jh = gh, Mh = vh, Nh = Sh, Ph = wh, Fh = Object.defineProperty, Ih = (e, t) => Fh(e, "name", {
	value: t,
	configurable: !0
}), Lh = "Progress", Rh = 100, [zh, Bh] = /* @__PURE__ */ ri(Lh), [Vh, Hh] = zh(Lh), Uh = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ Ih(function(e, t) {
	let { __scopeProgress: n, value: r = null, max: i, getValueLabel: a = Kh, ...o } = e;
	(i || i === 0) && !Yh(i) && console.error(Zh(`${i}`, "Progress"));
	let s = Yh(i) ? i : Rh;
	r !== null && !Xh(r, s) && console.error(Qh(`${r}`, "Progress"));
	let c = Xh(r, s) ? r : null, l = Jh(c) ? a(c, s) : void 0;
	return /* @__PURE__ */ (0, R.jsx)(Vh, {
		scope: n,
		value: c,
		max: s,
		children: /* @__PURE__ */ (0, R.jsx)(W.div, {
			"aria-valuemax": s,
			"aria-valuemin": 0,
			"aria-valuenow": Jh(c) ? c : void 0,
			"aria-valuetext": l,
			role: "progressbar",
			"data-state": qh(c, s),
			"data-value": c ?? void 0,
			"data-max": s,
			...o,
			ref: t
		})
	});
}, "Progress")), Wh = "ProgressIndicator", Gh = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ Ih(function(e, t) {
	let { __scopeProgress: n, ...r } = e, i = Hh(Wh, n);
	return /* @__PURE__ */ (0, R.jsx)(W.div, {
		"data-state": qh(i.value, i.max),
		"data-value": i.value ?? void 0,
		"data-max": i.max,
		...r,
		ref: t
	});
}, "ProgressIndicator"));
function Kh(e, t) {
	return `${Math.round(e / t * 100)}%`;
}
Ih(Kh, "defaultGetValueLabel");
function qh(e, t) {
	return e == null ? "indeterminate" : e === t ? "complete" : "loading";
}
Ih(qh, "getProgressState");
function Jh(e) {
	return typeof e == "number";
}
Ih(Jh, "isNumber");
function Yh(e) {
	return Jh(e) && !isNaN(e) && e > 0;
}
Ih(Yh, "isValidMaxNumber");
function Xh(e, t) {
	return Jh(e) && !isNaN(e) && e <= t && e >= 0;
}
Ih(Xh, "isValidValueNumber");
function Zh(e, t) {
	return `Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${Rh}\`.`;
}
Ih(Zh, "getInvalidMaxError");
function Qh(e, t) {
	return `Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${Rh} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
Ih(Qh, "getInvalidValueError");
var $h = Uh, eg = Gh, tg = Object.defineProperty, q = (e, t) => tg(e, "name", {
	value: t,
	configurable: !0
});
function ng(e, t) {
	return _.useReducer((e, n) => t[e][n] ?? e, e);
}
q(ng, "useStateMachine");
var rg = "ScrollArea", [ig, ag] = /* @__PURE__ */ ri(rg), [og, sg] = ig(rg), cg = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ q(function(e, t) {
	let { __scopeScrollArea: n, type: r = "hover", dir: i, scrollHideDelay: a = 600, ...o } = e, [s, c] = _.useState(null), [l, u] = _.useState(null), [d, f] = _.useState(null), [p, m] = _.useState(null), [h, g] = _.useState(null), [v, y] = _.useState(0), [b, x] = _.useState(0), [S, C] = _.useState(!1), [w, T] = _.useState(!1), E = U(t, c), D = ya(i);
	return /* @__PURE__ */ (0, R.jsx)(og, {
		scope: n,
		type: r,
		dir: D,
		scrollHideDelay: a,
		scrollArea: s,
		viewport: l,
		onViewportChange: u,
		content: d,
		onContentChange: f,
		scrollbarX: p,
		onScrollbarXChange: m,
		scrollbarXEnabled: S,
		onScrollbarXEnabledChange: C,
		scrollbarY: h,
		onScrollbarYChange: g,
		scrollbarYEnabled: w,
		onScrollbarYEnabledChange: T,
		onCornerWidthChange: y,
		onCornerHeightChange: x,
		children: /* @__PURE__ */ (0, R.jsx)(W.div, {
			dir: D,
			...o,
			ref: E,
			style: {
				position: "relative",
				"--radix-scroll-area-corner-width": v + "px",
				"--radix-scroll-area-corner-height": b + "px",
				...e.style
			}
		})
	});
}, "ScrollArea")), lg = "ScrollAreaViewport", ug = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ q(function(e, t) {
	let { __scopeScrollArea: n, children: r, nonce: i, ...a } = e, o = sg(lg, n), s = U(t, _.useRef(null), o.onViewportChange);
	return /* @__PURE__ */ (0, R.jsxs)(R.Fragment, { children: [/* @__PURE__ */ (0, R.jsx)(dg, { nonce: i }), /* @__PURE__ */ (0, R.jsx)(W.div, {
		"data-radix-scroll-area-viewport": "",
		...a,
		ref: s,
		style: {
			overflowX: o.scrollbarXEnabled ? "scroll" : "hidden",
			overflowY: o.scrollbarYEnabled ? "scroll" : "hidden",
			...e.style
		},
		children: /* @__PURE__ */ (0, R.jsx)("div", {
			ref: o.onContentChange,
			style: {
				minWidth: "100%",
				display: "table"
			},
			children: r
		})
	})] });
}, "ScrollAreaViewport")), dg = /* @__PURE__ */ _.memo(/* @__PURE__ */ q(function({ nonce: e }) {
	return /* @__PURE__ */ (0, R.jsx)("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}" },
		nonce: e
	});
}, "ScrollAreaViewportStyle"), (e, t) => e.nonce === t.nonce), fg = "ScrollAreaScrollbar", pg = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ q(function(e, t) {
	let { forceMount: n, ...r } = e, i = sg(fg, e.__scopeScrollArea), { onScrollbarXEnabledChange: a, onScrollbarYEnabledChange: o } = i, s = e.orientation === "horizontal";
	return _.useEffect(() => (s ? a(!0) : o(!0), () => {
		s ? a(!1) : o(!1);
	}), [
		s,
		a,
		o
	]), i.type === "hover" ? /* @__PURE__ */ (0, R.jsx)(mg, {
		...r,
		ref: t,
		forceMount: n
	}) : i.type === "scroll" ? /* @__PURE__ */ (0, R.jsx)(hg, {
		...r,
		ref: t,
		forceMount: n
	}) : i.type === "auto" ? /* @__PURE__ */ (0, R.jsx)(gg, {
		...r,
		ref: t,
		forceMount: n
	}) : i.type === "always" ? /* @__PURE__ */ (0, R.jsx)(_g, {
		...r,
		ref: t,
		"data-state": "visible"
	}) : null;
}, "ScrollAreaScrollbar")), mg = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ q(function(e, t) {
	let { forceMount: n, ...r } = e, i = sg(fg, e.__scopeScrollArea), [a, o] = _.useState(!1);
	return _.useEffect(() => {
		let e = i.scrollArea, t = 0;
		if (e) {
			let n = /* @__PURE__ */ q(() => {
				window.clearTimeout(t), o(!0);
			}, "handlePointerEnter"), r = /* @__PURE__ */ q(() => {
				t = window.setTimeout(() => o(!1), i.scrollHideDelay);
			}, "handlePointerLeave");
			return e.addEventListener("pointerenter", n), e.addEventListener("pointerleave", r), () => {
				window.clearTimeout(t), e.removeEventListener("pointerenter", n), e.removeEventListener("pointerleave", r);
			};
		}
	}, [i.scrollArea, i.scrollHideDelay]), /* @__PURE__ */ (0, R.jsx)(Hi, {
		present: n || a,
		children: /* @__PURE__ */ (0, R.jsx)(gg, {
			"data-state": a ? "visible" : "hidden",
			...r,
			ref: t
		})
	});
}, "ScrollAreaScrollbarHover")), hg = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ q(function(e, t) {
	let { forceMount: n, ...r } = e, i = sg(fg, e.__scopeScrollArea), a = e.orientation === "horizontal", o = Lg(() => c("SCROLL_END"), 100), [s, c] = ng("hidden", {
		hidden: { SCROLL: "scrolling" },
		scrolling: {
			SCROLL_END: "idle",
			POINTER_ENTER: "interacting"
		},
		interacting: {
			SCROLL: "interacting",
			POINTER_LEAVE: "idle"
		},
		idle: {
			HIDE: "hidden",
			SCROLL: "scrolling",
			POINTER_ENTER: "interacting"
		}
	});
	return _.useEffect(() => {
		if (s === "idle") {
			let e = window.setTimeout(() => c("HIDE"), i.scrollHideDelay);
			return () => window.clearTimeout(e);
		}
	}, [
		s,
		i.scrollHideDelay,
		c
	]), _.useEffect(() => {
		let e = i.viewport, t = a ? "scrollLeft" : "scrollTop";
		if (e) {
			let n = e[t], r = /* @__PURE__ */ q(() => {
				let r = e[t];
				n !== r && (c("SCROLL"), o()), n = r;
			}, "handleScroll");
			return e.addEventListener("scroll", r), () => e.removeEventListener("scroll", r);
		}
	}, [
		i.viewport,
		a,
		c,
		o
	]), /* @__PURE__ */ (0, R.jsx)(Hi, {
		present: n || s !== "hidden",
		children: /* @__PURE__ */ (0, R.jsx)(_g, {
			"data-state": s === "hidden" ? "hidden" : "visible",
			...r,
			ref: t,
			onPointerEnter: G(e.onPointerEnter, () => c("POINTER_ENTER")),
			onPointerLeave: G(e.onPointerLeave, () => c("POINTER_LEAVE"))
		})
	});
}, "ScrollAreaScrollbarScroll")), gg = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ q(function(e, t) {
	let n = sg(fg, e.__scopeScrollArea), { forceMount: r, ...i } = e, [a, o] = _.useState(!1), s = e.orientation === "horizontal", c = Lg(() => {
		if (n.viewport) {
			let e = n.viewport.offsetWidth < n.viewport.scrollWidth, t = n.viewport.offsetHeight < n.viewport.scrollHeight;
			o(s ? e : t);
		}
	}, 10);
	return Rg(n.viewport, c), Rg(n.content, c), /* @__PURE__ */ (0, R.jsx)(Hi, {
		present: r || a,
		children: /* @__PURE__ */ (0, R.jsx)(_g, {
			"data-state": a ? "visible" : "hidden",
			...i,
			ref: t
		})
	});
}, "ScrollAreaScrollbarAuto")), _g = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ q(function(e, t) {
	let { orientation: n = "vertical", ...r } = e, i = sg(fg, e.__scopeScrollArea), a = _.useRef(null), o = _.useRef(0), [s, c] = _.useState({
		content: 0,
		viewport: 0,
		scrollbar: {
			size: 0,
			paddingStart: 0,
			paddingEnd: 0
		}
	}), l = Ag(s.viewport, s.content), u = {
		...r,
		sizes: s,
		onSizesChange: c,
		hasThumb: l > 0 && l < 1,
		onThumbChange: /* @__PURE__ */ q((e) => a.current = e, "onThumbChange"),
		onThumbPointerUp: /* @__PURE__ */ q(() => o.current = 0, "onThumbPointerUp"),
		onThumbPointerDown: /* @__PURE__ */ q((e) => o.current = e, "onThumbPointerDown")
	};
	function d(e, t) {
		return Mg(e, o.current, s, t);
	}
	return q(d, "getScrollPosition"), n === "horizontal" ? /* @__PURE__ */ (0, R.jsx)(vg, {
		...u,
		ref: t,
		onThumbPositionChange: () => {
			if (i.viewport && a.current) {
				let e = i.viewport.scrollLeft, t = Ng(e, s, i.dir);
				a.current.style.transform = `translate3d(${t}px, 0, 0)`;
			}
		},
		onWheelScroll: (e) => {
			i.viewport && (i.viewport.scrollLeft = e);
		},
		onDragScroll: (e) => {
			i.viewport && (i.viewport.scrollLeft = d(e, i.dir));
		}
	}) : n === "vertical" ? /* @__PURE__ */ (0, R.jsx)(yg, {
		...u,
		ref: t,
		onThumbPositionChange: () => {
			if (i.viewport && a.current) {
				let e = i.viewport.scrollTop, t = Ng(e, s);
				a.current.style.transform = `translate3d(0, ${t}px, 0)`;
			}
		},
		onWheelScroll: (e) => {
			i.viewport && (i.viewport.scrollTop = e);
		},
		onDragScroll: (e) => {
			i.viewport && (i.viewport.scrollTop = d(e));
		}
	}) : null;
}, "ScrollAreaScrollbarVisible")), vg = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ q(function(e, t) {
	let { sizes: n, onSizesChange: r, ...i } = e, a = sg(fg, e.__scopeScrollArea), [o, s] = _.useState(), c = _.useRef(null), l = U(t, c, a.onScrollbarXChange);
	return _.useEffect(() => {
		c.current && s(getComputedStyle(c.current));
	}, [c]), /* @__PURE__ */ (0, R.jsx)(Sg, {
		"data-orientation": "horizontal",
		...i,
		ref: l,
		sizes: n,
		style: {
			bottom: 0,
			left: a.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
			right: a.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
			"--radix-scroll-area-thumb-width": jg(n) + "px",
			...e.style
		},
		onThumbPointerDown: (t) => e.onThumbPointerDown(t.x),
		onDragScroll: (t) => e.onDragScroll(t.x),
		onWheelScroll: (t, n) => {
			if (a.viewport) {
				let r = a.viewport.scrollLeft + t.deltaX;
				e.onWheelScroll(r), Fg(r, n) && t.preventDefault();
			}
		},
		onResize: () => {
			c.current && a.viewport && o && r({
				content: a.viewport.scrollWidth,
				viewport: a.viewport.offsetWidth,
				scrollbar: {
					size: c.current.clientWidth,
					paddingStart: kg(o.paddingLeft),
					paddingEnd: kg(o.paddingRight)
				}
			});
		}
	});
}, "ScrollAreaScrollbarX")), yg = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ q(function(e, t) {
	let { sizes: n, onSizesChange: r, ...i } = e, a = sg(fg, e.__scopeScrollArea), [o, s] = _.useState(), c = _.useRef(null), l = U(t, c, a.onScrollbarYChange);
	return _.useEffect(() => {
		c.current && s(getComputedStyle(c.current));
	}, [c]), /* @__PURE__ */ (0, R.jsx)(Sg, {
		"data-orientation": "vertical",
		...i,
		ref: l,
		sizes: n,
		style: {
			top: 0,
			right: a.dir === "ltr" ? 0 : void 0,
			left: a.dir === "rtl" ? 0 : void 0,
			bottom: "var(--radix-scroll-area-corner-height)",
			"--radix-scroll-area-thumb-height": jg(n) + "px",
			...e.style
		},
		onThumbPointerDown: (t) => e.onThumbPointerDown(t.y),
		onDragScroll: (t) => e.onDragScroll(t.y),
		onWheelScroll: (t, n) => {
			if (a.viewport) {
				let r = a.viewport.scrollTop + t.deltaY;
				e.onWheelScroll(r), Fg(r, n) && t.preventDefault();
			}
		},
		onResize: () => {
			c.current && a.viewport && o && r({
				content: a.viewport.scrollHeight,
				viewport: a.viewport.offsetHeight,
				scrollbar: {
					size: c.current.clientHeight,
					paddingStart: kg(o.paddingTop),
					paddingEnd: kg(o.paddingBottom)
				}
			});
		}
	});
}, "ScrollAreaScrollbarY")), [bg, xg] = ig(fg), Sg = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ q(function(e, t) {
	let { __scopeScrollArea: n, sizes: r, hasThumb: i, onThumbChange: a, onThumbPointerUp: o, onThumbPointerDown: s, onThumbPositionChange: c, onDragScroll: l, onWheelScroll: u, onResize: d, ...f } = e, p = sg(fg, n), [m, h] = _.useState(null), g = U(t, h), v = _.useRef(null), y = _.useRef(""), b = p.viewport, x = r.content - r.viewport, S = io(u), C = io(c), w = Lg(d, 10);
	function T(e) {
		if (v.current) {
			let t = e.clientX - v.current.left, n = e.clientY - v.current.top;
			l({
				x: t,
				y: n
			});
		}
	}
	return q(T, "handleDragScroll"), _.useEffect(() => {
		let e = /* @__PURE__ */ q((e) => {
			let t = e.target;
			m?.contains(t) && S(e, x);
		}, "handleWheel");
		return document.addEventListener("wheel", e, { passive: !1 }), () => document.removeEventListener("wheel", e, { passive: !1 });
	}, [
		b,
		m,
		x,
		S
	]), _.useEffect(C, [r, C]), Rg(m, w), Rg(p.content, w), /* @__PURE__ */ (0, R.jsx)(bg, {
		scope: n,
		scrollbar: m,
		hasThumb: i,
		onThumbChange: io(a),
		onThumbPointerUp: io(o),
		onThumbPositionChange: C,
		onThumbPointerDown: io(s),
		children: /* @__PURE__ */ (0, R.jsx)(W.div, {
			...f,
			ref: g,
			style: {
				position: "absolute",
				...f.style
			},
			onPointerDown: G(e.onPointerDown, (e) => {
				e.button === 0 && (e.target.setPointerCapture(e.pointerId), v.current = m.getBoundingClientRect(), y.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", p.viewport && (p.viewport.style.scrollBehavior = "auto"), T(e));
			}),
			onPointerMove: G(e.onPointerMove, T),
			onPointerUp: G(e.onPointerUp, (e) => {
				let t = e.target;
				t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), document.body.style.webkitUserSelect = y.current, p.viewport && (p.viewport.style.scrollBehavior = ""), v.current = null;
			})
		})
	});
}, "ScrollAreaScrollbarImpl")), Cg = "ScrollAreaThumb", wg = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ q(function(e, t) {
	let { forceMount: n, ...r } = e, i = xg(Cg, e.__scopeScrollArea);
	return /* @__PURE__ */ (0, R.jsx)(Hi, {
		present: n || i.hasThumb,
		children: /* @__PURE__ */ (0, R.jsx)(Tg, {
			ref: t,
			...r
		})
	});
}, "ScrollAreaThumb")), Tg = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ q(function(e, t) {
	let { __scopeScrollArea: n, style: r, ...i } = e, a = sg(Cg, n), o = xg(Cg, n), { onThumbPositionChange: s } = o, c = U(t, o.onThumbChange), l = _.useRef(void 0), u = Lg(() => {
		l.current &&= (l.current(), void 0);
	}, 100);
	return _.useEffect(() => {
		let e = a.viewport;
		if (e) {
			let t = /* @__PURE__ */ q(() => {
				if (u(), !l.current) {
					let t = Ig(e, s);
					l.current = t, s();
				}
			}, "handleScroll");
			return s(), e.addEventListener("scroll", t), () => e.removeEventListener("scroll", t);
		}
	}, [
		a.viewport,
		u,
		s
	]), /* @__PURE__ */ (0, R.jsx)(W.div, {
		"data-state": o.hasThumb ? "visible" : "hidden",
		...i,
		ref: c,
		style: {
			width: "var(--radix-scroll-area-thumb-width)",
			height: "var(--radix-scroll-area-thumb-height)",
			...r
		},
		onPointerDownCapture: G(e.onPointerDownCapture, (e) => {
			let t = e.target.getBoundingClientRect(), n = e.clientX - t.left, r = e.clientY - t.top;
			o.onThumbPointerDown({
				x: n,
				y: r
			});
		}),
		onPointerUp: G(e.onPointerUp, o.onThumbPointerUp)
	});
}, "ScrollAreaThumbImpl")), Eg = "ScrollAreaCorner", Dg = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ q(function(e, t) {
	let n = sg(Eg, e.__scopeScrollArea), r = !!(n.scrollbarX && n.scrollbarY);
	return n.type !== "scroll" && r ? /* @__PURE__ */ (0, R.jsx)(Og, {
		...e,
		ref: t
	}) : null;
}, "ScrollAreaCorner")), Og = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ q(function(e, t) {
	let { __scopeScrollArea: n, ...r } = e, i = sg(Eg, n), [a, o] = _.useState(0), [s, c] = _.useState(0), l = !!(a && s), { onCornerWidthChange: u, onCornerHeightChange: d } = i;
	return Rg(i.scrollbarX, () => {
		let e = i.scrollbarX?.offsetHeight || 0;
		i.onCornerHeightChange(e), c(e);
	}), Rg(i.scrollbarY, () => {
		let e = i.scrollbarY?.offsetWidth || 0;
		i.onCornerWidthChange(e), o(e);
	}), _.useEffect(() => () => {
		u(0), d(0);
	}, [u, d]), l ? /* @__PURE__ */ (0, R.jsx)(W.div, {
		...r,
		ref: t,
		style: {
			width: a,
			height: s,
			position: "absolute",
			right: i.dir === "ltr" ? 0 : void 0,
			left: i.dir === "rtl" ? 0 : void 0,
			bottom: 0,
			...e.style
		}
	}) : null;
}, "ScrollAreaCornerImpl"));
function kg(e) {
	return e ? parseInt(e, 10) : 0;
}
q(kg, "toInt");
function Ag(e, t) {
	let n = e / t;
	return isNaN(n) ? 0 : n;
}
q(Ag, "getThumbRatio");
function jg(e) {
	let t = Ag(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - n) * t;
	return Math.max(r, 18);
}
q(jg, "getThumbSize");
function Mg(e, t, n, r = "ltr") {
	let i = jg(n), a = i / 2, o = t || a, s = i - o, c = n.scrollbar.paddingStart + o, l = n.scrollbar.size - n.scrollbar.paddingEnd - s, u = n.content - n.viewport, d = r === "ltr" ? [0, u] : [u * -1, 0];
	return Pg([c, l], d)(e);
}
q(Mg, "getScrollPositionFromPointer");
function Ng(e, t, n = "ltr") {
	let r = jg(t), i = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, a = t.scrollbar.size - i, o = t.content - t.viewport, s = a - r, c = ah(e, n === "ltr" ? [0, o] : [o * -1, 0]);
	return Pg([0, o], [0, s])(c);
}
q(Ng, "getThumbOffsetFromScroll");
function Pg(e, t) {
	return (n) => {
		if (e[0] === e[1] || t[0] === t[1]) return t[0];
		let r = (t[1] - t[0]) / (e[1] - e[0]);
		return t[0] + r * (n - e[0]);
	};
}
q(Pg, "linearScale");
function Fg(e, t) {
	return e > 0 && e < t;
}
q(Fg, "isScrollingWithinScrollbarBounds");
var Ig = /* @__PURE__ */ q((e, t = () => {}) => {
	let n = {
		left: e.scrollLeft,
		top: e.scrollTop
	}, r = 0;
	return (/* @__PURE__ */ q((function i() {
		let a = {
			left: e.scrollLeft,
			top: e.scrollTop
		}, o = n.left !== a.left, s = n.top !== a.top;
		(o || s) && t(), n = a, r = window.requestAnimationFrame(i);
	}), "loop"))(), () => window.cancelAnimationFrame(r);
}, "addUnlinkedScrollListener");
function Lg(e, t) {
	let n = io(e), r = _.useRef(0);
	return _.useEffect(() => () => window.clearTimeout(r.current), []), _.useCallback(() => {
		window.clearTimeout(r.current), r.current = window.setTimeout(n, t);
	}, [n, t]);
}
q(Lg, "useDebounceCallback");
function Rg(e, t) {
	let n = io(t);
	Ti(() => {
		let t = 0;
		if (e) {
			let r = new ResizeObserver(() => {
				cancelAnimationFrame(t), t = window.requestAnimationFrame(n);
			});
			return r.observe(e), () => {
				window.cancelAnimationFrame(t), r.unobserve(e);
			};
		}
	}, [e, n]);
}
q(Rg, "useResizeObserver");
var zg = cg, Bg = ug, Vg = Dg, Hg = Object.defineProperty, J = (e, t) => Hg(e, "name", {
	value: t,
	configurable: !0
}), Ug = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], Wg = [" ", "Enter"], Gg = "Select", [Kg, qg, Jg] = /* @__PURE__ */ si(Gg), [Yg, Xg] = /* @__PURE__ */ ri(Gg, [Jg, Bd]), Zg = Bd(), [Qg, $g] = Yg(Gg), [e_, t_] = Yg(Gg);
function n_(e) {
	let { __scopeSelect: t, children: n, open: r, defaultOpen: i, onOpenChange: a, value: o, defaultValue: s, onValueChange: c, dir: l, name: u, autoComplete: d, disabled: f, required: p, form: m, internal_do_not_use_render: h } = e, g = Zg(t), [v, y] = _.useState(null), [b, x] = _.useState(null), [S, C] = _.useState(!1), w = ya(l), [T, E] = Pi({
		prop: r,
		defaultProp: i ?? !1,
		onChange: a,
		caller: Gg
	}), [D, O] = Pi({
		prop: o,
		defaultProp: s,
		onChange: c,
		caller: Gg
	}), k = _.useRef(null), A = _.useRef(D);
	_.useEffect(() => {
		let e = m ? v?.ownerDocument.getElementById(m) : v?.form;
		if (e instanceof HTMLFormElement) {
			let t = /* @__PURE__ */ J(() => O(A.current), "reset");
			return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
		}
	}, [
		m,
		v,
		O
	]);
	let j = !v || !!m || !!v.closest("form"), [M, N] = _.useState(/* @__PURE__ */ new Set()), P = Qi(), F = Array.from(M).map((e) => e.props.value).join(";"), I = _.useCallback((e) => {
		N((t) => new Set(t).add(e));
	}, []), ee = _.useCallback((e) => {
		N((t) => {
			let n = new Set(t);
			return n.delete(e), n;
		});
	}, []), te = {
		required: p,
		trigger: v,
		onTriggerChange: y,
		valueNode: b,
		onValueNodeChange: x,
		valueNodeHasChildren: S,
		onValueNodeHasChildrenChange: C,
		contentId: P,
		value: D,
		onValueChange: O,
		open: T,
		onOpenChange: E,
		dir: w,
		triggerPointerDownPosRef: k,
		disabled: f,
		name: u,
		autoComplete: d,
		form: m,
		nativeOptions: M,
		nativeSelectKey: F,
		isFormControl: j
	};
	return /* @__PURE__ */ (0, R.jsx)(nf, {
		...g,
		children: /* @__PURE__ */ (0, R.jsx)(Qg, {
			scope: t,
			...te,
			children: /* @__PURE__ */ (0, R.jsx)(Kg.Provider, {
				scope: t,
				children: /* @__PURE__ */ (0, R.jsx)(e_, {
					scope: t,
					onNativeOptionAdd: I,
					onNativeOptionRemove: ee,
					children: q_(h) ? h(te) : n
				})
			})
		})
	});
}
J(n_, "SelectProvider");
var r_ = /* @__PURE__ */ J((e) => {
	let { __scopeSelect: t, children: n, ...r } = e;
	return /* @__PURE__ */ (0, R.jsx)(n_, {
		__scopeSelect: t,
		...r,
		internal_do_not_use_render: ({ isFormControl: e }) => /* @__PURE__ */ (0, R.jsxs)(R.Fragment, { children: [n, e ? /* @__PURE__ */ (0, R.jsx)(K_, { __scopeSelect: t }) : null] })
	});
}, "Select"), i_ = "SelectTrigger", a_ = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ J(function(e, t) {
	let { __scopeSelect: n, disabled: r = !1, ...i } = e, a = Zg(n), o = $g(i_, n), s = o.disabled || r, c = U(t, o.onTriggerChange), l = qg(n), u = _.useRef("touch"), [d, f, p] = Y_((e) => {
		let t = l().filter((e) => !e.disabled), n = X_(t, e, t.find((e) => e.value === o.value));
		n !== void 0 && o.onValueChange(n.value);
	}), m = /* @__PURE__ */ J((e) => {
		s || (o.onOpenChange(!0), p()), e && (o.triggerPointerDownPosRef.current = {
			x: Math.round(e.pageX),
			y: Math.round(e.pageY)
		});
	}, "handleOpen");
	return /* @__PURE__ */ (0, R.jsx)(rf, {
		asChild: !0,
		...a,
		children: /* @__PURE__ */ (0, R.jsx)(W.button, {
			type: "button",
			role: "combobox",
			"aria-controls": o.open ? o.contentId : void 0,
			"aria-expanded": o.open,
			"aria-required": o.required,
			"aria-autocomplete": "none",
			dir: o.dir,
			"data-state": o.open ? "open" : "closed",
			disabled: s,
			"data-disabled": s ? "" : void 0,
			"data-placeholder": J_(o.value) ? "" : void 0,
			...i,
			ref: c,
			onClick: G(i.onClick, (e) => {
				e.currentTarget.focus(), u.current !== "mouse" && m(e);
			}),
			onPointerDown: G(i.onPointerDown, (e) => {
				u.current = e.pointerType;
				let t = e.target;
				t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), e.button === 0 && e.ctrlKey === !1 && e.pointerType === "mouse" && (m(e), e.preventDefault());
			}),
			onKeyDown: G(i.onKeyDown, (e) => {
				let t = d.current !== "";
				!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && f(e.key), !(t && e.key === " ") && Ug.includes(e.key) && (m(), e.preventDefault());
			})
		})
	});
}, "SelectTrigger")), o_ = "SelectValue", s_ = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ J(function(e, t) {
	let { __scopeSelect: n, className: r, style: i, children: a, placeholder: o = "", ...s } = e, c = $g(o_, n), { onValueNodeHasChildrenChange: l } = c, u = a !== void 0, d = U(t, c.onValueNodeChange);
	Ti(() => {
		l(u);
	}, [l, u]);
	let f = J_(c.value);
	return /* @__PURE__ */ (0, R.jsx)(W.span, {
		...s,
		asChild: !f && s.asChild,
		ref: d,
		style: { pointerEvents: "none" },
		children: /* @__PURE__ */ (0, R.jsx)(_.Fragment, { children: f ? o : a }, f ? "placeholder" : "value")
	});
}, "SelectValue")), c_ = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ J(function(e, t) {
	let { __scopeSelect: n, children: r, ...i } = e;
	return /* @__PURE__ */ (0, R.jsx)(W.span, {
		"aria-hidden": !0,
		...i,
		ref: t,
		children: r || "▼"
	});
}, "SelectIcon")), [l_, u_] = Yg("SelectPortal", { forceMount: void 0 }), d_ = /* @__PURE__ */ J((e) => {
	let { __scopeSelect: t, forceMount: n, ...r } = e;
	return /* @__PURE__ */ (0, R.jsx)(l_, {
		scope: e.__scopeSelect,
		forceMount: n,
		children: /* @__PURE__ */ (0, R.jsx)(Ro, {
			asChild: !0,
			...r
		})
	});
}, "SelectPortal"), f_ = "SelectContent", p_ = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ J(function(e, t) {
	let n = u_(f_, e.__scopeSelect), { forceMount: r = n.forceMount, ...i } = e, a = $g(f_, e.__scopeSelect), [o, s] = _.useState();
	return Ti(() => {
		s(new DocumentFragment());
	}, []), /* @__PURE__ */ (0, R.jsx)(Hi, {
		present: r || a.open,
		children: ({ present: e }) => e ? /* @__PURE__ */ (0, R.jsx)(y_, {
			...i,
			ref: t
		}) : /* @__PURE__ */ (0, R.jsx)(m_, {
			...i,
			fragment: o
		})
	});
}, "SelectContent")), m_ = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ J(function(e, t) {
	let { __scopeSelect: n, children: r, fragment: i } = e;
	return i ? Wt.createPortal(/* @__PURE__ */ (0, R.jsx)(g_, {
		scope: n,
		children: /* @__PURE__ */ (0, R.jsx)(Kg.Slot, {
			scope: n,
			children: /* @__PURE__ */ (0, R.jsx)("div", {
				ref: t,
				children: r
			})
		})
	}), i) : null;
}, "SelectContentFragment")), h_ = 10, [g_, __] = Yg(f_), v_ = /* @__PURE__ */ Nr("SelectContent.RemoveScroll"), y_ = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ J(function(e, t) {
	let { __scopeSelect: n } = e, { position: r = "item-aligned", onCloseAutoFocus: i, onEscapeKeyDown: a, onPointerDownOutside: o, side: s, sideOffset: c, align: l, alignOffset: u, arrowPadding: d, collisionBoundary: f, collisionPadding: p, sticky: m, hideWhenDetached: h, avoidCollisions: g, ...v } = e, y = $g(f_, n), [b, x] = _.useState(null), [S, C] = _.useState(null), w = U(t, x), [T, E] = _.useState(null), [D, O] = _.useState(null), k = qg(n), [A, j] = _.useState(!1), M = _.useRef(!1);
	_.useEffect(() => {
		if (b) return cc(b);
	}, [b]), Wo();
	let N = _.useCallback((e) => {
		let [t, ...n] = k().map((e) => e.ref.current), [r] = n.slice(-1), i = document.activeElement;
		for (let n of e) if (n === i || (n?.scrollIntoView({ block: "nearest" }), n === t && S && (S.scrollTop = 0), n === r && S && (S.scrollTop = S.scrollHeight), n?.focus(), document.activeElement !== i)) return;
	}, [k, S]), P = _.useCallback(() => N([T, b]), [
		N,
		T,
		b
	]);
	_.useEffect(() => {
		A && P();
	}, [A, P]);
	let { onOpenChange: F, triggerPointerDownPosRef: I } = y;
	_.useEffect(() => {
		if (b) {
			let e = {
				x: 0,
				y: 0
			}, t = /* @__PURE__ */ J((t) => {
				e = {
					x: Math.abs(Math.round(t.pageX) - (I.current?.x ?? 0)),
					y: Math.abs(Math.round(t.pageY) - (I.current?.y ?? 0))
				};
			}, "handlePointerMove"), n = /* @__PURE__ */ J((n) => {
				e.x <= 10 && e.y <= 10 ? n.preventDefault() : n.composedPath().includes(b) || F(!1), document.removeEventListener("pointermove", t), I.current = null;
			}, "handlePointerUp");
			return I.current !== null && (document.addEventListener("pointermove", t), document.addEventListener("pointerup", n, {
				capture: !0,
				once: !0
			})), () => {
				document.removeEventListener("pointermove", t), document.removeEventListener("pointerup", n, { capture: !0 });
			};
		}
	}, [
		b,
		F,
		I
	]), _.useEffect(() => {
		let e = /* @__PURE__ */ J(() => F(!1), "close");
		return window.addEventListener("blur", e), window.addEventListener("resize", e), () => {
			window.removeEventListener("blur", e), window.removeEventListener("resize", e);
		};
	}, [F]);
	let [ee, te] = Y_((e) => {
		let t = k().filter((e) => !e.disabled), n = X_(t, e, t.find((e) => e.ref.current === document.activeElement));
		n && setTimeout(() => n.ref.current?.focus());
	}), ne = _.useCallback((e, t, n) => {
		let r = !M.current && !n;
		(y.value !== void 0 && y.value === t || r) && (E(e), r && (M.current = !0));
	}, [y.value]), re = _.useCallback(() => b?.focus(), [b]), L = _.useCallback((e, t, n) => {
		let r = !M.current && !n;
		(y.value !== void 0 && y.value === t || r) && O(e);
	}, [y.value]), ie = r === "popper" ? x_ : b_, ae = ie === x_ ? {
		side: s,
		sideOffset: c,
		align: l,
		alignOffset: u,
		arrowPadding: d,
		collisionBoundary: f,
		collisionPadding: p,
		sticky: m,
		hideWhenDetached: h,
		avoidCollisions: g
	} : {};
	return /* @__PURE__ */ (0, R.jsx)(g_, {
		scope: n,
		content: b,
		viewport: S,
		onViewportChange: C,
		itemRefCallback: ne,
		selectedItem: T,
		onItemLeave: re,
		itemTextRefCallback: L,
		focusSelectedItem: P,
		selectedItemText: D,
		position: r,
		isPositioned: A,
		searchRef: ee,
		children: /* @__PURE__ */ (0, R.jsx)($s, {
			as: v_,
			allowPinchZoom: !0,
			children: /* @__PURE__ */ (0, R.jsx)(To, {
				asChild: !0,
				trapped: y.open,
				onMountAutoFocus: (e) => {
					e.preventDefault();
				},
				onUnmountAutoFocus: G(i, (e) => {
					y.trigger?.focus({ preventScroll: !0 }), e.preventDefault();
				}),
				children: /* @__PURE__ */ (0, R.jsx)(po, {
					asChild: !0,
					disableOutsidePointerEvents: !0,
					onEscapeKeyDown: a,
					onPointerDownOutside: o,
					onFocusOutside: (e) => e.preventDefault(),
					onDismiss: () => y.onOpenChange(!1),
					children: /* @__PURE__ */ (0, R.jsx)(ie, {
						role: "listbox",
						id: y.contentId,
						"data-state": y.open ? "open" : "closed",
						dir: y.dir,
						onContextMenu: (e) => e.preventDefault(),
						...v,
						...ae,
						onPlaced: () => j(!0),
						ref: w,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none",
							...v.style
						},
						onKeyDown: G(v.onKeyDown, (e) => {
							let t = e.ctrlKey || e.altKey || e.metaKey;
							if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && te(e.key), [
								"ArrowUp",
								"ArrowDown",
								"Home",
								"End"
							].includes(e.key)) {
								let t = k().filter((e) => !e.disabled).map((e) => e.ref.current);
								if (["ArrowUp", "End"].includes(e.key) && (t = t.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(e.key)) {
									let n = e.target, r = t.indexOf(n);
									t = t.slice(r + 1);
								}
								setTimeout(() => N(t)), e.preventDefault();
							}
						})
					})
				})
			})
		})
	});
}, "SelectContentImpl")), b_ = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ J(function(e, t) {
	let { __scopeSelect: n, onPlaced: r, ...i } = e, a = $g(f_, n), o = __(f_, n), [s, c] = _.useState(null), [l, u] = _.useState(null), d = U(t, u), f = qg(n), p = _.useRef(!1), m = _.useRef(!0), { viewport: h, selectedItem: g, selectedItemText: v, focusSelectedItem: y } = o, b = _.useCallback(() => {
		if (a.trigger && a.valueNode && s && l && h && g && v) {
			let e = a.trigger.getBoundingClientRect(), t = l.getBoundingClientRect(), n = a.valueNode.getBoundingClientRect(), i = v.getBoundingClientRect();
			if (a.dir !== "rtl") {
				let r = i.left - t.left, a = n.left - r, o = e.left - a, c = e.width + o, l = Math.max(c, t.width), u = window.innerWidth - h_, d = ah(a, [h_, Math.max(h_, u - l)]);
				s.style.minWidth = c + "px", s.style.left = d + "px";
			} else {
				let r = t.right - i.right, a = window.innerWidth - n.right - r, o = window.innerWidth - e.right - a, c = e.width + o, l = Math.max(c, t.width), u = window.innerWidth - h_, d = ah(a, [h_, Math.max(h_, u - l)]);
				s.style.minWidth = c + "px", s.style.right = d + "px";
			}
			let o = f(), c = window.innerHeight - h_ * 2, u = h.scrollHeight, d = window.getComputedStyle(l), m = parseInt(d.borderTopWidth, 10), _ = parseInt(d.paddingTop, 10), y = parseInt(d.borderBottomWidth, 10), b = parseInt(d.paddingBottom, 10), x = m + _ + u + b + y, S = Math.min(g.offsetHeight * 5, x), C = window.getComputedStyle(h), w = parseInt(C.paddingTop, 10), T = parseInt(C.paddingBottom, 10), E = e.top + e.height / 2 - h_, D = c - E, O = g.offsetHeight / 2, k = g.offsetTop + O, A = m + _ + k, j = x - A;
			if (A <= E) {
				let e = o.length > 0 && g === o[o.length - 1].ref.current;
				s.style.bottom = "0px";
				let t = l.clientHeight - h.offsetTop - h.offsetHeight, n = A + Math.max(D, O + (e ? T : 0) + t + y);
				s.style.height = n + "px";
			} else {
				let e = o.length > 0 && g === o[0].ref.current;
				s.style.top = "0px";
				let t = Math.max(E, m + h.offsetTop + (e ? w : 0) + O) + j;
				s.style.height = t + "px", h.scrollTop = A - E + h.offsetTop;
			}
			s.style.margin = `${h_}px 0`, s.style.minHeight = S + "px", s.style.maxHeight = c + "px", r?.(), requestAnimationFrame(() => p.current = !0);
		}
	}, [
		f,
		a.trigger,
		a.valueNode,
		s,
		l,
		h,
		g,
		v,
		a.dir,
		r
	]);
	Ti(() => b(), [b]);
	let [x, S] = _.useState();
	Ti(() => {
		l && S(window.getComputedStyle(l).zIndex);
	}, [l]);
	let C = _.useCallback((e) => {
		e && m.current === !0 && (b(), y?.(), m.current = !1);
	}, [b, y]);
	return /* @__PURE__ */ (0, R.jsx)(S_, {
		scope: n,
		contentWrapper: s,
		shouldExpandOnScrollRef: p,
		onScrollButtonChange: C,
		children: /* @__PURE__ */ (0, R.jsx)("div", {
			ref: c,
			style: {
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: x
			},
			children: /* @__PURE__ */ (0, R.jsx)(W.div, {
				...i,
				ref: d,
				style: {
					boxSizing: "border-box",
					maxHeight: "100%",
					...i.style
				}
			})
		})
	});
}, "SelectItemAlignedPosition")), x_ = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ J(function(e, t) {
	let { __scopeSelect: n, align: r = "start", collisionPadding: i = h_, ...a } = e, o = Zg(n);
	return /* @__PURE__ */ (0, R.jsx)(af, {
		...o,
		...a,
		ref: t,
		align: r,
		collisionPadding: i,
		style: {
			boxSizing: "border-box",
			...a.style,
			"--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-select-content-available-width": "var(--radix-popper-available-width)",
			"--radix-select-content-available-height": "var(--radix-popper-available-height)",
			"--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
}, "SelectPopperPosition")), [S_, C_] = Yg(f_, {}), w_ = "SelectViewport", T_ = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ J(function(e, t) {
	let { __scopeSelect: n, nonce: r, ...i } = e, a = __(w_, n), o = C_(w_, n), s = U(t, a.onViewportChange), c = _.useRef(0);
	return /* @__PURE__ */ (0, R.jsxs)(R.Fragment, { children: [/* @__PURE__ */ (0, R.jsx)("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}" },
		nonce: r
	}), /* @__PURE__ */ (0, R.jsx)(Kg.Slot, {
		scope: n,
		children: /* @__PURE__ */ (0, R.jsx)(W.div, {
			"data-radix-select-viewport": "",
			role: "presentation",
			...i,
			ref: s,
			style: {
				position: "relative",
				flex: 1,
				overflow: "hidden auto",
				...i.style
			},
			onScroll: G(i.onScroll, (e) => {
				let t = e.currentTarget, { contentWrapper: n, shouldExpandOnScrollRef: r } = o;
				if (r?.current && n) {
					let e = Math.abs(c.current - t.scrollTop);
					if (e > 0) {
						let r = window.innerHeight - h_ * 2, i = parseFloat(n.style.minHeight), a = parseFloat(n.style.height), o = Math.max(i, a);
						if (o < r) {
							let i = o + e, a = Math.min(r, i), s = i - a;
							n.style.height = a + "px", n.style.bottom === "0px" && (t.scrollTop = s > 0 ? s : 0, n.style.justifyContent = "flex-end");
						}
					}
				}
				c.current = t.scrollTop;
			})
		})
	})] });
}, "SelectViewport")), [E_, D_] = Yg("SelectGroup"), O_ = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ J(function(e, t) {
	let { __scopeSelect: n, ...r } = e, i = Qi();
	return /* @__PURE__ */ (0, R.jsx)(E_, {
		scope: n,
		id: i,
		children: /* @__PURE__ */ (0, R.jsx)(W.div, {
			role: "group",
			"aria-labelledby": i,
			...r,
			ref: t
		})
	});
}, "SelectGroup")), k_ = "SelectLabel", A_ = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ J(function(e, t) {
	let { __scopeSelect: n, ...r } = e, i = D_(k_, n);
	return /* @__PURE__ */ (0, R.jsx)(W.div, {
		id: i.id,
		...r,
		ref: t
	});
}, "SelectLabel")), j_ = "SelectItem", [M_, N_] = Yg(j_), P_ = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ J(function(e, t) {
	let { __scopeSelect: n, value: r, disabled: i = !1, textValue: a, ...o } = e, s = $g(j_, n), c = __(j_, n), l = s.value === r, [u, d] = _.useState(a ?? ""), [f, p] = _.useState(!1), m = U(t, io((e) => c.itemRefCallback?.(e, r, i))), h = Qi(), g = _.useRef("touch"), v = /* @__PURE__ */ J(() => {
		i || (s.onValueChange(r), s.onOpenChange(!1));
	}, "handleSelect");
	return /* @__PURE__ */ (0, R.jsx)(M_, {
		scope: n,
		value: r,
		disabled: i,
		textId: h,
		isSelected: l,
		onItemTextChange: _.useCallback((e) => {
			d((t) => t || (e?.textContent ?? "").trim());
		}, []),
		children: /* @__PURE__ */ (0, R.jsx)(Kg.ItemSlot, {
			scope: n,
			value: r,
			disabled: i,
			textValue: u,
			children: /* @__PURE__ */ (0, R.jsx)(W.div, {
				role: "option",
				"aria-labelledby": h,
				"data-highlighted": f ? "" : void 0,
				"aria-selected": l && f,
				"data-state": l ? "checked" : "unchecked",
				"aria-disabled": i || void 0,
				"data-disabled": i ? "" : void 0,
				tabIndex: i ? void 0 : -1,
				...o,
				ref: m,
				onFocus: G(o.onFocus, () => p(!0)),
				onBlur: G(o.onBlur, () => p(!1)),
				onClick: G(o.onClick, () => {
					g.current !== "mouse" && v();
				}),
				onPointerUp: G(o.onPointerUp, () => {
					g.current === "mouse" && v();
				}),
				onPointerDown: G(o.onPointerDown, (e) => {
					g.current = e.pointerType;
				}),
				onPointerMove: G(o.onPointerMove, (e) => {
					g.current = e.pointerType, i ? c.onItemLeave?.() : g.current === "mouse" && e.currentTarget.focus({ preventScroll: !0 });
				}),
				onPointerLeave: G(o.onPointerLeave, (e) => {
					e.currentTarget === document.activeElement && c.onItemLeave?.();
				}),
				onKeyDown: G(o.onKeyDown, (e) => {
					i || e.target !== e.currentTarget || (c.searchRef?.current === "" || e.key !== " ") && (Wg.includes(e.key) && v(), e.key === " " && e.preventDefault());
				})
			})
		})
	});
}, "SelectItem")), F_ = "SelectItemText", I_ = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ J(function(e, t) {
	let { __scopeSelect: n, className: r, style: i, ...a } = e, o = $g(F_, n), s = __(F_, n), c = N_(F_, n), l = t_(F_, n), [u, d] = _.useState(null), f = io((e) => s.itemTextRefCallback?.(e, c.value, c.disabled)), p = U(t, d, c.onItemTextChange, f), m = u?.textContent, h = _.useMemo(() => /* @__PURE__ */ (0, R.jsx)("option", {
		value: c.value,
		disabled: c.disabled,
		children: m
	}, c.value), [
		c.disabled,
		c.value,
		m
	]), { onNativeOptionAdd: g, onNativeOptionRemove: v } = l;
	return Ti(() => (g(h), () => v(h)), [
		g,
		v,
		h
	]), /* @__PURE__ */ (0, R.jsxs)(R.Fragment, { children: [/* @__PURE__ */ (0, R.jsx)(W.span, {
		id: c.textId,
		...a,
		ref: p
	}), c.isSelected && o.valueNode && !o.valueNodeHasChildren && !J_(o.value) ? Wt.createPortal(a.children, o.valueNode) : null] });
}, "SelectItemText")), L_ = "SelectItemIndicator", R_ = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ J(function(e, t) {
	let { __scopeSelect: n, ...r } = e;
	return N_(L_, n).isSelected ? /* @__PURE__ */ (0, R.jsx)(W.span, {
		"aria-hidden": !0,
		...r,
		ref: t
	}) : null;
}, "SelectItemIndicator")), z_ = "SelectScrollUpButton", B_ = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ J(function(e, t) {
	let n = __(z_, e.__scopeSelect), r = C_(z_, e.__scopeSelect), [i, a] = _.useState(!1), o = U(t, r.onScrollButtonChange);
	return Ti(() => {
		if (n.viewport && n.isPositioned) {
			let e = function() {
				let e = t.scrollTop > 0;
				a(e);
			};
			J(e, "handleScroll");
			let t = n.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [n.viewport, n.isPositioned]), i ? /* @__PURE__ */ (0, R.jsx)(U_, {
		...e,
		ref: o,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = n;
			e && t && (e.scrollTop -= t.offsetHeight);
		}
	}) : null;
}, "SelectScrollUpButton")), V_ = "SelectScrollDownButton", H_ = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ J(function(e, t) {
	let n = __(V_, e.__scopeSelect), r = C_(V_, e.__scopeSelect), [i, a] = _.useState(!1), o = U(t, r.onScrollButtonChange);
	return Ti(() => {
		if (n.viewport && n.isPositioned) {
			let e = function() {
				let e = t.scrollHeight - t.clientHeight, n = Math.ceil(t.scrollTop) < e;
				a(n);
			};
			J(e, "handleScroll");
			let t = n.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [n.viewport, n.isPositioned]), i ? /* @__PURE__ */ (0, R.jsx)(U_, {
		...e,
		ref: o,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = n;
			e && t && (e.scrollTop += t.offsetHeight);
		}
	}) : null;
}, "SelectScrollDownButton")), U_ = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ J(function(e, t) {
	let { __scopeSelect: n, onAutoScroll: r, ...i } = e, a = __("SelectScrollButton", n), o = _.useRef(null), s = qg(n), c = _.useCallback(() => {
		o.current !== null && (window.clearInterval(o.current), o.current = null);
	}, []);
	return _.useEffect(() => () => c(), [c]), Ti(() => {
		s().find((e) => e.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
	}, [s]), /* @__PURE__ */ (0, R.jsx)(W.div, {
		"aria-hidden": !0,
		...i,
		ref: t,
		style: {
			flexShrink: 0,
			...i.style
		},
		onPointerDown: G(i.onPointerDown, () => {
			o.current === null && (o.current = window.setInterval(r, 50));
		}),
		onPointerMove: G(i.onPointerMove, () => {
			a.onItemLeave?.(), o.current === null && (o.current = window.setInterval(r, 50));
		}),
		onPointerLeave: G(i.onPointerLeave, () => {
			c();
		})
	});
}, "SelectScrollButtonImpl")), W_ = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ J(function(e, t) {
	let { __scopeSelect: n, ...r } = e;
	return /* @__PURE__ */ (0, R.jsx)(W.div, {
		"aria-hidden": !0,
		...r,
		ref: t
	});
}, "SelectSeparator")), G_ = "SelectBubbleInput", K_ = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ J(function({ __scopeSelect: e, ...t }, n) {
	let r = $g(G_, e), { value: i, onValueChange: a, required: o, disabled: s, name: c, autoComplete: l, form: u } = r, { nativeOptions: d, nativeSelectKey: f } = r, p = _.useRef(null), m = U(n, p), h = i ?? "", g = nh(h), v = Array.from(d).some((e) => (e.props.value ?? "") === "");
	return _.useEffect(() => {
		let e = p.current;
		if (!e) return;
		let t = window.HTMLSelectElement.prototype, n = Object.getOwnPropertyDescriptor(t, "value").set;
		if (g !== h && n) {
			let t = new Event("change", { bubbles: !0 });
			n.call(e, h), e.dispatchEvent(t);
		}
	}, [g, h]), /* @__PURE__ */ (0, R.jsxs)(W.select, {
		"aria-hidden": !0,
		required: o,
		tabIndex: -1,
		name: c,
		autoComplete: l,
		disabled: s,
		form: u,
		onChange: (e) => a(e.target.value),
		...t,
		style: {
			...Qr,
			...t.style
		},
		ref: m,
		defaultValue: h,
		children: [J_(i) && !v ? /* @__PURE__ */ (0, R.jsx)("option", { value: "" }) : null, Array.from(d)]
	}, f);
}, "SelectBubbleInput"));
function q_(e) {
	return typeof e == "function";
}
J(q_, "isFunction");
function J_(e) {
	return e === "" || e === void 0;
}
J(J_, "shouldShowPlaceholder");
function Y_(e) {
	let t = io(e), n = _.useRef(""), r = _.useRef(0), i = _.useCallback((e) => {
		let i = n.current + e;
		t(i), (/* @__PURE__ */ J((function e(t) {
			n.current = t, window.clearTimeout(r.current), t !== "" && (r.current = window.setTimeout(() => e(""), 1e3));
		}), "updateSearch"))(i);
	}, [t]), a = _.useCallback(() => {
		n.current = "", window.clearTimeout(r.current);
	}, []);
	return _.useEffect(() => () => window.clearTimeout(r.current), []), [
		n,
		i,
		a
	];
}
J(Y_, "useTypeaheadSearch");
function X_(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = Z_(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.textValue.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
J(X_, "findNextItem");
function Z_(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
J(Z_, "wrapArray");
//#endregion
//#region node_modules/@radix-ui/react-separator/dist/index.mjs
var Q_ = Object.defineProperty, $_ = (e, t) => Q_(e, "name", {
	value: t,
	configurable: !0
}), ev = "horizontal", tv = ["horizontal", "vertical"], nv = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ $_(function(e, t) {
	let { decorative: n, orientation: r = ev, ...i } = e, a = rv(r) ? r : ev, o = n ? { role: "none" } : {
		"aria-orientation": a === "vertical" ? a : void 0,
		role: "separator"
	};
	return /* @__PURE__ */ (0, R.jsx)(W.div, {
		"data-orientation": a,
		...o,
		...i,
		ref: t
	});
}, "Separator"));
function rv(e) {
	return tv.includes(e);
}
$_(rv, "isValidOrientation");
var iv = nv, av = Object.defineProperty, ov = (e, t) => av(e, "name", {
	value: t,
	configurable: !0
}), sv = "Switch", [cv, lv] = /* @__PURE__ */ ri(sv), [uv, dv] = cv(sv);
function fv(e) {
	let { __scopeSwitch: t, checked: n, children: r, defaultChecked: i, disabled: a, form: o, name: s, onCheckedChange: c, required: l, value: u = "on", internal_do_not_use_render: d } = e, [f, p] = Pi({
		prop: n,
		defaultProp: i ?? !1,
		onChange: c,
		caller: sv
	}), [m, h] = _.useState(null), [g, v] = _.useState(null), y = _.useRef(!1), [b, x] = _.useReducer((e) => e + 1, 0), S = {
		checked: f,
		setChecked: p,
		disabled: a,
		control: m,
		setControl: h,
		name: s,
		form: o,
		value: u,
		hasConsumerStoppedPropagationRef: y,
		userInteractionCount: b,
		onUserInteraction: x,
		required: l,
		defaultChecked: i,
		isFormControl: !m || !!o || !!m.closest("form"),
		bubbleInput: g,
		setBubbleInput: v
	};
	return /* @__PURE__ */ (0, R.jsx)(uv, {
		scope: t,
		...S,
		children: bv(d) ? d(S) : r
	});
}
ov(fv, "SwitchProvider");
var pv = "SwitchTrigger", mv = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ ov(function({ __scopeSwitch: e, onClick: t, ...n }, r) {
	let { control: i, form: a, value: o, disabled: s, checked: c, required: l, setControl: u, setChecked: d, hasConsumerStoppedPropagationRef: f, onUserInteraction: p, isFormControl: m, bubbleInput: h } = dv(pv, e), g = U(r, u), v = _.useRef(c);
	return _.useEffect(() => {
		let e = a ? i?.ownerDocument.getElementById(a) : i?.form;
		if (e instanceof HTMLFormElement) {
			let t = /* @__PURE__ */ ov(() => d(v.current), "reset");
			return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
		}
	}, [
		i,
		a,
		d
	]), /* @__PURE__ */ (0, R.jsx)(W.button, {
		type: "button",
		role: "switch",
		"aria-checked": c,
		"aria-required": l,
		"data-state": xv(c),
		"data-disabled": s ? "" : void 0,
		disabled: s,
		value: o,
		...n,
		ref: g,
		onClick: G(t, (e) => {
			p(), d((e) => !e), h && m && (f.current = e.isPropagationStopped(), f.current || e.stopPropagation());
		})
	});
}, "SwitchTrigger")), hv = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ ov(function(e, t) {
	let { __scopeSwitch: n, name: r, checked: i, defaultChecked: a, required: o, disabled: s, value: c, onCheckedChange: l, form: u, ...d } = e;
	return /* @__PURE__ */ (0, R.jsx)(fv, {
		__scopeSwitch: n,
		checked: i,
		defaultChecked: a,
		disabled: s,
		required: o,
		onCheckedChange: l,
		name: r,
		form: u,
		value: c,
		internal_do_not_use_render: ({ isFormControl: e }) => /* @__PURE__ */ (0, R.jsxs)(R.Fragment, { children: [/* @__PURE__ */ (0, R.jsx)(mv, {
			...d,
			ref: t,
			__scopeSwitch: n
		}), e && /* @__PURE__ */ (0, R.jsx)(yv, { __scopeSwitch: n })] })
	});
}, "Switch")), gv = "SwitchThumb", _v = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ ov(function(e, t) {
	let { __scopeSwitch: n, ...r } = e, i = dv(gv, n);
	return /* @__PURE__ */ (0, R.jsx)(W.span, {
		"data-state": xv(i.checked),
		"data-disabled": i.disabled ? "" : void 0,
		...r,
		ref: t
	});
}, "SwitchThumb")), vv = "SwitchBubbleInput", yv = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ ov(function({ __scopeSwitch: e, onClick: t, ...n }, r) {
	let { control: i, hasConsumerStoppedPropagationRef: a, userInteractionCount: o, checked: s, defaultChecked: c, required: l, disabled: u, name: d, value: f, form: p, bubbleInput: m, setBubbleInput: h } = dv(vv, e), g = U(r, h), v = il(i), y = _.useRef(!1), b = _.useRef(s), x = _.useRef(o);
	_.useEffect(() => {
		let e = m;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, n = Object.getOwnPropertyDescriptor(t, "checked").set, r = o !== x.current;
		x.current = o;
		let i = b.current !== s;
		b.current = s;
		let c = !(r && a.current);
		if (i && n) {
			y.current = !r;
			let t = new Event("click", { bubbles: c });
			n.call(e, s), e.dispatchEvent(t), y.current = !1;
		}
	}, [
		m,
		s,
		a,
		o
	]);
	let S = _.useRef(s);
	return /* @__PURE__ */ (0, R.jsx)(W.input, {
		type: "checkbox",
		"aria-hidden": !0,
		defaultChecked: c ?? S.current,
		required: l,
		disabled: u,
		name: d,
		value: f,
		form: p,
		...n,
		tabIndex: -1,
		ref: g,
		onClick: G(t, (e) => {
			y.current && e.stopPropagation();
		}),
		style: {
			...n.style,
			...v,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0,
			transform: "translateX(-100%)"
		}
	});
}, "SwitchBubbleInput"));
function bv(e) {
	return typeof e == "function";
}
ov(bv, "isFunction");
function xv(e) {
	return e ? "checked" : "unchecked";
}
ov(xv, "getState");
//#endregion
//#region node_modules/@radix-ui/react-tabs/dist/index.mjs
var Sv = Object.defineProperty, Cv = (e, t) => Sv(e, "name", {
	value: t,
	configurable: !0
}), wv = "Tabs", [Tv, Ev] = /* @__PURE__ */ ri(wv, [wf]), Dv = wf(), [Ov, kv] = Tv(wv), Av = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ Cv(function(e, t) {
	let { __scopeTabs: n, value: r, onValueChange: i, defaultValue: a, orientation: o = "horizontal", dir: s, activationMode: c = "automatic", ...l } = e, u = ya(s), [d, f] = Pi({
		prop: r,
		onChange: i,
		defaultProp: a ?? "",
		caller: wv
	});
	return /* @__PURE__ */ (0, R.jsx)(Ov, {
		scope: n,
		baseId: Qi(),
		value: d,
		onValueChange: f,
		orientation: o,
		dir: u,
		activationMode: c,
		children: /* @__PURE__ */ (0, R.jsx)(W.div, {
			dir: u,
			"data-orientation": o,
			...l,
			ref: t
		})
	});
}, "Tabs")), jv = "TabsList", Mv = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ Cv(function(e, t) {
	let { __scopeTabs: n, loop: r = !0, ...i } = e, a = kv(jv, n), o = Dv(n);
	return /* @__PURE__ */ (0, R.jsx)(If, {
		asChild: !0,
		...o,
		orientation: a.orientation,
		dir: a.dir,
		loop: r,
		children: /* @__PURE__ */ (0, R.jsx)(W.div, {
			role: "tablist",
			"aria-orientation": a.orientation,
			...i,
			ref: t
		})
	});
}, "TabsList")), Nv = "TabsTrigger", Pv = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ Cv(function(e, t) {
	let { __scopeTabs: n, value: r, disabled: i = !1, ...a } = e, o = kv(Nv, n), s = Dv(n), c = Lv(o.baseId, r), l = Rv(o.baseId, r), u = r === o.value;
	return /* @__PURE__ */ (0, R.jsx)(Lf, {
		asChild: !0,
		...s,
		focusable: !i,
		active: u,
		children: /* @__PURE__ */ (0, R.jsx)(W.button, {
			type: "button",
			role: "tab",
			"aria-selected": u,
			"aria-controls": l,
			"data-state": u ? "active" : "inactive",
			"data-disabled": i ? "" : void 0,
			disabled: i,
			id: c,
			...a,
			ref: t,
			onMouseDown: G(e.onMouseDown, (e) => {
				!i && e.button === 0 && e.ctrlKey === !1 ? o.onValueChange(r) : e.preventDefault();
			}),
			onKeyDown: G(e.onKeyDown, (e) => {
				i || e.target !== e.currentTarget || [" ", "Enter"].includes(e.key) && o.onValueChange(r);
			}),
			onFocus: G(e.onFocus, () => {
				let e = o.activationMode !== "manual";
				!u && !i && e && o.onValueChange(r);
			})
		})
	});
}, "TabsTrigger")), Fv = "TabsContent", Iv = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ Cv(function(e, t) {
	let { __scopeTabs: n, value: r, forceMount: i, children: a, ...o } = e, s = kv(Fv, n), c = Lv(s.baseId, r), l = Rv(s.baseId, r), u = r === s.value, d = _.useRef(u);
	return _.useEffect(() => {
		let e = requestAnimationFrame(() => d.current = !1);
		return () => cancelAnimationFrame(e);
	}, []), /* @__PURE__ */ (0, R.jsx)(Hi, {
		present: i || u,
		children: ({ present: n }) => /* @__PURE__ */ (0, R.jsx)(W.div, {
			"data-state": u ? "active" : "inactive",
			"data-orientation": s.orientation,
			role: "tabpanel",
			"aria-labelledby": c,
			hidden: !n,
			id: l,
			tabIndex: 0,
			...o,
			ref: t,
			style: {
				...e.style,
				animationDuration: d.current ? "0s" : void 0
			},
			children: n && a
		})
	});
}, "TabsContent"));
function Lv(e, t) {
	return `${e}-trigger-${t}`;
}
Cv(Lv, "makeTriggerId");
function Rv(e, t) {
	return `${e}-content-${t}`;
}
Cv(Rv, "makeContentId");
var zv = Av, Bv = Mv, Vv = Pv, Hv = Iv, Uv = Object.defineProperty, Wv = (e, t) => Uv(e, "name", {
	value: t,
	configurable: !0
}), [Gv, Kv] = /* @__PURE__ */ ri("Tooltip", [Bd]), qv = Bd(), Jv = "TooltipProvider", Yv = 700, Xv = "tooltip.open", [Zv, Qv] = Gv(Jv), $v = /* @__PURE__ */ Wv((e) => {
	let { __scopeTooltip: t, delayDuration: n = Yv, skipDelayDuration: r = 300, disableHoverableContent: i = !1, children: a } = e, o = _.useRef(!0), s = _.useRef(!1), c = _.useRef(0);
	return _.useEffect(() => {
		let e = c.current;
		return () => window.clearTimeout(e);
	}, []), /* @__PURE__ */ (0, R.jsx)(Zv, {
		scope: t,
		isOpenDelayedRef: o,
		delayDuration: n,
		onOpen: _.useCallback(() => {
			r <= 0 || (window.clearTimeout(c.current), o.current = !1);
		}, [r]),
		onClose: _.useCallback(() => {
			r <= 0 || (window.clearTimeout(c.current), c.current = window.setTimeout(() => o.current = !0, r));
		}, [r]),
		isPointerInTransitRef: s,
		onPointerInTransitChange: _.useCallback((e) => {
			s.current = e;
		}, []),
		disableHoverableContent: i,
		children: a
	});
}, "TooltipProvider"), ey = "Tooltip", [ty, ny] = Gv(ey), ry = /* @__PURE__ */ Wv((e) => {
	let { __scopeTooltip: t, children: n, open: r, defaultOpen: i, onOpenChange: a, disableHoverableContent: o, delayDuration: s } = e, c = Qv(ey, e.__scopeTooltip), l = qv(t), [u, d] = _.useState(null), [f, p] = _.useState(void 0), m = Qi(), h = _.useRef(0), g = o ?? c.disableHoverableContent, v = s ?? c.delayDuration, y = _.useRef(!1), [b, x] = Pi({
		prop: r,
		defaultProp: i ?? !1,
		onChange: /* @__PURE__ */ Wv((e) => {
			e ? (c.onOpen(), document.dispatchEvent(new CustomEvent(Xv))) : c.onClose(), a?.(e);
		}, "onChange"),
		caller: ey
	}), S = _.useMemo(() => b ? y.current ? "delayed-open" : "instant-open" : "closed", [b]), C = _.useCallback(() => {
		window.clearTimeout(h.current), h.current = 0, y.current = !1, x(!0);
	}, [x]), w = _.useCallback(() => {
		window.clearTimeout(h.current), h.current = 0, x(!1);
	}, [x]), T = _.useCallback(() => {
		window.clearTimeout(h.current), h.current = window.setTimeout(() => {
			y.current = !0, x(!0), h.current = 0;
		}, v);
	}, [v, x]);
	_.useEffect(() => () => {
		h.current &&= (window.clearTimeout(h.current), 0);
	}, []);
	let E = f ?? m;
	return /* @__PURE__ */ (0, R.jsx)(nf, {
		...l,
		children: /* @__PURE__ */ (0, R.jsx)(ty, {
			scope: t,
			contentId: E,
			setContentId: p,
			open: b,
			stateAttribute: S,
			trigger: u,
			onTriggerChange: d,
			onTriggerEnter: _.useCallback(() => {
				c.isOpenDelayedRef.current ? T() : C();
			}, [
				c.isOpenDelayedRef,
				T,
				C
			]),
			onTriggerLeave: _.useCallback(() => {
				g ? w() : (window.clearTimeout(h.current), h.current = 0);
			}, [w, g]),
			onOpen: C,
			onClose: w,
			disableHoverableContent: g,
			children: n
		})
	});
}, "Tooltip"), iy = "TooltipTrigger", ay = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ Wv(function(e, t) {
	let { __scopeTooltip: n, ...r } = e, i = ny(iy, n), a = Qv(iy, n), o = qv(n), s = U(t, _.useRef(null), i.onTriggerChange), c = _.useRef(!1), l = _.useRef(!1), u = _.useCallback(() => c.current = !1, []);
	return _.useEffect(() => () => document.removeEventListener("pointerup", u), [u]), /* @__PURE__ */ (0, R.jsx)(rf, {
		asChild: !0,
		...o,
		children: /* @__PURE__ */ (0, R.jsx)(W.button, {
			"aria-describedby": i.open ? i.contentId : void 0,
			"data-state": i.stateAttribute,
			...r,
			ref: s,
			onPointerMove: G(e.onPointerMove, (e) => {
				e.pointerType !== "touch" && !l.current && !a.isPointerInTransitRef.current && (i.onTriggerEnter(), l.current = !0);
			}),
			onPointerLeave: G(e.onPointerLeave, () => {
				i.onTriggerLeave(), l.current = !1;
			}),
			onPointerDown: G(e.onPointerDown, () => {
				i.open && i.onClose(), c.current = !0, document.addEventListener("pointerup", u, { once: !0 });
			}),
			onFocus: G(e.onFocus, () => {
				c.current || i.onOpen();
			}),
			onBlur: G(e.onBlur, i.onClose),
			onClick: G(e.onClick, i.onClose)
		})
	});
}, "TooltipTrigger")), oy = "TooltipPortal", [sy, cy] = Gv(oy, { forceMount: void 0 }), ly = /* @__PURE__ */ Wv((e) => {
	let { __scopeTooltip: t, forceMount: n, children: r, container: i } = e, a = ny(oy, t);
	return /* @__PURE__ */ (0, R.jsx)(sy, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ (0, R.jsx)(Hi, {
			present: n || a.open,
			children: /* @__PURE__ */ (0, R.jsx)(Ro, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
}, "TooltipPortal"), uy = "TooltipContent", dy = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ Wv(function(e, t) {
	let n = cy(uy, e.__scopeTooltip), { forceMount: r = n.forceMount, side: i = "top", ...a } = e, o = ny(uy, e.__scopeTooltip);
	return /* @__PURE__ */ (0, R.jsx)(Hi, {
		present: r || o.open,
		children: o.disableHoverableContent ? /* @__PURE__ */ (0, R.jsx)(my, {
			side: i,
			...a,
			ref: t
		}) : /* @__PURE__ */ (0, R.jsx)(fy, {
			side: i,
			...a,
			ref: t
		})
	});
}, "TooltipContent")), fy = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ Wv(function(e, t) {
	let n = ny(uy, e.__scopeTooltip), r = Qv(uy, e.__scopeTooltip), i = _.useRef(null), a = U(t, i), [o, s] = _.useState(null), { trigger: c, onClose: l } = n, u = i.current, { onPointerInTransitChange: d } = r, f = _.useCallback(() => {
		s(null), d(!1);
	}, [d]), p = _.useCallback((e, t) => {
		let n = e.currentTarget, r = {
			x: e.clientX,
			y: e.clientY
		}, i = _y(r, gy(r, n.getBoundingClientRect())), a = vy(t.getBoundingClientRect()), o = by([...i, ...a]);
		s(o), d(!0);
	}, [d]);
	return _.useEffect(() => () => f(), [f]), _.useEffect(() => {
		if (c && u) {
			let e = /* @__PURE__ */ Wv((e) => p(e, u), "handleTriggerLeave"), t = /* @__PURE__ */ Wv((e) => p(e, c), "handleContentLeave");
			return c.addEventListener("pointerleave", e), u.addEventListener("pointerleave", t), () => {
				c.removeEventListener("pointerleave", e), u.removeEventListener("pointerleave", t);
			};
		}
	}, [
		c,
		u,
		p,
		f
	]), _.useEffect(() => {
		if (o) {
			let e = /* @__PURE__ */ Wv((e) => {
				let t = e.target, n = {
					x: e.clientX,
					y: e.clientY
				}, r = c?.contains(t) || u?.contains(t), i = !yy(n, o);
				r ? f() : i && (f(), l());
			}, "handleTrackPointerGrace");
			return document.addEventListener("pointermove", e), () => document.removeEventListener("pointermove", e);
		}
	}, [
		c,
		u,
		o,
		l,
		f
	]), /* @__PURE__ */ (0, R.jsx)(my, {
		...e,
		ref: a
	});
}, "TooltipContentHoverable")), py = /* @__PURE__ */ Ir("TooltipContent"), my = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ Wv(function(e, t) {
	let { __scopeTooltip: n, children: r, "aria-label": i, id: a, onEscapeKeyDown: o, onPointerDownOutside: s, ...c } = e, l = ny(uy, n), u = qv(n), { onClose: d } = l;
	_.useEffect(() => (document.addEventListener(Xv, d), () => document.removeEventListener(Xv, d)), [d]), _.useEffect(() => {
		if (l.trigger) {
			let e = /* @__PURE__ */ Wv((e) => {
				e.target instanceof Node && e.target.contains(l.trigger) && d();
			}, "handleScroll");
			return window.addEventListener("scroll", e, { capture: !0 }), () => window.removeEventListener("scroll", e, { capture: !0 });
		}
	}, [l.trigger, d]);
	let { setContentId: f } = l;
	return Ti(() => (f(a), () => {
		f(void 0);
	}), [a, f]), /* @__PURE__ */ (0, R.jsx)(po, {
		asChild: !0,
		disableOutsidePointerEvents: !1,
		onEscapeKeyDown: o,
		onPointerDownOutside: s,
		onFocusOutside: (e) => e.preventDefault(),
		onDismiss: d,
		children: /* @__PURE__ */ (0, R.jsxs)(af, {
			"data-state": l.stateAttribute,
			role: i ? void 0 : "tooltip",
			id: i ? void 0 : l.contentId,
			...u,
			...c,
			ref: t,
			style: {
				...c.style,
				"--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
				"--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
				"--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
				"--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
				"--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
			},
			children: [/* @__PURE__ */ (0, R.jsx)(py, { children: r }), i ? /* @__PURE__ */ (0, R.jsx)($r, {
				id: l.contentId,
				role: "tooltip",
				children: i
			}) : null]
		})
	});
}, "TooltipContentImpl")), hy = /* @__PURE__ */ _.forwardRef(/* @__PURE__ */ Wv(function(e, t) {
	let { __scopeTooltip: n, ...r } = e, i = qv(n);
	return /* @__PURE__ */ (0, R.jsx)(of, {
		...i,
		...r,
		ref: t
	});
}, "TooltipArrow"));
function gy(e, t) {
	let n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), i = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
	switch (Math.min(n, r, i, a)) {
		case a: return "left";
		case i: return "right";
		case n: return "top";
		case r: return "bottom";
		default: throw Error("unreachable");
	}
}
Wv(gy, "getExitSideFromRect");
function _y(e, t, n = 5) {
	let r = [];
	switch (t) {
		case "top":
			r.push({
				x: e.x - n,
				y: e.y + n
			}, {
				x: e.x + n,
				y: e.y + n
			});
			break;
		case "bottom":
			r.push({
				x: e.x - n,
				y: e.y - n
			}, {
				x: e.x + n,
				y: e.y - n
			});
			break;
		case "left":
			r.push({
				x: e.x + n,
				y: e.y - n
			}, {
				x: e.x + n,
				y: e.y + n
			});
			break;
		case "right": r.push({
			x: e.x - n,
			y: e.y - n
		}, {
			x: e.x - n,
			y: e.y + n
		});
	}
	return r;
}
Wv(_y, "getPaddedExitPoints");
function vy(e) {
	let { top: t, right: n, bottom: r, left: i } = e;
	return [
		{
			x: i,
			y: t
		},
		{
			x: n,
			y: t
		},
		{
			x: n,
			y: r
		},
		{
			x: i,
			y: r
		}
	];
}
Wv(vy, "getPointsFromRect");
function yy(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e], s = t[a], c = o.x, l = o.y, u = s.x, d = s.y;
		l > r != d > r && n < (u - c) * (r - l) / (d - l) + c && (i = !i);
	}
	return i;
}
Wv(yy, "isPointInPolygon");
function by(e) {
	let t = e.slice();
	return t.sort((e, t) => e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : +(e.y > t.y)), xy(t);
}
Wv(by, "getHull");
function xy(e) {
	if (e.length <= 1) return e.slice();
	let t = [];
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (; t.length >= 2;) {
			let e = t[t.length - 1], n = t[t.length - 2];
			if ((e.x - n.x) * (r.y - n.y) >= (e.y - n.y) * (r.x - n.x)) t.pop();
			else break;
		}
		t.push(r);
	}
	t.pop();
	let n = [];
	for (let t = e.length - 1; t >= 0; t--) {
		let r = e[t];
		for (; n.length >= 2;) {
			let e = n[n.length - 1], t = n[n.length - 2];
			if ((e.x - t.x) * (r.y - t.y) >= (e.y - t.y) * (r.x - t.x)) n.pop();
			else break;
		}
		n.push(r);
	}
	return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
Wv(xy, "getHullPresorted");
var Sy = $v, Cy = ry, wy = ay, Ty = ly, Ey = dy, Dy = hy, Oy = Yt("inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3", {
	variants: { variant: {
		default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
		secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
		destructive: "bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
		outline: "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
		ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
		link: "text-primary underline-offset-4 [a&]:hover:underline"
	} },
	defaultVariants: { variant: "default" }
});
function ky({ className: e, variant: t = "default", asChild: n = !1, ...r }) {
	let i = n ? Pr : "span";
	return /* @__PURE__ */ (0, R.jsx)(i, {
		"data-slot": "badge",
		"data-variant": t,
		className: H(Oy({ variant: t }), e),
		...r
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/scroll-area.tsx
function Ay({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, R.jsxs)(zg, {
		"data-slot": "scroll-area",
		className: H("relative", e),
		...n,
		children: [
			/* @__PURE__ */ (0, R.jsx)(Bg, {
				"data-slot": "scroll-area-viewport",
				className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
				children: t
			}),
			/* @__PURE__ */ (0, R.jsx)(jy, {}),
			/* @__PURE__ */ (0, R.jsx)(Vg, {})
		]
	});
}
function jy({ className: e, orientation: t = "vertical", ...n }) {
	return /* @__PURE__ */ (0, R.jsx)(pg, {
		"data-slot": "scroll-area-scrollbar",
		orientation: t,
		className: H("flex touch-none p-px transition-colors select-none", t === "vertical" && "h-full w-2.5 border-l border-l-transparent", t === "horizontal" && "h-2.5 flex-col border-t border-t-transparent", e),
		...n,
		children: /* @__PURE__ */ (0, R.jsx)(wg, {
			"data-slot": "scroll-area-thumb",
			className: "relative flex-1 rounded-full bg-border"
		})
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/separator.tsx
function My({ className: e, orientation: t = "horizontal", decorative: n = !0, ...r }) {
	return /* @__PURE__ */ (0, R.jsx)(iv, {
		"data-slot": "separator",
		decorative: n,
		orientation: t,
		className: H("shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", e),
		...r
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/tabs.tsx
function Ny({ className: e, orientation: t = "horizontal", ...n }) {
	return /* @__PURE__ */ (0, R.jsx)(zv, {
		"data-slot": "tabs",
		"data-orientation": t,
		orientation: t,
		className: H("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", e),
		...n
	});
}
var Py = Yt("group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none", {
	variants: { variant: {
		default: "bg-muted",
		line: "gap-1 bg-transparent"
	} },
	defaultVariants: { variant: "default" }
});
function Fy({ className: e, variant: t = "default", ...n }) {
	return /* @__PURE__ */ (0, R.jsx)(Bv, {
		"data-slot": "tabs-list",
		"data-variant": t,
		className: H(Py({ variant: t }), e),
		...n
	});
}
function Iy({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(Vv, {
		"data-slot": "tabs-trigger",
		className: H("relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent", "data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground", "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100", e),
		...t
	});
}
function Ly({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(Hv, {
		"data-slot": "tabs-content",
		className: H("flex-1 outline-none", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/button.tsx
var Ry = Yt("inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
			outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2 has-[>svg]:px-3",
			xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
			lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
			icon: "size-9",
			"icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-8",
			"icon-lg": "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function zy({ className: e, variant: t = "default", size: n = "default", asChild: r = !1, ...i }) {
	let a = r ? Pr : "button";
	return /* @__PURE__ */ (0, R.jsx)(a, {
		"data-slot": "button",
		"data-variant": t,
		"data-size": n,
		className: H(Ry({
			variant: t,
			size: n,
			className: e
		})),
		...i
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/empty.tsx
function By({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "empty",
		className: H("flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12", e),
		...t
	});
}
function Vy({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "empty-header",
		className: H("flex max-w-sm flex-col items-center gap-2 text-center", e),
		...t
	});
}
var Hy = Yt("mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0", {
	variants: { variant: {
		default: "bg-transparent",
		icon: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-6"
	} },
	defaultVariants: { variant: "default" }
});
function Uy({ className: e, variant: t = "default", ...n }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "empty-icon",
		"data-variant": t,
		className: H(Hy({
			variant: t,
			className: e
		})),
		...n
	});
}
function Wy({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "empty-title",
		className: H("text-lg font-medium tracking-tight", e),
		...t
	});
}
function Gy({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "empty-description",
		className: H("text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary", e),
		...t
	});
}
function Ky({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "empty-content",
		className: H("flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/lib/typo3.ts
function qy() {
	let e = [];
	window.TYPO3 !== void 0 && e.push(window.TYPO3);
	try {
		window.top !== null && window.top !== window && window.top.TYPO3 !== void 0 && e.push(window.top.TYPO3);
	} catch {}
	return e;
}
function Jy() {
	for (let e of qy()) {
		let t = e.settings?.ajaxUrls;
		if (t !== void 0 && Object.keys(t).length > 0) return t;
	}
	return {};
}
function Yy() {
	let e = document.documentElement.lang;
	return e === "" ? "en" : e;
}
function Xy() {
	for (let e of qy()) {
		let t = e.configuration?.username;
		if (typeof t == "string" && t !== "") return { name: t };
	}
	return null;
}
var Zy = {
	chat: "tools_shadcnui_chat",
	components: "tools_shadcnui_components"
};
function Qy(e, t = "") {
	for (let n of qy()) {
		let r = n.ModuleMenu?.App?.showModule;
		if (typeof r == "function") return r(e, t), !0;
	}
	return !1;
}
function $y(e, t) {
	for (let n of qy()) {
		let r = n.settings?.FormEngine?.moduleUrl;
		if (typeof r == "string" && r !== "") {
			let n = new URL(r, window.location.href);
			return n.searchParams.set(`edit[${e}][${t}]`, "edit"), n.toString();
		}
	}
	return null;
}
function eb(e) {
	for (let t of qy()) {
		let n = t.Backend?.ContentContainer?.setUrl;
		if (typeof n == "function") return n(e), !0;
	}
	try {
		let t = window.top?.document.querySelector("iframe[name=\"list_frame\"]");
		if (t?.contentWindow) return t.contentWindow.location.href = e, !0;
	} catch {}
	return !1;
}
function tb() {
	let e = "";
	try {
		e = window.top?.location.search ?? window.location.search;
	} catch {
		e = window.location.search;
	}
	let t = Number.parseInt(new URLSearchParams(e).get("id") ?? "", 10);
	return Number.isFinite(t) && t > 0 ? t : void 0;
}
//#endregion
//#region Build/Frontend/src/chat/changes.tsx
var nb = {
	created: {
		label: "Created",
		icon: je,
		className: "border-success/50 bg-success/10 text-success-foreground"
	},
	updated: {
		label: "Updated",
		icon: ke,
		className: "border-warning/50 bg-warning/10 text-warning-foreground"
	},
	other: {
		label: "Changed",
		icon: xe,
		className: "border-border text-muted-foreground"
	}
}, rb = {
	pages: "Page",
	tt_content: "Content element",
	sys_file: "File",
	sys_file_reference: "File reference",
	sys_category: "Category",
	sys_redirect: "Redirect",
	be_users: "Backend user",
	be_groups: "Backend group",
	fe_users: "Website user"
};
function ib(e) {
	return rb[e] ?? e;
}
function ab({ change: e, compact: t = !1 }) {
	let n = nb[e.kind], r = $y(e.table, e.uid);
	return /* @__PURE__ */ (0, R.jsxs)("li", {
		className: H("flex items-center gap-2 rounded-sm px-2 py-1.5", !t && "bg-muted/60"),
		children: [
			/* @__PURE__ */ (0, R.jsx)(n.icon, {
				className: "size-3.5 shrink-0 text-muted-foreground",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, R.jsxs)("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, R.jsxs)("span", {
					className: "block truncate font-medium",
					children: [
						ib(e.table),
						" ",
						/* @__PURE__ */ (0, R.jsxs)("span", {
							className: "font-mono text-muted-foreground",
							children: ["#", e.uid]
						})
					]
				}), t || e.toolName === "" ? null : /* @__PURE__ */ (0, R.jsxs)("span", {
					className: "block truncate text-muted-foreground",
					children: ["by ", Er(e.toolName)]
				})]
			}),
			/* @__PURE__ */ (0, R.jsx)(ky, {
				className: H("shrink-0 rounded-full px-1.5 font-normal", n.className),
				variant: "outline",
				children: n.label
			}),
			r === null ? null : /* @__PURE__ */ (0, R.jsx)(zy, {
				"aria-label": `Open ${ib(e.table)} ${e.uid}`,
				onClick: () => eb(r),
				size: "icon-xs",
				variant: "ghost",
				children: /* @__PURE__ */ (0, R.jsx)(j, { "aria-hidden": "true" })
			})
		]
	});
}
function ob({ changes: e, compact: t = !1 }) {
	return e.length === 0 ? /* @__PURE__ */ (0, R.jsx)(By, {
		className: "border-0 p-4",
		children: /* @__PURE__ */ (0, R.jsxs)(Vy, { children: [
			/* @__PURE__ */ (0, R.jsx)(Uy, {
				variant: "icon",
				children: /* @__PURE__ */ (0, R.jsx)(xe, { "aria-hidden": "true" })
			}),
			/* @__PURE__ */ (0, R.jsx)(Wy, {
				className: "text-sm",
				children: "Nothing changed yet"
			}),
			/* @__PURE__ */ (0, R.jsx)(Gy, {
				className: "text-xs",
				children: "Records the assistant creates or updates in this conversation appear here."
			})
		] })
	}) : /* @__PURE__ */ (0, R.jsx)("ol", {
		className: H("space-y-1", t && "space-y-0"),
		children: e.map((e) => /* @__PURE__ */ (0, R.jsx)(ab, {
			change: e,
			compact: t
		}, `${e.table}:${e.uid}:${e.kind}`))
	});
}
//#endregion
//#region Build/Frontend/src/lib/portal.tsx
var sb = (0, _.createContext)(null);
function cb({ container: e, children: t }) {
	return /* @__PURE__ */ (0, R.jsx)(sb.Provider, {
		value: e,
		children: t
	});
}
function lb() {
	return (0, _.useContext)(sb) ?? void 0;
}
//#endregion
//#region Build/Frontend/src/components/ui/tooltip.tsx
function ub({ delayDuration: e = 0, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(Sy, {
		"data-slot": "tooltip-provider",
		delayDuration: e,
		...t
	});
}
function db({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(Cy, {
		"data-slot": "tooltip",
		...e
	});
}
function fb({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(wy, {
		"data-slot": "tooltip-trigger",
		...e
	});
}
function pb({ className: e, sideOffset: t = 0, children: n, ...r }) {
	let i = lb();
	return /* @__PURE__ */ (0, R.jsx)(Ty, {
		container: i,
		children: /* @__PURE__ */ (0, R.jsxs)(Ey, {
			"data-slot": "tooltip-content",
			sideOffset: t,
			className: H("z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", e),
			...r,
			children: [n, /* @__PURE__ */ (0, R.jsx)(Dy, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" })]
		})
	});
}
//#endregion
//#region Build/Frontend/src/chat/effect-badge.tsx
var mb = {
	read_only: {
		label: "Reads",
		explanation: "Looks at this installation without changing anything.",
		icon: De,
		className: "border-border text-muted-foreground"
	},
	idempotent_write: {
		label: "Writes",
		explanation: "Changes this installation. Running it again lands on the same result.",
		icon: ht,
		className: "border-warning/50 bg-warning/10 text-warning-foreground"
	},
	non_idempotent_write: {
		label: "Writes once",
		explanation: "Changes this installation, and running it again would change it again — a record created twice is two records.",
		icon: zt,
		className: "border-destructive/50 bg-destructive/10 text-destructive"
	}
};
function hb({ effect: e, className: t }) {
	let { label: n, explanation: r, icon: i, className: a } = mb[e];
	return /* @__PURE__ */ (0, R.jsxs)(db, { children: [/* @__PURE__ */ (0, R.jsx)(fb, {
		asChild: !0,
		children: /* @__PURE__ */ (0, R.jsxs)(ky, {
			variant: "outline",
			className: H("gap-1 rounded-full px-1.5 font-normal", a, t),
			children: [/* @__PURE__ */ (0, R.jsx)(i, {
				className: "size-3",
				"aria-hidden": "true"
			}), n]
		})
	}), /* @__PURE__ */ (0, R.jsx)(pb, {
		className: "max-w-64",
		children: r
	})] });
}
//#endregion
//#region Build/Frontend/src/chat/activity-rail.tsx
function gb({ thread: e, status: t }) {
	let n = t?.configuration ?? null, r = e.items.filter((e) => e.kind === "tool"), i = r.filter((e) => e.kind === "tool" && e.call.effect !== "read_only").length;
	return /* @__PURE__ */ (0, R.jsxs)(Ny, {
		className: "flex h-full min-h-0 flex-col bg-background",
		defaultValue: "activity",
		children: [
			/* @__PURE__ */ (0, R.jsxs)(Fy, {
				className: "m-2",
				children: [
					/* @__PURE__ */ (0, R.jsxs)(Iy, {
						value: "activity",
						children: [/* @__PURE__ */ (0, R.jsx)(C, { "aria-hidden": "true" }), "Activity"]
					}),
					/* @__PURE__ */ (0, R.jsxs)(Iy, {
						value: "usage",
						children: [/* @__PURE__ */ (0, R.jsx)(Le, { "aria-hidden": "true" }), "Usage"]
					}),
					/* @__PURE__ */ (0, R.jsxs)(Iy, {
						value: "setup",
						children: [/* @__PURE__ */ (0, R.jsx)(N, { "aria-hidden": "true" }), "Setup"]
					})
				]
			}),
			/* @__PURE__ */ (0, R.jsx)(Ly, {
				className: "min-h-0 flex-1",
				value: "activity",
				children: /* @__PURE__ */ (0, R.jsx)(Ay, {
					className: "h-full",
					children: /* @__PURE__ */ (0, R.jsxs)("div", {
						className: "space-y-4 px-3 pb-4",
						children: [
							e.pendingApproval === null ? null : /* @__PURE__ */ (0, R.jsxs)("section", {
								className: "rounded-md border border-warning/50 bg-warning/5 px-2.5 py-2",
								children: [/* @__PURE__ */ (0, R.jsxs)("h3", {
									className: "flex items-center gap-1.5 font-semibold",
									children: [/* @__PURE__ */ (0, R.jsx)(Dt, {
										"aria-hidden": "true",
										className: "size-3.5 text-warning"
									}), "Waiting for you"]
								}), /* @__PURE__ */ (0, R.jsxs)("p", {
									className: "mt-0.5 text-muted-foreground",
									children: [
										e.pendingApproval.calls.length,
										" ",
										e.pendingApproval.calls.length === 1 ? "call is" : "calls are",
										" held in the thread until you approve or deny."
									]
								})]
							}),
							/* @__PURE__ */ (0, R.jsxs)("section", { children: [/* @__PURE__ */ (0, R.jsx)("h3", {
								className: "font-semibold",
								children: "Changes in this conversation"
							}), /* @__PURE__ */ (0, R.jsx)("div", {
								className: "mt-1.5",
								children: /* @__PURE__ */ (0, R.jsx)(ob, { changes: e.changes })
							})] }),
							/* @__PURE__ */ (0, R.jsxs)("section", { children: [
								/* @__PURE__ */ (0, R.jsx)("h3", {
									className: "font-semibold",
									children: "Tool calls"
								}),
								r.length === 0 ? /* @__PURE__ */ (0, R.jsx)("p", {
									className: "mt-1 text-muted-foreground",
									children: "No tools have run in this conversation."
								}) : /* @__PURE__ */ (0, R.jsx)("ol", {
									className: "mt-1.5 space-y-1.5",
									children: r.map((e) => e.kind === "tool" ? /* @__PURE__ */ (0, R.jsxs)("li", {
										className: H("effect-spine rounded-sm bg-muted/60 px-2 py-1.5", `effect-${e.call.effect}`),
										children: [/* @__PURE__ */ (0, R.jsxs)("div", {
											className: "flex items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, R.jsx)("span", {
												className: "truncate font-mono",
												children: Er(e.call.name)
											}), /* @__PURE__ */ (0, R.jsx)(hb, { effect: e.call.effect })]
										}), /* @__PURE__ */ (0, R.jsxs)("p", {
											className: "mt-0.5 text-muted-foreground",
											children: [
												"Round ",
												e.call.round,
												e.call.result === void 0 ? " · running" : ` · ${Cr(e.call.result.durationMs)}${e.call.result.isError ? " · failed" : ""}`
											]
										})]
									}, e.key) : null)
								}),
								i > 0 ? /* @__PURE__ */ (0, R.jsxs)("p", {
									className: "mt-2 text-muted-foreground",
									children: [
										i,
										" of ",
										r.length,
										" calls changed this installation."
									]
								}) : null
							] })
						]
					})
				})
			}),
			/* @__PURE__ */ (0, R.jsx)(Ly, {
				className: "min-h-0 flex-1",
				value: "usage",
				children: /* @__PURE__ */ (0, R.jsx)(Ay, {
					className: "h-full",
					children: /* @__PURE__ */ (0, R.jsxs)("div", {
						className: "space-y-3 px-3 pb-4",
						children: [
							/* @__PURE__ */ (0, R.jsxs)("section", { children: [/* @__PURE__ */ (0, R.jsx)("h3", {
								className: "font-semibold",
								children: "This turn"
							}), /* @__PURE__ */ (0, R.jsxs)("dl", {
								className: "mt-1.5 space-y-1",
								children: [
									/* @__PURE__ */ (0, R.jsx)(_b, {
										label: "Prompt tokens",
										value: wr(e.usage.promptTokens)
									}),
									/* @__PURE__ */ (0, R.jsx)(_b, {
										label: "Completion tokens",
										value: wr(e.usage.completionTokens)
									}),
									/* @__PURE__ */ (0, R.jsx)(_b, {
										label: "Total",
										value: wr(e.usage.totalTokens)
									})
								]
							})] }),
							/* @__PURE__ */ (0, R.jsx)(My, {}),
							/* @__PURE__ */ (0, R.jsxs)("section", { children: [/* @__PURE__ */ (0, R.jsx)("h3", {
								className: "font-semibold",
								children: "Budget"
							}), t === null ? /* @__PURE__ */ (0, R.jsx)("p", {
								className: "mt-1 text-muted-foreground",
								children: "Checking…"
							}) : t.budget.allowed ? /* @__PURE__ */ (0, R.jsxs)("p", {
								className: "mt-1 text-muted-foreground",
								children: ["Within budget.", t.budget.reason === null ? "" : ` ${t.budget.reason}`]
							}) : /* @__PURE__ */ (0, R.jsx)("p", {
								className: "mt-1 text-destructive",
								children: t.budget.reason ?? "The spend budget for this period is used up."
							})] }),
							/* @__PURE__ */ (0, R.jsx)(My, {}),
							/* @__PURE__ */ (0, R.jsxs)("section", { children: [/* @__PURE__ */ (0, R.jsx)("h3", {
								className: "font-semibold",
								children: "Limits"
							}), t === null ? null : /* @__PURE__ */ (0, R.jsxs)("dl", {
								className: "mt-1.5 space-y-1",
								children: [
									/* @__PURE__ */ (0, R.jsx)(_b, {
										label: "Turns left this hour",
										value: t.limits.turnsPerHour === 0 ? "No limit" : `${t.limits.turnsRemaining} of ${t.limits.turnsPerHour}`
									}),
									/* @__PURE__ */ (0, R.jsx)(_b, {
										label: "Running conversations",
										value: wr(t.limits.activeConversations)
									}),
									/* @__PURE__ */ (0, R.jsx)(_b, {
										label: "Rounds per turn",
										value: String(t.limits.maxIterations)
									}),
									/* @__PURE__ */ (0, R.jsx)(_b, {
										label: "Message length",
										value: `${wr(t.limits.maxMessageLength)} characters`
									}),
									/* @__PURE__ */ (0, R.jsx)(_b, {
										label: "Writes",
										value: t.features.writes ? "Allowed with approval" : "Every write asks"
									})
								]
							})] })
						]
					})
				})
			}),
			/* @__PURE__ */ (0, R.jsx)(Ly, {
				className: "min-h-0 flex-1",
				value: "setup",
				children: /* @__PURE__ */ (0, R.jsx)(Ay, {
					className: "h-full",
					children: /* @__PURE__ */ (0, R.jsxs)("div", {
						className: "space-y-3 px-3 pb-4",
						children: [
							/* @__PURE__ */ (0, R.jsxs)("section", { children: [/* @__PURE__ */ (0, R.jsx)("h3", {
								className: "font-semibold",
								children: "Model"
							}), n === null ? /* @__PURE__ */ (0, R.jsx)("p", {
								className: "mt-1 text-muted-foreground",
								children: "Not configured."
							}) : /* @__PURE__ */ (0, R.jsxs)("p", {
								className: "mt-1 text-muted-foreground",
								children: [
									n.name,
									" · ",
									n.provider,
									" · ",
									/* @__PURE__ */ (0, R.jsx)("span", {
										className: "font-mono",
										children: n.model
									})
								]
							})] }),
							/* @__PURE__ */ (0, R.jsx)(My, {}),
							/* @__PURE__ */ (0, R.jsxs)("section", { children: [/* @__PURE__ */ (0, R.jsxs)("h3", {
								className: "font-semibold",
								children: [
									"Instructions",
									" ",
									/* @__PURE__ */ (0, R.jsx)(ky, {
										className: "rounded-full px-1.5 font-normal",
										variant: "outline",
										children: t?.instructions.length ?? 0
									})
								]
							}), t === null || t.instructions.length === 0 ? /* @__PURE__ */ (0, R.jsx)("p", {
								className: "mt-1 text-muted-foreground",
								children: "No agent instructions are active for your groups."
							}) : /* @__PURE__ */ (0, R.jsx)("ul", {
								className: "mt-1.5 space-y-1",
								children: t.instructions.map((e) => /* @__PURE__ */ (0, R.jsx)("li", {
									className: "truncate",
									children: e.title
								}, e.uid))
							})] }),
							/* @__PURE__ */ (0, R.jsx)(My, {}),
							/* @__PURE__ */ (0, R.jsxs)("section", { children: [/* @__PURE__ */ (0, R.jsxs)("h3", {
								className: "font-semibold",
								children: [
									"Tools",
									" ",
									/* @__PURE__ */ (0, R.jsx)(ky, {
										className: "rounded-full px-1.5 font-normal",
										variant: "outline",
										children: t?.tools.length ?? 0
									})
								]
							}), /* @__PURE__ */ (0, R.jsx)("ul", {
								className: "mt-1.5 space-y-1",
								children: (t?.tools ?? []).map((e) => /* @__PURE__ */ (0, R.jsxs)("li", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, R.jsx)("span", {
										className: "truncate font-mono",
										children: Er(e.name)
									}), /* @__PURE__ */ (0, R.jsxs)("span", {
										className: "flex shrink-0 items-center gap-1",
										children: [e.requiresApproval ? /* @__PURE__ */ (0, R.jsx)(ky, {
											className: "rounded-full px-1.5 font-normal",
											variant: "secondary",
											children: "Asks first"
										}) : null, /* @__PURE__ */ (0, R.jsx)(hb, { effect: e.effect })]
									})]
								}, e.name))
							})] })
						]
					})
				})
			})
		]
	});
}
function _b({ label: e, value: t }) {
	return /* @__PURE__ */ (0, R.jsxs)("div", {
		className: "flex items-baseline justify-between gap-2",
		children: [/* @__PURE__ */ (0, R.jsx)("dt", {
			className: "text-muted-foreground",
			children: e
		}), /* @__PURE__ */ (0, R.jsx)("dd", {
			className: "font-mono",
			children: t
		})]
	});
}
//#endregion
//#region node_modules/sonner/dist/index.mjs
function vb(e) {
	if (!e || typeof document > "u") return;
	let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
	n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
var yb = (e) => {
	switch (e) {
		case "success": return Sb;
		case "info": return wb;
		case "warning": return Cb;
		case "error": return Tb;
		default: return null;
	}
}, bb = Array(12).fill(0), xb = ({ visible: e, className: t }) => /*#__PURE__*/ _.createElement("div", {
	className: ["sonner-loading-wrapper", t].filter(Boolean).join(" "),
	"data-visible": e
}, /*#__PURE__*/ _.createElement("div", { className: "sonner-spinner" }, bb.map((e, t) => /*#__PURE__*/ _.createElement("div", {
	className: "sonner-loading-bar",
	key: `spinner-bar-${t}`
})))), Sb = /*#__PURE__*/ _.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /*#__PURE__*/ _.createElement("path", {
	fillRule: "evenodd",
	d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
	clipRule: "evenodd"
})), Cb = /*#__PURE__*/ _.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /*#__PURE__*/ _.createElement("path", {
	fillRule: "evenodd",
	d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
	clipRule: "evenodd"
})), wb = /*#__PURE__*/ _.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /*#__PURE__*/ _.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
	clipRule: "evenodd"
})), Tb = /*#__PURE__*/ _.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /*#__PURE__*/ _.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
	clipRule: "evenodd"
})), Eb = /*#__PURE__*/ _.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "12",
	height: "12",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.5",
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, /*#__PURE__*/ _.createElement("line", {
	x1: "18",
	y1: "6",
	x2: "6",
	y2: "18"
}), /*#__PURE__*/ _.createElement("line", {
	x1: "6",
	y1: "6",
	x2: "18",
	y2: "18"
})), Db = () => {
	let [e, t] = _.useState(document.hidden);
	return _.useEffect(() => {
		let e = () => {
			t(document.hidden);
		};
		return document.addEventListener("visibilitychange", e), () => window.removeEventListener("visibilitychange", e);
	}, []), e;
}, Ob = 1, kb = new class {
	constructor() {
		this.subscribe = (e) => (this.subscribers.push(e), () => {
			let t = this.subscribers.indexOf(e);
			this.subscribers.splice(t, 1);
		}), this.publish = (e) => {
			this.subscribers.forEach((t) => t(e));
		}, this.addToast = (e) => {
			this.publish(e), this.toasts = [...this.toasts, e];
		}, this.create = (e) => {
			let { message: t, ...n } = e, r = typeof e?.id == "number" || e.id?.length > 0 ? e.id : Ob++, i = this.toasts.find((e) => e.id === r), a = e.dismissible === void 0 || e.dismissible;
			return this.dismissedToasts.has(r) && this.dismissedToasts.delete(r), i ? this.toasts = this.toasts.map((n) => n.id === r ? (this.publish({
				...n,
				...e,
				id: r,
				title: t
			}), {
				...n,
				...e,
				id: r,
				dismissible: a,
				title: t
			}) : n) : this.addToast({
				title: t,
				...n,
				dismissible: a,
				id: r
			}), r;
		}, this.dismiss = (e) => (e ? (this.dismissedToasts.add(e), requestAnimationFrame(() => this.subscribers.forEach((t) => t({
			id: e,
			dismiss: !0
		})))) : this.toasts.forEach((e) => {
			this.subscribers.forEach((t) => t({
				id: e.id,
				dismiss: !0
			}));
		}), e), this.message = (e, t) => this.create({
			...t,
			message: e
		}), this.error = (e, t) => this.create({
			...t,
			message: e,
			type: "error"
		}), this.success = (e, t) => this.create({
			...t,
			type: "success",
			message: e
		}), this.info = (e, t) => this.create({
			...t,
			type: "info",
			message: e
		}), this.warning = (e, t) => this.create({
			...t,
			type: "warning",
			message: e
		}), this.loading = (e, t) => this.create({
			...t,
			type: "loading",
			message: e
		}), this.promise = (e, t) => {
			if (!t) return;
			let n;
			t.loading !== void 0 && (n = this.create({
				...t,
				promise: e,
				type: "loading",
				message: t.loading,
				description: typeof t.description == "function" ? void 0 : t.description
			}));
			let r = Promise.resolve(e instanceof Function ? e() : e), i = n !== void 0, a, o = r.then(async (e) => {
				if (a = ["resolve", e], _.isValidElement(e)) i = !1, this.create({
					id: n,
					type: "default",
					message: e
				});
				else if (jb(e) && !e.ok) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(`HTTP error! status: ${e.status}`) : t.error, a = typeof t.description == "function" ? await t.description(`HTTP error! status: ${e.status}`) : t.description, o = typeof r == "object" && !_.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				} else if (e instanceof Error) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(e) : t.error, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !_.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				} else if (t.success !== void 0) {
					i = !1;
					let r = typeof t.success == "function" ? await t.success(e) : t.success, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !_.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "success",
						description: a,
						...o
					});
				}
			}).catch(async (e) => {
				if (a = ["reject", e], t.error !== void 0) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(e) : t.error, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !_.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				}
			}).finally(() => {
				i && (this.dismiss(n), n = void 0), t.finally == null || t.finally.call(t);
			}), s = () => new Promise((e, t) => o.then(() => a[0] === "reject" ? t(a[1]) : e(a[1])).catch(t));
			return typeof n != "string" && typeof n != "number" ? { unwrap: s } : Object.assign(n, { unwrap: s });
		}, this.custom = (e, t) => {
			let n = t?.id || Ob++;
			return this.create({
				jsx: e(n),
				id: n,
				...t
			}), n;
		}, this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
	}
}(), Ab = (e, t) => {
	let n = t?.id || Ob++;
	return kb.addToast({
		title: e,
		...t,
		id: n
	}), n;
}, jb = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", Mb = Object.assign(Ab, {
	success: kb.success,
	info: kb.info,
	warning: kb.warning,
	error: kb.error,
	custom: kb.custom,
	message: kb.message,
	promise: kb.promise,
	dismiss: kb.dismiss,
	loading: kb.loading
}, {
	getHistory: () => kb.toasts,
	getToasts: () => kb.getActiveToasts()
});
vb("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Nb(e) {
	return e.label !== void 0;
}
var Pb = 3, Fb = "24px", Ib = "16px", Lb = 4e3, Rb = 356, zb = 14, Bb = 45, Vb = 200;
function Hb(...e) {
	return e.filter(Boolean).join(" ");
}
function Ub(e) {
	let [t, n] = e.split("-"), r = [];
	return t && r.push(t), n && r.push(n), r;
}
var Wb = (e) => {
	let { invert: t, toast: n, unstyled: r, interacting: i, setHeights: a, visibleToasts: o, heights: s, index: c, toasts: l, expanded: u, removeToast: d, defaultRichColors: f, closeButton: p, style: m, cancelButtonStyle: h, actionButtonStyle: g, className: v = "", descriptionClassName: y = "", duration: b, position: x, gap: S, expandByDefault: C, classNames: w, icons: T, closeButtonAriaLabel: E = "Close toast" } = e, [D, O] = _.useState(null), [k, A] = _.useState(null), [j, M] = _.useState(!1), [N, P] = _.useState(!1), [F, I] = _.useState(!1), [ee, te] = _.useState(!1), [ne, re] = _.useState(!1), [L, ie] = _.useState(0), [ae, oe] = _.useState(0), se = _.useRef(n.duration || b || Lb), ce = _.useRef(null), le = _.useRef(null), ue = c === 0, de = c + 1 <= o, fe = n.type, pe = n.dismissible !== !1, me = n.className || "", he = n.descriptionClassName || "", ge = _.useMemo(() => s.findIndex((e) => e.toastId === n.id) || 0, [s, n.id]), _e = _.useMemo(() => n.closeButton ?? p, [n.closeButton, p]), ve = _.useMemo(() => n.duration || b || Lb, [n.duration, b]), ye = _.useRef(0), be = _.useRef(0), xe = _.useRef(0), Se = _.useRef(null), [Ce, we] = x.split("-"), Te = _.useMemo(() => s.reduce((e, t, n) => n >= ge ? e : e + t.height, 0), [s, ge]), Ee = Db(), De = n.invert || t, Oe = fe === "loading";
	be.current = _.useMemo(() => ge * S + Te, [ge, Te]), _.useEffect(() => {
		se.current = ve;
	}, [ve]), _.useEffect(() => {
		M(!0);
	}, []), _.useEffect(() => {
		let e = le.current;
		if (e) {
			let t = e.getBoundingClientRect().height;
			return oe(t), a((e) => [{
				toastId: n.id,
				height: t,
				position: n.position
			}, ...e]), () => a((e) => e.filter((e) => e.toastId !== n.id));
		}
	}, [a, n.id]), _.useLayoutEffect(() => {
		if (!j) return;
		let e = le.current, t = e.style.height;
		e.style.height = "auto";
		let r = e.getBoundingClientRect().height;
		e.style.height = t, oe(r), a((e) => e.find((e) => e.toastId === n.id) ? e.map((e) => e.toastId === n.id ? {
			...e,
			height: r
		} : e) : [{
			toastId: n.id,
			height: r,
			position: n.position
		}, ...e]);
	}, [
		j,
		n.title,
		n.description,
		a,
		n.id,
		n.jsx,
		n.action,
		n.cancel
	]);
	let ke = _.useCallback(() => {
		P(!0), ie(be.current), a((e) => e.filter((e) => e.toastId !== n.id)), setTimeout(() => {
			d(n);
		}, Vb);
	}, [
		n,
		d,
		a,
		be
	]);
	_.useEffect(() => {
		if (n.promise && fe === "loading" || n.duration === Infinity || n.type === "loading") return;
		let e;
		return u || i || Ee ? (() => {
			if (xe.current < ye.current) {
				let e = (/* @__PURE__ */ new Date()).getTime() - ye.current;
				se.current -= e;
			}
			xe.current = (/* @__PURE__ */ new Date()).getTime();
		})() : se.current !== Infinity && (ye.current = (/* @__PURE__ */ new Date()).getTime(), e = setTimeout(() => {
			n.onAutoClose == null || n.onAutoClose.call(n, n), ke();
		}, se.current)), () => clearTimeout(e);
	}, [
		u,
		i,
		n,
		fe,
		Ee,
		ke
	]), _.useEffect(() => {
		n.delete && (ke(), n.onDismiss == null || n.onDismiss.call(n, n));
	}, [ke, n.delete]);
	function Ae() {
		return T?.loading ? /*#__PURE__*/ _.createElement("div", {
			className: Hb(w?.loader, n?.classNames?.loader, "sonner-loader"),
			"data-visible": fe === "loading"
		}, T.loading) : /*#__PURE__*/ _.createElement(xb, {
			className: Hb(w?.loader, n?.classNames?.loader),
			visible: fe === "loading"
		});
	}
	let je = n.icon || T?.[fe] || yb(fe);
	return /*#__PURE__*/ _.createElement("li", {
		tabIndex: 0,
		ref: le,
		className: Hb(v, me, w?.toast, n?.classNames?.toast, w?.default, w?.[fe], n?.classNames?.[fe]),
		"data-sonner-toast": "",
		"data-rich-colors": n.richColors ?? f,
		"data-styled": !(n.jsx || n.unstyled || r),
		"data-mounted": j,
		"data-promise": !!n.promise,
		"data-swiped": ne,
		"data-removed": N,
		"data-visible": de,
		"data-y-position": Ce,
		"data-x-position": we,
		"data-index": c,
		"data-front": ue,
		"data-swiping": F,
		"data-dismissible": pe,
		"data-type": fe,
		"data-invert": De,
		"data-swipe-out": ee,
		"data-swipe-direction": k,
		"data-expanded": !!(u || C && j),
		"data-testid": n.testId,
		style: {
			"--index": c,
			"--toasts-before": c,
			"--z-index": l.length - c,
			"--offset": `${N ? L : be.current}px`,
			"--initial-height": C ? "auto" : `${ae}px`,
			...m,
			...n.style
		},
		onDragEnd: () => {
			I(!1), O(null), Se.current = null;
		},
		onPointerDown: (e) => {
			e.button !== 2 && !Oe && pe && (ce.current = /* @__PURE__ */ new Date(), ie(be.current), e.target.setPointerCapture(e.pointerId), e.target.tagName !== "BUTTON" && (I(!0), Se.current = {
				x: e.clientX,
				y: e.clientY
			}));
		},
		onPointerUp: () => {
			if (ee || !pe) return;
			Se.current = null;
			let e = Number(le.current?.style.getPropertyValue("--swipe-amount-x").replace("px", "") || 0), t = Number(le.current?.style.getPropertyValue("--swipe-amount-y").replace("px", "") || 0), r = (/* @__PURE__ */ new Date()).getTime() - ce.current?.getTime(), i = D === "x" ? e : t, a = Math.abs(i) / r;
			if (Math.abs(i) >= Bb || a > .11) {
				ie(be.current), n.onDismiss == null || n.onDismiss.call(n, n), A(D === "x" ? e > 0 ? "right" : "left" : t > 0 ? "down" : "up"), ke(), te(!0);
				return;
			}
			var o, s;
			(o = le.current) == null || o.style.setProperty("--swipe-amount-x", "0px"), (s = le.current) == null || s.style.setProperty("--swipe-amount-y", "0px"), re(!1), I(!1), O(null);
		},
		onPointerMove: (t) => {
			var n, r;
			if (!Se.current || !pe || window.getSelection()?.toString().length > 0) return;
			let i = t.clientY - Se.current.y, a = t.clientX - Se.current.x, o = e.swipeDirections ?? Ub(x);
			!D && (Math.abs(a) > 1 || Math.abs(i) > 1) && O(Math.abs(a) > Math.abs(i) ? "x" : "y");
			let s = {
				x: 0,
				y: 0
			}, c = (e) => 1 / (1.5 + Math.abs(e) / 20);
			if (D === "y") {
				if (o.includes("top") || o.includes("bottom")) {
					if (o.includes("top") && i < 0 || o.includes("bottom") && i > 0) s.y = i;
					else {
						let e = i * c(i);
						s.y = Math.abs(e) < Math.abs(i) ? e : i;
					}
				}
			} else if (D === "x" && (o.includes("left") || o.includes("right"))) {
				if (o.includes("left") && a < 0 || o.includes("right") && a > 0) s.x = a;
				else {
					let e = a * c(a);
					s.x = Math.abs(e) < Math.abs(a) ? e : a;
				}
			}
			(Math.abs(s.x) > 0 || Math.abs(s.y) > 0) && re(!0), (n = le.current) == null || n.style.setProperty("--swipe-amount-x", `${s.x}px`), (r = le.current) == null || r.style.setProperty("--swipe-amount-y", `${s.y}px`);
		}
	}, _e && !n.jsx && fe !== "loading" ? /*#__PURE__*/ _.createElement("button", {
		"aria-label": E,
		"data-disabled": Oe,
		"data-close-button": !0,
		onClick: Oe || !pe ? () => {} : () => {
			ke(), n.onDismiss == null || n.onDismiss.call(n, n);
		},
		className: Hb(w?.closeButton, n?.classNames?.closeButton)
	}, T?.close ?? Eb) : null, (fe || n.icon || n.promise) && n.icon !== null && (T?.[fe] !== null || n.icon) ? /*#__PURE__*/ _.createElement("div", {
		"data-icon": "",
		className: Hb(w?.icon, n?.classNames?.icon)
	}, n.promise || n.type === "loading" && !n.icon ? n.icon || Ae() : null, n.type === "loading" ? null : je) : null, /*#__PURE__*/ _.createElement("div", {
		"data-content": "",
		className: Hb(w?.content, n?.classNames?.content)
	}, /*#__PURE__*/ _.createElement("div", {
		"data-title": "",
		className: Hb(w?.title, n?.classNames?.title)
	}, n.jsx ? n.jsx : typeof n.title == "function" ? n.title() : n.title), n.description ? /*#__PURE__*/ _.createElement("div", {
		"data-description": "",
		className: Hb(y, he, w?.description, n?.classNames?.description)
	}, typeof n.description == "function" ? n.description() : n.description) : null), /*#__PURE__*/ _.isValidElement(n.cancel) ? n.cancel : n.cancel && Nb(n.cancel) ? /*#__PURE__*/ _.createElement("button", {
		"data-button": !0,
		"data-cancel": !0,
		style: n.cancelButtonStyle || h,
		onClick: (e) => {
			Nb(n.cancel) && pe && (n.cancel.onClick == null || n.cancel.onClick.call(n.cancel, e), ke());
		},
		className: Hb(w?.cancelButton, n?.classNames?.cancelButton)
	}, n.cancel.label) : null, /*#__PURE__*/ _.isValidElement(n.action) ? n.action : n.action && Nb(n.action) ? /*#__PURE__*/ _.createElement("button", {
		"data-button": !0,
		"data-action": !0,
		style: n.actionButtonStyle || g,
		onClick: (e) => {
			Nb(n.action) && (n.action.onClick == null || n.action.onClick.call(n.action, e), !e.defaultPrevented && ke());
		},
		className: Hb(w?.actionButton, n?.classNames?.actionButton)
	}, n.action.label) : null);
};
function Gb() {
	if (typeof window > "u" || typeof document > "u") return "ltr";
	let e = document.documentElement.getAttribute("dir");
	return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function Kb(e, t) {
	let n = {};
	return [e, t].forEach((e, t) => {
		let r = t === 1, i = r ? "--mobile-offset" : "--offset", a = r ? Ib : Fb;
		function o(e) {
			[
				"top",
				"right",
				"bottom",
				"left"
			].forEach((t) => {
				n[`${i}-${t}`] = typeof e == "number" ? `${e}px` : e;
			});
		}
		typeof e == "number" || typeof e == "string" ? o(e) : typeof e == "object" ? [
			"top",
			"right",
			"bottom",
			"left"
		].forEach((t) => {
			e[t] === void 0 ? n[`${i}-${t}`] = a : n[`${i}-${t}`] = typeof e[t] == "number" ? `${e[t]}px` : e[t];
		}) : o(a);
	}), n;
}
var qb = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { id: n, invert: r, position: i = "bottom-right", hotkey: a = ["altKey", "KeyT"], expand: o, closeButton: s, className: c, offset: l, mobileOffset: u, theme: d = "light", richColors: f, duration: p, style: m, visibleToasts: h = Pb, toastOptions: g, dir: v = Gb(), gap: y = zb, icons: b, containerAriaLabel: x = "Notifications" } = e, [S, C] = _.useState([]), w = _.useMemo(() => n ? S.filter((e) => e.toasterId === n) : S.filter((e) => !e.toasterId), [S, n]), T = _.useMemo(() => Array.from(new Set([i].concat(w.filter((e) => e.position).map((e) => e.position)))), [w, i]), [E, D] = _.useState([]), [O, k] = _.useState(!1), [A, j] = _.useState(!1), [M, N] = _.useState(d === "system" ? typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : d), P = _.useRef(null), F = a.join("+").replace(/Key/g, "").replace(/Digit/g, ""), I = _.useRef(null), ee = _.useRef(!1), te = _.useCallback((e) => {
		C((t) => (t.find((t) => t.id === e.id)?.delete || kb.dismiss(e.id), t.filter(({ id: t }) => t !== e.id)));
	}, []);
	return _.useEffect(() => kb.subscribe((e) => {
		if (e.dismiss) {
			requestAnimationFrame(() => {
				C((t) => t.map((t) => t.id === e.id ? {
					...t,
					delete: !0
				} : t));
			});
			return;
		}
		setTimeout(() => {
			Wt.flushSync(() => {
				C((t) => {
					let n = t.findIndex((t) => t.id === e.id);
					return n === -1 ? [e, ...t] : [
						...t.slice(0, n),
						{
							...t[n],
							...e
						},
						...t.slice(n + 1)
					];
				});
			});
		});
	}), [S]), _.useEffect(() => {
		if (d !== "system") {
			N(d);
			return;
		}
		if (d === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? N("dark") : N("light")), typeof window > "u") return;
		let e = window.matchMedia("(prefers-color-scheme: dark)");
		try {
			e.addEventListener("change", ({ matches: e }) => {
				N(e ? "dark" : "light");
			});
		} catch {
			e.addListener(({ matches: e }) => {
				try {
					N(e ? "dark" : "light");
				} catch (e) {
					console.error(e);
				}
			});
		}
	}, [d]), _.useEffect(() => {
		S.length <= 1 && k(!1);
	}, [S]), _.useEffect(() => {
		let e = (e) => {
			if (a.every((t) => e[t] || e.code === t)) {
				var t;
				k(!0), (t = P.current) == null || t.focus();
			}
			e.code === "Escape" && (document.activeElement === P.current || P.current?.contains(document.activeElement)) && k(!1);
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [a]), _.useEffect(() => {
		if (P.current) return () => {
			I.current && (I.current.focus({ preventScroll: !0 }), I.current = null, ee.current = !1);
		};
	}, [P.current]), /*#__PURE__*/ _.createElement("section", {
		ref: t,
		"aria-label": `${x} ${F}`,
		tabIndex: -1,
		"aria-live": "polite",
		"aria-relevant": "additions text",
		"aria-atomic": "false",
		suppressHydrationWarning: !0
	}, T.map((t, n) => {
		let [i, a] = t.split("-");
		return w.length ? /*#__PURE__*/ _.createElement("ol", {
			key: t,
			dir: v === "auto" ? Gb() : v,
			tabIndex: -1,
			ref: P,
			className: c,
			"data-sonner-toaster": !0,
			"data-sonner-theme": M,
			"data-y-position": i,
			"data-x-position": a,
			style: {
				"--front-toast-height": `${E[0]?.height || 0}px`,
				"--width": `${Rb}px`,
				"--gap": `${y}px`,
				...m,
				...Kb(l, u)
			},
			onBlur: (e) => {
				ee.current && !e.currentTarget.contains(e.relatedTarget) && (ee.current = !1, I.current &&= (I.current.focus({ preventScroll: !0 }), null));
			},
			onFocus: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || ee.current || (ee.current = !0, I.current = e.relatedTarget);
			},
			onMouseEnter: () => k(!0),
			onMouseMove: () => k(!0),
			onMouseLeave: () => {
				A || k(!1);
			},
			onDragEnd: () => k(!1),
			onPointerDown: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || j(!0);
			},
			onPointerUp: () => j(!1)
		}, w.filter((e) => !e.position && n === 0 || e.position === t).map((n, i) => /*#__PURE__*/ _.createElement(Wb, {
			key: n.id,
			icons: b,
			index: i,
			toast: n,
			defaultRichColors: f,
			duration: g?.duration ?? p,
			className: g?.className,
			descriptionClassName: g?.descriptionClassName,
			invert: r,
			visibleToasts: h,
			closeButton: g?.closeButton ?? s,
			interacting: A,
			position: t,
			style: g?.style,
			unstyled: g?.unstyled,
			classNames: g?.classNames,
			cancelButtonStyle: g?.cancelButtonStyle,
			actionButtonStyle: g?.actionButtonStyle,
			closeButtonAriaLabel: g?.closeButtonAriaLabel,
			removeToast: te,
			toasts: w.filter((e) => e.position == n.position),
			heights: E.filter((e) => e.position == n.position),
			setHeights: D,
			expandByDefault: o,
			gap: y,
			expanded: O,
			swipeDirections: e.swipeDirections
		}))) : null;
	}));
});
//#endregion
//#region Build/Frontend/src/components/ui/sonner.tsx
function Jb({ theme: e = "light", ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(qb, {
		theme: e,
		className: "toaster group",
		icons: {
			success: /* @__PURE__ */ (0, R.jsx)(se, { className: "size-4" }),
			info: /* @__PURE__ */ (0, R.jsx)(ze, { className: "size-4" }),
			warning: /* @__PURE__ */ (0, R.jsx)(zt, { className: "size-4" }),
			error: /* @__PURE__ */ (0, R.jsx)(at, { className: "size-4" }),
			loading: /* @__PURE__ */ (0, R.jsx)(Ge, { className: "size-4 animate-spin" })
		},
		style: {
			"--normal-bg": "var(--popover)",
			"--normal-text": "var(--popover-foreground)",
			"--normal-border": "var(--border)",
			"--border-radius": "var(--radius)"
		},
		...t
	});
}
//#endregion
//#region Build/Frontend/src/lib/sse.ts
var Yb = /* @__PURE__ */ new Set([
	"run.started",
	"step.llm",
	"step.tool.call",
	"step.tool.result",
	"approval.required",
	"input.required",
	"message.final",
	"run.finished",
	"run.error",
	"ping"
]);
function Xb(e) {
	return Yb.has(e);
}
var Zb = class {
	buffer = "";
	lastEventId;
	push(e, t = !1) {
		this.buffer += e, this.buffer = this.buffer.replace(/\r\n/g, "\n");
		let n = !t && this.buffer.endsWith("\r"), r = (n ? this.buffer.slice(0, -1) : this.buffer).replace(/\r/g, "\n"), i = [], a = r;
		for (;;) {
			let e = a.indexOf("\n\n");
			if (e === -1) break;
			let t = this.parseFrame(a.slice(0, e));
			a = a.slice(e + 2), t !== null && i.push(t);
		}
		return this.buffer = a + (n ? "\r" : ""), i;
	}
	get lastId() {
		return this.lastEventId;
	}
	parseFrame(e) {
		let t = "", n = [], r;
		for (let i of e.split("\n")) {
			if (i === "" || i.startsWith(":")) continue;
			let e = i.indexOf(":"), a = e === -1 ? i : i.slice(0, e), o = e === -1 ? "" : i.slice(e + 1);
			if (o.startsWith(" ") && (o = o.slice(1)), a === "event") t = o;
			else if (a === "data") n.push(o);
			else if (a === "id") {
				let e = Number.parseInt(o, 10);
				Number.isFinite(e) && (r = e, this.lastEventId = e);
			}
		}
		return t === "" ? null : r === void 0 ? {
			event: t,
			data: n.join("\n")
		} : {
			event: t,
			data: n.join("\n"),
			id: r
		};
	}
};
function Qb(e) {
	if (!Xb(e.event)) return null;
	let t = {};
	if (e.data !== "") try {
		t = JSON.parse(e.data);
	} catch {
		return null;
	}
	return e.id === void 0 ? {
		event: e.event,
		data: t
	} : {
		id: e.id,
		event: e.event,
		data: t
	};
}
async function $b(e, t, n) {
	let r = e.getReader(), i = new TextDecoder(), a = new Zb(), o = () => {
		r.cancel().catch(() => void 0);
	};
	n?.addEventListener("abort", o);
	let s = (e) => {
		for (let n of e) {
			let e = Qb(n);
			e !== null && t(e);
		}
	};
	try {
		for (;;) {
			let { done: e, value: t } = await r.read();
			if (e) break;
			s(a.push(i.decode(t, { stream: !0 })));
		}
		s(a.push(i.decode(), !0));
	} finally {
		n?.removeEventListener("abort", o), r.releaseLock();
	}
}
//#endregion
//#region Build/Frontend/src/lib/api.ts
var ex = {
	status: "shadcn_ui_chat_status",
	conversations: "shadcn_ui_chat_conversations",
	conversationGet: "shadcn_ui_chat_conversation_get",
	conversationEvents: "shadcn_ui_chat_conversation_events",
	fileInfo: "shadcn_ui_chat_file_info",
	conversationCreate: "shadcn_ui_chat_conversation_create",
	conversationTurn: "shadcn_ui_chat_conversation_turn",
	conversationApproval: "shadcn_ui_chat_conversation_approval",
	conversationInput: "shadcn_ui_chat_conversation_input",
	conversationCancel: "shadcn_ui_chat_conversation_cancel",
	conversationArchive: "shadcn_ui_chat_conversation_archive",
	conversationPin: "shadcn_ui_chat_conversation_pin",
	conversationRename: "shadcn_ui_chat_conversation_rename",
	conversationDelete: "shadcn_ui_chat_conversation_delete",
	fileUpload: "shadcn_ui_chat_file_upload"
}, tx = class extends Error {
	status;
	constructor(e, t) {
		super(e), this.status = t, this.name = "ApiError";
	}
	get hint() {
		switch (this.status) {
			case 0: return "The backend could not be reached. Check your connection and try again.";
			case 400: return "The message could not be sent as written.";
			case 403: return "Your account is not allowed to use the AI chat.";
			case 404: return "This conversation no longer exists.";
			case 409: return "This conversation is busy, or the decision no longer applies to the run it was made for.";
			case 413: return "The file is too large.";
			case 422: return "That file cannot be read as text.";
			case 429: return "You have reached a limit. Wait a moment, or finish a running conversation first.";
			default: return this.status >= 500 ? "The backend failed while handling the request." : "";
		}
	}
};
function nx(e) {
	return e instanceof tx ? e.hint === "" ? e.message : `${e.message} ${e.hint}` : e instanceof Error ? e.message : "Something went wrong.";
}
function rx(e) {
	return e instanceof DOMException && e.name === "AbortError";
}
function ix(e) {
	let t = Jy()[e];
	if (typeof t != "string" || t === "") throw new tx(`The backend route "${e}" is not registered.`, 0);
	return t;
}
function ax(e, t) {
	let n = Object.entries(t).filter(([, e]) => e !== void 0 && e !== "");
	return n.length === 0 ? e : e + (e.includes("?") ? "&" : "?") + n.map(([e, t]) => `${e}=${encodeURIComponent(String(t))}`).join("&");
}
async function ox(e) {
	let t = `Request failed with status ${e.status}.`;
	try {
		let n = await e.json();
		typeof n.error == "string" && n.error !== "" && (t = n.error);
	} catch {}
	return new tx(t, e.status);
}
async function sx(e, t = {}, n) {
	let r = await fetch(ax(ix(e), t), {
		method: "GET",
		credentials: "same-origin",
		headers: { Accept: "application/json" },
		...n ? { signal: n } : {}
	});
	if (!r.ok) throw await ox(r);
	return await r.json();
}
async function cx(e, t, n) {
	let r = await fetch(ix(e), {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify(t),
		...n ? { signal: n } : {}
	});
	if (!r.ok) throw await ox(r);
	return await r.json();
}
async function lx(e, t) {
	let n = await sx(ex.status, {
		pageId: e.pageId,
		appName: e.appName
	}, t);
	return {
		available: n.available === !0,
		issues: n.issues ?? [],
		configuration: n.configuration ?? null,
		tools: n.tools ?? [],
		budget: n.budget ?? {
			allowed: !0,
			reason: null
		},
		limits: n.limits ?? {
			maxMessageLength: 0,
			maxIterations: 0,
			turnsPerHour: 0,
			turnsRemaining: -1,
			activeConversations: 0
		},
		suggestions: n.suggestions ?? [],
		features: n.features ?? {
			sse: !0,
			approvals: !0,
			input: !0,
			attachments: !0,
			writes: !1
		},
		instructions: n.instructions ?? [],
		context: n.context ?? {
			pageId: 0,
			pageTitle: "",
			workspace: "",
			appName: ""
		}
	};
}
var ux = (e, t) => sx(ex.conversations, e ? { archived: "1" } : {}, t), dx = (e, t = 0, n) => sx(ex.conversationGet, {
	conversation: e,
	after: t || void 0
}, n), fx = (e = {}) => cx(ex.conversationCreate, {
	title: e.title ?? "",
	systemPrompt: e.systemPrompt ?? "",
	...e.appName === void 0 ? {} : { appName: e.appName },
	...e.pageId === void 0 ? {} : { pageId: e.pageId }
}), px = (e) => cx(ex.conversationCancel, { conversation: e }), mx = (e, t) => cx(ex.conversationArchive, {
	conversation: e,
	archived: t
}), hx = (e, t) => cx(ex.conversationPin, {
	conversation: e,
	pinned: t
}), gx = (e, t, n) => cx(ex.conversationRename, {
	conversation: e,
	title: t,
	...n === void 0 ? {} : { autoApproveTools: n }
}), _x = (e) => cx(ex.conversationDelete, { conversation: e });
async function vx(e, t) {
	let n = new FormData();
	n.append("conversation", String(e)), n.append("file", t);
	let r = await fetch(ix(ex.fileUpload), {
		method: "POST",
		credentials: "same-origin",
		headers: { Accept: "application/json" },
		body: n
	});
	if (!r.ok) throw await ox(r);
	return await r.json();
}
async function yx(e, t, n, r) {
	let i = await fetch(ix(e), {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
			Accept: "text/event-stream"
		},
		body: JSON.stringify(t),
		...r ? { signal: r } : {}
	});
	if (!i.ok) throw await ox(i);
	let a = i.headers.get("Content-Type") ?? "";
	if (i.body !== null && a.includes("text/event-stream")) {
		await $b(i.body, n, r);
		return;
	}
	let o = await i.json();
	for (let e of o.events ?? []) n({
		event: e.event,
		data: e.data
	});
}
//#endregion
//#region Build/Frontend/src/lib/storage.ts
var bx = "shadcnUi.";
function xx(e) {
	try {
		return window.localStorage.getItem(bx + e);
	} catch {
		return null;
	}
}
function Sx(e, t) {
	try {
		window.localStorage.setItem(bx + e, t);
	} catch {}
}
function Cx(e, t) {
	let n = xx(e);
	if (n === null) return t;
	let r = Number.parseFloat(n);
	return Number.isFinite(r) ? r : t;
}
function wx(e, t) {
	let n = xx(e);
	return n === null ? t : n === "1";
}
function Tx(e, t) {
	Sx(e, t ? "1" : "0");
}
//#endregion
//#region Build/Frontend/src/state/decode.ts
function Ex(e) {
	return typeof e == "object" && !!e;
}
function Dx(e, t = "") {
	return typeof e == "string" ? e : t;
}
function Ox(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : t;
}
function kx(e) {
	return e === "idempotent_write" || e === "non_idempotent_write" ? e : "read_only";
}
var Ax = /* @__PURE__ */ new Set([
	"completed",
	"awaiting_approval",
	"awaiting_input",
	"guardrail_blocked",
	"guardrail_approval_required",
	"suspend_failed",
	"cancelled",
	"lease_lost",
	"requeued",
	"failed"
]);
function jx(e) {
	return typeof e == "string" && Ax.has(e) ? e : "completed";
}
var Mx = {
	promptTokens: 0,
	completionTokens: 0,
	totalTokens: 0
};
function Nx(e) {
	return Ex(e) ? {
		promptTokens: Ox(e.promptTokens),
		completionTokens: Ox(e.completionTokens),
		totalTokens: Ox(e.totalTokens)
	} : Mx;
}
var Px = /* @__PURE__ */ new Set(["created", "updated"]);
function Fx(e) {
	return typeof e == "string" && Px.has(e) ? e : "other";
}
function Ix(e) {
	if (!Ex(e)) return null;
	let t = Dx(e.table), n = Ox(e.uid);
	return t === "" || n <= 0 ? null : {
		table: t,
		uid: n,
		kind: Fx(e.kind)
	};
}
function Lx(e) {
	return Array.isArray(e) ? e.map(Ix).filter((e) => e !== null) : [];
}
function Rx(e) {
	if (!Ex(e) || typeof e.turnDigest != "string" || e.turnDigest === "") return null;
	let t = Array.isArray(e.calls) ? e.calls.filter(Ex).map((e, t) => ({
		index: Ox(e.index, t),
		callId: Dx(e.callId),
		name: Dx(e.name),
		arguments: Ex(e.arguments) ? e.arguments : {}
	})) : [];
	return {
		runUuid: Dx(e.runUuid),
		turnDigest: e.turnDigest,
		calls: t
	};
}
function zx(e, t = "") {
	if (!Ex(e)) return null;
	let n = Dx(e.question);
	if (n === "") return null;
	let r = Array.isArray(e.options) ? e.options.filter((e) => typeof e == "string" && e !== "") : [];
	return {
		runUuid: Dx(e.runUuid, t),
		turnDigest: Dx(e.turnDigest),
		question: n,
		options: r,
		allowFreeText: r.length === 0 || e.allowFreeText !== !1
	};
}
//#endregion
//#region Build/Frontend/src/state/reducer.ts
var Bx = {
	phase: "idle",
	conversation: null,
	items: [],
	draft: "",
	runUuid: "",
	pendingApproval: null,
	pendingInput: null,
	changes: [],
	usage: Mx,
	outcome: null,
	error: null,
	lastEventId: 0,
	running: !1
}, Vx = /* @__PURE__ */ new Set([
	"guardrail_blocked",
	"suspend_failed",
	"lease_lost",
	"failed"
]), Hx = {
	cancelled: {
		tone: "info",
		text: "Cancelled."
	},
	requeued: {
		tone: "info",
		text: "The run was requeued and will be picked up again."
	},
	guardrail_blocked: {
		tone: "error",
		text: "A guardrail stopped this run."
	},
	guardrail_approval_required: {
		tone: "error",
		text: "A guardrail asked for an approval this client cannot give."
	},
	suspend_failed: {
		tone: "error",
		text: "The run could not be suspended for approval."
	},
	lease_lost: {
		tone: "error",
		text: "The run lost its lease before it finished."
	},
	failed: {
		tone: "error",
		text: "The run failed."
	}
};
function Ux(e) {
	return Hx[e] ?? null;
}
var Wx = 0;
function Gx(e) {
	return Wx += 1, `${e}-${Wx}`;
}
function Kx(e) {
	return {
		kind: "message",
		key: `m${e.uid || Gx("local")}`,
		message: e
	};
}
function qx(e, t = []) {
	return {
		uid: 0,
		sequence: 0,
		role: "user",
		content: e,
		createdAt: Math.floor(Date.now() / 1e3),
		...t.length > 0 ? { attachments: t } : {}
	};
}
function Jx(e, t, n) {
	return [...e, {
		kind: "notice",
		key: Gx("notice"),
		tone: t,
		text: n
	}];
}
function Yx(e, t, n) {
	return t === null || e.some((e) => e.table === t.table && e.uid === t.uid && e.kind === t.kind) ? e : [...e, {
		...t,
		toolName: n
	}];
}
function Xx(e, t, n) {
	let r = {
		uid: t,
		sequence: 0,
		role: "assistant",
		content: n,
		createdAt: Math.floor(Date.now() / 1e3)
	};
	return {
		...e,
		draft: "",
		items: [...e.items, Kx(r)]
	};
}
function Zx(e, t) {
	return {
		...e,
		phase: "streaming",
		running: !0,
		draft: "",
		error: null,
		outcome: null,
		pendingApproval: null,
		pendingInput: null,
		usage: Mx,
		lastEventId: 0,
		items: t
	};
}
function Qx(e) {
	switch (e?.status) {
		case "awaiting_approval": return "awaiting_approval";
		case "awaiting_input": return "awaiting_input";
		case "failed": return "error";
		default: return "idle";
	}
}
function $x(e, t) {
	switch (t.type) {
		case "reset": {
			let e = Array.isArray(t.messages) ? t.messages : [], n = e.filter((e) => (e.role === "user" || e.role === "assistant") && e.content !== ""), r = e.reduce((e, t) => Lx(t.writeTargets).reduce((e, t) => Yx(e, t, ""), e), []);
			return {
				...Bx,
				conversation: t.conversation,
				items: n.map(Kx),
				changes: r,
				pendingApproval: Rx(t.conversation?.pendingApproval),
				pendingInput: zx(t.conversation?.pendingInput, t.conversation?.runUuid ?? ""),
				phase: Qx(t.conversation),
				error: t.conversation?.errorMessage || null,
				runUuid: t.conversation?.runUuid ?? ""
			};
		}
		case "conversation": return {
			...e,
			conversation: t.conversation
		};
		case "send": return Zx(e, [...e.items, Kx(qx(t.content, t.attachments))]);
		case "answer": return Zx(e, [...e.items, Kx(qx(t.answer))]);
		case "event": return eS(e, t.event);
		case "transport-error": return {
			...e,
			phase: "error",
			running: !1,
			error: t.message,
			draft: ""
		};
		case "cancelled": return {
			...e,
			phase: "idle",
			running: !1,
			draft: "",
			pendingApproval: null,
			pendingInput: null,
			items: Jx(e.items, "info", "Cancelled.")
		};
		case "dismiss-error": return {
			...e,
			error: null,
			phase: e.phase === "error" ? "idle" : e.phase
		};
		default: return e;
	}
}
function eS(e, t) {
	if (t.id !== void 0 && t.id <= e.lastEventId) return e;
	let n = t.id === void 0 ? e : {
		...e,
		lastEventId: t.id
	}, r = Ex(t.data) ? t.data : {};
	switch (t.event) {
		case "ping": return n;
		case "run.started": return {
			...n,
			phase: "streaming",
			running: !0,
			error: null,
			outcome: null,
			runUuid: Dx(r.runUuid, n.runUuid)
		};
		case "step.llm": {
			let e = Dx(r.thinking), t = Ex(r.tokens) ? r.tokens : {};
			return {
				...n,
				items: e === "" ? n.items : [...n.items, {
					kind: "thinking",
					key: Gx("think"),
					round: Ox(r.round),
					text: e
				}],
				draft: n.draft + Dx(r.content),
				usage: {
					promptTokens: n.usage.promptTokens + Ox(t.prompt),
					completionTokens: n.usage.completionTokens + Ox(t.completion),
					totalTokens: n.usage.totalTokens + Ox(t.total)
				}
			};
		}
		case "step.tool.call": {
			let e = {
				callId: Dx(r.callId),
				name: Dx(r.name),
				effect: kx(r.effect),
				round: Ox(r.round),
				arguments: Ex(r.arguments) ? r.arguments : {}
			};
			return e.callId !== "" && n.items.some(nS(e.callId)) ? n : {
				...n,
				running: !0,
				items: [...n.items, {
					kind: "tool",
					key: `call-${e.callId || Gx("c")}`,
					call: e
				}]
			};
		}
		case "step.tool.result": {
			let e = rS(n.items, Dx(r.callId), Dx(r.name)), t = n.items[e];
			if (t === void 0 || t.kind !== "tool") return n;
			let i = {
				isError: r.isError === !0,
				preview: Dx(r.preview),
				durationMs: Ox(r.durationMs),
				writeTarget: Ix(r.writeTarget)
			}, a = n.items.slice();
			return a[e] = {
				...t,
				call: {
					...t.call,
					result: i
				}
			}, {
				...n,
				items: a,
				changes: Yx(n.changes, i.writeTarget, t.call.name)
			};
		}
		case "approval.required": {
			let e = Rx(r);
			return e === null ? {
				...n,
				phase: "error",
				running: !1,
				error: "The run asked for approval without a digest, so it cannot be decided here."
			} : {
				...n,
				phase: "awaiting_approval",
				running: !1,
				pendingApproval: e,
				runUuid: e.runUuid === "" ? n.runUuid : e.runUuid,
				draft: ""
			};
		}
		case "input.required": {
			let e = zx(r, n.runUuid);
			return e === null ? {
				...n,
				phase: "error",
				running: !1,
				error: "The run asked for input without a question, so it cannot be answered here."
			} : {
				...n,
				phase: "awaiting_input",
				running: !1,
				pendingInput: e,
				draft: ""
			};
		}
		case "message.final": {
			let e = Dx(r.content);
			return e === "" ? {
				...n,
				draft: ""
			} : Xx(n, Ox(r.messageUid), e);
		}
		case "run.finished": return tS(n, jx(r.outcome), Nx(r.usage));
		case "run.error": {
			let e = Dx(r.message, "The run failed.");
			return {
				...n,
				phase: "error",
				running: !1,
				draft: "",
				error: e,
				items: Jx(n.items, "error", e)
			};
		}
		default: return n;
	}
}
function tS(e, t, n) {
	let r = n.totalTokens > 0 ? n : e.usage, i = t === "awaiting_approval" && e.pendingApproval !== null || t === "awaiting_input" && e.pendingInput !== null, a = e.draft !== "" && !i ? Xx(e, 0, e.draft) : e, o = Ux(t), s = Vx.has(t);
	return {
		...a,
		outcome: t,
		usage: r,
		running: !1,
		draft: i ? a.draft : "",
		phase: i ? a.phase : s ? "error" : "idle",
		error: s ? o?.text ?? "The run failed." : a.error,
		items: o === null ? a.items : Jx(a.items, o.tone, o.text)
	};
}
function nS(e) {
	return (t) => t.kind === "tool" && t.call.callId === e;
}
function rS(e, t, n) {
	if (t !== "") {
		let n = e.findIndex(nS(t));
		if (n !== -1) return n;
	}
	for (let t = e.length - 1; t >= 0; --t) {
		let r = e[t];
		if (r !== void 0 && r.kind === "tool" && r.call.name === n && r.call.result === void 0) return t;
	}
	return -1;
}
function iS(e, t, n, r) {
	if (!r) return {
		disabled: !0,
		reason: "The AI chat is not configured on this installation."
	};
	if (!t) return {
		disabled: !0,
		reason: n ?? "Your spend budget for this period is used up."
	};
	switch (e) {
		case "streaming": return {
			disabled: !0,
			reason: "A turn is running. Wait for it to finish, or cancel it."
		};
		case "awaiting_approval": return {
			disabled: !0,
			reason: "Decide the pending tool calls before sending another message."
		};
		case "awaiting_input": return {
			disabled: !0,
			reason: "Answer the question above before sending another message."
		};
		default: return {
			disabled: !1,
			reason: ""
		};
	}
}
//#endregion
//#region Build/Frontend/src/lib/attachments.ts
var aS = 1048576, oS = [
	{
		id: "text",
		label: "Text",
		mimes: [
			"text/plain",
			"text/markdown",
			"text/csv"
		],
		extensions: [
			".txt",
			".md",
			".csv"
		],
		maxBytes: 2 * aS
	},
	{
		id: "pdf",
		label: "PDF",
		mimes: ["application/pdf"],
		extensions: [".pdf"],
		maxBytes: 20 * aS
	},
	{
		id: "docx",
		label: "Word",
		mimes: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
		extensions: [".docx"],
		maxBytes: 15 * aS
	},
	{
		id: "xlsx",
		label: "Excel",
		mimes: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
		extensions: [".xlsx"],
		maxBytes: 15 * aS
	}
];
function sS() {
	return oS.flatMap((e) => [...e.extensions, ...e.mimes]).join(",");
}
function cS(e) {
	let t = e.name.toLowerCase();
	return oS.find((n) => n.mimes.includes(e.type) || n.extensions.some((e) => t.endsWith(e))) ?? null;
}
function lS(e) {
	let t = cS(e);
	return t === null ? {
		ok: !1,
		reason: `${e.name} is not a supported file. Attach text, PDF, Word or Excel files.`
	} : e.size > t.maxBytes ? {
		ok: !1,
		reason: `${t.label} files can be up to ${Math.round(t.maxBytes / aS)} MB.`
	} : {
		ok: !0,
		kind: t
	};
}
//#endregion
//#region Build/Frontend/src/state/use-attachments.ts
var uS = 0;
function dS(e, t) {
	let [n, r] = (0, _.useState)([]), i = (0, _.useCallback)((e, t) => {
		r((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}, []), a = (0, _.useCallback)((n) => {
		let a = [];
		for (let e of n) {
			let n = lS(e);
			n.ok ? a.push(e) : t(n.reason);
		}
		a.length !== 0 && (async () => {
			let n;
			try {
				n = await e();
			} catch (e) {
				t(nx(e));
				return;
			}
			await Promise.all(a.map(async (e) => {
				uS += 1;
				let t = `a${uS}`;
				r((n) => [...n, {
					id: t,
					file: e,
					status: "uploading"
				}]);
				try {
					let r = await vx(n, e);
					i(t, {
						status: "ready",
						fileUid: r.fileUid
					});
				} catch (e) {
					i(t, {
						status: "error",
						error: nx(e)
					});
				}
			}));
		})();
	}, [
		e,
		t,
		i
	]), o = (0, _.useCallback)((e) => {
		r((t) => t.filter((t) => t.id !== e));
	}, []), s = (0, _.useCallback)(() => r([]), []), c = (0, _.useCallback)(() => {
		let e = n.filter((e) => e.status === "ready" && e.fileUid !== void 0);
		return {
			info: e.map((e) => ({
				fileUid: e.fileUid,
				fileName: e.file.name,
				fileMimeType: e.file.type,
				fileSize: e.file.size
			})),
			refs: e.map((e) => ({ fileUid: e.fileUid }))
		};
	}, [n]);
	return (0, _.useMemo)(() => ({
		attachments: n,
		addFiles: a,
		removeFile: o,
		clear: s,
		ready: c
	}), [
		a,
		n,
		s,
		c,
		o
	]);
}
//#endregion
//#region Build/Frontend/src/state/use-conversations.ts
function fS(e) {
	let [t, n] = (0, _.useState)([]), [r, i] = (0, _.useState)(!1), a = (0, _.useRef)(e);
	(0, _.useEffect)(() => {
		a.current = e;
	}, [e]);
	let o = (0, _.useCallback)(async (e) => {
		try {
			let t = await ux(r, e);
			return n(t.conversations), t.conversations;
		} catch (e) {
			return rx(e) || a.current(nx(e)), [];
		}
	}, [r]);
	(0, _.useEffect)(() => {
		let e = new AbortController();
		return queueMicrotask(() => {
			o(e.signal);
		}), () => e.abort();
	}, [o]);
	let s = (0, _.useCallback)(async (e) => {
		try {
			await e();
		} catch (e) {
			return a.current(nx(e)), !1;
		}
		return await o(), !0;
	}, [o]), c = (0, _.useCallback)(async (e = {}) => {
		try {
			let t = await fx(e);
			return n((e) => [t.conversation, ...e]), t.conversation;
		} catch (e) {
			return a.current(nx(e)), null;
		}
	}, []), l = (0, _.useCallback)((e, t) => s(() => gx(e, t)), [s]), u = (0, _.useCallback)((e, t) => s(() => hx(e, t)), [s]), d = (0, _.useCallback)((e, t) => s(() => mx(e, t)), [s]), f = (0, _.useCallback)((e) => s(() => _x(e)), [s]);
	return (0, _.useMemo)(() => ({
		conversations: t,
		includeArchived: r,
		setIncludeArchived: i,
		reload: o,
		create: c,
		rename: l,
		setPinned: u,
		setArchived: d,
		remove: f
	}), [
		t,
		c,
		r,
		o,
		f,
		l,
		d,
		u
	]);
}
//#endregion
//#region Build/Frontend/src/state/use-chat.ts
var pS = "chat.conversation";
function mS({ initialConversation: e, context: t, notify: n }) {
	let [r, i] = (0, _.useState)(null), [a, o] = (0, _.useState)(null), [s, c] = (0, _.useState)(() => e > 0 ? e : Cx(pS, 0)), [l, u] = (0, _.useState)(!1), [d, f] = (0, _.useReducer)($x, Bx), p = fS(n), m = (0, _.useRef)(null), h = (0, _.useRef)(s);
	h.current = s;
	let g = (0, _.useRef)(t);
	g.current = t, (0, _.useEffect)(() => {
		let e = new AbortController();
		return (async () => {
			try {
				i(await lx(g.current(), e.signal)), o(null);
			} catch (e) {
				rx(e) || o(nx(e));
			}
		})(), () => e.abort();
	}, []), (0, _.useEffect)(() => {
		if (Sx(pS, String(s)), s <= 0) {
			f({
				type: "reset",
				conversation: null,
				messages: []
			});
			return;
		}
		let e = new AbortController();
		return (async () => {
			try {
				let t = await dx(s, 0, e.signal);
				f({
					type: "reset",
					conversation: t.conversation,
					messages: t.messages
				});
			} catch (e) {
				rx(e) || c(0);
			}
		})(), () => e.abort();
	}, [s]), (0, _.useEffect)(() => () => m.current?.abort(), []);
	let v = (0, _.useCallback)((e) => {
		c(e), h.current = e;
	}, []), y = (0, _.useCallback)(async () => {
		if (h.current > 0) return h.current;
		let e = g.current(), t = await p.create({
			appName: e.appName,
			pageId: e.pageId
		});
		if (t === null) throw Error("The conversation could not be created.");
		return v(t.uid), f({
			type: "reset",
			conversation: t,
			messages: []
		}), t.uid;
	}, [v, p]), b = dS(y, n), x = (0, _.useCallback)(async (e, t) => {
		let n = new AbortController();
		m.current = n, u(!0);
		try {
			await yx(e, t, (e) => f({
				type: "event",
				event: e
			}), n.signal);
		} catch (e) {
			f(rx(e) ? { type: "cancelled" } : {
				type: "transport-error",
				message: nx(e)
			});
		} finally {
			m.current = null, u(!1);
			let e = h.current, [, t] = await Promise.all([p.reload(), e > 0 ? dx(e).catch(() => null) : Promise.resolve(null)]);
			t !== null && f({
				type: "conversation",
				conversation: t.conversation
			});
		}
	}, [p]), S = (0, _.useCallback)((e) => {
		let t = e.trim();
		t === "" || l || (async () => {
			let e;
			try {
				e = await y();
			} catch (e) {
				f({
					type: "transport-error",
					message: nx(e)
				});
				return;
			}
			let n = b.ready();
			f({
				type: "send",
				content: t,
				attachments: n.info
			}), b.clear(), await x(ex.conversationTurn, {
				conversation: e,
				content: t,
				attachments: n.refs,
				context: g.current()
			});
		})();
	}, [
		l,
		x,
		y,
		b
	]), C = (0, _.useCallback)((e) => {
		let t = d.pendingInput, n = h.current, r = e.trim();
		t === null || n <= 0 || l || r === "" || (f({
			type: "answer",
			answer: r
		}), x(ex.conversationInput, {
			conversation: n,
			runUuid: t.runUuid,
			turnDigest: t.turnDigest,
			answer: r
		}));
	}, [
		l,
		x,
		d.pendingInput
	]), w = (0, _.useCallback)((e, t) => {
		let n = d.pendingApproval, r = h.current;
		n === null || r <= 0 || l || (async () => {
			if (t && e) try {
				await gx(r, d.conversation?.title || "Conversation", !0);
			} catch (e) {
				f({
					type: "transport-error",
					message: nx(e)
				});
				return;
			}
			await x(ex.conversationApproval, {
				conversation: r,
				approved: e,
				turnDigest: n.turnDigest
			});
		})();
	}, [
		l,
		x,
		d.conversation?.title,
		d.pendingApproval
	]), T = (0, _.useCallback)(() => {
		let e = h.current;
		m.current?.abort(), e > 0 && px(e).catch(() => void 0);
	}, []), E = (0, _.useCallback)((e) => {
		m.current?.abort(), v(e), b.clear();
	}, [v, b]), D = (0, _.useCallback)(async () => {
		let e = g.current(), t = await p.create({
			appName: e.appName,
			pageId: e.pageId
		});
		return t === null ? null : (m.current?.abort(), v(t.uid), f({
			type: "reset",
			conversation: t,
			messages: []
		}), b.clear(), t.uid);
	}, [
		v,
		p,
		b
	]), O = p.remove, k = (0, _.useMemo)(() => ({
		...p,
		remove: async (e) => {
			let t = await O(e);
			return t && e === h.current && v(0), t;
		},
		rename: async (e, t) => {
			let n = await p.rename(e, t);
			if (n && e === h.current) {
				let t = await dx(e).catch(() => null);
				t !== null && f({
					type: "conversation",
					conversation: t.conversation
				});
			}
			return n;
		}
	}), [
		v,
		p,
		O
	]), A = (0, _.useCallback)(() => f({ type: "dismiss-error" }), []);
	return (0, _.useMemo)(() => ({
		status: r,
		statusError: a,
		conversations: k,
		conversationUid: s,
		thread: d,
		attachments: b.attachments,
		busy: l,
		select: E,
		startNew: D,
		send: S,
		answer: C,
		decide: w,
		stop: T,
		dismissError: A,
		addFiles: b.addFiles,
		removeFile: b.removeFile
	}), [
		C,
		l,
		s,
		k,
		w,
		A,
		E,
		S,
		b,
		D,
		r,
		a,
		T,
		d
	]);
}
//#endregion
//#region Build/Frontend/src/chat/chat-provider.tsx
var hS = (0, _.createContext)(null);
function gS({ initialConversation: e, context: t, children: n }) {
	let r = mS({
		initialConversation: e,
		context: t,
		notify: (0, _.useCallback)((e) => {
			Mb.error(e);
		}, [])
	});
	return /* @__PURE__ */ (0, R.jsx)(hS.Provider, {
		value: r,
		children: n
	});
}
function _S() {
	let e = (0, _.useContext)(hS);
	if (e === null) throw Error("useChatController() needs a shell with a chat: layout=\"chat-left\" or variant=\"panel\".");
	return e;
}
function vS() {
	return (0, _.useContext)(hS);
}
//#endregion
//#region Build/Frontend/src/components/ui/checkbox.tsx
function yS({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(hl, {
		"data-slot": "checkbox",
		className: H("peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:data-[state=checked]:bg-primary", e),
		...t,
		children: /* @__PURE__ */ (0, R.jsx)(_l, {
			"data-slot": "checkbox-indicator",
			className: "grid place-content-center text-current transition-none",
			children: /* @__PURE__ */ (0, R.jsx)(ee, { className: "size-3.5" })
		})
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/dialog.tsx
function bS({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(gc, {
		"data-slot": "dialog",
		...e
	});
}
function xS({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(vc, {
		"data-slot": "dialog-trigger",
		...e
	});
}
function SS({ container: e, ...t }) {
	let n = lb();
	return /* @__PURE__ */ (0, R.jsx)(Sc, {
		"data-slot": "dialog-portal",
		container: e ?? n,
		...t
	});
}
function CS({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(Lc, {
		"data-slot": "dialog-close",
		...e
	});
}
function wS({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(wc, {
		"data-slot": "dialog-overlay",
		className: H("fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", e),
		...t
	});
}
function TS({ className: e, children: t, showCloseButton: n = !0, ...r }) {
	return /* @__PURE__ */ (0, R.jsxs)(SS, {
		"data-slot": "dialog-portal",
		children: [/* @__PURE__ */ (0, R.jsx)(wS, {}), /* @__PURE__ */ (0, R.jsxs)(Oc, {
			"data-slot": "dialog-content",
			className: H("fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg", e),
			...r,
			children: [t, n && /* @__PURE__ */ (0, R.jsxs)(Lc, {
				"data-slot": "dialog-close",
				className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				children: [/* @__PURE__ */ (0, R.jsx)(Ut, {}), /* @__PURE__ */ (0, R.jsx)("span", {
					className: "sr-only",
					children: "Close"
				})]
			})]
		})]
	});
}
function ES({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "dialog-header",
		className: H("flex flex-col gap-2 text-center sm:text-left", e),
		...t
	});
}
function DS({ className: e, showCloseButton: t = !1, children: n, ...r }) {
	return /* @__PURE__ */ (0, R.jsxs)("div", {
		"data-slot": "dialog-footer",
		className: H("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", e),
		...r,
		children: [n, t && /* @__PURE__ */ (0, R.jsx)(Lc, {
			asChild: !0,
			children: /* @__PURE__ */ (0, R.jsx)(zy, {
				variant: "outline",
				children: "Close"
			})
		})]
	});
}
function OS({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(Nc, {
		"data-slot": "dialog-title",
		className: H("text-lg leading-none font-semibold", e),
		...t
	});
}
function kS({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(Fc, {
		"data-slot": "dialog-description",
		className: H("text-sm text-muted-foreground", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/dropdown-menu.tsx
function AS({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(Lm, {
		"data-slot": "dropdown-menu",
		...e
	});
}
function jS({ container: e, ...t }) {
	let n = lb();
	return /* @__PURE__ */ (0, R.jsx)(zm, {
		"data-slot": "dropdown-menu-portal",
		container: e ?? n,
		...t
	});
}
function MS({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(Rm, {
		"data-slot": "dropdown-menu-trigger",
		...e
	});
}
function NS({ className: e, sideOffset: t = 4, ...n }) {
	return /* @__PURE__ */ (0, R.jsx)(jS, { children: /* @__PURE__ */ (0, R.jsx)(Bm, {
		"data-slot": "dropdown-menu-content",
		sideOffset: t,
		className: H("z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", e),
		...n
	}) });
}
function PS({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(Vm, {
		"data-slot": "dropdown-menu-group",
		...e
	});
}
function FS({ className: e, inset: t, variant: n = "default", ...r }) {
	return /* @__PURE__ */ (0, R.jsx)(Um, {
		"data-slot": "dropdown-menu-item",
		"data-inset": t,
		"data-variant": n,
		className: H("relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!", e),
		...r
	});
}
function IS({ className: e, children: t, checked: n, ...r }) {
	return /* @__PURE__ */ (0, R.jsxs)(Wm, {
		"data-slot": "dropdown-menu-checkbox-item",
		className: H("relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
		checked: n,
		...r,
		children: [/* @__PURE__ */ (0, R.jsx)("span", {
			className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ (0, R.jsx)(qm, { children: /* @__PURE__ */ (0, R.jsx)(ee, { className: "size-4" }) })
		}), t]
	});
}
function LS({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(Gm, {
		"data-slot": "dropdown-menu-radio-group",
		...e
	});
}
function RS({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, R.jsxs)(Km, {
		"data-slot": "dropdown-menu-radio-item",
		className: H("relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
		...n,
		children: [/* @__PURE__ */ (0, R.jsx)("span", {
			className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ (0, R.jsx)(qm, { children: /* @__PURE__ */ (0, R.jsx)(he, { className: "size-2 fill-current" }) })
		}), t]
	});
}
function zS({ className: e, inset: t, ...n }) {
	return /* @__PURE__ */ (0, R.jsx)(Hm, {
		"data-slot": "dropdown-menu-label",
		"data-inset": t,
		className: H("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", e),
		...n
	});
}
function BS({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(Jm, {
		"data-slot": "dropdown-menu-separator",
		className: H("-mx-1 my-1 h-px bg-border", e),
		...t
	});
}
function VS({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("span", {
		"data-slot": "dropdown-menu-shortcut",
		className: H("ml-auto text-xs tracking-widest text-muted-foreground", e),
		...t
	});
}
function HS({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(Ym, {
		"data-slot": "dropdown-menu-sub",
		...e
	});
}
function US({ className: e, inset: t, children: n, ...r }) {
	return /* @__PURE__ */ (0, R.jsxs)(Xm, {
		"data-slot": "dropdown-menu-sub-trigger",
		"data-inset": t,
		className: H("flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground", e),
		...r,
		children: [n, /* @__PURE__ */ (0, R.jsx)(L, { className: "ml-auto size-4" })]
	});
}
function WS({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(Zm, {
		"data-slot": "dropdown-menu-sub-content",
		className: H("z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/input.tsx
function GS({ className: e, type: t, ...n }) {
	return /* @__PURE__ */ (0, R.jsx)("input", {
		type: t,
		"data-slot": "input",
		className: H("h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30", "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50", "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40", e),
		...n
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/textarea.tsx
function KS({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("textarea", {
		"data-slot": "textarea",
		className: H("flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/input-group.tsx
function qS({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "input-group",
		role: "group",
		className: H("group/input-group relative flex w-full items-center rounded-md border border-input shadow-xs transition-[color,box-shadow] outline-none dark:bg-input/30", "h-9 min-w-0 has-[>textarea]:h-auto", "has-[>[data-align=inline-start]]:[&>input]:pl-2", "has-[>[data-align=inline-end]]:[&>input]:pr-2", "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3", "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3", "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50", "has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40", e),
		...t
	});
}
var JS = Yt("flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4", {
	variants: { align: {
		"inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
		"inline-end": "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
		"block-start": "order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5 [.border-b]:pb-3",
		"block-end": "order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5 [.border-t]:pt-3"
	} },
	defaultVariants: { align: "inline-start" }
});
function YS({ className: e, align: t = "inline-start", ...n }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		role: "group",
		"data-slot": "input-group-addon",
		"data-align": t,
		className: H(JS({ align: t }), e),
		onClick: (e) => {
			e.target.closest("button") || e.currentTarget.parentElement?.querySelector("input")?.focus();
		},
		...n
	});
}
var XS = Yt("flex items-center gap-2 text-sm shadow-none", {
	variants: { size: {
		xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
		sm: "h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
		"icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
		"icon-sm": "size-8 p-0 has-[>svg]:p-0"
	} },
	defaultVariants: { size: "xs" }
});
function ZS({ className: e, type: t = "button", variant: n = "ghost", size: r = "xs", ...i }) {
	return /* @__PURE__ */ (0, R.jsx)(zy, {
		type: t,
		"data-size": r,
		variant: n,
		className: H(XS({ size: r }), e),
		...i
	});
}
function QS({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("span", {
		className: H("flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4", e),
		...t
	});
}
function $S({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(GS, {
		"data-slot": "input-group-control",
		className: H("flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent", e),
		...t
	});
}
function eC({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(KS, {
		"data-slot": "input-group-control",
		className: H("flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/label.tsx
function tC({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)($m, {
		"data-slot": "label",
		className: H("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/chat/conversation-sidebar.tsx
function nC({ conversations: e, activeUid: t, includeArchived: n, onSelect: r, onCreate: i, onRename: a, onPin: o, onArchive: s, onDelete: c, onIncludeArchived: l }) {
	let [u, d] = (0, _.useState)(""), [f, p] = (0, _.useState)(null), [m, h] = (0, _.useState)(null), g = (0, _.useMemo)(() => {
		let t = u.trim().toLowerCase();
		return [...e].filter((e) => t === "" || (e.title || "Untitled conversation").toLowerCase().includes(t)).sort((e, t) => e.pinned === t.pinned ? (t.lastMessageAt || t.createdAt) - (e.lastMessageAt || e.createdAt) : e.pinned ? -1 : 1);
	}, [e, u]), v = () => {
		let e = m?.title.trim() ?? "";
		m !== null && e !== "" && a(m.uid, e), h(null);
	};
	return /* @__PURE__ */ (0, R.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, R.jsxs)("div", {
				className: "flex items-center justify-between gap-2 border-b px-2.5 py-2",
				children: [/* @__PURE__ */ (0, R.jsx)("h2", {
					className: "font-semibold",
					children: "Conversations"
				}), /* @__PURE__ */ (0, R.jsx)(zy, {
					"aria-label": "New conversation",
					onClick: i,
					size: "icon-sm",
					variant: "ghost",
					children: /* @__PURE__ */ (0, R.jsx)(xt, { "aria-hidden": "true" })
				})]
			}),
			/* @__PURE__ */ (0, R.jsx)("div", {
				className: "border-b px-2.5 py-2",
				children: /* @__PURE__ */ (0, R.jsxs)(qS, {
					className: "h-8",
					children: [/* @__PURE__ */ (0, R.jsx)(YS, { children: /* @__PURE__ */ (0, R.jsx)(Tt, { "aria-hidden": "true" }) }), /* @__PURE__ */ (0, R.jsx)($S, {
						"aria-label": "Filter conversations",
						onChange: (e) => d(e.currentTarget.value),
						placeholder: "Filter…",
						value: u
					})]
				})
			}),
			/* @__PURE__ */ (0, R.jsx)(Ay, {
				className: "min-h-0 flex-1",
				children: /* @__PURE__ */ (0, R.jsxs)("ul", {
					className: "p-1.5",
					children: [g.length === 0 ? /* @__PURE__ */ (0, R.jsx)("li", {
						className: "px-2 py-6 text-center text-muted-foreground",
						children: u === "" ? "No conversations yet." : "Nothing matches."
					}) : null, g.map((e) => /* @__PURE__ */ (0, R.jsx)("li", { children: /* @__PURE__ */ (0, R.jsxs)("div", {
						className: H("group flex items-start gap-1 rounded-md px-2 py-1.5 transition-colors", e.uid === t ? "bg-accent" : "hover:bg-accent/60"),
						children: [/* @__PURE__ */ (0, R.jsxs)("button", {
							"aria-current": e.uid === t ? "true" : void 0,
							className: "min-w-0 flex-1 text-start",
							onClick: () => r(e.uid),
							type: "button",
							children: [/* @__PURE__ */ (0, R.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [e.pinned ? /* @__PURE__ */ (0, R.jsx)(_t, {
									"aria-label": "Pinned",
									className: "size-3 shrink-0 text-muted-foreground"
								}) : null, /* @__PURE__ */ (0, R.jsx)("span", {
									className: "truncate font-medium",
									children: e.title || "Untitled conversation"
								})]
							}), /* @__PURE__ */ (0, R.jsxs)("span", {
								className: "mt-0.5 flex min-w-0 items-center gap-1.5 text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, R.jsxs)("span", {
										className: "truncate whitespace-nowrap",
										children: [
											Tr(e.lastMessageAt || e.createdAt),
											" · ",
											e.messageCount
										]
									}),
									/* @__PURE__ */ (0, R.jsx)(rC, { status: e.status }),
									e.archived ? /* @__PURE__ */ (0, R.jsx)(ky, {
										className: "shrink-0 rounded-full px-1.5 font-normal",
										variant: "outline",
										children: "Archived"
									}) : null
								]
							})]
						}), /* @__PURE__ */ (0, R.jsxs)(AS, { children: [/* @__PURE__ */ (0, R.jsx)(MS, {
							asChild: !0,
							children: /* @__PURE__ */ (0, R.jsx)(zy, {
								"aria-label": `Actions for ${e.title || "this conversation"}`,
								className: "opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100 data-[state=open]:opacity-100",
								size: "icon-sm",
								variant: "ghost",
								children: /* @__PURE__ */ (0, R.jsx)(Ce, { "aria-hidden": "true" })
							})
						}), /* @__PURE__ */ (0, R.jsxs)(NS, {
							align: "end",
							children: [
								/* @__PURE__ */ (0, R.jsxs)(FS, {
									onSelect: () => h({
										uid: e.uid,
										title: e.title
									}),
									children: [/* @__PURE__ */ (0, R.jsx)(jt, { "aria-hidden": "true" }), "Rename"]
								}),
								/* @__PURE__ */ (0, R.jsxs)(FS, {
									onSelect: () => o(e.uid, !e.pinned),
									children: [e.pinned ? /* @__PURE__ */ (0, R.jsx)(yt, { "aria-hidden": "true" }) : /* @__PURE__ */ (0, R.jsx)(_t, { "aria-hidden": "true" }), e.pinned ? "Unpin" : "Pin"]
								}),
								/* @__PURE__ */ (0, R.jsxs)(FS, {
									onSelect: () => s(e.uid, !e.archived),
									children: [e.archived ? /* @__PURE__ */ (0, R.jsx)(T, { "aria-hidden": "true" }) : /* @__PURE__ */ (0, R.jsx)(D, { "aria-hidden": "true" }), e.archived ? "Restore" : "Archive"]
								}),
								/* @__PURE__ */ (0, R.jsx)(BS, {}),
								/* @__PURE__ */ (0, R.jsxs)(FS, {
									onSelect: () => p(e),
									variant: "destructive",
									children: [/* @__PURE__ */ (0, R.jsx)(Lt, { "aria-hidden": "true" }), "Delete"]
								})
							]
						})] })]
					}) }, e.uid))]
				})
			}),
			/* @__PURE__ */ (0, R.jsx)("div", {
				className: "border-t px-2.5 py-2",
				children: /* @__PURE__ */ (0, R.jsxs)(tC, {
					className: "gap-2 font-normal text-muted-foreground",
					children: [/* @__PURE__ */ (0, R.jsx)(yS, {
						checked: n,
						onCheckedChange: (e) => l(e === !0)
					}), "Show archived"]
				})
			}),
			/* @__PURE__ */ (0, R.jsx)(bS, {
				onOpenChange: (e) => !e && h(null),
				open: m !== null,
				children: /* @__PURE__ */ (0, R.jsxs)(TS, { children: [
					/* @__PURE__ */ (0, R.jsxs)(ES, { children: [/* @__PURE__ */ (0, R.jsx)(OS, { children: "Rename conversation" }), /* @__PURE__ */ (0, R.jsx)(kS, { children: "The title is how you will find this conversation again." })] }),
					/* @__PURE__ */ (0, R.jsx)(GS, {
						"aria-label": "Conversation title",
						maxLength: 255,
						onChange: (e) => {
							let t = e.currentTarget.value;
							h((e) => e === null ? null : {
								...e,
								title: t
							});
						},
						onKeyDown: (e) => {
							e.key === "Enter" && (e.preventDefault(), v());
						},
						value: m?.title ?? ""
					}),
					/* @__PURE__ */ (0, R.jsxs)(DS, { children: [/* @__PURE__ */ (0, R.jsx)(zy, {
						onClick: () => h(null),
						variant: "outline",
						children: "Cancel"
					}), /* @__PURE__ */ (0, R.jsx)(zy, {
						disabled: (m?.title.trim() ?? "") === "",
						onClick: v,
						children: "Rename"
					})] })
				] })
			}),
			/* @__PURE__ */ (0, R.jsx)(bS, {
				onOpenChange: (e) => !e && p(null),
				open: f !== null,
				children: /* @__PURE__ */ (0, R.jsxs)(TS, { children: [/* @__PURE__ */ (0, R.jsxs)(ES, { children: [/* @__PURE__ */ (0, R.jsx)(OS, { children: "Delete this conversation?" }), /* @__PURE__ */ (0, R.jsxs)(kS, { children: [
					"“",
					f?.title || "Untitled conversation",
					"” and its messages are removed from your list now and purged when retention passes. This cannot be undone here."
				] })] }), /* @__PURE__ */ (0, R.jsxs)(DS, { children: [/* @__PURE__ */ (0, R.jsx)(zy, {
					onClick: () => p(null),
					variant: "outline",
					children: "Cancel"
				}), /* @__PURE__ */ (0, R.jsx)(zy, {
					onClick: () => {
						f !== null && c(f.uid), p(null);
					},
					variant: "destructive",
					children: "Delete"
				})] })] })
			})
		]
	});
}
function rC({ status: e }) {
	return e === "idle" ? null : /* @__PURE__ */ (0, R.jsx)(ky, {
		className: "shrink-0 rounded-full px-1.5 font-normal whitespace-nowrap",
		variant: e === "failed" ? "destructive" : "secondary",
		children: e === "processing" ? "Running" : e === "awaiting_approval" ? "Needs approval" : e === "awaiting_input" ? "Has a question" : "Failed"
	});
}
//#endregion
//#region Build/Frontend/src/apps/chat-home.tsx
function iC({ props: e }) {
	let t = _S(), n = typeof e.conversation == "number" ? e.conversation : Number(e.conversation ?? 0);
	return (0, _.useEffect)(() => {
		Number.isFinite(n) && n > 0 && t.select(n);
	}, [n]), /* @__PURE__ */ (0, R.jsxs)("div", {
		className: "grid h-full min-h-0 grid-cols-1 md:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, R.jsx)("div", {
			className: "min-h-0 border-e",
			children: /* @__PURE__ */ (0, R.jsx)(nC, {
				activeUid: t.conversationUid,
				conversations: t.conversations.conversations,
				includeArchived: t.conversations.includeArchived,
				onArchive: (e, n) => void t.conversations.setArchived(e, n),
				onCreate: () => void t.startNew(),
				onDelete: (e) => void t.conversations.remove(e),
				onIncludeArchived: t.conversations.setIncludeArchived,
				onPin: (e, n) => void t.conversations.setPinned(e, n),
				onRename: (e, n) => void t.conversations.rename(e, n),
				onSelect: t.select
			})
		}), /* @__PURE__ */ (0, R.jsx)("div", {
			className: "hidden min-h-0 md:block",
			children: /* @__PURE__ */ (0, R.jsx)(gb, {
				status: t.status,
				thread: t.thread
			})
		})]
	});
}
//#endregion
//#region Build/Frontend/src/lib/theme.ts
var aC = a(), oC = "data-color-scheme";
function sC(e) {
	let t = e.ownerDocument.documentElement.getAttribute(oC);
	return t === "dark" || t === "light" ? t : "auto";
}
function cC(e) {
	switch (e) {
		case "dark": return "only dark";
		case "light": return "only light";
		default: return "light dark";
	}
}
function lC(e, t) {
	if (e !== "auto") return e;
	try {
		return t.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	} catch {
		return "light";
	}
}
function uC(e, t) {
	let n = e.ownerDocument.documentElement, r = e.ownerDocument.defaultView ?? window, i = () => t(sC(e));
	i();
	let a = new MutationObserver(i);
	a.observe(n, {
		attributes: !0,
		attributeFilter: [oC]
	});
	let o = null;
	try {
		o = r.matchMedia("(prefers-color-scheme: dark)"), o.addEventListener("change", i);
	} catch {
		o = null;
	}
	return () => {
		a.disconnect(), o?.removeEventListener("change", i);
	};
}
//#endregion
//#region Build/Frontend/src/components/ui/kbd.tsx
function dC({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("kbd", {
		"data-slot": "kbd",
		className: H("pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none", "[&_svg:not([class*='size-'])]:size-3", "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10", e),
		...t
	});
}
function fC({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("kbd", {
		"data-slot": "kbd-group",
		className: H("inline-flex items-center gap-1", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/skeleton.tsx
function pC({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "skeleton",
		className: H("animate-pulse rounded-md bg-accent", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/shell/registry.ts
var mC = /* @__PURE__ */ new Map(), hC = /* @__PURE__ */ new Set();
function gC(e, t) {
	if (e.trim() === "" || !e.includes("/")) throw Error(`defineShadcnApp: "${e}" is not a vendor-prefixed app name like "my_ext/dashboard".`);
	mC.set(e, t);
	for (let e of hC) e();
}
function _C(e) {
	return mC.get(e);
}
function vC() {
	return [...mC.keys()].sort();
}
function yC(e) {
	return hC.add(e), () => hC.delete(e);
}
function bC(e) {
	return (0, _.useSyncExternalStore)(yC, () => mC.get(e), () => mC.get(e));
}
//#endregion
//#region Build/Frontend/src/shell/app-outlet.tsx
function xC({ appName: e, props: t, shell: n }) {
	let r = bC(e), [i, a] = (0, _.useState)(!1);
	return (0, _.useEffect)(() => {
		if (r !== void 0) return;
		let e = setTimeout(() => a(!0), 1500);
		return () => clearTimeout(e);
	}, [r]), r === void 0 ? i ? /* @__PURE__ */ (0, R.jsx)(CC, { appName: e }) : /* @__PURE__ */ (0, R.jsx)(SC, {}) : /* @__PURE__ */ (0, R.jsx)(wC, {
		appName: e,
		children: (0, _.createElement)(r, {
			props: t,
			shell: n
		})
	});
}
function SC() {
	return /* @__PURE__ */ (0, R.jsxs)("div", {
		"aria-busy": "true",
		className: "space-y-3 p-6",
		children: [
			/* @__PURE__ */ (0, R.jsx)(pC, { className: "h-6 w-1/3" }),
			/* @__PURE__ */ (0, R.jsx)(pC, { className: "h-4 w-2/3" }),
			/* @__PURE__ */ (0, R.jsx)(pC, { className: "h-32 w-full" })
		]
	});
}
function CC({ appName: e }) {
	let t = vC();
	return /* @__PURE__ */ (0, R.jsxs)(By, {
		className: "h-full",
		children: [/* @__PURE__ */ (0, R.jsxs)(Vy, { children: [
			/* @__PURE__ */ (0, R.jsx)(Uy, {
				variant: "icon",
				children: /* @__PURE__ */ (0, R.jsx)(st, { "aria-hidden": "true" })
			}),
			/* @__PURE__ */ (0, R.jsxs)(Wy, { children: [
				"No app is registered as “",
				e,
				"”"
			] }),
			/* @__PURE__ */ (0, R.jsxs)(Gy, { children: [
				"The shell renders the component that calls",
				" ",
				/* @__PURE__ */ (0, R.jsxs)("code", {
					className: "rounded bg-muted px-1 py-px font-mono",
					children: [
						"defineShadcnApp('",
						e,
						"', App)"
					]
				}),
				". Either that module has not been loaded — check that ",
				/* @__PURE__ */ (0, R.jsx)("code", {
					className: "font-mono",
					children: "ShadcnApp::$jsModule"
				}),
				" names an import-map specifier this page loads — or the two names differ."
			] })
		] }), /* @__PURE__ */ (0, R.jsx)(Ky, { children: t.length === 0 ? /* @__PURE__ */ (0, R.jsx)("p", {
			className: "text-muted-foreground",
			children: "No apps have registered on this page yet."
		}) : /* @__PURE__ */ (0, R.jsxs)("p", {
			className: "flex flex-wrap items-center justify-center gap-1 text-muted-foreground",
			children: ["Registered:", t.map((e) => /* @__PURE__ */ (0, R.jsx)(dC, {
				className: "font-mono normal-case",
				children: e
			}, e))]
		}) })]
	});
}
var wC = class extends _.Component {
	state = { error: null };
	static getDerivedStateFromError(e) {
		return { error: e };
	}
	componentDidCatch(e, t) {
		console.error(`[shadcn_ui] The app "${this.props.appName}" threw while rendering.`, e, t.componentStack);
	}
	render() {
		return this.state.error === null ? this.props.children : /* @__PURE__ */ (0, R.jsx)(By, {
			className: "h-full",
			children: /* @__PURE__ */ (0, R.jsxs)(Vy, { children: [
				/* @__PURE__ */ (0, R.jsx)(Uy, {
					className: "text-destructive",
					variant: "icon",
					children: /* @__PURE__ */ (0, R.jsx)(zt, { "aria-hidden": "true" })
				}),
				/* @__PURE__ */ (0, R.jsxs)(Wy, { children: [
					"“",
					this.props.appName,
					"” stopped rendering"
				] }),
				/* @__PURE__ */ (0, R.jsxs)(Gy, { children: [
					/* @__PURE__ */ (0, R.jsx)("span", {
						className: "font-mono",
						children: this.state.error.message
					}),
					/* @__PURE__ */ (0, R.jsx)("br", {}),
					"The chat keeps working. Details are in the browser console."
				] })
			] })
		});
	}
};
//#endregion
//#region Build/Frontend/src/components/ui/popover.tsx
function TC({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(Ah, {
		"data-slot": "popover",
		...e
	});
}
function EC({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(Mh, {
		"data-slot": "popover-trigger",
		...e
	});
}
function DC({ className: e, align: t = "center", sideOffset: n = 4, ...r }) {
	let i = lb();
	return /* @__PURE__ */ (0, R.jsx)(Nh, {
		container: i,
		children: /* @__PURE__ */ (0, R.jsx)(Ph, {
			"data-slot": "popover-content",
			align: t,
			sideOffset: n,
			className: H("z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", e),
			...r
		})
	});
}
function OC({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(jh, {
		"data-slot": "popover-anchor",
		...e
	});
}
function kC({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "popover-header",
		className: H("flex flex-col gap-1 text-sm", e),
		...t
	});
}
function AC({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "popover-title",
		className: H("font-medium", e),
		...t
	});
}
function jC({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("p", {
		"data-slot": "popover-description",
		className: H("text-muted-foreground", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/spinner.tsx
function MC({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(Ge, {
		role: "status",
		"aria-label": "Loading",
		className: H("size-4 animate-spin", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/components/ai/prompt-input.tsx
var NC = (0, _.createContext)(null);
function PC() {
	let e = (0, _.useContext)(NC);
	if (e === null) throw Error("usePromptInputAttachments must be used inside <PromptInput>.");
	return e;
}
function FC({ className: e, accept: t, multiple: n = !0, maxFiles: r, maxFileSize: i, attachments: a, onAddFiles: o, onRemoveFile: s, onError: c, onSubmit: l, children: u, ...d }) {
	let f = (0, _.useRef)(null), p = (0, _.useRef)(null), m = (0, _.useCallback)((e) => t === void 0 || t.trim() === "" || t.split(",").map((e) => e.trim()).filter((e) => e !== "").some((t) => t.endsWith("/*") ? e.type.startsWith(t.slice(0, -1)) : e.type === t), [t]), h = (0, _.useCallback)((e) => {
		let t = [...e];
		if (t.length === 0) return;
		let n = t.filter(m);
		if (n.length === 0) {
			c?.({
				code: "accept",
				message: "That file type is not accepted."
			});
			return;
		}
		let s = i === void 0 ? n : n.filter((e) => e.size <= i);
		if (s.length === 0) {
			c?.({
				code: "max_file_size",
				message: "The file is too large."
			});
			return;
		}
		let l = r === void 0 ? s.length : Math.max(0, r - a.length), u = s.slice(0, l);
		u.length < s.length && c?.({
			code: "max_files",
			message: "Too many files; some were not added."
		}), u.length > 0 && o(u);
	}, [
		a.length,
		m,
		i,
		r,
		o,
		c
	]), g = (0, _.useCallback)(() => f.current?.click(), []), v = (0, _.useCallback)(() => {
		for (let e of a) s(e.id);
	}, [a, s]);
	(0, _.useEffect)(() => {
		let e = p.current;
		if (e === null) return;
		let t = (e) => {
			e.dataTransfer?.types?.includes("Files") && e.preventDefault();
		}, n = (e) => {
			e.dataTransfer?.types?.includes("Files") && e.preventDefault(), e.dataTransfer?.files && e.dataTransfer.files.length > 0 && h(e.dataTransfer.files);
		};
		return e.addEventListener("dragover", t), e.addEventListener("drop", n), () => {
			e.removeEventListener("dragover", t), e.removeEventListener("drop", n);
		};
	}, [h]);
	let y = (0, _.useCallback)((e) => {
		e.currentTarget.files !== null && h(e.currentTarget.files), e.currentTarget.value = "";
	}, [h]), b = (0, _.useCallback)((e) => {
		e.preventDefault();
		let t = e.currentTarget, n = String(new FormData(t).get("message") ?? "");
		(n.trim() !== "" || a.length !== 0) && (t.reset(), l({
			text: n,
			attachments: a
		}, e));
	}, [a, l]), x = (0, _.useMemo)(() => ({
		add: h,
		clear: v,
		fileInputRef: f,
		files: a,
		openFileDialog: g,
		remove: s
	}), [
		h,
		a,
		v,
		s,
		g
	]);
	return /* @__PURE__ */ (0, R.jsxs)(NC.Provider, {
		value: x,
		children: [/* @__PURE__ */ (0, R.jsx)("input", {
			accept: t,
			"aria-hidden": "true",
			className: "hidden",
			multiple: n,
			onChange: y,
			ref: f,
			tabIndex: -1,
			type: "file"
		}), /* @__PURE__ */ (0, R.jsx)("form", {
			className: H("w-full", e),
			onSubmit: b,
			ref: p,
			...d,
			children: /* @__PURE__ */ (0, R.jsx)(qS, {
				className: "overflow-hidden",
				children: u
			})
		})]
	});
}
function IC({ className: e, onKeyDown: t, placeholder: n = "Ask about this installation…", ...r }) {
	let i = PC(), [a, o] = (0, _.useState)(!1), s = (0, _.useCallback)((e) => {
		if (t?.(e), !e.defaultPrevented) {
			if (e.key === "Enter") {
				if (a || e.nativeEvent.isComposing || e.shiftKey || (e.preventDefault(), e.currentTarget.form?.querySelector("button[type=\"submit\"]")?.disabled === !0)) return;
				e.currentTarget.form?.requestSubmit();
				return;
			}
			if (e.key === "Backspace" && e.currentTarget.value === "" && i.files.length > 0) {
				e.preventDefault();
				let t = i.files.at(-1);
				t !== void 0 && i.remove(t.id);
			}
		}
	}, [
		i,
		a,
		t
	]), c = (0, _.useCallback)((e) => {
		let t = e.clipboardData?.items;
		if (t === void 0) return;
		let n = [];
		for (let e of t) if (e.kind === "file") {
			let t = e.getAsFile();
			t !== null && n.push(t);
		}
		n.length > 0 && (e.preventDefault(), i.add(n));
	}, [i]);
	return /* @__PURE__ */ (0, R.jsx)(eC, {
		className: H("field-sizing-content max-h-56 min-h-14 text-[length:var(--text-read)]", e),
		name: "message",
		onCompositionEnd: () => o(!1),
		onCompositionStart: () => o(!0),
		onKeyDown: s,
		onPaste: c,
		placeholder: n,
		...r
	});
}
function LC({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(YS, {
		align: "block-start",
		className: H("gap-1.5", e),
		...t
	});
}
function RC({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(YS, {
		align: "block-end",
		className: H("justify-between gap-1", e),
		...t
	});
}
function zC({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		className: H("flex min-w-0 items-center gap-1", e),
		...t
	});
}
function BC({ variant: e = "ghost", className: t, size: n, tooltip: r, ...i }) {
	let a = n ?? (_.Children.count(i.children) > 1 ? "sm" : "icon-sm"), o = /* @__PURE__ */ (0, R.jsx)(ZS, {
		className: H(t),
		size: a,
		type: "button",
		variant: e,
		...i
	});
	return r === void 0 ? o : /* @__PURE__ */ (0, R.jsxs)(db, { children: [/* @__PURE__ */ (0, R.jsx)(fb, {
		asChild: !0,
		children: o
	}), /* @__PURE__ */ (0, R.jsx)(pb, {
		side: "top",
		children: r
	})] });
}
function VC({ children: e, ...t }) {
	let n = PC();
	return /* @__PURE__ */ (0, R.jsx)(BC, {
		"aria-label": "Attach a file",
		onClick: n.openFileDialog,
		tooltip: "Attach a file",
		...t,
		children: e ?? /* @__PURE__ */ (0, R.jsx)(pt, {
			className: "size-4",
			"aria-hidden": "true"
		})
	});
}
function HC({ className: e, variant: t = "default", size: n = "icon-sm", status: r = "ready", onStop: i, onClick: a, children: o, ...s }) {
	let c = (r === "submitted" || r === "streaming") && i !== void 0, l = /* @__PURE__ */ (0, R.jsx)(ye, {
		className: "size-4",
		"aria-hidden": "true"
	});
	return r === "submitted" ? l = /* @__PURE__ */ (0, R.jsx)(MC, {}) : r === "streaming" ? l = /* @__PURE__ */ (0, R.jsx)(Nt, {
		className: "size-4",
		"aria-hidden": "true"
	}) : r === "error" && (l = /* @__PURE__ */ (0, R.jsx)(Ut, {
		className: "size-4",
		"aria-hidden": "true"
	})), /* @__PURE__ */ (0, R.jsx)(ZS, {
		"aria-label": c ? "Stop the running turn" : "Send message",
		className: H("transition-transform active:scale-95", e),
		onClick: (e) => {
			if (c) {
				e.preventDefault(), i();
				return;
			}
			a?.(e);
		},
		size: n,
		type: c ? "button" : "submit",
		variant: t,
		...s,
		children: o ?? l
	});
}
//#endregion
//#region Build/Frontend/src/components/ai/suggestion.tsx
var UC = ({ className: e, children: t, ...n }) => /* @__PURE__ */ (0, R.jsxs)(Ay, {
	className: "w-full overflow-x-auto whitespace-nowrap",
	...n,
	children: [/* @__PURE__ */ (0, R.jsx)("div", {
		className: H("flex w-max flex-nowrap items-center gap-2", e),
		children: t
	}), /* @__PURE__ */ (0, R.jsx)(jy, {
		className: "hidden",
		orientation: "horizontal"
	})]
}), WC = ({ suggestion: e, onClick: t, className: n, variant: r = "outline", size: i = "sm", children: a, ...o }) => {
	let s = (0, _.useCallback)(() => {
		t?.(e);
	}, [t, e]);
	return /* @__PURE__ */ (0, R.jsx)(zy, {
		className: H("cursor-pointer rounded-full px-4", n),
		onClick: s,
		size: i,
		type: "button",
		variant: r,
		...o,
		children: a || e
	});
}, GC = Yt("group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-xl border bg-card text-card-foreground transition-colors focus-within:ring-1 focus-within:ring-ring/50 has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed", { variants: {
	size: {
		default: "gap-2 text-sm has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2 has-data-[slot=attachment-media]:p-2",
		sm: "gap-2.5 text-xs has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5 has-data-[slot=attachment-media]:p-1.5",
		xs: "gap-1.5 rounded-lg text-xs has-data-[slot=attachment-content]:px-1.5 has-data-[slot=attachment-content]:py-1 has-data-[slot=attachment-media]:p-1"
	},
	orientation: {
		horizontal: "min-w-40 items-center",
		vertical: "w-24 flex-col has-data-[slot=attachment-content]:w-30"
	}
} });
function KC({ className: e, state: t = "done", size: n = "default", orientation: r = "horizontal", ...i }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "attachment",
		"data-state": t,
		"data-size": n,
		"data-orientation": r,
		className: H(GC({
			size: n,
			orientation: r
		}), e),
		...i
	});
}
var qC = Yt("relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-foreground group-data-[orientation=vertical]/attachment:w-full group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-7 group-data-[size=xs]/attachment:rounded-md group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive group-data-[orientation=vertical]/attachment:*:data-[slot=spinner]:size-6! [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6 group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3.5", {
	variants: { variant: {
		icon: "",
		image: "opacity-60 group-data-[state=done]/attachment:opacity-100 group-data-[state=idle]/attachment:opacity-100 *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover"
	} },
	defaultVariants: { variant: "icon" }
});
function JC({ className: e, variant: t = "icon", ...n }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "attachment-media",
		"data-variant": t,
		className: H(qC({ variant: t }), e),
		...n
	});
}
function YC({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "attachment-content",
		className: H("max-w-full min-w-0 flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1", e),
		...t
	});
}
function XC({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("span", {
		"data-slot": "attachment-title",
		className: H("block max-w-full min-w-0 truncate font-medium group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer", e),
		...t
	});
}
function ZC({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("span", {
		"data-slot": "attachment-description",
		className: H("mt-0.5 block min-w-0 truncate text-xs text-muted-foreground group-data-[state=error]/attachment:text-destructive/80", "max-w-full", e),
		...t
	});
}
function QC({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "attachment-actions",
		className: H("relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:right-3 group-data-[orientation=vertical]/attachment:gap-1", e),
		...t
	});
}
function $C({ className: e, variant: t, size: n = "icon-xs", ...r }) {
	return /* @__PURE__ */ (0, R.jsx)(zy, {
		"data-slot": "attachment-action",
		variant: t ?? "ghost",
		size: n,
		className: H(e),
		...r
	});
}
function ew({ className: e, asChild: t = !1, type: n, ...r }) {
	let i = t ? Pr : "button";
	return /* @__PURE__ */ (0, R.jsx)(i, {
		"data-slot": "attachment-trigger",
		type: t ? void 0 : n ?? "button",
		className: H("absolute inset-0 z-10 outline-none", e),
		...r
	});
}
function tw({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "attachment-group",
		className: H("flex min-w-0 scroll-fade-x snap-x snap-mandatory scroll-px-1 scrollbar-none gap-3 overflow-x-auto overscroll-x-contain py-1 *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/chat/attachment-list.tsx
function nw({ attachments: e }) {
	return e.length === 0 ? null : /* @__PURE__ */ (0, R.jsx)(tw, { children: e.map((e) => /* @__PURE__ */ (0, R.jsxs)(KC, {
		size: "sm",
		children: [/* @__PURE__ */ (0, R.jsx)(JC, { children: /* @__PURE__ */ (0, R.jsx)(Ne, { "aria-hidden": "true" }) }), /* @__PURE__ */ (0, R.jsxs)(YC, { children: [/* @__PURE__ */ (0, R.jsx)(XC, { children: e.fileName }), /* @__PURE__ */ (0, R.jsx)(ZC, { children: Sr(e.fileSize) })] })]
	}, e.fileUid)) });
}
function rw({ attachments: e, onRemove: t }) {
	return e.length === 0 ? null : /* @__PURE__ */ (0, R.jsx)(tw, { children: e.map((e) => /* @__PURE__ */ (0, R.jsxs)(KC, {
		size: "sm",
		state: e.status === "ready" ? "done" : e.status === "error" ? "error" : "uploading",
		children: [
			/* @__PURE__ */ (0, R.jsx)(JC, { children: /* @__PURE__ */ (0, R.jsx)(Ne, { "aria-hidden": "true" }) }),
			/* @__PURE__ */ (0, R.jsxs)(YC, { children: [/* @__PURE__ */ (0, R.jsx)(XC, { children: e.file.name }), /* @__PURE__ */ (0, R.jsx)(ZC, { children: e.status === "error" ? e.error ?? "Upload failed." : Sr(e.file.size) })] }),
			/* @__PURE__ */ (0, R.jsx)(QC, { children: /* @__PURE__ */ (0, R.jsx)($C, {
				"aria-label": `Remove ${e.file.name}`,
				onClick: () => t(e.id),
				type: "button",
				children: /* @__PURE__ */ (0, R.jsx)(Ut, { "aria-hidden": "true" })
			}) })
		]
	}, e.id)) });
}
//#endregion
//#region Build/Frontend/src/chat/composer.tsx
function iw({ status: e, phase: t, busy: n, attachments: r, context: i, onSend: a, onStop: o, onAddFiles: s, onRemoveFile: c, showSuggestions: l }) {
	let u = (0, _.useId)(), { disabled: d, reason: f } = iS(t, e?.budget.allowed ?? !0, e?.budget.reason ?? null, e?.available ?? !0), p = t === "streaming" ? "streaming" : t === "error" ? "error" : "ready", m = l && !d ? e?.suggestions ?? [] : [], h = e?.limits.maxMessageLength ?? 0, g = e?.features.attachments ?? !0;
	return /* @__PURE__ */ (0, R.jsxs)("div", {
		className: "border-t bg-background px-3 py-2.5",
		children: [
			m.length > 0 ? /* @__PURE__ */ (0, R.jsx)(UC, {
				className: "mb-2 w-full flex-wrap",
				children: m.map((e) => /* @__PURE__ */ (0, R.jsx)(WC, {
					onClick: a,
					suggestion: e
				}, e))
			}) : null,
			/* @__PURE__ */ (0, R.jsxs)(FC, {
				accept: sS(),
				attachments: r,
				onAddFiles: s,
				onRemoveFile: c,
				onSubmit: (e) => a(e.text),
				children: [
					r.length > 0 ? /* @__PURE__ */ (0, R.jsx)(LC, { children: /* @__PURE__ */ (0, R.jsx)(rw, {
						attachments: r,
						onRemove: c
					}) }) : null,
					/* @__PURE__ */ (0, R.jsx)(IC, {
						"aria-describedby": f === "" ? void 0 : u,
						"aria-label": "Message",
						disabled: d,
						...h > 0 ? { maxLength: h } : {},
						onKeyDown: (e) => {
							e.key === "Escape" && t === "streaming" && (e.preventDefault(), o());
						},
						placeholder: d ? "" : "Ask about this installation, or tell it what to change…"
					}),
					/* @__PURE__ */ (0, R.jsxs)(RC, { children: [/* @__PURE__ */ (0, R.jsxs)(zC, { children: [g ? /* @__PURE__ */ (0, R.jsx)(VC, { disabled: d }) : null, /* @__PURE__ */ (0, R.jsx)(aw, {
						context: i,
						status: e
					})] }), /* @__PURE__ */ (0, R.jsx)(HC, {
						disabled: d && t !== "streaming",
						onStop: o,
						status: p
					})] })
				]
			}),
			f === "" ? null : /* @__PURE__ */ (0, R.jsxs)("p", {
				className: "mt-1.5 flex items-start gap-1.5 text-muted-foreground",
				id: u,
				children: [/* @__PURE__ */ (0, R.jsx)(ze, {
					className: "mt-px size-3.5 shrink-0",
					"aria-hidden": "true"
				}), f]
			}),
			n && t === "streaming" ? /* @__PURE__ */ (0, R.jsx)("p", {
				className: "sr-only",
				role: "status",
				children: "A turn is running."
			}) : null
		]
	});
}
function aw({ context: e, status: t }) {
	let n = e.pageId ?? (t?.context.pageId || void 0), r = t?.context.pageId === n ? t?.context.pageTitle : "", i = [];
	return n !== void 0 && i.push({
		icon: Fe,
		label: r ? `${r} · ${n}` : `Page ${n}`,
		title: "The page you are on is sent with your message."
	}), e.appName !== void 0 && e.appName !== "" && !e.appName.startsWith("shadcn_ui/") && i.push({
		icon: Ue,
		label: e.appName,
		title: "This module and what it is showing are sent with your message."
	}), i.length === 0 ? null : /* @__PURE__ */ (0, R.jsx)("span", {
		className: "flex min-w-0 items-center gap-1 ps-1",
		children: i.map((e) => /* @__PURE__ */ (0, R.jsxs)(db, { children: [/* @__PURE__ */ (0, R.jsx)(fb, {
			asChild: !0,
			children: /* @__PURE__ */ (0, R.jsxs)("span", {
				className: "inline-flex max-w-40 items-center gap-1 truncate rounded-full border px-1.5 py-px text-[0.6875rem] text-muted-foreground",
				children: [/* @__PURE__ */ (0, R.jsx)(e.icon, {
					className: "size-3 shrink-0",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, R.jsx)("span", {
					className: "truncate",
					children: e.label
				})]
			})
		}), /* @__PURE__ */ (0, R.jsx)(pb, {
			className: "max-w-56",
			children: e.title
		})] }, e.label))
	});
}
//#endregion
//#region Build/Frontend/src/chat/error-banner.tsx
function ow({ message: e, onDismiss: t }) {
	return /* @__PURE__ */ (0, R.jsxs)("div", {
		className: "flex items-start gap-2 border-b border-destructive/40 bg-destructive/10 px-3 py-2 text-destructive",
		role: "alert",
		children: [
			/* @__PURE__ */ (0, R.jsx)(zt, {
				className: "mt-px size-3.5 shrink-0",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, R.jsx)("p", {
				className: "min-w-0 flex-1",
				children: e
			}),
			t === void 0 ? null : /* @__PURE__ */ (0, R.jsx)(zy, {
				"aria-label": "Dismiss",
				className: "-my-1",
				onClick: t,
				size: "icon-sm",
				variant: "ghost",
				children: /* @__PURE__ */ (0, R.jsx)(Ut, { "aria-hidden": "true" })
			})
		]
	});
}
//#endregion
//#region node_modules/@shadcn/react/dist/chunk-HBS6WEDP.js
function sw({ defaultTagName: e, props: t, render: n, state: r = {}, stateAttributesMapping: i }) {
	let a = cw(lw(r, i), t);
	if (!n) return _.createElement(e, a);
	if (typeof n == "function") return n(a, r);
	if (!_.isValidElement(n)) return null;
	let o = n.props, s = {
		...cw(a, o),
		ref: fw(a.ref, o.ref)
	};
	return _.cloneElement(n, s);
}
function cw(...e) {
	let t = {};
	for (let n of e) {
		if (!n) continue;
		let e = n;
		for (let n of Object.keys(e)) {
			let r = e[n];
			if (r === void 0) continue;
			let i = t[n];
			t[n] = n === "className" ? [i, r].filter(Boolean).join(" ") : n === "style" ? {
				...i,
				...r
			} : n === "ref" ? fw(i, r) : dw(n) && typeof i == "function" && typeof r == "function" ? uw(r, i) : r;
		}
	}
	return t;
}
function lw(e, t) {
	let n = {};
	for (let r of Object.keys(e)) {
		let i = e[r], a = t?.[r]?.(i);
		if (a) {
			Object.assign(n, a);
			continue;
		}
		if (r === "slot") {
			n["data-slot"] = i;
			continue;
		}
		let o = `data-${String(r).replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`)}`;
		typeof i == "boolean" ? n[o] = i ? "" : void 0 : i != null && (n[o] = String(i));
	}
	return n;
}
function uw(e, t) {
	return function(n) {
		e(n), n.defaultPrevented || t(n);
	};
}
function dw(e) {
	return /^on[A-Z]/.test(e);
}
function fw(...e) {
	let t = e.filter(Boolean);
	if (t.length !== 0) return (e) => {
		for (let n of t) typeof n == "function" ? n(e) : n && (n.current = e);
	};
}
//#endregion
//#region node_modules/@shadcn/react/dist/message-scroller/index.js
var pw = 8, mw = 64, hw = 0, gw = .5, _w = 180, vw = /* @__PURE__ */ new Set([
	"ArrowDown",
	"ArrowUp",
	"End",
	"Home",
	"PageDown",
	"PageUp",
	" "
]), yw = {
	start: !1,
	end: !1
}, bw = {
	currentAnchorId: null,
	visibleMessageIds: []
};
function xw({ content: e, scrollEdgeThreshold: t, spacer: n, viewport: r }) {
	if (!r || !e) return yw;
	let i = Nw({
		content: e,
		spacer: n,
		viewport: r
	});
	return {
		start: r.scrollTop > t,
		end: i - r.scrollTop - r.clientHeight > t
	};
}
function Sw({ content: e, scrollMargin: t, scrollPreviousItemPeek: n, spacer: r, viewport: i, visibleMessageIds: a }) {
	if (!e || !i) return bw;
	let o = i.getBoundingClientRect(), s = o.top + t + n, c = typeof IntersectionObserver > "u", l = [], u = null;
	for (let t of Cw(e, r)) {
		let e = t.dataset.messageId;
		if (!e) continue;
		let n = t.dataset.scrollAnchor === "true", r = n || c ? t.getBoundingClientRect() : null;
		(c && r ? r.bottom > s && r.top < o.bottom : a.has(e)) && l.push(e), n && r && r.top <= s + gw && (u = e);
	}
	return l.length === 0 && u === null ? bw : {
		currentAnchorId: u,
		visibleMessageIds: l
	};
}
function Cw(e, t) {
	return Array.from(e.children).filter((e) => e instanceof HTMLElement && e !== t);
}
function ww(e, t) {
	for (let n = t; n < e.length; n++) {
		let t = e[n];
		if (t?.dataset.scrollAnchor === "true") return t;
	}
	return null;
}
function Tw(e, t) {
	for (let n of e) if (n.dataset.scrollAnchor === "true" && !t.has(n)) return n;
	return null;
}
function Ew(e, t) {
	let n = 0;
	for (let r = t; r < e.length; r++) if (e[r]?.dataset.scrollAnchor === "true" && (n += 1, n > 1)) return !0;
	return !1;
}
function Dw(e) {
	for (let t = e.length - 1; t >= 0; t--) {
		let n = e[t];
		if (n?.dataset.scrollAnchor === "true") return n;
	}
	return null;
}
function Ow({ content: e, spacer: t, viewport: n }) {
	let r = n.getBoundingClientRect();
	for (let n of Cw(e, t)) {
		if (!n.dataset.messageId) continue;
		let e = n.getBoundingClientRect();
		if (e.bottom > r.top && e.top < r.bottom) return n;
	}
	return null;
}
function kw({ align: e, element: t, scrollMargin: n, spacer: r, viewport: i }) {
	let a = Aw(t, i), o = t.getBoundingClientRect().height, s = Iw(r);
	if (e === "center") {
		let e = Math.max(0, i.clientHeight - s.start - s.end);
		return a - s.start - (e - o) / 2 - n;
	}
	if (e === "end") return a - i.clientHeight + o + s.end + n;
	if (e === "nearest") {
		let e = a + o, t = i.scrollTop + s.start, r = i.scrollTop + i.clientHeight - s.end;
		return a >= t && e <= r ? i.scrollTop : a < t ? a - s.start - n : e - i.clientHeight + s.end + n;
	}
	return a - s.start - n;
}
function Aw(e, t) {
	let n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
	return n.top - r.top + t.scrollTop;
}
function jw(e, t) {
	return e.getBoundingClientRect().top - t.getBoundingClientRect().top;
}
function Mw({ content: e, scrollTop: t, spacer: n, viewport: r }) {
	let i = Nw({
		content: e,
		spacer: n,
		viewport: r
	});
	return t + r.clientHeight - i;
}
function Nw({ content: e, spacer: t, viewport: n }) {
	let r = Cw(e, t), i = Fw(e), a = n.getBoundingClientRect(), o = n.scrollTop, s = i.start + i.end;
	for (let e of r) {
		let t = e.getBoundingClientRect();
		s = Math.max(s, t.bottom - a.top + o + i.end);
	}
	return s;
}
function Pw(e) {
	return Math.max(0, e.scrollHeight - e.clientHeight);
}
function Fw(e) {
	let t = window.getComputedStyle(e);
	return {
		end: Rw(t.paddingBlockEnd || t.paddingBottom),
		start: Rw(t.paddingBlockStart || t.paddingTop)
	};
}
function Iw(e) {
	let t = e?.parentElement;
	return t ? Fw(t) : {
		end: 0,
		start: 0
	};
}
function Lw(e) {
	if (!e) return 0;
	let t = window.getComputedStyle(e);
	return Rw(t.rowGap === "normal" ? t.gap : t.rowGap);
}
function Rw(e) {
	if (!e) return 0;
	let t = Number.parseFloat(e);
	return Number.isFinite(t) ? t : 0;
}
function zw(e, t) {
	let n = e, r = /* @__PURE__ */ new Set();
	return {
		getSnapshot: () => n,
		hasListeners: () => r.size > 0,
		setSnapshot: (e) => {
			t(n, e) || (n = e, r.forEach((e) => e()));
		},
		subscribe: (e, t, n) => {
			let i = r.size === 0;
			return r.add(e), i && t?.(), () => {
				r.delete(e), r.size === 0 && n?.();
			};
		}
	};
}
function Bw(e, t) {
	return zw(e, t);
}
function Vw() {
	return zw(bw, Uw);
}
function Hw(e, t) {
	return e.start === t.start && e.end === t.end;
}
function Uw(e, t) {
	return e.currentAnchorId !== t.currentAnchorId || e.visibleMessageIds.length !== t.visibleMessageIds.length ? !1 : e.visibleMessageIds.every((e, n) => e === t.visibleMessageIds[n]);
}
function Ww({ autoScroll: e, defaultScrollPosition: t, scrollEdgeThreshold: n, scrollMargin: r, scrollPreviousItemPeek: i }) {
	let a = _.useRef(e), o = _.useRef(!1), s = _.useRef(null), c = _.useRef(!1), l = _.useRef(n), u = _.useRef(0), d = _.useRef(null), f = _.useRef(0), p = _.useRef(e ? "following-bottom" : "free-scrolling"), m = _.useRef(/* @__PURE__ */ new Map()), h = _.useRef(null), g = _.useRef(null), v = _.useRef(null), y = _.useRef(i), b = _.useRef(!0), x = _.useRef(null), S = _.useRef(r), C = _.useRef(null), w = _.useRef(0), T = _.useRef(0), E = _.useRef(null), D = _.useRef(null), O = _.useRef(null), k = _.useRef(null), A = _.useRef(null), j = _.useRef(null), M = _.useRef(null), N = _.useRef(null), P = _.useRef(null), F = _.useRef(/* @__PURE__ */ new Set()), I = _.useRef(/* @__PURE__ */ new WeakSet());
	return O.current === null && (O.current = Bw(t === "end" || t === "last-anchor", (e, t) => e === t)), k.current === null && (k.current = Bw(yw, Hw)), P.current === null && (P.current = Vw()), a.current = e, l.current = n, S.current = r, y.current = i, {
		autoScrollRef: a,
		autoscrollingRef: o,
		autoscrollingTimeoutRef: A,
		streamingTurnRef: v,
		contentRef: s,
		defaultScrollPositionAppliedRef: c,
		firstItemRef: d,
		itemCountRef: u,
		lastScrollTopRef: f,
		messageElementsRef: m,
		modeRef: p,
		pendingScrollFrameRef: C,
		pendingScrollToMessageRef: h,
		prependRestoreRef: g,
		preserveScrollOnPrependRef: b,
		pendingDefaultScrollStore: O.current,
		rootRef: x,
		scrollEdgeThresholdRef: l,
		scrollMarginRef: S,
		scrollPreviousItemPeekRef: y,
		spacerGapRef: w,
		spacerHeightRef: T,
		spacerRef: E,
		stateFrameRef: D,
		stateStore: k.current,
		viewportRef: j,
		visibilityFrameRef: M,
		visibilityObserverRef: N,
		visibilityStore: P.current,
		visibleMessageIdsRef: F,
		handledScrollAnchorsRef: I
	};
}
function Gw(e) {
	e.pendingDefaultScrollStore.setSnapshot(!1);
}
function Kw(e) {
	e.defaultScrollPositionAppliedRef.current = !0, Gw(e);
}
function qw({ refs: e, commitScrollState: t, scheduleStateCommit: n, scheduleVisibilitySync: r }) {
	let { streamingTurnRef: i, autoScrollRef: a, autoscrollingRef: o, autoscrollingTimeoutRef: s, contentRef: c, itemCountRef: l, messageElementsRef: u, modeRef: d, pendingScrollToMessageRef: f, prependRestoreRef: p, scrollMarginRef: m, scrollPreviousItemPeekRef: h, spacerGapRef: g, spacerHeightRef: v, spacerRef: y, viewportRef: b } = e, x = _.useCallback((e) => {
		s.current !== null && (window.clearTimeout(s.current), s.current = null), o.current !== e && (o.current = e, t()), e && (s.current = window.setTimeout(() => {
			s.current = null, o.current = !1, t();
		}, _w));
	}, [t]), S = _.useCallback((e) => {
		let t = y.current;
		if (!t) return;
		let n = Math.max(0, Math.ceil(e));
		v.current !== n && (v.current = n, t.hidden = n === 0, t.style.height = `${n}px`, t.style.marginTop = n > 0 ? `${-g.current}px` : "");
	}, []), C = _.useCallback((e, { behavior: r = "auto", autoscrolling: i = !1 } = {}) => {
		let a = b.current;
		if (!a) return;
		let o = Math.max(0, e);
		if (Math.abs(a.scrollTop - o) <= gw) {
			a.scrollTop = o, t();
			return;
		}
		i && x(!0), a.scrollTo({
			top: o,
			behavior: r
		}), n();
	}, [
		t,
		n,
		x
	]), w = _.useCallback(({ behavior: e = "auto" } = {}) => b.current ? (S(0), i.current = null, d.current = "free-scrolling", C(0, { behavior: e }), r(), !0) : !1, [
		r,
		C,
		S
	]), T = _.useCallback(({ behavior: e = "auto" } = {}) => {
		let t = b.current;
		return t ? (S(0), i.current = null, d.current = a.current ? "following-bottom" : "free-scrolling", C(Pw(t), {
			autoscrolling: !0,
			behavior: e
		}), r(), !0) : !1;
	}, [
		r,
		C,
		S
	]), E = _.useCallback((e, { align: t = "start", behavior: n = "auto", scrollMargin: a = m.current } = {}, { keepPreviousPeek: o = !1 } = {}) => {
		let s = c.current, l = b.current;
		if (!s || !l || !s.contains(e)) return !1;
		let u = kw({
			align: t,
			element: e,
			scrollMargin: o ? a + h.current : a,
			spacer: y.current,
			viewport: l
		}), f = Mw({
			content: s,
			scrollTop: u,
			spacer: y.current,
			viewport: l
		});
		return S(f), p.current = {
			element: e,
			viewportTop: jw(e, l)
		}, d.current = o ? "anchored-to-message" : "settling-jump", i.current = o ? e : null, C(u, { behavior: n }), r(), !0;
	}, [
		r,
		C,
		S
	]), D = _.useCallback(() => {
		let e = i.current;
		return !e || !e.isConnected || d.current !== "anchored-to-message" ? !1 : E(e, { align: "start" }, { keepPreviousPeek: !0 });
	}, [E]), O = _.useCallback((t, n) => {
		let r = u.current.get(t);
		return r ? (Kw(e), E(r, n) ? (f.current = null, !0) : (f.current = {
			messageId: t,
			options: n
		}, !0)) : l.current === 0 && (f.current = {
			messageId: t,
			options: n
		}, Kw(e), !0);
	}, [E]);
	return {
		flushPendingScrollToMessage: _.useCallback(() => {
			let t = f.current;
			if (!t) return !1;
			let n = u.current.get(t.messageId);
			return !n || !E(n, t.options) ? !1 : (f.current = null, Kw(e), !0);
		}, [E]),
		reanchorToAnchoredMessage: D,
		scrollToElement: E,
		scrollToEnd: T,
		scrollToMessage: O,
		scrollToStart: w
	};
}
function Jw(e, t) {
	return _.useCallback((n) => {
		e.current = n, n && t();
	}, [e, t]);
}
function Yw({ autoScroll: e = !1, defaultScrollPosition: t = "end", scrollEdgeThreshold: n = pw, scrollPreviousItemPeek: r = mw, scrollMargin: i = hw }) {
	let a = Ww({
		autoScroll: e,
		defaultScrollPosition: t,
		scrollEdgeThreshold: n,
		scrollMargin: i,
		scrollPreviousItemPeek: r
	}), { streamingTurnRef: o, autoScrollRef: s, autoscrollingRef: c, autoscrollingTimeoutRef: l, contentRef: u, defaultScrollPositionAppliedRef: d, firstItemRef: f, itemCountRef: p, lastScrollTopRef: m, messageElementsRef: h, modeRef: g, pendingScrollFrameRef: v, pendingScrollToMessageRef: y, prependRestoreRef: b, preserveScrollOnPrependRef: x, pendingDefaultScrollStore: S, rootRef: C, scrollEdgeThresholdRef: w, scrollMarginRef: T, scrollPreviousItemPeekRef: E, spacerGapRef: D, spacerHeightRef: O, spacerRef: k, stateFrameRef: A, stateStore: j, viewportRef: M, visibilityFrameRef: N, visibilityObserverRef: P, visibilityStore: F, visibleMessageIdsRef: I, handledScrollAnchorsRef: ee } = a, te = _.useRef(t);
	te.current !== t && (te.current = t, d.current = !1);
	let ne = _.useCallback((e) => {
		let t = C.current, n = M.current, r = [e.start && "start", e.end && "end"].filter(Boolean).join(" "), i = c.current;
		for (let e of [t, n]) e && (r ? e.setAttribute("data-scrollable", r) : e.removeAttribute("data-scrollable"), e.toggleAttribute("data-autoscrolling", i));
	}, []), re = _.useCallback((e) => {
		let t = M.current?.scrollTop ?? 0, n = t < m.current - gw;
		m.current = t, s.current && !e.end && g.current !== "settling-jump" && g.current !== "anchored-to-message" ? g.current = "following-bottom" : g.current === "following-bottom" && e.end && n && !c.current && (g.current = "free-scrolling");
	}, []), L = _.useCallback(() => {
		let e = xw({
			content: u.current,
			scrollEdgeThreshold: w.current,
			spacer: k.current,
			viewport: M.current
		});
		re(e);
		let t = g.current === "following-bottom" ? {
			...e,
			end: !1
		} : e;
		ne(t), j.setSnapshot(t);
	}, [
		re,
		j,
		ne
	]), ie = _.useCallback(() => {
		A.current === null && (A.current = window.requestAnimationFrame(() => {
			A.current = null, L();
		}));
	}, [L]), ae = _.useCallback(() => {
		F.hasListeners() && N.current === null && (N.current = window.requestAnimationFrame(() => {
			N.current = null, F.hasListeners() && F.setSnapshot(Sw({
				content: u.current,
				scrollMargin: T.current,
				scrollPreviousItemPeek: E.current,
				spacer: k.current,
				viewport: M.current,
				visibleMessageIds: I.current
			}));
		}));
	}, [F]), { flushPendingScrollToMessage: oe, reanchorToAnchoredMessage: se, scrollToElement: ce, scrollToEnd: le, scrollToMessage: ue, scrollToStart: de } = qw({
		refs: a,
		commitScrollState: L,
		scheduleStateCommit: ie,
		scheduleVisibilitySync: ae
	}), fe = _.useCallback(() => {
		let e = b.current, t = M.current;
		if (!e || !t || !e.element.isConnected) return !1;
		let n = jw(e.element, t) - e.viewportTop;
		return Math.abs(n) <= gw ? !1 : (t.scrollTop += n, e.viewportTop = jw(e.element, t), ie(), ae(), !0);
	}, [ie, ae]), pe = _.useCallback(() => {
		let e = u.current, t = M.current;
		if (!e || !t) {
			b.current = null;
			return;
		}
		let n = Ow({
			content: e,
			spacer: k.current,
			viewport: t
		});
		b.current = n ? {
			element: n,
			viewportTop: jw(n, t)
		} : null;
	}, []), me = _.useCallback(() => {
		v.current === null && (v.current = window.requestAnimationFrame(() => {
			v.current = null, oe() && pe();
		}));
	}, [pe, oe]), he = _.useCallback(() => {
		if (!t || d.current || p.current === 0) return !1;
		let e = !1;
		if (t === "last-anchor") {
			let t = u.current, n = M.current, r = t && n ? Dw(Cw(t, k.current)) : null;
			if (!t || !n || !r) e = le({ behavior: "auto" });
			else {
				let i = Aw(r, n);
				e = Nw({
					content: t,
					spacer: k.current,
					viewport: n
				}) - i <= n.clientHeight ? le({ behavior: "auto" }) : ce(r, { align: "start" }, { keepPreviousPeek: !0 });
			}
		} else e = t === "end" ? le({ behavior: "auto" }) : de({ behavior: "auto" });
		return e ? (Kw(a), !0) : !1;
	}, [
		t,
		ce,
		le,
		de
	]), ge = _.useCallback(() => {
		let e = u.current;
		if (!e) return;
		let t = Cw(e, k.current), n = p.current, r = f.current;
		p.current = t.length, f.current = t[0] ?? null, (() => {
			if (oe()) return;
			if (n === 0) {
				if (he() || t.length > 0 && s.current && le({ behavior: "auto" })) return;
				L(), ae();
				return;
			}
			let e = r ? t.indexOf(r) : -1;
			if (x.current && e > 0) {
				fe();
				return;
			}
			if (t.length > n) {
				let e = ww(t, n);
				if (e) {
					if (s.current && g.current === "following-bottom" && Ew(t, n)) {
						le({ behavior: "auto" });
						return;
					}
					ce(e, { align: "start" }, { keepPreviousPeek: !0 }), ee.current.add(e);
					return;
				}
			}
			if (t.length === n) {
				let e = Tw(t, ee.current);
				if (e) {
					ce(e, { align: "start" }, { keepPreviousPeek: !0 }), ee.current.add(e);
					return;
				}
			}
			g.current === "following-bottom" && s.current ? le({ behavior: "auto" }) : (L(), ae());
		})(), pe();
	}, [
		he,
		pe,
		L,
		oe,
		fe,
		ae,
		ce,
		le
	]), _e = _.useCallback(() => {
		if (g.current === "following-bottom" && s.current) {
			le({ behavior: "auto" });
			return;
		}
		let e = O.current;
		if (se()) {
			s.current && e > 0 && O.current === 0 && le({ behavior: "auto" });
			return;
		}
		ie(), ae();
	}, [
		se,
		ie,
		ae,
		le
	]), ve = _.useCallback(() => {
		let e = M.current;
		if (e && F.hasListeners()) {
			if (typeof IntersectionObserver > "u") {
				ae();
				return;
			}
			P.current ||= new IntersectionObserver((e) => {
				for (let t of e) {
					let e = t.target.dataset.messageId;
					e && (t.isIntersecting ? I.current.add(e) : I.current.delete(e));
				}
				ae();
			}, {
				root: e,
				rootMargin: `${-(T.current + E.current)}px 0px 0px 0px`,
				threshold: [
					0,
					.01,
					.5,
					1
				]
			}), h.current.forEach((e) => {
				P.current?.observe(e);
			}), ae();
		}
	}, [ae, F]), ye = _.useCallback(() => {
		N.current !== null && (window.cancelAnimationFrame(N.current), N.current = null), P.current?.disconnect(), P.current = null, I.current.clear(), F.setSnapshot(bw);
	}, [F]), be = _.useCallback((e, t, n) => {
		if (t) {
			h.current.set(e, t), P.current?.observe(t), ae(), y.current?.messageId === e && me();
			return;
		}
		n && h.current.get(e) === n && (h.current.delete(e), I.current.delete(e), P.current?.unobserve(n), ae());
	}, [me, ae]), xe = _.useCallback(() => {
		(g.current === "following-bottom" || g.current === "anchored-to-message" || g.current === "settling-jump") && (o.current = null, g.current = "free-scrolling");
	}, []), Se = _.useCallback(() => ne(j.getSnapshot()), [j, ne]), Ce = Jw(C, Se), we = Jw(M, Se), Te = _.useCallback((e) => {
		u.current = e;
	}, []), Ee = _.useCallback((e) => {
		k.current = e, D.current = Lw(e?.parentElement ?? null);
	}, []), De = _.useCallback(() => {
		L(), ae(), pe();
	}, [
		pe,
		L,
		ae
	]), Oe = _.useMemo(() => ({
		handleContentChange: ge,
		handleResize: _e,
		observeVisibility: ve,
		pendingDefaultScrollStore: S,
		preserveScrollOnPrependRef: x,
		scrollToEnd: le,
		scrollToMessage: ue,
		scrollToStart: de,
		setContentElement: Te,
		setRootElement: Ce,
		setSpacerElement: Ee,
		setViewportElement: we,
		stateStore: j,
		syncAfterScroll: De,
		unobserveVisibility: ye,
		userScrollIntent: xe,
		viewportRef: M,
		visibilityStore: F
	}), [
		ge,
		_e,
		ve,
		S,
		le,
		ue,
		de,
		Te,
		Ce,
		Ee,
		we,
		j,
		De,
		ye,
		xe,
		F
	]);
	return _.useLayoutEffect(() => {
		he() || p.current === 0 && Gw(a);
	}, [he]), _.useEffect(() => () => {
		A.current !== null && (window.cancelAnimationFrame(A.current), A.current = null), N.current !== null && (window.cancelAnimationFrame(N.current), N.current = null), l.current !== null && (window.clearTimeout(l.current), l.current = null), v.current !== null && (window.cancelAnimationFrame(v.current), v.current = null), P.current?.disconnect(), P.current = null;
	}, []), _.useLayoutEffect(() => {
		if (e && g.current === "following-bottom" && p.current > 0) {
			le({ behavior: "auto" });
			return;
		}
		L();
	}, [
		e,
		L,
		le
	]), {
		context: Oe,
		registerMessage: be
	};
}
function Xw(e) {
	let t = _.useRef(e);
	return t.current = e, t;
}
var Zw = _.createContext(null), Qw = _.createContext(null);
function $w() {
	let e = _.useContext(Zw);
	if (!e) throw Error("useMessageScroller must be used within a MessageScroller.");
	return e;
}
function eT() {
	let e = _.useContext(Qw);
	if (!e) throw Error("MessageScrollerItem must be used within a MessageScroller.");
	return e;
}
function tT() {
	let { scrollToEnd: e, scrollToMessage: t, scrollToStart: n } = $w();
	return _.useMemo(() => ({
		scrollToEnd: e,
		scrollToMessage: t,
		scrollToStart: n
	}), [
		e,
		t,
		n
	]);
}
function nT() {
	let { stateStore: e } = $w();
	return _.useSyncExternalStore(e.subscribe, e.getSnapshot, e.getSnapshot);
}
function rT() {
	let { observeVisibility: e, unobserveVisibility: t, visibilityStore: n } = $w(), r = _.useCallback((r) => n.subscribe(r, e, t), [
		e,
		t,
		n
	]);
	return _.useSyncExternalStore(r, n.getSnapshot, n.getSnapshot);
}
function iT({ autoScroll: e = !1, children: t, defaultScrollPosition: n = "end", scrollEdgeThreshold: r, scrollPreviousItemPeek: i, scrollMargin: a }) {
	let { context: o, registerMessage: s } = Yw({
		autoScroll: e,
		defaultScrollPosition: n,
		scrollEdgeThreshold: r,
		scrollPreviousItemPeek: i,
		scrollMargin: a
	});
	return (0, R.jsx)(Zw.Provider, {
		value: o,
		children: (0, R.jsx)(Qw.Provider, {
			value: s,
			children: t
		})
	});
}
function aT() {
	let { pendingDefaultScrollStore: e } = $w();
	return _.useSyncExternalStore(e.subscribe, e.getSnapshot, e.getSnapshot);
}
function oT({ children: e, ...t }) {
	let { setRootElement: n } = $w(), r = aT();
	return (0, R.jsx)("div", {
		ref: n,
		...t,
		...r ? { "data-pending-scroll": "" } : null,
		children: e
	});
}
function sT({ "aria-label": e, children: t, onKeyDown: n, onScroll: r, onTouchMove: i, onWheel: a, preserveScrollOnPrepend: o = !0, ref: s, role: c, tabIndex: l, ...u }) {
	let { handleResize: d, preserveScrollOnPrependRef: f, setViewportElement: p, syncAfterScroll: m, userScrollIntent: h, viewportRef: g } = $w(), v = aT();
	f.current = o;
	let y = _.useCallback((e) => {
		p(e), fw(s)?.(e);
	}, [s, p]);
	function b(e) {
		m(), r?.(e);
	}
	function x(e) {
		h(), a?.(e);
	}
	function S(e) {
		h(), i?.(e);
	}
	function C(e) {
		vw.has(e.key) && h(), n?.(e);
	}
	return _.useEffect(() => {
		let e = g.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = 0, n = new ResizeObserver(() => {
			window.cancelAnimationFrame(t), t = window.requestAnimationFrame(d);
		});
		return n.observe(e), () => {
			window.cancelAnimationFrame(t), n.disconnect();
		};
	}, [d, g]), (0, R.jsx)("div", {
		ref: y,
		role: c ?? "region",
		"aria-label": e ?? "Messages",
		tabIndex: l ?? 0,
		onKeyDown: C,
		onScroll: b,
		onTouchMove: S,
		onWheel: x,
		...u,
		...v ? { "data-pending-scroll": "" } : null,
		children: t
	});
}
function cT({ "aria-relevant": e, children: t, ref: n, role: r, spacerClassName: i, ...a }) {
	let { handleContentChange: o, handleResize: s, setContentElement: c, setSpacerElement: l } = $w(), u = _.useRef(null), d = _.useCallback((e) => {
		u.current = e, c(e), fw(n)?.(e);
	}, [n, c]);
	return _.useLayoutEffect(() => {
		let e = u.current;
		if (!e || (o(), typeof MutationObserver > "u")) return;
		let t = new MutationObserver(() => {
			o();
		});
		return t.observe(e, { childList: !0 }), () => t.disconnect();
	}, [o]), _.useEffect(() => {
		let e = u.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = 0, n = new ResizeObserver(() => {
			window.cancelAnimationFrame(t), t = window.requestAnimationFrame(s);
		});
		return n.observe(e), () => {
			window.cancelAnimationFrame(t), n.disconnect();
		};
	}, [s]), (0, R.jsxs)("div", {
		ref: d,
		role: r ?? "log",
		"aria-relevant": e ?? "additions",
		...a,
		children: [t, (0, R.jsx)("div", {
			ref: l,
			"aria-hidden": "true",
			"data-message-scroller-spacer": "",
			hidden: !0,
			className: i
		})]
	});
}
function lT({ messageId: e, ref: t, scrollAnchor: n = !1, ...r }) {
	let i = eT(), a = _.useRef(null), o = _.useCallback((n) => {
		let r = a.current;
		a.current = n, e && i(e, n, r), fw(t)?.(n);
	}, [
		e,
		t,
		i
	]);
	return (0, R.jsx)("div", {
		ref: o,
		"data-message-id": e,
		"data-scroll-anchor": n ? "true" : "false",
		...r
	});
}
function uT({ behavior: e = "smooth", children: t, direction: n = "end", onClick: r, render: i, tabIndex: a, type: o = "button", ...s }) {
	let { scrollToEnd: c, scrollToStart: l, stateStore: u } = $w(), d = Xw(r), f = _.useCallback((e) => u.subscribe(e), [u]), p = _.useCallback(() => {
		let e = u.getSnapshot();
		return n === "start" ? e.start : e.end;
	}, [n, u]), m = _.useSyncExternalStore(f, p, p), h = _.useCallback((t) => {
		m && (d.current?.(t), t.defaultPrevented || (t.currentTarget.blur(), n === "start" ? l({ behavior: e }) : c({ behavior: e })));
	}, [
		e,
		n,
		m,
		d,
		c,
		l
	]);
	return sw({
		defaultTagName: "button",
		props: cw({
			type: o,
			inert: !m,
			tabIndex: m ? a : -1,
			children: t ?? (0, R.jsxs)("span", { children: ["Scroll to ", n] }),
			onClick: h
		}, s),
		render: i,
		state: {
			active: m,
			direction: n
		},
		stateAttributesMapping: { active: (e) => ({ "data-active": e ? "true" : "false" }) }
	});
}
var dT = {
	Provider: iT,
	Root: oT,
	Viewport: sT,
	Content: cT,
	Item: lT,
	Button: uT
};
//#endregion
//#region Build/Frontend/src/components/ui/message-scroller.tsx
function fT(e) {
	return /* @__PURE__ */ (0, R.jsx)(dT.Provider, { ...e });
}
function pT({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(dT.Root, {
		"data-slot": "message-scroller",
		className: H("group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden", e),
		...t
	});
}
function mT({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(dT.Viewport, {
		"data-slot": "message-scroller-viewport",
		className: H("size-full min-h-0 min-w-0 scroll-fade-b scrollbar-thin scrollbar-gutter-stable overflow-y-auto overscroll-contain contain-content data-autoscrolling:scrollbar-none data-pending-scroll:invisible", e),
		...t
	});
}
function hT({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(dT.Content, {
		"data-slot": "message-scroller-content",
		className: H("flex h-max min-h-full flex-col gap-8", e),
		...t
	});
}
function gT({ className: e, scrollAnchor: t = !1, ...n }) {
	return /* @__PURE__ */ (0, R.jsx)(dT.Item, {
		"data-slot": "message-scroller-item",
		scrollAnchor: t,
		className: H("min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]", e),
		...n
	});
}
function _T({ direction: e = "end", className: t, children: n, render: r, variant: i = "secondary", size: a = "icon-sm", ...o }) {
	return /* @__PURE__ */ (0, R.jsx)(dT.Button, {
		"data-slot": "message-scroller-button",
		"data-direction": e,
		"data-variant": i,
		"data-size": a,
		direction: e,
		className: H("absolute inset-s-1/2 -translate-x-1/2 border-border bg-background text-foreground transition-[translate,scale,opacity] duration-200 hover:bg-muted hover:text-foreground data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180", t),
		render: r ?? /* @__PURE__ */ (0, R.jsx)(zy, {
			variant: i,
			size: a
		}),
		...o,
		children: n ?? /* @__PURE__ */ (0, R.jsxs)(R.Fragment, { children: [/* @__PURE__ */ (0, R.jsx)(k, {}), /* @__PURE__ */ (0, R.jsx)("span", {
			className: "sr-only",
			children: e === "end" ? "Scroll to end" : "Scroll to start"
		})] })
	});
}
//#endregion
//#region Build/Frontend/src/components/ai/conversation.tsx
function vT({ className: e, label: t = "Chat transcript", children: n, ...r }) {
	return /* @__PURE__ */ (0, R.jsx)(fT, {
		autoScroll: !0,
		defaultScrollPosition: "end",
		children: /* @__PURE__ */ (0, R.jsxs)(pT, {
			className: H("relative min-h-0 flex-1", e),
			...r,
			children: [/* @__PURE__ */ (0, R.jsx)(mT, {
				"aria-label": t,
				role: "log",
				className: "px-3 py-3",
				children: n
			}), /* @__PURE__ */ (0, R.jsx)(_T, { direction: "end" })]
		})
	});
}
function yT({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(hT, {
		className: H("gap-4", e),
		...t
	});
}
function bT({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(gT, {
		className: H("sui-enter", e),
		...t
	});
}
function xT({ className: e, title: t = "Nothing here yet", description: n, icon: r, children: i, ...a }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		className: H("flex flex-col items-center justify-center gap-2 px-6 py-10 text-center", e),
		...a,
		children: i ?? /* @__PURE__ */ (0, R.jsxs)(R.Fragment, { children: [
			r ? /* @__PURE__ */ (0, R.jsx)("div", {
				className: "text-muted-foreground",
				children: r
			}) : null,
			/* @__PURE__ */ (0, R.jsx)("p", {
				className: "font-medium text-foreground",
				children: t
			}),
			n ? /* @__PURE__ */ (0, R.jsx)("p", {
				className: "max-w-sm text-muted-foreground",
				children: n
			}) : null
		] })
	});
}
//#endregion
//#region node_modules/comma-separated-tokens/index.js
function ST(e, t) {
	let n = t || {};
	return (e[e.length - 1] === "" ? [...e, ""] : e).join((n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")).trim();
}
//#endregion
//#region node_modules/estree-util-is-identifier-name/lib/index.js
var CT = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, wT = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, TT = {};
function ET(e, t) {
	return ((t || TT).jsx ? wT : CT).test(e);
}
//#endregion
//#region node_modules/hast-util-whitespace/lib/index.js
var DT = /[ \t\n\f\r]/g;
function OT(e) {
	return typeof e == "object" ? e.type === "text" && kT(e.value) : kT(e);
}
function kT(e) {
	return e.replace(DT, "") === "";
}
//#endregion
//#region node_modules/property-information/lib/util/schema.js
var AT = class {
	constructor(e, t, n) {
		this.normal = t, this.property = e, n && (this.space = n);
	}
};
AT.prototype.normal = {}, AT.prototype.property = {}, AT.prototype.space = void 0;
//#endregion
//#region node_modules/property-information/lib/util/merge.js
function jT(e, t) {
	let n = {}, r = {};
	for (let t of e) Object.assign(n, t.property), Object.assign(r, t.normal);
	return new AT(n, r, t);
}
//#endregion
//#region node_modules/property-information/lib/normalize.js
function MT(e) {
	return e.toLowerCase();
}
//#endregion
//#region node_modules/property-information/lib/util/info.js
var NT = class {
	constructor(e, t) {
		this.attribute = t, this.property = e;
	}
};
NT.prototype.attribute = "", NT.prototype.booleanish = !1, NT.prototype.boolean = !1, NT.prototype.commaOrSpaceSeparated = !1, NT.prototype.commaSeparated = !1, NT.prototype.defined = !1, NT.prototype.mustUseProperty = !1, NT.prototype.number = !1, NT.prototype.overloadedBoolean = !1, NT.prototype.property = "", NT.prototype.spaceSeparated = !1, NT.prototype.space = void 0;
//#endregion
//#region node_modules/property-information/lib/util/types.js
var PT = /* @__PURE__ */ t({
	boolean: () => Y,
	booleanish: () => IT,
	commaOrSpaceSeparated: () => BT,
	commaSeparated: () => zT,
	number: () => X,
	overloadedBoolean: () => LT,
	spaceSeparated: () => RT
}), FT = 0, Y = VT(), IT = VT(), LT = VT(), X = VT(), RT = VT(), zT = VT(), BT = VT();
function VT() {
	return 2 ** ++FT;
}
//#endregion
//#region node_modules/property-information/lib/util/defined-info.js
var HT = Object.keys(PT), UT = class extends NT {
	constructor(e, t, n, r) {
		let i = -1;
		if (super(e, t), WT(this, "space", r), typeof n == "number") for (; ++i < HT.length;) {
			let e = HT[i];
			WT(this, HT[i], (n & PT[e]) === PT[e]);
		}
	}
};
UT.prototype.defined = !0;
function WT(e, t, n) {
	n && (e[t] = n);
}
//#endregion
//#region node_modules/property-information/lib/util/create.js
function GT(e) {
	let t = {}, n = {};
	for (let [r, i] of Object.entries(e.properties)) {
		let a = new UT(r, e.transform(e.attributes || {}, r), i, e.space);
		e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[MT(r)] = r, n[MT(a.attribute)] = r;
	}
	return new AT(t, n, e.space);
}
//#endregion
//#region node_modules/property-information/lib/aria.js
var KT = GT({
	properties: {
		ariaActiveDescendant: null,
		ariaAtomic: IT,
		ariaAutoComplete: null,
		ariaBusy: IT,
		ariaChecked: IT,
		ariaColCount: X,
		ariaColIndex: X,
		ariaColSpan: X,
		ariaControls: RT,
		ariaCurrent: null,
		ariaDescribedBy: RT,
		ariaDetails: null,
		ariaDisabled: IT,
		ariaDropEffect: RT,
		ariaErrorMessage: null,
		ariaExpanded: IT,
		ariaFlowTo: RT,
		ariaGrabbed: IT,
		ariaHasPopup: null,
		ariaHidden: IT,
		ariaInvalid: null,
		ariaKeyShortcuts: null,
		ariaLabel: null,
		ariaLabelledBy: RT,
		ariaLevel: X,
		ariaLive: null,
		ariaModal: IT,
		ariaMultiLine: IT,
		ariaMultiSelectable: IT,
		ariaOrientation: null,
		ariaOwns: RT,
		ariaPlaceholder: null,
		ariaPosInSet: X,
		ariaPressed: IT,
		ariaReadOnly: IT,
		ariaRelevant: null,
		ariaRequired: IT,
		ariaRoleDescription: RT,
		ariaRowCount: X,
		ariaRowIndex: X,
		ariaRowSpan: X,
		ariaSelected: IT,
		ariaSetSize: X,
		ariaSort: null,
		ariaValueMax: X,
		ariaValueMin: X,
		ariaValueNow: X,
		ariaValueText: null,
		role: null
	},
	transform(e, t) {
		return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
	}
});
//#endregion
//#region node_modules/property-information/lib/util/case-sensitive-transform.js
function qT(e, t) {
	return t in e ? e[t] : t;
}
//#endregion
//#region node_modules/property-information/lib/util/case-insensitive-transform.js
function JT(e, t) {
	return qT(e, t.toLowerCase());
}
//#endregion
//#region node_modules/property-information/lib/html.js
var YT = GT({
	attributes: {
		acceptcharset: "accept-charset",
		classname: "class",
		htmlfor: "for",
		httpequiv: "http-equiv"
	},
	mustUseProperty: [
		"checked",
		"multiple",
		"muted",
		"selected"
	],
	properties: {
		abbr: null,
		accept: zT,
		acceptCharset: RT,
		accessKey: RT,
		action: null,
		allow: null,
		allowFullScreen: Y,
		allowPaymentRequest: Y,
		allowUserMedia: Y,
		alpha: Y,
		alt: null,
		as: null,
		async: Y,
		autoCapitalize: null,
		autoComplete: RT,
		autoFocus: Y,
		autoPlay: Y,
		blocking: RT,
		capture: null,
		charSet: null,
		checked: Y,
		cite: null,
		className: RT,
		closedBy: null,
		colorSpace: null,
		cols: X,
		colSpan: X,
		command: null,
		commandFor: null,
		content: null,
		contentEditable: IT,
		controls: Y,
		controlsList: RT,
		coords: X | zT,
		crossOrigin: null,
		data: null,
		dateTime: null,
		decoding: null,
		default: Y,
		defer: Y,
		dir: null,
		dirName: null,
		disabled: Y,
		download: LT,
		draggable: IT,
		encType: null,
		enterKeyHint: null,
		fetchPriority: null,
		form: null,
		formAction: null,
		formEncType: null,
		formMethod: null,
		formNoValidate: Y,
		formTarget: null,
		headers: RT,
		height: X,
		hidden: LT,
		high: X,
		href: null,
		hrefLang: null,
		htmlFor: RT,
		httpEquiv: RT,
		id: null,
		imageSizes: null,
		imageSrcSet: null,
		inert: Y,
		inputMode: null,
		integrity: null,
		is: null,
		isMap: Y,
		itemId: null,
		itemProp: RT,
		itemRef: RT,
		itemScope: Y,
		itemType: RT,
		kind: null,
		label: null,
		lang: null,
		language: null,
		list: null,
		loading: null,
		loop: Y,
		low: X,
		manifest: null,
		max: null,
		maxLength: X,
		media: null,
		method: null,
		min: null,
		minLength: X,
		multiple: Y,
		muted: Y,
		name: null,
		nonce: null,
		noModule: Y,
		noValidate: Y,
		onAbort: null,
		onAfterPrint: null,
		onAuxClick: null,
		onBeforeMatch: null,
		onBeforePrint: null,
		onBeforeToggle: null,
		onBeforeUnload: null,
		onBlur: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onContextLost: null,
		onContextMenu: null,
		onContextRestored: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFormData: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLanguageChange: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadEnd: null,
		onLoadStart: null,
		onMessage: null,
		onMessageError: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRejectionHandled: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onScrollEnd: null,
		onSecurityPolicyViolation: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onSlotChange: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnhandledRejection: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onWheel: null,
		open: Y,
		optimum: X,
		pattern: null,
		ping: RT,
		placeholder: null,
		playsInline: Y,
		popover: null,
		popoverTarget: null,
		popoverTargetAction: null,
		poster: null,
		preload: null,
		readOnly: Y,
		referrerPolicy: null,
		rel: RT,
		required: Y,
		reversed: Y,
		rows: X,
		rowSpan: X,
		sandbox: RT,
		scope: null,
		scoped: Y,
		seamless: Y,
		selected: Y,
		shadowRootClonable: Y,
		shadowRootCustomElementRegistry: Y,
		shadowRootDelegatesFocus: Y,
		shadowRootMode: null,
		shadowRootSerializable: Y,
		shape: null,
		size: X,
		sizes: null,
		slot: null,
		span: X,
		spellCheck: IT,
		src: null,
		srcDoc: null,
		srcLang: null,
		srcSet: null,
		start: X,
		step: null,
		style: null,
		tabIndex: X,
		target: null,
		title: null,
		translate: null,
		type: null,
		typeMustMatch: Y,
		useMap: null,
		value: IT,
		width: X,
		wrap: null,
		writingSuggestions: null,
		align: null,
		aLink: null,
		archive: RT,
		axis: null,
		background: null,
		bgColor: null,
		border: X,
		borderColor: null,
		bottomMargin: X,
		cellPadding: null,
		cellSpacing: null,
		char: null,
		charOff: null,
		classId: null,
		clear: null,
		code: null,
		codeBase: null,
		codeType: null,
		color: null,
		compact: Y,
		declare: Y,
		event: null,
		face: null,
		frame: null,
		frameBorder: null,
		hSpace: X,
		leftMargin: X,
		link: null,
		longDesc: null,
		lowSrc: null,
		marginHeight: X,
		marginWidth: X,
		noResize: Y,
		noHref: Y,
		noShade: Y,
		noWrap: Y,
		object: null,
		profile: null,
		prompt: null,
		rev: null,
		rightMargin: X,
		rules: null,
		scheme: null,
		scrolling: IT,
		standby: null,
		summary: null,
		text: null,
		topMargin: X,
		valueType: null,
		version: null,
		vAlign: null,
		vLink: null,
		vSpace: X,
		allowTransparency: null,
		autoCorrect: null,
		autoSave: null,
		credentialless: Y,
		disablePictureInPicture: Y,
		disableRemotePlayback: Y,
		exportParts: zT,
		part: RT,
		prefix: null,
		property: null,
		results: X,
		security: null,
		unselectable: null
	},
	space: "html",
	transform: JT
}), XT = GT({
	attributes: {
		accentHeight: "accent-height",
		alignmentBaseline: "alignment-baseline",
		arabicForm: "arabic-form",
		baselineShift: "baseline-shift",
		capHeight: "cap-height",
		className: "class",
		clipPath: "clip-path",
		clipRule: "clip-rule",
		colorInterpolation: "color-interpolation",
		colorInterpolationFilters: "color-interpolation-filters",
		colorProfile: "color-profile",
		colorRendering: "color-rendering",
		crossOrigin: "crossorigin",
		dataType: "datatype",
		dominantBaseline: "dominant-baseline",
		enableBackground: "enable-background",
		fillOpacity: "fill-opacity",
		fillRule: "fill-rule",
		floodColor: "flood-color",
		floodOpacity: "flood-opacity",
		fontFamily: "font-family",
		fontSize: "font-size",
		fontSizeAdjust: "font-size-adjust",
		fontStretch: "font-stretch",
		fontStyle: "font-style",
		fontVariant: "font-variant",
		fontWeight: "font-weight",
		glyphName: "glyph-name",
		glyphOrientationHorizontal: "glyph-orientation-horizontal",
		glyphOrientationVertical: "glyph-orientation-vertical",
		hrefLang: "hreflang",
		horizAdvX: "horiz-adv-x",
		horizOriginX: "horiz-origin-x",
		horizOriginY: "horiz-origin-y",
		imageRendering: "image-rendering",
		letterSpacing: "letter-spacing",
		lightingColor: "lighting-color",
		markerEnd: "marker-end",
		markerMid: "marker-mid",
		markerStart: "marker-start",
		maskType: "mask-type",
		navDown: "nav-down",
		navDownLeft: "nav-down-left",
		navDownRight: "nav-down-right",
		navLeft: "nav-left",
		navNext: "nav-next",
		navPrev: "nav-prev",
		navRight: "nav-right",
		navUp: "nav-up",
		navUpLeft: "nav-up-left",
		navUpRight: "nav-up-right",
		onAbort: "onabort",
		onActivate: "onactivate",
		onAfterPrint: "onafterprint",
		onBeforePrint: "onbeforeprint",
		onBegin: "onbegin",
		onCancel: "oncancel",
		onCanPlay: "oncanplay",
		onCanPlayThrough: "oncanplaythrough",
		onChange: "onchange",
		onClick: "onclick",
		onClose: "onclose",
		onCopy: "oncopy",
		onCueChange: "oncuechange",
		onCut: "oncut",
		onDblClick: "ondblclick",
		onDrag: "ondrag",
		onDragEnd: "ondragend",
		onDragEnter: "ondragenter",
		onDragExit: "ondragexit",
		onDragLeave: "ondragleave",
		onDragOver: "ondragover",
		onDragStart: "ondragstart",
		onDrop: "ondrop",
		onDurationChange: "ondurationchange",
		onEmptied: "onemptied",
		onEnd: "onend",
		onEnded: "onended",
		onError: "onerror",
		onFocus: "onfocus",
		onFocusIn: "onfocusin",
		onFocusOut: "onfocusout",
		onHashChange: "onhashchange",
		onInput: "oninput",
		onInvalid: "oninvalid",
		onKeyDown: "onkeydown",
		onKeyPress: "onkeypress",
		onKeyUp: "onkeyup",
		onLoad: "onload",
		onLoadedData: "onloadeddata",
		onLoadedMetadata: "onloadedmetadata",
		onLoadStart: "onloadstart",
		onMessage: "onmessage",
		onMouseDown: "onmousedown",
		onMouseEnter: "onmouseenter",
		onMouseLeave: "onmouseleave",
		onMouseMove: "onmousemove",
		onMouseOut: "onmouseout",
		onMouseOver: "onmouseover",
		onMouseUp: "onmouseup",
		onMouseWheel: "onmousewheel",
		onOffline: "onoffline",
		onOnline: "ononline",
		onPageHide: "onpagehide",
		onPageShow: "onpageshow",
		onPaste: "onpaste",
		onPause: "onpause",
		onPlay: "onplay",
		onPlaying: "onplaying",
		onPopState: "onpopstate",
		onProgress: "onprogress",
		onRateChange: "onratechange",
		onRepeat: "onrepeat",
		onReset: "onreset",
		onResize: "onresize",
		onScroll: "onscroll",
		onSeeked: "onseeked",
		onSeeking: "onseeking",
		onSelect: "onselect",
		onShow: "onshow",
		onStalled: "onstalled",
		onStorage: "onstorage",
		onSubmit: "onsubmit",
		onSuspend: "onsuspend",
		onTimeUpdate: "ontimeupdate",
		onToggle: "ontoggle",
		onUnload: "onunload",
		onVolumeChange: "onvolumechange",
		onWaiting: "onwaiting",
		onZoom: "onzoom",
		overlinePosition: "overline-position",
		overlineThickness: "overline-thickness",
		paintOrder: "paint-order",
		panose1: "panose-1",
		pointerEvents: "pointer-events",
		referrerPolicy: "referrerpolicy",
		renderingIntent: "rendering-intent",
		shapeRendering: "shape-rendering",
		stopColor: "stop-color",
		stopOpacity: "stop-opacity",
		strikethroughPosition: "strikethrough-position",
		strikethroughThickness: "strikethrough-thickness",
		strokeDashArray: "stroke-dasharray",
		strokeDashOffset: "stroke-dashoffset",
		strokeLineCap: "stroke-linecap",
		strokeLineJoin: "stroke-linejoin",
		strokeMiterLimit: "stroke-miterlimit",
		strokeOpacity: "stroke-opacity",
		strokeWidth: "stroke-width",
		tabIndex: "tabindex",
		textAnchor: "text-anchor",
		textDecoration: "text-decoration",
		textRendering: "text-rendering",
		transformOrigin: "transform-origin",
		typeOf: "typeof",
		underlinePosition: "underline-position",
		underlineThickness: "underline-thickness",
		unicodeBidi: "unicode-bidi",
		unicodeRange: "unicode-range",
		unitsPerEm: "units-per-em",
		vAlphabetic: "v-alphabetic",
		vHanging: "v-hanging",
		vIdeographic: "v-ideographic",
		vMathematical: "v-mathematical",
		vectorEffect: "vector-effect",
		vertAdvY: "vert-adv-y",
		vertOriginX: "vert-origin-x",
		vertOriginY: "vert-origin-y",
		wordSpacing: "word-spacing",
		writingMode: "writing-mode",
		xHeight: "x-height",
		playbackOrder: "playbackorder",
		timelineBegin: "timelinebegin"
	},
	properties: {
		about: BT,
		accentHeight: X,
		accumulate: null,
		additive: null,
		alignmentBaseline: null,
		alphabetic: X,
		amplitude: X,
		arabicForm: null,
		ascent: X,
		attributeName: null,
		attributeType: null,
		azimuth: X,
		bandwidth: null,
		baselineShift: null,
		baseFrequency: null,
		baseProfile: null,
		bbox: null,
		begin: null,
		bias: X,
		by: null,
		calcMode: null,
		capHeight: X,
		className: RT,
		clip: null,
		clipPath: null,
		clipPathUnits: null,
		clipRule: null,
		color: null,
		colorInterpolation: null,
		colorInterpolationFilters: null,
		colorProfile: null,
		colorRendering: null,
		content: null,
		contentScriptType: null,
		contentStyleType: null,
		crossOrigin: null,
		cursor: null,
		cx: null,
		cy: null,
		d: null,
		dataType: null,
		defaultAction: null,
		descent: X,
		diffuseConstant: X,
		direction: null,
		display: null,
		dur: null,
		divisor: X,
		dominantBaseline: null,
		download: Y,
		dx: null,
		dy: null,
		edgeMode: null,
		editable: null,
		elevation: X,
		enableBackground: null,
		end: null,
		event: null,
		exponent: X,
		externalResourcesRequired: null,
		fill: null,
		fillOpacity: X,
		fillRule: null,
		filter: null,
		filterRes: null,
		filterUnits: null,
		floodColor: null,
		floodOpacity: null,
		focusable: null,
		focusHighlight: null,
		fontFamily: null,
		fontSize: null,
		fontSizeAdjust: null,
		fontStretch: null,
		fontStyle: null,
		fontVariant: null,
		fontWeight: null,
		format: null,
		fr: null,
		from: null,
		fx: null,
		fy: null,
		g1: zT,
		g2: zT,
		glyphName: zT,
		glyphOrientationHorizontal: null,
		glyphOrientationVertical: null,
		glyphRef: null,
		gradientTransform: null,
		gradientUnits: null,
		handler: null,
		hanging: X,
		hatchContentUnits: null,
		hatchUnits: null,
		height: null,
		href: null,
		hrefLang: null,
		horizAdvX: X,
		horizOriginX: X,
		horizOriginY: X,
		id: null,
		ideographic: X,
		imageRendering: null,
		initialVisibility: null,
		in: null,
		in2: null,
		intercept: X,
		k: X,
		k1: X,
		k2: X,
		k3: X,
		k4: X,
		kernelMatrix: BT,
		kernelUnitLength: null,
		keyPoints: null,
		keySplines: null,
		keyTimes: null,
		kerning: null,
		lang: null,
		lengthAdjust: null,
		letterSpacing: null,
		lightingColor: null,
		limitingConeAngle: X,
		local: null,
		markerEnd: null,
		markerMid: null,
		markerStart: null,
		markerHeight: null,
		markerUnits: null,
		markerWidth: null,
		mask: null,
		maskContentUnits: null,
		maskType: null,
		maskUnits: null,
		mathematical: null,
		max: null,
		media: null,
		mediaCharacterEncoding: null,
		mediaContentEncodings: null,
		mediaSize: X,
		mediaTime: null,
		method: null,
		min: null,
		mode: null,
		name: null,
		navDown: null,
		navDownLeft: null,
		navDownRight: null,
		navLeft: null,
		navNext: null,
		navPrev: null,
		navRight: null,
		navUp: null,
		navUpLeft: null,
		navUpRight: null,
		numOctaves: null,
		observer: null,
		offset: null,
		onAbort: null,
		onActivate: null,
		onAfterPrint: null,
		onBeforePrint: null,
		onBegin: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnd: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFocusIn: null,
		onFocusOut: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadStart: null,
		onMessage: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onMouseWheel: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRepeat: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onShow: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onZoom: null,
		opacity: null,
		operator: null,
		order: null,
		orient: null,
		orientation: null,
		origin: null,
		overflow: null,
		overlay: null,
		overlinePosition: X,
		overlineThickness: X,
		paintOrder: null,
		panose1: null,
		path: null,
		pathLength: X,
		patternContentUnits: null,
		patternTransform: null,
		patternUnits: null,
		phase: null,
		ping: RT,
		pitch: null,
		playbackOrder: null,
		pointerEvents: null,
		points: null,
		pointsAtX: X,
		pointsAtY: X,
		pointsAtZ: X,
		preserveAlpha: null,
		preserveAspectRatio: null,
		primitiveUnits: null,
		propagate: null,
		property: BT,
		r: null,
		radius: null,
		referrerPolicy: null,
		refX: null,
		refY: null,
		rel: BT,
		rev: BT,
		renderingIntent: null,
		repeatCount: null,
		repeatDur: null,
		requiredExtensions: BT,
		requiredFeatures: BT,
		requiredFonts: BT,
		requiredFormats: BT,
		resource: null,
		restart: null,
		result: null,
		rotate: null,
		rx: null,
		ry: null,
		scale: null,
		seed: null,
		shapeRendering: null,
		side: null,
		slope: null,
		snapshotTime: null,
		specularConstant: X,
		specularExponent: X,
		spreadMethod: null,
		spacing: null,
		startOffset: null,
		stdDeviation: null,
		stemh: null,
		stemv: null,
		stitchTiles: null,
		stopColor: null,
		stopOpacity: null,
		strikethroughPosition: X,
		strikethroughThickness: X,
		string: null,
		stroke: null,
		strokeDashArray: BT,
		strokeDashOffset: null,
		strokeLineCap: null,
		strokeLineJoin: null,
		strokeMiterLimit: X,
		strokeOpacity: X,
		strokeWidth: null,
		style: null,
		surfaceScale: X,
		syncBehavior: null,
		syncBehaviorDefault: null,
		syncMaster: null,
		syncTolerance: null,
		syncToleranceDefault: null,
		systemLanguage: BT,
		tabIndex: X,
		tableValues: null,
		target: null,
		targetX: X,
		targetY: X,
		textAnchor: null,
		textDecoration: null,
		textRendering: null,
		textLength: null,
		timelineBegin: null,
		title: null,
		transformBehavior: null,
		type: null,
		typeOf: BT,
		to: null,
		transform: null,
		transformOrigin: null,
		u1: null,
		u2: null,
		underlinePosition: X,
		underlineThickness: X,
		unicode: null,
		unicodeBidi: null,
		unicodeRange: null,
		unitsPerEm: X,
		values: null,
		vAlphabetic: X,
		vMathematical: X,
		vectorEffect: null,
		vHanging: X,
		vIdeographic: X,
		version: null,
		vertAdvY: X,
		vertOriginX: X,
		vertOriginY: X,
		viewBox: null,
		viewTarget: null,
		visibility: null,
		width: null,
		widths: null,
		wordSpacing: null,
		writingMode: null,
		x: null,
		x1: null,
		x2: null,
		xChannelSelector: null,
		xHeight: X,
		y: null,
		y1: null,
		y2: null,
		yChannelSelector: null,
		z: null,
		zoomAndPan: null
	},
	space: "svg",
	transform: qT
}), ZT = GT({
	properties: {
		xLinkActuate: null,
		xLinkArcRole: null,
		xLinkHref: null,
		xLinkRole: null,
		xLinkShow: null,
		xLinkTitle: null,
		xLinkType: null
	},
	space: "xlink",
	transform(e, t) {
		return "xlink:" + t.slice(5).toLowerCase();
	}
}), QT = GT({
	attributes: { xmlnsxlink: "xmlns:xlink" },
	properties: {
		xmlnsXLink: null,
		xmlns: null
	},
	space: "xmlns",
	transform: JT
}), $T = GT({
	properties: {
		xmlBase: null,
		xmlLang: null,
		xmlSpace: null
	},
	space: "xml",
	transform(e, t) {
		return "xml:" + t.slice(3).toLowerCase();
	}
}), eE = {
	classId: "classID",
	dataType: "datatype",
	itemId: "itemID",
	strokeDashArray: "strokeDasharray",
	strokeDashOffset: "strokeDashoffset",
	strokeLineCap: "strokeLinecap",
	strokeLineJoin: "strokeLinejoin",
	strokeMiterLimit: "strokeMiterlimit",
	typeOf: "typeof",
	xLinkActuate: "xlinkActuate",
	xLinkArcRole: "xlinkArcrole",
	xLinkHref: "xlinkHref",
	xLinkRole: "xlinkRole",
	xLinkShow: "xlinkShow",
	xLinkTitle: "xlinkTitle",
	xLinkType: "xlinkType",
	xmlnsXLink: "xmlnsXlink"
}, tE = /[A-Z]/g, nE = /-[a-z]/g, rE = /^data[-\w.:]+$/i;
function iE(e, t) {
	let n = MT(t), r = t, i = NT;
	if (n in e.normal) return e.property[e.normal[n]];
	if (n.length > 4 && n.slice(0, 4) === "data" && rE.test(t)) {
		if (t.charAt(4) === "-") {
			let e = t.slice(5).replace(nE, oE);
			r = "data" + e.charAt(0).toUpperCase() + e.slice(1);
		} else {
			let e = t.slice(4);
			if (!nE.test(e)) {
				let n = e.replace(tE, aE);
				n.charAt(0) !== "-" && (n = "-" + n), t = "data" + n;
			}
		}
		i = UT;
	}
	return new i(r, t);
}
function aE(e) {
	return "-" + e.toLowerCase();
}
function oE(e) {
	return e.charAt(1).toUpperCase();
}
//#endregion
//#region node_modules/property-information/index.js
var sE = jT([
	KT,
	YT,
	ZT,
	QT,
	$T
], "html"), cE = jT([
	KT,
	XT,
	ZT,
	QT,
	$T
], "svg");
//#endregion
//#region node_modules/space-separated-tokens/index.js
function lE(e) {
	let t = String(e || "").trim();
	return t ? t.split(/[ \t\n\r\f]+/g) : [];
}
function uE(e) {
	return e.join(" ").trim();
}
//#endregion
//#region node_modules/inline-style-parser/cjs/index.js
var dE = /* @__PURE__ */ n(((e, t) => {
	var n = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, r = /\n/g, i = /^\s*/, a = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, o = /^:\s*/, s = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, c = /^[;\s]*/, l = /^\s+|\s+$/g;
	function u(e, t) {
		if (typeof e != "string") throw TypeError("First argument must be a string");
		if (!e) return [];
		t ||= {};
		var l = 1, u = 1;
		function f(e) {
			var t = e.match(r);
			t && (l += t.length);
			var n = e.lastIndexOf("\n");
			u = ~n ? e.length - n : u + e.length;
		}
		function p() {
			var e = {
				line: l,
				column: u
			};
			return function(t) {
				return t.position = new m(e), _(), t;
			};
		}
		function m(e) {
			this.start = e, this.end = {
				line: l,
				column: u
			}, this.source = t.source;
		}
		m.prototype.content = e;
		function h(n) {
			var r = /* @__PURE__ */ Error(t.source + ":" + l + ":" + u + ": " + n);
			if (r.reason = n, r.filename = t.source, r.line = l, r.column = u, r.source = e, !t.silent) throw r;
		}
		function g(t) {
			var n = t.exec(e);
			if (n) {
				var r = n[0];
				return f(r), e = e.slice(r.length), n;
			}
		}
		function _() {
			g(i);
		}
		function v(e) {
			var t;
			for (e ||= []; t = y();) t !== !1 && e.push(t);
			return e;
		}
		function y() {
			var t = p();
			if (e.charAt(0) == "/" && e.charAt(1) == "*") {
				for (var n = 2; e.charAt(n) != "" && (e.charAt(n) != "*" || e.charAt(n + 1) != "/");) ++n;
				if (n += 2, e.charAt(n - 1) === "") return h("End of comment missing");
				var r = e.slice(2, n - 2);
				return u += 2, f(r), e = e.slice(n), u += 2, t({
					type: "comment",
					comment: r
				});
			}
		}
		function b() {
			var e = p(), t = g(a);
			if (t) {
				if (y(), !g(o)) return h("property missing ':'");
				var r = g(s), i = e({
					type: "declaration",
					property: d(t[0].replace(n, "")),
					value: r ? d(r[0].replace(n, "")) : ""
				});
				return g(c), i;
			}
		}
		function x() {
			var e = [];
			v(e);
			for (var t; t = b();) t !== !1 && (e.push(t), v(e));
			return e;
		}
		return _(), x();
	}
	function d(e) {
		return e ? e.replace(l, "") : "";
	}
	t.exports = u;
})), fE = /* @__PURE__ */ n(((e) => {
	var t = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = r;
	var n = t(dE());
	function r(e, t) {
		let r = null;
		if (!e || typeof e != "string") return r;
		let i = (0, n.default)(e), a = typeof t == "function";
		return i.forEach((e) => {
			if (e.type !== "declaration") return;
			let { property: n, value: i } = e;
			a ? t(n, i, e) : i && (r ||= {}, r[n] = i);
		}), r;
	}
})), pE = /* @__PURE__ */ n(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.camelCase = void 0;
	var t = /^--[a-zA-Z0-9_-]+$/, n = /-([a-z])/g, r = /^[^-]+$/, i = /^-(webkit|moz|ms|o|khtml)-/, a = /^-(ms)-/, o = function(e) {
		return !e || r.test(e) || t.test(e);
	}, s = function(e, t) {
		return t.toUpperCase();
	}, c = function(e, t) {
		return `${t}-`;
	};
	e.camelCase = function(e, t) {
		return t === void 0 && (t = {}), o(e) ? e : (e = e.toLowerCase(), e = t.reactCompat ? e.replace(a, c) : e.replace(i, c), e.replace(n, s));
	};
})), mE = /* @__PURE__ */ n(((e, t) => {
	var n = (e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	})(fE()), r = pE();
	function i(e, t) {
		var i = {};
		return !e || typeof e != "string" || (0, n.default)(e, function(e, n) {
			e && n && (i[(0, r.camelCase)(e, t)] = n);
		}), i;
	}
	i.default = i, t.exports = i;
})), hE = _E("end"), gE = _E("start");
function _E(e) {
	return t;
	function t(t) {
		let n = t && t.position && t.position[e] || {};
		if (typeof n.line == "number" && n.line > 0 && typeof n.column == "number" && n.column > 0) return {
			line: n.line,
			column: n.column,
			offset: typeof n.offset == "number" && n.offset > -1 ? n.offset : void 0
		};
	}
}
function vE(e) {
	let t = gE(e), n = hE(e);
	if (t && n) return {
		start: t,
		end: n
	};
}
//#endregion
//#region node_modules/unist-util-stringify-position/lib/index.js
function yE(e) {
	return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? xE(e.position) : "start" in e || "end" in e ? xE(e) : "line" in e || "column" in e ? bE(e) : "";
}
function bE(e) {
	return SE(e && e.line) + ":" + SE(e && e.column);
}
function xE(e) {
	return bE(e && e.start) + "-" + bE(e && e.end);
}
function SE(e) {
	return e && typeof e == "number" ? e : 1;
}
//#endregion
//#region node_modules/vfile-message/lib/index.js
var CE = class extends Error {
	constructor(e, t, n) {
		super(), typeof t == "string" && (n = t, t = void 0);
		let r = "", i = {}, a = !1;
		if (t && (i = "line" in t && "column" in t || "start" in t && "end" in t ? { place: t } : "type" in t ? {
			ancestors: [t],
			place: t.position
		} : { ...t }), typeof e == "string" ? r = e : !i.cause && e && (a = !0, r = e.message, i.cause = e), !i.ruleId && !i.source && typeof n == "string") {
			let e = n.indexOf(":");
			e === -1 ? i.ruleId = n : (i.source = n.slice(0, e), i.ruleId = n.slice(e + 1));
		}
		if (!i.place && i.ancestors && i.ancestors) {
			let e = i.ancestors[i.ancestors.length - 1];
			e && (i.place = e.position);
		}
		let o = i.place && "start" in i.place ? i.place.start : i.place;
		this.ancestors = i.ancestors || void 0, this.cause = i.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = r, this.line = o ? o.line : void 0, this.name = yE(i.place) || "1:1", this.place = i.place || void 0, this.reason = this.message, this.ruleId = i.ruleId || void 0, this.source = i.source || void 0, this.stack = a && i.cause && typeof i.cause.stack == "string" ? i.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
	}
};
CE.prototype.file = "", CE.prototype.name = "", CE.prototype.reason = "", CE.prototype.message = "", CE.prototype.stack = "", CE.prototype.column = void 0, CE.prototype.line = void 0, CE.prototype.ancestors = void 0, CE.prototype.cause = void 0, CE.prototype.fatal = void 0, CE.prototype.place = void 0, CE.prototype.ruleId = void 0, CE.prototype.source = void 0;
//#endregion
//#region node_modules/hast-util-to-jsx-runtime/lib/index.js
var wE = /* @__PURE__ */ e(mE(), 1), TE = {}.hasOwnProperty, EE = /* @__PURE__ */ new Map(), DE = /[A-Z]/g, OE = /* @__PURE__ */ new Set([
	"table",
	"tbody",
	"thead",
	"tfoot",
	"tr"
]), kE = /* @__PURE__ */ new Set(["td", "th"]), AE = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function jE(e, t) {
	if (!t || t.Fragment === void 0) throw TypeError("Expected `Fragment` in options");
	let n = t.filePath || void 0, r;
	if (t.development) {
		if (typeof t.jsxDEV != "function") throw TypeError("Expected `jsxDEV` in options when `development: true`");
		r = HE(n, t.jsxDEV);
	} else {
		if (typeof t.jsx != "function") throw TypeError("Expected `jsx` in production options");
		if (typeof t.jsxs != "function") throw TypeError("Expected `jsxs` in production options");
		r = VE(n, t.jsx, t.jsxs);
	}
	let i = {
		Fragment: t.Fragment,
		ancestors: [],
		components: t.components || {},
		create: r,
		elementAttributeNameCase: t.elementAttributeNameCase || "react",
		evaluater: t.createEvaluater ? t.createEvaluater() : void 0,
		filePath: n,
		ignoreInvalidStyle: t.ignoreInvalidStyle || !1,
		passKeys: t.passKeys !== !1,
		passNode: t.passNode || !1,
		schema: t.space === "svg" ? cE : sE,
		stylePropertyNameCase: t.stylePropertyNameCase || "dom",
		tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
	}, a = ME(i, e, void 0);
	return a && typeof a != "string" ? a : i.create(e, i.Fragment, { children: a || void 0 }, void 0);
}
function ME(e, t, n) {
	if (t.type === "element") return NE(e, t, n);
	if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression") return PE(e, t);
	if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement") return IE(e, t, n);
	if (t.type === "mdxjsEsm") return FE(e, t);
	if (t.type === "root") return LE(e, t, n);
	if (t.type === "text") return RE(e, t);
}
function NE(e, t, n) {
	let r = e.schema, i = r;
	t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = cE, e.schema = i), e.ancestors.push(t);
	let a = JE(e, t.tagName, !1), o = UE(e, t), s = GE(e, t);
	return OE.has(t.tagName) && (s = s.filter(function(e) {
		return typeof e != "string" || !OT(e);
	})), zE(e, o, a, t), BE(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function PE(e, t) {
	if (t.data && t.data.estree && e.evaluater) {
		let n = t.data.estree.body[0];
		return n.type, e.evaluater.evaluateExpression(n.expression);
	}
	YE(e, t.position);
}
function FE(e, t) {
	if (t.data && t.data.estree && e.evaluater) return e.evaluater.evaluateProgram(t.data.estree);
	YE(e, t.position);
}
function IE(e, t, n) {
	let r = e.schema, i = r;
	t.name === "svg" && r.space === "html" && (i = cE, e.schema = i), e.ancestors.push(t);
	let a = t.name === null ? e.Fragment : JE(e, t.name, !0), o = WE(e, t), s = GE(e, t);
	return zE(e, o, a, t), BE(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function LE(e, t, n) {
	let r = {};
	return BE(r, GE(e, t)), e.create(t, e.Fragment, r, n);
}
function RE(e, t) {
	return t.value;
}
function zE(e, t, n, r) {
	typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function BE(e, t) {
	if (t.length > 0) {
		let n = t.length > 1 ? t : t[0];
		n && (e.children = n);
	}
}
function VE(e, t, n) {
	return r;
	function r(e, r, i, a) {
		let o = Array.isArray(i.children) ? n : t;
		return a ? o(r, i, a) : o(r, i);
	}
}
function HE(e, t) {
	return n;
	function n(n, r, i, a) {
		let o = Array.isArray(i.children), s = gE(n);
		return t(r, i, a, o, {
			columnNumber: s ? s.column - 1 : void 0,
			fileName: e,
			lineNumber: s ? s.line : void 0
		}, void 0);
	}
}
function UE(e, t) {
	let n = {}, r, i;
	for (i in t.properties) if (i !== "children" && TE.call(t.properties, i)) {
		let a = KE(e, i, t.properties[i]);
		if (a) {
			let [i, o] = a;
			e.tableCellAlignToStyle && i === "align" && typeof o == "string" && kE.has(t.tagName) ? r = o : n[i] = o;
		}
	}
	if (r) {
		let t = n.style ||= {};
		t[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
	}
	return n;
}
function WE(e, t) {
	let n = {};
	for (let r of t.attributes) if (r.type === "mdxJsxExpressionAttribute") {
		if (r.data && r.data.estree && e.evaluater) {
			let t = r.data.estree.body[0];
			t.type;
			let i = t.expression;
			i.type;
			let a = i.properties[0];
			a.type, Object.assign(n, e.evaluater.evaluateExpression(a.argument));
		} else YE(e, t.position);
	} else {
		let i = r.name, a;
		if (r.value && typeof r.value == "object") {
			if (r.value.data && r.value.data.estree && e.evaluater) {
				let t = r.value.data.estree.body[0];
				t.type, a = e.evaluater.evaluateExpression(t.expression);
			} else YE(e, t.position);
		} else a = r.value === null || r.value;
		n[i] = a;
	}
	return n;
}
function GE(e, t) {
	let n = [], r = -1, i = e.passKeys ? /* @__PURE__ */ new Map() : EE;
	for (; ++r < t.children.length;) {
		let a = t.children[r], o;
		if (e.passKeys) {
			let e = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
			if (e) {
				let t = i.get(e) || 0;
				o = e + "-" + t, i.set(e, t + 1);
			}
		}
		let s = ME(e, a, o);
		s !== void 0 && n.push(s);
	}
	return n;
}
function KE(e, t, n) {
	let r = iE(e.schema, t);
	if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
		if (Array.isArray(n) && (n = r.commaSeparated ? ST(n) : uE(n)), r.property === "style") {
			let t = typeof n == "object" ? n : qE(e, String(n));
			return e.stylePropertyNameCase === "css" && (t = XE(t)), ["style", t];
		}
		return [e.elementAttributeNameCase === "react" && r.space ? eE[r.property] || r.property : r.attribute, n];
	}
}
function qE(e, t) {
	try {
		return (0, wE.default)(t, { reactCompat: !0 });
	} catch (t) {
		if (e.ignoreInvalidStyle) return {};
		let n = t, r = new CE("Cannot parse `style` attribute", {
			ancestors: e.ancestors,
			cause: n,
			ruleId: "style",
			source: "hast-util-to-jsx-runtime"
		});
		throw r.file = e.filePath || void 0, r.url = AE + "#cannot-parse-style-attribute", r;
	}
}
function JE(e, t, n) {
	let r;
	if (!n) r = {
		type: "Literal",
		value: t
	};
	else if (t.includes(".")) {
		let e = t.split("."), n = -1, i;
		for (; ++n < e.length;) {
			let t = ET(e[n]) ? {
				type: "Identifier",
				name: e[n]
			} : {
				type: "Literal",
				value: e[n]
			};
			i = i ? {
				type: "MemberExpression",
				object: i,
				property: t,
				computed: !!(n && t.type === "Literal"),
				optional: !1
			} : t;
		}
		r = i;
	} else r = ET(t) && !/^[a-z]/.test(t) ? {
		type: "Identifier",
		name: t
	} : {
		type: "Literal",
		value: t
	};
	if (r.type === "Literal") {
		let t = r.value;
		return TE.call(e.components, t) ? e.components[t] : t;
	}
	if (e.evaluater) return e.evaluater.evaluateExpression(r);
	YE(e);
}
function YE(e, t) {
	let n = new CE("Cannot handle MDX estrees without `createEvaluater`", {
		ancestors: e.ancestors,
		place: t,
		ruleId: "mdx-estree",
		source: "hast-util-to-jsx-runtime"
	});
	throw n.file = e.filePath || void 0, n.url = AE + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function XE(e) {
	let t = {}, n;
	for (n in e) TE.call(e, n) && (t[ZE(n)] = e[n]);
	return t;
}
function ZE(e) {
	let t = e.replace(DE, QE);
	return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function QE(e) {
	return "-" + e.toLowerCase();
}
//#endregion
//#region node_modules/html-url-attributes/lib/index.js
var $E = {
	action: ["form"],
	cite: [
		"blockquote",
		"del",
		"ins",
		"q"
	],
	data: ["object"],
	formAction: ["button", "input"],
	href: [
		"a",
		"area",
		"base",
		"link"
	],
	icon: ["menuitem"],
	itemId: null,
	manifest: ["html"],
	ping: ["a", "area"],
	poster: ["video"],
	src: [
		"audio",
		"embed",
		"iframe",
		"img",
		"input",
		"script",
		"source",
		"track",
		"video"
	]
}, eD = {};
function tD(e, t) {
	let n = t || eD;
	return nD(e, typeof n.includeImageAlt != "boolean" || n.includeImageAlt, typeof n.includeHtml != "boolean" || n.includeHtml);
}
function nD(e, t, n) {
	if (iD(e)) {
		if ("value" in e) return e.type === "html" && !n ? "" : e.value;
		if (t && "alt" in e && e.alt) return e.alt;
		if ("children" in e) return rD(e.children, t, n);
	}
	return Array.isArray(e) ? rD(e, t, n) : "";
}
function rD(e, t, n) {
	let r = [], i = -1;
	for (; ++i < e.length;) r[i] = nD(e[i], t, n);
	return r.join("");
}
function iD(e) {
	return !!(e && typeof e == "object");
}
//#endregion
//#region node_modules/decode-named-character-reference/index.dom.js
var aD = document.createElement("i");
function oD(e) {
	let t = "&" + e + ";";
	aD.innerHTML = t;
	let n = aD.textContent;
	return n.charCodeAt(n.length - 1) === 59 && e !== "semi" ? !1 : n !== t && n;
}
//#endregion
//#region node_modules/micromark-util-chunked/index.js
function sD(e, t, n, r) {
	let i = e.length, a = 0, o;
	if (t = t < 0 ? -t > i ? 0 : i + t : t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4) o = Array.from(r), o.unshift(t, n), e.splice(...o);
	else for (n && e.splice(t, n); a < r.length;) o = r.slice(a, a + 1e4), o.unshift(t, 0), e.splice(...o), a += 1e4, t += 1e4;
}
function cD(e, t) {
	return e.length > 0 ? (sD(e, e.length, 0, t), e) : t;
}
//#endregion
//#region node_modules/micromark-util-combine-extensions/index.js
var lD = {}.hasOwnProperty;
function uD(e) {
	let t = {}, n = -1;
	for (; ++n < e.length;) dD(t, e[n]);
	return t;
}
function dD(e, t) {
	let n;
	for (n in t) {
		let r = (lD.call(e, n) ? e[n] : void 0) || (e[n] = {}), i = t[n], a;
		if (i) for (a in i) {
			lD.call(r, a) || (r[a] = []);
			let e = i[a];
			fD(r[a], Array.isArray(e) ? e : e ? [e] : []);
		}
	}
}
function fD(e, t) {
	let n = -1, r = [];
	for (; ++n < t.length;) (t[n].add === "after" ? e : r).push(t[n]);
	sD(e, 0, 0, r);
}
//#endregion
//#region node_modules/micromark-util-decode-numeric-character-reference/index.js
function pD(e, t) {
	let n = Number.parseInt(e, t);
	return n < 9 || n === 11 || n > 13 && n < 32 || n > 126 && n < 160 || n > 55295 && n < 57344 || n > 64975 && n < 65008 || (n & 65535) == 65535 || (n & 65535) == 65534 || n > 1114111 ? "�" : String.fromCodePoint(n);
}
//#endregion
//#region node_modules/micromark-util-normalize-identifier/index.js
function mD(e) {
	return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
//#endregion
//#region node_modules/micromark-util-character/index.js
var hD = TD(/[A-Za-z]/), gD = TD(/[\dA-Za-z]/), _D = TD(/[#-'*+\--9=?A-Z^-~]/);
function vD(e) {
	return e !== null && (e < 32 || e === 127);
}
var yD = TD(/\d/), bD = TD(/[\dA-Fa-f]/), xD = TD(/[!-/:-@[-`{-~]/);
function Z(e) {
	return e !== null && e < -2;
}
function SD(e) {
	return e !== null && (e < 0 || e === 32);
}
function Q(e) {
	return e === -2 || e === -1 || e === 32;
}
var CD = TD(/\p{P}|\p{S}/u), wD = TD(/\s/);
function TD(e) {
	return t;
	function t(t) {
		return t !== null && t > -1 && e.test(String.fromCharCode(t));
	}
}
//#endregion
//#region node_modules/micromark-util-sanitize-uri/index.js
function ED(e) {
	let t = [], n = -1, r = 0, i = 0;
	for (; ++n < e.length;) {
		let a = e.charCodeAt(n), o = "";
		if (a === 37 && gD(e.charCodeAt(n + 1)) && gD(e.charCodeAt(n + 2))) i = 2;
		else if (a < 128) /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (o = String.fromCharCode(a));
		else if (a > 55295 && a < 57344) {
			let t = e.charCodeAt(n + 1);
			a < 56320 && t > 56319 && t < 57344 ? (o = String.fromCharCode(a, t), i = 1) : o = "�";
		} else o = String.fromCharCode(a);
		o &&= (t.push(e.slice(r, n), encodeURIComponent(o)), r = n + i + 1, ""), i &&= (n += i, 0);
	}
	return t.join("") + e.slice(r);
}
//#endregion
//#region node_modules/micromark-factory-space/index.js
function $(e, t, n, r) {
	let i = r ? r - 1 : Infinity, a = 0;
	return o;
	function o(r) {
		return Q(r) ? (e.enter(n), s(r)) : t(r);
	}
	function s(r) {
		return Q(r) && a++ < i ? (e.consume(r), s) : (e.exit(n), t(r));
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/content.js
var DD = { tokenize: OD };
function OD(e) {
	let t = e.attempt(this.parser.constructs.contentInitial, r, i), n;
	return t;
	function r(n) {
		if (n === null) {
			e.consume(n);
			return;
		}
		return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), $(e, t, "linePrefix");
	}
	function i(t) {
		return e.enter("paragraph"), a(t);
	}
	function a(t) {
		let r = e.enter("chunkText", {
			contentType: "text",
			previous: n
		});
		return n && (n.next = r), n = r, o(t);
	}
	function o(t) {
		if (t === null) {
			e.exit("chunkText"), e.exit("paragraph"), e.consume(t);
			return;
		}
		return Z(t) ? (e.consume(t), e.exit("chunkText"), a) : (e.consume(t), o);
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/document.js
var kD = { tokenize: jD }, AD = { tokenize: MD };
function jD(e) {
	let t = this, n = [], r = 0, i, a, o;
	return s;
	function s(i) {
		if (r < n.length) {
			let a = n[r];
			return t.containerState = a[1], e.attempt(a[0].continuation, c, l)(i);
		}
		return l(i);
	}
	function c(e) {
		if (r++, t.containerState._closeFlow) {
			t.containerState._closeFlow = void 0, i && v();
			let n = t.events.length, a = n, o;
			for (; a--;) if (t.events[a][0] === "exit" && t.events[a][1].type === "chunkFlow") {
				o = t.events[a][1].end;
				break;
			}
			_(r);
			let s = n;
			for (; s < t.events.length;) t.events[s][1].end = { ...o }, s++;
			return sD(t.events, a + 1, 0, t.events.slice(n)), t.events.length = s, l(e);
		}
		return s(e);
	}
	function l(a) {
		if (r === n.length) {
			if (!i) return f(a);
			if (i.currentConstruct && i.currentConstruct.concrete) return m(a);
			t.interrupt = !(!i.currentConstruct || i._gfmTableDynamicInterruptHack);
		}
		return t.containerState = {}, e.check(AD, u, d)(a);
	}
	function u(e) {
		return i && v(), _(r), f(e);
	}
	function d(e) {
		return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, m(e);
	}
	function f(n) {
		return t.containerState = {}, e.attempt(AD, p, m)(n);
	}
	function p(e) {
		return r++, n.push([t.currentConstruct, t.containerState]), f(e);
	}
	function m(n) {
		if (n === null) {
			i && v(), _(0), e.consume(n);
			return;
		}
		return i ||= t.parser.flow(t.now()), e.enter("chunkFlow", {
			_tokenizer: i,
			contentType: "flow",
			previous: a
		}), h(n);
	}
	function h(n) {
		if (n === null) {
			g(e.exit("chunkFlow"), !0), _(0), e.consume(n);
			return;
		}
		return Z(n) ? (e.consume(n), g(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, s) : (e.consume(n), h);
	}
	function g(e, n) {
		let s = t.sliceStream(e);
		if (n && s.push(null), e.previous = a, a && (a.next = e), a = e, i.defineSkip(e.start), i.write(s), t.parser.lazy[e.start.line]) {
			let e = i.events.length;
			for (; e--;) if (i.events[e][1].start.offset < o && (!i.events[e][1].end || i.events[e][1].end.offset > o)) return;
			let n = t.events.length, a = n, s, c;
			for (; a--;) if (t.events[a][0] === "exit" && t.events[a][1].type === "chunkFlow") {
				if (s) {
					c = t.events[a][1].end;
					break;
				}
				s = !0;
			}
			for (_(r), e = n; e < t.events.length;) t.events[e][1].end = { ...c }, e++;
			sD(t.events, a + 1, 0, t.events.slice(n)), t.events.length = e;
		}
	}
	function _(r) {
		let i = n.length;
		for (; i-- > r;) {
			let r = n[i];
			t.containerState = r[1], r[0].exit.call(t, e);
		}
		n.length = r;
	}
	function v() {
		i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
	}
}
function MD(e, t, n) {
	return $(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
//#endregion
//#region node_modules/micromark-util-classify-character/index.js
function ND(e) {
	if (e === null || SD(e) || wD(e)) return 1;
	if (CD(e)) return 2;
}
//#endregion
//#region node_modules/micromark-util-resolve-all/index.js
function PD(e, t, n) {
	let r = [], i = -1;
	for (; ++i < e.length;) {
		let a = e[i].resolveAll;
		a && !r.includes(a) && (t = a(t, n), r.push(a));
	}
	return t;
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/attention.js
var FD = {
	name: "attention",
	resolveAll: ID,
	tokenize: LD
};
function ID(e, t) {
	let n = -1, r, i, a, o, s, c, l, u;
	for (; ++n < e.length;) if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
		for (r = n; r--;) if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
			if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3)) continue;
			c = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
			let d = { ...e[r][1].end }, f = { ...e[n][1].start };
			RD(d, -c), RD(f, c), o = {
				type: c > 1 ? "strongSequence" : "emphasisSequence",
				start: d,
				end: { ...e[r][1].end }
			}, s = {
				type: c > 1 ? "strongSequence" : "emphasisSequence",
				start: { ...e[n][1].start },
				end: f
			}, a = {
				type: c > 1 ? "strongText" : "emphasisText",
				start: { ...e[r][1].end },
				end: { ...e[n][1].start }
			}, i = {
				type: c > 1 ? "strong" : "emphasis",
				start: { ...o.start },
				end: { ...s.end }
			}, e[r][1].end = { ...o.start }, e[n][1].start = { ...s.end }, l = [], e[r][1].end.offset - e[r][1].start.offset && (l = cD(l, [[
				"enter",
				e[r][1],
				t
			], [
				"exit",
				e[r][1],
				t
			]])), l = cD(l, [
				[
					"enter",
					i,
					t
				],
				[
					"enter",
					o,
					t
				],
				[
					"exit",
					o,
					t
				],
				[
					"enter",
					a,
					t
				]
			]), l = cD(l, PD(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), l = cD(l, [
				[
					"exit",
					a,
					t
				],
				[
					"enter",
					s,
					t
				],
				[
					"exit",
					s,
					t
				],
				[
					"exit",
					i,
					t
				]
			]), e[n][1].end.offset - e[n][1].start.offset ? (u = 2, l = cD(l, [[
				"enter",
				e[n][1],
				t
			], [
				"exit",
				e[n][1],
				t
			]])) : u = 0, sD(e, r - 1, n - r + 3, l), n = r + l.length - u - 2;
			break;
		}
	}
	for (n = -1; ++n < e.length;) e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
	return e;
}
function LD(e, t) {
	let n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = ND(r), a;
	return o;
	function o(t) {
		return a = t, e.enter("attentionSequence"), s(t);
	}
	function s(o) {
		if (o === a) return e.consume(o), s;
		let c = e.exit("attentionSequence"), l = ND(o), u = !l || l === 2 && i || n.includes(o), d = !i || i === 2 && l || n.includes(r);
		return c._open = !!(a === 42 ? u : u && (i || !d)), c._close = !!(a === 42 ? d : d && (l || !u)), t(o);
	}
}
function RD(e, t) {
	e.column += t, e.offset += t, e._bufferIndex += t;
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/autolink.js
var zD = {
	name: "autolink",
	tokenize: BD
};
function BD(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(t), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
	}
	function a(t) {
		return hD(t) ? (e.consume(t), o) : t === 64 ? n(t) : l(t);
	}
	function o(e) {
		return e === 43 || e === 45 || e === 46 || gD(e) ? (r = 1, s(e)) : l(e);
	}
	function s(t) {
		return t === 58 ? (e.consume(t), r = 0, c) : (t === 43 || t === 45 || t === 46 || gD(t)) && r++ < 32 ? (e.consume(t), s) : (r = 0, l(t));
	}
	function c(r) {
		return r === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(r), e.exit("autolinkMarker"), e.exit("autolink"), t) : r === null || r === 32 || r === 60 || vD(r) ? n(r) : (e.consume(r), c);
	}
	function l(t) {
		return t === 64 ? (e.consume(t), u) : _D(t) ? (e.consume(t), l) : n(t);
	}
	function u(e) {
		return gD(e) ? d(e) : n(e);
	}
	function d(n) {
		return n === 46 ? (e.consume(n), r = 0, u) : n === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(n), e.exit("autolinkMarker"), e.exit("autolink"), t) : f(n);
	}
	function f(t) {
		if ((t === 45 || gD(t)) && r++ < 63) {
			let n = t === 45 ? f : d;
			return e.consume(t), n;
		}
		return n(t);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/blank-line.js
var VD = {
	partial: !0,
	tokenize: HD
};
function HD(e, t, n) {
	return r;
	function r(t) {
		return Q(t) ? $(e, i, "linePrefix")(t) : i(t);
	}
	function i(e) {
		return e === null || Z(e) ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/block-quote.js
var UD = {
	continuation: { tokenize: GD },
	exit: KD,
	name: "blockQuote",
	tokenize: WD
};
function WD(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		if (t === 62) {
			let n = r.containerState;
			return n.open ||= (e.enter("blockQuote", { _container: !0 }), !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(t), e.exit("blockQuoteMarker"), a;
		}
		return n(t);
	}
	function a(n) {
		return Q(n) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(n), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(n));
	}
}
function GD(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return Q(t) ? $(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : a(t);
	}
	function a(r) {
		return e.attempt(UD, t, n)(r);
	}
}
function KD(e) {
	e.exit("blockQuote");
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/character-escape.js
var qD = {
	name: "characterEscape",
	tokenize: JD
};
function JD(e, t, n) {
	return r;
	function r(t) {
		return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(t), e.exit("escapeMarker"), i;
	}
	function i(r) {
		return xD(r) ? (e.enter("characterEscapeValue"), e.consume(r), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(r);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/character-reference.js
var YD = {
	name: "characterReference",
	tokenize: XD
};
function XD(e, t, n) {
	let r = this, i = 0, a, o;
	return s;
	function s(t) {
		return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(t), e.exit("characterReferenceMarker"), c;
	}
	function c(t) {
		return t === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(t), e.exit("characterReferenceMarkerNumeric"), l) : (e.enter("characterReferenceValue"), a = 31, o = gD, u(t));
	}
	function l(t) {
		return t === 88 || t === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(t), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, o = bD, u) : (e.enter("characterReferenceValue"), a = 7, o = yD, u(t));
	}
	function u(s) {
		if (s === 59 && i) {
			let i = e.exit("characterReferenceValue");
			return o === gD && !oD(r.sliceSerialize(i)) ? n(s) : (e.enter("characterReferenceMarker"), e.consume(s), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
		}
		return o(s) && i++ < a ? (e.consume(s), u) : n(s);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/code-fenced.js
var ZD = {
	partial: !0,
	tokenize: eO
}, QD = {
	concrete: !0,
	name: "codeFenced",
	tokenize: $D
};
function $D(e, t, n) {
	let r = this, i = {
		partial: !0,
		tokenize: x
	}, a = 0, o = 0, s;
	return c;
	function c(e) {
		return l(e);
	}
	function l(t) {
		let n = r.events[r.events.length - 1];
		return a = n && n[1].type === "linePrefix" ? n[2].sliceSerialize(n[1], !0).length : 0, s = t, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(t);
	}
	function u(t) {
		return t === s ? (o++, e.consume(t), u) : o < 3 ? n(t) : (e.exit("codeFencedFenceSequence"), Q(t) ? $(e, d, "whitespace")(t) : d(t));
	}
	function d(n) {
		return n === null || Z(n) ? (e.exit("codeFencedFence"), r.interrupt ? t(n) : e.check(ZD, h, b)(n)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", { contentType: "string" }), f(n));
	}
	function f(t) {
		return t === null || Z(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(t)) : Q(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), $(e, p, "whitespace")(t)) : t === 96 && t === s ? n(t) : (e.consume(t), f);
	}
	function p(t) {
		return t === null || Z(t) ? d(t) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", { contentType: "string" }), m(t));
	}
	function m(t) {
		return t === null || Z(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(t)) : t === 96 && t === s ? n(t) : (e.consume(t), m);
	}
	function h(t) {
		return e.attempt(i, b, g)(t);
	}
	function g(t) {
		return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), _;
	}
	function _(t) {
		return a > 0 && Q(t) ? $(e, v, "linePrefix", a + 1)(t) : v(t);
	}
	function v(t) {
		return t === null || Z(t) ? e.check(ZD, h, b)(t) : (e.enter("codeFlowValue"), y(t));
	}
	function y(t) {
		return t === null || Z(t) ? (e.exit("codeFlowValue"), v(t)) : (e.consume(t), y);
	}
	function b(n) {
		return e.exit("codeFenced"), t(n);
	}
	function x(e, t, n) {
		let i = 0;
		return a;
		function a(t) {
			return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), c;
		}
		function c(t) {
			return e.enter("codeFencedFence"), Q(t) ? $(e, l, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : l(t);
		}
		function l(t) {
			return t === s ? (e.enter("codeFencedFenceSequence"), u(t)) : n(t);
		}
		function u(t) {
			return t === s ? (i++, e.consume(t), u) : i >= o ? (e.exit("codeFencedFenceSequence"), Q(t) ? $(e, d, "whitespace")(t) : d(t)) : n(t);
		}
		function d(r) {
			return r === null || Z(r) ? (e.exit("codeFencedFence"), t(r)) : n(r);
		}
	}
}
function eO(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return t === null ? n(t) : (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), a);
	}
	function a(e) {
		return r.parser.lazy[r.now().line] ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/code-indented.js
var tO = {
	name: "codeIndented",
	tokenize: rO
}, nO = {
	partial: !0,
	tokenize: iO
};
function rO(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.enter("codeIndented"), $(e, a, "linePrefix", 5)(t);
	}
	function a(e) {
		let t = r.events[r.events.length - 1];
		return t && t[1].type === "linePrefix" && t[2].sliceSerialize(t[1], !0).length >= 4 ? o(e) : n(e);
	}
	function o(t) {
		return t === null ? c(t) : Z(t) ? e.attempt(nO, o, c)(t) : (e.enter("codeFlowValue"), s(t));
	}
	function s(t) {
		return t === null || Z(t) ? (e.exit("codeFlowValue"), o(t)) : (e.consume(t), s);
	}
	function c(n) {
		return e.exit("codeIndented"), t(n);
	}
}
function iO(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return r.parser.lazy[r.now().line] ? n(t) : Z(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), i) : $(e, a, "linePrefix", 5)(t);
	}
	function a(e) {
		let a = r.events[r.events.length - 1];
		return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(e) : Z(e) ? i(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/code-text.js
var aO = {
	name: "codeText",
	previous: sO,
	resolve: oO,
	tokenize: cO
};
function oO(e) {
	let t = e.length - 4, n = 3, r, i;
	if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
		for (r = n; ++r < t;) if (e[r][1].type === "codeTextData") {
			e[n][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", n += 2, t -= 2;
			break;
		}
	}
	for (r = n - 1, t++; ++r <= t;) i === void 0 ? r !== t && e[r][1].type !== "lineEnding" && (i = r) : (r === t || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
	return e;
}
function sO(e) {
	return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function cO(e, t, n) {
	let r = 0, i, a;
	return o;
	function o(t) {
		return e.enter("codeText"), e.enter("codeTextSequence"), s(t);
	}
	function s(t) {
		return t === 96 ? (e.consume(t), r++, s) : (e.exit("codeTextSequence"), c(t));
	}
	function c(t) {
		return t === null ? n(t) : t === 32 ? (e.enter("space"), e.consume(t), e.exit("space"), c) : t === 96 ? (a = e.enter("codeTextSequence"), i = 0, u(t)) : Z(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), c) : (e.enter("codeTextData"), l(t));
	}
	function l(t) {
		return t === null || t === 32 || t === 96 || Z(t) ? (e.exit("codeTextData"), c(t)) : (e.consume(t), l);
	}
	function u(n) {
		return n === 96 ? (e.consume(n), i++, u) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(n)) : (a.type = "codeTextData", l(n));
	}
}
//#endregion
//#region node_modules/micromark-util-subtokenize/lib/splice-buffer.js
var lO = class {
	constructor(e) {
		this.left = e ? [...e] : [], this.right = [];
	}
	get(e) {
		if (e < 0 || e >= this.left.length + this.right.length) throw RangeError("Cannot access index `" + e + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
		return e < this.left.length ? this.left[e] : this.right[this.right.length - e + this.left.length - 1];
	}
	get length() {
		return this.left.length + this.right.length;
	}
	shift() {
		return this.setCursor(0), this.right.pop();
	}
	slice(e, t) {
		let n = t ?? Infinity;
		return n < this.left.length ? this.left.slice(e, n) : e > this.left.length ? this.right.slice(this.right.length - n + this.left.length, this.right.length - e + this.left.length).reverse() : this.left.slice(e).concat(this.right.slice(this.right.length - n + this.left.length).reverse());
	}
	splice(e, t, n) {
		let r = t || 0;
		this.setCursor(Math.trunc(e));
		let i = this.right.splice(this.right.length - r, Infinity);
		return n && uO(this.left, n), i.reverse();
	}
	pop() {
		return this.setCursor(Infinity), this.left.pop();
	}
	push(e) {
		this.setCursor(Infinity), this.left.push(e);
	}
	pushMany(e) {
		this.setCursor(Infinity), uO(this.left, e);
	}
	unshift(e) {
		this.setCursor(0), this.right.push(e);
	}
	unshiftMany(e) {
		this.setCursor(0), uO(this.right, e.reverse());
	}
	setCursor(e) {
		if (!(e === this.left.length || e > this.left.length && this.right.length === 0 || e < 0 && this.left.length === 0)) {
			if (e < this.left.length) {
				let t = this.left.splice(e, Infinity);
				uO(this.right, t.reverse());
			} else {
				let t = this.right.splice(this.left.length + this.right.length - e, Infinity);
				uO(this.left, t.reverse());
			}
		}
	}
};
function uO(e, t) {
	let n = 0;
	if (t.length < 1e4) e.push(...t);
	else for (; n < t.length;) e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
//#endregion
//#region node_modules/micromark-util-subtokenize/index.js
function dO(e) {
	let t = {}, n = -1, r, i, a, o, s, c, l, u = new lO(e);
	for (; ++n < u.length;) {
		for (; n in t;) n = t[n];
		if (r = u.get(n), n && r[1].type === "chunkFlow" && u.get(n - 1)[1].type === "listItemPrefix" && (c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === "lineEndingBlank" && (a += 2), a < c.length && c[a][1].type === "content")) for (; ++a < c.length && c[a][1].type !== "content";) c[a][1].type === "chunkText" && (c[a][1]._isInFirstContentOfListItem = !0, a++);
		if (r[0] === "enter") r[1].contentType && (Object.assign(t, fO(u, n)), n = t[n], l = !0);
		else if (r[1]._container) {
			for (a = n, i = void 0; a--;) if (o = u.get(a), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank") o[0] === "enter" && (i && (u.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = a);
			else if (o[1].type !== "linePrefix" && o[1].type !== "listItemIndent") break;
			i && (r[1].end = { ...u.get(i)[1].start }, s = u.slice(i, n), s.unshift(r), u.splice(i, n - i + 1, s));
		}
	}
	return sD(e, 0, Infinity, u.slice(0)), !l;
}
function fO(e, t) {
	let n = e.get(t)[1], r = e.get(t)[2], i = t - 1, a = [], o = n._tokenizer;
	o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
	let s = o.events, c = [], l = {}, u, d, f = -1, p = n, m = 0, h = 0, g = [h];
	for (; p;) {
		for (; e.get(++i)[1] !== p;);
		a.push(i), p._tokenizer || (u = r.sliceStream(p), p.next || u.push(null), d && o.defineSkip(p.start), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(u), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), d = p, p = p.next;
	}
	for (p = n; ++f < s.length;) s[f][0] === "exit" && s[f - 1][0] === "enter" && s[f][1].type === s[f - 1][1].type && s[f][1].start.line !== s[f][1].end.line && (h = f + 1, g.push(h), p._tokenizer = void 0, p.previous = void 0, p = p.next);
	for (o.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : g.pop(), f = g.length; f--;) {
		let t = s.slice(g[f], g[f + 1]), n = a.pop();
		c.push([n, n + t.length - 1]), e.splice(n, 2, t);
	}
	for (c.reverse(), f = -1; ++f < c.length;) l[m + c[f][0]] = m + c[f][1], m += c[f][1] - c[f][0] - 1;
	return l;
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/content.js
var pO = {
	resolve: hO,
	tokenize: gO
}, mO = {
	partial: !0,
	tokenize: _O
};
function hO(e) {
	return dO(e), e;
}
function gO(e, t) {
	let n;
	return r;
	function r(t) {
		return e.enter("content"), n = e.enter("chunkContent", { contentType: "content" }), i(t);
	}
	function i(t) {
		return t === null ? a(t) : Z(t) ? e.check(mO, o, a)(t) : (e.consume(t), i);
	}
	function a(n) {
		return e.exit("chunkContent"), e.exit("content"), t(n);
	}
	function o(t) {
		return e.consume(t), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
			contentType: "content",
			previous: n
		}), n = n.next, i;
	}
}
function _O(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), $(e, a, "linePrefix");
	}
	function a(i) {
		if (i === null || Z(i)) return n(i);
		let a = r.events[r.events.length - 1];
		return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(i) : e.interrupt(r.parser.constructs.flow, n, t)(i);
	}
}
//#endregion
//#region node_modules/micromark-factory-destination/index.js
function vO(e, t, n, r, i, a, o, s, c) {
	let l = c || Infinity, u = 0;
	return d;
	function d(t) {
		return t === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(t), e.exit(a), f) : t === null || t === 32 || t === 41 || vD(t) ? n(t) : (e.enter(r), e.enter(o), e.enter(s), e.enter("chunkString", { contentType: "string" }), h(t));
	}
	function f(n) {
		return n === 62 ? (e.enter(a), e.consume(n), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(s), e.enter("chunkString", { contentType: "string" }), p(n));
	}
	function p(t) {
		return t === 62 ? (e.exit("chunkString"), e.exit(s), f(t)) : t === null || t === 60 || Z(t) ? n(t) : (e.consume(t), t === 92 ? m : p);
	}
	function m(t) {
		return t === 60 || t === 62 || t === 92 ? (e.consume(t), p) : p(t);
	}
	function h(i) {
		return !u && (i === null || i === 41 || SD(i)) ? (e.exit("chunkString"), e.exit(s), e.exit(o), e.exit(r), t(i)) : u < l && i === 40 ? (e.consume(i), u++, h) : i === 41 ? (e.consume(i), u--, h) : i === null || i === 32 || i === 40 || vD(i) ? n(i) : (e.consume(i), i === 92 ? g : h);
	}
	function g(t) {
		return t === 40 || t === 41 || t === 92 ? (e.consume(t), h) : h(t);
	}
}
//#endregion
//#region node_modules/micromark-factory-label/index.js
function yO(e, t, n, r, i, a) {
	let o = this, s = 0, c;
	return l;
	function l(t) {
		return e.enter(r), e.enter(i), e.consume(t), e.exit(i), e.enter(a), u;
	}
	function u(l) {
		return s > 999 || l === null || l === 91 || l === 93 && !c || 
		/* c8 ignore next 3 */
		l === 94 && !s && "_hiddenFootnoteSupport" in o.parser.constructs ? n(l) : l === 93 ? (e.exit(a), e.enter(i), e.consume(l), e.exit(i), e.exit(r), t) : Z(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), u) : (e.enter("chunkString", { contentType: "string" }), d(l));
	}
	function d(t) {
		return t === null || t === 91 || t === 93 || Z(t) || s++ > 999 ? (e.exit("chunkString"), u(t)) : (e.consume(t), c ||= !Q(t), t === 92 ? f : d);
	}
	function f(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), s++, d) : d(t);
	}
}
//#endregion
//#region node_modules/micromark-factory-title/index.js
function bO(e, t, n, r, i, a) {
	let o;
	return s;
	function s(t) {
		return t === 34 || t === 39 || t === 40 ? (e.enter(r), e.enter(i), e.consume(t), e.exit(i), o = t === 40 ? 41 : t, c) : n(t);
	}
	function c(n) {
		return n === o ? (e.enter(i), e.consume(n), e.exit(i), e.exit(r), t) : (e.enter(a), l(n));
	}
	function l(t) {
		return t === o ? (e.exit(a), c(o)) : t === null ? n(t) : Z(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), $(e, l, "linePrefix")) : (e.enter("chunkString", { contentType: "string" }), u(t));
	}
	function u(t) {
		return t === o || t === null || Z(t) ? (e.exit("chunkString"), l(t)) : (e.consume(t), t === 92 ? d : u);
	}
	function d(t) {
		return t === o || t === 92 ? (e.consume(t), u) : u(t);
	}
}
//#endregion
//#region node_modules/micromark-factory-whitespace/index.js
function xO(e, t) {
	let n;
	return r;
	function r(i) {
		return Z(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : Q(i) ? $(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/definition.js
var SO = {
	name: "definition",
	tokenize: wO
}, CO = {
	partial: !0,
	tokenize: TO
};
function wO(e, t, n) {
	let r = this, i;
	return a;
	function a(t) {
		return e.enter("definition"), o(t);
	}
	function o(t) {
		return yO.call(r, e, s, n, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(t);
	}
	function s(t) {
		return i = mD(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), t === 58 ? (e.enter("definitionMarker"), e.consume(t), e.exit("definitionMarker"), c) : n(t);
	}
	function c(t) {
		return SD(t) ? xO(e, l)(t) : l(t);
	}
	function l(t) {
		return vO(e, u, n, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(t);
	}
	function u(t) {
		return e.attempt(CO, d, d)(t);
	}
	function d(t) {
		return Q(t) ? $(e, f, "whitespace")(t) : f(t);
	}
	function f(a) {
		return a === null || Z(a) ? (e.exit("definition"), r.parser.defined.push(i), t(a)) : n(a);
	}
}
function TO(e, t, n) {
	return r;
	function r(t) {
		return SD(t) ? xO(e, i)(t) : n(t);
	}
	function i(t) {
		return bO(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(t);
	}
	function a(t) {
		return Q(t) ? $(e, o, "whitespace")(t) : o(t);
	}
	function o(e) {
		return e === null || Z(e) ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/hard-break-escape.js
var EO = {
	name: "hardBreakEscape",
	tokenize: DO
};
function DO(e, t, n) {
	return r;
	function r(t) {
		return e.enter("hardBreakEscape"), e.consume(t), i;
	}
	function i(r) {
		return Z(r) ? (e.exit("hardBreakEscape"), t(r)) : n(r);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/heading-atx.js
var OO = {
	name: "headingAtx",
	resolve: kO,
	tokenize: AO
};
function kO(e, t) {
	let n = e.length - 2, r = 3, i, a;
	return e[r][1].type === "whitespace" && (r += 2), n - 2 > r && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
		type: "atxHeadingText",
		start: e[r][1].start,
		end: e[n][1].end
	}, a = {
		type: "chunkText",
		start: e[r][1].start,
		end: e[n][1].end,
		contentType: "text"
	}, sD(e, r, n - r + 1, [
		[
			"enter",
			i,
			t
		],
		[
			"enter",
			a,
			t
		],
		[
			"exit",
			a,
			t
		],
		[
			"exit",
			i,
			t
		]
	])), e;
}
function AO(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return e.enter("atxHeading"), a(t);
	}
	function a(t) {
		return e.enter("atxHeadingSequence"), o(t);
	}
	function o(t) {
		return t === 35 && r++ < 6 ? (e.consume(t), o) : t === null || SD(t) ? (e.exit("atxHeadingSequence"), s(t)) : n(t);
	}
	function s(n) {
		return n === 35 ? (e.enter("atxHeadingSequence"), c(n)) : n === null || Z(n) ? (e.exit("atxHeading"), t(n)) : Q(n) ? $(e, s, "whitespace")(n) : (e.enter("atxHeadingText"), l(n));
	}
	function c(t) {
		return t === 35 ? (e.consume(t), c) : (e.exit("atxHeadingSequence"), s(t));
	}
	function l(t) {
		return t === null || t === 35 || SD(t) ? (e.exit("atxHeadingText"), s(t)) : (e.consume(t), l);
	}
}
//#endregion
//#region node_modules/micromark-util-html-tag-name/index.js
var jO = /* @__PURE__ */ "address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul".split("."), MO = [
	"pre",
	"script",
	"style",
	"textarea"
], NO = {
	concrete: !0,
	name: "htmlFlow",
	resolveTo: IO,
	tokenize: LO
}, PO = {
	partial: !0,
	tokenize: zO
}, FO = {
	partial: !0,
	tokenize: RO
};
function IO(e) {
	let t = e.length;
	for (; t-- && (e[t][0] !== "enter" || e[t][1].type !== "htmlFlow"););
	return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function LO(e, t, n) {
	let r = this, i, a, o, s, c;
	return l;
	function l(e) {
		return u(e);
	}
	function u(t) {
		return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(t), d;
	}
	function d(s) {
		return s === 33 ? (e.consume(s), f) : s === 47 ? (e.consume(s), a = !0, h) : s === 63 ? (e.consume(s), i = 3, r.interrupt ? t : I) : hD(s) ? (e.consume(s), o = String.fromCharCode(s), g) : n(s);
	}
	function f(a) {
		return a === 45 ? (e.consume(a), i = 2, p) : a === 91 ? (e.consume(a), i = 5, s = 0, m) : hD(a) ? (e.consume(a), i = 4, r.interrupt ? t : I) : n(a);
	}
	function p(i) {
		return i === 45 ? (e.consume(i), r.interrupt ? t : I) : n(i);
	}
	function m(i) {
		return i === "CDATA[".charCodeAt(s++) ? (e.consume(i), s === 6 ? r.interrupt ? t : O : m) : n(i);
	}
	function h(t) {
		return hD(t) ? (e.consume(t), o = String.fromCharCode(t), g) : n(t);
	}
	function g(s) {
		if (s === null || s === 47 || s === 62 || SD(s)) {
			let c = s === 47, l = o.toLowerCase();
			return !c && !a && MO.includes(l) ? (i = 1, r.interrupt ? t(s) : O(s)) : jO.includes(o.toLowerCase()) ? (i = 6, c ? (e.consume(s), _) : r.interrupt ? t(s) : O(s)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(s) : a ? v(s) : y(s));
		}
		return s === 45 || gD(s) ? (e.consume(s), o += String.fromCharCode(s), g) : n(s);
	}
	function _(i) {
		return i === 62 ? (e.consume(i), r.interrupt ? t : O) : n(i);
	}
	function v(t) {
		return Q(t) ? (e.consume(t), v) : E(t);
	}
	function y(t) {
		return t === 47 ? (e.consume(t), E) : t === 58 || t === 95 || hD(t) ? (e.consume(t), b) : Q(t) ? (e.consume(t), y) : E(t);
	}
	function b(t) {
		return t === 45 || t === 46 || t === 58 || t === 95 || gD(t) ? (e.consume(t), b) : x(t);
	}
	function x(t) {
		return t === 61 ? (e.consume(t), S) : Q(t) ? (e.consume(t), x) : y(t);
	}
	function S(t) {
		return t === null || t === 60 || t === 61 || t === 62 || t === 96 ? n(t) : t === 34 || t === 39 ? (e.consume(t), c = t, C) : Q(t) ? (e.consume(t), S) : w(t);
	}
	function C(t) {
		return t === c ? (e.consume(t), c = null, T) : t === null || Z(t) ? n(t) : (e.consume(t), C);
	}
	function w(t) {
		return t === null || t === 34 || t === 39 || t === 47 || t === 60 || t === 61 || t === 62 || t === 96 || SD(t) ? x(t) : (e.consume(t), w);
	}
	function T(e) {
		return e === 47 || e === 62 || Q(e) ? y(e) : n(e);
	}
	function E(t) {
		return t === 62 ? (e.consume(t), D) : n(t);
	}
	function D(t) {
		return t === null || Z(t) ? O(t) : Q(t) ? (e.consume(t), D) : n(t);
	}
	function O(t) {
		return t === 45 && i === 2 ? (e.consume(t), M) : t === 60 && i === 1 ? (e.consume(t), N) : t === 62 && i === 4 ? (e.consume(t), ee) : t === 63 && i === 3 ? (e.consume(t), I) : t === 93 && i === 5 ? (e.consume(t), F) : Z(t) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(PO, te, k)(t)) : t === null || Z(t) ? (e.exit("htmlFlowData"), k(t)) : (e.consume(t), O);
	}
	function k(t) {
		return e.check(FO, A, te)(t);
	}
	function A(t) {
		return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), j;
	}
	function j(t) {
		return t === null || Z(t) ? k(t) : (e.enter("htmlFlowData"), O(t));
	}
	function M(t) {
		return t === 45 ? (e.consume(t), I) : O(t);
	}
	function N(t) {
		return t === 47 ? (e.consume(t), o = "", P) : O(t);
	}
	function P(t) {
		if (t === 62) {
			let n = o.toLowerCase();
			return MO.includes(n) ? (e.consume(t), ee) : O(t);
		}
		return hD(t) && o.length < 8 ? (e.consume(t), o += String.fromCharCode(t), P) : O(t);
	}
	function F(t) {
		return t === 93 ? (e.consume(t), I) : O(t);
	}
	function I(t) {
		return t === 62 ? (e.consume(t), ee) : t === 45 && i === 2 ? (e.consume(t), I) : O(t);
	}
	function ee(t) {
		return t === null || Z(t) ? (e.exit("htmlFlowData"), te(t)) : (e.consume(t), ee);
	}
	function te(n) {
		return e.exit("htmlFlow"), t(n);
	}
}
function RO(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return Z(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), a) : n(t);
	}
	function a(e) {
		return r.parser.lazy[r.now().line] ? n(e) : t(e);
	}
}
function zO(e, t, n) {
	return r;
	function r(r) {
		return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), e.attempt(VD, t, n);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/html-text.js
var BO = {
	name: "htmlText",
	tokenize: VO
};
function VO(e, t, n) {
	let r = this, i, a, o;
	return s;
	function s(t) {
		return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(t), c;
	}
	function c(t) {
		return t === 33 ? (e.consume(t), l) : t === 47 ? (e.consume(t), x) : t === 63 ? (e.consume(t), y) : hD(t) ? (e.consume(t), w) : n(t);
	}
	function l(t) {
		return t === 45 ? (e.consume(t), u) : t === 91 ? (e.consume(t), a = 0, m) : hD(t) ? (e.consume(t), v) : n(t);
	}
	function u(t) {
		return t === 45 ? (e.consume(t), p) : n(t);
	}
	function d(t) {
		return t === null ? n(t) : t === 45 ? (e.consume(t), f) : Z(t) ? (o = d, N(t)) : (e.consume(t), d);
	}
	function f(t) {
		return t === 45 ? (e.consume(t), p) : d(t);
	}
	function p(e) {
		return e === 62 ? M(e) : e === 45 ? f(e) : d(e);
	}
	function m(t) {
		return t === "CDATA[".charCodeAt(a++) ? (e.consume(t), a === 6 ? h : m) : n(t);
	}
	function h(t) {
		return t === null ? n(t) : t === 93 ? (e.consume(t), g) : Z(t) ? (o = h, N(t)) : (e.consume(t), h);
	}
	function g(t) {
		return t === 93 ? (e.consume(t), _) : h(t);
	}
	function _(t) {
		return t === 62 ? M(t) : t === 93 ? (e.consume(t), _) : h(t);
	}
	function v(t) {
		return t === null || t === 62 ? M(t) : Z(t) ? (o = v, N(t)) : (e.consume(t), v);
	}
	function y(t) {
		return t === null ? n(t) : t === 63 ? (e.consume(t), b) : Z(t) ? (o = y, N(t)) : (e.consume(t), y);
	}
	function b(e) {
		return e === 62 ? M(e) : y(e);
	}
	function x(t) {
		return hD(t) ? (e.consume(t), S) : n(t);
	}
	function S(t) {
		return t === 45 || gD(t) ? (e.consume(t), S) : C(t);
	}
	function C(t) {
		return Z(t) ? (o = C, N(t)) : Q(t) ? (e.consume(t), C) : M(t);
	}
	function w(t) {
		return t === 45 || gD(t) ? (e.consume(t), w) : t === 47 || t === 62 || SD(t) ? T(t) : n(t);
	}
	function T(t) {
		return t === 47 ? (e.consume(t), M) : t === 58 || t === 95 || hD(t) ? (e.consume(t), E) : Z(t) ? (o = T, N(t)) : Q(t) ? (e.consume(t), T) : M(t);
	}
	function E(t) {
		return t === 45 || t === 46 || t === 58 || t === 95 || gD(t) ? (e.consume(t), E) : D(t);
	}
	function D(t) {
		return t === 61 ? (e.consume(t), O) : Z(t) ? (o = D, N(t)) : Q(t) ? (e.consume(t), D) : T(t);
	}
	function O(t) {
		return t === null || t === 60 || t === 61 || t === 62 || t === 96 ? n(t) : t === 34 || t === 39 ? (e.consume(t), i = t, k) : Z(t) ? (o = O, N(t)) : Q(t) ? (e.consume(t), O) : (e.consume(t), A);
	}
	function k(t) {
		return t === i ? (e.consume(t), i = void 0, j) : t === null ? n(t) : Z(t) ? (o = k, N(t)) : (e.consume(t), k);
	}
	function A(t) {
		return t === null || t === 34 || t === 39 || t === 60 || t === 61 || t === 96 ? n(t) : t === 47 || t === 62 || SD(t) ? T(t) : (e.consume(t), A);
	}
	function j(e) {
		return e === 47 || e === 62 || SD(e) ? T(e) : n(e);
	}
	function M(r) {
		return r === 62 ? (e.consume(r), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(r);
	}
	function N(t) {
		return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), P;
	}
	function P(t) {
		return Q(t) ? $(e, F, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : F(t);
	}
	function F(t) {
		return e.enter("htmlTextData"), o(t);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/label-end.js
var HO = {
	name: "labelEnd",
	resolveAll: KO,
	resolveTo: qO,
	tokenize: JO
}, UO = { tokenize: YO }, WO = { tokenize: XO }, GO = { tokenize: ZO };
function KO(e) {
	let t = -1, n = [];
	for (; ++t < e.length;) {
		let r = e[t][1];
		if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
			let e = r.type === "labelImage" ? 4 : 2;
			r.type = "data", t += e;
		}
	}
	return e.length !== n.length && sD(e, 0, e.length, n), e;
}
function qO(e, t) {
	let n = e.length, r = 0, i, a, o, s;
	for (; n--;) if (i = e[n][1], a) {
		if (i.type === "link" || i.type === "labelLink" && i._inactive) break;
		e[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
	} else if (o) {
		if (e[n][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (a = n, i.type !== "labelLink")) {
			r = 2;
			break;
		}
	} else i.type === "labelEnd" && (o = n);
	let c = {
		type: e[a][1].type === "labelLink" ? "link" : "image",
		start: { ...e[a][1].start },
		end: { ...e[e.length - 1][1].end }
	}, l = {
		type: "label",
		start: { ...e[a][1].start },
		end: { ...e[o][1].end }
	}, u = {
		type: "labelText",
		start: { ...e[a + r + 2][1].end },
		end: { ...e[o - 2][1].start }
	};
	return s = [[
		"enter",
		c,
		t
	], [
		"enter",
		l,
		t
	]], s = cD(s, e.slice(a + 1, a + r + 3)), s = cD(s, [[
		"enter",
		u,
		t
	]]), s = cD(s, PD(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, o - 3), t)), s = cD(s, [
		[
			"exit",
			u,
			t
		],
		e[o - 2],
		e[o - 1],
		[
			"exit",
			l,
			t
		]
	]), s = cD(s, e.slice(o + 1)), s = cD(s, [[
		"exit",
		c,
		t
	]]), sD(e, a, e.length, s), e;
}
function JO(e, t, n) {
	let r = this, i = r.events.length, a, o;
	for (; i--;) if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
		a = r.events[i][1];
		break;
	}
	return s;
	function s(t) {
		return a ? a._inactive ? d(t) : (o = r.parser.defined.includes(mD(r.sliceSerialize({
			start: a.end,
			end: r.now()
		}))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), e.exit("labelEnd"), c) : n(t);
	}
	function c(t) {
		return t === 40 ? e.attempt(UO, u, o ? u : d)(t) : t === 91 ? e.attempt(WO, u, o ? l : d)(t) : o ? u(t) : d(t);
	}
	function l(t) {
		return e.attempt(GO, u, d)(t);
	}
	function u(e) {
		return t(e);
	}
	function d(e) {
		return a._balanced = !0, n(e);
	}
}
function YO(e, t, n) {
	return r;
	function r(t) {
		return e.enter("resource"), e.enter("resourceMarker"), e.consume(t), e.exit("resourceMarker"), i;
	}
	function i(t) {
		return SD(t) ? xO(e, a)(t) : a(t);
	}
	function a(t) {
		return t === 41 ? u(t) : vO(e, o, s, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(t);
	}
	function o(t) {
		return SD(t) ? xO(e, c)(t) : u(t);
	}
	function s(e) {
		return n(e);
	}
	function c(t) {
		return t === 34 || t === 39 || t === 40 ? bO(e, l, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(t) : u(t);
	}
	function l(t) {
		return SD(t) ? xO(e, u)(t) : u(t);
	}
	function u(r) {
		return r === 41 ? (e.enter("resourceMarker"), e.consume(r), e.exit("resourceMarker"), e.exit("resource"), t) : n(r);
	}
}
function XO(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return yO.call(r, e, a, o, "reference", "referenceMarker", "referenceString")(t);
	}
	function a(e) {
		return r.parser.defined.includes(mD(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(e) : n(e);
	}
	function o(e) {
		return n(e);
	}
}
function ZO(e, t, n) {
	return r;
	function r(t) {
		return e.enter("reference"), e.enter("referenceMarker"), e.consume(t), e.exit("referenceMarker"), i;
	}
	function i(r) {
		return r === 93 ? (e.enter("referenceMarker"), e.consume(r), e.exit("referenceMarker"), e.exit("reference"), t) : n(r);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/label-start-image.js
var QO = {
	name: "labelStartImage",
	resolveAll: HO.resolveAll,
	tokenize: $O
};
function $O(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(t), e.exit("labelImageMarker"), a;
	}
	function a(t) {
		return t === 91 ? (e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), e.exit("labelImage"), o) : n(t);
	}
	function o(e) {
		/* c8 ignore next 3 */
		return e === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/label-start-link.js
var ek = {
	name: "labelStartLink",
	resolveAll: HO.resolveAll,
	tokenize: tk
};
function tk(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.enter("labelLink"), e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), e.exit("labelLink"), a;
	}
	function a(e) {
		/* c8 ignore next 3 */
		return e === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/line-ending.js
var nk = {
	name: "lineEnding",
	tokenize: rk
};
function rk(e, t) {
	return n;
	function n(n) {
		return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), $(e, t, "linePrefix");
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/thematic-break.js
var ik = {
	name: "thematicBreak",
	tokenize: ak
};
function ak(e, t, n) {
	let r = 0, i;
	return a;
	function a(t) {
		return e.enter("thematicBreak"), o(t);
	}
	function o(e) {
		return i = e, s(e);
	}
	function s(a) {
		return a === i ? (e.enter("thematicBreakSequence"), c(a)) : r >= 3 && (a === null || Z(a)) ? (e.exit("thematicBreak"), t(a)) : n(a);
	}
	function c(t) {
		return t === i ? (e.consume(t), r++, c) : (e.exit("thematicBreakSequence"), Q(t) ? $(e, s, "whitespace")(t) : s(t));
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/list.js
var ok = {
	continuation: { tokenize: uk },
	exit: fk,
	name: "list",
	tokenize: lk
}, sk = {
	partial: !0,
	tokenize: pk
}, ck = {
	partial: !0,
	tokenize: dk
};
function lk(e, t, n) {
	let r = this, i = r.events[r.events.length - 1], a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
	return s;
	function s(t) {
		let i = r.containerState.type || (t === 42 || t === 43 || t === 45 ? "listUnordered" : "listOrdered");
		if (i === "listUnordered" ? !r.containerState.marker || t === r.containerState.marker : yD(t)) {
			if (r.containerState.type || (r.containerState.type = i, e.enter(i, { _container: !0 })), i === "listUnordered") return e.enter("listItemPrefix"), t === 42 || t === 45 ? e.check(ik, n, l)(t) : l(t);
			if (!r.interrupt || t === 49) return e.enter("listItemPrefix"), e.enter("listItemValue"), c(t);
		}
		return n(t);
	}
	function c(t) {
		return yD(t) && ++o < 10 ? (e.consume(t), c) : (!r.interrupt || o < 2) && (r.containerState.marker ? t === r.containerState.marker : t === 41 || t === 46) ? (e.exit("listItemValue"), l(t)) : n(t);
	}
	function l(t) {
		return e.enter("listItemMarker"), e.consume(t), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || t, e.check(VD, r.interrupt ? n : u, e.attempt(sk, f, d));
	}
	function u(e) {
		return r.containerState.initialBlankLine = !0, a++, f(e);
	}
	function d(t) {
		return Q(t) ? (e.enter("listItemPrefixWhitespace"), e.consume(t), e.exit("listItemPrefixWhitespace"), f) : n(t);
	}
	function f(n) {
		return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(n);
	}
}
function uk(e, t, n) {
	let r = this;
	return r.containerState._closeFlow = void 0, e.check(VD, i, a);
	function i(n) {
		return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, $(e, t, "listItemIndent", r.containerState.size + 1)(n);
	}
	function a(n) {
		return r.containerState.furtherBlankLines || !Q(n) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(n)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(ck, t, o)(n));
	}
	function o(i) {
		return r.containerState._closeFlow = !0, r.interrupt = void 0, $(e, e.attempt(ok, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i);
	}
}
function dk(e, t, n) {
	let r = this;
	return $(e, i, "listItemIndent", r.containerState.size + 1);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return i && i[1].type === "listItemIndent" && i[2].sliceSerialize(i[1], !0).length === r.containerState.size ? t(e) : n(e);
	}
}
function fk(e) {
	e.exit(this.containerState.type);
}
function pk(e, t, n) {
	let r = this;
	return $(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return !Q(e) && i && i[1].type === "listItemPrefixWhitespace" ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/setext-underline.js
var mk = {
	name: "setextUnderline",
	resolveTo: hk,
	tokenize: gk
};
function hk(e, t) {
	let n = e.length, r, i, a;
	for (; n--;) if (e[n][0] === "enter") {
		if (e[n][1].type === "content") {
			r = n;
			break;
		}
		e[n][1].type === "paragraph" && (i = n);
	} else e[n][1].type === "content" && e.splice(n, 1), !a && e[n][1].type === "definition" && (a = n);
	let o = {
		type: "setextHeading",
		start: { ...e[r][1].start },
		end: { ...e[e.length - 1][1].end }
	};
	return e[i][1].type = "setextHeadingText", a ? (e.splice(i, 0, [
		"enter",
		o,
		t
	]), e.splice(a + 1, 0, [
		"exit",
		e[r][1],
		t
	]), e[r][1].end = { ...e[a][1].end }) : e[r][1] = o, e.push([
		"exit",
		o,
		t
	]), e;
}
function gk(e, t, n) {
	let r = this, i;
	return a;
	function a(t) {
		let a = r.events.length, s;
		for (; a--;) if (r.events[a][1].type !== "lineEnding" && r.events[a][1].type !== "linePrefix" && r.events[a][1].type !== "content") {
			s = r.events[a][1].type === "paragraph";
			break;
		}
		return !r.parser.lazy[r.now().line] && (r.interrupt || s) ? (e.enter("setextHeadingLine"), i = t, o(t)) : n(t);
	}
	function o(t) {
		return e.enter("setextHeadingLineSequence"), s(t);
	}
	function s(t) {
		return t === i ? (e.consume(t), s) : (e.exit("setextHeadingLineSequence"), Q(t) ? $(e, c, "lineSuffix")(t) : c(t));
	}
	function c(r) {
		return r === null || Z(r) ? (e.exit("setextHeadingLine"), t(r)) : n(r);
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/flow.js
var _k = { tokenize: vk };
function vk(e) {
	let t = this, n = e.attempt(VD, r, e.attempt(this.parser.constructs.flowInitial, i, $(e, e.attempt(this.parser.constructs.flow, i, e.attempt(pO, i)), "linePrefix")));
	return n;
	function r(r) {
		if (r === null) {
			e.consume(r);
			return;
		}
		return e.enter("lineEndingBlank"), e.consume(r), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
	}
	function i(r) {
		if (r === null) {
			e.consume(r);
			return;
		}
		return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), t.currentConstruct = void 0, n;
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/text.js
var yk = { resolveAll: Ck() }, bk = Sk("string"), xk = Sk("text");
function Sk(e) {
	return {
		resolveAll: Ck(e === "text" ? wk : void 0),
		tokenize: t
	};
	function t(t) {
		let n = this, r = this.parser.constructs[e], i = t.attempt(r, a, o);
		return a;
		function a(e) {
			return c(e) ? i(e) : o(e);
		}
		function o(e) {
			if (e === null) {
				t.consume(e);
				return;
			}
			return t.enter("data"), t.consume(e), s;
		}
		function s(e) {
			return c(e) ? (t.exit("data"), i(e)) : (t.consume(e), s);
		}
		function c(e) {
			if (e === null) return !0;
			let t = r[e], i = -1;
			if (t) for (; ++i < t.length;) {
				let e = t[i];
				if (!e.previous || e.previous.call(n, n.previous)) return !0;
			}
			return !1;
		}
	}
}
function Ck(e) {
	return t;
	function t(t, n) {
		let r = -1, i;
		for (; ++r <= t.length;) i === void 0 ? t[r] && t[r][1].type === "data" && (i = r, r++) : (!t[r] || t[r][1].type !== "data") && (r !== i + 2 && (t[i][1].end = t[r - 1][1].end, t.splice(i + 2, r - i - 2), r = i + 2), i = void 0);
		return e ? e(t, n) : t;
	}
}
function wk(e, t) {
	let n = 0;
	for (; ++n <= e.length;) if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
		let r = e[n - 1][1], i = t.sliceStream(r), a = i.length, o = -1, s = 0, c;
		for (; a--;) {
			let e = i[a];
			if (typeof e == "string") {
				for (o = e.length; e.charCodeAt(o - 1) === 32;) s++, o--;
				if (o) break;
				o = -1;
			} else if (e === -2) c = !0, s++;
			else if (e !== -1) {
				a++;
				break;
			}
		}
		if (t._contentTypeTextTrailing && n === e.length && (s = 0), s) {
			let i = {
				type: n === e.length || c || s < 2 ? "lineSuffix" : "hardBreakTrailing",
				start: {
					_bufferIndex: a ? o : r.start._bufferIndex + o,
					_index: r.start._index + a,
					line: r.end.line,
					column: r.end.column - s,
					offset: r.end.offset - s
				},
				end: { ...r.end }
			};
			r.end = { ...i.start }, r.start.offset === r.end.offset ? Object.assign(r, i) : (e.splice(n, 0, [
				"enter",
				i,
				t
			], [
				"exit",
				i,
				t
			]), n += 2);
		}
		n++;
	}
	return e;
}
//#endregion
//#region node_modules/micromark/lib/constructs.js
var Tk = /* @__PURE__ */ t({
	attentionMarkers: () => Nk,
	contentInitial: () => Dk,
	disable: () => Pk,
	document: () => Ek,
	flow: () => kk,
	flowInitial: () => Ok,
	insideSpan: () => Mk,
	string: () => Ak,
	text: () => jk
}), Ek = {
	42: ok,
	43: ok,
	45: ok,
	48: ok,
	49: ok,
	50: ok,
	51: ok,
	52: ok,
	53: ok,
	54: ok,
	55: ok,
	56: ok,
	57: ok,
	62: UD
}, Dk = { 91: SO }, Ok = {
	[-2]: tO,
	[-1]: tO,
	32: tO
}, kk = {
	35: OO,
	42: ik,
	45: [mk, ik],
	60: NO,
	61: mk,
	95: ik,
	96: QD,
	126: QD
}, Ak = {
	38: YD,
	92: qD
}, jk = {
	[-5]: nk,
	[-4]: nk,
	[-3]: nk,
	33: QO,
	38: YD,
	42: FD,
	60: [zD, BO],
	91: ek,
	92: [EO, qD],
	93: HO,
	95: FD,
	96: aO
}, Mk = { null: [FD, yk] }, Nk = { null: [42, 95] }, Pk = { null: [] };
//#endregion
//#region node_modules/micromark/lib/create-tokenizer.js
function Fk(e, t, n) {
	let r = {
		_bufferIndex: -1,
		_index: 0,
		line: n && n.line || 1,
		column: n && n.column || 1,
		offset: n && n.offset || 0
	}, i = {}, a = [], o = [], s = [], c = {
		attempt: C(x),
		check: C(S),
		consume: v,
		enter: y,
		exit: b,
		interrupt: C(S, { interrupt: !0 })
	}, l = {
		code: null,
		containerState: {},
		defineSkip: h,
		events: [],
		now: m,
		parser: e,
		previous: null,
		sliceSerialize: f,
		sliceStream: p,
		write: d
	}, u = t.tokenize.call(l, c);
	return t.resolveAll && a.push(t), l;
	function d(e) {
		return o = cD(o, e), g(), o[o.length - 1] === null ? (w(t, 0), l.events = PD(a, l.events, l), l.events) : [];
	}
	function f(e, t) {
		return Lk(p(e), t);
	}
	function p(e) {
		return Ik(o, e);
	}
	function m() {
		let { _bufferIndex: e, _index: t, line: n, column: i, offset: a } = r;
		return {
			_bufferIndex: e,
			_index: t,
			line: n,
			column: i,
			offset: a
		};
	}
	function h(e) {
		i[e.line] = e.column, E();
	}
	function g() {
		let e;
		for (; r._index < o.length;) {
			let t = o[r._index];
			if (typeof t == "string") for (e = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === e && r._bufferIndex < t.length;) _(t.charCodeAt(r._bufferIndex));
			else _(t);
		}
	}
	function _(e) {
		u = u(e);
	}
	function v(e) {
		Z(e) ? (r.line++, r.column = 1, r.offset += e === -3 ? 2 : 1, E()) : e !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === o[r._index].length && (r._bufferIndex = -1, r._index++)), l.previous = e;
	}
	function y(e, t) {
		let n = t || {};
		return n.type = e, n.start = m(), l.events.push([
			"enter",
			n,
			l
		]), s.push(n), n;
	}
	function b(e) {
		let t = s.pop();
		return t.end = m(), l.events.push([
			"exit",
			t,
			l
		]), t;
	}
	function x(e, t) {
		w(e, t.from);
	}
	function S(e, t) {
		t.restore();
	}
	function C(e, t) {
		return n;
		function n(n, r, i) {
			let a, o, s, u;
			return Array.isArray(n) ? f(n) : "tokenize" in n ? f([n]) : d(n);
			function d(e) {
				return t;
				function t(t) {
					let n = t !== null && e[t], r = t !== null && e.null;
					return f([...Array.isArray(n) ? n : n ? [n] : [], ...Array.isArray(r) ? r : r ? [r] : []])(t);
				}
			}
			function f(e) {
				return a = e, o = 0, e.length === 0 ? i : p(e[o]);
			}
			function p(e) {
				return n;
				function n(n) {
					return u = T(), s = e, e.partial || (l.currentConstruct = e), e.name && l.parser.constructs.disable.null.includes(e.name) ? h(n) : e.tokenize.call(t ? Object.assign(Object.create(l), t) : l, c, m, h)(n);
				}
			}
			function m(t) {
				return e(s, u), r;
			}
			function h(e) {
				return u.restore(), ++o < a.length ? p(a[o]) : i;
			}
		}
	}
	function w(e, t) {
		e.resolveAll && !a.includes(e) && a.push(e), e.resolve && sD(l.events, t, l.events.length - t, e.resolve(l.events.slice(t), l)), e.resolveTo && (l.events = e.resolveTo(l.events, l));
	}
	function T() {
		let e = m(), t = l.previous, n = l.currentConstruct, i = l.events.length, a = Array.from(s);
		return {
			from: i,
			restore: o
		};
		function o() {
			r = e, l.previous = t, l.currentConstruct = n, l.events.length = i, s = a, E();
		}
	}
	function E() {
		r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
	}
}
function Ik(e, t) {
	let n = t.start._index, r = t.start._bufferIndex, i = t.end._index, a = t.end._bufferIndex, o;
	if (n === i) o = [e[n].slice(r, a)];
	else {
		if (o = e.slice(n, i), r > -1) {
			let e = o[0];
			typeof e == "string" ? o[0] = e.slice(r) : o.shift();
		}
		a > 0 && o.push(e[i].slice(0, a));
	}
	return o;
}
function Lk(e, t) {
	let n = -1, r = [], i;
	for (; ++n < e.length;) {
		let a = e[n], o;
		if (typeof a == "string") o = a;
		else switch (a) {
			case -5:
				o = "\r";
				break;
			case -4:
				o = "\n";
				break;
			case -3:
				o = "\r\n";
				break;
			case -2:
				o = t ? " " : "	";
				break;
			case -1:
				if (!t && i) continue;
				o = " ";
				break;
			default: o = String.fromCharCode(a);
		}
		i = a === -2, r.push(o);
	}
	return r.join("");
}
//#endregion
//#region node_modules/micromark/lib/parse.js
function Rk(e) {
	let t = {
		constructs: uD([Tk, ...(e || {}).extensions || []]),
		content: n(DD),
		defined: [],
		document: n(kD),
		flow: n(_k),
		lazy: {},
		string: n(bk),
		text: n(xk)
	};
	return t;
	function n(e) {
		return n;
		function n(n) {
			return Fk(t, e, n);
		}
	}
}
//#endregion
//#region node_modules/micromark/lib/postprocess.js
function zk(e) {
	for (; !dO(e););
	return e;
}
//#endregion
//#region node_modules/micromark/lib/preprocess.js
var Bk = /[\0\t\n\r]/g;
function Vk() {
	let e = 1, t = "", n = !0, r;
	return i;
	function i(i, a, o) {
		let s = [], c, l, u, d, f;
		for (i = t + (typeof i == "string" ? i.toString() : new TextDecoder(a || void 0).decode(i)), u = 0, t = "", n &&= (i.charCodeAt(0) === 65279 && u++, void 0); u < i.length;) {
			if (Bk.lastIndex = u, c = Bk.exec(i), d = c && c.index !== void 0 ? c.index : i.length, f = i.charCodeAt(d), !c) {
				t = i.slice(u);
				break;
			}
			if (f === 10 && u === d && r) s.push(-3), r = void 0;
			else switch (r &&= (s.push(-5), void 0), u < d && (s.push(i.slice(u, d)), e += d - u), f) {
				case 0:
					s.push(65533), e++;
					break;
				case 9:
					for (l = Math.ceil(e / 4) * 4, s.push(-2); e++ < l;) s.push(-1);
					break;
				case 10:
					s.push(-4), e = 1;
					break;
				default: r = !0, e = 1;
			}
			u = d + 1;
		}
		return o && (r && s.push(-5), t && s.push(t), s.push(null)), s;
	}
}
//#endregion
//#region node_modules/micromark-util-decode-string/index.js
var Hk = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Uk(e) {
	return e.replace(Hk, Wk);
}
function Wk(e, t, n) {
	if (t) return t;
	if (n.charCodeAt(0) === 35) {
		let e = n.charCodeAt(1), t = e === 120 || e === 88;
		return pD(n.slice(t ? 2 : 1), t ? 16 : 10);
	}
	return oD(n) || e;
}
//#endregion
//#region node_modules/mdast-util-from-markdown/lib/index.js
var Gk = {}.hasOwnProperty;
function Kk(e, t, n) {
	return t && typeof t == "object" && (n = t, t = void 0), qk(n)(zk(Rk(n).document().write(Vk()(e, t, !0))));
}
function qk(e) {
	let t = {
		transforms: [],
		canContainEols: [
			"emphasis",
			"fragment",
			"heading",
			"paragraph",
			"strong"
		],
		enter: {
			autolink: a(_e),
			autolinkProtocol: T,
			autolinkEmail: T,
			atxHeading: a(pe),
			blockQuote: a(ce),
			characterEscape: T,
			characterReference: T,
			codeFenced: a(le),
			codeFencedFenceInfo: o,
			codeFencedFenceMeta: o,
			codeIndented: a(le, o),
			codeText: a(ue, o),
			codeTextData: T,
			data: T,
			codeFlowValue: T,
			definition: a(de),
			definitionDestinationString: o,
			definitionLabelString: o,
			definitionTitleString: o,
			emphasis: a(fe),
			hardBreakEscape: a(me),
			hardBreakTrailing: a(me),
			htmlFlow: a(he, o),
			htmlFlowData: T,
			htmlText: a(he, o),
			htmlTextData: T,
			image: a(ge),
			label: o,
			link: a(_e),
			listItem: a(ye),
			listItemValue: f,
			listOrdered: a(ve, d),
			listUnordered: a(ve),
			paragraph: a(be),
			reference: ne,
			referenceString: o,
			resourceDestinationString: o,
			resourceTitleString: o,
			setextHeading: a(pe),
			strong: a(xe),
			thematicBreak: a(Ce)
		},
		exit: {
			atxHeading: c(),
			atxHeadingSequence: x,
			autolink: c(),
			autolinkEmail: se,
			autolinkProtocol: oe,
			blockQuote: c(),
			characterEscapeValue: E,
			characterReferenceMarkerHexadecimal: L,
			characterReferenceMarkerNumeric: L,
			characterReferenceValue: ie,
			characterReference: ae,
			codeFenced: c(g),
			codeFencedFence: h,
			codeFencedFenceInfo: p,
			codeFencedFenceMeta: m,
			codeFlowValue: E,
			codeIndented: c(_),
			codeText: c(j),
			codeTextData: E,
			data: E,
			definition: c(),
			definitionDestinationString: b,
			definitionLabelString: v,
			definitionTitleString: y,
			emphasis: c(),
			hardBreakEscape: c(O),
			hardBreakTrailing: c(O),
			htmlFlow: c(k),
			htmlFlowData: E,
			htmlText: c(A),
			htmlTextData: E,
			image: c(N),
			label: F,
			labelText: P,
			lineEnding: D,
			link: c(M),
			listItem: c(),
			listOrdered: c(),
			listUnordered: c(),
			paragraph: c(),
			referenceString: re,
			resourceDestinationString: I,
			resourceTitleString: ee,
			resource: te,
			setextHeading: c(w),
			setextHeadingLineSequence: C,
			setextHeadingText: S,
			strong: c(),
			thematicBreak: c()
		}
	};
	Yk(t, (e || {}).mdastExtensions || []);
	let n = {};
	return r;
	function r(e) {
		let r = {
			type: "root",
			children: []
		}, a = {
			stack: [r],
			tokenStack: [],
			config: t,
			enter: s,
			exit: l,
			buffer: o,
			resume: u,
			data: n
		}, c = [], d = -1;
		for (; ++d < e.length;) (e[d][1].type === "listOrdered" || e[d][1].type === "listUnordered") && (e[d][0] === "enter" ? c.push(d) : d = i(e, c.pop(), d));
		for (d = -1; ++d < e.length;) {
			let n = t[e[d][0]];
			Gk.call(n, e[d][1].type) && n[e[d][1].type].call(Object.assign({ sliceSerialize: e[d][2].sliceSerialize }, a), e[d][1]);
		}
		if (a.tokenStack.length > 0) {
			let e = a.tokenStack[a.tokenStack.length - 1];
			(e[1] || Zk).call(a, void 0, e[0]);
		}
		for (r.position = {
			start: Jk(e.length > 0 ? e[0][1].start : {
				line: 1,
				column: 1,
				offset: 0
			}),
			end: Jk(e.length > 0 ? e[e.length - 2][1].end : {
				line: 1,
				column: 1,
				offset: 0
			})
		}, d = -1; ++d < t.transforms.length;) r = t.transforms[d](r) || r;
		return r;
	}
	function i(e, t, n) {
		let r = t - 1, i = -1, a = !1, o, s, c, l;
		for (; ++r <= n;) {
			let t = e[r];
			switch (t[1].type) {
				case "listUnordered":
				case "listOrdered":
				case "blockQuote":
					t[0] === "enter" ? i++ : i--, l = void 0;
					break;
				case "lineEndingBlank":
					t[0] === "enter" && (o && !l && !i && !c && (c = r), l = void 0);
					break;
				case "linePrefix":
				case "listItemValue":
				case "listItemMarker":
				case "listItemPrefix":
				case "listItemPrefixWhitespace": break;
				default: l = void 0;
			}
			if (!i && t[0] === "enter" && t[1].type === "listItemPrefix" || i === -1 && t[0] === "exit" && (t[1].type === "listUnordered" || t[1].type === "listOrdered")) {
				if (o) {
					let i = r;
					for (s = void 0; i--;) {
						let t = e[i];
						if (t[1].type === "lineEnding" || t[1].type === "lineEndingBlank") {
							if (t[0] === "exit") continue;
							s && (e[s][1].type = "lineEndingBlank", a = !0), t[1].type = "lineEnding", s = i;
						} else if (t[1].type !== "linePrefix" && t[1].type !== "blockQuotePrefix" && t[1].type !== "blockQuotePrefixWhitespace" && t[1].type !== "blockQuoteMarker" && t[1].type !== "listItemIndent") break;
					}
					c && (!s || c < s) && (o._spread = !0), o.end = Object.assign({}, s ? e[s][1].start : t[1].end), e.splice(s || r, 0, [
						"exit",
						o,
						t[2]
					]), r++, n++;
				}
				if (t[1].type === "listItemPrefix") {
					let i = {
						type: "listItem",
						_spread: !1,
						start: Object.assign({}, t[1].start),
						end: void 0
					};
					o = i, e.splice(r, 0, [
						"enter",
						i,
						t[2]
					]), r++, n++, c = void 0, l = !0;
				}
			}
		}
		return e[t][1]._spread = a, n;
	}
	function a(e, t) {
		return n;
		function n(n) {
			s.call(this, e(n), n), t && t.call(this, n);
		}
	}
	function o() {
		this.stack.push({
			type: "fragment",
			children: []
		});
	}
	function s(e, t, n) {
		this.stack[this.stack.length - 1].children.push(e), this.stack.push(e), this.tokenStack.push([t, n || void 0]), e.position = {
			start: Jk(t.start),
			end: void 0
		};
	}
	function c(e) {
		return t;
		function t(t) {
			e && e.call(this, t), l.call(this, t);
		}
	}
	function l(e, t) {
		let n = this.stack.pop(), r = this.tokenStack.pop();
		if (r) r[0].type !== e.type && (t ? t.call(this, e, r[0]) : (r[1] || Zk).call(this, e, r[0]));
		else throw Error("Cannot close `" + e.type + "` (" + yE({
			start: e.start,
			end: e.end
		}) + "): it’s not open");
		n.position.end = Jk(e.end);
	}
	function u() {
		return tD(this.stack.pop());
	}
	function d() {
		this.data.expectingFirstListItemValue = !0;
	}
	function f(e) {
		if (this.data.expectingFirstListItemValue) {
			let t = this.stack[this.stack.length - 2];
			t.start = Number.parseInt(this.sliceSerialize(e), 10), this.data.expectingFirstListItemValue = void 0;
		}
	}
	function p() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.lang = e;
	}
	function m() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.meta = e;
	}
	function h() {
		this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
	}
	function g() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
	}
	function _() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e.replace(/(\r?\n|\r)$/g, "");
	}
	function v(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.label = t, n.identifier = mD(this.sliceSerialize(e)).toLowerCase();
	}
	function y() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.title = e;
	}
	function b() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.url = e;
	}
	function x(e) {
		let t = this.stack[this.stack.length - 1];
		t.depth ||= this.sliceSerialize(e).length;
	}
	function S() {
		this.data.setextHeadingSlurpLineEnding = !0;
	}
	function C(e) {
		let t = this.stack[this.stack.length - 1];
		t.depth = this.sliceSerialize(e).codePointAt(0) === 61 ? 1 : 2;
	}
	function w() {
		this.data.setextHeadingSlurpLineEnding = void 0;
	}
	function T(e) {
		let t = this.stack[this.stack.length - 1].children, n = t[t.length - 1];
		(!n || n.type !== "text") && (n = Se(), n.position = {
			start: Jk(e.start),
			end: void 0
		}, t.push(n)), this.stack.push(n);
	}
	function E(e) {
		let t = this.stack.pop();
		t.value += this.sliceSerialize(e), t.position.end = Jk(e.end);
	}
	function D(e) {
		let n = this.stack[this.stack.length - 1];
		if (this.data.atHardBreak) {
			let t = n.children[n.children.length - 1];
			t.position.end = Jk(e.end), this.data.atHardBreak = void 0;
			return;
		}
		!this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(n.type) && (T.call(this, e), E.call(this, e));
	}
	function O() {
		this.data.atHardBreak = !0;
	}
	function k() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function A() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function j() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function M() {
		let e = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			let t = this.data.referenceType || "shortcut";
			e.type += "Reference", e.referenceType = t, delete e.url, delete e.title;
		} else delete e.identifier, delete e.label;
		this.data.referenceType = void 0;
	}
	function N() {
		let e = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			let t = this.data.referenceType || "shortcut";
			e.type += "Reference", e.referenceType = t, delete e.url, delete e.title;
		} else delete e.identifier, delete e.label;
		this.data.referenceType = void 0;
	}
	function P(e) {
		let t = this.sliceSerialize(e), n = this.stack[this.stack.length - 2];
		n.label = Uk(t), n.identifier = mD(t).toLowerCase();
	}
	function F() {
		let e = this.stack[this.stack.length - 1], t = this.resume(), n = this.stack[this.stack.length - 1];
		this.data.inReference = !0, n.type === "link" ? n.children = e.children : n.alt = t;
	}
	function I() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.url = e;
	}
	function ee() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.title = e;
	}
	function te() {
		this.data.inReference = void 0;
	}
	function ne() {
		this.data.referenceType = "collapsed";
	}
	function re(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.label = t, n.identifier = mD(this.sliceSerialize(e)).toLowerCase(), this.data.referenceType = "full";
	}
	function L(e) {
		this.data.characterReferenceType = e.type;
	}
	function ie(e) {
		let t = this.sliceSerialize(e), n = this.data.characterReferenceType, r;
		n ? (r = pD(t, n === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : r = oD(t);
		let i = this.stack[this.stack.length - 1];
		i.value += r;
	}
	function ae(e) {
		let t = this.stack.pop();
		t.position.end = Jk(e.end);
	}
	function oe(e) {
		E.call(this, e);
		let t = this.stack[this.stack.length - 1];
		t.url = this.sliceSerialize(e);
	}
	function se(e) {
		E.call(this, e);
		let t = this.stack[this.stack.length - 1];
		t.url = "mailto:" + this.sliceSerialize(e);
	}
	function ce() {
		return {
			type: "blockquote",
			children: []
		};
	}
	function le() {
		return {
			type: "code",
			lang: null,
			meta: null,
			value: ""
		};
	}
	function ue() {
		return {
			type: "inlineCode",
			value: ""
		};
	}
	function de() {
		return {
			type: "definition",
			identifier: "",
			label: null,
			title: null,
			url: ""
		};
	}
	function fe() {
		return {
			type: "emphasis",
			children: []
		};
	}
	function pe() {
		return {
			type: "heading",
			depth: 0,
			children: []
		};
	}
	function me() {
		return { type: "break" };
	}
	function he() {
		return {
			type: "html",
			value: ""
		};
	}
	function ge() {
		return {
			type: "image",
			title: null,
			url: "",
			alt: null
		};
	}
	function _e() {
		return {
			type: "link",
			title: null,
			url: "",
			children: []
		};
	}
	function ve(e) {
		return {
			type: "list",
			ordered: e.type === "listOrdered",
			start: null,
			spread: e._spread,
			children: []
		};
	}
	function ye(e) {
		return {
			type: "listItem",
			spread: e._spread,
			checked: null,
			children: []
		};
	}
	function be() {
		return {
			type: "paragraph",
			children: []
		};
	}
	function xe() {
		return {
			type: "strong",
			children: []
		};
	}
	function Se() {
		return {
			type: "text",
			value: ""
		};
	}
	function Ce() {
		return { type: "thematicBreak" };
	}
}
function Jk(e) {
	return {
		line: e.line,
		column: e.column,
		offset: e.offset
	};
}
function Yk(e, t) {
	let n = -1;
	for (; ++n < t.length;) {
		let r = t[n];
		Array.isArray(r) ? Yk(e, r) : Xk(e, r);
	}
}
function Xk(e, t) {
	let n;
	for (n in t) if (Gk.call(t, n)) switch (n) {
		case "canContainEols": {
			let r = t[n];
			r && e[n].push(...r);
			break;
		}
		case "transforms": {
			let r = t[n];
			r && e[n].push(...r);
			break;
		}
		case "enter":
		case "exit": {
			let r = t[n];
			r && Object.assign(e[n], r);
			break;
		}
	}
}
function Zk(e, t) {
	throw Error(e ? "Cannot close `" + e.type + "` (" + yE({
		start: e.start,
		end: e.end
	}) + "): a different token (`" + t.type + "`, " + yE({
		start: t.start,
		end: t.end
	}) + ") is open" : "Cannot close document, a token (`" + t.type + "`, " + yE({
		start: t.start,
		end: t.end
	}) + ") is still open");
}
//#endregion
//#region node_modules/remark-parse/lib/index.js
function Qk(e) {
	let t = this;
	t.parser = n;
	function n(n) {
		return Kk(n, {
			...t.data("settings"),
			...e,
			extensions: t.data("micromarkExtensions") || [],
			mdastExtensions: t.data("fromMarkdownExtensions") || []
		});
	}
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/blockquote.js
function $k(e, t) {
	let n = {
		type: "element",
		tagName: "blockquote",
		properties: {},
		children: e.wrap(e.all(t), !0)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/break.js
function eA(e, t) {
	let n = {
		type: "element",
		tagName: "br",
		properties: {},
		children: []
	};
	return e.patch(t, n), [e.applyData(t, n), {
		type: "text",
		value: "\n"
	}];
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/code.js
function tA(e, t) {
	let n = t.value ? t.value + "\n" : "", r = {}, i = t.lang ? t.lang.split(/\s+/) : [];
	i.length > 0 && (r.className = ["language-" + i[0]]);
	let a = {
		type: "element",
		tagName: "code",
		properties: r,
		children: [{
			type: "text",
			value: n
		}]
	};
	return t.meta && (a.data = { meta: t.meta }), e.patch(t, a), a = e.applyData(t, a), a = {
		type: "element",
		tagName: "pre",
		properties: {},
		children: [a]
	}, e.patch(t, a), a;
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/delete.js
function nA(e, t) {
	let n = {
		type: "element",
		tagName: "del",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/emphasis.js
function rA(e, t) {
	let n = {
		type: "element",
		tagName: "em",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js
function iA(e, t) {
	let n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = ED(r.toLowerCase()), a = e.footnoteOrder.indexOf(r), o, s = e.footnoteCounts.get(r);
	s === void 0 ? (s = 0, e.footnoteOrder.push(r), o = e.footnoteOrder.length) : o = a + 1, s += 1, e.footnoteCounts.set(r, s);
	let c = {
		type: "element",
		tagName: "a",
		properties: {
			href: "#" + n + "fn-" + i,
			id: n + "fnref-" + i + (s > 1 ? "-" + s : ""),
			dataFootnoteRef: !0,
			ariaDescribedBy: ["footnote-label"]
		},
		children: [{
			type: "text",
			value: String(o)
		}]
	};
	e.patch(t, c);
	let l = {
		type: "element",
		tagName: "sup",
		properties: {},
		children: [c]
	};
	return e.patch(t, l), e.applyData(t, l);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/heading.js
function aA(e, t) {
	let n = {
		type: "element",
		tagName: "h" + t.depth,
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/html.js
function oA(e, t) {
	if (e.options.allowDangerousHtml) {
		let n = {
			type: "raw",
			value: t.value
		};
		return e.patch(t, n), e.applyData(t, n);
	}
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/revert.js
function sA(e, t) {
	let n = t.referenceType, r = "]";
	if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference") return [{
		type: "text",
		value: "![" + t.alt + r
	}];
	let i = e.all(t), a = i[0];
	a && a.type === "text" ? a.value = "[" + a.value : i.unshift({
		type: "text",
		value: "["
	});
	let o = i[i.length - 1];
	return o && o.type === "text" ? o.value += r : i.push({
		type: "text",
		value: r
	}), i;
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/image-reference.js
function cA(e, t) {
	let n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
	if (!r) return sA(e, t);
	let i = {
		src: ED(r.url || ""),
		alt: t.alt
	};
	r.title !== null && r.title !== void 0 && (i.title = r.title);
	let a = {
		type: "element",
		tagName: "img",
		properties: i,
		children: []
	};
	return e.patch(t, a), e.applyData(t, a);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/image.js
function lA(e, t) {
	let n = { src: ED(t.url) };
	t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
	let r = {
		type: "element",
		tagName: "img",
		properties: n,
		children: []
	};
	return e.patch(t, r), e.applyData(t, r);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/inline-code.js
function uA(e, t) {
	let n = {
		type: "text",
		value: t.value.replace(/\r?\n|\r/g, " ")
	};
	e.patch(t, n);
	let r = {
		type: "element",
		tagName: "code",
		properties: {},
		children: [n]
	};
	return e.patch(t, r), e.applyData(t, r);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/link-reference.js
function dA(e, t) {
	let n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
	if (!r) return sA(e, t);
	let i = { href: ED(r.url || "") };
	r.title !== null && r.title !== void 0 && (i.title = r.title);
	let a = {
		type: "element",
		tagName: "a",
		properties: i,
		children: e.all(t)
	};
	return e.patch(t, a), e.applyData(t, a);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/link.js
function fA(e, t) {
	let n = { href: ED(t.url) };
	t.title !== null && t.title !== void 0 && (n.title = t.title);
	let r = {
		type: "element",
		tagName: "a",
		properties: n,
		children: e.all(t)
	};
	return e.patch(t, r), e.applyData(t, r);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/list-item.js
function pA(e, t, n) {
	let r = e.all(t), i = n ? mA(n) : hA(t), a = {}, o = [];
	if (typeof t.checked == "boolean") {
		let e = r[0], n;
		e && e.type === "element" && e.tagName === "p" ? n = e : (n = {
			type: "element",
			tagName: "p",
			properties: {},
			children: []
		}, r.unshift(n)), n.children.length > 0 && n.children.unshift({
			type: "text",
			value: " "
		}), n.children.unshift({
			type: "element",
			tagName: "input",
			properties: {
				type: "checkbox",
				checked: t.checked,
				disabled: !0
			},
			children: []
		}), a.className = ["task-list-item"];
	}
	let s = -1;
	for (; ++s < r.length;) {
		let e = r[s];
		(i || s !== 0 || e.type !== "element" || e.tagName !== "p") && o.push({
			type: "text",
			value: "\n"
		}), e.type === "element" && e.tagName === "p" && !i ? o.push(...e.children) : o.push(e);
	}
	let c = r[r.length - 1];
	c && (i || c.type !== "element" || c.tagName !== "p") && o.push({
		type: "text",
		value: "\n"
	});
	let l = {
		type: "element",
		tagName: "li",
		properties: a,
		children: o
	};
	return e.patch(t, l), e.applyData(t, l);
}
function mA(e) {
	let t = !1;
	if (e.type === "list") {
		t = e.spread || !1;
		let n = e.children, r = -1;
		for (; !t && ++r < n.length;) t = hA(n[r]);
	}
	return t;
}
function hA(e) {
	return e.spread ?? e.children.length > 1;
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/list.js
function gA(e, t) {
	let n = {}, r = e.all(t), i = -1;
	for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++i < r.length;) {
		let e = r[i];
		if (e.type === "element" && e.tagName === "li" && e.properties && Array.isArray(e.properties.className) && e.properties.className.includes("task-list-item")) {
			n.className = ["contains-task-list"];
			break;
		}
	}
	let a = {
		type: "element",
		tagName: t.ordered ? "ol" : "ul",
		properties: n,
		children: e.wrap(r, !0)
	};
	return e.patch(t, a), e.applyData(t, a);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/paragraph.js
function _A(e, t) {
	let n = {
		type: "element",
		tagName: "p",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/root.js
function vA(e, t) {
	let n = {
		type: "root",
		children: e.wrap(e.all(t))
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/strong.js
function yA(e, t) {
	let n = {
		type: "element",
		tagName: "strong",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/table.js
function bA(e, t) {
	let n = e.all(t), r = n.shift(), i = [];
	if (r) {
		let n = {
			type: "element",
			tagName: "thead",
			properties: {},
			children: e.wrap([r], !0)
		};
		e.patch(t.children[0], n), i.push(n);
	}
	if (n.length > 0) {
		let r = {
			type: "element",
			tagName: "tbody",
			properties: {},
			children: e.wrap(n, !0)
		}, a = gE(t.children[1]), o = hE(t.children[t.children.length - 1]);
		a && o && (r.position = {
			start: a,
			end: o
		}), i.push(r);
	}
	let a = {
		type: "element",
		tagName: "table",
		properties: {},
		children: e.wrap(i, !0)
	};
	return e.patch(t, a), e.applyData(t, a);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/table-row.js
function xA(e, t, n) {
	let r = n ? n.children : void 0, i = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", a = n && n.type === "table" ? n.align : void 0, o = a ? a.length : t.children.length, s = -1, c = [];
	for (; ++s < o;) {
		let n = t.children[s], r = {}, o = a ? a[s] : void 0;
		o && (r.align = o);
		let l = {
			type: "element",
			tagName: i,
			properties: r,
			children: []
		};
		n && (l.children = e.all(n), e.patch(n, l), l = e.applyData(n, l)), c.push(l);
	}
	let l = {
		type: "element",
		tagName: "tr",
		properties: {},
		children: e.wrap(c, !0)
	};
	return e.patch(t, l), e.applyData(t, l);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/table-cell.js
function SA(e, t) {
	let n = {
		type: "element",
		tagName: "td",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/trim-lines/index.js
var CA = 9, wA = 32;
function TA(e) {
	let t = String(e), n = /\r?\n|\r/g, r = n.exec(t), i = 0, a = [];
	for (; r;) a.push(EA(t.slice(i, r.index), i > 0, !0), r[0]), i = r.index + r[0].length, r = n.exec(t);
	return a.push(EA(t.slice(i), i > 0, !1)), a.join("");
}
function EA(e, t, n) {
	let r = 0, i = e.length;
	if (t) {
		let t = e.codePointAt(r);
		for (; t === CA || t === wA;) r++, t = e.codePointAt(r);
	}
	if (n) {
		let t = e.codePointAt(i - 1);
		for (; t === CA || t === wA;) i--, t = e.codePointAt(i - 1);
	}
	return i > r ? e.slice(r, i) : "";
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/text.js
function DA(e, t) {
	let n = {
		type: "text",
		value: TA(String(t.value))
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js
function OA(e, t) {
	let n = {
		type: "element",
		tagName: "hr",
		properties: {},
		children: []
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/index.js
var kA = {
	blockquote: $k,
	break: eA,
	code: tA,
	delete: nA,
	emphasis: rA,
	footnoteReference: iA,
	heading: aA,
	html: oA,
	imageReference: cA,
	image: lA,
	inlineCode: uA,
	linkReference: dA,
	link: fA,
	listItem: pA,
	list: gA,
	paragraph: _A,
	root: vA,
	strong: yA,
	table: bA,
	tableCell: SA,
	tableRow: xA,
	text: DA,
	thematicBreak: OA,
	toml: AA,
	yaml: AA,
	definition: AA,
	footnoteDefinition: AA
};
function AA() {}
//#endregion
//#region node_modules/@ungap/structured-clone/esm/deserialize.js
var { defineProperty: jA } = Object, MA = typeof self == "object" ? self : globalThis, NA = (e, t) => {
	switch (e) {
		case "Function":
		case "SharedWorker":
		case "Worker":
		case "eval":
		case "setInterval":
		case "setTimeout": throw TypeError("unable to deserialize " + e);
	}
	return new MA[e](t);
}, PA = (e, t) => {
	let n = (t, n) => (e.set(n, t), t), r = (i) => {
		if (e.has(i)) return e.get(i);
		let [a, o] = t[i];
		switch (a) {
			case 0:
			case -1: return n(o, i);
			case 1: {
				let e = n([], i);
				for (let t of o) e.push(r(t));
				return e;
			}
			case 2: {
				let e = n({}, i);
				for (let [t, n] of o) {
					let i = r(t), a = r(n);
					i === "__proto__" ? jA(e, i, {
						value: a,
						configurable: !0,
						enumerable: !0,
						writable: !0
					}) : e[i] = a;
				}
				return e;
			}
			case 3: return n(new Date(o), i);
			case 4: {
				let { source: e, flags: t } = o;
				return n(new RegExp(e, t), i);
			}
			case 5: {
				let e = n(/* @__PURE__ */ new Map(), i);
				for (let [t, n] of o) e.set(r(t), r(n));
				return e;
			}
			case 6: {
				let e = n(/* @__PURE__ */ new Set(), i);
				for (let t of o) e.add(r(t));
				return e;
			}
			case 7: {
				let { name: e, message: t } = o;
				return n(typeof MA[e] == "function" ? NA(e, t) : Error(t), i);
			}
			case 8: return n(BigInt(o), i);
			case "BigInt": return n(Object(BigInt(o)), i);
			case "ArrayBuffer": return n(new Uint8Array(o).buffer, o);
			case "DataView": {
				let { buffer: e } = new Uint8Array(o);
				return n(new DataView(e), o);
			}
			case "-0": return -0;
		}
		return n(NA(a, o), i);
	};
	return r;
}, FA = (e) => PA(/* @__PURE__ */ new Map(), e)(0), IA = "", { toString: LA } = {}, { keys: RA, is: zA } = Object, BA = (e) => {
	let t = typeof e;
	if (t !== "object" || !e) return [0, t];
	let n = LA.call(e).slice(8, -1);
	switch (n) {
		case "Array": return [1, IA];
		case "Object": return [2, IA];
		case "Date": return [3, IA];
		case "RegExp": return [4, IA];
		case "Map": return [5, IA];
		case "Set": return [6, IA];
		case "DataView": return [1, n];
	}
	return n.includes("Array") ? [1, n] : e instanceof Error ? [7, e.name || "Error"] : [2, n];
}, VA = ([e, t]) => e === 0 && (t === "function" || t === "symbol"), HA = (e, t, n, r) => {
	let i = (e, t) => {
		let i = r.push(e) - 1;
		return n.set(t, i), i;
	}, a = (o) => {
		if (n.has(o)) return n.get(o);
		let [s, c] = BA(o);
		switch (s) {
			case 0: {
				let t = o;
				switch (c) {
					case "bigint":
						s = 8, t = o.toString();
						break;
					case "number":
						if (!o && zA(o, -0)) return r.push(["-0"]) - 1;
						break;
					case "function":
					case "symbol":
						if (e) throw TypeError("unable to serialize " + c);
						t = null;
						break;
					case "undefined": return i([-1], o);
				}
				return i([s, t], o);
			}
			case 1: {
				if (c) {
					let e = o;
					return c === "DataView" ? e = new Uint8Array(o.buffer) : c === "ArrayBuffer" && (e = new Uint8Array(o)), i([c, [...e]], o);
				}
				let e = [], t = i([s, e], o);
				for (let t of o) e.push(a(t));
				return t;
			}
			case 2: {
				if (c) switch (c) {
					case "BigInt": return i([c, o.toString()], o);
					case "Boolean":
					case "Number":
					case "String": return i([c, o.valueOf()], o);
				}
				if (t && "toJSON" in o) return a(o.toJSON());
				let n = [], r = i([s, n], o);
				for (let t of RA(o)) (e || !VA(BA(o[t]))) && n.push([a(t), a(o[t])]);
				return r;
			}
			case 3: return i([s, isNaN(o.getTime()) ? IA : o.toISOString()], o);
			case 4: {
				let { source: e, flags: t } = o;
				return i([s, {
					source: e,
					flags: t
				}], o);
			}
			case 5: {
				let t = [], n = i([s, t], o);
				for (let [n, r] of o) (e || !(VA(BA(n)) || VA(BA(r)))) && t.push([a(n), a(r)]);
				return n;
			}
			case 6: {
				let t = [], n = i([s, t], o);
				for (let n of o) (e || !VA(BA(n))) && t.push(a(n));
				return n;
			}
		}
		let { message: l } = o;
		return i([s, {
			name: c,
			message: l
		}], o);
	};
	return a;
}, UA = (e, { json: t, lossy: n } = {}) => {
	let r = [];
	return HA(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, WA = typeof structuredClone == "function" ? 
/* c8 ignore start */
(e, t) => t && ("json" in t || "lossy" in t) ? FA(UA(e, t)) : structuredClone(e) : (e, t) => FA(UA(e, t));
//#endregion
//#region node_modules/mdast-util-to-hast/lib/footer.js
function GA(e, t) {
	let n = [{
		type: "text",
		value: "↩"
	}];
	return t > 1 && n.push({
		type: "element",
		tagName: "sup",
		properties: {},
		children: [{
			type: "text",
			value: String(t)
		}]
	}), n;
}
function KA(e, t) {
	return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function qA(e) {
	let t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || GA, r = e.options.footnoteBackLabel || KA, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || { className: ["sr-only"] }, s = [], c = -1;
	for (; ++c < e.footnoteOrder.length;) {
		let i = e.footnoteById.get(e.footnoteOrder[c]);
		if (!i) continue;
		let a = e.all(i), o = String(i.identifier).toUpperCase(), l = ED(o.toLowerCase()), u = 0, d = [], f = e.footnoteCounts.get(o);
		for (; f !== void 0 && ++u <= f;) {
			d.length > 0 && d.push({
				type: "text",
				value: " "
			});
			let e = typeof n == "string" ? n : n(c, u);
			typeof e == "string" && (e = {
				type: "text",
				value: e
			}), d.push({
				type: "element",
				tagName: "a",
				properties: {
					href: "#" + t + "fnref-" + l + (u > 1 ? "-" + u : ""),
					dataFootnoteBackref: "",
					ariaLabel: typeof r == "string" ? r : r(c, u),
					className: ["data-footnote-backref"]
				},
				children: Array.isArray(e) ? e : [e]
			});
		}
		let p = a[a.length - 1];
		if (p && p.type === "element" && p.tagName === "p") {
			let e = p.children[p.children.length - 1];
			e && e.type === "text" ? e.value += " " : p.children.push({
				type: "text",
				value: " "
			}), p.children.push(...d);
		} else a.push(...d);
		let m = {
			type: "element",
			tagName: "li",
			properties: { id: t + "fn-" + l },
			children: e.wrap(a, !0)
		};
		e.patch(i, m), s.push(m);
	}
	if (s.length !== 0) return {
		type: "element",
		tagName: "section",
		properties: {
			dataFootnotes: !0,
			className: ["footnotes"]
		},
		children: [
			{
				type: "element",
				tagName: a,
				properties: {
					...WA(o),
					id: "footnote-label"
				},
				children: [{
					type: "text",
					value: i
				}]
			},
			{
				type: "text",
				value: "\n"
			},
			{
				type: "element",
				tagName: "ol",
				properties: {},
				children: e.wrap(s, !0)
			},
			{
				type: "text",
				value: "\n"
			}
		]
	};
}
//#endregion
//#region node_modules/unist-util-is/lib/index.js
var JA = (function(e) {
	if (e == null) return $A;
	if (typeof e == "function") return QA(e);
	if (typeof e == "object") return Array.isArray(e) ? YA(e) : XA(e);
	if (typeof e == "string") return ZA(e);
	throw Error("Expected function, string, or object as test");
});
function YA(e) {
	let t = [], n = -1;
	for (; ++n < e.length;) t[n] = JA(e[n]);
	return QA(r);
	function r(...e) {
		let n = -1;
		for (; ++n < t.length;) if (t[n].apply(this, e)) return !0;
		return !1;
	}
}
function XA(e) {
	let t = e;
	return QA(n);
	function n(n) {
		let r = n, i;
		for (i in e) if (r[i] !== t[i]) return !1;
		return !0;
	}
}
function ZA(e) {
	return QA(t);
	function t(t) {
		return t && t.type === e;
	}
}
function QA(e) {
	return t;
	function t(t, n, r) {
		return !!(ej(t) && e.call(this, t, typeof n == "number" ? n : void 0, r || void 0));
	}
}
function $A() {
	return !0;
}
function ej(e) {
	return typeof e == "object" && !!e && "type" in e;
}
//#endregion
//#region node_modules/unist-util-visit-parents/lib/color.js
function tj(e) {
	return e;
}
//#endregion
//#region node_modules/unist-util-visit-parents/lib/index.js
var nj = [];
function rj(e, t, n, r) {
	let i;
	typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
	let a = JA(i), o = r ? -1 : 1;
	s(e, void 0, [])();
	function s(e, i, c) {
		let l = e && typeof e == "object" ? e : {};
		if (typeof l.type == "string") {
			let t = typeof l.tagName == "string" ? l.tagName : typeof l.name == "string" ? l.name : void 0;
			Object.defineProperty(u, "name", { value: "node (" + tj(e.type + (t ? "<" + t + ">" : "")) + ")" });
		}
		return u;
		function u() {
			let l = nj, u, d, f;
			if ((!t || a(e, i, c[c.length - 1] || void 0)) && (l = ij(n(e, c)), l[0] === !1)) return l;
			if ("children" in e && e.children) {
				let t = e;
				if (t.children && l[0] !== "skip") for (d = (r ? t.children.length : -1) + o, f = c.concat(t); d > -1 && d < t.children.length;) {
					let e = t.children[d];
					if (u = s(e, d, f)(), u[0] === !1) return u;
					d = typeof u[1] == "number" ? u[1] : d + o;
				}
			}
			return l;
		}
	}
}
function ij(e) {
	return Array.isArray(e) ? e : typeof e == "number" ? [!0, e] : e == null ? nj : [e];
}
//#endregion
//#region node_modules/unist-util-visit/lib/index.js
function aj(e, t, n, r) {
	let i, a, o;
	typeof t == "function" && typeof n != "function" ? (a = void 0, o = t, i = n) : (a = t, o = n, i = r), rj(e, a, s, i);
	function s(e, t) {
		let n = t[t.length - 1], r = n ? n.children.indexOf(e) : void 0;
		return o(e, r, n);
	}
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/state.js
var oj = {}.hasOwnProperty, sj = {};
function cj(e, t) {
	let n = t || sj, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = {
		all: s,
		applyData: uj,
		definitionById: r,
		footnoteById: i,
		footnoteCounts: /* @__PURE__ */ new Map(),
		footnoteOrder: [],
		handlers: {
			...kA,
			...n.handlers
		},
		one: o,
		options: n,
		patch: lj,
		wrap: fj
	};
	return aj(e, function(e) {
		if (e.type === "definition" || e.type === "footnoteDefinition") {
			let t = e.type === "definition" ? r : i, n = String(e.identifier).toUpperCase();
			t.has(n) || t.set(n, e);
		}
	}), a;
	function o(e, t) {
		let n = e.type, r = a.handlers[n];
		if (oj.call(a.handlers, n) && r) return r(a, e, t);
		if (a.options.passThrough && a.options.passThrough.includes(n)) {
			if ("children" in e) {
				let { children: t, ...n } = e, r = WA(n);
				return r.children = a.all(e), r;
			}
			return WA(e);
		}
		return (a.options.unknownHandler || dj)(a, e, t);
	}
	function s(e) {
		let t = [];
		if ("children" in e) {
			let n = e.children, r = -1;
			for (; ++r < n.length;) {
				let i = a.one(n[r], e);
				if (i) {
					if (r && n[r - 1].type === "break" && (!Array.isArray(i) && i.type === "text" && (i.value = pj(i.value)), !Array.isArray(i) && i.type === "element")) {
						let e = i.children[0];
						e && e.type === "text" && (e.value = pj(e.value));
					}
					Array.isArray(i) ? t.push(...i) : t.push(i);
				}
			}
		}
		return t;
	}
}
function lj(e, t) {
	e.position && (t.position = vE(e));
}
function uj(e, t) {
	let n = t;
	if (e && e.data) {
		let t = e.data.hName, r = e.data.hChildren, i = e.data.hProperties;
		typeof t == "string" && (n.type === "element" ? n.tagName = t : n = {
			type: "element",
			tagName: t,
			properties: {},
			children: "children" in n ? n.children : [n]
		}), n.type === "element" && i && Object.assign(n.properties, WA(i)), "children" in n && n.children && r != null && (n.children = r);
	}
	return n;
}
function dj(e, t) {
	let n = t.data || {}, r = "value" in t && !(oj.call(n, "hProperties") || oj.call(n, "hChildren")) ? {
		type: "text",
		value: t.value
	} : {
		type: "element",
		tagName: "div",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, r), e.applyData(t, r);
}
function fj(e, t) {
	let n = [], r = -1;
	for (t && n.push({
		type: "text",
		value: "\n"
	}); ++r < e.length;) r && n.push({
		type: "text",
		value: "\n"
	}), n.push(e[r]);
	return t && e.length > 0 && n.push({
		type: "text",
		value: "\n"
	}), n;
}
function pj(e) {
	let t = 0, n = e.charCodeAt(t);
	for (; n === 9 || n === 32;) t++, n = e.charCodeAt(t);
	return e.slice(t);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/index.js
function mj(e, t) {
	let n = cj(e, t), r = n.one(e, void 0), i = qA(n), a = Array.isArray(r) ? {
		type: "root",
		children: r
	} : r || {
		type: "root",
		children: []
	};
	return i && ("children" in a, a.children.push({
		type: "text",
		value: "\n"
	}, i)), a;
}
//#endregion
//#region node_modules/remark-rehype/lib/index.js
function hj(e, t) {
	return e && "run" in e ? async function(n, r) {
		let i = mj(n, {
			file: r,
			...t
		});
		await e.run(i, r);
	} : function(n, r) {
		return mj(n, {
			file: r,
			...e || t
		});
	};
}
//#endregion
//#region node_modules/bail/index.js
function gj(e) {
	if (e) throw e;
}
//#endregion
//#region node_modules/extend/index.js
var _j = /* @__PURE__ */ n(((e, t) => {
	var n = Object.prototype.hasOwnProperty, r = Object.prototype.toString, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = function(e) {
		return typeof Array.isArray == "function" ? Array.isArray(e) : r.call(e) === "[object Array]";
	}, s = function(e) {
		if (!e || r.call(e) !== "[object Object]") return !1;
		var t = n.call(e, "constructor"), i = e.constructor && e.constructor.prototype && n.call(e.constructor.prototype, "isPrototypeOf");
		if (e.constructor && !t && !i) return !1;
		for (var a in e);
		return a === void 0 || n.call(e, a);
	}, c = function(e, t) {
		i && t.name === "__proto__" ? i(e, t.name, {
			enumerable: !0,
			configurable: !0,
			value: t.newValue,
			writable: !0
		}) : e[t.name] = t.newValue;
	}, l = function(e, t) {
		if (t === "__proto__") {
			if (!n.call(e, t)) return;
			if (a) return a(e, t).value;
		}
		return e[t];
	};
	t.exports = function e() {
		var t, n, r, i, a, u, d = arguments[0], f = 1, p = arguments.length, m = !1;
		for (typeof d == "boolean" && (m = d, d = arguments[1] || {}, f = 2), (d == null || typeof d != "object" && typeof d != "function") && (d = {}); f < p; ++f) if (t = arguments[f], t != null) for (n in t) r = l(d, n), i = l(t, n), d !== i && (m && i && (s(i) || (a = o(i))) ? (a ? (a = !1, u = r && o(r) ? r : []) : u = r && s(r) ? r : {}, c(d, {
			name: n,
			newValue: e(m, u, i)
		})) : i !== void 0 && c(d, {
			name: n,
			newValue: i
		}));
		return d;
	};
}));
//#endregion
//#region node_modules/is-plain-obj/index.js
function vj(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
//#endregion
//#region node_modules/trough/lib/index.js
function yj() {
	let e = [], t = {
		run: n,
		use: r
	};
	return t;
	function n(...t) {
		let n = -1, r = t.pop();
		if (typeof r != "function") throw TypeError("Expected function as last argument, not " + r);
		i(null, ...t);
		function i(a, ...o) {
			let s = e[++n], c = -1;
			if (a) {
				r(a);
				return;
			}
			for (; ++c < t.length;) (o[c] === null || o[c] === void 0) && (o[c] = t[c]);
			t = o, s ? bj(s, i)(...o) : r(null, ...o);
		}
	}
	function r(n) {
		if (typeof n != "function") throw TypeError("Expected `middelware` to be a function, not " + n);
		return e.push(n), t;
	}
}
function bj(e, t) {
	let n;
	return r;
	function r(...t) {
		let r = e.length > t.length, o;
		r && t.push(i);
		try {
			o = e.apply(this, t);
		} catch (e) {
			let t = e;
			if (r && n) throw t;
			return i(t);
		}
		r || (o && o.then && typeof o.then == "function" ? o.then(a, i) : o instanceof Error ? i(o) : a(o));
	}
	function i(e, ...r) {
		n || (n = !0, t(e, ...r));
	}
	function a(e) {
		i(null, e);
	}
}
//#endregion
//#region node_modules/vfile/lib/minpath.browser.js
var xj = {
	basename: Sj,
	dirname: Cj,
	extname: wj,
	join: Tj,
	sep: "/"
};
function Sj(e, t) {
	if (t !== void 0 && typeof t != "string") throw TypeError("\"ext\" argument must be a string");
	Oj(e);
	let n = 0, r = -1, i = e.length, a;
	if (t === void 0 || t.length === 0 || t.length > e.length) {
		for (; i--;) if (e.codePointAt(i) === 47) {
			if (a) {
				n = i + 1;
				break;
			}
		} else r < 0 && (a = !0, r = i + 1);
		return r < 0 ? "" : e.slice(n, r);
	}
	if (t === e) return "";
	let o = -1, s = t.length - 1;
	for (; i--;) if (e.codePointAt(i) === 47) {
		if (a) {
			n = i + 1;
			break;
		}
	} else o < 0 && (a = !0, o = i + 1), s > -1 && (e.codePointAt(i) === t.codePointAt(s--) ? s < 0 && (r = i) : (s = -1, r = o));
	return n === r ? r = o : r < 0 && (r = e.length), e.slice(n, r);
}
function Cj(e) {
	if (Oj(e), e.length === 0) return ".";
	let t = -1, n = e.length, r;
	for (; --n;) if (e.codePointAt(n) === 47) {
		if (r) {
			t = n;
			break;
		}
	} else r ||= !0;
	return t < 0 ? e.codePointAt(0) === 47 ? "/" : "." : t === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, t);
}
function wj(e) {
	Oj(e);
	let t = e.length, n = -1, r = 0, i = -1, a = 0, o;
	for (; t--;) {
		let s = e.codePointAt(t);
		if (s === 47) {
			if (o) {
				r = t + 1;
				break;
			}
			continue;
		}
		n < 0 && (o = !0, n = t + 1), s === 46 ? i < 0 ? i = t : a !== 1 && (a = 1) : i > -1 && (a = -1);
	}
	return i < 0 || n < 0 || a === 0 || a === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
}
function Tj(...e) {
	let t = -1, n;
	for (; ++t < e.length;) Oj(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
	return n === void 0 ? "." : Ej(n);
}
function Ej(e) {
	Oj(e);
	let t = e.codePointAt(0) === 47, n = Dj(e, !t);
	return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function Dj(e, t) {
	let n = "", r = 0, i = -1, a = 0, o = -1, s, c;
	for (; ++o <= e.length;) {
		if (o < e.length) s = e.codePointAt(o);
		else if (s === 47) break;
		else s = 47;
		if (s === 47) {
			if (i !== o - 1 && a !== 1) {
				if (i !== o - 1 && a === 2) {
					if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
						if (n.length > 2) {
							if (c = n.lastIndexOf("/"), c !== n.length - 1) {
								c < 0 ? (n = "", r = 0) : (n = n.slice(0, c), r = n.length - 1 - n.lastIndexOf("/")), i = o, a = 0;
								continue;
							}
						} else if (n.length > 0) {
							n = "", r = 0, i = o, a = 0;
							continue;
						}
					}
					t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
				} else n.length > 0 ? n += "/" + e.slice(i + 1, o) : n = e.slice(i + 1, o), r = o - i - 1;
			}
			i = o, a = 0;
		} else s === 46 && a > -1 ? a++ : a = -1;
	}
	return n;
}
function Oj(e) {
	if (typeof e != "string") throw TypeError("Path must be a string. Received " + JSON.stringify(e));
}
//#endregion
//#region node_modules/vfile/lib/minproc.browser.js
var kj = { cwd: Aj };
function Aj() {
	return "/";
}
//#endregion
//#region node_modules/vfile/lib/minurl.shared.js
function jj(e) {
	return !!(typeof e == "object" && e && "href" in e && e.href && "protocol" in e && e.protocol && e.auth === void 0);
}
//#endregion
//#region node_modules/vfile/lib/minurl.browser.js
function Mj(e) {
	if (typeof e == "string") e = new URL(e);
	else if (!jj(e)) {
		let t = /* @__PURE__ */ TypeError("The \"path\" argument must be of type string or an instance of URL. Received `" + e + "`");
		throw t.code = "ERR_INVALID_ARG_TYPE", t;
	}
	if (e.protocol !== "file:") {
		let e = /* @__PURE__ */ TypeError("The URL must be of scheme file");
		throw e.code = "ERR_INVALID_URL_SCHEME", e;
	}
	return Nj(e);
}
function Nj(e) {
	if (e.hostname !== "") {
		let e = /* @__PURE__ */ TypeError("File URL host must be \"localhost\" or empty on darwin");
		throw e.code = "ERR_INVALID_FILE_URL_HOST", e;
	}
	let t = e.pathname, n = -1;
	for (; ++n < t.length;) if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
		let e = t.codePointAt(n + 2);
		if (e === 70 || e === 102) {
			let e = /* @__PURE__ */ TypeError("File URL path must not include encoded / characters");
			throw e.code = "ERR_INVALID_FILE_URL_PATH", e;
		}
	}
	return decodeURIComponent(t);
}
//#endregion
//#region node_modules/vfile/lib/index.js
var Pj = [
	"history",
	"path",
	"basename",
	"stem",
	"extname",
	"dirname"
], Fj = class {
	constructor(e) {
		let t;
		t = e ? jj(e) ? { path: e } : typeof e == "string" || zj(e) ? { value: e } : e : {}, this.cwd = "cwd" in t ? "" : kj.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
		let n = -1;
		for (; ++n < Pj.length;) {
			let e = Pj[n];
			e in t && t[e] !== void 0 && t[e] !== null && (this[e] = e === "history" ? [...t[e]] : t[e]);
		}
		let r;
		for (r in t) Pj.includes(r) || (this[r] = t[r]);
	}
	get basename() {
		return typeof this.path == "string" ? xj.basename(this.path) : void 0;
	}
	set basename(e) {
		Lj(e, "basename"), Ij(e, "basename"), this.path = xj.join(this.dirname || "", e);
	}
	get dirname() {
		return typeof this.path == "string" ? xj.dirname(this.path) : void 0;
	}
	set dirname(e) {
		Rj(this.basename, "dirname"), this.path = xj.join(e || "", this.basename);
	}
	get extname() {
		return typeof this.path == "string" ? xj.extname(this.path) : void 0;
	}
	set extname(e) {
		if (Ij(e, "extname"), Rj(this.dirname, "extname"), e) {
			if (e.codePointAt(0) !== 46) throw Error("`extname` must start with `.`");
			if (e.includes(".", 1)) throw Error("`extname` cannot contain multiple dots");
		}
		this.path = xj.join(this.dirname, this.stem + (e || ""));
	}
	get path() {
		return this.history[this.history.length - 1];
	}
	set path(e) {
		jj(e) && (e = Mj(e)), Lj(e, "path"), this.path !== e && this.history.push(e);
	}
	get stem() {
		return typeof this.path == "string" ? xj.basename(this.path, this.extname) : void 0;
	}
	set stem(e) {
		Lj(e, "stem"), Ij(e, "stem"), this.path = xj.join(this.dirname || "", e + (this.extname || ""));
	}
	fail(e, t, n) {
		let r = this.message(e, t, n);
		throw r.fatal = !0, r;
	}
	info(e, t, n) {
		let r = this.message(e, t, n);
		return r.fatal = void 0, r;
	}
	message(e, t, n) {
		let r = new CE(e, t, n);
		return this.path && (r.name = this.path + ":" + r.name, r.file = this.path), r.fatal = !1, this.messages.push(r), r;
	}
	toString(e) {
		return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(e || void 0).decode(this.value);
	}
};
function Ij(e, t) {
	if (e && e.includes(xj.sep)) throw Error("`" + t + "` cannot be a path: did not expect `" + xj.sep + "`");
}
function Lj(e, t) {
	if (!e) throw Error("`" + t + "` cannot be empty");
}
function Rj(e, t) {
	if (!e) throw Error("Setting `" + t + "` requires `path` to be set too");
}
function zj(e) {
	return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
//#endregion
//#region node_modules/unified/lib/callable-instance.js
var Bj = (function(e) {
	let t = this.constructor.prototype, n = t[e], r = function() {
		return n.apply(r, arguments);
	};
	return Object.setPrototypeOf(r, t), r;
}), Vj = /* @__PURE__ */ e(_j(), 1), Hj = {}.hasOwnProperty, Uj = new class e extends Bj {
	constructor() {
		super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = yj();
	}
	copy() {
		let t = new e(), n = -1;
		for (; ++n < this.attachers.length;) {
			let e = this.attachers[n];
			t.use(...e);
		}
		return t.data((0, Vj.default)(!0, {}, this.namespace)), t;
	}
	data(e, t) {
		return typeof e == "string" ? arguments.length === 2 ? (Kj("data", this.frozen), this.namespace[e] = t, this) : Hj.call(this.namespace, e) && this.namespace[e] || void 0 : e ? (Kj("data", this.frozen), this.namespace = e, this) : this.namespace;
	}
	freeze() {
		if (this.frozen) return this;
		let e = this;
		for (; ++this.freezeIndex < this.attachers.length;) {
			let [t, ...n] = this.attachers[this.freezeIndex];
			if (n[0] === !1) continue;
			n[0] === !0 && (n[0] = void 0);
			let r = t.call(e, ...n);
			typeof r == "function" && this.transformers.use(r);
		}
		return this.frozen = !0, this.freezeIndex = Infinity, this;
	}
	parse(e) {
		this.freeze();
		let t = Yj(e), n = this.parser || this.Parser;
		return Wj("parse", n), n(String(t), t);
	}
	process(e, t) {
		let n = this;
		return this.freeze(), Wj("process", this.parser || this.Parser), Gj("process", this.compiler || this.Compiler), t ? r(void 0, t) : new Promise(r);
		function r(r, i) {
			let a = Yj(e), o = n.parse(a);
			n.run(o, a, function(e, t, r) {
				if (e || !t || !r) return s(e);
				let i = t, a = n.stringify(i, r);
				Zj(a) ? r.value = a : r.result = a, s(e, r);
			});
			function s(e, n) {
				e || !n ? i(e) : r ? r(n) : t(void 0, n);
			}
		}
	}
	processSync(e) {
		let t = !1, n;
		return this.freeze(), Wj("processSync", this.parser || this.Parser), Gj("processSync", this.compiler || this.Compiler), this.process(e, r), Jj("processSync", "process", t), n;
		function r(e, r) {
			t = !0, gj(e), n = r;
		}
	}
	run(e, t, n) {
		qj(e), this.freeze();
		let r = this.transformers;
		return !n && typeof t == "function" && (n = t, t = void 0), n ? i(void 0, n) : new Promise(i);
		function i(i, a) {
			let o = Yj(t);
			r.run(e, o, s);
			function s(t, r, o) {
				let s = r || e;
				t ? a(t) : i ? i(s) : n(void 0, s, o);
			}
		}
	}
	runSync(e, t) {
		let n = !1, r;
		return this.run(e, t, i), Jj("runSync", "run", n), r;
		function i(e, t) {
			gj(e), r = t, n = !0;
		}
	}
	stringify(e, t) {
		this.freeze();
		let n = Yj(t), r = this.compiler || this.Compiler;
		return Gj("stringify", r), qj(e), r(e, n);
	}
	use(e, ...t) {
		let n = this.attachers, r = this.namespace;
		if (Kj("use", this.frozen), e != null) {
			if (typeof e == "function") s(e, t);
			else if (typeof e == "object") Array.isArray(e) ? o(e) : a(e);
			else throw TypeError("Expected usable value, not `" + e + "`");
		}
		return this;
		function i(e) {
			if (typeof e == "function") s(e, []);
			else if (typeof e == "object") {
				if (Array.isArray(e)) {
					let [t, ...n] = e;
					s(t, n);
				} else a(e);
			} else throw TypeError("Expected usable value, not `" + e + "`");
		}
		function a(e) {
			if (!("plugins" in e) && !("settings" in e)) throw Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
			o(e.plugins), e.settings && (r.settings = (0, Vj.default)(!0, r.settings, e.settings));
		}
		function o(e) {
			let t = -1;
			if (e != null) {
				if (Array.isArray(e)) for (; ++t < e.length;) {
					let n = e[t];
					i(n);
				}
				else throw TypeError("Expected a list of plugins, not `" + e + "`");
			}
		}
		function s(e, t) {
			let r = -1, i = -1;
			for (; ++r < n.length;) if (n[r][0] === e) {
				i = r;
				break;
			}
			if (i === -1) n.push([e, ...t]);
			else if (t.length > 0) {
				let [r, ...a] = t, o = n[i][1];
				vj(o) && vj(r) && (r = (0, Vj.default)(!0, o, r)), n[i] = [
					e,
					r,
					...a
				];
			}
		}
	}
}().freeze();
function Wj(e, t) {
	if (typeof t != "function") throw TypeError("Cannot `" + e + "` without `parser`");
}
function Gj(e, t) {
	if (typeof t != "function") throw TypeError("Cannot `" + e + "` without `compiler`");
}
function Kj(e, t) {
	if (t) throw Error("Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
}
function qj(e) {
	if (!vj(e) || typeof e.type != "string") throw TypeError("Expected node, got `" + e + "`");
}
function Jj(e, t, n) {
	if (!n) throw Error("`" + e + "` finished async. Use `" + t + "` instead");
}
function Yj(e) {
	return Xj(e) ? e : new Fj(e);
}
function Xj(e) {
	return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Zj(e) {
	return typeof e == "string" || Qj(e);
}
function Qj(e) {
	return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
//#endregion
//#region node_modules/react-markdown/lib/index.js
var $j = [], eM = { allowDangerousHtml: !0 }, tM = /^(https?|ircs?|mailto|xmpp)$/i, nM = [
	{
		from: "astPlugins",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "allowDangerousHtml",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "allowNode",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "allowElement"
	},
	{
		from: "allowedTypes",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "allowedElements"
	},
	{
		from: "className",
		id: "remove-classname"
	},
	{
		from: "disallowedTypes",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "disallowedElements"
	},
	{
		from: "escapeHtml",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "includeElementIndex",
		id: "#remove-includeelementindex"
	},
	{
		from: "includeNodeIndex",
		id: "change-includenodeindex-to-includeelementindex"
	},
	{
		from: "linkTarget",
		id: "remove-linktarget"
	},
	{
		from: "plugins",
		id: "change-plugins-to-remarkplugins",
		to: "remarkPlugins"
	},
	{
		from: "rawSourcePos",
		id: "#remove-rawsourcepos"
	},
	{
		from: "renderers",
		id: "change-renderers-to-components",
		to: "components"
	},
	{
		from: "source",
		id: "change-source-to-children",
		to: "children"
	},
	{
		from: "sourcePos",
		id: "#remove-sourcepos"
	},
	{
		from: "transformImageUri",
		id: "#add-urltransform",
		to: "urlTransform"
	},
	{
		from: "transformLinkUri",
		id: "#add-urltransform",
		to: "urlTransform"
	}
];
function rM(e) {
	let t = iM(e), n = aM(e);
	return oM(t.runSync(t.parse(n), n), e);
}
function iM(e) {
	let t = e.rehypePlugins || $j, n = e.remarkPlugins || $j, r = e.remarkRehypeOptions ? {
		...e.remarkRehypeOptions,
		...eM
	} : eM;
	return Uj().use(Qk).use(n).use(hj, r).use(t);
}
function aM(e) {
	let t = e.children || "", n = new Fj();
	return typeof t == "string" ? n.value = t : "" + t, n;
}
function oM(e, t) {
	let n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, o = t.skipHtml, s = t.unwrapDisallowed, c = t.urlTransform || sM;
	for (let e of nM) Object.hasOwn(t, e.from) && "" + e.from + (e.to ? "use `" + e.to + "` instead" : "remove it") + e.id;
	return aj(e, l), jE(e, {
		Fragment: R.Fragment,
		components: i,
		ignoreInvalidStyle: !0,
		jsx: R.jsx,
		jsxs: R.jsxs,
		passKeys: !0,
		passNode: !0
	});
	function l(e, t, i) {
		if (e.type === "raw" && i && typeof t == "number") return o ? i.children.splice(t, 1) : i.children[t] = {
			type: "text",
			value: e.value
		}, t;
		if (e.type === "element") {
			let t;
			for (t in $E) if (Object.hasOwn($E, t) && Object.hasOwn(e.properties, t)) {
				let n = e.properties[t], r = $E[t];
				(r === null || r.includes(e.tagName)) && (e.properties[t] = c(String(n || ""), t, e));
			}
		}
		if (e.type === "element") {
			let o = n ? !n.includes(e.tagName) : a ? a.includes(e.tagName) : !1;
			if (!o && r && typeof t == "number" && (o = !r(e, t, i)), o && i && typeof t == "number") return s && e.children ? i.children.splice(t, 1, ...e.children) : i.children.splice(t, 1), t;
		}
	}
}
function sM(e) {
	let t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
	return t === -1 || i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || tM.test(e.slice(0, t)) ? e : "";
}
//#endregion
//#region node_modules/ccount/index.js
function cM(e, t) {
	let n = String(e);
	if (typeof t != "string") throw TypeError("Expected character");
	let r = 0, i = n.indexOf(t);
	for (; i !== -1;) r++, i = n.indexOf(t, i + t.length);
	return r;
}
//#endregion
//#region node_modules/mdast-util-find-and-replace/node_modules/escape-string-regexp/index.js
function lM(e) {
	if (typeof e != "string") throw TypeError("Expected a string");
	return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
//#endregion
//#region node_modules/mdast-util-find-and-replace/lib/index.js
function uM(e, t, n) {
	let r = JA((n || {}).ignore || []), i = dM(t), a = -1;
	for (; ++a < i.length;) rj(e, "text", o);
	function o(e, t) {
		let n = -1, i;
		for (; ++n < t.length;) {
			let e = t[n], a = i ? i.children : void 0;
			if (r(e, a ? a.indexOf(e) : void 0, i)) return;
			i = e;
		}
		if (i) return s(e, t);
	}
	function s(e, t) {
		let n = t[t.length - 1], r = i[a][0], o = i[a][1], s = 0, c = n.children.indexOf(e), l = !1, u = [];
		r.lastIndex = 0;
		let d = r.exec(e.value);
		for (; d;) {
			let n = d.index, i = {
				index: d.index,
				input: d.input,
				stack: [...t, e]
			}, a = o(...d, i);
			if (typeof a == "string" && (a = a.length > 0 ? {
				type: "text",
				value: a
			} : void 0), a === !1 ? r.lastIndex = n + 1 : (s !== n && u.push({
				type: "text",
				value: e.value.slice(s, n)
			}), Array.isArray(a) ? u.push(...a) : a && u.push(a), s = n + d[0].length, l = !0), !r.global) break;
			d = r.exec(e.value);
		}
		return l ? (s < e.value.length && u.push({
			type: "text",
			value: e.value.slice(s)
		}), n.children.splice(c, 1, ...u)) : u = [e], c + u.length;
	}
}
function dM(e) {
	let t = [];
	if (!Array.isArray(e)) throw TypeError("Expected find and replace tuple or list of tuples");
	let n = !e[0] || Array.isArray(e[0]) ? e : [e], r = -1;
	for (; ++r < n.length;) {
		let e = n[r];
		t.push([fM(e[0]), pM(e[1])]);
	}
	return t;
}
function fM(e) {
	return typeof e == "string" ? new RegExp(lM(e), "g") : e;
}
function pM(e) {
	return typeof e == "function" ? e : function() {
		return e;
	};
}
//#endregion
//#region node_modules/mdast-util-gfm-autolink-literal/lib/index.js
var mM = "phrasing", hM = [
	"autolink",
	"link",
	"image",
	"label"
];
function gM() {
	return {
		transforms: [wM],
		enter: {
			literalAutolink: vM,
			literalAutolinkEmail: yM,
			literalAutolinkHttp: yM,
			literalAutolinkWww: yM
		},
		exit: {
			literalAutolink: CM,
			literalAutolinkEmail: SM,
			literalAutolinkHttp: bM,
			literalAutolinkWww: xM
		}
	};
}
function _M() {
	return { unsafe: [
		{
			character: "@",
			before: "[+\\-.\\w]",
			after: "[\\-.\\w]",
			inConstruct: mM,
			notInConstruct: hM
		},
		{
			character: ".",
			before: "[Ww]",
			after: "[\\-.\\w]",
			inConstruct: mM,
			notInConstruct: hM
		},
		{
			character: ":",
			before: "[ps]",
			after: "\\/",
			inConstruct: mM,
			notInConstruct: hM
		}
	] };
}
function vM(e) {
	this.enter({
		type: "link",
		title: null,
		url: "",
		children: []
	}, e);
}
function yM(e) {
	this.config.enter.autolinkProtocol.call(this, e);
}
function bM(e) {
	this.config.exit.autolinkProtocol.call(this, e);
}
function xM(e) {
	this.config.exit.data.call(this, e);
	let t = this.stack[this.stack.length - 1];
	t.type, t.url = "http://" + this.sliceSerialize(e);
}
function SM(e) {
	this.config.exit.autolinkEmail.call(this, e);
}
function CM(e) {
	this.exit(e);
}
function wM(e) {
	uM(e, [[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, TM], [/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu, EM]], { ignore: ["link", "linkReference"] });
}
function TM(e, t, n, r, i) {
	let a = "";
	if (!kM(i) || (/^w/i.test(t) && (n = t + n, t = "", a = "http://"), !DM(n))) return !1;
	let o = OM(n + r);
	if (!o[0]) return !1;
	let s = {
		type: "link",
		title: null,
		url: a + t + o[0],
		children: [{
			type: "text",
			value: t + o[0]
		}]
	};
	return o[1] ? [s, {
		type: "text",
		value: o[1]
	}] : s;
}
function EM(e, t, n, r) {
	return !kM(r, !0) || /[-\d_]$/.test(n) ? !1 : {
		type: "link",
		title: null,
		url: "mailto:" + t + "@" + n,
		children: [{
			type: "text",
			value: t + "@" + n
		}]
	};
}
function DM(e) {
	let t = e.split(".");
	return !(t.length < 2 || t[t.length - 1] && (/_/.test(t[t.length - 1]) || !/[a-zA-Z\d]/.test(t[t.length - 1])) || t[t.length - 2] && (/_/.test(t[t.length - 2]) || !/[a-zA-Z\d]/.test(t[t.length - 2])));
}
function OM(e) {
	let t = /[!"&'),.:;<>?\]}]+$/.exec(e);
	if (!t) return [e, void 0];
	e = e.slice(0, t.index);
	let n = t[0], r = n.indexOf(")"), i = cM(e, "("), a = cM(e, ")");
	for (; r !== -1 && i > a;) e += n.slice(0, r + 1), n = n.slice(r + 1), r = n.indexOf(")"), a++;
	return [e, n];
}
function kM(e, t) {
	let n = e.input.charCodeAt(e.index - 1);
	return (e.index === 0 || wD(n) || CD(n)) && (!t || n !== 47);
}
//#endregion
//#region node_modules/mdast-util-gfm-footnote/lib/index.js
zM.peek = RM;
function AM() {
	this.buffer();
}
function jM(e) {
	this.enter({
		type: "footnoteReference",
		identifier: "",
		label: ""
	}, e);
}
function MM() {
	this.buffer();
}
function NM(e) {
	this.enter({
		type: "footnoteDefinition",
		identifier: "",
		label: "",
		children: []
	}, e);
}
function PM(e) {
	let t = this.resume(), n = this.stack[this.stack.length - 1];
	n.type, n.identifier = mD(this.sliceSerialize(e)).toLowerCase(), n.label = t;
}
function FM(e) {
	this.exit(e);
}
function IM(e) {
	let t = this.resume(), n = this.stack[this.stack.length - 1];
	n.type, n.identifier = mD(this.sliceSerialize(e)).toLowerCase(), n.label = t;
}
function LM(e) {
	this.exit(e);
}
function RM() {
	return "[";
}
function zM(e, t, n, r) {
	let i = n.createTracker(r), a = i.move("[^"), o = n.enter("footnoteReference"), s = n.enter("reference");
	return a += i.move(n.safe(n.associationId(e), {
		after: "]",
		before: a
	})), s(), o(), a += i.move("]"), a;
}
function BM() {
	return {
		enter: {
			gfmFootnoteCallString: AM,
			gfmFootnoteCall: jM,
			gfmFootnoteDefinitionLabelString: MM,
			gfmFootnoteDefinition: NM
		},
		exit: {
			gfmFootnoteCallString: PM,
			gfmFootnoteCall: FM,
			gfmFootnoteDefinitionLabelString: IM,
			gfmFootnoteDefinition: LM
		}
	};
}
function VM(e) {
	let t = !1;
	return e && e.firstLineBlank && (t = !0), {
		handlers: {
			footnoteDefinition: n,
			footnoteReference: zM
		},
		unsafe: [{
			character: "[",
			inConstruct: [
				"label",
				"phrasing",
				"reference"
			]
		}]
	};
	function n(e, n, r, i) {
		let a = r.createTracker(i), o = a.move("[^"), s = r.enter("footnoteDefinition"), c = r.enter("label");
		return o += a.move(r.safe(r.associationId(e), {
			before: o,
			after: "]"
		})), c(), o += a.move("]:"), e.children && e.children.length > 0 && (a.shift(4), o += a.move((t ? "\n" : " ") + r.indentLines(r.containerFlow(e, a.current()), t ? UM : HM))), s(), o;
	}
}
function HM(e, t, n) {
	return t === 0 ? e : UM(e, t, n);
}
function UM(e, t, n) {
	return (n ? "" : "    ") + e;
}
//#endregion
//#region node_modules/mdast-util-gfm-strikethrough/lib/index.js
var WM = [
	"autolink",
	"destinationLiteral",
	"destinationRaw",
	"reference",
	"titleQuote",
	"titleApostrophe"
];
YM.peek = XM;
function GM() {
	return {
		canContainEols: ["delete"],
		enter: { strikethrough: qM },
		exit: { strikethrough: JM }
	};
}
function KM() {
	return {
		unsafe: [{
			character: "~",
			inConstruct: "phrasing",
			notInConstruct: WM
		}],
		handlers: { delete: YM }
	};
}
function qM(e) {
	this.enter({
		type: "delete",
		children: []
	}, e);
}
function JM(e) {
	this.exit(e);
}
function YM(e, t, n, r) {
	let i = n.createTracker(r), a = n.enter("strikethrough"), o = i.move("~~");
	return o += n.containerPhrasing(e, {
		...i.current(),
		before: o,
		after: "~"
	}), o += i.move("~~"), a(), o;
}
function XM() {
	return "~";
}
//#endregion
//#region node_modules/markdown-table/index.js
function ZM(e) {
	return e.length;
}
function QM(e, t) {
	let n = t || {}, r = (n.align || []).concat(), i = n.stringLength || ZM, a = [], o = [], s = [], c = [], l = 0, u = -1;
	for (; ++u < e.length;) {
		let t = [], r = [], a = -1;
		for (e[u].length > l && (l = e[u].length); ++a < e[u].length;) {
			let o = $M(e[u][a]);
			if (n.alignDelimiters !== !1) {
				let e = i(o);
				r[a] = e, (c[a] === void 0 || e > c[a]) && (c[a] = e);
			}
			t.push(o);
		}
		o[u] = t, s[u] = r;
	}
	let d = -1;
	if (typeof r == "object" && "length" in r) for (; ++d < l;) a[d] = eN(r[d]);
	else {
		let e = eN(r);
		for (; ++d < l;) a[d] = e;
	}
	d = -1;
	let f = [], p = [];
	for (; ++d < l;) {
		let e = a[d], t = "", r = "";
		e === 99 ? (t = ":", r = ":") : e === 108 ? t = ":" : e === 114 && (r = ":");
		let i = n.alignDelimiters === !1 ? 1 : Math.max(1, c[d] - t.length - r.length), o = t + "-".repeat(i) + r;
		n.alignDelimiters !== !1 && (i = t.length + i + r.length, i > c[d] && (c[d] = i), p[d] = i), f[d] = o;
	}
	o.splice(1, 0, f), s.splice(1, 0, p), u = -1;
	let m = [];
	for (; ++u < o.length;) {
		let e = o[u], t = s[u];
		d = -1;
		let r = [];
		for (; ++d < l;) {
			let i = e[d] || "", o = "", s = "";
			if (n.alignDelimiters !== !1) {
				let e = c[d] - (t[d] || 0), n = a[d];
				n === 114 ? o = " ".repeat(e) : n === 99 ? e % 2 ? (o = " ".repeat(e / 2 + .5), s = " ".repeat(e / 2 - .5)) : (o = " ".repeat(e / 2), s = o) : s = " ".repeat(e);
			}
			n.delimiterStart !== !1 && !d && r.push("|"), n.padding !== !1 && (n.alignDelimiters !== !1 || i !== "") && (n.delimiterStart !== !1 || d) && r.push(" "), n.alignDelimiters !== !1 && r.push(o), r.push(i), n.alignDelimiters !== !1 && r.push(s), n.padding !== !1 && r.push(" "), (n.delimiterEnd !== !1 || d !== l - 1) && r.push("|");
		}
		m.push(n.delimiterEnd === !1 ? r.join("").replace(/ +$/, "") : r.join(""));
	}
	return m.join("\n");
}
function $M(e) {
	return e == null ? "" : String(e);
}
function eN(e) {
	let t = typeof e == "string" ? e.codePointAt(0) : 0;
	return t === 67 || t === 99 ? 99 : t === 76 || t === 108 ? 108 : t === 82 || t === 114 ? 114 : 0;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/blockquote.js
function tN(e, t, n, r) {
	let i = n.enter("blockquote"), a = n.createTracker(r);
	a.move("> "), a.shift(2);
	let o = n.indentLines(n.containerFlow(e, a.current()), nN);
	return i(), o;
}
function nN(e, t, n) {
	return ">" + (n ? "" : " ") + e;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js
function rN(e, t) {
	return iN(e, t.inConstruct, !0) && !iN(e, t.notInConstruct, !1);
}
function iN(e, t, n) {
	if (typeof t == "string" && (t = [t]), !t || t.length === 0) return n;
	let r = -1;
	for (; ++r < t.length;) if (e.includes(t[r])) return !0;
	return !1;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/break.js
function aN(e, t, n, r) {
	let i = -1;
	for (; ++i < n.unsafe.length;) if (n.unsafe[i].character === "\n" && rN(n.stack, n.unsafe[i])) return /[ \t]/.test(r.before) ? "" : " ";
	return "\\\n";
}
//#endregion
//#region node_modules/longest-streak/index.js
function oN(e, t) {
	let n = String(e), r = n.indexOf(t), i = r, a = 0, o = 0;
	if (typeof t != "string") throw TypeError("Expected substring");
	for (; r !== -1;) r === i ? ++a > o && (o = a) : a = 1, i = r + t.length, r = n.indexOf(t, i);
	return o;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/format-code-as-indented.js
function sN(e, t) {
	return !(t.options.fences !== !1 || !e.value || e.lang || !/[^ \r\n]/.test(e.value) || /^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-fence.js
function cN(e) {
	let t = e.options.fence || "`";
	if (t !== "`" && t !== "~") throw Error("Cannot serialize code with `" + t + "` for `options.fence`, expected `` ` `` or `~`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/code.js
function lN(e, t, n, r) {
	let i = cN(n), a = e.value || "", o = i === "`" ? "GraveAccent" : "Tilde";
	if (sN(e, n)) {
		let e = n.enter("codeIndented"), t = n.indentLines(a, uN);
		return e(), t;
	}
	let s = n.createTracker(r), c = i.repeat(Math.max(oN(a, i) + 1, 3)), l = n.enter("codeFenced"), u = s.move(c);
	if (e.lang) {
		let t = n.enter(`codeFencedLang${o}`);
		u += s.move(n.safe(e.lang, {
			before: u,
			after: " ",
			encode: ["`"],
			...s.current()
		})), t();
	}
	if (e.lang && e.meta) {
		let t = n.enter(`codeFencedMeta${o}`);
		u += s.move(" "), u += s.move(n.safe(e.meta, {
			before: u,
			after: "\n",
			encode: ["`"],
			...s.current()
		})), t();
	}
	return u += s.move("\n"), a && (u += s.move(a + "\n")), u += s.move(c), l(), u;
}
function uN(e, t, n) {
	return (n ? "" : "    ") + e;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-quote.js
function dN(e) {
	let t = e.options.quote || "\"";
	if (t !== "\"" && t !== "'") throw Error("Cannot serialize title with `" + t + "` for `options.quote`, expected `\"`, or `'`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/definition.js
function fN(e, t, n, r) {
	let i = dN(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.enter("definition"), s = n.enter("label"), c = n.createTracker(r), l = c.move("[");
	return l += c.move(n.safe(n.associationId(e), {
		before: l,
		after: "]",
		...c.current()
	})), l += c.move("]: "), s(), !e.url || /[\0- \u007F]/.test(e.url) ? (s = n.enter("destinationLiteral"), l += c.move("<"), l += c.move(n.safe(e.url, {
		before: l,
		after: ">",
		...c.current()
	})), l += c.move(">")) : (s = n.enter("destinationRaw"), l += c.move(n.safe(e.url, {
		before: l,
		after: e.title ? " " : "\n",
		...c.current()
	}))), s(), e.title && (s = n.enter(`title${a}`), l += c.move(" " + i), l += c.move(n.safe(e.title, {
		before: l,
		after: i,
		...c.current()
	})), l += c.move(i), s()), o(), l;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-emphasis.js
function pN(e) {
	let t = e.options.emphasis || "*";
	if (t !== "*" && t !== "_") throw Error("Cannot serialize emphasis with `" + t + "` for `options.emphasis`, expected `*`, or `_`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/encode-character-reference.js
function mN(e) {
	return "&#x" + e.toString(16).toUpperCase() + ";";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/encode-info.js
function hN(e, t, n) {
	let r = ND(e), i = ND(t);
	return r === void 0 ? i === void 0 ? n === "_" ? {
		inside: !0,
		outside: !0
	} : {
		inside: !1,
		outside: !1
	} : i === 1 ? {
		inside: !0,
		outside: !0
	} : {
		inside: !1,
		outside: !0
	} : r === 1 ? i === void 0 ? {
		inside: !1,
		outside: !1
	} : i === 1 ? {
		inside: !0,
		outside: !0
	} : {
		inside: !1,
		outside: !1
	} : i === void 0 ? {
		inside: !1,
		outside: !1
	} : i === 1 ? {
		inside: !0,
		outside: !1
	} : {
		inside: !1,
		outside: !1
	};
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/emphasis.js
gN.peek = _N;
function gN(e, t, n, r) {
	let i = pN(n), a = n.enter("emphasis"), o = n.createTracker(r), s = o.move(i), c = o.move(n.containerPhrasing(e, {
		after: i,
		before: s,
		...o.current()
	})), l = c.charCodeAt(0), u = hN(r.before.charCodeAt(r.before.length - 1), l, i);
	u.inside && (c = mN(l) + c.slice(1));
	let d = c.charCodeAt(c.length - 1), f = hN(r.after.charCodeAt(0), d, i);
	f.inside && (c = c.slice(0, -1) + mN(d));
	let p = o.move(i);
	return a(), n.attentionEncodeSurroundingInfo = {
		after: f.outside,
		before: u.outside
	}, s + c + p;
}
function _N(e, t, n) {
	return n.options.emphasis || "*";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/format-heading-as-setext.js
function vN(e, t) {
	let n = !1;
	return aj(e, function(e) {
		if ("value" in e && /\r?\n|\r/.test(e.value) || e.type === "break") return n = !0, !1;
	}), !!((!e.depth || e.depth < 3) && tD(e) && (t.options.setext || n));
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/heading.js
function yN(e, t, n, r) {
	let i = Math.max(Math.min(6, e.depth || 1), 1), a = n.createTracker(r);
	if (vN(e, n)) {
		let t = n.enter("headingSetext"), r = n.enter("phrasing"), o = n.containerPhrasing(e, {
			...a.current(),
			before: "\n",
			after: "\n"
		});
		return r(), t(), o + "\n" + (i === 1 ? "=" : "-").repeat(o.length - (Math.max(o.lastIndexOf("\r"), o.lastIndexOf("\n")) + 1));
	}
	let o = "#".repeat(i), s = n.enter("headingAtx"), c = n.enter("phrasing");
	a.move(o + " ");
	let l = n.containerPhrasing(e, {
		before: "# ",
		after: "\n",
		...a.current()
	});
	return /^[\t ]/.test(l) && (l = mN(l.charCodeAt(0)) + l.slice(1)), l = l ? o + " " + l : o, n.options.closeAtx && (l += " " + o), c(), s(), l;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/html.js
bN.peek = xN;
function bN(e) {
	return e.value || "";
}
function xN() {
	return "<";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/image.js
SN.peek = CN;
function SN(e, t, n, r) {
	let i = dN(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.enter("image"), s = n.enter("label"), c = n.createTracker(r), l = c.move("![");
	return l += c.move(n.safe(e.alt, {
		before: l,
		after: "]",
		...c.current()
	})), l += c.move("]("), s(), !e.url && e.title || /[\0- \u007F]/.test(e.url) ? (s = n.enter("destinationLiteral"), l += c.move("<"), l += c.move(n.safe(e.url, {
		before: l,
		after: ">",
		...c.current()
	})), l += c.move(">")) : (s = n.enter("destinationRaw"), l += c.move(n.safe(e.url, {
		before: l,
		after: e.title ? " " : ")",
		...c.current()
	}))), s(), e.title && (s = n.enter(`title${a}`), l += c.move(" " + i), l += c.move(n.safe(e.title, {
		before: l,
		after: i,
		...c.current()
	})), l += c.move(i), s()), l += c.move(")"), o(), l;
}
function CN() {
	return "!";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/image-reference.js
wN.peek = TN;
function wN(e, t, n, r) {
	let i = e.referenceType, a = n.enter("imageReference"), o = n.enter("label"), s = n.createTracker(r), c = s.move("!["), l = n.safe(e.alt, {
		before: c,
		after: "]",
		...s.current()
	});
	c += s.move(l + "]["), o();
	let u = n.stack;
	n.stack = [], o = n.enter("reference");
	let d = n.safe(n.associationId(e), {
		before: c,
		after: "]",
		...s.current()
	});
	return o(), n.stack = u, a(), i === "full" || !l || l !== d ? c += s.move(d + "]") : i === "shortcut" ? c = c.slice(0, -1) : c += s.move("]"), c;
}
function TN() {
	return "!";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/inline-code.js
EN.peek = DN;
function EN(e, t, n) {
	let r = e.value || "", i = "`", a = -1;
	for (; RegExp("(^|[^`])" + i + "([^`]|$)").test(r);) i += "`";
	for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++a < n.unsafe.length;) {
		let e = n.unsafe[a], t = n.compilePattern(e), i;
		if (e.atBreak) for (; i = t.exec(r);) {
			let e = i.index;
			r.charCodeAt(e) === 10 && r.charCodeAt(e - 1) === 13 && e--, r = r.slice(0, e) + " " + r.slice(i.index + 1);
		}
	}
	return i + r + i;
}
function DN() {
	return "`";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/format-link-as-autolink.js
function ON(e, t) {
	let n = tD(e);
	return !(t.options.resourceLink || !e.url || e.title || !e.children || e.children.length !== 1 || e.children[0].type !== "text" || n !== e.url && "mailto:" + n !== e.url || !/^[a-z][a-z+.-]+:/i.test(e.url) || /[\0- <>\u007F]/.test(e.url));
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/link.js
kN.peek = AN;
function kN(e, t, n, r) {
	let i = dN(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.createTracker(r), s, c;
	if (ON(e, n)) {
		let t = n.stack;
		n.stack = [], s = n.enter("autolink");
		let r = o.move("<");
		return r += o.move(n.containerPhrasing(e, {
			before: r,
			after: ">",
			...o.current()
		})), r += o.move(">"), s(), n.stack = t, r;
	}
	s = n.enter("link"), c = n.enter("label");
	let l = o.move("[");
	return l += o.move(n.containerPhrasing(e, {
		before: l,
		after: "](",
		...o.current()
	})), l += o.move("]("), c(), !e.url && e.title || /[\0- \u007F]/.test(e.url) ? (c = n.enter("destinationLiteral"), l += o.move("<"), l += o.move(n.safe(e.url, {
		before: l,
		after: ">",
		...o.current()
	})), l += o.move(">")) : (c = n.enter("destinationRaw"), l += o.move(n.safe(e.url, {
		before: l,
		after: e.title ? " " : ")",
		...o.current()
	}))), c(), e.title && (c = n.enter(`title${a}`), l += o.move(" " + i), l += o.move(n.safe(e.title, {
		before: l,
		after: i,
		...o.current()
	})), l += o.move(i), c()), l += o.move(")"), s(), l;
}
function AN(e, t, n) {
	return ON(e, n) ? "<" : "[";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/link-reference.js
jN.peek = MN;
function jN(e, t, n, r) {
	let i = e.referenceType, a = n.enter("linkReference"), o = n.enter("label"), s = n.createTracker(r), c = s.move("["), l = n.containerPhrasing(e, {
		before: c,
		after: "]",
		...s.current()
	});
	c += s.move(l + "]["), o();
	let u = n.stack;
	n.stack = [], o = n.enter("reference");
	let d = n.safe(n.associationId(e), {
		before: c,
		after: "]",
		...s.current()
	});
	return o(), n.stack = u, a(), i === "full" || !l || l !== d ? c += s.move(d + "]") : i === "shortcut" ? c = c.slice(0, -1) : c += s.move("]"), c;
}
function MN() {
	return "[";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-bullet.js
function NN(e) {
	let t = e.options.bullet || "*";
	if (t !== "*" && t !== "+" && t !== "-") throw Error("Cannot serialize items with `" + t + "` for `options.bullet`, expected `*`, `+`, or `-`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-bullet-other.js
function PN(e) {
	let t = NN(e), n = e.options.bulletOther;
	if (!n) return t === "*" ? "-" : "*";
	if (n !== "*" && n !== "+" && n !== "-") throw Error("Cannot serialize items with `" + n + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
	if (n === t) throw Error("Expected `bullet` (`" + t + "`) and `bulletOther` (`" + n + "`) to be different");
	return n;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-bullet-ordered.js
function FN(e) {
	let t = e.options.bulletOrdered || ".";
	if (t !== "." && t !== ")") throw Error("Cannot serialize items with `" + t + "` for `options.bulletOrdered`, expected `.` or `)`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-rule.js
function IN(e) {
	let t = e.options.rule || "*";
	if (t !== "*" && t !== "-" && t !== "_") throw Error("Cannot serialize rules with `" + t + "` for `options.rule`, expected `*`, `-`, or `_`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/list.js
function LN(e, t, n, r) {
	let i = n.enter("list"), a = n.bulletCurrent, o = e.ordered ? FN(n) : NN(n), s = e.ordered ? o === "." ? ")" : "." : PN(n), c = t && n.bulletLastUsed ? o === n.bulletLastUsed : !1;
	if (!e.ordered) {
		let t = e.children ? e.children[0] : void 0;
		if ((o === "*" || o === "-") && t && (!t.children || !t.children[0]) && n.stack[n.stack.length - 1] === "list" && n.stack[n.stack.length - 2] === "listItem" && n.stack[n.stack.length - 3] === "list" && n.stack[n.stack.length - 4] === "listItem" && n.indexStack[n.indexStack.length - 1] === 0 && n.indexStack[n.indexStack.length - 2] === 0 && n.indexStack[n.indexStack.length - 3] === 0 && (c = !0), IN(n) === o && t) {
			let t = -1;
			for (; ++t < e.children.length;) {
				let n = e.children[t];
				if (n && n.type === "listItem" && n.children && n.children[0] && n.children[0].type === "thematicBreak") {
					c = !0;
					break;
				}
			}
		}
	}
	c && (o = s), n.bulletCurrent = o;
	let l = n.containerFlow(e, r);
	return n.bulletLastUsed = o, n.bulletCurrent = a, i(), l;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js
function RN(e) {
	let t = e.options.listItemIndent || "one";
	if (t !== "tab" && t !== "one" && t !== "mixed") throw Error("Cannot serialize items with `" + t + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/list-item.js
function zN(e, t, n, r) {
	let i = RN(n), a = n.bulletCurrent || NN(n);
	t && t.type === "list" && t.ordered && (a = (typeof t.start == "number" && t.start > -1 ? t.start : 1) + (n.options.incrementListMarker === !1 ? 0 : t.children.indexOf(e)) + a);
	let o = a.length + 1;
	(i === "tab" || i === "mixed" && (t && t.type === "list" && t.spread || e.spread)) && (o = Math.ceil(o / 4) * 4);
	let s = n.createTracker(r);
	s.move(a + " ".repeat(o - a.length)), s.shift(o);
	let c = n.enter("listItem"), l = n.indentLines(n.containerFlow(e, s.current()), u);
	return c(), l;
	function u(e, t, n) {
		return t ? (n ? "" : " ".repeat(o)) + e : (n ? a : a + " ".repeat(o - a.length)) + e;
	}
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/paragraph.js
function BN(e, t, n, r) {
	let i = n.enter("paragraph"), a = n.enter("phrasing"), o = n.containerPhrasing(e, r);
	return a(), i(), o;
}
//#endregion
//#region node_modules/mdast-util-phrasing/lib/index.js
var VN = JA([
	"break",
	"delete",
	"emphasis",
	"footnote",
	"footnoteReference",
	"image",
	"imageReference",
	"inlineCode",
	"inlineMath",
	"link",
	"linkReference",
	"mdxJsxTextElement",
	"mdxTextExpression",
	"strong",
	"text",
	"textDirective"
]);
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/root.js
function HN(e, t, n, r) {
	return (e.children.some(function(e) {
		return VN(e);
	}) ? n.containerPhrasing : n.containerFlow).call(n, e, r);
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-strong.js
function UN(e) {
	let t = e.options.strong || "*";
	if (t !== "*" && t !== "_") throw Error("Cannot serialize strong with `" + t + "` for `options.strong`, expected `*`, or `_`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/strong.js
WN.peek = GN;
function WN(e, t, n, r) {
	let i = UN(n), a = n.enter("strong"), o = n.createTracker(r), s = o.move(i + i), c = o.move(n.containerPhrasing(e, {
		after: i,
		before: s,
		...o.current()
	})), l = c.charCodeAt(0), u = hN(r.before.charCodeAt(r.before.length - 1), l, i);
	u.inside && (c = mN(l) + c.slice(1));
	let d = c.charCodeAt(c.length - 1), f = hN(r.after.charCodeAt(0), d, i);
	f.inside && (c = c.slice(0, -1) + mN(d));
	let p = o.move(i + i);
	return a(), n.attentionEncodeSurroundingInfo = {
		after: f.outside,
		before: u.outside
	}, s + c + p;
}
function GN(e, t, n) {
	return n.options.strong || "*";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/text.js
function KN(e, t, n, r) {
	return n.safe(e.value, r);
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-rule-repetition.js
function qN(e) {
	let t = e.options.ruleRepetition || 3;
	if (t < 3) throw Error("Cannot serialize rules with repetition `" + t + "` for `options.ruleRepetition`, expected `3` or more");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/thematic-break.js
function JN(e, t, n) {
	let r = (IN(n) + (n.options.ruleSpaces ? " " : "")).repeat(qN(n));
	return n.options.ruleSpaces ? r.slice(0, -1) : r;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/index.js
var YN = {
	blockquote: tN,
	break: aN,
	code: lN,
	definition: fN,
	emphasis: gN,
	hardBreak: aN,
	heading: yN,
	html: bN,
	image: SN,
	imageReference: wN,
	inlineCode: EN,
	link: kN,
	linkReference: jN,
	list: LN,
	listItem: zN,
	paragraph: BN,
	root: HN,
	strong: WN,
	text: KN,
	thematicBreak: JN
};
//#endregion
//#region node_modules/mdast-util-gfm-table/lib/index.js
function XN() {
	return {
		enter: {
			table: ZN,
			tableData: tP,
			tableHeader: tP,
			tableRow: $N
		},
		exit: {
			codeText: nP,
			table: QN,
			tableData: eP,
			tableHeader: eP,
			tableRow: eP
		}
	};
}
function ZN(e) {
	let t = e._align;
	this.enter({
		type: "table",
		align: t.map(function(e) {
			return e === "none" ? null : e;
		}),
		children: []
	}, e), this.data.inTable = !0;
}
function QN(e) {
	this.exit(e), this.data.inTable = void 0;
}
function $N(e) {
	this.enter({
		type: "tableRow",
		children: []
	}, e);
}
function eP(e) {
	this.exit(e);
}
function tP(e) {
	this.enter({
		type: "tableCell",
		children: []
	}, e);
}
function nP(e) {
	let t = this.resume();
	this.data.inTable && (t = t.replace(/\\([\\|])/g, rP));
	let n = this.stack[this.stack.length - 1];
	n.type, n.value = t, this.exit(e);
}
function rP(e, t) {
	return t === "|" ? t : e;
}
function iP(e) {
	let t = e || {}, n = t.tableCellPadding, r = t.tablePipeAlign, i = t.stringLength, a = n ? " " : "|";
	return {
		unsafe: [
			{
				character: "\r",
				inConstruct: "tableCell"
			},
			{
				character: "\n",
				inConstruct: "tableCell"
			},
			{
				atBreak: !0,
				character: "|",
				after: "[	 :-]"
			},
			{
				character: "|",
				inConstruct: "tableCell"
			},
			{
				atBreak: !0,
				character: ":",
				after: "-"
			},
			{
				atBreak: !0,
				character: "-",
				after: "[:|-]"
			}
		],
		handlers: {
			inlineCode: f,
			table: o,
			tableCell: c,
			tableRow: s
		}
	};
	function o(e, t, n, r) {
		return l(u(e, n, r), e.align);
	}
	function s(e, t, n, r) {
		let i = l([d(e, n, r)]);
		return i.slice(0, i.indexOf("\n"));
	}
	function c(e, t, n, r) {
		let i = n.enter("tableCell"), o = n.enter("phrasing"), s = n.containerPhrasing(e, {
			...r,
			before: a,
			after: a
		});
		return o(), i(), s;
	}
	function l(e, t) {
		return QM(e, {
			align: t,
			alignDelimiters: r,
			padding: n,
			stringLength: i
		});
	}
	function u(e, t, n) {
		let r = e.children, i = -1, a = [], o = t.enter("table");
		for (; ++i < r.length;) a[i] = d(r[i], t, n);
		return o(), a;
	}
	function d(e, t, n) {
		let r = e.children, i = -1, a = [], o = t.enter("tableRow");
		for (; ++i < r.length;) a[i] = c(r[i], e, t, n);
		return o(), a;
	}
	function f(e, t, n) {
		let r = YN.inlineCode(e, t, n);
		return n.stack.includes("tableCell") && (r = r.replace(/\|/g, "\\$&")), r;
	}
}
//#endregion
//#region node_modules/mdast-util-gfm-task-list-item/lib/index.js
function aP() {
	return { exit: {
		taskListCheckValueChecked: sP,
		taskListCheckValueUnchecked: sP,
		paragraph: cP
	} };
}
function oP() {
	return {
		unsafe: [{
			atBreak: !0,
			character: "-",
			after: "[:|-]"
		}],
		handlers: { listItem: lP }
	};
}
function sP(e) {
	let t = this.stack[this.stack.length - 2];
	t.type, t.checked = e.type === "taskListCheckValueChecked";
}
function cP(e) {
	let t = this.stack[this.stack.length - 2];
	if (t && t.type === "listItem" && typeof t.checked == "boolean") {
		let e = this.stack[this.stack.length - 1];
		e.type;
		let n = e.children[0];
		if (n && n.type === "text") {
			let r = t.children, i = -1, a;
			for (; ++i < r.length;) {
				let e = r[i];
				if (e.type === "paragraph") {
					a = e;
					break;
				}
			}
			a === e && (n.value = n.value.slice(1), n.value.length === 0 ? e.children.shift() : e.position && n.position && typeof n.position.start.offset == "number" && (n.position.start.column++, n.position.start.offset++, e.position.start = Object.assign({}, n.position.start)));
		}
	}
	this.exit(e);
}
function lP(e, t, n, r) {
	let i = e.children[0], a = typeof e.checked == "boolean" && i && i.type === "paragraph", o = "[" + (e.checked ? "x" : " ") + "] ", s = n.createTracker(r);
	a && s.move(o);
	let c = YN.listItem(e, t, n, {
		...r,
		...s.current()
	});
	return a && (c = c.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, l)), c;
	function l(e) {
		return e + o;
	}
}
//#endregion
//#region node_modules/mdast-util-gfm/lib/index.js
function uP() {
	return [
		gM(),
		BM(),
		GM(),
		XN(),
		aP()
	];
}
function dP(e) {
	return { extensions: [
		_M(),
		VM(e),
		KM(),
		iP(e),
		oP()
	] };
}
//#endregion
//#region node_modules/micromark-extension-gfm-autolink-literal/lib/syntax.js
var fP = {
	tokenize: EP,
	partial: !0
}, pP = {
	tokenize: DP,
	partial: !0
}, mP = {
	tokenize: OP,
	partial: !0
}, hP = {
	tokenize: kP,
	partial: !0
}, gP = {
	tokenize: AP,
	partial: !0
}, _P = {
	name: "wwwAutolink",
	tokenize: wP,
	previous: jP
}, vP = {
	name: "protocolAutolink",
	tokenize: TP,
	previous: MP
}, yP = {
	name: "emailAutolink",
	tokenize: CP,
	previous: NP
}, bP = {};
function xP() {
	return { text: bP };
}
for (var SP = 48; SP < 123;) bP[SP] = yP, SP++, SP === 58 ? SP = 65 : SP === 91 && (SP = 97);
bP[43] = yP, bP[45] = yP, bP[46] = yP, bP[95] = yP, bP[72] = [yP, vP], bP[104] = [yP, vP], bP[87] = [yP, _P], bP[119] = [yP, _P];
function CP(e, t, n) {
	let r = this, i, a;
	return o;
	function o(t) {
		return !PP(t) || !NP.call(r, r.previous) || FP(r.events) ? n(t) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), s(t));
	}
	function s(t) {
		return PP(t) ? (e.consume(t), s) : t === 64 ? (e.consume(t), c) : n(t);
	}
	function c(t) {
		return t === 46 ? e.check(gP, u, l)(t) : t === 45 || t === 95 || gD(t) ? (a = !0, e.consume(t), c) : u(t);
	}
	function l(t) {
		return e.consume(t), i = !0, c;
	}
	function u(o) {
		return a && i && hD(r.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), t(o)) : n(o);
	}
}
function wP(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return t !== 87 && t !== 119 || !jP.call(r, r.previous) || FP(r.events) ? n(t) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(fP, e.attempt(pP, e.attempt(mP, a), n), n)(t));
	}
	function a(n) {
		return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), t(n);
	}
}
function TP(e, t, n) {
	let r = this, i = "", a = !1;
	return o;
	function o(t) {
		return (t === 72 || t === 104) && MP.call(r, r.previous) && !FP(r.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), i += String.fromCodePoint(t), e.consume(t), s) : n(t);
	}
	function s(t) {
		if (hD(t) && i.length < 5) return i += String.fromCodePoint(t), e.consume(t), s;
		if (t === 58) {
			let n = i.toLowerCase();
			if (n === "http" || n === "https") return e.consume(t), c;
		}
		return n(t);
	}
	function c(t) {
		return t === 47 ? (e.consume(t), a ? l : (a = !0, c)) : n(t);
	}
	function l(t) {
		return t === null || vD(t) || SD(t) || wD(t) || CD(t) ? n(t) : e.attempt(pP, e.attempt(mP, u), n)(t);
	}
	function u(n) {
		return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), t(n);
	}
}
function EP(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return (t === 87 || t === 119) && r < 3 ? (r++, e.consume(t), i) : t === 46 && r === 3 ? (e.consume(t), a) : n(t);
	}
	function a(e) {
		return e === null ? n(e) : t(e);
	}
}
function DP(e, t, n) {
	let r, i, a;
	return o;
	function o(t) {
		return t === 46 || t === 95 ? e.check(hP, c, s)(t) : t === null || SD(t) || wD(t) || t !== 45 && CD(t) ? c(t) : (a = !0, e.consume(t), o);
	}
	function s(t) {
		return t === 95 ? r = !0 : (i = r, r = void 0), e.consume(t), o;
	}
	function c(e) {
		return i || r || !a ? n(e) : t(e);
	}
}
function OP(e, t) {
	let n = 0, r = 0;
	return i;
	function i(o) {
		return o === 40 ? (n++, e.consume(o), i) : o === 41 && r < n ? a(o) : o === 33 || o === 34 || o === 38 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 60 || o === 63 || o === 93 || o === 95 || o === 126 ? e.check(hP, t, a)(o) : o === null || SD(o) || wD(o) ? t(o) : (e.consume(o), i);
	}
	function a(t) {
		return t === 41 && r++, e.consume(t), i;
	}
}
function kP(e, t, n) {
	return r;
	function r(o) {
		return o === 33 || o === 34 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 63 || o === 95 || o === 126 ? (e.consume(o), r) : o === 38 ? (e.consume(o), a) : o === 93 ? (e.consume(o), i) : o === 60 || o === null || SD(o) || wD(o) ? t(o) : n(o);
	}
	function i(e) {
		return e === null || e === 40 || e === 91 || SD(e) || wD(e) ? t(e) : r(e);
	}
	function a(e) {
		return hD(e) ? o(e) : n(e);
	}
	function o(t) {
		return t === 59 ? (e.consume(t), r) : hD(t) ? (e.consume(t), o) : n(t);
	}
}
function AP(e, t, n) {
	return r;
	function r(t) {
		return e.consume(t), i;
	}
	function i(e) {
		return gD(e) ? n(e) : t(e);
	}
}
function jP(e) {
	return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || SD(e);
}
function MP(e) {
	return !hD(e);
}
function NP(e) {
	return !(e === 47 || PP(e));
}
function PP(e) {
	return e === 43 || e === 45 || e === 46 || e === 95 || gD(e);
}
function FP(e) {
	let t = e.length, n = !1;
	for (; t--;) {
		let r = e[t][1];
		if ((r.type === "labelLink" || r.type === "labelImage") && !r._balanced) {
			n = !0;
			break;
		}
		if (r._gfmAutolinkLiteralWalkedInto) {
			n = !1;
			break;
		}
	}
	return e.length > 0 && !n && (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), n;
}
//#endregion
//#region node_modules/micromark-extension-gfm-footnote/lib/syntax.js
var IP = {
	tokenize: WP,
	partial: !0
};
function LP() {
	return {
		document: { 91: {
			name: "gfmFootnoteDefinition",
			tokenize: VP,
			continuation: { tokenize: HP },
			exit: UP
		} },
		text: {
			91: {
				name: "gfmFootnoteCall",
				tokenize: BP
			},
			93: {
				name: "gfmPotentialFootnoteCall",
				add: "after",
				tokenize: RP,
				resolveTo: zP
			}
		}
	};
}
function RP(e, t, n) {
	let r = this, i = r.events.length, a = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), o;
	for (; i--;) {
		let e = r.events[i][1];
		if (e.type === "labelImage") {
			o = e;
			break;
		}
		if (e.type === "gfmFootnoteCall" || e.type === "labelLink" || e.type === "label" || e.type === "image" || e.type === "link") break;
	}
	return s;
	function s(i) {
		if (!o || !o._balanced) return n(i);
		let s = mD(r.sliceSerialize({
			start: o.end,
			end: r.now()
		}));
		return s.codePointAt(0) !== 94 || !a.includes(s.slice(1)) ? n(i) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(i), e.exit("gfmFootnoteCallLabelMarker"), t(i));
	}
}
function zP(e, t) {
	let n = e.length;
	for (; n--;) if (e[n][1].type === "labelImage" && e[n][0] === "enter") {
		e[n][1];
		break;
	}
	e[n + 1][1].type = "data", e[n + 3][1].type = "gfmFootnoteCallLabelMarker";
	let r = {
		type: "gfmFootnoteCall",
		start: Object.assign({}, e[n + 3][1].start),
		end: Object.assign({}, e[e.length - 1][1].end)
	}, i = {
		type: "gfmFootnoteCallMarker",
		start: Object.assign({}, e[n + 3][1].end),
		end: Object.assign({}, e[n + 3][1].end)
	};
	i.end.column++, i.end.offset++, i.end._bufferIndex++;
	let a = {
		type: "gfmFootnoteCallString",
		start: Object.assign({}, i.end),
		end: Object.assign({}, e[e.length - 1][1].start)
	}, o = {
		type: "chunkString",
		contentType: "string",
		start: Object.assign({}, a.start),
		end: Object.assign({}, a.end)
	}, s = [
		e[n + 1],
		e[n + 2],
		[
			"enter",
			r,
			t
		],
		e[n + 3],
		e[n + 4],
		[
			"enter",
			i,
			t
		],
		[
			"exit",
			i,
			t
		],
		[
			"enter",
			a,
			t
		],
		[
			"enter",
			o,
			t
		],
		[
			"exit",
			o,
			t
		],
		[
			"exit",
			a,
			t
		],
		e[e.length - 2],
		e[e.length - 1],
		[
			"exit",
			r,
			t
		]
	];
	return e.splice(n, e.length - n + 1, ...s), e;
}
function BP(e, t, n) {
	let r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), a = 0, o;
	return s;
	function s(t) {
		return e.enter("gfmFootnoteCall"), e.enter("gfmFootnoteCallLabelMarker"), e.consume(t), e.exit("gfmFootnoteCallLabelMarker"), c;
	}
	function c(t) {
		return t === 94 ? (e.enter("gfmFootnoteCallMarker"), e.consume(t), e.exit("gfmFootnoteCallMarker"), e.enter("gfmFootnoteCallString"), e.enter("chunkString").contentType = "string", l) : n(t);
	}
	function l(s) {
		if (a > 999 || s === 93 && !o || s === null || s === 91 || SD(s)) return n(s);
		if (s === 93) {
			e.exit("chunkString");
			let a = e.exit("gfmFootnoteCallString");
			return i.includes(mD(r.sliceSerialize(a))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(s), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), t) : n(s);
		}
		return SD(s) || (o = !0), a++, e.consume(s), s === 92 ? u : l;
	}
	function u(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), a++, l) : l(t);
	}
}
function VP(e, t, n) {
	let r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), a, o = 0, s;
	return c;
	function c(t) {
		return e.enter("gfmFootnoteDefinition")._container = !0, e.enter("gfmFootnoteDefinitionLabel"), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionLabelMarker"), l;
	}
	function l(t) {
		return t === 94 ? (e.enter("gfmFootnoteDefinitionMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionMarker"), e.enter("gfmFootnoteDefinitionLabelString"), e.enter("chunkString").contentType = "string", u) : n(t);
	}
	function u(t) {
		if (o > 999 || t === 93 && !s || t === null || t === 91 || SD(t)) return n(t);
		if (t === 93) {
			e.exit("chunkString");
			let n = e.exit("gfmFootnoteDefinitionLabelString");
			return a = mD(r.sliceSerialize(n)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), f;
		}
		return SD(t) || (s = !0), o++, e.consume(t), t === 92 ? d : u;
	}
	function d(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), o++, u) : u(t);
	}
	function f(t) {
		return t === 58 ? (e.enter("definitionMarker"), e.consume(t), e.exit("definitionMarker"), i.includes(a) || i.push(a), $(e, p, "gfmFootnoteDefinitionWhitespace")) : n(t);
	}
	function p(e) {
		return t(e);
	}
}
function HP(e, t, n) {
	return e.check(VD, t, e.attempt(IP, t, n));
}
function UP(e) {
	e.exit("gfmFootnoteDefinition");
}
function WP(e, t, n) {
	let r = this;
	return $(e, i, "gfmFootnoteDefinitionIndent", 5);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return i && i[1].type === "gfmFootnoteDefinitionIndent" && i[2].sliceSerialize(i[1], !0).length === 4 ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-extension-gfm-strikethrough/lib/syntax.js
function GP(e) {
	let t = (e || {}).singleTilde, n = {
		name: "strikethrough",
		tokenize: i,
		resolveAll: r
	};
	return t ??= !0, {
		text: { 126: n },
		insideSpan: { null: [n] },
		attentionMarkers: { null: [126] }
	};
	function r(e, t) {
		let n = -1;
		for (; ++n < e.length;) if (e[n][0] === "enter" && e[n][1].type === "strikethroughSequenceTemporary" && e[n][1]._close) {
			let r = n;
			for (; r--;) if (e[r][0] === "exit" && e[r][1].type === "strikethroughSequenceTemporary" && e[r][1]._open && e[n][1].end.offset - e[n][1].start.offset === e[r][1].end.offset - e[r][1].start.offset) {
				e[n][1].type = "strikethroughSequence", e[r][1].type = "strikethroughSequence";
				let i = {
					type: "strikethrough",
					start: Object.assign({}, e[r][1].start),
					end: Object.assign({}, e[n][1].end)
				}, a = {
					type: "strikethroughText",
					start: Object.assign({}, e[r][1].end),
					end: Object.assign({}, e[n][1].start)
				}, o = [
					[
						"enter",
						i,
						t
					],
					[
						"enter",
						e[r][1],
						t
					],
					[
						"exit",
						e[r][1],
						t
					],
					[
						"enter",
						a,
						t
					]
				], s = t.parser.constructs.insideSpan.null;
				s && sD(o, o.length, 0, PD(s, e.slice(r + 1, n), t)), sD(o, o.length, 0, [
					[
						"exit",
						a,
						t
					],
					[
						"enter",
						e[n][1],
						t
					],
					[
						"exit",
						e[n][1],
						t
					],
					[
						"exit",
						i,
						t
					]
				]), sD(e, r - 1, n - r + 3, o), n = r + o.length - 2;
				break;
			}
		}
		for (n = -1; ++n < e.length;) e[n][1].type === "strikethroughSequenceTemporary" && (e[n][1].type = "data");
		return e;
	}
	function i(e, n, r) {
		let i = this.previous, a = this.events, o = 0;
		return s;
		function s(t) {
			return i === 126 && a[a.length - 1][1].type !== "characterEscape" ? r(t) : (e.enter("strikethroughSequenceTemporary"), c(t));
		}
		function c(a) {
			let s = ND(i);
			if (a === 126) return o > 1 ? r(a) : (e.consume(a), o++, c);
			if (o < 2 && !t) return r(a);
			let l = e.exit("strikethroughSequenceTemporary"), u = ND(a);
			return l._open = !u || u === 2 && !!s, l._close = !s || s === 2 && !!u, n(a);
		}
	}
}
//#endregion
//#region node_modules/micromark-extension-gfm-table/lib/edit-map.js
var KP = class {
	constructor() {
		this.map = [], this.index = /* @__PURE__ */ new Map();
	}
	add(e, t, n) {
		qP(this, e, t, n);
	}
	consume(e) {
		/* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
		if (this.map.sort(function(e, t) {
			return e[0] - t[0];
		}), this.map.length === 0) return;
		let t = this.map.length, n = [];
		for (; t > 0;) --t, n.push(e.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), e.length = this.map[t][0];
		n.push(e.slice()), e.length = 0;
		let r = n.pop();
		for (; r;) {
			for (let t of r) e.push(t);
			r = n.pop();
		}
		this.map.length = 0, this.index.clear();
	}
};
function qP(e, t, n, r) {
	/* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
	if (n === 0 && r.length === 0) return;
	let i = e.index.get(t);
	if (i) {
		i[1] += n, i[2].push(...r);
		return;
	}
	let a = [
		t,
		n,
		r
	];
	e.map.push(a), e.index.set(t, a);
}
//#endregion
//#region node_modules/micromark-extension-gfm-table/lib/infer.js
function JP(e, t) {
	let n = !1, r = [];
	for (; t < e.length;) {
		let i = e[t];
		if (n) {
			if (i[0] === "enter") i[1].type === "tableContent" && r.push(e[t + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
			else if (i[1].type === "tableContent") {
				if (e[t - 1][1].type === "tableDelimiterMarker") {
					let e = r.length - 1;
					r[e] = r[e] === "left" ? "center" : "right";
				}
			} else if (i[1].type === "tableDelimiterRow") break;
		} else i[0] === "enter" && i[1].type === "tableDelimiterRow" && (n = !0);
		t += 1;
	}
	return r;
}
//#endregion
//#region node_modules/micromark-extension-gfm-table/lib/syntax.js
function YP() {
	return { flow: { null: {
		name: "table",
		tokenize: XP,
		resolveAll: ZP
	} } };
}
function XP(e, t, n) {
	let r = this, i = 0, a = 0, o;
	return s;
	function s(e) {
		let t = r.events.length - 1;
		for (; t > -1;) {
			let { type: e } = r.events[t][1];
			if (e === "lineEnding" || e === "linePrefix") t--;
			else break;
		}
		let i = t > -1 ? r.events[t][1].type : null, a = i === "tableHead" || i === "tableRow" ? S : c;
		return a === S && r.parser.lazy[r.now().line] ? n(e) : a(e);
	}
	function c(t) {
		return e.enter("tableHead"), e.enter("tableRow"), l(t);
	}
	function l(e) {
		return e === 124 ? u(e) : (o = !0, a += 1, u(e));
	}
	function u(t) {
		return t === null ? n(t) : Z(t) ? a > 1 ? (a = 0, r.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), p) : n(t) : Q(t) ? $(e, u, "whitespace")(t) : (a += 1, o && (o = !1, i += 1), t === 124 ? (e.enter("tableCellDivider"), e.consume(t), e.exit("tableCellDivider"), o = !0, u) : (e.enter("data"), d(t)));
	}
	function d(t) {
		return t === null || t === 124 || SD(t) ? (e.exit("data"), u(t)) : (e.consume(t), t === 92 ? f : d);
	}
	function f(t) {
		return t === 92 || t === 124 ? (e.consume(t), d) : d(t);
	}
	function p(t) {
		return r.interrupt = !1, r.parser.lazy[r.now().line] ? n(t) : (e.enter("tableDelimiterRow"), o = !1, Q(t) ? $(e, m, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : m(t));
	}
	function m(t) {
		return t === 45 || t === 58 ? g(t) : t === 124 ? (o = !0, e.enter("tableCellDivider"), e.consume(t), e.exit("tableCellDivider"), h) : x(t);
	}
	function h(t) {
		return Q(t) ? $(e, g, "whitespace")(t) : g(t);
	}
	function g(t) {
		return t === 58 ? (a += 1, o = !0, e.enter("tableDelimiterMarker"), e.consume(t), e.exit("tableDelimiterMarker"), _) : t === 45 ? (a += 1, _(t)) : t === null || Z(t) ? b(t) : x(t);
	}
	function _(t) {
		return t === 45 ? (e.enter("tableDelimiterFiller"), v(t)) : x(t);
	}
	function v(t) {
		return t === 45 ? (e.consume(t), v) : t === 58 ? (o = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(t), e.exit("tableDelimiterMarker"), y) : (e.exit("tableDelimiterFiller"), y(t));
	}
	function y(t) {
		return Q(t) ? $(e, b, "whitespace")(t) : b(t);
	}
	function b(n) {
		return n === 124 ? m(n) : n === null || Z(n) ? !o || i !== a ? x(n) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), t(n)) : x(n);
	}
	function x(e) {
		return n(e);
	}
	function S(t) {
		return e.enter("tableRow"), C(t);
	}
	function C(n) {
		return n === 124 ? (e.enter("tableCellDivider"), e.consume(n), e.exit("tableCellDivider"), C) : n === null || Z(n) ? (e.exit("tableRow"), t(n)) : Q(n) ? $(e, C, "whitespace")(n) : (e.enter("data"), w(n));
	}
	function w(t) {
		return t === null || t === 124 || SD(t) ? (e.exit("data"), C(t)) : (e.consume(t), t === 92 ? T : w);
	}
	function T(t) {
		return t === 92 || t === 124 ? (e.consume(t), w) : w(t);
	}
}
function ZP(e, t) {
	let n = -1, r = !0, i = 0, a = [
		0,
		0,
		0,
		0
	], o = [
		0,
		0,
		0,
		0
	], s = !1, c = 0, l, u, d, f = new KP();
	for (; ++n < e.length;) {
		let p = e[n], m = p[1];
		p[0] === "enter" ? m.type === "tableHead" ? (s = !1, c !== 0 && ($P(f, t, c, l, u), u = void 0, c = 0), l = {
			type: "table",
			start: Object.assign({}, m.start),
			end: Object.assign({}, m.end)
		}, f.add(n, 0, [[
			"enter",
			l,
			t
		]])) : m.type === "tableRow" || m.type === "tableDelimiterRow" ? (r = !0, d = void 0, a = [
			0,
			0,
			0,
			0
		], o = [
			0,
			n + 1,
			0,
			0
		], s && (s = !1, u = {
			type: "tableBody",
			start: Object.assign({}, m.start),
			end: Object.assign({}, m.end)
		}, f.add(n, 0, [[
			"enter",
			u,
			t
		]])), i = m.type === "tableDelimiterRow" ? 2 : u ? 3 : 1) : i && (m.type === "data" || m.type === "tableDelimiterMarker" || m.type === "tableDelimiterFiller") ? (r = !1, o[2] === 0 && (a[1] !== 0 && (o[0] = o[1], d = QP(f, t, a, i, void 0, d), a = [
			0,
			0,
			0,
			0
		]), o[2] = n)) : m.type === "tableCellDivider" && (r ? r = !1 : (a[1] !== 0 && (o[0] = o[1], d = QP(f, t, a, i, void 0, d)), a = o, o = [
			a[1],
			n,
			0,
			0
		])) : m.type === "tableHead" ? (s = !0, c = n) : m.type === "tableRow" || m.type === "tableDelimiterRow" ? (c = n, a[1] === 0 ? o[1] !== 0 && (d = QP(f, t, o, i, n, d)) : (o[0] = o[1], d = QP(f, t, a, i, n, d)), i = 0) : i && (m.type === "data" || m.type === "tableDelimiterMarker" || m.type === "tableDelimiterFiller") && (o[3] = n);
	}
	for (c !== 0 && $P(f, t, c, l, u), f.consume(t.events), n = -1; ++n < t.events.length;) {
		let e = t.events[n];
		e[0] === "enter" && e[1].type === "table" && (e[1]._align = JP(t.events, n));
	}
	return e;
}
function QP(e, t, n, r, i, a) {
	let o = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData";
	n[0] !== 0 && (a.end = Object.assign({}, eF(t.events, n[0])), e.add(n[0], 0, [[
		"exit",
		a,
		t
	]]));
	let s = eF(t.events, n[1]);
	if (a = {
		type: o,
		start: Object.assign({}, s),
		end: Object.assign({}, s)
	}, e.add(n[1], 0, [[
		"enter",
		a,
		t
	]]), n[2] !== 0) {
		let i = eF(t.events, n[2]), a = eF(t.events, n[3]), o = {
			type: "tableContent",
			start: Object.assign({}, i),
			end: Object.assign({}, a)
		};
		if (e.add(n[2], 0, [[
			"enter",
			o,
			t
		]]), r !== 2) {
			let r = t.events[n[2]], i = t.events[n[3]];
			if (r[1].end = Object.assign({}, i[1].end), r[1].type = "chunkText", r[1].contentType = "text", n[3] > n[2] + 1) {
				let t = n[2] + 1, r = n[3] - n[2] - 1;
				e.add(t, r, []);
			}
		}
		e.add(n[3] + 1, 0, [[
			"exit",
			o,
			t
		]]);
	}
	return i !== void 0 && (a.end = Object.assign({}, eF(t.events, i)), e.add(i, 0, [[
		"exit",
		a,
		t
	]]), a = void 0), a;
}
function $P(e, t, n, r, i) {
	let a = [], o = eF(t.events, n);
	i && (i.end = Object.assign({}, o), a.push([
		"exit",
		i,
		t
	])), r.end = Object.assign({}, o), a.push([
		"exit",
		r,
		t
	]), e.add(n + 1, 0, a);
}
function eF(e, t) {
	let n = e[t], r = n[0] === "enter" ? "start" : "end";
	return n[1][r];
}
//#endregion
//#region node_modules/micromark-extension-gfm-task-list-item/lib/syntax.js
var tF = {
	name: "tasklistCheck",
	tokenize: rF
};
function nF() {
	return { text: { 91: tF } };
}
function rF(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return r.previous !== null || !r._gfmTasklistFirstContentOfListItem ? n(t) : (e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(t), e.exit("taskListCheckMarker"), a);
	}
	function a(t) {
		return SD(t) ? (e.enter("taskListCheckValueUnchecked"), e.consume(t), e.exit("taskListCheckValueUnchecked"), o) : t === 88 || t === 120 ? (e.enter("taskListCheckValueChecked"), e.consume(t), e.exit("taskListCheckValueChecked"), o) : n(t);
	}
	function o(t) {
		return t === 93 ? (e.enter("taskListCheckMarker"), e.consume(t), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), s) : n(t);
	}
	function s(r) {
		return Z(r) ? t(r) : Q(r) ? e.check({ tokenize: iF }, t, n)(r) : n(r);
	}
}
function iF(e, t, n) {
	return $(e, r, "whitespace");
	function r(e) {
		return e === null ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-extension-gfm/index.js
function aF(e) {
	return uD([
		xP(),
		LP(),
		GP(e),
		YP(),
		nF()
	]);
}
//#endregion
//#region node_modules/remark-gfm/lib/index.js
var oF = {};
function sF(e) {
	let t = this, n = e || oF, r = t.data(), i = r.micromarkExtensions ||= [], a = r.fromMarkdownExtensions ||= [], o = r.toMarkdownExtensions ||= [];
	i.push(aF(n)), a.push(uP()), o.push(dP(n));
}
//#endregion
//#region node_modules/hast-util-sanitize/lib/schema.js
var cF = [
	"ariaDescribedBy",
	"ariaLabel",
	"ariaLabelledBy"
], lF = {
	ancestors: {
		tbody: ["table"],
		td: ["table"],
		th: ["table"],
		thead: ["table"],
		tfoot: ["table"],
		tr: ["table"]
	},
	attributes: {
		a: [
			...cF,
			"dataFootnoteBackref",
			"dataFootnoteRef",
			["className", "data-footnote-backref"],
			"href"
		],
		blockquote: ["cite"],
		code: [["className", /^language-./]],
		del: ["cite"],
		div: ["itemScope", "itemType"],
		dl: [...cF],
		h2: [["className", "sr-only"]],
		img: [
			...cF,
			"longDesc",
			"src"
		],
		input: [["disabled", !0], ["type", "checkbox"]],
		ins: ["cite"],
		li: [["className", "task-list-item"]],
		ol: [...cF, ["className", "contains-task-list"]],
		q: ["cite"],
		section: ["dataFootnotes", ["className", "footnotes"]],
		source: ["srcSet"],
		summary: [...cF],
		table: [...cF],
		ul: [...cF, ["className", "contains-task-list"]],
		"*": /* @__PURE__ */ "abbr.accept.acceptCharset.accessKey.action.align.alt.axis.border.cellPadding.cellSpacing.char.charOff.charSet.checked.clear.colSpan.color.cols.compact.coords.dateTime.dir.encType.frame.hSpace.headers.height.hrefLang.htmlFor.id.isMap.itemProp.label.lang.maxLength.media.method.multiple.name.noHref.noShade.noWrap.open.prompt.readOnly.rev.rowSpan.rows.rules.scope.selected.shape.size.span.start.summary.tabIndex.title.useMap.vAlign.value.width".split(".")
	},
	clobber: [
		"ariaDescribedBy",
		"ariaLabelledBy",
		"id",
		"name"
	],
	clobberPrefix: "user-content-",
	protocols: {
		cite: ["http", "https"],
		href: [
			"http",
			"https",
			"irc",
			"ircs",
			"mailto",
			"xmpp"
		],
		longDesc: ["http", "https"],
		src: ["http", "https"]
	},
	required: { input: {
		disabled: !0,
		type: "checkbox"
	} },
	strip: ["script"],
	tagNames: /* @__PURE__ */ "a.b.blockquote.br.code.dd.del.details.div.dl.dt.em.h1.h2.h3.h4.h5.h6.hr.i.img.input.ins.kbd.li.ol.p.picture.pre.q.rp.rt.ruby.s.samp.section.source.span.strike.strong.sub.summary.sup.table.tbody.td.tfoot.th.thead.tr.tt.ul.var".split(".")
}, uF = {}.hasOwnProperty;
function dF(e, t) {
	let n = {
		type: "root",
		children: []
	}, r = fF({
		schema: t ? {
			...lF,
			...t
		} : lF,
		stack: []
	}, e);
	return r && (Array.isArray(r) ? r.length === 1 ? n = r[0] : n.children = r : n = r), n;
}
function fF(e, t) {
	if (t && typeof t == "object") {
		let n = t;
		switch (typeof n.type == "string" ? n.type : "") {
			case "comment": return pF(e, n);
			case "doctype": return mF(e, n);
			case "element": return hF(e, n);
			case "root": return gF(e, n);
			case "text": return _F(e, n);
		}
	}
}
function pF(e, t) {
	if (e.schema.allowComments) {
		let e = typeof t.value == "string" ? t.value : "", n = e.indexOf("-->"), r = {
			type: "comment",
			value: n < 0 ? e : e.slice(0, n)
		};
		return wF(r, t), r;
	}
}
function mF(e, t) {
	if (e.schema.allowDoctypes) {
		let e = { type: "doctype" };
		return wF(e, t), e;
	}
}
function hF(e, t) {
	let n = typeof t.tagName == "string" ? t.tagName : "";
	e.stack.push(n);
	let r = vF(e, t.children), i = yF(e, t.properties);
	e.stack.pop();
	let a = !1;
	if (n && n !== "*" && (!e.schema.tagNames || e.schema.tagNames.includes(n)) && (a = !0, e.schema.ancestors && uF.call(e.schema.ancestors, n))) {
		let t = e.schema.ancestors[n], r = -1;
		for (a = !1; ++r < t.length;) e.stack.includes(t[r]) && (a = !0);
	}
	if (!a) return e.schema.strip && !e.schema.strip.includes(n) ? r : void 0;
	let o = {
		type: "element",
		tagName: n,
		properties: i,
		children: r
	};
	return wF(o, t), o;
}
function gF(e, t) {
	let n = {
		type: "root",
		children: vF(e, t.children)
	};
	return wF(n, t), n;
}
function _F(e, t) {
	let n = {
		type: "text",
		value: typeof t.value == "string" ? t.value : ""
	};
	return wF(n, t), n;
}
function vF(e, t) {
	let n = [];
	if (Array.isArray(t)) {
		let r = t, i = -1;
		for (; ++i < r.length;) {
			let t = fF(e, r[i]);
			t && (Array.isArray(t) ? n.push(...t) : n.push(t));
		}
	}
	return n;
}
function yF(e, t) {
	let n = e.stack[e.stack.length - 1], r = e.schema.attributes, i = e.schema.required, a = r && uF.call(r, n) ? r[n] : void 0, o = r && uF.call(r, "*") ? r["*"] : void 0, s = t && typeof t == "object" ? t : {}, c = {}, l;
	for (l in s) if (uF.call(s, l)) {
		let t = s[l], n = bF(e, TF(a, l), l, t);
		n ??= bF(e, TF(o, l), l, t), n != null && (c[l] = n);
	}
	if (i && uF.call(i, n)) {
		let e = i[n];
		for (l in e) uF.call(e, l) && !uF.call(c, l) && (c[l] = e[l]);
	}
	return c;
}
function bF(e, t, n, r) {
	return t ? Array.isArray(r) ? xF(e, t, n, r) : SF(e, t, n, r) : void 0;
}
function xF(e, t, n, r) {
	let i = -1, a = [];
	for (; ++i < r.length;) {
		let o = SF(e, t, n, r[i]);
		(typeof o == "number" || typeof o == "string") && a.push(o);
	}
	return a;
}
function SF(e, t, n, r) {
	if ((typeof r == "boolean" || typeof r == "number" || typeof r == "string") && CF(e, n, r)) {
		if (typeof t == "object" && t.length > 1) {
			let e = !1, n = 0;
			for (; ++n < t.length;) {
				let i = t[n];
				if (i && typeof i == "object" && "flags" in i) {
					if (i.test(String(r))) {
						e = !0;
						break;
					}
				} else if (i === r) {
					e = !0;
					break;
				}
			}
			if (!e) return;
		}
		return e.schema.clobber && e.schema.clobberPrefix && e.schema.clobber.includes(n) ? e.schema.clobberPrefix + r : r;
	}
}
function CF(e, t, n) {
	let r = e.schema.protocols && uF.call(e.schema.protocols, t) ? e.schema.protocols[t] : void 0;
	if (!r || r.length === 0) return !0;
	let i = String(n), a = i.indexOf(":"), o = i.indexOf("?"), s = i.indexOf("#"), c = i.indexOf("/");
	if (a < 0 || c > -1 && a > c || o > -1 && a > o || s > -1 && a > s) return !0;
	let l = -1;
	for (; ++l < r.length;) {
		let e = r[l];
		if (a === e.length && i.slice(0, e.length) === e) return !0;
	}
	return !1;
}
function wF(e, t) {
	let n = vE(t);
	t.data && (e.data = WA(t.data)), n && (e.position = n);
}
function TF(e, t) {
	let n, r = -1;
	if (e) for (; ++r < e.length;) {
		let i = e[r], a = typeof i == "string" ? i : i[0];
		if (a === t) return i;
		a === "data*" && (n = i);
	}
	if (t.length > 4 && t.slice(0, 4).toLowerCase() === "data") return n;
}
//#endregion
//#region node_modules/rehype-sanitize/lib/index.js
function EF(e) {
	return function(t) {
		return dF(t, e);
	};
}
//#endregion
//#region node_modules/hast-util-is-element/lib/index.js
var DF = (function(e) {
	if (e == null) return jF;
	if (typeof e == "string") return kF(e);
	if (typeof e == "object") return OF(e);
	if (typeof e == "function") return AF(e);
	throw Error("Expected function, string, or array as `test`");
});
function OF(e) {
	let t = [], n = -1;
	for (; ++n < e.length;) t[n] = DF(e[n]);
	return AF(r);
	function r(...e) {
		let n = -1;
		for (; ++n < t.length;) if (t[n].apply(this, e)) return !0;
		return !1;
	}
}
function kF(e) {
	return AF(t);
	function t(t) {
		return t.tagName === e;
	}
}
function AF(e) {
	return t;
	function t(t, n, r) {
		return !!(MF(t) && e.call(this, t, typeof n == "number" ? n : void 0, r || void 0));
	}
}
function jF(e) {
	return !!(e && typeof e == "object" && "type" in e && e.type === "element" && "tagName" in e && typeof e.tagName == "string");
}
function MF(e) {
	return typeof e == "object" && !!e && "type" in e && "tagName" in e;
}
//#endregion
//#region node_modules/is-absolute-url/index.js
var NF = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/, PF = /^[a-zA-Z]:\\/;
function FF(e) {
	if (typeof e != "string") throw TypeError(`Expected a \`string\`, got \`${typeof e}\``);
	return !PF.test(e) && NF.test(e);
}
//#endregion
//#region node_modules/rehype-external-links/lib/index.js
var IF = ["http", "https"], LF = ["nofollow"], RF = {};
function zF(e) {
	let t = e || RF, n = t.protocols || IF, r = DF(t.test);
	return function(e) {
		aj(e, "element", function(e, i, a) {
			if (e.tagName === "a" && typeof e.properties.href == "string" && r(e, i, a)) {
				let r = e.properties.href;
				if (FF(r) ? n.includes(r.slice(0, r.indexOf(":"))) : r.startsWith("//")) {
					let n = BF(t.content, e), r = n && !Array.isArray(n) ? [n] : n, i = BF(t.rel, e) || LF, a = typeof i == "string" ? lE(i) : i, o = BF(t.target, e), s = BF(t.properties, e);
					if (s && Object.assign(e.properties, WA(s)), a.length > 0 && (e.properties.rel = [...a]), o && (e.properties.target = o), r) {
						let n = BF(t.contentProperties, e) || {};
						e.children.push({
							type: "element",
							tagName: "span",
							properties: WA(n),
							children: WA(r)
						});
					}
				}
			}
		});
	};
}
function BF(e, t) {
	return typeof e == "function" ? e(t) : e;
}
//#endregion
//#region Build/Frontend/src/components/ai/markdown.tsx
var VF = {
	...lF,
	attributes: {
		...lF.attributes,
		a: [
			...lF.attributes?.a ?? [],
			"target",
			"rel"
		],
		code: [...lF.attributes?.code ?? [], ["className", /^language-./]]
	}
};
function HF({ children: e, className: t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		className: H("sui-prose", t),
		children: /* @__PURE__ */ (0, R.jsx)(rM, {
			remarkPlugins: [sF],
			rehypePlugins: [[EF, VF], [zF, {
				target: "_blank",
				rel: ["noopener", "noreferrer"]
			}]],
			children: e
		})
	});
}
var UF = (0, _.memo)(HF);
//#endregion
//#region Build/Frontend/src/components/ui/collapsible.tsx
function WF({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(pa, {
		"data-slot": "collapsible",
		...e
	});
}
function GF({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(ca, {
		"data-slot": "collapsible-trigger",
		...e
	});
}
function KF({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(ua, {
		"data-slot": "collapsible-content",
		...e
	});
}
//#endregion
//#region Build/Frontend/src/components/ai/shimmer.tsx
function qF({ as: e = "span", className: t, children: n, ...r }) {
	return /* @__PURE__ */ (0, R.jsx)(e, {
		className: H("shimmer inline-block", t),
		...r,
		children: n
	});
}
//#endregion
//#region Build/Frontend/src/components/ai/reasoning.tsx
var JF = (0, _.createContext)(null);
function YF() {
	let e = (0, _.useContext)(JF);
	if (e === null) throw Error("Reasoning components must be used inside <Reasoning>.");
	return e;
}
function XF({ className: e, isStreaming: t = !1, defaultOpen: n = !1, children: r, ...i }) {
	let [a, o] = (0, _.useState)(n ? !0 : null), s = a ?? t, c = (0, _.useCallback)((e) => o(e), []), l = (0, _.useMemo)(() => ({
		isOpen: s,
		isStreaming: t
	}), [s, t]);
	return /* @__PURE__ */ (0, R.jsx)(JF.Provider, {
		value: l,
		children: /* @__PURE__ */ (0, R.jsx)(WF, {
			className: H("w-full", e),
			onOpenChange: c,
			open: s,
			...i,
			children: r
		})
	});
}
function ZF({ className: e, label: t, children: n, ...r }) {
	let { isOpen: i, isStreaming: a } = YF();
	return /* @__PURE__ */ (0, R.jsx)(GF, {
		className: H("flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground", e),
		...r,
		children: n ?? /* @__PURE__ */ (0, R.jsxs)(R.Fragment, { children: [
			/* @__PURE__ */ (0, R.jsx)(F, {
				className: "size-3.5",
				"aria-hidden": "true"
			}),
			a ? /* @__PURE__ */ (0, R.jsx)(qF, { children: "Thinking" }) : t ?? /* @__PURE__ */ (0, R.jsx)("span", { children: "Reasoning" }),
			/* @__PURE__ */ (0, R.jsx)(ne, {
				className: H("size-3.5 transition-transform", i && "rotate-180"),
				"aria-hidden": "true"
			})
		] })
	});
}
function QF({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, R.jsx)(KF, {
		className: H("mt-1.5 border-s ps-2.5 text-muted-foreground data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", e),
		...n,
		children: /* @__PURE__ */ (0, R.jsx)(UF, { children: t })
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/bubble.tsx
function $F({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "bubble-group",
		className: H("flex min-w-0 flex-col gap-2", e),
		...t
	});
}
var eI = Yt("group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full", {
	variants: { variant: {
		default: "*:data-[slot=bubble-content]:bg-primary *:data-[slot=bubble-content]:text-primary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary/80",
		secondary: "*:data-[slot=bubble-content]:bg-secondary *:data-[slot=bubble-content]:text-secondary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
		muted: "*:data-[slot=bubble-content]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_5%)]",
		tinted: "*:data-[slot=bubble-content]:bg-[oklch(from_var(--primary)_0.93_calc(c*0.4)_h)] *:data-[slot=bubble-content]:text-foreground dark:*:data-[slot=bubble-content]:bg-[oklch(from_var(--primary)_0.3_calc(c*0.4)_h)] [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[oklch(from_var(--primary)_0.88_calc(c*0.5)_h)] dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-[oklch(from_var(--primary)_0.35_calc(c*0.5)_h)]",
		outline: "*:data-[slot=bubble-content]:border-border *:data-[slot=bubble-content]:bg-background [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-input/30",
		ghost: "border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted/50",
		destructive: "*:data-[slot=bubble-content]:bg-destructive/10 *:data-[slot=bubble-content]:text-destructive dark:*:data-[slot=bubble-content]:bg-destructive/20 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/20 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/30"
	} },
	defaultVariants: { variant: "default" }
});
function tI({ variant: e = "default", align: t = "start", className: n, ...r }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "bubble",
		"data-variant": e,
		"data-align": t,
		className: H(eI({ variant: e }), n),
		...r
	});
}
function nI({ asChild: e = !1, className: t, ...n }) {
	let r = e ? Pr : "div";
	return /* @__PURE__ */ (0, R.jsx)(r, {
		"data-slot": "bubble-content",
		className: H("w-fit max-w-full min-w-0 overflow-hidden rounded-xl border border-transparent px-3 py-2 text-sm leading-relaxed wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-left [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-3 [button,a]:focus-visible:ring-ring/50", t),
		...n
	});
}
var rI = Yt("absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full bg-muted px-1.5 py-0.5 text-sm ring-3 ring-card has-[button]:p-0", {
	variants: {
		side: {
			top: "top-0 -translate-y-3/4",
			bottom: "bottom-0 translate-y-3/4"
		},
		align: {
			start: "left-3",
			end: "right-3"
		}
	},
	defaultVariants: {
		side: "bottom",
		align: "end"
	}
});
function iI({ side: e = "bottom", align: t = "end", className: n, ...r }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "bubble-reactions",
		"data-align": t,
		"data-side": e,
		className: H(rI({
			side: e,
			align: t
		}), n),
		...r
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/marker.tsx
var aI = Yt("group/marker relative flex min-h-4 w-full items-center gap-2 text-left text-sm text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [a]:underline [a]:underline-offset-3 [a]:hover:text-foreground", { variants: { variant: {
	default: "",
	separator: "before:mr-1 before:h-px before:min-w-0 before:flex-1 before:bg-border after:ml-1 after:h-px after:min-w-0 after:flex-1 after:bg-border",
	border: "border-b border-border pb-2"
} } });
function oI({ className: e, variant: t = "default", asChild: n = !1, ...r }) {
	let i = n ? Pr : "div";
	return /* @__PURE__ */ (0, R.jsx)(i, {
		"data-slot": "marker",
		"data-variant": t,
		className: H(aI({
			variant: t,
			className: e
		})),
		...r
	});
}
function sI({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("span", {
		"data-slot": "marker-icon",
		"aria-hidden": "true",
		className: H("size-4 shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
		...t
	});
}
function cI({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("span", {
		"data-slot": "marker-content",
		className: H("min-w-0 wrap-break-word group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/message.tsx
function lI({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "message-group",
		className: H("flex min-w-0 flex-col gap-2", e),
		...t
	});
}
function uI({ className: e, align: t = "start", ...n }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "message",
		"data-align": t,
		className: H("group/message relative flex w-full min-w-0 gap-2 text-sm data-[align=end]:flex-row-reverse", e),
		...n
	});
}
function dI({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "message-avatar",
		className: H("flex w-fit min-w-8 shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-muted group-has-data-[slot=message-footer]/message:-translate-y-8", e),
		...t
	});
}
function fI({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "message-content",
		className: H("flex w-full min-w-0 flex-col gap-2.5 wrap-break-word group-data-[align=end]/message:*:data-slot:self-end", e),
		...t
	});
}
function pI({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "message-header",
		className: H("flex max-w-full min-w-0 items-center px-3 text-xs font-medium text-muted-foreground group-has-data-[variant=ghost]/message:px-0", e),
		...t
	});
}
function mI({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "message-footer",
		className: H("flex max-w-full min-w-0 items-center px-3 text-xs font-medium text-muted-foreground group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/chat/approval-card.tsx
function hI({ approval: e, tools: t, busy: n, onDecide: r }) {
	let [i, a] = (0, _.useState)(!1), o = (0, _.useId)(), s = (0, _.useId)(), c = (e) => t.find((t) => t.name === e)?.effect ?? "non_idempotent_write", l = e.calls.length;
	return /* @__PURE__ */ (0, R.jsxs)("section", {
		"aria-labelledby": s,
		className: "sui-enter rounded-md border border-warning/50 bg-warning/5",
		children: [
			/* @__PURE__ */ (0, R.jsxs)("header", {
				className: "flex items-start gap-2 px-3 py-2.5",
				children: [/* @__PURE__ */ (0, R.jsx)(Dt, {
					className: "mt-0.5 size-4 shrink-0 text-warning",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, R.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, R.jsxs)("h3", {
						className: "font-semibold",
						id: s,
						children: [
							l,
							" tool ",
							l === 1 ? "call needs" : "calls need",
							" your approval"
						]
					}), /* @__PURE__ */ (0, R.jsx)("p", {
						className: "mt-0.5 text-muted-foreground",
						children: "The run is paused until you decide. Nothing has been written yet."
					})]
				})]
			}),
			/* @__PURE__ */ (0, R.jsx)(My, {}),
			/* @__PURE__ */ (0, R.jsx)("ul", {
				className: "divide-y",
				children: e.calls.map((e) => {
					let t = c(e.name);
					return /* @__PURE__ */ (0, R.jsx)("li", {
						className: H("effect-spine px-3 py-2", `effect-${t}`),
						children: /* @__PURE__ */ (0, R.jsxs)(WF, { children: [/* @__PURE__ */ (0, R.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, R.jsxs)("span", {
								className: "flex min-w-0 items-center gap-2",
								children: [/* @__PURE__ */ (0, R.jsx)("span", {
									className: "truncate font-mono font-medium",
									children: Er(e.name)
								}), /* @__PURE__ */ (0, R.jsx)(hb, { effect: t })]
							}), /* @__PURE__ */ (0, R.jsx)(GF, {
								asChild: !0,
								children: /* @__PURE__ */ (0, R.jsx)(zy, {
									size: "sm",
									variant: "ghost",
									children: "Arguments"
								})
							})]
						}), /* @__PURE__ */ (0, R.jsx)(KF, { children: /* @__PURE__ */ (0, R.jsx)("pre", {
							className: "mt-1.5 max-h-48 overflow-auto rounded-sm bg-muted px-2 py-1.5 font-mono text-[0.6875rem] leading-relaxed",
							children: JSON.stringify(e.arguments, null, 2)
						}) })] })
					}, `${e.index}-${e.callId}`);
				})
			}),
			/* @__PURE__ */ (0, R.jsx)(My, {}),
			/* @__PURE__ */ (0, R.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2 px-3 py-2.5",
				children: [/* @__PURE__ */ (0, R.jsxs)(tC, {
					className: "gap-2 font-normal text-muted-foreground",
					htmlFor: o,
					children: [/* @__PURE__ */ (0, R.jsx)(yS, {
						checked: i,
						disabled: n,
						id: o,
						onCheckedChange: (e) => a(e === !0)
					}), "Remember these tools for this conversation"]
				}), /* @__PURE__ */ (0, R.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, R.jsx)(zy, {
						disabled: n,
						onClick: () => r(!1, !1),
						size: "sm",
						variant: "outline",
						children: "Deny"
					}), /* @__PURE__ */ (0, R.jsx)(zy, {
						disabled: n,
						onClick: () => r(!0, i),
						size: "sm",
						children: l === 1 ? "Approve" : `Approve all ${l}`
					})]
				})]
			})
		]
	});
}
//#endregion
//#region Build/Frontend/src/chat/input-card.tsx
var gI = "ABCDEFGHIJ";
function _I({ input: e, busy: t, onAnswer: n }) {
	let [r, i] = (0, _.useState)(null), [a, o] = (0, _.useState)(""), s = (0, _.useId)(), c = r ?? a.trim(), l = () => {
		c !== "" && !t && n(c);
	};
	return /* @__PURE__ */ (0, R.jsxs)("section", {
		"aria-labelledby": s,
		className: "sui-enter rounded-md border border-info/50 bg-info/5",
		onKeyDown: (t) => {
			if (t.target instanceof HTMLTextAreaElement) {
				t.key === "Enter" && !t.shiftKey && !t.nativeEvent.isComposing && (t.preventDefault(), l());
				return;
			}
			let n = gI.indexOf(t.key.toUpperCase()), r = e.options[n];
			r !== void 0 && t.key.length === 1 && (t.preventDefault(), i(r));
		},
		children: [
			/* @__PURE__ */ (0, R.jsxs)("header", {
				className: "flex items-start gap-2 px-3 py-2.5",
				children: [/* @__PURE__ */ (0, R.jsx)(de, {
					className: "mt-0.5 size-4 shrink-0 text-info",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, R.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, R.jsx)("h3", {
						className: "font-semibold",
						id: s,
						children: "The assistant needs one more thing"
					}), /* @__PURE__ */ (0, R.jsx)("p", {
						className: "mt-0.5 text-[length:var(--text-read)] leading-relaxed",
						children: e.question
					})]
				})]
			}),
			e.options.length === 0 ? null : /* @__PURE__ */ (0, R.jsxs)(R.Fragment, { children: [/* @__PURE__ */ (0, R.jsx)(My, {}), /* @__PURE__ */ (0, R.jsx)("div", {
				"aria-label": "Options",
				className: "flex flex-col gap-1 px-3 py-2",
				role: "radiogroup",
				children: e.options.map((e, n) => {
					let a = r === e;
					return /* @__PURE__ */ (0, R.jsxs)("button", {
						"aria-checked": a,
						className: H("flex items-center gap-2.5 rounded-md border px-2.5 py-2 text-start transition-colors", a ? "border-primary bg-primary/10" : "border-border hover:bg-accent/60"),
						disabled: t,
						onClick: () => i(a ? null : e),
						role: "radio",
						type: "button",
						children: [/* @__PURE__ */ (0, R.jsx)(dC, {
							className: H(a && "bg-primary text-primary-foreground"),
							children: gI[n]
						}), /* @__PURE__ */ (0, R.jsx)("span", {
							className: "min-w-0 flex-1",
							children: e
						})]
					}, e);
				})
			})] }),
			e.allowFreeText ? /* @__PURE__ */ (0, R.jsxs)(R.Fragment, { children: [/* @__PURE__ */ (0, R.jsx)(My, {}), /* @__PURE__ */ (0, R.jsx)("div", {
				className: "px-3 py-2",
				children: /* @__PURE__ */ (0, R.jsx)(KS, {
					"aria-label": "Your answer",
					className: "min-h-14 resize-none text-[length:var(--text-read)]",
					disabled: t || r !== null,
					onChange: (e) => o(e.currentTarget.value),
					placeholder: r === null ? "Type an answer…" : "An option is selected. Unselect it to type instead.",
					value: a
				})
			})] }) : null,
			/* @__PURE__ */ (0, R.jsx)(My, {}),
			/* @__PURE__ */ (0, R.jsxs)("div", {
				className: "flex items-center justify-between gap-2 px-3 py-2.5",
				children: [/* @__PURE__ */ (0, R.jsx)("span", {
					className: "text-muted-foreground",
					children: e.options.length > 0 ? "Press a letter to choose." : "Enter sends, Shift+Enter is a new line."
				}), /* @__PURE__ */ (0, R.jsx)(zy, {
					disabled: t || c === "",
					onClick: l,
					size: "sm",
					children: "Answer"
				})]
			})
		]
	});
}
//#endregion
//#region Build/Frontend/src/components/ai/tool.tsx
var vI = {
	pending: "Queued",
	running: "Running",
	"awaiting-approval": "Needs approval",
	denied: "Denied",
	completed: "Done",
	error: "Failed"
}, yI = {
	pending: /* @__PURE__ */ (0, R.jsx)(_e, { className: "size-3" }),
	running: /* @__PURE__ */ (0, R.jsx)(_e, { className: "size-3 animate-pulse" }),
	"awaiting-approval": /* @__PURE__ */ (0, R.jsx)(Dt, { className: "size-3" }),
	denied: /* @__PURE__ */ (0, R.jsx)(pe, { className: "size-3" }),
	completed: /* @__PURE__ */ (0, R.jsx)(le, { className: "size-3" }),
	error: /* @__PURE__ */ (0, R.jsx)(pe, { className: "size-3" })
}, bI = {
	pending: "outline",
	running: "secondary",
	"awaiting-approval": "secondary",
	denied: "outline",
	completed: "outline",
	error: "destructive"
};
function xI({ state: e }) {
	return /* @__PURE__ */ (0, R.jsxs)(ky, {
		className: "gap-1 rounded-full px-1.5 font-normal",
		variant: bI[e],
		children: [yI[e], vI[e]]
	});
}
function SI({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(WF, {
		className: H("group w-full overflow-hidden rounded-md border bg-card", e),
		...t
	});
}
function CI({ className: e, title: t, state: n, meta: r, ...i }) {
	return /* @__PURE__ */ (0, R.jsxs)(GF, {
		className: H("flex w-full items-center justify-between gap-2 px-2.5 py-2 text-start transition-colors hover:bg-accent/60", e),
		...i,
		children: [/* @__PURE__ */ (0, R.jsxs)("span", {
			className: "flex min-w-0 flex-1 items-center gap-2",
			children: [
				/* @__PURE__ */ (0, R.jsx)(Vt, {
					className: "size-3.5 shrink-0 text-muted-foreground",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, R.jsx)("span", {
					className: "truncate font-medium",
					children: t
				}),
				r
			]
		}), /* @__PURE__ */ (0, R.jsxs)("span", {
			className: "flex shrink-0 items-center gap-1.5",
			children: [/* @__PURE__ */ (0, R.jsx)(xI, { state: n }), /* @__PURE__ */ (0, R.jsx)(ne, {
				className: "size-3.5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180",
				"aria-hidden": "true"
			})]
		})]
	});
}
function wI({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(KF, {
		className: H("space-y-2 border-t px-2.5 py-2 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", e),
		...t
	});
}
function TI({ label: e, children: t }) {
	return /* @__PURE__ */ (0, R.jsxs)("div", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, R.jsx)("h4", {
			className: "font-medium text-[0.6875rem] uppercase tracking-wide text-muted-foreground",
			children: e
		}), t]
	});
}
function EI({ input: e, label: t = "Arguments" }) {
	let n = OI(e);
	return /* @__PURE__ */ (0, R.jsx)(TI, {
		label: t,
		children: n === "" ? /* @__PURE__ */ (0, R.jsx)("p", {
			className: "text-muted-foreground",
			children: "No arguments."
		}) : /* @__PURE__ */ (0, R.jsx)("pre", {
			className: "max-h-56 overflow-auto rounded-sm bg-muted px-2 py-1.5 font-mono text-[0.6875rem] leading-relaxed",
			children: n
		})
	});
}
function DI({ output: e, isError: t, label: n }) {
	return e === "" ? null : /* @__PURE__ */ (0, R.jsx)(TI, {
		label: n ?? (t ? "Error" : "Result preview"),
		children: /* @__PURE__ */ (0, R.jsx)("pre", {
			className: H("max-h-56 overflow-auto whitespace-pre-wrap rounded-sm px-2 py-1.5 font-mono text-[0.6875rem] leading-relaxed", t ? "bg-destructive/10 text-destructive" : "bg-muted text-foreground"),
			children: e
		})
	});
}
function OI(e) {
	if (e == null) return "";
	if (typeof e == "string") return e;
	try {
		let t = JSON.stringify(e, null, 2);
		return t === void 0 || t === "{}" ? "" : t;
	} catch {
		return String(e);
	}
}
//#endregion
//#region Build/Frontend/src/chat/tool-call-card.tsx
function kI({ call: e }) {
	let t = e.result === void 0 ? "running" : e.result.isError ? "error" : "completed";
	return /* @__PURE__ */ (0, R.jsxs)(SI, {
		className: H("effect-spine", `effect-${e.effect}`),
		children: [/* @__PURE__ */ (0, R.jsx)(CI, {
			meta: /* @__PURE__ */ (0, R.jsx)(hb, { effect: e.effect }),
			state: t,
			title: Er(e.name)
		}), /* @__PURE__ */ (0, R.jsxs)(wI, { children: [/* @__PURE__ */ (0, R.jsx)(EI, { input: e.arguments }), e.result === void 0 ? null : /* @__PURE__ */ (0, R.jsxs)(R.Fragment, { children: [
			/* @__PURE__ */ (0, R.jsx)(DI, {
				isError: e.result.isError,
				output: e.result.preview
			}),
			e.result.writeTarget === null ? null : /* @__PURE__ */ (0, R.jsx)("ul", { children: /* @__PURE__ */ (0, R.jsx)(ab, {
				change: {
					...e.result.writeTarget,
					toolName: ""
				},
				compact: !0
			}) }),
			/* @__PURE__ */ (0, R.jsxs)("p", {
				className: "text-muted-foreground",
				children: [
					"Round ",
					e.round,
					" · ",
					Cr(e.result.durationMs)
				]
			})
		] })] })]
	});
}
//#endregion
//#region Build/Frontend/src/chat/thread.tsx
function AI({ thread: e, tools: t, busy: n, onDecide: r, onAnswer: i, emptyTitle: a = "Ask about this installation", emptyDescription: o }) {
	let s = e.items.length === 0 && e.draft === "" && e.pendingApproval === null && e.pendingInput === null;
	return /* @__PURE__ */ (0, R.jsx)(vT, { children: /* @__PURE__ */ (0, R.jsxs)(yT, { children: [
		s ? /* @__PURE__ */ (0, R.jsx)(xT, {
			description: o,
			icon: /* @__PURE__ */ (0, R.jsx)(kt, { className: "size-5" }),
			title: a
		}) : null,
		e.items.map((e) => /* @__PURE__ */ (0, R.jsx)(bT, {
			messageId: e.key,
			children: /* @__PURE__ */ (0, R.jsx)(jI, { item: e })
		}, e.key)),
		e.draft === "" ? null : /* @__PURE__ */ (0, R.jsx)(bT, {
			messageId: "draft",
			children: /* @__PURE__ */ (0, R.jsx)(uI, {
				align: "start",
				children: /* @__PURE__ */ (0, R.jsx)(fI, { children: /* @__PURE__ */ (0, R.jsx)(tI, {
					align: "start",
					variant: "ghost",
					children: /* @__PURE__ */ (0, R.jsx)(nI, { children: /* @__PURE__ */ (0, R.jsx)(UF, { children: e.draft }) })
				}) })
			})
		}, "draft"),
		e.running ? /* @__PURE__ */ (0, R.jsxs)(bT, {
			messageId: "running",
			children: [/* @__PURE__ */ (0, R.jsxs)(oI, {
				"aria-live": "polite",
				role: "status",
				children: [/* @__PURE__ */ (0, R.jsx)(sI, { children: /* @__PURE__ */ (0, R.jsx)($e, {}) }), /* @__PURE__ */ (0, R.jsx)(cI, {
					className: "shimmer",
					children: MI(e)
				})]
			}), e.items.length === 0 ? /* @__PURE__ */ (0, R.jsxs)("div", {
				className: "mt-2 space-y-1.5",
				children: [/* @__PURE__ */ (0, R.jsx)(pC, { className: "h-3 w-4/5" }), /* @__PURE__ */ (0, R.jsx)(pC, { className: "h-3 w-3/5" })]
			}) : null]
		}, "running") : null,
		e.pendingApproval === null ? null : /* @__PURE__ */ (0, R.jsx)(bT, {
			messageId: "approval",
			scrollAnchor: !0,
			children: /* @__PURE__ */ (0, R.jsx)(hI, {
				approval: e.pendingApproval,
				busy: n,
				onDecide: r,
				tools: t
			})
		}, "approval"),
		e.pendingInput === null ? null : /* @__PURE__ */ (0, R.jsx)(bT, {
			messageId: "input",
			scrollAnchor: !0,
			children: /* @__PURE__ */ (0, R.jsx)(_I, {
				busy: n,
				input: e.pendingInput,
				onAnswer: i
			})
		}, "input")
	] }) });
}
function jI({ item: e }) {
	switch (e.kind) {
		case "message": {
			let t = e.message.role === "user";
			return /* @__PURE__ */ (0, R.jsx)(uI, {
				align: t ? "end" : "start",
				children: /* @__PURE__ */ (0, R.jsxs)(fI, { children: [
					t ? null : /* @__PURE__ */ (0, R.jsxs)(pI, {
						className: "px-0",
						children: [/* @__PURE__ */ (0, R.jsx)("span", { children: "Assistant" }), e.message.createdAt > 0 ? /* @__PURE__ */ (0, R.jsx)("span", {
							className: "ms-2",
							children: Tr(e.message.createdAt)
						}) : null]
					}),
					/* @__PURE__ */ (0, R.jsx)(tI, {
						align: t ? "end" : "start",
						variant: t ? "default" : "ghost",
						children: /* @__PURE__ */ (0, R.jsx)(nI, { children: t ? /* @__PURE__ */ (0, R.jsx)("p", {
							className: "whitespace-pre-wrap",
							children: e.message.content
						}) : /* @__PURE__ */ (0, R.jsx)(UF, { children: e.message.content }) })
					}),
					e.message.attachments === void 0 ? null : /* @__PURE__ */ (0, R.jsx)(nw, { attachments: e.message.attachments })
				] })
			});
		}
		case "tool": return /* @__PURE__ */ (0, R.jsx)(kI, { call: e.call });
		case "thinking": return /* @__PURE__ */ (0, R.jsxs)(XF, { children: [/* @__PURE__ */ (0, R.jsx)(ZF, { label: /* @__PURE__ */ (0, R.jsxs)("span", { children: ["Reasoning · round ", e.round] }) }), /* @__PURE__ */ (0, R.jsx)(QF, { children: e.text })] });
		case "notice": return /* @__PURE__ */ (0, R.jsxs)(oI, {
			variant: "separator",
			children: [e.tone === "error" ? /* @__PURE__ */ (0, R.jsx)(sI, { children: /* @__PURE__ */ (0, R.jsx)(zt, { className: "text-destructive" }) }) : null, /* @__PURE__ */ (0, R.jsx)(cI, {
				className: H(e.tone === "error" && "text-destructive"),
				children: e.text
			})]
		});
		default: return null;
	}
}
function MI(e) {
	let t = e.items.findLast((e) => e.kind === "tool");
	return t !== void 0 && t.kind === "tool" && t.call.result === void 0 ? `Running ${Er(t.call.name)}…` : e.draft === "" ? "Thinking…" : "Writing…";
}
//#endregion
//#region Build/Frontend/src/chat/chat-surface.tsx
function NI({ context: e, actions: t, emptyDescription: n }) {
	let r = _S(), i = r.thread.conversation?.title || "AI Chat", a = r.thread.changes.length;
	return /* @__PURE__ */ (0, R.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, R.jsxs)("header", {
				className: "flex items-center gap-1 border-b px-2.5 py-2",
				children: [
					/* @__PURE__ */ (0, R.jsx)("h2", {
						className: "min-w-0 flex-1 truncate font-semibold",
						title: i,
						children: i
					}),
					a === 0 ? null : /* @__PURE__ */ (0, R.jsxs)(TC, { children: [/* @__PURE__ */ (0, R.jsxs)(db, { children: [/* @__PURE__ */ (0, R.jsx)(fb, {
						asChild: !0,
						children: /* @__PURE__ */ (0, R.jsx)(EC, {
							asChild: !0,
							children: /* @__PURE__ */ (0, R.jsxs)(zy, {
								"aria-label": `${a} changes in this conversation`,
								className: "h-7 gap-1 px-1.5",
								size: "sm",
								variant: "ghost",
								children: [/* @__PURE__ */ (0, R.jsx)(ky, {
									className: "rounded-full px-1.5 font-normal",
									variant: "secondary",
									children: a
								}), /* @__PURE__ */ (0, R.jsx)("span", {
									className: "text-muted-foreground",
									children: "changed"
								})]
							})
						})
					}), /* @__PURE__ */ (0, R.jsx)(pb, { children: "Records this conversation changed" })] }), /* @__PURE__ */ (0, R.jsxs)(DC, {
						align: "end",
						className: "w-80 p-2",
						children: [/* @__PURE__ */ (0, R.jsx)("p", {
							className: "mb-1.5 px-2 font-semibold",
							children: "Changes in this conversation"
						}), /* @__PURE__ */ (0, R.jsx)(ob, { changes: r.thread.changes })]
					})] }),
					/* @__PURE__ */ (0, R.jsxs)(db, { children: [/* @__PURE__ */ (0, R.jsx)(fb, {
						asChild: !0,
						children: /* @__PURE__ */ (0, R.jsx)(zy, {
							"aria-label": "New conversation",
							onClick: () => void r.startNew(),
							size: "icon-sm",
							variant: "ghost",
							children: /* @__PURE__ */ (0, R.jsx)(xt, { "aria-hidden": "true" })
						})
					}), /* @__PURE__ */ (0, R.jsx)(pb, { children: "New conversation" })] }),
					/* @__PURE__ */ (0, R.jsxs)(AS, { children: [/* @__PURE__ */ (0, R.jsxs)(db, { children: [/* @__PURE__ */ (0, R.jsx)(fb, {
						asChild: !0,
						children: /* @__PURE__ */ (0, R.jsx)(MS, {
							asChild: !0,
							children: /* @__PURE__ */ (0, R.jsx)(zy, {
								"aria-label": "Switch conversation",
								size: "icon-sm",
								variant: "ghost",
								children: /* @__PURE__ */ (0, R.jsx)(Ct, { "aria-hidden": "true" })
							})
						})
					}), /* @__PURE__ */ (0, R.jsx)(pb, { children: "Recent conversations" })] }), /* @__PURE__ */ (0, R.jsxs)(NS, {
						align: "end",
						className: "w-72",
						children: [
							/* @__PURE__ */ (0, R.jsx)(zS, { children: "Recent conversations" }),
							r.conversations.conversations.length === 0 ? /* @__PURE__ */ (0, R.jsx)(FS, {
								disabled: !0,
								children: "No conversations yet"
							}) : r.conversations.conversations.slice(0, 8).map((e) => /* @__PURE__ */ (0, R.jsxs)(FS, {
								className: "flex-col items-start gap-0",
								onSelect: () => r.select(e.uid),
								children: [/* @__PURE__ */ (0, R.jsx)("span", {
									className: "w-full truncate font-medium",
									children: e.title || "Untitled conversation"
								}), /* @__PURE__ */ (0, R.jsxs)("span", {
									className: "text-muted-foreground",
									children: [
										Tr(e.lastMessageAt || e.createdAt),
										" · ",
										e.messageCount,
										" messages"
									]
								})]
							}, e.uid)),
							/* @__PURE__ */ (0, R.jsx)(BS, {}),
							/* @__PURE__ */ (0, R.jsx)(FS, {
								onSelect: () => Qy(Zy.chat, r.conversationUid > 0 ? `conversation=${r.conversationUid}` : ""),
								children: "All conversations…"
							})
						]
					})] }),
					t
				]
			}),
			r.statusError === null ? null : /* @__PURE__ */ (0, R.jsx)(ow, { message: r.statusError }),
			r.thread.error === null ? null : /* @__PURE__ */ (0, R.jsx)(ow, {
				message: r.thread.error,
				onDismiss: r.dismissError
			}),
			(r.status?.issues ?? []).map((e) => /* @__PURE__ */ (0, R.jsx)(ow, { message: e }, e)),
			/* @__PURE__ */ (0, R.jsx)(AI, {
				busy: r.busy,
				emptyDescription: n,
				onAnswer: r.answer,
				onDecide: r.decide,
				thread: r.thread,
				tools: r.status?.tools ?? []
			}),
			/* @__PURE__ */ (0, R.jsx)(iw, {
				attachments: r.attachments,
				busy: r.busy,
				context: e,
				onAddFiles: r.addFiles,
				onRemoveFile: r.removeFile,
				onSend: r.send,
				onStop: r.stop,
				phase: r.thread.phase,
				showSuggestions: r.thread.items.length === 0,
				status: r.status
			})
		]
	});
}
//#endregion
//#region Build/Frontend/src/shell/resize-handle.tsx
function PI({ resize: e, edge: t, label: n }) {
	let r = t !== "top";
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"aria-label": n,
		"aria-orientation": r ? "vertical" : "horizontal",
		className: H("group absolute z-10 touch-none", r ? "inset-y-0 w-1.5 cursor-ew-resize" : "inset-x-0 h-1.5 cursor-ns-resize", t === "start" && "start-0 -translate-x-1/2", t === "end" && "end-0 translate-x-1/2", t === "top" && "top-0 -translate-y-1/2"),
		role: "separator",
		tabIndex: 0,
		...e.handleProps,
		children: /* @__PURE__ */ (0, R.jsx)("span", { className: H("absolute bg-border transition-colors group-hover:bg-primary group-focus-visible:bg-primary", r ? "inset-y-0 start-1/2 w-px -translate-x-1/2" : "inset-x-0 top-1/2 h-px -translate-y-1/2", e.dragging && "bg-primary") })
	});
}
//#endregion
//#region Build/Frontend/src/shell/use-drag-resize.ts
var FI = {
	ArrowLeft: "ArrowRight",
	ArrowRight: "ArrowLeft",
	ArrowUp: "ArrowDown",
	ArrowDown: "ArrowUp"
};
function II({ initial: e, min: t, max: n, fromPointer: r, growKey: i, onSettle: a }) {
	let o = (0, _.useCallback)((e) => Math.min(n(), Math.max(t, Math.round(e))), [n, t]), [s, c] = (0, _.useState)(() => o(e)), [l, u] = (0, _.useState)(!1), d = (0, _.useCallback)((e) => c(o(e)), [o]);
	(0, _.useEffect)(() => {
		if (!l) return;
		let e = (e) => {
			e.preventDefault(), c(o(r(e)));
		}, t = () => u(!1);
		return window.addEventListener("pointermove", e), window.addEventListener("pointerup", t), window.addEventListener("pointercancel", t), () => {
			window.removeEventListener("pointermove", e), window.removeEventListener("pointerup", t), window.removeEventListener("pointercancel", t);
		};
	}, [
		o,
		l,
		r
	]), (0, _.useEffect)(() => {
		l || a?.(s);
	}, [
		l,
		a,
		s
	]), (0, _.useEffect)(() => {
		let e = () => c((e) => o(e));
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, [o]);
	let f = (0, _.useCallback)((t) => {
		let n = t.shiftKey ? 48 : 16;
		t.key === i ? (t.preventDefault(), c((e) => o(e + n))) : t.key === FI[i] ? (t.preventDefault(), c((e) => o(e - n))) : t.key === "Home" && (t.preventDefault(), c(o(e)));
	}, [
		o,
		i,
		e
	]);
	return {
		size: s,
		dragging: l,
		setSize: d,
		handleProps: {
			onPointerDown: (0, _.useCallback)((e) => {
				e.preventDefault(), u(!0);
			}, []),
			onKeyDown: f,
			"aria-valuenow": s,
			"aria-valuemin": t,
			"aria-valuemax": n()
		}
	};
}
var LI = "rail.width";
function RI({ collapsed: e, onToggle: t, context: n }) {
	let r = _S(), i = (0, _.useRef)(null), a = II({
		initial: Cx(LI, 380),
		min: 320,
		max: (0, _.useCallback)(() => Math.max(320, Math.min(480, Math.round(window.innerWidth * .6))), []),
		fromPointer: (0, _.useCallback)((e) => {
			let t = i.current?.getBoundingClientRect().left ?? 0;
			return e.clientX - t;
		}, []),
		growKey: "ArrowRight",
		onSettle: (0, _.useCallback)((e) => Sx(LI, String(e)), [])
	}), o = r.thread.phase === "awaiting_approval" || r.thread.phase === "awaiting_input";
	return e ? /* @__PURE__ */ (0, R.jsx)("aside", {
		"aria-label": "AI chat, collapsed",
		className: "flex w-11 shrink-0 flex-col items-center border-e bg-background py-2",
		children: /* @__PURE__ */ (0, R.jsxs)(db, { children: [/* @__PURE__ */ (0, R.jsx)(fb, {
			asChild: !0,
			children: /* @__PURE__ */ (0, R.jsxs)(zy, {
				"aria-label": "Open the chat",
				className: "relative",
				onClick: t,
				size: "icon-sm",
				variant: "ghost",
				children: [/* @__PURE__ */ (0, R.jsx)(Ze, { "aria-hidden": "true" }), o ? /* @__PURE__ */ (0, R.jsx)("span", {
					"aria-hidden": "true",
					className: "absolute end-1 top-1 size-2 rounded-full bg-warning ring-2 ring-background"
				}) : null]
			})
		}), /* @__PURE__ */ (0, R.jsx)(pb, {
			side: "right",
			children: o ? "The chat is waiting for you" : "Open the chat"
		})] })
	}) : /* @__PURE__ */ (0, R.jsxs)("aside", {
		"aria-label": "AI chat",
		className: H("relative shrink-0 border-e", a.dragging ? "select-none" : "transition-[width] duration-150 ease-out"),
		ref: i,
		style: { width: `${a.size}px` },
		children: [/* @__PURE__ */ (0, R.jsx)(NI, {
			actions: /* @__PURE__ */ (0, R.jsxs)(db, { children: [/* @__PURE__ */ (0, R.jsx)(fb, {
				asChild: !0,
				children: /* @__PURE__ */ (0, R.jsx)(zy, {
					"aria-label": "Collapse the chat",
					onClick: t,
					size: "icon-sm",
					variant: "ghost",
					children: /* @__PURE__ */ (0, R.jsx)(lt, { "aria-hidden": "true" })
				})
			}), /* @__PURE__ */ (0, R.jsx)(pb, { children: "Collapse" })] }),
			context: n,
			emptyDescription: "Ask a question about this installation, or describe a change. Every write asks for your approval first."
		}), /* @__PURE__ */ (0, R.jsx)(PI, {
			edge: "end",
			label: "Resize the chat",
			resize: a
		})]
	});
}
//#endregion
//#region node_modules/cmdk/dist/chunk-NZJY6EH4.mjs
var zI = 1, BI = .9, VI = .8, HI = .17, UI = .1, WI = .999, GI = .9999, KI = .99, qI = /[\\\/_+.#"@\[\(\{&]/, JI = /[\\\/_+.#"@\[\(\{&]/g, YI = /[\s-]/, XI = /[\s-]/g;
function ZI(e, t, n, r, i, a, o) {
	if (a === t.length) return i === e.length ? zI : KI;
	var s = `${i},${a}`;
	if (o[s] !== void 0) return o[s];
	for (var c = r.charAt(a), l = n.indexOf(c, i), u = 0, d, f, p, m; l >= 0;) d = ZI(e, t, n, r, l + 1, a + 1, o), d > u && (l === i ? d *= zI : qI.test(e.charAt(l - 1)) ? (d *= VI, p = e.slice(i, l - 1).match(JI), p && i > 0 && (d *= WI ** +p.length)) : YI.test(e.charAt(l - 1)) ? (d *= BI, m = e.slice(i, l - 1).match(XI), m && i > 0 && (d *= WI ** +m.length)) : (d *= HI, i > 0 && (d *= WI ** +(l - i))), e.charAt(l) !== t.charAt(a) && (d *= GI)), (d < UI && n.charAt(l - 1) === r.charAt(a + 1) || r.charAt(a + 1) === r.charAt(a) && n.charAt(l - 1) !== r.charAt(a)) && (f = ZI(e, t, n, r, l + 1, a + 2, o), f * UI > d && (d = f * UI)), d > u && (u = d), l = n.indexOf(c, l + 1);
	return o[s] = u, u;
}
function QI(e) {
	return e.toLowerCase().replace(XI, " ");
}
function $I(e, t, n) {
	return e = n && n.length > 0 ? `${e + " " + n.join(" ")}` : e, ZI(e, t, QI(e), QI(t), 0, 0, {});
}
//#endregion
//#region node_modules/cmdk/dist/index.mjs
var eL = "[cmdk-group=\"\"]", tL = "[cmdk-group-items=\"\"]", nL = "[cmdk-group-heading=\"\"]", rL = "[cmdk-item=\"\"]", iL = `${rL}:not([aria-disabled="true"])`, aL = "cmdk-item-select", oL = "data-value", sL = (e, t, n) => $I(e, t, n), cL = _.createContext(void 0), lL = () => _.useContext(cL), uL = _.createContext(void 0), dL = () => _.useContext(uL), fL = _.createContext(void 0), pL = _.forwardRef((e, t) => {
	let n = DL(() => ({
		search: "",
		value: e.value ?? e.defaultValue ?? "",
		selectedItemId: void 0,
		filtered: {
			count: 0,
			items: /* @__PURE__ */ new Map(),
			groups: /* @__PURE__ */ new Set()
		}
	})), r = DL(() => /* @__PURE__ */ new Set()), i = DL(() => /* @__PURE__ */ new Map()), a = DL(() => /* @__PURE__ */ new Map()), o = DL(() => /* @__PURE__ */ new Set()), s = TL(e), { label: c, children: l, value: u, onValueChange: d, filter: f, shouldFilter: p, loop: m, disablePointerSelection: h = !1, vimBindings: g = !0, ...v } = e, y = Qi(), b = Qi(), x = Qi(), S = _.useRef(null), C = AL();
	EL(() => {
		if (u !== void 0) {
			let e = u.trim();
			n.current.value = e, w.emit();
		}
	}, [u]), EL(() => {
		C(6, A);
	}, []);
	let w = _.useMemo(() => ({
		subscribe: (e) => (o.current.add(e), () => o.current.delete(e)),
		snapshot: () => n.current,
		setState: (e, t, r) => {
			var i, a, o;
			if (!Object.is(n.current[e], t)) {
				if (n.current[e] = t, e === "search") k(), D(), C(1, O);
				else if (e === "value") {
					if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
						let e = document.getElementById(x);
						e ? e.focus() : (i = document.getElementById(y)) == null || i.focus();
					}
					if (C(7, () => {
						n.current.selectedItemId = j()?.id, w.emit();
					}), r || C(5, A), s.current?.value !== void 0) {
						let e = t ?? "";
						(o = (a = s.current).onValueChange) == null || o.call(a, e);
						return;
					}
				}
				w.emit();
			}
		},
		emit: () => {
			o.current.forEach((e) => e());
		}
	}), []), T = _.useMemo(() => ({
		value: (e, t, r) => {
			t !== a.current.get(e)?.value && (a.current.set(e, {
				value: t,
				keywords: r
			}), n.current.filtered.items.set(e, E(t, r)), C(2, () => {
				D(), w.emit();
			}));
		},
		item: (e, t) => (r.current.add(e), t && (i.current.has(t) ? i.current.get(t).add(e) : i.current.set(t, /* @__PURE__ */ new Set([e]))), C(3, () => {
			k(), D(), n.current.value || O(), w.emit();
		}), () => {
			a.current.delete(e), r.current.delete(e), n.current.filtered.items.delete(e);
			let t = j();
			C(4, () => {
				k(), t?.getAttribute("id") === e && O(), w.emit();
			});
		}),
		group: (e) => (i.current.has(e) || i.current.set(e, /* @__PURE__ */ new Set()), () => {
			a.current.delete(e), i.current.delete(e);
		}),
		filter: () => s.current.shouldFilter,
		label: c || e["aria-label"],
		getDisablePointerSelection: () => s.current.disablePointerSelection,
		listId: y,
		inputId: x,
		labelId: b,
		listInnerRef: S
	}), []);
	function E(e, t) {
		let r = s.current?.filter ?? sL;
		return e ? r(e, n.current.search, t) : 0;
	}
	function D() {
		if (!n.current.search || s.current.shouldFilter === !1) return;
		let e = n.current.filtered.items, t = [];
		n.current.filtered.groups.forEach((n) => {
			let r = i.current.get(n), a = 0;
			r.forEach((t) => {
				let n = e.get(t);
				a = Math.max(n, a);
			}), t.push([n, a]);
		});
		let r = S.current;
		M().sort((t, n) => {
			let r = t.getAttribute("id"), i = n.getAttribute("id");
			return (e.get(i) ?? 0) - (e.get(r) ?? 0);
		}).forEach((e) => {
			let t = e.closest(tL);
			t ? t.appendChild(e.parentElement === t ? e : e.closest(`${tL} > *`)) : r.appendChild(e.parentElement === r ? e : e.closest(`${tL} > *`));
		}), t.sort((e, t) => t[1] - e[1]).forEach((e) => {
			let t = S.current?.querySelector(`${eL}[${oL}="${encodeURIComponent(e[0])}"]`);
			t?.parentElement.appendChild(t);
		});
	}
	function O() {
		let e = M().find((e) => e.getAttribute("aria-disabled") !== "true")?.getAttribute(oL);
		w.setState("value", e || void 0);
	}
	function k() {
		if (!n.current.search || s.current.shouldFilter === !1) {
			n.current.filtered.count = r.current.size;
			return;
		}
		n.current.filtered.groups = /* @__PURE__ */ new Set();
		let e = 0;
		for (let t of r.current) {
			let r = E(a.current.get(t)?.value ?? "", a.current.get(t)?.keywords ?? []);
			n.current.filtered.items.set(t, r), r > 0 && e++;
		}
		for (let [e, t] of i.current) for (let r of t) if (n.current.filtered.items.get(r) > 0) {
			n.current.filtered.groups.add(e);
			break;
		}
		n.current.filtered.count = e;
	}
	function A() {
		var e;
		let t = j();
		t && (t.parentElement?.firstChild === t && ((e = t.closest(eL)?.querySelector(nL)) == null || e.scrollIntoView({ block: "nearest" })), t.scrollIntoView({ block: "nearest" }));
	}
	function j() {
		return S.current?.querySelector(`${rL}[aria-selected="true"]`);
	}
	function M() {
		return Array.from(S.current?.querySelectorAll(iL) || []);
	}
	function N(e) {
		let t = M()[e];
		t && w.setState("value", t.getAttribute(oL));
	}
	function P(e) {
		var t;
		let n = j(), r = M(), i = r.findIndex((e) => e === n), a = r[i + e];
		(t = s.current) != null && t.loop && (a = i + e < 0 ? r[r.length - 1] : i + e === r.length ? r[0] : r[i + e]), a && w.setState("value", a.getAttribute(oL));
	}
	function F(e) {
		let t = j()?.closest(eL), n;
		for (; t && !n;) t = e > 0 ? CL(t, eL) : wL(t, eL), n = t?.querySelector(iL);
		n ? w.setState("value", n.getAttribute(oL)) : P(e);
	}
	let I = () => N(M().length - 1), ee = (e) => {
		e.preventDefault(), e.metaKey ? I() : e.altKey ? F(1) : P(1);
	}, te = (e) => {
		e.preventDefault(), e.metaKey ? N(0) : e.altKey ? F(-1) : P(-1);
	};
	return _.createElement(W.div, {
		ref: t,
		tabIndex: -1,
		...v,
		"cmdk-root": "",
		onKeyDown: (e) => {
			var t;
			(t = v.onKeyDown) == null || t.call(v, e);
			let n = e.nativeEvent.isComposing || e.keyCode === 229;
			if (!(e.defaultPrevented || n)) switch (e.key) {
				case "n":
				case "j":
					g && e.ctrlKey && ee(e);
					break;
				case "ArrowDown":
					ee(e);
					break;
				case "p":
				case "k":
					g && e.ctrlKey && te(e);
					break;
				case "ArrowUp":
					te(e);
					break;
				case "Home":
					e.preventDefault(), N(0);
					break;
				case "End":
					e.preventDefault(), I();
					break;
				case "Enter": {
					e.preventDefault();
					let t = j();
					if (t) {
						let e = new Event(aL);
						t.dispatchEvent(e);
					}
				}
			}
		}
	}, _.createElement("label", {
		"cmdk-label": "",
		htmlFor: T.inputId,
		id: T.labelId,
		style: NL
	}, c), ML(e, (e) => _.createElement(uL.Provider, { value: w }, _.createElement(cL.Provider, { value: T }, e))));
}), mL = _.forwardRef((e, t) => {
	let n = Qi(), r = _.useRef(null), i = _.useContext(fL), a = lL(), o = TL(e), s = o.current?.forceMount ?? i?.forceMount;
	EL(() => {
		if (!s) return a.item(n, i?.id);
	}, [s]);
	let c = kL(n, r, [
		e.value,
		e.children,
		r
	], e.keywords), l = dL(), u = OL((e) => e.value && e.value === c.current), d = OL((e) => s || a.filter() === !1 ? !0 : !e.search || e.filtered.items.get(n) > 0);
	_.useEffect(() => {
		let t = r.current;
		if (t && !e.disabled) return t.addEventListener(aL, f), () => t.removeEventListener(aL, f);
	}, [
		d,
		e.onSelect,
		e.disabled
	]);
	function f() {
		var e, t;
		p(), (t = (e = o.current).onSelect) == null || t.call(e, c.current);
	}
	function p() {
		l.setState("value", c.current, !0);
	}
	if (!d) return null;
	let { disabled: m, value: h, onSelect: g, forceMount: v, keywords: y, ...b } = e;
	return _.createElement(W.div, {
		ref: Ar(r, t),
		...b,
		id: n,
		"cmdk-item": "",
		role: "option",
		"aria-disabled": !!m,
		"aria-selected": !!u,
		"data-disabled": !!m,
		"data-selected": !!u,
		onPointerMove: m || a.getDisablePointerSelection() ? void 0 : p,
		onClick: m ? void 0 : f
	}, e.children);
}), hL = _.forwardRef((e, t) => {
	let { heading: n, children: r, forceMount: i, ...a } = e, o = Qi(), s = _.useRef(null), c = _.useRef(null), l = Qi(), u = lL(), d = OL((e) => i || u.filter() === !1 ? !0 : !e.search || e.filtered.groups.has(o));
	EL(() => u.group(o), []), kL(o, s, [
		e.value,
		e.heading,
		c
	]);
	let f = _.useMemo(() => ({
		id: o,
		forceMount: i
	}), [i]);
	return _.createElement(W.div, {
		ref: Ar(s, t),
		...a,
		"cmdk-group": "",
		role: "presentation",
		hidden: !d || void 0
	}, n && _.createElement("div", {
		ref: c,
		"cmdk-group-heading": "",
		"aria-hidden": !0,
		id: l
	}, n), ML(e, (e) => _.createElement("div", {
		"cmdk-group-items": "",
		role: "group",
		"aria-labelledby": n ? l : void 0
	}, _.createElement(fL.Provider, { value: f }, e))));
}), gL = _.forwardRef((e, t) => {
	let { alwaysRender: n, ...r } = e, i = _.useRef(null), a = OL((e) => !e.search);
	return !n && !a ? null : _.createElement(W.div, {
		ref: Ar(i, t),
		...r,
		"cmdk-separator": "",
		role: "separator"
	});
}), _L = _.forwardRef((e, t) => {
	let { onValueChange: n, ...r } = e, i = e.value != null, a = dL(), o = OL((e) => e.search), s = OL((e) => e.selectedItemId), c = lL();
	return _.useEffect(() => {
		e.value != null && a.setState("search", e.value);
	}, [e.value]), _.createElement(W.input, {
		ref: t,
		...r,
		"cmdk-input": "",
		autoComplete: "off",
		autoCorrect: "off",
		spellCheck: !1,
		"aria-autocomplete": "list",
		role: "combobox",
		"aria-expanded": !0,
		"aria-controls": c.listId,
		"aria-labelledby": c.labelId,
		"aria-activedescendant": s,
		id: c.inputId,
		type: "text",
		value: i ? e.value : o,
		onChange: (e) => {
			i || a.setState("search", e.target.value), n?.(e.target.value);
		}
	});
}), vL = _.forwardRef((e, t) => {
	let { children: n, label: r = "Suggestions", ...i } = e, a = _.useRef(null), o = _.useRef(null), s = OL((e) => e.selectedItemId), c = lL();
	return _.useEffect(() => {
		if (o.current && a.current) {
			let e = o.current, t = a.current, n, r = new ResizeObserver(() => {
				n = requestAnimationFrame(() => {
					let n = e.offsetHeight;
					t.style.setProperty("--cmdk-list-height", n.toFixed(1) + "px");
				});
			});
			return r.observe(e), () => {
				cancelAnimationFrame(n), r.unobserve(e);
			};
		}
	}, []), _.createElement(W.div, {
		ref: Ar(a, t),
		...i,
		"cmdk-list": "",
		role: "listbox",
		tabIndex: -1,
		"aria-activedescendant": s,
		"aria-label": r,
		id: c.listId
	}, ML(e, (e) => _.createElement("div", {
		ref: Ar(o, c.listInnerRef),
		"cmdk-list-sizer": ""
	}, e)));
}), yL = _.forwardRef((e, t) => {
	let { open: n, onOpenChange: r, overlayClassName: i, contentClassName: a, container: o, ...s } = e;
	return _.createElement(gc, {
		open: n,
		onOpenChange: r
	}, _.createElement(Sc, { container: o }, _.createElement(wc, {
		"cmdk-overlay": "",
		className: i
	}), _.createElement(Oc, {
		"aria-label": e.label,
		"cmdk-dialog": "",
		className: a
	}, _.createElement(pL, {
		ref: t,
		...s
	}))));
}), bL = _.forwardRef((e, t) => OL((e) => e.filtered.count === 0) ? _.createElement(W.div, {
	ref: t,
	...e,
	"cmdk-empty": "",
	role: "presentation"
}) : null), xL = _.forwardRef((e, t) => {
	let { progress: n, children: r, label: i = "Loading...", ...a } = e;
	return _.createElement(W.div, {
		ref: t,
		...a,
		"cmdk-loading": "",
		role: "progressbar",
		"aria-valuenow": n,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": i
	}, ML(e, (e) => _.createElement("div", { "aria-hidden": !0 }, e)));
}), SL = Object.assign(pL, {
	List: vL,
	Item: mL,
	Input: _L,
	Group: hL,
	Separator: gL,
	Dialog: yL,
	Empty: bL,
	Loading: xL
});
function CL(e, t) {
	let n = e.nextElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.nextElementSibling;
	}
}
function wL(e, t) {
	let n = e.previousElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.previousElementSibling;
	}
}
function TL(e) {
	let t = _.useRef(e);
	return EL(() => {
		t.current = e;
	}), t;
}
var EL = typeof window > "u" ? _.useEffect : _.useLayoutEffect;
function DL(e) {
	let t = _.useRef();
	return t.current === void 0 && (t.current = e()), t;
}
function OL(e) {
	let t = dL(), n = () => e(t.snapshot());
	return _.useSyncExternalStore(t.subscribe, n, n);
}
function kL(e, t, n, r = []) {
	let i = _.useRef(), a = lL();
	return EL(() => {
		var o;
		let s = (() => {
			for (let e of n) {
				if (typeof e == "string") return e.trim();
				if (typeof e == "object" && "current" in e) return e.current ? e.current.textContent?.trim() : i.current;
			}
		})(), c = r.map((e) => e.trim());
		a.value(e, s, c), (o = t.current) == null || o.setAttribute(oL, s), i.current = s;
	}), i;
}
var AL = () => {
	let [e, t] = _.useState(), n = DL(() => /* @__PURE__ */ new Map());
	return EL(() => {
		n.current.forEach((e) => e()), n.current = /* @__PURE__ */ new Map();
	}, [e]), (e, r) => {
		n.current.set(e, r), t({});
	};
};
function jL(e) {
	let t = e.type;
	return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function ML({ asChild: e, children: t }, n) {
	return e && _.isValidElement(t) ? _.cloneElement(jL(t), { ref: t.ref }, n(t.props.children)) : n(t);
}
var NL = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	borderWidth: "0"
};
//#endregion
//#region Build/Frontend/src/components/ui/command.tsx
function PL({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(SL, {
		"data-slot": "command",
		className: H("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", e),
		...t
	});
}
function FL({ title: e = "Command Palette", description: t = "Search for a command to run...", children: n, className: r, showCloseButton: i = !0, ...a }) {
	return /* @__PURE__ */ (0, R.jsxs)(bS, {
		...a,
		children: [/* @__PURE__ */ (0, R.jsxs)(ES, {
			className: "sr-only",
			children: [/* @__PURE__ */ (0, R.jsx)(OS, { children: e }), /* @__PURE__ */ (0, R.jsx)(kS, { children: t })]
		}), /* @__PURE__ */ (0, R.jsx)(TS, {
			className: H("overflow-hidden p-0", r),
			showCloseButton: i,
			children: /* @__PURE__ */ (0, R.jsx)(PL, {
				className: "**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
				children: n
			})
		})]
	});
}
function IL({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsxs)("div", {
		"data-slot": "command-input-wrapper",
		className: "flex h-9 items-center gap-2 border-b px-3",
		children: [/* @__PURE__ */ (0, R.jsx)(Tt, { className: "size-4 shrink-0 opacity-50" }), /* @__PURE__ */ (0, R.jsx)(SL.Input, {
			"data-slot": "command-input",
			className: H("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", e),
			...t
		})]
	});
}
function LL({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(SL.List, {
		"data-slot": "command-list",
		className: H("max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto", e),
		...t
	});
}
function RL({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(SL.Empty, {
		"data-slot": "command-empty",
		className: "py-6 text-center text-sm",
		...e
	});
}
function zL({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(SL.Group, {
		"data-slot": "command-group",
		className: H("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", e),
		...t
	});
}
function BL({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(SL.Separator, {
		"data-slot": "command-separator",
		className: H("-mx-1 h-px bg-border", e),
		...t
	});
}
function VL({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(SL.Item, {
		"data-slot": "command-item",
		className: H("relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground", e),
		...t
	});
}
function HL({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("span", {
		"data-slot": "command-shortcut",
		className: H("ml-auto text-xs tracking-widest text-muted-foreground", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/shell/command-palette.tsx
function UL({ open: e, onOpenChange: t, shell: n }) {
	let r = vS(), i = (e) => () => {
		t(!1), e();
	};
	return /* @__PURE__ */ (0, R.jsxs)(FL, {
		description: "Type to search commands and conversations",
		onOpenChange: t,
		open: e,
		title: "Command palette",
		children: [/* @__PURE__ */ (0, R.jsx)(IL, { placeholder: "What do you want to do?" }), /* @__PURE__ */ (0, R.jsxs)(LL, { children: [
			/* @__PURE__ */ (0, R.jsx)(RL, { children: "Nothing matches." }),
			/* @__PURE__ */ (0, R.jsx)(zL, {
				heading: "Chat",
				children: r === null ? /* @__PURE__ */ (0, R.jsxs)(VL, {
					onSelect: i(n.openChat),
					children: [/* @__PURE__ */ (0, R.jsx)(tt, { "aria-hidden": "true" }), "Open the chat"]
				}) : /* @__PURE__ */ (0, R.jsxs)(R.Fragment, { children: [
					/* @__PURE__ */ (0, R.jsxs)(VL, {
						onSelect: i(() => void r.startNew()),
						children: [/* @__PURE__ */ (0, R.jsx)(Ye, { "aria-hidden": "true" }), "New conversation"]
					}),
					/* @__PURE__ */ (0, R.jsxs)(VL, {
						onSelect: i(n.toggleChat),
						children: [/* @__PURE__ */ (0, R.jsx)(dt, { "aria-hidden": "true" }), n.chatOpen ? "Hide the chat" : "Show the chat"]
					}),
					/* @__PURE__ */ (0, R.jsxs)(VL, {
						onSelect: i(() => {
							n.openChat(), n.focusComposer();
						}),
						children: [
							/* @__PURE__ */ (0, R.jsx)(Ft, { "aria-hidden": "true" }),
							"Write a message",
							/* @__PURE__ */ (0, R.jsx)(HL, { children: "Enter sends" })
						]
					}),
					r.thread.phase === "streaming" ? /* @__PURE__ */ (0, R.jsxs)(VL, {
						onSelect: i(r.stop),
						children: [
							/* @__PURE__ */ (0, R.jsx)(Nt, { "aria-hidden": "true" }),
							"Stop the running turn",
							/* @__PURE__ */ (0, R.jsx)(HL, { children: "Esc" })
						]
					}) : null
				] })
			}),
			r !== null && r.conversations.conversations.length > 0 ? /* @__PURE__ */ (0, R.jsxs)(R.Fragment, { children: [/* @__PURE__ */ (0, R.jsx)(BL, {}), /* @__PURE__ */ (0, R.jsx)(zL, {
				heading: "Switch to",
				children: r.conversations.conversations.slice(0, 12).map((e) => /* @__PURE__ */ (0, R.jsxs)(VL, {
					onSelect: i(() => {
						r.select(e.uid), n.openChat();
					}),
					value: `${e.title || "Untitled conversation"} ${e.uid}`,
					children: [
						/* @__PURE__ */ (0, R.jsx)(tt, { "aria-hidden": "true" }),
						/* @__PURE__ */ (0, R.jsx)("span", {
							className: "truncate",
							children: e.title || "Untitled conversation"
						}),
						/* @__PURE__ */ (0, R.jsx)(HL, { children: Tr(e.lastMessageAt || e.createdAt) })
					]
				}, e.uid))
			})] }) : null,
			/* @__PURE__ */ (0, R.jsx)(BL, {}),
			/* @__PURE__ */ (0, R.jsxs)(zL, {
				heading: "Modules",
				children: [/* @__PURE__ */ (0, R.jsxs)(VL, {
					onSelect: i(() => Qy(Zy.chat)),
					children: [/* @__PURE__ */ (0, R.jsx)(Ve, { "aria-hidden": "true" }), "Open AI Chat"]
				}), /* @__PURE__ */ (0, R.jsxs)(VL, {
					onSelect: i(() => Qy(Zy.components)),
					children: [/* @__PURE__ */ (0, R.jsx)(Ve, { "aria-hidden": "true" }), "Open shadcn/ui Components"]
				})]
			})
		] })]
	});
}
//#endregion
//#region Build/Frontend/src/shell/floating-panel.tsx
var WL = {
	key: "panel.width",
	initial: 420,
	min: 360
}, GL = {
	key: "panel.height",
	initial: 640,
	min: 420
};
function KL({ minimized: e, onMinimize: t, onClose: n, context: r }) {
	let i = _S(), a = (0, _.useRef)(null), o = II({
		initial: Cx(WL.key, WL.initial),
		min: WL.min,
		max: (0, _.useCallback)(() => Math.max(WL.min, Math.round(window.innerWidth * .8)), []),
		fromPointer: (0, _.useCallback)((e) => (a.current?.getBoundingClientRect().right ?? window.innerWidth) - e.clientX, []),
		growKey: "ArrowLeft",
		onSettle: (0, _.useCallback)((e) => Sx(WL.key, String(e)), [])
	}), s = II({
		initial: Cx(GL.key, GL.initial),
		min: GL.min,
		max: (0, _.useCallback)(() => Math.max(GL.min, Math.round(window.innerHeight * .9)), []),
		fromPointer: (0, _.useCallback)((e) => (a.current?.getBoundingClientRect().bottom ?? window.innerHeight) - e.clientY, []),
		growKey: "ArrowUp",
		onSettle: (0, _.useCallback)((e) => Sx(GL.key, String(e)), [])
	}), c = i.thread.conversation?.title || "AI Chat", l = i.thread.phase === "awaiting_approval" || i.thread.phase === "awaiting_input", u = o.dragging || s.dragging;
	return e ? /* @__PURE__ */ (0, R.jsxs)("section", {
		"aria-label": "AI chat, minimised",
		className: "sui-root sui-enter fixed end-4 bottom-4 z-(--z-panel) flex w-72 items-center gap-1 rounded-lg border bg-card p-1.5 shadow-lg",
		children: [/* @__PURE__ */ (0, R.jsxs)("button", {
			className: "flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1 text-start hover:bg-accent/60",
			onClick: () => t(!1),
			type: "button",
			children: [
				l || i.thread.running ? /* @__PURE__ */ (0, R.jsx)("span", {
					"aria-hidden": "true",
					className: H("size-2 shrink-0 rounded-full", l ? "bg-warning" : "animate-pulse bg-primary")
				}) : null,
				/* @__PURE__ */ (0, R.jsx)("span", {
					className: "truncate font-medium",
					children: c
				}),
				/* @__PURE__ */ (0, R.jsx)(ae, {
					"aria-hidden": "true",
					className: "ms-auto size-4 shrink-0 text-muted-foreground"
				})
			]
		}), /* @__PURE__ */ (0, R.jsx)(zy, {
			"aria-label": "Close the chat",
			onClick: n,
			size: "icon-sm",
			variant: "ghost",
			children: /* @__PURE__ */ (0, R.jsx)(Ut, { "aria-hidden": "true" })
		})]
	}) : /* @__PURE__ */ (0, R.jsxs)("section", {
		"aria-label": "AI chat",
		className: H("sui-root sui-enter fixed end-4 bottom-4 z-(--z-panel) flex max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-lg border bg-card shadow-2xl", u && "select-none"),
		ref: a,
		style: {
			width: `${o.size}px`,
			height: `${s.size}px`
		},
		children: [
			/* @__PURE__ */ (0, R.jsx)(PI, {
				edge: "start",
				label: "Resize the chat panel width",
				resize: o
			}),
			/* @__PURE__ */ (0, R.jsx)(PI, {
				edge: "top",
				label: "Resize the chat panel height",
				resize: s
			}),
			/* @__PURE__ */ (0, R.jsx)(NI, {
				actions: /* @__PURE__ */ (0, R.jsxs)(R.Fragment, { children: [
					/* @__PURE__ */ (0, R.jsxs)(db, { children: [/* @__PURE__ */ (0, R.jsx)(fb, {
						asChild: !0,
						children: /* @__PURE__ */ (0, R.jsx)(zy, {
							"aria-label": "Open in the AI Chat module",
							onClick: () => {
								Qy(Zy.chat, i.conversationUid > 0 ? `conversation=${i.conversationUid}` : "") && t(!0);
							},
							size: "icon-sm",
							variant: "ghost",
							children: /* @__PURE__ */ (0, R.jsx)(qe, { "aria-hidden": "true" })
						})
					}), /* @__PURE__ */ (0, R.jsx)(pb, { children: "Open in the AI Chat module" })] }),
					/* @__PURE__ */ (0, R.jsxs)(db, { children: [/* @__PURE__ */ (0, R.jsx)(fb, {
						asChild: !0,
						children: /* @__PURE__ */ (0, R.jsx)(zy, {
							"aria-label": "Minimise the chat",
							onClick: () => t(!0),
							size: "icon-sm",
							variant: "ghost",
							children: /* @__PURE__ */ (0, R.jsx)(rt, { "aria-hidden": "true" })
						})
					}), /* @__PURE__ */ (0, R.jsx)(pb, { children: "Minimise" })] }),
					/* @__PURE__ */ (0, R.jsxs)(db, { children: [/* @__PURE__ */ (0, R.jsx)(fb, {
						asChild: !0,
						children: /* @__PURE__ */ (0, R.jsx)(zy, {
							"aria-label": "Close the chat",
							onClick: n,
							size: "icon-sm",
							variant: "ghost",
							children: /* @__PURE__ */ (0, R.jsx)(Ut, { "aria-hidden": "true" })
						})
					}), /* @__PURE__ */ (0, R.jsx)(pb, { children: "Close" })] })
				] }),
				context: r,
				emptyDescription: "This chat can read and change this TYPO3 installation. Writes always ask first."
			})
		]
	});
}
//#endregion
//#region Build/Frontend/src/shell/shell-context.tsx
var qL = (0, _.createContext)(null), JL = qL.Provider;
function YL() {
	let e = (0, _.useContext)(qL);
	if (e === null) throw Error("useShell() must be called inside <shadcn-ui-shell>.");
	return e;
}
var XL = (0, _.createContext)(null), ZL = XL.Provider;
function QL() {
	let e = (0, _.useContext)(XL);
	if (e === null) throw Error("useTypo3() must be called inside <shadcn-ui-shell>.");
	return e;
}
//#endregion
//#region Build/Frontend/src/shell/shell.tsx
var $L = "shadcn-ui:open-chat", eR = "rail.collapsed", tR = "panel.minimized";
function nR({ variant: e, layout: t, appName: n, appProps: r, initialConversation: i, theme: a, portal: o, root: s, onClose: c }) {
	let [l, u] = (0, _.useState)(() => wx(eR, !1)), [d, f] = (0, _.useState)(() => wx(tR, !1)), [p, m] = (0, _.useState)(!1), h = (0, _.useRef)({}), g = e === "panel" || t === "chat-left", v = e === "panel" ? !d : t === "chat-left" && !l, y = (0, _.useCallback)((e) => {
		u(e), Tx(eR, e);
	}, []), b = (0, _.useCallback)((e) => {
		f(e), Tx(tR, e);
	}, []), x = (0, _.useCallback)(() => {
		if (e === "panel") b(!1);
		else if (t === "chat-left") y(!1);
		else try {
			(window.top ?? window).document.dispatchEvent(new CustomEvent($L));
		} catch {}
	}, [
		t,
		b,
		y,
		e
	]), S = (0, _.useCallback)(() => {
		e === "panel" ? b(!0) : y(!0);
	}, [
		b,
		y,
		e
	]), C = (0, _.useCallback)(() => {
		requestAnimationFrame(() => s?.querySelector("textarea[name=\"message\"]")?.focus());
	}, [s]), w = (0, _.useMemo)(() => ({
		layout: t,
		chatOpen: v,
		openChat: x,
		closeChat: S,
		toggleChat: () => v ? S() : x(),
		setContext: (e) => {
			h.current = e;
		},
		openCommandPalette: () => m(!0),
		focusComposer: C
	}), [
		v,
		S,
		C,
		t,
		x
	]), T = (0, _.useMemo)(() => ({
		ajaxUrls: Jy(),
		lang: Yy(),
		theme: a,
		user: Xy()
	}), [a]), E = (0, _.useCallback)(() => {
		let t = tb();
		return {
			...e === "panel" ? {} : { appName: n },
			...Object.keys(h.current).length > 0 ? { appContext: h.current } : {},
			...t === void 0 ? {} : { pageId: t }
		};
	}, [n, e]), D = (0, _.useMemo)(() => {
		let t = tb();
		return {
			...e === "panel" ? {} : { appName: n },
			...t === void 0 ? {} : { pageId: t }
		};
	}, [n, e]);
	(0, _.useEffect)(() => {
		if (s === null) return;
		let t = (t) => {
			t instanceof KeyboardEvent && !t.defaultPrevented && ((t.metaKey || t.ctrlKey) && t.key.toLowerCase() === "k" ? (t.preventDefault(), t.stopPropagation(), m((e) => !e)) : t.key === "Escape" && e === "panel" && !p && c());
		};
		return s.addEventListener("keydown", t), () => s.removeEventListener("keydown", t);
	}, [
		c,
		p,
		s,
		e
	]);
	let O = /* @__PURE__ */ (0, R.jsxs)(R.Fragment, { children: [
		e === "panel" ? /* @__PURE__ */ (0, R.jsx)(KL, {
			context: D,
			minimized: d,
			onClose: c,
			onMinimize: b
		}) : /* @__PURE__ */ (0, R.jsxs)("div", {
			className: "sui-root flex h-full min-h-0 w-full",
			children: [t === "chat-left" ? /* @__PURE__ */ (0, R.jsx)(RI, {
				collapsed: l,
				context: D,
				onToggle: () => y(!l)
			}) : null, /* @__PURE__ */ (0, R.jsx)("main", {
				className: "min-h-0 min-w-0 flex-1 overflow-auto",
				children: /* @__PURE__ */ (0, R.jsx)(xC, {
					appName: n,
					props: r,
					shell: w
				})
			})]
		}),
		/* @__PURE__ */ (0, R.jsx)(UL, {
			onOpenChange: m,
			open: p,
			shell: w
		}),
		/* @__PURE__ */ (0, R.jsx)(Jb, {
			position: e === "panel" ? "bottom-center" : "bottom-right",
			theme: a
		})
	] });
	return /* @__PURE__ */ (0, R.jsx)(ZL, {
		value: T,
		children: /* @__PURE__ */ (0, R.jsx)(cb, {
			container: o,
			children: /* @__PURE__ */ (0, R.jsx)(ub, {
				delayDuration: 400,
				children: /* @__PURE__ */ (0, R.jsx)(JL, {
					value: w,
					children: g ? /* @__PURE__ */ (0, R.jsx)(gS, {
						context: E,
						initialConversation: i,
						children: O
					}) : O
				})
			})
		})
	});
}
//#endregion
//#region Build/Frontend/src/styles/shadow-css.ts
function rR(e) {
	let t = iR(e);
	if (t === null) return e;
	let n = e.indexOf("@supports", t.open);
	if (n === -1 || n > t.close) return e;
	let r = e.indexOf("{", n);
	if (r === -1 || r > t.close) return e;
	let i = aR(e, r);
	return i === -1 ? e : e.slice(0, n) + e.slice(r + 1, i) + e.slice(i + 1);
}
function iR(e) {
	let t = /@layer\s+properties\s*\{/g.exec(e);
	if (t === null) return null;
	let n = t.index + t[0].length - 1, r = aR(e, n);
	return r === -1 ? null : {
		open: n,
		close: r
	};
}
function aR(e, t) {
	let n = 0;
	for (let r = t; r < e.length; r += 1) {
		let t = e[r];
		if (t === "{") n += 1;
		else if (t === "}" && (--n, n === 0)) return r;
	}
	return -1;
}
//#endregion
//#region Build/Frontend/src/shell/element.tsx
var oR = rR("/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-scroll-snap-strictness:proximity;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-y-reverse:0;--tw-border-style:solid;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:\"\";--tw-scale-x:1;--tw-scale-y:1;--tw-scale-z:1;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-scroll-snap-strictness:proximity;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-y-reverse:0;--tw-border-style:solid;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:\"\";--tw-scale-x:1;--tw-scale-y:1;--tw-scale-z:1;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--color-black:#000;--color-white:#fff;--spacing:.25rem;--container-sm:24rem;--container-lg:32rem;--container-xl:36rem;--text-xs:.75rem;--text-xs--line-height:calc(1 / .75);--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--text-base:1rem;--text-base--line-height:calc(1.5 / 1);--text-lg:1.125rem;--text-lg--line-height:calc(1.75 / 1.125);--font-weight-normal:400;--font-weight-medium:500;--font-weight-semibold:600;--tracking-tight:-.025em;--tracking-wide:.025em;--tracking-widest:.1em;--leading-tight:1.25;--leading-snug:1.375;--leading-normal:1.5;--leading-relaxed:1.625;--radius-xs:.125rem;--radius-sm:calc(var(--radius) - 2px);--ease-out:cubic-bezier(0, 0, .2, 1);--ease-in-out:cubic-bezier(.4, 0, .2, 1);--animate-spin:spin 1s linear infinite;--animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-ui);--default-mono-font-family:var(--font-code)}}@layer base{*,:after,:before{box-sizing:border-box;border:0 solid;margin:0;padding:0}::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}.sui-root{color:var(--foreground);background:var(--background);font-family:var(--font-ui);font-size:var(--text-chrome);-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;text-size-adjust:100%;line-height:1.5}.sui-root :focus-visible{outline:2px solid var(--ring);outline-offset:1px;border-radius:2px}.sui-root ::-webkit-scrollbar{width:10px;height:10px}.sui-root ::-webkit-scrollbar-thumb{background:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.sui-root ::-webkit-scrollbar-thumb{background:color-mix(in srgb, var(--foreground), transparent 80%)}}.sui-root ::-webkit-scrollbar-thumb{background-clip:content-box;border:3px solid #0000;border-radius:999px}.sui-root ::-webkit-scrollbar-thumb:hover{background:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.sui-root ::-webkit-scrollbar-thumb:hover{background:color-mix(in srgb, var(--foreground), transparent 60%)}}.sui-root ::-webkit-scrollbar-thumb:hover{background-clip:content-box;border:3px solid #0000}.sui-root ::-webkit-scrollbar-track{background:0 0}}@layer components{.sui-prose{font-size:var(--text-read);overflow-wrap:anywhere;line-height:1.6}.sui-prose>*+*{margin-top:.6em}.sui-prose h1,.sui-prose h2,.sui-prose h3,.sui-prose h4{margin-top:1.1em;font-weight:600;line-height:1.3}.sui-prose h1{font-size:1.3em}.sui-prose h2{font-size:1.16em}.sui-prose h3{font-size:1.06em}.sui-prose h4{font-size:1em}.sui-prose ul,.sui-prose ol{padding-inline-start:1.35em}.sui-prose ul{list-style:outside}.sui-prose ol{list-style:decimal}.sui-prose li+li{margin-top:.25em}.sui-prose a{color:var(--primary);text-underline-offset:2px;text-decoration:underline}.sui-prose code{font-family:var(--font-code);background:var(--muted);border-radius:3px;padding:.1em .35em;font-size:.92em}.sui-prose pre{background:var(--muted);border:1px solid var(--border);border-radius:var(--radius-sm);padding:.7em .8em;overflow-x:auto}.sui-prose pre code{background:0 0;padding:0;font-size:.9em}.sui-prose blockquote{border-inline-start:2px solid var(--border-strong);color:var(--muted-foreground);padding-inline-start:.8em}.sui-prose table{border-collapse:collapse;font-size:.95em;display:block;overflow-x:auto}.sui-prose th,.sui-prose td{border:1px solid var(--border);text-align:start;padding:.3em .5em}.sui-prose th{background:var(--muted);font-weight:600}.sui-prose hr{border:0;border-top:1px solid var(--border)}}@layer utilities{.\\@container\\/card-header{container:card-header/inline-size}.\\@container\\/field-group{container:field-group/inline-size}.pointer-events-none{pointer-events:none}.visible{visibility:visible}.sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.inset-0{inset:0}.inset-x-0{inset-inline:0}.inset-y-0{inset-block:0}.inset-s-1\\/2{inset-inline-start:50%}.start-0{inset-inline-start:calc(var(--spacing) * 0)}.start-1\\/2{inset-inline-start:50%}.end-0{inset-inline-end:calc(var(--spacing) * 0)}.end-1{inset-inline-end:calc(var(--spacing) * 1)}.end-4{inset-inline-end:calc(var(--spacing) * 4)}.top-0{top:0}.top-1{top:var(--spacing)}.top-1\\/2{top:50%}.top-4{top:calc(var(--spacing) * 4)}.top-\\[50\\%\\]{top:50%}.right-0{right:0}.right-2{right:calc(var(--spacing) * 2)}.right-3{right:calc(var(--spacing) * 3)}.right-4{right:calc(var(--spacing) * 4)}.bottom-0{bottom:0}.bottom-4{bottom:calc(var(--spacing) * 4)}.left-0{left:0}.left-2{left:calc(var(--spacing) * 2)}.left-3{left:calc(var(--spacing) * 3)}.left-\\[50\\%\\]{left:50%}.z-\\(--z-panel\\){z-index:var(--z-panel)}.z-10{z-index:10}.z-20{z-index:20}.z-50{z-index:50}.order-first{order:-9999}.order-last{order:9999}.col-start-2{grid-column-start:2}.row-span-2{grid-row:span 2/span 2}.row-start-1{grid-row-start:1}.container{width:100%}@media (min-width:40rem){.container{max-width:40rem}}@media (min-width:48rem){.container{max-width:48rem}}@media (min-width:64rem){.container{max-width:64rem}}@media (min-width:80rem){.container{max-width:80rem}}@media (min-width:96rem){.container{max-width:96rem}}.m-2{margin:calc(var(--spacing) * 2)}.-mx-1{margin-inline:calc(var(--spacing) * -1)}.mx-auto{margin-inline:auto}.-my-1{margin-block:calc(var(--spacing) * -1)}.-my-2{margin-block:calc(var(--spacing) * -2)}.my-0{margin-block:0}.my-1{margin-block:var(--spacing)}.my-4{margin-block:calc(var(--spacing) * 4)}.ms-2{margin-inline-start:calc(var(--spacing) * 2)}.ms-auto{margin-inline-start:auto}.mt-0\\.5{margin-top:calc(var(--spacing) * .5)}.mt-1{margin-top:var(--spacing)}.mt-1\\.5{margin-top:calc(var(--spacing) * 1.5)}.mt-2{margin-top:calc(var(--spacing) * 2)}.mt-3{margin-top:calc(var(--spacing) * 3)}.mt-4{margin-top:calc(var(--spacing) * 4)}.mt-6{margin-top:calc(var(--spacing) * 6)}.mt-auto{margin-top:auto}.mt-px{margin-top:1px}.mb-1\\.5{margin-bottom:calc(var(--spacing) * 1.5)}.mb-2{margin-bottom:calc(var(--spacing) * 2)}.mb-3{margin-bottom:calc(var(--spacing) * 3)}.ml-4{margin-left:calc(var(--spacing) * 4)}.ml-auto{margin-left:auto}.scrollbar-none{scrollbar-width:none;-ms-overflow-style:none}.scrollbar-none::-webkit-scrollbar{display:none}.line-clamp-1{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.line-clamp-2{-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.block{display:block}.contents{display:contents}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.inline-block{display:inline-block}.inline-flex{display:inline-flex}.table{display:table}.table-caption{display:table-caption}.table-cell{display:table-cell}.table-row{display:table-row}.field-sizing-content{field-sizing:content}.aspect-square{aspect-ratio:1}.size-2{width:calc(var(--spacing) * 2);height:calc(var(--spacing) * 2)}.size-2\\.5{width:calc(var(--spacing) * 2.5);height:calc(var(--spacing) * 2.5)}.size-3{width:calc(var(--spacing) * 3);height:calc(var(--spacing) * 3)}.size-3\\.5{width:calc(var(--spacing) * 3.5);height:calc(var(--spacing) * 3.5)}.size-4{width:calc(var(--spacing) * 4);height:calc(var(--spacing) * 4)}.size-5{width:calc(var(--spacing) * 5);height:calc(var(--spacing) * 5)}.size-6{width:calc(var(--spacing) * 6);height:calc(var(--spacing) * 6)}.size-8{width:calc(var(--spacing) * 8);height:calc(var(--spacing) * 8)}.size-9{width:calc(var(--spacing) * 9);height:calc(var(--spacing) * 9)}.size-10{width:calc(var(--spacing) * 10);height:calc(var(--spacing) * 10)}.size-full{width:100%;height:100%}.h-1\\.5{height:calc(var(--spacing) * 1.5)}.h-2{height:calc(var(--spacing) * 2)}.h-2\\.5{height:calc(var(--spacing) * 2.5)}.h-3{height:calc(var(--spacing) * 3)}.h-3\\.5{height:calc(var(--spacing) * 3.5)}.h-4{height:calc(var(--spacing) * 4)}.h-5{height:calc(var(--spacing) * 5)}.h-6{height:calc(var(--spacing) * 6)}.h-7{height:calc(var(--spacing) * 7)}.h-8{height:calc(var(--spacing) * 8)}.h-9{height:calc(var(--spacing) * 9)}.h-10{height:calc(var(--spacing) * 10)}.h-24{height:calc(var(--spacing) * 24)}.h-32{height:calc(var(--spacing) * 32)}.h-48{height:calc(var(--spacing) * 48)}.h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.h-\\[var\\(--radix-select-trigger-height\\)\\]{height:var(--radix-select-trigger-height)}.h-auto{height:auto}.h-full{height:100%}.h-max{height:max-content}.h-px{height:1px}.max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.max-h-48{max-height:calc(var(--spacing) * 48)}.max-h-56{max-height:calc(var(--spacing) * 56)}.max-h-96{max-height:calc(var(--spacing) * 96)}.max-h-\\[300px\\]{max-height:300px}.max-h-\\[calc\\(100dvh-2rem\\)\\]{max-height:calc(100dvh - 2rem)}.min-h-0{min-height:0}.min-h-4{min-height:calc(var(--spacing) * 4)}.min-h-14{min-height:calc(var(--spacing) * 14)}.min-h-16{min-height:calc(var(--spacing) * 16)}.min-h-20{min-height:calc(var(--spacing) * 20)}.min-h-full{min-height:100%}.w-1\\.5{width:calc(var(--spacing) * 1.5)}.w-1\\/2{width:50%}.w-1\\/3{width:33.3333%}.w-2\\.5{width:calc(var(--spacing) * 2.5)}.w-2\\/3{width:66.6667%}.w-3\\/4{width:75%}.w-3\\/5{width:60%}.w-4\\/5{width:80%}.w-8{width:calc(var(--spacing) * 8)}.w-10{width:calc(var(--spacing) * 10)}.w-11{width:calc(var(--spacing) * 11)}.w-14{width:calc(var(--spacing) * 14)}.w-16{width:calc(var(--spacing) * 16)}.w-20{width:calc(var(--spacing) * 20)}.w-24{width:calc(var(--spacing) * 24)}.w-44{width:calc(var(--spacing) * 44)}.w-56{width:calc(var(--spacing) * 56)}.w-72{width:calc(var(--spacing) * 72)}.w-80{width:calc(var(--spacing) * 80)}.w-fit{width:-moz-fit-content;width:fit-content}.w-full{width:100%}.w-max{width:max-content}.w-px{width:1px}.max-w-40{max-width:calc(var(--spacing) * 40)}.max-w-56{max-width:calc(var(--spacing) * 56)}.max-w-64{max-width:calc(var(--spacing) * 64)}.max-w-\\[80\\%\\]{max-width:80%}.max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 2rem)}.max-w-full{max-width:100%}.max-w-prose{max-width:65ch}.max-w-sm{max-width:var(--container-sm)}.max-w-xl{max-width:var(--container-xl)}.min-w-0{min-width:0}.min-w-5{min-width:calc(var(--spacing) * 5)}.min-w-8{min-width:calc(var(--spacing) * 8)}.min-w-40{min-width:calc(var(--spacing) * 40)}.min-w-\\[8rem\\]{min-width:8rem}.min-w-\\[var\\(--radix-select-trigger-width\\)\\]{min-width:var(--radix-select-trigger-width)}.flex-1{flex:1}.shrink-0{flex-shrink:0}.basis-full{flex-basis:100%}.caption-bottom{caption-side:bottom}.origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-1\\/2{--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-\\[-50\\%\\]{--tw-translate-x:-50%;translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-3\\/4{--tw-translate-y:calc(calc(3 / 4 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-0\\.5{--tw-translate-y:calc(var(--spacing) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-3\\/4{--tw-translate-y:calc(3 / 4 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-\\[-50\\%\\]{--tw-translate-y:-50%;translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-\\[calc\\(-50\\%_-_2px\\)\\]{--tw-translate-y:calc(-50% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.rotate-45{rotate:45deg}.rotate-180{rotate:180deg}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.shimmer{--shimmer-spread:calc(3ch + 40px);--shimmer-base:var(--muted-foreground);--shimmer-highlight:var(--foreground);background-image:linear-gradient(100deg, var(--shimmer-base) calc(50% - var(--shimmer-spread)), var(--shimmer-highlight) 50%, var(--shimmer-base) calc(50% + var(--shimmer-spread)));background-repeat:no-repeat;background-size:calc(200% + var(--shimmer-spread) * 2) 100%;-webkit-text-fill-color:transparent;color:#0000;background-position:100% 0;-webkit-background-clip:text;background-clip:text;animation:2.4s linear infinite sui-shimmer}.animate-in{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.animate-pulse{animation:var(--animate-pulse)}.animate-spin{animation:var(--animate-spin)}.sui-enter{animation:.18s cubic-bezier(.22,1,.36,1) both sui-enter}.cursor-default{cursor:default}.cursor-ew-resize{cursor:ew-resize}.cursor-ns-resize{cursor:ns-resize}.cursor-pointer{cursor:pointer}.cursor-text{cursor:text}.touch-none{touch-action:none}.resize{resize:both}.resize-none{resize:none}.snap-x{scroll-snap-type:x var(--tw-scroll-snap-strictness)}.snap-mandatory{--tw-scroll-snap-strictness:mandatory}.scroll-my-1{scroll-margin-block:var(--spacing)}.scroll-mt-4{scroll-margin-top:calc(var(--spacing) * 4)}.scroll-px-1{scroll-padding-inline:var(--spacing)}.scroll-py-1{scroll-padding-block:var(--spacing)}.scrollbar-none{scrollbar-width:none}.scrollbar-thin{scrollbar-width:thin}.scrollbar-gutter-stable{scrollbar-gutter:stable}.list-disc{list-style-type:disc}.auto-rows-min{grid-auto-rows:min-content}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-\\[0_1fr\\]{grid-template-columns:0 1fr}.grid-rows-\\[auto_auto\\]{grid-template-rows:auto auto}.flex-col{flex-direction:column}.flex-col-reverse{flex-direction:column-reverse}.flex-row{flex-direction:row}.flex-nowrap{flex-wrap:nowrap}.flex-wrap{flex-wrap:wrap}.place-content-center{place-content:center}.items-baseline{align-items:baseline}.items-center{align-items:center}.items-start{align-items:flex-start}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.justify-start{justify-content:flex-start}.justify-items-start{justify-items:start}.gap-0{gap:0}.gap-1{gap:var(--spacing)}.gap-1\\.5{gap:calc(var(--spacing) * 1.5)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-2\\.5{gap:calc(var(--spacing) * 2.5)}.gap-3{gap:calc(var(--spacing) * 3)}.gap-4{gap:calc(var(--spacing) * 4)}.gap-6{gap:calc(var(--spacing) * 6)}.gap-7{gap:calc(var(--spacing) * 7)}.gap-8{gap:calc(var(--spacing) * 8)}:where(.space-y-0>:not(:last-child)){--tw-space-y-reverse:0;margin-block:0}:where(.space-y-0\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * .5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * .5) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(var(--spacing) * var(--tw-space-y-reverse));margin-block-end:calc(var(--spacing) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-10>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 10) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 10) * calc(1 - var(--tw-space-y-reverse)))}.gap-x-3{column-gap:calc(var(--spacing) * 3)}:where(.-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--spacing) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--spacing) * -2) * calc(1 - var(--tw-space-x-reverse)))}.gap-y-0\\.5{row-gap:calc(var(--spacing) * .5)}.gap-y-2{row-gap:calc(var(--spacing) * 2)}:where(.divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.self-end{align-self:flex-end}.self-start{align-self:flex-start}.justify-self-end{justify-self:flex-end}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.overflow-auto{overflow:auto}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.overflow-x-hidden{overflow-x:hidden}.overflow-y-auto{overflow-y:auto}.overscroll-contain{overscroll-behavior:contain}.overscroll-x-contain{overscroll-behavior-x:contain}.rounded{border-radius:.25rem}.rounded-\\[2px\\]{border-radius:2px}.rounded-\\[4px\\]{border-radius:4px}.rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]{border-radius:calc(var(--radius) - 5px)}.rounded-\\[inherit\\]{border-radius:inherit}.rounded-full{border-radius:2147483647px}.rounded-lg{border-radius:calc(var(--radius) + 2px)}.rounded-md{border-radius:var(--radius)}.rounded-none{border-radius:0}.rounded-sm{border-radius:calc(var(--radius) - 2px)}.rounded-xl{border-radius:calc(var(--radius) + 6px)}.rounded-xs{border-radius:var(--radius-xs)}.border{border-style:var(--tw-border-style);border-width:1px}.border-0{border-style:var(--tw-border-style);border-width:0}.border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.border-r{border-right-style:var(--tw-border-style);border-right-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-l{border-left-style:var(--tw-border-style);border-left-width:1px}.border-dashed{--tw-border-style:dashed;border-style:dashed}.border-none{--tw-border-style:none;border-style:none}.border-border{border-color:var(--border)}.border-destructive\\/40{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.border-destructive\\/40{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.border-destructive\\/50{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.border-destructive\\/50{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.border-info\\/50{border-color:var(--info)}@supports (color:color-mix(in lab, red, red)){.border-info\\/50{border-color:color-mix(in oklab, var(--info) 50%, transparent)}}.border-input{border-color:var(--input)}.border-primary{border-color:var(--primary)}.border-success\\/50{border-color:var(--success)}@supports (color:color-mix(in lab, red, red)){.border-success\\/50{border-color:color-mix(in oklab, var(--success) 50%, transparent)}}.border-transparent{border-color:#0000}.border-warning\\/50{border-color:var(--warning)}@supports (color:color-mix(in lab, red, red)){.border-warning\\/50{border-color:color-mix(in oklab, var(--warning) 50%, transparent)}}.border-t-transparent{border-top-color:#0000}.border-l-transparent{border-left-color:#0000}.bg-accent{background-color:var(--accent)}.bg-background{background-color:var(--background)}.bg-black\\/50{background-color:#00000080}@supports (color:color-mix(in lab, red, red)){.bg-black\\/50{background-color:color-mix(in oklab, var(--color-black) 50%, transparent)}}.bg-border{background-color:var(--border)}.bg-border-strong{background-color:var(--border-strong)}.bg-card{background-color:var(--card)}.bg-destructive,.bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.bg-foreground{background-color:var(--foreground)}.bg-info\\/5{background-color:var(--info)}@supports (color:color-mix(in lab, red, red)){.bg-info\\/5{background-color:color-mix(in oklab, var(--info) 5%, transparent)}}.bg-muted,.bg-muted\\/40{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.bg-muted\\/40{background-color:color-mix(in oklab, var(--muted) 40%, transparent)}}.bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.bg-muted\\/60{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.bg-muted\\/60{background-color:color-mix(in oklab, var(--muted) 60%, transparent)}}.bg-popover{background-color:var(--popover)}.bg-primary,.bg-primary\\/10{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.bg-primary\\/10{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.bg-primary\\/20{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.bg-primary\\/20{background-color:color-mix(in oklab, var(--primary) 20%, transparent)}}.bg-secondary{background-color:var(--secondary)}.bg-success,.bg-success\\/10{background-color:var(--success)}@supports (color:color-mix(in lab, red, red)){.bg-success\\/10{background-color:color-mix(in oklab, var(--success) 10%, transparent)}}.bg-transparent{background-color:#0000}.bg-warning,.bg-warning\\/5{background-color:var(--warning)}@supports (color:color-mix(in lab, red, red)){.bg-warning\\/5{background-color:color-mix(in oklab, var(--warning) 5%, transparent)}}.bg-warning\\/10{background-color:var(--warning)}@supports (color:color-mix(in lab, red, red)){.bg-warning\\/10{background-color:color-mix(in oklab, var(--warning) 10%, transparent)}}.scroll-fade-b{--sui-fade:2.5rem;-webkit-mask-image:linear-gradient(to bottom, #000 0, #000 calc(100% - var(--sui-fade)), transparent 100%);-webkit-mask-image:linear-gradient(to bottom, #000 0, #000 calc(100% - var(--sui-fade)), transparent 100%);-webkit-mask-image:linear-gradient(to bottom, #000 0, #000 calc(100% - var(--sui-fade)), transparent 100%);-webkit-mask-image:linear-gradient(to bottom, #000 0, #000 calc(100% - var(--sui-fade)), transparent 100%);mask-image:linear-gradient(to bottom, #000 0, #000 calc(100% - var(--sui-fade)), transparent 100%);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.scroll-fade-x{--sui-fade:1.5rem;-webkit-mask-image:linear-gradient(to right, transparent 0, #000 var(--sui-fade), #000 calc(100% - var(--sui-fade)), transparent 100%);-webkit-mask-image:linear-gradient(to right, transparent 0, #000 var(--sui-fade), #000 calc(100% - var(--sui-fade)), transparent 100%);-webkit-mask-image:linear-gradient(to right, transparent 0, #000 var(--sui-fade), #000 calc(100% - var(--sui-fade)), transparent 100%);-webkit-mask-image:linear-gradient(to right, transparent 0, #000 var(--sui-fade), #000 calc(100% - var(--sui-fade)), transparent 100%);mask-image:linear-gradient(to right, transparent 0, #000 var(--sui-fade), #000 calc(100% - var(--sui-fade)), transparent 100%);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.fill-current{fill:currentColor}.fill-foreground{fill:var(--foreground)}.p-0{padding:0}.p-1{padding:var(--spacing)}.p-1\\.5{padding:calc(var(--spacing) * 1.5)}.p-2{padding:calc(var(--spacing) * 2)}.p-3{padding:calc(var(--spacing) * 3)}.p-4{padding:calc(var(--spacing) * 4)}.p-6{padding:calc(var(--spacing) * 6)}.p-\\[3px\\]{padding:3px}.p-px{padding:1px}.px-0{padding-inline:0}.px-1{padding-inline:var(--spacing)}.px-1\\.5{padding-inline:calc(var(--spacing) * 1.5)}.px-2{padding-inline:calc(var(--spacing) * 2)}.px-2\\.5{padding-inline:calc(var(--spacing) * 2.5)}.px-3{padding-inline:calc(var(--spacing) * 3)}.px-4{padding-inline:calc(var(--spacing) * 4)}.px-6{padding-inline:calc(var(--spacing) * 6)}.py-0\\.5{padding-block:calc(var(--spacing) * .5)}.py-1{padding-block:var(--spacing)}.py-1\\.5{padding-block:calc(var(--spacing) * 1.5)}.py-2{padding-block:calc(var(--spacing) * 2)}.py-2\\.5{padding-block:calc(var(--spacing) * 2.5)}.py-3{padding-block:calc(var(--spacing) * 3)}.py-4{padding-block:calc(var(--spacing) * 4)}.py-6{padding-block:calc(var(--spacing) * 6)}.py-10{padding-block:calc(var(--spacing) * 10)}.py-px{padding-block:1px}.ps-1{padding-inline-start:var(--spacing)}.ps-2\\.5{padding-inline-start:calc(var(--spacing) * 2.5)}.pt-0{padding-top:0}.pt-3{padding-top:calc(var(--spacing) * 3)}.pr-2{padding-right:calc(var(--spacing) * 2)}.pr-3{padding-right:calc(var(--spacing) * 3)}.pr-8{padding-right:calc(var(--spacing) * 8)}.pb-2{padding-bottom:calc(var(--spacing) * 2)}.pb-3{padding-bottom:calc(var(--spacing) * 3)}.pb-4{padding-bottom:calc(var(--spacing) * 4)}.pb-16{padding-bottom:calc(var(--spacing) * 16)}.pl-2{padding-left:calc(var(--spacing) * 2)}.pl-3{padding-left:calc(var(--spacing) * 3)}.pl-8{padding-left:calc(var(--spacing) * 8)}.text-center{text-align:center}.text-end{text-align:end}.text-left{text-align:left}.text-start{text-align:start}.align-middle{vertical-align:middle}.font-mono{font-family:var(--font-code)}.font-sans{font-family:var(--font-ui)}.text-base{font-size:var(--text-base);line-height:var(--tw-leading,var(--text-base--line-height))}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-sm\\/relaxed{font-size:var(--text-sm);line-height:var(--leading-relaxed)}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.text-\\[0\\.6875rem\\]{font-size:.6875rem}.text-\\[length\\:var\\(--text-read\\)\\]{font-size:var(--text-read)}.leading-none{--tw-leading:1;line-height:1}.leading-normal{--tw-leading:var(--leading-normal);line-height:var(--leading-normal)}.leading-relaxed{--tw-leading:var(--leading-relaxed);line-height:var(--leading-relaxed)}.leading-snug{--tw-leading:var(--leading-snug);line-height:var(--leading-snug)}.leading-tight{--tw-leading:var(--leading-tight);line-height:var(--leading-tight)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-normal{--tw-font-weight:var(--font-weight-normal);font-weight:var(--font-weight-normal)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-tight{--tw-tracking:var(--tracking-tight);letter-spacing:var(--tracking-tight)}.tracking-wide{--tw-tracking:var(--tracking-wide);letter-spacing:var(--tracking-wide)}.tracking-widest{--tw-tracking:var(--tracking-widest);letter-spacing:var(--tracking-widest)}.text-balance{text-wrap:balance}.break-words,.wrap-break-word{overflow-wrap:break-word}.whitespace-nowrap{white-space:nowrap}.whitespace-pre-wrap{white-space:pre-wrap}.text-background{color:var(--background)}.text-card-foreground{color:var(--card-foreground)}.text-current{color:currentColor}.text-destructive{color:var(--destructive)}.text-foreground,.text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.text-info{color:var(--info)}.text-muted-foreground{color:var(--muted-foreground)}.text-popover-foreground{color:var(--popover-foreground)}.text-primary{color:var(--primary)}.text-primary-foreground{color:var(--primary-foreground)}.text-secondary-foreground{color:var(--secondary-foreground)}.text-success-foreground{color:var(--success-foreground)}.text-warning{color:var(--warning)}.text-warning-foreground{color:var(--warning-foreground)}.text-white{color:var(--color-white)}.normal-case{text-transform:none}.uppercase{text-transform:uppercase}.underline-offset-4{text-underline-offset:4px}.opacity-0{opacity:0}.opacity-50{opacity:.5}.opacity-60{opacity:.6}.opacity-70{opacity:.7}.shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-2xl{--tw-shadow:0 25px 50px -12px var(--tw-shadow-color,#00000040);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-xs{--tw-shadow:0 1px 2px 0 var(--tw-shadow-color,#0000000d);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-3{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.effect-spine{box-shadow:inset 2px 0 0 0 var(--spine,var(--border-strong))}.ring-background{--tw-ring-color:var(--background)}.ring-card{--tw-ring-color:var(--card)}.ring-offset-background{--tw-ring-offset-color:var(--background)}.outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.outline-hidden{outline-offset:2px;outline:2px solid #0000}}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[translate\\,scale\\,opacity\\]{transition-property:translate,scale,opacity;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-shadow{transition-property:box-shadow;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-none{transition-property:none}.duration-100{--tw-duration:.1s;transition-duration:.1s}.duration-150{--tw-duration:.15s;transition-duration:.15s}.duration-200{--tw-duration:.2s;transition-duration:.2s}.ease-in-out{--tw-ease:var(--ease-in-out);transition-timing-function:var(--ease-in-out)}.ease-out{--tw-ease:var(--ease-out);transition-timing-function:var(--ease-out)}.contain-content{contain:content}.fade-in-0{--tw-enter-opacity:0}.outline-none{--tw-outline-style:none;outline-style:none}.select-none{-webkit-user-select:none;user-select:none}.zoom-in-95{--tw-enter-scale:.95}.\\[contain-intrinsic-size\\:auto_10rem\\]{contain-intrinsic-size:auto 10rem}.\\[content-visibility\\:auto\\]{content-visibility:auto}.paused{animation-play-state:paused}.running{animation-play-state:running}@media (hover:hover){.group-hover\\:bg-primary:is(:where(.group):hover *){background-color:var(--primary)}.group-hover\\:opacity-100:is(:where(.group):hover *){opacity:1}}.group-focus-visible\\:bg-primary:is(:where(.group):focus-visible *){background-color:var(--primary)}.group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.group\\/avatar-group):has([data-size=lg]) *){width:calc(var(--spacing) * 10);height:calc(var(--spacing) * 10)}.group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.group\\/avatar-group):has([data-size=sm]) *){width:calc(var(--spacing) * 6);height:calc(var(--spacing) * 6)}.group-has-data-\\[slot\\=message-footer\\]\\/message\\:-translate-y-8:is(:where(.group\\/message):has([data-slot=message-footer]) *){--tw-translate-y:calc(var(--spacing) * -8);translate:var(--tw-translate-x) var(--tw-translate-y)}.group-has-data-\\[variant\\=ghost\\]\\/message\\:px-0:is(:where(.group\\/message):has([data-variant=ghost]) *){padding-inline:0}.group-has-\\[\\[data-orientation\\=horizontal\\]\\]\\/field\\:text-balance:is(:where(.group\\/field):has([data-orientation=horizontal]) *){text-wrap:balance}.group-has-\\[\\[data-slot\\=item-description\\]\\]\\/item\\:translate-y-0\\.5:is(:where(.group\\/item):has([data-slot=item-description]) *){--tw-translate-y:calc(var(--spacing) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}.group-has-\\[\\[data-slot\\=item-description\\]\\]\\/item\\:self-start:is(:where(.group\\/item):has([data-slot=item-description]) *){align-self:flex-start}.group-has-\\[\\>input\\]\\/input-group\\:pt-2\\.5:is(:where(.group\\/input-group):has(>input) *){padding-top:calc(var(--spacing) * 2.5)}.group-has-\\[\\>input\\]\\/input-group\\:pb-2\\.5:is(:where(.group\\/input-group):has(>input) *){padding-bottom:calc(var(--spacing) * 2.5)}.group-data-\\[align\\=end\\]\\/bubble\\:self-end:is(:where(.group\\/bubble)[data-align=end] *){align-self:flex-end}.group-data-\\[align\\=end\\]\\/message\\:justify-end:is(:where(.group\\/message)[data-align=end] *){justify-content:flex-end}.group-data-\\[align\\=end\\]\\/message\\:self-end:is(:where(.group\\/message)[data-align=end] *){align-self:flex-end}.group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.group)[data-disabled=true] *){pointer-events:none}.group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.group)[data-disabled=true] *),.group-data-\\[disabled\\=true\\]\\/field\\:opacity-50:is(:where(.group\\/field)[data-disabled=true] *),.group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.group\\/input-group)[data-disabled=true] *){opacity:.5}.group-data-\\[orientation\\=horizontal\\]\\/tabs\\:h-9:is(:where(.group\\/tabs)[data-orientation=horizontal] *){height:calc(var(--spacing) * 9)}.group-data-\\[orientation\\=vertical\\]\\/attachment\\:absolute:is(:where(.group\\/attachment)[data-orientation=vertical] *){position:absolute}.group-data-\\[orientation\\=vertical\\]\\/attachment\\:top-3:is(:where(.group\\/attachment)[data-orientation=vertical] *){top:calc(var(--spacing) * 3)}.group-data-\\[orientation\\=vertical\\]\\/attachment\\:right-3:is(:where(.group\\/attachment)[data-orientation=vertical] *){right:calc(var(--spacing) * 3)}.group-data-\\[orientation\\=vertical\\]\\/attachment\\:w-full:is(:where(.group\\/attachment)[data-orientation=vertical] *){width:100%}.group-data-\\[orientation\\=vertical\\]\\/attachment\\:gap-1:is(:where(.group\\/attachment)[data-orientation=vertical] *){gap:var(--spacing)}.group-data-\\[orientation\\=vertical\\]\\/attachment\\:px-1:is(:where(.group\\/attachment)[data-orientation=vertical] *){padding-inline:var(--spacing)}.group-data-\\[orientation\\=vertical\\]\\/tabs\\:h-fit:is(:where(.group\\/tabs)[data-orientation=vertical] *){height:-moz-fit-content;height:fit-content}.group-data-\\[orientation\\=vertical\\]\\/tabs\\:w-full:is(:where(.group\\/tabs)[data-orientation=vertical] *){width:100%}.group-data-\\[orientation\\=vertical\\]\\/tabs\\:flex-col:is(:where(.group\\/tabs)[data-orientation=vertical] *){flex-direction:column}.group-data-\\[orientation\\=vertical\\]\\/tabs\\:justify-start:is(:where(.group\\/tabs)[data-orientation=vertical] *){justify-content:flex-start}.group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.group\\/avatar)[data-size=default] *){width:calc(var(--spacing) * 2.5);height:calc(var(--spacing) * 2.5)}.group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.group\\/switch)[data-size=default] *){width:calc(var(--spacing) * 4);height:calc(var(--spacing) * 4)}.group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.group\\/avatar)[data-size=lg] *){width:calc(var(--spacing) * 3);height:calc(var(--spacing) * 3)}.group-data-\\[size\\=sm\\]\\/attachment\\:w-8:is(:where(.group\\/attachment)[data-size=sm] *){width:calc(var(--spacing) * 8)}.group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.group\\/avatar)[data-size=sm] *){width:calc(var(--spacing) * 2);height:calc(var(--spacing) * 2)}.group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.group\\/avatar)[data-size=sm] *){font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.group\\/switch)[data-size=sm] *){width:calc(var(--spacing) * 3);height:calc(var(--spacing) * 3)}.group-data-\\[size\\=xs\\]\\/attachment\\:w-7:is(:where(.group\\/attachment)[data-size=xs] *){width:calc(var(--spacing) * 7)}.group-data-\\[size\\=xs\\]\\/attachment\\:rounded-md:is(:where(.group\\/attachment)[data-size=xs] *){border-radius:var(--radius)}.group-data-\\[state\\=done\\]\\/attachment\\:opacity-100:is(:where(.group\\/attachment)[data-state=done] *){opacity:1}.group-data-\\[state\\=error\\]\\/attachment\\:bg-destructive\\/10:is(:where(.group\\/attachment)[data-state=error] *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.group-data-\\[state\\=error\\]\\/attachment\\:bg-destructive\\/10:is(:where(.group\\/attachment)[data-state=error] *){background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.group-data-\\[state\\=error\\]\\/attachment\\:text-destructive:is(:where(.group\\/attachment)[data-state=error] *),.group-data-\\[state\\=error\\]\\/attachment\\:text-destructive\\/80:is(:where(.group\\/attachment)[data-state=error] *){color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.group-data-\\[state\\=error\\]\\/attachment\\:text-destructive\\/80:is(:where(.group\\/attachment)[data-state=error] *){color:color-mix(in oklab, var(--destructive) 80%, transparent)}}.group-data-\\[state\\=idle\\]\\/attachment\\:opacity-100:is(:where(.group\\/attachment)[data-state=idle] *){opacity:1}.group-data-\\[state\\=open\\]\\:rotate-180:is(:where(.group)[data-state=open] *){rotate:180deg}.group-data-\\[state\\=processing\\]\\/attachment\\:shimmer:is(:where(.group\\/attachment)[data-state=processing] *),.group-data-\\[state\\=uploading\\]\\/attachment\\:shimmer:is(:where(.group\\/attachment)[data-state=uploading] *){--shimmer-spread:calc(3ch + 40px);--shimmer-base:var(--muted-foreground);--shimmer-highlight:var(--foreground);background-image:linear-gradient(100deg, var(--shimmer-base) calc(50% - var(--shimmer-spread)), var(--shimmer-highlight) 50%, var(--shimmer-base) calc(50% + var(--shimmer-spread)));background-repeat:no-repeat;background-size:calc(200% + var(--shimmer-spread) * 2) 100%;-webkit-text-fill-color:transparent;color:#0000;background-position:100% 0;-webkit-background-clip:text;background-clip:text;animation:2.4s linear infinite sui-shimmer}.group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.group\\/tabs-list)[data-variant=line] *){background-color:#0000}.group-data-\\[variant\\=outline\\]\\/field-group\\:-mb-2:is(:where(.group\\/field-group)[data-variant=outline] *){margin-bottom:calc(var(--spacing) * -2)}.group-data-\\[variant\\=separator\\]\\/marker\\:flex-none:is(:where(.group\\/marker)[data-variant=separator] *){flex:none}.group-data-\\[variant\\=separator\\]\\/marker\\:text-center:is(:where(.group\\/marker)[data-variant=separator] *){text-align:center}.peer-disabled\\:cursor-not-allowed:is(:where(.peer):disabled~*){cursor:not-allowed}.peer-disabled\\:opacity-50:is(:where(.peer):disabled~*){opacity:.5}.selection\\:bg-primary ::selection{background-color:var(--primary)}.selection\\:bg-primary::selection{background-color:var(--primary)}.selection\\:text-primary-foreground ::selection{color:var(--primary-foreground)}.selection\\:text-primary-foreground::selection{color:var(--primary-foreground)}.file\\:inline-flex::file-selector-button{display:inline-flex}.file\\:h-7::file-selector-button{height:calc(var(--spacing) * 7)}.file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.file\\:bg-transparent::file-selector-button{background-color:#0000}.file\\:text-sm::file-selector-button{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.file\\:font-medium::file-selector-button{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.file\\:text-foreground::file-selector-button{color:var(--foreground)}.placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.before\\:mr-1:before{content:var(--tw-content);margin-right:var(--spacing)}.before\\:h-px:before{content:var(--tw-content);height:1px}.before\\:min-w-0:before{content:var(--tw-content);min-width:0}.before\\:flex-1:before{content:var(--tw-content);flex:1}.before\\:bg-border:before{content:var(--tw-content);background-color:var(--border)}.after\\:absolute:after{content:var(--tw-content);position:absolute}.after\\:ml-1:after{content:var(--tw-content);margin-left:var(--spacing)}.after\\:h-px:after{content:var(--tw-content);height:1px}.after\\:min-w-0:after{content:var(--tw-content);min-width:0}.after\\:flex-1:after{content:var(--tw-content);flex:1}.after\\:bg-border:after{content:var(--tw-content);background-color:var(--border)}.after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.after\\:opacity-0:after{content:var(--tw-content);opacity:0}.after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.group-data-\\[orientation\\=horizontal\\]\\/tabs\\:after\\:inset-x-0:is(:where(.group\\/tabs)[data-orientation=horizontal] *):after{content:var(--tw-content);inset-inline:0}.group-data-\\[orientation\\=horizontal\\]\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.group\\/tabs)[data-orientation=horizontal] *):after{content:var(--tw-content);bottom:-5px}.group-data-\\[orientation\\=horizontal\\]\\/tabs\\:after\\:h-0\\.5:is(:where(.group\\/tabs)[data-orientation=horizontal] *):after{content:var(--tw-content);height:calc(var(--spacing) * .5)}.group-data-\\[orientation\\=vertical\\]\\/tabs\\:after\\:inset-y-0:is(:where(.group\\/tabs)[data-orientation=vertical] *):after{content:var(--tw-content);inset-block:0}.group-data-\\[orientation\\=vertical\\]\\/tabs\\:after\\:-right-1:is(:where(.group\\/tabs)[data-orientation=vertical] *):after{content:var(--tw-content);right:calc(var(--spacing) * -1)}.group-data-\\[orientation\\=vertical\\]\\/tabs\\:after\\:w-0\\.5:is(:where(.group\\/tabs)[data-orientation=vertical] *):after{content:var(--tw-content);width:calc(var(--spacing) * .5)}.last\\:mt-0:last-child{margin-top:0}.last\\:border-b-0:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.focus-within\\:ring-1:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.focus-within\\:ring-ring\\/50:focus-within{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.focus-within\\:ring-ring\\/50:focus-within{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}@media (hover:hover){.hover\\:bg-accent:hover,.hover\\:bg-accent\\/60:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-accent\\/60:hover{background-color:color-mix(in oklab, var(--accent) 60%, transparent)}}.hover\\:bg-destructive\\/90:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-destructive\\/90:hover{background-color:color-mix(in oklab, var(--destructive) 90%, transparent)}}.hover\\:bg-muted:hover,.hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.hover\\:bg-primary\\/90:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab, var(--primary) 90%, transparent)}}.hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.hover\\:text-accent-foreground:hover{color:var(--accent-foreground)}.hover\\:text-foreground:hover{color:var(--foreground)}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:opacity-100:hover{opacity:1}}.focus\\:bg-accent:focus{background-color:var(--accent)}.focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.focus\\:ring-offset-2:focus{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}.focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.focus-visible\\:opacity-100:focus-visible{opacity:1}.focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.focus-visible\\:ring-3:focus-visible,.focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}.focus-visible\\:outline-none:focus-visible{--tw-outline-style:none;outline-style:none}.active\\:scale-95:active{--tw-scale-x:95%;--tw-scale-y:95%;--tw-scale-z:95%;scale:var(--tw-scale-x) var(--tw-scale-y)}.disabled\\:pointer-events-none:disabled{pointer-events:none}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-50:disabled{opacity:.5}.has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.has-data-\\[slot\\=attachment-content\\]\\:w-30:has([data-slot=attachment-content]){width:calc(var(--spacing) * 30)}.has-data-\\[slot\\=attachment-content\\]\\:px-1\\.5:has([data-slot=attachment-content]){padding-inline:calc(var(--spacing) * 1.5)}.has-data-\\[slot\\=attachment-content\\]\\:px-2:has([data-slot=attachment-content]){padding-inline:calc(var(--spacing) * 2)}.has-data-\\[slot\\=attachment-content\\]\\:px-2\\.5:has([data-slot=attachment-content]){padding-inline:calc(var(--spacing) * 2.5)}.has-data-\\[slot\\=attachment-content\\]\\:py-1:has([data-slot=attachment-content]){padding-block:var(--spacing)}.has-data-\\[slot\\=attachment-content\\]\\:py-1\\.5:has([data-slot=attachment-content]){padding-block:calc(var(--spacing) * 1.5)}.has-data-\\[slot\\=attachment-content\\]\\:py-2:has([data-slot=attachment-content]){padding-block:calc(var(--spacing) * 2)}.has-data-\\[slot\\=attachment-media\\]\\:p-1:has([data-slot=attachment-media]){padding:var(--spacing)}.has-data-\\[slot\\=attachment-media\\]\\:p-1\\.5:has([data-slot=attachment-media]){padding:calc(var(--spacing) * 1.5)}.has-data-\\[slot\\=attachment-media\\]\\:p-2:has([data-slot=attachment-media]){padding:calc(var(--spacing) * 2)}.has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.has-data-\\[state\\=checked\\]\\:border-primary:has([data-state=checked]){border-color:var(--primary)}.has-data-\\[state\\=checked\\]\\:bg-primary\\/5:has([data-state=checked]){background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.has-data-\\[state\\=checked\\]\\:bg-primary\\/5:has([data-state=checked]){background-color:color-mix(in oklab, var(--primary) 5%, transparent)}}.has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-\\[3px\\]:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.has-\\[button\\]\\:p-0:has(:is(button)){padding:0}.has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.has-\\[\\>\\[data-slot\\=checkbox-group\\]\\]\\:gap-3:has(>[data-slot=checkbox-group]){gap:calc(var(--spacing) * 3)}.has-\\[\\>\\[data-slot\\=field-content\\]\\]\\:items-start:has(>[data-slot=field-content]){align-items:flex-start}.has-\\[\\>\\[data-slot\\=field\\]\\]\\:w-full:has(>[data-slot=field]){width:100%}.has-\\[\\>\\[data-slot\\=field\\]\\]\\:flex-col:has(>[data-slot=field]){flex-direction:column}.has-\\[\\>\\[data-slot\\=field\\]\\]\\:rounded-md:has(>[data-slot=field]){border-radius:var(--radius)}.has-\\[\\>\\[data-slot\\=field\\]\\]\\:border:has(>[data-slot=field]){border-style:var(--tw-border-style);border-width:1px}.has-\\[\\>\\[data-slot\\=radio-group\\]\\]\\:gap-3:has(>[data-slot=radio-group]){gap:calc(var(--spacing) * 3)}@media (hover:hover){.has-\\[\\>a\\,\\>button\\]\\:hover\\:bg-muted\\/50:has(>a,>button):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.has-\\[\\>a\\,\\>button\\]\\:hover\\:bg-muted\\/50:has(>a,>button):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}}.has-\\[\\>button\\]\\:mr-\\[-0\\.45rem\\]:has(>button){margin-right:-.45rem}.has-\\[\\>button\\]\\:ml-\\[-0\\.45rem\\]:has(>button){margin-left:-.45rem}.has-\\[\\>kbd\\]\\:mr-\\[-0\\.35rem\\]:has(>kbd){margin-right:-.35rem}.has-\\[\\>kbd\\]\\:ml-\\[-0\\.35rem\\]:has(>kbd){margin-left:-.35rem}.has-\\[\\>svg\\]\\:grid-cols-\\[calc\\(var\\(--spacing\\)\\*4\\)_1fr\\]:has(>svg){grid-template-columns:calc(var(--spacing) * 4) 1fr}.has-\\[\\>svg\\]\\:gap-x-3:has(>svg){column-gap:calc(var(--spacing) * 3)}.has-\\[\\>svg\\]\\:p-0:has(>svg){padding:0}.has-\\[\\>svg\\]\\:px-1\\.5:has(>svg){padding-inline:calc(var(--spacing) * 1.5)}.has-\\[\\>svg\\]\\:px-2:has(>svg){padding-inline:calc(var(--spacing) * 2)}.has-\\[\\>svg\\]\\:px-2\\.5:has(>svg){padding-inline:calc(var(--spacing) * 2.5)}.has-\\[\\>svg\\]\\:px-3:has(>svg){padding-inline:calc(var(--spacing) * 3)}.has-\\[\\>svg\\]\\:px-4:has(>svg){padding-inline:calc(var(--spacing) * 4)}.has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.aria-\\[current\\]\\:bg-accent[aria-current]{background-color:var(--accent)}.aria-\\[current\\]\\:text-accent-foreground[aria-current]{color:var(--accent-foreground)}.data-autoscrolling\\:scrollbar-none[data-autoscrolling]{-ms-overflow-style:none}.data-autoscrolling\\:scrollbar-none[data-autoscrolling]::-webkit-scrollbar{display:none}.data-autoscrolling\\:scrollbar-none[data-autoscrolling]{scrollbar-width:none}.data-pending-scroll\\:invisible[data-pending-scroll]{visibility:hidden}:is(.group-data-\\[align\\=end\\]\\/message\\:\\*\\:data-slot\\:self-end:is(:where(.group\\/message)[data-align=end] *)>*)[data-slot]{align-self:flex-end}.data-\\[active\\=false\\]\\:pointer-events-none[data-active=false]{pointer-events:none}.data-\\[active\\=false\\]\\:scale-95[data-active=false]{--tw-scale-x:95%;--tw-scale-y:95%;--tw-scale-z:95%;scale:var(--tw-scale-x) var(--tw-scale-y)}.data-\\[active\\=false\\]\\:opacity-0[data-active=false]{opacity:0}.data-\\[active\\=false\\]\\:duration-400[data-active=false]{--tw-duration:.4s;transition-duration:.4s}.data-\\[active\\=false\\]\\:ease-\\[cubic-bezier\\(0\\.7\\,0\\,0\\.84\\,0\\)\\][data-active=false]{--tw-ease:cubic-bezier(.7,0,.84,0);transition-timing-function:cubic-bezier(.7,0,.84,0)}.data-\\[active\\=true\\]\\:translate-y-0[data-active=true]{--tw-translate-y:0px;translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[active\\=true\\]\\:scale-100[data-active=true]{--tw-scale-x:100%;--tw-scale-y:100%;--tw-scale-z:100%;scale:var(--tw-scale-x) var(--tw-scale-y)}.data-\\[active\\=true\\]\\:opacity-100[data-active=true]{opacity:1}.data-\\[active\\=true\\]\\:ease-\\[cubic-bezier\\(0\\.23\\,1\\,0\\.32\\,1\\)\\][data-active=true]{--tw-ease:cubic-bezier(.23,1,.32,1);transition-timing-function:cubic-bezier(.23,1,.32,1)}.data-\\[align\\=end\\]\\:flex-row-reverse[data-align=end]{flex-direction:row-reverse}.data-\\[align\\=end\\]\\:self-end[data-align=end]{align-self:flex-end}.data-\\[direction\\=end\\]\\:bottom-4[data-direction=end]{bottom:calc(var(--spacing) * 4)}.data-\\[direction\\=end\\]\\:data-\\[active\\=false\\]\\:translate-y-full[data-direction=end][data-active=false]{--tw-translate-y:100%;translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[direction\\=start\\]\\:top-4[data-direction=start]{top:calc(var(--spacing) * 4)}.data-\\[direction\\=start\\]\\:data-\\[active\\=false\\]\\:-translate-y-full[data-direction=start][data-active=false]{--tw-translate-y:-100%;translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[disabled\\]\\:pointer-events-none[data-disabled]{pointer-events:none}.data-\\[disabled\\]\\:opacity-50[data-disabled]{opacity:.5}.data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.data-\\[inset\\]\\:pl-8[data-inset]{padding-left:calc(var(--spacing) * 8)}.data-\\[invalid\\=true\\]\\:text-destructive[data-invalid=true]{color:var(--destructive)}.data-\\[orientation\\=horizontal\\]\\:h-px[data-orientation=horizontal]{height:1px}.data-\\[orientation\\=horizontal\\]\\:w-full[data-orientation=horizontal]{width:100%}.data-\\[orientation\\=horizontal\\]\\:flex-col[data-orientation=horizontal]{flex-direction:column}.data-\\[orientation\\=vertical\\]\\:h-full[data-orientation=vertical]{height:100%}.data-\\[orientation\\=vertical\\]\\:w-px[data-orientation=vertical]{width:1px}.data-\\[placeholder\\]\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.data-\\[selected\\=true\\]\\:bg-accent[data-selected=true]{background-color:var(--accent)}.data-\\[selected\\=true\\]\\:text-accent-foreground[data-selected=true]{color:var(--accent-foreground)}.data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:var(--spacing);translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:var(--spacing);translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.data-\\[size\\=default\\]\\:h-9[data-size=default]{height:calc(var(--spacing) * 9)}.data-\\[size\\=default\\]\\:h-\\[1\\.15rem\\][data-size=default]{height:1.15rem}.data-\\[size\\=default\\]\\:w-8[data-size=default]{width:calc(var(--spacing) * 8)}.data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(var(--spacing) * 10);height:calc(var(--spacing) * 10)}.data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(var(--spacing) * 6);height:calc(var(--spacing) * 6)}.data-\\[size\\=sm\\]\\:h-3\\.5[data-size=sm]{height:calc(var(--spacing) * 3.5)}.data-\\[size\\=sm\\]\\:h-8[data-size=sm]{height:calc(var(--spacing) * 8)}.data-\\[size\\=sm\\]\\:w-6[data-size=sm]{width:calc(var(--spacing) * 6)}:is(.\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.\\*\\:data-\\[slot\\=attachment\\]\\:flex-none>*)[data-slot=attachment]{flex:none}:is(.\\*\\:data-\\[slot\\=attachment\\]\\:snap-start>*)[data-slot=attachment]{scroll-snap-align:start}:is(.\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.\\*\\:data-\\[slot\\=bubble-content\\]\\:rounded-none>*)[data-slot=bubble-content]{border-radius:0}:is(.\\*\\:data-\\[slot\\=bubble-content\\]\\:border-border>*)[data-slot=bubble-content]{border-color:var(--border)}:is(.\\*\\:data-\\[slot\\=bubble-content\\]\\:bg-\\[oklch\\(from_var\\(--primary\\)_0\\.93_calc\\(c\\*0\\.4\\)_h\\)\\]>*)[data-slot=bubble-content]{background-color:oklch(from var(--primary) .93 calc(c * .4) h)}:is(.\\*\\:data-\\[slot\\=bubble-content\\]\\:bg-background>*)[data-slot=bubble-content]{background-color:var(--background)}:is(.\\*\\:data-\\[slot\\=bubble-content\\]\\:bg-destructive\\/10>*)[data-slot=bubble-content]{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.\\*\\:data-\\[slot\\=bubble-content\\]\\:bg-destructive\\/10>*)[data-slot=bubble-content]{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}:is(.\\*\\:data-\\[slot\\=bubble-content\\]\\:bg-muted>*)[data-slot=bubble-content]{background-color:var(--muted)}:is(.\\*\\:data-\\[slot\\=bubble-content\\]\\:bg-primary>*)[data-slot=bubble-content]{background-color:var(--primary)}:is(.\\*\\:data-\\[slot\\=bubble-content\\]\\:bg-secondary>*)[data-slot=bubble-content]{background-color:var(--secondary)}:is(.\\*\\:data-\\[slot\\=bubble-content\\]\\:bg-transparent>*)[data-slot=bubble-content]{background-color:#0000}:is(.\\*\\:data-\\[slot\\=bubble-content\\]\\:p-0>*)[data-slot=bubble-content]{padding:0}:is(.\\*\\:data-\\[slot\\=bubble-content\\]\\:text-destructive>*)[data-slot=bubble-content]{color:var(--destructive)}:is(.\\*\\:data-\\[slot\\=bubble-content\\]\\:text-foreground>*)[data-slot=bubble-content]{color:var(--foreground)}:is(.\\*\\:data-\\[slot\\=bubble-content\\]\\:text-primary-foreground>*)[data-slot=bubble-content]{color:var(--primary-foreground)}:is(.\\*\\:data-\\[slot\\=bubble-content\\]\\:text-secondary-foreground>*)[data-slot=bubble-content]{color:var(--secondary-foreground)}.data-\\[slot\\=checkbox-group\\]\\:gap-3[data-slot=checkbox-group]{gap:calc(var(--spacing) * 3)}:is(.\\*\\*\\:data-\\[slot\\=command-input-wrapper\\]\\:h-12 *)[data-slot=command-input-wrapper]{height:calc(var(--spacing) * 12)}:is(.\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.\\*\\:data-\\[slot\\=select-value\\]\\:gap-2>*)[data-slot=select-value]{gap:calc(var(--spacing) * 2)}:is(.group-data-\\[orientation\\=vertical\\]\\/attachment\\:\\*\\:data-\\[slot\\=spinner\\]\\:size-6\\!:is(:where(.group\\/attachment)[data-orientation=vertical] *)>*)[data-slot=spinner]{width:calc(var(--spacing) * 6)!important;height:calc(var(--spacing) * 6)!important}.data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.group-data-\\[variant\\=default\\]\\/tabs-list\\:data-\\[state\\=active\\]\\:shadow-sm:is(:where(.group\\/tabs-list)[data-variant=default] *)[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.group-data-\\[variant\\=line\\]\\/tabs-list\\:data-\\[state\\=active\\]\\:bg-transparent:is(:where(.group\\/tabs-list)[data-variant=line] *)[data-state=active]{background-color:#0000}.group-data-\\[variant\\=line\\]\\/tabs-list\\:data-\\[state\\=active\\]\\:shadow-none:is(:where(.group\\/tabs-list)[data-variant=line] *)[data-state=active]{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.group-data-\\[variant\\=line\\]\\/tabs-list\\:data-\\[state\\=active\\]\\:after\\:opacity-100:is(:where(.group\\/tabs-list)[data-variant=line] *)[data-state=active]:after{content:var(--tw-content);opacity:1}.data-\\[state\\=checked\\]\\:translate-x-\\[calc\\(100\\%-2px\\)\\][data-state=checked]{--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[state\\=checked\\]\\:border-primary[data-state=checked]{border-color:var(--primary)}.data-\\[state\\=checked\\]\\:bg-primary[data-state=checked]{background-color:var(--primary)}.data-\\[state\\=checked\\]\\:text-primary-foreground[data-state=checked]{color:var(--primary-foreground)}.data-\\[state\\=closed\\]\\:animate-accordion-up[data-state=closed]{animation:accordion-up var(--tw-animation-duration,var(--tw-duration,.2s))var(--tw-ease,ease-out)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.data-\\[state\\=closed\\]\\:animate-out[data-state=closed]{animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.data-\\[state\\=closed\\]\\:duration-300[data-state=closed]{--tw-duration:.3s;transition-duration:.3s}.data-\\[state\\=closed\\]\\:fade-out-0[data-state=closed]{--tw-exit-opacity:0}.data-\\[state\\=closed\\]\\:zoom-out-95[data-state=closed]{--tw-exit-scale:.95}.data-\\[state\\=closed\\]\\:slide-out-to-bottom[data-state=closed]{--tw-exit-translate-y:100%}.data-\\[state\\=closed\\]\\:slide-out-to-left[data-state=closed]{--tw-exit-translate-x:-100%}.data-\\[state\\=closed\\]\\:slide-out-to-right[data-state=closed]{--tw-exit-translate-x:100%}.data-\\[state\\=closed\\]\\:slide-out-to-top[data-state=closed]{--tw-exit-translate-y:-100%}.data-\\[state\\=error\\]\\:border-destructive\\/30[data-state=error]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.data-\\[state\\=error\\]\\:border-destructive\\/30[data-state=error]{border-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.data-\\[state\\=idle\\]\\:border-dashed[data-state=idle]{--tw-border-style:dashed;border-style:dashed}.data-\\[state\\=open\\]\\:animate-accordion-down[data-state=open]{animation:accordion-down var(--tw-animation-duration,var(--tw-duration,.2s))var(--tw-ease,ease-out)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.data-\\[state\\=open\\]\\:animate-in[data-state=open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.data-\\[state\\=open\\]\\:bg-secondary[data-state=open]{background-color:var(--secondary)}.data-\\[state\\=open\\]\\:text-accent-foreground[data-state=open]{color:var(--accent-foreground)}.data-\\[state\\=open\\]\\:text-muted-foreground[data-state=open]{color:var(--muted-foreground)}.data-\\[state\\=open\\]\\:opacity-100[data-state=open]{opacity:1}.data-\\[state\\=open\\]\\:duration-500[data-state=open]{--tw-duration:.5s;transition-duration:.5s}.data-\\[state\\=open\\]\\:fade-in-0[data-state=open]{--tw-enter-opacity:0}.data-\\[state\\=open\\]\\:zoom-in-95[data-state=open]{--tw-enter-scale:.95}.data-\\[state\\=open\\]\\:slide-in-from-bottom[data-state=open]{--tw-enter-translate-y:100%}.data-\\[state\\=open\\]\\:slide-in-from-left[data-state=open]{--tw-enter-translate-x:-100%}.data-\\[state\\=open\\]\\:slide-in-from-right[data-state=open]{--tw-enter-translate-x:100%}.data-\\[state\\=open\\]\\:slide-in-from-top[data-state=open]{--tw-enter-translate-y:-100%}.data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.data-\\[state\\=unchecked\\]\\:translate-x-0[data-state=unchecked]{--tw-translate-x:0px;translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[state\\=unchecked\\]\\:bg-input[data-state=unchecked]{background-color:var(--input)}.data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}.data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}.data-\\[variant\\=ghost\\]\\:max-w-full[data-variant=ghost]{max-width:100%}.data-\\[variant\\=label\\]\\:text-sm[data-variant=label]{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.data-\\[variant\\=legend\\]\\:text-base[data-variant=legend]{font-size:var(--text-base);line-height:var(--tw-leading,var(--text-base--line-height))}.data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.nth-last-2\\:-mt-1:nth-last-child(2){margin-top:calc(var(--spacing) * -1)}@media (min-width:40rem){.sm\\:max-w-lg{max-width:var(--container-lg)}.sm\\:max-w-sm{max-width:var(--container-sm)}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\\:flex-row{flex-direction:row}.sm\\:justify-end{justify-content:flex-end}.sm\\:gap-2\\.5{gap:calc(var(--spacing) * 2.5)}.sm\\:text-left{text-align:left}}@media (min-width:48rem){.md\\:col-span-2{grid-column:span 2/span 2}.md\\:block{display:block}.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\\:grid-cols-\\[minmax\\(16rem\\,22rem\\)_minmax\\(0\\,1fr\\)\\]{grid-template-columns:minmax(16rem,22rem) minmax(0,1fr)}.md\\:p-12{padding:calc(var(--spacing) * 12)}.md\\:text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}}@container field-group (width>=28rem){.\\@md\\/field-group\\:flex-row{flex-direction:row}.\\@md\\/field-group\\:items-center{align-items:center}.\\@md\\/field-group\\:has-\\[\\>\\[data-slot\\=field-content\\]\\]\\:items-start:has(>[data-slot=field-content]){align-items:flex-start}}.rtl\\:translate-x-1\\/2:where(:is(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi)),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.dark\\:border-input:where([data-theme=dark],[data-theme=dark] *){border-color:var(--input)}.dark\\:bg-destructive\\/60:where([data-theme=dark],[data-theme=dark] *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.dark\\:bg-destructive\\/60:where([data-theme=dark],[data-theme=dark] *){background-color:color-mix(in oklab, var(--destructive) 60%, transparent)}}.dark\\:bg-input\\/30:where([data-theme=dark],[data-theme=dark] *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.dark\\:bg-input\\/30:where([data-theme=dark],[data-theme=dark] *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.dark\\:bg-transparent:where([data-theme=dark],[data-theme=dark] *){background-color:#0000}.dark\\:text-muted-foreground:where([data-theme=dark],[data-theme=dark] *){color:var(--muted-foreground)}@media (hover:hover){.dark\\:hover\\:bg-accent\\/50:where([data-theme=dark],[data-theme=dark] *):hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.dark\\:hover\\:bg-accent\\/50:where([data-theme=dark],[data-theme=dark] *):hover{background-color:color-mix(in oklab, var(--accent) 50%, transparent)}}.dark\\:hover\\:bg-input\\/50:where([data-theme=dark],[data-theme=dark] *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.dark\\:hover\\:bg-input\\/50:where([data-theme=dark],[data-theme=dark] *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.dark\\:hover\\:text-foreground:where([data-theme=dark],[data-theme=dark] *):hover{color:var(--foreground)}}.dark\\:focus-visible\\:ring-destructive\\/40:where([data-theme=dark],[data-theme=dark] *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.dark\\:focus-visible\\:ring-destructive\\/40:where([data-theme=dark],[data-theme=dark] *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.dark\\:has-data-\\[state\\=checked\\]\\:bg-primary\\/10:where([data-theme=dark],[data-theme=dark] *):has([data-state=checked]){background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.dark\\:has-data-\\[state\\=checked\\]\\:bg-primary\\/10:where([data-theme=dark],[data-theme=dark] *):has([data-state=checked]){background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:where([data-theme=dark],[data-theme=dark] *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:where([data-theme=dark],[data-theme=dark] *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.dark\\:aria-invalid\\:ring-destructive\\/40:where([data-theme=dark],[data-theme=dark] *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.dark\\:aria-invalid\\:ring-destructive\\/40:where([data-theme=dark],[data-theme=dark] *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}:is(.dark\\:\\*\\:data-\\[slot\\=bubble-content\\]\\:bg-\\[oklch\\(from_var\\(--primary\\)_0\\.3_calc\\(c\\*0\\.4\\)_h\\)\\]:where([data-theme=dark],[data-theme=dark] *)>*)[data-slot=bubble-content]{background-color:oklch(from var(--primary) .3 calc(c * .4) h)}:is(.dark\\:\\*\\:data-\\[slot\\=bubble-content\\]\\:bg-destructive\\/20:where([data-theme=dark],[data-theme=dark] *)>*)[data-slot=bubble-content]{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.dark\\:\\*\\:data-\\[slot\\=bubble-content\\]\\:bg-destructive\\/20:where([data-theme=dark],[data-theme=dark] *)>*)[data-slot=bubble-content]{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.dark\\:data-\\[state\\=active\\]\\:border-input:where([data-theme=dark],[data-theme=dark] *)[data-state=active]{border-color:var(--input)}.dark\\:data-\\[state\\=active\\]\\:bg-input\\/30:where([data-theme=dark],[data-theme=dark] *)[data-state=active]{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.dark\\:data-\\[state\\=active\\]\\:bg-input\\/30:where([data-theme=dark],[data-theme=dark] *)[data-state=active]{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.dark\\:data-\\[state\\=active\\]\\:text-foreground:where([data-theme=dark],[data-theme=dark] *)[data-state=active]{color:var(--foreground)}.dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-\\[state\\=active\\]\\:border-transparent:where([data-theme=dark],[data-theme=dark] *):is(:where(.group\\/tabs-list)[data-variant=line] *)[data-state=active]{border-color:#0000}.dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-\\[state\\=active\\]\\:bg-transparent:where([data-theme=dark],[data-theme=dark] *):is(:where(.group\\/tabs-list)[data-variant=line] *)[data-state=active]{background-color:#0000}.dark\\:data-\\[state\\=checked\\]\\:bg-primary:where([data-theme=dark],[data-theme=dark] *)[data-state=checked]{background-color:var(--primary)}.dark\\:data-\\[state\\=checked\\]\\:bg-primary-foreground:where([data-theme=dark],[data-theme=dark] *)[data-state=checked]{background-color:var(--primary-foreground)}.dark\\:data-\\[state\\=unchecked\\]\\:bg-foreground:where([data-theme=dark],[data-theme=dark] *)[data-state=unchecked]{background-color:var(--foreground)}.dark\\:data-\\[state\\=unchecked\\]\\:bg-input\\/80:where([data-theme=dark],[data-theme=dark] *)[data-state=unchecked]{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.dark\\:data-\\[state\\=unchecked\\]\\:bg-input\\/80:where([data-theme=dark],[data-theme=dark] *)[data-state=unchecked]{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:where([data-theme=dark],[data-theme=dark] *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:where([data-theme=dark],[data-theme=dark] *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.\\[\\&_\\[cmdk-group-heading\\]\\]\\:px-2 [cmdk-group-heading]{padding-inline:calc(var(--spacing) * 2)}.\\[\\&_\\[cmdk-group-heading\\]\\]\\:py-1\\.5 [cmdk-group-heading]{padding-block:calc(var(--spacing) * 1.5)}.\\[\\&_\\[cmdk-group-heading\\]\\]\\:text-xs [cmdk-group-heading]{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.\\[\\&_\\[cmdk-group-heading\\]\\]\\:font-medium [cmdk-group-heading]{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.\\[\\&_\\[cmdk-group-heading\\]\\]\\:text-muted-foreground [cmdk-group-heading]{color:var(--muted-foreground)}.\\[\\&_\\[cmdk-group\\]\\]\\:px-2 [cmdk-group]{padding-inline:calc(var(--spacing) * 2)}.\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:pt-0 [cmdk-group]:not([hidden])~[cmdk-group]{padding-top:0}.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:h-5 [cmdk-input-wrapper] svg{height:calc(var(--spacing) * 5)}.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:w-5 [cmdk-input-wrapper] svg{width:calc(var(--spacing) * 5)}.\\[\\&_\\[cmdk-input\\]\\]\\:h-12 [cmdk-input]{height:calc(var(--spacing) * 12)}.\\[\\&_\\[cmdk-item\\]\\]\\:px-2 [cmdk-item]{padding-inline:calc(var(--spacing) * 2)}.\\[\\&_\\[cmdk-item\\]\\]\\:py-3 [cmdk-item]{padding-block:calc(var(--spacing) * 3)}.\\[\\&_\\[cmdk-item\\]_svg\\]\\:h-5 [cmdk-item] svg{height:calc(var(--spacing) * 5)}.\\[\\&_\\[cmdk-item\\]_svg\\]\\:w-5 [cmdk-item] svg{width:calc(var(--spacing) * 5)}.\\[\\&_img\\]\\:size-full img{width:100%;height:100%}.\\[\\&_img\\]\\:object-cover img{object-fit:cover}.\\[\\&_p\\]\\:leading-relaxed p{--tw-leading:var(--leading-relaxed);line-height:var(--leading-relaxed)}.\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.data-\\[direction\\=start\\]\\:\\[\\&_svg\\]\\:rotate-180[data-direction=start] svg{rotate:180deg}.\\[\\&_svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(var(--spacing) * 3);height:calc(var(--spacing) * 3)}.\\[\\&_svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(var(--spacing) * 4);height:calc(var(--spacing) * 4)}.\\[\\&_svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-6 svg:not([class*=size-]),.group-data-\\[orientation\\=vertical\\]\\/attachment\\:\\[\\&_svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-6:is(:where(.group\\/attachment)[data-orientation=vertical] *) svg:not([class*=size-]){width:calc(var(--spacing) * 6);height:calc(var(--spacing) * 6)}.group-data-\\[size\\=xs\\]\\/attachment\\:\\[\\&_svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-3\\.5:is(:where(.group\\/attachment)[data-size=xs] *) svg:not([class*=size-]){width:calc(var(--spacing) * 3.5);height:calc(var(--spacing) * 3.5)}.\\[\\&_svg\\:not\\(\\[class\\*\\=\\'text-\\'\\]\\)\\]\\:text-muted-foreground svg:not([class*=text-]){color:var(--muted-foreground)}.\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.\\[\\&\\+\\[data-slot\\=item-content\\]\\]\\:flex-none+[data-slot=item-content]{flex:none}.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-0:has([role=checkbox]){padding-right:0}.\\[\\.border-b\\]\\:pb-3.border-b{padding-bottom:calc(var(--spacing) * 3)}.\\[\\.border-b\\]\\:pb-6.border-b{padding-bottom:calc(var(--spacing) * 6)}.\\[\\.border-t\\]\\:pt-3.border-t{padding-top:calc(var(--spacing) * 3)}.\\[\\.border-t\\]\\:pt-6.border-t{padding-top:calc(var(--spacing) * 6)}.\\[a\\]\\:underline:is(a){text-decoration-line:underline}.\\[a\\]\\:underline-offset-3:is(a){text-underline-offset:3px}.\\[a\\]\\:transition-colors:is(a){transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}:is(.\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.\\[a\\]\\:hover\\:bg-accent\\/50:is(a):hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.\\[a\\]\\:hover\\:bg-accent\\/50:is(a):hover{background-color:color-mix(in oklab, var(--accent) 50%, transparent)}}.\\[a\\]\\:hover\\:text-foreground:is(a):hover,:is(.\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}.\\[button\\]\\:text-left:is(button){text-align:left}.\\[button\\,a\\]\\:transition-colors:is(button,a){transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.\\[button\\,a\\]\\:outline-none:is(button,a){--tw-outline-style:none;outline-style:none}.\\[button\\,a\\]\\:focus-visible\\:border-ring:is(button,a):focus-visible{border-color:var(--ring)}.\\[button\\,a\\]\\:focus-visible\\:ring-3:is(button,a):focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.\\[button\\,a\\]\\:focus-visible\\:ring-ring\\/50:is(button,a):focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.\\[button\\,a\\]\\:focus-visible\\:ring-ring\\/50:is(button,a):focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}:is(.\\*\\:\\[img\\]\\:aspect-square>*):is(img){aspect-ratio:1}:is(.\\*\\:\\[img\\]\\:w-full>*):is(img){width:100%}:is(.\\*\\:\\[img\\]\\:object-cover>*):is(img){object-fit:cover}:is(.\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(var(--spacing) * 2)}:is(.data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}.\\[\\&\\>\\*\\]\\:w-full>*{width:100%}.\\[\\&\\>\\*\\]\\:data-\\[slot\\=field\\]\\:p-4>[data-slot=field]{padding:calc(var(--spacing) * 4)}@container field-group (width>=28rem){.\\@md\\/field-group\\:\\[\\&\\>\\*\\]\\:w-auto>*{width:auto}}.\\[\\&\\>\\.sr-only\\]\\:w-auto>.sr-only{width:auto}.\\[\\&\\>\\[data-slot\\=bubble-content\\]\\:is\\(button\\,a\\)\\:hover\\]\\:bg-\\[color-mix\\(in_oklch\\,var\\(--muted\\)\\,var\\(--foreground\\)_5\\%\\)\\]>[data-slot=bubble-content]:is(button,a):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.\\[\\&\\>\\[data-slot\\=bubble-content\\]\\:is\\(button\\,a\\)\\:hover\\]\\:bg-\\[color-mix\\(in_oklch\\,var\\(--muted\\)\\,var\\(--foreground\\)_5\\%\\)\\]>[data-slot=bubble-content]:is(button,a):hover{background-color:color-mix(in oklch,var(--muted),var(--foreground) 5%)}}.\\[\\&\\>\\[data-slot\\=bubble-content\\]\\:is\\(button\\,a\\)\\:hover\\]\\:bg-\\[color-mix\\(in_oklch\\,var\\(--secondary\\)\\,var\\(--foreground\\)_5\\%\\)\\]>[data-slot=bubble-content]:is(button,a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.\\[\\&\\>\\[data-slot\\=bubble-content\\]\\:is\\(button\\,a\\)\\:hover\\]\\:bg-\\[color-mix\\(in_oklch\\,var\\(--secondary\\)\\,var\\(--foreground\\)_5\\%\\)\\]>[data-slot=bubble-content]:is(button,a):hover{background-color:color-mix(in oklch,var(--secondary),var(--foreground) 5%)}}.\\[\\&\\>\\[data-slot\\=bubble-content\\]\\:is\\(button\\,a\\)\\:hover\\]\\:bg-\\[oklch\\(from_var\\(--primary\\)_0\\.88_calc\\(c\\*0\\.5\\)_h\\)\\]>[data-slot=bubble-content]:is(button,a):hover{background-color:oklch(from var(--primary) .88 calc(c * .5) h)}.\\[\\&\\>\\[data-slot\\=bubble-content\\]\\:is\\(button\\,a\\)\\:hover\\]\\:bg-destructive\\/20>[data-slot=bubble-content]:is(button,a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.\\[\\&\\>\\[data-slot\\=bubble-content\\]\\:is\\(button\\,a\\)\\:hover\\]\\:bg-destructive\\/20>[data-slot=bubble-content]:is(button,a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.\\[\\&\\>\\[data-slot\\=bubble-content\\]\\:is\\(button\\,a\\)\\:hover\\]\\:bg-muted>[data-slot=bubble-content]:is(button,a):hover{background-color:var(--muted)}.\\[\\&\\>\\[data-slot\\=bubble-content\\]\\:is\\(button\\,a\\)\\:hover\\]\\:bg-primary\\/80>[data-slot=bubble-content]:is(button,a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.\\[\\&\\>\\[data-slot\\=bubble-content\\]\\:is\\(button\\,a\\)\\:hover\\]\\:bg-primary\\/80>[data-slot=bubble-content]:is(button,a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.\\[\\&\\>\\[data-slot\\=bubble-content\\]\\:is\\(button\\,a\\)\\:hover\\]\\:text-foreground>[data-slot=bubble-content]:is(button,a):hover{color:var(--foreground)}.dark\\:\\[\\&\\>\\[data-slot\\=bubble-content\\]\\:is\\(button\\,a\\)\\:hover\\]\\:bg-\\[oklch\\(from_var\\(--primary\\)_0\\.35_calc\\(c\\*0\\.5\\)_h\\)\\]:where([data-theme=dark],[data-theme=dark] *)>[data-slot=bubble-content]:is(button,a):hover{background-color:oklch(from var(--primary) .35 calc(c * .5) h)}.dark\\:\\[\\&\\>\\[data-slot\\=bubble-content\\]\\:is\\(button\\,a\\)\\:hover\\]\\:bg-destructive\\/30:where([data-theme=dark],[data-theme=dark] *)>[data-slot=bubble-content]:is(button,a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.dark\\:\\[\\&\\>\\[data-slot\\=bubble-content\\]\\:is\\(button\\,a\\)\\:hover\\]\\:bg-destructive\\/30:where([data-theme=dark],[data-theme=dark] *)>[data-slot=bubble-content]:is(button,a):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.dark\\:\\[\\&\\>\\[data-slot\\=bubble-content\\]\\:is\\(button\\,a\\)\\:hover\\]\\:bg-input\\/30:where([data-theme=dark],[data-theme=dark] *)>[data-slot=bubble-content]:is(button,a):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.dark\\:\\[\\&\\>\\[data-slot\\=bubble-content\\]\\:is\\(button\\,a\\)\\:hover\\]\\:bg-input\\/30:where([data-theme=dark],[data-theme=dark] *)>[data-slot=bubble-content]:is(button,a):hover{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.dark\\:\\[\\&\\>\\[data-slot\\=bubble-content\\]\\:is\\(button\\,a\\)\\:hover\\]\\:bg-muted\\/50:where([data-theme=dark],[data-theme=dark] *)>[data-slot=bubble-content]:is(button,a):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.dark\\:\\[\\&\\>\\[data-slot\\=bubble-content\\]\\:is\\(button\\,a\\)\\:hover\\]\\:bg-muted\\/50:where([data-theme=dark],[data-theme=dark] *)>[data-slot=bubble-content]:is(button,a):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.\\[\\&\\>\\[data-slot\\=field-group\\]\\]\\:gap-4>[data-slot=field-group]{gap:calc(var(--spacing) * 4)}.\\[\\&\\>\\[data-slot\\=field-label\\]\\]\\:flex-auto>[data-slot=field-label]{flex:auto}@container field-group (width>=28rem){.\\@md\\/field-group\\:\\[\\&\\>\\[data-slot\\=field-label\\]\\]\\:flex-auto>[data-slot=field-label]{flex:auto}}.\\[\\&\\>\\[role\\=checkbox\\]\\]\\:translate-y-\\[2px\\]>[role=checkbox]{--tw-translate-y:2px;translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.has-\\[\\>\\[data-slot\\=field-content\\]\\]\\:\\[\\&\\>\\[role\\=checkbox\\]\\,\\[role\\=radio\\]\\]\\:mt-px:has(>[data-slot=field-content])>[role=checkbox],.has-\\[\\>\\[data-slot\\=field-content\\]\\]\\:\\[\\&\\>\\[role\\=checkbox\\]\\,\\[role\\=radio\\]\\]\\:mt-px:has(>[data-slot=field-content]) [role=radio]){margin-top:1px}@container field-group (width>=28rem){:is(.\\@md\\/field-group\\:has-\\[\\>\\[data-slot\\=field-content\\]\\]\\:\\[\\&\\>\\[role\\=checkbox\\]\\,\\[role\\=radio\\]\\]\\:mt-px:has(>[data-slot=field-content])>[role=checkbox],.\\@md\\/field-group\\:has-\\[\\>\\[data-slot\\=field-content\\]\\]\\:\\[\\&\\>\\[role\\=checkbox\\]\\,\\[role\\=radio\\]\\]\\:mt-px:has(>[data-slot=field-content]) [role=radio]){margin-top:1px}}.\\[\\&\\>a\\]\\:underline>a{text-decoration-line:underline}.\\[\\&\\>a\\]\\:underline-offset-4>a{text-underline-offset:4px}.\\[\\&\\>a\\:hover\\]\\:text-primary>a:hover{color:var(--primary)}.has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(var(--spacing) * 3)}.has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(var(--spacing) * 3)}.has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pr-2:has(>[data-align=inline-end])>input{padding-right:calc(var(--spacing) * 2)}.has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:pl-2:has(>[data-align=inline-start])>input{padding-left:calc(var(--spacing) * 2)}.\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.\\[\\&\\>svg\\]\\:size-3>svg{width:calc(var(--spacing) * 3);height:calc(var(--spacing) * 3)}.\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(var(--spacing) * 3.5);height:calc(var(--spacing) * 3.5)}.\\[\\&\\>svg\\]\\:size-4>svg{width:calc(var(--spacing) * 4);height:calc(var(--spacing) * 4)}.\\[\\&\\>svg\\]\\:translate-y-0\\.5>svg{--tw-translate-y:calc(var(--spacing) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}.\\[\\&\\>svg\\]\\:text-current>svg{color:currentColor}.group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(var(--spacing) * 5);height:calc(var(--spacing) * 5)}.group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(var(--spacing) * 3);height:calc(var(--spacing) * 3)}.group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.group\\/avatar)[data-size=default] *)>svg,.group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.group\\/avatar)[data-size=lg] *)>svg{width:calc(var(--spacing) * 2);height:calc(var(--spacing) * 2)}.group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.group\\/avatar)[data-size=sm] *)>svg{display:none}.\\[\\&\\>svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(var(--spacing) * 3.5);height:calc(var(--spacing) * 3.5)}.\\[\\&\\>svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(var(--spacing) * 4);height:calc(var(--spacing) * 4)}.\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.\\[\\&\\[data-state\\=open\\]\\>svg\\]\\:rotate-180[data-state=open]>svg{rotate:180deg}[data-slot=tooltip-content] .\\[\\[data-slot\\=tooltip-content\\]_\\&\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){[data-slot=tooltip-content] .\\[\\[data-slot\\=tooltip-content\\]_\\&\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}[data-slot=tooltip-content] .\\[\\[data-slot\\=tooltip-content\\]_\\&\\]\\:text-background{color:var(--background)}[data-slot=tooltip-content] .dark\\:\\[\\[data-slot\\=tooltip-content\\]_\\&\\]\\:bg-background\\/10:where([data-theme=dark],[data-theme=dark] *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){[data-slot=tooltip-content] .dark\\:\\[\\[data-slot\\=tooltip-content\\]_\\&\\]\\:bg-background\\/10:where([data-theme=dark],[data-theme=dark] *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}[data-variant=legend]+.\\[\\[data-variant\\=legend\\]\\+\\&\\]\\:-mt-1\\.5{margin-top:calc(var(--spacing) * -1.5)}@media (hover:hover){a.\\[a\\&\\]\\:hover\\:bg-accent:hover{background-color:var(--accent)}a.\\[a\\&\\]\\:hover\\:bg-destructive\\/90:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){a.\\[a\\&\\]\\:hover\\:bg-destructive\\/90:hover{background-color:color-mix(in oklab, var(--destructive) 90%, transparent)}}a.\\[a\\&\\]\\:hover\\:bg-primary\\/90:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){a.\\[a\\&\\]\\:hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab, var(--primary) 90%, transparent)}}a.\\[a\\&\\]\\:hover\\:bg-secondary\\/90:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){a.\\[a\\&\\]\\:hover\\:bg-secondary\\/90:hover{background-color:color-mix(in oklab, var(--secondary) 90%, transparent)}}a.\\[a\\&\\]\\:hover\\:text-accent-foreground:hover{color:var(--accent-foreground)}a.\\[a\\&\\]\\:hover\\:underline:hover{text-decoration-line:underline}}}@property --tw-animation-delay{syntax:\"*\";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:\"*\";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:\"*\";inherits:false}@property --tw-animation-fill-mode{syntax:\"*\";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:\"*\";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:\"*\";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:\"*\";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:\"*\";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:\"*\";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:\"*\";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:\"*\";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:\"*\";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:\"*\";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:\"*\";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:\"*\";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:\"*\";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:\"*\";inherits:false;initial-value:0}html[dir=ltr],[data-sonner-toaster][dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}html[dir=rtl],[data-sonner-toaster][dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{width:var(--width);--gray1:#fcfcfc;--gray2:#f8f8f8;--gray3:#f3f3f3;--gray4:#ededed;--gray5:#e8e8e8;--gray6:#e2e2e2;--gray7:#dbdbdb;--gray8:#c7c7c7;--gray9:#8f8f8f;--gray10:#858585;--gray11:#6f6f6f;--gray12:#171717;--border-radius:8px;box-sizing:border-box;z-index:999999999;outline:none;margin:0;padding:0;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;list-style:none;transition:transform .4s;position:fixed}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translate(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);opacity:0;transform:var(--y);touch-action:none;box-sizing:border-box;overflow-wrap:anywhere;outline:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;position:absolute}[data-sonner-toast][data-styled=true]{background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);width:var(--width);align-items:center;gap:6px;padding:16px;font-size:13px;display:flex;box-shadow:0 4px 12px #0000001a}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}[data-sonner-toast][data-y-position=top]{--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap));top:0}[data-sonner-toast][data-y-position=bottom]{--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap));bottom:0}[data-sonner-toast][data-styled=true] [data-description]{color:#3f3f3f;font-weight:400;line-height:1.4}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{color:inherit;font-weight:500;line-height:1.5}[data-sonner-toast][data-styled=true] [data-icon]{width:16px;height:16px;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end);flex-shrink:0;justify-content:flex-start;align-items:center;display:flex;position:relative}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform-origin:50%;animation:.3s forwards sonner-fade-in;transform:scale(.8)}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{flex-direction:column;gap:2px;display:flex}[data-sonner-toast][data-styled=true] [data-button]{height:24px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);cursor:pointer;border:none;border-radius:4px;outline:none;flex-shrink:0;align-items:center;padding-left:8px;padding-right:8px;font-size:12px;font-weight:500;transition:opacity .4s,box-shadow .2s;display:flex}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px #0006}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:#00000014}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:#ffffff4d}[data-sonner-toast][data-styled=true] [data-close-button]{left:var(--toast-close-button-start);right:var(--toast-close-button-end);width:20px;height:20px;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);cursor:pointer;z-index:1;border-radius:50%;justify-content:center;align-items:center;padding:0;transition:opacity .1s,background .2s,border-color .2s;display:flex;position:absolute;top:0}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]:before{content:\"\";z-index:-1;height:100%;position:absolute;left:-100%;right:-100%}[data-sonner-toast][data-y-position=top][data-swiping=true]:before{bottom:50%;transform:scaleY(3)translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]:before{top:50%;transform:scaleY(3)translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]:before{content:\"\";position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]:after{content:\"\";height:calc(var(--gap) + 1px);width:100%;position:absolute;bottom:100%;left:0}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * .05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]:before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0px)) translateX(var(--swipe-amount-x,0px));transition:none}[data-sonner-toast][data-swiped=true]{-webkit-user-select:none;user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{0%{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{0%{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%;position:fixed}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{width:calc(100% - var(--mobile-offset-left) * 2);left:0;right:0}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:#ecfdf3;--success-border:#bffcd9;--success-text:#008a2e;--info-bg:#f0f8ff;--info-border:#dde7fd;--info-text:#0973dc;--warning-bg:#fffcf0;--warning-border:#fbeeb1;--warning-text:#dc7609;--error-bg:#fff0f0;--error-border:#ffe0e1;--error-text:#e60000}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:#333;--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:#1f1f1f;--normal-border:#333;--normal-border-hover:#404040;--normal-text:var(--gray1);--success-bg:#001f0f;--success-border:#003d1c;--success-text:#59f3a6;--info-bg:#000d1f;--info-border:#19233e;--info-text:#5896f3;--warning-bg:#1d1f00;--warning-border:#2e2e00;--warning-text:#f3cf58;--error-bg:#2d0607;--error-border:#4d0408;--error-text:#ff9ea1}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);z-index:10;position:absolute;inset:0}.sonner-loading-wrapper[data-visible=false]{transform-origin:50%;animation:.2s forwards sonner-fade-out}.sonner-spinner{height:var(--size);width:var(--size);position:relative;top:50%;left:50%}.sonner-loading-bar{background:var(--gray11);border-radius:6px;width:24%;height:8%;animation:1.2s linear infinite sonner-spin;position:absolute;top:-3.9%;left:-10%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg)translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg)translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg)translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg)translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg)translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg)translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg)translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg)translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg)translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg)translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg)translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg)translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{transform-origin:50%;transition:opacity .2s,transform .2s;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8)translate(-50%,-50%)}:host{--lightningcss-light:initial;--lightningcss-dark: ;color-scheme:light dark;--background:var(--typo3-surface-container-low,var(--lightningcss-light,#f7f7f8)var(--lightningcss-dark,#16181c));--foreground:var(--typo3-text-color-base,var(--lightningcss-light,#1a1a1a)var(--lightningcss-dark,#e8e9ea));--card:var(--typo3-surface-container-lowest,var(--lightningcss-light,#fff)var(--lightningcss-dark,#101216));--card-foreground:var(--foreground);--popover:var(--typo3-surface-container-lowest,var(--lightningcss-light,#fff)var(--lightningcss-dark,#101216));--popover-foreground:var(--foreground);--muted:var(--typo3-surface-container-base,var(--lightningcss-light,#eeeef0)var(--lightningcss-dark,#1d2026));--muted-foreground:var(--foreground)}@media (prefers-color-scheme:dark){:host{--lightningcss-light: ;--lightningcss-dark:initial}}@supports (color:color-mix(in lab, red, red)){:host{--muted-foreground:color-mix(in srgb, var(--foreground), transparent 38%)}}:host{--accent:var(--typo3-surface-container-high,var(--lightningcss-light,#e4e5e8)var(--lightningcss-dark,#23262d));--accent-foreground:var(--foreground);--secondary:var(--typo3-surface-container-high,var(--lightningcss-light,#e4e5e8)var(--lightningcss-dark,#23262d));--secondary-foreground:var(--foreground);--primary:var(--typo3-state-primary-bg,var(--lightningcss-light,#0a7bd1)var(--lightningcss-dark,#1f8ad9));--primary-foreground:var(--typo3-state-primary-color,#fff);--destructive:var(--typo3-surface-danger,var(--lightningcss-light,#c83c3c)var(--lightningcss-dark,#a52f2f));--destructive-foreground:var(--typo3-surface-danger-text,#fff);--warning:var(--typo3-surface-warning,var(--lightningcss-light,#e8a33d)var(--lightningcss-dark,#7a5518));--warning-foreground:var(--typo3-surface-warning-text,var(--lightningcss-light,#3a2a08)var(--lightningcss-dark,#fff));--success:var(--typo3-surface-success,var(--lightningcss-light,#3a8f4f)var(--lightningcss-dark,#2c6d3c));--success-foreground:var(--typo3-surface-success-text,#fff);--info:var(--typo3-surface-info,var(--lightningcss-light,#2f7fc1)var(--lightningcss-dark,#275f8d));--info-foreground:var(--typo3-surface-info-text,#fff);--border:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:host{--border:color-mix(in srgb, var(--foreground), transparent 86%)}}:host{--border-strong:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:host{--border-strong:color-mix(in srgb, var(--foreground), transparent 74%)}}:host{--input:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:host{--input:color-mix(in srgb, var(--foreground), transparent 80%)}}:host{--ring:var(--typo3-state-primary-focus-border-color,var(--lightningcss-light,#0967ae)var(--lightningcss-dark,#56b1f0));--radius:.5rem;--font-ui:var(--typo3-font-family-sans-serif,-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Arial, sans-serif);--font-code:var(--typo3-font-family-monospace,SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", monospace);--text-chrome:.75rem;--text-read:.84375rem;--z-panel:40;--rail-min:320px;--rail-max:480px;display:block}@keyframes sui-shimmer{0%{background-position:100% 0}to{background-position:0 0}}@keyframes sui-enter{0%{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){.shimmer{-webkit-text-fill-color:currentColor;color:var(--muted-foreground);background-image:none;animation:none}.sui-root,.sui-root *,.sui-root :before,.sui-root :after{scroll-behavior:auto!important;transition-duration:.001ms!important;animation-duration:.001ms!important;animation-iteration-count:1!important}}@property --tw-translate-x{syntax:\"*\";inherits:false;initial-value:0}@property --tw-translate-y{syntax:\"*\";inherits:false;initial-value:0}@property --tw-translate-z{syntax:\"*\";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:\"*\";inherits:false}@property --tw-rotate-y{syntax:\"*\";inherits:false}@property --tw-rotate-z{syntax:\"*\";inherits:false}@property --tw-skew-x{syntax:\"*\";inherits:false}@property --tw-skew-y{syntax:\"*\";inherits:false}@property --tw-scroll-snap-strictness{syntax:\"*\";inherits:false;initial-value:proximity}@property --tw-space-y-reverse{syntax:\"*\";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:\"*\";inherits:false;initial-value:0}@property --tw-divide-y-reverse{syntax:\"*\";inherits:false;initial-value:0}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-leading{syntax:\"*\";inherits:false}@property --tw-font-weight{syntax:\"*\";inherits:false}@property --tw-tracking{syntax:\"*\";inherits:false}@property --tw-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:\"*\";inherits:false}@property --tw-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:\"*\";inherits:false}@property --tw-inset-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:\"*\";inherits:false}@property --tw-ring-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:\"*\";inherits:false}@property --tw-inset-ring-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:\"*\";inherits:false}@property --tw-ring-offset-width{syntax:\"<length>\";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:\"*\";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-blur{syntax:\"*\";inherits:false}@property --tw-brightness{syntax:\"*\";inherits:false}@property --tw-contrast{syntax:\"*\";inherits:false}@property --tw-grayscale{syntax:\"*\";inherits:false}@property --tw-hue-rotate{syntax:\"*\";inherits:false}@property --tw-invert{syntax:\"*\";inherits:false}@property --tw-opacity{syntax:\"*\";inherits:false}@property --tw-saturate{syntax:\"*\";inherits:false}@property --tw-sepia{syntax:\"*\";inherits:false}@property --tw-drop-shadow{syntax:\"*\";inherits:false}@property --tw-drop-shadow-color{syntax:\"*\";inherits:false}@property --tw-drop-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:\"*\";inherits:false}@property --tw-duration{syntax:\"*\";inherits:false}@property --tw-ease{syntax:\"*\";inherits:false}@property --tw-content{syntax:\"*\";inherits:false;initial-value:\"\"}@property --tw-scale-x{syntax:\"*\";inherits:false;initial-value:1}@property --tw-scale-y{syntax:\"*\";inherits:false;initial-value:1}@property --tw-scale-z{syntax:\"*\";inherits:false;initial-value:1}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}@keyframes accordion-down{0%{height:0}to{height:var(--radix-accordion-content-height,var(--bits-accordion-content-height,var(--reka-accordion-content-height,var(--kb-accordion-content-height,var(--ngp-accordion-content-height,auto)))))}}@keyframes accordion-up{0%{height:var(--radix-accordion-content-height,var(--bits-accordion-content-height,var(--reka-accordion-content-height,var(--kb-accordion-content-height,var(--ngp-accordion-content-height,auto)))))}to{height:0}}"), sR = null;
function cR() {
	if (sR !== null) return sR;
	try {
		let e = new CSSStyleSheet();
		return e.replaceSync(oR), sR = e, sR;
	} catch {
		return null;
	}
}
var lR = "shadcn-ui:chat-closed", uR = class extends HTMLElement {
	static tagName = "shadcn-ui-shell";
	static get observedAttributes() {
		return [
			"layout",
			"variant",
			"app",
			"props-id",
			"open"
		];
	}
	root = null;
	mount = null;
	portal = null;
	stopObservingTheme = null;
	scheme = "auto";
	connectedCallback() {
		if (this.shadowRoot === null) {
			let e = this.attachShadow({ mode: "open" }), t = cR();
			if (t === null) {
				let t = document.createElement("style");
				t.textContent = oR, e.appendChild(t);
			} else e.adoptedStyleSheets = [t];
			this.mount = document.createElement("div"), this.mount.className = "contents", e.appendChild(this.mount), this.portal = document.createElement("div"), this.portal.className = "sui-root", this.portal.dataset.slot = "portal", e.appendChild(this.portal);
		}
		this.stopObservingTheme = uC(this, (e) => {
			this.scheme = e, this.render();
		}), this.sizeToViewport();
	}
	disconnectedCallback() {
		this.stopObservingTheme?.(), this.stopObservingTheme = null, window.removeEventListener("resize", this.sizeToViewport);
		let e = this.root;
		this.root = null, queueMicrotask(() => e?.unmount());
	}
	attributeChangedCallback() {
		this.isConnected && this.render();
	}
	get theme() {
		return lC(this.scheme, this.ownerDocument.defaultView ?? window);
	}
	get variant() {
		return this.getAttribute("variant") === "panel" ? "panel" : "layout";
	}
	get layout() {
		return this.getAttribute("layout") === "full" ? "full" : "chat-left";
	}
	readProps() {
		let e = this.getAttribute("props-id");
		if (e === null || e === "") return {};
		let t = this.ownerDocument.getElementById(e);
		if (t === null) return console.warn(`[shadcn_ui] No <script id="${e}"> with the app's props was found.`), {};
		try {
			let e = JSON.parse(t.textContent ?? "{}");
			return typeof e == "object" && e && !Array.isArray(e) ? e : {};
		} catch (t) {
			return console.warn(`[shadcn_ui] The props in <script id="${e}"> are not valid JSON.`, t), {};
		}
	}
	sizeToViewport = () => {
		if (this.variant === "panel") {
			this.style.display = "contents", this.style.removeProperty("height");
			return;
		}
		window.removeEventListener("resize", this.sizeToViewport), window.addEventListener("resize", this.sizeToViewport), this.style.display = "block";
		let e = Math.max(0, Math.round(this.getBoundingClientRect().top));
		this.style.height = `calc(100dvh - ${e}px - var(--sui-shell-bottom-gap, 0px))`;
	};
	applyScheme() {
		let e = this.theme;
		for (let t of [
			this,
			this.mount,
			this.portal
		]) t !== null && (t.style.colorScheme = cC(this.scheme), t.dataset.theme = e);
	}
	render() {
		if (this.mount !== null) {
			if (this.applyScheme(), this.root ??= (0, aC.createRoot)(this.mount), this.variant === "panel" && !this.hasAttribute("open")) {
				this.root.render(null);
				return;
			}
			this.root.render(/* @__PURE__ */ (0, R.jsx)(_.StrictMode, { children: /* @__PURE__ */ (0, R.jsx)(nR, {
				appName: this.getAttribute("app") ?? "",
				appProps: this.readProps(),
				initialConversation: Number.parseInt(this.dataset.conversation ?? "", 10) || 0,
				layout: this.layout,
				onClose: () => this.close(),
				portal: this.portal,
				root: this.shadowRoot,
				theme: this.theme,
				variant: this.variant
			}) }));
		}
	}
	close() {
		this.hasAttribute("open") && (this.removeAttribute("open"), this.dispatchEvent(new CustomEvent(lR, {
			bubbles: !0,
			composed: !0
		})));
	}
};
function dR() {
	customElements.get(uR.tagName) === void 0 && customElements.define(uR.tagName, uR);
}
//#endregion
//#region Build/Frontend/src/components/ui/accordion.tsx
function fR({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(Za, {
		"data-slot": "accordion",
		...e
	});
}
function pR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(Qa, {
		"data-slot": "accordion-item",
		className: H("border-b last:border-b-0", e),
		...t
	});
}
function mR({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, R.jsx)($a, {
		className: "flex",
		children: /* @__PURE__ */ (0, R.jsxs)(eo, {
			"data-slot": "accordion-trigger",
			className: H("flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180", e),
			...n,
			children: [t, /* @__PURE__ */ (0, R.jsx)(ne, { className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" })]
		})
	});
}
function hR({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, R.jsx)(to, {
		"data-slot": "accordion-content",
		className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
		...n,
		children: /* @__PURE__ */ (0, R.jsx)("div", {
			className: H("pt-0 pb-4", e),
			children: t
		})
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/alert.tsx
var gR = Yt("relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current", {
	variants: { variant: {
		default: "bg-card text-card-foreground",
		destructive: "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 [&>svg]:text-current"
	} },
	defaultVariants: { variant: "default" }
});
function _R({ className: e, variant: t, ...n }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "alert",
		role: "alert",
		className: H(gR({ variant: t }), e),
		...n
	});
}
function vR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "alert-title",
		className: H("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", e),
		...t
	});
}
function yR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "alert-description",
		className: H("col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/avatar.tsx
function bR({ className: e, size: t = "default", ...n }) {
	return /* @__PURE__ */ (0, R.jsx)(qc, {
		"data-slot": "avatar",
		"data-size": t,
		className: H("group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6", e),
		...n
	});
}
function xR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(Yc, {
		"data-slot": "avatar-image",
		className: H("aspect-square size-full", e),
		...t
	});
}
function SR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(Zc, {
		"data-slot": "avatar-fallback",
		className: H("flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs", e),
		...t
	});
}
function CR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("span", {
		"data-slot": "avatar-badge",
		className: H("absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background select-none", "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden", "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2", "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2", e),
		...t
	});
}
function wR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "avatar-group",
		className: H("group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background", e),
		...t
	});
}
function TR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "avatar-group-count",
		className: H("relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/breadcrumb.tsx
function ER({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)("nav", {
		"aria-label": "breadcrumb",
		"data-slot": "breadcrumb",
		...e
	});
}
function DR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("ol", {
		"data-slot": "breadcrumb-list",
		className: H("flex flex-wrap items-center gap-1.5 text-sm break-words text-muted-foreground sm:gap-2.5", e),
		...t
	});
}
function OR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("li", {
		"data-slot": "breadcrumb-item",
		className: H("inline-flex items-center gap-1.5", e),
		...t
	});
}
function kR({ asChild: e, className: t, ...n }) {
	let r = e ? Pr : "a";
	return /* @__PURE__ */ (0, R.jsx)(r, {
		"data-slot": "breadcrumb-link",
		className: H("transition-colors hover:text-foreground", t),
		...n
	});
}
function AR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("span", {
		"data-slot": "breadcrumb-page",
		role: "link",
		"aria-disabled": "true",
		"aria-current": "page",
		className: H("font-normal text-foreground", e),
		...t
	});
}
function jR({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ (0, R.jsx)("li", {
		"data-slot": "breadcrumb-separator",
		role: "presentation",
		"aria-hidden": "true",
		className: H("[&>svg]:size-3.5", t),
		...n,
		children: e ?? /* @__PURE__ */ (0, R.jsx)(L, {})
	});
}
function MR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsxs)("span", {
		"data-slot": "breadcrumb-ellipsis",
		role: "presentation",
		"aria-hidden": "true",
		className: H("flex size-9 items-center justify-center", e),
		...t,
		children: [/* @__PURE__ */ (0, R.jsx)(Te, { className: "size-4" }), /* @__PURE__ */ (0, R.jsx)("span", {
			className: "sr-only",
			children: "More"
		})]
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/card.tsx
function NR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "card",
		className: H("flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm", e),
		...t
	});
}
function PR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "card-header",
		className: H("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", e),
		...t
	});
}
function FR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "card-title",
		className: H("leading-none font-semibold", e),
		...t
	});
}
function IR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "card-description",
		className: H("text-sm text-muted-foreground", e),
		...t
	});
}
function LR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "card-action",
		className: H("col-start-2 row-span-2 row-start-1 self-start justify-self-end", e),
		...t
	});
}
function RR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "card-content",
		className: H("px-6", e),
		...t
	});
}
function zR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "card-footer",
		className: H("flex items-center px-6 [.border-t]:pt-6", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/field.tsx
function BR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("fieldset", {
		"data-slot": "field-set",
		className: H("flex flex-col gap-6", "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3", e),
		...t
	});
}
function VR({ className: e, variant: t = "legend", ...n }) {
	return /* @__PURE__ */ (0, R.jsx)("legend", {
		"data-slot": "field-legend",
		"data-variant": t,
		className: H("mb-3 font-medium", "data-[variant=legend]:text-base", "data-[variant=label]:text-sm", e),
		...n
	});
}
function HR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "field-group",
		className: H("group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4", e),
		...t
	});
}
var UR = Yt("group/field flex w-full gap-3 data-[invalid=true]:text-destructive", {
	variants: { orientation: {
		vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
		horizontal: [
			"flex-row items-center",
			"[&>[data-slot=field-label]]:flex-auto",
			"has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
		],
		responsive: [
			"flex-col @md/field-group:flex-row @md/field-group:items-center [&>*]:w-full @md/field-group:[&>*]:w-auto [&>.sr-only]:w-auto",
			"@md/field-group:[&>[data-slot=field-label]]:flex-auto",
			"@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
		]
	} },
	defaultVariants: { orientation: "vertical" }
});
function WR({ className: e, orientation: t = "vertical", ...n }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		role: "group",
		"data-slot": "field",
		"data-orientation": t,
		className: H(UR({ orientation: t }), e),
		...n
	});
}
function GR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "field-content",
		className: H("group/field-content flex flex-1 flex-col gap-1.5 leading-snug", e),
		...t
	});
}
function KR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(tC, {
		"data-slot": "field-label",
		className: H("group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50", "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4", "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10", e),
		...t
	});
}
function qR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "field-label",
		className: H("flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50", e),
		...t
	});
}
function JR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("p", {
		"data-slot": "field-description",
		className: H("text-sm leading-normal font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance", "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5", "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary", e),
		...t
	});
}
function YR({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ (0, R.jsxs)("div", {
		"data-slot": "field-separator",
		"data-content": !!e,
		className: H("relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2", t),
		...n,
		children: [/* @__PURE__ */ (0, R.jsx)(My, { className: "absolute inset-0 top-1/2" }), e && /* @__PURE__ */ (0, R.jsx)("span", {
			className: "relative mx-auto block w-fit bg-background px-2 text-muted-foreground",
			"data-slot": "field-separator-content",
			children: e
		})]
	});
}
function XR({ className: e, children: t, errors: n, ...r }) {
	let i = (0, _.useMemo)(() => {
		if (t) return t;
		if (!n?.length) return null;
		let e = [...new Map(n.map((e) => [e?.message, e])).values()];
		return e.length === 1 ? e[0]?.message : /* @__PURE__ */ (0, R.jsx)("ul", {
			className: "ml-4 flex list-disc flex-col gap-1",
			children: e.map((e, t) => e?.message && /* @__PURE__ */ (0, R.jsx)("li", { children: e.message }, t))
		});
	}, [t, n]);
	return i ? /* @__PURE__ */ (0, R.jsx)("div", {
		role: "alert",
		"data-slot": "field-error",
		className: H("text-sm font-normal text-destructive", e),
		...r,
		children: i
	}) : null;
}
//#endregion
//#region Build/Frontend/src/components/ui/item.tsx
function ZR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		role: "list",
		"data-slot": "item-group",
		className: H("group/item-group flex flex-col", e),
		...t
	});
}
function QR({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(My, {
		"data-slot": "item-separator",
		orientation: "horizontal",
		className: H("my-0", e),
		...t
	});
}
var $R = Yt("group/item flex flex-wrap items-center rounded-md border border-transparent text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-accent/50", {
	variants: {
		variant: {
			default: "bg-transparent",
			outline: "border-border",
			muted: "bg-muted/50"
		},
		size: {
			default: "gap-4 p-4",
			sm: "gap-2.5 px-4 py-3"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function ez({ className: e, variant: t = "default", size: n = "default", asChild: r = !1, ...i }) {
	let a = r ? Pr : "div";
	return /* @__PURE__ */ (0, R.jsx)(a, {
		"data-slot": "item",
		"data-variant": t,
		"data-size": n,
		className: H($R({
			variant: t,
			size: n,
			className: e
		})),
		...i
	});
}
var tz = Yt("flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none", {
	variants: { variant: {
		default: "bg-transparent",
		icon: "size-8 rounded-sm border bg-muted [&_svg:not([class*='size-'])]:size-4",
		image: "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover"
	} },
	defaultVariants: { variant: "default" }
});
function nz({ className: e, variant: t = "default", ...n }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "item-media",
		"data-variant": t,
		className: H(tz({
			variant: t,
			className: e
		})),
		...n
	});
}
function rz({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "item-content",
		className: H("flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none", e),
		...t
	});
}
function iz({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "item-title",
		className: H("flex w-fit items-center gap-2 text-sm leading-snug font-medium", e),
		...t
	});
}
function az({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("p", {
		"data-slot": "item-description",
		className: H("line-clamp-2 text-sm leading-normal font-normal text-balance text-muted-foreground", "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary", e),
		...t
	});
}
function oz({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "item-actions",
		className: H("flex items-center gap-2", e),
		...t
	});
}
function sz({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "item-header",
		className: H("flex basis-full items-center justify-between gap-2", e),
		...t
	});
}
function cz({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "item-footer",
		className: H("flex basis-full items-center justify-between gap-2", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/progress.tsx
function lz({ className: e, value: t, ...n }) {
	return /* @__PURE__ */ (0, R.jsx)($h, {
		"data-slot": "progress",
		className: H("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", e),
		...n,
		children: /* @__PURE__ */ (0, R.jsx)(eg, {
			"data-slot": "progress-indicator",
			className: "h-full w-full flex-1 bg-primary transition-all",
			style: { transform: `translateX(-${100 - (t || 0)}%)` }
		})
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/select.tsx
function uz({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(r_, {
		"data-slot": "select",
		...e
	});
}
function dz({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(O_, {
		"data-slot": "select-group",
		...e
	});
}
function fz({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(s_, {
		"data-slot": "select-value",
		...e
	});
}
function pz({ className: e, size: t = "default", children: n, ...r }) {
	return /* @__PURE__ */ (0, R.jsxs)(a_, {
		"data-slot": "select-trigger",
		"data-size": t,
		className: H("flex w-fit items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground", e),
		...r,
		children: [n, /* @__PURE__ */ (0, R.jsx)(c_, {
			asChild: !0,
			children: /* @__PURE__ */ (0, R.jsx)(ne, { className: "size-4 opacity-50" })
		})]
	});
}
function mz({ className: e, children: t, position: n = "item-aligned", align: r = "center", ...i }) {
	let a = lb();
	return /* @__PURE__ */ (0, R.jsx)(d_, {
		container: a,
		children: /* @__PURE__ */ (0, R.jsxs)(p_, {
			"data-slot": "select-content",
			className: H("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", e),
			position: n,
			align: r,
			...i,
			children: [
				/* @__PURE__ */ (0, R.jsx)(vz, {}),
				/* @__PURE__ */ (0, R.jsx)(T_, {
					className: H("p-1", n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
					children: t
				}),
				/* @__PURE__ */ (0, R.jsx)(yz, {})
			]
		})
	});
}
function hz({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(A_, {
		"data-slot": "select-label",
		className: H("px-2 py-1.5 text-xs text-muted-foreground", e),
		...t
	});
}
function gz({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, R.jsxs)(P_, {
		"data-slot": "select-item",
		className: H("relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", e),
		...n,
		children: [/* @__PURE__ */ (0, R.jsx)("span", {
			"data-slot": "select-item-indicator",
			className: "absolute right-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ (0, R.jsx)(R_, { children: /* @__PURE__ */ (0, R.jsx)(ee, { className: "size-4" }) })
		}), /* @__PURE__ */ (0, R.jsx)(I_, { children: t })]
	});
}
function _z({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(W_, {
		"data-slot": "select-separator",
		className: H("pointer-events-none -mx-1 my-1 h-px bg-border", e),
		...t
	});
}
function vz({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(B_, {
		"data-slot": "select-scroll-up-button",
		className: H("flex cursor-default items-center justify-center py-1", e),
		...t,
		children: /* @__PURE__ */ (0, R.jsx)(ae, { className: "size-4" })
	});
}
function yz({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(H_, {
		"data-slot": "select-scroll-down-button",
		className: H("flex cursor-default items-center justify-center py-1", e),
		...t,
		children: /* @__PURE__ */ (0, R.jsx)(ne, { className: "size-4" })
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/sheet.tsx
function bz({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(gc, {
		"data-slot": "sheet",
		...e
	});
}
function xz({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(vc, {
		"data-slot": "sheet-trigger",
		...e
	});
}
function Sz({ ...e }) {
	return /* @__PURE__ */ (0, R.jsx)(Lc, {
		"data-slot": "sheet-close",
		...e
	});
}
function Cz({ container: e, ...t }) {
	let n = lb();
	return /* @__PURE__ */ (0, R.jsx)(Sc, {
		"data-slot": "sheet-portal",
		container: e ?? n,
		...t
	});
}
function wz({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(wc, {
		"data-slot": "sheet-overlay",
		className: H("fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", e),
		...t
	});
}
function Tz({ className: e, children: t, side: n = "right", showCloseButton: r = !0, ...i }) {
	return /* @__PURE__ */ (0, R.jsxs)(Cz, { children: [/* @__PURE__ */ (0, R.jsx)(wz, {}), /* @__PURE__ */ (0, R.jsxs)(Oc, {
		"data-slot": "sheet-content",
		className: H("fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500", n === "right" && "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm", n === "left" && "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm", n === "top" && "inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top", n === "bottom" && "inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom", e),
		...i,
		children: [t, r && /* @__PURE__ */ (0, R.jsxs)(Lc, {
			className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary",
			children: [/* @__PURE__ */ (0, R.jsx)(Ut, { className: "size-4" }), /* @__PURE__ */ (0, R.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function Ez({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "sheet-header",
		className: H("flex flex-col gap-1.5 p-4", e),
		...t
	});
}
function Dz({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "sheet-footer",
		className: H("mt-auto flex flex-col gap-2 p-4", e),
		...t
	});
}
function Oz({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(Nc, {
		"data-slot": "sheet-title",
		className: H("font-semibold text-foreground", e),
		...t
	});
}
function kz({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)(Fc, {
		"data-slot": "sheet-description",
		className: H("text-sm text-muted-foreground", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/switch.tsx
function Az({ className: e, size: t = "default", ...n }) {
	return /* @__PURE__ */ (0, R.jsx)(hv, {
		"data-slot": "switch",
		"data-size": t,
		className: H("peer group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80", e),
		...n,
		children: /* @__PURE__ */ (0, R.jsx)(_v, {
			"data-slot": "switch-thumb",
			className: H("pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground")
		})
	});
}
//#endregion
//#region Build/Frontend/src/components/ui/table.tsx
function jz({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("div", {
		"data-slot": "table-container",
		className: "relative w-full overflow-x-auto",
		children: /* @__PURE__ */ (0, R.jsx)("table", {
			"data-slot": "table",
			className: H("w-full caption-bottom text-sm", e),
			...t
		})
	});
}
function Mz({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("thead", {
		"data-slot": "table-header",
		className: H("[&_tr]:border-b", e),
		...t
	});
}
function Nz({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("tbody", {
		"data-slot": "table-body",
		className: H("[&_tr:last-child]:border-0", e),
		...t
	});
}
function Pz({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("tfoot", {
		"data-slot": "table-footer",
		className: H("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", e),
		...t
	});
}
function Fz({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("tr", {
		"data-slot": "table-row",
		className: H("border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted", e),
		...t
	});
}
function Iz({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("th", {
		"data-slot": "table-head",
		className: H("h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", e),
		...t
	});
}
function Lz({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("td", {
		"data-slot": "table-cell",
		className: H("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", e),
		...t
	});
}
function Rz({ className: e, ...t }) {
	return /* @__PURE__ */ (0, R.jsx)("caption", {
		"data-slot": "table-caption",
		className: H("mt-4 text-sm text-muted-foreground", e),
		...t
	});
}
//#endregion
//#region Build/Frontend/src/ui.ts
var zz = /* @__PURE__ */ t({
	Accordion: () => fR,
	AccordionContent: () => hR,
	AccordionItem: () => pR,
	AccordionTrigger: () => mR,
	Alert: () => _R,
	AlertDescription: () => yR,
	AlertTitle: () => vR,
	Attachment: () => KC,
	AttachmentAction: () => $C,
	AttachmentActions: () => QC,
	AttachmentContent: () => YC,
	AttachmentDescription: () => ZC,
	AttachmentGroup: () => tw,
	AttachmentMedia: () => JC,
	AttachmentTitle: () => XC,
	AttachmentTrigger: () => ew,
	Avatar: () => bR,
	AvatarBadge: () => CR,
	AvatarFallback: () => SR,
	AvatarGroup: () => wR,
	AvatarGroupCount: () => TR,
	AvatarImage: () => xR,
	Badge: () => ky,
	Breadcrumb: () => ER,
	BreadcrumbEllipsis: () => MR,
	BreadcrumbItem: () => OR,
	BreadcrumbLink: () => kR,
	BreadcrumbList: () => DR,
	BreadcrumbPage: () => AR,
	BreadcrumbSeparator: () => jR,
	Bubble: () => tI,
	BubbleContent: () => nI,
	BubbleGroup: () => $F,
	BubbleReactions: () => iI,
	Button: () => zy,
	Card: () => NR,
	CardAction: () => LR,
	CardContent: () => RR,
	CardDescription: () => IR,
	CardFooter: () => zR,
	CardHeader: () => PR,
	CardTitle: () => FR,
	Checkbox: () => yS,
	Collapsible: () => WF,
	CollapsibleContent: () => KF,
	CollapsibleTrigger: () => GF,
	Command: () => PL,
	CommandDialog: () => FL,
	CommandEmpty: () => RL,
	CommandGroup: () => zL,
	CommandInput: () => IL,
	CommandItem: () => VL,
	CommandList: () => LL,
	CommandSeparator: () => BL,
	CommandShortcut: () => HL,
	Conversation: () => vT,
	ConversationContent: () => yT,
	ConversationEmptyState: () => xT,
	ConversationItem: () => bT,
	Dialog: () => bS,
	DialogClose: () => CS,
	DialogContent: () => TS,
	DialogDescription: () => kS,
	DialogFooter: () => DS,
	DialogHeader: () => ES,
	DialogOverlay: () => wS,
	DialogPortal: () => SS,
	DialogTitle: () => OS,
	DialogTrigger: () => xS,
	DropdownMenu: () => AS,
	DropdownMenuCheckboxItem: () => IS,
	DropdownMenuContent: () => NS,
	DropdownMenuGroup: () => PS,
	DropdownMenuItem: () => FS,
	DropdownMenuLabel: () => zS,
	DropdownMenuPortal: () => jS,
	DropdownMenuRadioGroup: () => LS,
	DropdownMenuRadioItem: () => RS,
	DropdownMenuSeparator: () => BS,
	DropdownMenuShortcut: () => VS,
	DropdownMenuSub: () => HS,
	DropdownMenuSubContent: () => WS,
	DropdownMenuSubTrigger: () => US,
	DropdownMenuTrigger: () => MS,
	Empty: () => By,
	EmptyContent: () => Ky,
	EmptyDescription: () => Gy,
	EmptyHeader: () => Vy,
	EmptyMedia: () => Uy,
	EmptyTitle: () => Wy,
	Field: () => WR,
	FieldContent: () => GR,
	FieldDescription: () => JR,
	FieldError: () => XR,
	FieldGroup: () => HR,
	FieldLabel: () => KR,
	FieldLegend: () => VR,
	FieldSeparator: () => YR,
	FieldSet: () => BR,
	FieldTitle: () => qR,
	Input: () => GS,
	InputGroup: () => qS,
	InputGroupAddon: () => YS,
	InputGroupButton: () => ZS,
	InputGroupInput: () => $S,
	InputGroupText: () => QS,
	InputGroupTextarea: () => eC,
	Item: () => ez,
	ItemActions: () => oz,
	ItemContent: () => rz,
	ItemDescription: () => az,
	ItemFooter: () => cz,
	ItemGroup: () => ZR,
	ItemHeader: () => sz,
	ItemMedia: () => nz,
	ItemSeparator: () => QR,
	ItemTitle: () => iz,
	Kbd: () => dC,
	KbdGroup: () => fC,
	Label: () => tC,
	Markdown: () => UF,
	Marker: () => oI,
	MarkerContent: () => cI,
	MarkerIcon: () => sI,
	Message: () => uI,
	MessageAvatar: () => dI,
	MessageContent: () => fI,
	MessageFooter: () => mI,
	MessageGroup: () => lI,
	MessageHeader: () => pI,
	MessageScroller: () => pT,
	MessageScrollerButton: () => _T,
	MessageScrollerContent: () => hT,
	MessageScrollerItem: () => gT,
	MessageScrollerProvider: () => fT,
	MessageScrollerViewport: () => mT,
	Popover: () => TC,
	PopoverAnchor: () => OC,
	PopoverContent: () => DC,
	PopoverDescription: () => jC,
	PopoverHeader: () => kC,
	PopoverTitle: () => AC,
	PopoverTrigger: () => EC,
	Progress: () => lz,
	PromptInput: () => FC,
	PromptInputAttachButton: () => VC,
	PromptInputButton: () => BC,
	PromptInputFooter: () => RC,
	PromptInputHeader: () => LC,
	PromptInputSubmit: () => HC,
	PromptInputTextarea: () => IC,
	PromptInputTools: () => zC,
	Reasoning: () => XF,
	ReasoningContent: () => QF,
	ReasoningTrigger: () => ZF,
	ScrollArea: () => Ay,
	ScrollBar: () => jy,
	Select: () => uz,
	SelectContent: () => mz,
	SelectGroup: () => dz,
	SelectItem: () => gz,
	SelectLabel: () => hz,
	SelectScrollDownButton: () => yz,
	SelectScrollUpButton: () => vz,
	SelectSeparator: () => _z,
	SelectTrigger: () => pz,
	SelectValue: () => fz,
	Separator: () => My,
	Sheet: () => bz,
	SheetClose: () => Sz,
	SheetContent: () => Tz,
	SheetDescription: () => kz,
	SheetFooter: () => Dz,
	SheetHeader: () => Ez,
	SheetTitle: () => Oz,
	SheetTrigger: () => xz,
	Shimmer: () => qF,
	Skeleton: () => pC,
	Spinner: () => MC,
	Suggestion: () => WC,
	Suggestions: () => UC,
	Switch: () => Az,
	Table: () => jz,
	TableBody: () => Nz,
	TableCaption: () => Rz,
	TableCell: () => Lz,
	TableFooter: () => Pz,
	TableHead: () => Iz,
	TableHeader: () => Mz,
	TableRow: () => Fz,
	Tabs: () => Ny,
	TabsContent: () => Ly,
	TabsList: () => Fy,
	TabsTrigger: () => Iy,
	Textarea: () => KS,
	Toaster: () => Jb,
	Tool: () => SI,
	ToolContent: () => wI,
	ToolHeader: () => CI,
	ToolInput: () => EI,
	ToolOutput: () => DI,
	ToolStateBadge: () => xI,
	Tooltip: () => db,
	TooltipContent: () => pb,
	TooltipProvider: () => ub,
	TooltipTrigger: () => fb,
	badgeVariants: () => Oy,
	buttonVariants: () => Ry,
	markerVariants: () => aI,
	tabsListVariants: () => Py,
	toast: () => Mb,
	useMessageScroller: () => tT,
	useMessageScrollerScrollable: () => nT,
	useMessageScrollerVisibility: () => rT,
	usePromptInputAttachments: () => PC
});
dR(), gC("shadcn_ui/chat-home", iC);
//#endregion
var Bz = R.Fragment, Vz = R.jsx, Hz = R.jsxs;
export { lR as CLOSED_EVENT, Bz as Fragment, $L as OPEN_CHAT_EVENT, _ as React, Wt as ReactDOM, uR as ShadcnUiShellElement, H as cn, gC as defineShadcnApp, dR as defineShellElement, _C as getShadcnApp, Vz as jsx, Hz as jsxs, vC as registeredApps, zz as ui, YL as useShell, QL as useTypo3 };
