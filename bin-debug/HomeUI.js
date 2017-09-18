/**
 * Created by egret on 2016/1/20.
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
var HomeUI = (function (_super) {
    __extends(HomeUI, _super);
    function HomeUI() {
        var _this = _super.call(this) || this;
        //console.log( "new HomeUI 资源：", RES.getRes( "commonBg_jpg" ) );
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/custom_skins/homeUISkin.exml";
        return _this;
    }
    HomeUI.prototype.uiCompHandler = function () {
        console.log("HomeUI uiCompHandler");
        //通过id对按钮进行事件绑定
        this.mbtnProfile.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this);
        this.mbtnHeros.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this);
        this.mbtnGoods.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this);
        this.mbtnAbout.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this);
        this.btns = [this.mbtnProfile, this.mbtnHeros, this.mbtnGoods, this.mbtnAbout];
        /// 首次加载完成首先显示home
        this.goHome();
    };
    HomeUI.prototype.resetFocus = function () {
        console.log(" resetFocus ");
        if (this._uiFocused) {
            if (this._uiFocused.parent) {
                this._uiFocused.parent.removeChild(this._uiFocused);
            }
            this._uiFocused = null;
        }
        if (this._mbtnFocused != null) {
            this._mbtnFocused.selected = false;
            this._mbtnFocused.enabled = true;
            this._mbtnFocused = null;
        }
    };
    HomeUI.prototype.goHome = function () {
        console.log(" ---------- HOME ---------- ");
        this._pageFocusedPrev = this._pageFocused = GamePages.HOME;
        this.imgBg.source = "homeBg_jpg"; //就只是把图片放到背景上面
    };
    HomeUI.prototype.mbtnHandler = function (evt) {
        /// 已经选中不应当再处理!
        if (evt.currentTarget == this._mbtnFocused) {
            console.log(evt.currentTarget.name, "已经选中不应当再处理!");
            return;
        }
        /// 逻辑生效，所有按钮锁定
        for (var i = this.btns.length - 1; i > -1; --i) {
            this.btns[i].enabled = false;
        }
        /// 移除上一焦点对应的按钮
        //console.log( "remove _mbtnFocused:", this._mbtnFocused );
        if (this._mbtnFocused) {
            this._mbtnFocused.selected = false;
            this._mbtnFocused.enabled = true;
        }
        /// 移除上一焦点对应的UI
        if (this._uiFocused && this._uiFocused.parent) {
            this._uiFocused.parent.removeChild(this._uiFocused);
        }
        /// 设置当前焦点按钮
        this._mbtnFocused = evt.currentTarget;
        console.log("选中", this._mbtnFocused.name);
        this._mbtnFocused.enabled = false;
        /// 焦点UI重置
        this._uiFocused = null;
        this._pageFocusedPrev = this._pageFocused;
        switch (this._mbtnFocused) {
            case this.mbtnProfile:
                console.log("mbtnProfile");
                this._pageFocused = GamePages.PROFILE;
                break;
            case this.mbtnHeros:
                console.log("mbtnHeros");
                this._pageFocused = GamePages.HEROS;
                break;
            case this.mbtnGoods:
                console.log("mbtnGoods");
                this._pageFocused = GamePages.GOODS;
                break;
            case this.mbtnAbout:
                console.log("mbtnAbout");
                this._pageFocused = GamePages.ABOUT;
                break;
        }
        this.dispatchEventWith(GameEvents.EVT_LOAD_PAGE, false, this._pageFocused);
    };
    HomeUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    HomeUI.prototype.pageReadyHandler = function (pageName) {
        var _this = this;
        console.log("页面就绪:", pageName);
        /// 页面加载完成，所有非焦点按钮解锁
        for (var i = this.btns.length - 1; i > -1; --i) {
            this.btns[i].enabled = !this.btns[i].selected;
        }
        switch (pageName) {
            case GamePages.PROFILE:
                console.log('this' + this._profileUI);
                if (!this._profileUI) {
                    this._profileUI = new ProfileUI();
                    this._profileUI.addEventListener(GameEvents.EVT_RETURN, function () {
                        _this.resetFocus();
                        _this.goHome();
                    }, this);
                }
                this.imgBg.source = "commonBg_jpg";
                this._uiFocused = this._profileUI;
                break;
            case GamePages.HEROS:
                if (!this._herosUI) {
                    this._herosUI = new HerosUI();
                    this._herosUI.addEventListener(GameEvents.EVT_RETURN, function () {
                        _this.resetFocus();
                        _this.goHome();
                    }, this);
                }
                this.imgBg.source = "bgListPage_jpg";
                this._uiFocused = this._herosUI;
                break;
            case GamePages.GOODS:
                if (!this._goodsUI) {
                    this._goodsUI = new GoodsUI();
                    this._goodsUI.addEventListener(GameEvents.EVT_RETURN, function () {
                        _this.resetFocus();
                        _this.goHome();
                    }, this);
                }
                this.imgBg.source = "bgListPage_jpg";
                this._uiFocused = this._goodsUI;
                break;
            case GamePages.ABOUT:
                if (!this._aboutUI) {
                    this._aboutUI = new AboutUI();
                    this._aboutUI.addEventListener(GameEvents.EVT_CLOSE_ABOUT, function () {
                        _this.resetFocus();
                        console.log("关闭关于 返回:", _this._pageFocusedPrev);
                        switch (_this._pageFocusedPrev) {
                            case GamePages.PROFILE:
                                _this.mbtnProfile.selected = true;
                                _this.mbtnProfile.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
                                break;
                            case GamePages.HEROS:
                                _this.mbtnHeros.selected = true;
                                _this.mbtnHeros.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
                                break;
                            case GamePages.GOODS:
                                _this.mbtnGoods.selected = true;
                                _this.mbtnGoods.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
                                break;
                        }
                    }, this);
                }
                //this.imgBg.source = "homeBg_jpg";
                this._uiFocused = this._aboutUI;
                break;
        }
        /// 总是把页面放在背景的上一层！
        console.log("other:" + this._uiFocused.skinName);
        this.addChild(this._uiFocused);
        this.addChildAt(this._uiFocused, this.getChildIndex(this.imgBg) + 1);
    };
    return HomeUI;
}(eui.Component));
__reflect(HomeUI.prototype, "HomeUI");
//# sourceMappingURL=HomeUI.js.map