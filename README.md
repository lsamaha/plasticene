# Plasitcene

Plasticene is a nodejs project for constructing simulations and measuring throughput and work in progress under various conditions.

## Sim

A sim is a simulation of a whole system of work. Simulations are performed in ticks.

## Pips

Pips are nodes in the system. They naturally complete work in progress at a natural interval.
Since this is a sim we don't usually have to do anything, we just have to express how long it would take if we did.
Given nothing other than an interval attribute, the sim puts out work at the proper rate.

## Wip

Wips models work in progress. Units of work are wips. A wip can influence the default work interval by exposing a
numeric takes attribute.

## Make Your Own Pip and Give it Work

Pips get work by invoking a nextwip function supplied by you. Like so:

```javascript
var mypip = new Pip()
var wip1 = new Wip()
var wip2 = new Wip()
wip1.takes = 2
wip2.takes = 4
mypip.wips = [wip1,wip2]
mypip.nextwip = function() {
    // give the pip something to do
    return mypip.wips.shift()
}
```
Your wips respond to work at their own customized pace:

```javascript
var wip3 = new Wip()
var wip4 = new Wip()
wip3.hard = false
wip4.hard = true
mypip.durationof = function(wip) {
    return wip.hard ? 2 : 1
}
```

## Make Your Own Sim and Add Your Pips

When pips are registered they are given a unique ID that's used to monitor a sim and report on it.
Pips cannot be registered without a name, which is more like a type, and is not intended to be unique.

```javascript
var sim = new Sim()
var pip = new Pip()
pip.name = 'flipper'
var guid = sim.register(mypip)
```

## Link Your Pips And Watch Wips Pend

If a link is constructed with two pips, wips will flow from one to another. It just attaches the doout function of one
pip to the getwip function of another.  Links makes it easy to declare chains of work. Like so:

```javascript
    var pip1 = new Pip()
    var pip2 = new Pip()
    var pend = new Pend()
    var link = new Link(pip1,pip2,pend)
    var wip1 = new Wip()
    var wip2 = new Wip()
    pip1.doout(wip1)
    pip1.doout(wip2)
    pend.length().should.equal(2)
    wip1.should.equal(pip2.nextwip())
    wip2.should.equal(pip2.nextwip())
```
*To simplify things here we access doout directly but you'd normally
 get output at the rate you described by attaching a nextwip function and run a simulation.*

## Use Wiz to Run Your Sim

Like so:

```javascript
var sim = new Sim()
var wiz = new Wiz(sim)
var guid = sim.register(mypip)
var ticks = 100
wiz.go(ticks)
```

## Use Wiz Breaks to Pause Your Sim

Like so:

```javascript
sim.register(mypip)
var wiz = new Wiz(sim)
wiz.breakif(function() {guid.workingon = mywip})
wiz.break(function() {mypip.workingon.should.equal(mywip)})
var ticks = Infinity
wiz.go(ticks)
```

## Use Mon to Watch Anything In Your Sim

The whole point is probably to get a glimpse of some aspect of your state at some point of time.
 If you know in advance
So if you say:

```javascript
var sim = new Sim()
var mon = new Mon()
var wiz = new Wiz(sim, mon)
var counta = bcount = 2
mon.watch('a', function() {counta = Math.pow(counta,2);return counta})
mon.watch('b', function() {countb = Math.pow(countb,2);return countb})
wiz.go(3)
mon.reportstring()
```

Then you'll see:

    "a","256"
    "b","256"

## Test Our Work

Lots of unit tests are available. A few full simulations with monitors are available too. Unit tests
construct and exercise things in ways you wouldn't want to in the real world. The "uber" simulation scripts,
are a good place to look for a working end-to-end example of what you can do and how you might do it.

    npm test

## Hey Gang! It's Ready!

![alt tag](https://s3.amazonaws.com/lwsamaha-static/plasticene/media/snits-revenge.png)
