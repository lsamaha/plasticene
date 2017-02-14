/**
 * Created by lsamaha on 12/10/14.
 */

var guid = require("../core/guid")

function Pip() {

    this.guid = guid.guid()
    this.name = null
    this.now = 0
    this.interval = 1
    this.workingon = null
    this.workingsince = 0
    this.workingfor = 0
    this.outputcount = 0
    this.inputcount = 0
}

Pip.prototype.tick = function tick(count) {
    if(count == null) {count = 1}
    for(var n=0; n<count; n++) {
        this.now += 1
        var wasworkingon = this.workingon
        this.work()
        var workisdone = this.workingon == null
        var workisnew = !workisdone && (wasworkingon == null || (wasworkingon != this.workingon))
        if(workisnew) {
            // new work
            this.workingfor = this.durationof(this.workingon)
            this.workingsince = this.now
        } else if(workisdone) {
            this.workingfor = 0
            this.workingsince = 0
        }
    }
}

Pip.prototype.work = function work() {
    if(this.wipdone()) {
        if(this.workingon != null) this.doout(this.workingon)
        this.workingon = this.nextwip()
        this.workon(this.workingon)
    }
}

Pip.prototype.workon = function workon(pip) {
    // overriden
}

Pip.prototype.nextwip = function nextwip() {
    return null
}

Pip.prototype.wipdone = function wipdone() {
    return this.workingon == null || this.now >= this.workingsince + this.workingfor
}

Pip.prototype.durationof = function(wip) {
    if(wip == null) {
        return 0
    } else if(wip.hasOwnProperty('takes')) {
        return wip.takes
    } else {
        return this.interval
    }
}

Pip.prototype.doin = function(wip) {
    this.wipin(wip)
    this.inputcount++
}

Pip.prototype.wipin = function(wip) {
}

Pip.prototype.doout = function(wip) {
    this.wipout(wip)
    this.outputcount++
}

Pip.prototype.wipout = function(wip) {
}

module.exports = Pip
