import { motion } from 'framer-motion';
import { Shield, Users, Database, Activity, Terminal, AlertTriangle, Server, Lock } from 'lucide-react';
import HudPanel from '@/components/ui/HudPanel';
import StatCard from '@/components/ui/StatCard';
import NeonButton from '@/components/ui/NeonButton';
import { useElectronCommands } from '@/store/useAppStore';

const AdminSecret = () => {
  const { shutdownPC, restartPC } = useElectronCommands();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4"
      >
        <div className="w-16 h-16 bg-destructive/20 border-2 border-destructive flex items-center justify-center">
          <Shield className="w-8 h-8 text-destructive" />
        </div>
        <div>
          <h1 className="text-4xl font-display font-bold text-neon-red">
            PAINEL <span className="text-primary">ADMINISTRATIVO</span>
          </h1>
          <p className="text-muted-foreground font-mono">
            Acesso restrito ● Nível de Segurança: MÁXIMO
          </p>
        </div>
      </motion.div>

      {/* Warning Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-destructive/10 border border-destructive/50 p-4 flex items-center gap-4"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)',
        }}
      >
        <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0" />
        <div>
          <p className="text-sm text-destructive font-display font-semibold">
            ÁREA RESTRITA - ACESSO MONITORADO
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            Todas as ações são registradas e auditadas. Proceda com cautela.
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard
            title="Usuários Ativos"
            value="1,247"
            icon={Users}
            change="+12% esta semana"
            variant="cyan"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatCard
            title="Requisições/min"
            value="3,842"
            icon={Activity}
            change="Normal"
            variant="green"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatCard
            title="Banco de Dados"
            value="847 GB"
            icon={Database}
            change="67% utilizado"
            variant="purple"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <StatCard
            title="Alertas"
            value="3"
            icon={AlertTriangle}
            change="Requer atenção"
            variant="red"
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <HudPanel title="Controles do Sistema" variant="danger">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Comandos de sistema disponíveis apenas para ambiente Electron.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <NeonButton
                  variant="danger"
                  onClick={shutdownPC}
                  className="justify-center"
                >
                  Desligar PC
                </NeonButton>
                <NeonButton
                  variant="secondary"
                  onClick={restartPC}
                  className="justify-center"
                >
                  Reiniciar PC
                </NeonButton>
              </div>

              <div className="pt-4 border-t border-primary/20">
                <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
                  Status dos Serviços
                </h4>
                <div className="space-y-2">
                  {[
                    { name: 'Neural Core', status: 'online' },
                    { name: 'Database Cluster', status: 'online' },
                    { name: 'VLibras Service', status: 'standby' },
                    { name: 'TensorFlow Engine', status: 'online' },
                  ].map((service, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Server className="w-3 h-3" />
                        {service.name}
                      </span>
                      <span
                        className={`text-xs font-mono ${
                          service.status === 'online'
                            ? 'text-neon-green'
                            : 'text-secondary'
                        }`}
                      >
                        {service.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </HudPanel>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <HudPanel title="Terminal de Comandos">
            <div className="bg-background/80 p-4 font-mono text-sm h-64 overflow-y-auto scrollbar-cyber">
              <div className="space-y-1">
                <p className="text-neon-green">ghost@admin ~ $ system status</p>
                <p className="text-muted-foreground">
                  Checking system status...
                </p>
                <p className="text-primary">
                  [OK] All systems operational
                </p>
                <p className="text-neon-green">ghost@admin ~ $ users --active</p>
                <p className="text-muted-foreground">
                  Active users: 1,247
                </p>
                <p className="text-muted-foreground">
                  Peak today: 2,891
                </p>
                <p className="text-neon-green">ghost@admin ~ $ security scan</p>
                <p className="text-muted-foreground">
                  Running security scan...
                </p>
                <p className="text-primary">
                  [OK] No threats detected
                </p>
                <p className="text-neon-green">
                  ghost@admin ~ $ <span className="terminal-cursor" />
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Digite um comando..."
                className="flex-1 bg-muted/50 border border-primary/30 px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <NeonButton variant="ghost" size="sm">
                <Terminal className="w-4 h-4" />
              </NeonButton>
            </div>
          </HudPanel>
        </motion.div>
      </div>

      {/* Security Log */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <HudPanel title="Log de Segurança">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-mono text-muted-foreground uppercase tracking-wider border-b border-primary/20">
                  <th className="pb-2">Timestamp</th>
                  <th className="pb-2">Evento</th>
                  <th className="pb-2">Usuário</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {[
                  {
                    time: '14:32:15',
                    event: 'Admin login',
                    user: 'admin@ghost.sys',
                    status: 'success',
                  },
                  {
                    time: '14:28:42',
                    event: 'Database backup',
                    user: 'system',
                    status: 'success',
                  },
                  {
                    time: '14:15:03',
                    event: 'Failed login attempt',
                    user: 'unknown',
                    status: 'blocked',
                  },
                  {
                    time: '13:58:21',
                    event: 'User registration',
                    user: 'new_user_47',
                    status: 'success',
                  },
                ].map((log, i) => (
                  <tr key={i} className="border-b border-primary/10">
                    <td className="py-2 text-muted-foreground">{log.time}</td>
                    <td className="py-2 text-foreground">{log.event}</td>
                    <td className="py-2 text-primary">{log.user}</td>
                    <td className="py-2">
                      <span
                        className={`text-xs px-2 py-0.5 ${
                          log.status === 'success'
                            ? 'bg-neon-green/20 text-neon-green'
                            : 'bg-destructive/20 text-destructive'
                        }`}
                      >
                        {log.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </HudPanel>
      </motion.div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono">
        <Lock className="w-3 h-3" />
        <span>Sessão criptografada ● Acesso registrado ● Nível ADMIN</span>
      </div>
    </div>
  );
};

export default AdminSecret;
