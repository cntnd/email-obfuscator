document.addEventListener("DOMContentLoaded", function(event) { 
  document.querySelectorAll(".email").forEach((element, key) => {
    let content = element.textContent.replace(/\s+/g, '');
    let test = content.match(/\[.*?\]/g);
    let html = generate(content.replace(/\[at\]/ig, '@').replace(/\[dot\]/ig, '.'));
    element.replaceWith(html);
  });
});

function generate(value) {
  const html = '<a href="mailto:'+value+'">'+value+'</a>';
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content;
}
