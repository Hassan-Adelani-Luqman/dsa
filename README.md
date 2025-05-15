# Sparse Matrix Operations in JavaScript

This project implements memory-efficient and performant operations (Addition, Subtraction, and Multiplication) on large sparse matrices using JavaScript—without relying on built-in libraries. It's designed as part of a Data Structures and Algorithms coursework assignment.

---

## 📁 Project Structure

```

/dsa/sparse\_matrix/
├── code/
│   └── src/
│       ├── main.js              # Entry point for user interaction
│       └── SparseMatrix.js      # Sparse matrix implementation
├── sample\_inputs/
│   ├── matrix1.txt              # Sample sparse matrix files
│   ├── matrix2.txt
│   ├── matrix3.txt
│   └── matrix4.txt
└── README.md                    # Project documentation

```

---

## 📌 Features

- Load sparse matrices from file.
- Memory-efficient matrix representation using object-based coordinate mapping.
- Perform:
  - ➕ Addition
  - ➖ Subtraction
  - ✖️ Multiplication
- Input validation and error handling (e.g. format mismatch, size incompatibility).
- Simple CLI-based user interface for selecting operations.

---

## 📄 Input File Format

Each matrix is stored in a `.txt` file with the following format:

```

rows=8433
cols=3180
(0, 381, -694)
(0, 128, -838)
(0, 639, 857)
...

````

- First two lines define matrix dimensions.
- Each subsequent line represents a non-zero entry: `(row, col, value)`.
- All unspecified entries are assumed to be 0.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd dsa/sparse_matrix/
````

### 2. File Setup

Make sure files are in the right place:

* Source code: `/code/src/`
* Matrix inputs: `/sample_inputs/`

### 3. Run the Program

```bash
cd code/src
node main.js
```

You’ll be prompted to select a matrix operation:

```
Select operation:
1 - Addition
2 - Subtraction
3 - Multiplication
Enter choice (1/2/3):
```

---

## 🧠 How It Works

### SparseMatrix Class

```js
new SparseMatrix(filePath)              // Load from file
new SparseMatrix(numRows, numCols)     // Create an empty matrix
```

Internally stores non-zero entries in a JavaScript object using `row: { col: value }` format.

### Core Functions

* `getElement(row, col)` – Returns value at (row, col)
* `setElement(row, col, value)` – Sets a value; if 0, removes entry
* `add(matrixB)` – Adds another matrix
* `subtract(matrixB)` – Subtracts another matrix
* `multiply(matrixB)` – Multiplies with another matrix

### Input Validation

* Ignores empty lines or extra whitespaces
* Throws error if:

  * Dimensions mismatch during addition/subtraction
  * Invalid characters, formats, or floating points in the input file

---

## ✅ Sample Usage

To subtract `matrix4.txt` from `matrix1.txt`:

1. Ensure both matrices have the same dimensions
2. Update `main.js`:

```js
const matrixA = new SparseMatrix('./../../sample_inputs/matrix1.txt');
const matrixB = new SparseMatrix('./../../sample_inputs/matrix4.txt');
```

3. Run:

```bash
node main.js
```

Select `2` for subtraction.

---

## 🛠 Limitations & Constraints

* No use of built-in libraries like `regex`, `Map`, or `Set`
* All helper methods and data structures are implemented manually
* Floating-point and malformed entries in input file will raise errors

---

## 📚 References & Credits

* Developed as part of "Data Structures and Algorithms for Engineers" course.
* Matrix format provided by course instructors.
* JavaScript runtime: Node.js v22+

---

## 📬 Contact

For questions or suggestions, feel free to reach out:

* **Developer:** Hassan Adelani Luqman

---

## 📌 License

This project is part of a course assignment and is not licensed for commercial use.

```
