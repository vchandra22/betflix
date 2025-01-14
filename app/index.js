import { registerRootComponent } from 'expo';
import "../global.css";

import _layout from './_layout';

// registerRootComponent calls AppRegistry.registerComponent('main', () => _layout);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(_layout);