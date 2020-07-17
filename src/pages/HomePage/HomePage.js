import React from 'react';
import './HomePage.css';
import Img from '../../static/img/search.png'
import PublishIcon from '../../static/img/fabu.png'
import backIcon from '../../static/img/back.png'
import closeIcon from '../../static/img/close.png'
import axios from 'axios'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import SearchChild from '../../component/SearchDetail/index'

class HomePage extends React.Component {
    timer = null;//计时器
    constructor() {
        super();
        this.state = {
            list: [],
            showSearch: false,//展示搜索推荐界面
            listType: 0,//列表界面显示：0-推荐界面 1-推荐字界面 2-实时搜索返回关键字界面 3-查询结果界面
            searchword: "",//搜索关键字
            keywordsList: [],//搜索关键字列表
            searchList: [],//搜索列表
            current: "",//当前页数
            total: "",//总页数
        }
    }
    render() {
        let listArr = this.state.list.map((item, index) => {
            // 循环列表中的tag
            let tagArr = item.tags.map((item, index) => {
                return (
                    <div key={index} className="tag">
                        {item}
                    </div>
                )
            })
            return (
                <div key={index} className="box">
                    <div className="titleBox">
                        <div className="title">{item.title}</div>
                        <div className="tags">{tagArr}</div>
                    </div>
                    <div className="userName">{item.user_name}</div>
                    <div className="des">{item.description}</div>
                    <div className="line"></div>
                </div>
            )
        })
        let keywordArr = this.state.keywordsList.map((item, index) => {
            return (
                <div key={index} onClick={this.setWord.bind(this, item.keyword)}>
                    <div className="keywordsBox">
                        <img src={Img} alt="图" className="searchIcon" />
                        <div className="keyword">{item.keyword}</div>
                    </div>
                    <div className="line"></div>
                </div>
            )
        })
        // let searchArr = this.state.searchList.map((item, index) => {
        //     // 循环列表中的tag
        //     let tagArr = item.tags.map((item, index) => {
        //         return (
        //             <div key={index} className="tag">
        //                 {item}
        //             </div>
        //         )
        //     })
        //     return (
        //         <div key={index} className="box">
        //             <div className="titleBox">
        //                 <div className="title">{item.title}</div>
        //                 <div className="tags">{tagArr}</div>
        //             </div>
        //             <div className="userName">{item.user_name}</div>
        //             <div className="des">{item.description}</div>
        //             <div className="line"></div>
        //         </div>
        //     )
        // })
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <div className='swiper-slide'>
                        {/* 搜索框部分 */}
                        {this.state.showSearch === false ? (
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
                            </div>)
                            : (
                                <div className="searchBG2">
                                    <img src={backIcon} alt="返回" className="backIcon" onClick={this.back} />
                                    {/* div搜索框 */}
                                    <div className="searchBox2">
                                        <img src={Img} alt="搜索" className="searchIcon" onClick={this.willSearch} />
                                        <input type="text" placeholder="请输入关键词" autoFocus onChange={this.change} value={this.state.searchword} />
                                        {this.state.searchword.length !== 0 ? <img src={closeIcon} alt="关闭" className="searchIcon" onClick={this.deleWord} /> :
                                            <div></div>
                                        }
                                    </div>
                                    {/* 搜索 */}
                                    <div className="searchButton" onClick={this.findSearch}>搜索</div>
                                </div>
                            )}
                        {/* 列表部分 */}
                        {/* 界面一：推荐界面 */}
                        <div className="list" style={{ display: this.state.listType === 0 ? 'block' : 'none' }}>
                            {listArr}
                        </div>
                        {/* 界面二：推荐字界面 */}
                        <div style={{ display: this.state.listType === 1 ? 'block' : 'none', 'marginTop': '55px' }}>
                            <div className="recommend">
                                <span>快舟十一号发射失利</span>
                                <div className="VLine"></div>
                                <span>5家银行违规被通报</span>
                            </div>
                            <div className="line"></div>
                        </div>
                        {/* 界面三：实时搜索返回关键字界面 */}
                        <div style={{ display: this.state.listType === 2 ? 'block' : 'none', 'marginTop': '55px' }}>
                            {keywordArr}
                        </div>
                        {/* 界面四：搜索结果界面 */}
                        <div style={{ display: this.state.listType === 3 ? 'block' : 'none', 'marginTop': '55px' }}>
                            {/* {searchArr} */}
                            <SearchChild searchword={this.state.searchword}></SearchChild>
                        </div>
                    </div>
                    {/* 加载中的显示效果 */}
                    <div className='swiper-slide'>
                        <div className="test">test</div>
                    </div>
                </div>

            </div>
        )
    }
    componentDidMount() {
        // var that = this;
        axios({
            url: 'https://i.snssdk.com/search/api/study',
            // url:"/apis/search/api/study",
            method: 'get',
            // headers:{
            //     'Access-Control-Allow-Origin':"*",
            //     'Access-Control-Allow-Headers': "Access-Control-Allow-Origin",
            //     'Access-Control-Request-Method':"GET",
            // },
            params: {
                keyword: "推荐",
                offset: 0
            }
        }).then(res => {
            console.log(res);
            if (res.status === 200) {
                console.log("成功返回")
                this.setState({
                    list: res.data.data
                })
            } else {
                this.setState({
                    list: []
                })
            }
        })
        new Swiper('.swiper-container', {
            observer: true,
            on: {
                reachEnd: function () {
                    //这里是一个方法，可以在这里请求数据，然后重新渲染
                },
                slideChangeTransitionEnd: function () {
                    //
                }
            }
        })
    }
    // 点击搜索框
    gotoSearch = () => {
        console.log("到这里")
        this.setState({
            showSearch: true,
            listType: 1,
        })
    }
    // 点击返回键
    back = () => {
        switch (this.state.listType) {
            case 1:
                this.setState({
                    showSearch: false,
                    listType: 0,
                })
                break;
            case 2:
                this.setState({
                    showSearch: true,
                    searchword: "",
                    listType: 1,
                })
                break;
            case 3:
                this.setState({
                    showSearch: true,
                    listType: 2,
                })
                break;
            default: break;
        }

    }
    // input内容变化
    change = (e) => {
        this.setState({
            searchword: e.target.value
        })
        if (this.timer) {
            clearTimeout(this.timer)
        }
        if (e.target.value) {
            this.timer = setTimeout(() => {
                this.getKeyWords();
            }, 300);
            this.setState({
                listType: 2
            })
        } else {
            this.setState({
                listType: 1
            })
        }
    }
    //获取关键字接口
    getKeyWords = () => {
        if (this.state.searchword.length !== 0) {
            axios({
                url: 'https://i.snssdk.com/search/api/sug',
                // url:'/apis/search/api/sug',
                method: 'get',
                params: {
                    'keyword': this.state.searchword,
                }
            }).then(res => {
                console.log(res);
                if (res.status === 200) {
                    this.setState({
                        keywordsList: res.data.data
                    })
                } else {
                    this.setState({
                        keywordsList: []
                    })
                }
            })
        }

    }
    // 将推荐字设置成搜索searchword
    setWord = (e) => {
        console.log(e)
        this.setState({
            searchword: e,
        })
        //获取查询列表
        this.findSearch();
    }
    //删除searchword
    deleWord = () => {
        this.setState({
            searchword: "",
            listType: 1,
        })
    }
    // 获取查询列表
    findSearch = () => {
        console.log(this.state.searchword)
        axios({
            url: 'https://i.snssdk.com/search/api/study',
            // url:'/apis/search/api/study',
            method: 'get',
            // headers:{
            //     'Access-Control-Allow-Origin':"*",
            //     'Access-Control-Allow-Headers': "Access-Control-Allow-Origin",
            //     'Access-Control-Request-Method':"GET",
            // },
            params: {
                keyword: this.state.searchword,
                offset: 0
            }
        }).then(res => {
            console.log(res);
            if (res.status === 200) {
                console.log("成功返回")
                this.setState({
                    searchList: res.data.data,
                    listType: 3,
                })
            } else {
                this.setState({
                    searchList: [],
                    listType: 3
                })
            }
        })
    }
    // 输入获取焦点
    willSearch = () => {
        this.setState({
            showSearch: true,
            listType: 2,
        })
    }
}
export default HomePage;