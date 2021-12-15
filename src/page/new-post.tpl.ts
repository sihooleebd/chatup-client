const template = `
  <div class='new-post page'>
    <form autocomplete="off">
      <div class='guide'><b>Are you ready to post to the world?</b><br>Enter your title and content below : </div>
    <ul>
      <li>
       <input type='text' placeholder='title' id='title'>
      </li>
      <li>
        <textarea placeholder='type your amazing ideas here...'id='content'></textarea>
      </li>
    </ul>
    <input type='submit' value="Post">
    </form>
  </div>
`;
export default template;
