import Vec3 from './vec3'
import type HitRecord from './hitRecord'

export default class Ray {
  /**
   * 表示光线
   * @param origin 表示光线起始位置的坐标
   * @param direction 方向
   */
  constructor(public origin: Vec3, public direction: Vec3) {
  }

  /**
   * 计算在时间参数 t 的时候光线的位置
   * @param t 时间参数
   */
  getPoint(t: number) {
    // 相当于 =》光线原始坐标加上这段时间里面光走的路程
    return this.origin.add(this.direction.mul(t))
  }

  reflect(hit: HitRecord) {
    return new Ray(hit.p, reflect(this.direction.unitVec(), hit.normal))
  }
}

// 计算出反射光线
// 先求出入射光线延法线方向的分向量，然后入射光线减去两倍这个分向量的值就是反射光方向
function reflect(v: Vec3, n: Vec3) {
  return v.sub(n.mul(Vec3.dot(v, n) * 2))
}

