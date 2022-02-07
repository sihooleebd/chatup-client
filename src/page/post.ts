import axios from "axios";
import Time from "../utils/time";
import template, { postTemplate, commentsTemplate, commentLiTemplate, deleteCode} from './post.tpl'
import Menu from "./menu";
import HTMLDom from "../utils/htmldom";
import Url from "../utils/url";
import Profile from "../utils/profile";
import constant from '../config/constant';
import HTMLHelper from "../utils/html";


export default class Post {
  template: string = template;
  container: HTMLElement;
  postId: number = 0;

  constructor(container, postId) {
    this.container = document.querySelector(container);
    this.postId = postId;
    console.log('postId = ', this.postId);
  }

  async getPost(): Promise<string> {
    try {
      console.log(this.postId);
      const result = await axios.get(`${constant.PROTOCOL}://${constant.HOST}:${constant.SERVER_PORT}/api/posts/${this.postId}`, {
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
      let tmp2 = template.replace('{{PostView}}', tmp);

      var jsonStr = window.localStorage.getItem('profile');
      var parsed = JSON.parse(jsonStr);
      const myId = parsed.id;
      console.log("COMPARING IF THIS IS MY POST");
      if(myId==post.writerId) {
        console.log("YES");
        tmp2 = tmp2.replace('{{deleteIcon}}', deleteCode);
        console.log(tmp2);
      } else {
        console.log("NO");
        tmp2 = tmp2.replace('{{deleteIcon}}', '');
      }
      return tmp2;
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

    axios
      .post(`${constant.PROTOCOL}://${constant.HOST}:${constant.SERVER_PORT}/api/posts/${this.postId}/comments`,{ content }, {withCredentials: true})
      .then((result) => {
        console.log(result);
        if (result.data.isSuccess) {
          this.appendNewComment(HTMLHelper.escape(content));
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
      const result = await axios.get(`${constant.PROTOCOL}://${constant.HOST}:${constant.SERVER_PORT}/api/posts/${this.postId}/comments`, {
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

  onPostDelete = async (e: Event) => {
    console.log("POST DELETED");
    console.log('postId', this.postId);
    try {
      if(confirm(`Are you sure? This action can't be reversed. `) {
        const result = await axios.delete(`${constant.PROTOCOL}://${constant.HOST}:${constant.SERVER_PORT}/api/posts/${this.postId}`, {
          withCredentials: true,
        });
        const isSuccess = result.data.isSuccess;
        const message = result.data.message;
        if(!isSuccess) {
          alert("Aw snap! Something went wrong. Message : " + message);
          return;
        } else {
          alert('success!');
          history.back();
        }        
      } else {
        alert('cancelled!');
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

  render = async () => {
    this.container.innerHTML = template;
    const postHtml = await this.getPost();
    this.container.innerHTML = postHtml;
    
    console.log(this.container.innerHTML);
    this.getComments().then((s) => {
      const ulElement = HTMLDom.htmlToElement(s);
      this.container.querySelector('.comments-wrapper').prepend(ulElement);
    });
    document.querySelector('#new-comment-form').addEventListener('submit', this.onCommentSubmit);
    console.log('querySelector --> #delete-post', document.querySelector('#delete-post'));
    if(document.querySelector("#delete-post")!==null) {
      console.log("adding delete eventlistener");
      document.querySelector("#delete-post").addEventListener('click',this.onPostDelete);
    }
    
    HTMLDom.addChildEventListener(this.container.querySelector('.post.page'), 'click', '.profile', this.onProfileClick);
    Menu.attach();      
    
  }
}
