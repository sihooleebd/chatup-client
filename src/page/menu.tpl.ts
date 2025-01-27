const template = `
  <div class='menu-wrapper'>
    <div class='menu'>
      <div class='profile-wrapper'>
        <div class='profile-img'><img src='{{profileImg}}' ></div>
        <div class='nickname-wrapper'><span class='nickname'>-</span></div>
        <div class='email'>-</div>
        <div><a class='transition' href='#/editProfile'>Dressing Room</a></div>
      </div>
      <ul>
        <li>
          <a class='transition' title='General Room' href='#/posts'>General Room</a>
        </li>
        <li>
          <a class='transition' title='All Rooms' href='#/rooms'>All Rooms</a>
        </li>
        <li>
          <a href='#/chatList' title='All Chats' class='transition' id='all-chats'>All Chats</a>
        </li>
        <li>
        <a href='https://docs.google.com/document/d/18jbyJCPJMYO5d6IH-yhwcKGtQCYqQLhtJbaYW8e5R1w/edit?usp=sharing' target='_blank' title='Change Logs' class='transition' id='change-logs'>Chage Logs</a>
        </li>
        <li>
          <a href='#/signIn' class='transition' title='Sign out' id='sign-out'>Sign Out</a>
        </li>
        
      </ul>
      <div class='developed-by divTag'>Developed by Benjamin</div>
      <a class='developed-by aTag' href='https://www.benjaminlee.kr'>Learn more</a>
      <input type='button' class='transition' id='menu-close' class='close' value='close'>
    </div>
  </div>
`;
export default template;
