// 首页一图流加载优化
/**
 * @description 实现medium的渐进加载背景的效果
 */
(function() {
    class ProgressiveLoad {
        constructor(smallSrc, largeSrc) {
            this.smallSrc = smallSrc;
            this.largeSrc = largeSrc;
            this.initTpl();
            this.container.addEventListener('animationend', () => {
                this.smallStage.style.display = 'none';
            }, {once: true});
        }

        initTpl() {
            this.container = document.createElement('div');
            this.smallStage = document.createElement('div');
            this.largeStage = document.createElement('div');
            this.smallImg = new Image();
            this.largeImg = new Image();
            this.container.className = 'pl-container';
            this.smallStage.className = 'pl-img pl-blur';
            this.largeStage.className = 'pl-img';
            this.container.appendChild(this.smallStage);
            this.container.appendChild(this.largeStage);
            this.smallImg.onload = this._onSmallLoaded.bind(this);
            this.largeImg.onload = this._onLargeLoaded.bind(this);
        }

        progressiveLoad() {
            this.smallImg.src = this.smallSrc;
            this.largeImg.src = this.largeSrc;
        }

        _onLargeLoaded() {
            this.largeStage.classList.add('pl-visible');
            this.largeStage.style.backgroundImage = `url('${this.largeSrc}')`;
        }

        _onSmallLoaded() {
            this.smallStage.classList.add('pl-visible');
            this.smallStage.style.backgroundImage = `url('${this.smallSrc}')`;
        }
    }

    const executeLoad = (config, target) => {
        console.log('执行渐进背景替换');
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        const loader = new ProgressiveLoad(
            isMobile ? config.mobileSmallSrc : config.smallSrc,
            isMobile ? config.mobileLargeSrc : config.largeSrc
        );
        if (target.children[0]) {
            target.insertBefore(loader.container, target.children[0]);
        }
        loader.progressiveLoad();
    };

    const ldconfig = {
        light: {
            // smallSrc: '/blog-img/top/1716710141780.jpg',
            // largeSrc: '/blog-img/top/1716815000.jpg',
            // mobileSmallSrc: '/blog-img/top/1716710141755.jpg',
            // mobileLargeSrc: '/blog-img/top/1716710141767.jpg',
            // enableRoutes: ['/'],
            smallSrc: 'https://qn.ctext.top/blog-img/top/1716815228951.jpg',
            largeSrc: 'https://qn.ctext.top/blog-img/top/1716815228957.jpg',
            mobileSmallSrc: 'https://qn.ctext.top/blog-img/top/1716815228938.jpg',
            mobileLargeSrc: 'https://qn.ctext.top/blog-img/top/1716815228945.jpg',
            enableRoutes: ['/'],
        },
        dark: {
            smallSrc: 'https://qn.ctext.top/blog-img/top/1716815228951.jpg',
            largeSrc: 'https://qn.ctext.top/blog-img/top/1716815228957.jpg',
            mobileSmallSrc: 'https://qn.ctext.top/blog-img/top/1716815228938.jpg',
            mobileLargeSrc: 'https://qn.ctext.top/blog-img/top/1716815228945.jpg',
            enableRoutes: ['/'],
        },
    };

    const getCurrentTheme = () => {
        return document.documentElement.getAttribute('data-theme');
    }

    const onThemeChange = () => {
        const currentTheme = getCurrentTheme();
        const config = ldconfig[currentTheme];
        initProgressiveLoad(config);
        document.addEventListener("DOMContentLoaded", function() {
            initProgressiveLoad(config);
        });

        document.addEventListener("pjax:complete", function() {
            onPJAXComplete(config);
        });
    }

    let initTheme = getCurrentTheme();
    let initConfig = ldconfig[initTheme];
    initProgressiveLoad(initConfig);

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === "data-theme" && location.pathname === '/') {
                onThemeChange();
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"]
    });

    function initProgressiveLoad(config) {
        const container = document.querySelector('.pl-container');
        if (container) {
            container.remove();
        }
        const target = document.getElementById('page-header');
        if (target && target.classList.contains('full_page')) {
            executeLoad(config, target);
        }
    }

    function onPJAXComplete(config) {
        const target = document.getElementById('page-header');
        if (target && target.classList.contains('full_page')) {
            initProgressiveLoad(config);
        }
    }

})();
