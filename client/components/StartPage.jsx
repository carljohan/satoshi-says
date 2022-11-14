import React, { Component } from 'react'
import UnderMoon from './UnderMoon.jsx'
import Web3 from 'web3'
import axios from 'axios'

import Footer from './Footer.jsx'
import happySatoshi from '../images/satoshi/body/happy.svg'
import angrySatoshi from '../images/satoshi/body/angry.svg'
import stokedSatoshi from '../images/satoshi/body/stoked.svg'
import thinkingSatoshi from '../images/satoshi/body/thinking.svg'
import sadSatoshi from '../images/satoshi/body/sad.svg'
import moon from '../images/moon.png'
import Particles from 'react-particles-js';
import ParticleJSON from './utils/particlesjs-config.json'
import database from './utils/firebase.js'
import contractABI from './utils/contractABI.js'
import contractAddress from './utils/contractAddress.js'
import ModalBuy from './ModalBuy.jsx';
import ConnectedEthLogo from './ConnectedEthLogo.jsx';
import _ from 'lodash'
import InfoModal from './InfoModal.jsx';
import Leaderboard from './Leaderboard.jsx';
import UpvoteDownvote from './UpvoteDownvote.jsx';
import ShareComponent from './ShareComponent.jsx';
import { Link } from 'react-router-dom';


let databaseRef = database.ref('/satoshisays/')



// executed once the captcha has been verified
// can be used to post forms, redirect, etc.

class StartPage extends Component {

  animateChangeMessageButton() {  
    if (window.innerWidth > 770 && this.state.hasMetamask && this.state.account && this.state.rightNetwork) {
      this.setState({
        modalIsOpen: true
      })
    }       
  }
  constructor(props) {
    super(props)
    this.state = {
      animateChangeMessageButton: false,
      speechBubbleText: "........",      
      account: "",
      modalIsOpen: false,
      moodState: 99,
      name: 'loading',
      upvotes: 0,
      sentTranscation: false,
      sentTranscationError: false,
      metamaskSendingTranscation: false,
      pastName: '',
      rightNetwork: true,
      hasMetamask: true,
      currentPrice: '0',
      nextPrice: '0',
      currentProfit: '0',
      currentPriceRounded: '0',
      oldKeyForMessageObject: '',
      infoModalIsOpen: false
    }
  }
    
  componentDidMount() {    
    //get firebasedata message
    databaseRef.limitToLast(1).on('child_added', (messageObject) => {
      //ADD UPVOTE LISTNER!
      if (this.state.oldKeyForMessageObject) {
        database.ref(`/satoshisays/${this.state.oldKeyForMessageObject}`).off()
      }              
      database.ref(`/satoshisays/${messageObject.key}`).on('child_changed', (upvoteObject) => {  
        if (Number.isInteger(upvoteObject.val())) {
          this.setState({
            upvotes: upvoteObject.val()
          })
        }                 
      })

      // IF ALREDY HAS LISTENER REMOVE!

      //reset Upvote comp
      this.upvoteComponent.setHasVotedToFalse()



      let currentPrice = (messageObject.val().price / Math.pow(10,18)).toString() //CONVERTS TO Ether
      let roundNumber = 3
      if (currentPrice < 0.008) roundNumber = 5;
      this.setState({
        speechBubbleText: messageObject.val().message,
        moodState: messageObject.val().moodState,
        name: messageObject.val().name,
        currentOwner: messageObject.val().owner,
        currentPrice,
        currentPriceExact: messageObject.val().price,
        currentPriceRounded: _.round((currentPrice), roundNumber),
        nextPrice: _.round((currentPrice * 106)/100, roundNumber),
        currentProfit: _.round((currentPrice*49)/1000, roundNumber),
        upvotes: messageObject.val().upvotes,
        oldKeyForMessageObject: messageObject.key
      })               
    })

    //Metamask stuff
    if (typeof window.web3 !== 'undefined') {
        web3 = new Web3(window.web3.currentProvider);
        var contract = new web3.eth.Contract(contractABI, contractAddress);
        this.web3 = web3
        
        //Send alert if wrong network TODO: CHANGE TO MAINNET
        web3.eth.net.getId()
        .then((netId) => {
          if (netId != 1) {
            //NET IS NOT RINKEBY            
            
            this.setState({
              rightNetwork: false
            })
          }
          
          
        })
      
      web3.eth.getAccounts((error, accountArray) => {
          this.setState({
            contract,
            account: accountArray[0]
          }, () => {
            //get name from message                        
            database.ref(`/timeOwned/${this.state.account}`).once('value', (timeOwnedObjectRef) => {
              if (timeOwnedObjectRef.val()) {
                let pastName = timeOwnedObjectRef.val().name                        
                this.setState({
                  pastName
                }, () => {
                  this.modalBuy.updateInputName()
                })
              }              
            })            
          })        
      })                        
    } else {
      this.setState({
        hasMetamask: false
      })
    }
  }

  componentWillUnmount() {
    databaseRef.off()
  }

  changeWhatSatoshiSays(textInput, moodState, name) {
    //sends a request to contract
    if (typeof window.web3 !== 'undefined') {
      this.web3.eth.getAccounts((error, accountArray) => {                
        this.setState({
          account: accountArray[0]          
        }, () => {
          this.state.contract.methods.changeWhatSatoshiSays(textInput, moodState, name).send({
            from: this.state.account,
            value: this.state.currentPriceExact,
            gas: 300000,
            data: '0x',
            gasPrice: 4000000000
          })
          .once('transactionHash', (txHash) => {
            this.setState({
              txHash,
              metamaskSendingTranscation: true
            })
            
                        
            
          })
          .once('receipt', (receipt) => {            
            this.setState({
              sentTranscation: true
            })            

          })
          .on('error', (error) => {
            this.setState({
              sentTranscationError: error
            })            
          }) 
          .then((receipt) => {
            
            
          })
          
          // .then((txHash)=> {
          //   console.log(txHash);
            
          //   // SUCCESS might still be bad      
          //   this.setState({
          //     sentTranscation: true
          //   })

          //   setTimeout(() => {
          //     this.setState({modalIsOpen: false})
          //   }, 3000);

          // }, () => {
          //   // error

          //   this.setState({
          //     sentTranscationError: true
          //   })

          // })
        })
      })
      
    }
    
  }

  openModalToChangeWhatSatoshiSays() {
    this.setState({
      modalIsOpen: true
    })
  }

  closeModalToChangeWhatSatoshiSays() {
    this.setState({
      modalIsOpen: false
    })
  }


  

  renderSatoshiImage() {
    let imageOfSatoshi = 'loadingSatoshi'    
    
    switch (parseInt(this.state.moodState)) {
      case 0:
        imageOfSatoshi = 'happySatoshi'
        break;
      case 1:
        imageOfSatoshi = 'sadSatoshi'                
        break;
      case 2:
        imageOfSatoshi = 'angrySatoshi'               
        break;
      case 3:
        imageOfSatoshi = 'thinkingSatoshi'
        break;
      case 4:
        imageOfSatoshi = 'stokedSatoshi'
        break;
      case 99:
        imageOfSatoshi = 'loadingSatoshi'
        break;
      default:
        break;
    }

    let donutClass = imageOfSatoshi === 'loadingSatoshi' ? '' : 'display-none'
    return (
      
      <div className={`start-page-satoshi ${imageOfSatoshi}`} alt="">
        <div className={`donut ${donutClass}`}></div>
      </div>
    )
  }  

  scrollDown() {
    this.underMoonRef.scrollIntoView({behavior: "smooth"})
  }

  renderChangeSatoshiMessageButton() {
    let content;
    if (!this.state.hasMetamask) {
      content = (
        <div className='start-page-wrong-network'>
          <div onClick={() => this.setState({infomodalIsOpen:true})} className='no-metamask-button'> <span className='change-metamask'>You need MetaMask to change message</span> <span className='change-open-info-modal-button'>Click for more info</span>  </div>          
        </div>
      )
    } else if (!this.state.account) {
      content = (
        <div className='start-page-wrong-network'>
          <div>Your MetaMask is locked, simply log in, unlock it and refresh the page</div>
        </div>
      )      
    } else if (!this.state.rightNetwork) {
      content = (
        <div className='start-page-wrong-network'>
          <div>Oops, you’re on the wrong network</div>
          <div>Simply open MetaMask, switch over to the Main Ethereum Network and refresh the page</div>          
        </div>
      )
    } else {
      let animateChangeButtonClass = ''
      if (this.state.animateChangeMessageButton) {
        animateChangeButtonClass = 'animated-change-message'
      }
        content = (
          <div className={`start-page-change-message-button-inside-wrapper ${animateChangeButtonClass}`} onClick={ this.openModalToChangeWhatSatoshiSays.bind(this) }>
            
            <div className="changeMessageButton">CHANGE SATOSHI'S MESSAGE</div>
        </div>
      )
    }

       


    return (
      <div className='start-page-change-button-wrapper'> 
        {content}        
        <div className='start-page-under-bubble-prices'>
          <span>Current price: {this.state.currentPriceRounded} <div className='connected-eth-logo-white' /></span> 
          <span>Next price: {this.state.nextPrice} <div className='connected-eth-logo-white' /></span> 
          <span>Potential profit: 5% <div className='connected-eth-logo-white' /></span> 
        </div> 
        <div onClick={ this.scrollDown.bind(this) } className='scroll-down-button' />
      </div> 
    )           
  }

  mouseEnterVitalik() {    
    this.setState({
      showVitalik:true
    })
    
  }
  render() {     
    
    return (
      
      <div className="App">
        <ModalBuy 
          isOpen={this.state.modalIsOpen}
          openModal = {this.openModalToChangeWhatSatoshiSays.bind(this)}
          closeModal = {this.closeModalToChangeWhatSatoshiSays.bind(this)}
          changeWhatSatoshiSays={this.changeWhatSatoshiSays.bind(this)}
          currentPrice={this.state.currentPriceRounded}
          currentProfit={this.state.currentProfit}
          metamaskSendingTranscation={this.state.metamaskSendingTranscation}
          sentTranscation={this.state.sentTranscation}
          txHash={this.state.txHash}
          sentTranscationError={this.state.sentTranscationError}
          pastName={this.state.pastName}          
          ref={(modal) => this.modalBuy = modal}
          account={this.state.account}
        />
        
        

      <div className='start-page-wrapper'>              
          <div className='current-price'>{this.state.currentPrice}</div>
          <div className='current-profit'>Profit: {this.state.currentProfit}</div>
          <div className='start-page-headline'>
            <div><span className='title-1'>Satoshi</span><span className='title-2'> says</span></div>
            <div className='start-page-headline-small'>A message on the blockchain that anyone can change</div>
          </div>
          <ConnectedEthLogo account={this.state.account} hasMetamask={this.state.hasMetamask} />
          <Particles className='particles-js-wrapper' params={ ParticleJSON } />
          <div className='start-page-moon-wrapper'>
            <div className='start-page-satoshi-bubble-wrapper'>
              {this.renderSatoshiImage()}
              <div className='start-page-speech-bubble-upvote-wrapper'>
                <div>
                  <div onClick={this.animateChangeMessageButton.bind(this)} className={`speech-bubble start-page-speech-bubble`}>
                    <p className='text'>{this.state.speechBubbleText}</p>
                    <p className='speech-bubble-quote'>- {this.state.name}</p>
                  </div>                  
                </div>             
                <UpvoteDownvote 
                  upvotes={this.state.upvotes}
                  ref={(upvoteComp) => this.upvoteComponent = upvoteComp}
                />
                <ShareComponent 
                  speechBubbleText={this.state.speechBubbleText}
                />
              </div>
            </div>
            <div className='start-page-rocket' alt="" />
            <div className='start-page-earth' alt="" />
            <div className='start-page-moon' alt="" />
            <div onMouseEnter={this.mouseEnterVitalik.bind(this)} className='vitalik' />
            <div onMouseEnter={this.mouseEnterVitalik.bind(this)} className={this.state.showVitalik ? 'vitalik vitalik-image vitalik-hover' : 'vitalik vitalik-image'} />            
          </div>
          {this.renderChangeSatoshiMessageButton()}
          
          <InfoModal  
            modalIsOpen={this.state.infomodalIsOpen}
            closeModal={() => this.setState({infomodalIsOpen: false})}
            openModal={() => this.setState({infomodalIsOpen:true})}
          />                                        
      </div>      
      <UnderMoon ref={(underMoonRef) => this.underMoonRef = underMoonRef} />            
      </div>
    );
  }
}

export default StartPage;
