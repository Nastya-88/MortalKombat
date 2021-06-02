const player1 = {
    name: 'Liukang',
    hp: 60,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['Молот Гнева', 'Нагината', 'Кастеты', 'Ударный топор'],
    attack: function () {
        console.log(player1.name + '' + 'Fight...');
    }
}
const player2 = {
    name: 'Sub-Zero',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ледяной скипетр', 'Кодачи', 'Клык демона', 'Секира'],
    attack: function () {
        console.log(player2.name + '' + 'Fight...');
    }
}
function createPlayer(player, obj) {
    const $arenas = document.querySelector('.arenas');

    const $player1 = document.createElement('div');
    $player1.classList.add(player);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');

    const $character = document.createElement('div');
    $character.classList.add('character');

    $player1.appendChild($progressbar);
    $player1.appendChild($character);

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = '100%';

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = obj.name;

    const $image = document.createElement('img');
    $image.src = obj.img;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($image);

    $arenas.appendChild($player1);

}

createPlayer('player1', player1);
createPlayer('player2', player2);