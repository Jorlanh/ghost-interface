import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  MessageSquare,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  Shield,
  Volume2,
  VolumeX,
  Wifi,
  Battery,
  Cpu,
  AlertTriangle,
  X,
  Mic,
  MapPin,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import NeonButton from '@/components/ui/NeonButton';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: MessageSquare, label: 'Chat', path: '/chat' },
  { icon: BookOpen, label: 'Tutor', path: '/tutor' },
  { icon: BarChart3, label: 'Stats', path: '/stats' },
  { icon: Settings, label: 'Config', path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();
  const { user, logout, soundEnabled, toggleSound } = useAppStore();
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleSOSClick = () => {
    setShowSOSModal(true);
    setIsRecording(true);
    // Simulate recording and location sending
    setTimeout(() => {
      setIsRecording(false);
    }, 3000);
  };

  return (
    <>
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed left-0 top-0 h-screen w-20 bg-sidebar border-r border-primary/20 flex flex-col items-center py-6 z-40"
      >
        {/* Logo */}
        <Link to="/dashboard" className="mb-8">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 hexagon bg-primary/10 flex items-center justify-center border border-primary/50 pulse-glow"
          >
            <span className="text-primary font-display font-bold text-xl">G</span>
          </motion.div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col items-center gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    'w-12 h-12 flex items-center justify-center relative group transition-all duration-300',
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary/10 border border-primary/50"
                      style={{
                        clipPath:
                          'polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)',
                      }}
                    />
                  )}
                  <item.icon className="w-5 h-5 relative z-10" />

                  {/* Tooltip */}
                  <div className="absolute left-full ml-4 px-3 py-1 bg-card border border-primary/30 text-primary text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-card border-l border-b border-primary/30 rotate-45" />
                  </div>
                </motion.div>
              </Link>
            );
          })}

          {/* Admin Link (only visible to admins) */}
          {user?.role === 'ADMIN' && (
            <Link to="/acmawalkertorcedordobahia">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 flex items-center justify-center text-secondary hover:text-secondary/80 mt-4"
              >
                <Shield className="w-5 h-5" />
              </motion.div>
            </Link>
          )}

          {/* S.O.S Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSOSClick}
            className="w-12 h-12 flex items-center justify-center bg-destructive/20 border border-destructive/50 text-destructive hover:bg-destructive/30 transition-colors mt-4 group relative"
            style={{
              clipPath: 'polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)',
            }}
          >
            <AlertTriangle className="w-5 h-5" />
            {/* Tooltip */}
            <div className="absolute left-full ml-4 px-3 py-1 bg-destructive/90 border border-destructive text-white text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              S.O.S
              <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-destructive/90 border-l border-b border-destructive rotate-45" />
            </div>
          </motion.button>
        </nav>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-4">
          {/* Sound Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSound}
            className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </motion.button>

          {/* Logout */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </motion.button>

          {/* Status Indicators */}
          <div className="flex flex-col items-center gap-2 pt-4 border-t border-primary/20">
            <div className="flex items-center gap-1">
              <Wifi className="w-3 h-3 text-primary" />
              <span className="text-[10px] text-primary">OK</span>
            </div>
            <div className="flex items-center gap-1">
              <Battery className="w-3 h-3 text-neon-green" />
              <span className="text-[10px] text-neon-green">98%</span>
            </div>
            <div className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-secondary" />
              <span className="text-[10px] text-secondary">42%</span>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* S.O.S Emergency Modal */}
      <AnimatePresence>
        {showSOSModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-card border-2 border-destructive p-8"
              style={{
                clipPath:
                  'polygon(0 20px, 20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowSOSModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-destructive/20 border border-destructive animate-pulse">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-destructive uppercase tracking-wider">
                    Emergency Protocol
                  </h2>
                  <p className="text-xs text-muted-foreground font-mono">
                    S.O.S. SIGNAL ACTIVATED
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="space-y-4">
                {/* Recording Status */}
                <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/30">
                  <motion.div
                    animate={isRecording ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Mic className={cn(
                      "w-5 h-5",
                      isRecording ? "text-destructive" : "text-neon-green"
                    )} />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-sm font-mono text-foreground">
                      {isRecording ? 'Recording Audio...' : 'Audio Captured'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isRecording ? 'Please describe your emergency' : 'Recording saved'}
                    </p>
                  </div>
                  {isRecording && (
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-4 bg-destructive"
                          animate={{ scaleY: [0.5, 1, 0.5] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Location Status */}
                <div className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/30">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-mono text-foreground">Sending Location</p>
                    <p className="text-xs text-muted-foreground">
                      GPS coordinates being transmitted
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                  />
                </div>

                {/* Emergency Contacts */}
                <div className="p-4 bg-muted/30 border border-muted">
                  <p className="text-xs font-mono text-muted-foreground uppercase mb-2">
                    Notifying Emergency Contacts
                  </p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-mono">
                      Contact 1
                    </span>
                    <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-mono">
                      Contact 2
                    </span>
                  </div>
                </div>
              </div>

              {/* Cancel Button */}
              <div className="mt-6">
                <NeonButton
                  variant="ghost"
                  className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
                  onClick={() => setShowSOSModal(false)}
                >
                  Cancel Emergency
                </NeonButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
