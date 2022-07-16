import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { CognitoUser } from 'amazon-cognito-identity-js';
import Authentication from './views/authentication';
import Dashboard from './views/dashboard/index';

function App() {
  useEffect(() => {
    console.log('cog user is ', CognitoUser);
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/" element={<Authentication />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
