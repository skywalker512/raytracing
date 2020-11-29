import Vec3 from "./vec3"

export default class HitRecord {
  /**
   * 碰撞记录
   * @param t 时间参数t
   * @param p 发生碰撞的坐标 p
   * @param normal 发生碰撞时的法线方向 normal
   */
  constructor(
    public t: number = 0,
    public p: Vec3 = new Vec3(0, 0, 0),
    public normal: Vec3 = new Vec3(0, 0, 0)) {
  }
}
