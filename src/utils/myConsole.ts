import constant from "../config/constant";

export function myConsoleLog(text: any) {
  if(constant.HOST === 'localhost') {
    console.log(text);
  }
}