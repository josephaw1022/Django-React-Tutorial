# todo/models.py

from django.db import models

# Create your models here.


class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    # id = models.CharField(max_length=6, primary_key=True, default=pkgen)

    def _str_(self):
        return self.title
