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
    fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2018-08-12&endtime=2018-08-13`)
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


// visits the url of the earthquake event
  eventPage = () => {
    console.log('Event page button working', this.state.data[0].properties.url);
    window.location.href = this.state.data[0].properties.url;
  }

  render() {
    return (
      <div className="Graph">
        <div className="Graph-header">
  		     <h1>Large Earthquakes Worldwide</h1>
        </div>

        <div className="Graph-container">
          <p>4.5 Magnitude or greater event on <input type="date" placeholder="08/12/2018" /></p>
          <p>Click on an event to see more info.</p>

          <div className="Graph-bars">
            {
              this.state.data.map(datum => (
                <div className="Bar" style={{height: datum.properties.mag * 10 + "%"}}>
                  <p onClick={this.eventPage}> {datum.properties.place} </p>
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
