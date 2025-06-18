import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './components/Home';
import ReviewPage from './components/ReviewPage';
import LoginPage from '/Users/maruthisundar/Documents/intership projects/ratings-frontend/src/loginpage.jsx';
import SignUpPage from '/Users/maruthisundar/Documents/intership projects/ratings-frontend/src/signuppage.jsx';
import AdminPage from '/Users/maruthisundar/Documents/intership projects/ratings-frontend/src/adminpage.jsx';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/review/:name"
          element={
            <RequireAuth>
              <ReviewPage />
            </RequireAuth>
          }
        />
        
        <Route path="/signup" element={<SignUpPage />} />
        
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminPage />
            </RequireAuth>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;