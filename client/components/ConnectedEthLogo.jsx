import React, { Component } from 'react'

class ConnectedEthLogo extends Component {
    render () {
        let textToRender;
        if (this.props.hasMetamask && this.props.account) {
            if (this.props.account.length > 5) {
                textToRender = `Connected: ${this.props.account}`
            } else {
                textToRender = 'Offline'
            }
        
            return (
                <div className='connected-eth-logo-wrapper'>
                    <div className="connected-eth-logo">

                    </div>
                    <div className='connected-eth-logo-text'>
                        {textToRender}
                    </div>
                </div>
            )
        } else {
            return (
                null
            )
        } 
        
    }
}

export default ConnectedEthLogo