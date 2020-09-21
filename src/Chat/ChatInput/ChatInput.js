import React, { Component } from 'react';
import './ChatInput.scss';
import {ROLE} from "../../constants"

class ChatInput extends Component {
  state = {
    message:[],
  }

  handleInput = (event) => {
    this.setState({
      message:event.target.value
    })
  }

  handleSendMessage = () => {
    const message = {}
    message.role = ROLE.CUSTOMER
    message.text = this.state.message
    this.props.sendMessage(message)
  }

  render() {
    return (
      <footer className="ChatInput">
        <input type="text" value={this.state.message} onChange={this.handleInput}/>
        <button type="button" onClick={this.handleSendMessage}>Send</button>
      </footer>
    );
  }
}

export default ChatInput;
