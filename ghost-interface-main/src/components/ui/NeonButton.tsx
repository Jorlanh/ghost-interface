import { forwardRef, ReactNode, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  children?: ReactNode;
}

const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant = 'primary', size = 'md', glow = true, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary/10 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-neon-cyan',
      secondary: 'bg-secondary/10 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground shadow-neon-purple',
      danger: 'bg-destructive/10 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground shadow-neon-red',
      ghost: 'bg-transparent border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-8 py-3 text-base',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'relative font-display font-semibold tracking-wider uppercase border-2 transition-all duration-300',
          variants[variant],
          sizes[size],
          glow && variant !== 'ghost' && 'hover:shadow-lg',
          className
        )}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
        }}
        {...(props as any)}
      >
        {/* Corner Accents */}
        <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-current opacity-50" />
        <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-current opacity-50" />
        
        {children}
      </motion.button>
    );
  }
);

NeonButton.displayName = 'NeonButton';

export default NeonButton;
