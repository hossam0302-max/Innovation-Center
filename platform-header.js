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
      ".platform-top .header-search{display:none;align-items:center;gap:.4rem;flex-wrap:nowrap;padding:.35rem .45rem;background:#f4f7f9;border:1px solid var(--naama-border,#e4ecef);border-radius:12px;margin-inline-start:.5rem;flex:1 1 auto;min-width:0;max-width:560px}",
      ".platform-top .h-search-input{position:relative;flex:1 1 auto;min-width:0}",
      ".platform-top .h-search-input .icon{position:absolute;top:50%;transform:translateY(-50%);inset-inline-start:.7rem;color:var(--naama-muted,#62717d);pointer-events:none;font-size:.9rem}",
      ".platform-top .h-search-input input{width:100%;padding:.4rem .6rem;padding-inline-start:2rem;border:1px solid var(--naama-border,#e4ecef);border-radius:8px;background:#fff;font-size:.85rem;color:var(--naama-primary,#003957);outline:none;font-family:inherit}",
      ".platform-top .h-search-input input:focus{border-color:var(--naama-accent,#49aa8b);box-shadow:0 0 0 3px rgba(73,170,139,.15)}",
      ".platform-top .h-search-select{flex:0 1 auto;min-width:7.5rem;padding:.4rem .6rem;padding-inline-end:1.9rem;border:1px solid var(--naama-border,#e4ecef);border-radius:8px;background-color:#fff;font-size:.85rem;color:var(--naama-primary,#003957);cursor:pointer;appearance:none;-webkit-appearance:none;font-family:inherit;background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='%23003957' d='M8 11L3 6h10z'/></svg>\");background-repeat:no-repeat;background-position:left .55rem center;background-size:12px}",
      ".platform-top .h-search-reset{flex:0 0 auto;padding:.4rem .65rem;border:1px solid var(--naama-border,#e4ecef);border-radius:8px;background:#fff;color:var(--naama-primary,#003957);cursor:pointer;display:inline-flex;align-items:center;gap:.3rem;font-size:.82rem;font-weight:600;white-space:nowrap;font-family:inherit}",
      ".platform-top .h-search-reset:hover{border-color:var(--naama-accent,#49aa8b);color:var(--naama-accent-dark,#378a6f);background:var(--naama-accent-soft,#e8f6f1)}",
      ".platform-top .btn-menu-toggle{display:none;align-items:center;justify-content:center;width:42px;height:42px;border:1px solid var(--naama-border,#e4ecef);border-radius:12px;background:#fff;color:var(--naama-primary,#003957)}",
      ".platform-top #mobileNav{display:none;flex-wrap:wrap;gap:.35rem;padding-top:.85rem;margin-top:.85rem;border-top:1px solid var(--naama-border,#e4ecef)}",
      ".platform-top #mobileNav.is-open{display:flex}",
      ".platform-top #mobileHeaderSearchBox{display:none!important}",
      "@media (min-width:992px){.platform-top .header-row .header-search{display:flex!important}.platform-top .header-row{flex-wrap:nowrap!important;gap:.6rem!important;align-items:center!important}.platform-top .header-row .brand-link{flex:0 0 auto}.platform-top .header-row #mainNav{display:flex!important;flex:0 0 auto;flex-wrap:nowrap;white-space:nowrap;gap:.25rem}.platform-top .header-row #mainNav .nav-pill{padding:.4rem .7rem;font-size:.88rem}.platform-top .header-row .btn-login{padding:.45rem .9rem;font-size:.88rem}.platform-top .header-row .brand-text small{display:none}.platform-top .header-row .brand-text strong{font-size:.98rem}.platform-top .header-row .ms-auto{margin-inline-start:auto!important}}",
      "@media (min-width:1280px){.platform-top .header-row .brand-text small{display:block}}",
      "@media (min-width:992px) and (max-width:1279.98px){.platform-top .h-reset-label{display:none}.platform-top .h-search-reset{padding:.4rem .5rem}}",
      "@media (max-width:991.98px){.platform-top #mainNav{display:none!important}.platform-top .btn-menu-toggle{display:inline-flex}.platform-top .header-row .header-search{display:none!important}}",
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

  var searchHtml = isSpa
    ? ""
    : '<div class="h-search-input">' +
      '<i class="bi bi-search icon" aria-hidden="true"></i>' +
      '<input type="search" placeholder="البحث عن خدمة..." aria-label="البحث عن خدمة" autocomplete="off">' +
      "</div>" +
      '<select class="h-search-select" aria-label="نوع المستفيد">' +
      '<option selected>نوع المستفيد: الكل</option>' +
      [
        "الجهات والبرامج الحكومية",
        "القطاع الخاص",
        "المستثمرون والمؤسسات التمويلية",
        "الشركات الناشئة",
        "القطاع غير الربحي",
        "المؤسسات الأكاديمية والبحثية",
        "طلبة الجامعات والمبتكرون الأفراد",
        "لجميع المستفيدين زوار المنصة"
      ].map(function (item) { return "<option>" + item + "</option>"; }).join("") +
      "</select>" +
      '<button type="button" class="h-search-reset" title="إعادة تعيين الفلتر" aria-label="إعادة تعيين الفلتر">' +
      '<i class="bi bi-arrow-counterclockwise"></i> <span class="h-reset-label">إعادة تعيين</span></button>';

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
                "<strong>منصة البحث والابتكار</strong>" +
                "<small>وزارة البيئة والمياه والزراعة</small>" +
              "</span>" +
            brandClose +
            '<nav id="mainNav" class="d-none d-lg-flex gap-1" aria-label="التنقل الرئيسي">' + navHtml + "</nav>" +
            '<div id="headerSearchBox" class="header-search' + (isSpa ? " d-none d-lg-flex" : "") + '" aria-label="بحث سريع">' + searchHtml + "</div>" +
            '<div class="ms-auto d-flex align-items-center gap-2">' +
              '<a class="btn-login" href="https://naama.sa/Account/Login" target="_blank" rel="noopener">' +
                '<i class="bi bi-box-arrow-in-left"></i><span>تسجيل الدخول</span>' +
              "</a>" +
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
    var resetBtn = document.querySelector("#platformTop .h-search-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        var input = document.querySelector("#platformTop .h-search-input input");
        var select = document.querySelector("#platformTop .h-search-select");
        if (input) input.value = "";
        if (select) select.selectedIndex = 0;
      });
    }
  }
})();
