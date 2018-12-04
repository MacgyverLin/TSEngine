/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Copyright © 2018 <copyright holders>
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”),
// to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
// and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR 
// OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
// DEALINGS IN THE SOFTWARE.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface A {
    a1: number;
    b1: number;
};

class Base implements A {
    private a: number;
    public b: number;
    private c: string;
    public d: string;
    public a1: number;
    public b1: number;

    public constructor() {
        var z1: number = 1;
        var z2: number;
        var z3 = 1;
        var z4;

        this.a = 1;
        this.b = 1;
        this.c = "1";
        this.d = "1";

        var str = '1'
        z3 = <number><any>str;   //str is now of type number 
        console.log(z3);

        this.d = undefined;
        this.d = null;
    }

    public destructor() {
    }        

    public test(): void {
    }
};

class Derived extends Base {
    public constructor() {
        super();
    }

    public destructor() {
    }        

    public test(): void {
    }

    public static test1(): string {
        return "1";
    }

    private static test2(): number {
        return 1;
    }
};

enum TestEnum {
    TEST1 = 0,
    TEST2
};

function testFunc(myNumber: number, myString: string, myBoolean: boolean, rate: number = 0.50, ...nums: number[]): number {
    switch (myNumber) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
    };

    var a = 1;
    let b = 2;
    var c = "1";
    let d = "2";

    if (myNumber) {
    }
    else if (myNumber) {
    }
    else {
    }

    for (var i = 0; i < 10; i++) {
    }

    for (var n in nums) {
        console.log(n);
    }

    while (i < 10) {
        continue;
    }

    do {
        continue;
    } while (i < 10);

    var g = null;
    var h = false;
    var j = true;
    const k = true;

    var derived = new Derived();

    //type 	
    //instanceof 
    var x = typeof (derived);
    console.log(typeof (derived));
    console.log(typeof (Derived));
    console.log(typeof (derived) == typeof (Derived));
    console.log(typeof (typeof (derived)));

    var isInstance = derived instanceof Derived;


    var foo = (x: number) => 10 + x;
    console.log(foo(100));     //outputs 110 

    var num = new Number(1);
    console.log("TypeScript Number Properties: " + num.toString());
    console.log("Maximum value that a number variable can hold: " + Number.MAX_VALUE);
    console.log("The least value that a number variable can hold: " + Number.MIN_VALUE);
    console.log("Value of Negative Infinity: " + Number.NEGATIVE_INFINITY);
    console.log("Value of Negative Infinity:" + Number.POSITIVE_INFINITY);

    var str = new String("asdassd");

    var numlist: number[] = [2, 4, 6, 8];

    var alphas: string[];
    alphas = ["1", "2", "3", "4"]
    console.log(alphas[0]);
    console.log(alphas[1]);

    var arr_names: number[] = new Array(4)

    for (var i = 0; i < arr_names.length; i++) {
        arr_names[i] = i * 2
        console.log(arr_names[i])
    }

    var names: string[] = new Array("Mary", "Tom", "Jack", "Jill")

    for (var i = 0; i < names.length; i++) {
        console.log(names[i])
    }

    var val: string | number
    val = 12
    console.log("numeric value of val " + val)
    val = "This is a string"
    console.log("string value of val " + val)

    interface IPerson {
        firstName: string,
        lastName: string,
        sayHi: () => string
    }

    var customer: IPerson = {
        firstName: "Tom",
        lastName: "Hanks",
        sayHi: (): string => { return "Hi there" }
    }

    console.log("Customer Object ")
    console.log(customer.firstName)
    console.log(customer.lastName)
    console.log(customer.sayHi())

    var employee: IPerson = {
        firstName: "Jim",
        lastName: "Blakes",
        sayHi: (): string => { return "Hello!!!" }
    }

    console.log("Employee  Object ");

    return 1;
    /*
    throw
    try
    catch
    finally
    */
    /*
    module	
    export 	
    as 	
    any
    get
    */
    /*
    package 	
    yield
    */
}

/*
function identity<T>(arg: T): T {
    console.log(arg);
    return arg;
}

interface GenericIdentityFn<T> {
    (arg: T): T;
}

let myIdentity: GenericIdentityFn<number> = identity;

class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };

interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}

loggingIdentity({ length: 10, value: 3 });

function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
//getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.

function create<T>(c: { new(): T; }): T {
    return new c();
}

class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!

identity<number>(1);
identity<string>("12");
identity<boolean>(true);
*/