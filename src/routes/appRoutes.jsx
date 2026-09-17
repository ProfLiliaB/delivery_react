import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import DashboardLoja from '../pages/DashboardLoja';
import DashboardCliente from '../pages/DashboardCliente';
import DashboardAdmin from '../pages/DashboardAdmin';

export default function AppRoutes() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loja" element={<DashboardLoja />} />
        <Route path="/cliente" element={<DashboardCliente />} />
        <Route path="/admin" element={<DashboardAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}