# backend/create_superuser.py
import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

User = get_user_model()

USERNAME = os.getenv("DJANGO_SUPERUSER_USERNAME")
EMAIL = os.getenv("DJANGO_SUPERUSER_EMAIL")
PASSWORD = os.getenv("DJANGO_SUPERUSER_PASSWORD")


if not User.objects.filter(username=USERNAME).exists():
    User.objects.create_superuser(USERNAME, EMAIL, PASSWORD)
    print("Superuser creation completed successfully.")
else:
    print("Superuser already exists. Skipping creation.")
