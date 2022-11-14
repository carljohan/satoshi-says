import React, { Component } from 'react';
import isUrl from 'is-url'
import Modal from 'react-modal';
import ButtonForMoodModal from './ButtonForMoodModal.jsx';
import happy from '../images/happy.svg'
import _ from 'lodash'
import axios from 'axios'


const customStyles = {
    overlay: {
      position: 'fixed',
      zIndex: 10,      
      top: 0,
      left: 0,
      right: 0,
      bottom: 0      
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '850px',
        height: '555px',
        overflow: 'hidden',
        padding: '0px',
        zIndex: '20',        
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        border: 'none',
        boxShadow: '3px 3px 5px 3px rgba(190,190,190,0.50)'
    
    }
};

let maxCharText = 180
let maxCharName = 25

class ModalBuy extends Component {

    constructor(props) {
        super(props)

        this.state = {            
            inputFieldText: 'Write your personal message!',
            inputFieldName: '',
            showMessageModal: true,
            showMoodModal: false,
            moodSelected: 3,
            inputFieldNameOk: true,
            inputFieldTextOk: false,
            noClick: true,
            loadingTransaction: false,
            testState: false,
            emailAdded: false,
            email: ''
        }

        this.openModal = this.openModal.bind(this);
        
        this.closeModal = this.closeModal.bind(this);
    }

    addEmail() {
        // axios({
        //     method: 'post',
        //     url: `${window.location.href}upvote${numbervotes}`,
        //     data: {
        //         captcha     
        //     }
        // })
        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(this.state.email).toLowerCase())) {
          this.setState({
              email: 'not an email'
          })  
        } else if (!this.state.emailAdded) {
            axios({
                method: 'post',
                url: `${window.location.href}addemail`,
                data: {
                    address: this.props.account,
                    email: this.state.email     
                }
            })
            this.setState({
                email: 'Email added!',
                emailAdded: true
            })
        }        
        
    }

    updateInputName() {
        this.setState({
            inputFieldName: this.props.pastName
        })
    }

    openModal() {
    this.props.openModal()
  }
  

  closeModal() {
    this.props.closeModal()
  }

  changeInputFieldText(e) {
    //check if string is url
    if (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(e.target.value)) {
        
        this.setState({
            triesLinkText: true
        })           
    } else {
        this.setState({
            inputFieldText: e.target.value,
            inputFieldTextOk: true,
            triesLinkText: false,
            changeTheText: false
        })        
    }
  }
  
  changeInputFieldName(e) {

    if (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(e.target.value)) {        
        this.setState({
            triesLinkName: true
        }) 
    } else {
        this.setState({
            inputFieldName: e.target.value,
            inputFieldNameOk: true,
            triesLinkName: false,
            
        })
    }
  }

  changeToMessage() {
    this.setState({
        showMessageModal: true,
        showMoodModal: false,
        showMagicModal: false
    })
  }

  changeToMood() {
      if (this.state.inputFieldNameOk
        && this.state.inputFieldTextOk
        && this.state.inputFieldName.length <= maxCharName
        && this.state.inputFieldText.length <= maxCharText) {
            this.setState({
                showMessageModal: false,
                showMoodModal:true,
                showMagicModal: false
            })
        }

        if (!this.state.inputFieldTextOk) {
            this.setState({
                changeTheText: true
            })
        }
  }

    changeToMagic() {
        if (this.state.inputFieldNameOk
        && this.state.inputFieldTextOk
        && this.state.inputFieldName.length <= maxCharName
        && this.state.inputFieldText.length <= maxCharText) {
            this.setState({
            showMessageModal: false,
            showMoodModal:false,
            showMagicModal: true
            })
        }
        if (!this.state.inputFieldTextOk) {
            this.setState({
                changeTheText: true
            })
        }
        
        
    }

    renderModalCategorys() {

        return (
            <ul>
            <li className={this.state.showMessageModal ? 'modal-category-selected' : ''} onClick={this.changeToMessage.bind(this)}>
                Message
            </li>
            <li className={this.state.showMoodModal ? 'modal-category-selected' : ''} onClick={this.changeToMood.bind(this)}>
                Mood
            </li>
            <li className={this.state.showMagicModal ? 'modal-category-selected' : ''} onClick={this.changeToMagic.bind(this)}>
                Payment
            </li>
            </ul>
        )
    }
    firstClickTextArea() {
        //deletes state when click first
        
        
        if (this.state.noClick) {                        
            this.setState({
                noClick: false,
                inputFieldText: ''
            })
        }
    }

    setFocusOnInput() {
        this.textAreaText.focus()
        this.firstClickTextArea()
    }

  renderMessage() {
    let classForInputText = this.state.inputFieldText.length > maxCharText ? 'input-too-long' : ''            
    let classForInputName = this.state.inputFieldName.length > maxCharName ? 'input-too-long' : ''
    let classForButton = ''
    if (
    this.state.triesLinkText
    || !this.state.inputFieldNameOk
    || this.state.changeTheText 
    || classForInputText === 'input-too-long'
    || this.state.triesLinkName 
    || classForInputName === 'input-too-long') {
        classForButton = 'modal-next-button-not-allowed'        
        
    }
      return (
          <div className='modal-container'>
        <div className='left-side-modal'>
                  <div className="speech-bubble" onClick={this.setFocusOnInput.bind(this)}>
                    <p className='text'>{this.state.inputFieldText}</p>
                    <p className='speech-bubble-quote'>- {this.state.inputFieldName}</p>
                  </div>  
                </div>
                <div className='right-side-modal'>
                    <div>
                        <div>
                        <div>
                              <div className='modal-title'>
                                  <span className='satoshi-title'>Satoshi</span><span className='satoshi-title-2'> says</span>
                              </div>
                            <p className='modal-subtitle'>Write your message</p>
                        {this.renderModalCategorys()}
                                                               
                        <div className='modal-subtitle'>Your message</div>  
                        <textarea
                            onClick={this.firstClickTextArea.bind(this)}
                            className='modal-input-field-text'
                            onChange={(e) => this.changeInputFieldText(e)} 
                            value={this.state.inputFieldText} 
                            type="text"
                            ref={(textarea) => this.textAreaText = textarea}
                        />
                        <div className={`modal-counter ${classForInputText}`}>
                            {this.state.inputFieldText.length} / {maxCharText}
                            {this.state.triesLinkText ? <span className='input-too-long'> No Links</span> : ''}
                            {this.state.changeTheText ? <span className='input-too-long'> Change the text</span> : ''}
                            {classForInputText === 'input-too-long' ? <span className='input-too-long'> Too long</span> : ''}
                        </div>     
                        <div className='modal-subtitle'>Your name</div>           
                        <input 

                        className = 'modal-input-field-name'
                        value={ this.state.inputFieldName } onChange={(e) => this.changeInputFieldName(e)} type="text" />
                        <div className={`modal-counter ${classForInputName}`}>
                            {this.state.inputFieldName.length} / {maxCharName}
                            {this.state.triesLinkName ? <span className='input-too-long'> Links not allowed</span> : ''}
                            {classForInputName === 'input-too-long' ? <span className='input-too-long'> Too long</span> : ''}
                        </div>
                        </div> 
                        </div>                       
                        <div onClick={this.changeToMood.bind(this)} className={`modal-next-button ${classForButton}`}>Next</div>
                    </div>                
                </div>
                </div>

      )
  }

  onClickChangeMood(currentId) {
      this.setState({
          moodSelected: currentId
      })
  }

  renderSatoshiMoodImages() {
      let imageOfHalfBodySatoshi;

      switch (this.state.moodSelected) {
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
          <div className='modal-half-body-wrapper'>
            <div className={`modal-half-body ${imageOfHalfBodySatoshi}`}></div>
          </div>
      )
  }

  renderMoodModal() {
      return (
          <div className='modal-container'>
        <div className='left-side-modal'>
            {this.renderSatoshiMoodImages()}
        </div>
        <div className='right-side-modal'>
            <div>
                <div>
                <div className='modal-title'>
                    <span className='satoshi-title'>Satoshi</span><span className='satoshi-title-2'> says</span>
                </div>
                          <p className='modal-subtitle'>Select Satoshi’s mood</p>
                {this.renderModalCategorys()}                
                <div className='mood-button-wrapper'>
                    <ButtonForMoodModal title='Happy'
                        moodId = {0}
                        selected={this.state.moodSelected} 
                        onClickChangeMood = {this.onClickChangeMood.bind(this)}
                    
                    />
                    <ButtonForMoodModal 
                        title='Sad'
                        moodId = {1}
                        selected={this.state.moodSelected} 
                        onClickChangeMood = {this.onClickChangeMood.bind(this)}
                    
                    />
                    <ButtonForMoodModal 
                        title='Angry'
                        moodId = {2}
                        selected={this.state.moodSelected} 
                        onClickChangeMood = {this.onClickChangeMood.bind(this)}
                    
                    />
                    <ButtonForMoodModal 
                        title='Thinking'
                        moodId = {3}
                        selected={this.state.moodSelected} 
                        onClickChangeMood = {this.onClickChangeMood.bind(this)}
                    
                    />
                    <ButtonForMoodModal 
                        title='Stoked'
                        moodId = {4}
                        selected={this.state.moodSelected} 
                        onClickChangeMood = {this.onClickChangeMood.bind(this)}
                    
                    />
                </div>
                </div>
                <div onClick={ this.changeToMagic.bind(this) } className='modal-next-button'>Next</div>
            </div>
        </div>
        </div>
      )
  }



  renderTransactionCompletion() {
      let adress ='https://etherscan.io/tx/'
      
       if (this.props.sentTranscation) {
          return (
              <div>
                  <div className='transaction-dimmer'>
                      <div className='pending-transaction'>
                          <div className='transaction-title'>Transaction successful!</div>
                          <div className='transaction-info'>Click <a target="_blank" href={adress + this.props.txHash}>here</a>  to to view transaction</div>
                          <div className='load-complete'></div>
                          <div onClick={this.props.closeModal.bind(this)} className='close-transaction-complete'>Close</div>
                          <div className='email-info'>
                          Want to get notified if someone changes the message after you?
                          </div>
                          <div className='email-wrapper'>
                          <input 
                           className = 'email-input'
                           value={ this.state.email } onChange={(e) => this.setState({email: e.target.value})} type="text" />
                           <div className='email-button' onClick={this.addEmail.bind(this)}>Add your email!</div>
                          </div>
                            <div className='email-info'>
                                <a href='https://twitter.com/Satoshi__Says'>When your transaction is complete it will be on twitter @Satoshi__Says</a>
                            </div>
                          
                      </div>
                  </div>
                
              </div>
          )
      } else if (this.props.sentTranscationError) {
          return (
              <div className='transaction-dimmer'>
                  <div className='pending-transaction'>
                      <div className='transaction-title'>Some error occurred :( </div>
                      <div className='transaction-info'>Click <a target="_blank" href={adress + this.props.txHash}>here</a> to see what went wrong</div>
                  </div>
              </div>
          )
      } 
       else if (this.props.metamaskSendingTranscation) {
           return (
               <div className='transaction-dimmer'>
                   <div className='pending-transaction'>
                       <div className='transaction-title'>Transaction pending...</div>
                       <div className='transaction-info'>This might take up to a few minutes for the network to confirm the transaction in a block. Click  <a target="_blank" href={adress + this.props.txHash}>here</a>  to see transaction staus</div>

                       <div className='circle-loader'>
                           {/* {this.renderTransactionCompletion()} */}
                           {/* <div className={`checkmark draw ${classToChangeUselessAnimation}`}></div> */}
                       </div>
                       <div className='email-info'>
                       Want to get notified if someone changes the message after you?
                       </div>
                       <div className='email-wrapper'>
                       <input 
                        className = 'email-input'
                        value={ this.state.email } onChange={(e) => this.setState({email: e.target.value})} type="text" />
                        <div className='email-button' onClick={this.addEmail.bind(this)}>Add your email!</div>
                       </div>
                       <div className='email-info'>
                           When your message is sent it will also be on twitter <a href='https://twitter.com/Satoshi__Says'>@Satoshi__Says</a>
                       </div>
                   </div>
               </div>
           )
       }
       else if (this.state.loadingTransaction) {
          return (
            <div className='metamask-loading'>
              Waiting for Metamask...
              <div className='metamask-loading-donut'>
              </div>
            </div>
          )          
      }

  }
  changeWhatSatoshiSays() {
      this.setState({loadingTransaction:true})
      this.props.changeWhatSatoshiSays(this.state.inputFieldText, this.state.moodSelected, this.state.inputFieldName)
  }

  renderMagicModal() {
      return (
          <div className='modal-container'>
        <div className='left-side-modal'>
                <div className='modal-magic'>
                  <div className='magic-title'><h2>How to buy using Metamask</h2></div>
                      <div className='metamask-video'><iframe width="300" height="170" src="https://www.youtube.com/embed/6Gf_kRE4MJU?start=6" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen="allowFullScreen"></iframe>  </div>          
                </div>
        </div>
        <div className='right-side-modal'>
            <div>
                <div>
                          <div className='modal-title'>
                              <span className='satoshi-title'>Satoshi</span><span className='satoshi-title-2'> says</span>
                          </div>
                        <p className='modal-subtitle'>Final touches</p>
                    {this.renderModalCategorys()}
                    <div className='price-table'>

                    <div className='price-tabel-row'>
                        <div className='message-price'>Price</div>
                              <div className='message-price-number'> {this.props.currentPrice}</div>
                        </div>

                        <hr className='lb-div'/>   

                    <div className='price-tabel-row'>
                        <div className='message-profit'>Potential profit*</div>
                              <div className='message-profit-number'>5 %</div>
                        </div>
                    
                    <div className='disclaimer'>*Disclaimer: You might lose your ether if no one buys after you</div>

                    </div>
                    {this.renderTransactionCompletion()}                    
                </div>     

                      <div onClick={ /*() =>this.setState({testState:true})*/this.changeWhatSatoshiSays.bind(this)} className='modal-final-button'>Press to open metamask</div>
            </div>
        </div>
        </div>
      )
  }


  

    renderMetamaskTransactionModal(){
        // let classToChangeUselessAnimation = ''
        // if (this.state.testState) {
        //     classToChangeUselessAnimation ='checkmark'
        //     console.log("lol")
        // }
        // if()
        // else 
    
    }

  renderModalContent() {

       if (this.state.showMessageModal) {
          return (
              this.renderMessage()
          )
      } else if (this.state.showMoodModal) {
          return (
                this.renderMoodModal()
          )
      } else if (this.state.showMagicModal) {
          return (
            this.renderMagicModal()
          )
      }
  }

  render() {            
    
    return (
      <div id='main'>    
        <Modal
          isOpen={this.props.isOpen}          
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >

        {this.renderMetamaskTransactionModal()}
            <div>
                <div onClick={this.closeModal.bind(this)} className='close-modal-button '> ✖ </div>
            {this.renderModalContent()}
             </div>
        </Modal>
      </div>
    );
  }
}

export default ModalBuy;