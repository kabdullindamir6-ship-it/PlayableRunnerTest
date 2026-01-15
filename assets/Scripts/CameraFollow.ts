import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FollowCamera')
export class FollowCamera extends Component {

    @property({ type: Node })
    target: Node | null = null;

    @property
    smoothSpeed: number = 5;

    @property({ type: Vec3 })
    offset: Vec3 = new Vec3(200, 0, 0);

    private fixedY: number = 0;

    start() {
        this.fixedY = this.node.position.y;
    }

    update(dt: number) {
        if (!this.target) return;

        const targetPos = this.target.position;

        const desiredPos = new Vec3(
            targetPos.x + this.offset.x, 
            this.fixedY,                  
            this.node.position.z
        );

        this.node.position = this.node.position.lerp(
            desiredPos,
            dt * this.smoothSpeed
        );
    }
}
