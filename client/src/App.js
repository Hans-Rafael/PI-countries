import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateActivity from './components/CreateActivity';
import DetailsCountry from './components/DetailsCountry';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        < Switch>
          < Route exact path="/" component={LandingPage} />
          < Route exact path="/Home" component={Home} />
          {/* <Route exact path='/countries?name=:id' component={DetailsCountry} />
          <Route path='/activity' component={CreateActivity} /> */}
        </Switch>
        <h1>Hans Countries</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
