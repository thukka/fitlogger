# Frontend for fitlogger

## src/components directory contains all of the visible MUI components:
- FrontPage.js aka home page.
  - Gets user entry data and sends it to the backend.
  - Dispatches notification forward. Notification is shown if successful or not.
- LoginPage.js
  - Get user email (=username) and password.
- Navigation.js
  - Bottom navigation components.
  - Function for logging user out. Clears localStorage and dispatches logOut which returns initial state.
- Notification.js
  - Renders notifications depending on the error state. If notification is not an error, green success style is used.
- StatPage.js
  - Fetches user data and displays it in a table.
  - Total distance and total duration is shown. Calculated from the user data.

## src/reducers
- Redux reducers for notifications and user state.
- Action creators for managing the state.

## src/services
- Axios functions for entries and login.

## src/App.js
- React router. Handles route paths according to if user is found in state.
- Checks local storage for a logged user and logs the user in if it's found.

## src/index.js
- Provides redux store.
- Provides theming and fonts.
- Dark mode enabled.
- Renders the whole site to 'root' id.

## src/store.js
- Redux store.
  - Combines user and notification reducers.
- Thunk and devtools.

## Tests
- Cypress tests in /cypress/integration/fitlogger_app.js