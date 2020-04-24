export function createFileReader (file) {
  return new Promise((resolve) => {
    // 新建一个FileReader
    let reader = new FileReader()
    // 读取文件,保存为base64 格式
    reader.readAsDataURL(file)
    // 读取完文件之后会回来这里
    reader.onload = function () {
      resolve(this.result)
    }
    reader.onerror = function () {
      resolve(null)
    }
  })
}
