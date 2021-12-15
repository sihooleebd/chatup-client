export default class HTMLDom {
  static htmlToElement(html : string) : ChildNode{
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

  static htmlToElements(html : string) : NodeList {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
  }

  static addChildEventListener(base: HTMLElement, eventName: string, selector: string, handler: (Event) => void) {
    base.addEventListener(eventName, function(event) {
      let closest = (event.target as HTMLElement).closest(selector);
      if(closest && base.contains(closest)) {
        handler.call(closest, event);
      }
    });
    
  }
}