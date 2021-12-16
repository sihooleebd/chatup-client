const postTemplate = `
  <li data-post-id='{{postId}}'>
    <div class='post-metadata-wrapper'> 
      <div class='profile'><img src='{{profileImg}}' ></div>
      <div class='writer'>{{writerNickname}}</div>
      <div class='time'>{{writtenAt}}</div>
    </div>
    <div class='title'>{{title}}</div>
    <br>
    <div class='content'>{{content}}</div>
    </li>
`;

const postsTemplate  = `
  <ul class='posts'>{{posts}}</ul>
`

const template = `
  <div class='posts page with-title'>
    <div class='title'>
      <img src='/dist-static/logo.png'>
      <div class='nav-button-wrapper right'>
        <input type='button' class='nav-button' id='write-new-post' value='write!'>
      </div>
      <div class='nav-button-wrapper left'>
        <input type='button' class='nav-button' id='menu' value='menu'>
      </div>
    </div>
    <div class='main-header'>All Posts</div>
    {{postList}}
  </div>
`;
export { postTemplate, postsTemplate };
export default template;