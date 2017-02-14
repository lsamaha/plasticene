#!/bin/bash

# Runs the mocha tests

node_modules/.bin/mocha $(find test -name "*.js") -r should $@
