---
title: 前言
author: 易函123
date: '2024-06-06'
---

# 概览

object-fit: fill; object-fit: contain; object-fit: cover; object-fit: none; object-fit: scale-down;

object-position 要比 object-fit 单纯的多，就是控制图片在盒子中显示位置的。默认值是 50% 50%，也就是居中效果，所以，无论上一节 object-fit 值为那般，图片都是水平垂直居中的。因此，下次要实现尺寸大小不固定图片的垂直居中效果，可以试试 object-fit. 与 background-position 类似，object-position 的值类型为类型值。也就是说，CSS3 的相对坐标设定样式支持的。

注：目前 IE 应该还不支持 object-fit 和 object-position 属性

https://www.zhangxinxu.com/wordpress/2015/03/css3-object-position-object-fit/ https://www.cnblogs.com/libo0125ok/p/8422617.html
