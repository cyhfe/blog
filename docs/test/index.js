function SuperType(name) {
  this.name = name
  this.colors = ["red", "blue", "green"]
}
SuperType.prototype.sayName = function () {
  console.log(this.name)
}
function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}
// 第二次调用SuperType()
SubType.prototype = new SuperType() // 第一次调用SuperType() 6 SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
  console.log(this.age)
}
