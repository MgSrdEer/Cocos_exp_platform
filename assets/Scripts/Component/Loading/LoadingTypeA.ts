import { _decorator, Component, instantiate, log, Node, ParticleSystem2D, Prefab, tween, UITransform, v3 } from 'cc'
const { ccclass, property, type } = _decorator

@ccclass('LoadingTypeA')
export class LoadingTypeA extends Component {
  @type(Prefab)
  public spritePrefab: Prefab = null!

  @type(ParticleSystem2D)
  public cursorPrefab: ParticleSystem2D = null!

  private i = 0
  private bars: any[10] = Array(10)
  private barWidth = 50
  private cursorStratpos = 0

  start() {
    this.cursorStratpos = this.cursorPrefab.node.position.x
    log(`cursorStratpos ${this.cursorStratpos}`)

    this.schedule(() => {
      this.addParticle(this.i)
      this.i += 0.1
    }, 1)
  }

  addParticle(percentage: number) {
    // 获取当前节点的 UITransform 组件
    const mainWidth = this.node.getComponent(UITransform)?.contentSize.x
    const startpos = (mainWidth * -1) / 2 + this.barWidth / 2
    const current = this.getCurrentIndex(percentage)

    // cursor 移动
    let targetX = this.getCursorPos(startpos + this.barWidth / 2, percentage, mainWidth - this.barWidth)
    tween(this.cursorPrefab.node)
      .to(1, { position: v3(targetX, this.cursorPrefab.node.position.y, 0) })
      .start()
    log(`cursor ${this.cursorPrefab.node.position.x}`)
    for (let i = 0; i < current; i++) {
      if (this.bars[i]) continue
      const particle = instantiate(this.spritePrefab)
      particle!.parent = this.node
      particle!.setPosition(startpos + i * this.barWidth, 0)
      this.bars[i] = particle
    }
  }

  getCurrentIndex(percentage: number): number {
    // 确保参数在0-1之间
    const clampedParam = Math.max(0, Math.min(1, percentage))
    // 计算并四舍五入
    const value = Math.round(clampedParam * 10)
    // 确保结果在0-10之间
    return Math.max(0, Math.min(10, value))
  }

  getCursorPos(currentpos: number, percentage: number, width: number): number {
    // 确保参数在0-1之间
    const clampedParam = Math.max(0, Math.min(1, percentage))

    return Math.max(currentpos, Math.min(currentpos + width, currentpos + clampedParam * width))
  }
}
