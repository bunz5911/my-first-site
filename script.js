<<<<<<< HEAD
console.log('Script loaded');

// 기존 setupMobileMenu 함수 전에 추가
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded');
  const btn = document.getElementById('mobile-menu-btn');
  console.log('Button found:', btn);
});

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
        // 모바일 메뉴 닫기
        if (window.closeMobileMenu) {
          window.closeMobileMenu();
        }
      }
    });
  });
})();

// 모바일 메뉴 기능
(function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  
  function openMobileMenu() {
    mobileMenu.classList.add('open');
    mobileMenuOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // 햄버거 아이콘 애니메이션
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
  }
  
  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileMenuOverlay.classList.add('hidden');
    document.body.style.overflow = '';
    
    // 햄버거 아이콘 리셋
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
  
  // 전역으로 노출 (앵커 클릭시 사용)
  window.closeMobileMenu = closeMobileMenu;
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }
  
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  }
  
  // ESC 키로 메뉴 닫기
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
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

// 언어 탭 토글 (원문/한국어) - 수정된 버전
(function setupLanguageTabs() {
  var root = document.documentElement;
  var currentLang = 'en'; // 기본값을 영어로 설정

  function applyLanguage(lang) {
    console.log('Applying language:', lang);
    var isKo = lang === 'ko';
    
    document.querySelectorAll('[data-ko]').forEach(function(el){
      var original = el.getAttribute('data-original');
      if (!original) {
        el.setAttribute('data-original', el.textContent || el.innerText);
      }
      
      if (isKo) {
        el.textContent = el.getAttribute('data-ko');
      } else {
        el.textContent = el.getAttribute('data-original');
      }
    });

    root.setAttribute('lang', isKo ? 'ko' : 'en');
    currentLang = lang;
    
    // 모든 탭 업데이트
    updateAllTabs(isKo);
  }

  function updateAllTabs(isKo) {
    // 데스크톱 탭
    var enTab = document.getElementById('tab-en');
    var koTab = document.getElementById('tab-ko');
    // 모바일 탭
    var mobileEnTab = document.getElementById('mobile-tab-en');
    var mobileKoTab = document.getElementById('mobile-tab-ko');
    
    if (enTab && koTab) {
      if (isKo) {
        enTab.classList.remove('active');
        koTab.classList.add('active');
      } else {
        koTab.classList.remove('active');
        enTab.classList.add('active');
      }
    }
    
    if (mobileEnTab && mobileKoTab) {
      if (isKo) {
        mobileEnTab.classList.remove('active');
        mobileKoTab.classList.add('active');
      } else {
        mobileKoTab.classList.remove('active');
        mobileEnTab.classList.add('active');
      }
    }
  }

  // 이벤트 리스너 추가
  document.addEventListener('DOMContentLoaded', function() {
    // 데스크톱 탭
    var enTabBtn = document.getElementById('tab-en');
    var koTabBtn = document.getElementById('tab-ko');
    // 모바일 탭
    var mobileEnTabBtn = document.getElementById('mobile-tab-en');
    var mobileKoTabBtn = document.getElementById('mobile-tab-ko');
    
    if (enTabBtn) enTabBtn.addEventListener('click', function(){ 
      console.log('EN tab clicked');
      applyLanguage('en'); 
    });
    if (koTabBtn) koTabBtn.addEventListener('click', function(){ 
      console.log('KO tab clicked');
      applyLanguage('ko'); 
    });
    if (mobileEnTabBtn) mobileEnTabBtn.addEventListener('click', function(){ 
      console.log('Mobile EN tab clicked');
      applyLanguage('en'); 
    });
    if (mobileKoTabBtn) mobileKoTabBtn.addEventListener('click', function(){ 
      console.log('Mobile KO tab clicked');
      applyLanguage('ko'); 
    });

    // 초기 언어 설정
    applyLanguage('en');
  });
})();
=======
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

// 간단한 언어 토글 - 추가 코드
document.addEventListener('DOMContentLoaded', function() {
  console.log('Simple language toggle loaded');
  
  // 모든 언어 버튼 찾기
  const allLangButtons = document.querySelectorAll('#tab-en, #tab-ko, #mobile-tab-en, #mobile-tab-ko');
  
  allLangButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      console.log('Language button clicked:', this.id);
      
      const isKorean = this.id.includes('ko');
      const lang = isKorean ? 'ko' : 'en';
      
      // 모든 data-ko 요소 변경
      document.querySelectorAll('[data-ko]').forEach(function(element) {
        if (!element.getAttribute('data-original')) {
          element.setAttribute('data-original', element.textContent);
        }
        
        if (isKorean) {
          element.textContent = element.getAttribute('data-ko');
        } else {
          element.textContent = element.getAttribute('data-original');
        }
      });
      
      // 모든 탭 버튼 업데이트
      document.querySelectorAll('.lang-tab').forEach(function(tab) {
        tab.classList.remove('active');
      });
      
      // 같은 언어의 모든 탭 활성화
      if (isKorean) {
        document.querySelectorAll('#tab-ko, #mobile-tab-ko').forEach(function(tab) {
          tab.classList.add('active');
        });
      } else {
        document.querySelectorAll('#tab-en, #mobile-tab-en').forEach(function(tab) {
          tab.classList.add('active');
        });
      }
      
      // HTML lang 속성 변경
      document.documentElement.setAttribute('lang', lang);
      
      console.log('Language changed to:', lang);
    });
  });
});
>>>>>>> 30544372fb79204511de585eb2f2a34b0cd2ba65
