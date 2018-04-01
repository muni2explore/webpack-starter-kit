window.SmartModal = (function (SmartModal){

    function createToolbarItems(itemElements){
        var items = [];
        [].forEach.call(itemElements, function(el, index){
            //console.log(el, index );
            var item = {
                element: el,
                enable: function(){
                    el.classList.remove("disabled");
                },
                disable: function(){
                    el.classList.add("disabled");
                },
                isDisabled: function(){
                    return el.classList.contains("disabled");
                },
                activate: function(){
                    if (this.isDisabled()){
                        return;
                    }
                    el.classList.add("active");
                },
                deactivate: function() {
                    if (this.isDisabled()) {
                        return;
                    }
                    el.classList.remove("active");
                },
                isActive: function(){
                    return el.classList.contains("active");
                },
                toggleActiveState: function(){
                    if (this.isActive()){
                        this.deactivate();
                    } else {
                        this.activate();
                    }
                }

            };
            items.push(item);
        });
        return items;
    }
    
    SmartModal.init = function(elementId){
        var toolbar, items;

        console.log('Smart App Initialized Successfully..:-) ');
        toolbar = document.getElementById(elementId);
        if (toolbar === null) {
            console.error("Toolbar not found");
            return false;
        }
        items = toolbar.querySelectorAll(".item");
        // /console.log(items);
        
        return {
            items: createToolbarItems(items)
        };
    };

    return SmartModal;
})(window.SmartModal || {});

var domReady = function (callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function () {
    //SmartModal.init("toolbar");
});