// type : string, number, boolean, null, undefined, bigint,, [], {} 등

//1. 변수 타입지정 가능
let lastName: string = 'kim';
lastName = 'park';
lastName = '123';

// 타입지정 문법 생략가능 - 자동으로 지정됨
let test = 'kim';

// 변수만 만들고 할당을 해주면 자동으로 타입 지정됨
let test2;
test = 'cho';

// any 타입 : 타입실드 해제문법 = 일반 JS 변수
let test3: any;
test3 = 123;
test3 = [];

// unknown 타입 : 모든 자료형 허용, 타입 실드가 해제된 것은 아니라 any보다 안전함
let test4: unknown;
test4 = 123;
test4 = {};
// let test5 :string = test3; // test3가 any 타입이라서 타입실드가 죽은 상태라 가능해짐, 디버깅 어려움
// let test5 :string = test4; // error

// 예제
let user: string = 'kim';
let age: undefined | number = undefined;
let married: boolean = false;
let info: (string | number | undefined | boolean)[] = [user, age, married];

let school: { score: (number | boolean)[]; teacher: string; friend: string | string[] } = {
  score: [100, 97, 84],
  teacher: 'Phil',
  friend: 'John',
};
school.score[4] = false;
school.friend = ['Lee', school.teacher];

//2. Array
let nameArr: string[] = ['kim', 'park'];
nameArr = ['cho', '123'];
let testArr: (string | number)[] = ['kim', '1', 2];
let testArr2: { a: string | number } = { a: 123 };

// 3. Object
let nameObj: { name: string; age: number } = { name: 'kim', age: 27 };
// let nameObj: { name?: string } = {};
nameObj = { name: 'cho', age: 28 };

// 4. Union Type (= or)
let testName1: string[] | number = 123;
testName1 = ['kim'];

// 5. 함수 : 파라미터, return 타입지정 가능
function solution(x: number): number {
  return x * 2;
}
solution(3); // 6
solution(4); // 8

// 파라미터가 옵션일 경우 '?' 문법 (= '?.' 옵셔널체이닝)
function solution2(x?: number): number {
  return x * 3;
}
solution2();

// 함수에서 void 타입 활용가능 : return이 없을 경우, 실수로 무언가를 return 하는 것을 방지
function result(x: number): void {
  1 + 1;
}

// 연습1 : 함수
function setName(x?: string): void {
  if (x) console.log('안녕하세요 ' + x + '님.');
  else console.log('이름이 없습니다.');
}
setName(); // "이름이 없습니다."
setName('홍길동'); // "안녕하세요 홍길동님."

// 연습2 : 함수
function checkLen(x: string | number): number {
  return x.toString().length;
}
checkLen('123');
checkLen(123);

// 연습3 : 함수
function canMarriage(income: number, house: boolean, grade: string): string | void {
  let score: number = 0;
  score += income;

  if (house) score += 500;
  if (grade === '상') score += 100;
  if (score >= 600) return '결혼가능';
}
console.log(canMarriage(700, false, '중')); // 결혼가능
console.log(canMarriage(100, false, '상'));

/** Type Narrowing : if문 등으로 타입을 하나로 정해주는 것, else문 끝까지 써줘야 안전함
 ** Type이 아직 하나로 확정되지 않았을 경우
 ** union type은 연산불가이기 떄문에 사용
 ** Narrowing 판정 문법 : typeof 변수, 속성명 in 오브젝트자료, 인스턴스 instanceof 부모 */
function narrowing1(x: number | string) {
  if (typeof x === 'number') return x + 1;
  else if (typeof x === 'string') return x + 1;
  else return 0;
}
narrowing1(123);

function narrowing2(x: number | string) {
  let array: number[] = [];
  if (typeof x === 'number') {
    array[0] = x;
  }
}
narrowing2(123);

// 연습1 : Type Narrowing
function cleaningArr(x: (number | string)[]) {
  let arr: number[] = [];

  x.forEach((el) => {
    if (typeof el === 'string') arr.push(Number(el));
    else arr.push(el);
  });

  return arr;
}
console.log(cleaningArr(['1', 2, '3']));

// 연습2 : Type Narrowing
let t1 = { subject: 'math' };
let t2 = { subject: ['science', 'english'] };
let t3 = { hello: 'hi' };

function getSubject(x: { subject: string | string[] }) {
  if (typeof x.subject === 'string') return x.subject;
  else if (Array.isArray(x.subject)) return x.subject.pop();
  else return 'error';
}
console.log(getSubject(t1));
console.log(getSubject(t2));

/** Type Assertion : 타입 덮어쓰기, 변수 as 타입
1. Narrowing 할 때 사용 (union 타입일때)
2. 파라미터에 무슨 타입이 들어올지 100% 확실할 때 사용
** 디버깅할때 사용하기 좋음, 막 쓰면 좋지 않음 */
function assertion1(x: number | string) {
  let array: number[] = [];
  array[0] = x as number;
}
assertion1(123);

/*** Type alias (타입변수) : 타입이 길면 변수로 사용 가능
 ** type변수 재정의 불가능 */
type LastName = string | number | undefined;
let testName2: LastName = 'kim';
testName2 = 123;

type Animal = { name: string; age: number };
let animal1: Animal = { name: 'panda', age: 5 };

// javascript - const변수에 object자료형이 들어오면 재할당 가능
/** typescript - readonly + 속성 : 재할당 방지 가능 / 속성 변경 불가능하게 잠궈줌 */
type Friend = { readonly name: string };
const friend: Friend = { name: '서은' };
// friend.name = '현주'; // error

// alias 합치기
type Name = string;
type Age = number;
type Info = Name | Age;

type PositionX = { x: number };
type PositionY = { y: number };
type NewType = PositionX & PositionY;
let position: NewType = { x: 10, y: 20 };

// 연습1 : & 기호 (intersection type) : 속성 중복 가능
type Obj1 = { name: string };
type Obj2 = { name: string };
type NewObj = Obj1 & Obj2;
let objectTest: NewObj = { name: 'kim' };
console.log(objectTest);

// 연습2 : readonly
type MyType = { color?: string; size: number; readonly position: number[] };
let myTypeTest: MyType = { size: 500, position: [1, 2, 3] };
console.log(myTypeTest);

// 연습3 : Type alias
type Info1 = { name: string; phone: number; email: string };
let infoType: Info1 = { name: 'kim', phone: 123, email: 'abc@naver.com' };

// 연습4 : Type alias
type Info2 = { adult: boolean };
type NewInfo = Info1 & Info2;
let userInfoTest: NewInfo = { name: 'kim', phone: 18, email: 'abc@naver.com', adult: false };

/** type alias에 함수 type 저장하는 법 - 함수표현식 사용 */
type funcType = (x: string) => number;
let func: funcType = function (x) {
  return 10;
};

// 연습1 : object안에 함수 만들 수 있음
let memInfo: memType = {
  name: 'kim',
  age: 18,
  plusOne(x) {
    return x + 1;
  },
  changeName: () => {
    console.log('안녕');
  },
};
console.log(memInfo.plusOne(2));
console.log(memInfo.changeName());

type memType = {
  name: string;
  age: number;
  plusOne: (x: number) => number;
  changeName: () => void;
};

// 연습2 : 함수에 alias type
type CutType = (x: string) => string;
let cutZero: CutType = (x) => {
  let result = x.replace(/^0+/, '');
  return result;
};
console.log(cutZero('0str'));

function removeDash(x: string): number {
  let result = x.replace(/-/g, '');
  return Number(result);
}
console.log(removeDash('-1-23-.20'));

// 연습3 : 함수에 함수 넣기
type Func1Type = (x: string) => string;
type Func2Type = (x: string) => number;
function assignFunc(str: string, func1: Func1Type, func2: Func2Type) {
  let result = func1(str);
  let result2 = func2(result);
  return result2;
}
console.log(assignFunc('010-1111-2222', cutZero, removeDash));

/** Literal Types : 변수에 들어올 값을 특정지어 더욱 엄격하게 관리해줌 */
let myName: 'kim' | 'park';
myName = 'park';

function checkRSP(x: '가위' | '바위' | '보'): ('가위' | '바위' | '보')[] {
  if (x === '가위') return ['가위'];
  else if (x === '바위') return ['바위'];
  else return ['보'];
}
console.log(checkRSP('보'));

/** as const
1. 타입을 Object속성의 value로 바꿔줌
2. object안에 있는 모든 속성을 readonly로 바꿔줌
** Object자료를 완전히 잠궈 놓고 싶을때 (리터럴타입으로 고정하고 싶을때) */
let txt1 = { name: 'kim' } as const; // type = 'kim

// 6. Array에 쓸 수 있는 tuple 타입
type Member = [number, boolean];
let mem1: Member = [123, true];

// 7. Object 속성에 타입 지정
type Member2 = {
  name: string;
};
let mem2: Member2 = { name: 'kim' };

/** Object에 타입 지정해야 할 속성이 많을 때 */
type Member3 = {
  // 모든 object 속성 : 글자로 된 모든 속성의 타입
  [key: string]: string;
};
let mem3: Member3 = { lastName: 'Cho', firstName: 'seoeun' };

/** object 타입 지정시 interface 사용가능
 ** interface extends 로 복사가능
 ** 중복선언 가능*/
// type Square = { color: string; width: number };
interface Square {
  color: string;
  width: number;
}
let square: Square = { color: 'red', width: 100 };

// 연습1 : interface
type Dog = { name: string };
type Cat = { age: number } & Dog;

interface Student {
  name: string;
}
interface Student { // 중복선언 가능
  score: number;
}
let student: Student = { name: 'kim', score: 2 };

interface Teacher extends Student {
  age: number;
}
let teacher: Teacher = { name: 'kimT', score:3, age: 51 };

// 8. Class 타입지정 가능 : constructor 문법
class Person {
  data: number = 111;
}
let p1 = new Person();
console.log(p1.data);

class User {
  // 미리 변수 선언 및 타입지정
  name: string;
  constructor(a: string) {
    this.name = a;
  }

  solution(a: string) {
    console.log('안녕' + a);
  }
}
let user1 = new User('cho');
console.log(new User('kim'));
console.log(new User('park'));
user1.solution('seoeun');

// 연습1 : class
class Car {
  model: string;
  price: number;

  constructor(a: string, b: number) {
    this.model = a;
    this.price = b;
  }

  tax(): number {
    return this.price / 10;
  }
}
let car1 = new Car('소나타', 3000);
console.log(car1);
console.log(car1.tax());

// 연습2 : class
class Word {
  num;
  str;

  constructor(...param: (string | number)[]) {
    let numbers: number[] = [];
    let strings: string[] = [];

    param.forEach((el) => {
      if (typeof el === 'number') {
        numbers.push(el);
      } else {
        strings.push(el);
      }
    });

    this.num = numbers;
    this.str = strings;
  }
}
let obj = new Word('kim', 3, 5, 'park');
console.log(obj.num); //[3,5]
console.log(obj.str); //['kim', 'park']

/** HTML 조작시 narrowing 방법 */
let title = document.querySelector('#title');
// 1. Narrowing
if (title !== null) {
  title.innerHTML = '반가워요';
}
// 2. instance of 연산자 - 가장 좋은 방법
if (title instanceof Element) {
  title.innerHTML = '반가워요';
}
// 3. assertion
title = document.querySelector('#title') as Element;
title.innerHTML = '대반상고';
// 4. 오브젝트에 붙이는 ?. 옵셔널체이닝 = JS
title = document.querySelector('#title') as Element;
if (title?.innerHTML !== undefined) title.innerHTML = '고맙습니다';

// 예제 : HTML 조작시 narrowing
let link = document.querySelector('.link');
if (link instanceof HTMLAnchorElement) {
  link.href = 'https://kakao.com';
}

let button = document.querySelector('#button');
button?.addEventListener('click', () => {
  console.log('버튼클릭함');
});

// 연습1 : HTML 조작시 narrowing - 옵셔널체이닝, addEventListener, instanceof
let img = document.querySelector('#image');
button?.addEventListener('click', () => {
  if (img instanceof HTMLImageElement) img.src = 'new.jpg';
});

// 연습2 : HTML 조작시 narrowing - href, instanceof
let site = document.querySelectorAll('.naver');
site.forEach((a) => {
  if (a instanceof HTMLAnchorElement) {
    a.href = 'https://kakao.com';
  }
});

// class 키워드 알아보고 가기!
function machine(q, w) {
  this.q = q;
  this.w = w;
}
let nunu = new machine('consume', 'snowball');
let garen = new machine('strike', 'courage');
console.log(nunu, garen);

class Hero {
  constructor(q, w) {
    this.q = q;
    this.w = w;
  }
}
let goll = new Hero('vue', 'react');
console.log(goll);

// prototype 문법 짚어보기!
// prototype = 유전자
function character() {
  this.q = 'strike';
  this.w = 'consume';
}
character.prototype.name = 'name';
let nunu2 = new character();
console.log(nunu2, nunu2.name);

let arr2 = [4, 2, 1];
arr2.sort();
