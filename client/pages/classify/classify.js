import getD from '../../utils/getData.js'

Page({
    data:{
        classList: [], //左边服务分类
        classIndex: 0,
        ServiceList: [], //二级分类
        ProductList: [], //三级分类
        tabThirdList: [], //点击二级获取的三级分类
        tabTag: false
    },
    onLoad(){
        let _this = this
        this.getFirst()
        //返回保持index不变
        try {
            var value = wx.getStorageSync('classIndex')
            if(value){
                _this.setData({
                    classIndex : res.data 
            })
            }
          }catch(e){
          }
    },
    getFirst(){ //获取一级分类
        var _this = this
        getD.GetClassList().then(res=>{
            _this.setData({
                classList : res.data.data.list
            })
            let id = res.data.data.list[0].Id
            let e = {
                currentTarget : {
                    dataset : {
                        id : id,
                        index : 0
                    }
                }
            }
            this.getSecond(e)
            this.getThird(id)
        })
    },
    getSecond(e){ //根据一级分类获取二级分类
        var params = {
            "classId" : e.currentTarget.dataset.id
        }
        getD.GetServiceList(params).then(res=>{
            let arr = res.data.data.list 
            arr.forEach(val=>{
                let reg = /\\/g;
                val.ImgUrl = val.ImgUrl.replace(reg,"/")
            })
            this.setData({
                ServiceList : arr,
                classIndex : e.currentTarget.dataset.index
            })
            //获取三级分类
            this.getThird(e.currentTarget.dataset.id)
        })
    },
    getThird(id){ //根据一级获取三级分类
        var params = {
            "classId" : id,
            "num" : 1000
        }
        getD.ProductListGetByClass(params).then(res=>{
            let arr = res.data.data.plist 
            arr.forEach(val=>{
                let reg = /\\/g;
                val.ImgUrl = val.ImgUrl.replace(reg,"/")
            })
            this.setData({
                ProductList: arr,
                tabTag: false
            })
        })
    },
    tabGetThird(e){ //点击二级获取三级
        var params = {
            "classId" : e.currentTarget.dataset.parentid,
            "pname" : e.currentTarget.dataset.name
        }
        getD.GetProductList(params).then(res=>{
            let arr = res.data.data.list 
            arr.forEach(val=>{
                let reg = /\\/g;
                val.ImgUrl = val.ImgUrl.replace(reg,"/")
            })
            this.setData({
                tabThirdList: arr,
                tabTag: true
            })
        })
    },
    goDetail(){ //去详情页
        wx.navigateTo({
            url:'../productDetail/productDetail'
        })
        //返回保持index不变
        try{
            wx.setStorageSync('classIndex', this.data.classIndex)
        }catch(e){	
        }
    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target)
        }
        return {
          title: 'WQB',
          imageUrl: '../../images/logo.jpg'
        }
    },
    
})