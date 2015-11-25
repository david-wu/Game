

var quadTree = require('./quadNode.js')


function UnitGroup(options){

    // list of units (and other unitgroups!?  Get a tree going)
    this.units = options.units || [];

    // list of other unitGroups
    this.canCollideWith = options.canCollideWith || [];
    this.collisionBounds = options.collisionBounds || [];
    this.collisionLatency = options.collisionLatency || 3;
}

// Move triggers physical laws like updating vel, pos, drag
UnitGroup.prototype.move = function(){
    var i,l;
    for(i=0,l=this.units.length; i++){
        this.units[i].emit('step');
    }
}

// Can optimize by drawing similar things all at once
// Update frequency can be proportional to vel
UnitGroup.prototype.draw = function(){
    this.drawPrep();
    this.drawFinish();
    for(i=0,l=this.units.length; i++){
        this.units[i].emit('draw');
    }
}

// Think triggers the unit's logic, like if it will hunt/wander
UnitGroup.prototype.think = function(){
    var i,l;
    for(i=0,l=this.units.length; i++){
        this.units[i].emit('think');
    }
}

// Emits collisions, vision doesn't need to checkCollisions as often
UnitGroup.prototype.checkCollisions = function(){
    var i,l
    for(i=0, l=this.canCollideWith.length; i++){
        this.checkCollisionWithGroup(this.canCollideWith[i]);
    }
}

// Faster to only check unitGroups that can collide with this
UnitGroup.prototype.checkCollisionWithGroup = function(unitGroup){

    var qn = new QuadNode({
        contentGroups: [this.units, unitGroup.units],
        bounds: this.collisionBounds,
    });

    var contentNodes = qn.allContentNodes();

    var m, n, contentNode;
    for(m=0, n=contentNodes.length; m<n; m++){
        contentNode = contentNodes[m];

        var contentGroup1 = contentNode.contentGroups[0];
        var contentGroup2 = contentNode.contentGroups[1];

        var i, j, iLength, jLength;
        var unit1;
        var unit2;
        for(var i = 0, iLength = contentGroup1.length; i < iLength; i++){
            for(var j = 0, jLength = contentGroup2.length; j < jLength; j++){
                unit1 = contentGroup1[i];
                unit2 = contentGroup2[j]
                if(unit1.distanceFrom(unit2) < (unit1.radius + unit2.radius)){
                    unit1.emit('collision', unit2);
                    unit2.emit('collision', unit1);
                }
            }
        }
    }
}



UnitGroup.prototype.drawPrep = function(){
    // override
};

UnitGroup.prototype.drawFinish = function(){
    // override
};

UnitGroup.prototype.addUnit = function(unit){
    this.units.push(unit);
};

UnitGroup.prototype.removeUnit = function(unit){
    var index = this.units.indexOf(unit);
    if(index !== -1){
        this.units.splice(index, 1);
    }
};

module.exports = UnitGroup;
