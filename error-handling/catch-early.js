const funcA = async (a) => {
  if (a > 10) return a;
  throw new Error("Error from funcA");
}

const funcB = async (b) => {
  if (b > 8) return b;
  throw new Error("Error from funcB");
}

const main1 = async (p) => {
  try {
    const a = await funcA(p);
    const a2 = a * 2;
    const b = await funcB(p);
    return { a: a2, b }
  } catch (error) {
    // check where the error is from (funcA or funcB)
  }
}

const main2 = async (p) => {
  let a
  try {
    a = await funcA(p);
    a = a * 2;
  } catch (error) {
    throw new Error("From main + " + error.message)
  }
  let b;
  try {
    b = await funcB(p);
  } catch (error) {
    throw new Error("From main + " + error.message)
  }
  return { a, b }

}

const main3 = async (p) => {
  // This is better version to take care of handling each error at its own level
  const a = await funcA(p).then(i => 2 * i).catch(error => {
    throw new Error("From main + " + error.message)
  });
  const b = await funcB(p).catch(error => {
    throw new Error("From main + " + error.message)
  });

  return { a, b }
}

main2(6).then(console.log).catch(console.log)

