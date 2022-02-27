const postTemplate = `  
  <div class='post-metadata-wrapper'> 
    <div class='profile' data-user-id='{{writerId}}'><img src='{{profileImg}}' ></div>
    <div class='writer'>{{writerNickname}}</div>
    <div class='time'>{{writtenAt}}</div>
  </div>
  <div class='title'>{{title}}</div>
  <div class='content'>{{content}}</div>
  `;
const commentsTemplate = `
  <ul class='comments'>
    {{comments}}
  </ul>
  `;
  
const commentLiTemplate = `
  <li>
    <div class='comment-metadata-wrapper'> 
      <div class='profile' data-user-id='{{writerId}}'><img src='{{profileImg}}' ></div>
      <span class='writer'>{{writerNickname}}</span>
      <div class='time'>{{writtenAt}}</div>
    </div>
    <div class='content'>{{content}}</div>
  <li>
  `;

const deleteCode = `
  <div class='nav-button-wrapper right'>
    <input type='button' class='nav-button' id='delete-post' value='delete'>
  </div>
`

const template = `
  <div class='post page with-title'>
    <div class='title'>
      <img src='/dist-static/logo.png'>
      <div class='nav-button-wrapper left'>
        <input type='button' class='nav-button' id='menu' value='menu'>
      </div>
      {{deleteIcon}}
    </div>
    <div class='post-wrapper'>{{PostView}}</div>
    <div class='comments-wrapper'>
      <form id='new-comment-form' autocomplete="off">
        <input type='text' placeholder='enter your awe\some comment here..'  id='new-comment'>
      </form>
    </div>
  </div>
  `;
  
  export {postTemplate, commentsTemplate, commentLiTemplate, deleteCode};
  export default template;