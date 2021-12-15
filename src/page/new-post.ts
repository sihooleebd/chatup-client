import axios from "axios";
import template from "./new-post.tpl";
import * as constant from '../config/constant.json';


export default class NewPost {
  template: string = template;
  container: HTMLElement;
  roomId: string;

  constructor(container) {
    this.container = document.querySelector(container);

    const urlSearchParams = new URLSearchParams(window.location.hash.replace('#/newPost/', ''));
    console.log('window loc', window.location.search);
    console.log(urlSearchParams.get('roomId'));
    this.roomId = urlSearchParams.get('roomId');
  }

  onSubmit = (e) => {
    console.log("submit");
    e.preventDefault();

    const title = (<HTMLInputElement>document.querySelector("#title")).value;
    const content = (<HTMLInputElement>document.querySelector("#content"))
      .value;
    const roomId = this.roomId;
      

    const postInfo = {
      title,
      content,
      roomId
    };
    const arr = Object.entries(postInfo);
    console.log(arr);
    for (let i = 0; i < arr.length; ++i) {
      if (!arr[i][1]) {
        alert(`Please fill up the ${arr[i][0]} section!`);
        return;
      }
    }

    //여기까지 오면 자료 있음

    axios
      .post(`http://${constant.HOST}:8080/api/posts`, postInfo, {withCredentials: true})
      .then((result) => {
        console.log(result);
        if (result.data.isSuccess) {
          alert("Posted!");
          document.cookie = "userInfo=" + result.data.message;
          location.href = `/#/posts/${roomId}`;
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
        console.error(e);
      });
  };

  render = () => {
    this.container.innerHTML = this.template;
    const form = document.querySelector('.new-post form');
    form.addEventListener("submit", this.onSubmit);
  };
}
