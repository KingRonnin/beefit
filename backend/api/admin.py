from django.contrib import admin

from api import models as api_models

# Register your models here.
admin.site.register(api_models.User)
admin.site.register(api_models.Exercise)
admin.site.register(api_models.Strength)
admin.site.register(api_models.Cardiovascular)
admin.site.register(api_models.Course)
