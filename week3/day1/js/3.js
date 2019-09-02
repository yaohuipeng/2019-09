var reg = /\d/
console.log(reg.test('n')) //查看后面的字符有没有  满足正则的字符  有就是 true  没有就是 false
console.log(reg.test('15n123'))

console.log('******************************************')
var reg2 = /\D/
console.log(reg2.test('nsad'))
console.log(reg2.test('na21sad'))
console.log(reg2.test('ns0ad'))
console.log(reg2.test('n315ad'))
console.log(reg2.test('15n123'))

console.log('******************************************')
var reg3 = /\w/
console.log(reg3.test('nsad'))
console.log(reg3.test('na21sad'))
console.log(reg3.test('ns0ad'))
console.log(reg3.test('n315ad'))
console.log(reg3.test('15n123'))

console.log('******************************************')
var reg4 = /\W/
console.log(reg4.test('nsad'))
console.log(reg4.test('na21sad'))
console.log(reg4.test('ns0ad'))
console.log(reg4.test('n415ad'))
console.log(reg4.test('15n123'))

console.log('******************************************')
var reg5 = /^\d/
console.log(reg5.test('nsad'))
console.log(reg5.test('na21sad'))
console.log(reg5.test('1ns0ad'))
console.log(reg5.test('6n415ad'))
console.log(reg5.test('15n123'))

console.log('******************************************')
var reg5 = /\d$/
console.log(reg5.test('nsad'))
console.log(reg5.test('na21sad'))
console.log(reg5.test('1ns0ad'))
console.log(reg5.test('6n415ad'))
console.log(reg5.test('15n123'))

console.log('******************************************')
var reg5 = /^\d$/
console.log(reg5.test('nsad'))
console.log(reg5.test('na21sad'))
console.log(reg5.test('1ns0ad'))
console.log(reg5.test('6n415ad'))
console.log(reg5.test('15n123'))
console.log(reg5.test('15123'))
console.log(reg5.test('1'))

console.log('******************************************')
var reg6 = /\./
console.log(reg6.test('nsad'))
console.log(reg6.test('na21sad'))
console.log(reg6.test('1ns0ad'))
console.log(reg6.test('6n41.5ad'))
console.log(reg6.test('15n.123'))
console.log(reg6.test('151.23'))
console.log(reg6.test('1'))

console.log('******************************************')
var reg7 = /[0-9a-zA-Z]/
var reg8 = /18|19/
var reg9 = /hello(?=qqq)/
console.log(reg9.test('helloqqq'))
console.log(reg9.test('helloqwq'))
console.log(reg9.test('hello'))
