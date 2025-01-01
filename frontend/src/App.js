import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Interactions from './pages/Interactions';
import CallPlanning from './pages/CallPlanning';
import Orders from './pages/Orders';
import Performance from './pages/Performance';

const App=()=>{
    return(
        <Router>
            <div style={{display:'flex'}}>
                <Sidebar/>
                <div style={{flexGrow:1,padding:16}}>
                    <Routes>
                        {/* Redirect '/' to '/dashboard' */}
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard/>} />
                        <Route path="/contacts" element={<Contacts/>} />
                        <Route path="/interactions" element={<Interactions/>} />
                        <Route path="/call-planning" element={<CallPlanning/>} />
                        <Route path="/orders" element={<Orders/>} />
                        <Route path="/performance" element={<Performance/>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
