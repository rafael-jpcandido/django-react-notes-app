# backend/create_superuser.py
import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

User = get_user_model()

USERNAME = "admin"
EMAIL = "admin@example.com"
PASSWORD = "admin12321"

if not User.objects.filter(username=USERNAME).exists():
    User.objects.create_superuser(USERNAME, EMAIL, PASSWORD)
    print("Superuser criado com sucesso!")
else:
    print("Superuser já existe")
