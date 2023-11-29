from django.shortcuts import render
from rest_framework import generics, viewsets, mixins
from .serializers import TaskSerializer
from .models import Task
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


@permission_classes([IsAuthenticated])
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

    def list(self, request, *args, **kwargs):
        tasks = Task.objects.filter(author=request.user)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = TaskSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors)
        task = serializer.save(author=request.user)
        print(task)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        serializer = TaskSerializer(data=request.data)
        task = Task.objects.get(pk=kwargs["pk"])
        print(task)
        if task.author != request.user:
            return Response(status=403)
        if not serializer.is_valid():
            return Response(serializer.errors)
        print(args)
        print(kwargs)
        serializer.update(task, serializer.data)
        return Response(serializer.data)


# @permission_classes([IsAuthenticated])
# class TaskRetrieveUpdateDeleteView(
#     generics.GenericAPIView,
#     mixins.RetrieveModelMixin,
#     mixins.UpdateModelMixin,
#     mixins.DestroyModelMixin,
# ):
#     serializer_class = TaskSerializer

#     def update(self, request, *args, **kwargs):
#         serializer = TaskSerializer()
#         if not serializer.is_valid():
#             return Response(serializer.errors)
#         print(args)
#         print(kwargs)
#         return Response(serializer.data)


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def list_tasks(request):
#     tasks = Task.objects.filter(author=request.user.id)
#     serializer = TaskSerializer(instance=tasks, many=True)
#     return Response(serializer.data)


# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def create_task(request):
#     serializer = TaskSerializer(data=request.data)

#     if not serializer.is_valid():
#         return Response(serializer.errors)

#     serializer.save()
#     return Response(serializer.data)
