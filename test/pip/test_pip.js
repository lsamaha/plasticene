/**
 * Created by lsamaha on 12/6/14.
 */

var basedir = '../../'
var src = basedir + 'src/'
var Pip = require(src + 'pip/pip.js')
var Wip = require(src + 'wip/wip.js')
var should = require('should')

describe('pip', function() {
    it('has a unique id', function () {
        new Pip().guid.should.be.ok
        new Pip().guid.should.not.equal(new Pip().guid)
    })
    it('takes a name', function () {
        var mypip = new Pip()
        mypip.should.be.ok
        mypip.should.have.property('name')
        var name = 'mypip'
        mypip.name = name
        mypip.name.should.equal(name)
    })
    it('responds to tick', function () {
        var mypip = new Pip()
        mypip.now.should.equal(0)
        mypip.tick()
        mypip.now.should.equal(1)
    })
    it('responds to ticks', function () {
        var mypip = new Pip()
        mypip.should.be.ok
        mypip.now.should.equal(0)
        mypip.tick(2)
        mypip.now.should.equal(2)
    })
    it('gets no work', function () {
        should.not.exist(new Pip().nextwip())
    })
    it('has no work duration', function () {
        var mypip = new Pip()
        mypip.durationof(mypip.nextwip()).should.equal(0)
    })
    it('has no work duration when it has no work', function () {
        var mypip = new Pip()
        mypip.durationof(null).should.equal(0)
    })
    it('progresses through wips at default interval', function () {
        var mypip = new Pip()
        should.exist(mypip.interval)
        mypip.interval.should.be.above(0)
        mypip.durationof({}).should.equal(mypip.interval)
    })
    it('takes in', function () {
        var didin = false
        var mypip = new Pip()
        mypip.wipin = function(pip) {
            didin = true
        }
        didin.should.be.false
        mypip.doin(new Wip())
        mypip.inputcount.should.equal(1)
        didin.should.be.true
        mypip.doin(new Wip())
        mypip.inputcount.should.equal(2)
    })
    it('puts out on doout', function () {
        var mypip = new Pip()
        var didout = false
        mypip.wipout = function() {
            didout = true
        }
        didout.should.be.false
        mypip.doout(new Wip())
        didout.should.be.true
        mypip.outputcount.should.equal(1)
        mypip.doout(new Wip())
        mypip.outputcount.should.equal(2)
    })
    it('puts out done wips', function () {
        var mypip = new Pip()
        var wipout = null
        var wip1 = new Wip()
        mypip.wipout = function(wip) {
            wipout = wip
        }
        mypip.nextwip = function() {
            return wip1
        }
        mypip.tick(2)
        should.exist(wipout)
        wipout.should.equal(wip1)
    })
    it('calls work tick times', function () {
        var mypip = new Pip()
        var count = 0
        mypip.work = function work() {
            count++
        }
        mypip.tick(3)
        count.should.equal(3)
    })
    it('updates workingfor to current wip duration', function () {
        var mypip = new Pip()
        var wip1 = {takes:1}
        mypip.nextwip = function() {
            return wip1
        }
        mypip.durationof = function(wip) {
            return wip1.takes
        }
        mypip.tick()
        mypip.workingon = wip1
        mypip.workingfor = wip1.takes
    })
    it('works on wip for exactly wip duration ticks', function () {
        var mypip = new Pip()
        var wip1 = {takes:1}
        mypip.wips = [wip1]
        mypip.nextwip = function() {
            return mypip.wips.shift()
        }
        mypip.durationof = function(awip) {
            return awip.takes
        }
        mypip.tick()
        mypip.workingon.should.equal(wip1)
        mypip.workingfor.should.equal(wip1.takes)
        mypip.tick(wip1.takes - 1)
        mypip.workingon.should.equal(wip1)
        mypip.workingfor.should.equal(wip1.takes)
        mypip.tick()
        mypip.wipdone().should.ok
        should.not.exist(mypip.workingon)
        mypip.workingfor.should.equal(0)
    })
    it('is working on nothing when all wip is done', function () {
        var mypip = new Pip()
        var wip1 = {takes:1}
        var wip2 = {takes:2}
        var wip3 = {takes:4}
        mypip.wips = [wip1,wip2,wip3]
        mypip.nextwip = function() {
            return this.wips.shift() // return/remove wip in order
        }
        mypip.durationof = function(wip) {
            return wip.takes
        }
        mypip.work = function work() {
            if(this.workingon == null || this.wipdone()) {
                this.workingon = this.nextwip()
            }
        }
        should.not.exist(mypip.workingon)
        mypip.wipdone().should.be.ok
        mypip.tick()
        mypip.workingon.should.equal(wip1)
        mypip.workingfor = wip1.takes
        mypip.tick()
        mypip.workingon.should.equal(wip2)
        mypip.workingfor = wip2.takes
        mypip.tick()
        mypip.wipdone().should.not.be.ok
        mypip.workingon.should.equal(wip2)
        mypip.workingfor = wip2.takes
        mypip.tick()
        mypip.workingon.should.equal(wip3)
        mypip.workingfor = wip3.takes
        mypip.tick(4)
        should.not.exist(mypip.workingon)
        mypip.workingfor.should.equal(0)
    })
})

