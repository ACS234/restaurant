from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path
from .views import *

from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns =[
    # path('api/login/', obtain_auth_token, name='login'),  # for token authentication
    path('api/register/',RegistrationView.as_view(),name='register'),
    path('api/logout/',logout_view,name='logout'),
    path('api/user/',UserView.as_view(),name='user'),
    
    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    
] 