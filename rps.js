'use strict';

window.gameRSP = (() => {
  const FIGURE_ENG = ['rock', 'scissors', 'paper'];
  const FIGURE_RUS = ['камень', 'ножницы', 'бумага'];

  const WORDS_RU = ['Компьютер', 'Ты', 'Результат игры', 'выиграл', 'Ничья', 'Вы точно хотите выйти?'];
  const WORDS_ENG = ['PS', 'You', 'Game result', 'won', 'Draw', 'Are you sure?'];

  const getRandomInclusive = (min, max) =>
    Math.round(Math.random() * (max - min) + min);

  const getFigure = lang => {
    const figures = lang === 'EN' || lang === 'ENG' ?
      FIGURE_ENG : FIGURE_RUS;
    const figure = figures[getRandomInclusive(0, (figures.length - 1))];
    return figure;
  }

  const game = (language) => {
    const result = {
      player: 0,
      computer: 0,
    };
    const lang = language === 'EN' || language === 'ENG' ?
      FIGURE_ENG : FIGURE_RUS;

    const words = language === 'EN' || language === 'ENG' ?
      WORDS_ENG : WORDS_RU;

    const message = lang.map(item => item.concat('? ')).join('');

    const condition = (a, b) => {
      let winner;
      if (a === b) {
        winner = words[4];
      } else {
        winner = getWinner(a, b) === lang[a] ? words[0] : words[1];
        if (winner === words[0]) {
          result.computer += 1;
        } else {
          result.player += 1;
        }
        winner += ' ' + words[3];
      }
      return alert(
        `${words[0]}: ${lang[a]}
        ${words[1]}: ${lang[b]}
        ${winner}`
      )
    }

    const getWinner = (f, s) => {
      const min = f > s ? s : f;
      const max = f < s ? s : f;
      if (min === 0 && max === 2) {
        return lang[max];
      } else {
        return lang[min];
      }
    }

    return function start() {
      const playerQuest = prompt(message);
      if (playerQuest === null) {
        if (confirm(`${words[5]}`)) {
          return alert(
            `${words[2]}:
            ${words[0]}: ${result.computer}
            ${words[1]}: ${result.player}`
          )
        } else {
          return start();
        }
      }
      const computerVariant = getFigure(language);
      const playerVariant = playerQuest[0] || '';

      const indexComp = lang.indexOf(computerVariant);
      const indexPlayer = lang.indexOf(lang.find(element => element[0] === playerVariant));
      if (indexPlayer < 0) {
        return start();
      }

      condition(indexComp, indexPlayer);
      start();
    };
  };

  return {
    game,
  };
})();

