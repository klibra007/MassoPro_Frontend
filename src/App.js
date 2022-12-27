import './styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './composants/Header';
import Main from './composants/Main';
import Footer from './composants/Footer';
import PageInscription from './composants/PageInscription';
import { AuthProvider } from './composants/Context';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <AuthProvider>
          <Routes>
            <Route path='*' element={<Main />}></Route>
            <Route path='/inscription' element={<PageInscription />}></Route>
          </Routes>
        </AuthProvider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
