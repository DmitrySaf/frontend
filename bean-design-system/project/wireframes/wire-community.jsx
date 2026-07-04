// wire-community.jsx — Bean wireframe: community Posts, Courses (player), photo dropdown menu

// ---- Chat tab (Discord-style channel: message stream + composer) ----
function ChatMessage({ name, time, lines, last }) {
  return (
    <div style={{ display: "flex", gap: 12, padding: "10px 0" }}>
      <WAvatar size={40} icon="user" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: WC.ink }}>{name}</span>
          <span style={{ fontSize: 11, color: WC.muted, fontFamily: WC.mono }}>{time}</span>
        </div>
        <div style={{ marginTop: 5 }}><WLines n={lines} last={last} /></div>
      </div>
    </div>
  );
}
function ChannelTitleBar({ type = "chat", label }) {
  return (
    <div style={{ flex: "none", borderBottom: `1px solid ${WC.line}`, padding: "13px 24px", display: "flex", alignItems: "center", gap: 9, background: "#fff" }}>
      <WIcon name={WCHAN_TYPE[type].icon} size={19} color={WC.muted} />
      <span style={{ fontSize: 15, fontWeight: 700, color: WC.ink }}>{label}</span>
      <WPill style={{ marginLeft: 4 }}>{WCHAN_TYPE[type].name}</WPill>
    </div>
  );
}
function ScreenCommunityChat() {
  return (
    <WAppFrame railActive="community">
      <WCommunityShell active="chat">
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <ChannelTitleBar type="chat" label="общий-чат" />
          <div style={{ flex: 1, minHeight: 0, overflow: "hidden", padding: "12px 24px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0 12px" }}>
              <div style={{ flex: 1, height: 1, background: WC.line }} />
              <WNote>сегодня</WNote>
              <div style={{ flex: 1, height: 1, background: WC.line }} />
            </div>
            <ChatMessage name="Мария К." time="14:02" lines={2} last="60%" />
            <ChatMessage name="Олег Д." time="14:05" lines={1} last="38%" />
            <ChatMessage name="Аркадий П. · автор" time="14:11" lines={3} last="50%" />
            <ChatMessage name="Иван П." time="14:20" lines={1} last="46%" />
          </div>
          <div style={{ flex: "none", padding: "12px 24px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", border: `1px solid ${WC.line}`, borderRadius: 14, background: WC.recess }}>
              <WIcon name="plus" size={20} color={WC.muted} />
              <span style={{ flex: 1, fontSize: 14, color: WC.muted }}>Написать в #общий-чат…</span>
              <WIcon name="smile" size={20} color={WC.muted} />
              <WIcon name="send" size={20} color={WC.sub} />
            </div>
          </div>
        </div>
      </WCommunityShell>
    </WAppFrame>
  );
}

// ---- Add-channel modal: pick one of 3 types + name + parent category ----
function TypePick({ type, selected }) {
  const m = WCHAN_TYPE[type];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "16px 10px", borderRadius: 13,
      border: `1px solid ${selected ? WC.lineStrong : WC.line}`, background: selected ? WC.fill : "#fff", boxShadow: selected ? `inset 0 0 0 1px ${WC.lineStrong}` : "none" }}>
      <WIcon name={m.icon} size={22} color={selected ? WC.ink : WC.sub} />
      <span style={{ fontSize: 13, fontWeight: 600, color: selected ? WC.ink : WC.sub }}>{m.name}</span>
    </div>
  );
}
function AddChannelModal() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(20,20,20,.32)", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 460, background: "#fff", border: `1px solid ${WC.line}`, borderRadius: 18, boxShadow: "0 18px 50px rgba(0,0,0,.22)", padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <WHeading title="Новый таб" size={20} />
          <WIcon name="x" size={20} color={WC.muted} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <WLabel>Тип</WLabel>
          <div style={{ display: "flex", gap: 10 }}>
            <TypePick type="chat" selected />
            <TypePick type="posts" />
            <TypePick type="courses" />
          </div>
        </div>
        <WInput label="Название таба" placeholder="например, общий-чат" />
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <WLabel>Категория</WLabel>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: `1px solid ${WC.line}`, borderRadius: 14, padding: "0 14px", height: 44 }}>
            <span style={{ flex: 1, fontSize: 14, color: WC.ink, fontFamily: WC.font }}>Начало</span>
            <WIcon name="chevron-down" size={16} color={WC.muted} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <WBtn variant="ghost">Отмена</WBtn>
          <WBtn icon="plus">Создать</WBtn>
        </div>
      </div>
    </div>
  );
}
function ScreenCommunityAddChannel() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <ScreenCommunityChat />
      <AddChannelModal />
    </div>
  );
}

// ---- Posts tab (Substack-style: composer + article list) ----
function PostComposer() {
  return (
    <WCard pad={14} style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <WAvatar size={40} icon="user" />
      <div style={{ flex: 1, padding: "11px 14px", border: `1px solid ${WC.line}`, borderRadius: 12, background: WC.recess, fontSize: 14, color: WC.muted }}>
        Написать пост для сообщества…
      </div>
      <WBtn icon="image" variant="secondary" size="s" />
      <WBtn size="s">Опубликовать</WBtn>
    </WCard>
  );
}

function PostCard({ pinned }) {
  return (
    <WCard pad={0} style={{ overflow: "hidden" }}>
      <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <WAvatar size={36} icon="user" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: WC.ink }}>Аркадий П. <span style={{ color: WC.muted, fontWeight: 400 }}>· автор</span></div>
            <div style={{ fontSize: 12, color: WC.muted }}>3 часа назад</div>
          </div>
          {pinned && <WPill icon="pin">Закреплено</WPill>}
          <WIcon name="more-horizontal" size={18} color={WC.muted} />
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: WC.ink, lineHeight: 1.25 }}>Запуск нового потока курса уже на этой неделе</div>
        <WLines n={2} last="55%" />
      </div>
      <WImg h={180} radius={0} label="обложка поста" />
      <div style={{ padding: "12px 18px", display: "flex", alignItems: "center", gap: 20, borderTop: `1px solid ${WC.line}` }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: WC.sub }}><WIcon name="heart" size={17} color={WC.sub} /> 128</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: WC.sub }}><WIcon name="message-circle" size={17} color={WC.sub} /> 24</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: WC.sub }}><WIcon name="share" size={17} color={WC.sub} /> Поделиться</span>
        <div style={{ flex: 1 }} />
        <WIcon name="bookmark" size={17} color={WC.muted} />
      </div>
    </WCard>
  );
}

function TextPostCard() {
  return (
    <WCard pad={18} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <WAvatar size={36} icon="user" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: WC.ink }}>Мария К.</div>
          <div style={{ fontSize: 12, color: WC.muted }}>Вчера, 18:40</div>
        </div>
        <WIcon name="more-horizontal" size={18} color={WC.muted} />
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: WC.ink }}>Делюсь конспектом с прошлого вебинара</div>
      <WLines n={3} last="40%" />
      <div style={{ display: "flex", alignItems: "center", gap: 20, paddingTop: 4 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: WC.sub }}><WIcon name="heart" size={17} color={WC.sub} /> 42</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: WC.sub }}><WIcon name="message-circle" size={17} color={WC.sub} /> 8</span>
      </div>
    </WCard>
  );
}

function ScreenCommunityPosts() {
  return (
    <WAppFrame railActive="community">
      <WCommunityShell active="posts">
        <div style={{ height: "100%", overflow: "hidden", padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <WHeading title="Посты" />
            <div style={{ display: "flex", gap: 8 }}>
              {["Все", "Объявления", "Обсуждения"].map((t, i) => <WPill key={t} style={i === 0 ? { background: WC.fill, color: WC.ink, borderColor: WC.lineStrong } : {}}>{t}</WPill>)}
            </div>
          </div>
          <div style={{ maxWidth: 720, width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
            <PostComposer />
            <PostCard pinned />
            <TextPostCard />
          </div>
        </div>
      </WCommunityShell>
    </WAppFrame>
  );
}

// ---- Courses tab (player view: lesson list + content pane) ----
function LessonItem({ label, active, done, locked, num }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10,
      background: active ? WC.fill : "transparent", boxShadow: active ? `inset 0 0 0 1px ${WC.lineStrong}` : "none" }}>
      <div style={{ width: 22, height: 22, borderRadius: "50%", border: `1px solid ${done ? WC.lineStrong : WC.line}`, background: done ? WC.fill : "#fff", display: "grid", placeItems: "center", flex: "none" }}>
        <WIcon name={locked ? "lock" : done ? "check" : "play"} size={12} color={WC.sub} />
      </div>
      <span style={{ flex: 1, fontSize: 13, fontWeight: active ? 600 : 500, color: active ? WC.ink : WC.sub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
      <span style={{ fontSize: 11, color: WC.muted, fontFamily: WC.mono }}>{num}</span>
    </div>
  );
}

function CourseLessonList() {
  return (
    <div style={{ width: 256, flex: "none", borderRight: `1px solid ${WC.line}`, display: "flex", flexDirection: "column", background: "#fff" }}>
      <div style={{ padding: "16px 16px 12px", borderBottom: `1px solid ${WC.line}` }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: WC.ink }}>Основы личного бренда</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
          <div style={{ flex: 1, height: 6, borderRadius: 3, background: WC.fill, overflow: "hidden" }}>
            <div style={{ width: "40%", height: "100%", background: WC.primary }} />
          </div>
          <span style={{ fontSize: 11, color: WC.muted, fontFamily: WC.mono }}>4/10</span>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "hidden", padding: 10, display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: WC.muted, textTransform: "uppercase", letterSpacing: ".04em", padding: "4px 12px 6px" }}>Модуль 1 · Введение</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <LessonItem label="Зачем нужен бренд" done num="6:12" />
            <LessonItem label="Аудитория и ниша" done num="9:40" />
            <LessonItem label="Позиционирование" active num="12:05" />
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: WC.muted, textTransform: "uppercase", letterSpacing: ".04em", padding: "4px 12px 6px" }}>Модуль 2 · Контент</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <LessonItem label="Контент-план" num="8:30" />
            <LessonItem label="Съёмка и монтаж" locked num="14:20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenCommunityCourses() {
  return (
    <WAppFrame railActive="community">
      <WCommunityShell active="courses">
        <div style={{ height: "100%", display: "flex", overflow: "hidden" }}>
          <CourseLessonList />
          <div style={{ flex: 1, minWidth: 0, overflow: "hidden", padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
            <WImg h={300} radius={14} label="видео урока" icon="play-circle" iconSize={40} />
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <WPill>Урок 3 из 10</WPill><WPill icon="clock">12:05</WPill>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: WC.ink }}>Позиционирование: как выделиться</div>
            <WLines n={3} last="60%" />
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
              <WBtn variant="secondary" icon="arrow-left">Назад</WBtn>
              <WBtn iconRight="arrow-right">Следующий урок</WBtn>
              <div style={{ flex: 1 }} />
              <WBtn variant="ghost" icon="check">Отметить пройденным</WBtn>
            </div>
          </div>
        </div>
      </WCommunityShell>
    </WAppFrame>
  );
}

// ---- Community photo dropdown menu (admin / member) ----
function MenuItem({ icon, label, danger }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 12px", borderRadius: 10, fontSize: 14, fontWeight: 500, color: danger ? WC.sub : WC.ink }}>
      <WIcon name={icon} size={18} color={WC.sub} />
      <span style={{ flex: 1 }}>{label}</span>
    </div>
  );
}

function CommunityMenu({ admin }) {
  return (
    <div style={{ position: "absolute", top: 132, left: 10, width: 236, background: "#fff", border: `1px solid ${WC.line}`,
      borderRadius: 14, boxShadow: "0 14px 40px rgba(0,0,0,.16)", padding: 6, zIndex: 20 }}>
      {admin && (
        <React.Fragment>
          <div style={{ padding: "4px 12px 2px" }}><WNote>только для админа</WNote></div>
          <MenuItem icon="settings" label="Настройки сообщества" />
          <MenuItem icon="palette" label="Внешний вид" />
          <MenuItem icon="layout-dashboard" label="Дашборд" />
          <div style={{ height: 1, background: WC.line, margin: "5px 8px" }} />
        </React.Fragment>
      )}
      <MenuItem icon="user-plus" label="Пригласить в сообщество" />
      <MenuItem icon="log-out" label="Покинуть сообщество" danger />
    </div>
  );
}

function ScreenCommunityMenu({ admin }) {
  return (
    <WAppFrame railActive="community">
      <div style={{ position: "relative", flex: "none", display: "flex" }}>
        <WCommunitySidebar active="posts" menuOpen />
        <CommunityMenu admin={admin} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div style={{ flex: 1, background: WC.recess, opacity: 0.6 }} />
      </div>
    </WAppFrame>
  );
}

Object.assign(window, { ScreenCommunityPosts, ScreenCommunityCourses, ScreenCommunityChat, ScreenCommunityAddChannel, ScreenCommunityMenu, CommunityMenu });
