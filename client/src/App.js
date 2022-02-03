import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import Home from './components/Home';

function App() {
  return (
   <BrowserRouter>
   <div className="App">
     < Switch>
     < Route exact path="/" component={LandingPage} />
     < Route exact path="/Home" component={Home} />
     </Switch>
      <h1>Hans Countries</h1>
    </div>
   </BrowserRouter> 
  );
}

export default App;
