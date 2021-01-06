async function A() {
  try {
    await B();
  } catch (error) {
    console.log("A -> error", error);
  }
}

async function B() {
  return C();
}

async function C() {
  throw new Error("ee");
}

A();
