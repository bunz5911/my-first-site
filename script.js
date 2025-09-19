// 년도 표시
(function updateYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

// 앵커 부드러운 스크롤
(function enableSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

// 인터섹션 옵저버 애니메이션
(function setupIntersectionAnimations() {
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.slide-up').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
})();

// 버튼 클릭 리플 효과
(function setupButtonRipple() {
  document.querySelectorAll('.btn-glow').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      setTimeout(function() { ripple.remove(); }, 600);
    });
  });
})();

// 언어 탭 토글 (원문/한국어)
(function setupLanguageTabs() {
  var root = document.documentElement;
  // URL 파라미터(lang) 우선 적용: ?lang=ko 또는 ?lang=en
  var params = new URLSearchParams(window.location.search);
  var paramLang = params.get('lang');
  if (paramLang === 'ko' || paramLang === 'en') {
    root.setAttribute('lang', paramLang);
  }
  var currentLang = (root.getAttribute('lang') || 'en').startsWith('ko') ? 'ko' : 'en';
  root.setAttribute('lang', currentLang);

  function applyLanguage(lang) {
    var isKo = lang === 'ko';
    document.querySelectorAll('[data-ko]').forEach(function(el){
      var original = el.getAttribute('data-original');
      if (!original) {
        el.setAttribute('data-original', el.textContent);
      }
      el.textContent = isKo ? el.getAttribute('data-ko') : el.getAttribute('data-original');
    });

    root.setAttribute('lang', isKo ? 'ko' : 'en');
    var enTab = document.getElementById('tab-en');
    var koTab = document.getElementById('tab-ko');
    if (enTab && koTab) {
      if (isKo) {
        enTab.classList.remove('active');
        koTab.classList.add('active');
      } else {
        koTab.classList.remove('active');
        enTab.classList.add('active');
      }
    }
  }

  var enTabBtn = document.getElementById('tab-en');
  var koTabBtn = document.getElementById('tab-ko');
  if (enTabBtn) enTabBtn.addEventListener('click', function(){ applyLanguage('en'); });
  if (koTabBtn) koTabBtn.addEventListener('click', function(){ applyLanguage('ko'); });

  applyLanguage(currentLang);

  // 언어가 URL 파라미터로 강제된 경우 탭 숨김
  if (paramLang === 'ko' || paramLang === 'en') {
    var tabs = document.querySelector('.lang-tabs');
    if (tabs) tabs.style.display = 'none';
  }
})();
