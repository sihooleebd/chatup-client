export default class Url {
  static getProfileUrl(profileImg: string | null) {
    return  (profileImg === null) ? '/src/static/img/favicon.png' : '/storage/profile/' + profileImg;
  }
}