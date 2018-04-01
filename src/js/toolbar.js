window.SmartModal = (function (SmartModal) {
    var ToolbarItem = function (el){
        Object.defineProperty(this, '_el', {
            value: el
        });
    };

    Object.defineProperties(ToolbarItem.prototype,{
        toggleActiveState: {
            value: function () {
                this.activated = !this.activated;
            },
            enumerable: true
        },
        enabled: {
            get: function () {
                return !this._el.classList.contains("disabled");
            },
            set: function (value) {
                if (value) {
                    this._el.classList.remove("disabled");
                } else {
                    this._el.classList.add("disabled");
                }
            }
        },
        activated: {
            get: function () {
                return this._el.classList.contains("active");
            },
            set: function (value) {
                if (value) {
                    this._el.classList.add('active');
                } else {
                    this._el.classList.remove('active');
                }
            }
        }
    });


    function createToolbarItems(elementItems) {
        var items = [];

        [].forEach.call(elementItems, function (el, index, array) {
            items.push(new ToolbarItem(el));
        });
        return items;
    }

    var Toolbar = function(toolbarElement){
        var items = toolbarElement.querySelectorAll(".item");

        Object.defineProperties(this, {
            element: {
                value: toolbarElement
            },
            items: {
                value: createToolbarItems(items),
                enumerable: true
            }
        });

    };

    Object.defineProperties(Toolbar.prototype, {
        add: {
            value: function () {
                var _el = document.createElement("div");
                _el.className = "item";
                this.element.appendChild(_el);
                var item = new ToolbarItem(_el);
                this.items.push(item);
            },
            enumerable: true
        },
        remove: {
            value: function (index) {
                var len = this.items.length;

                if (index > len || index < 0) {
                    throw new Error("Index is out of range");
                }

                var item = this.items[index];
                this.items.splice(index, 1);
                this.element.removeChild(item._el);
                item = null;
            },
            enumerable: true
        },
        appendTo: {
            value: function (parentElement) {
                parentElement.appendChild(this.element);
            },
            enumerable: true
        }
    });


    SmartModal.createToolbar = function (elementId) {
        var toolbar, items, element;

        element = document.getElementById(elementId);
        if (element === null) {
            element = document.createElement("div");
            element.id = elementId;
            element.className = "toolbar";
        }

        return new Toolbar(element);
    };
    return SmartModal;
}) (window.SmartModal || {});