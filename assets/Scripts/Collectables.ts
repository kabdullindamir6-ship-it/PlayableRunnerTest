import { _decorator, Component, Node, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Collectables')
export class Collectables extends Component {

    @property
    typeCol: string = "Cash"
    
    private value: number = 1;

    @property({ type: Node })
    player: Node = null!; 

    @property({ type: Node })
    gameManager: Node = null!; 

    start() {
        if (this.typeCol == "Cash"){
            this.value = 20;
        }
        if (this.typeCol == "Paypal") {
            this.value = Math.round(math.randomRange(9, 30))
        }
    }

    update() {
        
        if (Math.abs(this.player.position.x - this.node.position.x) < 30 &&
            Math.abs(this.player.position.y - this.node.position.y) < 50) {    
            console.log('Added: ', this.value);
            this.gameManager.getComponent('GameManager')?.addScore(this.value);
            this.gameManager.getComponent('GameManager').audioManager.playCoin();
            this.node.destroy();
        }
    }
}
