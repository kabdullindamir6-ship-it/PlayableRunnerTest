import { _decorator, Component, Canvas, Node } from 'cc';
import { UIManager } from './UIManager';
import { Player } from './Player';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property
    score: number = 0;

    @property({ type: UIManager })
    ui: UIManager = null!;
    
    @property({ type: Node })
    finishUI: Node = null;

    @property({ type: Player })
    player: Player = null!;

    @property
    score: number = 0;

    finishGame() {
        this.player.isStopped = true;
        this.finishUI.active = true;

        this.finishUI.getComponent('FinishUI')?.show(this.score);
    }

    addScore(value: number) {
        this.score += value;
        console.log('Score: ', this.score);
        this.ui.setScore(this.score);
    }
    

}
