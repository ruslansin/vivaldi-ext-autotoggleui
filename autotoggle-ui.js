// Autohide UI

vivaldi.jdhooks.onUIReady(function () {
    var uiActions = vivaldi.jdhooks.require('_UIActions');

    var header = document.getElementById("header");
    var body = document.getElementsByTagName("body")[0];
    var footer = document.getElementById("footer");
    var webview = document.getElementById("webview-container");

    var size = {
        body: 0
    }

    var isAddressVisible = !document.getElementsByClassName("address-off").length;
    var isFooterVisible = !footer.classList.contains("disabled");

    if (!isFooterVisible)
        uiActions.toggleFooter();
    if (!isAddressVisible)
        uiActions.toggleAddressBar();

    var isVisible = isAddressVisible;

    function toggleUI() {
        uiActions.toggleUI();
        isVisible = !isVisible;
    }

    webview.addEventListener("mouseover", function () {
        webview.over = true;
        window.setTimeout(function () {
            if (isVisible && webview.over) {
                toggleUI();
            }
        }, 1000);
    });
    webview.addEventListener("mouseout", function () {
        webview.over = false;
    });
    body.addEventListener("mousemove", function (e) {
        var y = e.clientY;

        if ((y <= header.clientHeight + 8 && !isVisible) 
            || (y >= body.clientHeight - 8 && !isVisible))
            toggleUI();
    });

    toggleUI();
});