/**
 * Created by lsamaha on 12/12/14.
 *
 * Three linked pips work at different speeds. Pip 2 is slowest.
 * How long does it take for pending wip reach a limit?
 * Where does it reach the limit first?
 */
var basedir = '../../'
var src = basedir + 'src/'
var Sim = require(src + 'sim/sim')
var Mon = require(src + 'mon/mon')
var Wiz = require(src + 'wiz/wiz')
var Wip = require(src + 'wip/wip')
var Pip = require(src + 'pip/pip')
var Link = require(src + 'link/link')
var Pend = require(src + 'pend/pend')

describe('pickle in the middle', function() {
    var maxpend = 10
    var dur1 = 4
    var dur2 = 9
    var dur3 = 8
    var expect = 81
    var actual = Infinity
    var pend1len = null
    var pend2len = null

    it('predicts wip pending limit given a slow middle node', function () {

        var sim = new Sim()
        var mon = new Mon()
        var wiz = new Wiz(sim, mon)
        var pip1 = new Pip()
        var pip2 = new Pip()
        var pip3 = new Pip()
        sim.register(pip1)
        sim.register(pip2)
        sim.register(pip3)
        pip1.nextwip = function () {
            return new Wip()
        }
        pip1.interval = dur1 // any wip done in dur1 ticks
        pip2.interval = dur2 // any wip done in dur2 ticks
        pip3.interval = dur3 // any wip done in dur3 ticks
        var pend1 = new Pend()
        var pend2 = new Pend()
        new Link(pip1, pip2, pend1)
        new Link(pip2, pip3, pend2)
        mon.watch('pend1-backlog', function () {return pend1.length()})
        mon.watch('pend2-backlog', function () {return pend2.length()})
        wiz.breakif(function () {
            return pend1.length() > maxpend || pend2.length() > maxpend
        }) // how long does it take to fall this far behind?
        wiz.dobreak(function () {
            actual = mon.now
            pend1len = mon.report['pend1-backlog']
            pend2len = mon.report['pend2-backlog']
            wiz.stop()
        })
        wiz.go(Infinity)
        pend1len.should.be.above(pend2len) // pend1 fills first b/c pip2 is slow
        expect.should.equal(actual)
    })
})
