/**
 * Created by weiguowen on 2016/11/22.
 */
function startAnimation(obj, attr, target) {
    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
        var icur = 0;
        if (attr == 'opacity') {
            //Math.round四舍五入
            icur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
        } else {
            icur = parseInt(getStyle(obj, attr));
        }

        var speed = (target - icur) / 8;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (icur == target) {
            clearInterval(obj.timer);
        } else {
            if (attr == 'opacity') {
                obj.style.filter = 'alpha:(opacity:'+icur+speed+')';
                obj.style.opacity = (speed + icur) / 100;
                console.log(obj.style.opacity);
            } else {
                obj.style[attr] = icur + speed + 'px';
            }
        }
    }, 30)
}

/**
 * 根据对象得到真实的属性
 * @param obj
 * @param attr
 * @returns {*}
 */
function getStyle(obj, attr) {
    if (obj.currentStyle) {//IE
        return obj.currentStyle[attr];
    } else {//firefox
        return getComputedStyle(obj, false)[attr];
    }
}