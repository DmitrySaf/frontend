// primitives.jsx — Bean UI kit shared primitives
// Icon (Lucide), Button, Input, Toggle, Avatar, SocialIcon
// Exports to window for use across babel script files.

function Icon({ name, size = 20, stroke = 2, color, style = {} }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !window.lucide) return;
    el.innerHTML = "";
    const i = document.createElement("i");
    i.setAttribute("data-lucide", name);
    el.appendChild(i);
    window.lucide.createIcons({ attrs: { width: size, height: size, "stroke-width": stroke } });
  }, [name, size, stroke]);
  return <span ref={ref} style={{ display: "inline-flex", color, lineHeight: 0, ...style }} />;
}

function Button({ variant = "primary", size = "m", full, children, icon, iconRight, ...rest }) {
  const pad = { s: "8px 14px", m: "11px 20px", l: "14px 26px" }[size];
  const fs = { s: 13, m: 14, l: 15 }[size];
  const base = {
    fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: fs, lineHeight: "120%",
    border: 0, cursor: "pointer", display: "inline-flex", alignItems: "center",
    justifyContent: "center", gap: 8, padding: pad,
    borderRadius: 16, width: full ? "100%" : "auto",
    transition: "background .15s, opacity .15s, transform .05s", whiteSpace: "nowrap",
  };
  const variants = {
    primary: { background: "var(--primary-600)", color: "#fff" },
    secondary: { background: "#fff", color: "var(--text-primary)", border: "1px solid var(--bg-outline)" },
    ghost: { background: "transparent", color: "var(--text-secondary)" },
    danger: { background: "#fff", color: "var(--danger)", border: "1px solid var(--bg-outline)" },
  };
  const [hover, setHover] = React.useState(false);
  const hov = hover ? (variant === "primary" ? { background: "var(--primary-1000)" }
    : variant === "ghost" ? { background: "var(--icon-hover)" }
    : { background: "var(--bg-light-secondary)" }) : {};
  return (
    <button {...rest} style={{ ...base, ...variants[variant], ...hov }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {icon && <Icon name={icon} size={fs + 3} />}{children}{iconRight && <Icon name={iconRight} size={fs + 3} />}
    </button>
  );
}

function Input({ label, helper, error, prefix, suffix, value, onChange, placeholder, mono }) {
  const [focus, setFocus] = React.useState(false);
  const borderColor = error ? "var(--danger)" : focus ? "var(--primary-500)" : "var(--bg-outline)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      {label && <label className="bean-label">{label}</label>}
      <div style={{
        display: "flex", alignItems: "center", gap: 8, background: "#fff",
        border: `1px solid ${borderColor}`, borderRadius: 16, padding: "11px 14px",
        transition: "border-color .15s",
      }}>
        {prefix && <span style={{ color: "var(--text-primary)", display: "inline-flex", flex: "none" }}>{prefix}</span>}
        <input value={value} onChange={onChange} placeholder={placeholder}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ border: 0, outline: 0, flex: 1, fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
            fontSize: 16, color: "var(--text-primary)", background: "transparent", minWidth: 0 }} />
        {suffix && <span style={{ color: "var(--text-tertiary)", display: "inline-flex", flex: "none", cursor: "pointer" }}>{suffix}</span>}
      </div>
      {(helper || error) && <span style={{ fontSize: 12, color: error ? "var(--danger)" : "var(--text-tertiary)" }}>{error || helper}</span>}
    </div>
  );
}

function Toggle({ on, onChange, disabled }) {
  return (
    <div onClick={() => !disabled && onChange(!on)} style={{
      width: 44, height: 24, borderRadius: 9999, position: "relative", flex: "none",
      background: on ? "var(--tw-blue-600)" : "var(--gray-200)", cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.55 : 1, transition: "background .15s",
    }}>
      <span style={{ position: "absolute", top: 4, left: on ? 24 : 4, width: 16, height: 16,
        borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center", transition: "left .15s" }}>
        {disabled && <Icon name="lock" size={10} color="var(--gray-400)" />}
      </span>
    </div>
  );
}

// Vertical nav tab (settings + community sidebar)
function Tab({ icon, label, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: 10, padding: "10px 16px 10px 12px", borderRadius: 14,
        fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, cursor: "pointer",
        color: active ? "#000" : "var(--text-secondary)", transition: "background .12s",
        background: active ? "var(--tab-active)" : hover ? "var(--tab-hover)" : "transparent",
        boxShadow: active ? "inset 0 0 0 1px var(--tab-active-ring)" : "none",
      }}>
      {icon && <Icon name={icon} size={20} />}<span>{label}</span>
    </div>
  );
}

// Renders the real Bean logo.svg (lime tile + bean glyph) at any size
function BeanMark({ size = 48, radius = 16 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let alive = true;
    fetch("../../assets/logo.svg").then((r) => r.text()).then((svg) => {
      if (!alive || !ref.current) return;
      ref.current.innerHTML = svg.replace(/rx="16"/, `rx="${(radius / size) * 48}"`);
      const el = ref.current.querySelector("svg");
      if (el) { el.setAttribute("width", size); el.setAttribute("height", size); }
    });
    return () => { alive = false; };
  }, [size, radius]);
  return <span ref={ref} style={{ display: "inline-flex", lineHeight: 0, flex: "none" }} />;
}

function BeanLogo({ size = 44, radius = 12, glyph }) {
  return (
    <div style={{ width: size, height: size, borderRadius: radius, background: "var(--secondary-600)",
      display: "grid", placeItems: "center", flex: "none" }}>
      <Icon name="bean" size={glyph || size * 0.58} color="#141414" stroke={2.2} />
    </div>
  );
}

// ---- Social brand glyphs (simplified, single-color, currentColor) ----
const SOCIALS = {
  telegram: { color: "#229ED9", vb: "0 0 24 24", p: "M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.8-7.9c.4-.3-.1-.5-.6-.2L6.6 13l-4.7-1.5c-1-.3-1-1 .2-1.5L20.6 3c.9-.3 1.6.2 1.3 1.3z" },
  youtube: { color: "#FF0000", vb: "0 0 24 24", p: "M23 7.5c-.3-1.1-1-1.8-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4C2 5.7 1.3 6.4 1 7.5.6 9.4.6 12 .6 12s0 2.6.4 4.5c.3 1.1 1 1.8 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4c1.1-.3 1.8-1 2.1-2.1.4-1.9.4-4.5.4-4.5s0-2.6-.4-4.5zM9.7 15.3V8.7l5.7 3.3-5.7 3.3z" },
  instagram: { color: "#E1306C", vb: "0 0 24 24", multi: true, paths: [
    { p: "M16.5 2h-9A5.5 5.5 0 0 0 2 7.5v9A5.5 5.5 0 0 0 7.5 22h9a5.5 5.5 0 0 0 5.5-5.5v-9A5.5 5.5 0 0 0 16.5 2zm3.5 14.5a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 4 16.5v-9A3.5 3.5 0 0 1 7.5 4h9A3.5 3.5 0 0 1 20 7.5v9z" },
    { p: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" },
    { p: "M17.5 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" } ] },
  x: { color: "#000000", vb: "0 0 24 24", p: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" },
  discord: { color: "#5865F2", vb: "0 0 24 24", p: "M20 4.4A19.8 19.8 0 0 0 15.1 3l-.2.5c1.6.4 2.9 1 4.2 1.9-2.3-1-4.5-1.5-6.9-1.5s-4.6.5-6.9 1.5c1.3-.9 2.6-1.5 4.2-1.9L9.3 3A19.8 19.8 0 0 0 4.4 4.4C1.4 8.9.6 13.2 1 17.5a19.9 19.9 0 0 0 6 3l.5-1.2c-.7-.3-1.4-.6-2-1l.5-.4c3.8 1.8 8 1.8 11.8 0l.5.4c-.6.4-1.3.7-2 1l.5 1.2a19.9 19.9 0 0 0 6-3c.5-5-.8-9.3-3.3-13.1zM8.5 14.9c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm7 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z" },
  tiktok: { color: "#000000", vb: "0 0 24 24", p: "M16.5 2h-3v13.2a2.8 2.8 0 1 1-2.4-2.8v-3a5.8 5.8 0 1 0 5.4 5.8V8.6a6.9 6.9 0 0 0 4 1.3v-3a3.9 3.9 0 0 1-4-3.9z" },
  vk: { color: "#0077FF", vb: "0 0 24 24", p: "M12.8 16.5c-5.4 0-8.9-3.8-9-10h2.8c.1 4.6 2.2 6.5 3.7 6.9V6.5h2.7v3.9c1.6-.2 3.2-1.9 3.7-3.9h2.6c-.4 2.4-2 4.1-3.2 4.8 1.2.6 3 2.1 3.7 4.7h-2.9c-.5-1.7-2-3-3.9-3.2v3.2h-.9z" },
  yandex: { color: "#FC3F1D", vb: "0 0 24 24", p: "M13.3 21h2.9V3h-3.6C9 3 6.7 5.1 6.7 8.2c0 2.5 1.2 4 3.3 5.4L6.3 21h3.2l3.8-7v7zM12.6 11.8c-1.7-1-2.5-1.8-2.5-3.8 0-1.7 1.1-2.9 2.6-2.9h.6v6.7h-.7z" },
};

function SocialGlyph({ name, size = 20, color }) {
  const s = SOCIALS[name];
  if (!s) return null;
  const fill = color || "currentColor";
  return (
    <svg width={size} height={size} viewBox={s.vb} fill={fill} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      {s.multi ? s.paths.map((pp, i) => <path key={i} d={pp.p} />) : <path d={s.p} />}
    </svg>
  );
}

Object.assign(window, { Icon, Button, Input, Toggle, Tab, BeanLogo, BeanMark, SocialGlyph, SOCIALS });
