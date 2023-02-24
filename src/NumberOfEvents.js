import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
    state = {
        number: 32
    }

    handleNumberChanged = (event) => {
        const value = event.target.value;
        if (value < 1 || value > 50) {
            this.setState({ number: value, errorText: 'Please specify a number between 1 to 50' })
        } else {
            this.setState({ number: value, errorText: '' })
        }
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
                    style={this.state.errorText && this.state.errorText.length > 0 ? { borderColor: 'red' } : {}}
                />
                <ErrorAlert text={this.state.errorText} />
            </div>
        )
    }
}

export default NumberOfEvents;