import axios from "axios";
import template from "./signup.tpl";
import * as constant from '../config/constant.json';


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

    //여기까지 오면 자료 있음

    axios
      .post(`http://${constant.HOST}:8080/api/signUp`, userInfo)
      .then((result) => {
        console.log(result);
        if (result.data.isSuccess) {
          alert("You have been registered. Welcome to our blog!");
          location.href = "/#/signIn";
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

  render = () => {
    this.container.innerHTML = this.template;
    const form = document.querySelector('.sign-up form');
    form.addEventListener("submit", this.onSubmit);
  };
}