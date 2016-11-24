'use strict';

import Realm from 'realm';
import { Platform } from 'react-native';

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
 *  Returns the files directory for the Android device.
 *  @return {string}    :   The files directory for the device.
 */
function getAndroidFilesDir() {
    let substringEndIdx = Realm.defaultPath.lastIndexOf('/');
    return Realm.defaultPath.substring(0, substringEndIdx);
}

/**
 *  Returns the root directory for the IOS device.
 *  @return {string}    :   The root directory for the device.
 */
function getIOSRootDir() {
    let substringEndIdx = Realm.defaultPath.lastIndexOf('/', Realm.defaultPath.lastIndexOf('/') - 1);
    return Realm.defaultPath.substring(0, substringEndIdx);
}

let realmPath = (Platform.OS === 'ios') ? getIOSRootDir() + "/Library/LocalDatabase/sgswiki.realm" :
                                      getAndroidFilesDir() + "/sgswiki.realm";

//Export the pre-bundled Realm with support for our objects
export default new Realm({
    readOnly: true,
    path: realmPath,
    schema: [Hero, Ability]
});

/*
 * Named export for use with the initialzer. Initialzer will initialzed a new Realm database.
 * with the default name and path of default.realm. Initialized Realm object needs to be
 * manually extracted and put into the repository and the Android / iOS project manifests.
*/
export const initializerRealm = new Realm({
    schema: [Hero, Ability]
});
