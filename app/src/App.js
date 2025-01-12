import './App.css';
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
