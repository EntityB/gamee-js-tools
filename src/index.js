// import {gameeWeb} from './gameeWeb.js';
// import {tools} from './tools.js';
import { registerEmulatePost } from './startEmulator.js';
import { createEmulatorIframe } from './startEmulator.js';

switch (PAGE_ID) {
    case "index":
        registerEmulatePost();
        break;
    case "emulator":
        createEmulatorIframe();
        break;
    case "examples":

        break;
}