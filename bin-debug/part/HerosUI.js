/**
 * Created by egret on 2016/1/21.
 */
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
var HerosUI = (function (_super) {
    __extends(HerosUI, _super);
    function HerosUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/custom_skins/herosUISkin.exml";
        return _this;
    }
    HerosUI.prototype.uiCompHandler = function () {
        var _this = this;
        console.log("\t\tHerosUI uiCompHandler");
        /// 返回逻辑
        this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEventWith(GameEvents.EVT_RETURN);
        }, this);
        /// 确定
        this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var dp = _this.listHeros.dataProvider;
            var aNameChecked = new Array();
            for (var i = 0; i < dp.length; ++i) {
                if (dp.getItemAt(i).checked) {
                    aNameChecked.push(dp.getItemAt(i).heroName);
                }
            }
            if (aNameChecked.length) {
                Toast.launch("您选择了：" + aNameChecked.join(", "));
            }
            else {
                Toast.launch("你牛叉，一个也不选！");
            }
            _this.dispatchEventWith(GameEvents.EVT_RETURN);
        }, this);
        /// 填充数据
        var dsListHeros = [
            { icon: "heros01_png", heroName: "伊文捷琳", comment: "评价：樱桃小丸子", checked: false },
            { icon: "heros02_png", heroName: "亚特伍德", comment: "评价：离了我你不行的", checked: true },
            { icon: "heros03_png", heroName: "伊妮德", comment: "评价：猴子请来的逗比", checked: true },
            { icon: "heros04_png", heroName: "鲁宾", comment: "评价：我勒个去", checked: false },
            { icon: "heros05_png", heroName: "威弗列德", comment: "评价：这货碉堡了", checked: false },
            { icon: "heros06_png", heroName: "史帝文", comment: "评价：咖啡不加糖", checked: false },
            { icon: "heros07_png", heroName: "哈瑞斯", comment: "评价：猪一样的队友", checked: false }
        ];
        this.listHeros.dataProvider = new eui.ArrayCollection(dsListHeros);
        this.listHeros.itemRenderer = HerosListIRSkin;
    };
    HerosUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //this.scrListHeros.horizontalScrollBar = null;
    };
    return HerosUI;
}(eui.Component));
__reflect(HerosUI.prototype, "HerosUI");
var HerosListIRSkin = (function (_super) {
    __extends(HerosListIRSkin, _super);
    function HerosListIRSkin() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.createChildren, _this);
        _this.skinName = "resource/custom_skins/herosListIRSkin.exml";
        return _this;
    }
    HerosListIRSkin.prototype.createChildren = function () {
        // super.createChildren();
        var _this = this;
        this.cb.addEventListener(egret.Event.CHANGE, function () {
            console.log("\tCheckbox 变化:", _this.data.checked);
            _this.data.checked = _this.cb.selected;
        }, this);
        // this.cb.addEventListener( egret.Event.CHANGE, ()=> {
        //     console.log( "\tCheckbox 变化:", this.data.checked );
        //     this.data.checked = this.cb.selected;
        // }, this );
        // this.cb.addEventListener(egret.Event.CHANGE,this.dataChanged,this);
    };
    return HerosListIRSkin;
}(eui.ItemRenderer));
__reflect(HerosListIRSkin.prototype, "HerosListIRSkin");
//# sourceMappingURL=HerosUI.js.map