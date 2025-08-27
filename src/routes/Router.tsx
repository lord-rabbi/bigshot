import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import ProjectionPage from '../pages/ProjectionPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/projection" element={<ProjectionPage />} />
      </Routes>
    </BrowserRouter>
  );
}
