/// <reference path="dreambuild.ts" />

/**
 * foo.js
 */

module dreambuild {
    "use strict";

    export class Foo extends Widget {
        options: FooOptions;

        constructor($element: JQuery, options?: any) {
            var o = new FooOptions();
            $.extend(o, options);
            super($element, o);
        }

        _create() {
            var o = this.options;
            this.$element.html(o.text);
        }
    }

    export class FooOptions extends WidgetOptions {
        text = "Hello, Foo!";
    }

    WidgetFactory.register("foo", Foo);
}