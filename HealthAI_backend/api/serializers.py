from rest_framework import serializers
from .models import PatientQuery, DiseasePrediction, TreatmentPlan, VitalsRecord
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class PatientQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientQuery
        fields = ('id', 'user', 'query', 'response', 'created_at')
        read_only_fields = ('user', 'response', 'created_at')


class DiseasePredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiseasePrediction
        fields = ('id', 'user', 'symptoms', 'prediction', 'created_at')
        read_only_fields = ('user', 'prediction', 'created_at')


class TreatmentPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = TreatmentPlan
        fields = ('id', 'user', 'condition', 'profile', 'plan', 'created_at')
        read_only_fields = ('user', 'plan', 'created_at')


class VitalsRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = VitalsRecord
        fields = ('id', 'user', 'vitals_json', 'analytics', 'recorded_at')
        read_only_fields = ('user', 'analytics', 'recorded_at')
