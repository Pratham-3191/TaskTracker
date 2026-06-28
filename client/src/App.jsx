import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { TaskProvider, useTaskContext } from './context/TaskContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Inner component to access context helpers inside the provider scope
const AppContent = () => {
  const { openForm } = useTaskContext();

  return (
    <div className="app-layout">
      {/* Navbar trigger for creating new tasks */}
      <Navbar onNewTaskClick={() => openForm(null)} />

      {/* Main Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Global Toast Notifications system using react-hot-toast */}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--color-surface)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
            fontFamily: 'var(--font-family)',
            fontSize: 'var(--font-size-sm)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            padding: '10px 16px',
          },
          success: {
            iconTheme: {
              primary: 'var(--color-success)',
              secondary: 'var(--color-surface)',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--color-danger)',
              secondary: 'var(--color-surface)',
            },
          },
        }}
      />
    </div>
  );
};

const App = () => {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
};

export default App;
