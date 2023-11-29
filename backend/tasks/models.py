from django.db import models
from accounts.models import UserAccount


# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(max_length=500)
    is_finished = models.BooleanField(default=False)
    author = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.description} - {self.is_finished} - {self.author} - {self.created_at}"
