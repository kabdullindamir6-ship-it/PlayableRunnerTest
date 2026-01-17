import { _decorator, Component, Node, Vec3, Color, Animation, Input, Sprite, input, EventTouch } from 'cc';
import { UIManager } from './UIManager';
import { GameManager } from './GameManager';

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

    public isStopped = false;

    @property({ type: UIManager })
    ui: UIManager = null!;

    @property(Sprite)
    sprite: Sprite = null!;

    @property(Node)
    gameOverUI: Node = null!;

    @property({ type: Node })
    gameManagerNode: Node = null!;

    gameManagerObj: GameManager = null!;

    private isJumping: boolean = false;
    private jumpTime: number = 0;
    private groundY: number = 0;
    private isInvincible = false;
    private invincibleTimer = 0;

    private blinkTimer = 0;
    private blinkInterval = 0.1;


    canMove = false;
    canJump = false;

    start() {
        this.groundY = this.node.position.y;
        input.on(Input.EventType.TOUCH_START, this.onJump, this);
        this.anim.play('RunPlayer');
        if (this.gameManagerNode) {
            this.gameManagerObj = this.gameManagerNode.getComponent(GameManager);
        }
    }

    takeDamage () {
        if (this.isInvincible) return;
        if (this.lives < -1) return;

        this.lives--;
        console.log('Lives:', this.lives);

        this.isInvincible = true;
        this.invincibleTimer = this.invincibleTime;
        this.blinkTimer = this.blinkInterval;

        if (this.anim) {
            this.anim.play('DamagePlayer');
            this.anim.once(Animation.EventType.FINISHED, () => {
                if (this.lives > 0) {
                    this.anim.play('RunPlayer');
                }
            });
        }

        if (this.lives == 0) {
            this.die();
        }

        this.gameManagerObj.audioManager.playDamage();
        this.ui.setLives(this.lives);
    }

    die () {
        console.log('PLAYER DEAD');
        this.moveSpeed = 0;
        this.anim?.stop();
        const gameOverScript = this.gameOverUI.getComponent('GameOverUI');
        this.gameManagerObj.audioManager.playFail();
        if (gameOverScript) gameOverScript.show(this.gameManagerObj.score);
    }

    public onJump(event: EventTouch) {
        if (!this.canJump || this.gameManagerObj.isPaused) return;
        if (this.isJumping) return;

        this.isJumping = true;
        this.jumpTime = 0;

        this.anim.play('JumpPlayer');
        this.gameManagerObj.audioManager.playJump();
    }

    update(dt: number) {
        if (this.gameManagerObj.isPaused) return;

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
