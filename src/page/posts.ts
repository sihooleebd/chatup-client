import axios from "axios";
import Time from "../utils/time";
import template, { postsTemplate, postTemplate, welcomeTemplate } from './posts.tpl'
import Menu from "./menu";
import * as constant from '../config/constant.json';

export default class Posts {
  template: string = template;
  container: HTMLElement;
  roomId : number;

  constructor(container, roomId = constant.GENERAL_ROOM_ID) {
    this.container = document.querySelector(container);
    this.roomId = roomId;
  }

  async getPosts(): Promise<string> {
    try {
      const result = await axios.get(`http://${constant.HOST}:${constant.SERVER_PORT}/api/posts?roomId=${this.roomId}`, {
        withCredentials: true,
      });

      // if(!result.data.isSuccess) {

      // }

      const postList = result.data.objects;
      console.log(postList.length);
      if(postList.length === 0) {
        console.log('aaa');
        return postsTemplate.replace(`{{posts}}`, welcomeTemplate);
      }
      return postsTemplate.replace('{{posts}}',
        postList.reduce((a,c) => (
        a + postTemplate
        .replace('{{postId}}', c.id)
        .replace('{{title}}', c.title)
        .replace('{{content}}', (c.content as string).replace(/(?:\r\n|\r|\n)/g, '<br>'))
        .replace('{{writerNickname}}', c.writerNickname)
        .replace('{{writtenAt}}', Time.getReadableTime(c.writtenAt))
        .replace('{{profileImg}}', (c.profileImg === null) ? '/dist-static/favicon.png' : '/storage/profile/' + c.profileImg)
      ), ''));
      
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

  gotoNewPost = () => {
    console.log('roomId', this.roomId);

    location.href=`/#/newPost/?roomId=${this.roomId}`;
  }

  onPostClick(e: Event) {
    const elem = e.target as HTMLElement;
    const postId = elem.parentElement.dataset.postId;
    if(!postId) {
      return;
    }
    self.location.href = `#/post/${postId}`;
  }

  render = () => {
    this.getPosts().then((s) => {
      this.container.innerHTML = this.template.replace("{{postList}}", s);
      document.querySelector('#write-new-post').addEventListener('click', this.gotoNewPost);
      Menu.attach();
      console.log(document.querySelector('ul.posts'));
      document.querySelector('ul.posts').addEventListener('click', this.onPostClick);
    });
  };
}
