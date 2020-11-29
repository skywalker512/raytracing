import RenderTask from './renderTask'

const height = 400
const width = 800

const canvas = document.getElementsByTagName('canvas')[0]
canvas.height = height
canvas.width = width

const ctx = canvas.getContext('2d')
const bar = document.getElementById('processline') as HTMLElement


/**
 * 一个点的坐标信息和 rgba 值
 */
export class Px {
  r: number
  g: number
  b: number
  a: number

  constructor(public x: number, public y: number) {
    this.r = this.g = this.b = this.a = 0
  }
}

//:ImageData
let imageData = ctx?.createImageData(width, height) as any
let complete = 0

function performTask(task: RenderTask, amount: number) {
  const worker = new Worker('./_dist_/task.worker.js', { type: 'module' })

  worker.postMessage({
    method: 'render',
    args: [task]
  })


  const taskMsg: { [key: string]: Function } = {
    partComplete(worker: Worker, task: RenderTask) {
      task.pixels.forEach((v, i) => {
        const position = (v.x + v.y * task.width) * 4
        imageData.data[position] = v.r
        imageData.data[position + 1] = v.g
        imageData.data[position + 2] = v.b
        imageData.data[position + 3] = v.a
      })
      complete += task.pixels.length
      bar.style.width = (complete / amount) * 100 + '%'
      ctx?.putImageData(imageData, 0, 0)
    },

    allComplete(worker: Worker, task: RenderTask | null) {
      if (task) {
        task.pixels.forEach((v, i) => {
          const position = (v.x + v.y * task.width) * 4
          imageData.data[position] = v.r
          imageData.data[position + 1] = v.g
          imageData.data[position + 2] = v.b
          imageData.data[position + 3] = v.a
        })
        complete += task.pixels.length
        bar.style.width = (complete / amount) * 100 + '%'
      }
      ctx?.putImageData(imageData, 0, 0)
      worker.terminate()
    }
  }

  worker.onmessage = function(res: {
    data: { method: string; args: any[] }
  }) {
    const { method, args } = res.data

    if (taskMsg[method]) {
      taskMsg[method](worker, ...args)
    } else {
      alert(`app : can't find method (${method})`)
    }
  }

}

/**
 * 进行一些初始化操作，并派发 RenderTask
 * @param ctx
 * @param width
 * @param height
 * @param amount 分的 task 数量
 */
function initTasks(
  ctx: CanvasRenderingContext2D | null,
  width: number,
  height: number,
  amount: number
) {
  const n = width * height
  const len = Math.ceil(n / amount)

  // 创建一个二维数组，存放 2d 像素点
  const pixels: Px[][] = []
  // 构建二维数组
  for (let y = 0; y < height; y++) {
    pixels.push([])
    for (let x = 0; x < width; x++) {
      pixels[y].push(new Px(x, y))
    }
  }

  let task = new RenderTask([], width, height)
  while (pixels.length) {
    // 随机取一个 y
    const y = Math.floor(Math.random() * (pixels.length - 0.0001))
    // 选取一行
    const pxs = pixels[y]
    // 随机取一个 x, 且不会取到最后一个
    const x = Math.floor(Math.random() * (pxs.length - 0.0001))
    // 选取一个像素点
    const px = pxs.splice(x, 1)[0]

    task.pixels.push(px)
    // 删除一行
    if (pxs.length == 0) pixels.splice(y, 1)

    if (task.pixels.length >= len || pixels.length == 0) {
      performTask(task, n)
      task = new RenderTask([], width, height)
    }
  }
}

initTasks(ctx, width, height, 4)
