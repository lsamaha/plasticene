/**
 * Created by lsamaha on 12/11/14.
 */

var basedir = '../../'
var src = basedir + 'src/'
var Wip = require(src + 'wip/wip.js')
var should = require('should')

describe('wip', function() {
    it('has a unique id', function () {
        new Wip().guid.should.be.ok
        new Wip().guid.should.not.equal(new Wip().guid)
    })
})

