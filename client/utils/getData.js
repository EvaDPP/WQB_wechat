import API from './util'

module.exports = {
    homeTopBanner(data){ //首页轮播
      return API.sendRequest("post",'/Advertment/List',data)
    },
    homeTab(data){ //首页tab轮播
      return API.sendRequest("post",'/navi/Getlist',data)
    },
    hotRecommend(data){ //人气推荐
      return API.sendRequest('get','/Product/GetAllList',data)
    },
    GetClassList(data){ //分类服务左边第一级
      return API.sendRequest('get','/Product/GetClassList',data)
    },
    GetServiceList(data){ //服务二级分类
      return API.sendRequest('get','/Product/GetServiceList',data)
    },
    ProductListGetByClass(data){ //服务三级分类
      return API.sendRequest('get','/Product/GetClsAndHotProList',data)
    },
    GetProductList(data){ //点击二级分类获取三级分类
      return API.sendRequest('get','/Product/GetProductList',data)
    },
    
}