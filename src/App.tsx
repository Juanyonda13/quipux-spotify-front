
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import  Layout  from '@/components/layout';
import  Form from '@/pages/form';
import Playlist from './pages/Playlist';
import ProtectedRoute from './components/PrivateRoute';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Form/>} />
          <Route path="playlist/:name" element={<Playlist />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
