import axios from "axios";
import Time from "../utils/time";
import template, { messageTemplate} from './chat.tpl'
import Menu from "./menu";
import HTMLDom from "../utils/htmldom";
import io, { Socket } from 'socket.io-client';
import DifferedPromise from "./differed-promise";
import Profile, { UserProfile } from "../utils/profile";
import * as constant from '../config/constant.json';

export default class Chat {
  template: string = template;
  container: HTMLElement;
  socket?: Socket;
  renderingPromise: DifferedPromise<boolean>;

  roomId: number = 0;
  counterpart : UserProfile;
  me: UserProfile;

  constructor(container, counterpartUserId) {
    this.container = document.querySelector(container);
    this.counterpart = {id: counterpartUserId , nickname: ''};

    this.renderingPromise = new DifferedPromise<boolean>();
      const counterpartProfilePromise = Profile.retrieveProfile(false, counterpartUserId, false);
      const myProfilePromise = Profile.retrieveProfile(true, undefined, false);
      const chatRoomPromise = this.getChatRoomInfo();
      
      Promise.all([ myProfilePromise,counterpartProfilePromise, chatRoomPromise]).then(values => {
        this.me = values[0];
        this.counterpart = values[1];
        this.roomId = values[2];


        console.log('counterpart',this.counterpart);
        console.log('me',this.me);

        this.initChatRoom();
        this.loadPrevData();

        this.renderingPromise.promise.then(() => {
          this.updateView();
        });
      })
  }


  updateView() {
    console.log('updateview');
    document.querySelector('.chat.page .title span').innerHTML = this.counterpart.nickname;
    (document.querySelector('#new-message') as HTMLInputElement).placeholder = `chat with #${this.counterpart.nickname}!`
    //title 바꾸기 placeholder 도
  }

  async loadPrevData() {
    try {
      const url = `http://${constant.HOST}:8080/api/chatRooms/${this.roomId}/messages`;
      const result = await axios.get(url, {
        withCredentials: true,
      });
      const messageList = result.data.objects;
      messageList.forEach(message => {
        const senderNickname = (message.senderId === this.me.id)? this.me.nickname : this.counterpart.nickname;
        const messageElem = HTMLDom.htmlToElement(
          messageTemplate
          .replace('{{senderNickname}}', senderNickname)
          .replace('{{content}}', (message.content as string).replace(/(?:\r\n|\r|\n)/g, '<br>'))
          .replace('{{sentAt}}', Time.getReadableTime(message.sentAt))) as HTMLElement;
        if(message.senderId === this.me.id) {
          messageElem.classList.add('me');
        }
        document.querySelector('.message-wrapper').append(messageElem);
      }); 
    } catch (e) {
      if(e instanceof SyntaxError) {
        return "server error";
      } else if (e.response.status === 401) {
        setTimeout(() => {
          location.href='/#/signIn'
        });
        return '';
       } else {
        return "axios error";
       }
    }

  }

  async getChatRoomInfo(): Promise<number> {
    const url = `http://${constant.HOST}:8080/api/chatrooms?counterpartUserId=${this.counterpart.id}`;

    const result = await axios.get(url, {withCredentials: true});
    if(result.data.isSuccess) {
      return result.data.objects[0].roomId;
    } else {
      return 0;
    }
  }

  initChatRoom() {
    console.log('initChatRoom');
    //disconnect ALL prev sockets
    window.store = window.store || {};
    window.store.connectedSockets = window.store.connectedSockets || [];
    window.store.connectedSockets.forEach(ps => {
      console.log("disconnect ps!!");
      console.log(ps);
      ps.disconnect();
    })
  

    this.socket = io(`http://${constant.HOST}:8081/`);
    
    console.log('socket created', this.socket);

    this.socket.on("connect", () => {
      window.store.connectedSockets.push(this.socket);

      console.log(this.socket.id); // x8WIv7-mJelg7on_ALbx
      // server에 roomId 를 알려줘야 함
      console.log('my id', this.me.id);
      this.socket.emit('joinRoom', this.roomId, this.me.id); // window.store.profile.id); - 스토어 안정화 필요
    });

    this.socket.on('chatMessage', (messageObj) => {

      console.log('onchatmsg',messageObj);
      this.appendNewMsg(messageObj.message, this.counterpart, false)
    })
  } 


  appendNewMsg = (content: string, sender: UserProfile, isMe:boolean) => {
    if(content === '') {
      console.log('empty msg');
      return;
    }
    console.log('appendNewMsg');
    const timeStr = (new Date).toString();
    console.log("msgTemplate",messageTemplate);
    const msgStr = messageTemplate    
      .replace('{{content}}', content)
      .replace('{{sentAt}}', Time.getReadableTime(timeStr))
      .replace('{{senderNickname}}', sender.nickname);
    const msgElem = HTMLDom.htmlToElement(msgStr) as HTMLElement;

    if(isMe) {
      msgElem.classList.add('me');
    }
    msgElem.classList.add('hidden');
    
    const parentElem = document.querySelector('.message-wrapper') as HTMLElement;
    parentElem.prepend(msgElem);
    // parentElem.scrollTop = parentElem.scrollHeight;
    setTimeout(() => {
      msgElem.classList.remove('hidden');
    }, 0);
  }

  addChatItem = (e) => {
    e.preventDefault();
    console.log('addChatItem 1');

    const newMessageInput = document.getElementById('new-message') as HTMLInputElement;
    const content = newMessageInput.value;
    newMessageInput.value = '';
    const buttonSend = document.querySelector('#new-message-send') as HTMLElement;

    console.log('empty!');
    buttonSend.style.backgroundColor = 'rgba(09,173, 172, 0.5)';
    buttonSend.style.opacity = '0.5';
    document.querySelector('#new-message-form').removeEventListener('submit', this.addChatItem);

    this.socket.emit('chatMessage', content);
    console.log('c');
    this.appendNewMsg(content, this.me, true);
  }
  render = () => {
    this.container.innerHTML = template;
    Menu.attach();
    const buttonSend = document.querySelector('#new-message-send') as HTMLElement;
    buttonSend.style.backgroundColor = 'rgba(09,173, 172, 0.5)';
    buttonSend.style.opacity = '0.5';

    document.querySelector('#new-message').addEventListener('input', (e) => {
      const textBox = document.querySelector('#new-message') as HTMLInputElement;
      const buttonSend = document.querySelector('#new-message-send') as HTMLElement;
      if(textBox.value === '') {
        console.log('empty!');
        buttonSend.style.backgroundColor = 'rgba(09,173, 172, 0.5)';
        buttonSend.style.opacity = '0.5';
        document.querySelector('#new-message-form').removeEventListener('submit', this.addChatItem);

      } else {
        console.log('filled!');
        buttonSend.style.backgroundColor = 'rgba(09,173, 172, 1)';
        buttonSend.style.opacity = '1';
        document.querySelector('#new-message-form').addEventListener('submit', this.addChatItem);

      }
    })


    const wrapper = document.querySelector('.message-wrapper');
    wrapper.addEventListener('scroll', e => {
      console.log('scrollTop', wrapper.scrollTop);
    })
    this.renderingPromise.resolve(true);
  }
}
