const postTemplate = `
  <li class='hoverable' data-post-id='{{postId}}'>
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

const welcomeTemplate = `
  <li class='hoverable'>
    <div class='post-metadata-wrapper'> 
      <div class='profile'><img src='/dist-static/favicon.png' ></div>
      <div class='writer'>Chatup</div>
      <div class='time'>now</div>
    </div>
    <div class='title'>Welcome to this room!</div>
    <br>
    <div class='content'>Welcome to a newly created room enjoy!(psstttttt) What? This room has no posts?! Oh no! Start by writing a post by pressing the button on the top right of the screen!</div>
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
export { postTemplate, postsTemplate, welcomeTemplate };
export default template;