/**
 * Created by lsamaha on 12/6/14.
 */

guid = require("../core/guid")

function Sim() {
    this.pips = {}
    this.registrationover = false
}

Sim.prototype.register = function register(pip) {
    if(!this.registrationover) {
        if(pip.hasOwnProperty('name')) {
            if(!pip.hasOwnProperty('guid')) {
                pip.guid = guid.guid()
            }
            if(!pip.hasOwnProperty('now')) {
                pip.now = 0
            }
            if(typeof(pip.tick) != 'function') {
                throw "pips must be able to tick(ticks)"
            }
            this.pips[pip.guid] = pip
            return pip.guid
        } else {
            throw "pips must have a name at registration"
        }
    } else {
        throw "register pips before starting simulation"
    }
}

Sim.prototype.hasa = function hasa(id) {
    return this.get(id) != null
}

Sim.prototype.get = function get(id) {
    if(this.pips[id]) {
        return this.pips[id]
    } else {
        return null
    }
}

Sim.prototype.remove = function remove(id) {
    delete this.pips[id]
    return this
}

Sim.prototype.tick = function tick(ticks) {
    this.registrationover = true
    for(var pip in this.pips) {
        this.pips[pip].tick(ticks)
    }
}

module.exports = Sim
