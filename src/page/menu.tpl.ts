const template = `
  <div class='menu-wrapper'>
    <div class='menu'>
      <div class='profile-wrapper'>
        <div class='profile-img'><img src='{{profileImg}}' ></div>
        <div class='nickname-wrapper'>Welcome, <span class='nickname'>-</span></div>
        <div class='email'>-</div>
        <div><a href='#/editProfile'>Dressing Room</a></div>
      </div>
      <ul>
        <li>
          <a href='#/posts'>General Room</a>
        </li>
        <li>
          <a href='#/rooms'>All Rooms</a>
        </li>
        <li>
          <a href='#/signIn' id='sign-out'>Sign Out</a>
        </li>
      </ul>
      <input type='button' id='menu-close' class='close' value='close'>
    </div>
  </div>
`;
export default template;
