import './App.css';
import CustomerBookings from './Pages/customerBookings';
import SignIn from './Pages/SignIn'
import EmployeeDashboard from './Pages/EmployeeDashboard'
import MyTrips from './Pages/myTrips';
import { Routes, Route } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as React from 'react'

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Poppins',
    }
  }
});

function App() {

  const [auth, setAuth] = React.useState({SSN: 0, isAdmin: false})

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<SignIn auth={auth} authHandle={setAuth}/>} />
            <Route path="/bookings" element={<CustomerBookings auth={auth} authHandle={setAuth}/>} />
            <Route path="/employees" element={<EmployeeDashboard auth={auth} authHandle={setAuth} />} />
            <Route path="/mytrips" element ={<MyTrips auth={auth} authHandle={setAuth} />}/>
          </Routes>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
