import type Vec3 from './vec3'
import Ray from './ray'

export default class Camera {
  /**
   * 相机沿着光线的反方向求出颜色值
   * @param origin 坐标：相机的位置
   * @param leftBottom 坐标：画面坐下脚的位置
   * @param horizontal 向量：水平向量
   * @param vertical 向量：垂直向量
   */
  constructor(public origin: Vec3, public leftBottom: Vec3, public horizontal: Vec3, public vertical: Vec3) {
  }

  /**
   * 得到光线信息
   * @param x x 坐标
   * @param y y 坐标
   */
  getRay(x: number, y: number): Ray {
    return new Ray(
      this.origin,
      this.leftBottom
        .add(this.horizontal.mul(x))
        .add(this.vertical.mul(y))
        .sub(this.origin))
  }
}
