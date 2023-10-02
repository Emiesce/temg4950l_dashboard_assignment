import React from 'react';
import Pricing from './pages/Pricing';
import Portfolio from './pages/Portfolio';
import { Route, Routes} from 'react-router-dom';

import Navbar from './Navbar';

const App = () => {
    // Routes allows the code to be scalable, by allowing different pages by specifying their path
    return (
        <>
            <Navbar/>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Pricing/>}/>
                    <Route path="pricing" element={<Pricing/>}/>
                    <Route path="portfolio" element={<Portfolio/>}/>
                </Routes>
            </div>
        </>
    );
};

export default App;