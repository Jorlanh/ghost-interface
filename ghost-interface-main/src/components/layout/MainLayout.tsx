import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
  const [visionEnabled, setVisionEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-background scan-lines">
      <Sidebar />

      <div className="ml-20 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 p-6 relative">
          {/* Background Grid Pattern */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />

          {/* Content Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative z-10"
          >
            <Outlet />
          </motion.div>

          {/* Toggle Vision Button (Camera On/Off) */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setVisionEnabled(!visionEnabled)}
            className={`fixed bottom-24 right-6 z-30 w-14 h-14 flex items-center justify-center border transition-all duration-300 ${
              visionEnabled
                ? 'bg-primary/20 border-primary text-primary'
                : 'bg-muted/50 border-muted-foreground/30 text-muted-foreground'
            }`}
            style={{
              clipPath: 'polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)',
            }}
          >
            {visionEnabled ? (
              <Eye className="w-6 h-6" />
            ) : (
              <EyeOff className="w-6 h-6" />
            )}
          </motion.button>

          {/* Ghost Avatar Container */}
          <div 
            className="fixed bottom-24 right-24 z-20 w-32 h-32 border border-primary/30 bg-card/50 backdrop-blur-sm flex items-center justify-center"
            style={{
              clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)',
            }}
          >
            {/* Placeholder for <GhostAvatar /> component */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 border border-primary/50 bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-display font-bold text-primary">G</span>
              </div>
              <p className="text-[10px] font-mono text-muted-foreground">
                {visionEnabled ? 'TRACKING' : 'STANDBY'}
              </p>
            </div>
          </div>
        </main>

        {/* Footer Status Bar */}
        <footer className="h-8 bg-card/50 border-t border-primary/20 flex items-center justify-between px-6 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>GHOST v2.0.77</span>
            <span className="text-primary">●</span>
            <span>ENCRYPTED CONNECTION</span>
          </div>
          <div className="flex items-center gap-4">
            <span>MEM: 2.4GB</span>
            <span className="text-primary">●</span>
            <span>UPTIME: 12:34:56</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
