import { motion } from 'framer-motion';
import { Bell, Search, User, Zap, Activity } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const Header = () => {
  const user = useAppStore((state) => state.user);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-16 bg-card/50 backdrop-blur-sm border-b border-primary/20 flex items-center justify-between px-6"
    >
      {/* Left Section - System Status */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-muted-foreground font-mono">
            SYSTEM ONLINE
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1 text-primary">
            <Activity className="w-3 h-3" />
            <span>NEURAL: ACTIVE</span>
          </div>
          <div className="flex items-center gap-1 text-secondary">
            <Zap className="w-3 h-3" />
            <span>ENERGY: 98%</span>
          </div>
        </div>
      </div>

      {/* Center - Search */}
      <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
        <div className="w-full relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search commands..."
            className="w-full bg-muted/50 border border-primary/20 pl-10 pr-4 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            style={{
              clipPath:
                'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
            }}
          />
        </div>
      </div>

      {/* Right Section - User Info */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </motion.button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-primary/20">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-display text-foreground">
              {user?.name || 'OPERATOR'}
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              {user?.role || 'USER'} · LVL {user?.level || 1}
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 bg-primary/10 border border-primary/50 flex items-center justify-center"
            style={{
              clipPath:
                'polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)',
            }}
          >
            <User className="w-5 h-5 text-primary" />
          </motion.div>
        </div>

        {/* Time Display */}
        <div className="hidden xl:block pl-4 border-l border-primary/20">
          <TimeDisplay />
        </div>
      </div>
    </motion.header>
  );
};

const TimeDisplay = () => {
  return (
    <div className="text-right font-mono">
      <div className="text-sm text-primary tabular-nums">
        {new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
      <div className="text-xs text-muted-foreground">
        {new Date().toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })}
      </div>
    </div>
  );
};

export default Header;
