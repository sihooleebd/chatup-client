import axios from "axios";
import template, { chatsTemplate, chatTemplate } from './chats.tpl'
import Menu from "./menu";
import constant from '../config/constant';
import Profile from "../utils/profile";
import { MyResponseT } from "../types";
import Url from "../utils/url";


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
      const result = await axios.get(`${constant.PROTOCOL}://${constant.HOST}:${constant.SERVER_PORT}/api/chats/${this.userId}`, {
        withCredentials: true,
      });
      const data = result.data as MyResponseT;
      const chatsList = data.objects;
      if(!chatsList) {
        return '';
      }
      console.log('chatsList', chatsList);
      console.log(chatsList.length);
      let finalStr = '';


      for(let i = 0; i < chatsList.length; ++i) {
        let tmp: string;
        if(this.userId == chatsList[i].userFirstId) {
          tmp = chatTemplate
          .replace('{{counterId}}', chatsList[i].userSecondId)
          .replace('{{counterNickname}}', chatsList[i].userSecondNickname)
          .replace('{{profileImg}}', Url.getProfileUrl(chatsList[i].userSecondProfileImage));
        } else {
          tmp = chatTemplate
          .replace('{{counterId}}', chatsList[i].userFirstId)
          .replace('{{counterNickname}}', chatsList[i].userFirstNickname)
          .replace('{{profileImg}}', Url.getProfileUrl(chatsList[i].userFirstProfileImg));
        }
        finalStr = finalStr + tmp;
      }

      if(finalStr.length === 0) {
        return chatsTemplate.replace("{{chatsList}}", `<div class='lonely'>No chats here, im lonely :(. Add chats by clicking on your friends profile pictures in their post! </div>`);
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
    const elem = e.target as HTMLElement;
    console.log('elem', elem);
    const parent = elem.parentElement!.parentElement!;
    console.log('parent', parent);
    const userIdStr = parent.dataset.counterpartId;
    console.log('dataset', parent.dataset);
    console.log('userid', userIdStr);
    if(!userIdStr || userIdStr === '0') {
      return;
    }

    const userId = parseInt(userIdStr);
    if(!userId) {
      return;
    }
    const promise = Profile.retrieveProfile(true, undefined);
    promise.then(myProfile => {
      if(myProfile.id === userId) {
        return;
      }
      self.location.href = `#/chat/${userId}`;
      
    });
  }

  render = () => {
    this.getChats().then((s) => {
      console.log('s', s);
      this.container.innerHTML = this.template.replace("{{chatsList}}", s);
      Menu.attach();
      console.log(document.querySelector('ul.posts'));
      document.querySelector('ul.chats')?.addEventListener('click', this.onChatClick);
    });
  };
}
