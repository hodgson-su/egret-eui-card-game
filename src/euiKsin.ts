class euiKsin extends eui.UILayer{
    protected createChildren(): void {
        super.createChildren();
        var button = new eui.Button();
        button.skinName = "resource/custom_skins/goodsUISkin.exml";
        this.addChild(button);
        console.log("he");
    }
}