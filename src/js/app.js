var SmartAppController = (function(){
    var app = {};

    app.init = function(){
        console.log('Smart App Initialized Successfully..:-) ');
    };

    return app;
})();

var domReady = function (callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function () {
    SmartAppController.init();
});