const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//请求域名
let baseURL = "https://api.wqbol.com"
// let baseURL = "https://api.wqbol.net"

//请求数据
function sendRequest(method,url,data){
    return new Promise((resolve,reject)=>{
        wx.request({
            url: baseURL + url, 
            data: data?data:'',
            method,
            header: {'content-type': 'application/json'},
            success: resolve,
            fail: reject
        })
    })
}

// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

module.exports = { 
    formatTime, 
    showBusy, 
    showSuccess, 
    showModel,
    sendRequest 
}
