import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TutorialTrigger')
export class TutorialTrigger extends Component {

    @property({ type: Node })
    tutorialUI: Node = null!; 

    @property({ type: Node })
    gameManager: Node = null!; 

    @property
    triggered: boolean = false; 

    start() {
        this.triggered = false;
    }

    update() {
        if (this.triggered) return;

        const gm = this.gameManager.getComponent('GameManager');
        if (!gm || !gm.player) return;

        const playerX = gm.player.node.position.x;
        const triggerX = this.node.position.x;

        if (playerX >= triggerX) {
            this.triggered = true;

            gm.isPaused = true;
            gm.player.canJump = false;

            const tutorial = this.tutorialUI.getComponent('TutorialUI');
            if (tutorial) {
                tutorial.show('Tap to jump');
            }
        }
    }
}
