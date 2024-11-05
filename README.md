# ToDoWebApp
Server Application은 Django, client Application은 react를 사용하여 ToDo Web Application 제작하기
**Server Applucation과 Client Application을 분리하여 개발하여 통신이 가능하도록 작업**

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

## Server Apllication 설정
### Project디렉토리의 settings.py 수정
+ INSTALLED_APPS
+ DATABASES
  + **python manage.py makemigrations**
  + **python manage.py migrate**
+ TIME_ZONE

## Server 연결
**python manage.py runserver 127.0.0.1:80**
+ 브라우저로 127.0.0.1:80으로 접속했을 때 django페이지가 보이면 Server연결이 되었다.
![image](https://github.com/user-attachments/assets/c0fafa9e-fa60-4983-ba76-cb128d3d046a)

---
## todoproject 디렉토리 - urls.py
+ 요청과 응답 함수를 매핑한다
  + **path("todo/", views.TodoView.as_view())** : todo/ 요청을 받으면 app디렉토리의 views.py의 TodoView클래스 호출
  + **as_view()** : Django의 클리스 기반 뷰를 호출 가능한 형태로 변경해 주는 메소드
    + 일반 함수형 뷰와 다르게 클래스 형태로 정의되어있으므로 직접적으로 URL에 연결할 수 없으므로 TodoView클래스의 __init__메소드를 호출하여 인스턴스를 생성하고 __call__메소드를 사용하여 HTTP요청을 처리한다
   
## todoapp 디렉토리 - views.py
+ 요청에 매핑되는 함수를 정의한다
  + **TodoView 클래스** : Django의 View 클래스를 상속받아 여러 HTTP 요청에 따라 처리를 수행하므로 CRUD API를 제공하는 클래스이다
  + API 요청의 경우 CSRF보호가 필요 없는 경우가 많으므로 이 설정을 비활성화해야한다
    + API 요청은 주로 토큰 기반 인증을 사용한다
   
### CSRF(Cross-Site Request Forgery) 설정
+ **@method_decorator(csrf_exempt, name='dispatch')**


Django에서 클래스 기반 뷰에 CSRF 보호를 비활성화 하기 위해 사용하는 데코레이터


