var assert = require('assert');
var sq = require('./magic-square.js');

var square = new sq({
    'width': 5,
    'height': 5,
    'range': 5,
    'grid': [ [ 4,  6,  7,  8,  11 ],
              [ 10, 15, 16, 20, 23 ],
              [ 21, 26, 31, 34, 38 ],
              [ 36, 41, 46, 49, 53 ],
              [ 52, 53, 57, 60, 61 ] ]
});

var arrayEqual = function arrayEqual(a, b) { return !(a < b || a > b); }



console.log("Testing with grid:");
console.log(square.grid);

console.log("Testing findNumber:");
assert.ok(arrayEqual(square.findNumber(31), [2, 2]), "Didn't find 31.");
assert.ok(arrayEqual(square.findNumber(10), [1, 0]), "Didn't find 10.");
assert.ok(arrayEqual(square.findNumber(61), [4, 4]), "Didn't find 61.");
assert.ok(arrayEqual(square.findNumber(23), [1, 4]), "Didn't find 23.");
assert.ok(!square.findNumber(27), "False positive for 27.");
console.log("Done! \n \n");

console.log("Testing findNthSmallest:");
assert.equal(square.findNthSmallest(1), 4, "Didn't find smallest.");
assert.equal(square.findNthSmallest(2), 6, "Didn't find 2nd smallest.");
assert.equal(square.findNthSmallest(11), 23, "Didn't find 11th smallest.");
assert.equal(square.findNthSmallest(22), 53, "Didn't find 22nd smallest.");
assert.equal(square.findNthSmallest(90), false, "False positive for 90.");
console.log("Done! \n \n");
