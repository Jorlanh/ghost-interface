import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  xp: number;
  streak: number;
  level: number;
}

interface AppState {
  isBooted: boolean;
  setBooted: (booted: boolean) => void;
  
  user: User | null;
  setUser: (user: User | null) => void;
  
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  
  isElectron: boolean;
  checkElectron: () => void;
  
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isBooted: false,
  setBooted: (booted) => set({ isBooted: booted }),
  
  user: null,
  setUser: (user) => set({ user }),
  
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  
  isElectron: false,
  checkElectron: () => {
    const isElectron = typeof window !== 'undefined' && 
      typeof (window as any).ipcRenderer !== 'undefined';
    set({ isElectron });
  },
  
  soundEnabled: true,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
}));

// Helper hook for Electron commands
export const useElectronCommands = () => {
  const isElectron = useAppStore((state) => state.isElectron);
  
  const sendCommand = (command: string, data?: any) => {
    if (isElectron && (window as any).ipcRenderer) {
      (window as any).ipcRenderer.send(command, data);
    } else {
      console.log(`[Electron Command] ${command}:`, data);
    }
  };
  
  return {
    shutdownPC: () => sendCommand('SHUTDOWN_PC'),
    restartPC: () => sendCommand('RESTART_PC'),
    minimizeWindow: () => sendCommand('MINIMIZE_WINDOW'),
    maximizeWindow: () => sendCommand('MAXIMIZE_WINDOW'),
    closeWindow: () => sendCommand('CLOSE_WINDOW'),
  };
};
