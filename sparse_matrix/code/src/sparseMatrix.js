const fs = require('fs');

class SparseMatrix {
  constructor(rows = 0, cols = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = {}; // Use a nested object: data[row][col] = value
  }

  static fromFile(filePath) {
    const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
    let rowLine = lines[0].trim();
    let colLine = lines[1].trim();

    if (!rowLine.startsWith('rows=') || !colLine.startsWith('cols=')) {
      throw new Error("Input file has wrong format");
    }

    let rows = parseInt(rowLine.slice(5));
    let cols = parseInt(colLine.slice(5));
    const matrix = new SparseMatrix(rows, cols);

    for (let i = 2; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line) continue;
      if (!(line.startsWith('(') && line.endsWith(')'))) {
        throw new Error("Input file has wrong format");
      }

      let inner = line.slice(1, -1).split(',');
      if (inner.length !== 3) throw new Error("Input file has wrong format");

      let [r, c, v] = inner.map(x => parseInt(x.trim()));
      if (isNaN(r) || isNaN(c) || isNaN(v)) {
        throw new Error("Input file has wrong format");
      }
      matrix.setElement(r, c, v);
    }
    return matrix;
  }

  getElement(row, col) {
    return (this.data[row] && this.data[row][col]) || 0;
  }

  setElement(row, col, value) {
    if (!this.data[row]) this.data[row] = {};
    this.data[row][col] = value;
  }

  saveToFile(filePath) {
  const lines = [];
  lines.push(`rows=${this.rows}`);
  lines.push(`cols=${this.cols}`);
  for (const r in this.data) {
    for (const c in this.data[r]) {
      lines.push(`(${r}, ${c}, ${this.data[r][c]})`);
    }
  }
  fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
}


  add(other) {
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error("Matrix size mismatch for addition");
    }

    const result = new SparseMatrix(this.rows, this.cols);
    for (let r in this.data) {
      for (let c in this.data[r]) {
        result.setElement(+r, +c, this.getElement(+r, +c));
      }
    }
    for (let r in other.data) {
      for (let c in other.data[r]) {
        const val = result.getElement(+r, +c) + other.getElement(+r, +c);
        result.setElement(+r, +c, val);
      }
    }
    return result;
  }

  subtract(other) {
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error("Matrix size mismatch for subtraction");
    }

    const result = new SparseMatrix(this.rows, this.cols);
    for (let r in this.data) {
      for (let c in this.data[r]) {
        result.setElement(+r, +c, this.getElement(+r, +c));
      }
    }
    for (let r in other.data) {
      for (let c in other.data[r]) {
        const val = result.getElement(+r, +c) - other.getElement(+r, +c);
        result.setElement(+r, +c, val);
      }
    }
    return result;
  }

  multiply(other) {
    if (this.cols !== other.rows) {
      throw new Error("Matrix size mismatch for multiplication");
    }

    const result = new SparseMatrix(this.rows, other.cols);
    for (let i in this.data) {
      for (let k in this.data[i]) {
        if (!other.data[k]) continue;
        for (let j in other.data[k]) {
          const current = result.getElement(+i, +j);
          const added = this.getElement(+i, +k) * other.getElement(+k, +j);
          result.setElement(+i, +j, current + added);
        }
      }
    }
    return result;
  }

  print() {
    console.log(`rows=${this.rows}`);
    console.log(`cols=${this.cols}`);
    for (let r in this.data) {
      for (let c in this.data[r]) {
        console.log(`(${r}, ${c}, ${this.data[r][c]})`);
      }
    }
  }
}

module.exports = SparseMatrix;
