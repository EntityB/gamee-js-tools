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
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__startEmulator_js__ = __webpack_require__(4);
// import {gameeWeb} from './gameeWeb.js';
// import {tools} from './tools.js';



switch (PAGE_ID) {
    case "index":
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__startEmulator_js__["a" /* registerEmulatePost */])();
        break;
    case "emulator":
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__startEmulator_js__["b" /* createEmulatorIframe */])();
        break;
    case "examples":

        break;
}

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = registerEmulatePost;
/* harmony export (immutable) */ __webpack_exports__["b"] = createEmulatorIframe;

var inputId = "iframe-url",
    buttonId = "iframe-url-sub",
    emulatorUrl = "emulator.html",
    urlQuery = "projectUrl";

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

function createEmulatorIframe() {
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

/***/ })
/******/ ]);
//# sourceMappingURL=gamee-tools.js.map