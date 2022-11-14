import React, { Component } from 'react'

class ShareComponent extends Component {
    

    // renderFacebookButton() {
    //   return (
          
    //     <div className="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-size="small" data-mobile-iframe="true">
    //     <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Dela</a></div>
        
    //   ) http://Satoshi-Says.com/
    // }

    render () {
        return (
            <div className='share-component-wrapper'>
                <a href={`https://twitter.com/intent/tweet?hashtags=SatoshiSays&original_referer=http%3A%2F%2Flocalhost%3A8080%2F&ref_src=twsrc%5Etfw&related=Satoshi__Says&text=Satoshi%20Says%3A%20%22${this.props.speechBubbleText}%22%20see%20more%20at&tw_p=tweetbutton&url=http%3A%2F%2Fwww.satoshisays.co%2F`}>
                    <div className='share-twitter-logo' />
                </a> 
                <a target="_blank" href='https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fsatoshisays.co' className="fb-xfbml-parse-ignore">                                   
                    <div className='share-fb-logo'/>                                    
                </a>
            </div>
        )
    }
}

export default ShareComponent