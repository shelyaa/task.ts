//task 1

const add = (num: number): Function => {
    let sum: number = num;

    function addNext(next: number): Function | number {
      if (next === undefined) {
        return sum;
      }

      sum += next;

      return addNext;
    }

    return addNext;
  }

  console.log(add(2)(5)(7)(1)(6)(5)(11)()); //37

//task2

const areAnagrams = (str1: string, str2: string): boolean => {
  const arr1: string[] = str1.split('').sort();
  const arr2: string[] = str2.split('').sort();
  
  return arr1.join('') === arr2.join('');
}
  
console.log(areAnagrams('тік', 'кіт')) //true
console.log(areAnagrams('банка', 'кабан')) //true
console.log(areAnagrams('велосипед', 'дерево')) //false

//task 3

function deepClone<T extends object>(obj: T): T {
  let clonedObj: T;

  if (Array.isArray(obj)) {
    clonedObj = [] as T;
  } else if (obj && typeof obj === 'object') {
    clonedObj = {} as T;
  } else {
    return obj;
  }

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }

  return clonedObj;
}

let obj = {
  type: 'car',
  name: 'Audi',
  color: 'red',
  model: '500'
};

let clone = deepClone(obj);

console.log(obj); //{ type: 'car', name: 'Audi', color: 'red', model: '500' }
console.log(clone); //{ type: 'car', name: 'Audi', color: 'red', model: '500' }

//task 4

const calc = (a: number, b: number, c: number): number => a + b + c;

const wrapper = <T extends (...args: number[]) => ReturnType<T>>(func: T) => {
  const cache: Record<string, ReturnType<T>> = {};
  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log("from cache");
      return cache[key];
    } else {
      console.log("calculated");
      const result = func(...args);
      cache[key] = result;
      return result;
    }
  };
};

const cachedCalc = wrapper(calc);

console.log(cachedCalc(2, 2, 3)); // 7 calculated
console.log(cachedCalc(5, 8, 1)); // 14 calculated
console.log(cachedCalc(2, 2, 3)); // 7 from cache