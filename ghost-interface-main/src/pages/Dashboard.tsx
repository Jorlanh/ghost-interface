import { motion } from 'framer-motion';
import { Flame, Zap, Trophy, Target, MessageSquare, BookOpen, Camera, Activity } from 'lucide-react';
import HudPanel from '@/components/ui/HudPanel';
import StatCard from '@/components/ui/StatCard';
import NeonButton from '@/components/ui/NeonButton';
import { useAppStore } from '@/store/useAppStore';

const Dashboard = () => {
  const user = useAppStore((state) => state.user);

  const stats = {
    streak: user?.streak || 7,
    xp: user?.xp || 2450,
    level: user?.level || 12,
    missions: 23,
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-display font-bold text-neon-cyan mb-2">
          Bem-vindo, <span className="text-secondary">{user?.name || 'Operador'}</span>
        </h1>
        <p className="text-muted-foreground font-mono">
          Status do sistema: <span className="text-neon-green">OPERACIONAL</span> | Última sincronização: agora
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatCard
            title="Ofensiva"
            value={`${stats.streak} dias`}
            icon={Flame}
            change="+2 esta semana"
            variant="red"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard
            title="XP Total"
            value={stats.xp.toLocaleString()}
            icon={Zap}
            change="+320 hoje"
            variant="cyan"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatCard
            title="Nível"
            value={stats.level}
            icon={Trophy}
            change="550 XP para próximo"
            variant="purple"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatCard
            title="Missões"
            value={stats.missions}
            icon={Target}
            change="3 pendentes"
            variant="green"
          />
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <HudPanel title="Ações Rápidas">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <QuickActionCard
                icon={MessageSquare}
                title="Iniciar Chat"
                description="Converse com o GHOST"
                variant="cyan"
              />
              <QuickActionCard
                icon={BookOpen}
                title="Modo Tutor"
                description="Continue suas lições"
                variant="purple"
              />
              <QuickActionCard
                icon={Camera}
                title="Reconhecimento"
                description="Ativar câmera + IA"
                variant="green"
              />
              <QuickActionCard
                icon={Activity}
                title="Acessibilidade"
                description="Configurar VLibras"
                variant="cyan"
              />
            </div>
          </HudPanel>
        </motion.div>

        {/* XP Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <HudPanel title="Progresso de Nível" variant="accent">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-mono text-muted-foreground">
                  Nível {stats.level}
                </span>
                <span className="text-sm font-mono text-secondary">
                  Nível {stats.level + 1}
                </span>
              </div>

              <div className="relative h-4 bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '73%' }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                />
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.3) 10px, rgba(0,0,0,0.3) 11px)',
                  }}
                />
              </div>

              <div className="text-center">
                <span className="text-2xl font-display font-bold text-primary">
                  1,450
                </span>
                <span className="text-muted-foreground text-sm"> / 2,000 XP</span>
              </div>

              <div className="pt-4 border-t border-primary/20">
                <h4 className="text-xs font-mono text-muted-foreground mb-3">
                  CONQUISTAS RECENTES
                </h4>
                <div className="flex gap-2">
                  {['🔥', '⚡', '🎯', '📚'].map((emoji, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      className="w-10 h-10 bg-primary/10 border border-primary/30 flex items-center justify-center text-lg"
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </HudPanel>
        </motion.div>
      </div>

      {/* VLibras Widget Placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <HudPanel title="Assistente VLibras">
          <div className="flex items-center justify-center h-32 border border-dashed border-primary/30 rounded">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">🧏</span>
              </div>
              <p className="text-sm text-muted-foreground font-mono">
                Widget VLibras será carregado aqui
              </p>
              <NeonButton variant="ghost" size="sm" className="mt-2">
                Ativar Intérprete
              </NeonButton>
            </div>
          </div>
        </HudPanel>
      </motion.div>
    </div>
  );
};

interface QuickActionCardProps {
  icon: any;
  title: string;
  description: string;
  variant: 'cyan' | 'purple' | 'green';
}

const QuickActionCard = ({ icon: Icon, title, description, variant }: QuickActionCardProps) => {
  const colors = {
    cyan: 'border-primary/30 hover:border-primary hover:bg-primary/5',
    purple: 'border-secondary/30 hover:border-secondary hover:bg-secondary/5',
    green: 'border-neon-green/30 hover:border-neon-green hover:bg-neon-green/5',
  };

  const iconColors = {
    cyan: 'text-primary',
    purple: 'text-secondary',
    green: 'text-neon-green',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      className={`p-4 border bg-card/50 text-left transition-all duration-300 ${colors[variant]}`}
      style={{
        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
      }}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 bg-muted/50 ${iconColors[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground">{title}</h4>
          <p className="text-xs text-muted-foreground font-mono">{description}</p>
        </div>
      </div>
    </motion.button>
  );
};

export default Dashboard;
