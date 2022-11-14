import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import contractAddress from './utils/contractAddress.js'


class Footer extends Component {
    //TODO CHANGE TO MAIN NET
    render() {
        return (
            <div className='footer'>
                <div className='footer-container'>
                    <div>
                        <div className='footer-title'>Links</div>
                        <ul>
                            <li>
                                <Link to={'/faq'}>
                                
                                FAQ
                                </Link>
                            </li>                            
                            <li>
                                <Link to={'/halloffame'}>
                                    What Satoshi has said
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'}>
                                    Start Page
                                </Link>
                            </li>
                            <li>
                                <a href={`https://etherscan.io/address/${contractAddress}`}>Smart Contract </a>
                            </li>                            
                        </ul>
                    </div>
                    <div className='eth-logo'>
                    </div>
                    <div className='metamask-logo-wrapper'>
                    <div className='metamask-logo'></div>
                    <div className='metamask-logo-title'>metamask</div>
                    </div>
                    <div className='copyright'>
                    
                        <p>
                            All rights reserved
                        </p>
                                                
                        <p>
                            © 2018 Satoshi says
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;