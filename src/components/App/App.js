import { useEffect } from 'react';
import './App.css';
import Sidebar from '../Sidebar/Sidebar';
import CardsPage from '../CardsPage/CardsPage';
import UserProfilePage from '../UserProfilePage/UserProfilePage';
import { Routes, Route, Navigate } from "react-router-dom";
import { useUsersStore } from '../../hooks/useStore';

function App() {
  const {uploadUsers, users} = useUsersStore();

  useEffect(()=>{
    uploadUsers();
  },[])

  return (
    <div className="app">
      <Sidebar />
      <Routes>
        <Route path="/:id" element={<UserProfilePage />} />
        <Route path="/" element={<CardsPage data={users} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
