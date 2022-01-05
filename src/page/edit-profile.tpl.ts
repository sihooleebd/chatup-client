const template = `
  <div class='edit-profile page'>
    <form autocomplete="off">
      <div class='guide'><b>Welcome to the dressing room!</b><br>Change your look!</div>
      <div class='photo-wrapper'> 
        <div class='profile-viewer'></div>
        <input type='file' name='photo' id='photo' accept='image/jpg, image/png'/>
        <input type='button' id='fake-button' value='dummy-click'</form>
      </div>
      <input type='text' id='nickname-input' placeholder='nickname'/>
      <input type='button' id='submit-profile' value='done'>

  </div>
`;
export default template;


// <ul>
// <li>
//   <label for="email"></label>
//   <input type='text' placeholder='email' id='email'>
// </li>
// <li>
//   <label for='nickname'></label>
//   <input type='text' placeholder='nickname' id='nickname'>
// </li>
// </ul>