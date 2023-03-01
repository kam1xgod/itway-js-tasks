class Product {
    constructor(name, price, quantity, description) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
    }
}
 
String.prototype.contains = String.prototype.includes;
String.prototype.starts = String.prototype.startsWith;
String.prototype.ends = String.prototype.endsWith;
Number.prototype['>'] = function(value) {
    return this > value;
}
Number.prototype['<'] = function(value) {
    return this < value;
}
Number.prototype['>='] = function(value) {
    return this > value;
}
Number.prototype['<='] = function(value) {
    return this < value;
}
Number.prototype['='] = function(value) {
    return this == value;
}
 
function filter(products, queue) {
    const queueArr = queue.split('&');
    const props = queueArr.map(condition => ({
        ops: condition.split(/(-|\<=?|\>=?|\=)/).filter((noDash) => noDash && /[^-]/.test(noDash))
    }));
 
    const result = products.filter(value => {
        for (let prop of props) {
            if (!value[prop.ops[0]][prop.ops[1]](prop.ops[2]))
                return false;
        }
        return true;
    })
    return result;
}
 
let queueOne = "name-contains-fd&price-=2&quantity->5&description-ends-abc";
let queueTwo = "name-starts-fd&quantity-=5";
let queueThree = "name-contains-pl&description-ends-es.";
let products = generateProducts();
 
let filtered = filter(products, queueOne);
console.log(filtered);
filtered = filter(products, queueTwo);
console.log(filtered);
filtered = filter(products, queueThree);
console.log(filtered);

function generateProducts() {
  // let's pretend we are getting those from database.
  let products = new Array();
  let product = new Product("Tissue", 10, 1023, "Tissue for personal needs.");
  products.push(product);
  product = new Product("Cheese", 30, 54, "Some tasty cheese.");
  products.push(product);
  product = new Product("Potato chips", 25, 5, "Potato chips to make you feel good.");
  products.push(product);
  product = new Product("Apples", 15, 32, "Sweet green apples.");
  products.push(product);
  product = new Product("Washing Powfdder", 2, 12, "Makes your clothes smell nice and cleanabc");
  products.push(product);
  product = new Product("fdTest", 2, 5, "testabc");
  products.push(product);
  return products;
}
