import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUp";
import HomePage from "./components/HomePage";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
const App = () => {
  const {isLoggedIn} = useSelector (state => state.authenticationSlice);
  return <BrowserRouter>
    <Switch>
      <Route exact path = '/' render = {() => (isLoggedIn ? <HomePage></HomePage> : <SignInPage></SignInPage>)}></Route>
      <Route path = '/signup' render = {() => (isLoggedIn ? <Redirect to = '/'/> : <SignUpPage></SignUpPage>)}></Route> 
      <Route path = '/signin' render = {() => (isLoggedIn ? <Redirect to = '/'/> : <SignInPage></SignInPage>)}></Route> 
      <Route component = {() => <h2> Page not found !</h2>} />
    </Switch>
  </BrowserRouter>
};

export default App;
