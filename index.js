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
// 연습1 : 함수
function setName(x) {
    if (x)
        console.log('안녕하세요 ' + x + '님.');
    else
        console.log('이름이 없습니다.');
}
setName(); // "이름이 없습니다."
setName('홍길동'); // "안녕하세요 홍길동님."
// 연습2 : 함수
function checkLen(x) {
    return x.toString().length;
}
checkLen('123');
checkLen(123);
// 연습3 : 함수
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
/** Type Narrowing : if문 등으로 타입을 하나로 정해주는 것, else문 끝까지 써줘야 안전함
 ** Type이 아직 하나로 확정되지 않았을 경우
 ** union type은 연산불가이기 떄문에 사용
 ** Narrowing 판정 문법 : typeof 변수, 속성명 in 오브젝트자료, 인스턴스 instanceof 부모 */
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
// 연습1 : Type Narrowing
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
// 연습2 : Type Narrowing
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
/** Type Assertion : 타입 덮어쓰기, 변수 as 타입
1. Narrowing 할 때 사용 (union 타입일때)
2. 파라미터에 무슨 타입이 들어올지 100% 확실할 때 사용
** 디버깅할때 사용하기 좋음, 막 쓰면 좋지 않음 */
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
var func = function (x) {
    return 10;
};
// 연습1 : object안에 함수 만들 수 있음
var memInfo = {
    name: 'kim',
    age: 18,
    plusOne: function (x) {
        return x + 1;
    },
    changeName: function () {
        console.log('안녕');
    },
};
console.log(memInfo.plusOne(2));
console.log(memInfo.changeName());
var cutZero = function (x) {
    var result = x.replace(/^0+/, '');
    return result;
};
console.log(cutZero('0str'));
function removeDash(x) {
    var result = x.replace(/-/g, '');
    return Number(result);
}
console.log(removeDash('-1-23-.20'));
function assignFunc(str, func1, func2) {
    var result = func1(str);
    var result2 = func2(result);
    return result2;
}
console.log(assignFunc('010-1111-2222', cutZero, removeDash));
/** Literal Types : 변수에 들어올 값을 특정지어 더욱 엄격하게 관리해줌 */
var myName;
myName = 'park';
function checkRSP(x) {
    if (x === '가위')
        return ['가위'];
    else if (x === '바위')
        return ['바위'];
    else
        return ['보'];
}
console.log(checkRSP('보'));
/** as const
1. 타입을 Object속성의 value로 바꿔줌
2. object안에 있는 모든 속성을 readonly로 바꿔줌
** Object자료를 완전히 잠궈 놓고 싶을때 (리터럴타입으로 고정하고 싶을때) */
var txt1 = { name: 'kim' }; // type = 'kim
var mem1 = [123, true];
var mem2 = { name: 'kim' };
var mem3 = { lastName: 'Cho', firstName: 'seoeun' };
var square = { color: 'red', width: 100 };
var student = { name: 'kim', score: 2 };
var teacher = { name: 'kimT', score: 3, age: 51 };
// 8. Class 타입지정 가능 : constructor 문법
var Person = /** @class */ (function () {
    function Person() {
        this.data = 111;
    }
    return Person;
}());
var p1 = new Person();
console.log(p1.data);
var User = /** @class */ (function () {
    function User(a) {
        this.name = a;
    }
    User.prototype.solution = function (a) {
        console.log('안녕' + a);
    };
    return User;
}());
var user1 = new User('cho');
console.log(new User('kim'));
console.log(new User('park'));
user1.solution('seoeun');
// 연습1 : class
var Car = /** @class */ (function () {
    function Car(a, b) {
        this.model = a;
        this.price = b;
    }
    Car.prototype.tax = function () {
        return this.price / 10;
    };
    return Car;
}());
var car1 = new Car('소나타', 3000);
console.log(car1);
console.log(car1.tax());
// 연습2 : class
var Word = /** @class */ (function () {
    function Word() {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var numbers = [];
        var strings = [];
        param.forEach(function (el) {
            if (typeof el === 'number') {
                numbers.push(el);
            }
            else {
                strings.push(el);
            }
        });
        this.num = numbers;
        this.str = strings;
    }
    return Word;
}());
var obj = new Word('kim', 3, 5, 'park');
console.log(obj.num); //[3,5]
console.log(obj.str); //['kim', 'park']
/** HTML 조작시 narrowing 방법 */
var title = document.querySelector('#title');
// 1. Narrowing
if (title !== null) {
    title.innerHTML = '반가워요';
}
// 2. instance of 연산자 - 가장 좋은 방법
if (title instanceof Element) {
    title.innerHTML = '반가워요';
}
// 3. assertion
title = document.querySelector('#title');
title.innerHTML = '대반상고';
// 4. 오브젝트에 붙이는 ?. 옵셔널체이닝 = JS
title = document.querySelector('#title');
if ((title === null || title === void 0 ? void 0 : title.innerHTML) !== undefined)
    title.innerHTML = '고맙습니다';
// 예제 : HTML 조작시 narrowing
var link = document.querySelector('.link');
if (link instanceof HTMLAnchorElement) {
    link.href = 'https://kakao.com';
}
var button = document.querySelector('#button');
button === null || button === void 0 ? void 0 : button.addEventListener('click', function () {
    console.log('버튼클릭함');
});
// 연습1 : HTML 조작시 narrowing - 옵셔널체이닝, addEventListener, instanceof
var img = document.querySelector('#image');
button === null || button === void 0 ? void 0 : button.addEventListener('click', function () {
    if (img instanceof HTMLImageElement)
        img.src = 'new.jpg';
});
// 연습2 : HTML 조작시 narrowing - href, instanceof
var site = document.querySelectorAll('.naver');
site.forEach(function (a) {
    if (a instanceof HTMLAnchorElement) {
        a.href = 'https://kakao.com';
    }
});
// class 키워드 알아보고 가기!
function machine(q, w) {
    this.q = q;
    this.w = w;
}
var nunu = new machine('consume', 'snowball');
var garen = new machine('strike', 'courage');
console.log(nunu, garen);
var Hero = /** @class */ (function () {
    function Hero(q, w) {
        this.q = q;
        this.w = w;
    }
    return Hero;
}());
var goll = new Hero('vue', 'react');
console.log(goll);
// prototype 문법 짚어보기!
// prototype = 유전자
function character() {
    this.q = 'strike';
    this.w = 'consume';
}
character.prototype.name = 'name';
var nunu2 = new character();
console.log(nunu2, nunu2.name);
var arr2 = [4, 2, 1];
arr2.sort();
