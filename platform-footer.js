(function () {
  var script = document.currentScript;
  var mode = (script && script.getAttribute("data-mode")) || "static";
  var base = (script && script.getAttribute("data-base")) || "";
  var isSpa = mode === "spa";

  function href(view) {
    var url = base + "index.html";
    return view ? url + "?view=" + view : url;
  }

  if (!document.getElementById("platform-footer-styles")) {
    var style = document.createElement("style");
    style.id = "platform-footer-styles";
    style.textContent = [
      ".site-footer{background:#fff;border-top:1px solid var(--naama-border,#e4ecef);margin-top:3rem;padding:2.2rem 0 2.4rem;font-family:\"IBM Plex Sans Arabic\",\"Segoe UI\",Tahoma,sans-serif}",
      ".site-footer .brand-mark{display:inline-block;width:36px;height:36px;border-radius:10px;position:relative;flex-shrink:0;background:radial-gradient(circle at 30% 30%,var(--naama-gold,#e8a34f) 0 22%,transparent 23%),linear-gradient(145deg,var(--naama-accent,#49aa8b) 0%,var(--naama-primary,#003957) 100%)}",
      ".site-footer .brand-mark::after{content:\"\";position:absolute;inset:55% 18% 18% 18%;border-radius:2px 2px 6px 6px;background:rgba(255,255,255,.35)}",
      ".site-footer .footer-brand{color:var(--naama-primary,#003957)}",
      ".site-footer .footer-title{color:var(--naama-primary,#003957);font-weight:700}",
      ".site-footer .footer-desc{max-width:34rem;color:var(--naama-muted,#62717d)!important}",
      ".site-footer .footer-links a,.site-footer .footer-links button{color:var(--naama-primary,#003957);font-weight:600;background:transparent;border:0;padding:0;text-decoration:none}",
      ".site-footer .footer-links a:hover,.site-footer .footer-links button:hover{color:var(--naama-accent-dark,#378a6f)}",
      ".site-footer .text-muted{color:var(--naama-muted,#62717d)!important}"
    ].join("");
    document.head.appendChild(style);
  }

  var links = isSpa
    ? '<button type="button" onclick="navigate(\'home\')">الرئيسية</button>' +
      '<button type="button" onclick="navigate(\'our-services\')">خدماتنا</button>' +
      '<button type="button" onclick="navigate(\'publications\')">منشورات وتقارير</button>' +
      '<button type="button" onclick="navigate(\'my-requests\')">طلباتي</button>' +
      '<a href="https://naama.sa/" target="_blank" rel="noreferrer">منصة نما</a>'
    : '<a href="' + href() + '">الرئيسية</a>' +
      '<a href="' + href("our-services") + '">خدماتنا</a>' +
      '<a href="' + href("publications") + '">منشورات وتقارير</a>' +
      '<a href="' + href("my-requests") + '">طلباتي</a>' +
      '<a href="https://naama.sa/" target="_blank" rel="noreferrer">منصة نما</a>';

  var html =
    '<footer class="site-footer">' +
      '<div class="container">' +
        '<div class="row g-4">' +
          '<div class="col-md-5">' +
            '<div class="d-flex align-items-center gap-2 mb-2">' +
              '<span class="brand-mark" aria-hidden="true"></span>' +
              '<strong class="footer-brand">منصة البحث والابتكار</strong>' +
            "</div>" +
            '<p class="text-muted footer-desc mb-0">المحور المركزي لأنشطة البحث والابتكار في قطاعات البيئة والمياه والزراعة، ضمن منظومة منصة نما وأهداف رؤية 2030.</p>' +
          "</div>" +
          '<div class="col-md-4">' +
            '<h6 class="footer-title">روابط سريعة</h6>' +
            '<div class="footer-links d-flex flex-wrap gap-3">' + links + "</div>" +
          "</div>" +
          '<div class="col-md-3">' +
            '<h6 class="footer-title">الدعم</h6>' +
            '<p class="text-muted mb-1"><i class="bi bi-headset me-1"></i> الرقم الموحد <strong>939</strong></p>' +
            '<p class="text-muted mb-0"><i class="bi bi-envelope me-1"></i> ri-support@mewa.gov.sa</p>' +
          "</div>" +
        "</div>" +
        '<hr class="my-4">' +
        '<div class="d-flex flex-wrap justify-content-between align-items-center gap-2 text-muted small">' +
          "<span>© جميع الحقوق محفوظة · وزارة البيئة والمياه والزراعة</span>" +
          "<span>الإصدار التجريبي · متوافق مع النفاذ الموحد</span>" +
        "</div>" +
      "</div>" +
    "</footer>";

  var mount = document.getElementById("platform-footer-root");
  if (mount) {
    mount.outerHTML = html;
  } else if (script) {
    script.insertAdjacentHTML("beforebegin", html);
  } else {
    document.body.insertAdjacentHTML("beforeend", html);
  }
})();
