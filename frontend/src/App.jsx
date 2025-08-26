import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import User from "./pages/User";
import Admin from "./pages/Admin";
import SuperAdmin from "./pages/SuperAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import React from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import User_Dashboard from "./components/user/User_Dashboard";
import BrowseEvents from "./components/user/BrowseEvents";
import Registrations from "./components/user/Registrations";
import Profile from "./components/user/Profile";
import SA_Dashboard from "./components/super-admin/SA_Dashboard";
import Activations from "./components/super-admin/Activations";
import Events from "./components/super-admin/Events";
import SAProfile from "./components/super-admin/Profile";
import A_Dashboard from "./components/admin/A_Dashboard";
import A_Events from "./components/admin/Events";
import View_Events from "./components/admin/View_Events";
import AProfile from "./components/admin/Profile";
import EventRegistrations from "./components/admin/Registrations";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Main><Login /></Main>} />
          <Route path="/register" element={<Main><Register /></Main>} />

          {/* User Routes */}
          <Route element={<ProtectedRoute roles={["user"]} />}>
            
            <Route path="/user/dashboard" element={<User_Dashboard />} />
            <Route path="/user/events" element={<BrowseEvents />} />
            <Route path="/user/registrations" element={<Registrations/>} />
            <Route path="/user/profile" element={<Profile/>} />
            
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute roles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<A_Dashboard />} />
            <Route path="/admin/add_events" element={<A_Events/>} />
            <Route path="/admin/view_events" element={<View_Events />} />
            <Route path="/admin/profile" element={<AProfile />} />
            <Route path="/admin/events/:id" element={<EventRegistrations />} />
            
          </Route>

          {/* Super Admin Routes */}
          <Route element={<ProtectedRoute roles={["super-admin"]} />}>
            <Route path="/super-admin/dashboard" element={<SA_Dashboard />} />
            <Route path="/super-admin/activations" element={<Activations />} />
            <Route path="/super-admin/events" element={<Events />} />
            <Route path="/super-admin/profile" element={<SAProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
