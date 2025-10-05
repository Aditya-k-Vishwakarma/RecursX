from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

# Initialize FastAPI app
app = FastAPI(
    title="RecursX AI Agent API",
    description="AI Agent service for RecursX Innovations website",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class MessageRequest(BaseModel):
    message: str
    conversation_history: Optional[List[dict]] = []

class MessageResponse(BaseModel):
    response: str
    agent_name: str = "RecursX AI"

# RecursX Agent class
class RecursXAgent:
    def __init__(self):
        pass

    def get_initial_greeting(self) -> str:
        return "Welcome to RecursX Innovations 👋 How can I assist you today? Are you exploring AI automation, SaaS development, or something custom?"

    def process_message(self, user_message: str, conversation_history: list = None) -> str:
        message_lower = user_message.lower()
        
        # Services and capabilities
        if any(word in message_lower for word in ["service", "what", "do", "offer", "provide", "capabilities"]):
            return "We specialize in Custom SaaS Development, AI & Automation Solutions, Generative AI Applications, Intelligent API Integrations, and AI Strategy & Consulting. Our mission is to embed intelligence into every layer of modern business software. What specific solution are you looking for?"
        
        # Pricing and costs
        elif any(word in message_lower for word in ["price", "cost", "budget", "expensive", "cheap", "affordable", "quote", "how much", "pricing"]):
            return "Our pricing varies based on project scope and complexity. We offer competitive rates for SaaS development, AI solutions, and automation projects. I'd recommend scheduling a free consultation to discuss your specific needs and get a tailored quote. Would you like me to help you get started?"
        
        # Contact and consultation
        elif any(word in message_lower for word in ["contact", "connect", "meet", "consultation", "schedule", "book", "call"]):
            return "You can schedule a free discovery session with our team through our website. We'd love to discuss your project requirements and how RecursX can help bring your vision to life. What type of project are you considering?"
        
        # Technology and expertise
        elif any(word in message_lower for word in ["technology", "tech", "expertise", "experience", "skills", "tools", "framework"]):
            return "We work with cutting-edge technologies including React, Node.js, Python, AI/ML frameworks, cloud platforms (AWS, Azure, GCP), and modern development practices. Our team combines engineering precision with AI expertise to build scalable, intelligent solutions. What technology stack interests you?"
        
        # Project timeline and process
        elif any(word in message_lower for word in ["timeline", "time", "duration", "process", "how long", "when", "deadline"]):
            return "Project timelines vary based on complexity and scope. A typical SaaS MVP might take 3-6 months, while AI automation projects can range from 1-4 months. We follow agile methodologies and provide regular updates throughout development. What's your ideal timeline?"
        
        # Portfolio and examples
        elif any(word in message_lower for word in ["portfolio", "examples", "projects", "work", "case studies", "show me"]):
            return "We've successfully delivered SaaS platforms, AI-powered automation systems, and custom applications for various industries. Our projects range from e-commerce platforms to intelligent data processing systems. Would you like to discuss a specific type of project or industry?"
        
        # Team and company info
        elif any(word in message_lower for word in ["team", "company", "about", "who", "founded", "location", "office"]):
            return "RecursX Innovations is a technology-first agency focused on building intelligent software solutions. We combine engineering precision, creative problem-solving, and AI expertise to help businesses innovate and scale. Our vision is to create a world where automation enhances human creativity."
        
        # Industry expertise
        elif any(word in message_lower for word in ["industry", "sector", "healthcare", "finance", "ecommerce", "education", "manufacturing"]):
            return "We work across various industries including healthcare, finance, e-commerce, education, and manufacturing. Our AI and automation solutions are designed to be industry-agnostic while addressing specific sector challenges. What industry are you in?"
        
        # AI and automation specific
        elif any(word in message_lower for word in ["ai", "artificial intelligence", "automation", "machine learning", "ml", "chatbot", "intelligent"]):
            return "We specialize in AI and automation solutions including intelligent chatbots, process automation, predictive analytics, and custom AI applications. Our approach focuses on practical AI implementation that delivers real business value. What automation challenge are you looking to solve?"
        
        # SaaS development
        elif any(word in message_lower for word in ["saas", "software as a service", "platform", "web application", "dashboard", "crm", "erp"]):
            return "We build scalable SaaS platforms from concept to deployment. Our expertise includes user management, payment integration, API development, and cloud infrastructure. We focus on creating intuitive, powerful platforms that grow with your business. What type of SaaS solution do you need?"
        
        # Default response for general questions
        else:
            return "I'm here to help you with RecursX's services and answer any questions about our software development, AI solutions, or automation capabilities. We build intelligent software that helps businesses innovate and scale. What would you like to know more about?"

# Initialize the agent
agent = RecursXAgent()

# Routes
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "RecursX AI Agent API",
        "status": "active",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/api/v1/agent/greeting", response_model=MessageResponse)
async def get_greeting():
    """Get initial greeting from the agent"""
    greeting = agent.get_initial_greeting()
    return MessageResponse(response=greeting)

@app.post("/api/v1/agent/message", response_model=MessageResponse)
async def send_message(request: MessageRequest):
    """Send a message to the RecursX AI agent"""
    try:
        response = agent.process_message(request.message, request.conversation_history)
        return MessageResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing message: {str(e)}")

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy", 
        "service": "RecursX AI Agent",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
