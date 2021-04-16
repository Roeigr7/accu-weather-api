import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/custom.css';
import MainNavbar from './components/MainNavbar';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';

function App() {
  const theme = useSelector(state => state.theme);
  return (
    <div className={theme === 'light' ? null : 'dark-theme'}>
      <Router>
        <MainNavbar />
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/favorites' component={FavoritesPage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
