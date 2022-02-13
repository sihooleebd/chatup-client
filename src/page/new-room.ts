import axios, { AxiosResponse } from "axios";
import template from "./new-room.tpl";
import Menu from "./menu";
import constant from '../config/constant';
import { isSpace } from "../utils/stringValidate";
import { MyResponseT } from "../types";


type UserInfoT = {
  email: string,
  pw: string
}

export default class NewRoom {
  template: string = template;
  container: HTMLElement;
  profileImageFileName: string;

  constructor(container) {
    this.container = document.querySelector(container);
  }



  onSubmit = (e) => {
    console.log("submit");
    e.preventDefault();

    const email = (<HTMLInputElement>document.querySelector("#email")).value;
    const pw = (<HTMLInputElement>document.querySelector("#pw")).value;

    const userInfo = {
      email,
      pw,
    };
    const arr = Object.entries(userInfo);
    for (let i = 0; i < arr.length; ++i) {
      if (!arr[i][1]) {
        alert(`Please fill up the ${arr[i][0]} section!`);
        return;
      }
    }

    //여기까지 오면 자료 있음

    
    axios
      .post<UserInfoT, AxiosResponse<MyResponseT>>(`${constant.PROTOCOL}://${constant.HOST}:${constant.SERVER_PORT}/api/signIn`, userInfo, {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result);
        const data = result.data as MyResponseT;
        if (data.isSuccess) {
          alert("Successfully logged in. Happy writing!");
          //document.cookie = "userInfo=" + result.data.message;

          location.href = "/#/posts";
        } else {
          console.log("SUSSS");
          alert(result.data.message);
        }
      })
      .catch((error) => {
        console.log("axios error");
        console.error(error);
      });
  };

  onDoneClick = (e) => {
    console.log('done!');
    const object = {
      roomName: (<HTMLInputElement>document.querySelector("#room-name-input")).value
    }


    if(object.roomName.length === 0) {
      alert('please fill up the room name section!');
      return;
    }
    if(isSpace((<HTMLInputElement>document.querySelector("#room-name-input")).value)) {
      alert('your room name is consisted only of spaces! Please enter a valid text!');
      return;
    }
    console.log('object',object);
    axios.post(`${constant.PROTOCOL}://${constant.HOST}:${constant.SERVER_PORT}/api/rooms`, object , {
      withCredentials: true,
    }).then((response) => {
      console.log('response', response);
      if(response.data.isSuccess) {
        alert('Room Created!');
        self.location.href = `#/posts/${response.data.object.roomId}`;
      } else {
        alert(response.data.message);
      }
    });


  }

  render = () => {
    this.container.innerHTML = this.template; 
    const doneButton = document.querySelector('#submit-new-room');
    doneButton.addEventListener('click', this.onDoneClick);
    Menu.attach();
  };
}
