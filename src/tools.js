(function () {
    var oldHash;
    var pages = document.querySelectorAll(".main");

    window.addEventListener("hashchange", linkRedirect, false);

    function linkRedirect() {

        pages.forEach(function (page) {
            page.style.display = "none";
        });

        var pageToShowId = window.location.hash.slice(1) + "-page";
        var pageToShow = document.getElementById(pageToShowId) || document.getElementById("dashboard-page");
        pageToShow.style.display = "block";
    }

    linkRedirect();
})();

$('#iframe-url-sub').on('click', function () {
    var url = $('#iframe-url').val();
    setProjectPreview("Remote project", url);
    window.location.hash = "#project";
});


export function setProjectPreview(projectName, url) {
    prepareIframeForGamePreview(projectName, url);
}


export function prepareIframeForGamePreview(projectName, url) {
    var link = "/projects/" + projectName;
    if (url)
        link = url;

    var wrapper = document.getElementById("game-wrapper");
    wrapper.innerHTML = "";

    var iframe = document.createElement("iframe");

    gameeWeb.init(iframe);

    iframe.src = link;
    iframe.frameBorder = 0;
    iframe.width = 640;
    iframe.height = 640;
    wrapper.appendChild(iframe);
}
