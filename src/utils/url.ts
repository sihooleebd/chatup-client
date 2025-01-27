export default class Url {
  static getProfileUrl(profileImg: string | null) {
    return  (profileImg === null) ? '/myStatic/favicon.png' : '/file/profile/' + profileImg;
  }
}