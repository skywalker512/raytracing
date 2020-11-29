import type { Px } from './index'
/**
 * 渲染任务，包含了像素点之类的信息
 */
export default class RenderTask {
  pixels: Px[]
  width: number
  height: number

  constructor(pixels: Px[], width: number, height: number) {
    this.pixels = pixels
    this.height = height
    this.width = width
  }
}
