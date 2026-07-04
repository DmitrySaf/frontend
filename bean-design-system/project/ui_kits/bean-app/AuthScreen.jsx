// AuthScreen.jsx — Bean sign-in (full-bleed photo + centered card)
function AuthScreen({ onContinue }) {
  const [email, setEmail] = React.useState("");
  return (
    <div style={{
      position: "absolute", inset: 0, background: "url(../../assets/login-bg.png) center/cover no-repeat #2a3f55",
      display: "grid", placeItems: "center", padding: 24,
    }}>
      <div style={{
        width: 420, maxWidth: "100%", background: "#fff", borderRadius: 24, padding: 36,
        boxShadow: "0 24px 60px rgba(0,0,0,.28)", boxSizing: "border-box",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 22 }}>
          <BeanMark size={40} radius={13} />
          <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>ProFound</span>
        </div>
        <p style={{ textAlign: "center", margin: "0 0 26px", fontSize: 16, lineHeight: "140%", color: "var(--text-secondary)" }}>
          Создайте аккаунт или войдите, чтобы открыть новые возможности для заработка.
        </p>
        <div style={{ marginBottom: 18 }}>
          <Input label="Почта" placeholder="example@gmail.com" value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <Button full size="l" onClick={onContinue}>Продолжить</Button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0", color: "var(--text-tertiary)", fontSize: 13 }}>
          <div style={{ flex: 1, height: 1, background: "var(--bg-outline)" }} />или<div style={{ flex: 1, height: 1, background: "var(--bg-outline)" }} />
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onContinue} className="oauth"><SocialGlyph name="vk" size={22} color="#0077FF" /></button>
          <button onClick={onContinue} className="oauth"><SocialGlyph name="yandex" size={22} color="#FC3F1D" /></button>
        </div>
        <p style={{ textAlign: "center", margin: "22px 0 0", fontSize: 12, lineHeight: "150%", color: "var(--text-tertiary)" }}>
          Регистрируясь, вы соглашаетесь с нашими <a style={lk}>условиями использования</a> и <a style={lk}>политикой конфиденциальности</a>.
        </p>
      </div>
      <style>{`.oauth{flex:1;display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid var(--bg-outline);border-radius:12px;padding:13px;cursor:pointer;transition:background .15s}.oauth:hover{background:var(--bg-light-secondary)}`}</style>
    </div>
  );
}
const lk = { color: "var(--primary-600)", textDecoration: "none" };
Object.assign(window, { AuthScreen });
