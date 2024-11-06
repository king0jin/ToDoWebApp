# ToDoWebApp
Server Application은 Django, client Application은 react를 사용하여 ToDo Web Application 제작하기
**Server Applucation과 Client Application을 분리하서 개발하고 통신이 가능하도록 작업**

## Server Apllication 준비
### 데이터베이스 준비하기
+ **CREATE DATABASE ToDoWebApp;**
+ **USE ToDoWeepApp;**

### Server용 Application생성
#### 가상 환경 생성, 활성화
별도의 파이썬 환경이다
+ 배포를 할 때 가상환경을 만들고 Application을 생성해야한다


**python -m venv 가상환경이름**  => 가상환경이름의 디렉토리가 생성된다

**cd 가상환경이름/Scripts/activate**  => powershell이 아닌 CMD창에서 수행해야한다
+ 가상 환경이 활성화되면 프롬프트 앞에 (가상환경이름)이 추가된다.
**이제 부터 설치하는 모든 패키지는 모두 가상 환경에서 설치된다**

### 패키지 설치
**pip install django mysqlclient djangorestframework**
+ django
+ mysqlclient
+ djangorestframework

### Django Project 생성
**django-admin startproject todoproject .**
+ manage.py파일도 생긴다 

### Django Application 생성
**python manage.py startapp todoapp**

### Server Apllication 설정
#### Project디렉토리의 settings.py 수정
+ INSTALLED_APPS
+ DATABASES
  + **python manage.py makemigrations**
  + **python manage.py migrate**
+ TIME_ZONE

### Server 연결
+ manage.py파일이 있는 디렉토리 위치에서 수행 
**python manage.py runserver 127.0.0.1:80**
+ 브라우저로 127.0.0.1:80으로 접속했을 때 django페이지가 보이면 Server연결이 되었다.
![image](https://github.com/user-attachments/assets/c0fafa9e-fa60-4983-ba76-cb128d3d046a)

---
### todoproject 디렉토리 - urls.py
+ 요청과 응답 함수를 매핑한다
  + **path("todo/", views.TodoView.as_view())** : todo/ 요청을 받으면 app디렉토리의 views.py의 TodoView클래스 호출
  + **as_view()** : Django의 클리스 기반 뷰를 호출 가능한 형태로 변경해 주는 메소드
    + 일반 함수형 뷰와 다르게 클래스 형태로 정의되어있으므로 직접적으로 URL에 연결할 수 없으므로 TodoView클래스의 __init__메소드를 호출하여 인스턴스를 생성하고 __call__메소드를 사용하여 HTTP요청을 처리한다
   
### todoapp 디렉토리 - views.py
+ 요청에 매핑되는 함수를 정의한다
  + **TodoView 클래스** : Django의 View 클래스를 상속받아 여러 HTTP 요청에 따라 처리를 수행하므로 CRUD API를 제공하는 클래스이다
  + API 요청의 경우 CSRF보호가 필요 없는 경우가 많으므로 이 설정을 비활성화해야한다
    + API 요청은 주로 토큰 기반 인증을 사용한다
   
#### CSRF(Cross-Site Request Forgery) 설정
+ **@method_decorator(csrf_exempt, name='dispatch')**


Django에서 클래스 기반 뷰에 CSRF 보호를 비활성화 하기 위해 사용하는 데코레이터

---
## Client Apllication 준비
### Client용 Application생성
**yarn create react-app reacttodoapp**

### Client Application 실행
package.json파일이 있는 디렉토리 위치에서 수행
**yarn start**

### React 프로젝트에서 아이콘 사용을 위한 패키지 설치
**npm install --save --legacy-peer-deps @material-ui/core**


**npm install --save --legacy-peer-deps @material-ui/icons**

+ --legacy-peer-deps 플래그 : 종속성 간의 호환성 문제 해결
+ @material-ui/core
  + Material-UI의 핵심 컴포넌트 라이브러리
  + 버튼, 카드, 레이아웃, 다이얼로그 등 다양한 UI 컴포넌트를 제공하여 Material Design 스타일의 UI를 쉽게 구성할 수 있다
+ @material-ui/icons
  + Material Design의 다양한 아이콘들을 포함한 패키지
  + 버튼, 메뉴 등에 아이콘을 추가할 때 유용하며, React 컴포넌트 형태로 아이콘을 제공하므로 코드에서 쉽게 불러와 사용할 수 있다

### ToDo.jsx, AddToDo.jsx - 컴포넌트 생성을 위한 파일
기능을 독립적으로 관리하기 위해 기능별로 jsx파일을 생성하였다


### App.js
import로 jsx파일들을 연결하여 jsx파일에 생성한 컴포넌트를 HTML형식으로 화면에 렌더링한다

### CORS (Cross-Origin Resource Sharing)
다른 출처(Origin) 간의 리소스 공유를 허용하거나 제한하는 보안 기능
+ Origin : 로드된 도메인, 포트, 프로토콜을 의미한다

#### CORS 필요성
기본적으로 웹 브라우저는 보안을 위해 동일 출처 정책(Same-Origin Policy)을 적용한다


ex) 웹 페이지가 로드된 도메인 외의 다른 도메인으로 AJAX 요청을 보내는 것은 금지

#### CORS 동작 방식
웹 서버와 웹 브라우저 간의 HTTP 헤더를 통해 동작한다
+ 서버 : 헤더에 어떤 출처가 요청을 할 수 있는지 허용할지를 명시가 가능

#### Django Project에 CORS 설정
+ 만들어둔 가상환경으로 접속하여 패키지 설치
  + **pip install django-cors-headers**
+ settings.py 수정
  + INSTALLES_APPS : **corsheaders** 추가
  + MIDDLEWARE 제일 상단 : **corsheaders.middleware.CorsMiddleware** 추가
  + 빈 곳에 **CORS_ORIGIN_WHITELIST = ['허용할 URL',,,]** 추가
  + 빈 곳에 **CORS_ALLOW_CREDENTIALS = True** 추가

---
#### 형제 컴포넌트는 독립적이다 : ToDo.jsx, AddToDo.jsx
+ 데이터는 정적이다

##### Q. 각각의 기능을 수행하는 두 컴포넌트가 정적인 데이터를 사용할 때 데이터는 어디에 두어야 할까?
##### A. 형제 컴포넌트의 상위 컴포넌트에 두어야한다.
**상위 컴포넌트는 하위 컴포넌트에세 데이터를 전달할 수 있기 때문이다**
+ 데이터 조작
+ 리액트는 루트에서 조작이 가능하고 한 번에 전달이 가능하기 때문이다.
+ 클라이언트 애플리케이션은 엔트리 포인트가 명확하다.
  + 그래서 데이터나 함수를 어디에 두고 어디에 만들어야할 지 모를때는 엔트리포인트에 만들면된다.
  + 엔트리 포인트는 인스턴스를 오로지 하나만 만들 수 있다
 
#### 이벤트 처리
React와 같은 SPA에서는 이벤트 처리를 다르게 구현한다
+ App.js : 이벤트 핸들러가 사용할 함수나 메서드를 만들고 하위 컴포넌트에 넘겨서 연결한다
  + SPA에서는 전체 화면 출력을 위한 컴포넌트가 존재하고 그 안에 하위 컴포넌트들을 배치해서 사용
+ 각 하위 컴포넌트끼리는 완전 독립적으로 구현한다
  + 데이터를 최상위 컴포넌트가 가지고 있으면 사용이 쉽지만 데이터를 다른 컴포넌트가 가지고 있으면 이를 넘기는 동작을 구현하는 것이 어려워진다
+ 데이터 조작을 하는 이벤트 핸들러도 최상위 컴포넌트가 가지고 있는게 작업이 편리하다

---
## 배포를 쉽게 해주는 freeze : 패키지 복붙하기
프로젝트는 대부분 혼자가 아닌 똑같은 환경에서 여러명과 작업을 진행하는데 필요한 패키지를 하나하나 다 설치하려고하니 번거로움이 있다 - 가상환경에서 패키지를 설치했으므로 가상환경에서 작업 수행하기 
+ **pip freeze > requirements.txt**
  + Scripts 디렉토리 내에 requirements.txt가 생성된다
 

나중에 이 패키지를 설치하고 싶은 디렉토리로 이동하여 requirements.txt파일을 설치하면 된다
**pip install -r requirements.txt**

---
![스크린샷 2024-11-06 133832](https://github.com/user-attachments/assets/8531e3d7-0afc-4cde-85ab-280c7c9e6ef1)

![스크린샷 2024-11-06 133917](https://github.com/user-attachments/assets/f28338fe-5bcf-40ff-84bc-1d11c5c70f5f)
+ 추가(+)버튼, enter 키를 통해 데이터를 추가할 수 있다


![스크린샷 2024-11-06 133935](https://github.com/user-attachments/assets/13c261c9-5ac3-4d7a-bf3a-9399b8562d76)
+ react는 명시적으로 화면을 재출력하지 않자먼 state, props가 변경되면 화면을 재출력한다


---

### State와 Props란?
+ state
  + 컴포넌트의 내부 상태를 관리
+ props
  + 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달
**State 변경 시** 컴포넌트가 자동으로 다시 렌더링되어 데이터 바인딩이 쉽게 이루어진다

### 여러 개의 데이터 출력 방법
+ map 함수 사용
  + 배열 데이터를 반복하여 컴포넌트로 렌더링
    + 이때 각 자식 요소에 고유한 key를 제공하는 것이 중요하다.
    + 효율적으로 리스트를 표시하고 업데이트할 수 있다.

### AJAX, Fetch API, Axios 사용
**서버와 비동기 통신을 하기 위해 AJAX, Fetch API, Axios를 사용**
+ Fetch API는 내장되어 있어 간단한 요청에 적합
+ Axios는 더 많은 기능과 간편한 설정을 제공해 인기 있다
