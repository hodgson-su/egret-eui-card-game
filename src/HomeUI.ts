/**
 * Created by egret on 2016/1/20.
 */

class HomeUI extends eui.Component{
    constructor( ) {
        super();
        //console.log( "new HomeUI 资源：", RES.getRes( "commonBg_jpg" ) );
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/homeUISkin.exml";
    }

    private uiCompHandler():void {
        console.log( "HomeUI uiCompHandler");
        //通过id对按钮进行事件绑定
        this.mbtnProfile.addEventListener( egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this );
        this.mbtnHeros.addEventListener( egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this );
        this.mbtnGoods.addEventListener( egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this );
        this.mbtnAbout.addEventListener( egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this );
        
        this.btns = [ this.mbtnProfile, this.mbtnHeros, this.mbtnGoods, this.mbtnAbout ];
        
        /// 首次加载完成首先显示home
        this.goHome(); 
    }
    private  btns:eui.ToggleButton[];
    
    private resetFocus():void{
        console.log( " resetFocus " );
        if( this._uiFocused ){
            if( this._uiFocused.parent ){
                this._uiFocused.parent.removeChild( this._uiFocused );
            }
            this._uiFocused = null;
        }
        if( this._mbtnFocused !=null ){
            this._mbtnFocused.selected = false;
            this._mbtnFocused.enabled = true;
            this._mbtnFocused = null;
        }
    }
    
    private goHome():void{
        console.log( " ---------- HOME ---------- " );
        this._pageFocusedPrev = this._pageFocused = GamePages.HOME;
        this.imgBg.source = "homeBg_jpg";//就只是把图片放到背景上面
    }
    
    private mbtnHandler( evt:egret.TouchEvent ):void{

        /// 已经选中不应当再处理!
        if( evt.currentTarget == this._mbtnFocused ) {
            console.log( evt.currentTarget.name, "已经选中不应当再处理!" );
            return;
        }
        /// 逻辑生效，所有按钮锁定
        for( var i:number = this.btns.length - 1; i > -1; --i ){
            this.btns[i].enabled = false;
        }

        /// 移除上一焦点对应的按钮
        //console.log( "remove _mbtnFocused:", this._mbtnFocused );
        if( this._mbtnFocused ){
            this._mbtnFocused.selected = false;
            this._mbtnFocused.enabled = true;
        }
        /// 移除上一焦点对应的UI
        if( this._uiFocused && this._uiFocused.parent ){
            this._uiFocused.parent.removeChild( this._uiFocused );
        }
        
        /// 设置当前焦点按钮
        this._mbtnFocused = evt.currentTarget;
        console.log( "选中", this._mbtnFocused.name  );
        this._mbtnFocused.enabled = false;
        /// 焦点UI重置
        this._uiFocused = null;

        this._pageFocusedPrev = this._pageFocused;
        switch ( this._mbtnFocused ){
            case this.mbtnProfile:
                console.log("mbtnProfile");
                this._pageFocused = GamePages.PROFILE;
                break;
            case this.mbtnHeros:
                console.log("mbtnHeros");
                this._pageFocused = GamePages.HEROS ;
                break;
            case this.mbtnGoods:
                console.log("mbtnGoods");
                this._pageFocused = GamePages.GOODS ;
                break;
            case this.mbtnAbout:
                console.log("mbtnAbout");
                this._pageFocused = GamePages.ABOUT ;
                break;
        }
        this.dispatchEventWith( GameEvents.EVT_LOAD_PAGE, false, this._pageFocused );
    }
    private _pageFocusedPrev:string;

    createChildren():void {
        super.createChildren();
    }

    private mbtnProfile:eui.ToggleButton;
    private mbtnHeros:eui.ToggleButton;
    private mbtnGoods:eui.ToggleButton;
    private mbtnAbout:eui.ToggleButton;
    private _mbtnFocused:eui.ToggleButton;
    
    private _profileUI:ProfileUI;
    private _herosUI:HerosUI;
    private _goodsUI:GoodsUI;
    private _aboutUI:AboutUI;
    private _uiFocused:eui.Component;
    
    private imgBg:eui.Image;
    
    private _pageFocused:string;

    public pageReadyHandler( pageName:String ):void {
        console.log( "页面就绪:", pageName  );
        /// 页面加载完成，所有非焦点按钮解锁
        for( var i:number = this.btns.length - 1; i > -1; --i ){
            this.btns[i].enabled = ! this.btns[i].selected;
        }
        
        switch ( pageName ){
            case GamePages.PROFILE:
                console.log('this'+this._profileUI);
                if( !this._profileUI ){
                    this._profileUI = new ProfileUI();
                    this._profileUI.addEventListener( GameEvents.EVT_RETURN, ()=>{
                        this.resetFocus();
                        this.goHome();
                    }, this );
                }
                this.imgBg.source = "commonBg_jpg";
                this._uiFocused = this._profileUI;
                break;
            case GamePages.HEROS:
                if( !this._herosUI ){
                    this._herosUI = new HerosUI();
                    this._herosUI.addEventListener( GameEvents.EVT_RETURN, ()=>{
                        this.resetFocus();
                        this.goHome();
                    }, this );
                }
                this.imgBg.source = "bgListPage_jpg";
                this._uiFocused = this._herosUI;
                break;
            case GamePages.GOODS:
                if( !this._goodsUI ){
                    this._goodsUI = new GoodsUI();
                    this._goodsUI.addEventListener( GameEvents.EVT_RETURN, ()=>{
                        this.resetFocus();
                        this.goHome();
                    }, this );
                }
                this.imgBg.source = "bgListPage_jpg";
                this._uiFocused = this._goodsUI;
                break;
            case GamePages.ABOUT:
                if( !this._aboutUI ){
                    this._aboutUI = new AboutUI();
                    this._aboutUI.addEventListener( GameEvents.EVT_CLOSE_ABOUT, ()=>{
                        this.resetFocus();
                        console.log( "关闭关于 返回:", this._pageFocusedPrev );
                        switch ( this._pageFocusedPrev ){
                            case GamePages.PROFILE:
                                this.mbtnProfile.selected = true;
                                this.mbtnProfile.dispatchEventWith( egret.TouchEvent.TOUCH_TAP );
                                break;
                            case GamePages.HEROS:
                                this.mbtnHeros.selected = true;
                                this.mbtnHeros.dispatchEventWith( egret.TouchEvent.TOUCH_TAP );
                                break;
                            case GamePages.GOODS:
                                this.mbtnGoods.selected = true;
                                this.mbtnGoods.dispatchEventWith( egret.TouchEvent.TOUCH_TAP );
                                break;
                        }
                    }, this );
                }
                //this.imgBg.source = "homeBg_jpg";
                this._uiFocused = this._aboutUI;
                break;
        }
        /// 总是把页面放在背景的上一层！
        console.log("other:"+this._uiFocused.skinName);
        this.addChild(this._uiFocused);
        this.addChildAt( this._uiFocused, this.getChildIndex( this.imgBg ) + 1 );
    }
}