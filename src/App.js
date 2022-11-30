import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './composants/Header';
import Main from './composants/Main';
import Footer from './composants/Footer';
import { AuthProvider } from './composants/Context';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Main />}></Route>
          </Routes>
        </AuthProvider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
