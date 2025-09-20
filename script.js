function toggleMenu() {
  console.log('메뉴 클릭됨!');
  
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');
  
  if (!menu) {
    alert('mobile-menu를 찾을 수 없습니다');
    return;
  }
  
  if (menu.classList.contains('open')) {
    menu.classList.remove('open');
    if (overlay) overlay.classList.add('hidden');
    document.body.style.overflow = '';
  } else {
    menu.classList.add('open');
    if (overlay) overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeMenu() {
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');
  
  if (menu && menu.classList.contains('open')) {
    menu.classList.remove('open');
    if (overlay) overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// 한글 버튼 직접 처리
function switchToKorean() {
  console.log('한글로 전환');
  
  // 모든 탭 비활성화
  document.querySelectorAll('.lang-tab').forEach(function(tab) {
    tab.classList.remove('active');
  });
  
  // 한글 탭들 활성화
  document.querySelectorAll('#tab-ko, #mobile-tab-ko').forEach(function(tab) {
    tab.classList.add('active');
  });
  
  // 텍스트 변경
  document.querySelectorAll('[data-ko]').forEach(function(element) {
    if (!element.getAttribute('data-original')) {
      element.setAttribute('data-original', element.textContent);
    }
    element.textContent = element.getAttribute('data-ko');
  });
  
  document.documentElement.setAttribute('lang', 'ko');
}

function switchToEnglish() {
  console.log('영어로 전환');
  
  // 모든 탭 비활성화
  document.querySelectorAll('.lang-tab').forEach(function(tab) {
    tab.classList.remove('active');
  });
  
  // 영어 탭들 활성화
  document.querySelectorAll('#tab-en, #mobile-tab-en').forEach(function(tab) {
    tab.classList.add('active');
  });
  
  // 텍스트 변경
  document.querySelectorAll('[data-ko]').forEach(function(element) {
    const original = element.getAttribute('data-original');
    if (original) {
      element.textContent = original;
    }
  });
  
  document.documentElement.setAttribute('lang', 'en');
}

// DOM 로드 후 실행
document.addEventListener('DOMContentLoaded', function() {
  // 년도 표시
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  
  // 언어 버튼들에 직접 이벤트 추가
  const koButtons = document.querySelectorAll('#tab-ko, #mobile-tab-ko');
  const enButtons = document.querySelectorAll('#tab-en, #mobile-tab-en');
  
  koButtons.forEach(function(button) {
    button.addEventListener('click', switchToKorean);
  });
  
  enButtons.forEach(function(button) {
    button.addEventListener('click', switchToEnglish);
  });
  
  console.log('언어 버튼 이벤트 설정 완료');
});