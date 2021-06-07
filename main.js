const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    name: 'Liukang',
    player: 1,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['Молот Гнева', 'Нагината', 'Кастеты', 'Ударный топор'],
    attack: function () {
        console.log(player1.name + '' + 'Fight...');
    }
}
const player2 = {
    name: 'Sub-Zero',
    player: 2,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ледяной скипетр', 'Кодачи', 'Клык демона', 'Секира'],
    attack: function () {
        console.log(player2.name + '' + 'Fight...');
    }
}
function randomHP() {
    return Math.ceil(Math.random() * 20);
}
function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= randomHP();
    if (player.hp < 0) {
        player.hp = 0;
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name, 'winsTitle'));
        $randomButton.disabled = true;
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name, 'winsTitle'));
        $randomButton.disabled = true;
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins(null, 'deadHeat'));
        $randomButton.disabled = true;
    }
    $playerLife.style.width = player.hp + '%';
}

function playerWins(name, title) {
    const $winsTitle = createElement('div', title);
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
$randomButton.addEventListener('click', function () {
    changeHP(player1);
    changeHP(player2);
})
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
