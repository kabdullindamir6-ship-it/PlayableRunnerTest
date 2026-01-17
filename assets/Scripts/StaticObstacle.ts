import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StaticObstacle')
export class StaticObstacle extends Component {
    
    @property
    damage: number = 1;

    @property
    triggerX: number = 40;

    @property
    triggerY: number = 60;

    @property({ type: Node })
    player: Node = null!;

    private canDamage = true;
    private damageCooldown = 1;

    update (dt: number) {
        if (!this.player || !this.canDamage) return;

        const dx = Math.abs(this.player.position.x - this.node.position.x);
        const dy = Math.abs(this.player.position.y - this.node.position.y);

        if (dx < this.triggerX && dy < this.triggerY) {
            this.damagePlayer();
        }
    }

    damagePlayer () {
        this.canDamage = false;

        const playerComp = this.player.getComponent('Player') as any;
        playerComp?.takeDamage();

        this.scheduleOnce(() => {
            this.canDamage = true;
        }, this.damageCooldown);
    }
}


