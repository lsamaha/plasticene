/**
 * Created by lsamaha on 12/11/14.
 */

function Link(source,target,pend) {
    this.source = source
    this.target = target
    this.source.wipout = function(wip) {
        return pend.push(wip)
    }
    this.target.nextwip = function() {
        return pend.pop()
    }
}

module.exports = Link

