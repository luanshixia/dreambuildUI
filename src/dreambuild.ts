/// <reference path="jquery.d.ts" />

/**
 * dreambuild.js
 */

module dreambuild {
    "use strict";

    export class WidgetFactory {
        $element: JQuery;

        constructor($element: JQuery) {
            this.$element = $element;
        }

        static register(alias: string, widgetClass: any) {
            WidgetFactory.prototype[alias] = function (options?: any) {
                return new widgetClass(this.$element, options);
            };
            $.dreambuild.defineTag(alias, alias);
        }

        widget(): Widget {
            return this.$element.data("widget");
        }
    }

    export class Widget {
        $element: JQuery;
        options: WidgetOptions;

        constructor($element: JQuery, options?: any) {
            this.$element = $element;
            this.options = new WidgetOptions();
            $.extend(this.options, options);
            this._create();
            this._init();
            this.$element.data("widget", this);
        }

        destroy() {
            this._destroy();
        }

        setOption(key: string, value: any) {
            this.options[key] = value;
            this._init();
        }

        setOptions(options: any) {
            $.extend(this.options, options);
            this._init();
        }

        option(key: string): any {
            return this.options[key];
        }

        _create() {
        }

        _init() {
        }

        _destroy() {
        }

        _trigger(type: string, event: Event, data: any) {
            var o = this.options;
            o[type] && o[type](event, data);
        }
    }

    export class WidgetOptions {
        disabled: boolean = false;
        width: number = 0;
        height: number = 0;
    }

    export var WidgetCSS = {
        jQueryUI: {
            widget: "ui-widget",
            overlay: "ui-widget-overlay",
            content: "ui-widget-content",
            header: "ui-widget-header",
            stateDisabled: "ui-state-disabled",
            stateFocus: "ui-state-focus",
            stateActive: "ui-state-active",
            stateDefault: "ui-state-default",
            stateHighlight: "ui-state-highlight",
            stateHover: "ui-state-hover",
            stateChecked: "ui-state-checked",
            stateError: "ui-state-error",
            icon: "ui-icon",
            iconCheck: "ui-icon-check",
            iconRadioOn: "ui-icon-radio-on",
            iconRadioOff: "ui-icon-radio-off",
            iconClose: "ui-icon-close",
            iconArrow4Diag: "ui-icon-arrow-4-diag",
            iconNewWin: "ui-icon-newwin",
            iconVGripSolid: "ui-icon-grip-solid-vertical",
            iconHGripSolid: "ui-icon-grip-solid-horizontal",
            iconPlay: "ui-icon-play",
            iconPause: "ui-icon-pause",
            iconStop: "ui-icon-stop",
            iconArrowUp: "ui-icon-triangle-1-n",
            iconArrowRight: "ui-icon-triangle-1-e",
            iconArrowDown: "ui-icon-triangle-1-s",
            iconArrowLeft: "ui-icon-triangle-1-w",
            iconArrowRightDown: "ui-icon-triangle-1-se",
            iconArrowThickDown: "ui-icon-arrowthick-1-s glyphicon glyphicon-arrow-down",
            iconArrowThickUp: "ui-icon-arrowthick-1-n glyphicon glyphicon-arrow-up",
            iconCaratUp: "ui-icon-carat-1-n",
            iconCaratRight: "ui-icon-carat-1-e",
            iconCaratDown: "ui-icon-carat-1-s",
            iconCaratLeft: "ui-icon-carat-1-w",
            iconClock: "ui-icon-clock glyphicon glyphicon-time",
            iconPencil: "ui-icon-pencil glyphicon glyphicon-pencil",
            iconSeekFirst: "ui-icon-seek-first",
            iconSeekEnd: "ui-icon-seek-end",
            iconSeekNext: "ui-icon-seek-next",
            iconSeekPrev: "ui-icon-seek-prev",
            iconPrint: "ui-icon-print",
            iconDisk: "ui-icon-disk",
            iconSeekStart: "ui-icon-seek-start",
            iconFullScreen: "ui-icon-newwin",
            iconContinousView: "ui-icon-carat-2-n-s",
            iconZoomIn: "ui-icon-zoomin",
            iconZoomOut: "ui-icon-zoomout",
            iconBookmark: "ui-icon-bookmark",
            iconSearch: "ui-icon-search",
            iconImage: "ui-icon-image",
            inputSpinnerLeft: "ui-input-spinner-left",
            inputSpinnerRight: "ui-input-spinner-right",
            inputTriggerLeft: "ui-input-trigger-left",
            inputTriggerRight: "ui-input-trigger-right",
            inputSpinnerTriggerLeft: "ui-input-spinner-trigger-left",
            inputSpinnerTriggerRight: "ui-input-spinner-trigger-right",
            cornerAll: "ui-corner-all",
            cornerLeft: "ui-corner-left",
            cornerRight: "ui-corner-right",
            cornerBottom: "ui-corner-bottom",
            cornerBL: "ui-corner-bl",
            cornerBR: "ui-corner-br",
            cornerTop: "ui-corner-top",
            cornerTL: "ui-corner-tl",
            cornerTR: "ui-corner-tr",
            helperClearFix: "ui-helper-clearfix",
            helperReset: "ui-helper-reset",
            helperHidden: "ui-helper-hidden",
            priorityPrimary: "ui-priority-primary",
            prioritySecondary: "ui-priority-secondary",
            button: "ui-button",
            buttonText: "ui-button-text",
            buttonTextOnly: "ui-button-text-only",
            tabs: "ui-tabs",
            tabsTop: "ui-tabs-top",
            tabsBottom: "ui-tabs-bottom",
            tabsLeft: "ui-tabs-left",
            tabsRight: "ui-tabs-right",
            tabsLoading: "ui-tabs-loading",
            tabsActive: "ui-tabs-active",
            tabsPanel: "ui-tabs-panel",
            tabsNav: "ui-tabs-nav",
            tabsHide: "ui-tabs-hide",
            tabsCollapsible: "ui-tabs-collapsible"
        },
        bootstrap: {
        }
    }
}

jQuery.fn.extend({
    getAttributes: function () {
        var attributes = {};
        if (this.length) {
            $.each(this[0].attributes, function (index, attr) {
                attributes[attr.name] = attr.value;
            });
        }
        return attributes;
    },
    dreambuild: function () {
        return new dreambuild.WidgetFactory(this);
    }
});

jQuery.extend({
    dreambuild: {
        tags: {},
        defineTag: function (tagName: string, widgetName: string) {
            this.tags[tagName] = widgetName;
        }
    }
});

interface JQuery {
    getAttributes(): any;
    dreambuild(): dreambuild.WidgetFactory;
}

interface JQueryStatic {
    dreambuild: any;
}

$(function () {
    $.each($.dreambuild.tags, function (index, tag) {
        var $element = $(tag),
            widgetName = $.dreambuild.tags[tag],
            options = $element.getAttributes();
        $element.dreambuild()[widgetName](options);
    });
});