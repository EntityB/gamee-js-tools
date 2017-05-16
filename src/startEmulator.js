import { postMessageRequest } from './emulationFlow.js';
import { postMessageResponse } from './emulationFlow.js';



var inputId = "iframe-url",
    buttonId = "iframe-url-sub",
    emulatorUrl = "emulator.html",
    urlQuery = "projectUrl";


// global variables 
var global = {

};


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

export function runEmulation() {
    global.iframeUrl = getQueryVariable(urlQuery);
    createEmulatorIframe();
}


export function createEmulatorIframe() {
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

export function postMessageToIframe(content) {
    global.iframeEl.contentWindow.postMessage(content, "*");
}

export function hashCodeIframe() {
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
            postMessageRequest(data.request);
        } else if (data.response && typeof Array.isArray(data.response)) {
            postMessageResponse(data.response);
        }
    });
}