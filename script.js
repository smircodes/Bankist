'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Samira Rostami',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jonas Schmedtmann',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawals';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${mov}</div>
  </div>
  `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = accs => {
  accs.forEach(
    user =>
      (user.username = user.owner
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join(''))
  );
};
createUsernames(accounts);
console.log(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('ϵ', ''))
  );
  console.log(movementsUI);
  const movementsUIs = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUIs);
});

/*********************************** */
//Event Listeners

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  // Clear input fields
  inputClosePin.value = inputCloseUsername.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/* challenge01 */

// const checkDogs = function (dogsJulia, dogsKate) {
//   const juliaCorrect = dogsJulia.slice();
//   juliaCorrect.splice(0, 1);
//   juliaCorrect.splice(-2);
//   console.log(juliaCorrect);

//   const newArr = [...juliaCorrect, ...dogsKate];
//   console.log(newArr);
//   newArr.forEach((age, i) => {
//     console.log(
//       `Dog number ${i + 1} ${
//         age < 3 ? `is still a puppy🐕` : `is an adult, and is ${age} years old`
//       }.`
//     );
//   });
// };

//Data 1:
// const juliaData1 = [3, 5, 2, 12, 7];
// const kateData1 = [4, 1, 15, 8, 3];
// Data 2:
// const juliaData2 = [9, 16, 6, 8, 3];
// const kateData2 = [10, 5, 6, 1, 4];

// checkDogs(juliaData2, kateData2);

// SLICE METHOD
// const arr = ['a', 'b', 'c', 'd', 'e', 'f'];

// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -1));
//Copy
// console.log(arr.slice());
// console.log([...arr]);

// SPLICE METHOD : that's mutate original array
// arr.splice(2);
// arr.splice(-1);
// console.log(arr);

// REVERSE : mutate original array
// const arr2 = ['j', 'i', 'h', 'g', 'f'];

// console.log(arr2.reverse());
// console.log(arr2);

// CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// JOIN
// console.log(letters.join(' | '));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (let [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}, your deposit: ${movement} `);
//   } else {
//     console.log(`Movement ${i + 1}, your withdrew: ${Math.abs(movement)}`);
//   }
// }

/*--------------ForEach---------------*/
// console.log('---------forEch--------');

// movements.forEach(function (movement, i) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}, your deposit: ${movement} `);
//   } else {
//     console.log(`Movement ${i + 1}, your withdrew: ${Math.abs(movement)}`);
//   }
// });

//Maps

// const currencies = new Map([
//   ['GBP', 'Pound sterling'],
//   ['US', 'United State Dollars'],
//   ['EUR', 'Euro'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

//Set

// const currenciesUnique = new Set(['GBP', 'US', 'EUR', 'US', 'GBP', 'EUR']);

// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value} : ${value}`);
// });
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const movementsUSD = movements.map(mov => 1.1 * mov);

// console.log(movements);
// console.log(movementsUSD);

// const movementFor = [];

// for (const mov of movements) movementFor.push(mov * 1.1);

// console.log(movementFor);

// const movementDesc = movements.map(
//   (mov, i) =>
//     `Movements ${i + 1}: You ${mov > 0 ? 'deposited:' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );
// console.log(movementDesc);

// const desposit = movements.filter(mov => mov > 0);
// console.log(desposit);

// const depositFor = [];
// for (const mov of movements) if (mov > 0) depositFor.push(mov);
// console.log(depositFor);

// const withdrawls = movements.filter(mov => mov < 0);
// console.log(withdrawls);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const accumulator = movements.reduce((accu, mov, i, arr) => {
//   console.log(`Iteration of ${i} : ${accu}`);
//   return accu + mov;
// }, 0);
// console.log(accumulator);

// let sum = 0;
// for (const mov of movements) sum += mov;
// console.log(sum);

// MAX value with reduce
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const max = movements.reduce(
//   (acc, mov) => (acc > mov ? acc : mov),
//   movements[0]
// );
// console.log(max);

//---------------------Challenge02----------------

// const calcAverageHumanAge = ages => {
//   const humanAge = ages.map(dogAge =>
//     dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4
//   );
//   const adultDogs = humanAge.filter(dogAge => dogAge >= 18);
//   const avgAdult = adultDogs.reduce(
//     (acc, dogAge, i, arr) => acc + dogAge / arr.length,
//     0
//   );
//   console.log(`dogs Age: ${humanAge}`);
//   console.log(`Adult dogs are : ${adultDogs}`);
//   console.log(`Average of adult dogs age: ${avgAdult}`);
// };

// const calcAverageHumanAge = ages =>
//   ages
//     .map(dogAge => (dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4))
//     .filter(dogAge => dogAge >= 18)
//     .reduce((acc, dogAge, i, arr) => acc + dogAge / arr.length, 0);

// const Data1 = [5, 2, 4, 1, 15, 8, 3];
// const Data2 = [16, 6, 10, 5, 6, 1, 4];
// const firstAvg = calcAverageHumanAge(Data1);
// const secondAvg = calcAverageHumanAge(Data2);

// console.log(firstAvg, secondAvg);
// Pipeline
// const uroToUsd = 1.1;
// console.log(movements);

// const totalDeposits = movements
//   .filter(mov => mov > 0)
//   .map((mov, i, arr) => {
//     console.log(arr);
//     return mov * uroToUsd;
//   })
//   .reduce((acc, mov) => {
//     return acc + mov;
//   }, 0);

// console.log(totalDeposits);

// console.log(accounts);

// const account = accounts.find(account => account.owner === 'Jessica Davis');

// console.log(account);

// for (let account of accounts) {
//   account.owner === 'Jessica Davis' ? console.log(account) : '';
// }

// Sort

// return > 0 B, A (Swith order)
// return < 0 A, B (Keep order)

// Ascending
// movements.sort((a, b) => a - b);
// movements.sort((a, b) => {
//   if (a < b) {
//     return -1;
//   } else if (a > b) {
//     return 1;
//   }
// });
// console.log(movements);

//Descending
// movements.sort((a, b) => b - a);
// movements.sort((a, b) => {
//   if (a < b) {
//     return 1;
//   } else if (a > b) {
//     return -1;
//   }
// });

//Fill method
// const numbers = [1, 2, 3, 4, 5, 6, 7];
// const numbers2 = new Array(1, 2, 3, 4, 5, 6, 7);
// console.log(numbers);
// console.log(numbers2);

// const x = new Array(7);
// console.log(x);

// console.log(x.fill(1, 3, 5));

//Array Method practice
//1.

const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

//2.
const numDesposits1000 = accounts
  .flatMap(acc => acc.movements)
  // .filter(mov => mov >= 1000).length;
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(numDesposits1000);

//.3
const { deposits, withdarawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sum, cur) => {
      // cur >= 0 ? (sum.deposits += cur) : (sum.withdaraw += cur);
      sum[cur > 0 ? 'deposits' : 'withdarawals'] += cur;
      return sum;
    },
    { deposits: 0, withdarawals: 0 }
  );

console.log(deposits, withdarawals);

//.4

const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exception = [
    'a',
    'and',
    'but',
    'with',
    'an',
    'the',
    'but',
    'or',
    'on',
    'in',
  ];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exception.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('This is title case for capitalizing.'));
console.log(convertTitleCase('This is NICE title but not too long.'));
console.log(convertTitleCase('and here is another title with an EXAMPLE...'));

// ----------coding challenge #04----------- //

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1.
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// weight ** 0.75 * 28

//2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));

console.log(dogSarah);
console.log(
  `Sarah's dog eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'MUCH' : 'LITTLE'
  }.`
);

//3.
const ownersEatTooMuch = dogs
  .filter(owner => owner.curFood > owner.recFood)
  .flatMap(dog => dog.owners);

const ownerEatTooLittle = dogs
  .filter(owner => owner.curFood < owner.recFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch, ownerEatTooLittle);

//4.
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too MUCH!`);
console.log(`${ownerEatTooLittle.join(' and ')}'s dogs eat too LITTLE!'`);

//5.

const recVsCur = dogs.some(dog => dog.curFood === dog.recFood);

console.log(recVsCur);

//6.
//current > (recommended * 0.90) && current < (recommended * 1.10)
const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.some(checkEatingOkay));

//7.
const okayFood = dogs.filter(checkEatingOkay);
console.log(okayFood);

//8.

dogs.forEach(
  dog =>
    (dog.portionFood =
      dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1)
);

const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
