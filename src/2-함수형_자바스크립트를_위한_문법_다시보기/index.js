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

/* 유명함수 표현식 */
var f1 = function () {
  console.log(f1);
};

/* 익명함수에서 함수 자신을 참조하는 방법들 */
var f1 = function () {
  console.log(f1);
};
f1();
/* 위험 상황 */
var f2 = f1;
f1 = " h1 ~~";
f2();

/* 익명함수에서 함수 자신을 참조하는 방법2 */
/* ES5 Level 이상의 strict mode에선 calle 불가 ❌ */
// var f1 = function () {
//   console.log(arguments.callee);
// };

// f1();

/* 호이스팅 활용하기 */
function add(a, b) {
  return valid() ? a + b : new Error("에러");

  function valid() {
    return Number.isInteger(a) && Number.isInteger(b);
  }
}

console.log(add(10, 5)); // 15
console.log(add(10, "b")); // Error("에러")

var f1 = function f() {
  console.log(f);
};
f1();

var f2 = f1;
f1 = null;
f2();

/* 유명함수 식에서 함수 이름은 내부 스코프에서만 참조가능하다 */
var hi = 1;
var hello = function hi() {
  console.log(hi);
};
hello();
/* 아래 함수가 콘솔로그에 찍힌다 */
// function hi() {
//     console.log(hi);
// }

/* 깊이를 가진 배열을 펴주는 flatten 함수 */
function flatten(arr) {
  return (function f(arr, new_arr) {
    arr.forEach(function (v) {
      Array.isArray(v) ? f(v, new_arr) : new_arr.push(v);
    });
    return new_arr;
  })(arr, []);
}
console.log(flatten([1, [2], [3, 4]])); // [1,2,3,4]
console.log(flatten([1, [2], [[3, 4, [5, 6]]]])); // [1,2,3,4,5,6]

/* 함수 실행과 인자 그리고 점 다시 보기 */
/* 인자, this, arguments 출력 */
function test(a, b, c) {
  console.log(a, b, c);
  console.log(this);
  console.log(arguments);
}

test(10);

/* 인자는 일반변수 혹은 객체와 약간 다르게 동작하는 부분 존재 */
function test2(a, b) {
  b = 10;
  console.log(arguments);
}
test2(1); // [1]
test2(1, 2); // [1,10]

/* 객체의 값과 변수의값 */
var obj1 = {
  0: 1,
  1: 2,
};
console.log(obj1);

var a = obj1[0];
var b = obj1[1];
b = 10;

/* obj1의 값은 바뀌지 않는다 */
console.log(obj1); // { 0 : 1 , 1: 2}
console.log(obj1[1]); // 2

/* b만 바뀐다 */
console.log(b); // 10

/* 반대로 확인해보기 */
function test3(a, b) {
  arguments[1] = 10;
  console.log(b);
}
test3(1, 2); // 10

/* 메서드로 만들기 */
var o1 = {name: "seju"};
o1.test = test;
o1.test(3, 2, 1);

var o1_test = o1.test;
o1_test(5, 6, 8);

/* call/apply 다시보기 */
function callOrApplyTest(a, b, c, ...rest) {
  console.log(this);
  console.log(rest);
  console.log(a, b, c);
}
callOrApplyTest.call(undefined, 1, 2, 3); // window
callOrApplyTest.call(null, 1, 2, 3); // window
callOrApplyTest.call(void 0, 1, 2, 3); // window

callOrApplyTest.call(o1, 1, 2, 3); // {name : 'seju'}
callOrApplyTest.call(1000, 1, 2, 3); // 1000

/* apply */
callOrApplyTest.apply(o1, {0: "suwan", 1: "seju", 2: "seoul", length: 3});

/* call의 실용적 사례 */
var slice = Array.prototype.slice;
function convertArray(data) {
  return slice.call(data);
}
function rest(data, n) {
  return slice.call(data, n || 1);
}

var arr1 = convertArray({0: 1, 1: 2, length: 2});
console.log(arr1); // [1,2]
arr1.push(3);
console.log(arr1); // [1,2,3]

/*  함수 실행 괄호의 마법과 비동기 */

var add = function (a, b, callback) {
  setTimeout(() => {
    callback(a + b);
  }, 1000);
};

var sub = function (a, b, callback) {
  setTimeout(() => {
    callback(a - b);
  }, 1000);
};

var div = function (a, b, callback) {
  setTimeout(() => {
    callback(a / b);
  }, 1000);
};

/* **위의 코드는 아래 처럼 중첩 실행할 수 없다** */
// console.log(div(sub(add(10, 15), 5), 10));

/* 함수를 감싸 없던 공간 만들기 */
function wrap(func) {
  return function () {
    return func.apply(null, arguments);
  };
}

/* wrap으로 감싸 리팩토링 */
var add = wrap(function (a, b, callback) {
  setTimeout(() => {
    callback(a + b);
  }, 1000);
});

add(5, 10, function (r) {
  console.log(r); // 15
});

function _async(func) {
  return function () {
    arguments[arguments.length++] = function (result) {
      _callback(result);
    };
    func.apply(null, arguments);

    var _callback;
    function _async_cb_receiver(callback) {
      _callback = callback;
    }
    return _async_cb_receiver;
  };
}

var add = _async(function (a, b, callback) {
  setTimeout(() => {
    callback(a + b);
  }, 1000);
});

add(
  20,
  30
)(function (r) {
  console.log(r); // 50
});
