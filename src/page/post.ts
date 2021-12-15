import axios from "axios";
import Time from "../utils/time";
import template, { postTemplate, commentsTemplate, commentLiTemplate} from './post.tpl'
import Menu from "./menu";
import HTMLDom from "../utils/htmldom";
import Url from "../utils/url";
import Profile from "../utils/profile";
import * as constant from '../config/constant.json';


export default class Post {
  template: string = template;
  container: HTMLElement;
  postId: number = 0;

  constructor(container, postId) {
    this.container = document.querySelector(container);
    this.postId = postId;
  }

  async getPost(): Promise<string> {
    try {
      console.log(this.postId);
      const result = await axios.get(`http://${constant.HOST}:8080/api/posts/${this.postId}`, {
        withCredentials: true,
      });
      const post = result.data.object;
      console.log(post);
      const tmp =  postTemplate.replace('{{title}}', post.title)
        .replace('{{content}}', (post.content as string).replace(/(?:\r\n|\r|\n)/g, '<br>'))
        .replace('{{writerId}}', post.writerId)
        .replace('{{writerNickname}}', post.writerNickname)
        .replace('{{writtenAt}}', Time.getReadableTime(post.writtenAt))
        .replace('{{profileImg}}', Url.getProfileUrl(post.profileImg));
      return tmp;
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

  appendNewComment(content:string) {
    Profile.retrieveProfile(true, undefined).then((myProfile => {
      const timeStr = (new Date).toString();
      const liStr = commentLiTemplate
      .replace('{{content}}', content)
      .replace('{{writerNickname}}', 'me')
      .replace('{{writerId}}', '0')
      .replace('{{writtenAt}}', Time.getReadableTime(timeStr))
      .replace('{{profileImg}}', Url.getProfileUrl(myProfile.profileImg));

      console.log(liStr);
      const li = HTMLDom.htmlToElement(liStr);
      this.container.querySelector('.comments-wrapper ul').prepend(li);

    }))
    document.getElementById("new-comment").value = '';
  }

  onCommentSubmit = (e) => {
    e.preventDefault();

    const content = (<HTMLInputElement>document.querySelector("#new-comment"))
      .value;

    if(!content) {
      alert('Please enter your comment!')
    }

    //여기까지 오면 자료 있음

    axios
      .post(`http://${constant.HOST}:8080/api/posts/${this.postId}/comments`,{ content }, {withCredentials: true})
      .then((result) => {
        console.log(result);
        if (result.data.isSuccess) {
          this.appendNewComment(content);
        } else {
          console.log("SUSSS");
          alert(result.data.message);
        }
      })
      .catch((e) => {
        if (e.response.status === 401) {
          console.log("UNAUTHOURIZEDDDDDD")
          location.href='/#/signIn'
          //place your reentry code
         }
        console.log("axios error");
        console.log(e);
      });
  }

  async getComments(): Promise<string> {
    try {
      const result = await axios.get(`http://${constant.HOST}:8080/api/posts/${this.postId}/comments`, {
        withCredentials: true,
      });
      const commentList = result.data.objects;
      console.log(commentList);
      return commentsTemplate.replace('{{comments}}',
        commentList.reduce((a,c) => (
          a + commentLiTemplate
            .replace('{{content}}', (c.content as string).replace(/(?:\r\n|\r|\n)/g, '<br>'))
            .replace('{{writerId}}', c.writerId)
            .replace('{{writerNickname}}', c.writerNickname)
            .replace('{{writtenAt}}', Time.getReadableTime(c.writtenAt))
            .replace('{{profileImg}}', Url.getProfileUrl(c.profileImg))
        ), '')
      );
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

  onProfileClick(e: Event) {
    const elem = e.target as HTMLElement;
    const parent = elem.parentElement;

    const userIdStr = parent.dataset.userId;
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
    this.container.innerHTML = template;
    Menu.attach();
    this.getPost().then((s) => {
      this.container.querySelector('.post-wrapper').innerHTML = s;
    });
    this.getComments().then((s) => {
      const ulElement = HTMLDom.htmlToElement(s);
      this.container.querySelector('.comments-wrapper').prepend(ulElement);
    });
    document.querySelector('#new-comment-form').addEventListener('submit', this.onCommentSubmit);
    
    HTMLDom.addChildEventListener(this.container.querySelector('.post.page'), 'click', '.profile', this.onProfileClick);

    window.addEventListener('scroll', (e: Event) => {
      console.log('scroll y:', window.scrollY);
    
      const postContent = this.container.querySelector('.post-wrapper');
    })      
    
  }
}
