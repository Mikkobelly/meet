import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from "enzyme";
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mockData';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When user hasn’t specified a number, 32 is the default number.', ({ given, when, then }) => {
        let AppWrapper;
        given('app is loaded and user hasn’t specified a number', () => {
            AppWrapper = mount(<App />);
        });

        when('user receives the list of events in all cities or specified city', async () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });

        then('user should see the list of 32 upcoming events in all cities or specified city', () => {
            expect(AppWrapper.find('.event')).toHaveLength(32);
        });
    });

    test('User can change the number of events they want to see.', ({ given, when, then }) => {
        let AppWrapper;
        given('the main page is open with the list of events in all cities or specified city', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });

        when('user specifies number of events to display', () => {
            let NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            NumberOfEventsWrapper.find('.number').simulate('change', { target: { value: 10 } });
        });

        then('user receives specified number of events on the screen', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(10);
        });
    });


});