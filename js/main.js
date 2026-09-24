/* =========================
   1. 공통 DOM 요소
========================= */

const header =
    document.querySelector(
        '.header'
    );


const menuButton =
    document.querySelector(
        '.menu-button'
    );


const navMenu =
    document.querySelector(
        '.nav-menu'
    );


const menuStatus =
    document.querySelector(
        '#menu-status'
    );


const themeButton =
    document.querySelector(
        '.theme-button'
    );


const scrollTopButton =
    document.querySelector(
        '#scroll-top'
    );


const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


const prefersReducedMotion =
    window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;


/* =========================
   2. Theme State
========================= */

const savedTheme =
    localStorage.getItem(
        'theme'
    );


let currentTheme =
    savedTheme === 'dark'
        ? 'dark'
        : 'light';


/* =========================
   3. Theme Rendering
========================= */

const renderTheme = () => {

    document.documentElement
        .dataset
        .theme =
        currentTheme;


    const isDark =
        currentTheme === 'dark';


    themeButton.textContent =
        isDark
            ? '☀️'
            : '🌙';


    themeButton.setAttribute(
        'aria-label',
        isDark
            ? '라이트 모드로 전환'
            : '다크 모드로 전환'
    );


    themeButton.setAttribute(
        'aria-pressed',
        String(isDark)
    );

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


    menuStatus.textContent =
        isOpen
            ? '모바일 메뉴가 열렸습니다.'
            : '모바일 메뉴가 닫혔습니다.';

};


const closeMenu = () => {

    const wasOpen =
        navMenu.classList.contains(
            'active'
        );


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


    if (wasOpen) {

        menuStatus.textContent =
            '모바일 메뉴가 닫혔습니다.';

    }

};


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
            navMenu.classList.contains(
                'active'
            )
        ) {

            closeMenu();

            menuButton.focus();

        }

    }
);


/* 태블릿 이상으로 변경될 때
   모바일 메뉴 상태 초기화 */

window.addEventListener(
    'resize',
    () => {

        if (
            window.innerWidth >= 768
        ) {
            closeMenu();
        }

    }
);


/* =========================
   5. Smooth Scroll
========================= */

internalLinks.forEach(
    (link) => {

        link.addEventListener(
            'click',
            (event) => {

                const targetId =
                    link.getAttribute(
                        'href'
                    );


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


                targetSection
                    .scrollIntoView({

                        behavior:
                            prefersReducedMotion
                                ? 'auto'
                                : 'smooth'

                    });

            }
        );

    }
);


/* =========================
   6. Scroll UI
========================= */

const updateScrollUI = () => {

    /* Scroll Top */

    if (
        window.scrollY >= 300
    ) {

        scrollTopButton
            .classList
            .add(
                'visible'
            );

    } else {

        scrollTopButton
            .classList
            .remove(
                'visible'
            );

    }


    /* Header */

    if (
        window.scrollY >= 60
    ) {

        header
            .classList
            .add(
                'scrolled'
            );

    } else {

        header
            .classList
            .remove(
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

scrollTopButton
    .addEventListener(
        'click',
        () => {

            window.scrollTo({

                top: 0,

                behavior:
                    prefersReducedMotion
                        ? 'auto'
                        : 'smooth'

            });

        }
    );


/* =========================
   8. Dark Mode
========================= */

themeButton
    .addEventListener(
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


if (prefersReducedMotion) {

    revealElements.forEach(
        (element) => {

            element
                .classList
                .add(
                    'visible'
                );

        }
    );

} else {

    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    (entry) => {

                        /*
                         화면에 20% 이상 들어오면
                         등장
                        */

                        if (
                            entry.intersectionRatio >=
                            0.2
                        ) {

                            entry.target
                                .classList
                                .add(
                                    'visible'
                                );

                        }

                        /*
                         화면에서 완전히 사라졌을 때
                         다시 숨김
                        */

                        else if (
                            !entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .remove(
                                    'visible'
                                );

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

}


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

const validateContactForm =
    () => {

        const name =
            nameInput
                .value
                .trim();


        const email =
            emailInput
                .value
                .trim();


        const message =
            messageInput
                .value
                .trim();


        /* 이름 검사 */

        if (name === '') {

            formState.errors.name =
                '이름을 입력해주세요.';

        } else {

            formState.errors.name =
                '';

        }


        /* 이메일 검사 */

        if (email === '') {

            formState.errors.email =
                '이메일을 입력해주세요.';

        } else if (
            emailInput
                .validity
                .typeMismatch
        ) {

            formState.errors.email =
                '올바른 이메일 형식으로 입력해주세요.';

        } else {

            formState.errors.email =
                '';

        }


        /* 메시지 검사 */

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

const renderContactForm =
    () => {

        nameError.textContent =
            formState
                .errors
                .name;


        emailError.textContent =
            formState
                .errors
                .email;


        messageError.textContent =
            formState
                .errors
                .message;


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


        formStatus.textContent =
            formState.isSuccess

                ? '입력값 검증에 성공했습니다. 실제 메시지는 전송되지 않았습니다.'

                : '';

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


        if (
            !formState.isSuccess
        ) {

            const firstInvalidInput =
                contactForm
                    .querySelector(
                        '[aria-invalid="true"]'
                    );


            if (
                firstInvalidInput
            ) {

                firstInvalidInput
                    .focus();

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

                /*
                 사용자가 값을 수정하면
                 기존 성공 상태 제거
                */

                formState.isSuccess =
                    false;


                /*
                 제출을 한 번 시도한 이후부터
                 입력할 때마다 다시 검증
                */

                if (
                    formState
                        .hasSubmitted
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


const projectFilters =
    document.querySelector(
        '#project-filters'
    );


/* =========================
   17. GitHub Projects State
========================= */

const projectState = {

    status: 'idle',

    projects: [],

    error: '',

    selectedLanguage: 'all'

};


/* =========================
   18. Project Filter
========================= */

const getFilteredProjects =
    () => {

        /*
         전체를 선택한 경우
         원본 프로젝트 배열 반환
        */

        if (
            projectState
                .selectedLanguage ===
            'all'
        ) {

            return (
                projectState
                    .projects
            );

        }


        /*
         선택한 언어에 맞는 프로젝트만
         새로운 배열로 반환

         평가 요구사항의 filter() 사용
        */

        return (
            projectState
                .projects
                .filter(
                    (project) => {

                        return (

                            project.language ===

                            projectState
                                .selectedLanguage

                        );

                    }
                )
        );

    };


/* =========================
   19. Project Filter Render
========================= */

const renderProjectFilters =
    () => {

        /*
         각 저장소에서
         language만 추출
        */

        const languages =
            projectState
                .projects
                .map(
                    (project) =>
                        project.language
                )


                /*
                 language가 null인
                 저장소 제거

                 filter() 활용
                */

                .filter(
                    (language) =>
                        language !== null
                );


        /*
         중복 언어 제거
        */

        const uniqueLanguages =
            [
                ...new Set(
                    languages
                )
            ]
                .sort(
                    (a, b) =>
                        a.localeCompare(b)
                );


        /*
         전체 버튼 + 언어 버튼
        */

        const filterValues = [

            'all',

            ...uniqueLanguages

        ];


        projectFilters
            .replaceChildren();


        /*
         각 필터 버튼 생성
        */

        filterValues.forEach(
            (language) => {

                const button =
                    document
                        .createElement(
                            'button'
                        );


                button.type =
                    'button';


                button
                    .classList
                    .add(
                        'filter-button'
                    );


                const isActive =

                    projectState
                        .selectedLanguage ===
                    language;


                if (isActive) {

                    button
                        .classList
                        .add(
                            'active'
                        );

                }


                button.textContent =

                    language === 'all'

                        ? '전체'

                        : language;


                button.setAttribute(

                    'aria-pressed',

                    String(
                        isActive
                    )

                );


                button.addEventListener(
                    'click',
                    () => {

                        /*
                         상태 변경
                        */

                        projectState
                            .selectedLanguage =
                            language;


                        /*
                         상태 → 렌더
                        */

                        renderProjectFilters();

                        renderProjects();

                    }
                );


                projectFilters
                    .append(
                        button
                    );

            }
        );

    };


/* =========================
   20. GitHub Projects Render
========================= */

const renderProjects =
    () => {

        /* =====================
           Loading
        ===================== */

        if (
            projectState.status ===
            'loading'
        ) {

            projectsContainer
                .setAttribute(
                    'aria-busy',
                    'true'
                );


            projectsContainer
                .innerHTML = `
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


        projectsContainer
            .setAttribute(
                'aria-busy',
                'false'
            );


        /* =====================
           Error
        ===================== */

        if (
            projectState.status ===
            'error'
        ) {

            projectsContainer
                .innerHTML = `
                    <div class="project-status">

                        <p>
                            프로젝트를 불러올 수 없습니다.
                        </p>

                        <p
                            id="project-error-detail"
                        ></p>

                        <button
                            id="retry-projects"
                            class="button"
                            type="button"
                        >
                            다시 시도
                        </button>

                    </div>
                `;


            const errorDetail =
                document
                    .querySelector(
                        '#project-error-detail'
                    );


            errorDetail.textContent =
                projectState.error;


            const retryButton =
                document
                    .querySelector(
                        '#retry-projects'
                    );


            retryButton
                .addEventListener(
                    'click',
                    fetchProjects
                );


            return;

        }


        /* =====================
           Empty
        ===================== */

        if (
            projectState.status ===
            'empty'
        ) {

            projectsContainer
                .innerHTML = `
                    <div class="project-status">

                        <p>
                            표시할 프로젝트가 없습니다.
                        </p>

                    </div>
                `;


            return;

        }


        /* =====================
           Success
        ===================== */

        if (
            projectState.status ===
            'success'
        ) {

            /*
             현재 선택된 언어에 따라
             filter() 실행
            */

            const filteredProjects =
                getFilteredProjects();


            /*
             필터 결과가 없는 경우
            */

            if (
                filteredProjects.length ===
                0
            ) {

                projectsContainer
                    .innerHTML = `
                        <div class="project-status">

                            <p>
                                해당 언어의 프로젝트가 없습니다.
                            </p>

                        </div>
                    `;


                return;

            }


            /*
             map()을 이용해
             프로젝트 데이터를
             article 요소로 변환
            */

            const projectCards =
                filteredProjects
                    .map(
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
                             article
                            */

                            const article =
                                document
                                    .createElement(
                                        'article'
                                    );


                            article
                                .classList
                                .add(
                                    'project-card'
                                );


                            /*
                             제목
                            */

                            const title =
                                document
                                    .createElement(
                                        'h3'
                                    );


                            title
                                .classList
                                .add(
                                    'project-title'
                                );


                            title.textContent =
                                name;


                            /*
                             설명
                            */

                            const descriptionElement =
                                document
                                    .createElement(
                                        'p'
                                    );


                            descriptionElement
                                .classList
                                .add(
                                    'project-description'
                                );


                            descriptionElement
                                .textContent =

                                description ||

                                '프로젝트 설명이 없습니다.';


                            /*
                             Meta
                            */

                            const meta =
                                document
                                    .createElement(
                                        'div'
                                    );


                            meta
                                .classList
                                .add(
                                    'project-meta'
                                );


                            const languageElement =
                                document
                                    .createElement(
                                        'span'
                                    );


                            languageElement
                                .textContent =

                                `언어: ${
                                    language ||
                                    '정보 없음'
                                }`;


                            const starElement =
                                document
                                    .createElement(
                                        'span'
                                    );


                            starElement
                                .textContent =

                                `⭐ ${
                                    stargazers_count
                                }`;


                            meta.append(

                                languageElement,

                                starElement

                            );


                            /*
                             GitHub Link
                            */

                            const link =
                                document
                                    .createElement(
                                        'a'
                                    );


                            link.href =
                                html_url;


                            link.target =
                                '_blank';


                            link.rel =
                                'noopener noreferrer';


                            link
                                .classList
                                .add(
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


            projectsContainer
                .replaceChildren(
                    ...projectCards
                );

        }

    };


/* =========================
   21. GitHub API
========================= */

const fetchProjects =
    async () => {

        /*
         API 요청 시작
         → loading 상태
        */

        projectState.status =
            'loading';


        projectState.error =
            '';


        projectState.projects =
            [];


        projectState
            .selectedLanguage =
            'all';


        projectFilters
            .replaceChildren();


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

                /*
                 GitHub Rate Limit
                */

                if (
                    response.status ===
                    403
                ) {

                    const remaining =
                        response
                            .headers
                            .get(
                                'X-RateLimit-Remaining'
                            );


                    if (
                        remaining === '0'
                    ) {

                        throw new Error(

                            'GitHub API 요청 한도에 도달했습니다. 잠시 후 다시 시도해주세요.'

                        );

                    }


                    throw new Error(

                        'GitHub API 접근이 거부되었습니다.'

                    );

                }


                /*
                 GitHub 사용자 없음
                */

                if (
                    response.status ===
                    404
                ) {

                    throw new Error(

                        'GitHub 사용자를 찾을 수 없습니다.'

                    );

                }


                /*
                 GitHub 서버 오류
                */

                if (
                    response.status >= 500
                ) {

                    throw new Error(

                        'GitHub 서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'

                    );

                }


                throw new Error(

                    `GitHub API 오류: ${
                        response.status
                    }`

                );

            }


            /*
             JSON 데이터 변환
            */

            const data =
                await response.json();


            if (
                !Array.isArray(
                    data
                )
            ) {

                throw new Error(

                    'GitHub 프로젝트 데이터 형식이 올바르지 않습니다.'

                );

            }


            projectState.projects =
                data;


            /*
             API 상태 결정
            */

            projectState.status =

                data.length === 0

                    ? 'empty'

                    : 'success';


        } catch (error) {

            projectState.status =
                'error';


            /*
             fetch 자체의 네트워크 오류
            */

            if (
                error instanceof TypeError
            ) {

                projectState.error =

                    '네트워크 연결을 확인한 후 다시 시도해주세요.';

            } else {

                projectState.error =

                    error instanceof Error

                        ? error.message

                        : '알 수 없는 오류가 발생했습니다.';

            }

        }


        /*
         API 성공 시
         언어 필터 생성
        */

        if (
            projectState.status ===
            'success'
        ) {

            renderProjectFilters();

        }


        /*
         최종 Projects UI 렌더링
        */

        renderProjects();

    };


/* =========================
   22. 최초 실행
========================= */

renderTheme();


updateScrollUI();


renderContactForm();


fetchProjects();