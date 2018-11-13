from .api import ListViewSet, CardViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
from django.views.generic import TemplateView
router.register(r'lists', ListViewSet, base_name='List') #generating urls for these sets of view
router.register(r'cards', CardViewSet, base_name='Card')

urlpatterns = router.urls