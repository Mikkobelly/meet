import React, { Component } from "react";

class NumberOfEvents extends Component {
    state = {
        number: 32
    }

    handleNumberChanged = (event) => {
        const value = event.target.value;
        this.setState({ number: value });
        this.props.updateEvents(undefined, value);
    }

    componentDidMount() {
        this.setState({ number: this.props.numberOfEvents || 32 });
    }

    render() {
        return (
            <div className="NumberOfEvents">
                <label className="label">Number of events: </label>
                <input
                    type="number"
                    className="number"
                    value={this.state.number}
                    onChange={this.handleNumberChanged}
                />
            </div>
        )
    }
}

export default NumberOfEvents;