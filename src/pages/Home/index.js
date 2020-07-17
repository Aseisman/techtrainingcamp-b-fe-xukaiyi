import React from 'react';
import './index.css';

class Home extends React.Component{
    render(){
        return(
            <div>
                { this.props.children}
            </div>
        )
    }
}
export default Home;