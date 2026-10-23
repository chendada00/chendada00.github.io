(function() {
    // 读取配置：优先使用用户定义的 window.cyberCoupletConfig，否则使用默认值
    const userConfig = window.cyberCoupletConfig || {};

    const config = {
        leftText: "清风入世  月照千山道意生",
        rightText: "瑞霭浮空  云开万壑仙光现",
        topText: "人间真境",
        color: userConfig.color || "#1a1a1a", // 墨黑色
        bg: userConfig.bg || "#cf2121",    // 中国红
        font: userConfig.font || "'DingTalk JinBuTi','Ma Shan Zheng', 'Kaiti', 'STKaiti', '华文楷体', serif"
    };

    // 移动端不显示
    if (window.innerWidth < 768) return;

    // 注入书法字体
    if (!document.getElementById('font-ma-shan-zheng')) {
        const link = document.createElement('link');
        link.id = 'font-ma-shan-zheng';
        link.href = "https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }

    // 注入样式
    const style = document.createElement('style');
    style.innerHTML = `
        .cyber-couplet {
            position: fixed;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            padding: 25px 12px;
            background-color: ${config.bg};
            color: ${config.color};
            font-family: ${config.font};
            font-size: 36px;
            font-weight: 500;
            text-align: center;
            line-height: 1.1;
            border: 1px solid #991a1a;
            box-shadow: 2px 2px 10px rgba(0,0,0,0.4), inset 0 0 15px rgba(0,0,0,0.1);
            z-index: 2147483647;
            writing-mode: vertical-rl;
            user-select: none;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            white-space: nowrap;
        }
        .cyber-couplet:hover {
            transform: translateY(-50%) scale(1.05);
        }
        .cyber-couplet-left { left: 40px; }
        .cyber-couplet-right { right: 40px; }
        
        .cyber-couplet-top {
            position: fixed;
            top: 60px;
            left: 50%;
            transform: translateX(-50%);
            padding: 10px 45px;
            background-color: ${config.bg};
            color: ${config.color};
            font-family: ${config.font};
            font-size: 32px;
            border: 1px solid #991a1a;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            z-index: 2147483647;
        }

        .couplet-close {
            position: absolute;
            top: -12px;
            right: -12px;
            width: 24px;
            height: 24px;
            background: #1a1a1a;
            color: #fff;
            font-size: 14px;
            line-height: 24px;
            text-align: center;
            border-radius: 50%;
            cursor: pointer;
            writing-mode: horizontal-tb;
            display: none;
            border: 1px solid #fff;
        }
        .cyber-couplet:hover .couplet-close,
        .cyber-couplet-top:hover .couplet-close {
            display: block;
        }
    `;
    document.head.appendChild(style);

    function createCouplet(text, className) {
        if(!text) return;
        const div = document.createElement('div');
        div.className = className;
        div.innerHTML = text;

        const closeBtn = document.createElement('div');
        closeBtn.className = 'couplet-close';
        closeBtn.innerText = '×';
        closeBtn.onclick = (e) => {
            e.stopPropagation();
            document.querySelectorAll('.cyber-couplet, .cyber-couplet-top').forEach(el => el.remove());
        };

        div.appendChild(closeBtn);
        document.body.appendChild(div);
    }

    const init = () => {
        if (document.querySelector('.cyber-couplet')) return;
        createCouplet(config.leftText, 'cyber-couplet cyber-couplet-left');
        createCouplet(config.rightText, 'cyber-couplet cyber-couplet-right');
        createCouplet(config.topText, 'cyber-couplet-top');
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        window.addEventListener('DOMContentLoaded', init);
    }


    // 初始化函数
    function initCouplet() {

        // 只在首页显示
        if (!/^\/(index\.html)?$/.test(location.pathname)) {
            document.querySelectorAll('.cyber-couplet, .cyber-couplet-top')
                .forEach(el => el.remove());
            return;
        }

        if (document.querySelector('.cyber-couplet')) return;

        createCouplet(config.leftText, 'cyber-couplet cyber-couplet-left');
        createCouplet(config.rightText, 'cyber-couplet cyber-couplet-right');
        createCouplet(config.topText, 'cyber-couplet-top');
    }


    // 页面首次加载
    document.addEventListener("DOMContentLoaded", initCouplet);

    // Hexo PJAX 跳转后
    document.addEventListener("pjax:complete", initCouplet);
})();