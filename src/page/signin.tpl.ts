const template = `
  <div class='sign-in page'>

    <form autocomplete="off">
      <div class='guide'><b>Hi!</b><br>Please enter your email and password : </div>
      <ul>
        <li>
          <input type='text' placeholder='email' id='email'>
        </li>
        <li>
          <input type='password' placeholder='password' id='pw'>
        </li>
      </ul>
      <input type='submit' value="log in">
      <br>
      <input type='button' id='btn-goto-signup' value="don't have an account? sign up!">
    </form>
  </div>
`;
export default template;
