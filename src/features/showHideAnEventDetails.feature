Feature: Show/Hide an Event’s Details

    Scenario: An event element is collapsed by default.
        Given app is loaded
        When user receive the list of events in all cities (or specified city if searched)
        Then user should see minimal informations about the listed events

    Scenario: User can expand an event to see its details.
        Given the main page is open with the list of events in all cities or specified city
        When user clicks "show details" button for the associated event from the list
        Then user should see more details of the event associated with the clicked button

    Scenario: User can collapse an event to hide its details.
        Given the main page is open with the list of upcoming events in all cities or specified city
        And user has clicked "show details" button and details of event are shown
        When user clicks "hide details" button for the associated event from the list
        Then user should see less details of the event associated with the clicked button
