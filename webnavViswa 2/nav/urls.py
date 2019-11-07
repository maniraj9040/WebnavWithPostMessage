from django.urls import path, re_path
from nav.views import MyView, About, Test, Chat, Chatopen, Search
from django.conf import settings

urlpatterns = [
    re_path(r'^$', MyView.as_view(), name='my-view'),
    path('about',About.as_view(), name='about-view'),
    path('test', Test.as_view(), name='test-view'),
    path('chat',Chat.as_view(), name='chat-view'),
    path('chatopen',Chatopen.as_view(), name='chatopen-view'),
    path('search/<item>/', Search.as_view(), name='search-view'),
]