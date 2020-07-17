import React from 'react';
import './index.css';
import Img from '../../static/img/search.png'
import PublishIcon from '../../static/img/fabu.png'
import backIcon from '../../static/img/back.png'
import closeIcon from '../../static/img/close.png'
import axios from 'axios'
import SearchChild from '../../component/SearchDetail/index'

class Cinema extends React.Component {
    timer = null;//计时器
    constructor() {
        super();
        this.state = {
            list: [],//首页列表
            showSearch: false,//搜索框样式：false:初始状态（无查找）true：查找状态
            listType: 0,//列表界面显示：0-推荐界面 1-推荐字界面 2-实时搜索返回关键字界面 3-查询结果界面
            searchword: "",//搜索关键字
            keywordsList: [],//搜索关键字列表
        }
    }
    componentDidMount() {
    }
    render() {
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
        return (
            <div>
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
                <div>
                    {/* 界面一：推荐界面 */}
                    {this.state.listType === 0 ? (<SearchChild searchword="推荐"></SearchChild>) : null}
                    {/* {this.state.listType === 0 ? (<SearchDemo searchword="推荐"></SearchDemo>) : null} */}
                    {/* 界面二：推荐字界面 */}
                    {this.state.listType === 1 ? (
                        <div style={{'marginTop': '55px'}}>
                            <div className="recommend">
                                <span>快舟十一号发射失利</span>
                                <div className="VLine"></div>
                                <span>5家银行违规被通报</span>
                            </div>
                            <div className="line"></div>
                        </div>
                    ) : null}
                    {/* 界面三：实时搜索返回关键字界面 */}
                    {this.state.listType === 2 ? (
                        <div>
                            {keywordArr}
                        </div>
                    ) : null}
                    {/* 界面四：搜索结果界面 */}
                    {this.state.listType === 3 ? (<SearchChild searchword={this.state.searchword}></SearchChild>) : null}
                </div>
            </div>
        )
    }
    // 点击搜索框
    gotoSearch = () => {
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
    // 输入获取焦点
    willSearch = () => {
        this.setState({
            showSearch: true,
            listType: 2,
        })
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
        console.log("删除关键字")
        this.setState({
            searchword: "",
            listType: 1,
        })
    }
    // 获取查询列表
    findSearch = () => {
        console.log(this.state.searchword)
        // axios({
        //     url: 'https://i.snssdk.com/search/api/study',
        //     // url:'/apis/search/api/study',
        //     method: 'get',
        //     // headers:{
        //     //     'Access-Control-Allow-Origin':"*",
        //     //     'Access-Control-Allow-Headers': "Access-Control-Allow-Origin",
        //     //     'Access-Control-Request-Method':"GET",
        //     // },
        //     params: {
        //         keyword: this.state.searchword,
        //         offset: 0
        //     }
        // }).then(res => {
        //     console.log(res);
        //     if (res.status === 200) {
        //         console.log("成功返回")
        //         this.setState({
        //             searchList: res.data.data,
        //             listType: 3,
        //         })
        //     } else {
        //         this.setState({
        //             searchList: [],
        //             listType: 3
        //         })
        //     }
        // })
        this.setState({
            listType: 3,
        })
    }
}
export default Cinema;