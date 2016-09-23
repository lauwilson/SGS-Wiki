'use strict';

import Realm from 'realm';

class Hero {}
Hero.schema = {
  name: 'Hero',
  primaryKey: 'name',
  properties: {
    id: {type: 'int'},
    name:  {type: 'string'},
    health: {type: 'float'},
    faction: {type: 'string'},
    abilities: {type: 'list', objectType: 'Ability'},
    partners: {type: 'Hero', optional: true},
    imageURL: {type: 'string'}
  }
};

class Ability {}
Ability.schema = {
    name: 'Ability',
    properties: {
        id: {type: 'int'},
        hero: {type: 'string'},
        name: {type: 'string'},
        description: {type: 'string'}
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
// Get the default Realm with support for our objects
console.log(Realm.defaultPath);
export default new Realm({schema: [Hero, Ability]});
