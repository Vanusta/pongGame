
import { _decorator, Component, Node, systemEvent, SystemEvent, EventMouse, Vec3 } from 'cc';
const { ccclass, property, integer } = _decorator;
// let positionYMouse: number
@ccclass('TypescriptPaddles')
export class TypescriptPaddles extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(Node)
    private paddle01: Node = null;

    @property(Node)
    private paddle02: Node = null;

    @integer
    private point01: number = 0;

    @integer
    private point02: number = 0;

    private positionXMouse: number

    start () {
        // [3]

        systemEvent.on(SystemEvent.EventType.MOUSE_MOVE, this.onMouseMove, this)
    }


    onMouseMove(event: EventMouse){
        let positionX:number = event.getLocationX()
        this.positionXMouse = positionX
        this.point01 = 1
    }

    update (deltaTime: number) {
        // [4]
        this.paddle01.setPosition(new Vec3(this.positionXMouse/2 - 480, 300, 0))
        this.paddle02.setPosition(new Vec3(this.positionXMouse/2 - 480, -300, 0))

    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
