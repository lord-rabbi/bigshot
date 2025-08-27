import React, { useState } from 'react';
import { FiFileText, FiPlayCircle, FiShield, FiX } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import PdfViewer from '../components/PdfViewer';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [showViewer, setShowViewer] = useState(false);

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
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Gestion des PDF</h2>
              <button className="close-button" onClick={() => setShowViewer(false)}>
                <FiX />
              </button>
            </div>
            <PdfViewer />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
