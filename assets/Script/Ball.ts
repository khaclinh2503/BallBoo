// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import * as MathUtilities from './Utilities/MathUtilities'

const {ccclass, property} = cc._decorator;

@ccclass
export default class Ball extends cc.Component {

    timeToLive = 10000
    timeAlive = 0
    speed:number = 500;
    angle:number = 0;

    
    onLoad(){
        this.node.getComponent(cc.CircleCollider).enabled = true;
    }
    setAngle(angle:number){
        this.angle = angle;
    }
    setSpeed(speed:number){
        this.speed = speed;
    }
    update(dt) {
        if (!cc.isValid(this.node)) return
        if(this.checkDetroy())
            this.updatePosition(dt);
    }
    updatePosition(dt:number){
        var pos = this.node.getPosition();
        this.node.x = pos.x+dt*this.speed*Math.cos(this.angle);
        this.node.y = pos.y+dt*this.speed*Math.sin(this.angle);
    }
    checkDetroy(){
        var size = cc.winSize;
        var posnode = this.node.getPosition();
        if(posnode.y+this.node.width/2>size.height/2){
            this.setAngle(-this.angle);
        }
        if(posnode.x+this.node.width/2>size.width/2){
            this.setAngle(Math.PI - this.angle)
        }
        if(posnode.x-this.node.width/2<-size.width/2){
            this.setAngle(Math.PI - this.angle)
        }
        if(Math.abs(this.node.x)>size.width/2||Math.abs(this.node.y)>size.height/2){
            this.node.destroy();
            return false;
        }
        return true;
    }

}
