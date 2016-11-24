'use strict';

import { initializerRealm } from './realm.js';
import _ from 'lodash';

/**
 *  Generates a hero key from the given string which represents a hero's partner.
 *  @param {string} partner :   This is a string which a key can be parsed from.
 *                              e.g. e.g. Gan Fu Ren (Lady Gan) 甘夫人
 *
 *  @return {string}        :   The key to access the given hero in the Realm database.
 *                              e.g. gan-fu-ren-lady-gan
 */
function generateKeyFromPartnerString(partner) {
    // define the min and max unicode range for Chinese characters.
    let MIN_CJK_UNICODE = parseInt("0x4E00",16);
    let MAX_CJK_UNICODE = parseInt("0x9FFF",16);
    let substringEndIdx;

    for (var i = 0; i < partner.length; i++) {
        let charHexCode = partner.charCodeAt(i);
        if ((charHexCode >= MIN_CJK_UNICODE && charHexCode <= MAX_CJK_UNICODE) ||
                (partner[i] == '(' && partner.substring(i+1, i+5) != "Lady")) {
            substringEndIdx = i;
            break;
        }
    }
    let partnerKey = partner.substring(0, substringEndIdx)
                            .trim()
                            // replace '(', ')', and '&amp;' with ''
                            .replace(/\(|\)|&amp;/g, '')
                            // replace '  ' artifact from previous replacement
                            .replace(/  /g, ' ')
                            .toLowerCase()
                            .replace(/ /g, '-')
    return partnerKey;
}

/**
 *  Retrieves the Hero object from the Realm database, given a partner string.
 *  Function will internally convert the partner string into a partner key before
 *  Realm lookup.
 *  @param {string} partner :   This is a string which represents a Hero name.
 *                              e.g. e.g. Gan Fu Ren (Lady Gan) 甘夫人
 *
 *  @return {Hero}        :   The Hero object retrieved from the Realm database.
 */
function getHeroFromPartnerString(partner) {
    var heroKey = generateKeyFromPartnerString(partner);
    var hero = initializerRealm.objects('Hero').filtered('key == $0', heroKey)
    return hero[0];
}
/**
 *  Populates the Realm database with the requisite data.
 *
 *  Note: Requires the file './heroes.json' to exist in the same directory.
 *        Currently, function does not perform error checking and will catastrophically
 *        fail if the above requirement is not met.
 *
 *  Note 2: The initializer used will initialize the data into a default.realm file with non-readonly
 *          file permissions. The initialized realm object currently needs to be manually copied
 *          out into the repo and into the project manifests for android / iOS.
 */
export function initializeData() {
    initializerRealm.write(() => {
        initializerRealm.deleteAll();
    })

    var heroes = require('./heroes.json');

    let numHeroes = heroes.length;
    for (var i = 0; i < numHeroes; i++) {
        let hero = heroes[i];

        initializerRealm.write(() => {
            initializerRealm.create('Hero', {
                key: hero['key'],
                name: hero['name'],
                faction: hero['faction'],
                abilities: hero['abilities']
            });
        });
    }

    for (var i = 0; i < numHeroes; i++) {
        let hero = heroes[i];

        let partnerList;
        if (hero['partners'].length < 1 ||
                hero['partners'][0].substring(0, 3).toUpperCase() == 'NIL') {
            partnerList = null;
        } else {
            partnerList = _.map(hero['partners'], getHeroFromPartnerString);
        }

        initializerRealm.write(() => {
            initializerRealm.create('Hero', {
                key: hero['key'],
                partners: partnerList
            }, true);
        });
    }
    initializerRealm.close();
}
