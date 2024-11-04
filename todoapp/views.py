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
    #조회 요쳥 처리 함수
    def get(self, request):
        userid = request.GET.get("userid", None)
        if userid != None:
            todos = Todo.objects.filter(userid=userid)
        else:
            todos = Todo.objects.all()
        return JsonResponse({'list':list(todos.values())}, status=status.HTTP_200_OK)