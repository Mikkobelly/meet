import React, { Component } from 'react';

class Event extends Component {
    state = {
        collapsed: true
    }

    handleButtonClicked = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }

    render() {
        const { event } = this.props;
        return (
            <div className="event">
                <h2 className="summary">{event.summary}</h2>
                <p className="start">{new Date(event.start.dateTime).toString()}</p>
                <p className="location">{`@${event.summary} | ${event.location}`}</p>
                <button
                    className="toggleButton"
                    onClick={this.handleButtonClicked}
                >
                    {this.state.collapsed === true ? 'show details' : 'hide details'}
                </button>
                {this.state.collapsed === false && (
                    <>
                        <h3 className="about">About</h3>
                        <a href={event.htmlLink} target="_blank" rel="noreferrer" className="link">See details on Google Calender</a>
                        <p className='description'>{event.description}</p>
                    </>
                )
                }
            </div>
        );
    }
}

export default Event;