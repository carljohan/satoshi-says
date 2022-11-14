import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class LeaderboardRightSideComponent extends Component {
    
    

    renderMedal() {
        if (this.props.index < 3) {
            return (
                <div className={`leaderboard-medal leaderboard-medal-${this.props.index}`}>{this.props.index + 1}</div>
            )
        }
    }

    render () {
        //
        let timeOwnedString = '';
        let upvoteImageClass = ''
        let addressLink = ''
        if (this.props.timeOwnedObject) {
            let totalMiliSecondsOwned = this.props.timeOwnedObject.time
            if (totalMiliSecondsOwned / (1000*60*60) > 1) {
                const hoursOwned = Math.floor(totalMiliSecondsOwned / (1000*60*60))
                const minutesOwned = Math.floor((totalMiliSecondsOwned - hoursOwned*1000*60*60) / (1000*60))                        
                timeOwnedString = `Time Owned: ${hoursOwned} hours ${minutesOwned} minutes`                        
            } else {
                const minutesOwned = Math.floor((totalMiliSecondsOwned) / (1000*60))
                timeOwnedString = `Time Owned: ${minutesOwned} minutes`
            }

            //upvotes            
            if(this.props.timeOwnedObject.upvotes >= 0) {
                upvoteImageClass = 'leaderboard-upvote'
            } else {
                upvoteImageClass = 'leaderboard-downvote'
            }

            addressLink = `https://etherscan.io/address/${this.props.timeOwnedObject.ownerAddress}`

        }                
        return (
                      
            <div className='leaderboard-right-side-component-wrapper'>                
                <div className='leader-board-mood-wrapper'>
                    {this.props.renderSatoshiMood(this.props.timeOwnedObject)}
                    {this.renderMedal()}                    
                </div>
                <div className='leaderboard-right-side-name-time-wrapper'>
                    <div>
                        <a href={addressLink}> {this.props.timeOwnedObject.name} </a>
                    </div>
                    <div>
                        {timeOwnedString}
                    </div>
                </div>
                <div className='leaderboard-right-side-component-upvotes-wrapper'>
                    <div className={`leaderboard-upvote-downvote ${upvoteImageClass}`} />                    
                    <div className='leaderboard-upvote-number'>
                        {this.props.timeOwnedObject.upvotes}
                    </div>
                </div>
            </div>
                        
        )
    }
}

export default LeaderboardRightSideComponent