from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from api import views as api_views

urlpatterns = [
    path('user/token/', api_views.MyTokenObtainPairView.as_view()),
    path('user/token/refresh/', TokenRefreshView.as_view()),
    path('user/register/', api_views.RegisterView.as_view()),
    
    path('post/exercise/list', api_views.ExerciseListAPIView.as_view()),
    path('post/exercise/strength/', api_views.StrengthListAPIView.as_view()),
    path('post/exercise/cardio/', api_views.CardiovascularListAPIView.as_view()),
    
    path('account/dashboard/stats/<user_id>/', api_views.Dashboard.as_view()),
    path('create-payment-intent/', api_views.create_payment_intent, name='create_payment_intent'),
    path('create-checkout-session/', api_views.create_checkout_session, name='create-checkout-session'),

]

{
    "user_id": "1",
}
