import './App.css';
import { BrowserRouter, Router, Switch } from 'react-router-dom'
import Landing from './componentes/Landing'
import Home from './componentes/Home';

function App() {
  return (
    <BrowserRouter> 
    <div className="App">
      <switch>
      <route exact path = '/' component = {Landing}/>
      <route path = '/Home' component = {Home}/>
      </switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
