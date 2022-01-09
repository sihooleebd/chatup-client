import axios from "axios";
import Time from "../utils/time";
import template, { roomTemplate, roomsTemplate } from './rooms.tpl'
import Menu from "./menu";
import * as constant from '../config/constant.json';


export default class Rooms {
  template: string = template;
  container: HTMLElement;

  constructor(container) {
    this.container = document.querySelector(container);
  }

  async getRooms(): Promise<string> {
    try {
      const result = await axios.get(`${constant.PROTOCOL}://${constant.HOST}:${constant.SERVER_PORT}/api/rooms`, {
        withCredentials: true,
      });
      const roomList = result.data.objects;

      return roomsTemplate.replace('{{rooms}}',  roomList.reduce((a,c) => (
        a + roomTemplate
        .replace('{{roomId}}', c.id)
        .replace('{{name}}', c.name)
        .replace('{{owner}}', c.owner)
        .replace('{{createdAt}}', Time.getReadableTime(c.createdAt))
      ), ''));
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

  gotoNewRoom() {
    location.href='/#/newRoom';
  }

  onRoomClick(e: Event) {
    console.log("clicked on on RoomClick");
    const elem = e.target as Element;
    console.log(elem.nodeName);
    if(elem.nodeName === 'UL') {
      return;
    }

    const liElem = elem.closest('li');
    console.log(liElem.dataset.roomId);

    self.location.href = `#/posts/${liElem.dataset.roomId}`
  }

  render = () => {
    this.getRooms().then((s) => {
      this.container.innerHTML = this.template.replace("{{roomList}}", s);
      document.querySelector('#create-new-room').addEventListener('click', this.gotoNewRoom);
      Menu.attach();
      document.querySelector('ul.rooms').addEventListener('click', this.onRoomClick);
    });
  };
}
