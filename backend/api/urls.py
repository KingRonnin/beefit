from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from api import views as api_views

urlpatterns = [
    path('user/token/', api_views.MyTokenObtainPairView.as_view()),
    path('user/token/refresh/', TokenRefreshView.as_view()),
    path('user/register/', api_views.RegisterView.as_view()),
    
    path('get/exercise/list/', api_views.ExerciseListAPIView.as_view()),
    path('get/exercise/strength/', api_views.StrengthListAPIView.as_view()),
    path('get/exercise/cardio/', api_views.CardiovascularListAPIView.as_view()),
    
    path('post/strength/log/', api_views.LogStrengthView.as_view()),
    
    path('dashboard/exercise/<user_id>/', api_views.UserExerciseView.as_view()),
    path('dashboard/strength/<user_id>/', api_views.UserStrengthExerciseView.as_view()),
    path('dashboard/cardio/<user_id>/', api_views.UserCardiovascularView.as_view()),
]
