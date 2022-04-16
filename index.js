const guy = document.getElementById('guy');
const coin = document.getElementById('coin');
const score = document.querySelector('span');

let PlayerPosition = getPosition(guy);
let CoinPosition = getPosition(coin);

setRandomCoinPosition();

document.body.addEventListener('keydown', function(event) {
    const key = event.key;
    guy.style.left = getComputedStyle(guy).left;
    guy.style.top = getComputedStyle(guy).top;

    switch (key) {
        case 'ArrowRight':
            guy.style.transform = 'rotateY(0deg)';
            guy.style.left = `${parseInt(guy.style.left) + 10}px`;
            if (parseInt(guy.style.left) + guy.width > innerWidth) {
                guy.style.left = `${innerWidth - guy.width}px`;
            }
            break;
        case 'ArrowLeft':
            guy.style.transform = 'rotateY(180deg)';
            guy.style.left = `${parseInt(guy.style.left) - 10}px`;
            if (parseInt(guy.style.left) < 0) {
                guy.style.left = '0px';
            }
            break;
        case 'ArrowUp':
            guy.style.top = `${parseInt(guy.style.top) - 10}px`;
            if (parseInt(guy.style.top) < 0) {
                guy.style.top = '0px';
            }
            break;
        case 'ArrowDown':
            guy.style.top = `${parseInt(guy.style.top) + 10}px`;
            if (parseInt(guy.style.top) + guy.height > innerHeight) {
                guy.style.top = `${innerHeight - guy.height}px`;
            }
            break;
    }

    PlayerPosition = getPosition(guy);
    CoinPosition = getPosition(coin);
    // if player has cought the coin ...
    if (CoinPosition.Left > PlayerPosition.Left && 
        CoinPosition.Right < PlayerPosition.Right &&
        CoinPosition.Top > PlayerPosition.Top &&
        CoinPosition.Bottom < PlayerPosition.Bottom) {
            score.innerText = `${parseInt(score.innerText) + 1}`;
            coin.classList.toggle('caught-coin');
            score.classList.toggle('caught-span');
            setRandomCoinPosition();
            setTimeout(function() {
                coin.classList.toggle('caught-coin');
                score.classList.toggle('caught-span');
            }, 1000);
            
        }
});

function setRandomCoinPosition() {
    getX = () => Math.floor(Math.random() * (innerWidth + 1 - coin.width));
    getY = () => Math.floor(Math.random() * (innerHeight + 1 - coin.height));

    do {
        CoinPosition.Left = getX();
        CoinPosition.Right = CoinPosition.Left + coin.width;
        CoinPosition.Top = getY();
        CoinPosition.Bottom = CoinPosition.Top + coin.height;
    } while (CoinPosition.Left > PlayerPosition.Left && 
        CoinPosition.Right < PlayerPosition.Right &&
        CoinPosition.Top > PlayerPosition.Top &&
        CoinPosition.Bottom < PlayerPosition.Bottom);

    coin.style.left = `${CoinPosition.Left}px`;
    coin.style.top = `${CoinPosition.Top}px`;
}

function getPosition(obj) {
    const Left = parseInt(getComputedStyle(obj).left);
    const Right = Left + obj.width;
    const Top = parseInt(getComputedStyle(obj).top);
    const Bottom = Top + obj.height;
    return { Left, Right, Top, Bottom };
}