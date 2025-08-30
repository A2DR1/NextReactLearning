import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Typography, Avatar, Spin } from 'antd';
import { SendOutlined, UserOutlined, RobotOutlined, LoadingOutlined } from '@ant-design/icons';
import Layout from '@/components/Layout';
import styles from './ai-chat.module.scss';
import { getApiEndpoint } from '@/config/ai-config';

const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography; // ← grab Text from Typography

// AI knowledge base about Austin Shen
const austinKnowledge = {
  background: [
    "Austin Shen is a student at the University of Michigan double-majoring in Data Science and Mathematics, graduating in May 2027.",
    "He specializes in AI/ML and Software Development Engineering (SDE).",
    "His work sits at the intersection of AI/ML and SDE, exploring quantum computing, theorem proving in Lean, cancer diagnostics with machine learning, and building full-stack apps."
  ],
  projects: [
    "AI-Powered Cancer Diagnostics: Machine learning model for early cancer detection using medical imaging data with 95% accuracy.",
    "Quantum Computing Simulator: Built using Lean theorem prover for educational purposes in quantum computing.",
    "Full-Stack E-commerce Platform: React Native frontend with Firebase backend, including Stripe payment processing.",
    "Robotics Control System: Control system for autonomous robotics using ROS and computer vision.",
    "Real-time Chat Application: WebSocket-based chat app with user authentication and file sharing.",
    "Data Visualization Dashboard: Interactive dashboard using D3.js and React for complex datasets.",
    "Blockchain Smart Contracts: Smart contracts for decentralized applications using Solidity and Ethereum.",
    "Computer Vision Game: Gesture-controlled game using computer vision and hand tracking."
  ],
  technologies: [
    "Python, TensorFlow, OpenCV, Scikit-learn, Docker, NumPy, Pandas",
    "Lean, Haskell, Quantum Algorithms, Mathematics, Functional Programming",
    "React Native, Firebase, JavaScript, Node.js, Stripe, Redux, Firestore",
    "ROS, Computer Vision, Arduino, C++, Linux",
    "React, Socket.io, MongoDB, Express, JWT, WebRTC",
    "D3.js, TypeScript, Chart.js, CSS3, REST API",
    "Solidity, Ethereum, Web3.js, Truffle, Ganache, MetaMask"
  ],
  interests: [
    "Beyond research, Austin enjoys designing projects that blend technology and creativity.",
    "He works on robotics and XR (Extended Reality) projects.",
    "He's interested in biotech product design.",
    "He creates narrative-driven games.",
    "His goal is to bridge science, engineering, and storytelling into impactful ideas and real-world solutions."
  ],
  contact: [
    "You can find Austin on GitHub at github.com/austinshen",
    "He's open to collaborations and interesting projects.",
    "He's particularly interested in AI/ML, quantum computing, and creative technology applications."
  ]
};

// Real AI response function using OpenAI API
const generateAIResponse = async (question, conversationHistory) => {
  try {
    const response = await fetch(getApiEndpoint(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: question,
        conversationHistory: conversationHistory
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get AI response');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error calling AI API:', error);
    // Fallback to local knowledge if API fails
    return `I'm having trouble connecting to my AI brain right now, but I can still help! ${getFallbackResponse(question)}`;
  }
};

// Fallback response function using local knowledge
const getFallbackResponse = (question) => {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('background') || lowerQuestion.includes('education') || lowerQuestion.includes('university')) {
    return austinKnowledge.background.join(' ');
  }
  
  if (lowerQuestion.includes('project') || lowerQuestion.includes('work') || lowerQuestion.includes('build')) {
    return austinKnowledge.projects.join(' ');
  }
  
  if (lowerQuestion.includes('technology') || lowerQuestion.includes('tech') || lowerQuestion.includes('skill') || lowerQuestion.includes('programming')) {
    return `Austin works with a wide range of technologies including: ${austinKnowledge.technologies.join(', ')}.`;
  }
  
  if (lowerQuestion.includes('interest') || lowerQuestion.includes('hobby') || lowerQuestion.includes('goal')) {
    return austinKnowledge.interests.join(' ');
  }
  
  if (lowerQuestion.includes('contact') || lowerQuestion.includes('github') || lowerQuestion.includes('reach')) {
    return austinKnowledge.contact.join(' ');
  }
  
  if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('hey')) {
    return "Hello! I'm Austin's AI assistant. I can tell you about Austin's background, projects, technologies, interests, and more. What would you like to know?";
  }
  
  return "I'm Austin's AI assistant! I can tell you about his background, education, projects, technologies, interests, and goals. Try asking me about his work at University of Michigan, his AI/ML projects, or his interest in quantum computing and robotics!";
};

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm Austin's AI assistant. I can tell you about Austin's background, projects, technologies, interests, and more. What would you like to know?",
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'ai',
      content: "💡 Quick facts: Austin is a Data Science & Math major at University of Michigan, graduating May 2027. He's worked on AI cancer diagnostics, quantum computing, and full-stack development. Ask me anything!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Get AI response with conversation history
      const aiResponse = await generateAIResponse(inputValue.trim(), messages);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Layout>
      <div className={styles.aiChatContainer}>
        <div className={styles.header}>
          <Title level={1} className={styles.title}>
            <RobotOutlined className={styles.titleIcon} />
            Chat with Austin&apos;s AI
          </Title>
          <Paragraph className={styles.subtitle}>
            Ask me anything about Austin Shen - his background, projects, technologies, and interests!
          </Paragraph>
        </div>

        <div className={styles.chatContainer}>
          <div className={styles.messagesArea}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${styles[message.type]}`}
              >
                <div className={styles.messageContent}>
                  <div className={styles.messageHeader}>
                    <Avatar
                      icon={message.type === 'user' ? <UserOutlined /> : <RobotOutlined />}
                      className={styles.avatar}
                      style={{
                        backgroundColor: message.type === 'user' ? '#1890ff' : '#52c41a'
                      }}
                    />
                    <span className={styles.messageType}>
                      {message.type === 'user' ? 'You' : 'Austin\'s AI'}
                    </span>
                    <span className={styles.timestamp}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <div className={styles.messageText}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className={`${styles.message} ${styles.ai}`}>
                <div className={styles.messageContent}>
                  <div className={styles.messageHeader}>
                    <Avatar
                      icon={<RobotOutlined />}
                      className={styles.avatar}
                      style={{ backgroundColor: '#52c41a' }}
                    />
                    <span className={styles.messageType}>Austin&apos;s AI</span>
                    <span className={styles.timestamp}>typing...</span>
                  </div>
                  <div className={styles.typingIndicator}>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <div className={styles.inputContainer}>
              <TextArea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Austin's background, projects, technologies, or interests..."
                autoSize={{ minRows: 1, maxRows: 4 }}
                className={styles.textInput}
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className={styles.sendButton}
              >
                Send
              </Button>
            </div>
            <div className={styles.suggestions}>
              <Text className={styles.suggestionLabel}>Try asking about:</Text>
              <div className={styles.suggestionButtons}>
                {[
                  "What's Austin's background?",
                  "Tell me about his projects",
                  "What technologies does he use?",
                  "What are his interests?"
                ].map((suggestion, index) => (
                  <Button
                    key={index}
                    type="dashed"
                    size="small"
                    onClick={() => setInputValue(suggestion)}
                    className={styles.suggestionButton}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AIChat; 