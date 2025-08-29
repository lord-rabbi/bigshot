import React, { useState, useRef } from 'react';
import {
  FiFileText,
  FiPlayCircle,
  FiShield,
  FiX,
  FiMaximize
} from 'react-icons/fi';

import Sidebar from '../components/Sidebar';
import PdfViewer from '../components/PdfViewer';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [showViewer, setShowViewer] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  const handleFullscreen = async () => {
    if (!fullscreen && viewerRef.current) {
      await viewerRef.current.requestFullscreen();
      setFullscreen(true);
    } else {
      await document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const handleClose = async () => {
    if (fullscreen) await document.exitFullscreen();
    setFullscreen(false);
    setShowViewer(false);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="content">
        <h1 className="title">Bienvenue sur votre tableau de bord</h1>

        <div className="card-container">
          <div className="card" onClick={() => setShowViewer(true)}>
            <FiFileText className="card-icon" />
            <span>Gérer les fichiers</span>
          </div>
          <div className="card">
            <FiPlayCircle className="card-icon" />
            <span>Lancer un exercice</span>
          </div>
          <div className="card">
            <FiShield className="card-icon" />
            <span>Accès sécurisé</span>
          </div>
        </div>

        {showViewer && (
          <div className="dashboard-section" ref={viewerRef}>
            <div className="section-header">
              <h2>Gestion des PDF</h2>
              <div className="header-buttons">
                <button className="fullscreen-button" onClick={handleFullscreen}>
                  <FiMaximize />
                </button>
                <button className="close-button" onClick={handleClose}>
                  <FiX />
                </button>
              </div>
            </div>
            <PdfViewer fullscreen={fullscreen} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
