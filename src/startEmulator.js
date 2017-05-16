
var inputId = "iframe-url",
    buttonId = "iframe-url-sub",
    emulatorUrl = "emulator.html",
    urlQuery = "projectUrl";

export function registerEmulatePost() {

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

export function createEmulatorIframe() {
    var iframeUrl, iframeEl, iframeWrapper;

    iframeUrl = getQueryVariable(urlQuery);
    iframeWrapper = document.querySelector("#emulator-window");
    iframeEl = document.createElement("iframe");

    iframeEl.width = "640";
    iframeEl.height = "640";
    iframeEl.style.width = "640px;";
    iframeEl.style.height = "640px;";
    iframeEl.scrolling = "no";
    
    iframeWrapper.appendChild(iframeEl);
    iframeEl.src = iframeUrl;
}