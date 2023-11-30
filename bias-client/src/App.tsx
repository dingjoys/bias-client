import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Menu } from "./components/Menu";
import { HomePage } from "./components/pages/Homepage";
import "@rainbow-me/rainbowkit/styles.css";
export default function App() {
  return (
    <BrowserRouter basename="">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className={`menu-container`}>
                <div className="wrapper">
                  <Menu />
                </div>
              </div>
            </>
          }
        >
          <Route index element={<HomePage />}></Route>
          <Route path="*" element={<HomePage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
