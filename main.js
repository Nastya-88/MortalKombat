import { getRandom } from './utils.js';
import { player1, player2 } from './player.js';
import { generateLogs } from './log.js';

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $randomButton = document.querySelector('.button');


const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
};

const playerWins = (name) => {
    const $winsTitle = createElement('div', 'winsTitle');
    $winsTitle.innerText = (name) ? name + ' Wins!!!' : 'Dead Heat!';
    return $winsTitle;
};

const createPlayer = ({ name, hp, img, player }) => {
    const $player = createElement('div', 'player' + player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $name = createElement('div', 'name');
    const $life = createElement('div', 'life');
    const $image = createElement('img');

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $life.style.width = hp + '%';
    $name.innerText = name;
    $image.src = img;
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($image);

    return $player;
};

const createReloadButton = () => {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');
    $button.innerText = 'Restart';
    $button.addEventListener('click', function () {
        window.location.reload();
    })
    $reloadWrap.appendChild($button);
    $arenas.appendChild($reloadWrap);
};

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));


const playerAttack = () => {
    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }
    return attack;
}

const enemyAttack = () => {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
};

const showMessage = () => {
    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        createReloadButton();
    }
    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
        generateLogs('draw');
    }
};
const gameStart = () => {
    generateLogs('start', player1, player2);
    $formFight.addEventListener('submit', function (event) {
        event.preventDefault();
        const enemy = enemyAttack();
        const player = playerAttack();

        if (player.defence !== enemy.hit) {
            player1.changeHP(enemy.value);
            player1.renderHP();
            generateLogs('hit', player2, player1, enemy.value);
        } else {
            generateLogs('defence', player2, player1);
        }
        if (enemy.defence !== player.hit) {
            player2.changeHP(player.value);
            player2.renderHP();
            generateLogs('hit', player1, player2, player.value);
        } else {
            generateLogs('defence', player1, player2);
        }

        showMessage();
    });
};
setTimeout(gameStart(), 1000);






