import { _decorator, Component, Label, Sprite, Color } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    @property(Label)
    scoreLabel: Label = null!;

    @property([Sprite])
    hearts: Sprite[] = [];

    private score = 0;
    private lives = 3;

    setScore(value: number) {
        this.score = value;
        this.scoreLabel.string = "$"+this.score.toString();
    }

    setLives(value: number) {
        this.lives = value;

        for (let i = 0; i < this.hearts.length; i++) {
            this.hearts[i].color =
                i < this.lives
                    ? Color.WHITE
                    : new Color(255, 255, 255, 100);
        }
    }
}
