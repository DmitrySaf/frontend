// wire-shell.jsx — Bean wireframe app shell: icon rail, settings sidebar, community sidebar/header

// ---- Left icon rail (60px) ----
function WRail({ active = "community" }) {
  const railIcon = (icon, on) => (
    <div style={{ width: 44, height: 44, borderRadius: 14, display: "grid", placeItems: "center", flex: "none",
      background: on ? WC.active : "transparent" }}>
      <WIcon name={icon} size={22} color={on ? WC.ink : WC.sub} />
    </div>
  );
  return (
    <div style={{ width: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, flex: "none", paddingTop: 2 }}>
      {/* Bean logo tile */}
      <div style={{ width: 44, height: 44, borderRadius: 14, border: `1px solid ${WC.line}`, background: WC.recess,
        display: "grid", placeItems: "center", flex: "none" }}>
        <WIcon name="bean" size={24} color={WC.ink} stroke={2.2} />
      </div>
      {railIcon("message-circle-more")}
      {railIcon("search")}
      <div style={{ width: 28, height: 1, background: WC.line, margin: "2px 0" }} />
      {/* community avatars */}
      <div style={{ position: "relative" }}>
        <WAvatar size={44} radius={14} icon="users" />
        {active === "community" && <div style={{ position: "absolute", right: -8, top: "50%", transform: "translateY(-50%)", width: 3, height: 16, background: WC.ink, borderRadius: "0 3px 3px 0" }} />}
      </div>
      <WAvatar size={44} radius={14} icon="users" />
      {/* create */}
      <div style={{ width: 44, height: 44, borderRadius: 14, background: WC.primary, display: "grid", placeItems: "center", flex: "none" }}>
        <WIcon name="plus" size={22} color={WC.textOnPrimary} />
      </div>
      <div style={{ flex: 1 }} />
      {/* profile button */}
      <div style={{ width: 44, height: 44, borderRadius: 16, border: `1px solid ${WC.line}`, background: "#fff",
        display: "grid", placeItems: "center", flex: "none" }}>
        <WAvatar size={34} icon="user" />
      </div>
    </div>
  );
}

// ---- App frame: gutter + rail + white rounded content panel ----
function WAppFrame({ railActive = "community", children }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", gap: 8, background: WC.gutter, padding: 8, boxSizing: "border-box", fontFamily: WC.font }}>
      <WRail active={railActive} />
      <div style={{ flex: 1, background: "#fff", border: `1px solid ${WC.line}`, borderRadius: 14, overflow: "hidden", minWidth: 0, display: "flex" }}>
        {children}
      </div>
    </div>
  );
}

// ---- Settings sidebar (230px) ----
const WSETTINGS_TABS = [
  { id: "profile", label: "Профиль", icon: "user" },
  { id: "security", label: "Конфиденциальность", icon: "shield" },
  { id: "verification", label: "Верификация", icon: "badge-check" },
  { id: "payment", label: "Вывод средств", icon: "credit-card" },
  { id: "billing", label: "Транзакции", icon: "receipt-text" },
];

function WSettingsSidebar({ active = "profile" }) {
  return (
    <div style={{ width: 248, flex: "none", borderRight: `1px solid ${WC.line}`, display: "flex", flexDirection: "column", background: "#fff" }}>
      <div style={{ padding: "32px 18px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <WAvatar size={60} icon="user" />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: WC.ink }}>Аркадий</div>
          <div style={{ fontSize: 13, color: WC.muted, fontFamily: WC.mono }}>@arkadiyparovozov</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "0 12px" }}>
        {WSETTINGS_TABS.map((t) => <WTab key={t.id} {...t} active={active === t.id} />)}
      </div>
      <div style={{ height: 1, background: WC.line, margin: "10px 16px" }} />
      <div style={{ padding: "0 12px" }}>
        <WTab icon="log-out" label="Выйти из аккаунта" danger />
      </div>
    </div>
  );
}

// Settings content scroller (left-aligned 640 column)
function WSettingsContent({ children, saveBar }) {
  return (
    <div style={{ flex: 1, position: "relative", minWidth: 0, background: "#fff" }}>
      <div style={{ padding: "40px 40px 40px 36px", maxWidth: 660 }}>
        {children}
      </div>
      {saveBar}
    </div>
  );
}

// ---- Channel type meta (3 types a tab can be) ----
const WCHAN_TYPE = {
  chat: { icon: "hash", name: "Чат" },
  posts: { icon: "newspaper", name: "Посты" },
  courses: { icon: "book-open", name: "Курс" },
};

// Discord-style nesting: categories (any name) hold channels (any type + name)
const WCOMMUNITY_NAV = [
  { cat: "Начало", channels: [
    { id: "chat", type: "chat", label: "общий-чат" },
    { id: "chat-q", type: "chat", label: "вопросы" },
  ] },
  { cat: "Лента", channels: [
    { id: "posts", type: "posts", label: "Посты" },
    { id: "announce", type: "posts", label: "объявления" },
  ] },
  { cat: "Обучение", channels: [
    { id: "courses", type: "courses", label: "Основы бренда" },
  ] },
];

// One channel row (sub-chat)
function WChannelRow({ type, label, active }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 9,
      background: active ? WC.active : "transparent", boxShadow: active ? `inset 0 0 0 1px ${WC.lineStrong}` : "none" }}>
      <WIcon name={WCHAN_TYPE[type].icon} size={17} color={active ? WC.ink : WC.muted} />
      <span style={{ flex: 1, fontSize: 14, fontWeight: active ? 600 : 500, color: active ? WC.ink : WC.sub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
    </div>
  );
}

// Collapsible category header (with + to add a channel)
function WCategoryHeader({ name }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, padding: "12px 6px 4px" }}>
      <WIcon name="chevron-down" size={12} color={WC.muted} />
      <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: WC.muted, textTransform: "uppercase", letterSpacing: ".05em" }}>{name}</span>
      <WIcon name="plus" size={14} color={WC.muted} />
    </div>
  );
}

// ---- Community sidebar (256px): banner photo (with dropdown chevron) + nested nav ----
function WCommunitySidebar({ active = "posts", menuOpen = false, nav = WCOMMUNITY_NAV }) {
  return (
    <div style={{ width: 256, flex: "none", borderRight: `1px solid ${WC.line}`, display: "flex", flexDirection: "column", background: "#fff" }}>
      {/* Banner — clickable photo header that opens the community menu */}
      <div style={{ position: "relative", flex: "none" }}>
        <div style={{ height: 132, background: WC.fillSoft, borderBottom: `1px solid ${WC.line}`, position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", padding: 10 }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100%" y2="100%" stroke={WC.line} strokeWidth="1" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke={WC.line} strokeWidth="1" />
          </svg>
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
              <WAvatar size={40} icon="users" />
              <span style={{ fontSize: 14, fontWeight: 700, color: WC.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>ProFound University</span>
            </div>
            <div style={{ width: 28, height: 28, borderRadius: 9, background: "#fff", border: `1px solid ${WC.line}`, display: "grid", placeItems: "center", flex: "none" }}>
              <WIcon name={menuOpen ? "chevron-up" : "chevron-down"} size={16} color={WC.sub} />
            </div>
          </div>
        </div>
      </div>
      {/* nested categories → channels */}
      <div style={{ flex: 1, padding: "4px 10px 12px", display: "flex", flexDirection: "column", gap: 2, overflow: "hidden" }}>
        {nav.map((c) => (
          <div key={c.cat}>
            <WCategoryHeader name={c.cat} />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {c.channels.map((ch) => <WChannelRow key={ch.id} type={ch.type} label={ch.label} active={active === ch.id} />)}
            </div>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 10px 0", color: WC.muted }}>
          <WIcon name="plus" size={15} color={WC.muted} />
          <span style={{ fontSize: 13, fontWeight: 500 }}>Добавить категорию</span>
        </div>
      </div>
    </div>
  );
}

// ---- Community top header (search + help + bell) ----
function WCommunityHeader({ title }) {
  return (
    <div style={{ borderBottom: `1px solid ${WC.line}`, padding: "11px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "none", background: "#fff" }}>
      <WBtn variant="ghost" size="s" icon="arrow-left" />
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid ${WC.line}`, borderRadius: 12, padding: "8px 12px", width: 260, background: WC.recess }}>
          <WIcon name="search" size={16} color={WC.muted} />
          <span style={{ flex: 1, fontSize: 14, color: WC.muted, fontFamily: WC.font }}>Поиск...</span>
          <WPill style={{ padding: "1px 7px", fontFamily: WC.mono }}>⌘K</WPill>
        </div>
        <WBtn variant="ghost" size="s" icon="help-circle" />
        <WBtn variant="ghost" size="s" icon="bell" />
      </div>
    </div>
  );
}

// Community content wrapper (sidebar + scroll body)
function WCommunityShell({ active, menuOpen, children }) {
  return (
    <React.Fragment>
      <WCommunitySidebar active={active} menuOpen={menuOpen} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div style={{ flex: 1, minHeight: 0, overflow: "hidden", background: "#fff" }}>{children}</div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { WRail, WAppFrame, WSettingsSidebar, WSettingsContent, WSETTINGS_TABS, WCommunitySidebar, WCommunityHeader, WCommunityShell, WCHAN_TYPE, WCOMMUNITY_NAV, WChannelRow, WCategoryHeader });
