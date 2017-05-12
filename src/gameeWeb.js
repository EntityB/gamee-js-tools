export var gameeWeb = (function () {

    var hashCode = function (str) {
        var hash = 0, i, chr;
        if (str.length === 0) return hash;
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    //select the iframe containing the message receiver remote script
    var remoteframe;
    var gameId;
    var gameScoreEl;
    var ghostScoreEl;
    var ctrlWrapperEl = document.getElementById("controlls-wrapper");
    var ctrl = ctrlWrapperEl.innerHTML;

    function sendMessage() {

        var method = document.getElementById("requestmethod").value;
        var data = document.getElementById("requestdata").value;

        // data = JSON.stringify(data);

        postMessageToIframe({
            request: {
                method: method,
                messageId: 0,
                data: data
            }
        });
    }

    function postMessageToIframe(content) {
        remoteframe.contentWindow.postMessage(content, "*");
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

    window.addEventListener('message', function (ev) {
        var data;
        try {
            data = ev.data;
        } catch (err) {
            return;
        }

        if (data.request && typeof Array.isArray(data.request)) {
            postMessageRequest(data.request);
        } else if (data.response && typeof Array.isArray(data.response)) {
            postMessageResponse(data.response);
        }
    });

    var avatar = "data:image/gif;base64,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";
    function postMessageRequest(data) {
        var id = data.messageId,
            method = data.method,
            rData = data.data;

        switch (method) {
            case 'init':
            gameId = hashCode(remoteframe.src);
                var responseData = {
                    saveState: null,
                    replayData: null,
                    sound: false
                };
                if (rData.capabilities) {
                    if (rData.capabilities.saveState) {
                        if (localStorage.getItem("saveState-" + gameId) !== null)
                            responseData.saveState = localStorage.getItem("saveState-" + gameId);
                    }
                    if (rData.capabilities.replay) {
                        if (localStorage.getItem("replayData-" + gameId) !== null) {
                            responseData.replayData = JSON.parse(localStorage.getItem("replayData-" + gameId));
                            prepareReplayButton();
                        }
                    }
                    if (rData.capabilities.ghostMode) {
                        if (localStorage.getItem("replayData-" + gameId) !== null) {
                            responseData.replayData = JSON.parse(localStorage.getItem("replayData-" + gameId));
                            prepareGhostButton();
                        }
                    }
                }
                response(id, responseData);
                break;
            case 'gameReady':
                // response(id);
                var startButton = document.createElement("button");
                startButton.addEventListener("click", function () {
                    gameScoreEl.value = 0;
                    command('start');
                });
                startButton.innerHTML = "Start";
                document.getElementById("controlls").appendChild(startButton);
                break;
            case 'updateScore':
                var newScore = parseInt(rData.score);
                var scoreEl = rData.ghostSign ? ghostScoreEl : gameScoreEl;
                if (newScore > scoreEl.value)
                    scoreEl.value = newScore;
                // response(id);
                break;
            case 'gameOver':
                if (rData.replayData) {
                    localStorage.setItem("replayData-" + gameId, JSON.stringify(rData.replayData));
                }
                // response(id);
                break;
            case 'saveState':
                localStorage.setItem("saveState-" + gameId, rData.state);
                // response(id);
                break;
            case 'requestSocial':
                var friends = [];
                friends.push({ name: "Entita", avatar: avatar, highScore: 10000 });
                friends.push({ name: "Lukas", avatar: "https://scontent.xx.fbcdn.net/v/t1.0-1/p720x720/10407458_10205512546521851_83732587093950795_n.jpg?oh\\u003d65577f4c957ab0055d09c2379f3eeeb2\\u0026amp;amp;amp;amp;amp;oe\\u003d595C02D2", highScore: 15000 });
                friends.push({ name: "Mirek", avatar: "https://s3.amazonaws.com/gamee-users-devel/photo--494961467.png", highScore: 20000 });
                var responseData = {
                    friends: friends
                };
                response(id, responseData);
                break;
            default:
                throw "Unknown method call";
        }
    }

    function postMessageResponse(data) {
        // console.log("callback: " + data);
    }

    function response(id, data) {
        var data = {
            response: {
                messageId: id,
                data: data
            }
        };

        postMessageToIframe(data);
    }

    function prepareReplayButton() {
        var replayEl = document.createElement("button");
        replayEl.innerHTML = "Replay";
        replayEl.addEventListener("click", function () {
            gameScoreEl.value = 0;
            command('startReplay');
        });

        document.getElementById("controlls").appendChild(replayEl);
    }

    function prepareGhostButton() {
        var ghostEl = document.createElement("button");
        ghostEl.innerHTML = "Ghost mode";
        ghostEl.addEventListener("click", function () {
            gameScoreEl.value = 0;
            command('startGhost');
        });

        ghostScoreEl = document.createElement("input");
        ghostScoreEl.disabled = true;

        var label = document.createElement("label");
        label.innerHTML = "Ghost score";
        document.getElementById("controlls").appendChild(ghostEl);
        document.getElementById("controlls").appendChild(label);
        document.getElementById("controlls").appendChild(ghostScoreEl);
    }

    function initalizeControlls() {
        ctrlWrapperEl.innerHTML = "";
        ctrlWrapperEl.innerHTML = ctrl;

        gameScoreEl = document.getElementById("game-score");
    }

    return {
        init: function (iframe) {
            remoteframe = iframe;
            initalizeControlls();
        },
        command: command,
        sendMessage: sendMessage
    }
})();