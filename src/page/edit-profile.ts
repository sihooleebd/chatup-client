import axios, { AxiosResponse } from "axios";
import Profile from "../utils/profile";
import Url from "../utils/url";
import template from "./edit-profile.tpl";
import constant from '../config/constant';
import { MyResponseT } from "../types";


type UserInfoT = {
  email: string,
  pw: string
}
 
type ObjectT = {
  profileImg: string,
  nickname: string
}
 

export default class EditProfile {
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
        if (result.data.isSuccess) {
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

  onImageChange = (e) => {
    console.log(e);
    const selectedFile = (document.getElementById('photo') as HTMLInputElement).files[0];
    console.log(selectedFile);
    if(!selectedFile) {
      return;
    }
    if(selectedFile.type !== 'image/png' && selectedFile.type !== 'image/jpg' && selectedFile.type !== 'image/jpeg') {
      alert('you are only allowed too submit file types of .jpg or .png. Please check your file format.');
      return;
    }

    const form = new FormData();
    form.append("photo", selectedFile);
    axios.post<FormData, AxiosResponse<MyResponseT>>(`${constant.PROTOCOL}://${constant.HOST}:${constant.SERVER_PORT}/api/users/me/profileImage`, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      // 응답 처리
      console.log("image response data", response.data.object);
      const tempImageUrl = Url.getProfileUrl(response.data.object.profileImgFileName, true);
      (document.querySelector('div.edit-profile > form > div.photo-wrapper > div.profile-viewer') as HTMLElement).style.backgroundImage = `url(${tempImageUrl})`;
      this.profileImageFileName = response.data.object.profileImgFileName;


        console.log(this.profileImageFileName);
    })
    .catch((error) => {
      // 예외 처리
      console.error(error);
})
  }

  onDoneClick = (e) => {
    const object = {
      profileImg: this.profileImageFileName,
      nickname: (<HTMLInputElement>document.querySelector("#nickname-input")).value
    }

    if(object.nickname.length === 0) {
      alert('please fill up the nickname section!');
      return;
    }
    console.log('object',object);
    axios.put<ObjectT, AxiosResponse<MyResponseT>>(`${constant.PROTOCOL}://${constant.HOST}:${constant.SERVER_PORT}/api/users/me`, object , {
      withCredentials: true,
    }).then((response) => {
      console.log('response', response);
      if(response.data.isSuccess) {
        Profile.retrieveProfile(true, undefined, true);
        alert('Enjoy your new look!');
        history.back();
      } else {
        alert(response.data.message);
      }
    });



    


  }

  render = () => {
    this.container.innerHTML = this.template; 
    Profile.retrieveProfile(true, undefined).then((myProfile) => {
      (document.querySelector('#nickname-input') as HTMLInputElement).value = myProfile.nickname;
      (document.querySelector('.profile-viewer') as HTMLElement).style.backgroundImage = `url(${Url.getProfileUrl(myProfile.profileImg)})`;
      console.log(Url.getProfileUrl(myProfile.profileImg));
      const fileInput = document.querySelector('#photo');
      fileInput.addEventListener('change', this.onImageChange);
  
      const doneButton = document.querySelector('#submit-profile');
      doneButton.addEventListener('click', this.onDoneClick);
  
      document.querySelector('.photo-wrapper').addEventListener('click', () => {
        (document.querySelector('#photo') as HTMLElement).click();
    });

    })


  };
}
