# RecursX AI Agent Backend

A clean, lightweight FastAPI backend for the RecursX AI web agent.

## Features

- **Text-based AI Agent**: Handles all types of questions about RecursX services
- **Voice Output**: Responds with female voice using Web Speech API
- **Comprehensive Responses**: Covers services, pricing, technology, timelines, and more
- **CORS Enabled**: Ready for frontend integration

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

**Note**: Uses Pydantic 1.x to avoid Rust compilation requirements on Windows.

2. Run the server:
```bash
python -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

Or alternatively:
```bash
python app.py
```

## API Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /api/v1/agent/greeting` - Get initial greeting
- `POST /api/v1/agent/message` - Send message to agent

## Usage

The agent responds to questions about:
- Services and capabilities
- Pricing and costs
- Technology and expertise
- Project timelines
- Portfolio and examples
- Team and company info
- Industry expertise
- AI and automation
- SaaS development

## Frontend Integration

The frontend calls these endpoints to interact with the AI agent after the 10-second delay.