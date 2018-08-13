import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    data: [],
    searchDate: '07/12/2018',
  }

  componentDidMount = () => {
    this.onFetch();
  }

// get data from json and populate state
  onFetch = () => {
    let quakeArr = [];

    // this code takes in the search criteria and adds it to the API fetch
    let cleanDate = this.state.searchDate.split('/');
    let month = cleanDate[0];
    let day = cleanDate[1];
    let year = cleanDate[2];
    let endDay = parseInt(cleanDate[1], 10) + 1;

    fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${year}-${month}-${day}&endtime=${year}-${month}-${endDay}`)
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

  inputDate = () => {
    console.log('search date', this.state.data.searchDate)
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
          <p>Current date displaying is {this.state.searchDate}</p>
          <p>
            Search for a 4.5 Magnitude or greater event on
              <input type="date" />
              <button onClick={this.inputDate}>Submit</button>
          </p>
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
