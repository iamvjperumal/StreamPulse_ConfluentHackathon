# StreamPulse

---

## Scope Summary 

### 1. Streaming Health Data Producers (Kafka)
- **Real-time mock data** simulated via Node.js producers (`@confluentinc/kafka-javascript`):
    - **glucose-data:** CGM readings every few seconds
    - **meal-data:** carbs, meal type
    - **med-data:** medicine intake logs
    - **emotion-data:** voice/text input with emotion score
    - **biometric-data:** steps, heart rate, sleep
- All data published to Kafka topics and visualized in real-time using Confluent UI.

### 2. Real-Time AI Analytics (Apache Flink)
- **Apache Flink SQL** used to:
    - Join glucose, meals, and meds by time and user
    - Detect glucose spikes (>180 mg/dL) without medication
    - Detect negative emotional tone (Sad, Anxious)
    - Output alerts to `health-alerts` topic in real-time
- **Why Flink?** Real-time, low-latency enrichment and filtering. Replaces ksqlDB for flexibility.

### 3. Health Alerts + AI Inference (GenAI)
- **Alert Flow:**
    - Kafka topic → MongoDB
    - MongoDB → Amazon Bedrock for LLM summarization
- **GenAI Coach (LLM) Features:**
    - Daily/Weekly summaries in patient-friendly language
    - Suggestions based on data patterns
    - Mental health journaling feedback
    - Medication compliance nudges

### 4. Patient Dashboard (React)
- Timeline of Glucose, Meals, Meds, Emotions
- Risk indicators (Red: Spike + No Meds)
- **AI Coach Insights** section:
    - Powered by Bedrock, queries MongoDB Vector Store
    - Suggestions like “High risk post-lunch patterns” or “Mood low after poor sleep”

---

## Technologies Used

| Layer            | Tech Stack                                              |
|------------------|--------------------------------------------------------|
| Data Ingestion   | Node.js + Confluent Kafka                              |
| Stream Processing| Apache Flink SQL                                       |
| Storage          | MongoDB (Time-series + Vector)                         |
| AI/ML            | LLMs via Amazon Bedrock, optional XGBoost for glucose prediction |
| Dashboard        | ReactJS (Material UI or Tailwind)                      |
| Vector Search    | MongoDB Atlas Vector Store (emotion/mood tracking)     |

---

## Business Impact

- **Glucose prediction & spike prevention** reduces long-term diabetes complications.
- **Mental health monitoring** brings emotional intelligence into chronic care.
- **AI Coach & Caregiver Alerts** enable real-time family/doctor interventions.
- **Data democratization:** LLM simplifies insights for non-medical users.

---

## Future Plan (Post Hackathon)

| Milestone             | Description                                                        |
|-----------------------|--------------------------------------------------------------------|
| Model Integration  | Replace mock rules with real LSTM/XGBoost for glucose forecasting  |
| LLM Tuning         | Fine-tune on medical prompts via Amazon Bedrock / LangChain        |
| User Personalization | Vector embeddings for daily patterns (e.g. “User 101 spikes after dinner on weekends”) |
| Multi-Channel Alerts | WhatsApp/SMS/Email alerts to caregiver/doctors                   |
| Mobile App         | React Native app with biometric syncing                            |
| FHIR API Support   | Make platform interoperable with health systems (HL7 FHIR standards)|
| Security           | Add OAuth2, RBAC for dashboard and AI query access                 |


