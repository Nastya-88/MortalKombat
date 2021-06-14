const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $randomButton = document.querySelector('.button');
const $chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    name: 'Liukang',
    player: 1,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['Молот Гнева', 'Нагината', 'Кастеты', 'Ударный топор'],
    attack,
    changeHP,
    elHP,
    renderHP,
};

const player2 = {
    name: 'Sub-Zero',
    player: 2,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ледяной скипетр', 'Кодачи', 'Клык демона', 'Секира'],
    attack,
    changeHP,
    elHP,
    renderHP,
};

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

function attack() {
    console.log(this.name + '' + 'Fight...');
}

function getRandom(num) {
    return Math.ceil(Math.random() * num);
}
function playerWins(name) {
    const $winsTitle = createElement('div', 'winsTitle');
    $winsTitle.innerText = (name) ? name + ' Wins!!!' : 'Dead Heat!';
    return $winsTitle;
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}
function createPlayer(obj) {
    const $player = createElement('div', 'player' + obj.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $name = createElement('div', 'name');
    const $life = createElement('div', 'life');
    const $image = createElement('img');

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $life.style.width = obj.hp + '%';
    $name.innerText = obj.name;
    $image.src = obj.img;
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($image);

    return $player;
}

function changeHP(damage) {
    if (this.hp < damage) {
        this.hp = 0;
    } else {
        this.hp -= damage;
    }
};
function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
};
function renderHP() {
    this.elHP().style.width = this.hp + '%';
};
function createReloadButton() {
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


function playerAttack() {
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

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
};

function showMessage() {
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
function gameStart() {
    generateLogs('start', player1, player2);
    $formFight.addEventListener('submit', function (event) {
        event.preventDefault();
        const enemy = enemyAttack();
        const player = playerAttack();

        if (player.defence !== enemy.hit) {
            player1.changeHP(enemy.value);
            player1.renderHP();
            generateLogs('hit', player2, player1, enemy.value);
        }
        if (enemy.defence !== player.hit) {
            player2.changeHP(player.value);
            player2.renderHP();
            generateLogs('hit', player1, player2, player.value);
        }

        showMessage();
    });
};
setTimeout(gameStart(), 1000);
function getDate() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return `${hours}:${minutes}:${seconds}`;
}

function generateLogs(type, player1, player2, damage) {
    let text = logs[type];
    let el = ``;

    switch (type) {
        case 'start':
            text = text.replace('[player1]', player1.name).replace('[player2]', player2.name).replace('[time]', getDate()).replace(' ', ' ').replace(' ', ' ');
            el = `<p>${text}</p>`;
            break;
        case 'end':
            text = text[getRandom(logs[type].length - 1)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            el = `<p>${text}</p>`;
            break;
        case 'hit':
        case 'defence':
            text = text[getRandom(text.length - 1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            el = `<p>${getDate()} ${text}${damage} ${[player2.hp]}/100</p>`;
            break;
        case 'draw':
            text = text[getRandom(logs[type].length - 1)];
            el = `<p>${text}</p>`;
            break;
    };

    $chat.insertAdjacentHTML('afterbegin', el);
}



