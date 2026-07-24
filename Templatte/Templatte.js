(function () {
  var sidebar = document.getElementById('sidebar');
  var scrim = document.getElementById('scrim');
  var toggle = document.getElementById('navToggle');
  function openNav() { sidebar.classList.add('open'); scrim.classList.add('open'); }
  function closeNav() { sidebar.classList.remove('open'); scrim.classList.remove('open'); }
  toggle.addEventListener('click', function () {
    sidebar.classList.contains('open') ? closeNav() : openNav();
  });
  scrim.addEventListener('click', closeNav);
  sidebar.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  var toolsDropdown = document.getElementById('toolsDropdown');
  if (toolsDropdown) {
    document.addEventListener('click', function (e) {
      if (toolsDropdown.open && !toolsDropdown.contains(e.target)) {
        toolsDropdown.open = false;
      }
    });
  }

  var progress = document.getElementById('progress');
  function updateProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  var sections = Array.prototype.slice.call(document.querySelectorAll('section.chapter'));
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  function updateActive() {
    var pos = window.scrollY + 120;
    var current = sections[0];
    sections.forEach(function (sec) {
      if (sec.offsetTop <= pos) current = sec;
    });
    links.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current.id);
    });
  }
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();
