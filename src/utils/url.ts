export default class Url {
  static getProfileUrl(profileImg: string | null) {
    return  (profileImg === null) ? '/dist-static/favicon.png' : '/storage/profile/' + profileImg;
  }
}