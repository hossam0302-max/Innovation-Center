(function () {
  var script = document.currentScript;
  var mode = (script && script.getAttribute("data-mode")) || "static";
  var active = (script && script.getAttribute("data-active")) || "services";
  var base = (script && script.getAttribute("data-base")) || "";
  var isSpa = mode === "spa";

  function href(view) {
    var url = base + "index.html";
    return view ? url + "?view=" + view : url;
  }

  function isActive(key) {
    return key === active ? " active" : "";
  }

  function ariaCurrent(key) {
    return key === active ? ' aria-current="page"' : "";
  }

  if (!document.getElementById("platform-header-styles")) {
    var style = document.createElement("style");
    style.id = "platform-header-styles";
    style.textContent = [
      ".platform-top{font-family:\"IBM Plex Sans Arabic\",\"Segoe UI\",Tahoma,sans-serif;line-height:1.75;position:fixed;top:0;left:0;right:0;width:100%;z-index:2000;background:#fff}",
      ".platform-top a{color:inherit;text-decoration:none}",
      ".platform-top .gov-bar{background:var(--naama-primary-dark,#00283e);color:rgba(255,255,255,.86);font-size:.82rem;padding:.55rem 0}",
      ".platform-top .gov-bar .verified{color:var(--naama-accent,#49aa8b)}",
      ".platform-top .site-header{background:#fff;border-bottom:1px solid var(--naama-border,#e4ecef);position:relative;z-index:1}",
      ".platform-top .brand-link{display:inline-flex;align-items:center;gap:.7rem;background:none;border:0;padding:0;cursor:pointer}",
      ".platform-top .brand-mark{width:44px;height:44px;border-radius:12px;flex-shrink:0;position:relative;background:radial-gradient(circle at 30% 30%,var(--naama-gold,#e8a34f) 0 22%,transparent 23%),linear-gradient(145deg,var(--naama-accent,#49aa8b) 0%,var(--naama-primary,#003957) 100%);box-shadow:inset 0 0 0 2px rgba(255,255,255,.18)}",
      ".platform-top .brand-mark::after{content:\"\";position:absolute;inset:16px 8px 10px;border-top:2px solid rgba(255,255,255,.75);border-radius:40%}",
      ".platform-top .brand-text{display:flex;flex-direction:column;line-height:1.25}",
      ".platform-top .brand-text strong{color:var(--naama-primary,#003957);font-size:1.02rem;display:block;line-height:1.2;font-weight:700}",
      ".platform-top .brand-text small{color:var(--naama-muted,#62717d);font-size:.78rem;display:block}",
      ".platform-top .nav-pill{display:inline-flex;align-items:center;padding:.5rem 1rem;border-radius:999px;color:var(--naama-primary,#003957)!important;font-weight:500;background:transparent;border:0;cursor:pointer;font-size:.92rem;white-space:nowrap;line-height:1.4}",
      ".platform-top .nav-pill:hover,.platform-top .nav-pill.active{background:var(--naama-accent-soft,#e8f6f1);color:var(--naama-accent-dark,#378a6f)!important}",
      ".platform-top .btn-login{display:inline-flex;align-items:center;gap:.5rem;background:var(--naama-primary,#003957);color:#fff!important;border:0;border-radius:999px;padding:.55rem 1.3rem;font-weight:600;white-space:nowrap}",
      ".platform-top .btn-login:hover{color:#fff!important;background:var(--naama-primary-dark,#00283e);transform:translateY(-1px);box-shadow:0 10px 22px rgba(0,40,62,.22)}",
      ".platform-top .header-tools{display:flex;align-items:center;gap:.45rem;flex-wrap:wrap;justify-content:flex-end}",
      ".platform-top .header-page-actions{display:flex;align-items:center;gap:.4rem;flex-wrap:wrap}",
      ".platform-top .header-page-actions[hidden]{display:none!important}",
      ".platform-top .header-page-actions>a,.platform-top .header-page-actions>button{display:inline-flex!important;align-items:center;gap:.3rem;margin:0!important;position:static!important;padding:.38rem .7rem!important;border-radius:999px!important;border:1px solid #c9ddd4!important;background:#fff!important;color:#0B5D42!important;font-size:.76rem!important;font-weight:700!important;line-height:1.3!important;white-space:nowrap;text-decoration:none!important;box-shadow:none!important;font-family:inherit}",
      ".platform-top .header-page-actions>a:hover,.platform-top .header-page-actions>button:hover{background:#eef7f2!important;border-color:#0B5D42!important}",
      ".exp3-page-actions[hidden],.page-hero-actions[hidden],.ps-page-actions[hidden],.inst3-back-bar[hidden],.safta3-back-bar[hidden]{display:none!important}",
      ".platform-top .header-search,.platform-top #headerSearchBox,.platform-top #mobileHeaderSearchBox{display:none!important}",
      ".platform-top .btn-menu-toggle{display:none;align-items:center;justify-content:center;width:42px;height:42px;border:1px solid var(--naama-border,#e4ecef);border-radius:12px;background:#fff;color:var(--naama-primary,#003957)}",
      ".platform-top #mobileNav{display:none;flex-wrap:wrap;gap:.35rem;padding-top:.85rem;margin-top:.85rem;border-top:1px solid var(--naama-border,#e4ecef)}",
      ".platform-top #mobileNav.is-open{display:flex}",
      "@media (min-width:992px){.platform-top .header-row{flex-wrap:nowrap!important;gap:.6rem!important;align-items:center!important}.platform-top .header-row .brand-link{flex:0 0 auto}.platform-top .header-row #mainNav{display:flex!important;flex:1 1 auto;flex-wrap:nowrap;white-space:nowrap;gap:.25rem}.platform-top .header-row #mainNav .nav-pill{padding:.4rem .7rem;font-size:.88rem}.platform-top .header-row .btn-login{padding:.45rem .9rem;font-size:.88rem}.platform-top .header-row .brand-text small{display:none}.platform-top .header-row .brand-text strong{font-size:.98rem}.platform-top .header-row .ms-auto{margin-inline-start:auto!important}}",
      "@media (min-width:1280px){.platform-top .header-row .brand-text small{display:block}}",
      "@media (max-width:991.98px){.platform-top #mainNav{display:none!important}.platform-top .btn-menu-toggle{display:inline-flex}}",
      ".page-hero,.exp3-page-title,.dam3-page-hero,.uni3-page-hero,.drv3-page-title{background:#F4F1E9;padding:44px 0 34px;min-height:220px;box-sizing:border-box;border-bottom:1px solid #E3E0D2}",
      ".page-hero .container,.exp3-page-title .container,.dam3-page-hero .container,.uni3-page-hero .container,.drv3-page-title .container{max-width:1180px}",
      ".page-hero h1,.exp3-page-title h1,.dam3-page-hero h1,.uni3-page-hero h1,.drv3-page-title h1{margin:0;color:#0B5D42;font-size:1.9rem;line-height:1.35;font-weight:800}",
      "@media (max-width:767.98px){.page-hero,.exp3-page-title,.dam3-page-hero,.uni3-page-hero,.drv3-page-title{padding:28px 0 24px;min-height:180px}.page-hero h1,.exp3-page-title h1,.dam3-page-hero h1,.uni3-page-hero h1,.drv3-page-title h1{font-size:1.35rem}}"
    ].join("");
    document.head.appendChild(style);
  }

  var brand = isSpa
    ? '<button type="button" class="brand-link btn p-0 border-0" onclick="navigate(\'home\')" aria-label="الصفحة الرئيسية">'
    : '<a class="brand-link" href="' + href() + '" aria-label="الصفحة الرئيسية">';
  var brandClose = isSpa ? "</button>" : "</a>";

  var navItems = [
    { key: "home", label: "الرئيسية", icon: "bi-house", view: "" },
    { key: "services", label: "خدماتنا", icon: "bi-briefcase", view: "our-services" },
    { key: "programs", label: "برامج الابتكار", icon: "bi-lightbulb", view: "innovation-programs" },
    { key: "news", label: "الأخبار", icon: "bi-megaphone", view: "news" },
    { key: "publications", label: "منشورات وتقارير", icon: "bi-journal-richtext", view: "publications" },
    { key: "requests", label: "طلباتي", icon: "bi-file-earmark-text", view: "my-requests" }
  ];

  var navHtml = isSpa
    ? ""
    : navItems.map(function (item) {
      return '<a class="nav-pill' + isActive(item.key) + '" href="' + href(item.view) + '"' + ariaCurrent(item.key) + ">" +
        '<i class="bi ' + item.icon + ' me-1"></i>' + item.label + "</a>";
    }).join("");

  var menuBtn = isSpa
    ? '<button type="button" class="btn btn-naama-outline d-lg-none btn-menu-toggle" onclick="toggleMobileNav()" aria-label="القائمة"><i class="bi bi-list"></i></button>'
    : '<button type="button" class="btn-menu-toggle" id="menuToggle" aria-label="القائمة" aria-expanded="false" aria-controls="mobileNav"><i class="bi bi-list"></i></button>';

  var mobileNav = isSpa
    ? '<nav id="mobileNav" class="d-lg-none flex-wrap gap-1 pt-3 border-top mt-3" style="display:none" aria-label="قائمة الجوال"></nav>'
    : '<nav id="mobileNav" aria-label="قائمة الجوال">' + navHtml + "</nav>";

  var html =
    '<div class="platform-top" id="platformTop">' +
      '<div class="gov-bar">' +
        '<div class="container d-flex flex-wrap justify-content-between align-items-center gap-2">' +
          '<span><i class="bi bi-shield-check verified me-1"></i> موقع حكومي تابع لوزارة البيئة والمياه والزراعة</span>' +
          '<span class="d-none d-md-inline">متوافق مع هوية منصة نما · الرقم الموحد <strong>939</strong></span>' +
        "</div>" +
      "</div>" +
      '<header class="site-header">' +
        '<div class="container py-3">' +
          '<div class="header-row d-flex flex-wrap align-items-center gap-3">' +
            brand +
              '<span class="brand-mark" aria-hidden="true"></span>' +
              '<span class="brand-text text-start">' +
                "<strong>منصة الابتكار للاستدامة</strong>" +
                "<small>وزارة البيئة والمياه والزراعة</small>" +
              "</span>" +
            brandClose +
            '<nav id="mainNav" class="d-none d-lg-flex gap-1" aria-label="التنقل الرئيسي">' + navHtml + "</nav>" +
            '<div class="ms-auto header-tools">' +
              '<a class="btn-login" href="https://naama.sa/Account/Login" target="_blank" rel="noopener">' +
                '<i class="bi bi-box-arrow-in-left"></i><span>تسجيل الدخول</span>' +
              "</a>" +
              '<div id="headerPageActions" class="header-page-actions" hidden aria-label="الرجوع"></div>' +
              menuBtn +
            "</div>" +
          "</div>" +
          mobileNav +
        "</div>" +
      "</header>" +
    "</div>";

  var mount = document.getElementById("platform-header-root");
  if (mount) {
    mount.outerHTML = html;
  } else if (script) {
    script.insertAdjacentHTML("beforebegin", html);
  } else {
    document.body.insertAdjacentHTML("afterbegin", html);
  }

  function syncHeaderOffset() {
    var top = document.getElementById("platformTop");
    if (!top) return;
    var h = top.offsetHeight;
    document.documentElement.style.setProperty("--platform-header-h", h + "px");
    document.body.style.paddingTop = h + "px";
    document.documentElement.style.scrollPaddingTop = h + "px";
  }
  syncHeaderOffset();
  window.addEventListener("resize", syncHeaderOffset);
  hoistHeaderPageActions(syncHeaderOffset);
  var mobileNavEl = document.getElementById("mobileNav");
  if (mobileNavEl && window.MutationObserver) {
    new MutationObserver(syncHeaderOffset).observe(mobileNavEl, { attributes: true, attributeFilter: ["style", "class"] });
  }

  if (!isSpa) {
    var toggle = document.getElementById("menuToggle");
    var mobile = document.getElementById("mobileNav");
    if (toggle && mobile) {
      toggle.addEventListener("click", function () {
        var open = mobile.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        syncHeaderOffset();
      });
    }
  }

  function hoistHeaderPageActions(onChange) {
    var slot = document.getElementById("headerPageActions");
    if (!slot || slot.dataset.hoistBound === "1") return;
    slot.dataset.hoistBound = "1";
    var groupSelector = ".exp3-page-actions, .page-hero-actions, .ps-page-actions";
    var loneSelector = ".drv3-back-services, .inst3-back-services, .exp3-back-services, .agency-back-services-btn, .safta3-back-services";
    var syncing = false;

    function outside(list) {
      return Array.prototype.filter.call(list, function (el) {
        return el && !slot.contains(el);
      });
    }

    function sync() {
      if (syncing) return;
      var groups = outside(document.querySelectorAll(groupSelector));
      var lone = outside(document.querySelectorAll(loneSelector)).filter(function (el) {
        return !el.closest(groupSelector);
      });
      var hasButtons = lone.length > 0 || groups.some(function (group) {
        return group.querySelector("a, button");
      });
      if (hasButtons) {
        syncing = true;
        slot.replaceChildren();
        groups.forEach(function (group) {
          Array.prototype.forEach.call(group.querySelectorAll("a, button"), function (btn) {
            slot.appendChild(btn);
          });
          group.hidden = true;
        });
        lone.forEach(function (btn) {
          var bar = btn.closest(".inst3-back-bar, .safta3-back-bar");
          slot.appendChild(btn);
          if (bar) bar.hidden = true;
        });
        slot.dataset.source = groups.length ? "group" : "lone";
        slot.hidden = slot.childElementCount === 0;
        syncing = false;
        if (onChange) onChange();
        return;
      }
      var groupsRemain = outside(document.querySelectorAll(groupSelector)).length > 0;
      if (!groupsRemain && slot.dataset.source === "group" && slot.childElementCount) {
        syncing = true;
        slot.replaceChildren();
        slot.hidden = true;
        delete slot.dataset.source;
        syncing = false;
        if (onChange) onChange();
      }
    }

    sync();
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", sync);
    }
    if (window.MutationObserver && document.body) {
      new MutationObserver(function () {
        if (!syncing) sync();
      }).observe(document.body, { childList: true, subtree: true });
    }
  }

  function isSaudiMobileField(input) {
    if (!input || input.tagName !== "INPUT" || input.disabled || input.readOnly) return false;
    var type = String(input.getAttribute("type") || "").toLowerCase();
    var id = String(input.id || "").toLowerCase();
    var name = String(input.name || "").toLowerCase();
    var autocomplete = String(input.getAttribute("autocomplete") || "").toLowerCase();
    var haystack = id + " " + name + " " + autocomplete;
    if (type === "tel") return true;
    if (/(phone|mobile|جوال|هاتف)/i.test(haystack)) return true;
    if (input.id) {
      var lab = document.querySelector('label[for="' + input.id.replace(/"/g, "") + '"]');
      if (lab && /جوال|هاتف|mobile|phone/i.test(lab.textContent || "")) return true;
    }
    return false;
  }

  function constrainSaudiMobile(input) {
    if (!input || input.dataset.saudiMobileBound === "1") return;
    input.dataset.saudiMobileBound = "1";
    input.setAttribute("maxlength", "10");
    input.setAttribute("inputmode", "numeric");
    function sanitize() {
      var digits = String(input.value || "").replace(/\D/g, "").slice(0, 10);
      if (input.value !== digits) input.value = digits;
    }
    input.addEventListener("input", sanitize);
    input.addEventListener("paste", function (event) {
      event.preventDefault();
      var pasted = (event.clipboardData || window.clipboardData).getData("text");
      input.value = String(pasted || "").replace(/\D/g, "").slice(0, 10);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    sanitize();
  }

  function scanSaudiMobileFields(root) {
    if (!root) return;
    if (root.nodeType === 1 && isSaudiMobileField(root)) constrainSaudiMobile(root);
    if (!root.querySelectorAll) return;
    Array.prototype.forEach.call(root.querySelectorAll("input"), function (el) {
      if (isSaudiMobileField(el)) constrainSaudiMobile(el);
    });
  }

  function startSaudiMobileGuard() {
    if (window.__mewaSaudiPhoneGuard) return;
    window.__mewaSaudiPhoneGuard = true;
    scanSaudiMobileFields(document);
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        Array.prototype.forEach.call(mutation.addedNodes, function (node) {
          if (node.nodeType === 1) scanSaudiMobileFields(node);
        });
      });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startSaudiMobileGuard);
  } else {
    startSaudiMobileGuard();
  }
})();
