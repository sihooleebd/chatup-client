import template from "./menu.tpl";
import axios from 'axios';
import Url from "../utils/url";
import Profile from "../utils/profile";

export default class Menu {

  static async loadProfile() { 
    const profile = await Profile.retrieveProfile(true, undefined);
    console.log(profile);
    document.querySelector('div.menu > div.profile-wrapper > div.email').innerHTML = profile.email;
    document.querySelector('span.nickname').innerHTML = profile.nickname;
    const element = (document.querySelector('div.menu > div.profile-wrapper > div.profile-img img') as HTMLImageElement);
    const profileUrl = Url.getProfileUrl(profile.profileImg);
    element.src = `${Url.getProfileUrl(profile.profileImg)}`;
    return;
  }

  static open() {
    const existingMenu = document.querySelector('.menu');
    
    if(!existingMenu) {
      console.log('no existing menu');
      const menuWrapper = document.createElement('template');
      menuWrapper.innerHTML = template.trim();
      document.querySelector('#root').appendChild(menuWrapper.content.firstChild);  
      const attatchedMenuWrapper: HTMLElement = document.querySelector('.menu-wrapper');
      const closeButton = document.querySelector('#menu-close');
      console.log(closeButton)
      closeButton.addEventListener('click', Menu.close);
      attatchedMenuWrapper.addEventListener('click', Menu.close);
    }

    Menu.loadProfile();

    const menuWrapper: HTMLElement = document.querySelector('.menu-wrapper');
    menuWrapper.style.display = 'block';
    setTimeout(() => {
      menuWrapper.classList.add('open');
    }, 0);

    
  }

  static close() {
    console.log('closing');
    const existingMenu = document.querySelector('.menu');
    if(!existingMenu) {
      return;
    }
    const menuWrapper: HTMLElement = document.querySelector('.menu-wrapper');
    
    console.log(menuWrapper);
    setTimeout(() => {
      menuWrapper.classList.remove('open');
    }, 0);
    setTimeout(() => {
      menuWrapper.style.display = 'none';
    }, 500);
    menuWrapper.addEventListener('webkitTransitionEnd', () => {
      
    })
  }

  static attach() {
    document.querySelector('#menu').addEventListener('click', Menu.open);
  }
}