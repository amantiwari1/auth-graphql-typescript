import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Link } from "react-router-dom"
function Routes() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <div>
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/register">Register</Link>
            </div>
            <div>
              <Link to="/login">Login</Link>
            </div>
          </div>
        </header>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;