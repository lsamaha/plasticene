/**
 * Created by lsamaha on 12/6/14.
 */

var basedir = '../../'
var src = basedir + 'src/'
var Pip = require(src + 'pip/pip')
var Sim = require(src + 'sim/sim')
var Wip = require(src + 'wip/wip')
var Wiz = require(src + 'wiz/wiz')
var should = require('should')

describe('wiz', function() {
    it('takes a sim', function () {
        var mysim = new Sim()
        var mywiz = new Wiz(mysim)
        mywiz.sim.should.equal(mysim)
    })
    it('starts a sim with go', function () {
        var mysim = new Sim()
        var mywiz = new Wiz(mysim)
        mywiz.running.should.be.false
        mywiz.go()
        mywiz.running.should.be.true
    })
    it('stops a sim with stop', function () {
        var mysim = new Sim()
        var mywiz = new Wiz(mysim)
        mywiz.go()
        mywiz.stop()
        mywiz.running.should.not.be.true
    })
    it('interrupts a sim with breakif', function () {
        var didbreak = false
        var mysim = new Sim()
        var mywiz = new Wiz(mysim)
        var wip1 = new Wip()
        should.exist(wip1.guid)
        wip1.takes = 2
        var wip2 = new Wip()
        wip2.takes = 4
        var wip3 = new Wip()
        wip3.takes = 8
        var mypip = new Pip()
        mysim.register(mypip)
        mypip.wips = [wip1,wip2,wip3]
        mypip.nextwip = function() {
            return mypip.wips.shift()
        }
        mypip.durationof = function(wip) {
            return wip.takes
        }
        mywiz.breakif(function() {
            if(mypip.workingon != null) {
                return mypip.workingon != null && mypip.workingon.guid == wip2.guid
            }
        })
        mywiz.dobreak(function() {
            mywiz.running.should.not.be.true
            mypip.workingon.should.be.ok
            mypip.workingon.should.equal(wip2)
            mypip.now.should.equal(3)
            didbreak = true
        })
        mywiz.go(1)
        didbreak.should.be.false
        mywiz.go(10)
        didbreak.should.be.true
        mywiz.stop()
        mywiz.should.not.be.running
        didbreak.should.be.true
    })
})

