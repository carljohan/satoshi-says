import React, { Component } from 'react'
import database from './utils/firebase.js'
import ReCaptcha from 'react-google-recaptcha'
import axios from 'axios'

class UpvoteDownvote extends Component {
    constructor (props) {
        super(props)
        this.state = {
            upvoted: false,
            downvoted: false,
            hasVoted: false,            
            canUseRecaptcha: true
        }
    }   
    
    setHasVotedToFalse() {
        this.setState({
            hasVoted: false,
            upvoted: false,
            downvoted: false
        })
    }
    upvote() {        
        if (!this.state.upvoted) {
        this.setState({
            upvoted: true,
            downvoted: false
        }, () => {
            this.recaptcha.execute()
        })      
        }
    }

    downvote() {
        if (!this.state.downvoted) {
            this.setState({
                downvoted: true,
                upvoted: false
            }, () => {
                this.recaptcha.execute()
            })
        }
            
        
    }
    

    changeCaptcha(captcha) {          
      //CHANGE LOCALHOST TO NETWORK
       let numbervotes = ''
    if (this.state.hasVoted) {
        numbervotes = '2'
    } else {
        this.setState({
            hasVoted: true
        })
    }
      if (this.state.upvoted) {      
          axios({
                method: 'post',
                url: `${window.location.href}upvote${numbervotes}`,
                data: {
                    captcha     
                }
            })
      } else if (this.state.downvoted) {
          axios({
              method: 'post',
              url: `${window.location.href}downvote${numbervotes}`,
              data: {
                  captcha     
              }
          })
      }
      this.recaptcha.reset()      
      
    }


    render () { 
        let upvotedDownVotedClass = '';
        if (this.state.upvoted) {
            upvotedDownVotedClass = 'upvoted'
        } else if (this.state.downvoted) {
            upvotedDownVotedClass = 'downvoted'
        }
        return (
            <div className={`upvote-downvote-wrapper ${upvotedDownVotedClass}`}>
                <div onClick={this.upvote.bind(this)} className='upvote upvote-downvote'></div>
                <div className='upvote-counter'>{this.props.upvotes}</div>
                <div onClick={this.downvote.bind(this)} className='downvote upvote-downvote'></div>
                <ReCaptcha
                    ref={(e) => {this.recaptcha = e}}
                    sitekey="6LdJjUsUAAAAAC_DpxKOLUIm-X0MfYHT3gY4aUdF"
                    onChange={this.changeCaptcha.bind(this)}
                    size='invisible'                    
                />
            </div>
        )
    }
}

export default UpvoteDownvote