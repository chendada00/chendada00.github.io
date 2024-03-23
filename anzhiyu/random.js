var posts=["2024/02/24/arthas用法/","2024/03/16/hexo博客源码自动备份/","2024/02/25/window查看端口占用/","2024/02/27/java内存分析命令/","2024/02/26/《软件设计师》考点总结/","2024/03/15/改造你的微信传输助手/","2024/03/12/前端常用CDN查询/","2024/03/23/一文搞懂原码、反码、补码、移码/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };