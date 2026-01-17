import { _decorator, Component, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOverUI')
export class GameOverUI extends Component {

    @property({ type: Node })
    failImage: Node = null!;

    @property({ type: Node })
    failUI: Node = null!;

    @property({ type: Node })
    finishUI: Node = null!; 

    @property
    failDuration: number = 2; 

    show() {
        this.failUI.active = true;

        this.failImage.scale = new Vec3(0.5, 0.5, 0.5);
        tween(this.failImage)
            .to(0.8, { scale: new Vec3(1, 1, 1) })
            .start();

        setTimeout(() => {
            this.failUI.active = false;
            this.finishUI.active = true;

            const finishScript = this.finishUI.getComponent('FinishUI');
            if (finishScript) finishScript.show(0);
        }, this.failDuration * 1000);
    }
}
