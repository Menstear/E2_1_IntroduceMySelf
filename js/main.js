/* =========================
   DOM 요소 선택
========================= */

const header = document.querySelector('.header');

const menuButton = document.querySelector('.menu-button');
const navMenu = document.querySelector('.nav-menu');

const themeButton = document.querySelector('.theme-button');

const scrollTopButton = document.querySelector('#scroll-top');

const internalLinks = document.querySelectorAll('a[href^="#"]');


/* =========================
   테마 상태
========================= */

const savedTheme = localStorage.getItem('theme');

let currentTheme =
    savedTheme === 'dark' ? 'dark' : 'light';


/* =========================
   다크 모드 렌더링
========================= */

const renderTheme = () => {
    document.documentElement.dataset.theme = currentTheme;

    if (currentTheme === 'dark') {
        themeButton.textContent = '☀️';

        themeButton.setAttribute(
            'aria-label',
            '라이트 모드로 전환'
        );
    } else {
        themeButton.textContent = '🌙';

        themeButton.setAttribute(
            'aria-label',
            '다크 모드로 전환'
        );
    }
};


/* =========================
   모바일 메뉴 상태 변경
========================= */

const toggleMenu = () => {
    navMenu.classList.toggle('active');

    const isOpen =
        navMenu.classList.contains('active');

    menuButton.setAttribute(
        'aria-expanded',
        isOpen
    );

    menuButton.setAttribute(
        'aria-label',
        isOpen ? '메뉴 닫기' : '메뉴 열기'
    );
};


/* 모바일 메뉴 닫기 */
const closeMenu = () => {
    navMenu.classList.remove('active');

    menuButton.setAttribute(
        'aria-expanded',
        'false'
    );

    menuButton.setAttribute(
        'aria-label',
        '메뉴 열기'
    );
};


/* =========================
   햄버거 메뉴
========================= */

menuButton.addEventListener('click', () => {
    toggleMenu();
});


/* =========================
   내부 링크 부드러운 스크롤
========================= */

internalLinks.forEach((link) => {
    link.addEventListener('click', (event) => {

        const targetId =
            link.getAttribute('href');

        const targetSection =
            document.querySelector(targetId);


        if (!targetSection) {
            return;
        }


        event.preventDefault();

        closeMenu();


        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});


/* =========================
   스크롤 상태 렌더링
========================= */

const updateScrollUI = () => {

    /* Scroll Top 버튼 */
    if (window.scrollY >= 300) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }


    /* Header 스타일 */
    if (window.scrollY >= 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};


/* =========================
   스크롤 이벤트
========================= */

window.addEventListener('scroll', () => {
    updateScrollUI();
});


/* =========================
   Scroll Top 버튼
========================= */

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


/* =========================
   다크 모드 버튼
========================= */

themeButton.addEventListener('click', () => {

    currentTheme =
        currentTheme === 'light'
            ? 'dark'
            : 'light';


    localStorage.setItem(
        'theme',
        currentTheme
    );


    renderTheme();
});


/* =========================
   최초 실행
========================= */

renderTheme();
updateScrollUI();