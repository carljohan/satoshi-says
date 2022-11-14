import React, { Component } from 'react';
import FaqComponent from './FaqComponent.jsx'
import Footer from './Footer.jsx'
import { Link } from 'react-router-dom';
import cat from '../images/cat.jpg'

class FaqPage extends Component {    

    render() {
        const participateContent = (
            <div>
                Here’s what you need to get started:
                <ul>
                    <li>A computer or laptop running the desktop version of Chrome or Firefox</li>
                    <li>MetaMask, a digital wallet used specifically with web apps</li>
                    <li>Ether, a form of digital payment that powers Satoshi</li>
                </ul>
            </div>
        )
        
        const installMetaMask = (
            <div>
                <p>
                    To use Satoshi says, you will need to install MetaMask, a digital wallet. You will need to put money in it to make your first purchase.
                    Note: A digital wallet like MetaMask acts like a bank account—treat it with respect and make sure you don’t forget your password or the seed words.
                </p>
                <iframe width="550" height="315" src="https://www.youtube.com/embed/tfETpi-9ORs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
        )

        const whatisthiscontent = (
            <div>
                <p>
                    A website with one speech bubble anyone can change. It costs ether to change the message, but the next person who changes it pays more. This extra ether goes directly to the last person who owned the message. 
                </p> 
            </div>
        )
        const whitepapercontent = (
            <div>
                <p>No, but a white cat.</p> 
                <img src={cat} alt="white cat" />
            </div>
        )
        
        const whatShouldIChangeTheText = (
            <div>
                <p>
                    Satoshi’s voice is highly regarded. The message is seen by thousands of visitors everyday. Plus, if someone changes it after you, you’ll get 5 % extra ether. 
                </p>                
            </div>
        )

        const pastSpeechBubbles = (
            <div>
                <Link to='/halloffame'> Here! </Link>
            </div>
        )        

        const isThisWhatSatoshiWants = (
            <div>
                <p>
                    On page 10 under the point "13. Communication" in the Bitcoin Whitepaper Satoshi Nakamoto writes
                </p> 
                <p>
                    "If the cryptocurrency community should ever fall into conflict and despair, a website will be founded which spreads my word. The name of this website will be Satoshi says." 
                </p>
                <a href='https://bitcoin.org/bitcoin.pdf'>Look for yourself</a>
            </div>
        )


        return (
            <div>
                <div className='faq-header'>
                    FAQ
                    <Link to='/'> 
                        <div className='satoshi-old-go-back'>Go back</div>
                    </Link>    
                </div>
                <div className='faq-component-container'>
                    <FaqComponent
                        title='What do I need to participate?'
                        content={participateContent}                        
                    />
                    <FaqComponent
                        title='Installing MetaMask, your digital wallet'
                        content = {installMetaMask}
                    />
                    <FaqComponent
                        title='What is Satoshi says?'
                        content={whatisthiscontent}
                    />
                    
                    <FaqComponent
                        title='Why should I change the text?'
                        content={whatShouldIChangeTheText}
                    />
                    <FaqComponent
                        title='Where can I see past messages?'
                        content={pastSpeechBubbles}
                    />
                    <FaqComponent
                        title = 'Do you have a white paper?'
                        content={whitepapercontent}
                    />
                    <FaqComponent
                        title = 'Is this what Satoshi wants?'
                        content={isThisWhatSatoshiWants}
                    />
                </div>                
            </div>
        );
    }
}

export default FaqPage;