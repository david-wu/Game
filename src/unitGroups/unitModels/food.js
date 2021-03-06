var BaseUnit = require('./_baseUnit.js')


function Food(options){
    BaseUnit.call(this, arguments);
    _.extend(this, {
        radius: 5,
        maxVelocity: 2,
        type: ['food'],
        spritePath: './carrot.png',
    });
    _.extend(this, options);
}

Food.configs = {
    name: 'food',
};

Food.prototype = Object.create(BaseUnit.prototype);

Food.prototype.act = function(){
    if(this.age % 100 === 0){
        this.wander(this.parent && this.parent.pos, 0.5);
    }
};

Food.prototype.wander = function(leashPos, leashStrength){
    this.vel = Vector.radial(Math.PI * 2 * Math.random(), this.maxVelocity);

    if(leashPos){
        this.vel = leashPos
            .subtract(this.pos)
            .setMagnitude(this.maxVelocity * leashStrength)
            .add(this.vel)
            .setMagnitude(this.maxVelocity)
    }
};


module.exports = Food;