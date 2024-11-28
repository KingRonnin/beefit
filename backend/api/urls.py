from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from api import views as api_views

urlpatterns = [
    path('user/token/', api_views.MyTokenObtainPairView.as_view()),
    path('user/token/refresh/', TokenRefreshView.as_view()),
    path('user/register/', api_views.RegisterView.as_view()),
    
    path('get/exercise/list/', api_views.ExerciseListAPIView.as_view()),
    path('get/exercise/strength/', api_views.StrengthListAPIView.as_view()),
    path('get/exercise/cardio/', api_views.CardiovascularListAPIView.as_view()),
    path('get/gym/list/', api_views.GymListAPIView.as_view()),
    
    path('post/log/strength/', api_views.LogStrengthView.as_view()),
    path('post/log/cardiovascular/', api_views.LogCardioView.as_view()),
    
    path('dashboard/exercise/<user_id>/', api_views.UserExerciseView.as_view()),
    path('dashboard/strength/<user_id>/', api_views.UserStrengthExerciseView.as_view()),
    path('dashboard/cardio/<user_id>/', api_views.UserCardiovascularExerciseView.as_view()),
    
    path('create-payment-intent/', api_views.create_payment_intent, name='create_payment_intent'),
    path('create-checkout-session/', api_views.create_checkout_session, name='create-checkout-session'),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('contact/', api_views.contact, name='contact'),
]
