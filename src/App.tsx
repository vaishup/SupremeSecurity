import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import React, { Suspense, lazy, useEffect, useState } from 'react';

import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import Dashboard from './pages/Dashboard/Dashboard';
import config from './amplifyconfiguration.json';
import DefaultLayout from './layout/DefaultLayout';
import { Toaster } from 'react-hot-toast';
import { Amplify } from 'aws-amplify';
import routes from './routes';
Amplify.configure(config);

function App() {
    const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

 
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleLoginSuccess = () => {
    console.log('handleLogin ', isLoggedIn);
    setIsLoggedIn(true);
    const loginTimestamp = new Date().getTime().toString();
    localStorage.setItem('loginTimestamp', loginTimestamp);
    navigate('/');
  };

  const checkLoginStatus = async () => {
    console.log('checkLoginStatus');
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    try {
      // const user = await Auth.currentAuthenticatedUser();
      const user = { username: 'Admin' };

      const currentTime = new Date().getTime();
      const oneDay = 7 * 24 * 60 * 60 * 1000; // 1 week

      if (
        loginTimestamp &&
        currentTime - parseInt(loginTimestamp, 10) < oneDay
      ) {
        console.log('Login as ', user.username);
        setIsLoggedIn(true);
        localStorage.setItem('loginTimestamp', currentTime.toString());
      } else {
        console.log('Login X - over 24 hour');
        localStorage.removeItem('loginTimestamp');
      }
      setLoading(false);
    } catch (error) {
      console.log('Login X');
      localStorage.removeItem('loginTimestamp');
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route
          path="/auth/signin"
          element={<SignIn onLoginSuccess={handleLoginSuccess} />}
        />
        
        {isLoggedIn ? (
          <Route element={<DefaultLayout />}>
            <Route index element={<Dashboard />} />
            {routes.map((route, index) => {
              const { path, component: Component } = route;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
          </Route>
        ) : (
          <Route
            index
            element={<SignIn onLoginSuccess={handleLoginSuccess} />}
          />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
