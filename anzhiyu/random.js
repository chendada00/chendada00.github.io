var posts=["4814.html","579f.html","8a0c.html","dfd4.html","51a7.html","3329.html","43a1.html","71f9.html","3e6a.html","9d22.html","17dd.html","77f2.html","c018.html","37ef.html","1c94.html","fb6a.html","b78b.html","ebff.html","7104.html","eaa2.html","782d.html","fe0d.html","e7aa.html"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };