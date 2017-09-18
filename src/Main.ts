class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;
    protected createChildren(): void {
        super.createChildren();

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        // RES.loadGroup("preload");
        RES.loadGroup("loading");
    }
    private isThemeLoadEnd: boolean = false;//判断皮肤是否加载完成
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        switch(event.groupName){
            case "loading":
                if(this.loadingView.parent){
                    this.loadingView.parent.removeChild(this.loadingView);
                }

                Toast.init(this,RES.getRes("toast-bg_png"));

                this._loadingBg = new egret.Bitmap(RES.getRes("loading_bg"));//获取资源图片
                this.addChild(this._loadingBg);//将图片添加到容器中

                this._trueLoadingUI = new TrueLoadingUI();
                this.loadPage("home");
                break;
            case "home":
                console.log("home ok:",egret.getTimer());
                this.isResourceLoadEnd = true;
                this.createScene();
                break;
            default:
                console.log("\tpage["+event.groupName+"]ok:",egret.getTimer());
                this.pageLoadedHandler(event.groupName);
                break;
        }
    }
    private clearRESEvents():void{

    }
    private createScene() {
        console.log("createScene：",this.isThemeLoadEnd,this.isResourceLoadEnd);
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            console.log("create ok");
            this.startCreateScene();
        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        // this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        // console.log("grouoName:"+event.groupName);
        // if (event.groupName == "preload") {
        //     this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        // }
        switch(event.groupName){
            case "loading":
                this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
                break;
            default:
                this._trueLoadingUI.setProgress(event.itemsLoaded,event.itemsTotal);
        }
    }
    private textfield: egret.TextField;

    private idLoading:string;//加载页面名字pageName
    private _trueLoadingUI:TrueLoadingUI;
    private _homeUI:HomeUI;

    private _loadingBg:egret.Bitmap;//背景图片
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {
        //主页特殊，其他页都需要传参数
        this.pageLoadedHandler("home");

        if(this._loadingBg.parent){
            this._loadingBg.parent.removeChild(this._loadingBg);
        }

        this._homeUI = new HomeUI();
        this._homeUI.addEventListener(GameEvents.EVT_LOAD_PAGE,(evt:egret.Event) => {
            this.loadPage(evt.data);
        },this);//做一个监听
        this.addChild(this._homeUI);
    }
    
    //加载页面（不包括home页)
    private loadPage(pageName:string):void{
        this.addChild(this._trueLoadingUI);
        this.idLoading = pageName;
        switch(pageName){
            case "heros":
            case "goods":
                RES.loadGroup("heros_goods");
                break;
            default:
                RES.loadGroup(pageName);
                break;
        }
    }

    private pageLoadedHandler(name:string):void{
        if(name != "home"){
            this._homeUI.pageReadyHandler(this.idLoading);
        }
        //如果当前加载的不是home页面，那么可以将当前页面删除
        if(this._trueLoadingUI.parent){
            this._trueLoadingUI.parent.removeChild(this._trueLoadingUI);
        }
    }
}
