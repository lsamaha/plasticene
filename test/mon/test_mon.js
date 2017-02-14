/**
 * Created by lsamaha on 12/12/14.
 */

var basedir = '../../'
var src = basedir + 'src/'
var Mon = require(src + 'mon/mon')
var should = require('should')

describe('mon', function() {
    it('rejects keyless monitor functions', function () {
        (function(){new Mon().watch(null, function () {})}).should.throw()
    })
    it('rejects quotes in monitor keys', function () {
        (function(){new Mon().watch('"', function () {})}).should.throw()
    })
    it('rejects null function params to watch', function () {
        (function(){new Mon().watch('a', null)}).should.throw()
    })
    it('rejects non-function params to watch', function () {
        (function(){new Mon().watch('a', {})}).should.throw()
    })
    it('invokes monitor functions each tick and adds it to keyed report', function () {
        var mon = new Mon()
        var acount = 2
        var bcount = 2
        mon.watch('a', function() {acount = Math.pow(acount,2);return acount})
        mon.watch('b', function() {bcount = Math.pow(bcount,2);return bcount})
        should.exist(mon.monitors)
        should.exist(mon.monitors['a'])
        should.exist(mon.monitors['b'])
        should.not.exist(mon.report['a'])
        should.not.exist(mon.report['b'])
        mon.tick()
        mon.report['a'].should.equal(4)
        mon.report['b'].should.equal(4)
        mon.tick()
        mon.report['a'].should.equal(16)
        mon.report['b'].should.equal(16)
        should.exist(mon.reportstring())
        mon.reportstring().trim().should.equal('"a","16"\n"b","16"')
    })
})

