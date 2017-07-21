var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var sources =   creep.room.find(FIND_SOURCES); //creep.pos.findInRange(FIND_SOURCES);

        if(creep.carry.energy < creep.carryCapacity)
        {


            if(creep.memory.hsource>=0)  // what source do we want (to prevent getting stuck)
            {
                // we are good
            //console.log('we are good');
            }
            else
            {
                creep.memory.hsource=Math.floor(Math.random() * sources.length);
                console.log('transfer target prob or done');
            }


            if(creep.harvest(sources[creep.memory.hsource]) == ERR_NOT_IN_RANGE) {   // this was sources[0]
                creep.moveTo(sources[creep.memory.hsource], {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.say("h h "+ creep.memory.hsource);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
        });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    creep.say("h t");
                }
                else
                {
                    console.log('transfer target prob or done');   // it is not getting here
                    creep.memory.hsource=Math.floor(Math.random() * sources.length);  // pick a new random source
                }
            }
        }
    }
};

module.exports = roleHarvester;

