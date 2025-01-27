import constant from "../config/constant";

export default class Url {
  static getProfileUrl(profileImg: string | null, isTemp: boolean = false) {
    
    if (profileImg === null) return '/myStatic/favicon.png';
    
    const subdir = isTemp? 'temp' : 'profile'
    
    return `${constant.PROTOCOL}://${constant.HOST}:${constant.SERVER_PORT}/file/${subdir}/` + profileImg;
  }
}