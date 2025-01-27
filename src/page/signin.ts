import axios, { AxiosResponse } from "axios";
import template from "./signin.tpl";
import constant from '../config/constant';
import Profile from "../utils/profile";
import { MyResponseT } from "../types";

type UserInfoT = {
  email: string,
  pw: string
}

export default class SignIn {
  template: string = template;
  container: HTMLElement;

  constructor(container) {
    this.container = document.querySelector(container);
  }



  onSubmit = (e) => {
    console.log('abc');
    console.log("submit", constant);
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
        console.log("result",result);
        if (result.data.isSuccess) {
          //document.cookie = "userInfo=" + result.data.message;

          window.localStorage.removeItem('profile');
          const temp = Profile.retrieveProfile(true, undefined, true);
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

  onSignUpClick() {
    location.href = '/#/signUp'
  }

  render = () => {
    this.container.innerHTML = this.template;
    const form = document.querySelector('.sign-in form');
    form.addEventListener("submit", this.onSubmit);
    const btnToSignup = document.querySelector('#btn-goto-signup');
    btnToSignup.addEventListener("click", this.onSignUpClick);
    
  };
}


