// app.jsx — Bean UI kit interactive shell (auth → community/settings → public preview)

const COMMUNITIES = [
  { slug: "profound-university", name: "ProFound University", emoji: "🐼",
    coverUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
    about: "Закрытое сообщество для тех, кто строит личный бренд и зарабатывает на контенте. Курсы, разборы и поддержка комьюнити." },
  { slug: "clipr", name: "Clipr Campaigns", emoji: "🎓",
    about: "Ведущее сообщество для клипперов и авторов короткого формата: обучение, кампании и нетворкинг." },
];

function CreateModal({ open, onClose }) {
  const [dn, setDn] = React.useState("");
  if (!open) return null;
  const slug = dn.toLowerCase().replace(/[^a-zа-я0-9]+/gi, "-").replace(/^-|-$/g, "");
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.4)",
      display: "grid", placeItems: "center", zIndex: 50, padding: 24 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 440, maxWidth: "100%", background: "#fff",
        borderRadius: 24, padding: 28, boxShadow: "var(--shadow-pop)", boxSizing: "border-box" }}>
        <h2 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 700, color: "var(--gray-900)" }}>Создать новое сообщество</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Input label="Название сообщества" placeholder="Введите название сообщества" value={dn} onChange={(e) => setDn(e.target.value)} />
          <Input label="URL" value={slug} onChange={() => {}} prefix={<span style={{ color: "var(--text-tertiary)" }}>profound.com/</span>} helper="Уникальное имя" />
          <Button size="l" full onClick={onClose}>Создать</Button>
        </div>
      </div>
    </div>
  );
}

function ScreenSwitcher({ screen, set }) {
  const items = [["auth", "Вход"], ["community", "Сообщество"], ["settings", "Настройки"], ["preview", "Витрина"]];
  return (
    <div style={{ position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)", zIndex: 100,
      background: "rgba(20,20,20,.92)", borderRadius: 9999, padding: 4, display: "flex", gap: 2,
      boxShadow: "var(--shadow-pop)", backdropFilter: "blur(8px)" }}>
      {items.map(([id, label]) => (
        <button key={id} onClick={() => set(id)} style={{ border: 0, cursor: "pointer", borderRadius: 9999,
          padding: "7px 14px", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600,
          background: screen === id ? "#fff" : "transparent", color: screen === id ? "#141414" : "rgba(255,255,255,.7)",
          transition: "all .15s" }}>{label}</button>
      ))}
    </div>
  );
}

function App() {
  const [screen, setScreen] = React.useState("auth"); // auth | community | settings | preview
  const [activeSlug, setActiveSlug] = React.useState(COMMUNITIES[0].slug);
  const [createOpen, setCreateOpen] = React.useState(false);
  const community = COMMUNITIES.find((c) => c.slug === activeSlug) || COMMUNITIES[0];

  const shell = (content) => (
    <div style={{ position: "absolute", inset: 0, display: "flex", gap: 8, background: "var(--bg-light-secondary)", padding: 8, boxSizing: "border-box" }}>
      <Rail active={activeSlug} communities={COMMUNITIES}
        onSelectCommunity={(s) => { setActiveSlug(s); setScreen("community"); }}
        onLogoClick={() => setScreen("preview")}
        onCreate={() => setCreateOpen(true)}
        onOpenSettings={() => setScreen("settings")} />
      <div style={{ flex: 1, background: "#fff", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", minWidth: 0 }}>
        {content}
      </div>
      <CreateModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );

  let body;
  if (screen === "auth") body = <AuthScreen onContinue={() => setScreen("community")} />;
  else if (screen === "preview") body = <CommunityPreview onBack={() => setScreen("auth")} />;
  else if (screen === "settings") body = shell(<SettingsScreen />);
  else body = shell(<CommunityApp community={community} />);

  return (<>{body}<ScreenSwitcher screen={screen} set={setScreen} /></>);
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
