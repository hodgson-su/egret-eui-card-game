var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by egret on 2016/1/26.
 */
var GamePages = (function () {
    function GamePages() {
    }
    GamePages.PROFILE = "profile";
    GamePages.HEROS = "heros";
    GamePages.GOODS = "goods";
    GamePages.ABOUT = "about";
    GamePages.HOME = "home";
    return GamePages;
}());
__reflect(GamePages.prototype, "GamePages");
//# sourceMappingURL=GamePages.js.map