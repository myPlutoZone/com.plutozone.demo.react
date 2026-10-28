# com.plutozone.demo.React


> YOU ARE STRICTLY PROHIBITED TO COPY, DISCLOSE, DISTRIBUTE, MODIFY OR USE THIS DOCUMENT IN PART OR AS A WHOLE WITHOUT THE PRIOR WRITTEN CONSENT OF PLUTOZONE.COM.<br>
PLUTOZONE.COM OWNS THE INTELLECTUAL PROPERTY RIGHTS IN AND TO THIS DOCUMENT.<br>
COPYRIGHT © 2005 PLUTOZONE.COM ALL RIGHTS RESERVED
***
> plutozone.com의 사전 서면 동의 없이 본 문서의 전부 또는 일부를 복사, 공개, 배포, 수정하거나 사용하는 행위는 엄격히 금지됩니다.<br>
본 문서에 대한 지적재산권은 plutozone.com이 보유하고 있습니다.<br>
Copyright © 2005 plutozone.com All Rights Reserved
***


## 1. Overview
본 프로젝트는 React 기반의 Frontend Demo를 제공(Backend Demo는 com.plutozone.demo.spring을 참고)한다.

### 1-1. Frontend and Backend
```text
┌────────────────────────┐
│        Browser         │
│                        │
│   React 19.x + Vite    │
└──────────┬─────────────┘
           │ HTTP / JSON
           ▼
┌────────────────────────┐
│        Tomcat          │
│                        │
│       Spring 7.x       │
│     Spring Security    │
│                        │
│       Controller       │
│           ↓            │
│        Service         │
│           ↓            │
│    Repository/Mapper   │
│           ↓            │
│  MySQL or PostgreSQL   │
└────────────────────────┘
```
| 구분 | 영역 | 사용 |
| :---: | :--- | :--- |
| Backend | Java | Java 21.x LTS |
| Backend | Framework | Spring 7.x |
| Backend | Security | Spring Security 7.x |
| Backend | Build | Maven 3.9+ |
| Backend | WAS | Tomcat 11.x |
| Backend | DB | MySQL or PostgreSQL |
| Backend | DB Connect | MyBatis |
| Backend | JSON | Jackson |
| Backend | API | REST API |
| Frontend | Framework | React 19.x |
| Frontend | Build | Vite |
| Frontend | HTTP Client | Axios or Fetch |
| Common | Source | Git |

### 1-2. 향후
`Spring Security`는 `인증(Authentication)` 및 `인가(Authorization)`를 담당하는 공식 Spring 프로젝트이다.

| 영역 | 현재 또는 대상 | 개선 |
| :--- | :--- | :--- |
| Spring Framework Version | 7.x | 7.x 최신 patch |
| Spring Boot | 미사용 | 필요 시 Spring MVC에 포함된 RESTful API를 Spring Boot로 별도 구축 |
| Secret | 환경변수 | Vault/KMS/Secret Manager 등 |
| WAS | Tomcat 단일 노드 | Tomcat 다중 노드 |
| Authentication | JWT | JWT + Refresh Token 등 |
| Authorization | 없음 | 권한 등 |
| Logout | Client discard | Client discard + Redis JTI Revoke |
| Password | Argon2 | Argon2id 정책 강화 |
| DB | MySQL | Primary + Read Replica |
| DB Pool | HikariCP | 다중 노드 합산 산정 |
| DB Proxy | 없음 | ProxySQL 검토 |
| Posts | 없음 | 페이징, 검색, 댓글, 파일 업로드 등 |
| Cache | 없음 | Redis 등 |
| Rate Limit | 없음 | WAF/API Gateway/Redis 등 |
| 장애 대응 | 없음 | Retry/Timeout/Circuit Breaker 등 |
| 모니터링 | 없음 | Micrometer/Prometheus/Grafana 등 |
| 로그 | 기본 | 중앙 로그 시스템 |
| 배포 | WAR | 검증 + LB + 다중 Tomcat 등 |
| 검증 | 없음 | JUnit 5 + Spring Test |
| API 문서 | 없음 | OpenAPI/Swagger 등 |

## 2. History
- 2026-10-27 [CREATE] Initial Release


## 3. React for Frontend
### 3-1. Tech Stack
- React 19.2.8, React Router 7.18.3, TypeScript 7.0.2, Axios 1.20.0
- Vite 8.2.2

### 3-2. Key Features
- User Authentication(Login/Logout, Signup)
- JWT-based Authentication and Protected Routes
- Board CRUD
- REST API Integration

### 3-3. Run and Build
```bash
# $ npm create vite@latest com.plutozone.demmo.react -- --template react-ts
# $ cd com.plutozone.demo.react
$ npm install
$ npm run dev
# http://localhost:5173
$ npm run build
$ npm run preview
# http://localhost:4173
```

### 3-4. Project
```text
com.plutozone.demo.react/
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── styles.css
    │
    ├── api/
    │   ├── auth.ts
    │   ├── board.ts
    │   └── client.ts
    │
    ├── components/
    │   ├── Layout.tsx
    │   └── ProtectedRoute.tsx
    │
    ├── contexts/
    │   └── AuthProvider.tsx
    │
    ├── pages/
    │   ├── BoardDetail.tsx
    │   ├── BoardForm.tsx
    │   ├── BoardList.tsx
    │   ├── Login.tsx
    │   └── Signup.tsx
    │
    └── types/
        ├── auth.ts
        └── board.ts
```

### 3-5. 환경 설정
```text
URL_API_BACKEND=http://127.0.0.1:8080
```

### 3-6. API
| NO | Entity | Method | Function | URI | Response |
| :---: | :--- | :---: | :--- | :--- | :--- |
| | Authentication | POST | 회원 가입 | /v1/auth/signup | 201 Created |
| | Authentication | POST | 로그인 | /auth/login | 200 OK |
| | Authentication | POST | 로그아웃 | /auth/logout | 204 No Content |
<!--
| | Member | GET | 나의 회원 정보 조회 | /members/me | 200 OK(회원 정보) |
| | Member | PATCH | 나의 회원 정보 수정 | /members/me | 200 OK(수정된 회원 정보) |
| | Member | DELETE | 회원 탈퇴 | /members/me | 204 No Content |
| | Authentication | POST | Access Token 갱신 | /auth/refresh | |
| | Authentication | POST | 비밀번호 재설정 | /auth/password/reset | |
| | Authentication | POST | 이메일 인증 | /auth/email/verify | |
-->
```text
GET      /boards/{boardId}/posts
POST     /boards/{boardId}/posts
GET      /boards/{boardId}/posts/{postId} or /posts/{postId}
PATCH    /boards/{boardId}/posts/{postId} or /posts/{postId}
# PUT    /boards/{boardId}/posts/{postId} or /posts/{postId}
DELETE   /boards/{boardId}/posts/{postId} or /posts/{postId}
# GET    /boards/{boardId}/posts/{postId}/comments
# POST   /boards/{boardId}/posts/{postId}/comments
# GET    /boards/{boardId}/posts/{postId}/comments/{commentId} or /posts/{postId}/comments/{commentId}
# DELETE /boards/{boardId}/posts/{postId}/comments/{commentId} or /posts/{postId}/comments/{commentId}
```

### 3-7. Login 시 응답
```json
{
  "accessToken": "JWT",
  "member": {
    "id": 1,
    "email": "pluto@plutozone.com",
    "name": "플루토"
  }
}
```

### 3-8. 게시판 응답
#### GET /board/list?page=0&size=10
```json
{
  "content": [
    {
      "id": 1,
      "title": "첫 번째 게시글입니다.",
      "content": "게시글 내용입니다.",
      "authorId": 1,
      "authorName": "플루토",
      "createdAt": "2026-09-09T10:30:00Z",
      "updatedAt": "2026-09-09T10:30:00Z"
    },
    {
      "id": 2,
      "title": "두 번째 게시글입니다.",
      "content": "두 번째 게시글의 내용입니다.",
      "authorId": 2,
      "authorName": "김철수",
      "createdAt": "2026-09-09T11:00:00Z",
      "updatedAt": "2026-09-09T11:15:00Z"
    }
  ],
  "page": 1,
  "size": 10,
  "totalElements": 2,
  "totalPages": 1
}
```
- content: 현재 페이지의 게시글 목록
- page: 현재 페이지 번호
- size: 페이지당 게시글 수
- totalElements: 전체 게시글 수
- totalPages: 전체 페이지 수

#### POST /board
```json
{
  "id": 28,
  "title": "새 게시글입니다.",
  "content": "새롭게 등록한 게시글의 내용입니다.",
  "authorId": 103,
  "authorName": "이영희",
  "createdAt": "2026-09-09T18:10:00Z",
  "updatedAt": "2026-09-09T18:10:00Z"
}
```

#### GET /board/28
```json
{
  "id": 28,
  "title": "등록된 게시글 제목입니다.",
  "content": "등록된 게시글 내용입니다.",
  "authorId": 103,
  "authorName": "이영희",
  "createdAt": "2026-09-09T18:10:00Z",
  "updatedAt": "2026-09-09T18:10:00Z"
}
```

#### PATCH /board/28
```json
{
  "id": 28,
  "title": "수정된 게시글 제목입니다.",
  "content": "수정된 게시글 내용입니다.",
  "authorId": 103,
  "authorName": "이영희",
  "createdAt": "2026-09-09T18:10:00Z",
  "updatedAt": "2026-09-09T18:20:00Z"
}
```

#### DELETE /board/28

### 3-9. 참고
- Axios는 Promise 기반 HTTP Client이고 Interceptor를 지원하므로 Authorization(Bearer ...)와 전역 Error 처리 at client.ts
- React Router 7에서도 기존 react-router-dom 패키지를 사용할 수 있으므로 이전 방식인 BrowserRouter/Routes 구조로 작성하며 react-router를 재-export하는 형태 at App.tsx
- Access Token을 localStorage에 저장하며 상용에서는 HttpOnly/Secure/SameSite 쿠키로 관리하는 구조를 권장(Access Token 만료 시 추가 처리 포함) at AuthProvider.tsx

```text
React
   │
   │ POST /auth/login
   ▼
Backend
   │
   ├── Access Token
   │
   └── Refresh Token → HttpOnly Cookie
```
```text
    API 요청
       │
       ▼
 401 Unauthorized
       │
       ▼
POST /auth/refresh
       │
       ▼
 새 Access Token
       │
       ▼
원래 API 요청 재시도
```
- 또한 수정/삭제 등 권한 검증을 반드시 백엔드에서 수행(프론트엔드에서 user.id === post.authorId를 검사 지양)