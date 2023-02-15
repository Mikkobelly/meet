import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mockData";

describe('<Event /> component', () => {
    let EventWrapper;
    const event = mockData[0]
    beforeAll(() => {
        EventWrapper = shallow(<Event event={event} />);
    })

    test('render event summary correctly', () => {
        expect(EventWrapper.find('.summary')).toHaveLength(1);
        expect(EventWrapper.find('.summary').text()).toBe(event.summary);
    })

    test('render event start correctly', () => {
        expect(EventWrapper.find('.start')).toHaveLength(1);
        expect(EventWrapper.find('.start').text()).toBe(new Date(event.start.dateTime).toString());
    })

    test('render event location correctly', () => {
        expect(EventWrapper.find('.location')).toHaveLength(1);
        expect(EventWrapper.find('.location').text()).toBe(`@${event.summary} | ${event.location}`);
    })

    test('render button labeled show details when details are collapsed', () => {
        EventWrapper.setState({ collapsed: true });
        expect(EventWrapper.find('.toggleButton')).toHaveLength(1);
        expect(EventWrapper.find('.toggleButton').text()).toBe('show details');
    })

    test('render correct details when user clicks show details button', () => {
        EventWrapper.setState({ collpsed: true });
        EventWrapper.find('.toggleButton').simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(false);
        expect(EventWrapper.find('h3.about')).toHaveLength(1);
        expect(EventWrapper.find('a.link')).toHaveLength(1);
        expect(EventWrapper.find('a.link').prop('href')).toBe(event.htmlLink);
        expect(EventWrapper.find('.description')).toHaveLength(1);
        expect(EventWrapper.find('.description').text()).toBe(event.description);
    })

    test('render button labeled hide details when details are shown', () => {
        EventWrapper.setState({ collapsed: false });
        expect(EventWrapper.find('.toggleButton')).toHaveLength(1);
        expect(EventWrapper.find('.toggleButton').text()).toBe('hide details');
    })

    test('hide details when user clicks hide details button', () => {
        EventWrapper.setState({ collapsed: false });
        EventWrapper.find('.toggleButton').simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(true);
        expect(EventWrapper.find('h3.about')).toHaveLength(0);
        expect(EventWrapper.find('a.link')).toHaveLength(0);
        expect(EventWrapper.find('.description')).toHaveLength(0);
    })
})