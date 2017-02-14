test = test/mon/test_mon.js

test:
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter min test

test-w:
	@NODE_ENV=test ./node_modules/.bin/mocha --watch --growl --reporter min test

init-testing update-testing:
	npm install

.PHONY: test test-w init-testing update-testing
