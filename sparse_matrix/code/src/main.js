const readline = require('readline');
const SparseMatrix = require('./SparseMatrix');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

(async function () {
  console.log("Select operation:\n1 - Addition\n2 - Subtraction\n3 - Multiplication");
  const choice = await prompt("Enter choice (1/2/3): ");

  const matrix1 = SparseMatrix.fromFile(path.join(__dirname, '../../sample_inputs/matrix1.txt'));
  const matrix2 = SparseMatrix.fromFile(path.join(__dirname, '../../sample_inputs/matrix4.txt'));


  let result;

  try {
    switch (choice) {
      case '1':
        result = matrix1.add(matrix2);
        break;
      case '2':
        result = matrix1.subtract(matrix2);
        break;
      case '3':
        result = matrix1.multiply(matrix2);
        break;
      default:
        console.log("Invalid choice");
        rl.close();
        return;
    }

    console.log("Operation completed successfully!");

    const save = await prompt("Do you want to save the result to a file? (yes/no): ");
    if (save.toLowerCase() === 'yes') {
      const filename = await prompt("Enter output filename (e.g., output.txt): ");
      const outputPath = path.join(__dirname, '../../sample_inputs/', filename);
      result.saveToFile(outputPath);
      console.log(`Result saved to ${outputPath}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    rl.close();
  }
})();
