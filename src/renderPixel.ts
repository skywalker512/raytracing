import type { Px } from './index'
import Camera from './camera'
import Vec3 from './vec3'
import Sphere from './sphere'
import HitList from './hitList'
import type Ray from './ray'

const ball = new Sphere(new Vec3(0, 0, -1), 0.5)
const balll = new Sphere(new Vec3(1, 0, -1), 0.5)
const ballll = new Sphere(new Vec3(-1, 0, -1), 0.5)
const earth = new Sphere(new Vec3(0, -100.5, -1), 100)


const world = new HitList(
  // @ts-ignore
  ball, balll, ballll, earth
)

const camera = new Camera(
  new Vec3(0, 0, 1), //origin
  new Vec3(-2, -1, -1), //leftBottom
  new Vec3(4, 0, 0), //horizontal
  new Vec3(0, 2, 0) //vertical
)

function trace(sence: HitList, r: Ray, step = 0): Vec3 {

  if (step > 50) return new Vec3(0, 0, 0)

  const hit = sence.hit(r, 0.0000001, Infinity)

  let res: Vec3


  if (hit) {
    res = trace(sence, hit[1], ++step).mul(0.5)
  } else {
    // 设置背景色
    // unitDirection 单位向量
    const unitDirection = r.direction.unitVec(),
      // 计算出一个关于 y 坐标的相关数
      t = (unitDirection.e1 + 1.0) * 0.5

    // 计算出一个渐变的颜色值
    res = Vec3.add(
      new Vec3(1, 1, 1).mul(1 - t),
      new Vec3(0.3, 0.5, 1).mul(t)
    )
  }
  return res
}

function color(_x: number, _y: number) {
  // 反转 y 坐标，因为 canvas 的 y 左手系是相反的
  const [x, y] = [_x, 1 - _y]

  const r = camera.getRay(x, y)

  const res = trace(world, r)

  return [res.e0, res.e1, res.e2]
}

const n = 50

export default function renderPixel(
  v: Px,
  width: number,
  height: number) {

  ;[v.r, v.g, v.b, v.a] = (new Array(n))
    .fill(0)
    .map(_ => color((v.x + Math.random()) / width, (v.y + Math.random()) / height))
    .reduce((res, v) => res.map((item, i) => item += v[i]), [0, 0, 0])
    .map(v => Math.floor(v / n * 255.99))
    .concat([255])
}
