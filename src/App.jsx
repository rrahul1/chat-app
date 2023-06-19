import { Routes, Route } from "react-router-dom";
import "rsuite/dist/styles/rsuite-default.css";
import "./styles/main.scss";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import EmailVerify from "./pages/EmailVerify";
import Chat from "./pages/Home/Chat";
import { Col } from "rsuite";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />

      <Route path="/" element={<Home />} />

      <Route path="/verify" element={<EmailVerify />} />
      <Route
        path="/chat/:chatId"
        element={
          <Col xs={24} md={8} className="h-100">
            <Chat />
          </Col>
        }
      />
    </Routes>
  );
}

export default App;
