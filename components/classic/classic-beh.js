// Behavior是用于组件间代码共享的特性
let classicBeh = Behavior({
  // 同组件的属性
  properties: {
    image: String,
    content: String
  }
})

export { classicBeh }