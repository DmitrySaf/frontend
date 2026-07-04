// wire-roles-posts.jsx — Bean role split: POSTS surface
// Member = read + react. Admin = same feed + moderation/pin/publish (Model A).
// Includes the diverging "···" action menu, compose/edit, and moderation queue.

// ---- "···" action menu, role-dependent ----
function PMenuItem({ icon, label, danger }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 12px", borderRadius: 9, fontSize: 13.5, fontWeight: 500, color: danger ? WC.sub : WC.ink }}>
      <WIcon name={icon} size={17} color={WC.sub} />
      <span style={{ flex: 1 }}>{label}</span>
    </div>
  );
}
function PostMenu({ admin, style }) {
  return (
    <div style={{ width: 220, background: "#fff", border: `1px solid ${WC.line}`, borderRadius: 13, boxShadow: "0 14px 40px rgba(0,0,0,.16)", padding: 6, ...style }}>
      {admin ? <React.Fragment>
        <div style={{ padding: "3px 12px 4px" }}><WNote>модерация</WNote></div>
        <PMenuItem icon="pin" label="Закрепить" />
        <PMenuItem icon="pencil" label="Редактировать" />
        <PMenuItem icon="eye-off" label="Скрыть от ленты" />
        <PMenuItem icon="megaphone" label="Сделать объявлением" />
        <div style={{ height: 1, background: WC.line, margin: "5px 8px" }} />
        <PMenuItem icon="trash-2" label="Удалить пост" danger />
      </React.Fragment> : <React.Fragment>
        <PMenuItem icon="bookmark" label="Сохранить" />
        <PMenuItem icon="bell-off" label="Не уведомлять" />
        <PMenuItem icon="share" label="Поделиться" />
        <div style={{ height: 1, background: WC.line, margin: "5px 8px" }} />
        <PMenuItem icon="flag" label="Пожаловаться" danger />
      </React.Fragment>}
    </div>
  );
}

// ---- Post card with role-aware chrome ----
function PostR({ admin, pinned, draft, scheduled }) {
  return (
    <WCard pad={0} style={{ overflow: "hidden", boxShadow: admin ? `0 0 0 1px ${WC.line}` : "none" }}>
      {admin && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", background: WC.recess, borderBottom: `1px solid ${WC.line}` }}>
          <Grip />
          <span style={{ flex: 1, fontSize: 11, color: WC.muted, fontFamily: WC.mono }}>{draft ? "черновик · не виден участникам" : scheduled ? "запланировано на 5 июня, 10:00" : "опубликовано"}</span>
          <MicroAction icon="pin" /><MicroAction icon="pencil" /><MicroAction icon="eye-off" /><MicroAction icon="trash-2" danger />
        </div>
      )}
      <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <WAvatar size={36} icon="user" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: WC.ink }}>Аркадий П. <span style={{ color: WC.muted, fontWeight: 400 }}>· автор</span></div>
            <div style={{ fontSize: 12, color: WC.muted }}>3 часа назад</div>
          </div>
          {pinned && <WPill icon="pin">Закреплено</WPill>}
          {draft && <WPill>черновик</WPill>}
          {scheduled && <WPill icon="clock">запланировано</WPill>}
          <WIcon name="more-horizontal" size={18} color={WC.muted} />
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: WC.ink, lineHeight: 1.25 }}>Запуск нового потока курса уже на этой неделе</div>
        <WLines n={2} last="55%" />
      </div>
      <WImg h={170} radius={0} label="обложка поста" />
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

function TextPostR({ admin }) {
  return (
    <WCard pad={0} style={{ overflow: "hidden" }}>
      {admin && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", background: WC.recess, borderBottom: `1px solid ${WC.line}` }}>
          <Grip />
          <span style={{ flex: 1, fontSize: 11, color: WC.muted, fontFamily: WC.mono }}>от участника · Мария К.</span>
          <MicroAction icon="pin" /><MicroAction icon="eye-off" /><MicroAction icon="trash-2" danger />
        </div>
      )}
      <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
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
      </div>
    </WCard>
  );
}

// ---- Composer (member: simple; admin: with publishing controls) ----
function ComposerR({ admin }) {
  return (
    <WCard pad={14} style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <WAvatar size={40} icon="user" />
      <div style={{ flex: 1, padding: "11px 14px", border: `1px solid ${WC.line}`, borderRadius: 12, background: WC.recess, fontSize: 14, color: WC.muted }}>
        {admin ? "Написать пост или объявление…" : "Написать пост для сообщества…"}
      </div>
      {admin && <WBtn icon="megaphone" variant="secondary" size="s">Объявление</WBtn>}
      <WBtn icon="image" variant="secondary" size="s" />
      <WBtn size="s">{admin ? "Опубликовать" : "Отправить"}</WBtn>
    </WCard>
  );
}

function PostsHeader({ mode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <WHeading title="Посты" />
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {["Все", "Объявления", "Обсуждения"].map((t, i) => <WPill key={t} style={i === 0 ? { background: WC.fill, color: WC.ink, borderColor: WC.lineStrong } : {}}>{t}</WPill>)}
        {mode === "member" && <RoleTag role="member" />}
        {mode === "admin" && <React.Fragment><div style={{ width: 8 }} /><RoleTag role="admin" /><SectionEditBtn label="Модерация" /></React.Fragment>}
      </div>
    </div>
  );
}

function PostsBody({ mode }) {
  const admin = mode === "admin";
  return (
    <div style={{ height: "100%", overflow: "hidden", padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
      <PostsHeader mode={mode} />
      <div style={{ maxWidth: 720, width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
        <ComposerR admin={admin} />
        {admin && <PostR admin scheduled />}
        <PostR admin={admin} pinned />
        <TextPostR admin={admin} />
      </div>
    </div>
  );
}

function PostScreen({ mode }) {
  return (
    <WAppFrame railActive="community">
      <WCommunityShell active="posts">
        {mode === "compose"
          ? <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <EditModeBar label="Новый пост" hint="черновик не виден участникам, пока не опубликован" />
              <ComposeForm />
            </div>
          : <PostsBody mode={mode} />}
      </WCommunityShell>
    </WAppFrame>
  );
}

// ---- Admin compose / edit form ----
function ComposeForm() {
  return (
    <div style={{ flex: 1, overflow: "hidden", padding: 24, display: "flex", gap: 24, background: "#fff" }}>
      <div style={{ flex: 1, minWidth: 0, maxWidth: 600, display: "flex", flexDirection: "column", gap: 16 }}>
        <EditField value="Запуск нового потока курса уже на этой неделе" />
        <EditField multiline h={150} value="Текст поста. Можно прикрепить обложку, выбрать аудиторию и закрепить пост в ленте. Здесь же добавляются вложения и ссылки." />
        <div style={{ position: "relative" }}>
          <WImg h={150} radius={14} label="обложка поста" icon="image" />
          <div style={{ position: "absolute", right: 12, bottom: 12 }}><WBtn variant="secondary" size="s" icon="upload">Загрузить</WBtn></div>
        </div>
      </div>
      <div style={{ width: 280, flex: "none", display: "flex", flexDirection: "column", gap: 16 }}>
        <WLabel>Публикация</WLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {[["megaphone", "Объявление", "уведомить всех", false], ["pin", "Закрепить в ленте", "сверху списка", true]].map(([ic, t, d, on]) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 11, padding: 12, borderRadius: 13, border: `1px solid ${WC.line}` }}>
              <WIcon name={ic} size={18} color={WC.sub} />
              <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600, color: WC.ink }}>{t}</div><div style={{ fontSize: 11, color: WC.muted }}>{d}</div></div>
              <WToggle on={on} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <WLabel>Кому видно</WLabel>
          <div style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid ${WC.line}`, borderRadius: 12, padding: "0 14px", height: 44 }}>
            <WIcon name="users" size={16} color={WC.sub} />
            <span style={{ flex: 1, fontSize: 14, color: WC.ink }}>Все участники</span>
            <WIcon name="chevron-down" size={16} color={WC.muted} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <WLabel>Когда</WLabel>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, textAlign: "center", padding: "9px 0", borderRadius: 11, border: `1px solid ${WC.lineStrong}`, background: WC.fill, fontSize: 13, fontWeight: 600, color: WC.ink }}>Сейчас</div>
            <div style={{ flex: 1, textAlign: "center", padding: "9px 0", borderRadius: 11, border: `1px solid ${WC.line}`, fontSize: 13, fontWeight: 600, color: WC.sub }}>По расписанию</div>
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <WBtn variant="ghost" size="s">Сохранить черновик</WBtn>
      </div>
    </div>
  );
}

const ScreenPostsMember = () => <PostScreen mode="member" />;
const ScreenPostsAdmin = () => <PostScreen mode="admin" />;
const ScreenPostsCompose = () => <PostScreen mode="compose" />;

// ---- The diverging action menu, shown on dimmed feed ----
function PostMenuScreen({ admin }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <ScreenPostsMember />
      <div style={{ position: "absolute", inset: 0, background: "rgba(20,20,20,.28)" }} />
      <div style={{ position: "absolute", top: 150, left: "50%", transform: "translateX(120px)" }}>
        <PostMenu admin={admin} />
        <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end" }}><RoleTag role={admin ? "admin" : "member"} /></div>
      </div>
    </div>
  );
}
const ScreenPostMenuMember = () => <PostMenuScreen admin={false} />;
const ScreenPostMenuAdmin = () => <PostMenuScreen admin={true} />;

// ---- Moderation queue (admin-only state) ----
function QueueRow({ kind, name, body, reports }) {
  return (
    <WCard pad={16} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <WAvatar size={40} icon="user" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: WC.ink }}>{name}</span>
          {kind === "report" ? <WPill icon="flag">{reports} жалобы</WPill> : <WPill icon="clock">ждёт одобрения</WPill>}
        </div>
        <div style={{ fontSize: 14, color: WC.sub, marginTop: 6, lineHeight: 1.45 }}>{body}</div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          {kind === "report"
            ? <React.Fragment><WBtn size="s" variant="secondary" icon="check">Оставить</WBtn><WBtn size="s" variant="ghost" icon="eye-off">Скрыть</WBtn><WBtn size="s" variant="ghost" icon="trash-2">Удалить</WBtn></React.Fragment>
            : <React.Fragment><WBtn size="s" icon="check">Одобрить</WBtn><WBtn size="s" variant="ghost" icon="x">Отклонить</WBtn></React.Fragment>}
        </div>
      </div>
    </WCard>
  );
}

function ScreenPostsQueue() {
  return (
    <WAppFrame railActive="community">
      <WCommunityShell active="posts">
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <EditModeBar label="Модерация ленты" hint="видно только админам и модераторам" />
          <div style={{ flex: 1, overflow: "hidden", padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ maxWidth: 720, width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <WPill style={{ background: WC.fill, color: WC.ink, borderColor: WC.lineStrong }}>На одобрение · 2</WPill>
                <WPill>Жалобы · 1</WPill>
                <WPill>Скрытые</WPill>
              </div>
              <QueueRow kind="pending" name="Иван П." body="Хочу запостить ссылку на свой телеграм-канал — это ок?" />
              <QueueRow kind="pending" name="Ольга С." body="Конспект третьего модуля, делюсь со всеми." />
              <QueueRow kind="report" name="Гость 4821" reports={3} body="Спам-сообщение со ссылкой на сторонний ресурс." />
            </div>
          </div>
        </div>
      </WCommunityShell>
    </WAppFrame>
  );
}

Object.assign(window, {
  ScreenPostsMember, ScreenPostsAdmin, ScreenPostsCompose,
  ScreenPostMenuMember, ScreenPostMenuAdmin, ScreenPostsQueue, PostMenu,
});
