import type Ray from './ray'
import type HitRecord from './hitRecord'

export default interface HitableInterface {
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
