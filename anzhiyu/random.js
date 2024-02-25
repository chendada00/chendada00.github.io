var posts=["2024/02/24/arthas用法/","2024/02/23/hello-world/","2024/02/25/window查看端口占用/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };