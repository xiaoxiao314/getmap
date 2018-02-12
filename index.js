
var getMap = function () {}
	getMap.mapInit = function (gpCode,id='container',type='D',url='http://api.zgtxcj.com/shares/get_shares/k_data/?code=') {
		var self = this
        var downColor = '#00da3c';
        var upColor = '#ec0000';
        var dom = document.getElementById(id);
        var option = null;
        var resizeWorldMapContainer = function () {
          dom.style.width = window.innerWidth+'px';
          dom.style.height = window.innerHeight-40+'px';
        };
        resizeWorldMapContainer ()
        var myChart = echarts.init(dom, null, {renderer: 'svg'});
        $.get(url + gpCode +'&format=json&type='+type, function (rawData) {
          var arr = [];
          rawData = rawData.split('\n');
          for(var nm in rawData){
            var theData = rawData[nm].split(',');
            var tmp = ([theData[0], parseFloat(theData[1]), parseFloat(theData[2]), parseFloat(theData[3]), parseFloat(theData[4]), parseFloat(theData[5])]);
            arr.push(tmp);
          }
          var data = splitData(arr);
		  let mapStar = 90;
		  if (data.categoryData.length<30) {
            mapStar = 0
          } else {
            mapStar = 90
          }
          myChart.setOption(option = {
            backgroundColor: '#fff',
            legend: {
              data: ['K线', 'MA5', 'MA10', 'MA20', 'MA30'],
              top:'3.5%',
              inactiveColor: '#777',
              textStyle: {
                color: '#000'
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                animation: false,
                type: 'cross',
                lineStyle: {
                  color: '#376df4',
                  width: 2,
                  opacity: 1
                }
              },
			  position: function (pos, params, el, elRect, size) {
                var obj = {top: 10};
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                return obj;
              },
              triggerOn: 'mousemove|click',
            },
            axisPointer: {
              link: {xAxisIndex: 'all'},
              label: {
                backgroundColor: '#777'
              }
            },
            visualMap: {
              show: false,
              seriesIndex: 5,
              dimension: 2,
              pieces: [{
                value: 1,
                color: upColor
              }, {
                value: -1,
                color: downColor
              }]
            },
            xAxis: [
              {
                type: 'category',
                data: data.categoryData,
                axisLine: { lineStyle: { color: '#8392A5' } }
              },{
                type: 'category',
                gridIndex: 1,
                data: data.categoryData,
                axisLine: {onZero: false},
                axisTick: {show: false},
                splitLine: {show: false},
                axisLabel: {show: false},
                splitNumber: 20,
              }
            ],
            yAxis: [
              {
                scale: true,
                axisLine: { lineStyle: { color: '#8392A5' } },
                splitLine: { show: false },
              },
              {
                scale: true,
                gridIndex: 1,
                axisLabel: {show: false},
                axisLine: {show: false},
                axisTick: {show: false},
                splitLine: {show: false}
              },
              {
                scale: true,
                gridIndex: 1,
                axisLabel: {show: false},
                axisLine: {show: false},
                axisTick: {show: false},
                splitLine: {show: false}
              }
            ],
            grid: [
              {
                left: '8%',
                right: '8%',
                top: '10%',
                height: '50%'
              },
              {
                left: '8%',
                right: '8%',
                top: '70%',
                height: '26%'
              }
            ],
            dataZoom: [{
              type: 'inside',
              start: 50,
              end: 100,
              textStyle: {
                color: '#8392A5'
              },
              dataBackground: {
                areaStyle: {
                  color: '#8392A5'
                },
                lineStyle: {
                  opacity: 0.8,
                  color: '#8392A5'
                }
              },
              handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            },{
              show: true,
              xAxisIndex: [0, 1],
              type: 'inside',
              top: '85%',
              start: 50,
              end: 100
            },
              {
                show: true,
                xAxisIndex: [0, 1],
                type: 'inside',
                top: '85%',
                start: 50,
                end: 100
              }
            ],
            animation: false,
            series: [
                {
                type: 'candlestick',
                name: 'K线',
                data: data.values,
                itemStyle: {
                  normal: {
                    color: '#FD1050',
                    color0: '#0CF49B',
                    borderColor: '#FD1050',
                    borderColor0: '#0CF49B'
                  }
                }
              },
              {
                name: 'MA5',
                type: 'line',
                data: calculateMA(5, data),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                  normal: {
                    width: 1
                  }
                }
              },
              {
                name: 'MA10',
                type: 'line',
                data: calculateMA(10, data),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                  normal: {
                    width: 1
                  }
                }
              },
              {
                name: 'MA20',
                type: 'line',
                data: calculateMA(20, data),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                  normal: {
                    width: 1
                  }
                }
              },
              {
                name: 'MA30',
                type: 'line',
                data: calculateMA(30, data),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                  normal: {
                    width: 1
                  }
                }
              },
              {
                name: '成交量',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: data.volumes
              },
              {
                name: 'MA5',
                type: 'line',
                data: calculateMA2(5, data),
                xAxisIndex: 1,
                yAxisIndex: 2,
                smooth: true,
                showSymbol: false,
                lineStyle: {
                  normal: {
                    width: 1
                  }
                }
              },
              {
                name: 'MA10',
                type: 'line',
                data: calculateMA2(10, data ),
                xAxisIndex: 1,
                yAxisIndex: 2,
                smooth: true,
                showSymbol: false,
                lineStyle: {
                  normal: {
                    width: 1
                  }
                }
              }
            ]
          }, true);
          window.onresize = function () {
            resizeWorldMapContainer();
            myChart.resize();
          };
        });
      }
  function splitData(rawData) {
    var categoryData = [];
    var values = [];
    var volumes = [];
    for (var i = 0; i < rawData.length; i++) {
      categoryData.push(rawData[i].splice(0, 1)[0]);
      values.push(rawData[i]);
      volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
    }

    return {
      categoryData: categoryData,
      values: values,
      volumes: volumes
    };
  }
  function calculateMA(dayCount, data) {
    var result = [];
    for (var i = 0, len = data.values.length; i < len; i++) {
      if (i < dayCount) {
        result.push('-');
        continue;
      }
      var sum = 0;
      for (var j = 0; j < dayCount; j++) {
        sum += data.values[i - j][1];
      }
      result.push(+(sum / dayCount).toFixed(3));
    }
    return result;
  }
  function calculateMA2(dayCount, data) {
    var result = [];
    for (var i = 0, len = data.volumes.length; i < len; i++) {
      if (i < dayCount) {
        result.push('-');
        continue;
      }
      var sum = 0;
      for (var j = 0; j < dayCount; j++) {
        sum += data.volumes[i - j][1];
      }
      result.push(+(sum / dayCount).toFixed(3));
    }
    return result;
  }

  export {getMap}

