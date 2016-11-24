'use strict';

import { AppRegistry } from 'react-native';
import SgsWiki from './app/SgsWiki.js';

/*
    Bootstrap the realm database construction into the app itself. Since the database
    is pre-populated and will be bundled with the app, this code should never be run
    as part of the normal operating workflow.
*/
// import  { initializeData } from './app/data/initializer.js';
// initializeData();

AppRegistry.registerComponent('SgsWiki', () => SgsWiki );
