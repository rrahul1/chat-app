import { Routes, Route } from "react-router-dom";
import "rsuite/dist/styles/rsuite-default.css";
import "./styles/main.scss";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import EmailVerify from "./pages/EmailVerify";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />

      <Route path="/" element={<Home />} />

      <Route path="/verify" element={<EmailVerify />} />
    </Routes>
  );
}

export default App;
