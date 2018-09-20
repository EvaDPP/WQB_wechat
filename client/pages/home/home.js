import getD from '../../utils/getData'
Page({
    data: {
      imgUrls: [],
      tabArr: [],
      hotArr: [],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      pageIndex: 1,
      pageSize: 8,
      showBottomLine: false
    },
    onLoad(){
     this.getHomeTopBanner()
     this.getTab()
     this.getHotRecommend()
    },
    //首页轮播图
    getHomeTopBanner(){
      let params = {
        'type' : 1,
        "code" : "GG00101"
      }
      getD.homeTopBanner(params).then(res=>{
        let arr = res.data.data.list
        arr.forEach(val => {
          let reg = /\\/g;
          val.PosterImgURL = val.PosterImgURL.replace(reg, "/");
        });
        this.setData({
          imgUrls : arr
        })
      })
    },
    //获取中间tab轮播数据
    getTab(){
      let params = {
        "pageIndex" : 1,
        "pageSize" : 100
      }
      getD.homeTab(params).then(res=>{
        let arr = res.data.data.list
        arr.forEach(val=>{
          let reg = /\\/g;
          val.Img = val.Img.replace(reg, "/")
        })
        let arrNew = []
        for(let i = 0;i<arr.length;i+=10){
          arrNew.push(arr.slice(i,i+10))
        }
        this.setData({
          tabArr : arrNew
        })
      })
    },
    //人气推荐数据
    getHotRecommend(){
      let params = {
        pageIndex : this.data.pageIndex,
        pageSize : this.data.pageSize
      }
      getD.hotRecommend(params).then(res=>{
        let arrOBJ = res.data.data
        let arrNew = this.data.hotArr
        arrOBJ.list.forEach(val => {
          let reg = /\\/g;
          val.ThumbImgURL = val.ThumbImgURL.replace(reg, "/");
          arrNew.push(val)
        });
        this.setData({
          hotArr : arrNew
        })
        if(this.data.hotArr.length == arrOBJ.recordCount){
          this.setData({
            showBottomLine : true
          })
        }
      })
    },
    //上拉加载更多
    onReachBottom(){
      this.data.pageIndex ++;
      this.getHotRecommend()
    }
  })