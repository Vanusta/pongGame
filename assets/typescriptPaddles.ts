
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

    @property(Node)
    private ball: Node = null;

    @property(Node)
    private point01: string = '0';

    @property(Node)
    private point02: string = '0';

    private startGame: boolean = false
    private continueGame: boolean = false
    private positionXMouse: number = NaN
    private isUp: boolean = true 
    private isHitPaddle: boolean = true 
    private isHitWall: boolean = true 
    private changeX: number = NaN 
    private changeY: number = NaN 

    start () {
        // [3]
        // for paddle
        systemEvent.on(SystemEvent.EventType.MOUSE_MOVE, this.onMouseMove, this)
        // for ball
        systemEvent.on(SystemEvent.EventType.MOUSE_DOWN, this.onMouseDown, this)
    }


    onMouseMove(event: EventMouse){
        let positionX:number = event.getLocationX()
        this.positionXMouse = positionX
    }

    onMouseDown(event: EventMouse){
        let mouseType = event.getButton();

        // Identify the location of the button
        let isBtnLeft = mouseType === EventMouse.BUTTON_LEFT

        // Identify swiping direction of the ball
        let mouseClick = event.getLocation();
        let swipeToUp =  (mouseClick.y - this.ball.position.y) > 640

        // start
        this.startGame = true

        if (isBtnLeft && swipeToUp) {
            this.isUp = true
        }else if(isBtnLeft && !swipeToUp) {
            this.isUp = false
        }
    }
    changeDirection() {
        let ballX = this.ball.getPosition().x
        let ballY = this.ball.getPosition().y
        this.isHitWall = ballX === 480 || ballX === -480
        this.isHitPaddle = this.paddle01.getPosition().x < ballX  && ballX < this.paddle01.getPosition().x + 50 && ( ballY === 270 || ballY === -270 )
        if(ballY === 320 || ballY === -320 ) {
            let Winner = ballY === 320 ? 'bottom' : 'top'
            this.resetGame()
            this.getPoint(Winner)
            alert('YOU ARE LOSER!')
        }else if(this.isHitWall){
            this.changeX = -this.changeX
        this.continueGame = true
        }else if(this.isHitPaddle) {
            this.isUp = !this.isUp
            this.changeY = -this.changeY
            this.continueGame = true
        }

        this.ball.setPosition(new Vec3(ballX + this.changeX, ballY + this.changeY , 0))
        
    }
    getPoint(side:string) {
        if(side === 'top'){
            this.point01.components[1].string = this.point01.components[1].string * 1 + 1
        }else {
            this.point02.components[1].string = this.point02.components[1].string * 1 + 1
        }
    }
    resetGame() {
        this.startGame = false
        this.ball.setPosition(new Vec3(0 , 0 , 0))
    }

    update (deltaTime: number) {
        // [4]
        this.paddle01.setPosition(new Vec3(this.positionXMouse/2 - 480, 300, 0))
        this.paddle02.setPosition(new Vec3(this.positionXMouse/2 - 480, -300, 0))

        if(this.startGame && this.continueGame) {
            this.changeDirection()
        }else if(this.startGame && this.isUp) {
            this.changeX = 2
            this.changeY = 2
            this.changeDirection()

        }else if(this.startGame && !this.isUp) {
            this.changeX = 2
            this.changeY = -2
            this.changeDirection()
        }else {
            this.resetGame()
        }

       

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
