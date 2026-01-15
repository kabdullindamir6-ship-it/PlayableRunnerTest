import { _decorator, Component, Node, Vec3, Animation, Input, input, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property
    moveSpeed: number = 200;

    @property
    jumpHeight: number = 200;

    @property
    jumpDuration: number = 0.6;

    @property
    anim: Animation = null!;

    private isJumping: boolean = false;
    private jumpTime: number = 0;
    private groundY: number = 0;

    start() {
        this.groundY = this.node.position.y;
        input.on(Input.EventType.TOUCH_START, this.onJump, this);
        this.anim.play('RunPlayer');
    }

    onJump(event: EventTouch) {
        if (this.isJumping) return;

        this.isJumping = true;
        this.jumpTime = 0;

        this.anim.play('JumpPlayer');
    }

    update(dt: number) {

        let x = this.node.position.x + this.moveSpeed * dt;

        let y = this.groundY;

        if (this.isJumping) {
            this.jumpTime += dt;
            let t = this.jumpTime / this.jumpDuration;

            if (t >= 1) {
                t = 1;
                this.isJumping = false;
                this.anim.play('RunPlayer');
            }

            y = this.groundY + 4 * this.jumpHeight * t * (1 - t);
        }

        this.node.setPosition(x, y, 0);
    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_START, this.onJump, this);
    }
}
