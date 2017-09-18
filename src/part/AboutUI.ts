/**
 * Created by egret on 2016/1/26.
 */

class AboutUI extends eui.Component{

    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/aboutUISkin.exml";
    }

    private uiCompHandler():void {
        console.log( "\t\tAboutUI uiCompHandler" );
        this.btnClose.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            this.dispatchEventWith( GameEvents.EVT_CLOSE_ABOUT );
        }, this );
        this.addEventListener( egret.TouchEvent.TOUCH_TAP, ( evt:egret.TouchEvent )=>{
            if( evt.stageX > 94 && evt.stageX < 194 && evt.stageY > 314 && evt.stageY < 414 ){
                Toast.launch( "美术：刘国萍\n程序：王建文\n策划：范承鑫" ); 
            }
        }, this );
    }
    
    private btnClose:eui.Button;
}