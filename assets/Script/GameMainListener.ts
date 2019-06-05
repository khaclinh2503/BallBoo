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
    @property
    checkBall:boolean = true;
    gameData: GameData = null;
    
    @property(cc.Sprite)
    barBall: cc.Node = null;

   

    onLoad () {
        this.barBall = this.node.getChildByName("barBall");
        this.gameData = new GameData(1,0);
    }

    updatePosition(position) {
        if(this.barBall.width/2+position.x>cc.winSize.width){
            this.barBall.x = cc.winSize.width - this.barBall.width/2;
            return;
        }
        if(position.x - this.barBall.width/2<0){
            this.barBall.x = this.barBall.width/2;
            return;
        }
        this.barBall.x = position.x
    }
    updateCheckBall(){
        this.checkBall = true;
    }
    start () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN,(e:cc.Event.EventMouse)=>{
           if(this.checkBall){
               this.scheduleOnce(this.updateCheckBall,2)
               this.checkBall = false;
           }else{
               this.updatePosition(e.getLocation());
           }
        });
        this.node.on(cc.Node.EventType.MOUSE_MOVE,(e:cc.Event.EventMouse)=>{
            if(!this.checkBall){
                this.updatePosition(e.getLocation())
            }
        });
        this.node.on(cc.Node.EventType.MOUSE_UP,(e:cc.Event.EventMouse)=>{
            console.log("Mouse Mouse up" + e.currentTarget.name);
        });
    }

    // update (dt) {}
}
