import React from 'react'
import '../../pages/HomePage/HomePage.css';
import axios from 'axios'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import './loading.css'
import {withRouter} from 'react-router-dom'

class Search extends React.Component {
    searchArr = [];
    constructor() {
        super();
        this.state = {
            searchword: "",//搜索关键字
            searchList: [],//搜索列表
            current: "",//当前页数
            total: "",//总页数
            isLoading: false,//是否在加载
        }
    }
    componentDidMount() {
        var that = this;
        that.setState({
            isLoading: true
        })
        this.setState({
            searchword:this.props.searchword
        })
        axios({
            url: 'https://i.snssdk.com/search/api/study',
            method: 'get',
            params: {
                keyword: this.props.searchword,
                offset: 0
            }
        }).then(res => {
            if (res.status === 200) {
                this.setState({
                    searchList: res.data.data,
                    total: res.data.total,
                    current: 0,
                })
            } else {
                this.setState({
                    searchList: [],
                    current: 0,
                    total: 0,
                })
            }
            setTimeout(() => {
                that.setState({
                    isLoading: false
                })
            }, 1000)
        })
        new Swiper('.swiper-container', {
            observer: true,
            // loop:true,
            onSlideNextStart: function () {
                that.setState({
                    // searchArr:[],
                    isLoading: true
                })
                axios({
                    url: 'https://i.snssdk.com/search/api/study',
                    method: 'get',
                    params: {
                        keyword: that.props.searchword,
                        offset: that.state.current + 1,
                    }
                }).then(res => {
                    if (res.status === 200) {
                        that.setState({
                            searchList: res.data.data,
                            total: res.data.total,
                            current: that.state.current + 1,
                        })
                    } else {
                        that.setState({
                            searchList: [],
                            current: 0,
                            total: 0,
                        })
                    }
                    setTimeout(() => {
                        that.setState({
                            isLoading: false
                        })
                    }, 1000)
                })
            },
            onSlidePrevStart: function () {
                that.setState({
                    isLoading: true
                })
                axios({
                    url: 'https://i.snssdk.com/search/api/study',
                    method: 'get',
                    params: {
                        keyword: that.props.searchword,
                        offset: that.state.current - 1,
                    }
                }).then(res => {
                    if (res.status === 200) {
                        that.setState({
                            searchList: res.data.data,
                            total: res.data.total,
                            current: that.state.current - 1,
                        })
                    } else {
                        that.setState({
                            searchList: [],
                            current: 0,
                            total: 0,
                        })
                    }
                    setTimeout(() => {
                        that.setState({
                            isLoading: false
                        })
                    }, 1000)
                })
            }
        })
    }
    render() {
        // 设置当前页的数据
        let searchArr = this.state.searchList.map((item, index) => {
            // 循环列表中的tag
            let tagArr = item.tags.map((item, index) => {
                return (
                    <div key={index} className="tag">
                        {item}
                    </div>
                )
            })
            return (
                <div key={index} className="box" onClick={()=>this.seeDetail(item)}>
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
        // 设置总分页数
        let elsePages = [];
        for (let i = 1; i <= parseInt(this.state.total / 10); i++) {
            elsePages.push(
                <div style={{'marginTop': '55px' }} className='swiper-slide' key={i}>
                    {searchArr}
                </div>
            )
        }
        return (
            <div>
                <div className="swiper-container" style={{ display: this.state.isLoading === false ? 'block' : 'none' }}>
                    <div className="swiper-wrapper">
                        <div style={{ 'marginTop': '55px' }} className='swiper-slide'>
                            {searchArr}
                        </div>
                        {/* 加载中的显示效果 */}
                        {elsePages}
                    </div>
                </div>
                {/* 加载中的彩蛋 */}
                <div style={{ display: this.state.isLoading === true ? 'block' : 'none', 'marginTop': '55px' }}>
                    <div className='base'>
                        <div className='cube'></div>
                        <div className='cube'></div>
                        <div className='cube'></div>
                        <div className='cube'></div>
                        <div className='cube'></div>
                        <div className='cube'></div>
                        <div className='cube'></div>
                        <div className='cube'></div>
                        <div className='cube'></div>
                    </div>
                    <div className="loadingWord">欢迎来到字节跳动训练营</div>
                </div>
            </div>

        )
    }
    seeDetail=(item)=>{
        console.log(this.props)
        this.props.history.push({pathname:'/seeDetail',query:item})
    }
}
export default withRouter(Search)