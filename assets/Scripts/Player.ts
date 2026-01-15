import { _decorator, Component, Node, Vec3, tween, EventTouch, Animation  } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property
    jumpHeight:number = 200
    @property
    jumpDuration:number = 0.5
    @property({ type: Animation })
    anim: Animation = null!;

    private isJumping = false;
    

    start() {
        this.node.parent.on(Node.EventType.TOUCH_START, this.onJump, this);
    }

    onJump(event: EventTouch){
        if (this.isJumping) return;

        this.isJumping = true;

        this.anim.play('JumpPlayer');

        let startPos = this.node.position.clone();
        let jumpUpPos = new Vec3(startPos.x, startPos.y + this.jumpHeight, startPos.z);

        // Поднимаемся
        tween(this.node)
            .to(this.jumpDuration / 2, { position: jumpUpPos }, { easing: 'cubicOut' })
            // Опускаемся
            .to(this.jumpDuration / 2, { position: startPos }, { easing: 'cubicIn' })
            .call(() => { 
                this.isJumping = false;
                this.anim.play('RunPlayer');
             })
            .start();

    }
    
    update(deltaTime: number) {
        
    }
}


