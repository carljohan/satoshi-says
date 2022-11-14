import React from 'react';
import StartPage from './StartPage.jsx';
import FaqPage from './FaqPage.jsx';
import Metadata from './Metadata.jsx';
import '../css/master.css'
import { hot } from 'react-hot-loader'

import SatoshiOldPage from './SatoshiOldPage.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './Footer.jsx';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Metadata />
                    <Route exact={ true } path='/' component={StartPage}/>
                    <Route exact={ true } path='/faq' component={FaqPage}/>
                    <Route exact={ true } path='/halloffame' component={ SatoshiOldPage } />
                    <Footer />
                </div>                
            </Router>
        )
    }
}



export default hot(module)(App)
