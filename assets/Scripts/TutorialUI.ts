import { _decorator, Component, Node, tween, Vec3, Label, Input, input, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TutorialUI')
export class TutorialUI extends Component {

    @property(Node)
    fingerIcon: Node = null!;

    @property(Label)
    tutorialText: Label = null!;

    @property(Node)
    gameManager: Node = null!;

    private isActive = false;

    start() {
        input.on(Input.EventType.TOUCH_START, this.onFingerTap, this);
    }

    show(text: string) {
        this.node.active = true;
        this.isActive = true;
        this.tutorialText.string = text;

        this.fingerIcon.scale = new Vec3(0.2, 0.2, 0.2);
        tween(this.fingerIcon)
            .to(0.5, { scale: new Vec3(0.2, 0.2, 0.2) })
            .to(0.5, { scale: new Vec3(0.1, 0.1, 0.1) })
            .union()
            .repeatForever()
            .start();
    }

    hide() {
        this.node.active = false;
        this.isActive = false;
    }

    onFingerTap(event: EventTouch) {
        if (!this.isActive) return;

        this.hide();

        const gm = this.gameManager.getComponent('GameManager');
        if (!gm) return;

        gm.isPaused = false;

        if (gm.tutorialStep === 0) {
            gm.player.canMove = true; 
        }

        if (gm.tutorialStep === 1) {
            gm.player.canJump = true;
            gm.player.onJump(event)
        }

        gm.tutorialStep += 1;
    }
}
