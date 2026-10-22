import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import ClientePage from './pages/ClientesPage';
import VeiculosPage from './pages/VeiculosPage';
import AgendamentosPage from './pages/AgendamentosPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} ></Route>
        <Route path='/clientes' element={<ClientePage />}></Route>
        <Route path='/veiculos' element={<VeiculosPage />}></Route>
        <Route path='/agendamentos' element={<AgendamentosPage />}></Route>
        <Route path='*' element={<Navigate to='/login' replace />} ></Route>


      </Routes>

    </BrowserRouter>

  );
}

export default App