import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    })

    test('render label for number input', () => {
        expect(NumberOfEventsWrapper.find('label')).toHaveLength(1);
    })

    test('render number input', () => {
        expect(NumberOfEventsWrapper.find('.number')).toHaveLength(1);
    })

    test('render number input correctly', () => {
        const number = NumberOfEventsWrapper.state('number');
        expect(NumberOfEventsWrapper.find('.number').prop('value')).toBe(number);
    })

    test('number input is 32 by default', () => {
        NumberOfEventsWrapper.setState({ number: 32 });
        expect(NumberOfEventsWrapper.find('.number').prop('value')).toBe(32);
        expect(NumberOfEventsWrapper.state('number')).toBe(32);
    })

    test('change state when number input changes', () => {
        NumberOfEventsWrapper.setState({ number: 32 });
        const eventObject = { target: { value: 64 } };
        NumberOfEventsWrapper.find('.number').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('number')).toBe(64);
    })
})