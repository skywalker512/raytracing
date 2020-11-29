import type hitable from "./hitable.interface";
import type HitRecord from './hitRecord'
import type Ray from './ray'

export default class HitList {

  list: hitable[]

  constructor(...arg: hitable[]) {
    this.list = arg
  }

  hit(ray: Ray, t_min: number, t_max: number) {
    let closest_t = t_max,
      hit: HitRecord | undefined = undefined

    this.list.forEach(v => {
      let _hit = v.hit(ray, t_min, t_max)
      if (_hit && (_hit.t < closest_t)) {
        hit = _hit
        closest_t = _hit.t
      }

    })

    return hit as HitRecord | undefined
  }

}
