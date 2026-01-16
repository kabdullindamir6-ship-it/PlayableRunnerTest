import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MovableObstacle')
export class MovableObstacle extends Component {
   
    @property
    speed: number = 150;

    update (dt: number) {
        const pos = this.node.position;

        this.node.setPosition(
            pos.x - this.speed * dt,
            pos.y,
            pos.z
        );
    }   
}


