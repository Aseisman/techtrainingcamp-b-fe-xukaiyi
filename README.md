### 玩转前端-北邮-字节跳动训练营项目：简易版今日头条搜索(移动端)

2020-07-17
by 许楷沂  

部署界面：https://xudadaaa.github.io/techtrainingcamp-b-fe-xukaiyi/#/

一、功能详情
- 功能描述：
  - 搜索框：支持用户手动输入词、并基于axios实现推荐词功能。
  - 结果页：通过axios获取搜索结果数据完成列表页渲染。
  - 详情页：通过路由跳转并且带参数显示详情数据。
  - 滑动加载：实现swiper对搜索结果页tab横向切换，显示加载动画。
  - github-Pages部署：通过github开放功能静态页面的展示，部署该项目。
- 实现要点：
  - 前端UI界面实现，熟练运用html、css。
  - 实现网页交互功能开发，熟练运用js、ajax等。
  - react 组件化开发。
  - react 路由加载。
  - swiper的使用，页面逻辑的实现。
  - 反向代理：实现react跨域请求数据。

二、实践过程
- 首次的误打误撞之：界面架构设计
  - 逻辑设计过程：  
  作为一个用了6年今日头条app的忠实粉丝，首先我便去观察了今日头条的界面架构。它现在的版本便是，搜索框是有两种demo，并且搜索界面也会随着搜索框的点击而发生改变，对此我总结了一下4种情况：
  <img src="https://github.com/Xudadaaa/pictures/blob/master/headLines-master/UIframe.jpg" alt="4种情况" />  
  <!-- ![](https://github.com/Xudadaaa/techtrainingcamp-b-fe-xukaiyi/raw/master/src/static/img/UIframe.jpg) -->
  对于这4种样式，一共可以分为4种情况进行显示我们的结果列表页面，于是搜索框的部分共有2种样式。
  - 单界面与多界面（路由跳转）的选择：  
  通过浏览发现，每次头条的点击搜索功能其实是很快的，没有多余的等待时间，这引起了我的思考，对于我的项目的实现，是单界面的重新渲染比较快还是进行路由跳转的方式比较快呢。通过实践发现，单界面的重新渲染实际上是比路由快了一丢丢。所以这里我便设置了单界面的模式。（后面详情界面仍用到了路由的跳转。）
  - 变量的定义：  
  单界面的情况下，针对上面的4种情况的判别，我们设置了两个变量，分别是搜索框的变量控制，还有一个是结果列表的渲染显示。根据两个变量去渲染不同的单界面内容。
  ```
    SearchType: false,//搜索框样式：false:初始状态（无查找）true：查找状态
    listType: 0,//列表界面显示：0-推荐界面 1-推荐字界面 2-实时搜索返回关键字界面 3-查询结果界面
  ```
  - 思考：这里的单界面模式会引起界面的重拍重绘，实属不好。。。  

- 组件化开发  
  基于上面的界面架构设计，这里将几个界面设计成了组件,首页通过判断应该调用哪个组件，从而渲染该组件。
  - 搜索框的组件设计
  ```
  <div className="searchBG">
                        {/* div搜索框 */}
                        <div className="searchBox" onClick={this.gotoSearch}>
                            <img src={Img} alt="搜索" className="searchIcon" />
                            <span className="content">上海杉达学院图片|延期毕业无法参加社会实习</span>
                        </div>
                        {/* 发布按钮 */}
                        <div className="publish">
                            <img src={PublishIcon} alt="发布按钮" className="publishIcon" />
                            <div>发布</div>
                        </div>
  </div>
  ```
  - 搜索列表页面的组件设计
  ```
  <div className="swiper-container" style={{ display: this.state.isLoading === false ? 'block' : 'none' }}>
                    <div className="swiper-wrapper">
                        <div style={{ 'marginTop': '55px' }} className='swiper-slide'>
                            {searchArr}
                        </div>
                        {/* 加载中的显示效果 */}
                        {elsePages}
                    </div>
  </div>
  ```
  - ps：后面发现对于组件的封装实际上还可以更好的继续封装，但ddl不允许了，便先如此。往后继续更新。
- 总有些惊奇的机遇，比方说当我开始碰react。 
  - 由于之前碰vue的比较多，没有机会碰过react（实际上早就想碰一下了）于是我便趁着这次的搜索简易版项目，顺便上手学一下react的相关知识。
  - 虚拟DOM和diff算法  
  从react的虚拟DOM和diff算法入手，发现实际上react和vue用的都是虚拟DOM和diff算法，虽然有些差别，但也实际上是大同小异的。  
  对于react的diff算法比vue的diff算法简洁一些。  
  react的diff算法只用了两组指针，分别对于新DOM与旧DOM进行比较从而更新虚拟DOM再进行渲染。  
  **注意**：对于React的diff算法，尽量不要将最后的节点移动到最前面。于是对于界面DOM树的设计我一直把这个点放在心里。
  - JSX的写法  
  一句话，将HTML写在js里面。好像很容易接受的样子。。不过就是对于js文件来说，，有些的复杂，内容比较多，看的也不容易。
  - 组件化开发  
  与vue相比，react的组件化开发的参数传递比vue的简单些，直接通过props进行传参即可。其余大同。
  - 路由  
  路由其实与VUE的路由并不会差别太大，但要注意的点是如果没有标记路由的界面，要通过withRouter进行声明，这样子路由便可以跳转到相应界面。（PS：这个在列表的组件化开发中使用到。）
  - 还有很多东西。这里不一一列举。

- 进阶功能之：swiper的运用与加载动画的使用
  - 加载动画的使用：  
    <img src="https://github.com/Xudadaaa/pictures/blob/master/headLines-master/caidan.gif" />  
  设计9个cube盒子，然后通过css animate让每个盒子跳动的时间不一样，从而达到这种效果。
  - 加载动画与swiper  
  通过调用swiper.js的onSlideNextStart与onSlidePrevStart进行滑动前的初始化，滑动的时候便显示加载动画，直至请求数据完成渲染后，便隐藏该动画。  
- axios与反向代理：  
    通过axios返回一个promise对象，去请求接口的数据，发现会报跨域问题，基于vue项目的经验，我在react的setupproxy.js中设置了反向代理：  
    ```
    const proxy = require('http-proxy-middleware')
    module.exports = function(app) {
        app.use(proxy.createProxyMiddleware('/apis', { target: 'https://i.snssdk.com' }));
    }
    ```   
    请求数据:  
    ```
    axios({
            url: '/apis/search/api/study',
            method: 'get',
            params: {
                keyword: this.props.searchword,
                offset: 0
            }
        }).then(res => {})
    ```   
    不一样的是对于react的proxy写法需要调用creatProxyMiddleware方法。  
- 部署  
  - nginx服务器部署   
 由于没有个人的服务器，这里只能简要讲述一下之前开发过的部署流程：  
 服务器下载nginx，然后将react项目打包后的dist上传到对应的nginx的静态资源放置位置，开启nginx即可。  
  - node 部署实际上是属于后端接口的部署，由于这个项目不用自己写接口，于是我便通过axios去获取数据，没有用到node koa等老师讲述的相关知识，不过本人已经掌握。
  - github-page部署：github新增了一个查看项目静态界面的一个page功能，所以没有服务器的我将界面部署在了githubpage中。
- 页面性能优化  
  - 节流防抖：对于搜索功能来说，实时监控用户输入的内容并且去请求推荐的关键字是一个必不可少的过程，本项目通过设定一个定时器的方式，去防止用户每次输入一个字符便去请求服务器：
  ```
    //timer是一个定时器
    if (this.timer) {
            clearTimeout(this.timer)
        }
        //若定时器还存在，则清除定时器然后重新开始
        if (e.target.value) {
            this.timer = setTimeout(() => {
                this.getKeyWords();
            }, 300);
            //重新设定定时器，请求完成后清除定时器
            this.setState({
                listType: 2
            })
        } else {
            this.setState({
                listType: 1
            })
    }
  ```
  - FCP与LCP：  
      FCP（白屏时间）:1772.3ms  
      LCP(最大快内容时间):2987.9ms  
      对于这个没有图片的项目来说，这两个指标其实不会太大，更多的是github-page的DNS解析时间，获取github-page的静态资源的时间。  
  - 如果从一个自己部署的服务器来说，那么我们可以在打包的时候将chunk分成多个小部分从而提高加载速度；将图片懒加载（这个项目没有图片。。只有一个标题栏的小图标），也可以通过预加载的方式将首页需要的数据先提前请求过来。   

  三、个人感想   
   - 一方面由于之前有过一些企业的项目经验，但是对于那些企业级开发来说，他们更注重的是需求，而不是性能方面的优化，于是对于性能优化的方面其实很少涉及到。   
   - 另一方面对于nodejs的了解其实很浅，一开始我觉得nodejs写后端服务器不如java（之前在学校学的都是java），所以就比较忽略了node这个方面的知识点，这次学习node之后，发现实际上node不比其他语言差，node其实在慢慢的改进和发展，对于一个前端攻城狮来说，学会node是一件必备的技能，于是后面的学习计划就添加了这一项。
   - 此外，对于这个小项目来说其实还是有很多瑕疵的，对比上线的今日头条app，我发现还是存在着很多的差异，后期还要不断去思考，去改进。

  **在此感谢字节跳动的老师们的辛苦教学，着实学到了很多东西！谢谢！**
  ps:项目新增了很多的空文件和路由，是为了继续react的学习和深造以及项目的优化，请老师谅解。
