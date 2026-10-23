document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('img');
    const totalImages = images.length;
    let loadedImages = 0;

    // 为所有图片添加占位符样式
    images.forEach(img => {
        img.classList.add('placeholder');
    });

    const checkAllImagesLoaded = () => {
        if (loadedImages === totalImages) {
            document.querySelector('.content').style.display = 'block';
            images.forEach(img => {
                img.classList.remove('placeholder');
            });
        }
    };

    images.forEach(img => {
        const tempImg = new Image();
        tempImg.src = img.src;
        tempImg.onload = () => {
            loadedImages++;
            checkAllImagesLoaded();
        };
        tempImg.onerror = () => {
            loadedImages++;
            checkAllImagesLoaded();
        };
    });
});
