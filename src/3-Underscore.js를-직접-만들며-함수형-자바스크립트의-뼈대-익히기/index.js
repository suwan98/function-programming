import _, {chain, each, filter, map, negate, omit, pick} from "underscore";
import lodash from "lodash";

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

/* console.log(_.pluck(USERS, "name")); // [손흥민, 리오넬 메시, 크리스티아누 호날두 등등..]

console.log(_.first(USERS));

console.log(_.first(USERS), 2);

console.log(_.last(USERS));

console.log(_.last(USERS), 2);

console.log(_.rest(USERS), "rest 함수");

console.log(_.initial(USERS));
console.log(_.initial(USERS), 2); */

/* 객체에 대한 Undescore.js  */

/* 객체에 Values만 뽑은 새로운 배열을 Return */
console.log(_.values({id: 1, name: "ID", age: 32})); // [ 1, 'ID', 32 ]

/* 객체에 Keys만 뽑은 새로운 배열을 Return */
console.log(_.keys({id: 1, name: "ID", age: 32}));

/* 왼쪽에 있는 객체에 대해 오른쪽에 있는 객체를 덮여씌운다 */
console.log(
  _.extend(
    {id: 1, name: "ID", age: 32},
    {id: 1, name: "ID", age: 36, job: "developer"}
  )
); // { id: 1, name: 'ID', age: 36, job: 'developer' }

/* 객체에 특정 key/value를 수집한다. 인자는 key */
console.log(pick({id: 1, name: "ID", age: 32}, "id", "age")); // { id: 1, age: 32 }

/* 두번째 인자로 넘겨진 Key들을 제외한 새로이 반환된 객체를 얻는다. */
console.log(omit({id: 1, name: "ID", age: 32}, "id"));
// { name: 'ID', age: 32 }

/* _.negate */
const equal5 = (a) => {
  return a === 5;
};
console.log(equal5(5)); // true
/* _.negate 적용 후 */
const negate5 = negate(equal5);
console.log(negate5(5)); // false

/* Underscore 체이닝 */

const underscoreChain = filter(
  map([1, 2, 3], (val) => val * 2),
  (val) => val <= 4
);

console.log(underscoreChain); // [2,4]

/* Underscore _.chain 함수를 사용하는 방식 */
const underScoreChain2 = chain([1, 2, 3])
  .map((n) => n * 2)
  .filter((n) => n <= 4)
  .value();
console.log(underScoreChain2); // [2,4]

/* take를 통한 지연평가 예시 */

const MOCK_LIST = _.range(50); // 1부터 49까지의 배열 생성

let lodash_i = 0;
const results2 = lodash
  .chain(MOCK_LIST)
  .filter((num) => {
    lodash_i++;
    return num % 2 === 0;
  })
  .take(5)
  .value();
console.log(results2);
