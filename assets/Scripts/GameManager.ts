import { _decorator, Component } from 'cc';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property
    score: number = 0;

    @property({ type: UIManager })
    ui: UIManager = null!;

    addScore(value: number) {
        this.score += value;
        console.log('Score: ', this.score);
        this.ui.setScore(this.score);
    }

}
