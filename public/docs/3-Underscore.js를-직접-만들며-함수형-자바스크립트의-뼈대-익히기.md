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
