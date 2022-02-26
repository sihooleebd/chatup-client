export function isSpace(text : string) {
    if (!text.replace(/\s/g, '').length) {
      return true;
    }
    return false;
}
