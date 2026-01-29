import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  variant?: 'cyan' | 'purple' | 'green' | 'red';
}

const StatCard = ({ title, value, icon: Icon, change, variant = 'cyan' }: StatCardProps) => {
  const variants = {
    cyan: {
      bg: 'bg-primary/5',
      border: 'border-primary/30',
      text: 'text-primary',
      glow: 'shadow-neon-cyan',
    },
    purple: {
      bg: 'bg-secondary/5',
      border: 'border-secondary/30',
      text: 'text-secondary',
      glow: 'shadow-neon-purple',
    },
    green: {
      bg: 'bg-neon-green/5',
      border: 'border-neon-green/30',
      text: 'text-neon-green',
      glow: '',
    },
    red: {
      bg: 'bg-destructive/5',
      border: 'border-destructive/30',
      text: 'text-destructive',
      glow: 'shadow-neon-red',
    },
  };

  const style = variants[variant];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={cn(
        'relative p-4 border backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg',
        style.bg,
        style.border
      )}
      style={{
        clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)',
      }}
    >
      {/* Top-right corner accent */}
      <div className={cn('absolute top-0 right-0 w-4 h-4', style.border.replace('/30', ''), 'border-t border-r')} />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">
            {title}
          </p>
          <p className={cn('text-3xl font-display font-bold tabular-nums', style.text)}>
            {value}
          </p>
          {change && (
            <p className={cn('text-xs mt-1', change.startsWith('+') ? 'text-neon-green' : 'text-destructive')}>
              {change}
            </p>
          )}
        </div>
        <div className={cn('p-2 rounded', style.bg, style.border, 'border')}>
          <Icon className={cn('w-5 h-5', style.text)} />
        </div>
      </div>

      {/* Decorative line */}
      <div className={cn('absolute bottom-0 left-0 h-0.5 w-1/3', style.text.replace('text-', 'bg-'), 'opacity-50')} />
    </motion.div>
  );
};

export default StatCard;
