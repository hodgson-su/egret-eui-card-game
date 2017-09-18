# EUI库

## 使用
1. 直接引用EXML文件，因为EXML的根节点是SKin，表示这个文件描述的是一个皮肤。我们可以用skinName接受EXML文件的路径。
``var button = new eui.Button(); button.skinName="resource/skins/Button.exml"; this.addChild(button);``
2. 动态加载EXML文件