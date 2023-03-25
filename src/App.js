import Home from './components/home/Home';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Image from './components/image/Image';
import './App.css';
import Description from './components/description/Description'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element = {<Home/>}/>
            <Route path="image/:name" element={<Image/>}/>
            <Route path="/description" element={<Description/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
