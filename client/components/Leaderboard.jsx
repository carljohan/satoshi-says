import React, { Component } from 'react'
import database from './utils/firebase.js'
import LeaderboardRightSideComponent from './LeaderboardRightSideComponent.jsx';
import _ from 'lodash'


const databaseRef = database.ref('/timeOwned')
class Leaderboard extends Component {

    constructor (props) {
        super(props)
        this.state = {
            sortedArrayOfLeaderboard: []
        }
    }
    
    sortsTimeOwnedObject(timeOwnedObject) {
        let objectKeys = Object.keys(timeOwnedObject)
        let arrayOfObjects = []
        objectKeys.map((key) => {
            const currentObject = timeOwnedObject[key]
            currentObject.ownerAddress = key
            arrayOfObjects.push(currentObject)
        })

        return (_.orderBy(arrayOfObjects, 'time', 'desc'))
        
    }

    componentDidMount() {
        databaseRef.orderByChild('time').limitToLast(5).once('value', (timeOwnedObject) => {                                                    
            this.setState({
                sortedArrayOfLeaderboard: this.sortsTimeOwnedObject(timeOwnedObject.val())
            })       
        })
    }

    componentWillUnmount() {
      databaseRef.off()
    }


    renderSatoshiMood(timeOwnedObject) {
        if (timeOwnedObject) {           
            let imageOfSatoshi = ''
            switch (parseInt(timeOwnedObject.moodState)) {
              case 0:
                imageOfSatoshi = 'modal-halfhappy'
                break;
              case 1:
                imageOfSatoshi = 'modal-halfsad'                
                break;
              case 2:
                imageOfSatoshi = 'modal-halfangry'                      
                break;
              case 3:
                imageOfSatoshi = 'modal-halfthinking'
                break;
              case 4:
                imageOfSatoshi = 'modal-halfstoked'
                break;              
              default:
                break;
            }
            return (
                <div className={`leaderboard-first-place-mood ${imageOfSatoshi}`} />
            )
        }

    }
    




    renderLeaderboard() {
        if (this.state.sortedArrayOfLeaderboard) {
            return (
                <div>
                    {this.state.sortedArrayOfLeaderboard.map((timeOwnedObject, index) => {
                        if (index > 0) {
                            return (
                                <LeaderboardRightSideComponent
                                    key={timeOwnedObject.ownerAddress}
                                    timeOwnedObject={timeOwnedObject}
                                    index={index}
                                    renderSatoshiMood={this.renderSatoshiMood}
                                />
                            )                            
                        }
                    })}
                </div>
            )
        }
    }        

    renderLeftSideLeaderboard() {
        
        if (this.state.sortedArrayOfLeaderboard.length > 0) {
            const firstPlace = this.state.sortedArrayOfLeaderboard[0]

            let timeOwnedString = '';
            
            let totalMiliSecondsOwned = firstPlace.time
            if (totalMiliSecondsOwned / (1000*60*60) > 1) {
                const hoursOwned = Math.floor(totalMiliSecondsOwned / (1000*60*60))
                const minutesOwned = Math.floor((totalMiliSecondsOwned - hoursOwned*1000*60*60) / (1000*60))                        
                timeOwnedString = `Time Owned: ${hoursOwned} hours ${minutesOwned} minutes`                        
            } else {
                const minutesOwned = Math.floor((totalMiliSecondsOwned) / (1000*60))
                timeOwnedString = `Time Owned: ${minutesOwned} minutes`
            }

            let upvoteImageClass = ''
            if(firstPlace.upvotes >= 0) {
                upvoteImageClass = 'leaderboard-upvote'
            } else {
                upvoteImageClass = 'leaderboard-downvote'
            }
            const addressLink = `https://etherscan.io/address/${firstPlace.ownerAddress}`
            
            
            return (
                <div className='leaderboard-left-side'>
                    <div className='leaderboard-left-side-wrapper'>
                    <div className='leaderboard-headline'>Leaderboards</div>
                    
                    <div className='leaderboard-first-place-wrapper'>
                        <div className='leader-board-first-place-mood-upvote-wrapper'>
                            <div className='leaderboard-first-place-name-mood-time-wrapper'>
                                <div className='leader-board-mood-wrapper'>
                                    {this.renderSatoshiMood(firstPlace)}
                                    <div className='leaderboard-medal'>1</div>    
                                </div>  
                                
                            </div>                    
                            <div className={`leaderboard-upvote-downvote ${upvoteImageClass}`} />                            
                            <div className='left-side-upvotes'>
                                {firstPlace.upvotes}
                            </div>                            
                        </div>
                            <div className='firstplace-name'><a href={addressLink}>{firstPlace.name}</a></div>
                            <div className='firstplace-name'>{timeOwnedString}</div>     


                    </div>
                </div>   
                </div>
            )
        }
        
    }
    
    render () {
               //add data for the first leader 
        return (
            <div className='leaderboard-wrapper'>     
                <div className='leaderboard'>            
                    {this.renderLeftSideLeaderboard()}
                    <div className='leaderboard-right-side'>
                        {this.renderLeaderboard()}                    
                    </div>
                </div>
            </div>
            )
        }
    }
    
export default Leaderboard