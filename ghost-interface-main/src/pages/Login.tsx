import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Chrome, Fingerprint, Shield, Zap } from 'lucide-react';
import NeonButton from '@/components/ui/NeonButton';
import { useAppStore } from '@/store/useAppStore';

const bootMessages = [
  { text: '> GHOST NEURAL INTERFACE v2.0.77', delay: 0 },
  { text: '> Initializing Core Systems...', delay: 200 },
  { text: '> [OK] Loading Neural Net...', delay: 400 },
  { text: '> [OK] Establishing Uplink...', delay: 600 },
  { text: '> [OK] Security Protocols Active', delay: 800 },
  { text: '> [OK] Voice Recognition Standby', delay: 1000 },
  { text: '> [████████████████████] 100%', delay: 1200 },
  { text: '> System Ready. Awaiting Authentication...', delay: 1400 },
];

const Login = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAppStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Boot sequence animation
  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    // Boot messages timing
    bootMessages.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLines(index + 1);
      }, bootMessages[index].delay);
    });

    // Transition to login after 2 seconds
    const loginTimer = setTimeout(() => {
      setShowLogin(true);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loginTimer);
    };
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoading(true);

    // Simulate Google OAuth login
    setTimeout(() => {
      login({
        id: '1',
        name: 'Ghost Operator',
        email: 'operator@ghost.sys',
        role: 'USER',
        xp: 0,
        streak: 0,
        level: 1,
      });

      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 scan-lines">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!showLogin ? (
          /* Boot Sequence */
          <motion.div
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-8"
            >
              <h1 className="text-6xl font-display font-bold text-neon-cyan glitch-text">
                GHOST
              </h1>
              <p className="text-sm text-muted-foreground font-mono tracking-wider mt-2">
                NEURAL ASSISTANT INTERFACE
              </p>
            </motion.div>

            {/* Terminal Window */}
            <div className="hud-panel p-6 mb-6">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-primary/20">
                <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-neon-purple" />
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">
                  ghost://boot/init.sys
                </span>
              </div>

              <div className="font-mono text-sm space-y-1 h-48 overflow-hidden">
                <AnimatePresence>
                  {bootMessages.slice(0, visibleLines).map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15 }}
                      className={`${
                        msg.text.includes('[OK]')
                          ? 'text-primary'
                          : msg.text.includes('[')
                          ? 'text-secondary'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {msg.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {visibleLines < bootMessages.length && (
                  <span className="terminal-cursor" />
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>INITIALIZING NEURAL INTERFACE</span>
                <span>{progress}%</span>
              </div>
              <div className="progress-cyber">
                <motion.div
                  className="progress-cyber-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          /* Login Screen */
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Logo */}
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-5xl font-display font-bold text-neon-cyan glitch-text mb-2">
                GHOST
              </h1>
              <p className="text-sm text-muted-foreground font-mono tracking-wider">
                NEURAL INTERFACE ACCESS
              </p>
            </motion.div>

            {/* Login Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative bg-card/80 backdrop-blur-sm border border-primary/30 p-8"
              style={{
                clipPath:
                  'polygon(0 15px, 15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))',
              }}
            >
              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary" />

              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-primary/20">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-display text-muted-foreground uppercase tracking-wider">
                  Secure Authentication
                </span>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <Zap className="w-4 h-4 text-primary" />
                  <span>AI-Powered Voice Assistant</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <Fingerprint className="w-4 h-4 text-secondary" />
                  <span>Sign Language Recognition</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <Chrome className="w-4 h-4 text-neon-green" />
                  <span>Cross-Platform Access</span>
                </motion.div>
              </div>

              {/* Google Login Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <NeonButton
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                      />
                      AUTHENTICATING...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      INITIALIZE WITH GOOGLE
                    </span>
                  )}
                </NeonButton>
              </motion.div>

              {/* Trial Disclaimer */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 text-center"
              >
                <p className="text-xs text-muted-foreground font-mono">
                  System access grants{' '}
                  <span className="text-primary font-semibold">7-Day Free Trial</span>
                </p>
              </motion.div>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-center"
            >
              <p className="text-xs text-muted-foreground font-mono">
                Encrypted Connection ● Protocol GHOST-SEC v2.0
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
