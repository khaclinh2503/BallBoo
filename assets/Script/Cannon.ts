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

    @property (cc.Node) // 1
    gunBall: cc.Node = null

    @property angle: number = 0;
    // @property baseAngleSpeed: number = 0 ;
    // @property angleSpeed: number = 0;
    @property leftMaxAngle: number = -90;
    @property rightMaxAngle: number = 90;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.hookInput();
    }

    start () {

    }
    hookInput() {


        this.node.on(cc.Node.EventType.MOUSE_DOWN,(e:cc.Event.EventMouse)=>{
            
            //create ball in this.barBall.width/2
        });
         this.node.on(cc.Node.EventType.MOUSE_MOVE,(e:cc.Event.EventMouse)=>{
            // this.updatePosition(e.getLocation())  
            this.updateAngel(e.getLocation());
        });
         this.node.on(cc.Node.EventType.MOUSE_UP,(e:cc.Event.EventMouse)=>{
        }); 

    }
    update (dt) {
    
    }
    updateAngel(location) {
        // cc.log(this.gunBall.getPosition().x,this.gunBall.getPosition().y);
        var posGun = this.gunBall.getPosition();
        if(location.y<posGun.y) location.y = posGun.y;
        var angel = Math.atan((location.y-posGun.y)/(location.x-posGun.x));
        angel  = angel*180/Math.PI;
        if(angel<0||(angel==0&&posGun.x>location.x)) angel = 90 + angel
        else angel  = -90 +angel;    
        
        cc.log("updateAngel",angel);
        this.gunBall.angle = angel
    }
}
