const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');


const player1 = {
    name: 'Liukang',
    player: 1,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['Молот Гнева', 'Нагината', 'Кастеты', 'Ударный топор'],
    attack: function () {
        console.log(this.name + '' + 'Fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
    createReloadButton: createReloadButton,
};

const player2 = {
    name: 'Sub-Zero',
    player: 2,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ледяной скипетр', 'Кодачи', 'Клык демона', 'Секира'],
    attack: function () {
        console.log(this.name + '' + 'Fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
    createReloadButton: createReloadButton,
};


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
    return $reloadWrap;
};

$randomButton.addEventListener('click', function () {
    player1.changeHP(getRandom(20));
    player1.renderHP();
    player2.changeHP(getRandom(20));
    player2.renderHP();
    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        player1.createReloadButton();
        player2.createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    }

});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
