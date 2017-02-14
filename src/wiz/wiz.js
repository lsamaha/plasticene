/**
 * Created by lsamaha on 12/10/14.
 */

function Wiz(sim, mon) {
    this.sim = sim
    this.mon = mon
    this.running = false
    this.breakifcallback = function() {return false}
    this.breakcallback = this.stop
}

Wiz.prototype.go = function(ticks) {
    this.running = true
    for(var n=0; n < ticks; n++) {
        if(this.running) {
            if(this.breakifcallback()) {
                this.stop()
                this.breakcallback()
                break
            }
            if(this.sim != null) this.sim.tick()
            if(this.mon != null) this.mon.tick()
        } else {
            break
        }
    }
}

Wiz.prototype.stop = function() {
    this.running = false
}

Wiz.prototype.breakif = function (callback) {
    this.breakifcallback = callback
}

Wiz.prototype.dobreak = function (callback) {
    this.breakcallback = callback
}

module.exports = Wiz
