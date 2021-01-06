abstract class IFile {
  abstract getSize(): number;
}

class NormalFile extends IFile {
  getSize() {
    return 1;
  }
}

class Directory extends IFile {
  assets: IFile[] = [];
  pushFile(asset: IFile) {
    this.assets.push(asset);
  }
  getSize() {
    return this.assets.reduce((preSize, cur) => {
      return preSize + cur.getSize();
    }, 0);
  }
}

const f1 = new NormalFile();
const f2 = new NormalFile();
const d1 = new Directory();
d1.pushFile(f1);
d1.pushFile(f2);
console.log('d1.getSize()===2', d1.getSize() === 2);

const f3 = new NormalFile();
const f4 = new NormalFile();
const d2 = new Directory();
d2.pushFile(d1);
d2.pushFile(f3);
d2.pushFile(f4);

console.log('d2.getSize()==4', d2.getSize() == 4);
