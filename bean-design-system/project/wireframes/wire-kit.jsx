// wire-kit.jsx — Bean wireframe primitives (mid-fi greyscale + real Lucide icons + real copy)
// Exports to window for use across babel script files.

const WC = {
  paper: "#ffffff",
  gutter: "#efefef",
  recess: "#f5f5f5",
  line: "#dcdcdc",
  lineStrong: "#cfcfcf",
  fill: "#eaeaea",
  fillSoft: "#f0f0f0",
  skeleton: "#e4e4e4",
  ink: "#2a2a2a",
  sub: "#787878",
  muted: "#a6a6a6",
  primary: "#3a3a3a",      // wireframe "primary action" — dark grey, no brand color
  textOnPrimary: "#ffffff",
  danger: "#9a9a9a",
  active: "#e9e9e9",       // selected nav/tab/rail surface
  stroke: 2,               // default icon stroke weight (driven by the Linework tweak)
  font: 'var(--font-sans), system-ui, sans-serif',
  mono: 'var(--font-mono), monospace',
};

// Lucide icon (1:1 with the app). Builds the SVG directly from Lucide's icon
// data — no document scan, so hundreds of icons render fast on the canvas.
function _wPascal(name) {
  return name.split("-").map((p) => (p ? p[0].toUpperCase() + p.slice(1) : "")).join("");
}
const _wIconCache = {};
function _wIconSvg(name, size, stroke) {
  const cacheKey = name + "|" + size + "|" + stroke;
  if (_wIconCache[cacheKey]) return _wIconCache[cacheKey];
  const L = window.lucide || {};
  const node = (L.icons && L.icons[_wPascal(name)]) || L[_wPascal(name)];
  if (!node) return "";
  const children = node.map(([tag, attrs]) =>
    `<${tag} ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(" ")} />`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${children}</svg>`;
  _wIconCache[cacheKey] = svg;
  return svg;
}
function WIcon({ name, size = 20, stroke, color = WC.sub, style = {} }) {
  const sw = stroke == null ? (WC.stroke || 2) : stroke;
  return <span style={{ display: "inline-flex", color, lineHeight: 0, flex: "none", ...style }}
    dangerouslySetInnerHTML={{ __html: _wIconSvg(name, size, sw) }} />;
}

// Skeleton text bar (for de-emphasized / placeholder body content)
function WBar({ w = "100%", h = 8, mt = 0, mb = 0, color = WC.skeleton, round = 4 }) {
  return <div style={{ width: w, height: h, marginTop: mt, marginBottom: mb, background: color, borderRadius: round, flex: "none" }} />;
}

// A few stacked skeleton lines
function WLines({ n = 3, gap = 9, last = "70%", h = 8 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      {Array.from({ length: n }).map((_, i) => (
        <WBar key={i} h={h} w={i === n - 1 ? last : "100%"} />
      ))}
    </div>
  );
}

// Image / media placeholder — classic wireframe crossed box
function WImg({ w = "100%", h = 120, radius = 12, label, icon = "image", iconSize = 26 }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: radius, background: WC.fillSoft,
      border: `1px solid ${WC.line}`, position: "relative", overflow: "hidden", flex: "none",
      display: "grid", placeItems: "center",
    }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke={WC.line} strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke={WC.line} strokeWidth="1" />
      </svg>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: WC.muted }}>
        <WIcon name={icon} size={iconSize} color={WC.muted} />
        {label && <span style={{ fontSize: 12, color: WC.muted, fontFamily: WC.font }}>{label}</span>}
      </div>
    </div>
  );
}

// Avatar placeholder (crossed circle)
function WAvatar({ size = 40, icon = "user", radius }) {
  return (
    <div style={{ width: size, height: size, borderRadius: radius != null ? radius : "50%", background: WC.fillSoft,
      border: `1px solid ${WC.line}`, display: "grid", placeItems: "center", flex: "none", overflow: "hidden", position: "relative" }}>
      <WIcon name={icon} size={size * 0.5} color={WC.muted} />
    </div>
  );
}

// Button — variants signal hierarchy with greyscale only
function WBtn({ variant = "primary", size = "m", full, icon, iconRight, children, style = {} }) {
  const pad = { s: "7px 12px", m: "10px 16px", l: "13px 22px" }[size];
  const fs = { s: 13, m: 14, l: 15 }[size];
  const variants = {
    primary: { background: WC.primary, color: WC.textOnPrimary, border: `1px solid ${WC.primary}` },
    secondary: { background: "#fff", color: WC.ink, border: `1px solid ${WC.lineStrong}` },
    ghost: { background: "transparent", color: WC.sub, border: "1px solid transparent" },
    danger: { background: "#fff", color: WC.sub, border: `1px solid ${WC.lineStrong}` },
  };
  return (
    <button style={{
      fontFamily: WC.font, fontWeight: 600, fontSize: fs, lineHeight: "120%", cursor: "pointer",
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, padding: pad,
      borderRadius: 14, width: full ? "100%" : "auto", whiteSpace: "nowrap", ...variants[variant], ...style,
    }}>
      {icon && <WIcon name={icon} size={fs + 2} color={variant === "primary" ? WC.textOnPrimary : WC.sub} />}
      {children}
      {iconRight && <WIcon name={iconRight} size={fs + 2} color={variant === "primary" ? WC.textOnPrimary : WC.sub} />}
    </button>
  );
}

// Form label
function WLabel({ children, style = {} }) {
  return <label style={{ fontSize: 13, fontWeight: 500, color: WC.ink, fontFamily: WC.font, ...style }}>{children}</label>;
}

// Input field shell
function WInput({ label, value, placeholder, prefix, suffix, helper, full = true, mono, h = 44, style = {} }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7, width: full ? "100%" : "auto", ...style }}>
      {label && <WLabel>{label}</WLabel>}
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff",
        border: `1px solid ${WC.line}`, borderRadius: 14, padding: "0 14px", height: h }}>
        {prefix && <span style={{ color: WC.muted, fontSize: 14, fontFamily: WC.font, flex: "none" }}>{prefix}</span>}
        <span style={{ flex: 1, fontSize: 14, fontFamily: mono ? WC.mono : WC.font,
          color: value ? WC.ink : WC.muted, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {value || placeholder}
        </span>
        {suffix && <span style={{ color: WC.muted, flex: "none", display: "inline-flex" }}>{suffix}</span>}
      </div>
      {helper && <span style={{ fontSize: 12, color: WC.muted, fontFamily: WC.font }}>{helper}</span>}
    </div>
  );
}

// Textarea shell
function WTextarea({ label, placeholder, rows = 3 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      {label && <WLabel>{label}</WLabel>}
      <div style={{ background: "#fff", border: `1px solid ${WC.line}`, borderRadius: 14, padding: 14, minHeight: rows * 22 }}>
        <span style={{ fontSize: 14, color: WC.muted, fontFamily: WC.font }}>{placeholder}</span>
      </div>
    </div>
  );
}

// Toggle (greyscale)
function WToggle({ on }) {
  return (
    <div style={{ width: 44, height: 24, borderRadius: 9999, position: "relative", flex: "none",
      background: on ? WC.primary : WC.line }}>
      <span style={{ position: "absolute", top: 4, left: on ? 24 : 4, width: 16, height: 16, borderRadius: "50%", background: "#fff" }} />
    </div>
  );
}

// Pill / badge
function WPill({ children, icon, style = {} }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 9999,
      border: `1px solid ${WC.line}`, background: WC.recess, fontSize: 12, fontWeight: 500, color: WC.sub, fontFamily: WC.font, ...style }}>
      {icon && <WIcon name={icon} size={13} color={WC.sub} />}{children}
    </span>
  );
}

// Vertical nav tab (settings + community)
function WTab({ icon, label, active, danger, trailing }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", borderRadius: 12,
      fontFamily: WC.font, fontSize: 14, fontWeight: 600,
      color: danger ? WC.sub : active ? WC.ink : WC.sub,
      background: active ? WC.active : "transparent",
      boxShadow: active ? `inset 0 0 0 1px ${WC.lineStrong}` : "none" }}>
      {icon && <WIcon name={icon} size={19} color={active ? WC.ink : WC.sub} />}
      <span style={{ flex: 1 }}>{label}</span>
      {trailing}
    </div>
  );
}

// Card / surface
function WCard({ children, pad = 20, style = {} }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${WC.line}`, borderRadius: 16, padding: pad, ...style }}>
      {children}
    </div>
  );
}

// Section heading with optional sub
function WHeading({ title, sub, size = 24 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: sub ? 5 : 0 }}>
      <h2 style={{ margin: 0, fontSize: size, fontWeight: 700, color: WC.ink, fontFamily: WC.font, letterSpacing: "-0.01em" }}>{title}</h2>
      {sub && <p style={{ margin: 0, fontSize: 14, color: WC.sub, fontFamily: WC.font }}>{sub}</p>}
    </div>
  );
}

// Annotation tag — small mono note to call out a wireframe state/role
function WNote({ children, style = {} }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "2px 8px", borderRadius: 6,
      border: `1px dashed ${WC.lineStrong}`, background: WC.recess, fontSize: 11, fontWeight: 500,
      color: WC.sub, fontFamily: WC.mono, letterSpacing: "0.01em", ...style }}>{children}</span>
  );
}

Object.assign(window, { WC, WIcon, WBar, WLines, WImg, WAvatar, WBtn, WLabel, WInput, WTextarea, WToggle, WPill, WTab, WCard, WHeading, WNote });
