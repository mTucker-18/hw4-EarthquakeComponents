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
    let quakeArr = [];
    fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2018-08-08&endtime=2018-08-09`)
    .then(response => response.json())
    .then(data => {
      for (let quake of data.features) {
        if (quake.properties.mag > 4.5)
          quakeArr.push(quake);
        }
      this.setState({
        data: quakeArr,
      });
      console.log(this.state.data);
    });
  }


// change style to show the year with the highets temp
  highTemp = () => {
    console.log('high temp button working');
    fetch(`https://api.darksky.net/forecast/6d00ebd7a82456376461d6b3ee100234/37.7749,-122.4194`)
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
