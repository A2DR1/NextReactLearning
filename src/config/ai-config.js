// AI Provider Configuration
export const AI_CONFIG = {
  // Primary AI provider (change this to switch providers)
  PRIMARY_PROVIDER: 'openai', // Options: 'openai', 'claude', 'gemini', 'ollama'
  
  // OpenAI Configuration
  OPENAI: {
    model: 'gpt-3.5-turbo',
    maxTokens: 500,
    temperature: 0.7,
    apiEndpoint: '/api/chat'
  },
  
  // Anthropic Claude Configuration
  CLAUDE: {
    model: 'claude-3-sonnet-20240229',
    maxTokens: 500,
    apiEndpoint: '/api/claude-chat'
  },
  
  // Google Gemini Configuration
  GEMINI: {
    model: 'gemini-pro',
    apiEndpoint: '/api/gemini-chat'
  },
  
  // Ollama Local Configuration
  OLLAMA: {
    model: 'llama2',
    apiEndpoint: '/api/ollama-chat',
    localUrl: 'http://localhost:11434'
  },
  
  // Fallback Configuration
  FALLBACK: {
    enabled: true,
    message: "I'm having trouble connecting to my AI brain right now, but I can still help!"
  },
  
  // Rate Limiting
  RATE_LIMIT: {
    enabled: true,
    maxRequests: 100,
    windowMs: 15 * 60 * 1000 // 15 minutes
  }
};

// Helper function to get current provider config
export const getCurrentProviderConfig = () => {
  const provider = AI_CONFIG.PRIMARY_PROVIDER;
  return AI_CONFIG[provider.toUpperCase()];
};

// Helper function to get API endpoint
export const getApiEndpoint = () => {
  return getCurrentProviderConfig().apiEndpoint;
};

// Helper function to check if provider is available
export const isProviderAvailable = (provider) => {
  const envVar = `${provider.toUpperCase()}_API_KEY`;
  return process.env[envVar] || provider === 'ollama';
}; 