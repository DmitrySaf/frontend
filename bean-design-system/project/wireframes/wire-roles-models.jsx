// wire-roles-models.jsx — Bean: role-split exploration
// Shared role/mode helpers + the three "how to split admin vs member" models
// (overview cards), a capability matrix, and a one-screen-three-ways comparison.

// ============================================================
//  Shared helpers used across the role-split wireframes
// ============================================================

// Role chip — annotates which audience an artboard is for.
function RoleTag({ role }) {
  const map = {
    member: { icon: "user", label: "участник" },
    admin: { icon: "shield", label: "админ" },
    edit: { icon: "pencil", label: "режим ред." },
  };
  const m = map[role] || map.member;
  const strong = role === "admin" || role === "edit";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "2px 9px", borderRadius: 7,
      border: `1px ${strong ? "solid" : "dashed"} ${strong ? WC.ink : WC.lineStrong}`,
      background: strong ? WC.ink : WC.recess, color: strong ? "#fff" : WC.sub,
      fontSize: 11, fontWeight: 600, fontFamily: WC.mono, letterSpacing: ".01em" }}>
      <WIcon name={m.icon} size={12} color={strong ? "#fff" : WC.sub} /> {m.label}
    </span>
  );
}

// Contextual "edit this section" entry button — Model A's whole premise.
function SectionEditBtn({ label = "Редактировать", admin = true }) {
  if (!admin) return null;
  return (
    <button style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 12,
      border: `1px dashed ${WC.lineStrong}`, background: WC.recess, color: WC.ink, fontFamily: WC.font,
      fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
      <WIcon name="pencil" size={15} color={WC.sub} /> {label}
    </button>
  );
}

// The sticky "you are editing" bar that appears once Model A's toggle is ON.
function EditModeBar({ label = "Режим редактирования", hint }) {
  return (
    <div style={{ flex: "none", display: "flex", alignItems: "center", gap: 12, padding: "10px 22px",
      background: WC.ink, color: "#fff" }}>
      <WIcon name="pencil" size={16} color="#fff" />
      <span style={{ fontSize: 13, fontWeight: 700 }}>{label}</span>
      {hint && <span style={{ fontSize: 12, color: "rgba(255,255,255,.6)", fontFamily: WC.mono }}>{hint}</span>}
      <div style={{ flex: 1 }} />
      <button style={{ padding: "6px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,.3)", background: "transparent", color: "#fff", fontFamily: WC.font, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Отмена</button>
      <button style={{ padding: "6px 14px", borderRadius: 10, border: "1px solid #fff", background: "#fff", color: WC.ink, fontFamily: WC.font, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><WIcon name="check" size={15} color={WC.ink} />Сохранить</button>
    </div>
  );
}

// Dashed "add" affordance row (edit-mode add buttons).
function AddRow({ label, dashed = true, size = 13 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "10px 12px", borderRadius: 11,
      border: dashed ? `1px dashed ${WC.lineStrong}` : "none", color: WC.sub }}>
      <WIcon name="plus" size={size + 3} color={WC.sub} />
      <span style={{ fontSize: size, fontWeight: 600 }}>{label}</span>
    </div>
  );
}

// Drag grip — signals "reorderable in edit mode".
function Grip() {
  return <WIcon name="grip-vertical" size={16} color={WC.muted} style={{ cursor: "grab" }} />;
}

// Small inline icon action (pencil / trash / pin / eye) used on hover/admin rows.
function MicroAction({ icon, danger }) {
  return (
    <div style={{ width: 28, height: 28, borderRadius: 8, display: "grid", placeItems: "center",
      border: `1px solid ${WC.line}`, background: "#fff", flex: "none" }}>
      <WIcon name={icon} size={15} color={WC.sub} />
    </div>
  );
}

// An editable-field shell (shows a value with a faint edit affordance).
function EditField({ value, multiline, h = 44 }) {
  return (
    <div style={{ display: "flex", alignItems: multiline ? "flex-start" : "center", gap: 8, background: "#fff",
      border: `1px solid ${WC.lineStrong}`, borderRadius: 12, padding: multiline ? "12px 14px" : "0 14px",
      height: multiline ? "auto" : h, minHeight: multiline ? h : undefined,
      boxShadow: `0 0 0 3px ${WC.recess}` }}>
      <span style={{ flex: 1, fontSize: 14, color: WC.ink, fontFamily: WC.font, lineHeight: 1.4 }}>{value}</span>
      <WIcon name="pencil" size={14} color={WC.muted} style={{ alignSelf: "flex-start", marginTop: multiline ? 2 : 0 }} />
    </div>
  );
}

// ============================================================
//  Model overview cards
// ============================================================

// A miniature two-pane schematic: "что видит участник | что появляется у админа".
function MiniPane({ title, children, accent }) {
  return (
    <div style={{ flex: 1, minWidth: 0, border: `1px solid ${accent ? WC.ink : WC.line}`, borderRadius: 12,
      background: accent ? "#fff" : WC.recess, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "7px 11px", borderBottom: `1px solid ${WC.line}`, display: "flex", alignItems: "center", gap: 7,
        background: accent ? WC.ink : "transparent" }}>
        <WIcon name={accent ? "shield" : "user"} size={13} color={accent ? "#fff" : WC.muted} />
        <span style={{ fontSize: 11, fontWeight: 700, color: accent ? "#fff" : WC.muted, fontFamily: WC.mono }}>{title}</span>
      </div>
      <div style={{ padding: 11, display: "flex", flexDirection: "column", gap: 7, flex: 1 }}>{children}</div>
    </div>
  );
}

function FauxLine({ w = "100%", strong }) {
  return <div style={{ height: 7, width: w, borderRadius: 4, background: strong ? WC.lineStrong : WC.skeleton }} />;
}
function FauxBtn({ label, dark, dashed }) {
  return (
    <div style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 8,
      background: dark ? WC.ink : dashed ? "transparent" : "#fff", border: `1px ${dashed ? "dashed" : "solid"} ${dark ? WC.ink : WC.lineStrong}`,
      color: dark ? "#fff" : WC.sub, fontSize: 10.5, fontWeight: 700, fontFamily: WC.mono }}>
      {label}
    </div>
  );
}

function ProCon({ pros, cons }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 2 }}>
      {pros.map((p, i) => (
        <div key={"p" + i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <WIcon name="plus" size={14} color={WC.sub} style={{ marginTop: 1 }} />
          <span style={{ fontSize: 12.5, color: WC.sub, lineHeight: 1.4 }}>{p}</span>
        </div>
      ))}
      {cons.map((c, i) => (
        <div key={"c" + i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <WIcon name="minus" size={14} color={WC.muted} style={{ marginTop: 1 }} />
          <span style={{ fontSize: 12.5, color: WC.muted, lineHeight: 1.4 }}>{c}</span>
        </div>
      ))}
    </div>
  );
}

function ModelCard({ n, name, refs, line, lead, member, admin, pros, cons }) {
  return (
    <WCard pad={0} style={{ width: 400, display: "flex", flexDirection: "column", overflow: "hidden", flex: "none" }}>
      <div style={{ padding: "18px 20px 16px", borderBottom: `1px solid ${WC.line}`, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 26, height: 26, borderRadius: 8, background: lead ? WC.ink : WC.fill, color: lead ? "#fff" : WC.sub,
            display: "grid", placeItems: "center", fontSize: 13, fontWeight: 800, fontFamily: WC.mono, flex: "none" }}>{n}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: WC.ink, lineHeight: 1.2 }}>{name}</div>
          </div>
          {lead && <WPill style={{ background: WC.ink, color: "#fff", borderColor: WC.ink }}>основной</WPill>}
        </div>
        <p style={{ margin: 0, fontSize: 13, color: WC.sub, lineHeight: 1.5 }}>{line}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {refs.map((r) => <WPill key={r}>{r}</WPill>)}
        </div>
      </div>
      <div style={{ padding: 16, display: "flex", gap: 10, background: WC.fillSoft }}>
        <MiniPane title="участник">{member}</MiniPane>
        <MiniPane title="админ" accent>{admin}</MiniPane>
      </div>
      <div style={{ padding: "16px 20px 20px" }}>
        <ProCon pros={pros} cons={cons} />
      </div>
    </WCard>
  );
}

function ScreenRoleModels() {
  return (
    <div style={{ width: "100%", height: "100%", padding: "36px 40px", background: "#fff", overflow: "hidden", fontFamily: WC.font }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", flexDirection: "column", gap: 8 }}>
        <WHeading title="Три модели разделения «админ ↔ участник»" sub="Одна структура данных, разные права. Вопрос только в том, как право редактировать проявляется в интерфейсе." />
        <div style={{ display: "flex", gap: 18, marginTop: 22 }}>
          <ModelCard
            n="A" lead
            name="Инлайн-режим «Просмотр ↔ Ред.»"
            refs={["Notion", "Whop", "контекстная кнопка"]}
            line="Участник и админ видят один и тот же экран. У админа в шапке раздела — кнопка «Редактировать». Нажал → тот же экран превращается в редактор: появляются drag, +добавить, инлайн-поля, сверху панель «Сохранить / Отмена»."
            member={<React.Fragment>
              <FauxLine w="60%" strong /><FauxLine /><FauxLine w="80%" />
              <FauxBtn label="смотреть" />
            </React.Fragment>}
            admin={<React.Fragment>
              <FauxBtn label="✎ редактировать" dashed />
              <FauxLine w="60%" strong /><FauxLine /><FauxLine w="80%" />
            </React.Fragment>}
            pros={["Ничего лишнего для участника — чистое потребление", "Админ редактирует там же, где смотрит — WYSIWYG, без контекст-свитча", "Меньше всего отдельных экранов в проде"]}
            cons={["Нужно явно «войти» в режим — лишний клик", "Редактор и плеер живут в одном компоненте — сложнее в коде"]}
          />
          <ModelCard
            n="B"
            name="Постоянные контекстные контролы"
            refs={["Discord", "always-on"]}
            line="Режима нет. Админ всегда видит управляющие affordances прямо в ленте: шестерёнки, +добавить, drag-хэндлы, действия по наведению (закрепить / удалить). Правка происходит точечно, без «входа»."
            member={<React.Fragment>
              <FauxLine w="55%" strong /><FauxLine /><FauxLine w="70%" />
            </React.Fragment>}
            admin={<React.Fragment>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}><Grip /><FauxLine w="45%" strong /><WIcon name="settings" size={13} color={WC.muted} /></div>
              <FauxLine /><FauxLine w="70%" />
              <FauxBtn label="+ добавить" dashed />
            </React.Fragment>}
            pros={["Ноль кликов до правки — всё под рукой", "Привычно тем, кто пришёл из Discord", "Хорошо для частых мелких изменений"]}
            cons={["Интерфейс админа всегда «шумнее»", "Легко случайно нажать управляющее действие", "Грань между «смотрю» и «меняю» размыта"]}
          />
          <ModelCard
            n="C"
            name="Отдельная «Студия» / бэкстейдж"
            refs={["Substack", "YouTube Studio"]}
            line="Потребление и управление физически разведены. Участник живёт в сообществе; админ уходит в отдельную зону «Студия» — конструктор курса, очередь модерации, дашборд. Чистое разделение ролей."
            member={<React.Fragment>
              <FauxLine w="60%" strong /><FauxLine /><FauxLine w="75%" />
            </React.Fragment>}
            admin={<React.Fragment>
              <FauxBtn label="↗ открыть студию" dark />
              <div style={{ height: 1, background: WC.line, margin: "2px 0" }} />
              <FauxLine w="40%" strong /><FauxLine /><FauxBtn label="+ урок" dashed />
            </React.Fragment>}
            pros={["Самый мощный редактор — место под сложные инструменты", "Участник вообще не видит «кухню»", "Права и UI разведены максимально явно"]}
            cons={["Контекст-свитч: «смотрю» и «правлю» — разные места", "Дублируется навигация и часть верстки", "Дольше всего разрабатывать"]}
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  Capability matrix — who can do what
// ============================================================
function MatrixRow({ cap, member, admin, last }) {
  const cell = (val) => (
    <div style={{ width: 130, display: "flex", justifyContent: "center", flex: "none" }}>
      {val === true && <WIcon name="check" size={18} color={WC.ink} />}
      {val === false && <WIcon name="minus" size={18} color={WC.muted} />}
      {typeof val === "string" && <span style={{ fontSize: 12, color: WC.sub, fontFamily: WC.mono, textAlign: "center" }}>{val}</span>}
    </div>
  );
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "13px 0", borderBottom: last ? "none" : `1px solid ${WC.line}` }}>
      <span style={{ flex: 1, fontSize: 14, color: WC.ink, fontWeight: 500 }}>{cap}</span>
      {cell(member)}
      {cell(admin)}
    </div>
  );
}

function ScreenRoleMatrix() {
  const rows = [
    ["Смотреть посты и уроки", true, true],
    ["Реакции, комментарии, прогресс", true, true],
    ["Писать пост в ленту", "если открыто", true],
    ["Закреплять / удалять чужой пост", false, true],
    ["Создавать и менять структуру курса", false, true],
    ["Добавлять / переставлять уроки", false, true],
    ["Скрывать черновики от участников", false, true],
    ["Создавать категории и табы", false, true],
    ["Модерация: баны, роли, жалобы", false, true],
    ["Тарифы, доступ, монетизация", false, true],
  ];
  return (
    <div style={{ width: "100%", height: "100%", padding: "36px 40px", background: "#fff", overflow: "hidden", fontFamily: WC.font }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <WHeading title="Матрица прав" sub="Базовое разделение ответственности — не зависит от выбранной модели интерфейса" />
        <WCard pad={24} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", paddingBottom: 12, borderBottom: `1px solid ${WC.lineStrong}` }}>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: WC.muted, textTransform: "uppercase", letterSpacing: ".05em" }}>Возможность</span>
            <div style={{ width: 130, display: "flex", justifyContent: "center" }}><RoleTag role="member" /></div>
            <div style={{ width: 130, display: "flex", justifyContent: "center" }}><RoleTag role="admin" /></div>
          </div>
          {rows.map((r, i) => <MatrixRow key={i} cap={r[0]} member={r[1]} admin={r[2]} last={i === rows.length - 1} />)}
        </WCard>
      </div>
    </div>
  );
}

Object.assign(window, {
  RoleTag, SectionEditBtn, EditModeBar, AddRow, Grip, MicroAction, EditField,
  ScreenRoleModels, ScreenRoleMatrix,
});
