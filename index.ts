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

// Type alias : 타입이 길면 변수로 사용 가능
type nameType = string | number;
let testName2: nameType = 'kim';
testName2 = 123;

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

function setName(x?: string): void {
  if (x) console.log('안녕하세요 ' + x + '님.');
  else console.log('이름이 없습니다.');
}
setName(); // "이름이 없습니다."
setName('홍길동'); // "안녕하세요 홍길동님."

function checkLen(x: string | number): number {
  return x.toString().length;
}
checkLen('123');
checkLen(123);

function canMarriage(income: number, house: boolean, grade: string): string | void {
  let score: number = 0;
  score += income;

  if (house) score += 500;
  if (grade === '상') score += 100;
  if (score >= 600) return '결혼가능';
}
console.log(canMarriage(700, false, '중')); // 결혼가능
console.log(canMarriage(100, false, '상'));

// Type Narrowing : if문 등으로 타입을 하나로 정해주는 것, else문 끝까지 써줘야 안전함
// Type이 아직 하나로 확정되지 않았을 경우
// union type은 연산불가이기 떄문에 사용
// Narrowing 판정 문법 : typeof 변수, 속성명 in 오브젝트자료, 인스턴스 instanceof 부모
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

function cleaningArr(x: (number | string)[]) {
  let arr: number[] = [];

  x.forEach((el) => {
    if (typeof el === 'string') arr.push(Number(el));
    else arr.push(el);
  });

  return arr;
}
console.log(cleaningArr(['1', 2, '3']));

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

// Type Assertion : 타입 덮어쓰기, 변수 as 타입
// 1. Narrowing 할 때 사용 (union 타입일때)
// 2. 파라미터에 무슨 타입이 들어올지 100% 확실할 때 사용
// 디버깅할때 사용하기 좋음, 막 쓰면 좋이 않음
function assertion1(x: number | string) {
  let array: number[] = [];
  array[0] = x as number;
}
assertion1(123);

// 6. Array에 쓸 수 있는 tuple 타입
type Member = [number, boolean];
let mem1: Member = [123, true];

// 7. Object 속성에 타입 지정
type Member2 = {
  name: string;
};
let mem2: Member2 = { name: 'kim' };

// Object에 타입 지정해야 할 속성이 많을 때
type Member3 = {
  // 모든 object 속성 : 글자로 된 모든 속성의 타입
  [key: string]: string;
};
let mem3: Member3 = { lastName: 'Cho', firstName: 'seoeun' };

// 8. Class 타입지정 가능 : constructor 문법
class User {
  // 미리 변수 선언 및 타입지정
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
