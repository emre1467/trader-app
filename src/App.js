import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import StockRow from './components/StockRow';
import Dashboards from './layouts/Dashboards';
import 'semantic-ui-css/semantic.min.css'
function App() {
  return (
    <div style={{ backgroundColor:"#09a0f7"}} className="App">
      <Dashboards/>
    </div>
  );
}

export default App;
