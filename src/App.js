import React, { Component } from 'react';
import './App.css';

import InputDate from './components/InputDate/InputDate.js';
import EventLink from './components/EventLink/EventLink.js';

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

  render() {
    return (
      <div className="Graph">
        <div className="Graph-header">
  		     <h1>Large Earthquakes Worldwide</h1>
        </div>
        <InputDate currentDate={this.state.searchDate} />
        <EventLink data={this.state.data}/>

        </div>
    );
  }
}

export default App;
