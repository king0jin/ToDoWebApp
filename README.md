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
