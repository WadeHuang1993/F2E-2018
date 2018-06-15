(function (document, window) {

    var registeredElement = [];

    var Component = function (options) {
        return Component.init(options);
    };

    register = function (tag, customElementProto) {
        if ('undefined' != typeof(registeredElement[tag])) {
            customElement = registeredElement[tag];
            customElement.prototype.options = customElementProto.options;

            return customElement;
        }

        customElement = document.registerElement(tag, {prototype: customElementProto});

        registeredElement[tag] = customElement;
        return customElement;
    };

    /**
     * 建構自定義元件
     *
     * @param options
     * @returns {*}
     */
    Component.init = function (options) {
        var customElementProto = Object.create(HTMLElement.prototype);

        var template = document.querySelector(options.template);

        customElementProto.options = options;

        customElementProto.createdCallback = function () {
            var cloneTemplate = document.importNode(template.content, true);
            this.shadowRoot = this.createShadowRoot({mode: 'open'});
            this.shadowRoot.appendChild(cloneTemplate);

            var taskTitle = this.shadowRoot.querySelector('.task-title');
            taskTitle.innerHTML = this.options.data.title;
        };

        customElement = register(options.tag, customElementProto);

        return new customElement;
    };

    window.Component = Component;

})(document, window);