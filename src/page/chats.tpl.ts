const chatTemplate = `
  <li class='hoverable' data-counterpart-id='{{counterId}}'>
    <div class='chat-metadata-wrapper'> 
      <div class='profile'><img src='{{profileImg}}'></div>
      <div class='counterpart'>{{counterNickname}}</div>
    </div>
    </li>
`;

const chatsTemplate  = `
  <ul class='chats'>{{chatsList}}</ul>
`

const template = `
  <div class='chats page with-title'>
    <div class='title'>
      <img src='/myStatic/logo.png'>
      <div class='nav-button-wrapper right'>
      </div>
      <div class='nav-button-wrapper left'>
        <input type='button' class='nav-button' id='menu' value='menu'>
      </div>
    </div>
    <div class='main-header'>All Chats</div>
    {{chatsList}}
  </div>
`;
export { chatTemplate, chatsTemplate };
export default template;