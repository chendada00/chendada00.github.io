var posts=["2024/02/24/arthas用法/","2024/02/25/window查看端口占用/","2024/02/27/java内存分析命令/","2024/02/26/《软件设计师》考点总结/","2024/03/12/前端常用CDN查询/","2024/03/15/改造你的微信传输助手/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };