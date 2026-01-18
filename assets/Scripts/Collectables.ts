import { _decorator, Component, Node, math, UITransform } from 'cc';
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

    
    private coinHalfW = 0;
    private coinHalfH = 0;

    private playerHalfW = 0;
    private playerHalfH = 0;

    start() {
        if (this.typeCol == "Cash"){
            this.value = 20;
        }
        if (this.typeCol == "Paypal") {
            this.value = Math.round(math.randomRange(9, 30))
        }

        const coinTransform = this.node.getComponent(UITransform);
        if (coinTransform) {
            this.coinHalfW = coinTransform.width / 8;
            this.coinHalfH = coinTransform.height / 8;
        }
    }

    update() {
        
        if (Math.abs(this.player.position.x - this.node.position.x) < this.coinHalfW &&
            Math.abs(this.player.position.y - this.node.position.y) < this.coinHalfH) {    
            console.log('Added: ', this.value);
            this.gameManager.getComponent('GameManager')?.addScore(this.value);
            this.gameManager.getComponent('GameManager').audioManager.playCoin();
            this.node.destroy();
        }
    }
}
