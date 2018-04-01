window.SmartModal = (function (SmartModal){

    function createToolbarItem(el){
        var item = {
            toggleActiveState: function () {
                this.activated = !this.activated;
            }
        };

        Object.defineProperties(item, {
            el: {
                value: el
            },
            enabled: {
                get: function () {
                    return !el.classList.contains("disabled");
                },
                set: function (value) {
                    if (value) {
                        el.classList.remove("disabled");
                    } else {
                        el.classList.add("disabled");
                    }
                }
            },
            activated: {
                get: function () {
                    return el.classList.contains("active");
                },
                set: function (value) {
                    if (value) {
                        el.classList.add('active');
                    } else {
                        el.classList.remove('active');
                    }
                }
            }
        });

        return item;
    }

    function createToolbarItems(elementItems) {
        var items = [];

        [].forEach.call(elementItems, function(el,index, array){
            items.push(createToolbarItem(el));
        });
        return items;
    }

    SmartModal.createToolbar = function(elementId) {
        var toolbar, items, element;

        element = document.getElementById(elementId);
        if (element === null) {
            element = document.createElement("div");
            element.id = elementId;
            element.className = "toolbar";
        }
        items = element.querySelectorAll(".item");
        toolbar = {
            add: function(){
                var el = document.createElement("div");
                el.className = "item";
                element.appendChild(el);
                var item = createToolbarItem(el);
                this.items.push(item);
            },
            remove: function(index){
                var len = this.items.length;

                if(index>len || index < 0){
                    throw new Error("Index is out of range");
                }

                var item = this.items[index];
                this.items.splice(index, 1);
                element.removeChild(item.el);
                item = null;
            },
            appendTo: function(parentElement){
                parentElement.appendChild(element);
            }
        };

        Object.defineProperties(toolbar, {
            el: {
                value: element
            },
            items: {
                value: createToolbarItems(items),
                enumerable: true
            }
        });

        return toolbar;
    };
    return SmartModal;
})(window.SmartModal || {});