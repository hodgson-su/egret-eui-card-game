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
var ProfileUI = (function (_super) {
    __extends(ProfileUI, _super);
    function ProfileUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        // this.uiCompHandler();
        _this.skinName = "resource/custom_skins/profileUISkin.exml";
        return _this;
    }
    ProfileUI.prototype.uiCompHandler = function () {
        var _this = this;
        console.log("\t\tProfileUI uiCompHandler");
        /// 返回逻辑
        this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEventWith(GameEvents.EVT_RETURN);
        }, this);
        /// 填充数据
        var dsListSkills = [
            { icon: "skillIcon01_png", name: "旋龙幻杀" },
            { icon: "skillIcon02_png", name: "魔魂天咒" },
            { icon: "skillIcon03_png", name: "天魔舞" },
            { icon: "skillIcon04_png", name: "痴情咒" },
            { icon: "skillIcon05_png", name: "无间寂" },
            { icon: "skillIcon06_png", name: "霸天戮杀" },
            { icon: "skillIcon07_png", name: "灭魂狂飙" }
        ];
        this.listSkills.itemRendererSkinName = "profileSkillListIRSkin";
        this.listSkills.dataProvider = new eui.ArrayCollection(dsListSkills);
    };
    ProfileUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.scrListSkills.horizontalScrollBar = null;
    };
    return ProfileUI;
}(eui.Component));
__reflect(ProfileUI.prototype, "ProfileUI");
//# sourceMappingURL=ProfileUI.js.map