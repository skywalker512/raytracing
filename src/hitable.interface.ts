import type Ray from './ray'
import type HitRecord from './hitRecord'

export default interface HitableInterface {
  /**
   * 和光线发生作用
   * @param ray 光线
   * @param t_min 时间范围
   * @param t_max 时间范围
   */
  hit: (
    ray: Ray,
    t_min: number,
    t_max: number
  ) =>
    [HitRecord,Ray]
}

type HitResult = [HitRecord,Ray]

export {
  HitResult
}
