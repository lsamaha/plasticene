/**
 * Created by lsamaha on 12/12/14.
 */

/**
 * Created by lsamaha on 12/12/14.
 *
 * Now the pig moves through the python.
 * The simulation shows we reach pending wip limits faster even though pip2 is improved.
 * Three linked pips work at different speeds.
 * This time Pip 2 has been improved so Pip 3 is slowest.
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

describe('worst of both worlds', function() {

    var wip1 = new Wip()
    var wip2 = new Wip()

    var took = Infinity
    var expecttook = 37
    var expectwip1took = 20
    var expectwip2took = 36

    wip1.takespip1 = 16
    wip1.takespip2 = 4
    wip2.takespip1 = 4
    wip2.takespip2 = 16

    it('shows constraints of wips whose durations vary by pip', function () {

        var sim = new Sim()
        var mon = new Mon()
        var wiz = new Wiz(sim, mon)
        var pip1 = new Pip()
        var pip2 = new Pip()
        sim.register(pip1)
        sim.register(pip2)
        var wips = [wip1,wip2]
        pip1.nextwip = function () {
            return wips.shift()
        }
        pip1.durationof = function(wip) {
            return wip.takespip1
        }
        pip2.durationof = function(wip) {
            return wip.takespip2
        }
        pip2.wipout = function(wip) {
            wip.took = mon.now
            pip2.wrote = wip.guid
        }
        var pend = new Pend()
        new Link(pip1, pip2, pend)
        wiz.breakif(function () {
            return wip2.guid == pip2.wrote
        })
        wiz.dobreak(function () {
            took = mon.now
            wiz.stop()
        })
        wiz.go(Infinity)
        expecttook.should.equal(took)
        expectwip1took.should.equal(wip1.took)
        expectwip2took.should.equal(wip2.took)
    })
})
