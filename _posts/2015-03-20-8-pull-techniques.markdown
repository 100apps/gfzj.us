---
layout: post
title: "科学打台球"
date: 2015-03-20 13:27:35
category: life
img: /images/taiqiu.jpg
by: gf
description: 最近打了一段时间的台球，总结一下瞄准的方法和技巧
---

打台球，姿势当然很重要，Google一下一大把，姿势练好了。我打台球有个重要的毛病，角度越小越打不准，一开始不理解为什么。其实仔细分析一下确实是，在合理范围内，角度越大越容易打进。最难的当然是直球，如果直球每次都很准了，打带角度的应该就不难了。为什么不难呢？这篇文章就分析一下。

比如我们现在遇到的情况如下图：

![台球位置](/images/taiqiu2.jpg)

很容易计算出来：

	sinα=d/2r	(其中r是台球的半径，d是假象球覆盖住目标球的距离)

所以在瞄准距离为d的情况下，目标球的角度是：

	α＝arcsin(d/2r)

我们知道sina不是线性关系。我们画个图,计算角度和距离的关系

<div id="chart1" style="height:500px"></div>
<script src="http://echarts.baidu.com/build/dist/echarts.js"></script>
<script type="text/javascript">
require.config({
	paths: {
		echarts: 'http://echarts.baidu.com/build/dist'
	}
	});
        require(
            [
                'echarts',
                'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('chart1')); 
                
                var option = {
                    tooltip: {
                        show: true
                    },
                    legend: {
                        data:['瞄准距离为d所能打出的角度']
                    },
                    xAxis : [
                        {
                            type : '瞄准距离',
                            data : ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            "name":"角度",
                            "type":"line",
                            "data":[5, 20, 40, 10, 10, 20]
                        }
                    ]
                };
        
                // 为echarts对象加载数据 
                myChart.setOption(option); 
            }
        );
</script>

