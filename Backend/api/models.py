from django.db import models
from django.contrib.auth.models import User

class Notes(models.Model):
    CATEGORY_CHOICES = [
        ('Science', 'Science'),
        ('Mathematics', 'Mathematics'),
        ('Literature', 'Literature'),
        ('Others', 'Others'),
    ]

    title = models.CharField(unique=True, max_length=100, default="Untitled")
    description = models.TextField(max_length=400)
    price = models.FloatField()
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    file = models.FileField(upload_to='notes/', null=True, blank=True)
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    note = models.ForeignKey(Notes, on_delete=models.CASCADE, default=1)  #  note ID
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.title} - {self.price}"