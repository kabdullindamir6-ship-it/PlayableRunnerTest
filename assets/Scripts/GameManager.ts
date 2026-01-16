import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property
    score: number = 0;

    addScore(value: number) {
        this.score += value;
        console.log('Score: ', this.score);
    }

}
