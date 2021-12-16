import axios from "axios";
import template from "./new-room.tpl";
import Menu from "./menu";
import * as constant from '../config/constant.json';


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
      .post(`http://${constant.HOST}:8080/api/signIn`, userInfo, {
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

  onSignUpClick() {
    location.href = '/#/signUp'
  }

  onImageChange = (e) => {
    console.log(e);
    const selectedFile = document.getElementById('photo').files[0];
    console.log(selectedFile);
    if(!selectedFile) {
      return;
    }
    if(selectedFile.type !== 'image/png' && selectedFile.type !== 'image/jpg') {
      alert('you are only allowed too submit file types of .jpg or .png. Please check your file format.');
      return;
    }

    const form = new FormData();
    form.append("photo", selectedFile);
    axios.post(`http://${constant.HOST}:8080/api/users/me/profileImage`, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      // 응답 처리
      console.log(response.data);
      document.querySelector('div.edit-profile > form > div.photo-wrapper > div.profile-viewer').style.backgroundImage = `url('/storage/temp/${response.data.object.profileImgFileName}')`;
      console.log(`url(/storage/temp/${response.data.object.profileImgFileName})`);
      this.profileImageFileName = response.data.object.profileImgFileName;
      console.log(this.profileImageFileName);
    })
    .catch((error) => {
      // 예외 처리
      console.error(error);
})
  }

  onDoneClick = (e) => {
    console.log('done!');
    const object = {
      roomName: (<HTMLInputElement>document.querySelector("#room-name-input")).value
    }

    if(object.roomName.length === 0) {
      alert('please fill up the room name section!');
      return;
    }
    console.log('object',object);
    axios.post(`http://${constant.HOST}:8080/api/rooms`, object , {
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
