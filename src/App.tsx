import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//css
import "./App.css";
import Home from "./pages/home/Home";
import ViewLinkPage from "./pages/view/ViewLinkPage";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/message/:id"
            element={<ViewLinkPage />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
