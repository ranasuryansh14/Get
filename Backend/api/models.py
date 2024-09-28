from django.db import models

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
    image = models.ImageField(upload_to='images/', null=True, blank=True)  # New image field

    def __str__(self):
        return self.title
