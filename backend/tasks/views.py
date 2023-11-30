from django.shortcuts import render
from rest_framework import generics, viewsets, mixins
from .serializers import TaskSerializer
from .models import Task
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.utils.dateparse import parse_date
from django.utils.timezone import make_aware
from django.utils import timezone
from datetime import datetime
from django.conf import settings


@permission_classes([IsAuthenticated])
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

    def list(self, request, *args, **kwargs):
        title = request.query_params.get("title")
        date = request.query_params.get("date")

        tasks = Task.objects.filter(author=request.user)
        if title:
            tasks = tasks.filter(title__icontains=title)

        if date:
            # parsed_date = data.make_aware(date)
            try:
                date = parse_date(date)
            except:
                return Response(
                    {"error": "'date' is not in the correct format (YYYY-MM-DD)."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if not date:
                return Response(
                    {"error": "'date' is not in the correct format (YYYY-MM-DD)."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            tasks = tasks.filter(created_at__date=date)

        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        try:
            task = Task.objects.get(pk=kwargs["pk"])
        except Task.DoesNotExist:
            return Response(
                {"details": "Task does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not task.author == request.user:
            return Response(
                {"details": "You are not authorized"}, status=status.HTTP_403_FORBIDDEN
            )
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        data = {
            "title": request.data.get("title"),
            "description": request.data.get("description"),
            "author": request.user.id,
        }
        serializer = TaskSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        task = serializer.save()
        print(task)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        try:
            task = Task.objects.get(pk=kwargs["pk"])
        except Task.DoesNotExist:
            return Response(
                {"details": "Task does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not task.author == request.user:
            return Response(
                {"details": "You are not authorized"}, status=status.HTTP_403_FORBIDDEN
            )
        data = {
            "title": request.data.get("title"),
            "description": request.data.get("description"),
            "is_finished": request.data.get("is_finished"),
        }
        serializer = TaskSerializer(instance=task, data=data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        try:
            task = Task.objects.get(pk=kwargs["pk"])
        except Task.DoesNotExist:
            return Response(
                {"details": "Task does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not task.author == request.user:
            return Response(
                {"details": "You are not authorized"}, status=status.HTTP_403_FORBIDDEN
            )
        task.delete()
        return Response({"msg": "Task Deleted"})
