import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FinishZone')
export class FinishZone extends Component {

    @property({ type: Node })
    player: Node = null!;

    @property({ type: Node })
    gameManager: Node = null!;

    update () {
        if (!this.player) return;

        if (Math.abs(this.player.position.x - this.node.position.x) < 50) {
            if(!this.gameManager.getComponent('GameManager')?.finishUI.active){
                this.gameManager.getComponent('GameManager')?.finishGame();
            }
        }
    }
}
