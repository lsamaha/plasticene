/**
 * Created by lsamaha on 12/6/14.
 */

var basedir = '../../'
var src = basedir + 'src/'
var Pip = require(src + 'pip/pip')
var Sim = require(src + 'sim/sim')
var should = require('should')

describe('sim', function() {
    it('registers pips', function () {
        var mysim = new Sim()
        var mypip = new Pip()
        var name = 'flip'
        mypip.name = name
        var id = mysim.register(mypip)
        id.should.be.ok
        mysim.hasa(id).should.be.true
        mysim.get(id).should.be.ok
        mysim.get(id).name.should.equal(name)

    })
    it('registers pips uniquely', function () {
        var sim = new Sim()
        var pip1 = new Pip()
        pip1.name = 'x'
        var pip2 = new Pip()
        pip2.name = pip1.name
        var id1 = sim.register(pip1)
        id1.should.be.ok
        id1.should.not.equal(pip1.name)
        var id2 = sim.register(pip2)
        id1.should.not.equal(id2)
        sim.get(id1).should.not.equal(sim.get(id2))
    })
    it('rejects nameless pips', function () {
        var mypip = new Pip()
        delete mypip.name;
        (function(){new Sim().register(mypip)}).should.throw()
    })
    it('rejects untickable pips', function () {
        (function(){new Sim().register({notaname:'myservice', tick:'notafunc'})}).should.throw
    })
    it('removes pips', function () {
        var sim = new Sim()
        var mypip = new Pip()
        var id = sim.register(mypip)
        sim.hasa(id).should.be.true
        sim.remove(id)
        sim.hasa(id).should.be.false
    })
    it('ticks all registered pips', function () {
        var sim = new Sim()
        var pip1 = sim.get(sim.register(new Pip()))
        pip1.name = 'him'
        var pip2 = sim.get(sim.register(new Pip()))
        pip2.name = 'her'
        should.exist(pip1)
        should.exist(pip1.now)
        should.exist(pip2)
        should.exist(pip2.now)
        pip1.now.should.equal(0)
        pip2.now.should.equal(0)
        sim.tick(1)
        pip1.now.should.equal(1)
        pip2.now.should.equal(1)
        sim.tick(2)
        pip1.now.should.equal(3)
        pip2.now.should.equal(3)
        sim.tick(0)
        pip1.now.should.equal(3)
        pip2.now.should.equal(3)
        sim.tick(-1)
        pip1.now.should.equal(3)
        pip2.now.should.equal(3)
    })
})

