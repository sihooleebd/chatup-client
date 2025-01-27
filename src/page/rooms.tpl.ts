const roomTemplate = `
  <li class='hoverable' data-room-id='{{roomId}}'>
  <div class='name'>{{name}}</div>
    <div class='room-metadata-wrapper'> 
      <div class='time'>{{createdAt}}</div>
      <div class='owner'>{{owner}}</div>
    </div>
  </li>
`;

const roomsTemplate = `
  <ul class='rooms'>{{rooms}}</ul>
`;

const template = `
  <div class='rooms page with-title'>
    <div class='title'>
      <img src='/myStatic/logo.png'>
      <div class='nav-button-wrapper right'>
        <input type='button' class='nav-button' id='create-new-room' value='add a room!'>
      </div>
      <div class='nav-button-wrapper left'>
        <input type='button' class='nav-button' id='menu' value='menu'>
      </div>
    </div>
    <div class='main-header'>All Rooms</div>
    {{roomList}}
  </div>
`;
export { roomTemplate, roomsTemplate };
export default template;