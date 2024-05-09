import React, { useEffect, useState } from 'react';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Mysidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Team from './scenes/team';
import Contacts from './scenes/contacts';
import Invoices from './scenes/invoices';
import Form from './scenes/form';
import Line from './scenes/line';
import LineCMS from './scenes/lineCMS';
import LineCABLAGE from './scenes/lineCABLAGE';
import Pie from './scenes/pie';
import Calendar from './scenes/calendar';
import Login from './scenes/login';
import { useNavigate } from 'react-router-dom';

import { getWithExpiry } from './util/localstorage';

function App() {
  const [Theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  const checkLogin = async () => {
    try {
      const response = await fetch(`http://192.168.1.97:8080/api/user`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getWithExpiry('TOKEN')}`,
        },
      });
      if (response.ok) {
        const user = await response.json();

        setIsLogin(true);
        navigate('/');

      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      setIsLogin(false);
      navigate('/login');

      //   setFailed(true);
      //   setPassword('');
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={Theme}>
        <CssBaseline />

        <div className="flex relative  h-screen w-screen">
            <Mysidebar isSidebar={isSidebar}   isLogin={isLogin}/>

          <main className="h-full w-full ">
          <Topbar setIsSidebar={setIsSidebar}  isLogin={isLogin}/>
            <Routes>
              <Route path="/" element={< Dashboard/>} />
              <Route path="/login" element={<Login />}  />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/lineCMS" element={<LineCMS />} />
              <Route path="/lineCABLAGE" element={<LineCABLAGE />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
