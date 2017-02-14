/**
 * Created by lsamaha on 12/10/14.
 */

var basedir = '../../'
var src = basedir + 'src/'
var guid = require(src + 'core/guid')
var should = require('should')

describe('guid', function() {
    it('creates a guid', function () {
        var id = guid.guid().should.be.ok
    })
    it('creates unique guids', function () {
        var ids = {}
        for(var n = 0; n < 50; n++) {
            var id = guid.guid()
            ids.should.not.have.property(id)
            ids[id] = true
        }
    })
    it('efficiently creates guids', function () {
        this.timeout(100)
        for(var n = 0; n < 100; n++) {
            var id = guid.guid()
        }
    })
    it('creates a valid guid', function () {
        var id = guid.guid()
        id.length.should.equal(36)
        var parts = id.split('-')
        parts.length.should.equal(5)
        parts[0].length.should.equal(8)
        parts[1].length.should.equal(4)
        parts[2].length.should.equal(4)
        parts[3].length.should.equal(4)
        parts[4].length.should.equal(12)
    })
})
