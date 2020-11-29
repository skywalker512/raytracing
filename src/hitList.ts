import type hitable from './hitable.interface'
import type { HitResult } from './hitable.interface'
import type HitRecord from './hitRecord'
import type Ray from './ray'

export default class HitList {

  list: hitable[]

  constructor(...arg: hitable[]) {
    this.list = arg
  }

  hit(ray: Ray, t_min: number, t_max: number) {
    let closest_t = t_max,
      res: HitResult | undefined = undefined

    this.list.forEach(v => {
      let _res = v.hit(ray, t_min, t_max)
      if (_res && (_res[0].t < closest_t)) {
        res = _res
        closest_t = res[0].t
      }

    })

    return res as HitResult | undefined
  }

}
