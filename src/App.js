import React, { useEffect, useState } from 'react';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Mysidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Templates from './scenes/templates';
import TemplateForm from './scenes/templates/TemplateForm' ;
import Constraints from './scenes/constraints';
import ConstraintForm from './scenes/constraints/ConstraintForm' ;
import Login from './scenes/login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { getWithExpiry } from './util/localstorage';

function App() {
  const [Theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
/*
  const checkLogin = async () => {
    try {
      const response = await axios.get('http://107.23.59.78/isup', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getWithExpiry('TOKEN')}`, // JWT
        },
      });
      if (response.ok) {

        setIsLogin(true);
        navigate('/');

      } else {
        setIsLogin(false);
        navigate('/login');
        throw Error(await response.text());
      }
    } catch (error) {
      setIsLogin(false);
      navigate('/login');

    }
  };

  useEffect(() => {
    checkLogin();
  }, []);
*/
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={Theme}>
        <CssBaseline />

        <div className="flex relative  h-screen w-screen">
            <Mysidebar isSidebar={isSidebar}   />

          <main className="h-full w-full ">
            <Routes>
              <Route path="/" element={< Dashboard/>} />
              <Route path="/login" element={<Login />}  />
              <Route path="/templates" element={<Templates />} />
              <Route path="/templates/create" element={<TemplateForm />} />
              <Route path="/constraints" element={<Constraints />} />
              <Route path="/constraints/create" element={<ConstraintForm />} />
  
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
