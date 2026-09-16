(function (global) {
  var STORAGE_KEY = "mewa-ri-naama-v2";
  var STYLE_ID = "mewa-request-submit-styles";
  var MODAL_ID = "mewaSuccessModal";
  var redirectTimer = null;

  function val() {
    for (var i = 0; i < arguments.length; i += 1) {
      var el = document.getElementById(arguments[i]);
      if (el && String(el.value || "").trim()) return String(el.value).trim();
    }
    return "";
  }

  function loadRequests() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var list = JSON.parse(raw);
      return Array.isArray(list) ? list : [];
    } catch (err) {
      return [];
    }
  }

  function nextRequestId(list) {
    var max = 0;
    (list || []).forEach(function (item) {
      var match = String((item && item.id) || "").match(/(\d+)$/);
      var num = match ? Number(match[1]) : 0;
      if (num > max) max = num;
    });
    return "REQ-2026-" + String(max + 1).padStart(3, "0");
  }

  function save(payload) {
    var list = loadRequests();
    var created = {
      id: nextRequestId(list),
      title: (payload && payload.title) || (payload && payload.service) || "طلب جديد",
      service: (payload && payload.service) || (payload && payload.title) || "طلب خدمة",
      sector: (payload && payload.sector) || "تمكين الابتكار",
      summary: (payload && payload.summary) || "",
      applicant: (payload && payload.applicant) || "",
      organization: (payload && payload.organization) || "",
      email: (payload && payload.email) || "",
      phone: (payload && payload.phone) || "",
      submittedAt: new Date().toISOString().slice(0, 10),
      status: "قيد المراجعة"
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([created].concat(list)));
    return created;
  }

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = [
      "#" + MODAL_ID + "{position:fixed;inset:0;z-index:4000;display:none;align-items:center;justify-content:center;padding:1.25rem;background:rgba(7,32,24,.48)}",
      "#" + MODAL_ID + ".is-open{display:flex}",
      "#" + MODAL_ID + " .mewa-success-dialog{width:min(28rem,100%);padding:1.75rem 1.5rem 1.4rem;border-radius:1.15rem;background:#fff;box-shadow:0 24px 48px -18px rgba(7,77,49,.45);text-align:center;font-family:\"IBM Plex Sans Arabic\",\"Segoe UI\",Tahoma,sans-serif}",
      "#" + MODAL_ID + " .mewa-success-dialog i{display:inline-flex;font-size:2.35rem;color:#1b8354;margin-bottom:.65rem}",
      "#" + MODAL_ID + " h2{margin:0 0 .45rem;color:#074d31;font-size:1.2rem;font-weight:800}",
      "#" + MODAL_ID + " p{margin:0 0 1.15rem;color:#384250;font-size:.92rem;line-height:1.7}",
      "#" + MODAL_ID + " strong{color:#074d31}",
      "#" + MODAL_ID + " .mewa-success-go{display:inline-flex;align-items:center;justify-content:center;width:100%;min-height:46px;padding:.55rem 1.2rem;border-radius:.5rem;background:#074d31;color:#fff!important;font-weight:700;text-decoration:none}"
    ].join("");
    document.head.appendChild(style);
  }

  function defaultGo(options) {
    var url = (options && options.requestsUrl) || "index.html?view=my-requests";
    window.location.href = url;
  }

  function closeModal() {
    if (redirectTimer) {
      window.clearTimeout(redirectTimer);
      redirectTimer = null;
    }
    var modal = document.getElementById(MODAL_ID);
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.hidden = true;
    modal.style.display = "none";
  }

  function showModal(created, options) {
    options = options || {};
    injectStyles();
    var modal = document.getElementById(MODAL_ID);
    if (!modal) {
      modal = document.createElement("div");
      modal.id = MODAL_ID;
      modal.hidden = true;
      modal.innerHTML =
        '<div class="mewa-success-dialog" role="dialog" aria-modal="true" aria-labelledby="mewaSuccessTitle">' +
          '<i class="bi bi-check-circle-fill" aria-hidden="true"></i>' +
          ' <h2 id="mewaSuccessTitle">تم حفظ الطلب بنجاح</h2>' +
          '<p>تم حفظ الطلب وسيتم مراجعته وفق الإجراءات المعتمدة.<br>رقم الطلب: <strong id="mewaSuccessRequestId">—</strong></p>' +
          '<a class="mewa-success-go" id="mewaSuccessGo" href="index.html?view=my-requests">متابعة الطلب في طلباتي</a>' +
        "</div>";
      document.body.appendChild(modal);
    }
    var idEl = document.getElementById("mewaSuccessRequestId");
    if (idEl) idEl.textContent = created && created.id ? created.id : "—";
    var goLink = document.getElementById("mewaSuccessGo");
    var go = typeof options.onGo === "function" ? options.onGo : function () { defaultGo(options); };
    function goNow() {
      closeModal();
      go();
    }
    if (goLink) {
      goLink.onclick = function (event) {
        event.preventDefault();
        goNow();
      };
    }
    modal.hidden = false;
    modal.classList.add("is-open");
    modal.style.display = "flex";
    if (redirectTimer) window.clearTimeout(redirectTimer);
    var dismissAfter = options.delay != null ? options.delay : 3000;
    redirectTimer = window.setTimeout(goNow, dismissAfter);
  }

  function complete(payload, options) {
    var created = save(payload || {});
    showModal(created, options);
    return created;
  }

  global.MEWARequests = {
    val: val,
    save: save,
    showModal: showModal,
    complete: complete
  };
})(window);
