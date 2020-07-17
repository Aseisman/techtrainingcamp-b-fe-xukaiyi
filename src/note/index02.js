import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';

let exampleStyle = {
        background: 'skyblue',
        borderBottom: "1px solid red"
    }
    //jsx元素用（），对象用{}
let element = (
  <div>
    <h1 style={exampleStyle}>helloworld</h1>
  </div>
)
ReactDOM.render(
  element,
  document.getElementById('root')
)



// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

//JSX语法：将html写成js语法，只能有一个根节点
//let h1=<h1>helloworld</h1>//元素
//<APP />是一个js对象，APP是一个组件
//JSX 元素书写格式：let element = ( 写dom )
//demo1
// function clock() {
//   let time = new Date().toTimeString()
//   let element = <h1>现在的时间是{time}</h1>
//   ReactDOM.render(element,
//     document.getElementById('root')
//   );
// }
// clock();
// setInterval(clock,1000)

//react 函数式组件 大写字母开头
//demo2
// function Clock(props){
//   return (
//     <div>
//       <h1>现在的时间是{props.date.toLocaleTimeString()}</h1>
//       <h2>cetsfg</h2>
//     </div>
//   )
// }

// function run(){
//   ReactDOM.render(
//     <Clock date={new Date()}/>,
//     document.querySelector('#root')
//   )
// }
// run()

// let time = new Date().toLocaleTimeString();
// let str = "当前的时间是";
// let element = (
//   <div>
//     <h1>helloworld</h1>
//     <h2>{1 + 1}</h2>
//     <h2>{str + time}</h2>
//   </div>
// )
// let man='发热'
// // let bgcolor='bgcolor'
// let element2 = (
//   <div>
//     {/* 类名写className */}
//     <h1 className='bgcolor'>今天是否隔离</h1>
//     <h2>{man == '发热' ? <button>隔离</button> : "玩手机"}</h2>
//     {/* 可加入html */}
//     <h2>{man == '发热' ? element : "玩手机"}</h2>
//     {/* 可加入组件，组件套组件 */}
//   </div>
// )
// ReactDOM.render(
//   // element,
//   element2,
//   document.getElementById('root')
// )


// //index02
// //样式写法
// let exampleStyle = {
//   background: 'skyblue',
//   borderBottom: "1px solid red"
// }
// //jsx元素用（），对象用{}
// let element = (
//   <div>
//     {/* 写法一 */}
//     <h1 style={exampleStyle}>helloworld</h1>
//     {/* 写法二 */}
//     <h1 style={{ background: 'skyblue' }}>helloworld</h1>
//     {/* 这样子写会报错 */}
//     {/* <h1 style={{color:'white'}} style={exampleStyle}>helloworld</h1> */}

//   </div>
// )
// ReactDOM.render(
//   element,
//   document.getElementById('root')
// )


//类组件定义
// class Helloworld extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>类组件定义Helloworld</h1>
//       </div>
//     )
//   }
// }
// ReactDOM.render(
//   <Helloworld />,
//   document.getElementById('root')
// )

//react state
// class Clock extends React.Component{
//   constructor(props){
//     super(props)
//     //状态（数据）-->view
//     this.state={
//       time:new Date().toLocaleTimeString()
//     }
//   }
//   render(){
//     return (
//       <div>
//         <h1>当前时间:{this.state.time}</h1>
//       </div>
//     )
//   }
//   //生命周期：组件完成渲染时调用的函数
//   componentDidMount(){
//     setInterval(()=>{
//       // this.state.time=new Date().toLocaleTimeString()
//       // console.log(this.state.time);
//       this.setState({
//         time:new Date().toLocaleTimeString()
//       })
//       // console.log(this.state.time);
//     },1000)
//   }
// }

// ReactDOM.render(
//   <Clock />,
//   document.getElementById('root')
// )


// //react 父元素传子元素值 props

// //react 子元素传父元素值 
// class ParenCom extends React.Component{
//   constructor(props){
//     super(props);
//     this.state={
//       childData:null
//     }
//   }
//   render(){
//     return (
//       <div>
//         <h1>我是父元素{this.state.childData}</h1>
//         <ChildCom setChildData={this.setChildData}/>
//       </div>
//     )
//   }
//   setChildData=(data)=>{
//     this.setState({
//       childData:data
//     })
//   }
// }
// class ChildCom extends React.Component{
//   constructor(props){
//     super(props)
//     this.state={
//       msg:'helloworld'
//     }
//   }
//   render(){
//     return (
//       <div>
//         <button onClick={this.sendData}>传递参数helloworld给父元素</button>
//       </div>
//     )
//   }
//   sendData=()=>{
//     // this.state.msg='helloworld';
//     console.log(this.state.msg)
//     this.props.setChildData(this.state.msg);
//   }
// }

// ReactDOM.render(
//   <ParenCom />,
//   document.getElementById('root')
// )