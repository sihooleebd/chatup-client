import axios from "axios";
import Time from "../utils/time";
import template, { chatsTemplate, chatTemplate } from './chats.tpl'
import Menu from "./menu";
import * as constant from '../config/constant.json';

export default class Chats {
  template: string = template;
  container: HTMLElement;
  userId : number;

  constructor(container, userId) {
    this.container = document.querySelector(container);
    this.userId = userId;
  }

  async getChats(): Promise<string> {
    try {
      console.log('this.userId', this.userId);
      const result = await axios.get(`http://${constant.HOST}:${constant.SERVER_PORT}/api/chats/${this.userId}`, {
        withCredentials: true,
      });
      const chatsList = result.data.objects;
      console.log('chatsList', chatsList);
      console.log(chatsList.length);
      let finalStr = '';
      for(let i = 0; i < chatsList.length; ++i) {
        let tmp: string;
        if(this.userId == chatsList[i].userFirstId) {
          tmp = chatTemplate
          .replace('{{counterId}}', chatsList[i].userSecondId)
          .replace('{{counterNickname}}', chatsList[i].userSecondNickname)
          .replace('{{profileImg}}', (chatsList[i].userSecondProfileImage === null) ? '/dist-static/favicon.png' : '/storage/profile/' + chatsList[i].userSecondProfileImage);
        } else {
          tmp = chatTemplate
          .replace('{{counterId}}', chatsList[i].userFirstId)
          .replace('{{counterNickname}}', chatsList[i].userFirstNickname)
          .replace('{{profileImg}}', (chatsList[i].userFirstProfileImg === null) ? '/dist-static/favicon.png' : '/storage/profile/' + chatsList[i].userFirstProfileImg);
        }
        finalStr = finalStr + tmp;
      }


      return chatsTemplate.replace("{{chatsList}}", finalStr);
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





  onChatClick(e: Event) {
    console.log('triggered!!!!');
    const elem = e.target as HTMLElement;
    const chatId = elem.parentElement.dataset.counterpartId;
    console.log('chatId', chatId);
    if(!chatId) {
      return;
    }
    self.location.href = `#/chat/${chatId}`;


  }

  render = () => {
    this.getChats().then((s) => {
      console.log('s', s);
      this.container.innerHTML = this.template.replace("{{chatsList}}", s);
      Menu.attach();
      console.log(document.querySelector('ul.posts'));
      document.querySelector('ul.chats').addEventListener('click', this.onChatClick);
    });
  };
}
