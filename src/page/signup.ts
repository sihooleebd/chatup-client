import axios, { AxiosResponse } from "axios";
import template from "./signup.tpl";
import constant from '../config/constant';
import { MyResponseT } from "../types";
import { isSpace } from "../utils/stringValidate";


type UserInfoT = {
  email: string;
  nickname: string;
  pw: string;
}
export default class SignUp {
  template: string = template;
  container: HTMLElement;

  constructor(container) {
    this.container = document.querySelector(container);
  }

  onSubmit = (e) => {
    console.log("submit");
    e.preventDefault();

    const email = (<HTMLInputElement>document.querySelector("#email")).value;
    const nickname = (<HTMLInputElement>document.querySelector("#nickname"))
      .value;
    const pw = (<HTMLInputElement>document.querySelector("#pw")).value;

    const userInfo = {
      email,
      nickname,
      pw,
    };
    const arr = Object.entries(userInfo);
    for (let i = 0; i < arr.length; ++i) {
      if (!arr[i][1]) {
        alert(`Please fill up the ${arr[i][0]} section!`);
        return;
      }
    }

    if (isSpace(arr[1][1])) {
      alert(`Your nickname is consisted of only spaces! Please enter a valid text!`);
      return;
    }
    if (isSpace(arr[2][1])) {
      alert(`Your password is consisted of only spaces! Please enter a valid text!`);
      return;
    }
    const emailVerifyRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if(!emailVerifyRegex.test(arr[0][1])) {
      alert('Please enter a valid email address!');
      return;
    }


    //여기까지 오면 자료 있음


    axios
      .post<UserInfoT, AxiosResponse<MyResponseT>>(`${constant.PROTOCOL}://${constant.HOST}:${constant.SERVER_PORT}/api/signUp`, userInfo)
      .then((result) => {
        console.log(result);
        const data = result.data as MyResponseT;
        if (data.isSuccess) {
          alert("You have been registered. Welcome to our blog!");
          location.href = "/#/signIn";
        } else {
          console.log("SUSSS");
          alert(data.message);
        }
      })
      .catch((error) => {
        console.log("axios error");
        console.error(error);
      });
  };

  render = () => {
    this.container.innerHTML = this.template;
    const form = document.querySelector('.sign-up form');
    form.addEventListener("submit", this.onSubmit);
  };
}