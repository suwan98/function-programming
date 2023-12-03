let a = 10;
let b = 20;
/* f1 함수는 클로저가 아니다  */
function f1() {
  return a + b;
}

console.log(f1()); // 30

/* f3함수는 클로저일까? */
function f2() {
  let a = 10;
  let b = 20;
  function f3(c, d) {
    return c + d;
  }
  return f3;
}

/* f4 함수는 클로저 일까? */
function f4() {
  const a = 10;
  const b = 20;

  return function f5() {
    return a + b;
  };
  return f5();
}

console.log(f4());

/* 리얼 클로저 */
function realClosuer() {
  const a = 10;
  function f7(b) {
    return a + b;
  }
  return f7;
}
var f8 = realClosuer();
console.log(f8(2));

/* 클로저 사용 예시 */
const users = [
  {id: 1, name: "하종훈", age: 25},
  {id: 2, name: "박정아", age: 28},
  {id: 3, name: "이재남", age: 27},
];

const userList = document.createElement("ul");
userList.classList.add("user-list");
document.body.appendChild(userList);

const map = (list, iterator) => {
  const new_list = [];
  for (let i = 0; i < list.length; i++) {
    new_list.push(iterator(list[i]));
  }
  return new_list;
};
map(users, (user) => {
  const listItem = document.createElement("li");
  listItem.textContent = user.name;

  const button = document.createElement("button");
  button.textContent = "View";
  button.addEventListener("click", function () {
    alert(`User: ${user.name}, Age: ${user.age}`);
  });

  listItem.appendChild(button);
  userList.appendChild(listItem);
});
