from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from api import views as api_views

urlpatterns = [
    path('user/token/', api_views.MyTokenObtainPairView.as_view()),
    path('user/token/refresh/', TokenRefreshView.as_view()),
    path('user/register/', api_views.RegisterView.as_view()),
    path("user/courses/", api_views.user_courses),
    path("user/purchase/", api_views.purchase_course, name="purchase_course"),
    path("user/confirm-purchase/", api_views.confirm_purchase, name="confirm_purchase"),
    
    path('get/exercise/list/', api_views.ExerciseListAPIView.as_view()),
    path('get/exercise/strength/', api_views.StrengthListAPIView.as_view()),
    path('get/exercise/cardio/', api_views.CardiovascularListAPIView.as_view()),
    
    path('post/log/strength/', api_views.LogStrengthView.as_view()),
    path('post/log/cardiovascular/', api_views.LogCardioView.as_view()),
    
    path('dashboard/exercise/<user_id>/', api_views.UserExerciseView.as_view()),
    path('dashboard/strength/<user_id>/', api_views.UserStrengthExerciseView.as_view()),
    path('dashboard/cardio/<user_id>/', api_views.UserCardiovascularExerciseView.as_view()),
    
    path('create-payment-intent/', api_views.create_payment_intent, name='create_payment_intent'),
    path('create-checkout-session/', api_views.create_checkout_session, name='create-checkout-session'),
    path('contact/', api_views.contact, name='contact'),
]
