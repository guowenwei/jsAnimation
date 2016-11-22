/**
 * Created by weiguowen on 2016/11/22.
 */
function startAnimation(obj, json, fn) {
    //假设所有的运动都到达目标值
    var flag = true;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        for (var attr in json) {
            //1 获取当前的值
            var icur = 0;
            if (attr == 'opacity') {
                //Math.round四舍五入
                icur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                icur = parseInt(getStyle(obj, attr));
            }
            //2算速度
            var speed = (json[attr] - icur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            //3检测停止：当目标值和当前的值不相等，就证明动画没有完成。
            if (icur != json[attr]) {
                flag = false;
            }else {
                flag = true;
            }

            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:'+(icur+speed)+')';
                obj.style.opacity = (speed + icur) / 100;
            } else {
                obj.style[attr] = icur + speed + 'px';
            }
        }
        //如果等于true就证明动画完成
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
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