import _, {each} from "underscore";

/* 3.1.1 Undersocr.js 간단히 써보기 */
console.log(
  _.each([1, 2, 3], (value, index, list) => console.log(value, index, list))
);

/* forEach와 차이점은? */
console.log([1, 2, 3].forEach((val, idx, arr) => console.log(val, idx, arr)));

/* _.reject, _.contains, _.isArray */

const list = [1, 2, 3, 4, 5, 6];

console.log(_.reject(list, (value) => value % 2 === 0));

console.log(list); // [1, 2, 3, 4, 5, 6];

console.log(_.contains(list, 3)); // true

console.log(_.isArray(list)); // true

/* _.pluck, _.first, _.last, _.rest, _.lastIndexOf */

const USERS = [
  {id: 1, name: "손흥민", age: 32},
  {id: 2, name: "리오넬 메시", age: 35},
  {id: 3, name: "크리스티아누 호날두", age: 37},
  {id: 4, name: "케빈 더 브라위너", age: 31},
  {id: 5, name: "필 포든", age: 22},
  {id: 6, name: "제이든 산초", age: 22},
  {id: 7, name: "빈시우스 주니어", age: 22},
  {id: 8, name: "알폰소 데이비스", age: 21},
];

console.log(_.pluck(USERS, "name")); // [손흥민, 리오넬 메시, 크리스티아누 호날두 등등..]

console.log(_.first(USERS));

console.log(_.first(USERS), 2);

console.log(_.last(USERS));

console.log(_.last(USERS), 2);

console.log(_.rest(USERS), "rest 함수");

console.log(_.initial(USERS));
console.log(_.initial(USERS), 2);
