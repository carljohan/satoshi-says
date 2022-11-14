import React, { Component } from 'react';

class ButtonForMoodModal extends Component {

    changeState() {
        this.props.onClickChangeMood(this.props.moodId)
    }
    render() {
        let classExtra = ''
        if (this.props.selected === this.props.moodId) {
            classExtra = 'mood-modal-button-selected'
        }
        return (
                <div className='mood-button-button-wrapper'>
                <div onClick={this.changeState.bind(this)} className={`mood-modal-button ${classExtra}`}>
                    
                </div>
                {this.props.title}
            </div>
        );
    }
}

export default ButtonForMoodModal;