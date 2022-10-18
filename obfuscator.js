document.addEventListener("DOMContentLoaded", function(event) { 
  document.querySelectorAll(".email").forEach((element, key) => {
    let config = element.dataset;
    let css = element.classList;
    let content = element.textContent.replace(/\s+/g, '');
    let html = generate(content.replace(/\[at\]/ig, '@').replace(/\[dot\]/ig, '.'), config, css);
    element.replaceWith(html);
  });
});

function generate(value,config,css) {  
  let href = 'mailto:'+value;
  if (config.subject) {
    href = href + '?subject='+config.subject;
  }
  // Body
  if (config.body) {
    let sep = '?';
    if (href.charAt(href.length-1)==='?') {
      sep = '&';
    }
    href = href + sep + 'body='+config.body;
  }
  // CC
  if (config.cc) {
    let sep = '?';
    if (href.charAt(href.length-1)==='?') {
      sep = '&';
    }
    href = href + sep + 'cc='+config.cc;
  }
  // BCC
  if (config.bcc) {
    let sep = '?';
    if (href.charAt(href.length-1)==='?') {
      sep = '&';
    }
    href = href + sep + 'bcc='+config.bcc;
  }
  // Display
  let display = value;
  if (config.display) {
    display = config.display;
  }
  const template = document.createElement('a');
  if (config.classReplace){
    template.classList.add(config.classReplace);
  }
  else {
    template.classList = css;
  }
  template.textContent = display;
  template.setAttribute('href', href);
  console.log(template);
  return template;
}
