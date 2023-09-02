import React, { Component } from 'react';
import axios from 'axios';
import './ChatComponent.css'; // Import your CSS file for styling
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import SendIcon from '@mui/icons-material/Send';
import BotIMg from "assets/images/avatars/avatar2.png";
import UserImg from "assets/images/avatars/avatar1.jpg";
class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        // Initial bot message
        {
          text: "Hello! How can I assist you?",
          type: 'bot',
        }
      ],
      input: '',
      loading: false,
    };
  }

  handleInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { input, messages } = this.state;

    if (input.trim() === '') return;

    const userMessage = { text: input, type: 'user' };
    
    // Add user's message to the conversation
    this.setState({
      messages: [...messages, userMessage],
      input: '',
      loading: true,
    });

    try {
      const response = await axios.post('http://localhost:8008/get_chat_answer', {
        question: input,
      });

      const botMessage = { text: response.data, type: 'bot' };

      // Add chatbot's response to the conversation
      this.setState((prevState) => ({
        messages: [...prevState.messages, botMessage],
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error gracefully
      const errorMessage = { text: 'Error fetching data.', type: 'error' };
      this.setState((prevState) => ({
        messages: [...prevState.messages, errorMessage],
        loading: false,
      }));
    }
  };

  render() {
    const { messages, input, loading } = this.state;

    return (
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index}>
              {message.type === 'user' ? (
                <div className="user-message">
                  <img src={UserImg} alt="User Avatar" className="avatar" />
                  {message.text}
                </div>
              ) : (
                <div className="bot-message">
                  <img src={BotIMg} alt="Bot Avatar" className="avatar" />
                  {message.text}
                </div>
              )}
            </div>
          ))}
          {loading && 
            <div className="bot-message">
                  <img src={BotIMg} alt="Bot Avatar" className="avatar" />
            <Box sx={{width:"100%"}}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
    </div>}
        </div>
        <form className="chat-input" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter your question..."
            value={input}
            onChange={this.handleInputChange}
            disabled={loading}
          />
          <button type="submit" disabled={loading}><SendIcon fontSize='medium'/></button>
        </form>
      </div>
    );
  }
}

export default ChatComponent;
