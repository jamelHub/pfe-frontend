import React, { useEffect, useState } from 'react';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Mysidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Users from './scenes/users';
import Defauts from './scenes/defauts';
import Produits from './scenes/produits';
import Ofs from './scenes/ofs';
import Login from './scenes/login';
import { useNavigate } from 'react-router-dom';

import UserForm from './scenes/UserForm';

import { getWithExpiry } from './util/localstorage';

function App() {
  const [Theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  const checkLogin = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/user`, {
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
          {true && <Mysidebar isSidebar={isSidebar} isLogin={isLogin} />}

          <main className="h-full w-full ">
            {true && <Topbar setIsSidebar={setIsSidebar} isLogin={isLogin} />}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/create" element={<UserForm />} />

              <Route path="/ofs" element={<Ofs />} />
              <Route path="/produits" element={<Produits />} />

              {/*               <Route path="/produits/:id" element={<AgencyPage />} />
               */}
              <Route path="/defauts" element={<Defauts />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
