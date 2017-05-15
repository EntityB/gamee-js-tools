
var inputId = "iframe-url",
    buttonId = "iframe-url-sub",
    emulatorUrl = "emulator.html";

export function registerEmulatePost() {

    var sendButton, input;
    sendButton = document.querySelector("#" + buttonId);
    var input = document.querySelector("#" + inputId);

    if (sendButton) {
        sendButton.addEventListener("click", function () {
            var url = input.value;
            if (isUrl(url)) {
                window.location = window.location.origin + "/" + emulatorUrl + "?projectUrl=" + url;
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