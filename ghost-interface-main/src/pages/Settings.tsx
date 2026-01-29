import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon,
  Link as LinkIcon,
  Phone,
  Plus,
  Trash2,
  CreditCard,
  Check,
  ExternalLink,
  Bell,
  Shield,
  Palette,
} from 'lucide-react';
import HudPanel from '@/components/ui/HudPanel';
import NeonButton from '@/components/ui/NeonButton';
import { useAppStore } from '@/store/useAppStore';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
}

const Settings = () => {
  const { user } = useAppStore();
  const [notionPageId, setNotionPageId] = useState('');
  const [isNotionConnected, setIsNotionConnected] = useState(false);
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Emergency Contact 1', phone: '+55 11 99999-9999' },
  ]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  const handleConnectNotion = () => {
    if (notionPageId.trim()) {
      setIsNotionConnected(true);
    }
  };

  const handleAddContact = () => {
    if (newContactName.trim() && newContactPhone.trim()) {
      setContacts([
        ...contacts,
        {
          id: Date.now().toString(),
          name: newContactName,
          phone: newContactPhone,
        },
      ]);
      setNewContactName('');
      setNewContactPhone('');
    }
  };

  const handleRemoveContact = (id: string) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-4xl font-display font-bold text-neon-cyan mb-2">
          System <span className="text-secondary">Settings</span>
        </h1>
        <p className="text-muted-foreground font-mono">
          Configure your GHOST neural interface preferences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notion Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <HudPanel title="Notion Integration" icon={<LinkIcon className="w-4 h-4" />}>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Connect your Notion workspace to save session summaries and notes automatically.
              </p>

              <div className="space-y-2">
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Notion Page ID
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={notionPageId}
                    onChange={(e) => setNotionPageId(e.target.value)}
                    placeholder="Enter your Notion Page ID"
                    disabled={isNotionConnected}
                    className="flex-1 bg-muted/50 border border-primary/30 px-4 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
                    }}
                  />
                </div>
              </div>

              {isNotionConnected ? (
                <div className="flex items-center gap-2 p-3 bg-neon-green/10 border border-neon-green/30">
                  <Check className="w-4 h-4 text-neon-green" />
                  <span className="text-sm font-mono text-neon-green">Connected to Notion</span>
                </div>
              ) : (
                <NeonButton variant="secondary" onClick={handleConnectNotion} className="w-full">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Connect Notion
                </NeonButton>
              )}
            </div>
          </HudPanel>
        </motion.div>

        {/* Billing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <HudPanel title="Billing & Subscription" icon={<CreditCard className="w-4 h-4" />}>
            <div className="space-y-4">
              {/* Current Plan */}
              <div className="p-4 bg-primary/10 border border-primary/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-muted-foreground uppercase">Current Plan</span>
                  <span className="px-2 py-0.5 bg-neon-green/20 text-neon-green text-xs font-mono">
                    ACTIVE
                  </span>
                </div>
                <h3 className="text-xl font-display font-bold text-primary mb-1">Trial</h3>
                <p className="text-sm text-muted-foreground">
                  7-Day Free Trial • 5 days remaining
                </p>
              </div>

              {/* Usage Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/30 border border-muted">
                  <p className="text-xs font-mono text-muted-foreground mb-1">API Calls</p>
                  <p className="text-lg font-display font-bold text-foreground">124 / 500</p>
                </div>
                <div className="p-3 bg-muted/30 border border-muted">
                  <p className="text-xs font-mono text-muted-foreground mb-1">Storage</p>
                  <p className="text-lg font-display font-bold text-foreground">2.4 GB</p>
                </div>
              </div>

              <NeonButton variant="primary" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Manage Plan via Stripe
              </NeonButton>
            </div>
          </HudPanel>
        </motion.div>

        {/* S.O.S Emergency Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <HudPanel 
            title="S.O.S Emergency Contacts" 
            icon={<Phone className="w-4 h-4" />}
            variant="warning"
          >
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Configure emergency contacts to be notified when S.O.S is triggered.
              </p>

              {/* Contact List */}
              <div className="space-y-2">
                {contacts.map((contact) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 p-3 bg-muted/30 border border-muted"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-destructive/20 border border-destructive/30">
                      <Phone className="w-4 h-4 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <p className="font-mono text-sm text-foreground">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.phone}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveContact(contact.id)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Add New Contact */}
              <div className="p-4 border border-dashed border-primary/30 bg-primary/5">
                <p className="text-xs font-mono text-muted-foreground uppercase mb-3">
                  Add New Contact
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    placeholder="Contact Name"
                    className="bg-muted/50 border border-primary/30 px-4 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  <input
                    type="tel"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="bg-muted/50 border border-primary/30 px-4 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <NeonButton 
                  variant="ghost" 
                  className="mt-3"
                  onClick={handleAddContact}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Contact
                </NeonButton>
              </div>
            </div>
          </HudPanel>
        </motion.div>

        {/* Additional Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <HudPanel title="Notifications" icon={<Bell className="w-4 h-4" />}>
            <div className="space-y-3">
              {[
                { label: 'Push Notifications', enabled: true },
                { label: 'Email Alerts', enabled: false },
                { label: 'Sound Effects', enabled: true },
                { label: 'Streak Reminders', enabled: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-2">
                  <span className="text-sm font-mono text-foreground">{item.label}</span>
                  <button
                    className={`w-10 h-5 rounded-full transition-colors relative ${
                      item.enabled ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                        item.enabled ? 'left-5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </HudPanel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <HudPanel title="Privacy & Security" icon={<Shield className="w-4 h-4" />}>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 border border-muted">
                <div>
                  <p className="text-sm font-mono text-foreground">Two-Factor Auth</p>
                  <p className="text-xs text-muted-foreground">Extra layer of security</p>
                </div>
                <NeonButton variant="ghost" size="sm">
                  Enable
                </NeonButton>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 border border-muted">
                <div>
                  <p className="text-sm font-mono text-foreground">Data Export</p>
                  <p className="text-xs text-muted-foreground">Download your data</p>
                </div>
                <NeonButton variant="ghost" size="sm">
                  Export
                </NeonButton>
              </div>
              <div className="flex items-center justify-between p-3 bg-destructive/10 border border-destructive/30">
                <div>
                  <p className="text-sm font-mono text-destructive">Delete Account</p>
                  <p className="text-xs text-muted-foreground">Permanently remove your data</p>
                </div>
                <NeonButton variant="ghost" size="sm" className="border-destructive/50 text-destructive hover:bg-destructive/10">
                  Delete
                </NeonButton>
              </div>
            </div>
          </HudPanel>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
