/**
 * Created by lsamaha on 12/11/14.
 */

var basedir = '../../'
var src = basedir + 'src/'
var Pend = require(src + 'pend/pend')
var Wip = require(src + 'wip/wip')
var should = require('should')

describe('pend', function() {
    it('takes wip via put', function () {
        var pend = new Pend()
        pend.length().should.equal(0)
        pend.push(new Wip())
        pend.length().should.equal(1)

    })
    it('gets wip via get', function () {
        var pend = new Pend()
        var wipin = new Wip()
        pend.push(wipin)
        pend.pop().should.equal(wipin)
        pend.length().should.equal(0)
    })
    it('measures age of work', function () {
        var pend = new Pend()
        var wip1 = new Wip()
        var wip2 = new Wip()
        var time1 = 310
        var time2 = 330
        should.not.exist(pend.oldest)
        pend.push(wip1, time1)
        pend.push(wip2, time2)
        pend.oldest.should.equal(time1)
        pend.pop()
        pend.oldest.should.equal(time2)
    })
})


