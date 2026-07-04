// wire-tweaks.jsx — expressive Tweaks for the Bean wireframe canvas.
//
// Three high-level knobs, each one reshapes the WHOLE feel by recomputing the
// shared token banks (window.WC + window.DC) and re-rendering the canvas — no
// per-screen edits, no single-property pixel pushing.
//
//   Fidelity  Sketch · Greyscale · Branded
//             — line-art + hand font + cream paper  vs.  the neutral grey kit
//               vs.  Bean-blue actions + real danger + clean white paper
//   Surface   Cool · Neutral · Warm
//             — one coherent hue/chroma family across paper, lines, ink, canvas
//   Linework  Hairline · Standard · Marker
//             — border weight + icon stroke + line contrast: delicate → bold

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "fidelity": "grey",
  "mood": "neutral",
  "weight": "standard"
}/*EDITMODE-END*/;

// ── token math ───────────────────────────────────────────────────────────────
const ok = (L, c, h) => `oklch(${L} ${c} ${h})`;

const FONT_BASE = '"Geist", system-ui, -apple-system, "Segoe UI", sans-serif';
const FONT_HAND = '"Patrick Hand", "Geist", system-ui, sans-serif';

// Surface temperature → tint hue/chroma + the canvas backdrop shade.
const MOOD = {
  cool:    { h: 255, c: 0.013, bgL: 0.962, bgC: 0.012 },
  neutral: { h: 95,  c: 0.003, bgL: 0.967, bgC: 0.004 },
  warm:    { h: 74,  c: 0.015, bgL: 0.951, bgC: 0.020 },
};

// Linework → line/ink lightness, icon stroke, grid contrast.
const WEIGHT = {
  hairline: { line: 0.912, lineStrong: 0.872, ink: 0.330, stroke: 1.5, grid: 0.045 },
  standard: { line: 0.886, lineStrong: 0.840, ink: 0.270, stroke: 2.0, grid: 0.060 },
  marker:   { line: 0.828, lineStrong: 0.770, ink: 0.200, stroke: 2.6, grid: 0.078 },
};

function deriveTokens(t) {
  const mood = MOOD[t.mood] || MOOD.neutral;
  const wt = WEIGHT[t.weight] || WEIGHT.standard;
  const fid = t.fidelity || "grey";

  // Fidelity bends the surface family: brand de-tints + cleans, sketch warms
  // + enriches the cream and biases the hue toward paper-warm.
  let cScale = 1, paperL = 1.0, hue = mood.h;
  if (fid === "brand")  { cScale = 0.6; paperL = 1.0; }
  if (fid === "sketch") { cScale = 1.6; paperL = 0.979; hue = mood.h * 0.4 + 74 * 0.6; }

  const c = mood.c * cScale;                 // surface-tint chroma
  const cInk = Math.min(c * 1.8, 0.03);      // a touch more tone in the darks

  const surface = {
    paper:      ok(paperL, c * 0.4, hue),
    gutter:     ok(0.950, c, hue),
    recess:     ok(0.967, c, hue),
    fillSoft:   ok(0.952, c, hue),
    fill:       ok(0.933, c, hue),
    skeleton:   ok(0.912, c, hue),
    line:       ok(wt.line, c, hue),
    lineStrong: ok(wt.lineStrong, c, hue),
    muted:      ok(0.710, cInk, hue),
    sub:        ok(0.550, cInk, hue),
    ink:        ok(wt.ink, cInk, hue),
    stroke:     wt.stroke,
  };

  // Action color + selected-surface + danger, per fidelity.
  let primary, textOnPrimary, active, danger;
  if (fid === "brand") {
    primary = ok(0.575, 0.196, 252);        // Bean blue ≈ #0071e3
    textOnPrimary = "#ffffff";
    active = ok(0.935, 0.040, 255);         // faint blue selection wash
    danger = ok(0.585, 0.196, 36);          // real Bean danger
  } else if (fid === "sketch") {
    primary = ok(0.345, Math.max(cInk, 0.02), hue);  // dark hand-ink fill
    textOnPrimary = ok(paperL, c * 0.4, hue);         // cream knockout
    active = ok(0.910, c * 1.4, hue);
    danger = ok(0.620, cInk, hue);
  } else {
    primary = ok(0.330, cInk, hue);          // the neutral dark-grey action
    textOnPrimary = "#ffffff";
    active = ok(0.915, c, hue);
    danger = ok(0.660, cInk, hue);
  }

  return {
    ...surface, primary, textOnPrimary, active, danger,
    font: fid === "sketch" ? FONT_HAND : FONT_BASE,
    _bg: ok(mood.bgL, mood.bgC, mood.h),
    _grid: `rgba(0,0,0,${wt.grid})`,
    _fid: fid, _wt: t.weight,
  };
}

// One-time global rules that can't be expressed through the token bank alone:
// the dashed line-art treatment (sketch) and the bolder border (marker).
function ensureTweakStyle() {
  if (document.getElementById("wire-tweak-style")) return;
  const s = document.createElement("style");
  s.id = "wire-tweak-style";
  s.textContent = [
    // Sketch → dashed line-art. border-width:0 (NON-important) hides borders
    // on elements that never declared one; a real inline `1px` shorthand
    // out-specifies it and survives, so ONLY genuine borders turn dashed.
    "body.wfi-sketch .dc-card *{ border-style: dashed !important; border-width: 0; }",
    // Marker → bolder borders. Applied outside sketch, where style:none keeps
    // the borderless elements invisible no matter the forced width.
    "body.wlw-marker:not(.wfi-sketch) .dc-card *{ border-width: 1.6px !important; }",
  ].join("\n");
  document.head.appendChild(s);
}

function applyTokens(tk) {
  ensureTweakStyle();
  Object.assign(window.WC, {
    paper: tk.paper, gutter: tk.gutter, recess: tk.recess, fillSoft: tk.fillSoft,
    fill: tk.fill, skeleton: tk.skeleton, line: tk.line, lineStrong: tk.lineStrong,
    muted: tk.muted, sub: tk.sub, ink: tk.ink, stroke: tk.stroke,
    primary: tk.primary, textOnPrimary: tk.textOnPrimary, active: tk.active,
    danger: tk.danger, font: tk.font,
  });
  if (window.DC) { window.DC.bg = tk._bg; window.DC.grid = tk._grid; }
  document.documentElement.style.setProperty("--font-sans", tk.font);
  const b = document.body;
  b.classList.remove("wfi-sketch", "wfi-grey", "wfi-brand", "wlw-hairline", "wlw-standard", "wlw-marker");
  b.classList.add("wfi-" + tk._fid, "wlw-" + tk._wt);
}

// ── panel ────────────────────────────────────────────────────────────────────
const FIDELITY_OPTS = [
  { value: "sketch", label: "Sketch" },
  { value: "grey",   label: "Greyscale" },
  { value: "brand",  label: "Branded" },
];
const MOOD_OPTS = [
  { value: "cool",    label: "Cool" },
  { value: "neutral", label: "Neutral" },
  { value: "warm",    label: "Warm" },
];
const WEIGHT_OPTS = [
  { value: "hairline", label: "Hairline" },
  { value: "standard", label: "Standard" },
  { value: "marker",   label: "Marker" },
];

const FID_BLURB = {
  sketch: "Hand-drawn line-art on cream — read it as rough, early thinking.",
  grey:   "The neutral mid-fi kit — structure without colour or opinion.",
  brand:  "Bean blue actions, real danger, clean white — production-leaning.",
};

function TweaksController() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    applyTokens(deriveTokens(t));
    if (window.__renderWire) window.__renderWire();
  }, [t.fidelity, t.mood, t.weight]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Feel" />
      <TweakRadio label="Fidelity" value={t.fidelity} options={FIDELITY_OPTS}
        onChange={(v) => setTweak("fidelity", v)} />
      <div style={{ fontSize: 11, lineHeight: 1.45, color: "rgba(41,38,27,.55)", marginTop: -2 }}>
        {FID_BLURB[t.fidelity]}
      </div>
      <TweakRadio label="Surface" value={t.mood} options={MOOD_OPTS}
        onChange={(v) => setTweak("mood", v)} />
      <TweakRadio label="Linework" value={t.weight} options={WEIGHT_OPTS}
        onChange={(v) => setTweak("weight", v)} />
      <div style={{ marginTop: 4 }}>
        <TweakButton label="Reset" secondary
          onClick={() => setTweak({ fidelity: "grey", mood: "neutral", weight: "standard" })} />
      </div>
    </TweaksPanel>
  );
}

// Apply defaults before first paint, then mount the panel in its own root.
applyTokens(deriveTokens(TWEAK_DEFAULTS));
if (window.__renderWire) window.__renderWire();
ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<TweaksController />);

// Exposed for debugging / verification — preview a combination without the panel.
window.__wireTweaks = {
  deriveTokens, applyTokens,
  preview: (t) => { applyTokens(deriveTokens(t)); if (window.__renderWire) window.__renderWire(); },
};
