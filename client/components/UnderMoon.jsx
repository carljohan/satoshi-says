import React, { Component } from 'react'; import {Link} from 'react-router-dom';
import Leaderboard from './Leaderboard.jsx';
class UnderMoon extends Component { 
    scrollIntoView() {
        this.divToScrollTo.scrollIntoView({behavior: "smooth"})
        
    }
    
    renderTable() { return (
<div className='over-under-moon-table'>

   <div className="under-moon-table">
        <h2 className="under-moon-text">Example</h2>
        <div>
            <div className="table-row">
                <div className="table table-col1">
                    You change satoshi's message
                </div>
                <div className="table table-col2">
                    1 ETH
                </div>
            </div>
            <hr/>
            <div className='table-break'></div>
            <div className="table-row">
                <div className="table table-col1 ">
                    Next person change speech bubble
                </div>
                <div className="table table-col2">
                    1.06 ETH
                </div>
            </div>
            <div className="table-row">
                <div className=" table table-col1">
                    Developer fee
                </div>
                <div className="table table-col2">
                    0.01 ETH
                </div>
            </div>
            <hr/>
            <div className="table-row">
                <div className="table table-col1">
                    You get back
                </div>
                <div className="table table-col2">
                    1.05 ETH
                </div>
            </div>
            <div className="table-row">
                <div className="table table-col1">
                    Profit
                </div>
                <div className="table table-col2-profit">
                    0.05 ETH
                </div>
            </div>
        </div>
    </div>
</div>
) } render() { return (
<div className='under-moon-one'>
        <div className='under-moon-text'>

            <div className='what-section'>

                <div id='moon'>
                    <div className='craterCon'>
                        <div className='craters'></div>
                    </div>
                    <div className='glow'></div>
                </div>
                <div className='what-wrapper'>
                
            
                <div className='what-text-wrapper'>
                    <div ref={(divToScrollTo) => this.divToScrollTo = divToScrollTo} className='what-text'>
                        <h2 className="what-moon-text">What is this?</h2>
                            <p className='p-moon'>
                                A speech bubble anyone can change.
                            </p>
                            <p className='p-moon'>
                                Pay ether to write your message. The next person changing the message pays more, and the extra ether goes directly you. Spread your message using the hype of blockchain!
                            </p>
                            
                    </div>
                </div>

                <div className='satoshi-wrapper'>
                    <div className='satoshi-hello satoshi'>
                    </div>
                </div>
                </div>
            </div>

            
            <div className='example-section'>

                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>

                <div className='example-wrapper'>
                <div className='example-text-wrapper'>
                    {this.renderTable()}
                </div>

                <div className='satoshi-wrapper'>
                    <div className='satoshi-pointing satoshi'>
                    </div> 
                </div>
                </div>
            </div>

            
            {/* <div className='how-section'>

                <div className='how-wrapper'>
                <div className='satoshi-wrapper-2'>
                    <div className='satoshi-thinking satoshi'>
                    </div>
                </div> */}

                {/* <div className='how-text-wrapper'>
                    <div className='how-text'>
                        <h2 className="how-moon-text">How does it work?</h2>
                        <p className='p-moon'>
                            Change the text by sending ETH to a smart contract. If someone changes the
                            text after you, they pay your amount plus 20 % extra. This ETH goes directly to you minus a 5
                            % developer fee. So you profit 15 % by changing the text, as long as someone changes it after
                            you.
                        </p>


                        </div>
                    </div> */}
                {/* </div>
            </div> */}

        



            {/* // <div className='why-section'>
            //     <div className='why-wrapper'>
            //     <div className='satoshi-wrapper-2'>
            //         <div className='satoshi-happy satoshi'>
            //         </div>
            //     </div>

            //     <div className='why-text-wrapper'>
            //         <div className='why-text'>
            //             <h2 className="why-moon-text">But why?</h2>
            //             <p className='p-moon'>
            //                 The cryptocurrency community is more fragmented than ever. What the community needs is a true voice to follow. Satoshi-san is here to make your message heard.
            //             </p>

            //         </div>
            //     </div>
            // </div>
            // </div> */}

            <Leaderboard />

            <div className='more-buttons-section'>

                <div className='more-buttons-wrapper'>
                <div className='faq-section'>
                    <div className='more-title'>More questions?</div>

                    <Link to={'/faq'}><div className='more-buttons faq-button' >Read FAQ</div> </Link>
                        
                
                </div>
                <div className='wof-section'>
                    <div className='more-title'> See what Satoshi has said before</div>

                <Link to={'/halloffame'}><div className="more-buttons wof-button">Wall of fame</div></Link>
                </div>
            </div>
        </div>


    </div>
</div>


) } } export default UnderMoon;