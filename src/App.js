import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/custom.css';
import MainNavbar from './components/MainNavbar';

function App() {
  return (
    <Router>
      <MainNavbar />
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/favorites' component={FavoritesPage} />
      </Switch>
    </Router>
  );
}

export default App;
