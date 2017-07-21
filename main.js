var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

var counts = {
	'harvester': 5,
	'upgrader': 3,
	'builder': 3,
	'repairer': 1
};

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');

	for (var name in counts) {
	   
		var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == name);
		if (creeps.length >= counts[name]) {
			continue;
		}
		
		if (Game.spawns.Spawn1.energy >250)
		{
        var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE, MOVE], undefined, {role: name});
        console.log('Spawning new big ' + name + ': ' + newName);
		}
		else
		{
		    if (_(Game.creeps).size()<7){
		           console.log('count:', _(Game.creeps).size(), '<9');
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY, MOVE], undefined, {role: name});
        console.log('Spawning new ' + name + ': ' + newName);
		        
		    }
		}
		
	}

    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }

}