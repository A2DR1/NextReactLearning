import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Create system prompt with Austin's information
    const systemPrompt = `You are Austin Shen's AI assistant. Austin is a student at the University of Michigan double-majoring in Data Science and Mathematics, graduating in May 2027.

    Key information about Austin:
    - Background: Specializes in AI/ML and Software Development Engineering (SDE)
    - Work: Explores the intersection of machine learning, backend infrastructure, XR/robotics, biomedical research, and web/mobile app development
    - Projects:
      1. BotSmart – AI Red Teaming Platform | Backend Developer
         Built LLMAE (Large Language Model Adversarial Evaluation), a red-teaming automation tool that tests the safety and robustness of LLMs. Designed with Django, Docker, and MySQL, it uses syntactic trees, heuristic rewrites, and semantic classifiers to mutate prompts. Also implemented a mutation scheduler to reduce token cost.
    
      2. Innovation AI | Full Stack Developer Intern
         Created RefineText AI, a mobile app to improve writing clarity using LLMs. Built in React Native + Firebase (Auth, Firestore, Stripe). Designed prompt chains for sentence-level edits and built backend for serverless logic and analytics.
    
      3. HandProxy | XR Research on Meta Quest 3
         Worked on embodied AI in AR. Used GPT-4o, YOLOv11, CLIP in Unity to build an assistant capable of spatial prompt interpretation and object interaction. Developed a reasoning engine for proactive hand alignment.
    
      4. Enterprise Knowledge Base Pipeline | Backend + Data Infra
         Designed a Go backend to process enterprise docs using PostgreSQL, RabbitMQ, and Weaviate. Built a streaming pipeline with gRPC, Redis, and protobufs for semantic tagging and real-time updates.
    
      5. DIAG – AI for Cancer Diagnostics | Research Assistant
         Built a multi-modal ML pipeline integrating Slideflow, BayesPrism, and WGCNA to analyze histopathology and gene expression data. Applied spatial transcriptomics to study tumor microenvironments.
    
      6. SPHEREx – NASA ML for Astronomy | Research Assistant
         Processed 27M+ galaxy records across four catalogs. Used SQL and TensorFlow to build redshift prediction models, improving RMSE by 20%. Optimized Bagpipes fitting via Bayesian tuning.
    
      7. Zoetic Robotics Lab – Soft Robotics | Undergraduate Researcher
         Designed and fabricated soft robotic actuators. Used CAD, ESP32, and force sensors to build a wireless exoshell with feedback loops. Conducted mechanical tests in dynamic environments.
    
      8. FridgeWhiz – AI Hackathon Project | Team Lead + Engineer
         Led a 48-hour hackathon project to build a healthy recipe web app. Fine-tuned YOLOv8 to detect fridge ingredients; used GPT-4o for recipe generation. Built backend in Flask and frontend in HTML/CSS.
    
    - Technologies: Python, TensorFlow, Django, Docker, SQL, React Native, Firebase, Unity, YOLOv8/v11, GPT-4o, CLIP, Flask, Go, RabbitMQ, PostgreSQL, Redis, Weaviate, gRPC, Protocol Buffers, ESP32, OpenCV, Scikit-learn, R, BayesPrism, WGCNA, Slideflow, C++, HTML, CSS
    
    - Interests: Robotics and XR, biotech innovation, backend systems, and AI applications in creative and scientific domains
    
    - Goal: To bridge science, engineering, and storytelling into impactful ideas and real-world solutions
    
    Your role is to:
    1. Answer questions about Austin's background, education, projects, technologies, and interests
    2. Be helpful, friendly, and informative
    3. Provide specific details when asked about projects or technologies
    4. Keep responses conversational but professional
    5. If asked about something not related to Austin, politely redirect the conversation back to Austin and his work
    
    Always maintain a helpful and enthusiastic tone about Austin's work and achievements.`;

    // Prepare conversation history for context
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
      stream: false,
    });

    const aiResponse = completion.choices[0].message.content;

    res.status(200).json({ 
      response: aiResponse,
      usage: completion.usage
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    
    if (error.status === 401) {
      return res.status(401).json({ error: 'Invalid API key' });
    } else if (error.status === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    } else {
      return res.status(500).json({ 
        error: 'Error processing request',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
} 