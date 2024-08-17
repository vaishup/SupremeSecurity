import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Chart from './pages/Chart';
import Dashboard from './pages/Dashboard/Dashboard';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DriverList from './pages/DriverList';
import AddClient from './pages/AddClient';
import ClientList from './pages/ClientList';
import StaffList from './pages/StaffList';
import TaskList from './pages/TaskList';
import AddStaff from './pages/AddStaff';
import AddTask from './pages/AddTask';
import IncidenetsList from './pages/IncidenetsList';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="SSS" />
              <Dashboard />
            </>
          }
        />

        <Route
          path="/driversList"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <DriverList />
            </>
          }
        />

        <Route
          path="/addClient"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />

              <AddClient />
            </>
          }
        />
        <Route
          path="/staffList"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />

              <StaffList />
            </>
          }
        />
 <Route
          path="/IncidenetsList"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />

              <IncidenetsList />
            </>
          }
        />
        <Route
          path="/taskList"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />

              <TaskList />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/clientList"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ClientList />
            </>
          }
        />

        <Route
          path="/addstaff"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AddStaff />
            </>
          }
        />

        <Route
          path="/addTask"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AddTask />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />

        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
