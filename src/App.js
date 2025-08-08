import React from "react";
import{ Route, Routes ,BrowserRouter} from "react-router-dom";
import HeaderForm from "./components/HeaderForm";
import DetailForm from "./components/DetailForm";
import Home from "./pages/Home";
const App=()=> {
  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/headerform" element={<HeaderForm />} />
        <Route path="/detailform" element={<DetailForm />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}
export default App;