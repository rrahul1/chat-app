import { Routes, Route } from "react-router-dom";
import "rsuite/dist/styles/rsuite-default.css";
import "./styles/main.scss";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import EmailVerify from "./pages/EmailVerify";
import Chat from "./pages/Home/Chat";
import { useMediaQuery } from "./misc/custom-hooks";

function App() {
  const isDesktop = useMediaQuery("(min-width: 992px)");

  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />

      <Route path="/" element={<Home />}>
        <Route exact path="/chat/" element={isDesktop && <Chat />} />

        <Route exact path="/chat/:chatId" element={isDesktop && <Chat />} />
      </Route>

      <Route path="/verify" element={<EmailVerify />} />
    </Routes>
  );
}

export default App;
