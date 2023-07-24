// type : string, number, boolean, null, undefined, bigint,, [], {} 등

//1. 기본 타입스크립트 문법
let lastName: string = "kim";
lastName = "park";
lastName = "123";

//2. Array
let nameArr: string[] = ["kim", "park"];
nameArr = ["cho", "123"];

// 3. Object
let nameObj: { name: string } = { name: "kim" };
// let nameObj: { name?: string } = {};
nameObj = { name: "cho" };

// 4. Union Type (= or)
let testName1: string[] | number = 123;
testName1 = ["kim"];

// Type alias : 타입이 길면 변수로 사용 가능
type nameType = string | number;
let testName2: nameType = "kim";
testName2 = 123;

// 5. 함수 : 파라미터, return 값 타입지정 가능
function solution(x: number): number {
  return x * 2;
}
solution(3);

// 6. Array에 쓸 수 있는 tuple 타입
type Member = [number, boolean];
let mem1: Member = [123, true];

// 7. Object 속성에 타입 지정
type Member2 = {
  name: string;
};
let mem2: Member2 = { name: "kim" };

// Object에 타입 지정해야 할 속성이 많을 때
type Member3 = {
  // 모든 object 속성 : 글자로 된 모든 속성의 타입
  [key: string]: string;
};
let mem3: Member3 = { lastName: "Cho", firstName: "seoeun" };

// 8. Class 타입지정 가능 : constructor 문법
class User {
  // 미리 변수 선언 및 타입지정
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
