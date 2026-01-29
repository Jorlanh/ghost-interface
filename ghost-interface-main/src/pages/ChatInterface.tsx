import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, Bot, User, Sparkles, Volume2 } from 'lucide-react';
import HudPanel from '@/components/ui/HudPanel';
import NeonButton from '@/components/ui/NeonButton';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ghost';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: 'Olá, Operador. Sou o GHOST, seu assistente neural. Como posso ajudar hoje?',
    sender: 'ghost',
    timestamp: new Date(),
  },
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate GHOST response
    setTimeout(() => {
      const ghostResponses = [
        'Processando sua solicitação...',
        'Entendi. Deixe-me analisar os dados disponíveis.',
        'Interessante. Posso ajudar com isso.',
        'Acessando banco de dados neural para sua consulta.',
        'Analisando padrões... Encontrei algumas informações relevantes.',
      ];

      const response: Message = {
        id: messages.length + 2,
        text: ghostResponses[Math.floor(Math.random() * ghostResponses.length)],
        sender: 'ghost',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <h1 className="text-3xl font-display font-bold text-neon-cyan">
          Interface de <span className="text-secondary">Comunicação</span>
        </h1>
        <p className="text-sm text-muted-foreground font-mono">
          Canal seguro estabelecido ● Criptografia ativa
        </p>
      </motion.div>

      {/* Chat Container */}
      <div className="flex-1 flex gap-4">
        {/* Messages Area */}
        <HudPanel className="flex-1 flex flex-col overflow-hidden">
          {/* Status Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-primary/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground">
                GHOST ONLINE
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <Sparkles className="w-3 h-3 text-secondary" />
              <span>Neural Net v2.0</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto scrollbar-cyber space-y-4 pr-2">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${
                    message.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-10 h-10 flex-shrink-0 flex items-center justify-center ${
                      message.sender === 'ghost'
                        ? 'bg-primary/20 border border-primary/50'
                        : 'bg-secondary/20 border border-secondary/50'
                    }`}
                    style={{
                      clipPath:
                        'polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)',
                    }}
                  >
                    {message.sender === 'ghost' ? (
                      <Bot className="w-5 h-5 text-primary" />
                    ) : (
                      <User className="w-5 h-5 text-secondary" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[70%] p-3 ${
                      message.sender === 'ghost'
                        ? 'bg-card border border-primary/30'
                        : 'bg-secondary/10 border border-secondary/30'
                    }`}
                    style={{
                      clipPath:
                        message.sender === 'ghost'
                          ? 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)'
                          : 'polygon(0 0, 100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                    }}
                  >
                    <p className="text-sm text-foreground">{message.text}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                      {message.timestamp.toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  {/* Text-to-Speech Button */}
                  {message.sender === 'ghost' && (
                    <button className="self-end text-muted-foreground hover:text-primary transition-colors">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div
                  className="w-10 h-10 bg-primary/20 border border-primary/50 flex items-center justify-center"
                  style={{
                    clipPath:
                      'polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)',
                  }}
                >
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="bg-card border border-primary/30 px-4 py-3 flex items-center gap-1">
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 bg-primary rounded-full"
                  />
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-primary rounded-full"
                  />
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-primary rounded-full"
                  />
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="pt-4 mt-4 border-t border-primary/20">
            <div className="flex gap-2">
              {/* Voice Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsListening(!isListening)}
                className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 ${
                  isListening
                    ? 'bg-destructive/20 border-destructive text-destructive'
                    : 'bg-muted/50 border-primary/30 text-muted-foreground hover:text-primary hover:border-primary'
                }`}
                style={{
                  clipPath:
                    'polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)',
                }}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </motion.button>

              {/* Text Input */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="w-full bg-muted/50 border border-primary/30 px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  style={{
                    clipPath:
                      'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
                  }}
                />
              </div>

              {/* Send Button */}
              <NeonButton
                onClick={handleSend}
                variant="primary"
                className="px-6"
                disabled={!input.trim()}
              >
                <Send className="w-5 h-5" />
              </NeonButton>
            </div>
          </div>
        </HudPanel>

        {/* Side Panel - Quick Commands */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="w-64 hidden xl:block"
        >
          <HudPanel title="Comandos Rápidos" variant="accent">
            <div className="space-y-2">
              {[
                'Ajuda com acessibilidade',
                'Ativar VLibras',
                'Status do sistema',
                'Próxima lição',
                'Meu progresso',
              ].map((cmd, i) => (
                <motion.button
                  key={i}
                  whileHover={{ x: 5 }}
                  onClick={() => setInput(cmd)}
                  className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/30 transition-all"
                >
                  <span className="text-primary mr-2">&gt;</span>
                  {cmd}
                </motion.button>
              ))}
            </div>
          </HudPanel>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatInterface;
