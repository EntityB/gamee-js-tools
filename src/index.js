// import {gameeWeb} from './gameeWeb.js';
// import {tools} from './tools.js';
import { registerEmulatePost } from './startEmulator.js';
import { runEmulation } from './startEmulator.js';
import { registerRestartButton } from './emulationFlow.js';

switch (PAGE_ID) {
    case "index":
        registerEmulatePost();
        break;
    case "emulator":
        runEmulation();
        registerRestartButton();
        break;
    case "examples":

        break;
}