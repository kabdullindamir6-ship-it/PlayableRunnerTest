import { _decorator, Component, Node, Vec3 } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('MovableObstacle')
export class MovableObstacle extends Component {
   
    @property
    speed: number = 150;

    @property({ type: GameManager })
        gameManager: GameManager = null!;
    

    update (dt: number) {
        if (this.gameManager.isPaused) return;
        const pos = this.node.position;

        this.node.setPosition(
            pos.x - this.speed * dt,
            pos.y,
            pos.z
        );
    }   
}


