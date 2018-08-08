import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    data: [],
  }

  componentDidMount = () => {
    this.onFetch();
  }

// get data from json and populate state
  onFetch = () => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=Oakland,us&APPID=ef276953c6e59a3037dd6d47154f8e7f`)
    .then(response => response.json())
    .then(data => {
      console.log("data recieved", data);
      this.setState({

      });
    });
  }



// change style to show the year with the highets temp
  highTemp = () => {
    console.log('high temp button working');
    fetch(`http://history.openweathermap.org/data/2.5/history/city?q=London,UK&APPID=ef276953c6e59a3037dd6d47154f8e7f`)
    .then(response => response.json())
    .then(data => {
      console.log("data recieved", data);
      this.setState({

      });
    });
  }

// change style to show the year with the lowest temp
  lowTemp = () => {
    console.log('low temp button working')
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
