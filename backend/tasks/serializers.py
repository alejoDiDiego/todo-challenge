from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ("id", "title", "description", "is_finished", "author", "created_at")
        # extra_kwargs = {
        #     "created_at": {"required": False},
        #     "is_finished": {"required": False},
        # }


#         title
# description
# is_finished
# author
