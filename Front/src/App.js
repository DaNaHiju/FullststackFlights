import 'antd/dist/antd.min.css'


import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddFlight from './components/AddFlight';
import MainLayout from './components/layouts/AuthLayout';
import PublicLayout from './components/layouts/PublicLayout';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
  return (
    <div className="App">

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<MainLayout publicRoute={true} />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="" element={<Home />} />
        </Route>

        {/* Protected Routes */}
        {/* <Route path="/admin/" element={<MainLayout allowedPermissions={["base.add_ticket"]} />}>
          <Route path="add-ticket" element={<AddTicket />} />
        </Route> */}

        <Route path="/" element={<MainLayout allowedPermissions={["base.add_ticket"]} />}>
          <Route path="checkout" element={<Checkout />} />
        </Route>

        <Route path="/admin/" element={<MainLayout allowedPermissions={["base.add_flight"]} />}>
          <Route path="add-flight" element={<AddFlight />} />
        </Route>

        <Route path="/admin/" element={<MainLayout allowedPermissions={["base.add_country"]} />}>
          <Route path="add-country" element={<div>User Can Add Country</div>} />
        </Route>

      </Routes>

    </div>
  );
}

export default App;
