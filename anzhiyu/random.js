var posts=["2024/02/《软件设计师》考点总结/","2024/05/encrypt/","2024/05/tag-plugins/","2024/05/hexo配置隐藏文章/","2024/04/排序算法详解/","2024/04/一文搞懂波兰表达式/","2024/04/自动替换前端node-modules源码/","2024/03/一文搞懂奇偶校验、海明码和CRC/","2024/03/一文搞懂原码、反码、补码、移码/","2024/03/hexo博客源码自动备份/","2024/03/改造你的微信传输助手/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };