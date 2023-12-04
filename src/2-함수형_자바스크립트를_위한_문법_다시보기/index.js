/* 다양한 key/value 정의 방법 */
var obj = {a: 1, b: 2};
obj.c = 3;
obj["d"] = 4;
var e = "e";
function f() {
  return "f";
}
obj[f()] = 6;
console.log(obj); // { a: 1, b: 2, c: 3, d: 4, f: 6 }

/* 띄어쓰기,특수문자, 숫자 */
var obj2 = {" a a a ": 1};
obj2["b b  bb"] = 2;
console.log(obj2); // { ' a a a ': 1, 'b b  bb': 2 }

/* 특수 문자를 사용해도 key로 만들 수 있다 */
var obj3 = {"margin-top": 5};
obj3["padding-top"] = 20;
console.log(obj3); // { 'margin-top': 5, 'padding-top': 20 }

/* 숫자도 Key로 사용할 수 있다 */
var obj4 = {1: 10};
obj4[2] = 20;
console.log(obj4); //  { 1: 10, 2: 20 }

/* {} [] 차이점 */
/* Error */
// var obj5 = {{ true ?"a": "b"}: 1};

/* Valid */
var obj6 = {};
obj6[true ? "a" : "b"] = 1;
console.log(obj6); //  { a: 1 }

/* 함수나 배열에 담기 */
/* 함수의 객체로 사용 */
function obj8() {}
obj8.a = 1;
obj8.b = 2;
console.log(obj8.a); // 1
console.log(obj8.b); // 2

/* 배열에 숫자가 아닌 key 사용 */
var obj10 = [];
obj10.a = 1;
console.log(obj10);

/* length 참조 */
var obj13 = [1, 2, 3];
console.log(obj13["length"]); // 3

/* 에러가 나는 상황이지만 호이스팅이다 */
add1(10, 5);
// add2(10, 5); // Error : TypeError: add2 is not a function

/* 일반적인 함수 정의 */
function add1(a, b) {
  return a * b;
}
var add2 = function (a, b) {
  return a + b;
};
var m = {
  add3: function (a, b) {
    return a + b;
  },
};

!(function (bool) {
  console.log(bool);
})(false);

((a) => {
  console.log(false);
})(1);
