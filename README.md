# getmap
试用股票代码自动完成K线图绘制，日K，周K，月K，5,15,30,60图
PS：需要事先引入jquery 和 echarts
### 使用方法:
```
cnpm install cdmap --save

```
然后
```

import { getMap } from 'cdmap'

getMap.mapInit(gpCode,con,type)



```

`options` 参数说明：
```
{
gpCode:股票代码，6位数字代码(例如：600050)
con:canvas容器ID(例如：<div id='container'></div>)
type:绘制的属性(D,W,M,5,15,30,60)对应日K、周K、月K等，默认值为 D
}
```