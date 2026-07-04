// wire-auth.jsx — Bean wireframe: login / registration + states

function AuthBg({ children }) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", background: WC.fillSoft, display: "grid", placeItems: "center", fontFamily: WC.font, overflow: "hidden" }}>
      {/* full-bleed photo placeholder */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke={WC.line} strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke={WC.line} strokeWidth="1" />
      </svg>
      <div style={{ position: "absolute", top: 16, left: 18 }}><WNote>фон — фото (full-bleed)</WNote></div>
      {children}
    </div>
  );
}

function AuthCard({ children, w = 400 }) {
  return (
    <div style={{ position: "relative", width: w, maxWidth: "90%", background: "#fff", border: `1px solid ${WC.line}`,
      borderRadius: 24, padding: 34, boxShadow: "0 24px 60px rgba(0,0,0,.12)", boxSizing: "border-box" }}>
      {children}
    </div>
  );
}

function AuthBrand() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11, justifyContent: "center", marginBottom: 20 }}>
      <div style={{ width: 38, height: 38, borderRadius: 12, border: `1px solid ${WC.line}`, background: WC.recess, display: "grid", placeItems: "center" }}>
        <WIcon name="bean" size={22} color={WC.ink} stroke={2.2} />
      </div>
      <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", color: WC.ink }}>Bean</span>
    </div>
  );
}

// Email entry (sign-in / sign-up)
function ScreenAuthLogin() {
  return (
    <AuthBg>
      <AuthCard>
        <AuthBrand />
        <p style={{ textAlign: "center", margin: "0 0 24px", fontSize: 15, lineHeight: "140%", color: WC.sub }}>
          Создайте аккаунт или войдите, чтобы открыть новые возможности для заработка.
        </p>
        <div style={{ marginBottom: 16 }}>
          <WInput label="Почта" placeholder="example@gmail.com" />
        </div>
        <WBtn full size="l">Продолжить</WBtn>
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0", color: WC.muted, fontSize: 13 }}>
          <div style={{ flex: 1, height: 1, background: WC.line }} />или<div style={{ flex: 1, height: 1, background: WC.line }} />
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {["VK", "Яндекс"].map((p) => (
            <div key={p} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, border: `1px solid ${WC.line}`, borderRadius: 12, padding: 12 }}>
              <WAvatar size={20} icon="square" /><span style={{ fontSize: 13, fontWeight: 600, color: WC.sub }}>{p}</span>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", margin: "22px 0 0", fontSize: 12, lineHeight: "150%", color: WC.muted }}>
          Регистрируясь, вы соглашаетесь с условиями использования и политикой конфиденциальности.
        </p>
      </AuthCard>
    </AuthBg>
  );
}

// Confirmation code state
function ScreenAuthCode() {
  return (
    <AuthBg>
      <AuthCard>
        <AuthBrand />
        <p style={{ textAlign: "center", margin: "0 0 6px", fontSize: 15, fontWeight: 600, color: WC.ink }}>Введите код подтверждения</p>
        <p style={{ textAlign: "center", margin: "0 0 24px", fontSize: 13, lineHeight: "140%", color: WC.sub }}>
          Мы отправили код на <span style={{ color: WC.ink, fontWeight: 500 }}>example@gmail.com</span>
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 22 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ width: 54, height: 60, border: `1px solid ${i === 0 ? WC.lineStrong : WC.line}`, borderRadius: 14, display: "grid", placeItems: "center", background: "#fff" }}>
              <span style={{ fontSize: 24, fontFamily: WC.mono, color: i === 0 ? WC.ink : WC.muted }}>{i === 0 ? "4" : "·"}</span>
            </div>
          ))}
        </div>
        <WBtn full size="l">Подтвердить</WBtn>
        <p style={{ textAlign: "center", margin: "18px 0 0", fontSize: 13, color: WC.sub }}>
          Не получили код? <span style={{ color: WC.ink, fontWeight: 600 }}>Отправить заново</span>
        </p>
      </AuthCard>
    </AuthBg>
  );
}

// --- companion states ---
function StateAuthError() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", fontFamily: WC.font, padding: 22, boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 14 }}>
      <WNote>ошибка — неверная почта</WNote>
      <div style={{ marginTop: 6 }}>
        <WLabel>Почта</WLabel>
        <div style={{ marginTop: 7, display: "flex", alignItems: "center", gap: 8, background: "#fff", border: `1.5px solid ${WC.lineStrong}`, borderRadius: 14, padding: "0 14px", height: 44 }}>
          <span style={{ flex: 1, fontSize: 14, color: WC.ink }}>example@</span>
          <WIcon name="alert-circle" size={18} color={WC.sub} />
        </div>
        <span style={{ fontSize: 12, color: WC.sub, marginTop: 7, display: "block" }}>Введите корректный адрес почты</span>
      </div>
      <WBtn full size="l">Продолжить</WBtn>
    </div>
  );
}

function StateAuthLoading() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", fontFamily: WC.font, padding: 22, boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 14 }}>
      <WNote>загрузка — отправка кода</WNote>
      <div style={{ marginTop: 6 }}>
        <WLabel>Почта</WLabel>
        <div style={{ marginTop: 7 }}><WInput placeholder="example@gmail.com" value="arkadiy@gmail.com" /></div>
      </div>
      <button style={{ width: "100%", padding: "13px 22px", borderRadius: 14, border: 0, background: WC.primary, color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: WC.font, fontWeight: 600, fontSize: 15 }}>
        <WIcon name="loader-2" size={17} color="#fff" /> Отправляем код…
      </button>
    </div>
  );
}

Object.assign(window, { ScreenAuthLogin, ScreenAuthCode, StateAuthError, StateAuthLoading });
