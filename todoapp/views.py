from django.shortcuts import render
#JSON리턴
from django.http import JsonResponse
#상태 코드 요청
from rest_framework import status
#클래스 요청 처리하기 위해서
from django.views import View
from .models import Todo


# Create your views here.

class TodoView(View):
    #1. CRUD - 테이블 전체 조회
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