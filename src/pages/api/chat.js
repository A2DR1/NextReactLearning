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
- Work: Intersection of AI/ML and SDE, exploring quantum computing, theorem proving in Lean, cancer diagnostics with machine learning, and building full-stack apps
- Projects: AI-Powered Cancer Diagnostics (95% accuracy), Quantum Computing Simulator, Full-Stack E-commerce Platform, Robotics Control System, Real-time Chat Application, Data Visualization Dashboard, Blockchain Smart Contracts, Computer Vision Game
- Technologies: Python, TensorFlow, OpenCV, Scikit-learn, Docker, NumPy, Pandas, Lean, Haskell, React Native, Firebase, JavaScript, Node.js, Stripe, Redux, ROS, Computer Vision, Arduino, C++, Linux, Socket.io, MongoDB, Express, JWT, WebRTC, D3.js, TypeScript, Chart.js, Solidity, Ethereum, Web3.js
- Interests: Robotics and XR, biotech product design, narrative-driven games, bridging science, engineering, and storytelling
- Goal: Bridge science, engineering, and storytelling into impactful ideas and real-world solutions

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