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
export default class Metor extends cc.Component {

    timeToLive = 10000
    timeAlive = 0
    speed:number = 100;
    angle:number = 0;
    @property (cc.Node) // 1
    metor: cc.Node = null

    // LIFE-CYCLE CALLBACKS:

    setAngle(angle:number){
        this.angle = angle;
    }

    // onLoad () {}

    start () {

    }

    update (dt) {
        if(this.checkDetroy){
            this.updatePosition(dt);
        }
    }
    updatePosition(dt){
        var pos = this.node.getPosition();
        this.node.y = pos.y-dt*this.speed;
    }
    checkDetroy(){
        var size = cc.winSize;
        if(this.node.y-this.metor.height/2<-size.height/2){
            this.node.destroy()
            return false
        }
        return true;
    }
    getHeight(){
        return this.metor.height;
    }
    getWidth(){
        return this.metor.width;
    }
}
