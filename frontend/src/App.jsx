import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Thirukkural from './Thirukkural';
import CreateThirukkural from './Createthirukkural.jsx';
import UpdateThirukkural from './Updatethirukkural.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Thirukkural />}></Route>
          <Route path='/create' element={<CreateThirukkural />}></Route>
          <Route path='/update/:id' element={<UpdateThirukkural />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;