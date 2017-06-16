/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emulationFlow_js__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = registerEmulatePost;
/* harmony export (immutable) */ __webpack_exports__["b"] = runEmulation;
/* harmony export (immutable) */ __webpack_exports__["c"] = createEmulatorIframe;
/* harmony export (immutable) */ __webpack_exports__["e"] = postMessageToIframe;
/* harmony export (immutable) */ __webpack_exports__["d"] = hashCodeIframe;





var inputId = "iframe-url",
    buttonId = "iframe-url-sub",
    emulatorUrl = "emulator.html",
    urlQuery = "projectUrl";


// global variables 
var global = {

};


function registerEmulatePost() {

    var sendButton, input;
    sendButton = document.querySelector("#" + buttonId);
    var input = document.querySelector("#" + inputId);

    if (sendButton) {
        sendButton.addEventListener("click", function () {
            var url = input.value;
            if (isUrl(url)) {
                window.location = window.location.origin + "/" + emulatorUrl + "?" + urlQuery + "=" + url;
            } else {
                // throw "Invalid URL";
                alert("Invalid URL");
            }
        });
    }
}

function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

function runEmulation() {
    global.iframeUrl = getQueryVariable(urlQuery);
    createEmulatorIframe();
}


function createEmulatorIframe() {
    var iframeUrl, iframeEl, iframeWrapper;

    iframeUrl = global.iframeUrl;
    iframeWrapper = document.querySelector("#emulator-window");
    global.iframeEl ? iframeWrapper.removeChild(global.iframeEl) : true; // remove previous iframe if exists
    iframeEl = document.createElement("iframe");
    global.iframeEl = iframeEl;

    iframeEl.width = "640";
    iframeEl.height = "640";
    iframeEl.style.width = "640px;";
    iframeEl.style.height = "640px;";
    iframeEl.scrolling = "no";

    iframeWrapper.appendChild(iframeEl);

    registerPostMessageListener(); // prepare listeneres for new emulation
    iframeEl.src = iframeUrl;
}

function postMessageToIframe(content) {
    global.iframeEl.contentWindow.postMessage(content, "*");
}

function hashCodeIframe() {
    return hashCode(global.iframeEl.src);
}

function hashCode(str) {
    var hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function registerPostMessageListener() {

    global.listener ? window.removeEventListener('message', global.listener) : true;

    global.listener = window.addEventListener('message', function (ev) {
        var data;
        try {
            data = ev.data;
        } catch (err) {
            return;
        }

        if (data.request && typeof Array.isArray(data.request)) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__emulationFlow_js__["b" /* postMessageRequest */])(data.request);
        } else if (data.response && typeof Array.isArray(data.response)) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__emulationFlow_js__["c" /* postMessageResponse */])(data.response);
        }
    });
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__startEmulator_js__ = __webpack_require__(0);
/* unused harmony export runUI */
/* harmony export (immutable) */ __webpack_exports__["a"] = registerRestartButton;
/* unused harmony export switchCapabilitiesPhase */
/* harmony export (immutable) */ __webpack_exports__["b"] = postMessageRequest;
/* harmony export (immutable) */ __webpack_exports__["c"] = postMessageResponse;





var global = {};

function runUI() { }


function registerRestartButton() {
    var restartEl = document.querySelector("#action-restart");
    global.restartButtonListener = restartEl.addEventListener("click", function () {
        switchUIPhase(false);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__startEmulator_js__["c" /* createEmulatorIframe */])();

        switchCapabilitiesPhase("loading", "save-state");
        switchCapabilitiesPhase("loading", "replay");
        switchCapabilitiesPhase("loading", "ghost-mode");

        switchStatusMessagePhase("loading");
    });
}

function switchCapabilitiesPhase(phase, capability) {

    var loadingWrapperEl, activeWrapperEl, disabledWrapperEl;

    loadingWrapperEl = document.querySelector("#" + capability + " .capability-loading-wrapper");
    activeWrapperEl = document.querySelector("#" + capability + " .capability-active-wrapper");
    disabledWrapperEl = document.querySelector("#" + capability + " .capability-not-available-wrapper");

    loadingWrapperEl.style.display = "none";
    activeWrapperEl.style.display = "none";
    disabledWrapperEl.style.display = "none";

    switch (phase) {
        case "loading":
            loadingWrapperEl.style.display = "initial";
            break;
        case "active":
            activeWrapperEl.style.display = "initial";
            break;
        case "disabled":
            disabledWrapperEl.style.display = "initial";
            break;
    }
}

function switchStatusMessagePhase(phase, opt_callback) {
    var continueEl, message, statusMessageEl = document.querySelector("#" + "status-message");

    switch (phase) {
        case "loading":
            message = "Waiting for init method ...";
            statusMessageEl.innerHTML = message;
            break;
        case "setup":
            message = "You may change data in right column now and then select ";
            statusMessageEl.innerHTML = message;
            continueEl = document.createElement("a");
            continueEl.innerText = "continue";
            continueEl.addEventListener("click", opt_callback);
            statusMessageEl.appendChild(continueEl);
            break;
        case "ready":
            message = "";
            statusMessageEl.innerHTML = message;
            break;
    }
}

function feedCapabilityWithData(capability) {
    var textareaEl, localData;

    localData = localStorage.getItem(capability + "-" + global.gameId);
    if (localData !== null) {
        textareaEl = document.querySelector("#" + capability + "-data");
        textareaEl.value = localData;
    }

    localData = localStorage.getItem(capability + "-variant-" + global.gameId);
    if (localData !== null) {
        textareaEl = document.querySelector("#" + capability + "-data-variant");
        textareaEl.value = localData;
    }
}

function newCapabilityData(capability, data) {
    var capabilityWrapperEl, newWrapperEl;

    if (!global.capabilities)
        global.capabilities = {};

    global.capabilities[capability] = data;

    capabilityWrapperEl = document.querySelector("#" + capability + " .new-data-bar");

    // fast remove listeners
    newWrapperEl = capabilityWrapperEl.cloneNode(true);
    newWrapperEl.style.display = "block";
    capabilityWrapperEl.parentNode.replaceChild(newWrapperEl, capabilityWrapperEl);


    newWrapperEl.querySelector(".action-paste").addEventListener("click", function () {
        if (typeof data === "object") {
            document.querySelector("#" + capability + "-data-variant").value = data.variant;
            document.querySelector("#" + capability + "-data").value = data.data;
        } else {
            document.querySelector("#" + capability + "-data").value = data;
        }
    });
    newWrapperEl.querySelector(".action-show").addEventListener("click", function () {
        var tempData = data;
        if (typeof tempData === "object") {
            tempData = "###variant###<br>" + tempData.variant + '<br><br><br><br>' + "###data###<br>" + tempData.data;
        }

        window.open("_blank", capability, "height=500,width=500menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes").document.write(tempData);
    });
    newWrapperEl.querySelector(".action-export").addEventListener("click", function () {
        var tempData = data;
        if (typeof tempData === "object") {
            saveData("###variant###    " + tempData.variant + '   ' + "###data###    " + tempData.data, capability + ".txt");
        } else {
            saveData(tempData, capability + ".txt");
        }

    });

    // $(newWrapperEl).fadeIn();
}

function switchDeleteStatePhase(active) {
    var deleteButtonEl = document.querySelector("#action-delete-save-data");
    active ? deleteButtonEl.style.display = "initial" : deleteButtonEl.style.display = "none";
    deleteButtonEl.removeEventListener("click", global.deleteStateListener);
    if (active) {
        global.deleteStateListener = deleteButtonEl.addEventListener("click", function () {
            var textarea = document.querySelector("#" + "save-state-data");
            textarea.value = '';
        });
    }
}

function switchUIPhase(active) {

    var playButtonEl, replayButtonEl, ghostModeButtonEl, pauseButtonEl, overlayEl, scoreEl;


    pauseButtonEl = document.querySelector("#" + "overlay-pause");
    scoreEl = document.querySelector("." + "overlay-score");
    playButtonEl = document.querySelector("#" + "overlay-play");
    overlayEl = document.querySelector("#" + "overlay");
    replayButtonEl = document.querySelector("#" + "action-play-replay");
    ghostModeButtonEl = document.querySelector("#" + "action-play-ghost-mode");

    if (active) {
        global.gameFlowListeners = {
            pause: pauseButtonEl.addEventListener("click", actionPause),
            play: playButtonEl.addEventListener("click", startAny.bind(null, "start")),
            playGhost: ghostModeButtonEl.addEventListener("click", startAny.bind(null, "startGhost")),
            playReplay: replayButtonEl.addEventListener("click", startAny.bind(null, "startReplay"))
        };

        pauseButtonEl.style.display = "initial";
        scoreEl.style.display = "initial";
        playButtonEl.style.display = "initial";
        replayButtonEl.style.display = "initial";
        ghostModeButtonEl.style.display = "initial";

        scoreEl.style.opacity = "0.2";
        pauseButtonEl.style.opacity = "0.2";

        overlayEl.style.backgroundColor = "rgba(0,0,0,0.8)";

    } else {

        pauseButtonEl.removeEventListener("click", global.gameFlowListeners.pause);
        playButtonEl.removeEventListener("click", global.gameFlowListeners.play);
        ghostModeButtonEl.removeEventListener("click", global.gameFlowListeners.playGhost);
        replayButtonEl.removeEventListener("click", global.gameFlowListeners.playReplay);

        delete global.gameFlowListeners;
        pauseButtonEl.style.display = "none";
        scoreEl.style.display = "none";
        playButtonEl.style.display = "none";
        replayButtonEl.style.display = "none";
        ghostModeButtonEl.style.display = "none";

        overlayEl.style.backgroundColor = "rgba(0,0,0,0.8)";
    }
}

function actionPause() {
    if (global.paused) {
        global.paused = false;
        command("resume");
    } else {
        global.paused = true;
        command("pause");
    }
}

function postMessageRequest(data) {
    var gameId, initContinue,
        waitForSetup = false,
        id = data.messageId,
        method = data.method,
        rData = data.data;

    gameId = global.gameId;

    switch (method) {
        case 'init':
            gameId = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__startEmulator_js__["d" /* hashCodeIframe */])();
            global.gameId = gameId;
            var responseData = {
                saveState: null,
                replayData: null,
                sound: false
            };

            switchCapabilitiesPhase("disabled", "save-state");
            switchCapabilitiesPhase("disabled", "replay");
            switchCapabilitiesPhase("disabled", "ghost-mode");
            switchDeleteStatePhase(false);

            if (rData.capabilities) {
                if (rData.capabilities.saveState) {
                    switchCapabilitiesPhase("active", "save-state");
                    switchDeleteStatePhase(true);
                    feedCapabilityWithData("save-state");
                    waitForSetup = true;
                }
                if (rData.capabilities.replay) {
                    switchCapabilitiesPhase("active", "replay");
                    feedCapabilityWithData("replay");
                    waitForSetup = true;
                }
                if (rData.capabilities.ghostMode) {
                    switchCapabilitiesPhase("active", "ghost-mode");
                    feedCapabilityWithData("ghost-mode");
                    waitForSetup = true;
                }
            }

            initContinue = function () {
                switchStatusMessagePhase("ready");
                if (rData.capabilities) {
                    if (rData.capabilities.saveState) {

                        responseData.saveState = document.querySelector("#" + "save-state" + "-data").value;

                    }
                    if (rData.capabilities.replay) {
                        responseData.replayData = {
                            variant: document.querySelector("#" + "replay" + "-data-variant").value,
                            data: document.querySelector("#" + "replay" + "-data").value
                        }
                        // prepareReplayButton();
                    }
                    if (rData.capabilities.ghostMode) {
                        responseData.replayData = {
                            variant: document.querySelector("#" + "ghost-mode" + "-data-variant").value,
                            data: document.querySelector("#" + "ghost-mode" + "-data").value
                        }
                        // prepareGhostButton();
                    }
                }
                makeResponse(id, responseData);

            }

            if (waitForSetup) {
                switchStatusMessagePhase("setup", initContinue.bind(this));
            } else {
                initContinue();
            }
            break;
        case 'gameReady':
            switchUIPhase(true);

            makeResponse(id);
            break;
        case 'updateScore':
            var newScore = parseInt(rData.score);
            // var scoreEl = rData.ghostSign ? ghostScoreEl : global.gameScoreEl;
            var scoreEl = rData.ghostSign ? document.createElement("span") : global.gameScoreEl;
            if (newScore > scoreEl.value) {
                scoreEl.innerText = newScore;
                scoreEl.value = newScore;
            }
            // makeResponse(id);
            break;
        case 'gameOver':
            if (rData.replayData) {
                // localStorage.setItem("replayData-" + gameId, JSON.stringify(rData.replayData));
                newCapabilityData("replay", rData.replayData);
                newCapabilityData("ghost-mode", rData.replayData);
            }
            switchUIPhase(false);
            switchUIPhase(true);
            // makeResponse(id);
            break;
        case 'saveState':
            newCapabilityData("save-state", rData.state);
            // localStorage.setItem("saveState-" + gameId, rData.state);
            // makeResponse(id);
            break;
        case 'requestSocial':
            var friends = [];
            friends.push({ name: "Entita", avatar: avatar, highScore: 10000 });
            friends.push({ name: "Lukas", avatar: "https://scontent.xx.fbcdn.net/v/t1.0-1/p720x720/10407458_10205512546521851_83732587093950795_n.jpg?oh\\u003d65577f4c957ab0055d09c2379f3eeeb2\\u0026amp;amp;amp;amp;amp;oe\\u003d595C02D2", highScore: 15000 });
            friends.push({ name: "Mirek", avatar: "https://s3.amazonaws.com/gamee-users-devel/photo--494961467.png", highScore: 20000 });
            var responseData = {
                friends: friends
            };
            makeResponse(id, responseData);
            break;
        default:
            alert("Unknown method call: " + method);
            throw "Unknown method call: " + method;
    }
}

function postMessageResponse(data) {

}


function makeResponse(id, data) {
    var data = {
        response: {
            messageId: id,
            data: data
        }
    };

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__startEmulator_js__["e" /* postMessageToIframe */])(data);
}


function startAny(type) {
    var gameScoreEl, playButtonEl, overlayEl, pauseButtonEl, scoreEl;

    pauseButtonEl = document.querySelector("#" + "overlay-pause");
    scoreEl = document.querySelector("." + "overlay-score");
    gameScoreEl = document.querySelector("#" + "score-value");
    playButtonEl = document.querySelector("#" + "overlay-play");
    overlayEl = document.querySelector("#" + "overlay");

    gameScoreEl.value = 0;
    gameScoreEl.innerText = 0;
    global.paused = false;

    global.gameScoreEl = gameScoreEl;

    scoreEl.style.opacity = "1";
    pauseButtonEl.style.opacity = "1";

    overlayEl.style.backgroundColor = "transparent";
    playButtonEl.style.display = "none";

    command(type);
}

function command(type) {
    switch (type) {
        case 'start':
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__startEmulator_js__["e" /* postMessageToIframe */])({
                request: {
                    method: type,
                    messageId: 0,
                    data: {
                        data: {}
                    }
                }
            });
            break;
        case 'startReplay':
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__startEmulator_js__["e" /* postMessageToIframe */])({
                request: {
                    method: 'start',
                    messageId: 0,
                    data: {
                        replay: true
                    }
                }
            });
            break;
        case 'startGhost':
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__startEmulator_js__["e" /* postMessageToIframe */])({
                request: {
                    method: 'start',
                    messageId: 0,
                    data: {
                        ghostMode: true
                    }
                }
            });
            break;
        default:
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__startEmulator_js__["e" /* postMessageToIframe */])({
                request: {
                    method: type,
                    messageId: 0
                }
            });
    }
}

var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var blob = new Blob([data], { type: "octet/stream" }),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__startEmulator_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__emulationFlow_js__ = __webpack_require__(1);
// import {gameeWeb} from './gameeWeb.js';
// import {tools} from './tools.js';




switch (PAGE_ID) {
    case "index":
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__startEmulator_js__["a" /* registerEmulatePost */])();
        break;
    case "emulator":
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__startEmulator_js__["b" /* runEmulation */])();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__emulationFlow_js__["a" /* registerRestartButton */])();
        break;
    case "examples":

        break;
}

/***/ })
/******/ ]);
//# sourceMappingURL=gamee-tools.js.map