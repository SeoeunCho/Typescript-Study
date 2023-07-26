// type : string, number, boolean, null, undefined, bigint,, [], {} 등
//1. 변수 타입지정 가능
var lastName = 'kim';
lastName = 'park';
lastName = '123';
// 타입지정 문법 생략가능 - 자동으로 지정됨
var test = 'kim';
// 변수만 만들고 할당을 해주면 자동으로 타입 지정됨
var test2;
test = 'cho';
// any 타입 : 타입실드 해제문법 = 일반 JS 변수
var test3;
test3 = 123;
test3 = [];
// unknown 타입 : 모든 자료형 허용, 타입 실드가 해제된 것은 아니라 any보다 안전함
var test4;
test4 = 123;
test4 = {};
// let test5 :string = test3; // test3가 any 타입이라서 타입실드가 죽은 상태라 가능해짐, 디버깅 어려움
// let test5 :string = test4; // error
// 예제
var user = 'kim';
var age = undefined;
var married = false;
var info = [user, age, married];
var school = {
    score: [100, 97, 84],
    teacher: 'Phil',
    friend: 'John',
};
school.score[4] = false;
school.friend = ['Lee', school.teacher];
//2. Array
var nameArr = ['kim', 'park'];
nameArr = ['cho', '123'];
var testArr = ['kim', '1', 2];
var testArr2 = { a: 123 };
// 3. Object
var nameObj = { name: 'kim', age: 27 };
// let nameObj: { name?: string } = {};
nameObj = { name: 'cho', age: 28 };
// 4. Union Type (= or)
var testName1 = 123;
testName1 = ['kim'];
// 5. 함수 : 파라미터, return 타입지정 가능
function solution(x) {
    return x * 2;
}
solution(3); // 6
solution(4); // 8
// 파라미터가 옵션일 경우 '?' 문법 (= '?.' 옵셔널체이닝)
function solution2(x) {
    return x * 3;
}
solution2();
// 함수에서 void 타입 활용가능 : return이 없을 경우, 실수로 무언가를 return 하는 것을 방지
function result(x) {
    1 + 1;
}
// 숙제1
function setName(x) {
    if (x)
        console.log('안녕하세요 ' + x + '님.');
    else
        console.log('이름이 없습니다.');
}
setName(); // "이름이 없습니다."
setName('홍길동'); // "안녕하세요 홍길동님."
// 숙제2
function checkLen(x) {
    return x.toString().length;
}
checkLen('123');
checkLen(123);
// 숙제3
function canMarriage(income, house, grade) {
    var score = 0;
    score += income;
    if (house)
        score += 500;
    if (grade === '상')
        score += 100;
    if (score >= 600)
        return '결혼가능';
}
console.log(canMarriage(700, false, '중')); // 결혼가능
console.log(canMarriage(100, false, '상'));
// Type Narrowing : if문 등으로 타입을 하나로 정해주는 것, else문 끝까지 써줘야 안전함
// Type이 아직 하나로 확정되지 않았을 경우
// union type은 연산불가이기 떄문에 사용
// Narrowing 판정 문법 : typeof 변수, 속성명 in 오브젝트자료, 인스턴스 instanceof 부모
function narrowing1(x) {
    if (typeof x === 'number')
        return x + 1;
    else if (typeof x === 'string')
        return x + 1;
    else
        return 0;
}
narrowing1(123);
function narrowing2(x) {
    var array = [];
    if (typeof x === 'number') {
        array[0] = x;
    }
}
narrowing2(123);
// 숙제1
function cleaningArr(x) {
    var arr = [];
    x.forEach(function (el) {
        if (typeof el === 'string')
            arr.push(Number(el));
        else
            arr.push(el);
    });
    return arr;
}
console.log(cleaningArr(['1', 2, '3']));
// 숙제2
var t1 = { subject: 'math' };
var t2 = { subject: ['science', 'english'] };
var t3 = { hello: 'hi' };
function getSubject(x) {
    if (typeof x.subject === 'string')
        return x.subject;
    else if (Array.isArray(x.subject))
        return x.subject.pop();
    else
        return 'error';
}
console.log(getSubject(t1));
console.log(getSubject(t2));
// Type Assertion : 타입 덮어쓰기, 변수 as 타입
// 1. Narrowing 할 때 사용 (union 타입일때)
// 2. 파라미터에 무슨 타입이 들어올지 100% 확실할 때 사용
// 디버깅할때 사용하기 좋음, 막 쓰면 좋이 않음
function assertion1(x) {
    var array = [];
    array[0] = x;
}
assertion1(123);
var testName2 = 'kim';
testName2 = 123;
var animal1 = { name: 'panda', age: 5 };
var friend = { name: '서은' };
var position = { x: 10, y: 20 };
var objectTest = { name: 'kim' };
console.log(objectTest);
var myTypeTest = { size: 500, position: [1, 2, 3] };
console.log(myTypeTest);
var infoType = { name: 'kim', phone: 123, email: 'abc@naver.com' };
var userInfoTest = { name: 'kim', phone: 18, email: 'abc@naver.com', adult: false };
var mem1 = [123, true];
var mem2 = { name: 'kim' };
var mem3 = { lastName: 'Cho', firstName: 'seoeun' };
// 8. Class 타입지정 가능 : constructor 문법
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    return User;
}());
