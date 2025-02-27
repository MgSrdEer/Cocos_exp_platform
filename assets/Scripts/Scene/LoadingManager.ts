import { _decorator, Component, director, Node, instantiate, log, Prefab, ProgressBar } from 'cc'
const { ccclass, property, type } = _decorator

@ccclass('LoadingManager')
export class LoadingManager extends Component {
  @type(Prefab)
  public spritePrefab: Prefab = null!

  private totalNum = 11
  private i = 0

  onLoad() {
    director.preloadScene('Battle')
  }

  start() {
    this.schedule(this.addParticle, 1)
  }

  addParticle() {
    if (this.totalNum > 0) {
      const particle = instantiate(this.spritePrefab)
      particle!.parent = this.node
      particle!.setPosition(-250 + this.i * 50, 0)
      log(-540 + this.i * 50)
      this.i++
      this.totalNum--
    }
  }
}
