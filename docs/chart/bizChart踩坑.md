---
title: bizChart踩坑
author: qm
date: '2019-6-26'
categories:
 - chart
tags:
 - chart
---
1.Legend-绘制图例超过一行，发现多的会被隐藏

> 解决方案：目前只能用userHtml={true}进行自定义图例

```
 {/* 图例部分 */}
    <Legend position='bottom'
        useHtml={true} // 解决图例过多，有的会隐藏的问题
        g2-legend = {{ // 自定义模板时必须包含各个 dom 节点的 class，样式可以自定义
          marginLeft: '100px',
          marginTop: '-107px',
          position: "static",
        }}
        g2-legend-list={{
          border: 'none'
        }}
      />
```

2.数据过多会挤在一起，想拖动到一定范围查看具体细节

> 解决方案：使用slider与图表进行关联


```
<Slider data={slideData} width="auto" start={ds.state.start} scales={{
  dimension: {
    // type: 'time', // 加type为time，报错Invalid Date in fecha.format
    // mask: 'YY-MM-DD'
  }
}}
end={ds.state.end} xAxis="dimension"
yAxis="kpi" onChange={this.onChange.bind(this, {dataLists: dataLists, ds: ds, dv: dv})} padding={[0, 80, 0, 80]}/>
```

- [x] 注意：这里有个坑，我原本是想通过scales来设置时间的格式，发现正常渲染没有问题，但是一要更新数据，就会报Invalid Date in fecha.format这个错误，后来查找资料发现是bizchart里面对刚开始空数据没有做处理，他只在3.0.9以上的版本修复了chart里面的time、timeCat格式的，但是slider里面的貌似还是不行。

所以我放弃了这个方案，直接选择在底层数据里面进行处理转换。


3.接到一个折线图或者柱状图会有两个x轴的需求，翻了一下bizChart的文档发现并不支持，emmm....,？

> 解决方案： 我能怎么办，如果有两个x轴，我只能再画一个咯，看到bizChart的Guide里面有辅助线Line和文本Text，就用他俩了，看代码吧


```
// 去重+重复的个数
transArray = (arr) => {
    let obj = {};
    const newArr = [];
    arr.forEach((v,k)=>{
      if(obj[v]){
        obj[v]++;
      }else{
        obj[v] = 1;
      }
    });
    for (let index in obj){
      newArr.push({name: index, num: obj[index]});
    }
    return newArr;
  }
// 转换成guideTextList=[{name: '公海', num: 2},{name: '啥地区', num: 5}]这种格式，为画第二个x轴做准备
const guideTextList = this.transArray(data);

<Guide>
  {guideTextList.map((item, i) => {
    return  (<div>
      <Text 
        style={style} // 文本样式
        top={true}
        content={item.name} // 文本内容
        position={(xScale, yScale) => {
            // 这个就是返回每根辅助线的位置
          return [`${item.num/dataLists.length*50 + i * (item.num/dataLists.length*100)}%`, "110%"]
        }}
        offsetX= {0}
        offsetY= {offsetY}/>
        {/* 最后一根辅助线不需要 */}
      {guideTextList.length - 1 !== i && <Line 
        style={lineStyle}
        start={[`${item.num/dataLists.length*100 + i * (item.num/dataLists.length*100)}%`, '100%']}
        end={[`${item.num/dataLists.length*100 + i * (item.num/dataLists.length*100)}%`, `${yLine}`]}/>}
    </div>)
  })}
</Guide>
```

4.emmm..写的差不多的时候发现，因为bizChart只支持一个x轴，如果我提供的数据源有重复的数据，他会自动渲染到一个x轴的点？

> 解决方案：把每个x轴的数据都加上`？${index}`,在x轴渲染的时候再转换成自己想要的数据，如下



```
const label = {
  formatter: val => {
    const index = val.indexOf("?");
    return val.slice(0, index);
  },
  textStyle: {
    fontSize: '12',
    textBaseline: 'top'
  },
  autoRotate: true,
}
const cols = {
  kpi: {
    min: 0,
  },
  dimension: {
    tickCount: 10, // 展示10个横坐标刻度
  }
}
<Chart
  height={height}
  data={dv}
  scale={cols}
  padding={padding}
  forceFit
> 
  {/* 坐标轴部分 */}
  <Axis name="dimension" label={label}/>
  <Axis name="kpi"/>
  //因为把原数据全加上了`？${index}`， tooltip也需要自定义，把数据处理一下
  <Geom type="line" position="dimension*kpi" color="genre" style={{ cursor: 'pointer' }} tooltip={['dimension*kpi*genre', (dimension, kpi, genre) => {
      return {
        //自定义 tooltip 上显示的 title 显示内容等。
        name: genre,
        title: dimension.slice(0, dimension.indexOf("?")),
        value: kpi,
      };
    }]}/>
 </Chart>
```

- [x] 注意：
- tooltip自定义时['dimension*kpi*genre']这个是array，里面可以写多个，我一直以为是两个参数
- 两个x轴的时候，由于我把x轴的数据源转换成不会重复的，最好x轴用tickCount这个属性写死固定的个            数，以免数据展示的时候会很拥挤
    
    
    
5.图例要显示日期的格式的时候，日期过多，图例显示不出来

> 解决方案：日期的时候type："cat",

- [x] 注意：之前日期的时候压根没设置type，发现图例渲染的一直是连续时间戳，查找issue上，说日期需要加上type：timeCat，加上之后，图例少的时候是没有问题，于是我把api所有的type全测试了一遍type："cat"没有问题，后续发现emmm...，这简直一个坑接着一个坑

最后吐槽一句，文档有点不详细，哈哈



```
 const cols = {
    percent: {
      formatter: val => {
        val = (val * 100).toFixed(2) + "%";
        return val;
      }
    },
    "时间": {
      type: "cat"
    }
  };

<Chart
  height={height}
  data={dv}
  scale={cols}
  padding={padding}
  forceFit
> </Chart>
```
