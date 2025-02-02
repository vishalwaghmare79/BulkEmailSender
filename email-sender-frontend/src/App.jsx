import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ViewMail from "./components/ViewMail";
import Login from "./Login";
import ProtectedLayout from "./ProtectedLayout";
import { ToastContainer } from "react-toastify";
import Register from './Register';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<ProtectedLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="view-email/:id" element={<ViewMail />} />
        </Route>

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
