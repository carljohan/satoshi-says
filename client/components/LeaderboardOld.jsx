import React, { Component } from 'react'
import database from './utils/firebase.js'

const databaseRef = database.ref('/timeOwned')
class Leaderboard extends Component {

    constructor (props) {
        super(props)
        this.state = {
            objectWithTimeOwned: {}
        }
    }
    

    componentDidMount() {
        databaseRef.orderByChild('time').limitToLast(5).once('value', (timeOwnedObject) => {
            this.setState({
                objectWithTimeOwned: timeOwnedObject.val()
            })       
        })
    }

    componentWillUnmount() {
      databaseRef.off()
    }

    renderLeaderboardList() {
        if (this.state.objectWithTimeOwned) {            
            const arraysOfKeys = Object.keys(this.state.objectWithTimeOwned)
            return (
                arraysOfKeys.map((address) => {
                    const totalMiliSecondsOwned = this.state.objectWithTimeOwned[address].time
                    const name = this.state.objectWithTimeOwned[address].name
                    let timeOwnedString;
                    if (totalMiliSecondsOwned / (1000*60*60) > 1) {
                        const hoursOwned = Math.floor(totalMiliSecondsOwned / (1000*60*60))
                        const minutesOwned = Math.floor((totalMiliSecondsOwned - hoursOwned*1000*60*60) / (1000*60))                        
                        timeOwnedString = `Time owned: ${hoursOwned} hours ${minutesOwned} minutes`                        
                    } else {
                        const minutesOwned = Math.floor((totalMiliSecondsOwned) / (1000*60))
                        timeOwnedString = `Time owned: ${minutesOwned} minutes`
                    }
                    //TODO: CHANGE RINKEBY TO MAINNET
                    return (
                        <div key={address}>
                            <div>
                                <a href={`https://etherscan.io/address/${address}`}>{name}</a>   
                            </div>
                            <div>
                                {timeOwnedString}
                            </div>
                        </div>
                    )
                })
            )
            
        }
    } 



            

    
    render () {
        return (

    
            <div>
            <div className='leaderboard'>
            <div className='lb-left-wrapper'>
                <div className='lb-left'>
                    <h2 className='leaderboard-title'>Leaderboards</h2>

                    <div className='row-1'>
                        <div className='col-1'>
                        <div className='leaderboard-image-big'></div>
                        <div className='place-big'>1</div>
                        </div>
                    <div className='col-2'>
                        <div className='upvote-big'>577</div>
                    </div>
                    </div>
                    <div className='username-big'>satoshi-san</div>
                    <div className='timestamp-big'>01:58:24</div>
                </div>
                </div>
            <div className='lb-right-wrapper'>
                <div className='lb-right'>
                
                <div className='table-row'>
                    <div className='table-col-1'>
                            <div className='leaderboard-image-small'></div>    
                                <div className='place-small'>2</div>                
                    </div>
                    <div className='table-col-2'>
                            <div className='username-small'>suckMyFickz</div>
                            <div className='timestamp-small'>01:58:24</div>
                    </div>
                    <div className='table-col-3'>
                            <div className='upvotes'>248</div>
                    </div>
                </div>

                    <hr className='lb-div' />
                    <div className='table-row'>
                        <div className='table-col-1'>
                            <div className='leaderboard-image-small'>
                                <div className='place-small'>2</div>
                            </div>
                        </div>
                        <div className='table-col-2'>
                            <div className='username-small'>suckMyFickz</div>
                            <div className='timestamp-small'>01:58:24</div>
                        </div>
                        <div className='table-col-3'>
                            <div className='upvotes'>248</div>
                        </div>
                    </div>

                            <hr className='lb-div' />
                    <div className='table-row'>
                        <div className='table-col-1'>
                            <div className='leaderboard-image-small'>
                                <div className='place-small'>2</div>
                            </div>
                        </div>
                        <div className='table-col-2'>
                            <div className='username-small'>suckMyFickz</div>
                            <div className='timestamp-small'>01:58:24</div>
                        </div>
                        <div className='table-col-3'>
                            <div className='upvotes'>248</div>
                        </div>
                    </div>

                            <hr className='lb-div' />
                    <div className='table-row'>
                        <div className='table-col-1'>
                            <div className='leaderboard-image-small'>
                                <div className='place-small'>2</div>
                            </div>
                        </div>
                        <div className='table-col-2'>
                            <div className='username-small'>suckMyFickz</div>
                            <div className='timestamp-small'>01:58:24</div>
                        </div>
                        <div className='table-col-3'>
                            <div className='upvotes'>248</div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>


                {/* Leaderborads yo
                <div>
                    {this.renderLeaderboardList()}
                </div> */}
            </div>
        )
    }
}

export default Leaderboard