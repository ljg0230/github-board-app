import React from 'react';
import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/layout/Header';
import { Container } from 'react-bootstrap';
import { ModalProvider } from './contexts/ModalContext';
import ModalManager from './components/common/ModalManager';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ModalProvider>
        <div>
          <Header />
          <main style={{ padding: '2rem 0' }}>
            <Container>
              <Outlet />
            </Container>
          </main>
          <ModalManager />
        </div>
      </ModalProvider>
    </HelmetProvider>
  );
};

export default App;