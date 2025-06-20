## Overview

Patients living with diabetes or other chronic conditions often experience mental stress, emotional fluctuations, and physical complications such as glucose spikes. These signals are typically disjointed and reactive, rather than predictive and integrated.

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




**LifeLens AI** addresses these challenges by:

- Monitoring glucose levels, meals, activity, sleep, and medications in real time.
- Tracking mental health using wearable signals, chat tone, and voice mood analysis.
- Predicting risk patterns and generating personalized alerts with AI-guided interventions.

This project is built with **Node.js** and **TypeScript**, managed using [pnpm](https://pnpm.io/).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (v8+ recommended)

### Install Dependencies

```bash
pnpm install
```

### Run the Project

```bash
pnpm start
```

### Build

```bash
pnpm build
```

### Deploy

Deployment steps depend on your target platform. For example, to deploy to a cloud provider, follow their documentation after building:

```bash
pnpm build
# Then deploy the contents of the `dist` directory
```

## Scripts

- `pnpm start` — Run the application in development mode
- `pnpm build` — Compile TypeScript to JavaScript in the `dist` folder

## Project Structure

```
src/        # Source code
dist/       # Compiled output
package.json
tsconfig.json
```

## License

MIT
