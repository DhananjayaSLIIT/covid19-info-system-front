import {ImCross, ImWarning} from 'react-icons/im';
import React from "react";
import '../../css/message_modal.css';

export default class MessageModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message:'',
            messageImage:''
        }
        this.modalImage = this.modalImage.bind(this);
        this.modalMessage = this.modalMessage.bind(this);
    }
    modalImage(){
        if(this.props.responseCode === 200){
            return '/images/checkmark.gif'
        }else if(this.props.responseCode === 404){
            return '/images/404error.gif'
        }else if(this.props.responseCode === 201){
            return '/images/checkmark.gif'
        }else if(this.props.responseCode === 400){
            return '/images/popuperror.gif'
        }else if(this.props.responseCode === 500){
            return '/images/popuperror.gif'
        }else{
            return '/images/popuperror.gif'
        }
    }
    modalMessage(){
        return this.props.message
    }
    render() {
        const Classname = this.props.show ? "cen-modal cen-display-block" : "cen-modal cen-display-none";
        return (
            <div className={Classname}>
                <section className="cen-modal-main">
                    <div className="cen-inner-content">
                        <button style={{color: 'grey', border: '0px', float: 'right'}} onClick={this.props.closeHandler}><ImCross/>
                        </button>
                        {/*<center><h2 style={{height:"50px",fontSize:"24px"}}>System message</h2></center>*/}
                        <div className="_message_box">
                            <div className='_message_box_inner'>
                                <div className='_message_box_item'
                                     style={{display: 'flex', alignItems: "center", justifyContent: "center"}}>
                                    <img src={this.modalImage()} style={{width: '200px', height: 'auto'}}/>
                                </div>
                                <div className='_message_box_item'
                                     style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                                    <h6>{this.modalMessage()}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
