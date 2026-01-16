import { _decorator, Component, Node, Vec3, Color, Animation, Input, Sprite, input, EventTouch } from 'cc';
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
    lives: number = 3;

    @property
    invincibleTime: number = 1;

    @property
    anim: Animation = null!;

    @property(Sprite)
    sprite: Sprite = null!;

    private isJumping: boolean = false;
    private jumpTime: number = 0;
    private groundY: number = 0;
    private isInvincible = false;
    private invincibleTimer = 0;

    private blinkTimer = 0;
    private blinkInterval = 0.1;

    start() {
        this.groundY = this.node.position.y;
        input.on(Input.EventType.TOUCH_START, this.onJump, this);
        this.anim.play('RunPlayer');
    }

    takeDamage () {
        if (this.isInvincible) return;

        this.lives--;
        console.log('Lives:', this.lives);

        this.isInvincible = true;
        this.invincibleTimer = this.invincibleTime;
        this.blinkTimer = this.blinkInterval;

        // анимация урона
        if (this.anim) {
            this.anim.play('DamagePlayer');
            this.anim.once(Animation.EventType.FINISHED, () => {
                if (this.lives > 0) {
                    this.anim.play('RunPlayer');
                }
            });
        }

        if (this.lives <= 0) {
            this.die();
        }
    }

    die () {
        console.log('PLAYER DEAD');
        this.moveSpeed = 0;
        this.anim?.stop();
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

        if (this.isInvincible) {
            this.invincibleTimer -= dt;
            this.blinkTimer -= dt;

            if (this.blinkTimer <= 0) {
                this.blinkTimer = this.blinkInterval;

                if (this.sprite.color.equals(Color.RED)) {
                    this.sprite.color = Color.WHITE;
                } else {
                    this.sprite.color = Color.RED;
                }
            }

            if (this.invincibleTimer <= 0) {
                this.isInvincible = false;

                this.sprite.color = Color.WHITE;
            }
        }
        
    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_START, this.onJump, this);
    }
}
