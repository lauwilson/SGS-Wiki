'use strict';
import { Platform } from 'react-native';

export const HEADER_HEIGHT = (Platform.OS === 'ios') ? 64 : 54;

export const CARD_ASPECT_RATIO = 320 / 225;
