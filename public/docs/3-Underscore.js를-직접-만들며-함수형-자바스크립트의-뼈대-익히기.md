# 3장 : Underscore.js를 직접 만들며 함수형 자바스크립트의 뼈대 익히기

## 3-1. Underscore.js 소개

**[Underscore.js](https://underscorejs.org/)는 함수형 자바스크립트 라이브러리이다.**

- 113개 가량의 함수를 제공
- 데이터를 다루는 자바스크립트 라이브러리 대부분은 Underscore 및 lodash 라이브러리 사용

**특징은?**

- 내부 함수들은 간결하고 단순하며 아주 작다.
  - 하나하나 하는일은 매우 작지만 함수들 사이에 활용성이 뛰어나다.
  - 함수의 결과가 또 다른 함수의 인자와 어울리며, 함수들과의 연계가 뛰어나다.
- 웹브라우저, nodejs 둘다의 환경에서도 사용가능

<br />

### 3-1-1 Underscore.js 살펴보기

```js
/* 3.1.1 Undersocr.js 간단히 써보기 */
console.log(
  _.each([1, 2, 3], (value, index, list) => console.log(value, index, list))
);

/* forEach와 차이점은? */
console.log([1, 2, 3].forEach((val, idx, arr) => console.log(val, idx, arr)));
```

![alt text](src/assets/forEach-diff.png)

**1. 리턴값이 다르다.**

- 언더스코어의 `_.each` 함수는 자신이 받았던 첫번째 인자(여기선 [1,2,3])을 그대로 반환한다.
- 반면 `forEach` 메서드는 `undefined`를 리턴한다.

**2. 사용 가능한 값의 종류가 \_.each가 더 유연하다.**

- 언더스코어 `._each` 함수는 유사배열객체 등에 대해서도 순회가 가능하지만,
- `forEach` 메서드는 배열에 한해서만 사용이 가능하다.

<br />

**_.reject, _.contains, \_.isArray**

- 아래 코드에서 `._reject`는 첫번째 인자로 list를 받고 두번째 인자로 list에 대한 조건을 검사해 남아 있는 값이 담긴 **새로운** 리스트를 리턴한다.

- `_.contains`는 첫번째 인자에 대해 두번째 인자와 동일한 값이 포함되어 있는지 `Boolean`값을 리턴한다.

- `_.isArray`는 주어진 인자의 객체의 타입이 배열이 맞는지에 대한 `Boolean`값을 리턴한다.

```js
/* _.reject, _.contains, _.isArray */

const list = [1, 2, 3, 4, 5, 6];

console.log(_.reject(list, (value) => value % 2 === 0));

console.log(list); // [1, 2, 3, 4, 5, 6];

console.log(_.contains(list, 3)); // true

console.log(_.isArray(list)); // true
```

**객체에 대한 Undescore.js 관점**

```js
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
```

<br />

### \_.negate

- 해당 함수는 원래 함수의 결과를 반대로 바꾸는 **함수를** 리턴

```js
/* _.negate */
const equal5 = (a) => {
  return a === 5;
};
console.log(equal5(5)); // true
/* _.negate 적용 후 */
const negate5 = negate(equal5);
console.log(negate5(5)); // false
```

**\_.negate 실제 구현부**

```js
_.negate = (func) => {
  return function () {
    return !func.apply(this, arguments); // 받아온 함수를 실행 후 !한다.
  };
};
```

<br />

### Underscore 체이닝

- 2번째에서 `._chain` 함수의 `value()`로 최종값을 얻어내었다.
- 체인방식으로 코드 작성시 위에서 아래로 순차적으로 코드를 읽어나갈 수 있어 가독성이 증가한다.
- `.value()`를 실행하기 전까지 메서드를 계속 체이닝할 수 있게된다.

```js
/* Underscore 체이닝 */

/* 1. 함수형 방식 */
const underscoreChain = filter(
  map([1, 2, 3], (val) => val * 2),
  (val) => val <= 4
);

console.log(underscoreChain); // [2,4]

/* 2. Underscore _.chain 함수를 사용하는 방식 */
const underScoreChain2 = chain([1, 2, 3])
  .map((n) => n * 2)
  .filter((n) => n <= 4)
  .value();
console.log(underScoreChain2); // [2,4]
```

<br />
