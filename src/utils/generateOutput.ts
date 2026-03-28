export const generateRandomizedOutput = (
  template: string,
  studentName: string,
  rollNumber: string
): string => {
  let result = template;
  result = result.replace(/{studentName}/g, studentName);
  result = result.replace(/{rollNumber}/g, rollNumber);

  // Common randoms
  const rand1 = Math.floor(Math.random() * 50) + 1;
  const rand2 = Math.floor(Math.random() * 50) + 1;
  const rand3 = Math.floor(Math.random() * 50) + 1;

  result = result.replace(/{rand1}/g, rand1.toString());
  result = result.replace(/{rand2}/g, rand2.toString());
  result = result.replace(/{rand3}/g, rand3.toString());

  // Arithmetic
  result = result.replace(/{sum}/g, (rand1 + rand2).toString());
  result = result.replace(/{diff}/g, (rand1 - rand2).toString());
  result = result.replace(/{prod}/g, (rand1 * rand2).toString());
  result = result.replace(/{quot}/g, Math.floor(rand1 / rand2).toString());

  // Greatest of 3
  const max3 = Math.max(rand1, rand2, rand3);
  result = result.replace(/{max3}/g, max3.toString());

  // Even or Odd
  result = result.replace(/{evenOrOdd}/g, rand1 % 2 === 0 ? "EVEN" : "ODD");

  // Banking
  const randBalance = Math.floor(Math.random() * 4000) + 1000;
  const randDeposit = Math.floor(Math.random() * 900) + 100;
  const randWithdraw = Math.floor(Math.random() * 400) + 50;
  const finalBalance = randBalance + randDeposit - randWithdraw;

  result = result.replace(/{randBalance}/g, randBalance.toString() + ".0");
  result = result.replace(/{randDeposit}/g, randDeposit.toString() + ".0");
  result = result.replace(/{randWithdraw}/g, randWithdraw.toString() + ".0");
  result = result.replace(/{finalBalance}/g, finalBalance.toString() + ".0");

  // Arrays
  const arr = [
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100)
  ];
  result = result.replace(/{randArrayFull}/g, arr.join(", "));
  const sortedArr = [...arr].sort((a, b) => a - b);
  result = result.replace(/{randArraySorted}/g, sortedArr.join(", "));
  
  // Array of Names Sorting (For Program 7)
  const names = [studentName, "Zaid", "Aman", "Imran"];
  const sortedNames = [...names].sort();
  result = result.replace(/{sortedNames}/g, `[${sortedNames.join(", ")}]`);

  // Constructors
  const boxVolume = rand1 * rand2 * rand3;
  const cubeVolume = rand1 * rand1 * rand1;
  result = result.replace(/{boxVolume}/g, boxVolume.toFixed(1));
  result = result.replace(/{cubeVolume}/g, cubeVolume.toFixed(1));

  // Method Overloads
  const squareArea = rand1 * rand1;
  const rectArea = rand2 * rand3;
  const circleArea = 3.14 * rand1 * rand1;
  result = result.replace(/{squareArea}/g, squareArea.toFixed(1));
  result = result.replace(/{rectArea}/g, rectArea.toFixed(1));
  result = result.replace(/{circleArea}/g, circleArea.toFixed(2));
  
  // Socket demo port
  const randPort = Math.floor(Math.random() * 5000) + 3000;
  result = result.replace(/{randPort}/g, randPort.toString());

  return result;
};
