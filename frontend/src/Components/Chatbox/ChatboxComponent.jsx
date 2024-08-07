import React, { useEffect, useRef } from 'react';
import './Chatbox.css';
import chatboxIcon from '../../images/chatbox-icon.svg';

class Chatbox {
  constructor() {
    this.args = {
      openButton: null,
      chatBox: null,
      sendButton: null,
    };

    this.state = false;
    this.messages = [];
  }

  display(openButton, chatBox, sendButton) {
    this.args = { openButton, chatBox, sendButton };

    openButton.addEventListener('click', () => this.toggleState(chatBox));
    sendButton.addEventListener('click', () => this.onSendButton(chatBox));

    const node = chatBox.querySelector('input');
    node.addEventListener("keyup", ({ key }) => {
      if (key === "Enter") {
        this.onSendButton(chatBox);
      }
    });
  }

  toggleState(chatbox) {
    this.state = !this.state;

    if (this.state) {
      chatbox.classList.add('chatbox--active');
    } else {
      chatbox.classList.remove('chatbox--active');
    }
  }

  onSendButton(chatbox) {
    var textField = chatbox.querySelector('input');
    let text1 = textField.value;
    if (text1 === "") {
      return;
    }

    let msg1 = { name: "User", message: text1 };
    this.messages.push(msg1);

    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      body: JSON.stringify({ message: text1 }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(r => r.json())
      .then(r => {
        let msg2 = { name: "Sam", message: r.answer };
        this.messages.push(msg2);
        this.updateChatText(chatbox);
        textField.value = '';
      })
      .catch((error) => {
        console.error('Error:', error);
        this.updateChatText(chatbox);
        textField.value = '';
      });
  }

  updateChatText(chatbox) {
    var html = '';
    this.messages.slice().reverse().forEach(function (item) {
      if (item.name === "Sam") {
        html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
      } else {
        html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
      }
    });

    const chatmessage = chatbox.querySelector('.chatbox__messages');
    chatmessage.innerHTML = html;
  }
}

const ChatboxComponent = () => {
  const chatboxRef = useRef(null);

  useEffect(() => {
    const chatbox = new Chatbox();

    const openButton = document.querySelector('.chatbox__button button');
    const chatBox = document.querySelector('.chatbox__support');
    const sendButton = document.querySelector('.send__button');

    if (openButton && chatBox && sendButton) {
      chatbox.display(openButton, chatBox, sendButton);
    } else {
      console.log("Buttons not found:", { openButton, chatBox, sendButton });
    }

    return () => {
      if (openButton) openButton.removeEventListener('click', () => chatbox.toggleState(chatBox));
      if (sendButton) sendButton.removeEventListener('click', () => chatbox.onSendButton(chatBox));
    };
  }, []);

  return (
    <div className="container" ref={chatboxRef}>
      <div className="chatbox">
        <div className="chatbox__support">
          <div className="chatbox__header">
            <div className="chatbox__image--header">
              <img src="https://img.icons8.com/?size=100&id=52997&format=png&color=000000" alt="Chatbox Icon" />
            </div>
            <div className="chatbox__content--header">
              <h4 className="chatbox__heading--header">Chat support</h4>
              <p className="chatbox__description--header">Hi. I am Captain. How can I help you?</p>
            </div>
          </div>
          <div className="chatbox__messages">
            <div></div>
          </div>
          <div className="chatbox__footer">
            <input type="text" placeholder="Write a message..." />
            <button className="chatbox__send--footer send__button">Send</button>
          </div>
        </div>
        <div className="chatbox__button">
          <button>
            <img src={chatboxIcon} alt="Chatbox icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatboxComponent;
