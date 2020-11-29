import RenderPixel from './renderPixel'
import RenderTask from './renderTask'

function render(task: RenderTask) {

  const { pixels, width, height } = task
  const len = 400

  let res = new RenderTask([], width, height)


  function doTask(i: number) {

    for (let j = 0; j < len && ((i + j) < pixels.length); j++) {
      RenderPixel(pixels[i + j], width, height)
      res.pixels.push(pixels[i + j])
    }

    ;(<any>postMessage)({
      method: 'partComplete',
      args: [res]
    })

    res = new RenderTask([], width, height)

    if ((i + len) < pixels.length) {
      return requestAnimationFrame(() => {
        doTask(i + len)
      })

    } else {
      ;(<any>postMessage)({
        method: 'allComplete',
        args: [res]
      })
    }
  }

  doTask(0)
}

const appMsg: { [key: string]: Function } = {
  render
}

onmessage = function(e) {
  const { method, args = [] } = e.data

  if (appMsg[method]) {
    appMsg[method](...args)
  } else {
    console.log(`taskWorker: can't find method (${method})`)
  }
}
