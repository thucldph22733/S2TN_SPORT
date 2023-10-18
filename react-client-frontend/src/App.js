import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import Slider from './layouts/Slider/Slider';
import Banner from './layouts/Banner/Banner';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Slider />
                <Banner />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
