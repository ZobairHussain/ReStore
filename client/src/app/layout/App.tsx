import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../feature/about/AboutPage";
import Catalog from "../../feature/catalog/Catalog";
import ProductDetails from "../../feature/catalog/ProductDetails";
import ContactPage from "../../feature/contact/ContactPage";
import HomePage from "../../feature/home/HomePage";
import Header from "./header";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../feature/basket/BasketPage";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../feature/basket/basketSlice";
import Login from "../../feature/account/Login";
import Register from "../../feature/account/Register";
import ForgetPassword from "../../feature/account/ForgetPassword";
import { fetchCurrentUser } from "../../feature/account/accountSlice";
import PrivateRoute from "./PrivateRoute";
import Orders from "../../feature/orders/Orders";
import CheckoutWrapper from "../../feature/checkout/CheckoutWrapper";
import Inventory from "../../feature/admin/Inventory";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error)
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChanged() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message='Initializing app...' />
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme='colored' position='bottom-right' hideProgressBar />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChanged={handleThemeChanged} />
      <Route exact path='/' component={HomePage} />
      {/* reach router can take regular expression as route. */}
      <Route path={'/(.+)'} render={() => (  
        <Container  sx={{mt: 4}}>
          <Switch>
            <Route exact path='/catalog' component={Catalog} />
            <Route path='/catalog/:id' component={ProductDetails} />
            <Route path='/about' component={AboutPage} />
            <Route path='/contact' component={ContactPage} />
            <Route path='/server-error' component={ServerError} />
            <Route path='/basket' component={BasketPage} />
            <PrivateRoute path='/checkout' component={CheckoutWrapper} />
            <PrivateRoute path='/orders' component={Orders} />
            <PrivateRoute roles={['Admin']} path='/inventory' component={Inventory} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/forgetPassword' component={ForgetPassword} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      )} />
    </ThemeProvider>
  );
}

export default App;
