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
export default class Game extends cc.Component {

    @property(cc.Prefab)
    ball: cc.Prefab = null
    @property(cc.Prefab)
    metor:cc.Prefab = null;
    @property(cc.Node)
    barBall:cc.Node = null
    @property (cc.Node) // 1
    gunBall: cc.Node = null
    rightMaxAngle:number = 0;
    leftMaxAngle:number = 0;
    defautlAngle:number = 5/180*Math.PI;
    listMetor = [];

    // LIFE-CYCLE CALLBACKS:
    createBullet(position: cc.Vec2, velocity: number, angle: number) {
        const newBall = cc.instantiate(this.ball) // 1
        newBall.setPosition(position) // 2

        // const body = newBall.getComponent(cc.RigidBody) // 3
        newBall.getComponent("Ball").setAngle(angle);
        newBall.getComponent("Ball").setSpeed(velocity)
        this.node.addChild(newBall) // 4
    }
    // onLoad () {}

    start () {
        this.hookInput();
        this.scheduleCreateMeteor();
    }

    hookInput() {
        this.node.on(cc.Node.EventType.MOUSE_DOWN,(e:cc.Event.EventMouse)=>{
            this.updateAngel(e.getLocation());
            const angle = this.gunBall.angle;
            var position = this.gunBall.getPosition();
            this.createBullet(position, 1000, angle) // 4
        });
         this.node.on(cc.Node.EventType.MOUSE_MOVE,(e:cc.Event.EventMouse)=>{
            this.updateAngel(e.getLocation());
        });
         this.node.on(cc.Node.EventType.MOUSE_UP,(e:cc.Event.EventMouse)=>{
        }); 

    }
    update (dt) {

    }
    updateAngel(location) {
        var posGun = this.gunBall.getPosition();
        location = this.node.convertToNodeSpaceAR(location);
        if(location.y<posGun.y) location.y = posGun.y;
        var angle = Math.atan((location.y-posGun.y)/(location.x-posGun.x));
        if(angle == 0) angle = this.defautlAngle;
        if(angle == -0) angle = -this.defautlAngle;
        if(angle<0) angle = angle+Math.PI;
        this.gunBall.angle = angle
    
    }
    createMetor(){
        const metor = cc.instantiate(this.metor);
        var widthMetor = metor.getComponent("Metor").getWidth();
        var heightMetor = metor.getComponent("Metor").getHeight();
        cc.log("createMetor",-cc.winSize.width/2+widthMetor/2,cc.winSize.width/2-widthMetor/2)
        var x = this.randInRange(-cc.winSize.width/2+widthMetor/2,cc.winSize.width/2-widthMetor/2);
        metor.setPosition(cc.v2(x,cc.winSize.height/2+heightMetor/2));
        this.node.addChild(metor);
        
    }
    scheduleCreateMeteor() {
        cc.director.getScheduler().schedule(this.createMetor, this, Math.random(), false);
    }
    randInRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    // update (dt) {}
}
