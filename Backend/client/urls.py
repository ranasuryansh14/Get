from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from django.urls import path
from api.views import CustomTokenObtainPairView
from api.views import add_cart_item
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path('',include('api.urls')),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path('cart/', add_cart_item, name='add_to_cart'),
]
