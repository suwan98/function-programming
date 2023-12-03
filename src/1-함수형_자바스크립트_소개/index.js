export * from "./closure";
import _ from "underscore";

/* 함수형 자바스크립트를 검색하면 나오는 예제 */
/* addMaker 함수 */
function addMaker(a) {
  return (b) => a + b;
}

console.log(addMaker(5)(10)); // 15

/* add5 함수 */
const add5 = addMaker(5);
console.log(add5(3)); // 8

/* 값으로써 함수 */
const value100 = 100;
const value2 = function () {};
function f1() {
  return 100;
}
function f2() {
  return function () {};
}

/* 함수형 자바스크립트의 실용성 */

/* 회원 목록 중 여러명 찾기 */
const users = [
  {id: 1, name: "손흥민", age: 32},
  {id: 2, name: "박지성", age: 25},
  {id: 3, name: "차범근", age: 32},
  {id: 4, name: "황의조", age: 28},
  {id: 5, name: "염기훈", age: 27},
  {id: 6, name: "기성용", age: 32},
  {id: 7, name: "박주영", age: 24},
];

/* Users에서 age가 30미만인 user가 몇명인지 출력 */
let temp_users = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age < 30) {
    temp_users.push(users[i]);
  }
}
console.log(temp_users.length); // 4

/* 그들이 나이만 모아 다시 출력 */
let ages = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age < 30) {
    ages.push(users[i].age);
  }
}
console.log(ages); // [25, 28, 27, 24]

/* 나이가 30살 이상인 temp_users가 몇명인지 출력 */
for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 30) {
    temp_users.push(users[i]);
  }
}
console.log(temp_users.length); // 7

/* 3에서 그들의 이름만 모아서 출력 */
let names = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 30) {
    names.push(users[i].name);
  }
}
console.log(names); // [손흥민, 차범근, 기성용]

/* for에서 filter로 if에서 predicate로 */
/* filter 함수 */
function filter(list, predicate) {
  let new_list = [];
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) new_list.push(list[i]);
  }
  return new_list;
}

/* filter함수를 통한 기존 코드 리팩토링 */
const users_under30 = filter(users, (user) => user.age < 30);
console.log(users_under30.length); // 4

const users_over30 = filter(users, (user) => user.age >= 30);
console.log(users_over30.length); // 3

/* map함수를 통한 코드 리팩토링 */
function map(list, iterator) {
  let new_list = [];
  for (let i = 0; i < list.length; i++) {
    new_list.push(iterator(list[i]));
  }
  return new_list;
}
const userAges = map(users, (user) => user.age);
console.log(userAges); // [32,25,32,28,2732,24]
const userNames = map(users, (user) => user.name);
console.log(userNames); // ['손흥민', '박지성', '차범근', '황의조', '염기훈', '기성용', '박주영']

/* 실행결과로 바로 실행하기 */

const over30ages = map(
  filter(users, (user) => user.age > 30),
  (user) => user.age
);
console.log(over30ages);

/* 작은 함수를 하나 더 만들면 변수 할당을 모두 없앨 수 있게된다 */
function log_length(value) {
  console.log(value.length);
  return value;
}

/* [25, 28, 27, 24] */
console.log(
  log_length(
    map(
      filter(users, (user) => user.age < 30),
      (user) => user.age
    )
  )
);

/* [손흥민, 차범근, 기성용] */
console.log(
  log_length(
    map(
      filter(users, (user) => user.age >= 30),
      (user) => user.name
    )
  )
);

/* 함수를 리턴하는 함수 bValue */
function bValue(key) {
  return (obj) => obj[key];
}
console.log(bValue("a")({a: "a의 벨류", b: "b의 벨류"})); // a의 벨류

/* bValue 함수를 map과 함께 사용하기 */
/* [25,28,27,24] */
console.log(
  log_length(
    map(
      filter(users, (user) => user.age < 30),
      bValue("age")
    )
  )
);

/* 회원 목록 중 한명 찾기 */
/* {id: 3, name: '차범근', age: 32} */
console.log(filter(users, (user) => user.id === 3)[0]);
/* findById */
function findById(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      return list[i];
    }
  }
}
console.log(findById(users, 3)); // {id: 3, name: '차범근', age: 32}
console.log(findById(users, 5)); // {id: 5, name: '염기훈', age: 27}

/* 인자를 하나더 늘려 코드의 중복을 제거하기 */
function findBy(key, list, value) {
  for (let i = 0; i < list.length; i++) {
    if (list[i][key] === value) return list[i];
  }
}
/* key=> "id"  / list => users /  value => 3  */
console.log(findBy("id", users, 3)); // {id: 3, name: '차범근', age: 32}

/* user 객체가 메서드로 값을 얻어야하는 객체일 경우 발생하는 문제상황 */
function User(id, name, age) {
  this.getId = () => id;
  this.getName = () => name;
  this.getAge = () => age;
}

const users2 = [
  new User(1, "손흥민", 32),
  new User(2, "박지성", 25),
  new User(3, "차범근", 32),
  new User(4, "황의조", 28),
  new User(5, "염기훈", 32),
  new User(6, "기성용", 27),
  new User(7, "박주영", 24),
];

console.log(findBy("age", users2, 25)); // undeinfed

/* 인자로 키와 값 대신 함수를 사용 */
function find(list, predicate) {
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) return list[i];
  }
}

console.log(find(users2, (user) => user.getAge() === 25).getName()); // 박지성

/* 함수를 만드는 함수 bindMatch */
function bindMatch(key, value) {
  return (obj) => obj[key] === value;
}

console.log(find(users, bindMatch("id", 3))); // {id: 3, name: '차범근', age: 32}

/* bindMatch를 이용해 고차함수와 협업 */
/* bindMatch로 age가 32인 user들을 담은 배열을 반환받는다 */
console.log(filter(users, bindMatch("age", 32)));
/* [
    {
        "id": 1,
        "name": "손흥민",
        "age": 32
    },
    {
        "id": 3,
        "name": "차범근",
        "age": 32
    },
    {
        "id": 6,
        "name": "기성용",
        "age": 32
    }
] */

/* users에서 나이가 32살인 user들은 true로 아닐경우 false를 리턴한 배열을 받는다 */
console.log(map(users, bindMatch("age", 32))); // [true, false, true, false, false, true, false]

/*  key에 해당하는 value들을 비교하는 함수 */
function object(key, value) {
  let obj = {};
  obj[key] = value;
  return obj;
}
function match(obj, obj2) {
  for (let key in obj2) {
    if (obj[key] !== obj2[key]) return false;
  }
  return true;
}
function bMatch(obj2, value) {
  if (arguments.length === 2) obj2 = object(obj2, value);
  return (obj) => match(obj, obj2);
}

console.log(match(users, bMatch("id", 3), find(users, bMatch("name", "손")))); // true
console.log(find(users, (user) => user.age === 32 && user.name === "차범근")); // {id: 3, name: '차범근', age: 32}
console.log(find(users, bMatch({name: "손흥민", age: 32}))); // {id: 1, name: '손흥민', age: 32}

/* 커스텀 findIndex */
function findIndex(list, predicate) {
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) return i;
  }
  return -1;
}

console.log(findIndex(users, bMatch({name: "손흥민", age: 32}))); // 0번째
console.log(findIndex(users, bMatch({name: "손흥민", age: 35}))); // 없을경우 -1을 리턴

/* _.identity */
function _identity(value) {
  return value;
}
let a = 10;
console.log(_identity(a)); // 10

/* predicate로 _identity를 사용한 경우 */
console.log(filter([true, 0, 10, "a", false, null], _identity)); //  [true, 10, 'a']

/* some/every  만들기 */
const _some = (list) => !!find(list, _identity);
console.log(_some([0, null, 2])); // true
console.log(_some([0, null, false])); // false

const _every = (list) => filter(list, _identity).length === list.length;
console.log(_every([0, null, 2])); // false
console.log(_every([0, null, false])); // false

/* 아주 작은 함수 not,beq */
function not(value) {
  return !value;
}

function beq(a) {
  return (b) => a === b;
}

/* not은 연산자 !가 아닌 함수이므로 _findIndex와 함께 사용할 수 있게된다 */
function positive(list) {
  return find(list, _identity);
}
function negativeIndex(list) {
  return find(list, not);
}
const __some = (list) => not(not(positive(list)));
const __every = (list) => beq(-1)(negativeIndex(list));

console.log(__some([0, null, 2])); // true
console.log(__some([0, null, false])); // false
console.log(__every([0, null, 2])); // false

/* 자바스크립트 함수는 위조건을 모두 만족하는 일급함수이다 */
function f3() {}
var a1 = typeof f3 === "function" ? f3 : function () {};
console.log(a1);

/* #1.4.5 고차함수 Part */
/* 함수를 인자로 받아 대신 실행하는 함수 */
function calcWith10(value, callback) {
  return callback(10, value);
}
function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
console.log(calcWith10(10, add)); // 20
console.log(calcWith10(20, sub)); // -10

/* constant 함수 */
function constant(value) {
  return () => value;
}

const always10 = constant(10);
console.log(always10()); // 10
console.log(always10()); // 10
console.log(always10()); // 10

/* 함수를 대신 실행하는 함수를 리턴하는 함수 */
function callWith(value1) {
  return (value2, callback) => callback(value1, value2);
}

const callWith10 = callWith(10);
console.log(callWith10(20, add)); // 30
const callWith5 = callWith(5);
console.log(callWith5(5, sub)); // 0

/* callWith의 활용 */
console.log(callWith([1, 2, 3], (v) => v * 10, map));

/* bind */
function bindingAdd(a, b) {
  return a + b;
}
const bindindAdd = bindingAdd.bind(null, 10);
console.log(bindindAdd(20)); // 30
