var BaseUnit = require('./_baseUnit.js');


function HunterVision(options){
    BaseUnit.apply(this, arguments);
    _.extend(this, {
        pos: undefined,
        color: 'blue',
        opacity: 0.05,
        initialRadius: 100,
        radius: 100,
        spritePath: './aoe.png',
    });
    _.extend(this, options);
}

HunterVision.configs = {
    name: 'hunterVision',
    parentStage: this.stage,
    canCollideWith: ['food'],
    collisionBounds: this.collisionBounds,
    collisionCheckFrequency: 10,
    draw: _.noop,
}

HunterVision.prototype = Object.create(BaseUnit.prototype);

HunterVision.prototype.plan = _.noop;

HunterVision.prototype.act = _.noop;

// HunterVision.prototype.draw = _.noop;

HunterVision.prototype.step = _.noop;

module.exports = HunterVision;