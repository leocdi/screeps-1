var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //console.log(creep.name +' : '+creep.carry.energy);
        if((creep.memory.upgrading && creep.carry.energy == 0) || (creep.memory.upgrading == undefined)){
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('🚧 upgrade');
        }

         if(!creep.memory.upgrading) {
  
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
                creep.moveTo(sources[creep.memory.hsource]);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = roleUpgrader;