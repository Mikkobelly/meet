import React, { Component } from 'react';
import './App.css';
import WelcomeScreen from './WelcomeScreen';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { WarningAlert } from './Alert';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    selectedLocation: 'all',
    numberOfEvents: 32,
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then(events => {
        if (this.mounted) {
          this.setState({ events: events.slice(0, this.state.numberOfEvents), locations: extractLocations(events) });
        }
      });
    }
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
    if (this.state.showWelcomeScreen === undefined) return <div className='App' />

    return (
      <div className="App">
        <h1>Welcome to Meet App</h1>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents} />
        {!navigator.onLine &&
          <WarningAlert text='App is currently offline. You are seeing your cached data.' />
        }
        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;
