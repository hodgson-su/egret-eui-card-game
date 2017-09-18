/**
 * Created by egret on 2016/1/21.
 */

class ProfileUI extends eui.Component {

    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        // this.uiCompHandler();
        this.skinName = "resource/custom_skins/profileUISkin.exml";
    }

    private uiCompHandler():void {
        console.log( "\t\tProfileUI uiCompHandler" );

        /// 返回逻辑
        this.btnReturn.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=> {
            this.dispatchEventWith( GameEvents.EVT_RETURN );
        }, this );

        /// 填充数据
        var dsListSkills:Array<Object> = [
            { icon: "skillIcon01_png", name:"旋龙幻杀" }
            , { icon: "skillIcon02_png", name:"魔魂天咒"  }
            , { icon: "skillIcon03_png", name:"天魔舞"  }
            , { icon: "skillIcon04_png", name:"痴情咒"  }
            , { icon: "skillIcon05_png", name:"无间寂"  }
            , { icon: "skillIcon06_png", name:"霸天戮杀"  }
            , { icon: "skillIcon07_png", name:"灭魂狂飙"  }
        ];
        this.listSkills.itemRendererSkinName = "profileSkillListIRSkin";
        this.listSkills.dataProvider = new eui.ArrayCollection( dsListSkills );
    }
 
    protected createChildren(): void {
        super.createChildren();

        this.scrListSkills.horizontalScrollBar = null;
    }

    private btnReturn:eui.Button;
    private listSkills:eui.List;
    private scrListSkills:eui.Scroller;
}