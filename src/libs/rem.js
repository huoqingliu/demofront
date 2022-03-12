function setRem() {
  // 默认页面1rem为16px  即1920/16 = 120rem  
  var html = document.documentElement;
  var windowWidth = html.clientWidth;
  // 页面宽度除以当前页面转换为rem的大小
  html.style.fontSize = windowWidth / 120 + 'px';
}
setRem()
window.addEventListener('resize',setRem);
