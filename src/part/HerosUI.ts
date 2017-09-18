/**
 * Created by egret on 2016/1/21.
 */

class HerosUI extends eui.Component {

    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/herosUISkin.exml";
    }

    private uiCompHandler():void {
        console.log( "\t\tHerosUI uiCompHandler" );

        /// 返回逻辑
        this.btnReturn.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=> {
            this.dispatchEventWith( GameEvents.EVT_RETURN );
        }, this );

        /// 确定
        this.btnOK.addEventListener( egret.TouchEvent.TOUCH_TAP, () => {
            var dp:eui.ICollection = this.listHeros.dataProvider;
            var aNameChecked:string[] = new Array<string>();
            for ( var i:number = 0; i < dp.length; ++i ) {
                if ( dp.getItemAt( i ).checked ) {
                    aNameChecked.push( dp.getItemAt( i ).heroName );
                }
            }
            if ( aNameChecked.length ) {
                Toast.launch( "您选择了："+ aNameChecked.join( ", " ) );
            } else {
                Toast.launch( "你牛叉，一个也不选！" ); 
            }
            this.dispatchEventWith( GameEvents.EVT_RETURN );
        }, this );

        /// 填充数据
        var dsListHeros:Array<Object> = [
            { icon: "heros01_png", heroName: "伊文捷琳", comment: "评价：樱桃小丸子", checked: false }
            , { icon: "heros02_png", heroName: "亚特伍德", comment: "评价：离了我你不行的", checked: true }
            , { icon: "heros03_png", heroName: "伊妮德", comment: "评价：猴子请来的逗比", checked: true }
            , { icon: "heros04_png", heroName: "鲁宾", comment: "评价：我勒个去", checked: false }
            , { icon: "heros05_png", heroName: "威弗列德", comment: "评价：这货碉堡了", checked: false }
            , { icon: "heros06_png", heroName: "史帝文", comment: "评价：咖啡不加糖", checked: false }
            , { icon: "heros07_png", heroName: "哈瑞斯", comment: "评价：猪一样的队友", checked: false }
        ];
        this.listHeros.dataProvider = new eui.ArrayCollection( dsListHeros );

        this.listHeros.itemRenderer = HerosListIRSkin;
    }

    protected createChildren():void {
        super.createChildren();

        //this.scrListHeros.horizontalScrollBar = null;
    }

    private btnOK:eui.Button;
    private btnReturn:eui.Button;

    private listHeros:eui.List;
    private scrListHeros:eui.Scroller;
}

class HerosListIRSkin extends eui.ItemRenderer {

    private cb:eui.CheckBox;

    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.createChildren, this );
        this.skinName = "resource/custom_skins/herosListIRSkin.exml";
    }

    protected createChildren():void {
        // super.createChildren();
        
        this.cb.addEventListener(egret.Event.CHANGE,()=>{
            console.log( "\tCheckbox 变化:", this.data.checked );
            this.data.checked = this.cb.selected;
        },this);
        // this.cb.addEventListener( egret.Event.CHANGE, ()=> {
        //     console.log( "\tCheckbox 变化:", this.data.checked );
        //     this.data.checked = this.cb.selected;
        // }, this );
        // this.cb.addEventListener(egret.Event.CHANGE,this.dataChanged,this);
    }

    // protected dataChanged():void {
    //     console.log( "\tCheckbox 变化:", this.data.checked );
    // }
}