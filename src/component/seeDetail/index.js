import React from 'react'
import backIcon from '../../static/img/back.png'
import { withRouter } from 'react-router-dom'
import '../seeDetail/index.css'
class seeDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            item: "",//详细数据
        }
    }
    render() {
        // 循环列表中的tag
        let tagArr = this.state.item.tags.map((item, index) => {
            return (
                <div key={index} className="tagfont">
                    {item}
                </div>
            )
        })
        return (
            <div>
                {/* 返回导航栏 */}
                <div className='nav'>
                    <img src={backIcon} alt="返回" className="backIcon" onClick={this.back} />
                    <div className="detailtitle">头条训练营</div>
                </div>
                {/* 详情导航栏 */}
                <div>
                    <div className="itemTitle">{this.state.item.title}</div>
                    <div className="author">作者：{this.state.item.user_name}</div>
                    <div className="author tags">标签：{tagArr}</div>
                    <div className="detailcontent">
                        <div>内容简介：</div>
                        <div>{this.state.item.description}</div>
                    </div>
                    <div className="link_url">原文网址：<a href={this.state.item.link_url}>{this.state.item.link_url}</a></div>
                </div>
            </div>
        )
    }
    componentWillMount() {
        console.log(this.props.location.query)
        this.setState({
            item: this.props.location.query
        })
    }
    back = () => {
        this.props.history.go(-1)
    }
}
export default withRouter(seeDetail)
