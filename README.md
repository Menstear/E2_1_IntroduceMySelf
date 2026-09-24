# My Portfolio

순수 HTML, CSS, JavaScript만을 사용하여 제작한 반응형 포트폴리오 웹사이트입니다.

React, Vue, Bootstrap, Tailwind CSS 등의 프레임워크나 UI 라이브러리를 사용하지 않고 직접 DOM을 조작하고 이벤트를 처리하면서 웹의 기본 동작 원리를 학습하는 것을 목표로 제작했습니다.

GitHub REST API를 이용하여 실제 GitHub 저장소 정보를 불러오며, 로딩 / 성공 / 에러 / 빈 상태를 각각 UI로 처리합니다.

---

## 배포 URL

* GitHub Repository: `https://github.com/Menstear/E2_1_IntroduceMySelf.git`
* GitHub Pages: `https://github.com/Menstear/E2_1_IntroduceMySelf.git`

> GitHub Pages 배포 후 실제 URL로 수정할 예정입니다.

---

## 프로젝트 목표

이 프로젝트를 통해 다음 내용을 학습하는 것을 목표로 했습니다.

* 시맨틱 HTML을 사용한 웹페이지 구조 설계
* Flexbox와 Grid를 이용한 레이아웃 구성
* 모바일 퍼스트 반응형 웹 구현
* `querySelector`, `querySelectorAll`을 이용한 DOM 선택
* `addEventListener`를 이용한 이벤트 처리
* `classList`를 이용한 화면 상태 변경
* `localStorage`를 이용한 상태 저장
* `IntersectionObserver`를 이용한 스크롤 애니메이션
* `fetch`, `async/await`, `try/catch`를 이용한 API 통신
* GitHub API의 로딩 / 성공 / 에러 / 빈 상태 처리
* 폼 유효성 검사
* 상태 변경 후 화면을 다시 렌더링하는 구조 이해

---

## 사용 기술

### HTML

* HTML5
* Semantic Markup
* 접근성을 고려한 `label`, `aria-*` 속성 사용

### CSS

* CSS3
* CSS Variables
* Flexbox
* Grid
* Media Query
* Mobile First Responsive Design
* Transition / Animation

### JavaScript

* ES6+
* DOM API
* Event Handling
* Arrow Function
* Template Literal
* Destructuring
* `map`
* `forEach`
* `fetch`
* `async / await`
* `try / catch`
* LocalStorage
* IntersectionObserver

### API

* GitHub REST API

```text
https://api.github.com/users/{GitHub_ID}/repos
```

---

## 주요 기능

### 1. 반응형 웹

모바일 환경을 기본으로 작성하고 화면 크기에 따라 태블릿과 데스크톱 레이아웃을 적용했습니다.

```text
Mobile
기본 CSS

Tablet
768px 이상

Desktop
1024px 이상
```

모바일에서는 햄버거 메뉴를 사용하고, 태블릿 이상에서는 일반 네비게이션 메뉴를 표시합니다.

---

### 2. 모바일 햄버거 메뉴

모바일 화면에서 햄버거 버튼을 클릭하면 메뉴가 열리고 다시 클릭하면 닫힙니다.

JavaScript의 다음 기능을 활용했습니다.

```javascript
classList.toggle()
```

메뉴가 열렸는지 여부에 따라 `aria-expanded` 값도 함께 변경하도록 구현했습니다.

```text
버튼 클릭
↓
active 클래스 변경
↓
CSS 상태 변경
↓
메뉴 표시 / 숨김
```

---

### 3. 부드러운 스크롤

네비게이션과 Hero 영역의 내부 링크를 클릭하면 해당 섹션으로 부드럽게 이동합니다.

```javascript
scrollIntoView({
    behavior: 'smooth'
});
```

Sticky Header 때문에 섹션 제목이 가려지는 것을 방지하기 위해 `scroll-margin-top`도 사용했습니다.

---

### 4. Scroll Top 버튼

페이지를 일정 거리 이상 스크롤하면 오른쪽 아래에 Scroll Top 버튼이 나타납니다.

기준값:

```text
300px 이상
```

버튼을 클릭하면 페이지 맨 위로 부드럽게 이동합니다.

```javascript
window.scrollTo({
    top: 0,
    behavior: 'smooth'
});
```

---

### 5. Header 스크롤 스타일

스크롤 위치가 일정 기준 이상일 경우 Header에 그림자를 추가하여 현재 페이지가 스크롤된 상태임을 시각적으로 표현합니다.

기준값:

```text
60px 이상
```

흐름:

```text
scroll 이벤트
↓
window.scrollY 확인
↓
scrolled 클래스 추가 / 제거
↓
Header 스타일 변경
```

---

### 6. 다크 모드

다크 모드 버튼을 클릭하면 페이지 전체의 테마가 변경됩니다.

CSS 변수와 `data-theme` 속성을 활용했습니다.

```html
<html data-theme="dark">
```

```css
[data-theme="dark"] {
    --color-bg: #121212;
    --color-text: #f5f5f5;
}
```

JavaScript에서는 현재 테마를 상태로 관리합니다.

```text
버튼 클릭
↓
currentTheme 변경
↓
localStorage 저장
↓
renderTheme()
↓
화면 변경
```

---

### 7. 다크 모드 상태 유지

현재 테마를 LocalStorage에 저장합니다.

```javascript
localStorage.setItem('theme', currentTheme);
```

페이지를 새로고침해도 이전 테마 설정이 유지됩니다.

```javascript
localStorage.getItem('theme');
```

---

### 8. 스크롤 애니메이션

`IntersectionObserver`를 사용하여 섹션이 화면 안으로 들어왔을 때 등장하는 애니메이션을 구현했습니다.

```text
About
Skills
Projects
Contact
```

섹션에 적용되어 있습니다.

IntersectionObserver 기준값:

```text
threshold: 0.2
```

요소가 화면에 약 20% 이상 들어오면 등장하고, 화면 밖으로 완전히 벗어난 후 다시 들어오면 애니메이션이 다시 실행됩니다.

```text
화면 밖
↓
화면 안으로 진입
↓
visible 클래스 추가
↓
opacity / transform 변경
↓
등장 애니메이션
```

---

### 9. Contact 폼 유효성 검사

Contact 폼에는 다음 입력 필드가 있습니다.

* 이름
* 이메일
* 메시지

다음 항목을 검증합니다.

```text
빈 이름
빈 이메일
잘못된 이메일 형식
빈 메시지
공백만 입력한 값
```

JavaScript의 `submit` 이벤트에서 기본 폼 제출을 방지합니다.

```javascript
event.preventDefault();
```

검증 실패 시 해당 입력창 아래에 오류 메시지를 표시합니다.

정상 입력 시 성공 메시지를 표시합니다.

현재 Contact 폼은 학습용이므로 실제 이메일을 전송하지 않습니다.

---

## 폼 상태 관리

폼의 상태는 다음 객체를 이용해 관리합니다.

```javascript
const formState = {
    hasSubmitted: false,
    isSuccess: false,

    errors: {
        name: '',
        email: '',
        message: ''
    }
};
```

전체 흐름은 다음과 같습니다.

```text
사용자 입력
↓
submit 또는 input 이벤트
↓
validateContactForm()
↓
formState 변경
↓
renderContactForm()
↓
오류 / 성공 UI 변경
```

---

## GitHub API 연동

Projects 섹션은 GitHub REST API를 사용하여 실제 GitHub 저장소 목록을 불러옵니다.

```javascript
fetch(
    `https://api.github.com/users/${githubUsername}/repos`
);
```

비동기 처리는 다음 문법을 사용했습니다.

```text
async
await
try
catch
```

---

## GitHub API 상태 관리

GitHub API 요청 상태를 다음 객체로 관리합니다.

```javascript
const projectState = {
    status: 'idle',
    projects: [],
    error: ''
};
```

상태는 다음과 같이 변경됩니다.

```text
idle
↓
loading
↓
success

또는

loading
↓
error

또는

loading
↓
empty
```

---

## GitHub API 상태별 UI

### Loading

API 요청 중에는 스피너와 다음 메시지를 표시합니다.

```text
프로젝트를 불러오는 중입니다...
```

### Success

API 호출에 성공하면 저장소 데이터를 프로젝트 카드로 렌더링합니다.

각 카드에는 다음 정보가 표시됩니다.

* Repository 이름
* Repository 설명
* 사용 언어
* Star 수
* GitHub 링크

### Error

API 요청에 실패하면 다음 메시지를 표시합니다.

```text
프로젝트를 불러올 수 없습니다.
```

그리고 다시 API를 요청할 수 있도록 `다시 시도` 버튼을 제공합니다.

GitHub API Rate Limit으로 `403` 응답이 발생한 경우에도 오류 상태로 처리합니다.

### Empty

불러온 저장소가 하나도 없다면 다음 메시지를 표시합니다.

```text
표시할 프로젝트가 없습니다.
```

---

## 프로젝트 카드 렌더링

GitHub API에서 받은 데이터를 `map()`을 이용해 프로젝트 카드로 변환합니다.

```text
GitHub Repository 배열
↓
map()
↓
각 Repository를 article 요소로 변환
↓
Projects Grid에 렌더링
```

프로젝트 카드에는 시맨틱 태그인 `<article>`을 사용했습니다.

GitHub API에서 가져온 문자열은 `textContent`를 사용하여 DOM에 삽입합니다.

---

## Flexbox와 Grid 사용

### Flexbox

네비게이션과 여러 UI 요소처럼 한 방향으로 정렬해야 하는 요소에 사용했습니다.

예:

```text
Navigation
Hero Buttons
Skills
About
```

### Grid

Projects 카드처럼 행과 열을 가지는 구조에는 CSS Grid를 사용했습니다.

```css
grid-template-columns:
    repeat(
        auto-fit,
        minmax(250px, 1fr)
    );
```

화면 크기에 따라 프로젝트 카드 개수가 자동으로 조절됩니다.

---

## 이벤트 → 상태 → 화면 변화

이 프로젝트에서는 단순히 DOM을 직접 변경하는 것뿐 아니라 상태를 변경한 뒤 렌더링 함수를 호출하는 구조를 사용했습니다.

### 다크 모드

```text
click
↓
currentTheme 변경
↓
renderTheme()
↓
화면 변경
```

### GitHub API

```text
API 요청
↓
projectState 변경
↓
renderProjects()
↓
Projects UI 변경
```

### Contact Form

```text
input / submit
↓
formState 변경
↓
renderContactForm()
↓
오류 / 성공 UI 변경
```

이 구조는 이후 React에서 사용하는 상태 기반 렌더링을 이해하기 위한 기초가 됩니다.

---

## 프로젝트 구조

```text
portfolio/
├── index.html
├── README.md
│
├── css/
│   └── style.css
│
├── js/
│   └── main.js
│
├── images/
│   └── profile.jpeg
│
└── screenshots/
    ├── desktop.png
    ├── mobile.png
    └── dark-mode.png
```

> 실제 프로필 이미지 파일명이 다른 경우 위 구조를 실제 파일명에 맞게 수정합니다.

---

## 반응형 기준

| 환경      | 기준        |
| ------- | --------- |
| Mobile  | 기본 스타일    |
| Tablet  | 768px 이상  |
| Desktop | 1024px 이상 |

모바일 퍼스트 방식으로 구현했습니다.

---

## 주요 기준값

| 기능                 | 기준               |
| ------------------ | ---------------- |
| Header 스타일 변경      | 60px 이상 스크롤      |
| Scroll Top 버튼      | 300px 이상 스크롤     |
| Scroll Animation   | `threshold: 0.2` |
| Tablet Breakpoint  | 768px            |
| Desktop Breakpoint | 1024px           |

---

## 접근성

다음 요소를 적용했습니다.

* 모든 주요 이미지에 `alt` 속성 사용
* Form의 `label`과 `input` 연결
* `aria-invalid`
* `aria-describedby`
* `aria-live`
* `aria-expanded`
* `aria-controls`
* 키보드 `focus-visible`
* ESC 키를 이용한 모바일 메뉴 닫기
* `prefers-reduced-motion` 대응

---

## 테스트

### 반응형

* [x] 375px 모바일 화면
* [x] 768px 태블릿 화면
* [x] 1024px 이상 데스크톱 화면
* [x] 모바일 햄버거 메뉴
* [x] Projects Grid

### 인터랙션

* [x] 햄버거 메뉴
* [x] 부드러운 스크롤
* [x] Scroll Top 버튼
* [x] Header 스크롤 스타일
* [x] 다크 모드
* [x] 다크 모드 새로고침 유지
* [x] Scroll Animation

### Contact

* [x] 빈 값 검사
* [x] 공백 입력 검사
* [x] 이메일 형식 검사
* [x] 에러 메시지
* [x] 성공 메시지

### GitHub API

* [x] Loading
* [x] Success
* [x] Error
* [x] Retry
* [x] Empty
* [x] 403 Rate Limit Error 처리

---

## Screenshots

### Desktop

![Desktop](screenshots/desktop.png)

### Mobile

![Mobile](screenshots/mobile.png)

### Dark Mode

![Dark Mode](screenshots/dark-mode.png)

> 스크린샷 촬영 후 `screenshots/` 폴더에 파일을 추가합니다.

---

## 실행 방법

저장소를 Clone 합니다.

```bash
git clone https://github.com/Menstear/E2_1_IntroduceMySelf.git
```

프로젝트 디렉터리로 이동합니다.

```bash
cd https://github.com/Menstear/E2_1_IntroduceMySelf.git
```

VS Code에서 프로젝트를 엽니다.

```bash
code .
```

`index.html`을 VS Code Live Server로 실행합니다.

```text
index.html
→ Open with Live Server
```

---

## GitHub API 주의사항

인증하지 않은 GitHub API 요청은 Rate Limit이 존재합니다.

짧은 시간 동안 페이지를 지나치게 반복해서 새로고침하면 API가 `403` 응답을 반환할 수 있습니다.

이 프로젝트에서는 해당 상황을 Error UI로 처리합니다.

---

## 향후 개선 가능 기능

필수 기능 완료 후 다음 기능을 추가할 수 있습니다.

* GitHub 프로젝트 언어별 필터링
* Hero 타이핑 애니메이션
* Formspree / EmailJS를 이용한 실제 메시지 전송
* 시스템 다크 모드 자동 감지
* GitHub Repository 정렬
* 프로젝트 검색
* 프로젝트 Pagination

---

## 학습 내용

이 프로젝트를 통해 HTML, CSS, JavaScript가 각각 다음 역할을 담당한다는 것을 확인할 수 있었습니다.

```text
HTML
→ 페이지의 구조와 의미

CSS
→ 화면 디자인과 반응형 레이아웃

JavaScript
→ 이벤트, 상태 변경, DOM 업데이트
```

특히 다음 흐름을 직접 구현했습니다.

```text
사용자 이벤트
↓
JavaScript 상태 변경
↓
DOM 업데이트
↓
화면 변화
```

이는 이후 React의 `state → render` 구조를 학습하는 기반이 됩니다.

## Screenshots

### Desktop

![Desktop](screenshots/desktop.png)

### Mobile

![Mobile](screenshots/mobile.png)

### Dark Mode

![Dark Mode](screenshots/dark-mode.png)