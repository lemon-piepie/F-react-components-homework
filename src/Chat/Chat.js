import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  findAnswerMessage = (message) => {
    let answerMessage = []
    answersData.forEach(answer => {
      answer.tags.forEach(tag => {
        if (message.text.includes(tag)){
          answerMessage = answerMessage.concat(answer)
        }
      })
    })
    
    if(answerMessage != null){
      return answerMessage
    }
    return null
  }

  sendMessage = (message) => {
    let allMessage = this.state.messages.concat(message)

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages: allMessage,
      });
    }, 1000);

    setTimeout(() => {
      if(this.findAnswerMessage(message)!=null){
        allMessage = allMessage.concat(this.findAnswerMessage(message))
      }  
      this.setState({
        shop: shopData,
        messages: allMessage,
      });
    }, 1500);
  }

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput sendMessage={this.sendMessage}/>
      </main>
    );
  }
}

export default Chat;
