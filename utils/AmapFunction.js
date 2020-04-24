export default class AmapFun {
  createAmap(dom = '', options = {}) {
    const defaultAmap = {
      // mapStyle: MapStyleKey,
      resizeEnable: true
    }
    return new Promise(async (resolve, reject) => {
      if (window.hasOwnProperty('AMap')) {
        let mapConfig = new window.AMap.Map(dom, Object.assign({}, defaultAmap, options))
        mapConfig.on('complete', () => {
          console.log('地图初始化成功')
          // 地图图块加载完成后触发
          resolve(mapConfig)
        })
      } else {
        console.log('地图初始化失败')
      }
    })
  }
  createMouseTool(mapConfig) {
    return new Promise((resolve) => {
      window.AMap.plugin(['AMap.MouseTool'], () => {
        resolve(new window.AMap.MouseTool(mapConfig))
      })
    })
  }
  createPoint(lng, lat) {
    return new window.AMap.LngLat(lng, lat)
  }
  createIcon(iconPath = '', width = 40, height = 40) {
    return new window.AMap.Icon({
      size: new window.AMap.Size(width, height),
      image: iconPath,
      // 图标所用图片大小
      imageSize: new window.AMap.Size(width, height)
    })
  }
  createMarker(center, options = {}) {
    return new window.AMap.Marker(Object.assign({
      position: center
    }, options))
  }

  createCircle(center, radius, options = {}) {
    const defaultCircle = {
      borderWeight: 1,
      cursor: 'pointer',
      strokeColor: '#F76D31',
      strokeOpacity: 1,
      strokeWeight: 1,
      strokeStyle: 'dashed',
      strokeDasharray: [4, 6],
      // 线样式还支持 'dashed'
      fillColor: '#F76D31',
      fillOpacity: 0.3,
      zIndex: 200
    }
    return new window.AMap.Circle(Object.assign({
      center: center,
      radius: radius // 半径
    }, defaultCircle, options))
  }

  createCircleMarker(options = {}) {
    const defaultOptions = {
      center: [116.433322, 39.900255],
      radius: 50,
      borderWeight: 3,
      strokeColor: '#108EE9',
      strokeWeight: 3,
      strokeOpacity: 1,
      fillOpacity: 0.4,
      strokeStyle: 'solid',
      strokeDasharray: [
        10,
        10
      ],
      fillColor: '#108EE9',
      zIndex: 50
    }
    return new window.AMap.CircleMarker(Object.assign({}, defaultOptions, options))
  }
  createPolygon(path = [], options = {}) {
    const defaultStyle = {
      strokeColor: '#FF33FF',
      strokeWeight: 6,
      strokeOpacity: 0.2,
      fillOpacity: 0.4,
      fillColor: '#1791fc',
      zIndex: 50
    }
    return new window.AMap.Polygon(Object.assign({}, {
      path: path
    }, defaultStyle, options))
  }
  createGeolocation(mapConfig, options = {}) {
    return new Promise(resolve => {
      window.AMap.plugin('AMap.Geolocation', function () {
        let geolocation = new window.AMap.Geolocation(Object.assign({}, {
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：5s
          buttonPosition: 'RT',    //定位按钮的停靠位置
          buttonOffset: new window.AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

        }, options));
        mapConfig.addControl(geolocation);
        geolocation.getCurrentPosition();
        resolve(geolocation)
      });
    })
  }
  createPolyline(paths = [], options = {}) {
    const defaultPolyline = {
      isOutline: true,
      outlineColor: '#ffeeee',
      borderWeight: 2,
      strokeWeight: 5,
      strokeColor: '#0091ff',
      lineJoin: 'round'
    }
    return new window.AMap.Polyline(Object.assign({
      path: paths
    }, defaultPolyline, options))
  }

  setMapFitView(mapConfig, layers) {
    if (!mapConfig) {
      return
    }
    mapConfig.clearMap()
    mapConfig.add(layers)
    mapConfig.setFitView(layers, true)
  }
  // 货车路线处理
  createTruckDriving(paths = [], truckOptions) {
    const defaultTruck = {
      policy: 0, // 规划策略
      size: 1, // 车型大小
      width: 2.5, // 宽度
      height: 2, // 高度
      load: 1, // 载重
      weight: 12, // 自重
      axlesNum: 2, // 轴数
      province: '京' // 车辆牌照省份
    }
    return new Promise((resolve) => {
      window.AMap.plugin(['AMap.TruckDriving'], () => {
        let truckDriving = new window.AMap.TruckDriving(Object.assign({}, defaultTruck, truckOptions))
        truckDriving.search(paths, async (status, result) => {
          resolve({
            status,
            result
          })
        })
      })
    })
  }

  // 货车路线处理
  stepsToPath(steps) {
    let paths = []
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]
      for (let j = 0; j < step.path.length; j++) {
        paths.push(step.path[j])
      }
    }
    return paths
  }

  // 驾车路线处理
  // createTruckDriving(paths = [], truckOptions) {
  //   let startpoint, endpoint, waypoints = []

  //   paths.forEach((item, index, self) => {
  //     let [lng, lat] = item.lnglat

  //     if (!index) {
  //       startpoint = this.createPoint(lng, lat)
  //     } else if (index === self.length - 1) {
  //       endpoint = this.createPoint(lng, lat)
  //     } else {
  //       waypoints.push(this.createPoint(lng, lat))
  //     }
  //   });
  //   return new Promise((resolve) => {
  //     window.AMap.plugin(['AMap.Driving'], () => {
  //       let driving = new window.AMap.Driving(truckOptions);
  //       // 根据起终点经纬度规划驾车导航路线
  //       driving.search(startpoint, endpoint, { waypoints }, function (status, result) {
  //         console.log(result);

  //         resolve({
  //           status,
  //           result
  //         })
  //       })
  //     })
  //   })
  // }

  // 驾车路线处理
  // stepsToPath(steps) {
  //   let paths = []
  //     for (let i = 0; i < steps.length; i++) {
  //       const step = steps[i]
  //       for (let j = 0; j < step.path.length; j++) {
  //         let IndexPath = [step.path[j].lng, step.path[j].lat]
  //         paths.push(IndexPath)
  //       }
  //     }
  //     return paths
  // }
  createAddress(lng, lat) {
    console.log(lng, lat);

    return new Promise((resolve) => {
      window.AMap.plugin(['AMap.Geocoder'], () => {
        let geocoder = new AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          city: '010'
        })
        geocoder.getAddress([lng, lat], function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // result为对应的地理位置详细信息
            resolve(result.regeocode)
          } else {
            resolve({})
          }
        })
      })
    })
  }
  createEditCircle(map, circle) {
    return new Promise((resolve) => {
      window.AMap.plugin(['AMap.CircleEditor'], () => {
        resolve(new window.AMap.CircleEditor(map, circle))
      })
    })
  }
  createEditPolygon(map, polygon) {
    return new Promise((resolve) => {
      window.AMap.plugin(['AMap.PolyEditor'], () => {
        resolve(new window.AMap.PolyEditor(map, polygon))
      })
    })
  }

  createInfoWindow(options = {}) {
    return new window.AMap.InfoWindow(Object.assign({
      isCustom: true, // 使用自定义窗体
      offset: new window.AMap.Pixel(0, -30)
    }, options))
  }
  createInfoWindowDom(content) {
    return (`<div class="vehicle-infoWindow">${content}</div>`)
  }
  createAutocomplete(options = {}) {
    return new Promise((resolve) => {
      window.AMap.plugin(['AMap.Autocomplete'], () => {
        resolve(new window.AMap.Autocomplete(Object.assign({
          city: '全国'
        }, options)))
      })
    })
  }

  createDistrictSearch(level = 'country', options = {}) {
    return new Promise((resolve) => {
      window.AMap.plugin(['AMap.DistrictSearch'], () => {
        resolve(new window.AMap.DistrictSearch(Object.assign({
          // country province city district 商圈biz_area
          level
          // 默认显示商圈
          // showbiz: true
        }, options)))
      })
    })
  }

  createMarkerClusterer(mapConfig, markers, options = {}) {
    return new Promise((resolve) => {
      window.AMap.plugin(['AMap.MarkerClusterer'], () => {
        resolve(new window.AMap.MarkerClusterer(mapConfig, markers, Object.assign({
          gridSize: 80,
          maxZoom: 18,
          maxZoom: 17
        }, options)))
      })
    })
  }

  createPoints(center, num, options = {}) {
    let data = []
    for (let i = 0, len = num; i < len; i++) {
      data.push({
        lng: center.getLng() + (Math.random() > 0.5 ? 1 : -1) * Math.random(),
        lat: center.getLat() + (Math.random() > 0.5 ? 1 : -1) * Math.random(),
        ...options
      })
    }
    return data
  }
}
