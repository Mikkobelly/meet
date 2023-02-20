import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { WarningAlert } from './Alert';
import { extractLocations, getEvents } from './api';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    selectedLocation: 'all',
    numberOfEvents: 32
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then(events => {
      if (this.mounted) {
        this.setState({ events: events.slice(0, this.state.numberOfEvents), locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    if (location === undefined) location = this.state.selectedLocation;
    getEvents().then(events => {
      const locationEvents = (location === 'all') ? events : events.filter(event => event.location === location);
      eventCount = eventCount === undefined ? this.state.numberOfEvents : eventCount;
      this.setState({
        events: locationEvents.slice(0, eventCount),
        selectedLocation: location,
        numberOfEvents: eventCount,
      });
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome to Meet App</h1>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents} />
        {!navigator.onLine &&
          <WarningAlert text='App is currently offline. You are seeing your cached data.' />
        }
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
