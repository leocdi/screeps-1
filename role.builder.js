var roleUpgrader = require('role.upgrader');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
          // find closest constructionSite
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            // if one is found
            if (constructionSite != undefined) {
                // try to build, if the constructionSite is not in range
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    // move towards the constructionSite
                    creep.moveTo(constructionSite);
                }
            }
            // if no constructionSite is found
            else {
                // go upgrading the controller
                roleUpgrader.run(creep);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
                    if(creep.memory.hsource>=0)  // what source do we want (to prevent getting stuck)
        {
           // we are good

        }
        else
        {
            
            creep.memory.hsource=Math.floor(Math.random() * sources.length);
        }
            
        
            if(creep.harvest(sources[creep.memory.hsource]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.hsource],{visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;