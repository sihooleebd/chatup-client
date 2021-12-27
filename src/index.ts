import SignIn from "./page/signin";
import SignUp from "./page/signup";
import Posts from "./page/posts";
import NewPost from "./page/new-post";
import PageNotFound from "./page/page-not-found";
import Post from "./page/post";
import Rooms from "./page/rooms";
import EditProfile from "./page/edit-profile";
import Profile from "./utils/profile";
import Chat from "./page/chat";
import NewRoom from "./page/new-room";
import { chatsTemplate } from "./page/chats.tpl";
import Chats from "./page/chats";

function route() {
  const path = location.hash;



  if (path==="" || path==="#/signIn") {
    const signin = new SignIn("#root");
    signin.render();
  } else if (path==="#/signUp") {
    const signup = new SignUp("#root");
    signup.render();
  } else if (path==="#/posts") { //general rm
    const posts = new Posts("#root");
    posts.render();
  }else if (/(#)(\/posts\/)(\d+)/.test(path)) {
    const roomId = parseInt(path.replace('#/posts/', ''));
    const posts = new Posts('#root', roomId);
    posts.render();
  } else if (/(#)(\/post\/)(\d+)/.test(path)) { // specific post
    const postId = parseInt(path.replace('#/post/', ''));
    const post = new Post('#root', postId);
    post.render();
  } else if (path==="#/rooms") { // all rooms
    const rooms = new Rooms("#root");
    rooms.render();
  } else if (/(#)\/newPost\/\?roomId=(\d+)/.test(path)) {
    const newPost = new NewPost("#root");
    newPost.render();
   } else if (path==="#/editProfile") {
    const editProfile = new EditProfile("#root");
    editProfile.render();
  } else if(/(#)(\/chat\/)(\d+)/.test(path)) {
    const counterpartUserId = parseInt(path.replace('#/chat/', ''));
    const chat = new Chat('#root',counterpartUserId);
    chat.render();
  } else if (path==='#/newRoom') {
    const newRoom = new NewRoom('#root');
    newRoom.render();
  } else if(/(#)(\/chatList\/)(\d+)/.test(path)) {
    const chatList = new Chats('#root', window.localStorage.getItem('profile').nickname);
  } else {
      const pageNotFound = new PageNotFound("#root");
      pageNotFound.render();
  }
}
console.log('start');
Profile.retrieveProfile(true, undefined, true);

window.addEventListener("hashchange", route);
document.addEventListener("DOMContentLoaded", route);
