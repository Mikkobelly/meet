Feature: Specify Number of Events
    Scenario: When user hasn’t specified a number, 32 is the default number.
        Given app is loaded and user hasn’t specified a number
        When user receives the list of events in all cities or specified city
        Then user should see the list of 32 upcoming events in all cities or specified city
    Scenario: User can change the number of events they want to see.
        Given the main page is open with the list of events in all cities or specified city
        When user specifies number of events to display
        Then user receives specified number of events on the screen