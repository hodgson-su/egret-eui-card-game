var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var euiKsin = (function (_super) {
    __extends(euiKsin, _super);
    function euiKsin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    euiKsin.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var button = new eui.Button();
        button.skinName = "resource/custom_skins/goodsUISkin.exml";
        this.addChild(button);
        console.log("he");
    };
    return euiKsin;
}(eui.UILayer));
__reflect(euiKsin.prototype, "euiKsin");
//# sourceMappingURL=euiKsin.js.map