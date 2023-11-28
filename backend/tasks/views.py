from django.shortcuts import render
from rest_framework import generics
from .serializers import TaskSerializer
from .models import Task
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


# @permission_classes([IsAuthenticated])
# class TaskView(generics.ListCreateAPIView):
#     serializer_class = TaskSerializer
#     queryset = Task.objects.all()

#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_tasks(request):
    tasks = Task.objects.filter(author=request.user.id)
    serializer = TaskSerializer(instance=tasks, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_task(request):
    serializer = TaskSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors)

    serializer.save()
    return Response(serializer.data)
