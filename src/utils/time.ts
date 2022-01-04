export default class Time {
  static getReadableTime(t: string) {
    const time = new Date(t);
    const now = new Date();
    if(now.toLocaleDateString() !== time.toLocaleDateString()) {
      return time.toLocaleDateString();
    }

    const diffInMs = now.getTime() - time.getTime();

    if(diffInMs < 1000*60) {
      return 'now';
    } else if(diffInMs >= 1000 * 60 && diffInMs < 2000*60) {
      return '1 minute ago';
    } else if(diffInMs < 60*60*1000) {
      return String(Math.floor(diffInMs/1000/60) + ' minutes ago');
    } else if(diffInMs >= 1000*60*60 && diffInMs < 2000*60*60) {
      return String('1 hour ago');
    } else {
      return String(Math.floor(diffInMs/1000/60/60) + 'hours ago');
    }
    return '';
  }

}