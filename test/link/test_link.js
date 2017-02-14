/**
 * Created by lsamaha on 12/11/14.
 */

var basedir = '../../'
var src = basedir + 'src/'
var Pip = require(src + 'pip/pip')
var Wip = require(src + 'wip/wip')
var Link = require(src + 'link/link')
var Pend = require(src + 'pend/pend')
var should = require('should')

describe('link', function() {
    it('takes wip via put', function () {
        var pip1 = new Pip()
        var pip2 = new Pip()
        var pend = new Pend()
        var link = new Link(pip1,pip2,pend)
        var wip1 = new Wip()
        var wip2 = new Wip()
        var wip3 = new Wip()
        pip1.doout(wip1)
        pend.length().should.equal(1)
        wip1.should.equal(pip2.nextwip())
        pend.length().should.equal(0)
        pip1.doout(wip2)
        pend.length().should.equal(1)
        pip1.doout(wip3)
        pend.length().should.equal(2)
        wip2.should.equal(pip2.nextwip())
        pend.length().should.equal(1)
        wip3.should.equal(pip2.nextwip())
        pend.length().should.equal(0)
    })
})
