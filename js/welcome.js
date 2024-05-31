$.ajax({
    type: 'get',
    url: 'https://apis.map.qq.com/ws/location/v1/ip',
    data: {
        key: 'IMQBZ-3QGYG-OLYQA-QCXVJ-TJA5J-E4FYM',
        output: 'jsonp',
    },
    dataType: 'jsonp',
    success: function (res) {
        ipLocation = res;
    }
})
function getDistance(e1, n1, e2, n2) {
    const R = 6371
    const { sin, cos, asin, PI, hypot } = Math
    let getPoint = (e, n) => {
        e *= PI / 180
        n *= PI / 180
        return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) }
    }

    let a = getPoint(e1, n1)
    let b = getPoint(e2, n2)
    let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z)
    let r = asin(c / 2) * 2 * R
    return Math.round(r);
}

function showWelcome() {

    let dist = getDistance(116.38942238369017, 39.807753819719764, ipLocation.result.location.lng, ipLocation.result.location.lat); //这里记得换成自己的经纬度
    let pos = ipLocation.result.ad_info.nation;
    let ip;
    let posdesc;
    //根据国家、省份、城市信息自定义欢迎语
    switch (ipLocation.result.ad_info.nation) {
        case "日本":
            posdesc = "よろしく，樱花季约起来！";
            break;
        case "美国":
            posdesc = "Let us live in peace and enjoy some burgers!";
            break;
        case "英国":
            posdesc = "一起坐伦敦眼俯瞰这座城市吧！";
            break;
        case "俄罗斯":
            posdesc = "干了这瓶伏特加，我们是朋友！";
            break;
        case "法国":
            posdesc = "C'est La Vie，香槟和埃菲尔铁塔等着你！";
            break;
        case "德国":
            posdesc = "时间如飞箭，快来体验德国的效率！";
            break;
        case "澳大利亚":
            posdesc = "去大堡礁潜水，看看海底世界吧！";
            break;
        case "加拿大":
            posdesc = "枫叶之国，给你带来一片宁静。";
            break;
        case "中国":
            pos = ipLocation.result.ad_info.province + " " + ipLocation.result.ad_info.city + " " + ipLocation.result.ad_info.district;
            ip = ipLocation.result.ip;
            switch (ipLocation.result.ad_info.province) {
                case "北京市":
                    posdesc = "北京欢迎你~~~一起来感受古都的魅力！";
                    break;
                case "天津市":
                    posdesc = "来段相声，乐呵乐呵~";
                    break;
                case "河北省":
                    posdesc = "山势巍巍，雄关漫道，历史在这里流淌。";
                    break;
                case "山西省":
                    posdesc = "来尝尝山西的陈醋，酸酸甜甜就是你！";
                    break;
                case "内蒙古自治区":
                    posdesc = "天苍苍，野茫茫，骑马放牧真自在！";
                    break;
                case "辽宁省":
                    posdesc = "烤鸡架真香，快来尝尝吧！";
                    break;
                case "吉林省":
                    posdesc = "东北烧烤王中王，状元阁欢迎你！";
                    break;
                case "黑龙江省":
                    posdesc = "哈尔滨的冰雕和剧院，不容错过！";
                    break;
                case "上海市":
                    posdesc = "魔都欢迎你，体验时尚与古典的交融。";
                    break;
                case "江苏省":
                    switch (ipLocation.result.ad_info.city) {
                        case "南京市":
                            posdesc = "南京，我心中向往的城市。";
                            break;
                        case "苏州市":
                            posdesc = "上有天堂，下有苏杭，快来苏州看看吧！";
                            break;
                        default:
                            posdesc = "江苏人讲究散装，热情如火！";
                            break;
                    }
                    break;
                case "浙江省":
                    posdesc = "西湖美景三月天，边走边看美如画。";
                    break;
                case "河南省":
                    switch (ipLocation.result.ad_info.city) {
                        case "郑州市":
                            posdesc = "豫州之域，天地之中，不容错过。";
                            break;
                        case "南阳市":
                            posdesc = "南阳美景，等你来发现。";
                            break;
                        case "驻马店市":
                            posdesc = "嵖岈山美景如画，等你来探险！";
                            break;
                        case "开封市":
                            posdesc = "开封的历史和美食都等你来品味。";
                            break;
                        case "洛阳市":
                            posdesc = "洛阳牡丹甲天下，不见不散。";
                            break;
                        default:
                            posdesc = "河南的烩面，美味不容错过。";
                            break;
                    }
                    break;
                case "安徽省":
                    posdesc = "蚌埠住了，芜湖起飞，玩转安徽！";
                    break;
                case "福建省":
                    posdesc = "福建山水间，等你来探险。";
                    break;
                case "江西省":
                    posdesc = "落霞与孤鹜齐飞，来江西看美景吧！";
                    break;
                case "山东省":
                    posdesc = "齐州美景，海天一色，尽在山东。";
                    break;
                case "湖北省":
                    switch (ipLocation.result.ad_info.city) {
                        case "黄冈市":
                            posdesc = "黄冈将才辈出，不容小觑！";
                            break;
                        default:
                            posdesc = "热干面，武汉的特色美食，等你品尝。";
                            break;
                    }
                    break;
                case "湖南省":
                    posdesc = "74751，长沙斯塔克，快来长沙玩吧！";
                    break;
                case "广东省":
                    switch (ipLocation.result.ad_info.city) {
                        case "广州市":
                            posdesc = "小蛮腰等你来打卡，顺便喝个早茶吧~";
                            break;
                        case "深圳市":
                            posdesc = "深圳商场多多，买买买~";
                            break;
                        case "阳江市":
                            posdesc = "阳春合水，美丽家乡欢迎你！";
                            break;
                        default:
                            posdesc = "来广东，品尝各地美食！";
                            break;
                    }
                    break;
                case "广西壮族自治区":
                    posdesc = "桂林山水甲天下，快来体验自然美景。";
                    break;
                case "海南省":
                    posdesc = "朝观日出，夕看霞光，海南等你。";
                    break;
                case "四川省":
                    posdesc = "巴适得很，来四川看川妹子！";
                    break;
                case "贵州省":
                    posdesc = "茅台美酒，品味悠长。";
                    break;
                case "云南省":
                    posdesc = "玉龙雪山，云缠绕，冰川直耸天。";
                    break;
                case "西藏自治区":
                    posdesc = "草原辽阔，蓝天白云，尽在西藏。";
                    break;
                case "陕西省":
                    posdesc = "来碗臊子面，再配个馍，陕西美食等你。";
                    break;
                case "甘肃省":
                    posdesc = "春风不度玉门关，来甘肃体验边塞风情。";
                    break;
                case "青海省":
                    posdesc = "青海的牛肉干和酸奶，美味极了。";
                    break;
                case "宁夏回族自治区":
                    posdesc = "大漠孤烟，长河落日，宁夏等你。";
                    break;
                case "新疆维吾尔自治区":
                    posdesc = "丝绸之路，历史悠久，新疆欢迎你。";
                    break;
                case "台湾省":
                    posdesc = "海峡两岸，一水之隔，心却相连。";
                    break;
                case "香港特别行政区":
                    posdesc = "香港繁华都市，购物天堂，等你来逛。";
                    break;
                case "澳门特别行政区":
                    posdesc = "澳门美食，赌场，来一场华丽之旅。";
                    break;
                default:
                    posdesc = "世界那么大，带我去你的城市看看吧！";
                    break;
            }
            break;
        default:
            posdesc = "世界那么大，带我去你的国家看看吧！";
            break;
    }

    //根据本地时间切换欢迎语
    let timeChange;
    let date = new Date();
    if (date.getHours() >= 5 && date.getHours() < 11) timeChange = "<span>🌤️ 早上好，新的一天从希望开始！</span>";
    else if (date.getHours() >= 11 && date.getHours() < 13) timeChange = "<span>☀️ 中午好，午饭时间到了，吃饱饱哦！</span>";
    else if (date.getHours() >= 13 && date.getHours() < 17) timeChange = "<span>🕞 下午好，来杯茶放松一下吧！</span>";
    else if (date.getHours() >= 17 && date.getHours() < 19) timeChange = "<span>🚶‍♂️ 下班了，回家吃饭啦~</span>";
    else if (date.getHours() >= 19 && date.getHours() < 24) timeChange = "<span>🌙 晚上好，夜生活开始喽！</span>";
    else timeChange = "夜深了，早点休息，别熬夜哦~";

    // 新增ipv6显示为指定内容
    // if (ip.includes(":")) {
    //     ip = "<br>哇哦，IPv6地址，真高大上！";
    // }
    try {
        //自定义文本和需要放的位置
        let str = `欢迎来自 <b><span style="color: var(--kouseki-ip-color);font-size: var(--kouseki-gl-size)">${pos}</span></b> 的小伙伴💖<br>${posdesc}🍂<br>当前位置距博主约 <b><span style="color: var(--kouseki-ip-color)">${dist}</span></b> 公里！`;

        if (!ip.includes(":")) {
            str += `<br>您的IP地址为：<b><span>${ip}</span></b>`;
        }
        str += `<br>${timeChange} <br>`;
        document.getElementById("welcome-info").innerHTML = str;
                } catch (err) {
        console.log("Pjax无法获取元素")
    }
}
window.onload = showWelcome;
// 如果使用了pjax在加上下面这行代码
document.addEventListener('pjax:complete', showWelcome);
