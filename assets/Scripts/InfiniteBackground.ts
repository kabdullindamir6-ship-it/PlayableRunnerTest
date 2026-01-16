import { _decorator, Component, Node, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('InfiniteBackground')
export class InfiniteBackground extends Component {

    @property({ type: Node })
    target: Node | null = null;

    @property
    bgWidth: number = 1706; 

    private backgrounds: Node[] = [];

    start() {
        this.backgrounds = this.node.children;
    }

    update() {
        for (let bg of this.backgrounds) {
            if (bg.worldPosition.x + this.bgWidth < this.target.worldPosition.x - view.getVisibleSize().width/2) {
                bg.setWorldPosition(
                    bg.worldPosition.x + 4*this.bgWidth,
                    bg.worldPosition.y,
                    bg.worldPosition.z
                );
            }
        }
    }
}
