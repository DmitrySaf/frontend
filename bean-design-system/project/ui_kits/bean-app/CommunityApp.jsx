// CommunityApp.jsx — Bean community view: sidebar (banner + nav) + header + home

function CollapsibleSection({ title, icon, children, defaultOpen = true }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", gap: 8,
        padding: "0 12px", color: "var(--gray-600)", fontSize: 13, fontWeight: 600, cursor: "pointer",
        textTransform: "uppercase", letterSpacing: ".03em" }}>
        <Icon name={icon} size={16} />
        <span style={{ flex: 1 }}>{title}</span>
        <Icon name={open ? "chevron-down" : "chevron-right"} size={16} />
      </div>
      {open && <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>{children}</div>}
    </div>
  );
}

function CommunityBanner({ name, coverUrl }) {
  if (coverUrl) {
    return (
      <div style={{ position: "relative", height: 140, display: "flex", alignItems: "flex-end", padding: 8 }}>
        <div style={{ position: "absolute", inset: 0, background: `url(${coverUrl}) center/cover`, }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)" }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center",
          justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: "#fff", display: "grid",
              placeItems: "center", fontSize: 22, boxShadow: "var(--shadow-card)" }}>🐼</div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 16, textShadow: "0 1px 2px rgba(0,0,0,.4)" }}>{name}</span>
          </div>
          <button style={menuBtn}><Icon name="chevron-down" size={20} /></button>
        </div>
      </div>
    );
  }
  return (
    <div style={{ height: 60, borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 8px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        <div style={{ width: 48, height: 48, borderRadius: 16, background: "var(--secondary-600)", display: "grid",
          placeItems: "center", fontSize: 22, flex: "none" }}>🐼</div>
        <span style={{ fontWeight: 700, fontSize: 16, color: "var(--gray-900)" }}>{name}</span>
      </div>
      <button style={{ ...menuBtn, color: "var(--text-secondary)" }}><Icon name="chevron-down" size={20} /></button>
    </div>
  );
}
const menuBtn = { width: 32, height: 32, borderRadius: 12, border: 0, background: "transparent",
  color: "#fff", display: "grid", placeItems: "center", cursor: "pointer" };

function CommunitySidebar({ community, activeTab, onTab }) {
  return (
    <div style={{ width: 256, background: "#fff", borderRight: "1px solid var(--border)", display: "flex",
      flexDirection: "column", flex: "none" }}>
      <CommunityBanner name={community.name} coverUrl={community.coverUrl} />
      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
        <Tab icon="home" label="Главная" active={activeTab === "home"} onClick={() => onTab("home")} />
        <CollapsibleSection title="Тест" icon="folder">
          <Tab icon="book-open" label="Курс" active={activeTab === "course"} onClick={() => onTab("course")} />
        </CollapsibleSection>
      </div>
    </div>
  );
}

function CommunityHeader() {
  return (
    <div style={{ borderBottom: "1px solid var(--border)", padding: "12px 24px", display: "flex",
      alignItems: "center", justifyContent: "space-between", flex: "none" }}>
      <Button variant="ghost" size="s" icon="arrow-left" />
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
            color: "var(--gray-400)", display: "inline-flex" }}><Icon name="search" size={16} /></span>
          <input placeholder="Поиск..." style={{ border: "1px solid var(--border)", borderRadius: 14,
            padding: "9px 44px 9px 36px", fontFamily: "var(--font-sans)", fontSize: 14, width: 260, outline: "none" }} />
          <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
            fontSize: 11, fontWeight: 600, color: "var(--tw-blue-700)", background: "var(--tw-blue-100)",
            borderRadius: 6, padding: "2px 6px" }}>⌘K</span>
        </div>
        <Button variant="ghost" size="s" icon="help-circle" />
        <Button variant="ghost" size="s" icon="bell" />
      </div>
    </div>
  );
}

function CommunityHome({ community }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
      <h1 className="bean-page-title" style={{ margin: "0 0 24px" }}>{community.name}</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid var(--border)", padding: 24 }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 20, fontWeight: 600, color: "var(--gray-900)" }}>О сообществе</h2>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: "var(--text-secondary)" }}>{community.about}</p>
        </div>
      </div>
    </div>
  );
}

function CommunityApp({ community }) {
  const [tab, setTab] = React.useState("home");
  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <CommunitySidebar community={community} activeTab={tab} onTab={setTab} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <CommunityHeader />
        {tab === "home"
          ? <CommunityHome community={community} />
          : <div style={{ flex: 1, padding: 24 }}>
              <h1 className="bean-page-title" style={{ margin: "0 0 24px" }}>Курс</h1>
              <p style={{ color: "var(--text-tertiary)", fontSize: 16 }}>Содержимое курса появится здесь.</p>
            </div>}
      </div>
    </div>
  );
}
Object.assign(window, { CommunityApp, CommunitySidebar, CommunityHeader, CommunityHome });
