/* @ds-bundle: {"format":4,"namespace":"BeanDesignSystem_02999c","components":[],"sourceHashes":{"ui_kits/bean-app/AuthScreen.jsx":"dc2266a7eca3","ui_kits/bean-app/CommunityApp.jsx":"b63fdf212fe9","ui_kits/bean-app/CommunityPreview.jsx":"f4c7424856dd","ui_kits/bean-app/Rail.jsx":"e88e9361ffe2","ui_kits/bean-app/SettingsScreen.jsx":"22c73ac7b4d4","ui_kits/bean-app/app.jsx":"d3b33487edee","ui_kits/bean-app/primitives.jsx":"0961131d371c","wireframes/design-canvas.jsx":"e3ac464e7716","wireframes/roles-app.jsx":"19c8efaf855c","wireframes/tweaks-panel.jsx":"6591467622ed","wireframes/wire-admin.jsx":"0222991f2871","wireframes/wire-app.jsx":"c7f1845ac0f5","wireframes/wire-auth.jsx":"7dbce75f82ce","wireframes/wire-community.jsx":"335329dc791c","wireframes/wire-create-preview.jsx":"61aad049a5c6","wireframes/wire-kit.jsx":"1d71fb5a5823","wireframes/wire-roles-courses.jsx":"18d819a944a9","wireframes/wire-roles-models.jsx":"ee722eafa2ac","wireframes/wire-roles-posts.jsx":"7b173ead3c84","wireframes/wire-settings.jsx":"8e613acd747b","wireframes/wire-shell.jsx":"6d92e53b0fd6","wireframes/wire-tweaks.jsx":"444d95db9d63"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BeanDesignSystem_02999c = window.BeanDesignSystem_02999c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/bean-app/AuthScreen.jsx
try { (() => {
// AuthScreen.jsx — Bean sign-in (full-bleed photo + centered card)
function AuthScreen({
  onContinue
}) {
  const [email, setEmail] = React.useState("");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "url(../../assets/login-bg.png) center/cover no-repeat #2a3f55",
      display: "grid",
      placeItems: "center",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 420,
      maxWidth: "100%",
      background: "#fff",
      borderRadius: 24,
      padding: 36,
      boxShadow: "0 24px 60px rgba(0,0,0,.28)",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      justifyContent: "center",
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement(BeanMark, {
    size: 40,
    radius: 13
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 26,
      fontWeight: 700,
      letterSpacing: "-0.02em",
      color: "var(--text-primary)"
    }
  }, "ProFound")), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      margin: "0 0 26px",
      fontSize: 16,
      lineHeight: "140%",
      color: "var(--text-secondary)"
    }
  }, "\u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0430\u043A\u043A\u0430\u0443\u043D\u0442 \u0438\u043B\u0438 \u0432\u043E\u0439\u0434\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u043D\u043E\u0432\u044B\u0435 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0434\u043B\u044F \u0437\u0430\u0440\u0430\u0431\u043E\u0442\u043A\u0430."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\u041F\u043E\u0447\u0442\u0430",
    placeholder: "example@gmail.com",
    value: email,
    onChange: e => setEmail(e.target.value)
  })), /*#__PURE__*/React.createElement(Button, {
    full: true,
    size: "l",
    onClick: onContinue
  }, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      margin: "20px 0",
      color: "var(--text-tertiary)",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: "var(--bg-outline)"
    }
  }), "\u0438\u043B\u0438", /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: "var(--bg-outline)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onContinue,
    className: "oauth"
  }, /*#__PURE__*/React.createElement(SocialGlyph, {
    name: "vk",
    size: 22,
    color: "#0077FF"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onContinue,
    className: "oauth"
  }, /*#__PURE__*/React.createElement(SocialGlyph, {
    name: "yandex",
    size: 22,
    color: "#FC3F1D"
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      margin: "22px 0 0",
      fontSize: 12,
      lineHeight: "150%",
      color: "var(--text-tertiary)"
    }
  }, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u044F\u0441\u044C, \u0432\u044B \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u0448\u0438\u043C\u0438 ", /*#__PURE__*/React.createElement("a", {
    style: lk
  }, "\u0443\u0441\u043B\u043E\u0432\u0438\u044F\u043C\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F"), " \u0438 ", /*#__PURE__*/React.createElement("a", {
    style: lk
  }, "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438"), ".")), /*#__PURE__*/React.createElement("style", null, `.oauth{flex:1;display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid var(--bg-outline);border-radius:12px;padding:13px;cursor:pointer;transition:background .15s}.oauth:hover{background:var(--bg-light-secondary)}`));
}
const lk = {
  color: "var(--primary-600)",
  textDecoration: "none"
};
Object.assign(window, {
  AuthScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/bean-app/AuthScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/bean-app/CommunityApp.jsx
try { (() => {
// CommunityApp.jsx — Bean community view: sidebar (banner + nav) + header + home

function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = true
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setOpen(!open),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "0 12px",
      color: "var(--gray-600)",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      textTransform: "uppercase",
      letterSpacing: ".03em"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, title), /*#__PURE__*/React.createElement(Icon, {
    name: open ? "chevron-down" : "chevron-right",
    size: 16
  })), open && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, children));
}
function CommunityBanner({
  name,
  coverUrl
}) {
  if (coverUrl) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        height: 140,
        display: "flex",
        alignItems: "flex-end",
        padding: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: `url(${coverUrl}) center/cover`
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,.5)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48,
        height: 48,
        borderRadius: 16,
        background: "#fff",
        display: "grid",
        placeItems: "center",
        fontSize: 22,
        boxShadow: "var(--shadow-card)"
      }
    }, "\uD83D\uDC3C"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#fff",
        fontWeight: 700,
        fontSize: 16,
        textShadow: "0 1px 2px rgba(0,0,0,.4)"
      }
    }, name)), /*#__PURE__*/React.createElement("button", {
      style: menuBtn
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-down",
      size: 20
    }))));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 60,
      borderBottom: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 8px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 16,
      background: "var(--secondary-600)",
      display: "grid",
      placeItems: "center",
      fontSize: 22,
      flex: "none"
    }
  }, "\uD83D\uDC3C"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 16,
      color: "var(--gray-900)"
    }
  }, name)), /*#__PURE__*/React.createElement("button", {
    style: {
      ...menuBtn,
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 20
  })));
}
const menuBtn = {
  width: 32,
  height: 32,
  borderRadius: 12,
  border: 0,
  background: "transparent",
  color: "#fff",
  display: "grid",
  placeItems: "center",
  cursor: "pointer"
};
function CommunitySidebar({
  community,
  activeTab,
  onTab
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 256,
      background: "#fff",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(CommunityBanner, {
    name: community.name,
    coverUrl: community.coverUrl
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Tab, {
    icon: "home",
    label: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F",
    active: activeTab === "home",
    onClick: () => onTab("home")
  }), /*#__PURE__*/React.createElement(CollapsibleSection, {
    title: "\u0422\u0435\u0441\u0442",
    icon: "folder"
  }, /*#__PURE__*/React.createElement(Tab, {
    icon: "book-open",
    label: "\u041A\u0443\u0440\u0441",
    active: activeTab === "course",
    onClick: () => onTab("course")
  }))));
}
function CommunityHeader() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: "1px solid var(--border)",
      padding: "12px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "s",
    icon: "arrow-left"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--gray-400)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16
  })), /*#__PURE__*/React.createElement("input", {
    placeholder: "\u041F\u043E\u0438\u0441\u043A...",
    style: {
      border: "1px solid var(--border)",
      borderRadius: 14,
      padding: "9px 44px 9px 36px",
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      width: 260,
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: 11,
      fontWeight: 600,
      color: "var(--tw-blue-700)",
      background: "var(--tw-blue-100)",
      borderRadius: 6,
      padding: "2px 6px"
    }
  }, "\u2318K")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "s",
    icon: "help-circle"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "s",
    icon: "bell"
  })));
}
function CommunityHome({
  community
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "bean-page-title",
    style: {
      margin: "0 0 24px"
    }
  }, community.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 12,
      border: "1px solid var(--border)",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 16px",
      fontSize: 20,
      fontWeight: 600,
      color: "var(--gray-900)"
    }
  }, "\u041E \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0435"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16,
      lineHeight: 1.5,
      color: "var(--text-secondary)"
    }
  }, community.about))));
}
function CommunityApp({
  community
}) {
  const [tab, setTab] = React.useState("home");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100%",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(CommunitySidebar, {
    community: community,
    activeTab: tab,
    onTab: setTab
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(CommunityHeader, null), tab === "home" ? /*#__PURE__*/React.createElement(CommunityHome, {
    community: community
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "bean-page-title",
    style: {
      margin: "0 0 24px"
    }
  }, "\u041A\u0443\u0440\u0441"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-tertiary)",
      fontSize: 16
    }
  }, "\u0421\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 \u043A\u0443\u0440\u0441\u0430 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C."))));
}
Object.assign(window, {
  CommunityApp,
  CommunitySidebar,
  CommunityHeader,
  CommunityHome
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/bean-app/CommunityApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/bean-app/CommunityPreview.jsx
try { (() => {
// CommunityPreview.jsx — public community page (media + description + pricing + author)

const PREVIEW_COMMUNITY = {
  name: "Clipr Campaigns",
  description: `Добро пожаловать в Clipr — новый стандарт клиппинга.

Clipr — это ведущее сообщество для клипперов и авторов, которые хотят доминировать в коротком формате.

Внутри Clipr вы получите:
• Элитное обучение: всё о контенте, виральности и монетизации.
• Премиальные кампании: эксклюзивный доступ к топовым сообществам.
• Профессиональное комьюнити: команда клипперов, помогающих друг другу расти.`,
  media: ["https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop"],
  memberCount: 486,
  author: {
    displayName: "Prithvi (PB)",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  tiers: [{
    id: "monthly",
    price: 12.99,
    interval: "/ месяц"
  }, {
    id: "6m",
    price: 69.99,
    interval: "/ 6 месяцев",
    discount: 10
  }, {
    id: "year",
    price: 119.0,
    interval: "/ год",
    discount: 24
  }]
};
function PublicHeader({
  onBack
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderBottom: "1px solid var(--border)",
      padding: "0 24px",
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(BeanMark, {
    size: 36,
    radius: 12
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      fontWeight: 700,
      letterSpacing: "-0.02em"
    }
  }, "ProFound")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "m",
    onClick: onBack
  }, "\u0412\u043E\u0439\u0442\u0438"));
}
function MediaCarousel({
  media
}) {
  const [i, setI] = React.useState(0);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: 16,
      overflow: "hidden",
      aspectRatio: "4 / 3",
      background: "#000"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: media[i],
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setI((i - 1 + media.length) % media.length),
    style: {
      ...carBtn,
      left: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 20
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setI((i + 1) % media.length),
    style: {
      ...carBtn,
      right: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 12
    }
  }, media.map((m, k) => /*#__PURE__*/React.createElement("div", {
    key: k,
    onClick: () => setI(k),
    style: {
      width: 64,
      height: 48,
      borderRadius: 10,
      overflow: "hidden",
      cursor: "pointer",
      boxShadow: k === i ? "0 0 0 2px var(--primary-600)" : "0 0 0 1px var(--border)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: m,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })))));
}
const carBtn = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: 0,
  background: "rgba(255,255,255,.9)",
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
  boxShadow: "var(--shadow-sm)"
};
function PricingCard({
  tiers,
  memberCount
}) {
  const [sel, setSel] = React.useState(tiers[0].id);
  const fmtMembers = n => n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K` : "" + n;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 16,
      border: "1px solid var(--border)",
      background: "#fff",
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginBottom: 16
    }
  }, tiers.map(t => {
    const on = sel === t.id;
    return /*#__PURE__*/React.createElement("label", {
      key: t.id,
      onClick: () => setSel(t.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        borderRadius: 16,
        border: `2px solid ${on ? "var(--primary-500)" : "var(--border)"}`,
        background: on ? "var(--primary-50)" : "#fff",
        padding: 12,
        cursor: "pointer",
        transition: "all .12s"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        height: 16,
        borderRadius: "50%",
        flex: "none",
        border: `2px solid ${on ? "var(--primary-600)" : "var(--gray-300)"}`,
        boxShadow: on ? "inset 0 0 0 3px #fff, 0 0 0 1px var(--primary-600)" : "none",
        background: on ? "var(--primary-600)" : "#fff"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 500,
        color: "var(--gray-900)"
      }
    }, "$", t.price.toFixed(2), " ", t.interval), t.discount && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 500,
        color: "var(--tw-blue-700)",
        background: "var(--tw-blue-100)",
        borderRadius: 9999,
        padding: "2px 8px"
      }
    }, "-", t.discount, "%")));
  })), /*#__PURE__*/React.createElement(Button, {
    size: "l",
    full: true
  }, "\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u0438\u0442\u044C\u0441\u044F"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginTop: 16,
      fontSize: 14,
      color: "var(--gray-500)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, fmtMembers(memberCount), " \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432")));
}
function AuthorCard({
  author
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      borderRadius: 16,
      border: "1px solid var(--border)",
      background: "#fff",
      padding: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      overflow: "hidden",
      flex: "none",
      background: "var(--gray-100)"
    }
  }, author.avatarUrl && /*#__PURE__*/React.createElement("img", {
    src: author.avatarUrl,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: "var(--gray-900)"
    }
  }, author.displayName));
}
function CommunityPreview({
  onBack
}) {
  const c = PREVIEW_COMMUNITY;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--tw-gray-50)",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement(PublicHeader, {
    onBack: onBack
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: "0 auto",
      padding: "32px 16px",
      display: "flex",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(MediaCarousel, {
    media: c.media
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 24,
      fontWeight: 700,
      color: "var(--gray-900)"
    }
  }, c.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "16px 0 0",
      whiteSpace: "pre-line",
      color: "var(--text-secondary)",
      fontSize: 16,
      lineHeight: 1.6
    }
  }, c.description))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 320,
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 24,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(PricingCard, {
    tiers: c.tiers,
    memberCount: c.memberCount
  }), /*#__PURE__*/React.createElement(AuthorCard, {
    author: c.author
  })))));
}
Object.assign(window, {
  CommunityPreview
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/bean-app/CommunityPreview.jsx", error: String((e && e.message) || e) }); }

// ui_kits/bean-app/Rail.jsx
try { (() => {
// Rail.jsx — Bean left icon rail (community switcher + profile button)
function RailIconBtn({
  icon,
  primary,
  onClick,
  title
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    title: title,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 48,
      height: 48,
      borderRadius: 16,
      border: 0,
      cursor: "pointer",
      flex: "none",
      display: "grid",
      placeItems: "center",
      transition: "background .15s",
      background: primary ? "var(--primary-600)" : hover ? "var(--gray-100)" : "transparent",
      color: primary ? "#fff" : "var(--text-secondary)",
      boxShadow: primary ? "var(--shadow-sm)" : "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 24
  }));
}
function CommunityAvatar({
  emoji,
  active,
  onClick,
  title
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    title: title,
    style: {
      position: "relative",
      cursor: "pointer",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 12,
      background: "#fff",
      display: "grid",
      placeItems: "center",
      fontSize: 24,
      boxShadow: "var(--shadow-sm)",
      transition: "opacity .15s"
    }
  }, emoji), active && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: -5,
      top: "50%",
      transform: "translateY(-50%)",
      width: 3,
      height: 14,
      background: "#000",
      borderRadius: "0 4px 4px 0"
    }
  }));
}
function ProfileButton({
  onOpenSettings
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "bean-profile",
    style: {
      width: 60,
      height: 60,
      background: "#fff",
      borderRadius: 18,
      boxShadow: "inset 0 0 0 1px var(--gray-200)",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
      transition: "width .3s ease, box-shadow .3s",
      padding: 4,
      gap: 6,
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bean-profile-main",
    style: {
      display: "flex",
      alignItems: "center",
      minWidth: 0,
      flex: 1,
      cursor: "pointer",
      borderRadius: 12,
      padding: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: "50%",
      background: "var(--secondary-600)",
      display: "grid",
      placeItems: "center",
      fontSize: 22,
      flex: "none"
    }
  }, "\uD83D\uDC3C"), /*#__PURE__*/React.createElement("div", {
    className: "bean-profile-meta",
    style: {
      display: "flex",
      flexDirection: "column",
      minWidth: 0,
      padding: "0 8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "var(--gray-900)",
      whiteSpace: "nowrap"
    }
  }, "Super Admin"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--gray-500)",
      whiteSpace: "nowrap"
    }
  }, "@super_admin"))), /*#__PURE__*/React.createElement("div", {
    className: "bean-profile-actions",
    style: {
      display: "flex",
      gap: 4,
      flex: "none",
      paddingRight: 2
    }
  }, /*#__PURE__*/React.createElement(RailIconBtn, {
    icon: "more-horizontal",
    title: "\u0415\u0449\u0451"
  }), /*#__PURE__*/React.createElement(RailIconBtn, {
    icon: "settings",
    onClick: onOpenSettings,
    title: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438"
  })));
}
function Rail({
  active,
  communities,
  onSelectCommunity,
  onLogoClick,
  onCreate,
  onOpenSettings
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60,
      display: "flex",
      flexDirection: "column",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onLogoClick,
    style: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(BeanMark, {
    size: 48,
    radius: 16
  })), /*#__PURE__*/React.createElement(RailIconBtn, {
    icon: "message-circle-more",
    title: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F"
  }), /*#__PURE__*/React.createElement(RailIconBtn, {
    icon: "search",
    title: "\u041F\u043E\u0438\u0441\u043A"
  }), communities.map(c => /*#__PURE__*/React.createElement(CommunityAvatar, {
    key: c.slug,
    emoji: c.emoji,
    active: active === c.slug,
    title: c.name,
    onClick: () => onSelectCommunity(c.slug)
  })), /*#__PURE__*/React.createElement(RailIconBtn, {
    icon: "plus",
    primary: true,
    onClick: onCreate,
    title: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E"
  })), /*#__PURE__*/React.createElement(ProfileButton, {
    onOpenSettings: onOpenSettings
  }), /*#__PURE__*/React.createElement("style", null, `
        .bean-profile:hover { width: 300px !important; box-shadow: inset 0 0 0 1px var(--gray-200), var(--shadow-card) !important; }
        .bean-profile-main:hover { background: var(--gray-100); }
        .bean-profile-meta, .bean-profile-actions { opacity: 0; pointer-events: none; transition: opacity .25s; }
        .bean-profile:hover .bean-profile-meta, .bean-profile:hover .bean-profile-actions { opacity: 1; pointer-events: auto; }
      `));
}
Object.assign(window, {
  Rail,
  RailIconBtn
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/bean-app/Rail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/bean-app/SettingsScreen.jsx
try { (() => {
// SettingsScreen.jsx — Bean account settings (5 sections + sidebar)

const SETTINGS_SECTIONS = [{
  id: "profile",
  label: "Профиль",
  icon: "user"
}, {
  id: "security",
  label: "Конфиденциальность",
  icon: "shield"
}, {
  id: "verification",
  label: "Верификация",
  icon: "badge-check"
}, {
  id: "payment",
  label: "Вывод средств",
  icon: "credit-card"
}, {
  id: "billing",
  label: "Транзакции",
  icon: "receipt-text"
}];
function LogoutButton() {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 16px 10px 12px",
      borderRadius: 14,
      fontSize: 14,
      fontWeight: 600,
      color: "var(--danger)",
      cursor: "pointer",
      background: hover ? "var(--danger-soft)" : "transparent",
      transition: "background .12s"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "log-out",
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, "\u0412\u044B\u0439\u0442\u0438 \u0438\u0437 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430"));
}
function SettingsSidebar({
  active,
  onTab
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 230,
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 40,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 12,
      background: "var(--secondary-600)",
      display: "grid",
      placeItems: "center",
      fontSize: 32
    }
  }, "\uD83D\uDC3C"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 16,
      color: "var(--gray-900)"
    }
  }, "Arkadiy"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--gray-500)"
    }
  }, "@arkadiyparovozov"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, SETTINGS_SECTIONS.map(s => /*#__PURE__*/React.createElement(Tab, {
    key: s.id,
    icon: s.icon,
    label: s.label,
    active: active === s.id,
    onClick: () => onTab(s.id)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--gray-300)",
      borderRadius: 9999,
      margin: "8px 16px 8px 12px"
    }
  }), /*#__PURE__*/React.createElement(LogoutButton, null));
}

// ---- Profile section ----
function SocialField({
  glyph,
  color,
  prefix,
  placeholder,
  globe
}) {
  const [v, setV] = React.useState("");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "#fff",
      boxShadow: "inset 0 0 0 1px var(--gray-200)",
      borderRadius: 14,
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 10,
      border: "1px solid var(--gray-400)",
      boxShadow: "var(--shadow-sm)",
      display: "grid",
      placeItems: "center",
      flex: "none"
    }
  }, globe ? /*#__PURE__*/React.createElement(Icon, {
    name: "globe",
    size: 20
  }) : /*#__PURE__*/React.createElement(SocialGlyph, {
    name: glyph,
    size: 20,
    color: color
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)",
      flex: "none"
    }
  }, prefix), /*#__PURE__*/React.createElement("input", {
    value: v,
    onChange: e => setV(e.target.value),
    placeholder: placeholder,
    style: {
      border: 0,
      outline: 0,
      flex: 1,
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      color: "var(--text-primary)",
      background: "transparent",
      minWidth: 0
    }
  }));
}
function ProfileSection({
  dirty,
  name,
  setName,
  bio,
  setBio
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24,
      paddingBottom: dirty ? 110 : 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "bean-page-title",
    style: {
      margin: 0
    }
  }, "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430"), /*#__PURE__*/React.createElement(Input, {
    label: "\u0418\u043C\u044F",
    placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F",
    value: name,
    onChange: e => setName(e.target.value)
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F",
    value: "arkadiyparovozov",
    onChange: () => {},
    prefix: /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-primary)"
      }
    }, "@")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "bean-label"
  }, "\u041E \u0441\u0435\u0431\u0435"), /*#__PURE__*/React.createElement("textarea", {
    value: bio,
    onChange: e => setBio(e.target.value),
    placeholder: "\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435 \u043E \u0441\u0435\u0431\u0435",
    rows: 3,
    style: {
      boxShadow: "inset 0 0 0 1px var(--gray-200)",
      border: 0,
      borderRadius: 16,
      padding: "12px 16px",
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      color: "var(--text-primary)",
      resize: "vertical",
      outline: "none"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 4px",
      fontSize: 24,
      fontWeight: 600,
      color: "var(--gray-900)"
    }
  }, "\u0421\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u0442\u0438"), /*#__PURE__*/React.createElement(SocialField, {
    glyph: "telegram",
    color: "#229ED9",
    prefix: "t.me/",
    placeholder: "xtsumi"
  }), /*#__PURE__*/React.createElement(SocialField, {
    glyph: "vk",
    color: "#0077FF",
    prefix: "vk.com/",
    placeholder: "id"
  }), /*#__PURE__*/React.createElement(SocialField, {
    glyph: "instagram",
    color: "#E1306C",
    prefix: "instagram.com/",
    placeholder: "xtsumi"
  }), /*#__PURE__*/React.createElement(SocialField, {
    glyph: "youtube",
    color: "#FF0000",
    prefix: "youtube.com/",
    placeholder: "@xtumi"
  }), /*#__PURE__*/React.createElement(SocialField, {
    globe: true,
    prefix: "https://",
    placeholder: "example.com"
  })));
}
function SaveBar({
  visible,
  onReset
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: "0 0 28px",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      boxShadow: "inset 0 0 0 1px var(--border), var(--shadow-card)",
      borderRadius: 16,
      padding: "16px 22px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      pointerEvents: "auto",
      opacity: visible ? 1 : 0.55,
      transition: "opacity .2s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: "var(--text-secondary)"
    }
  }, "\u0423 \u0432\u0430\u0441 \u0435\u0441\u0442\u044C \u043D\u0435\u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: onReset
  }, "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C"), /*#__PURE__*/React.createElement(Button, null, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"))));
}

// ---- Security section ----
function ReadonlyField({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: "var(--gray-700)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 16px",
      background: "var(--gray-100)",
      border: "1px solid var(--border)",
      borderRadius: 14,
      color: "var(--gray-700)",
      fontSize: 15
    }
  }, value));
}
function ChangeRow({
  label,
  placeholder
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 12,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: label,
    placeholder: placeholder,
    value: "",
    onChange: () => {}
  })), /*#__PURE__*/React.createElement(Button, {
    size: "l"
  }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C"));
}
function SecuritySection() {
  const [a, setA] = React.useState(true);
  const [b, setB] = React.useState(false);
  const [c, setC] = React.useState(true);
  const rows = [["Показывать подписки в профиле", a, setA], ["Показывать свои сообщества", b, setB], ["Разрешить личные сообщения", c, setC]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 24,
      fontWeight: 700,
      color: "var(--gray-900)"
    }
  }, "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      color: "var(--text-secondary)"
    }
  }, "\u0414\u0430\u043D\u043D\u044B\u0435 \u0434\u043B\u044F \u0432\u0445\u043E\u0434\u0430 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 16px",
      fontSize: 18,
      fontWeight: 600,
      color: "var(--gray-900)"
    }
  }, "Email"), /*#__PURE__*/React.createElement(ReadonlyField, {
    label: "\u0422\u0435\u043A\u0443\u0449\u0438\u0439 email",
    value: "arkadiy@gmail.com"
  }), /*#__PURE__*/React.createElement(ChangeRow, {
    label: "\u041D\u043E\u0432\u044B\u0439 email",
    placeholder: "example@email.com"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      fontSize: 12,
      color: "var(--gray-500)"
    }
  }, "\u041F\u043E\u0441\u043B\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043D\u0430 \u043D\u043E\u0432\u044B\u0439 email \u0431\u0443\u0434\u0435\u0442 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E \u043F\u0438\u0441\u044C\u043C\u043E \u0441 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435\u043C")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 16px",
      fontSize: 18,
      fontWeight: 600,
      color: "var(--gray-900)"
    }
  }, "\u0422\u0435\u043B\u0435\u0444\u043E\u043D"), /*#__PURE__*/React.createElement(ReadonlyField, {
    label: "\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u043D\u043E\u043C\u0435\u0440",
    value: "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
  }), /*#__PURE__*/React.createElement(ChangeRow, {
    label: "\u041D\u043E\u0432\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430",
    placeholder: "+7 (999) 123-45-67"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      fontSize: 12,
      color: "var(--gray-500)"
    }
  }, "\u041F\u043E\u0441\u043B\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043D\u0430 \u043D\u043E\u0432\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0431\u0443\u0434\u0435\u0442 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u043A\u043E\u0434 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 8px",
      fontSize: 18,
      fontWeight: 600,
      color: "var(--gray-900)"
    }
  }, "\u041A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C"), rows.map(([label, val, set], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 0",
      borderBottom: "1px solid rgba(0,0,0,.06)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement(Toggle, {
    on: val,
    onChange: set
  })))));
}
function StubSection({
  title,
  text
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "bean-page-title",
    style: {
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16,
      color: "var(--text-secondary)",
      lineHeight: 1.5,
      maxWidth: 520
    }
  }, text));
}
function SettingsScreen() {
  const [tab, setTab] = React.useState("profile");
  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const dirty = name !== "" || bio !== "";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100%",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      flex: "none",
      paddingRight: 32
    }
  }, /*#__PURE__*/React.createElement(SettingsSidebar, {
    active: tab,
    onTab: setTab
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: "relative",
      overflowY: "auto",
      paddingTop: 40,
      paddingLeft: 32,
      paddingRight: 40,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640
    }
  }, tab === "profile" && /*#__PURE__*/React.createElement(ProfileSection, {
    dirty: dirty,
    name: name,
    setName: setName,
    bio: bio,
    setBio: setBio
  }), tab === "security" && /*#__PURE__*/React.createElement(SecuritySection, null), tab === "verification" && /*#__PURE__*/React.createElement(StubSection, {
    title: "\u0412\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430",
    text: "\u0417\u0434\u0435\u0441\u044C \u0431\u0443\u0434\u0435\u0442 \u0440\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u0430 \u0432\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \u0447\u0435\u0440\u0435\u0437 \u043F\u0430\u0441\u043F\u043E\u0440\u0442 \u0438\u043B\u0438 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0441\u0430\u043C\u043E\u0437\u0430\u043D\u044F\u0442\u043E\u0433\u043E / \u0418\u041F / \u041E\u041E\u041E."
  }), tab === "payment" && /*#__PURE__*/React.createElement(StubSection, {
    title: "\u0421\u043F\u043E\u0441\u043E\u0431\u044B \u043E\u043F\u043B\u0430\u0442\u044B",
    text: "\u0417\u0434\u0435\u0441\u044C \u0431\u0443\u0434\u0443\u0442 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u043F\u043E\u0441\u043E\u0431\u043E\u0432 \u0432\u044B\u0432\u043E\u0434\u0430 \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u0438 \u0431\u0430\u043D\u043A\u043E\u0432\u0441\u043A\u0438\u0445 \u043A\u0430\u0440\u0442."
  }), tab === "billing" && /*#__PURE__*/React.createElement(StubSection, {
    title: "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439",
    text: "\u0417\u0434\u0435\u0441\u044C \u0431\u0443\u0434\u0435\u0442 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C\u0441\u044F \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u0432\u0441\u0435\u0445 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439 \u0438 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0439."
  })), tab === "profile" && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      bottom: 0,
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement(SaveBar, {
    visible: dirty,
    onReset: () => {
      setName("");
      setBio("");
    }
  }))));
}
Object.assign(window, {
  SettingsScreen,
  SettingsSidebar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/bean-app/SettingsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/bean-app/app.jsx
try { (() => {
// app.jsx — Bean UI kit interactive shell (auth → community/settings → public preview)

const COMMUNITIES = [{
  slug: "profound-university",
  name: "ProFound University",
  emoji: "🐼",
  coverUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
  about: "Закрытое сообщество для тех, кто строит личный бренд и зарабатывает на контенте. Курсы, разборы и поддержка комьюнити."
}, {
  slug: "clipr",
  name: "Clipr Campaigns",
  emoji: "🎓",
  about: "Ведущее сообщество для клипперов и авторов короткого формата: обучение, кампании и нетворкинг."
}];
function CreateModal({
  open,
  onClose
}) {
  const [dn, setDn] = React.useState("");
  if (!open) return null;
  const slug = dn.toLowerCase().replace(/[^a-zа-я0-9]+/gi, "-").replace(/^-|-$/g, "");
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,.4)",
      display: "grid",
      placeItems: "center",
      zIndex: 50,
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 440,
      maxWidth: "100%",
      background: "#fff",
      borderRadius: 24,
      padding: 28,
      boxShadow: "var(--shadow-pop)",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 20px",
      fontSize: 20,
      fontWeight: 700,
      color: "var(--gray-900)"
    }
  }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430",
    placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430",
    value: dn,
    onChange: e => setDn(e.target.value)
  }), /*#__PURE__*/React.createElement(Input, {
    label: "URL",
    value: slug,
    onChange: () => {},
    prefix: /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-tertiary)"
      }
    }, "profound.com/"),
    helper: "\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0435 \u0438\u043C\u044F"
  }), /*#__PURE__*/React.createElement(Button, {
    size: "l",
    full: true,
    onClick: onClose
  }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C"))));
}
function ScreenSwitcher({
  screen,
  set
}) {
  const items = [["auth", "Вход"], ["community", "Сообщество"], ["settings", "Настройки"], ["preview", "Витрина"]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      bottom: 16,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 100,
      background: "rgba(20,20,20,.92)",
      borderRadius: 9999,
      padding: 4,
      display: "flex",
      gap: 2,
      boxShadow: "var(--shadow-pop)",
      backdropFilter: "blur(8px)"
    }
  }, items.map(([id, label]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => set(id),
    style: {
      border: 0,
      cursor: "pointer",
      borderRadius: 9999,
      padding: "7px 14px",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 600,
      background: screen === id ? "#fff" : "transparent",
      color: screen === id ? "#141414" : "rgba(255,255,255,.7)",
      transition: "all .15s"
    }
  }, label)));
}
function App() {
  const [screen, setScreen] = React.useState("auth"); // auth | community | settings | preview
  const [activeSlug, setActiveSlug] = React.useState(COMMUNITIES[0].slug);
  const [createOpen, setCreateOpen] = React.useState(false);
  const community = COMMUNITIES.find(c => c.slug === activeSlug) || COMMUNITIES[0];
  const shell = content => /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      gap: 8,
      background: "var(--bg-light-secondary)",
      padding: 8,
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement(Rail, {
    active: activeSlug,
    communities: COMMUNITIES,
    onSelectCommunity: s => {
      setActiveSlug(s);
      setScreen("community");
    },
    onLogoClick: () => setScreen("preview"),
    onCreate: () => setCreateOpen(true),
    onOpenSettings: () => setScreen("settings")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "#fff",
      border: "1px solid var(--border)",
      borderRadius: 12,
      overflow: "hidden",
      minWidth: 0
    }
  }, content), /*#__PURE__*/React.createElement(CreateModal, {
    open: createOpen,
    onClose: () => setCreateOpen(false)
  }));
  let body;
  if (screen === "auth") body = /*#__PURE__*/React.createElement(AuthScreen, {
    onContinue: () => setScreen("community")
  });else if (screen === "preview") body = /*#__PURE__*/React.createElement(CommunityPreview, {
    onBack: () => setScreen("auth")
  });else if (screen === "settings") body = shell(/*#__PURE__*/React.createElement(SettingsScreen, null));else body = shell(/*#__PURE__*/React.createElement(CommunityApp, {
    community: community
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, body, /*#__PURE__*/React.createElement(ScreenSwitcher, {
    screen: screen,
    set: setScreen
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/bean-app/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/bean-app/primitives.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// primitives.jsx — Bean UI kit shared primitives
// Icon (Lucide), Button, Input, Toggle, Avatar, SocialIcon
// Exports to window for use across babel script files.

function Icon({
  name,
  size = 20,
  stroke = 2,
  color,
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !window.lucide) return;
    el.innerHTML = "";
    const i = document.createElement("i");
    i.setAttribute("data-lucide", name);
    el.appendChild(i);
    window.lucide.createIcons({
      attrs: {
        width: size,
        height: size,
        "stroke-width": stroke
      }
    });
  }, [name, size, stroke]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: "inline-flex",
      color,
      lineHeight: 0,
      ...style
    }
  });
}
function Button({
  variant = "primary",
  size = "m",
  full,
  children,
  icon,
  iconRight,
  ...rest
}) {
  const pad = {
    s: "8px 14px",
    m: "11px 20px",
    l: "14px 26px"
  }[size];
  const fs = {
    s: 13,
    m: 14,
    l: 15
  }[size];
  const base = {
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    fontSize: fs,
    lineHeight: "120%",
    border: 0,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: pad,
    borderRadius: 16,
    width: full ? "100%" : "auto",
    transition: "background .15s, opacity .15s, transform .05s",
    whiteSpace: "nowrap"
  };
  const variants = {
    primary: {
      background: "var(--primary-600)",
      color: "#fff"
    },
    secondary: {
      background: "#fff",
      color: "var(--text-primary)",
      border: "1px solid var(--bg-outline)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)"
    },
    danger: {
      background: "#fff",
      color: "var(--danger)",
      border: "1px solid var(--bg-outline)"
    }
  };
  const [hover, setHover] = React.useState(false);
  const hov = hover ? variant === "primary" ? {
    background: "var(--primary-1000)"
  } : variant === "ghost" ? {
    background: "var(--icon-hover)"
  } : {
    background: "var(--bg-light-secondary)"
  } : {};
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    style: {
      ...base,
      ...variants[variant],
      ...hov
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }), icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: fs + 3
  }), children, iconRight && /*#__PURE__*/React.createElement(Icon, {
    name: iconRight,
    size: fs + 3
  }));
}
function Input({
  label,
  helper,
  error,
  prefix,
  suffix,
  value,
  onChange,
  placeholder,
  mono
}) {
  const [focus, setFocus] = React.useState(false);
  const borderColor = error ? "var(--danger)" : focus ? "var(--primary-500)" : "var(--bg-outline)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "bean-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "#fff",
      border: `1px solid ${borderColor}`,
      borderRadius: 16,
      padding: "11px 14px",
      transition: "border-color .15s"
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)",
      display: "inline-flex",
      flex: "none"
    }
  }, prefix), /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      border: 0,
      outline: 0,
      flex: 1,
      fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
      fontSize: 16,
      color: "var(--text-primary)",
      background: "transparent",
      minWidth: 0
    }
  }), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)",
      display: "inline-flex",
      flex: "none",
      cursor: "pointer"
    }
  }, suffix)), (helper || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: error ? "var(--danger)" : "var(--text-tertiary)"
    }
  }, error || helper));
}
function Toggle({
  on,
  onChange,
  disabled
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => !disabled && onChange(!on),
    style: {
      width: 44,
      height: 24,
      borderRadius: 9999,
      position: "relative",
      flex: "none",
      background: on ? "var(--tw-blue-600)" : "var(--gray-200)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.55 : 1,
      transition: "background .15s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 4,
      left: on ? 24 : 4,
      width: 16,
      height: 16,
      borderRadius: "50%",
      background: "#fff",
      display: "grid",
      placeItems: "center",
      transition: "left .15s"
    }
  }, disabled && /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 10,
    color: "var(--gray-400)"
  })));
}

// Vertical nav tab (settings + community sidebar)
function Tab({
  icon,
  label,
  active,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 16px 10px 12px",
      borderRadius: 14,
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      color: active ? "#000" : "var(--text-secondary)",
      transition: "background .12s",
      background: active ? "var(--tab-active)" : hover ? "var(--tab-hover)" : "transparent",
      boxShadow: active ? "inset 0 0 0 1px var(--tab-active-ring)" : "none"
    }
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, label));
}

// Renders the real Bean logo.svg (lime tile + bean glyph) at any size
function BeanMark({
  size = 48,
  radius = 16
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let alive = true;
    fetch("../../assets/logo.svg").then(r => r.text()).then(svg => {
      if (!alive || !ref.current) return;
      ref.current.innerHTML = svg.replace(/rx="16"/, `rx="${radius / size * 48}"`);
      const el = ref.current.querySelector("svg");
      if (el) {
        el.setAttribute("width", size);
        el.setAttribute("height", size);
      }
    });
    return () => {
      alive = false;
    };
  }, [size, radius]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: "inline-flex",
      lineHeight: 0,
      flex: "none"
    }
  });
}
function BeanLogo({
  size = 44,
  radius = 12,
  glyph
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: radius,
      background: "var(--secondary-600)",
      display: "grid",
      placeItems: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bean",
    size: glyph || size * 0.58,
    color: "#141414",
    stroke: 2.2
  }));
}

// ---- Social brand glyphs (simplified, single-color, currentColor) ----
const SOCIALS = {
  telegram: {
    color: "#229ED9",
    vb: "0 0 24 24",
    p: "M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.8-7.9c.4-.3-.1-.5-.6-.2L6.6 13l-4.7-1.5c-1-.3-1-1 .2-1.5L20.6 3c.9-.3 1.6.2 1.3 1.3z"
  },
  youtube: {
    color: "#FF0000",
    vb: "0 0 24 24",
    p: "M23 7.5c-.3-1.1-1-1.8-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4C2 5.7 1.3 6.4 1 7.5.6 9.4.6 12 .6 12s0 2.6.4 4.5c.3 1.1 1 1.8 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4c1.1-.3 1.8-1 2.1-2.1.4-1.9.4-4.5.4-4.5s0-2.6-.4-4.5zM9.7 15.3V8.7l5.7 3.3-5.7 3.3z"
  },
  instagram: {
    color: "#E1306C",
    vb: "0 0 24 24",
    multi: true,
    paths: [{
      p: "M16.5 2h-9A5.5 5.5 0 0 0 2 7.5v9A5.5 5.5 0 0 0 7.5 22h9a5.5 5.5 0 0 0 5.5-5.5v-9A5.5 5.5 0 0 0 16.5 2zm3.5 14.5a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 4 16.5v-9A3.5 3.5 0 0 1 7.5 4h9A3.5 3.5 0 0 1 20 7.5v9z"
    }, {
      p: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
    }, {
      p: "M17.5 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"
    }]
  },
  x: {
    color: "#000000",
    vb: "0 0 24 24",
    p: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"
  },
  discord: {
    color: "#5865F2",
    vb: "0 0 24 24",
    p: "M20 4.4A19.8 19.8 0 0 0 15.1 3l-.2.5c1.6.4 2.9 1 4.2 1.9-2.3-1-4.5-1.5-6.9-1.5s-4.6.5-6.9 1.5c1.3-.9 2.6-1.5 4.2-1.9L9.3 3A19.8 19.8 0 0 0 4.4 4.4C1.4 8.9.6 13.2 1 17.5a19.9 19.9 0 0 0 6 3l.5-1.2c-.7-.3-1.4-.6-2-1l.5-.4c3.8 1.8 8 1.8 11.8 0l.5.4c-.6.4-1.3.7-2 1l.5 1.2a19.9 19.9 0 0 0 6-3c.5-5-.8-9.3-3.3-13.1zM8.5 14.9c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm7 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"
  },
  tiktok: {
    color: "#000000",
    vb: "0 0 24 24",
    p: "M16.5 2h-3v13.2a2.8 2.8 0 1 1-2.4-2.8v-3a5.8 5.8 0 1 0 5.4 5.8V8.6a6.9 6.9 0 0 0 4 1.3v-3a3.9 3.9 0 0 1-4-3.9z"
  },
  vk: {
    color: "#0077FF",
    vb: "0 0 24 24",
    p: "M12.8 16.5c-5.4 0-8.9-3.8-9-10h2.8c.1 4.6 2.2 6.5 3.7 6.9V6.5h2.7v3.9c1.6-.2 3.2-1.9 3.7-3.9h2.6c-.4 2.4-2 4.1-3.2 4.8 1.2.6 3 2.1 3.7 4.7h-2.9c-.5-1.7-2-3-3.9-3.2v3.2h-.9z"
  },
  yandex: {
    color: "#FC3F1D",
    vb: "0 0 24 24",
    p: "M13.3 21h2.9V3h-3.6C9 3 6.7 5.1 6.7 8.2c0 2.5 1.2 4 3.3 5.4L6.3 21h3.2l3.8-7v7zM12.6 11.8c-1.7-1-2.5-1.8-2.5-3.8 0-1.7 1.1-2.9 2.6-2.9h.6v6.7h-.7z"
  }
};
function SocialGlyph({
  name,
  size = 20,
  color
}) {
  const s = SOCIALS[name];
  if (!s) return null;
  const fill = color || "currentColor";
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: s.vb,
    fill: fill,
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      display: "block"
    }
  }, s.multi ? s.paths.map((pp, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: pp.p
  })) : /*#__PURE__*/React.createElement("path", {
    d: s.p
  }));
}
Object.assign(window, {
  Icon,
  Button,
  Input,
  Toggle,
  Tab,
  BeanLogo,
  BeanMark,
  SocialGlyph,
  SOCIALS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/bean-app/primitives.jsx", error: String((e && e.message) || e) }); }

// wireframes/design-canvas.jsx
try { (() => {
/* BEGIN USAGE */
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Exports (to window): DesignCanvas, DCSection, DCArtboard, DCPostIt.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>
//
// Artboards are static design frames, not scroll regions — never use
// height: 100% + overflow: auto/scroll on inner elements; size each artboard
// to fit its content (explicit pixel height, or let it grow).
/* END USAGE */

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DC,
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "wireframes/design-canvas.jsx", error: String((e && e.message) || e) }); }

// wireframes/roles-app.jsx
try { (() => {
// roles-app.jsx — assembles the admin/member role-split exploration onto its own canvas

const RS_W = 1280,
  RS_H = 860; // full app screens
const MODELS_W = 1400,
  MODELS_H = 800;
const MATRIX_W = 860,
  MATRIX_H = 720;
function RolesApp() {
  return /*#__PURE__*/React.createElement(DesignCanvas, null, /*#__PURE__*/React.createElement(DCSection, {
    id: "r-models",
    title: "\u0420\u0430\u0437\u0432\u0438\u043B\u043A\u0430: \u043A\u0430\u043A \u0440\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u044C \u0440\u043E\u043B\u0438",
    subtitle: "\u0422\u0440\u0438 \u043C\u043E\u0434\u0435\u043B\u0438 + \u0431\u0430\u0437\u043E\u0432\u0430\u044F \u043C\u0430\u0442\u0440\u0438\u0446\u0430 \u043F\u0440\u0430\u0432. \u0412\u044B\u0431\u0440\u0430\u043D\u043D\u0430\u044F \u043A\u0430\u043A \u043E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u2014 A (\u0438\u043D\u043B\u0430\u0439\u043D \xAB\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u2194 \u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435\xBB)"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "r-models-3",
    label: "\u0422\u0440\u0438 \u043C\u043E\u0434\u0435\u043B\u0438",
    width: MODELS_W,
    height: MODELS_H
  }, /*#__PURE__*/React.createElement(ScreenRoleModels, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "r-matrix",
    label: "\u041C\u0430\u0442\u0440\u0438\u0446\u0430 \u043F\u0440\u0430\u0432",
    width: MATRIX_W,
    height: MATRIX_H
  }, /*#__PURE__*/React.createElement(ScreenRoleMatrix, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "r-courses",
    title: "\u041A\u0443\u0440\u0441\u044B \xB7 \u043C\u043E\u0434\u0435\u043B\u044C A (\u0438\u043D\u043B\u0430\u0439\u043D-\u0440\u0435\u0436\u0438\u043C)",
    subtitle: "\u041E\u0434\u0438\u043D \u044D\u043A\u0440\u0430\u043D. \u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A \u0441\u043C\u043E\u0442\u0440\u0438\u0442 \u2192 \u0430\u0434\u043C\u0438\u043D \u0432\u0438\u0434\u0438\u0442 \xAB\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C\xBB \u2192 \u0442\u043E\u0442 \u0436\u0435 \u044D\u043A\u0440\u0430\u043D \u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0441\u044F \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440\u043E\u043C"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "rc-member",
    label: "\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A \u2014 \u043F\u043B\u0435\u0435\u0440",
    width: RS_W,
    height: RS_H
  }, /*#__PURE__*/React.createElement(ScreenCoursesMember, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "rc-adminview",
    label: "\u0410\u0434\u043C\u0438\u043D \u2014 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 (+ \u043A\u043D\u043E\u043F\u043A\u0430 \u0420\u0435\u0434.)",
    width: RS_W,
    height: RS_H
  }, /*#__PURE__*/React.createElement(ScreenCoursesAdminView, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "rc-edit",
    label: "\u0410\u0434\u043C\u0438\u043D \u2014 \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440 (\u0440\u0435\u0436\u0438\u043C \u0440\u0435\u0434.)",
    width: RS_W,
    height: RS_H
  }, /*#__PURE__*/React.createElement(ScreenCoursesEdit, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "rc-add",
    label: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u2014 \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0443\u0440\u043E\u043A",
    width: RS_W,
    height: RS_H
  }, /*#__PURE__*/React.createElement(AddLessonModal, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "rc-empty",
    label: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u2014 \u043F\u0443\u0441\u0442\u043E\u0439 \u043A\u0443\u0440\u0441",
    width: RS_W,
    height: RS_H
  }, /*#__PURE__*/React.createElement(ScreenCoursesEmpty, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "r-courses-alt",
    title: "\u041A\u0443\u0440\u0441\u044B \xB7 \u0430\u043B\u044C\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u043C\u043E\u0434\u0435\u043B\u0438",
    subtitle: "\u0422\u043E\u0442 \u0436\u0435 \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440, \u043D\u043E \u0432 \u043B\u043E\u0433\u0438\u043A\u0435 B (\u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044B \u0432\u0441\u0435\u0433\u0434\u0430 \u0432\u0438\u0434\u043D\u044B) \u0438 C (\u043E\u0442\u0434\u0435\u043B\u044C\u043D\u0430\u044F \xAB\u0421\u0442\u0443\u0434\u0438\u044F\xBB)"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "rc-b",
    label: "\u041C\u043E\u0434\u0435\u043B\u044C B \u2014 always-on",
    width: RS_W,
    height: RS_H
  }, /*#__PURE__*/React.createElement(ScreenCoursesModelB, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "rc-c",
    label: "\u041C\u043E\u0434\u0435\u043B\u044C C \u2014 \u0421\u0442\u0443\u0434\u0438\u044F",
    width: RS_W,
    height: RS_H
  }, /*#__PURE__*/React.createElement(ScreenCoursesModelC, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "r-posts",
    title: "\u041F\u043E\u0441\u0442\u044B \xB7 \u043C\u043E\u0434\u0435\u043B\u044C A (\u0438\u043D\u043B\u0430\u0439\u043D-\u0440\u0435\u0436\u0438\u043C)",
    subtitle: "\u0422\u0430 \u0436\u0435 \u043B\u0435\u043D\u0442\u0430. \u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A \u0447\u0438\u0442\u0430\u0435\u0442 \u0438 \u0440\u0435\u0430\u0433\u0438\u0440\u0443\u0435\u0442 \u2192 \u0443 \u0430\u0434\u043C\u0438\u043D\u0430 \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u044F, \u0437\u0430\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u0435, \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u044F"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "rp-member",
    label: "\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A \u2014 \u043B\u0435\u043D\u0442\u0430",
    width: RS_W,
    height: RS_H
  }, /*#__PURE__*/React.createElement(ScreenPostsMember, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "rp-admin",
    label: "\u0410\u0434\u043C\u0438\u043D \u2014 \u043B\u0435\u043D\u0442\u0430 + \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u044F",
    width: RS_W,
    height: RS_H
  }, /*#__PURE__*/React.createElement(ScreenPostsAdmin, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "rp-menu-member",
    label: "\u041C\u0435\u043D\u044E \u043F\u043E\u0441\u0442\u0430 \u2014 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A",
    width: RS_W,
    height: RS_H
  }, /*#__PURE__*/React.createElement(ScreenPostMenuMember, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "rp-menu-admin",
    label: "\u041C\u0435\u043D\u044E \u043F\u043E\u0441\u0442\u0430 \u2014 \u0430\u0434\u043C\u0438\u043D",
    width: RS_W,
    height: RS_H
  }, /*#__PURE__*/React.createElement(ScreenPostMenuAdmin, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "rp-compose",
    label: "\u0410\u0434\u043C\u0438\u043D \u2014 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043F\u043E\u0441\u0442\u0430",
    width: RS_W,
    height: RS_H
  }, /*#__PURE__*/React.createElement(ScreenPostsCompose, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "rp-queue",
    label: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u2014 \u043E\u0447\u0435\u0440\u0435\u0434\u044C \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u0438",
    width: RS_W,
    height: RS_H
  }, /*#__PURE__*/React.createElement(ScreenPostsQueue, null))));
}
window.__renderRoles = () => {
  if (!window.__rolesRoot) window.__rolesRoot = ReactDOM.createRoot(document.getElementById("root"));
  window.__rolesRoot.render(/*#__PURE__*/React.createElement(RolesApp, null));
};
window.__renderRoles();
})(); } catch (e) { __ds_ns.__errors.push({ path: "wireframes/roles-app.jsx", error: String((e && e.message) || e) }); }

// wireframes/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "wireframes/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// wireframes/wire-admin.jsx
try { (() => {
// wire-admin.jsx — Bean wireframe: admin sub-pages opened from the community photo menu
// Дашборд · Внешний вид · Настройки сообщества

function AdminShell({
  title,
  sub,
  actions,
  children
}) {
  return /*#__PURE__*/React.createElement(WAppFrame, {
    railActive: "community"
  }, /*#__PURE__*/React.createElement(WCommunitySidebar, {
    active: null
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: `1px solid ${WC.line}`,
      padding: "12px 24px",
      display: "flex",
      alignItems: "center",
      gap: 14,
      flex: "none",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement(WBtn, {
    variant: "ghost",
    size: "s",
    icon: "arrow-left"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: WC.ink
    }
  }, title), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: WC.sub
    }
  }, sub)), /*#__PURE__*/React.createElement(WNote, null, "\u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u0430\u0434\u043C\u0438\u043D\u0430"), actions), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflow: "hidden",
      background: "#fff"
    }
  }, children)));
}

// ---- Дашборд ----
function StatCard({
  label,
  value,
  trend,
  up
}) {
  return /*#__PURE__*/React.createElement(WCard, {
    pad: 18,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: WC.sub
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 26,
      fontWeight: 700,
      color: WC.ink,
      fontFamily: WC.mono
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontSize: 12,
      color: WC.sub
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: up ? "trending-up" : "trending-down",
    size: 15,
    color: WC.sub
  }), " ", trend));
}
function BarChart() {
  const bars = [40, 55, 48, 70, 62, 85, 78, 95, 88, 100, 92, 110];
  const max = 120;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 8,
      height: 150,
      paddingTop: 8
    }
  }, bars.map((b, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: `${b / max * 100}%`,
      background: i === bars.length - 1 ? WC.primary : WC.fill,
      borderRadius: "5px 5px 0 0",
      border: `1px solid ${WC.line}`
    }
  })));
}
function TierRow({
  name,
  price,
  subs,
  revenue
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "13px 0",
      borderBottom: `1px solid ${WC.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: WC.lineStrong,
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14,
      fontWeight: 600,
      color: WC.ink
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 90,
      fontSize: 13,
      color: WC.sub,
      fontFamily: WC.mono
    }
  }, price), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 90,
      fontSize: 13,
      color: WC.sub
    }
  }, subs, " \u0447\u0435\u043B."), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 100,
      textAlign: "right",
      fontSize: 14,
      fontWeight: 600,
      color: WC.ink,
      fontFamily: WC.mono
    }
  }, revenue));
}
function ScreenAdminDashboard() {
  return /*#__PURE__*/React.createElement(AdminShell, {
    title: "\u0414\u0430\u0448\u0431\u043E\u0440\u0434",
    sub: "ProFound University",
    actions: /*#__PURE__*/React.createElement(WPill, {
      icon: "calendar"
    }, "\u0417\u0430 30 \u0434\u043D\u0435\u0439")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      overflow: "hidden",
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "\u0414\u043E\u0445\u043E\u0434 \u0437\u0430 \u043C\u0435\u0441\u044F\u0446",
    value: "\u20BD 248K",
    trend: "+12% \u043A \u043F\u0440\u043E\u0448\u043B\u043E\u043C\u0443",
    up: true
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432",
    value: "1 284",
    trend: "+86 \u0437\u0430 \u043C\u0435\u0441\u044F\u0446",
    up: true
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u043F\u043E\u0434\u043F\u0438\u0441\u043E\u043A",
    value: "412",
    trend: "+5%",
    up: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(WCard, {
    pad: 18,
    style: {
      flex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: WC.ink
    }
  }, "\u0414\u043E\u0445\u043E\u0434"), /*#__PURE__*/React.createElement(WPill, null, "\u041C\u0435\u0441\u044F\u0446")), /*#__PURE__*/React.createElement(BarChart, null)), /*#__PURE__*/React.createElement(WCard, {
    pad: 18,
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: WC.ink
    }
  }, "\u0420\u043E\u0441\u0442 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      position: "relative",
      height: 150
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "100%",
    viewBox: "0 0 200 120",
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "0,110 30,95 60,98 90,70 120,60 150,38 200,20",
    fill: "none",
    stroke: WC.lineStrong,
    strokeWidth: "2"
  }))))), /*#__PURE__*/React.createElement(WCard, {
    pad: 18
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: WC.ink
    }
  }, "\u0422\u0430\u0440\u0438\u0444\u044B"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      padding: "0 0 8px",
      fontSize: 11,
      color: WC.muted,
      textTransform: "uppercase",
      letterSpacing: ".04em"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, "\u0422\u0430\u0440\u0438\u0444"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 90
    }
  }, "\u0426\u0435\u043D\u0430"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 90
    }
  }, "\u041F\u043E\u0434\u043F\u0438\u0441\u0447\u0438\u043A\u0438"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 100,
      textAlign: "right"
    }
  }, "\u0414\u043E\u0445\u043E\u0434")), /*#__PURE__*/React.createElement(TierRow, {
    name: "\u041C\u0435\u0441\u044F\u0447\u043D\u044B\u0439",
    price: "\u20BD 990 / \u043C\u0435\u0441",
    subs: 284,
    revenue: "\u20BD 281K"
  }), /*#__PURE__*/React.createElement(TierRow, {
    name: "6 \u043C\u0435\u0441\u044F\u0446\u0435\u0432",
    price: "\u20BD 4 990",
    subs: 92,
    revenue: "\u20BD 459K"
  }), /*#__PURE__*/React.createElement(TierRow, {
    name: "\u0413\u043E\u0434\u043E\u0432\u043E\u0439",
    price: "\u20BD 8 990",
    subs: 36,
    revenue: "\u20BD 323K"
  })))));
}

// ---- Внешний вид (Appearance) ----
function UploadField({
  label,
  h,
  icon,
  hint
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(WLabel, null, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(WImg, {
    h: h,
    radius: 14,
    label: hint,
    icon: icon
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 12,
      bottom: 12
    }
  }, /*#__PURE__*/React.createElement(WBtn, {
    variant: "secondary",
    size: "s",
    icon: "upload"
  }, "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C"))));
}
function ScreenAdminAppearance() {
  const swatches = ["#3a3a3a", "#8a8a8a", "#bcbcbc", "#d8d8d8"];
  return /*#__PURE__*/React.createElement(AdminShell, {
    title: "\u0412\u043D\u0435\u0448\u043D\u0438\u0439 \u0432\u0438\u0434",
    sub: "\u041E\u0431\u043B\u043E\u0436\u043A\u0430, \u043B\u043E\u0433\u043E\u0442\u0438\u043F \u0438 \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u0430",
    actions: /*#__PURE__*/React.createElement(WBtn, {
      size: "s"
    }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      overflow: "hidden",
      padding: 24,
      display: "flex",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      maxWidth: 560,
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(UploadField, {
    label: "\u041E\u0431\u043B\u043E\u0436\u043A\u0430 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430",
    h: 150,
    icon: "image",
    hint: "1600\xD7400"
  }), /*#__PURE__*/React.createElement(UploadField, {
    label: "\u041B\u043E\u0433\u043E\u0442\u0438\u043F",
    h: 110,
    icon: "bean",
    hint: "512\xD7512"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(WLabel, null, "\u0410\u043A\u0446\u0435\u043D\u0442\u043D\u044B\u0439 \u0446\u0432\u0435\u0442"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, swatches.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 38,
      height: 38,
      borderRadius: 10,
      background: c,
      boxShadow: i === 0 ? `0 0 0 2px #fff, 0 0 0 4px ${WC.lineStrong}` : `inset 0 0 0 1px ${WC.line}`
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 10,
      border: `1px dashed ${WC.lineStrong}`,
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "plus",
    size: 16,
    color: WC.muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(WLabel, null, "\u0422\u0435\u043C\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, [["sun", "Светлая", true], ["moon", "Тёмная", false], ["monitor", "Системная", false]].map(([ic, lb, on]) => /*#__PURE__*/React.createElement("div", {
    key: lb,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 7,
      padding: "14px 0",
      borderRadius: 12,
      border: `1px solid ${on ? WC.lineStrong : WC.line}`,
      background: on ? WC.fill : "#fff"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: ic,
    size: 20,
    color: WC.sub
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: WC.sub
    }
  }, lb)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 300,
      flex: "none",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(WLabel, null, "\u041F\u0440\u0435\u0432\u044C\u044E \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438"), /*#__PURE__*/React.createElement(WCard, {
    pad: 0,
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(WImg, {
    h: 120,
    radius: 0,
    label: "\u043E\u0431\u043B\u043E\u0436\u043A\u0430"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginTop: -42
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 14,
      border: `2px solid #fff`,
      background: WC.fill,
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "bean",
    size: 24,
    color: WC.sub
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: WC.ink
    }
  }, "ProFound University"), /*#__PURE__*/React.createElement(WLines, {
    n: 2,
    last: "50%"
  }), /*#__PURE__*/React.createElement(WBtn, {
    full: true
  }, "\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u0438\u0442\u044C\u0441\u044F"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: WC.muted,
      textAlign: "center"
    }
  }, "1 284 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430"))), /*#__PURE__*/React.createElement(WNote, null, "\u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0432 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438"))));
}

// ---- Настройки сообщества (Community settings) ----
function PricingTierCard({
  name,
  price,
  period,
  badge
}) {
  return /*#__PURE__*/React.createElement(WCard, {
    pad: 14,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "grip-vertical",
    size: 18,
    color: WC.muted
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: WC.ink
    }
  }, name, " ", badge && /*#__PURE__*/React.createElement(WPill, {
    style: {
      marginLeft: 6
    }
  }, badge)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: WC.sub,
      fontFamily: WC.mono,
      marginTop: 2
    }
  }, price, " ", period)), /*#__PURE__*/React.createElement(WToggle, {
    on: true
  }), /*#__PURE__*/React.createElement(WIcon, {
    name: "pencil",
    size: 16,
    color: WC.muted
  }), /*#__PURE__*/React.createElement(WIcon, {
    name: "trash-2",
    size: 16,
    color: WC.muted
  }));
}
function ScreenAdminSettings() {
  return /*#__PURE__*/React.createElement(AdminShell, {
    title: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430",
    sub: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435, \u0434\u043E\u0441\u0442\u0443\u043F \u0438 \u0442\u0430\u0440\u0438\u0444\u044B",
    actions: /*#__PURE__*/React.createElement(WBtn, {
      size: "s"
    }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      overflow: "hidden",
      padding: "24px 40px",
      maxWidth: 680
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(WInput, {
    label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430",
    value: "ProFound University"
  }), /*#__PURE__*/React.createElement(WTextarea, {
    label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",
    placeholder: "\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435, \u043E \u0447\u0451\u043C \u0432\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E",
    rows: 3
  }), /*#__PURE__*/React.createElement(WInput, {
    label: "\u041F\u0443\u0431\u043B\u0438\u0447\u043D\u044B\u0439 \u0430\u0434\u0440\u0435\u0441",
    value: "profound-university",
    prefix: "bean.com/",
    mono: true,
    helper: "\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0430\u0434\u0440\u0435\u0441 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(WLabel, null, "\u0412\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u044C"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, [["globe", "Публичное", "Видно всем, открыта витрина", true], ["lock", "Закрытое", "Только по приглашению", false]].map(([ic, t, d, on]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      flex: 1,
      display: "flex",
      gap: 11,
      padding: 14,
      borderRadius: 14,
      border: `1px solid ${on ? WC.lineStrong : WC.line}`,
      background: on ? WC.fill : "#fff"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: ic,
    size: 18,
    color: WC.sub
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: WC.ink
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: WC.sub,
      marginTop: 2
    }
  }, d)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(WLabel, {
    style: {
      fontSize: 14
    }
  }, "\u0422\u0430\u0440\u0438\u0444\u044B \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0438"), /*#__PURE__*/React.createElement(WBtn, {
    variant: "ghost",
    size: "s",
    icon: "plus"
  }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u0430\u0440\u0438\u0444")), /*#__PURE__*/React.createElement(PricingTierCard, {
    name: "\u041C\u0435\u0441\u044F\u0447\u043D\u044B\u0439",
    price: "\u20BD 990",
    period: "/ \u043C\u0435\u0441"
  }), /*#__PURE__*/React.createElement(PricingTierCard, {
    name: "6 \u043C\u0435\u0441\u044F\u0446\u0435\u0432",
    price: "\u20BD 4 990",
    period: "/ 6 \u043C\u0435\u0441",
    badge: "\u221215%"
  }), /*#__PURE__*/React.createElement(PricingTierCard, {
    name: "\u0413\u043E\u0434\u043E\u0432\u043E\u0439",
    price: "\u20BD 8 990",
    period: "/ \u0433\u043E\u0434",
    badge: "\u221224%"
  })))));
}
Object.assign(window, {
  ScreenAdminDashboard,
  ScreenAdminAppearance,
  ScreenAdminSettings
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "wireframes/wire-admin.jsx", error: String((e && e.message) || e) }); }

// wireframes/wire-app.jsx
try { (() => {
// wire-app.jsx — assembles all Bean wireframes onto the design canvas

const SHELL_W = 1280,
  SHELL_H = 860;
const AUTH_W = 1040,
  AUTH_H = 700;
const PREVIEW_W = 1080,
  PREVIEW_H = 940;
const ST_W = 360,
  ST_H = 520;
const ST_SH = 380;
function WireApp() {
  return /*#__PURE__*/React.createElement(DesignCanvas, null, /*#__PURE__*/React.createElement(DCSection, {
    id: "auth",
    title: "\u0412\u0445\u043E\u0434 \u0438 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F",
    subtitle: "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F \u043F\u043E \u043F\u043E\u0447\u0442\u0435 + OAuth (VK / \u042F\u043D\u0434\u0435\u043A\u0441)"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "auth-login",
    label: "\u0412\u0445\u043E\u0434 \u2014 \u043F\u043E\u0447\u0442\u0430",
    width: AUTH_W,
    height: AUTH_H
  }, /*#__PURE__*/React.createElement(ScreenAuthLogin, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "auth-code",
    label: "\u041A\u043E\u0434 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F",
    width: AUTH_W,
    height: AUTH_H
  }, /*#__PURE__*/React.createElement(ScreenAuthCode, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "auth-error",
    label: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \xB7 \u043E\u0448\u0438\u0431\u043A\u0430",
    width: ST_W,
    height: ST_SH
  }, /*#__PURE__*/React.createElement(StateAuthError, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "auth-loading",
    label: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \xB7 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430",
    width: ST_W,
    height: ST_SH
  }, /*#__PURE__*/React.createElement(StateAuthLoading, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "settings",
    title: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430",
    subtitle: "5 \u0440\u0430\u0437\u0434\u0435\u043B\u043E\u0432 \xB7 \u0431\u043E\u043A\u043E\u0432\u043E\u0435 \u043C\u0435\u043D\u044E + \u0444\u043E\u0440\u043C\u0430"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "set-profile",
    label: "\u041F\u0440\u043E\u0444\u0438\u043B\u044C",
    width: SHELL_W,
    height: SHELL_H
  }, /*#__PURE__*/React.createElement(ScreenSettingsProfile, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "set-security",
    label: "\u041A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C",
    width: SHELL_W,
    height: SHELL_H
  }, /*#__PURE__*/React.createElement(ScreenSettingsSecurity, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "set-verify",
    label: "\u0412\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \xB7 \u043D\u0435 \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u0430",
    width: SHELL_W,
    height: SHELL_H
  }, /*#__PURE__*/React.createElement(ScreenSettingsVerification, {
    state: "none"
  })), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "set-verify-pending",
    label: "\u0412\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \xB7 \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435",
    width: ST_W,
    height: ST_H
  }, /*#__PURE__*/React.createElement(StateVerificationPending, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "set-verify-passed",
    label: "\u0412\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \xB7 \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u0430",
    width: ST_W,
    height: ST_H
  }, /*#__PURE__*/React.createElement(StateVerificationPassed, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "set-payment",
    label: "\u0412\u044B\u0432\u043E\u0434 \u0441\u0440\u0435\u0434\u0441\u0442\u0432",
    width: SHELL_W,
    height: SHELL_H
  }, /*#__PURE__*/React.createElement(ScreenSettingsPayment, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "set-payment-add",
    label: "\u0412\u044B\u0432\u043E\u0434 \xB7 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u0430\u0440\u0442\u044B",
    width: SHELL_W,
    height: SHELL_H
  }, /*#__PURE__*/React.createElement(StatePaymentAddCard, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "set-payment-empty",
    label: "\u0412\u044B\u0432\u043E\u0434 \xB7 \u043F\u0443\u0441\u0442\u043E",
    width: ST_W,
    height: ST_H
  }, /*#__PURE__*/React.createElement(StatePaymentEmpty, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "set-billing",
    label: "\u0422\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0438",
    width: SHELL_W,
    height: SHELL_H
  }, /*#__PURE__*/React.createElement(ScreenSettingsBilling, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "set-billing-empty",
    label: "\u0422\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0438 \xB7 \u043F\u0443\u0441\u0442\u043E",
    width: ST_W,
    height: ST_H
  }, /*#__PURE__*/React.createElement(StateBillingEmpty, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "community",
    title: "\u0421\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E",
    subtitle: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 + \u0441\u0443\u0431\u0447\u0430\u0442\u044B (\u0447\u0430\u0442 / \u043F\u043E\u0441\u0442\u044B / \u043A\u0443\u0440\u0441\u044B) \xB7 \u043C\u0435\u043D\u044E \u043F\u043E \u0444\u043E\u0442\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "com-chat",
    label: "\u0427\u0430\u0442",
    width: SHELL_W,
    height: SHELL_H
  }, /*#__PURE__*/React.createElement(ScreenCommunityChat, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "com-add-channel",
    label: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u0430\u0431",
    width: SHELL_W,
    height: SHELL_H
  }, /*#__PURE__*/React.createElement(ScreenCommunityAddChannel, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "com-posts",
    label: "\u041F\u043E\u0441\u0442\u044B",
    width: SHELL_W,
    height: SHELL_H
  }, /*#__PURE__*/React.createElement(ScreenCommunityPosts, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "com-courses",
    label: "\u041A\u0443\u0440\u0441\u044B \u2014 \u043F\u043B\u0435\u0435\u0440",
    width: SHELL_W,
    height: SHELL_H
  }, /*#__PURE__*/React.createElement(ScreenCommunityCourses, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "com-menu-admin",
    label: "\u041C\u0435\u043D\u044E \u043F\u043E \u0444\u043E\u0442\u043E \xB7 \u0430\u0434\u043C\u0438\u043D",
    width: SHELL_W,
    height: SHELL_H
  }, /*#__PURE__*/React.createElement(ScreenCommunityMenu, {
    admin: true
  })), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "com-menu-member",
    label: "\u041C\u0435\u043D\u044E \u043F\u043E \u0444\u043E\u0442\u043E \xB7 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A",
    width: SHELL_W,
    height: SHELL_H
  }, /*#__PURE__*/React.createElement(ScreenCommunityMenu, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "admin",
    title: "\u0410\u0434\u043C\u0438\u043D-\u0440\u0430\u0437\u0434\u0435\u043B\u044B",
    subtitle: "\u041E\u0442\u043A\u0440\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u0438\u0437 \u043C\u0435\u043D\u044E \u043F\u043E \u0444\u043E\u0442\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430 \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u0430\u0434\u043C\u0438\u043D\u0430"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "adm-dashboard",
    label: "\u0414\u0430\u0448\u0431\u043E\u0440\u0434",
    width: SHELL_W,
    height: SHELL_H
  }, /*#__PURE__*/React.createElement(ScreenAdminDashboard, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "adm-appearance",
    label: "\u0412\u043D\u0435\u0448\u043D\u0438\u0439 \u0432\u0438\u0434",
    width: SHELL_W,
    height: SHELL_H
  }, /*#__PURE__*/React.createElement(ScreenAdminAppearance, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "adm-settings",
    label: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430",
    width: SHELL_W,
    height: SHELL_H
  }, /*#__PURE__*/React.createElement(ScreenAdminSettings, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "create-preview",
    title: "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0438 \u0432\u0438\u0442\u0440\u0438\u043D\u0430",
    subtitle: "\u041C\u043E\u0434\u0430\u043B\u043A\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \xB7 \u043F\u0443\u0431\u043B\u0438\u0447\u043D\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "create-modal",
    label: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E",
    width: SHELL_W,
    height: SHELL_H
  }, /*#__PURE__*/React.createElement(ScreenCreateModal, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "preview",
    label: "\u0412\u0438\u0442\u0440\u0438\u043D\u0430 \u2014 \u043F\u0443\u0431\u043B\u0438\u0447\u043D\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430",
    width: PREVIEW_W,
    height: PREVIEW_H
  }, /*#__PURE__*/React.createElement(ScreenCommunityPreview, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "preview-auth",
    label: "\u0412\u0438\u0442\u0440\u0438\u043D\u0430 \xB7 \u0432\u0445\u043E\u0434 \u0433\u043E\u0441\u0442\u044F",
    width: ST_W,
    height: ST_H
  }, /*#__PURE__*/React.createElement(StatePreviewAuthDialog, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "preview-loading",
    label: "\u0412\u0438\u0442\u0440\u0438\u043D\u0430 \xB7 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430",
    width: ST_W,
    height: ST_H
  }, /*#__PURE__*/React.createElement(StatePreviewLoading, null))));
}

// Exposed so the Tweaks controller can re-render the canvas after it mutates
// the WC / DC token banks. Same root → DesignCanvas state (order, focus,
// sidecar) is preserved across re-renders.
window.__renderWire = () => {
  if (!window.__wireRoot) window.__wireRoot = ReactDOM.createRoot(document.getElementById("root"));
  window.__wireRoot.render(/*#__PURE__*/React.createElement(WireApp, null));
};
window.__renderWire();
})(); } catch (e) { __ds_ns.__errors.push({ path: "wireframes/wire-app.jsx", error: String((e && e.message) || e) }); }

// wireframes/wire-auth.jsx
try { (() => {
// wire-auth.jsx — Bean wireframe: login / registration + states

function AuthBg({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      position: "relative",
      background: WC.fillSoft,
      display: "grid",
      placeItems: "center",
      fontFamily: WC.font,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%"
    },
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "0",
    x2: "100%",
    y2: "100%",
    stroke: WC.line,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "100%",
    y1: "0",
    x2: "0",
    y2: "100%",
    stroke: WC.line,
    strokeWidth: "1"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 16,
      left: 18
    }
  }, /*#__PURE__*/React.createElement(WNote, null, "\u0444\u043E\u043D \u2014 \u0444\u043E\u0442\u043E (full-bleed)")), children);
}
function AuthCard({
  children,
  w = 400
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: w,
      maxWidth: "90%",
      background: "#fff",
      border: `1px solid ${WC.line}`,
      borderRadius: 24,
      padding: 34,
      boxShadow: "0 24px 60px rgba(0,0,0,.12)",
      boxSizing: "border-box"
    }
  }, children);
}
function AuthBrand() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      justifyContent: "center",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 12,
      border: `1px solid ${WC.line}`,
      background: WC.recess,
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "bean",
    size: 22,
    color: WC.ink,
    stroke: 2.2
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24,
      fontWeight: 700,
      letterSpacing: "-0.02em",
      color: WC.ink
    }
  }, "Bean"));
}

// Email entry (sign-in / sign-up)
function ScreenAuthLogin() {
  return /*#__PURE__*/React.createElement(AuthBg, null, /*#__PURE__*/React.createElement(AuthCard, null, /*#__PURE__*/React.createElement(AuthBrand, null), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      margin: "0 0 24px",
      fontSize: 15,
      lineHeight: "140%",
      color: WC.sub
    }
  }, "\u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0430\u043A\u043A\u0430\u0443\u043D\u0442 \u0438\u043B\u0438 \u0432\u043E\u0439\u0434\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u043D\u043E\u0432\u044B\u0435 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0434\u043B\u044F \u0437\u0430\u0440\u0430\u0431\u043E\u0442\u043A\u0430."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(WInput, {
    label: "\u041F\u043E\u0447\u0442\u0430",
    placeholder: "example@gmail.com"
  })), /*#__PURE__*/React.createElement(WBtn, {
    full: true,
    size: "l"
  }, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      margin: "18px 0",
      color: WC.muted,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: WC.line
    }
  }), "\u0438\u043B\u0438", /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: WC.line
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, ["VK", "Яндекс"].map(p => /*#__PURE__*/React.createElement("div", {
    key: p,
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      border: `1px solid ${WC.line}`,
      borderRadius: 12,
      padding: 12
    }
  }, /*#__PURE__*/React.createElement(WAvatar, {
    size: 20,
    icon: "square"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: WC.sub
    }
  }, p)))), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      margin: "22px 0 0",
      fontSize: 12,
      lineHeight: "150%",
      color: WC.muted
    }
  }, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u044F\u0441\u044C, \u0432\u044B \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044C \u0441 \u0443\u0441\u043B\u043E\u0432\u0438\u044F\u043C\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0438 \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438.")));
}

// Confirmation code state
function ScreenAuthCode() {
  return /*#__PURE__*/React.createElement(AuthBg, null, /*#__PURE__*/React.createElement(AuthCard, null, /*#__PURE__*/React.createElement(AuthBrand, null), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      margin: "0 0 6px",
      fontSize: 15,
      fontWeight: 600,
      color: WC.ink
    }
  }, "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0434 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F"), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      margin: "0 0 24px",
      fontSize: 13,
      lineHeight: "140%",
      color: WC.sub
    }
  }, "\u041C\u044B \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u043B\u0438 \u043A\u043E\u0434 \u043D\u0430 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: WC.ink,
      fontWeight: 500
    }
  }, "example@gmail.com")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      justifyContent: "center",
      marginBottom: 22
    }
  }, Array.from({
    length: 4
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 54,
      height: 60,
      border: `1px solid ${i === 0 ? WC.lineStrong : WC.line}`,
      borderRadius: 14,
      display: "grid",
      placeItems: "center",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24,
      fontFamily: WC.mono,
      color: i === 0 ? WC.ink : WC.muted
    }
  }, i === 0 ? "4" : "·")))), /*#__PURE__*/React.createElement(WBtn, {
    full: true,
    size: "l"
  }, "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C"), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      margin: "18px 0 0",
      fontSize: 13,
      color: WC.sub
    }
  }, "\u041D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u043A\u043E\u0434? ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: WC.ink,
      fontWeight: 600
    }
  }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E"))));
}

// --- companion states ---
function StateAuthError() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      background: "#fff",
      fontFamily: WC.font,
      padding: 22,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(WNote, null, "\u043E\u0448\u0438\u0431\u043A\u0430 \u2014 \u043D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(WLabel, null, "\u041F\u043E\u0447\u0442\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 7,
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "#fff",
      border: `1.5px solid ${WC.lineStrong}`,
      borderRadius: 14,
      padding: "0 14px",
      height: 44
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14,
      color: WC.ink
    }
  }, "example@"), /*#__PURE__*/React.createElement(WIcon, {
    name: "alert-circle",
    size: 18,
    color: WC.sub
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: WC.sub,
      marginTop: 7,
      display: "block"
    }
  }, "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0430\u0434\u0440\u0435\u0441 \u043F\u043E\u0447\u0442\u044B")), /*#__PURE__*/React.createElement(WBtn, {
    full: true,
    size: "l"
  }, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"));
}
function StateAuthLoading() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      background: "#fff",
      fontFamily: WC.font,
      padding: 22,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(WNote, null, "\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u2014 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u043A\u043E\u0434\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(WLabel, null, "\u041F\u043E\u0447\u0442\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 7
    }
  }, /*#__PURE__*/React.createElement(WInput, {
    placeholder: "example@gmail.com",
    value: "arkadiy@gmail.com"
  }))), /*#__PURE__*/React.createElement("button", {
    style: {
      width: "100%",
      padding: "13px 22px",
      borderRadius: 14,
      border: 0,
      background: WC.primary,
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      fontFamily: WC.font,
      fontWeight: 600,
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "loader-2",
    size: 17,
    color: "#fff"
  }), " \u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C \u043A\u043E\u0434\u2026"));
}
Object.assign(window, {
  ScreenAuthLogin,
  ScreenAuthCode,
  StateAuthError,
  StateAuthLoading
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "wireframes/wire-auth.jsx", error: String((e && e.message) || e) }); }

// wireframes/wire-community.jsx
try { (() => {
// wire-community.jsx — Bean wireframe: community Posts, Courses (player), photo dropdown menu

// ---- Chat tab (Discord-style channel: message stream + composer) ----
function ChatMessage({
  name,
  time,
  lines,
  last
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      padding: "10px 0"
    }
  }, /*#__PURE__*/React.createElement(WAvatar, {
    size: 40,
    icon: "user"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: WC.ink
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: WC.muted,
      fontFamily: WC.mono
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 5
    }
  }, /*#__PURE__*/React.createElement(WLines, {
    n: lines,
    last: last
  }))));
}
function ChannelTitleBar({
  type = "chat",
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none",
      borderBottom: `1px solid ${WC.line}`,
      padding: "13px 24px",
      display: "flex",
      alignItems: "center",
      gap: 9,
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: WCHAN_TYPE[type].icon,
    size: 19,
    color: WC.muted
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: WC.ink
    }
  }, label), /*#__PURE__*/React.createElement(WPill, {
    style: {
      marginLeft: 4
    }
  }, WCHAN_TYPE[type].name));
}
function ScreenCommunityChat() {
  return /*#__PURE__*/React.createElement(WAppFrame, {
    railActive: "community"
  }, /*#__PURE__*/React.createElement(WCommunityShell, {
    active: "chat"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(ChannelTitleBar, {
    type: "chat",
    label: "\u043E\u0431\u0449\u0438\u0439-\u0447\u0430\u0442"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflow: "hidden",
      padding: "12px 24px",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "8px 0 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: WC.line
    }
  }), /*#__PURE__*/React.createElement(WNote, null, "\u0441\u0435\u0433\u043E\u0434\u043D\u044F"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: WC.line
    }
  })), /*#__PURE__*/React.createElement(ChatMessage, {
    name: "\u041C\u0430\u0440\u0438\u044F \u041A.",
    time: "14:02",
    lines: 2,
    last: "60%"
  }), /*#__PURE__*/React.createElement(ChatMessage, {
    name: "\u041E\u043B\u0435\u0433 \u0414.",
    time: "14:05",
    lines: 1,
    last: "38%"
  }), /*#__PURE__*/React.createElement(ChatMessage, {
    name: "\u0410\u0440\u043A\u0430\u0434\u0438\u0439 \u041F. \xB7 \u0430\u0432\u0442\u043E\u0440",
    time: "14:11",
    lines: 3,
    last: "50%"
  }), /*#__PURE__*/React.createElement(ChatMessage, {
    name: "\u0418\u0432\u0430\u043D \u041F.",
    time: "14:20",
    lines: 1,
    last: "46%"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none",
      padding: "12px 24px 18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "11px 14px",
      border: `1px solid ${WC.line}`,
      borderRadius: 14,
      background: WC.recess
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "plus",
    size: 20,
    color: WC.muted
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14,
      color: WC.muted
    }
  }, "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0432 #\u043E\u0431\u0449\u0438\u0439-\u0447\u0430\u0442\u2026"), /*#__PURE__*/React.createElement(WIcon, {
    name: "smile",
    size: 20,
    color: WC.muted
  }), /*#__PURE__*/React.createElement(WIcon, {
    name: "send",
    size: 20,
    color: WC.sub
  }))))));
}

// ---- Add-channel modal: pick one of 3 types + name + parent category ----
function TypePick({
  type,
  selected
}) {
  const m = WCHAN_TYPE[type];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      padding: "16px 10px",
      borderRadius: 13,
      border: `1px solid ${selected ? WC.lineStrong : WC.line}`,
      background: selected ? WC.fill : "#fff",
      boxShadow: selected ? `inset 0 0 0 1px ${WC.lineStrong}` : "none"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: m.icon,
    size: 22,
    color: selected ? WC.ink : WC.sub
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: selected ? WC.ink : WC.sub
    }
  }, m.name));
}
function AddChannelModal() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(20,20,20,.32)",
      display: "grid",
      placeItems: "center",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 460,
      background: "#fff",
      border: `1px solid ${WC.line}`,
      borderRadius: 18,
      boxShadow: "0 18px 50px rgba(0,0,0,.22)",
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(WHeading, {
    title: "\u041D\u043E\u0432\u044B\u0439 \u0442\u0430\u0431",
    size: 20
  }), /*#__PURE__*/React.createElement(WIcon, {
    name: "x",
    size: 20,
    color: WC.muted
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(WLabel, null, "\u0422\u0438\u043F"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(TypePick, {
    type: "chat",
    selected: true
  }), /*#__PURE__*/React.createElement(TypePick, {
    type: "posts"
  }), /*#__PURE__*/React.createElement(TypePick, {
    type: "courses"
  }))), /*#__PURE__*/React.createElement(WInput, {
    label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0442\u0430\u0431\u0430",
    placeholder: "\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u043E\u0431\u0449\u0438\u0439-\u0447\u0430\u0442"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(WLabel, null, "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "#fff",
      border: `1px solid ${WC.line}`,
      borderRadius: 14,
      padding: "0 14px",
      height: 44
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14,
      color: WC.ink,
      fontFamily: WC.font
    }
  }, "\u041D\u0430\u0447\u0430\u043B\u043E"), /*#__PURE__*/React.createElement(WIcon, {
    name: "chevron-down",
    size: 16,
    color: WC.muted
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(WBtn, {
    variant: "ghost"
  }, "\u041E\u0442\u043C\u0435\u043D\u0430"), /*#__PURE__*/React.createElement(WBtn, {
    icon: "plus"
  }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C"))));
}
function ScreenCommunityAddChannel() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement(ScreenCommunityChat, null), /*#__PURE__*/React.createElement(AddChannelModal, null));
}

// ---- Posts tab (Substack-style: composer + article list) ----
function PostComposer() {
  return /*#__PURE__*/React.createElement(WCard, {
    pad: 14,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(WAvatar, {
    size: 40,
    icon: "user"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "11px 14px",
      border: `1px solid ${WC.line}`,
      borderRadius: 12,
      background: WC.recess,
      fontSize: 14,
      color: WC.muted
    }
  }, "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043F\u043E\u0441\u0442 \u0434\u043B\u044F \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430\u2026"), /*#__PURE__*/React.createElement(WBtn, {
    icon: "image",
    variant: "secondary",
    size: "s"
  }), /*#__PURE__*/React.createElement(WBtn, {
    size: "s"
  }, "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C"));
}
function PostCard({
  pinned
}) {
  return /*#__PURE__*/React.createElement(WCard, {
    pad: 0,
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(WAvatar, {
    size: 36,
    icon: "user"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: WC.ink
    }
  }, "\u0410\u0440\u043A\u0430\u0434\u0438\u0439 \u041F. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: WC.muted,
      fontWeight: 400
    }
  }, "\xB7 \u0430\u0432\u0442\u043E\u0440")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: WC.muted
    }
  }, "3 \u0447\u0430\u0441\u0430 \u043D\u0430\u0437\u0430\u0434")), pinned && /*#__PURE__*/React.createElement(WPill, {
    icon: "pin"
  }, "\u0417\u0430\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u043E"), /*#__PURE__*/React.createElement(WIcon, {
    name: "more-horizontal",
    size: 18,
    color: WC.muted
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: WC.ink,
      lineHeight: 1.25
    }
  }, "\u0417\u0430\u043F\u0443\u0441\u043A \u043D\u043E\u0432\u043E\u0433\u043E \u043F\u043E\u0442\u043E\u043A\u0430 \u043A\u0443\u0440\u0441\u0430 \u0443\u0436\u0435 \u043D\u0430 \u044D\u0442\u043E\u0439 \u043D\u0435\u0434\u0435\u043B\u0435"), /*#__PURE__*/React.createElement(WLines, {
    n: 2,
    last: "55%"
  })), /*#__PURE__*/React.createElement(WImg, {
    h: 180,
    radius: 0,
    label: "\u043E\u0431\u043B\u043E\u0436\u043A\u0430 \u043F\u043E\u0441\u0442\u0430"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 18px",
      display: "flex",
      alignItems: "center",
      gap: 20,
      borderTop: `1px solid ${WC.line}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13,
      color: WC.sub
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "heart",
    size: 17,
    color: WC.sub
  }), " 128"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13,
      color: WC.sub
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "message-circle",
    size: 17,
    color: WC.sub
  }), " 24"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13,
      color: WC.sub
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "share",
    size: 17,
    color: WC.sub
  }), " \u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(WIcon, {
    name: "bookmark",
    size: 17,
    color: WC.muted
  })));
}
function TextPostCard() {
  return /*#__PURE__*/React.createElement(WCard, {
    pad: 18,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(WAvatar, {
    size: 36,
    icon: "user"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: WC.ink
    }
  }, "\u041C\u0430\u0440\u0438\u044F \u041A."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: WC.muted
    }
  }, "\u0412\u0447\u0435\u0440\u0430, 18:40")), /*#__PURE__*/React.createElement(WIcon, {
    name: "more-horizontal",
    size: 18,
    color: WC.muted
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: WC.ink
    }
  }, "\u0414\u0435\u043B\u044E\u0441\u044C \u043A\u043E\u043D\u0441\u043F\u0435\u043A\u0442\u043E\u043C \u0441 \u043F\u0440\u043E\u0448\u043B\u043E\u0433\u043E \u0432\u0435\u0431\u0438\u043D\u0430\u0440\u0430"), /*#__PURE__*/React.createElement(WLines, {
    n: 3,
    last: "40%"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 20,
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13,
      color: WC.sub
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "heart",
    size: 17,
    color: WC.sub
  }), " 42"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13,
      color: WC.sub
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "message-circle",
    size: 17,
    color: WC.sub
  }), " 8")));
}
function ScreenCommunityPosts() {
  return /*#__PURE__*/React.createElement(WAppFrame, {
    railActive: "community"
  }, /*#__PURE__*/React.createElement(WCommunityShell, {
    active: "posts"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      overflow: "hidden",
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(WHeading, {
    title: "\u041F\u043E\u0441\u0442\u044B"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, ["Все", "Объявления", "Обсуждения"].map((t, i) => /*#__PURE__*/React.createElement(WPill, {
    key: t,
    style: i === 0 ? {
      background: WC.fill,
      color: WC.ink,
      borderColor: WC.lineStrong
    } : {}
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      width: "100%",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(PostComposer, null), /*#__PURE__*/React.createElement(PostCard, {
    pinned: true
  }), /*#__PURE__*/React.createElement(TextPostCard, null)))));
}

// ---- Courses tab (player view: lesson list + content pane) ----
function LessonItem({
  label,
  active,
  done,
  locked,
  num
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "9px 12px",
      borderRadius: 10,
      background: active ? WC.fill : "transparent",
      boxShadow: active ? `inset 0 0 0 1px ${WC.lineStrong}` : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      border: `1px solid ${done ? WC.lineStrong : WC.line}`,
      background: done ? WC.fill : "#fff",
      display: "grid",
      placeItems: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: locked ? "lock" : done ? "check" : "play",
    size: 12,
    color: WC.sub
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 13,
      fontWeight: active ? 600 : 500,
      color: active ? WC.ink : WC.sub,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: WC.muted,
      fontFamily: WC.mono
    }
  }, num));
}
function CourseLessonList() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 256,
      flex: "none",
      borderRight: `1px solid ${WC.line}`,
      display: "flex",
      flexDirection: "column",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 16px 12px",
      borderBottom: `1px solid ${WC.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: WC.ink
    }
  }, "\u041E\u0441\u043D\u043E\u0432\u044B \u043B\u0438\u0447\u043D\u043E\u0433\u043E \u0431\u0440\u0435\u043D\u0434\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 6,
      borderRadius: 3,
      background: WC.fill,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "40%",
      height: "100%",
      background: WC.primary
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: WC.muted,
      fontFamily: WC.mono
    }
  }, "4/10"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "hidden",
      padding: 10,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: WC.muted,
      textTransform: "uppercase",
      letterSpacing: ".04em",
      padding: "4px 12px 6px"
    }
  }, "\u041C\u043E\u0434\u0443\u043B\u044C 1 \xB7 \u0412\u0432\u0435\u0434\u0435\u043D\u0438\u0435"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement(LessonItem, {
    label: "\u0417\u0430\u0447\u0435\u043C \u043D\u0443\u0436\u0435\u043D \u0431\u0440\u0435\u043D\u0434",
    done: true,
    num: "6:12"
  }), /*#__PURE__*/React.createElement(LessonItem, {
    label: "\u0410\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F \u0438 \u043D\u0438\u0448\u0430",
    done: true,
    num: "9:40"
  }), /*#__PURE__*/React.createElement(LessonItem, {
    label: "\u041F\u043E\u0437\u0438\u0446\u0438\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435",
    active: true,
    num: "12:05"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: WC.muted,
      textTransform: "uppercase",
      letterSpacing: ".04em",
      padding: "4px 12px 6px"
    }
  }, "\u041C\u043E\u0434\u0443\u043B\u044C 2 \xB7 \u041A\u043E\u043D\u0442\u0435\u043D\u0442"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement(LessonItem, {
    label: "\u041A\u043E\u043D\u0442\u0435\u043D\u0442-\u043F\u043B\u0430\u043D",
    num: "8:30"
  }), /*#__PURE__*/React.createElement(LessonItem, {
    label: "\u0421\u044A\u0451\u043C\u043A\u0430 \u0438 \u043C\u043E\u043D\u0442\u0430\u0436",
    locked: true,
    num: "14:20"
  })))));
}
function ScreenCommunityCourses() {
  return /*#__PURE__*/React.createElement(WAppFrame, {
    railActive: "community"
  }, /*#__PURE__*/React.createElement(WCommunityShell, {
    active: "courses"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(CourseLessonList, null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      overflow: "hidden",
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(WImg, {
    h: 300,
    radius: 14,
    label: "\u0432\u0438\u0434\u0435\u043E \u0443\u0440\u043E\u043A\u0430",
    icon: "play-circle",
    iconSize: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(WPill, null, "\u0423\u0440\u043E\u043A 3 \u0438\u0437 10"), /*#__PURE__*/React.createElement(WPill, {
    icon: "clock"
  }, "12:05")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      color: WC.ink
    }
  }, "\u041F\u043E\u0437\u0438\u0446\u0438\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435: \u043A\u0430\u043A \u0432\u044B\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F"), /*#__PURE__*/React.createElement(WLines, {
    n: 3,
    last: "60%"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(WBtn, {
    variant: "secondary",
    icon: "arrow-left"
  }, "\u041D\u0430\u0437\u0430\u0434"), /*#__PURE__*/React.createElement(WBtn, {
    iconRight: "arrow-right"
  }, "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0443\u0440\u043E\u043A"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(WBtn, {
    variant: "ghost",
    icon: "check"
  }, "\u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u043D\u044B\u043C"))))));
}

// ---- Community photo dropdown menu (admin / member) ----
function MenuItem({
  icon,
  label,
  danger
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      padding: "10px 12px",
      borderRadius: 10,
      fontSize: 14,
      fontWeight: 500,
      color: danger ? WC.sub : WC.ink
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: icon,
    size: 18,
    color: WC.sub
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, label));
}
function CommunityMenu({
  admin
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 132,
      left: 10,
      width: 236,
      background: "#fff",
      border: `1px solid ${WC.line}`,
      borderRadius: 14,
      boxShadow: "0 14px 40px rgba(0,0,0,.16)",
      padding: 6,
      zIndex: 20
    }
  }, admin && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "4px 12px 2px"
    }
  }, /*#__PURE__*/React.createElement(WNote, null, "\u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u0430\u0434\u043C\u0438\u043D\u0430")), /*#__PURE__*/React.createElement(MenuItem, {
    icon: "settings",
    label: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430"
  }), /*#__PURE__*/React.createElement(MenuItem, {
    icon: "palette",
    label: "\u0412\u043D\u0435\u0448\u043D\u0438\u0439 \u0432\u0438\u0434"
  }), /*#__PURE__*/React.createElement(MenuItem, {
    icon: "layout-dashboard",
    label: "\u0414\u0430\u0448\u0431\u043E\u0440\u0434"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: WC.line,
      margin: "5px 8px"
    }
  })), /*#__PURE__*/React.createElement(MenuItem, {
    icon: "user-plus",
    label: "\u041F\u0440\u0438\u0433\u043B\u0430\u0441\u0438\u0442\u044C \u0432 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E"
  }), /*#__PURE__*/React.createElement(MenuItem, {
    icon: "log-out",
    label: "\u041F\u043E\u043A\u0438\u043D\u0443\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E",
    danger: true
  }));
}
function ScreenCommunityMenu({
  admin
}) {
  return /*#__PURE__*/React.createElement(WAppFrame, {
    railActive: "community"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: "none",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(WCommunitySidebar, {
    active: "posts",
    menuOpen: true
  }), /*#__PURE__*/React.createElement(CommunityMenu, {
    admin: admin
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: WC.recess,
      opacity: 0.6
    }
  })));
}
Object.assign(window, {
  ScreenCommunityPosts,
  ScreenCommunityCourses,
  ScreenCommunityChat,
  ScreenCommunityAddChannel,
  ScreenCommunityMenu,
  CommunityMenu
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "wireframes/wire-community.jsx", error: String((e && e.message) || e) }); }

// wireframes/wire-create-preview.jsx
try { (() => {
// wire-create-preview.jsx — Bean wireframe: create-community modal + public preview page

// ---- Create community modal (over dimmed app shell) ----
function ScreenCreateModal() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      fontFamily: WC.font
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      filter: "saturate(0)",
      opacity: 0.5,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(WAppFrame, {
    railActive: "community"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: WC.recess
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,.32)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "grid",
      placeItems: "center",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 440,
      maxWidth: "100%",
      background: "#fff",
      border: `1px solid ${WC.line}`,
      borderRadius: 24,
      padding: 28,
      boxShadow: "0 30px 70px rgba(0,0,0,.22)",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 20,
      fontWeight: 700,
      color: WC.ink
    }
  }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E"), /*#__PURE__*/React.createElement(WIcon, {
    name: "x",
    size: 20,
    color: WC.muted
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(UploadField, {
    label: "\u041B\u043E\u0433\u043E\u0442\u0438\u043F",
    h: 92,
    icon: "bean",
    hint: "\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E"
  }), /*#__PURE__*/React.createElement(WInput, {
    label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430",
    placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430"
  }), /*#__PURE__*/React.createElement(WInput, {
    label: "URL",
    value: "profound-university",
    prefix: "bean.com/",
    mono: true,
    helper: "\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0435 \u0438\u043C\u044F \u2014 \u043F\u043E\u0434\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438"
  }), /*#__PURE__*/React.createElement(WBtn, {
    size: "l",
    full: true
  }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C")))));
}

// ---- Public community preview ----
function PublicHeader() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderBottom: `1px solid ${WC.line}`,
      padding: "0 24px",
      height: 60,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 10,
      border: `1px solid ${WC.line}`,
      background: WC.recess,
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "bean",
    size: 18,
    color: WC.ink,
    stroke: 2.2
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: "-0.02em",
      color: WC.ink
    }
  }, "Bean")), /*#__PURE__*/React.createElement(WBtn, {
    variant: "secondary"
  }, "\u0412\u043E\u0439\u0442\u0438"));
}
function PreviewPricingCard() {
  return /*#__PURE__*/React.createElement(WCard, {
    pad: 18,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, [["₽ 990 / мес", null, false], ["₽ 4 990 / 6 мес", "−15%", true], ["₽ 8 990 / год", "−24%", false]].map(([label, disc, on], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      borderRadius: 14,
      border: `${on ? 2 : 1}px solid ${on ? WC.primary : WC.line}`,
      background: on ? WC.fill : "#fff",
      padding: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 16,
      height: 16,
      borderRadius: "50%",
      border: `2px solid ${on ? WC.primary : WC.line}`,
      background: on ? WC.primary : "#fff",
      flex: "none",
      boxShadow: on ? "inset 0 0 0 3px #fff" : "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14,
      fontWeight: 500,
      color: WC.ink
    }
  }, label), disc && /*#__PURE__*/React.createElement(WPill, null, disc)))), /*#__PURE__*/React.createElement(WBtn, {
    size: "l",
    full: true
  }, "\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u0438\u0442\u044C\u0441\u044F"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      fontSize: 13,
      color: WC.sub
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "users",
    size: 15,
    color: WC.sub
  }), " 1 284 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430"));
}
function ScreenCommunityPreview() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      overflow: "hidden",
      background: WC.recess,
      display: "flex",
      flexDirection: "column",
      fontFamily: WC.font
    }
  }, /*#__PURE__*/React.createElement(PublicHeader, null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "hidden",
      padding: "28px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: "0 auto",
      display: "flex",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(WImg, {
    h: 380,
    radius: 16,
    label: "\u043C\u0435\u0434\u0438\u0430 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430",
    icon: "image",
    iconSize: 36
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 12
    }
  }, [0, 1, 2, 3].map(k => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      width: 70,
      height: 50,
      borderRadius: 10,
      background: WC.fillSoft,
      border: `${k === 0 ? 2 : 1}px solid ${k === 0 ? WC.primary : WC.line}`
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 26,
      fontWeight: 700,
      color: WC.ink
    }
  }, "ProFound University"), /*#__PURE__*/React.createElement(WPill, {
    icon: "badge-check"
  }, "\u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "14px 0 0",
      fontSize: 15,
      lineHeight: 1.6,
      color: WC.sub
    }
  }, "\u0417\u0430\u043A\u0440\u044B\u0442\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E \u0434\u043B\u044F \u0442\u0435\u0445, \u043A\u0442\u043E \u0441\u0442\u0440\u043E\u0438\u0442 \u043B\u0438\u0447\u043D\u044B\u0439 \u0431\u0440\u0435\u043D\u0434 \u0438 \u0437\u0430\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u0442 \u043D\u0430 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0435. \u041A\u0443\u0440\u0441\u044B, \u0440\u0430\u0437\u0431\u043E\u0440\u044B \u0438 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 \u043A\u043E\u043C\u044C\u044E\u043D\u0438\u0442\u0438."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(WLines, {
    n: 4,
    last: "45%"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 17,
      fontWeight: 700,
      color: WC.ink
    }
  }, "\u0427\u0442\u043E \u0432\u043D\u0443\u0442\u0440\u0438"), [["book-open", "Курсы и разборы"], ["newspaper", "Регулярные посты и эфиры"], ["users", "Закрытое комьюнити"]].map(([ic, t]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 10,
      border: `1px solid ${WC.line}`,
      background: "#fff",
      display: "grid",
      placeItems: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: ic,
    size: 18,
    color: WC.sub
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: WC.ink
    }
  }, t))))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 320,
      flex: "none",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(PreviewPricingCard, null), /*#__PURE__*/React.createElement(WCard, {
    pad: 14,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(WAvatar, {
    size: 40,
    icon: "user"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: WC.ink
    }
  }, "\u0410\u0440\u043A\u0430\u0434\u0438\u0439 \u041F."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: WC.sub
    }
  }, "\u0410\u0432\u0442\u043E\u0440 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430")))))));
}

// companion: join while logged-out → auth dialog
function StatePreviewAuthDialog() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      background: WC.recess,
      position: "relative",
      overflow: "hidden",
      fontFamily: WC.font
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0.4
    }
  }, /*#__PURE__*/React.createElement(WImg, {
    h: "100%",
    radius: 0,
    label: ""
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,.3)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "grid",
      placeItems: "center",
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 320,
      background: "#fff",
      border: `1px solid ${WC.line}`,
      borderRadius: 20,
      padding: 24,
      boxShadow: "0 24px 60px rgba(0,0,0,.2)",
      boxSizing: "border-box",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(WNote, null, "\u0432\u0445\u043E\u0434 \u0434\u043B\u044F \u0433\u043E\u0441\u0442\u044F"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 13,
      border: `1px solid ${WC.line}`,
      background: WC.recess,
      display: "grid",
      placeItems: "center",
      margin: "14px auto 12px"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "bean",
    size: 24,
    color: WC.ink
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: WC.ink,
      marginBottom: 6
    }
  }, "\u0412\u043E\u0439\u0434\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0432\u0441\u0442\u0443\u043F\u0438\u0442\u044C"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 16px",
      fontSize: 13,
      color: WC.sub
    }
  }, "\u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0430\u043A\u043A\u0430\u0443\u043D\u0442 \u0438\u043B\u0438 \u0432\u043E\u0439\u0434\u0438\u0442\u0435 \u0434\u043B\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0443."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(WInput, {
    placeholder: "example@gmail.com"
  }), /*#__PURE__*/React.createElement(WBtn, {
    size: "l",
    full: true
  }, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C")))));
}
function StatePreviewLoading() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      background: "#fff",
      padding: 22,
      boxSizing: "border-box",
      fontFamily: WC.font,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(WNote, null, "\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u2014 \u0441\u043A\u0435\u043B\u0435\u0442\u043E\u043D"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 110,
      height: 110,
      borderRadius: 14,
      background: WC.skeleton
    }
  }), /*#__PURE__*/React.createElement(WBar, {
    w: "60%",
    h: 20
  }), /*#__PURE__*/React.createElement(WLines, {
    n: 4,
    last: "40%"
  }), /*#__PURE__*/React.createElement(WBar, {
    w: "100%",
    h: 44,
    round: 12,
    mt: 6
  }));
}
Object.assign(window, {
  ScreenCreateModal,
  ScreenCommunityPreview,
  StatePreviewAuthDialog,
  StatePreviewLoading
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "wireframes/wire-create-preview.jsx", error: String((e && e.message) || e) }); }

// wireframes/wire-kit.jsx
try { (() => {
// wire-kit.jsx — Bean wireframe primitives (mid-fi greyscale + real Lucide icons + real copy)
// Exports to window for use across babel script files.

const WC = {
  paper: "#ffffff",
  gutter: "#efefef",
  recess: "#f5f5f5",
  line: "#dcdcdc",
  lineStrong: "#cfcfcf",
  fill: "#eaeaea",
  fillSoft: "#f0f0f0",
  skeleton: "#e4e4e4",
  ink: "#2a2a2a",
  sub: "#787878",
  muted: "#a6a6a6",
  primary: "#3a3a3a",
  // wireframe "primary action" — dark grey, no brand color
  textOnPrimary: "#ffffff",
  danger: "#9a9a9a",
  active: "#e9e9e9",
  // selected nav/tab/rail surface
  stroke: 2,
  // default icon stroke weight (driven by the Linework tweak)
  font: 'var(--font-sans), system-ui, sans-serif',
  mono: 'var(--font-mono), monospace'
};

// Lucide icon (1:1 with the app). Builds the SVG directly from Lucide's icon
// data — no document scan, so hundreds of icons render fast on the canvas.
function _wPascal(name) {
  return name.split("-").map(p => p ? p[0].toUpperCase() + p.slice(1) : "").join("");
}
const _wIconCache = {};
function _wIconSvg(name, size, stroke) {
  const cacheKey = name + "|" + size + "|" + stroke;
  if (_wIconCache[cacheKey]) return _wIconCache[cacheKey];
  const L = window.lucide || {};
  const node = L.icons && L.icons[_wPascal(name)] || L[_wPascal(name)];
  if (!node) return "";
  const children = node.map(([tag, attrs]) => `<${tag} ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(" ")} />`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${children}</svg>`;
  _wIconCache[cacheKey] = svg;
  return svg;
}
function WIcon({
  name,
  size = 20,
  stroke,
  color = WC.sub,
  style = {}
}) {
  const sw = stroke == null ? WC.stroke || 2 : stroke;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color,
      lineHeight: 0,
      flex: "none",
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: _wIconSvg(name, size, sw)
    }
  });
}

// Skeleton text bar (for de-emphasized / placeholder body content)
function WBar({
  w = "100%",
  h = 8,
  mt = 0,
  mb = 0,
  color = WC.skeleton,
  round = 4
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: w,
      height: h,
      marginTop: mt,
      marginBottom: mb,
      background: color,
      borderRadius: round,
      flex: "none"
    }
  });
}

// A few stacked skeleton lines
function WLines({
  n = 3,
  gap = 9,
  last = "70%",
  h = 8
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap
    }
  }, Array.from({
    length: n
  }).map((_, i) => /*#__PURE__*/React.createElement(WBar, {
    key: i,
    h: h,
    w: i === n - 1 ? last : "100%"
  })));
}

// Image / media placeholder — classic wireframe crossed box
function WImg({
  w = "100%",
  h = 120,
  radius = 12,
  label,
  icon = "image",
  iconSize = 26
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: w,
      height: h,
      borderRadius: radius,
      background: WC.fillSoft,
      border: `1px solid ${WC.line}`,
      position: "relative",
      overflow: "hidden",
      flex: "none",
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%"
    },
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "0",
    x2: "100%",
    y2: "100%",
    stroke: WC.line,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "100%",
    y1: "0",
    x2: "0",
    y2: "100%",
    stroke: WC.line,
    strokeWidth: "1"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
      color: WC.muted
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: icon,
    size: iconSize,
    color: WC.muted
  }), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: WC.muted,
      fontFamily: WC.font
    }
  }, label)));
}

// Avatar placeholder (crossed circle)
function WAvatar({
  size = 40,
  icon = "user",
  radius
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: radius != null ? radius : "50%",
      background: WC.fillSoft,
      border: `1px solid ${WC.line}`,
      display: "grid",
      placeItems: "center",
      flex: "none",
      overflow: "hidden",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: icon,
    size: size * 0.5,
    color: WC.muted
  }));
}

// Button — variants signal hierarchy with greyscale only
function WBtn({
  variant = "primary",
  size = "m",
  full,
  icon,
  iconRight,
  children,
  style = {}
}) {
  const pad = {
    s: "7px 12px",
    m: "10px 16px",
    l: "13px 22px"
  }[size];
  const fs = {
    s: 13,
    m: 14,
    l: 15
  }[size];
  const variants = {
    primary: {
      background: WC.primary,
      color: WC.textOnPrimary,
      border: `1px solid ${WC.primary}`
    },
    secondary: {
      background: "#fff",
      color: WC.ink,
      border: `1px solid ${WC.lineStrong}`
    },
    ghost: {
      background: "transparent",
      color: WC.sub,
      border: "1px solid transparent"
    },
    danger: {
      background: "#fff",
      color: WC.sub,
      border: `1px solid ${WC.lineStrong}`
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    style: {
      fontFamily: WC.font,
      fontWeight: 600,
      fontSize: fs,
      lineHeight: "120%",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      padding: pad,
      borderRadius: 14,
      width: full ? "100%" : "auto",
      whiteSpace: "nowrap",
      ...variants[variant],
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement(WIcon, {
    name: icon,
    size: fs + 2,
    color: variant === "primary" ? WC.textOnPrimary : WC.sub
  }), children, iconRight && /*#__PURE__*/React.createElement(WIcon, {
    name: iconRight,
    size: fs + 2,
    color: variant === "primary" ? WC.textOnPrimary : WC.sub
  }));
}

// Form label
function WLabel({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: WC.ink,
      fontFamily: WC.font,
      ...style
    }
  }, children);
}

// Input field shell
function WInput({
  label,
  value,
  placeholder,
  prefix,
  suffix,
  helper,
  full = true,
  mono,
  h = 44,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7,
      width: full ? "100%" : "auto",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement(WLabel, null, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "#fff",
      border: `1px solid ${WC.line}`,
      borderRadius: 14,
      padding: "0 14px",
      height: h
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: WC.muted,
      fontSize: 14,
      fontFamily: WC.font,
      flex: "none"
    }
  }, prefix), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14,
      fontFamily: mono ? WC.mono : WC.font,
      color: value ? WC.ink : WC.muted,
      minWidth: 0,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, value || placeholder), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: WC.muted,
      flex: "none",
      display: "inline-flex"
    }
  }, suffix)), helper && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: WC.muted,
      fontFamily: WC.font
    }
  }, helper));
}

// Textarea shell
function WTextarea({
  label,
  placeholder,
  rows = 3
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7
    }
  }, label && /*#__PURE__*/React.createElement(WLabel, null, label), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: `1px solid ${WC.line}`,
      borderRadius: 14,
      padding: 14,
      minHeight: rows * 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: WC.muted,
      fontFamily: WC.font
    }
  }, placeholder)));
}

// Toggle (greyscale)
function WToggle({
  on
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 24,
      borderRadius: 9999,
      position: "relative",
      flex: "none",
      background: on ? WC.primary : WC.line
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 4,
      left: on ? 24 : 4,
      width: 16,
      height: 16,
      borderRadius: "50%",
      background: "#fff"
    }
  }));
}

// Pill / badge
function WPill({
  children,
  icon,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "3px 10px",
      borderRadius: 9999,
      border: `1px solid ${WC.line}`,
      background: WC.recess,
      fontSize: 12,
      fontWeight: 500,
      color: WC.sub,
      fontFamily: WC.font,
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement(WIcon, {
    name: icon,
    size: 13,
    color: WC.sub
  }), children);
}

// Vertical nav tab (settings + community)
function WTab({
  icon,
  label,
  active,
  danger,
  trailing
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "9px 14px",
      borderRadius: 12,
      fontFamily: WC.font,
      fontSize: 14,
      fontWeight: 600,
      color: danger ? WC.sub : active ? WC.ink : WC.sub,
      background: active ? WC.active : "transparent",
      boxShadow: active ? `inset 0 0 0 1px ${WC.lineStrong}` : "none"
    }
  }, icon && /*#__PURE__*/React.createElement(WIcon, {
    name: icon,
    size: 19,
    color: active ? WC.ink : WC.sub
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, label), trailing);
}

// Card / surface
function WCard({
  children,
  pad = 20,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: `1px solid ${WC.line}`,
      borderRadius: 16,
      padding: pad,
      ...style
    }
  }, children);
}

// Section heading with optional sub
function WHeading({
  title,
  sub,
  size = 24
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: sub ? 5 : 0
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: size,
      fontWeight: 700,
      color: WC.ink,
      fontFamily: WC.font,
      letterSpacing: "-0.01em"
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      color: WC.sub,
      fontFamily: WC.font
    }
  }, sub));
}

// Annotation tag — small mono note to call out a wireframe state/role
function WNote({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "2px 8px",
      borderRadius: 6,
      border: `1px dashed ${WC.lineStrong}`,
      background: WC.recess,
      fontSize: 11,
      fontWeight: 500,
      color: WC.sub,
      fontFamily: WC.mono,
      letterSpacing: "0.01em",
      ...style
    }
  }, children);
}
Object.assign(window, {
  WC,
  WIcon,
  WBar,
  WLines,
  WImg,
  WAvatar,
  WBtn,
  WLabel,
  WInput,
  WTextarea,
  WToggle,
  WPill,
  WTab,
  WCard,
  WHeading,
  WNote
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "wireframes/wire-kit.jsx", error: String((e && e.message) || e) }); }

// wireframes/wire-roles-courses.jsx
try { (() => {
// wire-roles-courses.jsx — Bean role split: COURSES surface
// Member = player. Admin = same screen + "Редактировать курс" → inline
// constructor (Model A). Plus Model B (always-on) and Model C (studio) variants.

// ---- Top bar above the course body ----
function CourseTopBar({
  mode
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none",
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "11px 22px",
      borderBottom: `1px solid ${WC.line}`,
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement(WBtn, {
    variant: "ghost",
    size: "s",
    icon: "arrow-left"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: WC.sub
    }
  }, "\u041A\u0443\u0440\u0441 \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: WC.ink
    }
  }, "\u041E\u0441\u043D\u043E\u0432\u044B \u043B\u0438\u0447\u043D\u043E\u0433\u043E \u0431\u0440\u0435\u043D\u0434\u0430")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), mode === "member" && /*#__PURE__*/React.createElement(RoleTag, {
    role: "member"
  }), mode === "adminView" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RoleTag, {
    role: "admin"
  }), /*#__PURE__*/React.createElement(SectionEditBtn, {
    label: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u0443\u0440\u0441"
  })));
}

// ---- Lesson row (varies by mode) ----
function CLesson({
  label,
  num,
  active,
  done,
  locked,
  draft,
  edit,
  addingHere
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      padding: "9px 10px",
      borderRadius: 10,
      background: active ? WC.fill : "transparent",
      boxShadow: active ? `inset 0 0 0 1px ${WC.lineStrong}` : "none",
      border: addingHere ? `1px dashed ${WC.lineStrong}` : "1px solid transparent"
    }
  }, edit && /*#__PURE__*/React.createElement(Grip, null), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      border: `1px solid ${done ? WC.lineStrong : WC.line}`,
      background: done ? WC.fill : "#fff",
      display: "grid",
      placeItems: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: locked ? "lock" : done ? "check" : edit ? "video" : "play",
    size: 12,
    color: WC.sub
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 13,
      fontWeight: active ? 600 : 500,
      color: active ? WC.ink : WC.sub,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, label), draft && /*#__PURE__*/React.createElement(WPill, {
    style: {
      padding: "1px 7px",
      fontSize: 10
    }
  }, "\u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A"), edit ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MicroAction, {
    icon: "pencil"
  }), /*#__PURE__*/React.createElement(MicroAction, {
    icon: "trash-2",
    danger: true
  })) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: WC.muted,
      fontFamily: WC.mono
    }
  }, num));
}
function CModule({
  title,
  edit,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "8px 10px 6px"
    }
  }, edit && /*#__PURE__*/React.createElement(Grip, null), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 11,
      fontWeight: 700,
      color: WC.muted,
      textTransform: "uppercase",
      letterSpacing: ".04em"
    }
  }, title), edit && /*#__PURE__*/React.createElement(WIcon, {
    name: "pencil",
    size: 13,
    color: WC.muted
  })), children);
}
function CourseSide({
  mode
}) {
  const edit = mode === "edit";
  if (mode === "empty") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: 264,
        flex: "none",
        borderRight: `1px solid ${WC.line}`,
        background: "#fff",
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(EditField, {
      value: "\u041D\u043E\u0432\u044B\u0439 \u043A\u0443\u0440\u0441"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(AddRow, {
      label: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043C\u043E\u0434\u0443\u043B\u044C"
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 264,
      flex: "none",
      borderRight: `1px solid ${WC.line}`,
      display: "flex",
      flexDirection: "column",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 14px 12px",
      borderBottom: `1px solid ${WC.line}`
    }
  }, edit ? /*#__PURE__*/React.createElement(EditField, {
    value: "\u041E\u0441\u043D\u043E\u0432\u044B \u043B\u0438\u0447\u043D\u043E\u0433\u043E \u0431\u0440\u0435\u043D\u0434\u0430"
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: WC.ink
    }
  }, "\u041E\u0441\u043D\u043E\u0432\u044B \u043B\u0438\u0447\u043D\u043E\u0433\u043E \u0431\u0440\u0435\u043D\u0434\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 6,
      borderRadius: 3,
      background: WC.fill,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "40%",
      height: "100%",
      background: WC.primary
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: WC.muted,
      fontFamily: WC.mono
    }
  }, "4/10")))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "hidden",
      padding: 8,
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(CModule, {
    title: "\u041C\u043E\u0434\u0443\u043B\u044C 1 \xB7 \u0412\u0432\u0435\u0434\u0435\u043D\u0438\u0435",
    edit: edit
  }, /*#__PURE__*/React.createElement(CLesson, {
    label: "\u0417\u0430\u0447\u0435\u043C \u043D\u0443\u0436\u0435\u043D \u0431\u0440\u0435\u043D\u0434",
    done: true,
    num: "6:12",
    edit: edit
  }), /*#__PURE__*/React.createElement(CLesson, {
    label: "\u0410\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F \u0438 \u043D\u0438\u0448\u0430",
    done: true,
    num: "9:40",
    edit: edit
  }), /*#__PURE__*/React.createElement(CLesson, {
    label: "\u041F\u043E\u0437\u0438\u0446\u0438\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435",
    active: true,
    num: "12:05",
    edit: edit
  })), edit && /*#__PURE__*/React.createElement(AddRow, {
    label: "\u0423\u0440\u043E\u043A \u0432 \u043C\u043E\u0434\u0443\u043B\u044C 1",
    size: 12
  }), /*#__PURE__*/React.createElement(CModule, {
    title: "\u041C\u043E\u0434\u0443\u043B\u044C 2 \xB7 \u041A\u043E\u043D\u0442\u0435\u043D\u0442",
    edit: edit
  }, /*#__PURE__*/React.createElement(CLesson, {
    label: "\u041A\u043E\u043D\u0442\u0435\u043D\u0442-\u043F\u043B\u0430\u043D",
    num: "8:30",
    edit: edit
  }), edit ? /*#__PURE__*/React.createElement(CLesson, {
    label: "\u0421\u044A\u0451\u043C\u043A\u0430 \u0438 \u043C\u043E\u043D\u0442\u0430\u0436",
    draft: true,
    edit: true,
    num: "14:20"
  }) : /*#__PURE__*/React.createElement(CLesson, {
    label: "\u0421\u044A\u0451\u043C\u043A\u0430 \u0438 \u043C\u043E\u043D\u0442\u0430\u0436",
    locked: true,
    num: "14:20"
  })), edit && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AddRow, {
    label: "\u0423\u0440\u043E\u043A \u0432 \u043C\u043E\u0434\u0443\u043B\u044C 2",
    size: 12
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6
    }
  }), /*#__PURE__*/React.createElement(AddRow, {
    label: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043C\u043E\u0434\u0443\u043B\u044C"
  }))));
}

// ---- Content pane ----
function CoursePane({
  mode
}) {
  if (mode === "empty") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0,
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: WC.recess
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        maxWidth: 360,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 64,
        height: 64,
        borderRadius: 18,
        border: `1px dashed ${WC.lineStrong}`,
        display: "grid",
        placeItems: "center"
      }
    }, /*#__PURE__*/React.createElement(WIcon, {
      name: "book-open",
      size: 28,
      color: WC.muted
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 700,
        color: WC.ink
      }
    }, "\u0412 \u043A\u0443\u0440\u0441\u0435 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0443\u0440\u043E\u043A\u043E\u0432"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 14,
        color: WC.sub,
        lineHeight: 1.5
      }
    }, "\u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0432\u044B\u0439 \u043C\u043E\u0434\u0443\u043B\u044C, \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0432 \u043D\u0435\u0433\u043E \u0443\u0440\u043E\u043A\u0438 \u2014 \u0432\u0438\u0434\u0435\u043E, \u0442\u0435\u043A\u0441\u0442 \u0438\u043B\u0438 \u0442\u0435\u0441\u0442. \u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438 \u0443\u0432\u0438\u0434\u044F\u0442 \u043A\u0443\u0440\u0441, \u043A\u043E\u0433\u0434\u0430 \u0432\u044B \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u0443\u0435\u0442\u0435."), /*#__PURE__*/React.createElement(WBtn, {
      icon: "plus"
    }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043C\u043E\u0434\u0443\u043B\u044C")));
  }
  const edit = mode === "edit";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      overflow: "hidden",
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 16,
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(WImg, {
    h: 280,
    radius: 14,
    label: edit ? "загрузите видео урока" : "видео урока",
    icon: edit ? "upload" : "play-circle",
    iconSize: 38
  }), edit && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 12,
      bottom: 12
    }
  }, /*#__PURE__*/React.createElement(WBtn, {
    variant: "secondary",
    size: "s",
    icon: "upload"
  }, "\u0417\u0430\u043C\u0435\u043D\u0438\u0442\u044C"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(WPill, null, "\u0423\u0440\u043E\u043A 3 \u0438\u0437 10"), /*#__PURE__*/React.createElement(WPill, {
    icon: "clock"
  }, "12:05"), edit && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(WPill, {
    icon: "lock"
  }, "\u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: WC.sub
    }
  }, "\u041F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C"), /*#__PURE__*/React.createElement(WToggle, {
    on: true
  }))), edit ? /*#__PURE__*/React.createElement(EditField, {
    value: "\u041F\u043E\u0437\u0438\u0446\u0438\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435: \u043A\u0430\u043A \u0432\u044B\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F"
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      color: WC.ink
    }
  }, "\u041F\u043E\u0437\u0438\u0446\u0438\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435: \u043A\u0430\u043A \u0432\u044B\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F"), edit ? /*#__PURE__*/React.createElement(EditField, {
    multiline: true,
    h: 88,
    value: "\u041A\u043E\u043D\u0441\u043F\u0435\u043A\u0442 \u0443\u0440\u043E\u043A\u0430, \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u0438 \u0437\u0430\u0434\u0430\u043D\u0438\u0435. \u0422\u0435\u043A\u0441\u0442 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u0442\u0441\u044F \u043F\u0440\u044F\u043C\u043E \u0437\u0434\u0435\u0441\u044C \u2014 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A \u0443\u0432\u0438\u0434\u0438\u0442 \u0435\u0433\u043E \u043F\u043E\u0434 \u0432\u0438\u0434\u0435\u043E."
  }) : /*#__PURE__*/React.createElement(WLines, {
    n: 3,
    last: "60%"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), edit ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(WBtn, {
    variant: "ghost",
    icon: "trash-2"
  }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0443\u0440\u043E\u043A"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(WBtn, {
    variant: "secondary",
    icon: "eye"
  }, "\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043A\u0430\u043A \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(WBtn, {
    variant: "secondary",
    icon: "arrow-left"
  }, "\u041D\u0430\u0437\u0430\u0434"), /*#__PURE__*/React.createElement(WBtn, {
    iconRight: "arrow-right"
  }, "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0443\u0440\u043E\u043A"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(WBtn, {
    variant: "ghost",
    icon: "check"
  }, "\u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u043D\u044B\u043C")));
}

// ---- Assembled course screen (Model A) ----
function CourseScreen({
  mode
}) {
  return /*#__PURE__*/React.createElement(WAppFrame, {
    railActive: "community"
  }, /*#__PURE__*/React.createElement(WCommunitySidebar, {
    active: "courses"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0
    }
  }, mode === "edit" ? /*#__PURE__*/React.createElement(EditModeBar, {
    label: "\u041A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440 \u043A\u0443\u0440\u0441\u0430",
    hint: "\xAB\u041E\u0441\u043D\u043E\u0432\u044B \u043B\u0438\u0447\u043D\u043E\u0433\u043E \u0431\u0440\u0435\u043D\u0434\u0430\xBB \xB7 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0438 \u0441\u043A\u0440\u044B\u0442\u044B \u043E\u0442 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432"
  }) : /*#__PURE__*/React.createElement(CourseTopBar, {
    mode: mode
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: "flex",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(CourseSide, {
    mode: mode
  }), /*#__PURE__*/React.createElement(CoursePane, {
    mode: mode
  }))));
}
const ScreenCoursesMember = () => /*#__PURE__*/React.createElement(CourseScreen, {
  mode: "member"
});
const ScreenCoursesAdminView = () => /*#__PURE__*/React.createElement(CourseScreen, {
  mode: "adminView"
});
const ScreenCoursesEdit = () => /*#__PURE__*/React.createElement(CourseScreen, {
  mode: "edit"
});
const ScreenCoursesEmpty = () => /*#__PURE__*/React.createElement(CourseScreen, {
  mode: "empty"
});

// ---- Add-lesson modal (the "+ урок" affordance, expanded) ----
function AddLessonModal() {
  const types = [["video", "Видео-урок"], ["file-text", "Текст / статья"], ["help-circle", "Тест"], ["mic", "Аудио"]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement(ScreenCoursesEdit, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(20,20,20,.34)",
      display: "grid",
      placeItems: "center",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 460,
      maxWidth: "100%",
      background: "#fff",
      border: `1px solid ${WC.line}`,
      borderRadius: 18,
      boxShadow: "0 18px 50px rgba(0,0,0,.22)",
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(WHeading, {
    title: "\u041D\u043E\u0432\u044B\u0439 \u0443\u0440\u043E\u043A",
    size: 20
  }), /*#__PURE__*/React.createElement(WIcon, {
    name: "x",
    size: 20,
    color: WC.muted
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(WLabel, null, "\u0422\u0438\u043F \u0443\u0440\u043E\u043A\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, types.map(([ic, lb], i) => /*#__PURE__*/React.createElement("div", {
    key: lb,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "13px 14px",
      borderRadius: 13,
      border: `1px solid ${i === 0 ? WC.lineStrong : WC.line}`,
      background: i === 0 ? WC.fill : "#fff"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: ic,
    size: 19,
    color: i === 0 ? WC.ink : WC.sub
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: i === 0 ? WC.ink : WC.sub
    }
  }, lb))))), /*#__PURE__*/React.createElement(WInput, {
    label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0443\u0440\u043E\u043A\u0430",
    placeholder: "\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u041F\u043E\u0437\u0438\u0446\u0438\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(WLabel, null, "\u041C\u043E\u0434\u0443\u043B\u044C"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      border: `1px solid ${WC.line}`,
      borderRadius: 14,
      padding: "0 14px",
      height: 44
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14,
      color: WC.ink
    }
  }, "\u041C\u043E\u0434\u0443\u043B\u044C 1 \xB7 \u0412\u0432\u0435\u0434\u0435\u043D\u0438\u0435"), /*#__PURE__*/React.createElement(WIcon, {
    name: "chevron-down",
    size: 16,
    color: WC.muted
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(WBtn, {
    variant: "ghost"
  }, "\u041E\u0442\u043C\u0435\u043D\u0430"), /*#__PURE__*/React.createElement(WBtn, {
    icon: "plus"
  }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0443\u0440\u043E\u043A")))));
}

// ============================================================
//  Same course, three models (comparison)
// ============================================================

// Model B — always-on controls woven into the player (no mode).
function ScreenCoursesModelB() {
  return /*#__PURE__*/React.createElement(WAppFrame, {
    railActive: "community"
  }, /*#__PURE__*/React.createElement(WCommunitySidebar, {
    active: "courses"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none",
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "11px 22px",
      borderBottom: `1px solid ${WC.line}`,
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: WC.ink
    }
  }, "\u041E\u0441\u043D\u043E\u0432\u044B \u043B\u0438\u0447\u043D\u043E\u0433\u043E \u0431\u0440\u0435\u043D\u0434\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(RoleTag, {
    role: "admin"
  }), /*#__PURE__*/React.createElement(WNote, null, "\u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044B \u0432\u0441\u0435\u0433\u0434\u0430 \u0432\u0438\u0434\u043D\u044B")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: "flex",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(CourseSide, {
    mode: "edit"
  }), /*#__PURE__*/React.createElement(CoursePane, {
    mode: "adminView"
  }))));
}

// Model C — separate "Студия" constructor (member never sees it).
function ScreenCoursesModelC() {
  return /*#__PURE__*/React.createElement(WAppFrame, {
    railActive: "community"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none",
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 22px",
      borderBottom: `1px solid ${WC.line}`,
      background: WC.ink,
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "sliders-horizontal",
    size: 17,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, "\u0421\u0442\u0443\u0434\u0438\u044F \xB7 \u041A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440 \u043A\u0443\u0440\u0441\u0430"), /*#__PURE__*/React.createElement(WNote, {
    style: {
      borderColor: "rgba(255,255,255,.3)",
      color: "rgba(255,255,255,.7)",
      background: "transparent"
    }
  }, "\u043E\u0442\u0434\u0435\u043B\u044C\u043D\u0430\u044F \u0437\u043E\u043D\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(WBtn, {
    variant: "secondary",
    size: "s",
    icon: "eye"
  }, "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u043A \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A"), /*#__PURE__*/React.createElement(WBtn, {
    size: "s",
    icon: "check"
  }, "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: "flex",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(CourseSide, {
    mode: "edit"
  }), /*#__PURE__*/React.createElement(CoursePane, {
    mode: "edit"
  }))));
}
Object.assign(window, {
  ScreenCoursesMember,
  ScreenCoursesAdminView,
  ScreenCoursesEdit,
  ScreenCoursesEmpty,
  AddLessonModal,
  ScreenCoursesModelB,
  ScreenCoursesModelC
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "wireframes/wire-roles-courses.jsx", error: String((e && e.message) || e) }); }

// wireframes/wire-roles-models.jsx
try { (() => {
// wire-roles-models.jsx — Bean: role-split exploration
// Shared role/mode helpers + the three "how to split admin vs member" models
// (overview cards), a capability matrix, and a one-screen-three-ways comparison.

// ============================================================
//  Shared helpers used across the role-split wireframes
// ============================================================

// Role chip — annotates which audience an artboard is for.
function RoleTag({
  role
}) {
  const map = {
    member: {
      icon: "user",
      label: "участник"
    },
    admin: {
      icon: "shield",
      label: "админ"
    },
    edit: {
      icon: "pencil",
      label: "режим ред."
    }
  };
  const m = map[role] || map.member;
  const strong = role === "admin" || role === "edit";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "2px 9px",
      borderRadius: 7,
      border: `1px ${strong ? "solid" : "dashed"} ${strong ? WC.ink : WC.lineStrong}`,
      background: strong ? WC.ink : WC.recess,
      color: strong ? "#fff" : WC.sub,
      fontSize: 11,
      fontWeight: 600,
      fontFamily: WC.mono,
      letterSpacing: ".01em"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: m.icon,
    size: 12,
    color: strong ? "#fff" : WC.sub
  }), " ", m.label);
}

// Contextual "edit this section" entry button — Model A's whole premise.
function SectionEditBtn({
  label = "Редактировать",
  admin = true
}) {
  if (!admin) return null;
  return /*#__PURE__*/React.createElement("button", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      padding: "8px 14px",
      borderRadius: 12,
      border: `1px dashed ${WC.lineStrong}`,
      background: WC.recess,
      color: WC.ink,
      fontFamily: WC.font,
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "pencil",
    size: 15,
    color: WC.sub
  }), " ", label);
}

// The sticky "you are editing" bar that appears once Model A's toggle is ON.
function EditModeBar({
  label = "Режим редактирования",
  hint
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none",
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 22px",
      background: WC.ink,
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "pencil",
    size: 16,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700
    }
  }, label), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "rgba(255,255,255,.6)",
      fontFamily: WC.mono
    }
  }, hint), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      padding: "6px 14px",
      borderRadius: 10,
      border: "1px solid rgba(255,255,255,.3)",
      background: "transparent",
      color: "#fff",
      fontFamily: WC.font,
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "\u041E\u0442\u043C\u0435\u043D\u0430"), /*#__PURE__*/React.createElement("button", {
    style: {
      padding: "6px 14px",
      borderRadius: 10,
      border: "1px solid #fff",
      background: "#fff",
      color: WC.ink,
      fontFamily: WC.font,
      fontSize: 13,
      fontWeight: 700,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "check",
    size: 15,
    color: WC.ink
  }), "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"));
}

// Dashed "add" affordance row (edit-mode add buttons).
function AddRow({
  label,
  dashed = true,
  size = 13
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      padding: "10px 12px",
      borderRadius: 11,
      border: dashed ? `1px dashed ${WC.lineStrong}` : "none",
      color: WC.sub
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "plus",
    size: size + 3,
    color: WC.sub
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size,
      fontWeight: 600
    }
  }, label));
}

// Drag grip — signals "reorderable in edit mode".
function Grip() {
  return /*#__PURE__*/React.createElement(WIcon, {
    name: "grip-vertical",
    size: 16,
    color: WC.muted,
    style: {
      cursor: "grab"
    }
  });
}

// Small inline icon action (pencil / trash / pin / eye) used on hover/admin rows.
function MicroAction({
  icon,
  danger
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      display: "grid",
      placeItems: "center",
      border: `1px solid ${WC.line}`,
      background: "#fff",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: icon,
    size: 15,
    color: WC.sub
  }));
}

// An editable-field shell (shows a value with a faint edit affordance).
function EditField({
  value,
  multiline,
  h = 44
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: multiline ? "flex-start" : "center",
      gap: 8,
      background: "#fff",
      border: `1px solid ${WC.lineStrong}`,
      borderRadius: 12,
      padding: multiline ? "12px 14px" : "0 14px",
      height: multiline ? "auto" : h,
      minHeight: multiline ? h : undefined,
      boxShadow: `0 0 0 3px ${WC.recess}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14,
      color: WC.ink,
      fontFamily: WC.font,
      lineHeight: 1.4
    }
  }, value), /*#__PURE__*/React.createElement(WIcon, {
    name: "pencil",
    size: 14,
    color: WC.muted,
    style: {
      alignSelf: "flex-start",
      marginTop: multiline ? 2 : 0
    }
  }));
}

// ============================================================
//  Model overview cards
// ============================================================

// A miniature two-pane schematic: "что видит участник | что появляется у админа".
function MiniPane({
  title,
  children,
  accent
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      border: `1px solid ${accent ? WC.ink : WC.line}`,
      borderRadius: 12,
      background: accent ? "#fff" : WC.recess,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "7px 11px",
      borderBottom: `1px solid ${WC.line}`,
      display: "flex",
      alignItems: "center",
      gap: 7,
      background: accent ? WC.ink : "transparent"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: accent ? "shield" : "user",
    size: 13,
    color: accent ? "#fff" : WC.muted
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: accent ? "#fff" : WC.muted,
      fontFamily: WC.mono
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 11,
      display: "flex",
      flexDirection: "column",
      gap: 7,
      flex: 1
    }
  }, children));
}
function FauxLine({
  w = "100%",
  strong
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 7,
      width: w,
      borderRadius: 4,
      background: strong ? WC.lineStrong : WC.skeleton
    }
  });
}
function FauxBtn({
  label,
  dark,
  dashed
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: "flex-start",
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "4px 10px",
      borderRadius: 8,
      background: dark ? WC.ink : dashed ? "transparent" : "#fff",
      border: `1px ${dashed ? "dashed" : "solid"} ${dark ? WC.ink : WC.lineStrong}`,
      color: dark ? "#fff" : WC.sub,
      fontSize: 10.5,
      fontWeight: 700,
      fontFamily: WC.mono
    }
  }, label);
}
function ProCon({
  pros,
  cons
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginTop: 2
    }
  }, pros.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: "p" + i,
    style: {
      display: "flex",
      gap: 8,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "plus",
    size: 14,
    color: WC.sub,
    style: {
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: WC.sub,
      lineHeight: 1.4
    }
  }, p))), cons.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: "c" + i,
    style: {
      display: "flex",
      gap: 8,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "minus",
    size: 14,
    color: WC.muted,
    style: {
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: WC.muted,
      lineHeight: 1.4
    }
  }, c))));
}
function ModelCard({
  n,
  name,
  refs,
  line,
  lead,
  member,
  admin,
  pros,
  cons
}) {
  return /*#__PURE__*/React.createElement(WCard, {
    pad: 0,
    style: {
      width: 400,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 20px 16px",
      borderBottom: `1px solid ${WC.line}`,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 8,
      background: lead ? WC.ink : WC.fill,
      color: lead ? "#fff" : WC.sub,
      display: "grid",
      placeItems: "center",
      fontSize: 13,
      fontWeight: 800,
      fontFamily: WC.mono,
      flex: "none"
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: WC.ink,
      lineHeight: 1.2
    }
  }, name)), lead && /*#__PURE__*/React.createElement(WPill, {
    style: {
      background: WC.ink,
      color: "#fff",
      borderColor: WC.ink
    }
  }, "\u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0439")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      color: WC.sub,
      lineHeight: 1.5
    }
  }, line), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }
  }, refs.map(r => /*#__PURE__*/React.createElement(WPill, {
    key: r
  }, r)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      display: "flex",
      gap: 10,
      background: WC.fillSoft
    }
  }, /*#__PURE__*/React.createElement(MiniPane, {
    title: "\u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A"
  }, member), /*#__PURE__*/React.createElement(MiniPane, {
    title: "\u0430\u0434\u043C\u0438\u043D",
    accent: true
  }, admin)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 20px 20px"
    }
  }, /*#__PURE__*/React.createElement(ProCon, {
    pros: pros,
    cons: cons
  })));
}
function ScreenRoleModels() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      padding: "36px 40px",
      background: "#fff",
      overflow: "hidden",
      fontFamily: WC.font
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1320,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(WHeading, {
    title: "\u0422\u0440\u0438 \u043C\u043E\u0434\u0435\u043B\u0438 \u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u0438\u044F \xAB\u0430\u0434\u043C\u0438\u043D \u2194 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\xBB",
    sub: "\u041E\u0434\u043D\u0430 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u0434\u0430\u043D\u043D\u044B\u0445, \u0440\u0430\u0437\u043D\u044B\u0435 \u043F\u0440\u0430\u0432\u0430. \u0412\u043E\u043F\u0440\u043E\u0441 \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u0442\u043E\u043C, \u043A\u0430\u043A \u043F\u0440\u0430\u0432\u043E \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0432 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0435."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 18,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(ModelCard, {
    n: "A",
    lead: true,
    name: "\u0418\u043D\u043B\u0430\u0439\u043D-\u0440\u0435\u0436\u0438\u043C \xAB\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u2194 \u0420\u0435\u0434.\xBB",
    refs: ["Notion", "Whop", "контекстная кнопка"],
    line: "\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A \u0438 \u0430\u0434\u043C\u0438\u043D \u0432\u0438\u0434\u044F\u0442 \u043E\u0434\u0438\u043D \u0438 \u0442\u043E\u0442 \u0436\u0435 \u044D\u043A\u0440\u0430\u043D. \u0423 \u0430\u0434\u043C\u0438\u043D\u0430 \u0432 \u0448\u0430\u043F\u043A\u0435 \u0440\u0430\u0437\u0434\u0435\u043B\u0430 \u2014 \u043A\u043D\u043E\u043F\u043A\u0430 \xAB\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C\xBB. \u041D\u0430\u0436\u0430\u043B \u2192 \u0442\u043E\u0442 \u0436\u0435 \u044D\u043A\u0440\u0430\u043D \u043F\u0440\u0435\u0432\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044F \u0432 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440: \u043F\u043E\u044F\u0432\u043B\u044F\u044E\u0442\u0441\u044F drag, +\u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C, \u0438\u043D\u043B\u0430\u0439\u043D-\u043F\u043E\u043B\u044F, \u0441\u0432\u0435\u0440\u0445\u0443 \u043F\u0430\u043D\u0435\u043B\u044C \xAB\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C / \u041E\u0442\u043C\u0435\u043D\u0430\xBB.",
    member: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FauxLine, {
      w: "60%",
      strong: true
    }), /*#__PURE__*/React.createElement(FauxLine, null), /*#__PURE__*/React.createElement(FauxLine, {
      w: "80%"
    }), /*#__PURE__*/React.createElement(FauxBtn, {
      label: "\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C"
    })),
    admin: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FauxBtn, {
      label: "\u270E \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
      dashed: true
    }), /*#__PURE__*/React.createElement(FauxLine, {
      w: "60%",
      strong: true
    }), /*#__PURE__*/React.createElement(FauxLine, null), /*#__PURE__*/React.createElement(FauxLine, {
      w: "80%"
    })),
    pros: ["Ничего лишнего для участника — чистое потребление", "Админ редактирует там же, где смотрит — WYSIWYG, без контекст-свитча", "Меньше всего отдельных экранов в проде"],
    cons: ["Нужно явно «войти» в режим — лишний клик", "Редактор и плеер живут в одном компоненте — сложнее в коде"]
  }), /*#__PURE__*/React.createElement(ModelCard, {
    n: "B",
    name: "\u041F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u044B\u0435 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u044B\u0435 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044B",
    refs: ["Discord", "always-on"],
    line: "\u0420\u0435\u0436\u0438\u043C\u0430 \u043D\u0435\u0442. \u0410\u0434\u043C\u0438\u043D \u0432\u0441\u0435\u0433\u0434\u0430 \u0432\u0438\u0434\u0438\u0442 \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u044E\u0449\u0438\u0435 affordances \u043F\u0440\u044F\u043C\u043E \u0432 \u043B\u0435\u043D\u0442\u0435: \u0448\u0435\u0441\u0442\u0435\u0440\u0451\u043D\u043A\u0438, +\u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C, drag-\u0445\u044D\u043D\u0434\u043B\u044B, \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u043F\u043E \u043D\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u044E (\u0437\u0430\u043A\u0440\u0435\u043F\u0438\u0442\u044C / \u0443\u0434\u0430\u043B\u0438\u0442\u044C). \u041F\u0440\u0430\u0432\u043A\u0430 \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442 \u0442\u043E\u0447\u0435\u0447\u043D\u043E, \u0431\u0435\u0437 \xAB\u0432\u0445\u043E\u0434\u0430\xBB.",
    member: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FauxLine, {
      w: "55%",
      strong: true
    }), /*#__PURE__*/React.createElement(FauxLine, null), /*#__PURE__*/React.createElement(FauxLine, {
      w: "70%"
    })),
    admin: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Grip, null), /*#__PURE__*/React.createElement(FauxLine, {
      w: "45%",
      strong: true
    }), /*#__PURE__*/React.createElement(WIcon, {
      name: "settings",
      size: 13,
      color: WC.muted
    })), /*#__PURE__*/React.createElement(FauxLine, null), /*#__PURE__*/React.createElement(FauxLine, {
      w: "70%"
    }), /*#__PURE__*/React.createElement(FauxBtn, {
      label: "+ \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
      dashed: true
    })),
    pros: ["Ноль кликов до правки — всё под рукой", "Привычно тем, кто пришёл из Discord", "Хорошо для частых мелких изменений"],
    cons: ["Интерфейс админа всегда «шумнее»", "Легко случайно нажать управляющее действие", "Грань между «смотрю» и «меняю» размыта"]
  }), /*#__PURE__*/React.createElement(ModelCard, {
    n: "C",
    name: "\u041E\u0442\u0434\u0435\u043B\u044C\u043D\u0430\u044F \xAB\u0421\u0442\u0443\u0434\u0438\u044F\xBB / \u0431\u044D\u043A\u0441\u0442\u0435\u0439\u0434\u0436",
    refs: ["Substack", "YouTube Studio"],
    line: "\u041F\u043E\u0442\u0440\u0435\u0431\u043B\u0435\u043D\u0438\u0435 \u0438 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u0438 \u0440\u0430\u0437\u0432\u0435\u0434\u0435\u043D\u044B. \u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A \u0436\u0438\u0432\u0451\u0442 \u0432 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0435; \u0430\u0434\u043C\u0438\u043D \u0443\u0445\u043E\u0434\u0438\u0442 \u0432 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u0443\u044E \u0437\u043E\u043D\u0443 \xAB\u0421\u0442\u0443\u0434\u0438\u044F\xBB \u2014 \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440 \u043A\u0443\u0440\u0441\u0430, \u043E\u0447\u0435\u0440\u0435\u0434\u044C \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u0438, \u0434\u0430\u0448\u0431\u043E\u0440\u0434. \u0427\u0438\u0441\u0442\u043E\u0435 \u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u0440\u043E\u043B\u0435\u0439.",
    member: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FauxLine, {
      w: "60%",
      strong: true
    }), /*#__PURE__*/React.createElement(FauxLine, null), /*#__PURE__*/React.createElement(FauxLine, {
      w: "75%"
    })),
    admin: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FauxBtn, {
      label: "\u2197 \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0442\u0443\u0434\u0438\u044E",
      dark: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 1,
        background: WC.line,
        margin: "2px 0"
      }
    }), /*#__PURE__*/React.createElement(FauxLine, {
      w: "40%",
      strong: true
    }), /*#__PURE__*/React.createElement(FauxLine, null), /*#__PURE__*/React.createElement(FauxBtn, {
      label: "+ \u0443\u0440\u043E\u043A",
      dashed: true
    })),
    pros: ["Самый мощный редактор — место под сложные инструменты", "Участник вообще не видит «кухню»", "Права и UI разведены максимально явно"],
    cons: ["Контекст-свитч: «смотрю» и «правлю» — разные места", "Дублируется навигация и часть верстки", "Дольше всего разрабатывать"]
  }))));
}

// ============================================================
//  Capability matrix — who can do what
// ============================================================
function MatrixRow({
  cap,
  member,
  admin,
  last
}) {
  const cell = val => /*#__PURE__*/React.createElement("div", {
    style: {
      width: 130,
      display: "flex",
      justifyContent: "center",
      flex: "none"
    }
  }, val === true && /*#__PURE__*/React.createElement(WIcon, {
    name: "check",
    size: 18,
    color: WC.ink
  }), val === false && /*#__PURE__*/React.createElement(WIcon, {
    name: "minus",
    size: 18,
    color: WC.muted
  }), typeof val === "string" && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: WC.sub,
      fontFamily: WC.mono,
      textAlign: "center"
    }
  }, val));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      padding: "13px 0",
      borderBottom: last ? "none" : `1px solid ${WC.line}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14,
      color: WC.ink,
      fontWeight: 500
    }
  }, cap), cell(member), cell(admin));
}
function ScreenRoleMatrix() {
  const rows = [["Смотреть посты и уроки", true, true], ["Реакции, комментарии, прогресс", true, true], ["Писать пост в ленту", "если открыто", true], ["Закреплять / удалять чужой пост", false, true], ["Создавать и менять структуру курса", false, true], ["Добавлять / переставлять уроки", false, true], ["Скрывать черновики от участников", false, true], ["Создавать категории и табы", false, true], ["Модерация: баны, роли, жалобы", false, true], ["Тарифы, доступ, монетизация", false, true]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      padding: "36px 40px",
      background: "#fff",
      overflow: "hidden",
      fontFamily: WC.font
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(WHeading, {
    title: "\u041C\u0430\u0442\u0440\u0438\u0446\u0430 \u043F\u0440\u0430\u0432",
    sub: "\u0411\u0430\u0437\u043E\u0432\u043E\u0435 \u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u2014 \u043D\u0435 \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u043C\u043E\u0434\u0435\u043B\u0438 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430"
  }), /*#__PURE__*/React.createElement(WCard, {
    pad: 24,
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      paddingBottom: 12,
      borderBottom: `1px solid ${WC.lineStrong}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 11,
      fontWeight: 700,
      color: WC.muted,
      textTransform: "uppercase",
      letterSpacing: ".05em"
    }
  }, "\u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 130,
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(RoleTag, {
    role: "member"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 130,
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(RoleTag, {
    role: "admin"
  }))), rows.map((r, i) => /*#__PURE__*/React.createElement(MatrixRow, {
    key: i,
    cap: r[0],
    member: r[1],
    admin: r[2],
    last: i === rows.length - 1
  })))));
}
Object.assign(window, {
  RoleTag,
  SectionEditBtn,
  EditModeBar,
  AddRow,
  Grip,
  MicroAction,
  EditField,
  ScreenRoleModels,
  ScreenRoleMatrix
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "wireframes/wire-roles-models.jsx", error: String((e && e.message) || e) }); }

// wireframes/wire-roles-posts.jsx
try { (() => {
// wire-roles-posts.jsx — Bean role split: POSTS surface
// Member = read + react. Admin = same feed + moderation/pin/publish (Model A).
// Includes the diverging "···" action menu, compose/edit, and moderation queue.

// ---- "···" action menu, role-dependent ----
function PMenuItem({
  icon,
  label,
  danger
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      padding: "9px 12px",
      borderRadius: 9,
      fontSize: 13.5,
      fontWeight: 500,
      color: danger ? WC.sub : WC.ink
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: icon,
    size: 17,
    color: WC.sub
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, label));
}
function PostMenu({
  admin,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 220,
      background: "#fff",
      border: `1px solid ${WC.line}`,
      borderRadius: 13,
      boxShadow: "0 14px 40px rgba(0,0,0,.16)",
      padding: 6,
      ...style
    }
  }, admin ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "3px 12px 4px"
    }
  }, /*#__PURE__*/React.createElement(WNote, null, "\u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u044F")), /*#__PURE__*/React.createElement(PMenuItem, {
    icon: "pin",
    label: "\u0417\u0430\u043A\u0440\u0435\u043F\u0438\u0442\u044C"
  }), /*#__PURE__*/React.createElement(PMenuItem, {
    icon: "pencil",
    label: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C"
  }), /*#__PURE__*/React.createElement(PMenuItem, {
    icon: "eye-off",
    label: "\u0421\u043A\u0440\u044B\u0442\u044C \u043E\u0442 \u043B\u0435\u043D\u0442\u044B"
  }), /*#__PURE__*/React.createElement(PMenuItem, {
    icon: "megaphone",
    label: "\u0421\u0434\u0435\u043B\u0430\u0442\u044C \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435\u043C"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: WC.line,
      margin: "5px 8px"
    }
  }), /*#__PURE__*/React.createElement(PMenuItem, {
    icon: "trash-2",
    label: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u0441\u0442",
    danger: true
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PMenuItem, {
    icon: "bookmark",
    label: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"
  }), /*#__PURE__*/React.createElement(PMenuItem, {
    icon: "bell-off",
    label: "\u041D\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u044F\u0442\u044C"
  }), /*#__PURE__*/React.createElement(PMenuItem, {
    icon: "share",
    label: "\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: WC.line,
      margin: "5px 8px"
    }
  }), /*#__PURE__*/React.createElement(PMenuItem, {
    icon: "flag",
    label: "\u041F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C\u0441\u044F",
    danger: true
  })));
}

// ---- Post card with role-aware chrome ----
function PostR({
  admin,
  pinned,
  draft,
  scheduled
}) {
  return /*#__PURE__*/React.createElement(WCard, {
    pad: 0,
    style: {
      overflow: "hidden",
      boxShadow: admin ? `0 0 0 1px ${WC.line}` : "none"
    }
  }, admin && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 14px",
      background: WC.recess,
      borderBottom: `1px solid ${WC.line}`
    }
  }, /*#__PURE__*/React.createElement(Grip, null), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 11,
      color: WC.muted,
      fontFamily: WC.mono
    }
  }, draft ? "черновик · не виден участникам" : scheduled ? "запланировано на 5 июня, 10:00" : "опубликовано"), /*#__PURE__*/React.createElement(MicroAction, {
    icon: "pin"
  }), /*#__PURE__*/React.createElement(MicroAction, {
    icon: "pencil"
  }), /*#__PURE__*/React.createElement(MicroAction, {
    icon: "eye-off"
  }), /*#__PURE__*/React.createElement(MicroAction, {
    icon: "trash-2",
    danger: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(WAvatar, {
    size: 36,
    icon: "user"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: WC.ink
    }
  }, "\u0410\u0440\u043A\u0430\u0434\u0438\u0439 \u041F. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: WC.muted,
      fontWeight: 400
    }
  }, "\xB7 \u0430\u0432\u0442\u043E\u0440")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: WC.muted
    }
  }, "3 \u0447\u0430\u0441\u0430 \u043D\u0430\u0437\u0430\u0434")), pinned && /*#__PURE__*/React.createElement(WPill, {
    icon: "pin"
  }, "\u0417\u0430\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u043E"), draft && /*#__PURE__*/React.createElement(WPill, null, "\u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A"), scheduled && /*#__PURE__*/React.createElement(WPill, {
    icon: "clock"
  }, "\u0437\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043E"), /*#__PURE__*/React.createElement(WIcon, {
    name: "more-horizontal",
    size: 18,
    color: WC.muted
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: WC.ink,
      lineHeight: 1.25
    }
  }, "\u0417\u0430\u043F\u0443\u0441\u043A \u043D\u043E\u0432\u043E\u0433\u043E \u043F\u043E\u0442\u043E\u043A\u0430 \u043A\u0443\u0440\u0441\u0430 \u0443\u0436\u0435 \u043D\u0430 \u044D\u0442\u043E\u0439 \u043D\u0435\u0434\u0435\u043B\u0435"), /*#__PURE__*/React.createElement(WLines, {
    n: 2,
    last: "55%"
  })), /*#__PURE__*/React.createElement(WImg, {
    h: 170,
    radius: 0,
    label: "\u043E\u0431\u043B\u043E\u0436\u043A\u0430 \u043F\u043E\u0441\u0442\u0430"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 18px",
      display: "flex",
      alignItems: "center",
      gap: 20,
      borderTop: `1px solid ${WC.line}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13,
      color: WC.sub
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "heart",
    size: 17,
    color: WC.sub
  }), " 128"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13,
      color: WC.sub
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "message-circle",
    size: 17,
    color: WC.sub
  }), " 24"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13,
      color: WC.sub
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "share",
    size: 17,
    color: WC.sub
  }), " \u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(WIcon, {
    name: "bookmark",
    size: 17,
    color: WC.muted
  })));
}
function TextPostR({
  admin
}) {
  return /*#__PURE__*/React.createElement(WCard, {
    pad: 0,
    style: {
      overflow: "hidden"
    }
  }, admin && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "7px 14px",
      background: WC.recess,
      borderBottom: `1px solid ${WC.line}`
    }
  }, /*#__PURE__*/React.createElement(Grip, null), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 11,
      color: WC.muted,
      fontFamily: WC.mono
    }
  }, "\u043E\u0442 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430 \xB7 \u041C\u0430\u0440\u0438\u044F \u041A."), /*#__PURE__*/React.createElement(MicroAction, {
    icon: "pin"
  }), /*#__PURE__*/React.createElement(MicroAction, {
    icon: "eye-off"
  }), /*#__PURE__*/React.createElement(MicroAction, {
    icon: "trash-2",
    danger: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(WAvatar, {
    size: 36,
    icon: "user"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: WC.ink
    }
  }, "\u041C\u0430\u0440\u0438\u044F \u041A."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: WC.muted
    }
  }, "\u0412\u0447\u0435\u0440\u0430, 18:40")), /*#__PURE__*/React.createElement(WIcon, {
    name: "more-horizontal",
    size: 18,
    color: WC.muted
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: WC.ink
    }
  }, "\u0414\u0435\u043B\u044E\u0441\u044C \u043A\u043E\u043D\u0441\u043F\u0435\u043A\u0442\u043E\u043C \u0441 \u043F\u0440\u043E\u0448\u043B\u043E\u0433\u043E \u0432\u0435\u0431\u0438\u043D\u0430\u0440\u0430"), /*#__PURE__*/React.createElement(WLines, {
    n: 3,
    last: "40%"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 20,
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13,
      color: WC.sub
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "heart",
    size: 17,
    color: WC.sub
  }), " 42"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13,
      color: WC.sub
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "message-circle",
    size: 17,
    color: WC.sub
  }), " 8"))));
}

// ---- Composer (member: simple; admin: with publishing controls) ----
function ComposerR({
  admin
}) {
  return /*#__PURE__*/React.createElement(WCard, {
    pad: 14,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(WAvatar, {
    size: 40,
    icon: "user"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "11px 14px",
      border: `1px solid ${WC.line}`,
      borderRadius: 12,
      background: WC.recess,
      fontSize: 14,
      color: WC.muted
    }
  }, admin ? "Написать пост или объявление…" : "Написать пост для сообщества…"), admin && /*#__PURE__*/React.createElement(WBtn, {
    icon: "megaphone",
    variant: "secondary",
    size: "s"
  }, "\u041E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435"), /*#__PURE__*/React.createElement(WBtn, {
    icon: "image",
    variant: "secondary",
    size: "s"
  }), /*#__PURE__*/React.createElement(WBtn, {
    size: "s"
  }, admin ? "Опубликовать" : "Отправить"));
}
function PostsHeader({
  mode
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(WHeading, {
    title: "\u041F\u043E\u0441\u0442\u044B"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, ["Все", "Объявления", "Обсуждения"].map((t, i) => /*#__PURE__*/React.createElement(WPill, {
    key: t,
    style: i === 0 ? {
      background: WC.fill,
      color: WC.ink,
      borderColor: WC.lineStrong
    } : {}
  }, t)), mode === "member" && /*#__PURE__*/React.createElement(RoleTag, {
    role: "member"
  }), mode === "admin" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8
    }
  }), /*#__PURE__*/React.createElement(RoleTag, {
    role: "admin"
  }), /*#__PURE__*/React.createElement(SectionEditBtn, {
    label: "\u041C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u044F"
  }))));
}
function PostsBody({
  mode
}) {
  const admin = mode === "admin";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      overflow: "hidden",
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(PostsHeader, {
    mode: mode
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      width: "100%",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(ComposerR, {
    admin: admin
  }), admin && /*#__PURE__*/React.createElement(PostR, {
    admin: true,
    scheduled: true
  }), /*#__PURE__*/React.createElement(PostR, {
    admin: admin,
    pinned: true
  }), /*#__PURE__*/React.createElement(TextPostR, {
    admin: admin
  })));
}
function PostScreen({
  mode
}) {
  return /*#__PURE__*/React.createElement(WAppFrame, {
    railActive: "community"
  }, /*#__PURE__*/React.createElement(WCommunityShell, {
    active: "posts"
  }, mode === "compose" ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(EditModeBar, {
    label: "\u041D\u043E\u0432\u044B\u0439 \u043F\u043E\u0441\u0442",
    hint: "\u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u043D\u0435 \u0432\u0438\u0434\u0435\u043D \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430\u043C, \u043F\u043E\u043A\u0430 \u043D\u0435 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D"
  }), /*#__PURE__*/React.createElement(ComposeForm, null)) : /*#__PURE__*/React.createElement(PostsBody, {
    mode: mode
  })));
}

// ---- Admin compose / edit form ----
function ComposeForm() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "hidden",
      padding: 24,
      display: "flex",
      gap: 24,
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      maxWidth: 600,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(EditField, {
    value: "\u0417\u0430\u043F\u0443\u0441\u043A \u043D\u043E\u0432\u043E\u0433\u043E \u043F\u043E\u0442\u043E\u043A\u0430 \u043A\u0443\u0440\u0441\u0430 \u0443\u0436\u0435 \u043D\u0430 \u044D\u0442\u043E\u0439 \u043D\u0435\u0434\u0435\u043B\u0435"
  }), /*#__PURE__*/React.createElement(EditField, {
    multiline: true,
    h: 150,
    value: "\u0422\u0435\u043A\u0441\u0442 \u043F\u043E\u0441\u0442\u0430. \u041C\u043E\u0436\u043D\u043E \u043F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u043E\u0431\u043B\u043E\u0436\u043A\u0443, \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044E \u0438 \u0437\u0430\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u043F\u043E\u0441\u0442 \u0432 \u043B\u0435\u043D\u0442\u0435. \u0417\u0434\u0435\u0441\u044C \u0436\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u044E\u0442\u0441\u044F \u0432\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0438 \u0441\u0441\u044B\u043B\u043A\u0438."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(WImg, {
    h: 150,
    radius: 14,
    label: "\u043E\u0431\u043B\u043E\u0436\u043A\u0430 \u043F\u043E\u0441\u0442\u0430",
    icon: "image"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 12,
      bottom: 12
    }
  }, /*#__PURE__*/React.createElement(WBtn, {
    variant: "secondary",
    size: "s",
    icon: "upload"
  }, "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C")))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 280,
      flex: "none",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(WLabel, null, "\u041F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u044F"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 11
    }
  }, [["megaphone", "Объявление", "уведомить всех", false], ["pin", "Закрепить в ленте", "сверху списка", true]].map(([ic, t, d, on]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      padding: 12,
      borderRadius: 13,
      border: `1px solid ${WC.line}`
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: ic,
    size: 18,
    color: WC.sub
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: WC.ink
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: WC.muted
    }
  }, d)), /*#__PURE__*/React.createElement(WToggle, {
    on: on
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(WLabel, null, "\u041A\u043E\u043C\u0443 \u0432\u0438\u0434\u043D\u043E"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      border: `1px solid ${WC.line}`,
      borderRadius: 12,
      padding: "0 14px",
      height: 44
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "users",
    size: 16,
    color: WC.sub
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14,
      color: WC.ink
    }
  }, "\u0412\u0441\u0435 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438"), /*#__PURE__*/React.createElement(WIcon, {
    name: "chevron-down",
    size: 16,
    color: WC.muted
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(WLabel, null, "\u041A\u043E\u0433\u0434\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: "center",
      padding: "9px 0",
      borderRadius: 11,
      border: `1px solid ${WC.lineStrong}`,
      background: WC.fill,
      fontSize: 13,
      fontWeight: 600,
      color: WC.ink
    }
  }, "\u0421\u0435\u0439\u0447\u0430\u0441"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: "center",
      padding: "9px 0",
      borderRadius: 11,
      border: `1px solid ${WC.line}`,
      fontSize: 13,
      fontWeight: 600,
      color: WC.sub
    }
  }, "\u041F\u043E \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u044E"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(WBtn, {
    variant: "ghost",
    size: "s"
  }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A")));
}
const ScreenPostsMember = () => /*#__PURE__*/React.createElement(PostScreen, {
  mode: "member"
});
const ScreenPostsAdmin = () => /*#__PURE__*/React.createElement(PostScreen, {
  mode: "admin"
});
const ScreenPostsCompose = () => /*#__PURE__*/React.createElement(PostScreen, {
  mode: "compose"
});

// ---- The diverging action menu, shown on dimmed feed ----
function PostMenuScreen({
  admin
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement(ScreenPostsMember, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(20,20,20,.28)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 150,
      left: "50%",
      transform: "translateX(120px)"
    }
  }, /*#__PURE__*/React.createElement(PostMenu, {
    admin: admin
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      display: "flex",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(RoleTag, {
    role: admin ? "admin" : "member"
  }))));
}
const ScreenPostMenuMember = () => /*#__PURE__*/React.createElement(PostMenuScreen, {
  admin: false
});
const ScreenPostMenuAdmin = () => /*#__PURE__*/React.createElement(PostMenuScreen, {
  admin: true
});

// ---- Moderation queue (admin-only state) ----
function QueueRow({
  kind,
  name,
  body,
  reports
}) {
  return /*#__PURE__*/React.createElement(WCard, {
    pad: 16,
    style: {
      display: "flex",
      gap: 14,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(WAvatar, {
    size: 40,
    icon: "user"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: WC.ink
    }
  }, name), kind === "report" ? /*#__PURE__*/React.createElement(WPill, {
    icon: "flag"
  }, reports, " \u0436\u0430\u043B\u043E\u0431\u044B") : /*#__PURE__*/React.createElement(WPill, {
    icon: "clock"
  }, "\u0436\u0434\u0451\u0442 \u043E\u0434\u043E\u0431\u0440\u0435\u043D\u0438\u044F")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: WC.sub,
      marginTop: 6,
      lineHeight: 1.45
    }
  }, body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 12
    }
  }, kind === "report" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WBtn, {
    size: "s",
    variant: "secondary",
    icon: "check"
  }, "\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C"), /*#__PURE__*/React.createElement(WBtn, {
    size: "s",
    variant: "ghost",
    icon: "eye-off"
  }, "\u0421\u043A\u0440\u044B\u0442\u044C"), /*#__PURE__*/React.createElement(WBtn, {
    size: "s",
    variant: "ghost",
    icon: "trash-2"
  }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WBtn, {
    size: "s",
    icon: "check"
  }, "\u041E\u0434\u043E\u0431\u0440\u0438\u0442\u044C"), /*#__PURE__*/React.createElement(WBtn, {
    size: "s",
    variant: "ghost",
    icon: "x"
  }, "\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C")))));
}
function ScreenPostsQueue() {
  return /*#__PURE__*/React.createElement(WAppFrame, {
    railActive: "community"
  }, /*#__PURE__*/React.createElement(WCommunityShell, {
    active: "posts"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(EditModeBar, {
    label: "\u041C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u044F \u043B\u0435\u043D\u0442\u044B",
    hint: "\u0432\u0438\u0434\u043D\u043E \u0442\u043E\u043B\u044C\u043A\u043E \u0430\u0434\u043C\u0438\u043D\u0430\u043C \u0438 \u043C\u043E\u0434\u0435\u0440\u0430\u0442\u043E\u0440\u0430\u043C"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "hidden",
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      width: "100%",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(WPill, {
    style: {
      background: WC.fill,
      color: WC.ink,
      borderColor: WC.lineStrong
    }
  }, "\u041D\u0430 \u043E\u0434\u043E\u0431\u0440\u0435\u043D\u0438\u0435 \xB7 2"), /*#__PURE__*/React.createElement(WPill, null, "\u0416\u0430\u043B\u043E\u0431\u044B \xB7 1"), /*#__PURE__*/React.createElement(WPill, null, "\u0421\u043A\u0440\u044B\u0442\u044B\u0435")), /*#__PURE__*/React.createElement(QueueRow, {
    kind: "pending",
    name: "\u0418\u0432\u0430\u043D \u041F.",
    body: "\u0425\u043E\u0447\u0443 \u0437\u0430\u043F\u043E\u0441\u0442\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0441\u0432\u043E\u0439 \u0442\u0435\u043B\u0435\u0433\u0440\u0430\u043C-\u043A\u0430\u043D\u0430\u043B \u2014 \u044D\u0442\u043E \u043E\u043A?"
  }), /*#__PURE__*/React.createElement(QueueRow, {
    kind: "pending",
    name: "\u041E\u043B\u044C\u0433\u0430 \u0421.",
    body: "\u041A\u043E\u043D\u0441\u043F\u0435\u043A\u0442 \u0442\u0440\u0435\u0442\u044C\u0435\u0433\u043E \u043C\u043E\u0434\u0443\u043B\u044F, \u0434\u0435\u043B\u044E\u0441\u044C \u0441\u043E \u0432\u0441\u0435\u043C\u0438."
  }), /*#__PURE__*/React.createElement(QueueRow, {
    kind: "report",
    name: "\u0413\u043E\u0441\u0442\u044C 4821",
    reports: 3,
    body: "\u0421\u043F\u0430\u043C-\u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0441\u043E \u0441\u0441\u044B\u043B\u043A\u043E\u0439 \u043D\u0430 \u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u0439 \u0440\u0435\u0441\u0443\u0440\u0441."
  }))))));
}
Object.assign(window, {
  ScreenPostsMember,
  ScreenPostsAdmin,
  ScreenPostsCompose,
  ScreenPostMenuMember,
  ScreenPostMenuAdmin,
  ScreenPostsQueue,
  PostMenu
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "wireframes/wire-roles-posts.jsx", error: String((e && e.message) || e) }); }

// wireframes/wire-settings.jsx
try { (() => {
// wire-settings.jsx — Bean wireframe: account settings (5 tabs) + states

function SettingsScreen({
  active,
  children,
  saveBar
}) {
  return /*#__PURE__*/React.createElement(WAppFrame, {
    railActive: "settings"
  }, /*#__PURE__*/React.createElement(WSettingsSidebar, {
    active: active
  }), /*#__PURE__*/React.createElement(WSettingsContent, {
    saveBar: saveBar
  }, children));
}
function SocialRow({
  icon,
  prefix,
  placeholder
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "#fff",
      border: `1px solid ${WC.line}`,
      borderRadius: 14,
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 10,
      border: `1px solid ${WC.line}`,
      display: "grid",
      placeItems: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: icon,
    size: 18,
    color: WC.sub
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      color: WC.muted,
      fontSize: 14,
      flex: "none"
    }
  }, prefix), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: WC.muted
    }
  }, placeholder));
}

// 1 — Профиль
function ScreenSettingsProfile() {
  const saveBar = /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 36,
      right: 40,
      bottom: 24,
      maxWidth: 660
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: `1px solid ${WC.line}`,
      borderRadius: 16,
      boxShadow: "0 8px 28px rgba(0,0,0,.10)",
      padding: "14px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: WC.sub
    }
  }, "\u0423 \u0432\u0430\u0441 \u0435\u0441\u0442\u044C \u043D\u0435\u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(WBtn, {
    variant: "ghost"
  }, "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C"), /*#__PURE__*/React.createElement(WBtn, null, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"))));
  return /*#__PURE__*/React.createElement(SettingsScreen, {
    active: "profile",
    saveBar: saveBar
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22,
      paddingBottom: 90
    }
  }, /*#__PURE__*/React.createElement(WHeading, {
    title: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430"
  }), /*#__PURE__*/React.createElement(WInput, {
    label: "\u0418\u043C\u044F",
    value: "\u0410\u0440\u043A\u0430\u0434\u0438\u0439"
  }), /*#__PURE__*/React.createElement(WInput, {
    label: "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F",
    value: "arkadiyparovozov",
    prefix: "@",
    mono: true
  }), /*#__PURE__*/React.createElement(WTextarea, {
    label: "\u041E \u0441\u0435\u0431\u0435",
    placeholder: "\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435 \u043E \u0441\u0435\u0431\u0435",
    rows: 3
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(WHeading, {
    title: "\u0421\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u0442\u0438",
    size: 20
  }), /*#__PURE__*/React.createElement(SocialRow, {
    icon: "send",
    prefix: "t.me/",
    placeholder: "username"
  }), /*#__PURE__*/React.createElement(SocialRow, {
    icon: "hash",
    prefix: "vk.com/",
    placeholder: "id"
  }), /*#__PURE__*/React.createElement(SocialRow, {
    icon: "instagram",
    prefix: "instagram.com/",
    placeholder: "username"
  }), /*#__PURE__*/React.createElement(SocialRow, {
    icon: "youtube",
    prefix: "youtube.com/",
    placeholder: "@channel"
  }), /*#__PURE__*/React.createElement(SocialRow, {
    icon: "globe",
    prefix: "https://",
    placeholder: "example.com"
  }))));
}

// 2 — Конфиденциальность (security + privacy)
function RoField({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(WLabel, null, label), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "11px 14px",
      background: WC.recess,
      border: `1px solid ${WC.line}`,
      borderRadius: 14,
      color: WC.sub,
      fontSize: 14
    }
  }, value));
}
function EditRow({
  label,
  value,
  placeholder
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 12,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(WInput, {
    label: label,
    value: value,
    placeholder: placeholder
  })), /*#__PURE__*/React.createElement(WBtn, {
    size: "l",
    variant: "secondary"
  }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C"));
}
function ScreenSettingsSecurity() {
  const toggles = [["Показывать подписки в профиле", true], ["Показывать свои сообщества", false], ["Разрешить личные сообщения", true]];
  return /*#__PURE__*/React.createElement(SettingsScreen, {
    active: "security"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 26
    }
  }, /*#__PURE__*/React.createElement(WHeading, {
    title: "\u041A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C",
    sub: "\u0414\u0430\u043D\u043D\u044B\u0435 \u0434\u043B\u044F \u0432\u0445\u043E\u0434\u0430 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443."
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(WHeading, {
    title: "\u041F\u043E\u0447\u0442\u0430",
    size: 17
  }), /*#__PURE__*/React.createElement(EditRow, {
    label: "\u041F\u043E\u0447\u0442\u0430",
    value: "arkadiy@gmail.com",
    placeholder: "example@gmail.com"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(WHeading, {
    title: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
    size: 17
  }), /*#__PURE__*/React.createElement(EditRow, {
    label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
    placeholder: "+7 (999) 123-45-67"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(WHeading, {
    title: "\u041F\u0440\u0438\u0432\u0430\u0442\u043D\u043E\u0441\u0442\u044C",
    size: 17
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, toggles.map(([label, on], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "15px 0",
      borderBottom: `1px solid ${WC.line}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: WC.ink
    }
  }, label), /*#__PURE__*/React.createElement(WToggle, {
    on: on
  })))))));
}

// 3 — Верификация — единый баннер с несколькими состояниями
// none → "Пройти верификацию"; pending → жёлтый "в процессе"; passed → "пройдена"
const VERIFY_STATES = {
  none: {
    icon: "badge-check",
    title: "Аккаунт не верифицирован",
    desc: "Подтвердите личность, чтобы выводить средства и получить значок рядом с именем.",
    action: "Пройти верификацию",
    tint: {
      bg: WC.recess,
      border: WC.line,
      ink: WC.ink,
      accent: WC.sub
    }
  },
  pending: {
    icon: "clock",
    title: "Верификация в процессе",
    desc: "Документы на проверке. Обычно занимает до 2 рабочих дней — мы пришлём уведомление.",
    action: null,
    tint: {
      bg: "#fbf3da",
      border: "#e7d29a",
      ink: "#7a5e16",
      accent: "#9a7b2a"
    }
  },
  passed: {
    icon: "badge-check",
    title: "Верификация пройдена",
    desc: "Личность подтверждена. Значок отображается в профиле, вывод средств доступен.",
    action: null,
    tint: {
      bg: "#eef3ec",
      border: "#bcd0b6",
      ink: "#3f5a3a",
      accent: "#5a7a52"
    }
  }
};
function VerifyBanner({
  state = "none"
}) {
  const s = VERIFY_STATES[state];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 16,
      background: s.tint.bg,
      border: `1px solid ${s.tint.border}`,
      borderRadius: 18,
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 13,
      background: "#fff",
      border: `1px solid ${s.tint.border}`,
      display: "grid",
      placeItems: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: s.icon,
    size: 24,
    color: s.tint.accent
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: s.tint.ink,
      fontFamily: WC.font,
      letterSpacing: "-0.01em"
    }
  }, s.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: s.tint.accent,
      fontFamily: WC.font,
      lineHeight: 1.45
    }
  }, s.desc), s.action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(WBtn, null, s.action))));
}
function ScreenSettingsVerification({
  state = "none"
}) {
  return /*#__PURE__*/React.createElement(SettingsScreen, {
    active: "verification"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(WHeading, {
    title: "\u0412\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430",
    sub: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u043B\u0438\u0447\u043D\u043E\u0441\u0442\u044C, \u0447\u0442\u043E\u0431\u044B \u0432\u044B\u0432\u043E\u0434\u0438\u0442\u044C \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430."
  }), /*#__PURE__*/React.createElement(VerifyBanner, {
    state: state
  })));
}

// 4 — Вывод средств — список карт с выбором + добавление в модалке
function PayoutCard({
  name,
  num,
  selected
}) {
  return /*#__PURE__*/React.createElement(WCard, {
    pad: 16,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      borderColor: selected ? WC.lineStrong : WC.line,
      boxShadow: selected ? `inset 0 0 0 1px ${WC.lineStrong}` : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      border: `1px solid ${selected ? WC.primary : WC.lineStrong}`,
      display: "grid",
      placeItems: "center",
      flex: "none"
    }
  }, selected && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: WC.primary
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 30,
      borderRadius: 7,
      border: `1px solid ${WC.line}`,
      background: WC.recess,
      display: "grid",
      placeItems: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "credit-card",
    size: 18,
    color: WC.sub
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: WC.ink,
      fontFamily: WC.mono
    }
  }, num), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: WC.sub
    }
  }, name)), selected ? /*#__PURE__*/React.createElement(WPill, {
    icon: "check",
    style: {
      background: WC.fill,
      color: WC.ink,
      borderColor: WC.lineStrong
    }
  }, "\u0412\u044B\u0431\u0440\u0430\u043D\u0430 \u0434\u043B\u044F \u0432\u044B\u0432\u043E\u0434\u0430") : /*#__PURE__*/React.createElement(WIcon, {
    name: "more-horizontal",
    size: 18,
    color: WC.muted
  }));
}
function ScreenSettingsPayment() {
  return /*#__PURE__*/React.createElement(SettingsScreen, {
    active: "payment"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(WHeading, {
    title: "\u0412\u044B\u0432\u043E\u0434 \u0441\u0440\u0435\u0434\u0441\u0442\u0432",
    sub: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u0440\u0442\u0443 \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0432\u044B\u043F\u043B\u0430\u0442."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(WLabel, {
    style: {
      fontSize: 14
    }
  }, "\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u044B"), /*#__PURE__*/React.createElement(WBtn, {
    variant: "secondary",
    size: "s",
    icon: "plus"
  }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u0443")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(PayoutCard, {
    num: "\u2022\u2022\u2022\u2022 4921",
    name: "\u041F\u0430\u0440\u043E\u0432\u043E\u0437\u043E\u0432 \u0410\u0440\u043A\u0430\u0434\u0438\u0439 \u041F\u0435\u0442\u0440\u043E\u0432\u0438\u0447",
    selected: true
  }), /*#__PURE__*/React.createElement(PayoutCard, {
    num: "\u2022\u2022\u2022\u2022 1830",
    name: "\u041F\u0430\u0440\u043E\u0432\u043E\u0437\u043E\u0432 \u0410\u0440\u043A\u0430\u0434\u0438\u0439 \u041F\u0435\u0442\u0440\u043E\u0432\u0438\u0447"
  }))));
}
// Модалка добавления карты — ФИО раздельными полями + номер карты
function AddCardModal() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(20,20,20,.32)",
      display: "grid",
      placeItems: "center",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 460,
      background: "#fff",
      border: `1px solid ${WC.line}`,
      borderRadius: 18,
      boxShadow: "0 18px 50px rgba(0,0,0,.22)",
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(WHeading, {
    title: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u0443",
    size: 20
  }), /*#__PURE__*/React.createElement(WIcon, {
    name: "x",
    size: 20,
    color: WC.muted
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(WInput, {
    label: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F",
    placeholder: "\u041F\u0430\u0440\u043E\u0432\u043E\u0437\u043E\u0432"
  }), /*#__PURE__*/React.createElement(WInput, {
    label: "\u0418\u043C\u044F",
    placeholder: "\u0410\u0440\u043A\u0430\u0434\u0438\u0439"
  }), /*#__PURE__*/React.createElement(WInput, {
    label: "\u041E\u0442\u0447\u0435\u0441\u0442\u0432\u043E",
    placeholder: "\u041F\u0435\u0442\u0440\u043E\u0432\u0438\u0447"
  }), /*#__PURE__*/React.createElement(WInput, {
    label: "\u041D\u043E\u043C\u0435\u0440 \u043A\u0430\u0440\u0442\u044B",
    placeholder: "0000 0000 0000 0000",
    mono: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(WBtn, {
    variant: "ghost"
  }, "\u041E\u0442\u043C\u0435\u043D\u0430"), /*#__PURE__*/React.createElement(WBtn, {
    icon: "plus"
  }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C"))));
}
function StatePaymentAddCard() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement(ScreenSettingsPayment, null), /*#__PURE__*/React.createElement(AddCardModal, null));
}

// 5 — Транзакции
function TxRow({
  title,
  sub,
  amount,
  neg,
  status
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 0",
      borderBottom: `1px solid ${WC.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 10,
      border: `1px solid ${WC.line}`,
      background: WC.recess,
      display: "grid",
      placeItems: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: neg ? "arrow-up-right" : "arrow-down-left",
    size: 16,
    color: WC.sub
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: WC.ink
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: WC.sub
    }
  }, sub)), status && /*#__PURE__*/React.createElement(WPill, null, status), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: WC.ink,
      fontFamily: WC.mono,
      whiteSpace: "nowrap"
    }
  }, neg ? "−" : "+", " \u20BD ", amount));
}
function ScreenSettingsBilling() {
  return /*#__PURE__*/React.createElement(SettingsScreen, {
    active: "billing"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(WHeading, {
    title: "\u0422\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0438",
    sub: "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439 \u0438 \u0432\u044B\u043F\u043B\u0430\u0442."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, ["Все", "Поступления", "Выводы"].map((t, i) => /*#__PURE__*/React.createElement(WPill, {
    key: t,
    style: i === 0 ? {
      background: WC.fill,
      color: WC.ink,
      borderColor: WC.lineStrong
    } : {}
  }, t))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TxRow, {
    title: "\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0430 \u2014 \u0418\u0432\u0430\u043D \u041F.",
    sub: "\u0421\u0435\u0433\u043E\u0434\u043D\u044F, 14:32",
    amount: "1 290",
    status: "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E"
  }), /*#__PURE__*/React.createElement(TxRow, {
    title: "\u0412\u044B\u0432\u043E\u0434 \u043D\u0430 \u043A\u0430\u0440\u0442\u0443 \u2022\u2022\u2022\u2022 4921",
    sub: "\u0412\u0447\u0435\u0440\u0430, 09:10",
    amount: "20 000",
    neg: true,
    status: "\u0412 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435"
  }), /*#__PURE__*/React.createElement(TxRow, {
    title: "\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0430 \u2014 \u041C\u0430\u0440\u0438\u044F \u041A.",
    sub: "28 \u043C\u0430\u044F, 18:45",
    amount: "2 490",
    status: "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E"
  }), /*#__PURE__*/React.createElement(TxRow, {
    title: "\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0430 \u2014 \u041E\u043B\u0435\u0433 \u0414.",
    sub: "27 \u043C\u0430\u044F, 11:02",
    amount: "990",
    status: "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E"
  }), /*#__PURE__*/React.createElement(TxRow, {
    title: "\u0412\u044B\u0432\u043E\u0434 \u043D\u0430 \u043A\u0430\u0440\u0442\u0443 \u2022\u2022\u2022\u2022 4921",
    sub: "20 \u043C\u0430\u044F, 16:20",
    amount: "35 000",
    neg: true,
    status: "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E"
  }))));
}

// ---- companion states ----
function StateBillingEmpty() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      background: "#fff",
      fontFamily: WC.font,
      padding: 24,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(WNote, null, "\u043F\u0443\u0441\u0442\u043E \u2014 \u043D\u0435\u0442 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0439"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 16,
      border: `1px solid ${WC.line}`,
      background: WC.recess,
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "receipt-text",
    size: 26,
    color: WC.muted
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: WC.ink
    }
  }, "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0439"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: WC.sub,
      maxWidth: 220
    }
  }, "\u0417\u0434\u0435\u0441\u044C \u043F\u043E\u044F\u0432\u044F\u0442\u0441\u044F \u043F\u043B\u0430\u0442\u0435\u0436\u0438 \u0438 \u0432\u044B\u043F\u043B\u0430\u0442\u044B \u043F\u043E\u0441\u043B\u0435 \u043F\u0435\u0440\u0432\u043E\u0439 \u043F\u0440\u043E\u0434\u0430\u0436\u0438.")));
}
function StatePaymentEmpty() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      background: "#fff",
      fontFamily: WC.font,
      padding: 24,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(WNote, null, "\u043F\u0443\u0441\u0442\u043E \u2014 \u043D\u0435\u0442 \u0441\u043F\u043E\u0441\u043E\u0431\u043E\u0432 \u0432\u044B\u0432\u043E\u0434\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 16,
      border: `1px solid ${WC.line}`,
      background: WC.recess,
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "credit-card",
    size: 26,
    color: WC.muted
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: WC.ink
    }
  }, "\u041D\u0435\u0442 \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0445 \u043A\u0430\u0440\u0442"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: WC.sub,
      maxWidth: 220
    }
  }, "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043A\u0430\u0440\u0442\u0443 \u0438\u043B\u0438 \u0440\u0435\u043A\u0432\u0438\u0437\u0438\u0442\u044B, \u0447\u0442\u043E\u0431\u044B \u0432\u044B\u0432\u043E\u0434\u0438\u0442\u044C \u0437\u0430\u0440\u0430\u0431\u043E\u0442\u043E\u043A."), /*#__PURE__*/React.createElement(WBtn, {
    icon: "plus"
  }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u043F\u043E\u0441\u043E\u0431")));
}
function StateVerificationPending() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      background: "#fff",
      fontFamily: WC.font,
      padding: 24,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(WNote, null, "\u0431\u0430\u043D\u043D\u0435\u0440 \u2014 \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435"), /*#__PURE__*/React.createElement(VerifyBanner, {
    state: "pending"
  }));
}
function StateVerificationPassed() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      background: "#fff",
      fontFamily: WC.font,
      padding: 24,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(WNote, null, "\u0431\u0430\u043D\u043D\u0435\u0440 \u2014 \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u0430"), /*#__PURE__*/React.createElement(VerifyBanner, {
    state: "passed"
  }));
}
Object.assign(window, {
  ScreenSettingsProfile,
  ScreenSettingsSecurity,
  ScreenSettingsVerification,
  ScreenSettingsPayment,
  ScreenSettingsBilling,
  StateBillingEmpty,
  StatePaymentEmpty,
  StatePaymentAddCard,
  StateVerificationPending,
  StateVerificationPassed
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "wireframes/wire-settings.jsx", error: String((e && e.message) || e) }); }

// wireframes/wire-shell.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// wire-shell.jsx — Bean wireframe app shell: icon rail, settings sidebar, community sidebar/header

// ---- Left icon rail (60px) ----
function WRail({
  active = "community"
}) {
  const railIcon = (icon, on) => /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 14,
      display: "grid",
      placeItems: "center",
      flex: "none",
      background: on ? WC.active : "transparent"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: icon,
    size: 22,
    color: on ? WC.ink : WC.sub
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      flex: "none",
      paddingTop: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 14,
      border: `1px solid ${WC.line}`,
      background: WC.recess,
      display: "grid",
      placeItems: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "bean",
    size: 24,
    color: WC.ink,
    stroke: 2.2
  })), railIcon("message-circle-more"), railIcon("search"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 1,
      background: WC.line,
      margin: "2px 0"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(WAvatar, {
    size: 44,
    radius: 14,
    icon: "users"
  }), active === "community" && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: -8,
      top: "50%",
      transform: "translateY(-50%)",
      width: 3,
      height: 16,
      background: WC.ink,
      borderRadius: "0 3px 3px 0"
    }
  })), /*#__PURE__*/React.createElement(WAvatar, {
    size: 44,
    radius: 14,
    icon: "users"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 14,
      background: WC.primary,
      display: "grid",
      placeItems: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "plus",
    size: 22,
    color: WC.textOnPrimary
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 16,
      border: `1px solid ${WC.line}`,
      background: "#fff",
      display: "grid",
      placeItems: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(WAvatar, {
    size: 34,
    icon: "user"
  })));
}

// ---- App frame: gutter + rail + white rounded content panel ----
function WAppFrame({
  railActive = "community",
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      gap: 8,
      background: WC.gutter,
      padding: 8,
      boxSizing: "border-box",
      fontFamily: WC.font
    }
  }, /*#__PURE__*/React.createElement(WRail, {
    active: railActive
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "#fff",
      border: `1px solid ${WC.line}`,
      borderRadius: 14,
      overflow: "hidden",
      minWidth: 0,
      display: "flex"
    }
  }, children));
}

// ---- Settings sidebar (230px) ----
const WSETTINGS_TABS = [{
  id: "profile",
  label: "Профиль",
  icon: "user"
}, {
  id: "security",
  label: "Конфиденциальность",
  icon: "shield"
}, {
  id: "verification",
  label: "Верификация",
  icon: "badge-check"
}, {
  id: "payment",
  label: "Вывод средств",
  icon: "credit-card"
}, {
  id: "billing",
  label: "Транзакции",
  icon: "receipt-text"
}];
function WSettingsSidebar({
  active = "profile"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 248,
      flex: "none",
      borderRight: `1px solid ${WC.line}`,
      display: "flex",
      flexDirection: "column",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "32px 18px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(WAvatar, {
    size: 60,
    icon: "user"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      color: WC.ink
    }
  }, "\u0410\u0440\u043A\u0430\u0434\u0438\u0439"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: WC.muted,
      fontFamily: WC.mono
    }
  }, "@arkadiyparovozov"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      padding: "0 12px"
    }
  }, WSETTINGS_TABS.map(t => /*#__PURE__*/React.createElement(WTab, _extends({
    key: t.id
  }, t, {
    active: active === t.id
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: WC.line,
      margin: "10px 16px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 12px"
    }
  }, /*#__PURE__*/React.createElement(WTab, {
    icon: "log-out",
    label: "\u0412\u044B\u0439\u0442\u0438 \u0438\u0437 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430",
    danger: true
  })));
}

// Settings content scroller (left-aligned 640 column)
function WSettingsContent({
  children,
  saveBar
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: "relative",
      minWidth: 0,
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "40px 40px 40px 36px",
      maxWidth: 660
    }
  }, children), saveBar);
}

// ---- Channel type meta (3 types a tab can be) ----
const WCHAN_TYPE = {
  chat: {
    icon: "hash",
    name: "Чат"
  },
  posts: {
    icon: "newspaper",
    name: "Посты"
  },
  courses: {
    icon: "book-open",
    name: "Курс"
  }
};

// Discord-style nesting: categories (any name) hold channels (any type + name)
const WCOMMUNITY_NAV = [{
  cat: "Начало",
  channels: [{
    id: "chat",
    type: "chat",
    label: "общий-чат"
  }, {
    id: "chat-q",
    type: "chat",
    label: "вопросы"
  }]
}, {
  cat: "Лента",
  channels: [{
    id: "posts",
    type: "posts",
    label: "Посты"
  }, {
    id: "announce",
    type: "posts",
    label: "объявления"
  }]
}, {
  cat: "Обучение",
  channels: [{
    id: "courses",
    type: "courses",
    label: "Основы бренда"
  }]
}];

// One channel row (sub-chat)
function WChannelRow({
  type,
  label,
  active
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "7px 10px",
      borderRadius: 9,
      background: active ? WC.active : "transparent",
      boxShadow: active ? `inset 0 0 0 1px ${WC.lineStrong}` : "none"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: WCHAN_TYPE[type].icon,
    size: 17,
    color: active ? WC.ink : WC.muted
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14,
      fontWeight: active ? 600 : 500,
      color: active ? WC.ink : WC.sub,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, label));
}

// Collapsible category header (with + to add a channel)
function WCategoryHeader({
  name
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 3,
      padding: "12px 6px 4px"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "chevron-down",
    size: 12,
    color: WC.muted
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 11,
      fontWeight: 700,
      color: WC.muted,
      textTransform: "uppercase",
      letterSpacing: ".05em"
    }
  }, name), /*#__PURE__*/React.createElement(WIcon, {
    name: "plus",
    size: 14,
    color: WC.muted
  }));
}

// ---- Community sidebar (256px): banner photo (with dropdown chevron) + nested nav ----
function WCommunitySidebar({
  active = "posts",
  menuOpen = false,
  nav = WCOMMUNITY_NAV
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 256,
      flex: "none",
      borderRight: `1px solid ${WC.line}`,
      display: "flex",
      flexDirection: "column",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 132,
      background: WC.fillSoft,
      borderBottom: `1px solid ${WC.line}`,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "flex-end",
      padding: 10
    }
  }, /*#__PURE__*/React.createElement("svg", {
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%"
    },
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "0",
    x2: "100%",
    y2: "100%",
    stroke: WC.line,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "100%",
    y1: "0",
    x2: "0",
    y2: "100%",
    stroke: WC.line,
    strokeWidth: "1"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(WAvatar, {
    size: 40,
    icon: "users"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: WC.ink,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, "ProFound University")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 9,
      background: "#fff",
      border: `1px solid ${WC.line}`,
      display: "grid",
      placeItems: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: menuOpen ? "chevron-up" : "chevron-down",
    size: 16,
    color: WC.sub
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "4px 10px 12px",
      display: "flex",
      flexDirection: "column",
      gap: 2,
      overflow: "hidden"
    }
  }, nav.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.cat
  }, /*#__PURE__*/React.createElement(WCategoryHeader, {
    name: c.cat
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, c.channels.map(ch => /*#__PURE__*/React.createElement(WChannelRow, {
    key: ch.id,
    type: ch.type,
    label: ch.label,
    active: active === ch.id
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 10px 0",
      color: WC.muted
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "plus",
    size: 15,
    color: WC.muted
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500
    }
  }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E"))));
}

// ---- Community top header (search + help + bell) ----
function WCommunityHeader({
  title
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: `1px solid ${WC.line}`,
      padding: "11px 22px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flex: "none",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement(WBtn, {
    variant: "ghost",
    size: "s",
    icon: "arrow-left"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      border: `1px solid ${WC.line}`,
      borderRadius: 12,
      padding: "8px 12px",
      width: 260,
      background: WC.recess
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "search",
    size: 16,
    color: WC.muted
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14,
      color: WC.muted,
      fontFamily: WC.font
    }
  }, "\u041F\u043E\u0438\u0441\u043A..."), /*#__PURE__*/React.createElement(WPill, {
    style: {
      padding: "1px 7px",
      fontFamily: WC.mono
    }
  }, "\u2318K")), /*#__PURE__*/React.createElement(WBtn, {
    variant: "ghost",
    size: "s",
    icon: "help-circle"
  }), /*#__PURE__*/React.createElement(WBtn, {
    variant: "ghost",
    size: "s",
    icon: "bell"
  })));
}

// Community content wrapper (sidebar + scroll body)
function WCommunityShell({
  active,
  menuOpen,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WCommunitySidebar, {
    active: active,
    menuOpen: menuOpen
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflow: "hidden",
      background: "#fff"
    }
  }, children)));
}
Object.assign(window, {
  WRail,
  WAppFrame,
  WSettingsSidebar,
  WSettingsContent,
  WSETTINGS_TABS,
  WCommunitySidebar,
  WCommunityHeader,
  WCommunityShell,
  WCHAN_TYPE,
  WCOMMUNITY_NAV,
  WChannelRow,
  WCategoryHeader
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "wireframes/wire-shell.jsx", error: String((e && e.message) || e) }); }

// wireframes/wire-tweaks.jsx
try { (() => {
// wire-tweaks.jsx — expressive Tweaks for the Bean wireframe canvas.
//
// Three high-level knobs, each one reshapes the WHOLE feel by recomputing the
// shared token banks (window.WC + window.DC) and re-rendering the canvas — no
// per-screen edits, no single-property pixel pushing.
//
//   Fidelity  Sketch · Greyscale · Branded
//             — line-art + hand font + cream paper  vs.  the neutral grey kit
//               vs.  Bean-blue actions + real danger + clean white paper
//   Surface   Cool · Neutral · Warm
//             — one coherent hue/chroma family across paper, lines, ink, canvas
//   Linework  Hairline · Standard · Marker
//             — border weight + icon stroke + line contrast: delicate → bold

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "fidelity": "grey",
  "mood": "neutral",
  "weight": "standard"
} /*EDITMODE-END*/;

// ── token math ───────────────────────────────────────────────────────────────
const ok = (L, c, h) => `oklch(${L} ${c} ${h})`;
const FONT_BASE = '"Geist", system-ui, -apple-system, "Segoe UI", sans-serif';
const FONT_HAND = '"Patrick Hand", "Geist", system-ui, sans-serif';

// Surface temperature → tint hue/chroma + the canvas backdrop shade.
const MOOD = {
  cool: {
    h: 255,
    c: 0.013,
    bgL: 0.962,
    bgC: 0.012
  },
  neutral: {
    h: 95,
    c: 0.003,
    bgL: 0.967,
    bgC: 0.004
  },
  warm: {
    h: 74,
    c: 0.015,
    bgL: 0.951,
    bgC: 0.020
  }
};

// Linework → line/ink lightness, icon stroke, grid contrast.
const WEIGHT = {
  hairline: {
    line: 0.912,
    lineStrong: 0.872,
    ink: 0.330,
    stroke: 1.5,
    grid: 0.045
  },
  standard: {
    line: 0.886,
    lineStrong: 0.840,
    ink: 0.270,
    stroke: 2.0,
    grid: 0.060
  },
  marker: {
    line: 0.828,
    lineStrong: 0.770,
    ink: 0.200,
    stroke: 2.6,
    grid: 0.078
  }
};
function deriveTokens(t) {
  const mood = MOOD[t.mood] || MOOD.neutral;
  const wt = WEIGHT[t.weight] || WEIGHT.standard;
  const fid = t.fidelity || "grey";

  // Fidelity bends the surface family: brand de-tints + cleans, sketch warms
  // + enriches the cream and biases the hue toward paper-warm.
  let cScale = 1,
    paperL = 1.0,
    hue = mood.h;
  if (fid === "brand") {
    cScale = 0.6;
    paperL = 1.0;
  }
  if (fid === "sketch") {
    cScale = 1.6;
    paperL = 0.979;
    hue = mood.h * 0.4 + 74 * 0.6;
  }
  const c = mood.c * cScale; // surface-tint chroma
  const cInk = Math.min(c * 1.8, 0.03); // a touch more tone in the darks

  const surface = {
    paper: ok(paperL, c * 0.4, hue),
    gutter: ok(0.950, c, hue),
    recess: ok(0.967, c, hue),
    fillSoft: ok(0.952, c, hue),
    fill: ok(0.933, c, hue),
    skeleton: ok(0.912, c, hue),
    line: ok(wt.line, c, hue),
    lineStrong: ok(wt.lineStrong, c, hue),
    muted: ok(0.710, cInk, hue),
    sub: ok(0.550, cInk, hue),
    ink: ok(wt.ink, cInk, hue),
    stroke: wt.stroke
  };

  // Action color + selected-surface + danger, per fidelity.
  let primary, textOnPrimary, active, danger;
  if (fid === "brand") {
    primary = ok(0.575, 0.196, 252); // Bean blue ≈ #0071e3
    textOnPrimary = "#ffffff";
    active = ok(0.935, 0.040, 255); // faint blue selection wash
    danger = ok(0.585, 0.196, 36); // real Bean danger
  } else if (fid === "sketch") {
    primary = ok(0.345, Math.max(cInk, 0.02), hue); // dark hand-ink fill
    textOnPrimary = ok(paperL, c * 0.4, hue); // cream knockout
    active = ok(0.910, c * 1.4, hue);
    danger = ok(0.620, cInk, hue);
  } else {
    primary = ok(0.330, cInk, hue); // the neutral dark-grey action
    textOnPrimary = "#ffffff";
    active = ok(0.915, c, hue);
    danger = ok(0.660, cInk, hue);
  }
  return {
    ...surface,
    primary,
    textOnPrimary,
    active,
    danger,
    font: fid === "sketch" ? FONT_HAND : FONT_BASE,
    _bg: ok(mood.bgL, mood.bgC, mood.h),
    _grid: `rgba(0,0,0,${wt.grid})`,
    _fid: fid,
    _wt: t.weight
  };
}

// One-time global rules that can't be expressed through the token bank alone:
// the dashed line-art treatment (sketch) and the bolder border (marker).
function ensureTweakStyle() {
  if (document.getElementById("wire-tweak-style")) return;
  const s = document.createElement("style");
  s.id = "wire-tweak-style";
  s.textContent = [
  // Sketch → dashed line-art. border-width:0 (NON-important) hides borders
  // on elements that never declared one; a real inline `1px` shorthand
  // out-specifies it and survives, so ONLY genuine borders turn dashed.
  "body.wfi-sketch .dc-card *{ border-style: dashed !important; border-width: 0; }",
  // Marker → bolder borders. Applied outside sketch, where style:none keeps
  // the borderless elements invisible no matter the forced width.
  "body.wlw-marker:not(.wfi-sketch) .dc-card *{ border-width: 1.6px !important; }"].join("\n");
  document.head.appendChild(s);
}
function applyTokens(tk) {
  ensureTweakStyle();
  Object.assign(window.WC, {
    paper: tk.paper,
    gutter: tk.gutter,
    recess: tk.recess,
    fillSoft: tk.fillSoft,
    fill: tk.fill,
    skeleton: tk.skeleton,
    line: tk.line,
    lineStrong: tk.lineStrong,
    muted: tk.muted,
    sub: tk.sub,
    ink: tk.ink,
    stroke: tk.stroke,
    primary: tk.primary,
    textOnPrimary: tk.textOnPrimary,
    active: tk.active,
    danger: tk.danger,
    font: tk.font
  });
  if (window.DC) {
    window.DC.bg = tk._bg;
    window.DC.grid = tk._grid;
  }
  document.documentElement.style.setProperty("--font-sans", tk.font);
  const b = document.body;
  b.classList.remove("wfi-sketch", "wfi-grey", "wfi-brand", "wlw-hairline", "wlw-standard", "wlw-marker");
  b.classList.add("wfi-" + tk._fid, "wlw-" + tk._wt);
}

// ── panel ────────────────────────────────────────────────────────────────────
const FIDELITY_OPTS = [{
  value: "sketch",
  label: "Sketch"
}, {
  value: "grey",
  label: "Greyscale"
}, {
  value: "brand",
  label: "Branded"
}];
const MOOD_OPTS = [{
  value: "cool",
  label: "Cool"
}, {
  value: "neutral",
  label: "Neutral"
}, {
  value: "warm",
  label: "Warm"
}];
const WEIGHT_OPTS = [{
  value: "hairline",
  label: "Hairline"
}, {
  value: "standard",
  label: "Standard"
}, {
  value: "marker",
  label: "Marker"
}];
const FID_BLURB = {
  sketch: "Hand-drawn line-art on cream — read it as rough, early thinking.",
  grey: "The neutral mid-fi kit — structure without colour or opinion.",
  brand: "Bean blue actions, real danger, clean white — production-leaning."
};
function TweaksController() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => {
    applyTokens(deriveTokens(t));
    if (window.__renderWire) window.__renderWire();
  }, [t.fidelity, t.mood, t.weight]);
  return /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Feel"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Fidelity",
    value: t.fidelity,
    options: FIDELITY_OPTS,
    onChange: v => setTweak("fidelity", v)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      lineHeight: 1.45,
      color: "rgba(41,38,27,.55)",
      marginTop: -2
    }
  }, FID_BLURB[t.fidelity]), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Surface",
    value: t.mood,
    options: MOOD_OPTS,
    onChange: v => setTweak("mood", v)
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Linework",
    value: t.weight,
    options: WEIGHT_OPTS,
    onChange: v => setTweak("weight", v)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(TweakButton, {
    label: "Reset",
    secondary: true,
    onClick: () => setTweak({
      fidelity: "grey",
      mood: "neutral",
      weight: "standard"
    })
  })));
}

// Apply defaults before first paint, then mount the panel in its own root.
applyTokens(deriveTokens(TWEAK_DEFAULTS));
if (window.__renderWire) window.__renderWire();
ReactDOM.createRoot(document.getElementById("tweaks-root")).render(/*#__PURE__*/React.createElement(TweaksController, null));

// Exposed for debugging / verification — preview a combination without the panel.
window.__wireTweaks = {
  deriveTokens,
  applyTokens,
  preview: t => {
    applyTokens(deriveTokens(t));
    if (window.__renderWire) window.__renderWire();
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "wireframes/wire-tweaks.jsx", error: String((e && e.message) || e) }); }

})();
