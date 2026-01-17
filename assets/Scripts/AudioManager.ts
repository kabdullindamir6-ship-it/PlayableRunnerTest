import { _decorator, Component, AudioClip, AudioSource, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {

    @property(AudioSource)
    audioSource: AudioSource = null!;

    @property(AudioClip)
    bgm: AudioClip = null!;

    @property(AudioClip)
    jump: AudioClip = null!;

    @property(AudioClip)
    coin: AudioClip = null!;

    @property(AudioClip)
    damage: AudioClip = null!;

    @property(AudioClip)
    finish: AudioClip = null!;

    @property(AudioClip)
    fail: AudioClip = null!;

    start() {
        this.playBGM();
    }

    playBGM() {
        if (this.bgm) {
            this.audioSource.clip = this.bgm;
            this.audioSource.loop = true;
            this.audioSource.play();
        }
    }

    playJump() {
        this.audioSource.playOneShot(this.jump);
    }

    playCoin() {
        this.audioSource.playOneShot(this.coin);
    }

    playDamage() {
        this.audioSource.playOneShot(this.damage);
    }

    playFinish() {
        this.audioSource.playOneShot(this.finish);
    }

    playFail() {
        this.audioSource.playOneShot(this.fail);
    }
}
