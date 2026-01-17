import { _decorator, Component, Node, Label, Vec3, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FinishUI')
export class FinishUI extends Component {

    @property({ type: Node })
    spinner: Node = null!;

    @property({ type: Label })
    scoreLabel: Label = null!;

    @property({ type: Label })
    timerLabel: Label = null!;
    
    @property({ type: Node })
    installButton: Node = null!;

    @property
    installPulseAmount: number = 0.1;

    @property
    installPulseDuration: number = 0.5;

    private finalScore = 0;
    private currentScore = 0;
    private timer = 60;
    private pulseTween: any = null;

    show(score: number) {
        this.finalScore = score;
        this.currentScore = 0;
        this.timer = 60;

        this.scoreLabel.string = '0';
        this.timerLabel.string = '1:00';

        this.startSpin();
        this.startInstallPulse();
    }

    startInstallPulse() {
        if (this.pulseTween) return; // если уже есть tween, не создаём новый

        const originalScale = this.installButton.scale.clone();

        this.pulseTween = tween(this.installButton)
            .to(this.installPulseDuration, { scale: new Vec3(
                originalScale.x + this.installPulseAmount,
                originalScale.y + this.installPulseAmount,
                originalScale.z
            )})
            .to(this.installPulseDuration, { scale: originalScale })
            .union()
            .repeatForever()
            .start();
    }

    startSpin() {
        tween(this.spinner)
            .by(5, { angle: 360 })
            .repeatForever()
            .start();
    }

    

    update (dt: number) {

        if (this.currentScore < this.finalScore) {
            this.currentScore += Math.ceil(this.finalScore * dt);
            if (this.currentScore > this.finalScore) {
                this.currentScore = this.finalScore;
            }
            this.scoreLabel.string = "$"+this.currentScore.toString();
        }

        if (this.timer > 0) {
            this.timer -= dt;

            const seconds = Math.max(0, Math.floor(this.timer));
            const min = Math.floor(seconds / 60);
            const sec = seconds % 60;

            this.timerLabel.string =
                `${min}:${sec < 10 ? '0' + sec : sec}`;

            if (this.timer <= 0) {
                this.timerLabel.node.active = false;
            }
        }
    }
}


