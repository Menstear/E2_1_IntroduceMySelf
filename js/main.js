/* =========================
   1. DOM 요소 선택
========================= */

const header =
    document.querySelector('.header');


const menuButton =
    document.querySelector('.menu-button');


const navMenu =
    document.querySelector('.nav-menu');


const themeButton =
    document.querySelector('.theme-button');


const scrollTopButton =
    document.querySelector('#scroll-top');


const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


/* =========================
   2. 테마 상태
========================= */

const savedTheme =
    localStorage.getItem('theme');


let currentTheme =
    savedTheme === 'dark'
        ? 'dark'
        : 'light';


/* =========================
   3. Theme Rendering
========================= */

const renderTheme = () => {

    document.documentElement.dataset.theme =
        currentTheme;


    if (currentTheme === 'dark') {

        themeButton.textContent =
            '☀️';

        themeButton.setAttribute(
            'aria-label',
            '라이트 모드로 전환'
        );

    } else {

        themeButton.textContent =
            '🌙';

        themeButton.setAttribute(
            'aria-label',
            '다크 모드로 전환'
        );

    }

};


/* =========================
   4. Mobile Menu
========================= */

const toggleMenu = () => {

    navMenu.classList.toggle(
        'active'
    );


    const isOpen =
        navMenu.classList.contains(
            'active'
        );


    menuButton.setAttribute(
        'aria-expanded',
        String(isOpen)
    );


    menuButton.setAttribute(
        'aria-label',
        isOpen
            ? '메뉴 닫기'
            : '메뉴 열기'
    );

};


const closeMenu = () => {

    navMenu.classList.remove(
        'active'
    );


    menuButton.setAttribute(
        'aria-expanded',
        'false'
    );


    menuButton.setAttribute(
        'aria-label',
        '메뉴 열기'
    );

};


/* 햄버거 클릭 */

menuButton.addEventListener(
    'click',
    toggleMenu
);


/* ESC 키로 메뉴 닫기 */

document.addEventListener(
    'keydown',
    (event) => {

        if (
            event.key === 'Escape' &&
            navMenu.classList.contains('active')
        ) {

            closeMenu();

            menuButton.focus();

        }

    }
);


/* 화면이 태블릿 이상으로 커지면
   모바일 메뉴 상태 초기화 */

window.addEventListener(
    'resize',
    () => {

        if (window.innerWidth >= 768) {
            closeMenu();
        }

    }
);


/* =========================
   5. Smooth Scroll
========================= */

internalLinks.forEach((link) => {

    link.addEventListener(
        'click',
        (event) => {

            const targetId =
                link.getAttribute('href');


            /*
             #만 있는 링크는
             querySelector에서 문제가 될 수 있으므로 제외
            */

            if (
                !targetId ||
                targetId === '#'
            ) {
                return;
            }


            const targetSection =
                document.querySelector(
                    targetId
                );


            if (!targetSection) {
                return;
            }


            event.preventDefault();


            closeMenu();


            targetSection.scrollIntoView({
                behavior: 'smooth'
            });

        }
    );

});


/* =========================
   6. Scroll UI
========================= */

const updateScrollUI = () => {

    /* Scroll Top */

    if (window.scrollY >= 300) {

        scrollTopButton.classList.add(
            'visible'
        );

    } else {

        scrollTopButton.classList.remove(
            'visible'
        );

    }


    /* Header */

    if (window.scrollY >= 60) {

        header.classList.add(
            'scrolled'
        );

    } else {

        header.classList.remove(
            'scrolled'
        );

    }

};


window.addEventListener(
    'scroll',
    updateScrollUI,
    {
        passive: true
    }
);


/* =========================
   7. Scroll Top
========================= */

scrollTopButton.addEventListener(
    'click',
    () => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    }
);


/* =========================
   8. Dark Mode
========================= */

themeButton.addEventListener(
    'click',
    () => {

        currentTheme =
            currentTheme === 'light'
                ? 'dark'
                : 'light';


        localStorage.setItem(
            'theme',
            currentTheme
        );


        renderTheme();

    }
);


/* =========================
   9. Scroll Animation
========================= */

const revealElements =
    document.querySelectorAll(
        '.reveal'
    );


const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    /*
                     요소의 20% 이상이 들어왔을 때
                     visible 추가
                    */

                    if (
                        entry.intersectionRatio >= 0.2
                    ) {

                        entry.target
                            .classList
                            .add('visible');

                    }

                    /*
                     화면에서 완전히 사라졌을 때만
                     visible 제거
                    */

                    else if (
                        !entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .remove('visible');

                    }

                }
            );

        },

        {
            threshold: [
                0,
                0.2
            ]
        }

    );


revealElements.forEach(
    (element) => {

        observer.observe(
            element
        );

    }
);


/* =========================
   10. Contact Form DOM
========================= */

const contactForm =
    document.querySelector(
        '#contact-form'
    );


const nameInput =
    document.querySelector(
        '#name'
    );


const emailInput =
    document.querySelector(
        '#email'
    );


const messageInput =
    document.querySelector(
        '#message'
    );


const nameError =
    document.querySelector(
        '#name-error'
    );


const emailError =
    document.querySelector(
        '#email-error'
    );


const messageError =
    document.querySelector(
        '#message-error'
    );


const formStatus =
    document.querySelector(
        '#form-status'
    );


/* =========================
   11. Contact Form State
========================= */

const formState = {

    hasSubmitted: false,

    isSuccess: false,

    errors: {
        name: '',
        email: '',
        message: ''
    }

};


/* =========================
   12. Contact Validation
========================= */

const validateContactForm = () => {

    const name =
        nameInput.value.trim();


    const email =
        emailInput.value.trim();


    const message =
        messageInput.value.trim();


    /* 이름 */

    if (name === '') {

        formState.errors.name =
            '이름을 입력해주세요.';

    } else {

        formState.errors.name =
            '';

    }


    /* 이메일 */

    if (email === '') {

        formState.errors.email =
            '이메일을 입력해주세요.';

    } else if (
        emailInput.validity.typeMismatch
    ) {

        formState.errors.email =
            '올바른 이메일 형식으로 입력해주세요.';

    } else {

        formState.errors.email =
            '';

    }


    /* 메시지 */

    if (message === '') {

        formState.errors.message =
            '메시지를 입력해주세요.';

    } else {

        formState.errors.message =
            '';

    }


    return (
        formState.errors.name === '' &&
        formState.errors.email === '' &&
        formState.errors.message === ''
    );

};


/* =========================
   13. Contact Rendering
========================= */

const renderContactForm = () => {

    nameError.textContent =
        formState.errors.name;


    emailError.textContent =
        formState.errors.email;


    messageError.textContent =
        formState.errors.message;


    nameInput.setAttribute(
        'aria-invalid',
        formState.errors.name
            ? 'true'
            : 'false'
    );


    emailInput.setAttribute(
        'aria-invalid',
        formState.errors.email
            ? 'true'
            : 'false'
    );


    messageInput.setAttribute(
        'aria-invalid',
        formState.errors.message
            ? 'true'
            : 'false'
    );


    if (formState.isSuccess) {

        formStatus.textContent =
            '입력값 검증에 성공했습니다. 실제 메시지는 전송되지 않았습니다.';

    } else {

        formStatus.textContent =
            '';

    }

};


/* =========================
   14. Contact Submit
========================= */

contactForm.addEventListener(
    'submit',
    (event) => {

        event.preventDefault();


        formState.hasSubmitted =
            true;


        formState.isSuccess =
            validateContactForm();


        renderContactForm();


        if (!formState.isSuccess) {

            const firstInvalidInput =
                contactForm.querySelector(
                    '[aria-invalid="true"]'
                );


            if (firstInvalidInput) {

                firstInvalidInput.focus();

            }

        }

    }
);


/* =========================
   15. Contact Input
========================= */

const contactInputs = [
    nameInput,
    emailInput,
    messageInput
];


contactInputs.forEach(
    (input) => {

        input.addEventListener(
            'input',
            () => {

                formState.isSuccess =
                    false;


                if (
                    formState.hasSubmitted
                ) {

                    validateContactForm();

                }


                renderContactForm();

            }
        );

    }
);


/* =========================
   16. GitHub Projects Config
========================= */

const githubUsername =
    'Menstear';


const projectsContainer =
    document.querySelector(
        '#projects-container'
    );


/* =========================
   17. GitHub Projects State
========================= */

const projectState = {

    status: 'idle',

    projects: [],

    error: ''

};


/* =========================
   18. GitHub Projects Render
========================= */

const renderProjects = () => {

    /*
     Loading
    */

    if (
        projectState.status ===
        'loading'
    ) {

        projectsContainer.innerHTML = `
            <div
                class="project-status"
                role="status"
            >
                <div
                    class="spinner"
                    aria-hidden="true"
                ></div>

                <p>
                    프로젝트를 불러오는 중입니다...
                </p>
            </div>
        `;


        return;

    }


    /*
     Error
    */

    if (
        projectState.status ===
        'error'
    ) {

        /*
         HTML 구조 자체는 우리가 작성한
         고정 문자열이므로 innerHTML 사용
        */

        projectsContainer.innerHTML = `
            <div class="project-status">

                <p>
                    프로젝트를 불러올 수 없습니다.
                </p>

                <p id="project-error-detail"></p>

                <button
                    id="retry-projects"
                    class="button"
                    type="button"
                >
                    다시 시도
                </button>

            </div>
        `;


        /*
         외부에서 발생한 오류 문자열은
         textContent로 삽입
        */

        const errorDetail =
            document.querySelector(
                '#project-error-detail'
            );


        errorDetail.textContent =
            projectState.error;


        const retryButton =
            document.querySelector(
                '#retry-projects'
            );


        retryButton.addEventListener(
            'click',
            fetchProjects
        );


        return;

    }


    /*
     Empty
    */

    if (
        projectState.status ===
        'empty'
    ) {

        projectsContainer.innerHTML = `
            <div class="project-status">

                <p>
                    표시할 프로젝트가 없습니다.
                </p>

            </div>
        `;


        return;

    }


    /*
     Success
    */

    if (
        projectState.status ===
        'success'
    ) {

        const projectCards =
            projectState.projects.map(
                (repo) => {

                    /*
                     구조분해 할당
                    */

                    const {
                        name,
                        description,
                        html_url,
                        language,
                        stargazers_count
                    } = repo;


                    /*
                     Article 생성
                    */

                    const article =
                        document.createElement(
                            'article'
                        );


                    article.classList.add(
                        'project-card'
                    );


                    /*
                     프로젝트 제목
                    */

                    const title =
                        document.createElement(
                            'h3'
                        );


                    title.classList.add(
                        'project-title'
                    );


                    title.textContent =
                        name;


                    /*
                     설명
                    */

                    const descriptionElement =
                        document.createElement(
                            'p'
                        );


                    descriptionElement
                        .classList
                        .add(
                            'project-description'
                        );


                    descriptionElement.textContent =
                        description ||
                        '프로젝트 설명이 없습니다.';


                    /*
                     프로젝트 정보
                    */

                    const meta =
                        document.createElement(
                            'div'
                        );


                    meta.classList.add(
                        'project-meta'
                    );


                    const languageElement =
                        document.createElement(
                            'span'
                        );


                    languageElement.textContent =
                        `언어: ${
                            language ||
                            '정보 없음'
                        }`;


                    const starElement =
                        document.createElement(
                            'span'
                        );


                    starElement.textContent =
                        `⭐ ${stargazers_count}`;


                    meta.append(
                        languageElement,
                        starElement
                    );


                    /*
                     GitHub 링크
                    */

                    const link =
                        document.createElement(
                            'a'
                        );


                    link.href =
                        html_url;


                    link.target =
                        '_blank';


                    link.rel =
                        'noopener noreferrer';


                    link.classList.add(
                        'project-link'
                    );


                    link.textContent =
                        'GitHub에서 보기 →';


                    /*
                     카드 조립
                    */

                    article.append(
                        title,
                        descriptionElement,
                        meta,
                        link
                    );


                    return article;

                }
            );


        /*
         기존 내용을 모두 지우고
         카드 삽입
        */

        projectsContainer.replaceChildren(
            ...projectCards
        );

    }

};


/* =========================
   19. GitHub API
========================= */

const fetchProjects = async () => {

    projectState.status =
        'loading';


    projectState.error =
        '';


    renderProjects();


    try {

        const response =
            await fetch(
                `https://api.github.com/users/${githubUsername}/repos`
            );


        /*
         HTTP 오류
        */

        if (!response.ok) {

            if (
                response.status === 403
            ) {

                throw new Error(
                    'GitHub API 요청 한도에 도달했습니다. 잠시 후 다시 시도해주세요.'
                );

            }


            throw new Error(
                `GitHub API 오류: ${response.status}`
            );

        }


        /*
         JSON 변환
        */

        const data =
            await response.json();


        projectState.projects =
            data;


        /*
         상태 결정
        */

        if (
            data.length === 0
        ) {

            projectState.status =
                'empty';

        } else {

            projectState.status =
                'success';

        }

    } catch (error) {

        projectState.status =
            'error';


        projectState.error =
            error instanceof Error
                ? error.message
                : '알 수 없는 오류가 발생했습니다.';

    }


    renderProjects();

};


/* =========================
   20. 최초 실행
========================= */

renderTheme();

updateScrollUI();

renderContactForm();

fetchProjects();