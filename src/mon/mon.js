/**
 * Created by lsamaha on 12/12/14.
 */

function Mon() {
    this.monitors = {}
    this.report = {}
    this.now = 0
}

Mon.prototype.watch = function(key, func) {
    if(key == null) {
        throw new Error('watches need a non null key')
    } else if(func == null || typeof func != 'function') {
        throw new Error('objects are watched using parameterless functions that returns a monitorable value')
    } else if(key.indexOf('"') >= 0) {
        throw new Error('keys cannot contain double quotes')
    } else {
        this.monitors[key] = func
    }
}

Mon.prototype.tick = function() {
    this.now++
    for(var key in this.monitors) {
        this.report[key] = this.monitors[key]()
    }
}

Mon.prototype.reportstring = function() {
    var str = ""
    var sorted = [];
    for(var key in this.report) {
        sorted[key] = key;
    }
    sorted.sort();
    for(key in sorted) {
        str += ('"' + key + '"' + ',' + '"' + this.report[key] + '"' + '\n')
    }
    return str
}

module.exports = Mon
