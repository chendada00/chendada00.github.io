function initKunShake(options = {}) {
    const config = {
        imgUrl: 'https://pic.xn--xpqp35o.cn/file/blog/1772700292915_kun2026.webp',
        width: 150,
        left: 20,
        bottom: 20,
        shakeDuration: 0.8,
        onShakeEnd: null,
        audioUrls: [
            'https://web.wang618.cn/kun/你干嘛.mp3',
            'https://web.wang618.cn/kun/练习生.mp3',
            'https://web.wang618.cn/kun/鸡你太美.mp3'
        ],
        emojiCount: 40,
        emojiSizeRange: [24, 56],
        fallSpeedRange: [2, 7],
        swingRange: [10, 35],
        emojis: ['🏀', '🎵', '🐔', '🎤', '🥚'],
        emojiShadow: '0 2px 10px rgba(0,0,0,0.35)',
        moveRange: { x: [0, 100], y: [0, 100] },
        moveSpeed: 500
    };

    Object.assign(config, options);

    let audioElements = [];
    let currentPlayingAudio = null;
    let emojiRain = null;
    let moveInterval = null;
    const initialPosition = { left: config.left, bottom: config.bottom };
    let unplayedAudioIndices = [];
    let playedAudioIndices = [];

    class EmojiRain {
        constructor(config) {
            this.config = config;
            this.emojis = [];
            this.container = null;
            this.animationFrame = null;
        }

        createContainer() {
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100vw';
            container.style.height = '100vh';
            container.style.pointerEvents = 'none';
            container.style.zIndex = '99998';
            container.style.overflow = 'hidden';
            document.body.appendChild(container);
            this.container = container;
            return container;
        }

        createEmoji() {
            const size = this.getRandom(...this.config.emojiSizeRange);
            const emoji = document.createElement('div');
            
            emoji.style.position = 'absolute';
            emoji.style.width = `${size}px`;
            emoji.style.height = `${size}px`;
            emoji.style.fontSize = `${size}px`;
            emoji.style.lineHeight = '1';
            emoji.style.textAlign = 'center';
            emoji.style.textShadow = this.config.emojiShadow;
            emoji.style.opacity = '0.95';
            emoji.style.transform = 'translateZ(0)';
            emoji.style.transition = 'transform 0.1s ease';
            
            const randomEmoji = this.config.emojis[Math.floor(Math.random() * this.config.emojis.length)];
            emoji.textContent = randomEmoji;
            
            emoji.style.left = `${this.getRandom(0, window.innerWidth - size)}px`;
            emoji.style.top = `-${size}px`;
            
            const emojiState = {
                element: emoji,
                x: parseFloat(emoji.style.left),
                y: -size,
                size,
                fallSpeed: this.getRandom(...this.config.fallSpeedRange),
                swingAmplitude: this.getRandom(...this.config.swingRange),
                swingFrequency: this.getRandom(0.01, 0.04),
                swingPhase: this.getRandom(0, Math.PI * 2),
                rotateSpeed: this.getRandom(-1.2, 1.2),
                bounce: this.getRandom(0.8, 1.2)
            };
            
            this.container.appendChild(emoji);
            return emojiState;
        }

        getRandom(min, max) {
            return Math.random() * (max - min) + min;
        }

        init() {
            this.destroy();
            this.createContainer();
            
            for (let i = 0; i < this.config.emojiCount; i++) {
                this.emojis.push(this.createEmoji());
            }
            
            this.animate();
        }

        animate() {
            this.emojis.forEach((emoji) => {
                emoji.y += emoji.fallSpeed * emoji.bounce;
                
                emoji.x += Math.sin(emoji.swingPhase) * emoji.swingAmplitude * 0.12;
                emoji.swingPhase += emoji.swingFrequency;
                
                const rotateAngle = emoji.rotateSpeed * (emoji.y / 10);
                
                const scale = 1 + Math.sin(emoji.y * 0.02) * 0.1;
                
                emoji.element.style.transform = `translateX(${emoji.x - parseFloat(emoji.element.style.left)}px) rotate(${rotateAngle}deg) scale(${scale})`;
                emoji.element.style.top = `${emoji.y}px`;
                
                if (emoji.y > window.innerHeight + emoji.size) {
                    emoji.y = -emoji.size;
                    emoji.x = this.getRandom(0, window.innerWidth - emoji.size);
                    emoji.element.style.left = `${emoji.x}px`;
                    emoji.element.style.top = `${emoji.y}px`;
                    const randomEmoji = this.config.emojis[Math.floor(Math.random() * this.config.emojis.length)];
                    emoji.element.textContent = randomEmoji;
                    emoji.bounce = this.getRandom(0.8, 1.2);
                    emoji.rotateSpeed = this.getRandom(-1.2, 1.2);
                }
            });
            
            this.animationFrame = requestAnimationFrame(() => this.animate());
        }

        destroy() {
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
            if (this.container && this.container.parentNode) {
                this.container.parentNode.removeChild(this.container);
            }
            this.emojis = [];
            this.container = null;
            this.animationFrame = null;
        }
    }

    function initAudios() {
        config.audioUrls.forEach(url => {
            const audio = new Audio(url);
            audio.preload = 'auto';
            audio.volume = 1;
            audioElements.push(audio);
        });
        unplayedAudioIndices = Array.from({length: audioElements.length}, (_, i) => i);
        playedAudioIndices = [];
    }

    function playRandomAudio() {
        if (audioElements.length === 0) return null;
        
        if (currentPlayingAudio) {
            currentPlayingAudio.pause();
            currentPlayingAudio.currentTime = 0;
            if (emojiRain) {
                emojiRain.destroy();
            }
        }

        if (unplayedAudioIndices.length === 0) {
            unplayedAudioIndices = [...playedAudioIndices];
            playedAudioIndices = [];
            console.log('所有音频已播放一遍，重新开始循环～');
        }

        const randomIndexInUnplayed = Math.floor(Math.random() * unplayedAudioIndices.length);
        const audioIndex = unplayedAudioIndices[randomIndexInUnplayed];
        
        unplayedAudioIndices.splice(randomIndexInUnplayed, 1);
        playedAudioIndices.push(audioIndex);

        currentPlayingAudio = audioElements[audioIndex];
        currentPlayingAudio.currentTime = 0;
        
        currentPlayingAudio.play().catch(error => {
            console.log('音频播放失败:', error);
            currentPlayingAudio = null;
            playedAudioIndices.pop();
            unplayedAudioIndices.push(audioIndex);
        });

        return currentPlayingAudio;
    }

    function getRandomPosition(element) {
        const elementWidth = element.offsetWidth || config.width;
        const elementHeight = element.offsetHeight || config.width;
        
        const maxX = window.innerWidth - elementWidth;
        const maxY = window.innerHeight - elementHeight;
        
        const minX = (config.moveRange.x[0] / 100) * maxX;
        const maxXLimited = (config.moveRange.x[1] / 100) * maxX;
        const minY = (config.moveRange.y[0] / 100) * maxY;
        const maxYLimited = (config.moveRange.y[1] / 100) * maxY;
        
        const x = Math.random() * (maxXLimited - minX) + minX;
        const y = Math.random() * (maxYLimited - minY) + minY;
        
        return { x, y };
    }

    function startRandomMove(element) {
        if (moveInterval) {
            clearInterval(moveInterval);
        }
        
        element.style.transition = `left ${config.moveSpeed / 1000}s cubic-bezier(0.34, 1.56, 0.64, 1), bottom ${config.moveSpeed / 1000}s cubic-bezier(0.34, 1.56, 0.64, 1)`;
        
        element.classList.add('moving');
        
        moveInterval = setInterval(() => {
            const { x, y } = getRandomPosition(element);
            element.style.left = `${x}px`;
            element.style.bottom = `${y}px`;
        }, config.moveSpeed);
    }

    function stopRandomMove(element) {
        if (moveInterval) {
            clearInterval(moveInterval);
            moveInterval = null;
        }
        
        element.style.transition = `left 0.8s ease-out, bottom 0.8s ease-out`;
        element.style.left = `${initialPosition.left}px`;
        element.style.bottom = `${initialPosition.bottom}px`;
        
        element.classList.remove('moving');
    }

    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .kun {
                position: fixed;
                left: ${config.left}px;
                bottom: ${config.bottom}px;
                width: ${config.width}px;
                height: auto;
                cursor: pointer;
                z-index: 99999;
                filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.2));
                transition: transform 0.03s ease;
                transform-origin: center center;
                user-select: none;
            }
            .kun img {
                width: 100%;
                height: auto;
                display: block;
                border-radius: 8px;
                object-fit: cover;
                pointer-events: none;
            }
            /* 新增：💤 表情样式 */
            .kun .sleep-emoji {
                position: absolute;
                top: -20px;
                right: -10px;
                font-size: 32px;
                z-index: 100000;
                pointer-events: none;
                transition: opacity 0.3s ease;
                animation: float 2s ease-in-out infinite;
            }
/* ✅ 移动端缩小到 50px */
    @media (max-width: 768px) {
      .kun { width: 50px !important; }

      /* 💤 也同步缩小 */
      .kun .sleep-emoji {
        font-size: 14px !important;
        top: -10px !important;
        right: -6px !important;
      }

      /* 圆角跟着变小 */
      .kun img { border-radius: 4px !important; }
    }
            /* 运动/抖动状态隐藏 💤 表情 */
            .kun.shaking .sleep-emoji,
            .kun.moving .sleep-emoji {
                opacity: 0;
            }
            /* 静止状态显示 💤 表情 */
            .kun:not(.shaking):not(.moving) .sleep-emoji {
                opacity: 1;
            }
            .kun:active {
                transform: scale(0.9);
                filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.25));
            }
            @keyframes strongShake {
                0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
                10% { transform: translate(45px, -35px) rotate(-10deg) scale(1.2); }
                20% { transform: translate(-40px, 30px) rotate(8deg) scale(0.85); }
                30% { transform: translate(38px, -28px) rotate(-7deg) scale(1.15); }
                40% { transform: translate(-35px, 25px) rotate(6deg) scale(0.9); }
                50% { transform: translate(32px, -22px) rotate(-5deg) scale(1.2); }
                60% { transform: translate(-28px, 20px) rotate(4deg) scale(0.85); }
                70% { transform: translate(25px, -18px) rotate(-6deg) scale(1.15); }
                80% { transform: translate(-22px, 16px) rotate(7deg) scale(0.9); }
                90% { transform: translate(20px, -15px) rotate(-8deg) scale(1.18); }
            }
            .kun.shaking {
                animation: strongShake ${config.shakeDuration}s ease-in-out infinite;
                filter: drop-shadow(0 12px 24px rgba(107, 125, 226, 0.6));
            }
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
            }
            .kun:not(.shaking) {
                animation: float 3s ease-in-out infinite;
            }
            @keyframes lightningTrail {
                0% { filter: drop-shadow(0 0 10px rgba(66, 133, 244, 0.8)) 
                              drop-shadow(0 0 20px rgba(66, 133, 244, 0.6)) 
                              drop-shadow(0 0 30px rgba(66, 133, 244, 0.4)) 
                              blur(2px); }
                50% { filter: drop-shadow(0 0 15px rgba(66, 133, 244, 0.9)) 
                              drop-shadow(0 0 25px rgba(66, 133, 244, 0.7)) 
                              drop-shadow(0 0 35px rgba(66, 133, 244, 0.5)) 
                              blur(3px); }
                100% { filter: drop-shadow(0 0 10px rgba(66, 133, 244, 0.8)) 
                               drop-shadow(0 0 20px rgba(66, 133, 244, 0.6)) 
                               drop-shadow(0 0 30px rgba(66, 133, 244, 0.4)) 
                               blur(2px); }
            }
            .kun.moving {
                animation: lightningTrail 0.5s ease-in-out infinite;
                transform: translateZ(0);
                will-change: left, bottom, filter;
            }
            .kun.shaking.moving {
                animation: strongShake ${config.shakeDuration}s ease-in-out infinite,
                           lightningTrail 0.5s ease-in-out infinite;
                animation-composition: add;
            }
        `;
        document.head.appendChild(style);
    }

    function createElement() {
        const kunDiv = document.createElement('div');
        kunDiv.className = 'kun';
        kunDiv.id = 'shakable';

        const img = document.createElement('img');
        img.src = config.imgUrl;
        img.alt = '点击抖动图片';
        img.draggable = false;

        // 新增：创建 💤 表情元素
        const sleepEmoji = document.createElement('div');
        sleepEmoji.className = 'sleep-emoji';
        sleepEmoji.textContent = '💤';

        kunDiv.appendChild(img);
        kunDiv.appendChild(sleepEmoji); // 添加到容器中
        document.body.appendChild(kunDiv);

        return kunDiv;
    }

    function bindEvents(element) {
        let isAnimating = false;

        const handleTrigger = () => {
            if (isAnimating) return;

            const audio = playRandomAudio();
            if (!audio) return;

            isAnimating = true;
            element.classList.add('shaking');
            
            startRandomMove(element);
            
            if (!emojiRain) {
                emojiRain = new EmojiRain(config);
            }
            emojiRain.init();

            const onAudioEnd = () => {
                element.classList.remove('shaking');
                stopRandomMove(element);
                
                audio.removeEventListener('ended', onAudioEnd);
                isAnimating = false;
                currentPlayingAudio = null;
                
                if (emojiRain) {
                    emojiRain.destroy();
                }
                
                if (typeof config.onShakeEnd === 'function') {
                    config.onShakeEnd();
                }
            };

            audio.addEventListener('ended', onAudioEnd);
        };

        element.addEventListener('click', handleTrigger);

        element.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        element.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initAudios();
            injectStyles();
            const shakableElement = createElement();
            bindEvents(shakableElement);
        });
    } else {
        initAudios();
        injectStyles();
        const shakableElement = createElement();
        bindEvents(shakableElement);
    }

    return shakableElement;
}

initKunShake({
    width: 150,
    left: 20,
    bottom: 20,
    shakeDuration: 0.6,
    emojiCount: 50,
    emojiSizeRange: [30, 58],
    fallSpeedRange: [3, 8],
    swingRange: [15, 40],
    emojis: ['🏀', '🎵', '🐔', '🎤', '🥚'],
    moveSpeed: 300,
    moveRange: { x: [0, 100], y: [0, 100] },
    onShakeEnd: () => {
        console.log('抖动结束啦！回归原位～');
    }
});