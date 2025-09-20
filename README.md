# HealthAI

HealthAI is a web application that helps users manage and analyze their health data. It provides features such as chatting with an AI for health advice, predicting diseases, recording vitals, generating treatment plans, and performing health analytics.

## Features

1. **User Authentication**  
   - Signup and login using JWT authentication.
   
2. **Chat with AI**  
   - Users can interact with an AI model to ask health-related queries.

3. **Predict Disease**  
   - Users can input symptoms, and the AI predicts possible diseases.

4. **Record Vitals**  
   - Track important health metrics like blood pressure, heart rate, temperature, and oxygen saturation.

5. **Health Analytics**  
   - AI analyzes recorded vitals and provides insights, risk flags, and recommended next steps.

6. **Treatment Plans**  
   - AI suggests possible treatment plans based on disease predictions.

7. **History Management**  
   - Users can view history of queries, predictions, treatments, and vitals.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Django REST Framework  
- **AI:** Hugging Face Transformers (Flan-T5)  
- **Deployment (Testing):** Google Colab + Ngrok for AI model server

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/HealthAI.git
   cd HealthAI
