'use strict';

window.marbles = (() => {
  const FIGURE_RUS = ['камень', 'ножницы', 'бумага'];
  const WORDS_RU = ['Компьютер', 'Ты', 'Результат игры', 'выиграл', 'Ничья', 'Вы точно хотите выйти?'];

  const startMessage = () => {
    console.log('Старт игры');
    console.log(`Количество шариков:
Игрок: 5
Бот: 5`);
  };

  const getRandomDigit = (min, max) =>
    Math.round(Math.random() * (max - min) + min);


  const defineEvenOdd = digit => {
    if (digit % 2) {
      return 'Нечет';
    }
    return 'Чёт';
  };

  const gameMarbels = (turn) => {
    const result = {
      player: 5,
      bot: 5,
      queue: turn || 0,
    }

    return function start() {
      const botNumber = getRandomDigit(1, result.bot);
      const botAnswer = defineEvenOdd(botNumber);

      if (!(result.queue % 2)) {
        const userNumber = prompt(`Введите число от 1 до ${result.player}`);
        if (userNumber === null) {
          if (confirm('Вы уверенны, что хотите выйти?')) {
            return;
          } else {
            return start();
          }
        } else if (+userNumber > result.player || +userNumber < 1 || Number.isNaN(+userNumber)) {
          console.log(+userNumber);
          return start();
        }

        const userAnswer = defineEvenOdd(+userNumber);

        if (userAnswer === botAnswer) {
          result.player -= (+userNumber);
          result.bot += (+userNumber);
        } else {
          result.player += (+userNumber);
          result.bot -= (+userNumber);
        }

      } else {
        const userAnswer = confirm('Число чётное?') ? 'Чёт' : 'Нечет';
        if (userAnswer === botAnswer) {
          result.player += (+botNumber);
          result.bot -= (+botNumber);
        } else {
          result.player -= (+botNumber);
          result.bot += (+botNumber);
        }
      }

      console.log("Вы: " + result.player, "Бот: " + result.bot);
      if (result.player <= 0 || result.bot <= 0) {
        const endGame = result.player > result.bot ? confirm('Вы выиграли и останетесь в живых! Хотите сыграть ещё?') :
          confirm('Вы проиграли... Хотите сыграть ещё?');
        if (endGame) {
          return game()();
        };
        return;
      }

      result.queue += 1;
      return start();
    }
  };

  const getRandomInclusive = (min, max) =>
    Math.round(Math.random() * (max - min) + min);

  const getFigure = () => {
    const figure = FIGURE_RUS[getRandomInclusive(0, (FIGURE_RUS.length - 1))];
    return figure;
  };

  const game = () => {
    startMessage();

    const words = WORDS_RU;

    const message = FIGURE_RUS.map(item => item.concat('? ')).join('');

    const condition = (a, b) => {
      let winner;
      if (a === b) {
        winner = words[4];
      } else {
        winner = getWinner(a, b) === FIGURE_RUS[a] ? words[0] : words[1];
        alert(
          `${words[0]}: ${FIGURE_RUS[a]}
          ${words[1]}: ${FIGURE_RUS[b]}
          ${winner} выиграл.`);
        if (winner === words[0]) {
          gameMarbels(1)();
        } else {
          gameMarbels()();
        }
      }
    };

    const getWinner = (f, s) => {
      const min = f > s ? s : f;
      const max = f < s ? s : f;
      if (min === 0 && max === 2) {
        return FIGURE_RUS[max];
      } else {
        return FIGURE_RUS[min];
      }
    }

    return function start() {
      const playerQuest = prompt(message);
      if (playerQuest === null) {
        if (confirm(`${words[5]}`)) {
          return;
        } else {
          return start();
        }
      }
      const computerVariant = getFigure();
      const playerVariant = playerQuest[0] || '';

      const indexComp = FIGURE_RUS.indexOf(computerVariant);
      const indexPlayer = FIGURE_RUS.indexOf(FIGURE_RUS.find(element => element[0] === playerVariant));
      if (indexPlayer < 0) {
        return start();
      };

      if (indexComp === indexPlayer) {
        alert(`${words[4]}. Попробуйте ещё раз...`)
        return start();
      }
      condition(indexComp, indexPlayer);
    };
  };

  return {
    game,
  };
})();

