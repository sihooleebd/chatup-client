const template = `
  <div class='menu-wrapper'>
    <div class='menu'>
      <div class='profile-wrapper'>
        <div class='profile-img'><img src='{{profileImg}}' ></div>
        <div class='nickname-wrapper'>Welcome, <span class='nickname'>-</span></div>
        <div class='email'>-</div>
        <div><a class='transition' href='#/editProfile'>Dressing Room</a></div>
      </div>
      <ul>
        <li>
          <a class='transition' href='#/posts'>General Room</a>
        </li>
        <li>
          <a class='transition' href='#/rooms'>All Rooms</a>
        </li>
        <li>
          <a href='#/chatList' class='transition' id='all-chats'>All Chats</a>
        </li>
        <li>
          <a href='#/signIn' class='transition' id='sign-out'>Sign Out</a>
        </li>
      </ul>
      <div class='developed-by divTag'>Developed by benjamin1234</div>
      <a class='developed-by aTag' href='https://www.benny.mcjunon.com'>Learn more</a>
      <input type='button' class='transition' id='menu-close' class='close' value='close'>
    </div>
  </div>
`;
export default template;
