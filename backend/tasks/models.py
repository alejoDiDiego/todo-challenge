from django.db import models
from accounts.models import UserAccount


# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(max_length=500)
    is_finished = models.BooleanField(default=False)
    author = models.ForeignKey(UserAccount, null=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
