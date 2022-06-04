import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {

    state = {lat: null, errMessage: ''};

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({lat: position.coords.latitude});
            },
            (err) => this.setState({errMessage: err.message})
        );
    }

    renderContent(){
        if(this.state.lat && !this.state.errMessage){
            return <SeasonDisplay lat={this.state.lat}/>
        }
        if(!this.state.lat && this.state.errMessage){
            return <div>Error: {this.state.errMessage} </div>
        }

        return <Spinner message="Please Accept Location request"/>;
    };

    render(){
        return <div>{this.renderContent()}</div>
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));