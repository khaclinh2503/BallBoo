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

    public keys : Map<number,boolean> = new Map();
    onKeyDown(e:cc.Event.EventCustom){
        this.keys.set(e.keyCode,true);
        switch(e.keyCode){
            case cc.macro.KEY.right:
                if(this.keys.has(cc.macro.KEY.shift))
                    console.log("Right and shift pressed");
                else                    
                    console.log("Right pressed");
                break;
        }
        console.log(this.keys.size);
    }
    onKeyUp(e:cc.Event.EventCustom){
        this.keys.delete(e.keyCode);
    }
    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,
            this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,
            this.onKeyUp,this);     
        
    }

    // update (dt) {}
}
