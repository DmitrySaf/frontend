// Rail.jsx — Bean left icon rail (community switcher + profile button)
function RailIconBtn({ icon, primary, onClick, title }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button title={title} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: 48, height: 48, borderRadius: 16, border: 0, cursor: "pointer", flex: "none",
        display: "grid", placeItems: "center", transition: "background .15s",
        background: primary ? "var(--primary-600)" : hover ? "var(--gray-100)" : "transparent",
        color: primary ? "#fff" : "var(--text-secondary)",
        boxShadow: primary ? "var(--shadow-sm)" : "none",
      }}>
      <Icon name={icon} size={24} />
    </button>
  );
}

function CommunityAvatar({ emoji, active, onClick, title }) {
  return (
    <div onClick={onClick} title={title} style={{ position: "relative", cursor: "pointer", flex: "none" }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12, background: "#fff", display: "grid", placeItems: "center",
        fontSize: 24, boxShadow: "var(--shadow-sm)", transition: "opacity .15s",
      }}>{emoji}</div>
      {active && <div style={{ position: "absolute", right: -5, top: "50%", transform: "translateY(-50%)",
        width: 3, height: 14, background: "#000", borderRadius: "0 4px 4px 0" }} />}
    </div>
  );
}

function ProfileButton({ onOpenSettings }) {
  return (
    <div className="bean-profile" style={{
      width: 60, height: 60, background: "#fff", borderRadius: 18,
      boxShadow: "inset 0 0 0 1px var(--gray-200)", display: "flex", alignItems: "center",
      overflow: "hidden", transition: "width .3s ease, box-shadow .3s", padding: 4, gap: 6, boxSizing: "border-box",
    }}>
      <div className="bean-profile-main" style={{ display: "flex", alignItems: "center", minWidth: 0, flex: 1,
        cursor: "pointer", borderRadius: 12, padding: 4 }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--secondary-600)",
          display: "grid", placeItems: "center", fontSize: 22, flex: "none" }}>🐼</div>
        <div className="bean-profile-meta" style={{ display: "flex", flexDirection: "column", minWidth: 0, padding: "0 8px" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-900)", whiteSpace: "nowrap" }}>Super Admin</span>
          <span style={{ fontSize: 12, color: "var(--gray-500)", whiteSpace: "nowrap" }}>@super_admin</span>
        </div>
      </div>
      <div className="bean-profile-actions" style={{ display: "flex", gap: 4, flex: "none", paddingRight: 2 }}>
        <RailIconBtn icon="more-horizontal" title="Ещё" />
        <RailIconBtn icon="settings" onClick={onOpenSettings} title="Настройки" />
      </div>
    </div>
  );
}

function Rail({ active, communities, onSelectCommunity, onLogoClick, onCreate, onOpenSettings }) {
  return (
    <div style={{ width: 60, display: "flex", flexDirection: "column", flex: "none" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
        <div onClick={onLogoClick} style={{ cursor: "pointer" }}><BeanMark size={48} radius={16} /></div>
        <RailIconBtn icon="message-circle-more" title="Сообщения" />
        <RailIconBtn icon="search" title="Поиск" />
        {communities.map((c) => (
          <CommunityAvatar key={c.slug} emoji={c.emoji} active={active === c.slug} title={c.name}
            onClick={() => onSelectCommunity(c.slug)} />
        ))}
        <RailIconBtn icon="plus" primary onClick={onCreate} title="Создать сообщество" />
      </div>
      <ProfileButton onOpenSettings={onOpenSettings} />
      <style>{`
        .bean-profile:hover { width: 300px !important; box-shadow: inset 0 0 0 1px var(--gray-200), var(--shadow-card) !important; }
        .bean-profile-main:hover { background: var(--gray-100); }
        .bean-profile-meta, .bean-profile-actions { opacity: 0; pointer-events: none; transition: opacity .25s; }
        .bean-profile:hover .bean-profile-meta, .bean-profile:hover .bean-profile-actions { opacity: 1; pointer-events: auto; }
      `}</style>
    </div>
  );
}
Object.assign(window, { Rail, RailIconBtn });
