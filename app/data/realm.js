'use strict';

import Realm from 'realm';

class Hero {}
Hero.schema = {
  name: 'Hero',
  primaryKey: 'key',
  properties: {
    key: {type: 'string'},
    name:  {type: 'string'},
    faction: {type: 'string'},
    abilities: {type: 'list', objectType: 'Ability'},
    partners: {type: 'list', objectType: 'Hero'}
  }
};

class Ability {}
Ability.schema = {
    name: 'Ability',
    properties: {
        name: {type: 'string'},
        description: {type: 'string'},
    }
}
{/*
function _migration(oldSchema, newSchema) {
    if (oldSchem.schemaVersion == 0) {
        var oldObjects = oldSchema.objects('Person');
        var newObjects = newSchema.objects('Person');

        for (var i = 0; i < oldSchema.length; i++) {
            newSchema[i].imageURL = '';
        }
    }
}
*/}

/**
 *  Returns the root directory for the device.
 *  @return {string}    :   The root directory for the device.
 */
function getDeviceRootDir() {
    let substringEndIdx = Realm.defaultPath.lastIndexOf('/', Realm.defaultPath.lastIndexOf('/') - 1);
    return Realm.defaultPath.substring(0, substringEndIdx);
}

let realmPath = getDeviceRootDir() + "/Library/LocalDatabase/sgs-wiki.realm";
// Export the pre-bundled Realm with support for our objects
export default new Realm({
    readOnly: true,
    path: realmPath,
    schema: [Hero, Ability]
});
