from django.urls import path, include
from rest_framework.routers import DefaultRouter
from tasks import views


# router = routers.DefaultRouter()
# router.register(r"tasks", views.TaskView, "tasks")

router = DefaultRouter()
router.register("", views.TaskViewSet)

urlpatterns = [path("", include(router.urls))]
