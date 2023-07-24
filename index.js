// type : string, number, boolean, null, undefined, bigint,, [], {} 등
//1. 기본 타입스크립트 문법
var lastName = "kim";
lastName = "park";
lastName = "123";
//2. Array
var nameArr = ["kim", "park"];
nameArr = ["cho", "123"];
// 3. Object
var nameObj = { name: "kim" };
// let nameObj: { name?: string } = {};
nameObj = { name: "cho" };
// 4. Union Type (= or)
var testName1 = 123;
testName1 = ["kim"];
var testName2 = "kim";
testName2 = 123;
// 5. 함수 : 파라미터, return 값 타입지정 가능
function solution(x) {
    return x * 2;
}
solution(3);
var mem1 = [123, true];
var mem2 = { name: "kim" };
var mem3 = { lastName: "Cho", firstName: "seoeun" };
// 8. Class 타입지정 가능 : constructor 문법
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    return User;
}());
