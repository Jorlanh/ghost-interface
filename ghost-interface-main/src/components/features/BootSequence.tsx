import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

const bootMessages = [
  { text: '> GHOST NEURAL INTERFACE v2.0.77', delay: 0 },
  { text: '> Initializing Core Systems...', delay: 300 },
  { text: '> [OK] Memory Banks: 16TB Allocated', delay: 600 },
  { text: '> [OK] Neural Network: Online', delay: 900 },
  { text: '> [OK] Voice Recognition: Active', delay: 1200 },
  { text: '> [OK] VLibras Integration: Standby', delay: 1500 },
  { text: '> [OK] Teachable Machine: Ready', delay: 1800 },
  { text: '> Loading User Protocols...', delay: 2100 },
  { text: '> [OK] Security Layer: Encrypted', delay: 2400 },
  { text: '> [OK] Accessibility Modules: Enabled', delay: 2700 },
  { text: '> Running Integrity Check...', delay: 3000 },
  { text: '> [████████████████████] 100%', delay: 3300 },
  { text: '> System Ready. Welcome, Operator.', delay: 3600 },
  { text: '> ENTERING GHOST INTERFACE...', delay: 4200 },
];

const BootSequence = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const setBooted = useAppStore((state) => state.setBooted);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    // Boot messages timing
    bootMessages.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLines(index + 1);
      }, bootMessages[index].delay);
    });

    // Complete boot sequence
    const bootTimer = setTimeout(() => {
      setBooted(true);
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(bootTimer);
    };
  }, [setBooted]);

  return (
    <motion.div
      className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center p-8 scan-lines"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Corner Decorations */}
      <div className="corner-decoration corner-tl" />
      <div className="corner-decoration corner-tr" />
      <div className="corner-decoration corner-bl" />
      <div className="corner-decoration corner-br" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-6xl md:text-8xl font-display font-bold text-neon-cyan tracking-[0.3em] glitch-text">
          GHOST
        </h1>
        <p className="text-center text-muted-foreground text-sm tracking-widest mt-2">
          NEURAL ASSISTANT INTERFACE
        </p>
      </motion.div>

      {/* Terminal Window */}
      <div className="w-full max-w-2xl hud-panel p-6 mb-8">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-primary/20">
          <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
          <div className="w-3 h-3 rounded-full bg-neon-purple" />
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="ml-2 text-xs text-muted-foreground font-mono">
            ghost://boot/init.sys
          </span>
        </div>

        <div className="font-mono text-sm space-y-1 h-64 overflow-hidden">
          <AnimatePresence>
            {bootMessages.slice(0, visibleLines).map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
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
      <div className="w-full max-w-2xl">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>LOADING NEURAL INTERFACE</span>
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

      {/* System Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-8 text-xs text-muted-foreground font-mono"
      >
        <div>MEM: 16384MB / 16384MB</div>
        <div>CPU: NEURAL_CORE_X86</div>
        <div>NET: ENCRYPTED_TUNNEL</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 right-8 text-xs text-muted-foreground font-mono text-right"
      >
        <div>BUILD: 2077.12.25</div>
        <div>KERNEL: GHOST_OS</div>
        <div>STATUS: INITIALIZING</div>
      </motion.div>

      {/* Scan Line Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          animate={{ y: ['0vh', '100vh'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
};

export default BootSequence;
