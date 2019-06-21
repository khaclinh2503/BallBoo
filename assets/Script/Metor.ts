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
    type:number = 1;


    // LIFE-CYCLE CALLBACKS:

    setAngle(angle:number){
        this.angle = angle;
    }

    onLoad () {
        this.node.getComponent(cc.BoxCollider).enabled = true;
    }

    start () {
        this.setAvatarMetor();
    }

    setAvatarMetor(){
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
        if(this.node.y-this.node.height/2<-size.height/2){
            this.node.destroy()
            return false
        }
        return true;
    }
    getHeight(){
        return this.node.height;
    }
    getWidth(){
        return this.node.width;
    }

    onCollisionEnter (other) {
        this.node.color = cc.Color.RED;
        cc.log("onCollisionEnter")
    }
    
    onCollisionStay (other) {
        console.log('on collision stay');
    }
    
    onCollisionExit () {
        cc.log("onCollisionExit")

    }
    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.name === "Ball") {
            selfCollider.node.destroy()
            // otherCollider.node.destroy()
        }
    }
}
