# Task Management With Analytics

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![AWS Serverless](https://img.shields.io/badge/AWS-Serverless-orange)](https://aws.amazon.com)

A full-stack task management system with real-time analytics, built with React+Typescript, NestJS, and AWS serverless infrastructure.

## Features

- **Task Management**

  - CRUD operations with drag-and-drop status updates
  - File attachmentst (images/PDF) via AWS s3
  - Due date tracking and priority management

- **User Authentication**

  - JWT-based authentication
  - Password reset flow
  - Role-based access control

- **Analytics Dashboard**

  - Task completion statistics
  - Time traciing visualization
  - Productivity trends over time

- **Real-Time Feature**
  - WebSocket updates for collaborative editing
  - Instant notifications system
  - Live dashboard updates

## Tech Stack

### Frontend

- React + Typescript
- State Management: Redux Toolkit + Context API
- Charting: Recharts
- UI: Material-UI + Emotion

### Backend

- NestJS
- PostgreSQL (TypeORM)
- Redis (Caching + Pub/Sub)
- Swagger Documentation

### AWS Services

- Lambda + API Gateway (Backend deployment)
- S3 (File storage)
- Cognito (Authentication)
- CloundFront (CDN)
- CloudWatch (Monitoring)

## Getting Starting

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- AWS account with CLI configured

### Installation

1. clone the repository:

```bash
git clone https://github.com/lurldgbodex/tracksm.git
cd tracksm
```

2. Install Dependencies:

```bash
# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install
```

3. Start development servers:

```bash
# Backend
npm run start:dev

#Frontend (in separate terminal)
npm run dev
```
