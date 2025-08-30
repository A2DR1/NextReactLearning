# 🤖 AI Integration Guide for Austin's AI Chat

This guide will help you integrate real AI services into your chat application.

## 🚀 **Quick Start: OpenAI Integration**

### **1. Get OpenAI API Key**
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up/Login and go to API Keys
3. Create a new API key
4. Copy the key (starts with `sk-`)

### **2. Set Environment Variable**
Add this to your `.env.local` file:
```bash
OPENAI_API_KEY=sk-your_actual_api_key_here
```

### **3. Restart Your Development Server**
```bash
npm run dev
```

## 🔧 **Alternative AI Providers**

### **Option 2: Anthropic Claude**
```bash
npm install @anthropic-ai/sdk
```

**API Route** (`src/pages/api/claude-chat.js`):
```javascript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { message, conversationHistory } = req.body;
    
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `You are Austin Shen's AI assistant. ${message}`
        }
      ],
    });

    res.status(200).json({ response: response.content[0].text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

**Environment Variable**:
```bash
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### **Option 3: Google Gemini**
```bash
npm install @google/generative-ai
```

**API Route** (`src/pages/api/gemini-chat.js`):
```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export default async function handler(req, res) {
  try {
    const { message } = req.body;
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(message);
    const response = await result.response;
    
    res.status(200).json({ response: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

**Environment Variable**:
```bash
GOOGLE_API_KEY=your_google_api_key_here
```

### **Option 4: Local AI with Ollama**
```bash
# Install Ollama from https://ollama.ai/
# Then run: ollama pull llama2
```

**API Route** (`src/pages/api/ollama-chat.js`):
```javascript
export default async function handler(req, res) {
  try {
    const { message } = req.body;
    
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama2',
        prompt: `You are Austin Shen's AI assistant. ${message}`,
        stream: false
      }),
    });
    
    const data = await response.json();
    res.status(200).json({ response: data.response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

## 💰 **Cost Comparison**

| Provider | Model | Cost per 1K tokens | Best For |
|----------|-------|-------------------|----------|
| **OpenAI** | GPT-3.5-turbo | $0.0015 | Best overall, reliable |
| **Anthropic** | Claude-3-Sonnet | $0.003 | High quality, safe |
| **Google** | Gemini Pro | $0.0005 | Most affordable |
| **Local** | Llama2 | $0 | Free, but limited quality |

## 🎯 **Recommended Setup**

### **For Production:**
1. **Primary**: OpenAI GPT-3.5-turbo (best balance of cost/quality)
2. **Fallback**: Local knowledge base (already implemented)

### **For Development:**
1. **Primary**: OpenAI (for testing real AI responses)
2. **Fallback**: Local knowledge base (when API is unavailable)

## 🔒 **Security Best Practices**

### **1. Environment Variables**
- Never commit API keys to Git
- Use `.env.local` for local development
- Use environment variables in production

### **2. Rate Limiting**
```javascript
// Add to your API route
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/chat', limiter);
```

### **3. Input Validation**
```javascript
// Sanitize user input
const sanitizedMessage = message.trim().substring(0, 1000);
```

## 🚀 **Advanced Features**

### **1. Streaming Responses**
```javascript
// In your API route
res.writeHead(200, {
  'Content-Type': 'text/plain',
  'Transfer-Encoding': 'chunked'
});

const stream = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: messages,
  stream: true,
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content || '';
  res.write(content);
}
res.end();
```

### **2. Memory Management**
```javascript
// Keep only last 10 messages for context
const recentMessages = messages.slice(-10);
```

### **3. Custom Instructions**
```javascript
const systemPrompt = `
You are Austin Shen's AI assistant. 
${customInstructions}
${austinKnowledge}
`;
```

## 🧪 **Testing Your Integration**

### **1. Test API Endpoint**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about Austin\'s background"}'
```

### **2. Test in Browser**
1. Go to `/ai-chat`
2. Type a question
3. Check browser console for any errors
4. Verify response quality

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **"Invalid API Key"**
   - Check your `.env.local` file
   - Restart development server
   - Verify API key is correct

2. **"Rate Limit Exceeded"**
   - Wait 15 minutes
   - Check your OpenAI usage dashboard
   - Consider upgrading plan

3. **"Network Error"**
   - Check internet connection
   - Verify API endpoint is correct
   - Check if OpenAI is down

4. **"Model Not Found"**
   - Verify model name is correct
   - Check if you have access to the model
   - Try a different model

## 📱 **Mobile Considerations**

- Ensure chat works on mobile devices
- Test with different screen sizes
- Optimize for touch input
- Consider mobile-specific UI improvements

## 🔄 **Next Steps**

1. **Start with OpenAI** (easiest to implement)
2. **Test thoroughly** with various questions
3. **Monitor costs** in OpenAI dashboard
4. **Add rate limiting** for production
5. **Consider multiple providers** for redundancy

## 💡 **Pro Tips**

- Use environment variables for all API keys
- Implement proper error handling
- Add logging for debugging
- Consider caching responses
- Monitor API usage and costs
- Have fallback responses ready

---

**Need Help?** Check the console for errors and ensure your API key is correctly set in `.env.local`! 