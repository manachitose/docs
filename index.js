(function () {
  "use strict";

  /* theme toggle: cycles system → dark → light → system */
  var root = document.documentElement;
  var STORAGE_KEY = "profile-theme";
  var themeToggle = document.getElementById("themeToggle");
  var themeLabel = document.getElementById("themeLabel");

  function applyTheme(mode) {
    if (mode === "dark" || mode === "light") {
      root.setAttribute("data-theme", mode);
    } else {
      root.removeAttribute("data-theme");
    }
    themeLabel.textContent = mode === "dark" ? "ダーク表示" : mode === "light" ? "ライト表示" : "OSに合わせる";
  }

  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  applyTheme(saved || "system");

  themeToggle.addEventListener("click", function () {
    var current = root.getAttribute("data-theme") || "system";
    var next = current === "system" ? "dark" : current === "dark" ? "light" : "system";
    applyTheme(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
  });

  /* ============================================================
     ソーシャルリンク一覧
     - ここに増減・並び替えを反映すれば画面側に自動反映されます
     - icon: assets/icons/ に置いたアイコン画像ファイル名
             （まだ画像を置いていない場合は自動的に頭文字を表示します）
     - url: 各サービスの自分のページURLに書き換えてください
     ============================================================ */
  var SOCIAL_LINKS = [
    { label: "X",       icon: "assets/icons/x.svg",       url: "https://x.com/ManaChitose" },
    { label: "YouTube", icon: "assets/icons/youtube.svg", url: "https://www.youtube.com/@ManaChitose" },
    { label: "Wick",    icon: "assets/icons/wick.svg",    url: "https://wick-sns.com/sns/profile/eb87d56d-8860-4229-8835-e87f90ad5cba" },
    { label: "つなぐ",   icon: "assets/icons/tsunagu.svg", url: "https://tsunagu.cloud/users/ManaChitose" },
    { label: "Booth",   icon: "assets/icons/booth.svg",   url: "https://manachitose.booth.pm/" },
    { label: "VRChat",  icon: "assets/icons/vrchat.svg",  url: "https://vrchat.com/home/user/usr_51dc2b5f-a380-495c-ae54-d3549e3eb3b3" }
  ];

  var grid = document.getElementById("socialGrid");
  SOCIAL_LINKS.forEach(function (link) {
    var a = document.createElement("a");
    a.className = "social-link";
    a.href = link.url;
    a.target = "_blank";
    a.rel = "noopener";

    var iconWrap = document.createElement("span");
    iconWrap.className = "icon";

    var img = document.createElement("img");
    img.src = link.icon;
    img.alt = "";
    img.addEventListener("error", function () {
      img.classList.add("is-broken");
    });

    var fallback = document.createElement("span");
    fallback.className = "icon-fallback";
    fallback.textContent = link.label.slice(0, 1);

    iconWrap.appendChild(img);
    iconWrap.appendChild(fallback);

    var text = document.createElement("span");
    text.textContent = link.label;

    a.appendChild(iconWrap);
    a.appendChild(text);
    grid.appendChild(a);
  });

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
