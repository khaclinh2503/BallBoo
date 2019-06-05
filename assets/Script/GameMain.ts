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
import * as MathUtilities from './Utilities/MathUtilities'
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    checkBall:Boolean = true;
    @property(cc.Sprite)
    barBall: cc.Node = null;
    @property
    text: string = 'hello';
    @property(cc.Prefab)
    ball:cc.Prefab = null;
    
    createBullet(position: cc.Vec2, velocity: number, angle: number) {
        const newBullet = cc.instantiate(this.ball) // 1
        newBullet.setPosition(position) // 2
        newBullet.rotation = angle
    
        const body = newBullet.getComponent(cc.RigidBody) // 3
        body.linearVelocity = cc.v2(MathUtilities.sind(angle) * velocity,
                                    MathUtilities.cosd(angle) * velocity)
        
        this.node.addChild(newBullet) // 4
    }
    updateCheckBall() {
        
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
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.barBall = this.node.getChildByName("barBall");
    }

    start () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN,(e:cc.Event.EventMouse)=>{
            //create ball in this.barBall.width/2
        });
         this.node.on(cc.Node.EventType.MOUSE_MOVE,(e:cc.Event.EventMouse)=>{
            this.updatePosition(e.getLocation())  
        });
         this.node.on(cc.Node.EventType.MOUSE_UP,(e:cc.Event.EventMouse)=>{
        }); 
    }

    // update (dt) {}
}
const { cos, sin, PI } = Math

const rad = deg => deg * PI / 180;
export const cosd = deg => cos(rad(deg));
export const sind = deg => sin(rad(deg));
