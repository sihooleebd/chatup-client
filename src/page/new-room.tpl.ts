const template = `
  <div class='edit-profile page with-title'>
    <div class='title'>
      <img src='/src/static/img/logo-with-background.png'>
      <div class='nav-button-wrapper right'>
        <input type='button' class='nav-button' id='submit-new-room' value='done'>
      </div>
      <div class='nav-button-wrapper left'>
        <input type='button' class='nav-button' id='menu' value='menu'>
      </div>
    </div>
    <form autocomplete="off">
      <div class='guide'><b>Ready to hang out with your friends?</b><br>Please enter your room name : </div>
      <input type='text' id='room-name-input' placeholder='room name'/>
  </div>
`;
export default template;