'use strict';

import realm from './realm.js';

export default function initializeDummyData() {
    realm.write(() => {
        realm.deleteAll();

        // Liu Bei
        realm.create('Ability', { id: 1, hero: 'Liu Bei', name: 'Benevolence', description: 'During your action phase, you can give any number of on-hand cards to any other player. If you give three or more on-hand cards away in a single phase, you regain 1 unit of health.'});
        realm.create('Hero', {
            id: 1,
            name: 'Liu Bei',
            health: 2,
            faction: 'Shu',
            abilities: realm.objects('Ability').filtered('hero = "Liu Bei"'),
            imageKey: 'liubei'
        });

        // Cao Cao
        realm.create('Ability', { id: 2, hero: 'Cao Cao', name: 'Villainous Hero', description: 'Every instance after you suffer damage, you can acquire the card that inflicted damage on you.'});
        realm.create('Hero', {
            id: 2,
            name: 'Cao Cao',
            health: 2,
            faction: 'Wei',
            abilities: realm.objects('Ability').filtered('hero = "Cao Cao"'),
            imageKey: 'caocao'
        })

        // Sun Quan
        realm.create('Ability', { id: 3, hero: 'Sun Quan', name: 'Balance of Power', description: 'During your action phase, you can discard up to X cards (X being your maximum health units), then draw the same number of cards. Limited to once per phase.'});
        realm.create('Hero', {
            id: 3,
            name: 'Sun Quan',
            health: 2,
            faction: 'Wu',
            abilities: realm.objects('Ability').filtered('hero = "Sun Quan"'),
            imageKey: 'sunquan'
        })

        realm.create('Ability', { id: 4, hero: 'Zhang Jiao', name: 'Lightning Strike', description: 'Whenever you use or play a DODGE 闪, you can select another player to make a judgement. If the result is the suit of spades, you inflict 2 units of lightning damage to that player.'});
        realm.create('Ability', { id: 5, hero: 'Zhang Jiao', name: 'Dark Sorcery', description: 'Before the judgement card of a player takes effect, you can interchange that judgement card with a black-suited card.'});
        realm.create('Hero', {
            id: 3,
            name: 'Zhang Jiao',
            health: 2,
            faction: 'Legend',
            abilities: realm.objects('Ability').filtered('hero = "Zhang Jiao"'),
            imageKey: 'zhangjiao'
        })
    });
}
