from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .services import ask_model
from .models import PatientQuery, DiseasePrediction, TreatmentPlan, VitalsRecord
from .serializers import (
    PatientQuerySerializer, DiseasePredictionSerializer,
    TreatmentPlanSerializer, VitalsRecordSerializer
)



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def patient_chat(request):
    serializer = PatientQuerySerializer(data=request.data, context={'request': request})
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    query_text = serializer.validated_data['query']
    record = PatientQuery.objects.create(user=request.user, query=query_text)
    ai_response = ask_model(query_text)
    # Update and return
    record.response = ai_response
    record.save()
    out_serializer = PatientQuerySerializer(record)
    return Response(out_serializer.data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def disease_prediction(request):
    serializer = DiseasePredictionSerializer(data=request.data, context={'request': request})
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    symptoms = serializer.validated_data['symptoms']
    record = DiseasePrediction.objects.create(user=request.user, symptoms=symptoms)
    prompt = f"A patient reports symptoms: {symptoms}. List possible conditions with likelihood and recommended next steps."
    ai_response = ask_model(prompt)
    record.prediction = ai_response
    record.save()
    out_serializer = DiseasePredictionSerializer(record)
    return Response(out_serializer.data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def treatment_plan(request):
    serializer = TreatmentPlanSerializer(data=request.data, context={'request': request})
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    condition = serializer.validated_data['condition']
    profile = serializer.validated_data.get('profile', '')
    record = TreatmentPlan.objects.create(user=request.user, condition=condition, profile=profile)
    prompt = f"Generate an evidence-based treatment plan for condition: {condition}. Patient profile: {profile}. Provide medications, lifestyle advice, and recommended follow-ups."
    ai_response = ask_model(prompt)
    record.plan = ai_response
    record.save()
    out_serializer = TreatmentPlanSerializer(record)
    return Response(out_serializer.data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def health_analytics(request):
    serializer = VitalsRecordSerializer(data=request.data, context={'request': request})
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    vitals = serializer.validated_data['vitals_json']
    record = VitalsRecord.objects.create(user=request.user, vitals_json=vitals)
    prompt = f"Analyze the following health data: {vitals}. Provide concise insights, risk flags, and recommended next steps."
    ai_response = ask_model(prompt)
    record.analytics = ai_response
    record.save()
    out_serializer = VitalsRecordSerializer(record)
    return Response(out_serializer.data, status=status.HTTP_201_CREATED)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_vitals(request):
    serializer = VitalsRecordSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Simple list endpoints so users can view their history
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_queries(request):
    qs = PatientQuery.objects.filter(user=request.user).order_by('-created_at')
    serializer = PatientQuerySerializer(qs, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_predictions(request):
    qs = DiseasePrediction.objects.filter(user=request.user).order_by('-created_at')
    serializer = DiseasePredictionSerializer(qs, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_treatments(request):
    qs = TreatmentPlan.objects.filter(user=request.user).order_by('-created_at')
    serializer = TreatmentPlanSerializer(qs, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_vitals(request):
    qs = VitalsRecord.objects.filter(user=request.user).order_by('-recorded_at')
    serializer = VitalsRecordSerializer(qs, many=True)
    return Response(serializer.data)

from rest_framework import generics
from .serializers import RegisterSerializer

@api_view(["POST"])
@permission_classes([AllowAny])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        try:
            user = serializer.save()
            return Response(
                {"message": "User created successfully", "user_id": user.id},
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # Return serializer errors
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
