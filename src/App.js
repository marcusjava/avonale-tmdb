import Header from './components/Header';
import Home from './pages/Home';
//import Detail from './pages/Detail';
//import Search from './pages/Search';

import { Route, Switch } from 'react-router-dom';
//import SignInAndSignUp from './pages/SignInAndSignUp';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Route path="/" exact component={Home} />
      </main>
    </div>
  );
}

export default App;
