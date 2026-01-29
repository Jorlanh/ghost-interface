import { forwardRef, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HudPanelProps extends HTMLMotionProps<'div'> {
  title?: string;
  icon?: ReactNode;
  variant?: 'default' | 'accent' | 'danger' | 'warning';
  children: ReactNode;
}

const HudPanel = forwardRef<HTMLDivElement, HudPanelProps>(
  ({ className, title, icon, variant = 'default', children, ...props }, ref) => {
    const borderColors = {
      default: 'border-primary/30',
      accent: 'border-secondary/30',
      danger: 'border-destructive/30',
      warning: 'border-destructive/30',
    };

    const titleColors = {
      default: 'text-primary',
      accent: 'text-secondary',
      danger: 'text-destructive',
      warning: 'text-destructive',
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'relative bg-card/80 backdrop-blur-sm border',
          borderColors[variant],
          className
        )}
        style={{
          clipPath: 'polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))',
        }}
        {...props}
      >
        {/* Corner Decorations */}
        <div className={cn('absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2', borderColors[variant].replace('/30', ''))} />
        <div className={cn('absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2', borderColors[variant].replace('/30', ''))} />
        <div className={cn('absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2', borderColors[variant].replace('/30', ''))} />
        <div className={cn('absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2', borderColors[variant].replace('/30', ''))} />

        {title && (
          <div className={cn('px-4 py-2 border-b flex items-center gap-2', borderColors[variant])}>
            {icon && <span className={titleColors[variant]}>{icon}</span>}
            <h3 className={cn('text-sm font-display font-bold tracking-wider uppercase', titleColors[variant])}>
              <span className="opacity-50 mr-2">//</span>
              {title}
            </h3>
          </div>
        )}

        <div className="p-4">
          {children}
        </div>
      </motion.div>
    );
  }
);

HudPanel.displayName = 'HudPanel';

export default HudPanel;
