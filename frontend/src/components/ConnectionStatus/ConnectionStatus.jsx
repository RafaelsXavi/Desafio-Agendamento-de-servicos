import React, { useState, useEffect } from 'react';
import { checkApiHealth } from '../../services/api';
import './ConnectionStatus.css';

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    let mounted = true;
    let checkInterval;

    const checkConnection = async () => {
      if (!mounted) return;
      
      setIsChecking(true);
      const online = await checkApiHealth();
      
      if (mounted) {
        setIsOnline(online);
        setIsChecking(false);
      }
    };

    // Verificação inicial
    checkConnection();

    // Verificação a cada 30 segundos
    checkInterval = setInterval(checkConnection, 30000);

    return () => {
      mounted = false;
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, []);

  if (isOnline && !isChecking) {
    return null; // Não mostra nada se estiver online
  }

  return (
    <div className={`connection-status ${isOnline ? 'online' : 'offline'}`}>
      <div className="status-indicator">
        <span className={`status-dot ${isChecking ? 'checking' : isOnline ? 'online' : 'offline'}`}></span>
        <span className="status-text">
          {isChecking ? 'Verificando conexão...' : 'Servidor offline - Tentando reconectar...'}
        </span>
      </div>
    </div>
  );
};

export default ConnectionStatus;