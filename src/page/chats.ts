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
      console.log(chatsList.length);
      if(this.userId==result.data.objects[0].userFirstId) {
        return chatsTemplate.replace('{{posts}}',
        chatsList.reduce((a,c) => (
        a + chatTemplate
        .replace('{{counterpartId}}', c.userSecondId)
        .replace('{{counterNickname}}', c.userSecondNickname)
        .replace('{{profileImg}}', (c.userSecondProfileImage === null) ? '/dist-static/favicon.png' : '/storage/profile/' + c.userSecondProfileImage)), ''));      
      } else {
        return chatsTemplate.replace('{{posts}}',
          chatsList.reduce((a,c) => (
          a + chatTemplate
          .replace('{{counterpartId}}', c.userFirstId)
          .replace('{{counterNickname}}', c.userFirstNickname)
          .replace('{{profileImg}}', (c.userFirstProfileImage === null) ? '/dist-static/favicon.png' : '/storage/profile/' + c.userFirstProfileImage)), ''));
      }
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
    const elem = e.target as HTMLElement;
    const chatId = elem.parentElement.dataset.counterpartId;
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
      document.querySelector('ul.posts').addEventListener('click', this.onChatClick);
    });
  };
}
