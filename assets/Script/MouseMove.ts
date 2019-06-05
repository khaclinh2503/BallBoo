// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN,(e:cc.Event.EventMouse)=>{
            console.log("Mouse down on top of selected node");
            e.bubbles = false; // Handled event don't let it propogate!
        });
        this.node.on(cc.Node.EventType.MOUSE_LEAVE,(e:cc.Event.EventMouse)=>{
            console.log("Mouse no longer over " + e.currentTarget.name);
        });
        this.node.parent.on(cc.Node.EventType.MOUSE_DOWN,(e:cc.Event.EventMouse)=>{
            console.log("Mouse button pressed on parent.  Button: " + e.getButton(),e.getLocation().x,e.getLocation().y);
        });
    }

    start () {

    }

    // update (dt) {}
}
