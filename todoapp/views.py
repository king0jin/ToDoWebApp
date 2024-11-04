from django.shortcuts import render
#JSON리턴
from django.http import JsonResponse
#상태 코드 요청
from rest_framework import status
#클래스 요청 처리하기 위해서
from django.views import View
from .models import Todo

#JSON사용
import json

#웹 요청 처리 설정을 위한 decorator
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

#날짜 만들기
from datetime import datetime 

#Todo 인스턴스를 JSON형태로 바꿔주는 메서드
#직렬화로 
def todoToDictionary(todo:Todo) -> dict:
    result = {"id":todo.id, 
              "userid":todo.userid, "title":todo.title, "done":todo.done, 
              "regdate":todo.regdate, "moddate":todo.moddate}
    return result

# Create your views here.
#csrf 설정
@method_decorator(csrf_exempt, name='dispatch')
class TodoView(View):
    #1. CRUD - 테이블 조회
    def get(self, request):
        userid = request.GET.get("userid", None)
        #1. user_id로 조회
        # user_id가 존재하면 데이터 조회
        if userid != None:
            todos = Todo.objects.filter(userid=userid)
        # user_id가 존재하지 않으면 전체 데이터 조회
        else:
            todos = Todo.objects.all()
        return JsonResponse({'list':list(todos.values())}, status=status.HTTP_200_OK)
    
    #2. CRUD - 데이터 삽입
    def post(self, request):
        #클라이언트가 전송한 데이터 가져오기 - dict형태
        request = json.loads(request.body)
        #전송한 데이터(userid 와 title)읽기
        userid = request["userid"]
        title = request["title"]
        #POST함수에 유효성 검사 코드 추가
        if len(title) < 5:
            return JsonResponse({'message':'제목은 다섯 글자'}, status=status.HTTP_200_OK)

        #삽입할 데이터 생성
        todo = Todo()
        todo.userid = userid
        todo.title = title
        todo.done = False #기본값
        #저장
        todo.save()
  
        #userid에 해당하는 데이터 가져오기
        if userid != None:
            todos = Todo.objects.filter(userid=userid)
        else:
            todos = Todo.objects.all()
        #상태를 같이 전달하는게 좋음
        return JsonResponse({'list': list(todos.values())}, status=status.HTTP_200_OK)

    #3. CURD - 데이터 수정
    def put(self, request):
        #클라이언트가 전송한 데이터 가져오기 - dict형태
        request = json.loads(request.body)
        #전송한 데이터(userid 와 id, done)읽기
        userid = request['userid']
        id = request["id"]
        done = request["done"]
        #수정한 데이터 찾아오기
        todo = Todo.objects.get(id=id)
        #수정할 데이터가 테이블에 있는지 검사
        if todo.userid == userid:
            #검사를 통과하면 데이터 수정
            todo.done = done
            todo.moddate = datetime.today()
            #데이터 저장
            todo.save()
            return JsonResponse({'result':True, 'data': todoToDictionary(todo)}, status=status.HTTP_200_OK)
        else:
            #userid가 틀렸을 때
            return JsonResponse({'result':False, 'data': '존재하지 않는 데이터입니다.'}, status=status.HTTP_404_NOT_FOUND)