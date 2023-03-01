let numOne = BigInt("12312473824238945671263981273464578234712836347");
let numTwo = BigInt("2348237859743587230912467128934261319738912461293");

/* let numOne = -16; */
/* let numTwo = 14; */

console.log(sum(numOne, numTwo));
console.log(extract(numOne, numTwo));
console.log(multiply(numOne, numTwo))
console.log(divide(numOne, numTwo))

function sum(numOne, numTwo) {
  numOne = String(numOne);
  numTwo = String(numTwo);
  let t = isOneNegative(numOne, numTwo);

  if (t == numOne) {
    return extract(numTwo, numOne.replace("-", ""));
  } else if (t == numTwo) {
    return extract(numOne, numTwo.replace("-", ""));
  }
  let str = "";
  if (isBothNegative(numOne, numTwo)) {
    str += "-";
    numOne = numOne.replace("-", "");
    numTwo = numTwo.replace("-", "");
  }
  if (numOne.length > numTwo.length) {
    numTwo = addZeros(numOne, numTwo);
  } else if (numOne.length < numTwo.length) {
    numOne = addZeros(numTwo, numOne);
  } else if (numOne.length == 1 && numTwo.length == 1) {
    console.log(parseInt(numOne) + parseInt(numTwo));
    return;
  }
  let a1 = numOne.split("");
  let b1 = numTwo.split("");
  let sum = 0;
  let carry = 0;
  let array = [];
  for (var i = a1.length - 1; i >= 0; i--) {
    sum = parseInt(a1[i]) + parseInt(b1[i]) + parseInt(carry);
    if (sum >= 10) {
      carry = 1;
      sum = sum - 10;
    } else {
      carry = 0;
    }
    array.push(sum);
  }
  let result = array.reverse().join("");
  while (result.charAt(0) == 0) {
    result = result.substring(1);
  }
  return str + result;
}

function extract(numOne, numTwo) {
  numOne = String(numOne);
  numTwo = String(numTwo);
  if (isBothNegative(numOne, numTwo)) {
    sum(numOne, numTwo);
    return;
  }
  let isNegative = false;
  let t = isOneNegative(numOne, numTwo);
  if (t == numOne) {
    return "-" + sum(numOne.replace("-", ""), numTwo);
  } else if (t == numTwo) {
    return sum(numOne, numTwo.replace("-", ""));
  }
  let str = "";
  if (isSmaller(numOne, numTwo)) {
    let t = numOne;
    numOne = numTwo;
    numTwo = t;
    isNegative = true;
  }
  let n1 = numOne.length, n2 = numTwo.length;
  numOne = numOne.split("").reverse().join("")
  numTwo = numTwo.split("").reverse().join("")
  let carry = 0;
  for (let i = 0; i < n2; i++) {
    let sub = parseInt(numOne[i]) - parseInt(numTwo[i]) - carry;
    if (sub < 0) {
      sub = sub + 10;
      carry = 1;
    }
    else {
      carry = 0;
    }
    str += sub;
  }
  let result = str.split("").reverse().join("");
  while (result.charAt(0) == "0") {
    result = result.substring(1);
  }
  if (isNegative) {
    result = "-" + result;
  }
  return result;
}

function multiply(numOne, numTwo) {
  numOne = String(numOne);
  numTwo = String(numTwo);
  let isNegative = false;
  t = isOneNegative(numOne, numTwo);
  if (t == numOne) {
    numOne = numOne.replace("-", "");
    isNegative = true;
  } else if (t == numTwo) {
    numTwo = numTwo.replace("-", "");
    isNegative = true;
  }
  if (isBothNegative(numOne, numTwo)) {
    numOne = numOne.replace("-", "");
    numTwo = numTwo.replace("-", "");
  }

  let len1 = numOne.length;
  let len2 = numTwo.length;
  if (len1 == 0 || len2 == 0)
    return "0"

  let result = new Array(len1 + len2).fill(0)
  let i_n1 = 0
  let i_n2 = 0
  for (var i = len1 - 1; i > -1; i--) {
    let carry = 0
    let n1 = parseInt(numOne[i]);
    i_n2 = 0
    for (var j = len2 - 1; j > -1; j--) {
      let n2 = parseInt(numTwo[j]);
      let summ = n1 * n2 + result[i_n1 + i_n2] + carry
      carry = Math.floor(summ / 10)
      result[i_n1 + i_n2] = summ % 10
      i_n2 += 1
    }
    if (carry > 0)
      result[i_n1 + i_n2] += carry
    i_n1 += 1
  }
  i = result.length - 1
  while (i >= 0 && result[i] == 0)
    i -= 1
  if (i == -1)
    return "0"
  let s = ""
  while (i >= 0) {
    s += String.fromCharCode(result[i] + 48)
    i -= 1
  }
  let res = s;
  while (res.charAt(0) == "0") {
    res = res.substring(1);
  }
  if (isNegative) {
    res = "-" + res;
  }
  return res;
}

function divide(numOne, numTwo) {
  numOne = String(numOne);
  numTwo = String(numTwo);
  let isNegative = false;
  let t = isOneNegative(numOne, numTwo);
  if (t == numOne) {
    numOne = numOne.replace("-", "");
    isNegative = true;
  } else if (t == numTwo) {
    numTwo = numTwo.replace("-", "");
    isNegative = true;
  }
  if (isBothNegative(numOne, numTwo)) {
    numOne = numOne.replace("-", "");
    numTwo = numTwo.replace("-", "");
  }

  let ans = "";

  let idx = 0;
  let temp = numOne[idx] - '0';
  while (temp < numTwo) {
    temp = (temp * 10 +
      String(numOne[idx + 1]).charCodeAt(0) -
      ('0').charCodeAt(0));
    idx += 1;
  }
  idx += 1;

  while (numOne.length > idx) {
    ans += String.fromCharCode
      (Math.floor(temp / numTwo) +
        ('0').charCodeAt(0));

    temp = ((temp % numTwo) * 10 +
      (numOne[idx]).charCodeAt(0) -
      ('0').charCodeAt(0));
    idx += 1;
  }

  ans += String.fromCharCode
    (Math.floor(temp / numTwo) +
      ('0').charCodeAt(0));

  if (ans.length == 0)
    return "0";
  if (isNegative) {
    ans = "-" + ans;
  }
  return ans;
}

function addZeros(numOne, numTwo) {
  while (numOne.length > numTwo.length) {
    numTwo = "0" + numTwo;
  }
  return numTwo;
}

function isSmaller(numOne, numTwo) {
  let n1 = numOne.length, n2 = numTwo.length;
  if (n1 < n2)
    return true;
  if (n2 < n1)
    return false;

  for (let i = 0; i < n1; i++)
    if (numOne[i] < numTwo[i])
      return true;
    else if (numOne[i] > numTwo[i])
      return false;

  return false;
}

function isOneNegative(numOne, numTwo) {
  if (String(numOne).charAt(0) == "-" && String(numTwo).charAt(0) != "-") {
    return numOne;
  }
  if (String(numOne).charAt(0) != "-" && String(numTwo).charAt(0) == "-") {
    return numTwo;
  }
  return 0;
}

function isBothNegative(numOne, numTwo) {
  return String(numOne).charAt(0) == "-" && String(numTwo).charAt(0) == "-";
}
