const readline = require('readline');
const SparseMatrix = require('./SparseMatrix');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Select operation:");
console.log("1 - Addition");
console.log("2 - Subtraction");
console.log("3 - Multiplication");

rl.question("Enter choice (1/2/3): ", function (op) {
  const file1 = '../../sample_inputs/matrix1.txt';
  const file2 = '../../sample_inputs/matrix4.txt';

  try {
    const matrix1 = SparseMatrix.fromFile(file1);
    const matrix2 = SparseMatrix.fromFile(file2);

    let result;
    if (op == '1') {
      result = matrix1.add(matrix2);
    } else if (op == '2') {
      result = matrix1.subtract(matrix2);
    } else if (op == '3') {
      result = matrix1.multiply(matrix2);
    } else {
      console.log("Invalid option");
      rl.close();
      return;
    }

    console.log("Result:");
    result.print();
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    rl.close();
  }
});