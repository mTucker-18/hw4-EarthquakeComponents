import React, { Component } from 'react';
import './App.css';
import dataJson from './data/data.json';

class App extends Component {
  state = {
    data: [],
  }

  componentDidMount = () => {
    this.onFetch();
  }

// get data from json and populate state
  onFetch = () => {
    let data = [];
    for (let item of dataJson) {
      data.push(item);
    }
    this.setState({data: data});
  }

// change style to show the year with the highets temp
  highTemp = () => {
    let elem = document.getElementsByClassName("Bar");
    elem[9].style.backgroundColor = "red";
    elem[9].style.color = "black";
    elem[9].style.height = "85%";
    elem[9].style.transition = "3s";
  }

// change style to show the year with the lowest temp
  lowTemp = () => {
    let elem = document.getElementsByClassName("Bar");
    elem[5].style.backgroundColor = "blue";
    elem[5].style.color = "black";
    elem[5].style.height = "53%";
    elem[5].style.transition = "3s";
  }

  render() {
    return (
      <div className="Graph">
        <div className="Graph-header">
  		     <h1>San Francisco Weather Over the Last 10 Years</h1>
        </div>

        <div className="Graph-container">
          <p>All records taken on July 15th</p>
  				<button onClick={this.highTemp}>Highest temp</button>
  				<button onClick={this.lowTemp}>Lowest temp</button>
          <div className="Graph-bars">
            {
              this.state.data.map(datum => (
                <div className="Bar" style={{height: datum.avg + "%"}}>
                  July {datum.year}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
