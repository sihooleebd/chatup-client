import axios from "axios";
import * as constant from '../config/constant.json';


export type UserProfile = {
  id: number,
  email?: string,
  profileImg?: string,
  nickname: string
}

export default class Profile {


  static retrieveProfile(isMe:boolean, userId:number, forceUpdate:boolean = false) : Promise<UserProfile> {
    if(isMe && window.localStorage.getItem('profile') && !forceUpdate) {
      return Promise.resolve(JSON.parse(window.localStorage.getItem('profile')));
    } else {
      const url = (isMe)?`http://${constant.HOST}:${constant.SERVER_PORT}/api/users/me`:`http://${constant.HOST}:${constant.SERVER_PORT}/api/users/${userId}`

      return axios.get(url, {
        withCredentials: true,
      }).then((result) => {
        console.log(result.data);
          if(result.data.isSuccess) {
            if(isMe) window.localStorage.setItem('profile', JSON.stringify(result.data.object));
            return result.data.object;
          } else {
            if(isMe) window.localStorage.removeItem('profile');
            return undefined;
          }
      }).catch(error => {
        if(isMe) window.localStorage.removeItem('profile');
        return undefined;
      })
    } 
  }
}