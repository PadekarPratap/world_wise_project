import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesContextProvider } from "./context/CitiesContextProvider";
import AuthContextProvider from "./context/AuthContextProvider";

const App = () => {
  return (
    <AuthContextProvider>
      <CitiesContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="product" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />

              <Route path="cities/:id" element={<City />} />
            </Route>
          </Routes>
        </Router>
      </CitiesContextProvider>
    </AuthContextProvider>
  );
};

export default App;
