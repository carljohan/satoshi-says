import React, { Component } from 'react';
import database from './utils/firebase.js'
import Web3 from 'web3'
let satoshiSaysDataBaseRef = database.ref('/satoshisays')
import _ from 'lodash'
import Footer from './Footer.jsx';
import { Link } from 'react-router-dom';

class SatoshiOldPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            messages: []
        }
    }

    componentDidMount () {
        if (typeof window.web3 !== 'undefined') {
            web3 = new Web3(window.web3.currentProvider);
            this.web3 = web3
        }
        
        satoshiSaysDataBaseRef.once('value', (messageObject) => {                        
            this.setState({
                messages: Object.values(messageObject.val()).reverse()
            })
        })
    }
    
    componentWillUnmount() {
        satoshiSaysDataBaseRef.off()
    }

    renderSatoshiMoodImages(moodState) {
        let imageOfHalfBodySatoshi;

        switch (moodState) {
            case 0:
                imageOfHalfBodySatoshi = 'modal-halfhappy'
                break;

            case 1:
                imageOfHalfBodySatoshi = 'modal-halfsad'
                break;

            case 2:
                imageOfHalfBodySatoshi = 'modal-halfangry'
                break;

            case 3:
                imageOfHalfBodySatoshi = 'modal-halfthinking'
                break;

            case 4:
                imageOfHalfBodySatoshi = 'modal-halfstoked'
                break;
            default:
                break;
        }

        return (
            <div className='modal-half-body-wrapper-old'>
              <div className={`modal-half-body-old ${imageOfHalfBodySatoshi}`}></div>
            </div>
        )
    }

    renderMessages() {        
        if (this.state.messages.length > 0) {
            return (
            <div className='satoshi-old-all-messages-wrapper'>
                {this.state.messages.map((message, index) => {
                    // TODO: Make sure to change this if we change pay algo
                    const priceNextPersonPayed = message.price / Math.pow(10,18)
                    const priceTheyPayed = priceNextPersonPayed / 1.06
                    //const devFee = priceNextPersonPayed * 0.05
                    //const profit = priceNextPersonPayed - priceTheyPayed - devFee
                    const priceTheyPayedRounded = _.round(priceTheyPayed, 5)
                    const priceNextPersonPayedRounded = _.round(priceNextPersonPayed, 5)
                    //const profitRounded = _.round(profit, 3)
                    let timeOwnedString;
                    if (message.removedDate) {
                        const totalMiliSecondsOwned = message.removedDate - message.addedDate
                        if (totalMiliSecondsOwned / (1000*60*60) > 1) {
                            const hoursOwned = Math.floor(totalMiliSecondsOwned / (1000*60*60))
                            const minutesOwned = Math.floor((totalMiliSecondsOwned - hoursOwned*1000*60*60) / (1000*60))                            
                            timeOwnedString = `Time Owned: ${hoursOwned} hours ${minutesOwned} minutes`                        
                        } else {
                            const minutesOwned = Math.floor((totalMiliSecondsOwned) / (1000*60))
                            timeOwnedString = `Time Owned: ${minutesOwned} minutes`
                        }
                    } else {
                        timeOwnedString = "This is what Satoshi's saying now!"
                    }
                    let mirrorSpeechBubbleClass = ''
                    if (index % 2 == 0) {
                        mirrorSpeechBubbleClass = 'satoshi-old-mirrored-speech-bubble'
                    }
                    
                    return (
                        <div className={`satoshi-old-message-wrapper ${mirrorSpeechBubbleClass}`} key={message.addedDate}>
                            
                            {this.renderSatoshiMoodImages(message.moodState)}
                            
                            <div className='satoshi-old-message-speech-bubble-wrapper'>
                                <div className="speech-bubble start-page-speech-bubble">
                                    <p className='text'>{message.message}</p>
                                    <p className='speech-bubble-quote'>- {message.name}</p>
                                </div>
                                <div className='text-under-bubble'>
                                    <div className='satoshi-old-message-owner'>
                                        Writer: {message.owner}
                                    </div>
                                    <div className='text-under-bubble-price'>
                                        <div>
                                            Bought at: {priceTheyPayedRounded}
                                            <div className='connected-eth-logo-white'></div>
                                        </div>
                                        <div>
                                            Sold at: {priceNextPersonPayedRounded}
                                            <div className='connected-eth-logo-white'></div>
                                        </div>
                                    </div>
                                    <div className='timeowned-string'>
                                        {timeOwnedString}
                                    </div>
                                </div>
                            </div>

                                                        
                        </div>
                    )
                })}
            </div>    
        )
        }    
        
    }

    render() {                
        return (
            <div className='satoshi-old-wrapper'>
                <h1>What has Satoshi Said?</h1>
                <Link to='/'> 
                    <div className='satoshi-old-go-back'>Go back</div>
                </Link>
                {this.renderMessages()}
            </div>
        );
    }
}

export default SatoshiOldPage;
