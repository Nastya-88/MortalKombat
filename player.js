
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
function attack() {
    console.log(this.name + '' + 'Fight...');
};
function changeHP(damage) {
    if (this.hp < damage) {
        this.hp = 0;
    } else {
        this.hp -= damage;
    }
};
function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}
function renderHP() {
    return this.elHP().style.width = this.hp + '%';
}

export { player1, player2, attack, changeHP, elHP, renderHP };