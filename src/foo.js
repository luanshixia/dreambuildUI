/// <reference path="dreambuild.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* foo.js
*/
var dreambuild;
(function (dreambuild) {
    "use strict";

    var Foo = (function (_super) {
        __extends(Foo, _super);
        function Foo($element, options) {
            var o = new FooOptions();
            $.extend(o, options);
            _super.call(this, $element, o);
        }
        Foo.prototype._create = function () {
            var o = this.options;
            this.$element.html(o.text);
        };
        return Foo;
    })(dreambuild.Widget);
    dreambuild.Foo = Foo;

    var FooOptions = (function (_super) {
        __extends(FooOptions, _super);
        function FooOptions() {
            _super.apply(this, arguments);
            this.text = "Hello, Foo!";
        }
        return FooOptions;
    })(dreambuild.WidgetOptions);
    dreambuild.FooOptions = FooOptions;

    dreambuild.WidgetFactory.register("foo", Foo);
})(dreambuild || (dreambuild = {}));
