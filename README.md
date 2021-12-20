# robofriends-pwa-testing
Complete React Developer Testing in React Lesson

with added PWA capabilities to a react app

## To run the project:

1. Clone this repo
2. Run `npm install`
3. Run `npm start`

## To run test

Run test: run `npm test`

Run code coverage: run `npm test -- --coverage --watchAll`

## Note 
There is an error when running `npm start`, which can be fixed: https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported

nock issue fixes:
	- debugging nock: `export DEBUG=nock.* && npm test ./src/actions.test.j`
	- https://github.com/axios/axios/issues/2654
