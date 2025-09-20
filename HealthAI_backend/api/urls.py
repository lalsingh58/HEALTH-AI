from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Auth
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.register_view, name='register'),


    # AI endpoints
    path('chat/', views.patient_chat, name='chat'),
    path('predict/', views.disease_prediction, name='predict'),
    path('treatment/', views.treatment_plan, name='treatment'),
    path('analytics/', views.health_analytics, name='analytics'),
    path('vitals/', views.add_vitals, name='add_vitals'),
 
    
    # History endpoints
    path('history/queries/', views.list_queries, name='list_queries'),
    path('history/predictions/', views.list_predictions, name='list_predictions'),
    path('history/treatments/', views.list_treatments, name='list_treatments'),
    path('history/vitals/', views.list_vitals, name='list_vitals'),
]
