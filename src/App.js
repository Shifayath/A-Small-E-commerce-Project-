import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './Coponents/nav';
import Footer from './Coponents/footer';
import SineUp from './Coponents/SineUp';
import Private from './Coponents/privatecomponent';
import Login from './Coponents/login';
import AddProduct from "./Coponents/addProducts";
import Products from './Coponents/products';
import UpdateProduct from './Coponents/updateProduct';
import Profile from './Coponents/Profile'
import './App.css';

function App() {

  return (
    <div className="App">
      <BrowserRouter>

        <Nav />

        <Routes>

          <Route element={<Private/>}>
          <Route path="/" element={<Products/>} />
          <Route path="/Add" element={<AddProduct/>} />
          <Route path="/Update/:id" element={<UpdateProduct/>} />
          <Route path="/Profile" element={<Profile/>} />
          </Route>

          <Route path="/SineUp" element={<SineUp/>}/>
          <Route path="/login" element={<Login/>}/>

        </Routes>

        <Footer />
        
      </BrowserRouter>
    </div>
  );
}

export default App;
