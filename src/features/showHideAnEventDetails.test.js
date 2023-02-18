import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from "enzyme";
import { mockData } from '../mockData';
import App from "../App";

const feature = loadFeature('./src/features/showHideAnEventDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default.', ({ given, when, then }) => {
        let AppWrapper;
        given('app is loaded', () => {
            AppWrapper = mount(<App />);
        });

        when('user receive the list of events in all cities (or specified city if searched)', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });

        then('user should see minimal informations about the listed events', () => {
            expect(AppWrapper.find('.description')).toHaveLength(0);
            expect(AppWrapper.find('.event').at(0).find('.toggleButton').text()).toBe('show details');
        });
    });


    test('User can expand an event to see its details.', ({ given, when, then }) => {
        let AppWrapper;
        given('the main page is open with the list of events in all cities or specified city', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });

        when('user clicks "show details" button for the associated event from the list', () => {
            AppWrapper.find('.event').at(0).find('.toggleButton').simulate('click');
        });

        then('user should see more details of the event associated with the clicked button', () => {
            expect(AppWrapper.find('.event').at(0).find('.description')).toHaveLength(1);
            expect(AppWrapper.find('.event').at(0).find('.toggleButton').text()).toBe('hide details');
        });
    });

    test('User can collapse an event to hide its details.', ({ given, and, when, then }) => {
        let AppWrapper;
        given('the main page is open with the list of upcoming events in all cities or specified city', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });

        and('user has clicked "show details" button and details of event are shown', () => {
            AppWrapper.find('.event').at(0).find('.toggleButton').simulate('click');
            expect(AppWrapper.find('.event').at(0).find('.description')).toHaveLength(1);
        })

        when('user clicks "hide details" button for the associated event from the list', () => {
            AppWrapper.find('.event').at(0).find('.toggleButton').simulate('click');
        });

        then('user should see less details of the event associated with the clicked button', () => {
            expect(AppWrapper.find('.event').at(0).find('.description')).toHaveLength(0);
            expect(AppWrapper.find('.event').at(0).find('.toggleButton').text()).toBe('show details');
        });
    });
});