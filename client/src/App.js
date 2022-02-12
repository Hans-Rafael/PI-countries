import './App.css';
import { BrowserRouter as R , Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Details from './components/Details';
import Creater from './components/Creater';

function App() {
  return (
    <R>
      <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/countries/:id' element={<Details />} />
          <Route path='/activity' element={<Creater />} />
      </Routes>
    </R>
  );
}

export default App;
