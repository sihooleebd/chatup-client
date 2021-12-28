const template = `
  <div class='sign-up page'>
    <form autocomplete="off">
    <div class='guide'><b>Welcome!</b><br>Please enter the required fields below : </div>
    <ul>
      <li>
        <input type='text'  placeholder='email' id='email'>
      </li>
      <li>
        <input type='text' placeholder='nickname'  id='nickname'>
      </li>
      <li>
        <input type='password' placeholder='password' id='pw'>
      </li>
    </ul>
    <input type='submit' class='hoverable-button' value="Sign Up">
    </form>
  </div>
`;
export default template;
