// 引入用来发送请求的方法
import{ request }from "../../request/index.js"

// pages/category/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
    leftMenuList:[],
    //右侧商品数据
    rightContent:[],
    //被点击的左侧菜单
    currentIndex:[],
    scrollTop:0
  },

  //接口返回数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
      1 先判断本地存储有没有旧数据
      {time:Data.now(),data:[...]}
      2 没有 直接发送新请求
      3 有 同时 就的数据没过期 使用本地存储旧数据即可
    */
   this.getCates();
    
    // //1 获取本地存储中数据（小程序存储本地存储技术）
    // const Cates = wx.getStorageSync("cates");
    //  // 2 判断
    //  if (!Cates) {
    //   // 不存在  发送请求获取数据
    //   this.getCates();
    // } else {
    //   // 有旧的数据 定义过期时间  10s 改成 5分钟
    //   if (Date.now() - Cates.time > 1000 * 10) {
    //     // 重新发送请求
    //     this.getCates();
    //   } else {
    //     // 可以使用旧的数据
    //     this.Cates = Cates.data;
        
    //   }
    // }

  },

  //获取分类数据
  getCates(){
    request({
      url:"/cate.json"
    })
    .then(res=>{
     this.Cates=res.data.message;

     //把接口数据存入到本地存储中
    //  wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
     let leftMenuList = this.Cates.map(v => v.cat_name);
     let rightContent = this.Cates[0].children;
     this.setData({
       leftMenuList,
       rightContent
     })
    })
  },

  //左侧菜单点击事件
  handleItemTap(e){
    /*
      1 获取点击标题索引
      2 给data的currentIndex赋值
      3 根据不同索引渲染右侧商品内容
    */ 
    const {index}=e.currentTarget.dataset;

     //右侧商品数据
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      //顶部距离
      scrollTop:0
    })

   
  },
  righttap(e){
    var id = e.currentTarget.dataset.index;
    console.log(id);
    wx.setStorageSync('search', id)
    wx.navigateTo({
      url: '/pages/goods/goods'
    })
  
   
  },

  
  
})