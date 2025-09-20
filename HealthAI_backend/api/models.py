from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class PatientQuery(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="queries")
    query = models.TextField()
    response = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Query {self.id} by {self.user}"


class DiseasePrediction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="predictions")
    symptoms = models.TextField()
    prediction = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Prediction {self.id} by {self.user}"


class TreatmentPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="treatments")
    condition = models.CharField(max_length=255)
    profile = models.TextField(blank=True)  # age, comorbidities, meds, etc.
    plan = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Treatment {self.id} for {self.condition}"


class VitalsRecord(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vitals")
    vitals_json = models.JSONField()  # store structured vitals (bp, hr, glucose...)
    analytics = models.TextField(blank=True)
    recorded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Vitals {self.id} by {self.user}"
