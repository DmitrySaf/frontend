// wire-roles-courses.jsx — Bean role split: COURSES surface
// Member = player. Admin = same screen + "Редактировать курс" → inline
// constructor (Model A). Plus Model B (always-on) and Model C (studio) variants.

// ---- Top bar above the course body ----
function CourseTopBar({ mode }) {
  return (
    <div style={{ flex: "none", display: "flex", alignItems: "center", gap: 12, padding: "11px 22px", borderBottom: `1px solid ${WC.line}`, background: "#fff" }}>
      <WBtn variant="ghost" size="s" icon="arrow-left" />
      <span style={{ fontSize: 14, fontWeight: 600, color: WC.sub }}>Курс · <span style={{ color: WC.ink }}>Основы личного бренда</span></span>
      <div style={{ flex: 1 }} />
      {mode === "member" && <RoleTag role="member" />}
      {mode === "adminView" && <React.Fragment>
        <RoleTag role="admin" />
        <SectionEditBtn label="Редактировать курс" />
      </React.Fragment>}
    </div>
  );
}

// ---- Lesson row (varies by mode) ----
function CLesson({ label, num, active, done, locked, draft, edit, addingHere }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 10px", borderRadius: 10,
      background: active ? WC.fill : "transparent", boxShadow: active ? `inset 0 0 0 1px ${WC.lineStrong}` : "none",
      border: addingHere ? `1px dashed ${WC.lineStrong}` : "1px solid transparent" }}>
      {edit && <Grip />}
      <div style={{ width: 22, height: 22, borderRadius: "50%", border: `1px solid ${done ? WC.lineStrong : WC.line}`, background: done ? WC.fill : "#fff", display: "grid", placeItems: "center", flex: "none" }}>
        <WIcon name={locked ? "lock" : done ? "check" : edit ? "video" : "play"} size={12} color={WC.sub} />
      </div>
      <span style={{ flex: 1, fontSize: 13, fontWeight: active ? 600 : 500, color: active ? WC.ink : WC.sub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
      {draft && <WPill style={{ padding: "1px 7px", fontSize: 10 }}>черновик</WPill>}
      {edit ? <React.Fragment><MicroAction icon="pencil" /><MicroAction icon="trash-2" danger /></React.Fragment>
        : <span style={{ fontSize: 11, color: WC.muted, fontFamily: WC.mono }}>{num}</span>}
    </div>
  );
}

function CModule({ title, edit, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 10px 6px" }}>
        {edit && <Grip />}
        <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: WC.muted, textTransform: "uppercase", letterSpacing: ".04em" }}>{title}</span>
        {edit && <WIcon name="pencil" size={13} color={WC.muted} />}
      </div>
      {children}
    </div>
  );
}

function CourseSide({ mode }) {
  const edit = mode === "edit";
  if (mode === "empty") {
    return (
      <div style={{ width: 264, flex: "none", borderRight: `1px solid ${WC.line}`, background: "#fff", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
        <EditField value="Новый курс" />
        <div style={{ flex: 1 }} />
        <AddRow label="Добавить модуль" />
      </div>
    );
  }
  return (
    <div style={{ width: 264, flex: "none", borderRight: `1px solid ${WC.line}`, display: "flex", flexDirection: "column", background: "#fff" }}>
      <div style={{ padding: "16px 14px 12px", borderBottom: `1px solid ${WC.line}` }}>
        {edit ? <EditField value="Основы личного бренда" />
          : <React.Fragment>
            <div style={{ fontSize: 14, fontWeight: 700, color: WC.ink }}>Основы личного бренда</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <div style={{ flex: 1, height: 6, borderRadius: 3, background: WC.fill, overflow: "hidden" }}>
                <div style={{ width: "40%", height: "100%", background: WC.primary }} />
              </div>
              <span style={{ fontSize: 11, color: WC.muted, fontFamily: WC.mono }}>4/10</span>
            </div>
          </React.Fragment>}
      </div>
      <div style={{ flex: 1, overflow: "hidden", padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
        <CModule title="Модуль 1 · Введение" edit={edit}>
          <CLesson label="Зачем нужен бренд" done num="6:12" edit={edit} />
          <CLesson label="Аудитория и ниша" done num="9:40" edit={edit} />
          <CLesson label="Позиционирование" active num="12:05" edit={edit} />
        </CModule>
        {edit && <AddRow label="Урок в модуль 1" size={12} />}
        <CModule title="Модуль 2 · Контент" edit={edit}>
          <CLesson label="Контент-план" num="8:30" edit={edit} />
          {edit
            ? <CLesson label="Съёмка и монтаж" draft edit num="14:20" />
            : <CLesson label="Съёмка и монтаж" locked num="14:20" />}
        </CModule>
        {edit && <React.Fragment><AddRow label="Урок в модуль 2" size={12} /><div style={{ height: 6 }} /><AddRow label="Добавить модуль" /></React.Fragment>}
      </div>
    </div>
  );
}

// ---- Content pane ----
function CoursePane({ mode }) {
  if (mode === "empty") {
    return (
      <div style={{ flex: 1, minWidth: 0, display: "grid", placeItems: "center", padding: 24, background: WC.recess }}>
        <div style={{ textAlign: "center", maxWidth: 360, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, border: `1px dashed ${WC.lineStrong}`, display: "grid", placeItems: "center" }}>
            <WIcon name="book-open" size={28} color={WC.muted} />
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: WC.ink }}>В курсе пока нет уроков</div>
          <p style={{ margin: 0, fontSize: 14, color: WC.sub, lineHeight: 1.5 }}>Создайте первый модуль, добавьте в него уроки — видео, текст или тест. Участники увидят курс, когда вы опубликуете.</p>
          <WBtn icon="plus">Создать модуль</WBtn>
        </div>
      </div>
    );
  }
  const edit = mode === "edit";
  return (
    <div style={{ flex: 1, minWidth: 0, overflow: "hidden", padding: 24, display: "flex", flexDirection: "column", gap: 16, background: "#fff" }}>
      <div style={{ position: "relative" }}>
        <WImg h={280} radius={14} label={edit ? "загрузите видео урока" : "видео урока"} icon={edit ? "upload" : "play-circle"} iconSize={38} />
        {edit && <div style={{ position: "absolute", right: 12, bottom: 12 }}><WBtn variant="secondary" size="s" icon="upload">Заменить</WBtn></div>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <WPill>Урок 3 из 10</WPill><WPill icon="clock">12:05</WPill>
        {edit && <React.Fragment><div style={{ flex: 1 }} /><WPill icon="lock">Бесплатно</WPill><span style={{ fontSize: 12, color: WC.sub }}>Публиковать</span><WToggle on /></React.Fragment>}
      </div>
      {edit
        ? <EditField value="Позиционирование: как выделиться" />
        : <div style={{ fontSize: 22, fontWeight: 700, color: WC.ink }}>Позиционирование: как выделиться</div>}
      {edit
        ? <EditField multiline h={88} value="Конспект урока, материалы и задание. Текст редактируется прямо здесь — участник увидит его под видео." />
        : <WLines n={3} last="60%" />}
      <div style={{ flex: 1 }} />
      {edit
        ? <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <WBtn variant="ghost" icon="trash-2">Удалить урок</WBtn>
            <div style={{ flex: 1 }} />
            <WBtn variant="secondary" icon="eye">Предпросмотр как участник</WBtn>
          </div>
        : <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <WBtn variant="secondary" icon="arrow-left">Назад</WBtn>
            <WBtn iconRight="arrow-right">Следующий урок</WBtn>
            <div style={{ flex: 1 }} />
            <WBtn variant="ghost" icon="check">Отметить пройденным</WBtn>
          </div>}
    </div>
  );
}

// ---- Assembled course screen (Model A) ----
function CourseScreen({ mode }) {
  return (
    <WAppFrame railActive="community">
      <WCommunitySidebar active="courses" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {mode === "edit"
          ? <EditModeBar label="Конструктор курса" hint="«Основы личного бренда» · черновики скрыты от участников" />
          : <CourseTopBar mode={mode} />}
        <div style={{ flex: 1, minHeight: 0, display: "flex", overflow: "hidden" }}>
          <CourseSide mode={mode} />
          <CoursePane mode={mode} />
        </div>
      </div>
    </WAppFrame>
  );
}

const ScreenCoursesMember = () => <CourseScreen mode="member" />;
const ScreenCoursesAdminView = () => <CourseScreen mode="adminView" />;
const ScreenCoursesEdit = () => <CourseScreen mode="edit" />;
const ScreenCoursesEmpty = () => <CourseScreen mode="empty" />;

// ---- Add-lesson modal (the "+ урок" affordance, expanded) ----
function AddLessonModal() {
  const types = [["video", "Видео-урок"], ["file-text", "Текст / статья"], ["help-circle", "Тест"], ["mic", "Аудио"]];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <ScreenCoursesEdit />
      <div style={{ position: "absolute", inset: 0, background: "rgba(20,20,20,.34)", display: "grid", placeItems: "center", padding: 24 }}>
        <div style={{ width: 460, maxWidth: "100%", background: "#fff", border: `1px solid ${WC.line}`, borderRadius: 18, boxShadow: "0 18px 50px rgba(0,0,0,.22)", padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <WHeading title="Новый урок" size={20} />
            <WIcon name="x" size={20} color={WC.muted} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <WLabel>Тип урока</WLabel>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {types.map(([ic, lb], i) => (
                <div key={lb} style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 14px", borderRadius: 13, border: `1px solid ${i === 0 ? WC.lineStrong : WC.line}`, background: i === 0 ? WC.fill : "#fff" }}>
                  <WIcon name={ic} size={19} color={i === 0 ? WC.ink : WC.sub} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: i === 0 ? WC.ink : WC.sub }}>{lb}</span>
                </div>
              ))}
            </div>
          </div>
          <WInput label="Название урока" placeholder="например, Позиционирование" />
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <WLabel>Модуль</WLabel>
            <div style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid ${WC.line}`, borderRadius: 14, padding: "0 14px", height: 44 }}>
              <span style={{ flex: 1, fontSize: 14, color: WC.ink }}>Модуль 1 · Введение</span>
              <WIcon name="chevron-down" size={16} color={WC.muted} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <WBtn variant="ghost">Отмена</WBtn>
            <WBtn icon="plus">Создать урок</WBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  Same course, three models (comparison)
// ============================================================

// Model B — always-on controls woven into the player (no mode).
function ScreenCoursesModelB() {
  return (
    <WAppFrame railActive="community">
      <WCommunitySidebar active="courses" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div style={{ flex: "none", display: "flex", alignItems: "center", gap: 10, padding: "11px 22px", borderBottom: `1px solid ${WC.line}`, background: "#fff" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: WC.ink }}>Основы личного бренда</span>
          <div style={{ flex: 1 }} />
          <RoleTag role="admin" />
          <WNote>контролы всегда видны</WNote>
        </div>
        <div style={{ flex: 1, minHeight: 0, display: "flex", overflow: "hidden" }}>
          <CourseSide mode="edit" />
          <CoursePane mode="adminView" />
        </div>
      </div>
    </WAppFrame>
  );
}

// Model C — separate "Студия" constructor (member never sees it).
function ScreenCoursesModelC() {
  return (
    <WAppFrame railActive="community">
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div style={{ flex: "none", display: "flex", alignItems: "center", gap: 12, padding: "12px 22px", borderBottom: `1px solid ${WC.line}`, background: WC.ink, color: "#fff" }}>
          <WIcon name="sliders-horizontal" size={17} color="#fff" />
          <span style={{ fontSize: 14, fontWeight: 700 }}>Студия · Конструктор курса</span>
          <WNote style={{ borderColor: "rgba(255,255,255,.3)", color: "rgba(255,255,255,.7)", background: "transparent" }}>отдельная зона</WNote>
          <div style={{ flex: 1 }} />
          <WBtn variant="secondary" size="s" icon="eye">Открыть как участник</WBtn>
          <WBtn size="s" icon="check">Опубликовать</WBtn>
        </div>
        <div style={{ flex: 1, minHeight: 0, display: "flex", overflow: "hidden" }}>
          <CourseSide mode="edit" />
          <CoursePane mode="edit" />
        </div>
      </div>
    </WAppFrame>
  );
}

Object.assign(window, {
  ScreenCoursesMember, ScreenCoursesAdminView, ScreenCoursesEdit, ScreenCoursesEmpty,
  AddLessonModal, ScreenCoursesModelB, ScreenCoursesModelC,
});
