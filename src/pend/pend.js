/**
 * Created by lsamaha on 12/11/14.
 */

var Wip = require('../wip/wip')
var guid = require('../core/guid')

function Pend() {
    this.guid = guid.guid()
    this.wips = []
    this.timestamps = []
    this.oldest = null
}

Pend.prototype.push = function push(pip, ticks) {
    this.wips.push(pip)
    this.timestamps.push(ticks)
    if(this.oldest == null) this.oldest = ticks
}

Pend.prototype.pop = function pop() {
    var pip = this.wips.shift()
    this.timestamps.shift()
    this.oldest = this.timestamps[0]
    return pip
}

Pend.prototype.length = function length() {
    return this.wips.length
}

module.exports = Pend


