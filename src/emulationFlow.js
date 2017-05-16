import { createEmulatorIframe } from './startEmulator.js';
import { postMessageToIframe } from './startEmulator.js';
import { hashCodeIframe } from './startEmulator.js';


var global = {};

export function runUI() { }


export function registerRestartButton() {
    var restartEl = document.querySelector("#action-restart");
    global.restartButtonListener = restartEl.addEventListener("click", function () {
        switchUIPhase(false);
        createEmulatorIframe();

        switchCapabilitiesPhase("loading", "save-state");
        switchCapabilitiesPhase("loading", "replay");
        switchCapabilitiesPhase("loading", "ghost-mode");

        switchStatusMessagePhase("loading");
    });
}

export function switchCapabilitiesPhase(phase, capability) {

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
            message = "Waiting for game to send init method";
            statusMessageEl.innerHTML = message;
            break;
        case "setup":
            message = "Now you can change data on your right side and then click ";
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
            tempData = JSON.stringify(tempData);
        }

        window.open("_blank", capability, "height=500,width=500menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes").document.write(tempData);
    });
    newWrapperEl.querySelector(".action-export").addEventListener("click", function () {
        var tempData = data;
        if (typeof tempData === "object") {
            saveData(tempData.variant + "\n\n\n\n" + tempData.data, capability + ".txt");
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

export function postMessageRequest(data) {
    var gameId, initContinue,
        waitForSetup = false,
        id = data.messageId,
        method = data.method,
        rData = data.data;

    gameId = global.gameId;

    switch (method) {
        case 'init':
            gameId = hashCodeIframe();
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

export function postMessageResponse(data) {

}


function makeResponse(id, data) {
    var data = {
        response: {
            messageId: id,
            data: data
        }
    };

    postMessageToIframe(data);
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
            postMessageToIframe({
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
            postMessageToIframe({
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
            postMessageToIframe({
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
            postMessageToIframe({
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
        var blob = new Blob([data], { type: "text/plain;charset=utf-8" }),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());