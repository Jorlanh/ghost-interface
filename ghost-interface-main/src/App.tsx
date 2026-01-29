import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useAppStore } from '@/store/useAppStore';
import BootSequence from '@/components/features/BootSequence';
import MainLayout from '@/components/layout/MainLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Pages
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import TutorMode from '@/pages/TutorMode';
import ChatInterface from '@/pages/ChatInterface';
import AdminSecret from '@/pages/AdminSecret';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

const App = () => {
  const { isBooted, checkElectron } = useAppStore();

  useEffect(() => {
    // Check if running in Electron
    checkElectron();
  }, [checkElectron]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            {!isBooted ? (
              <BootSequence key="boot" />
            ) : (
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />

                {/* Protected Routes with Main Layout */}
                <Route
                  element={
                    <ProtectedRoute>
                      <MainLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/chat" element={<ChatInterface />} />
                  <Route path="/tutor" element={<TutorMode />} />
                  <Route path="/stats" element={<Dashboard />} />
                  <Route path="/settings" element={<Dashboard />} />
                </Route>

                {/* Secret Admin Route */}
                <Route
                  path="/acmawalkertorcedordobahia"
                  element={
                    <ProtectedRoute requireAdmin>
                      <MainLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminSecret />} />
                </Route>

                {/* 404 Route */}
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
