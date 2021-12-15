const messageTemplate = `
  <div class='message'>
    <div class='profile'><img src='{{profileImg}}' ></div>
    <div class='writer'>{{senderNickname}}</div>
    <div class='content-wrapper'>
      <div class='content'>{{content}}</div>
      <div class='time'>{{sentAt}}</div>
    </div>
  </div>
  `;

const template = `
  <div class='chat page with-title'>
    <div class='title'>
      <span>{{counterpartNickname}}</span>
      <div class='nav-button-wrapper left'>
        <input type='button' class='nav-button' id='menu' value='menu'>
      </div>
    </div>
    <div class='message-wrapper'></div>
    <div class='new-message-wrapper'>
      <form id='new-message-form' autocomplete="off">
        <input type='text' placeholder='send message to {{counterpartNickname}}'  id='new-message'>
        <input type='submit' value='send' id='new-message-send'>
      </form>
    </div>
  </div>
  `;
  
  export {messageTemplate};
  export default template;