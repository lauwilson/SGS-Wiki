'use strict';

export default function getImage(key) {
    var image;
    switch (key) {
        case 'caocao':
            image = require('../../images/caocao.jpg');
            break;
        case 'liubei':
            image = require('../../images/liubei.jpg');
            break;
        case 'sunquan':
            image = require('../../images/sunquan.jpg');
            break;
        case 'zhangjiao':
            image = require('../../images/zhangjiao.jpg');
            break;
        default:
            image = require('../../images/default.jpg');
    }
    return image;
}
