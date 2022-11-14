import React, { Component } from 'react'
import Modal from 'react-modal';
import { Link } from 'react-router-dom';


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
        height: '590px',
        overflowY: 'hidden',
        padding: '0px',
        zIndex: '10',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        borderRadius: '10px'
    }
};

class InfoModal extends Component {
    
    closeModal() {
        this.props.closeModal()
    }

    openModal() {
        this.props.openModal()
    }
    render () {
        return (
            <div>
                <div onClick={this.openModal.bind(this)} className='info-modal-button'></div>
               <Modal
                 isOpen={this.props.modalIsOpen}          
                 onRequestClose={this.closeModal.bind(this)}
                 style={customStyles}
                 contentLabel="Example Modal"
                 ariaHideApp={false}
               >
               <div>
                    <div onClick={ this.closeModal.bind(this) } className='close-modal-button '> ✖ </div>               
                    <div className='info-modal-wrapper'>
                        
                            <div className='info-modal-headline'>What is this?</div> 
                            <div className='info-modal-body-text'>                        
                                A website with one speech bubble anyone can change. 
                                Satoshi’s message is controlled via a smart contract. 
                                It costs ether to change the message, but the next person who changes it pays more. 
                                This extra ether goes directly to the last person who owned the message. 
                            </div>


                            <div className='info-modal-headline'>
                                Why would you pay for Satoshis’ voice?
                            </div>

                            <div className='info-modal-body-text'>
                                <a href='https://wikipedia.org/wiki/Satoshi_Nakamoto' className='info-modal-link'> Satoshi’s</a> voice is highly regarded. The message is seen by thousands of visitors and echoed throughout the internet. Also, if someone changes it after you, you’ll get your ether back plus 6 % (minus a 1% dev fee). Free exposure plus a chance to profit. More important, you’ll end up as a former owner in the <Link to='/halloffame' className='info-modal-link'> Hall of Fame </Link>.                                
                            </div>
                            
                            <div className='info-modal-headline'>
                                Example
                            </div>
                            <div className='info-modal-example'>   
                                <div>
                                    <div>
                                        You change Satoshi's message 1 ETH
                                    </div>                                    
                                    <div>
                                        Next Person pays  1.06 ETH
                                    </div>                                    
                                </div>                             
                                <div>
                                    <div>
                                        Dev Fee 0.01 ETH
                                    </div>                                    
                                    <div>
                                        You get back 1.05 ETH
                                    </div>                                    
                                </div>
                            </div>
                            <div className='info-faq-button-wrapper'>
                                <Link to='/faq'>
                                    More questions?
                                    <div className='more-buttons faq-button' >Read FAQ</div>
                                </Link>
                            </div>
                        </div>
                    </div>
               </Modal> 
            </div>
        )
    }
}

export default InfoModal