import { _decorator, Component, Canvas, Node } from 'cc';
import { UIManager } from './UIManager';
import { Player } from './Player';
import { AudioManager } from './AudioManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property
    score: number = 0;

    @property({ type: UIManager })
    ui: UIManager = null!;
    
    @property({ type: Node })
    finishUI: Node = null;

    @property({ type: Player })
    player: Player = null!;

    @property({ type: AudioManager })
    audioManager: AudioManager = null!;

    @property
    score: number = 0;

    @property({ type: Node })
    tutorialUI: Node = null!;

    @property
    isPaused:boolean = true;
    tutorialStep: number = 0; 

    start() {
        this.startFirstTutorial();
    }

    startFirstTutorial() {
        this.isPaused = true;
        this.player.canMove = false;
        this.player.canJump = false;

        this.tutorialUI.getComponent('TutorialUI')?.show('Tap to start');
    }

    startSecondTutorial() {
        this.isPaused = true;
        this.player.canJump = false;

        this.tutorialUI.getComponent('TutorialUI')?.show('Tap to jump');
    }
    
    finishGame() {
        this.player.isStopped = true;
        this.isPaused = true;
        this.finishUI.active = true;

        this.finishUI.getComponent('FinishUI')?.show(this.score);
    }

    addScore(value: number) {
        this.score += value;
        console.log('Score: ', this.score);
        this.ui.setScore(this.score);
    }
    

}
