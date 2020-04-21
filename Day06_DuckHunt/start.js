(() => {
    const duckWidth = 100; // unit in px
    const duckHeight = 100; // unit in px
    const numberOfDuck = 10;
    random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    createDucks = () =>{
        return ducks = [...Array(numberOfDuck)].map(() => {
            return {
                x:random(0, window.innerWidth - duckWidth),
                y:window.innerHeight - duckHeight,
                speedX: random(-50,50),
                speedY: random(5,10)

            }
        })
    }

    setupDuckElement = (duck) => {
        const duckElem = document.createElement('div');
        duckElem.className = 'duck';
        duckElem.style.width = `${duckWidth}px`;
        duckElem.style.height = `${duckHeight}px`;
        duckElem.style.left = `${duck.x}px`;
        duckElem.style.top = `${duck.y}px`;
        duckElem.style.backgroundImage = `url(./left-1.png)`;
        document.body.appendChild(duckElem);
        console.log(duckElem);

        return {duck, duckElem};
    }

    getDuckBackgroundImage = (duck, duckElem) => {
        const direction = duck.speedX > 0 ? 'right' : 'left';
        return duckElem.style.backgroundImage.indexOf('1') !== -1 ? 
            `url(./${direction}-2.png)` : 
            `url(./${direction}-1.png)`
    }

    moveDuck = (duck, duckElem) => {
        const { x, y, left, top, width, height } = duckElem.getBoundingClientRect();
        console.log(duckElem.getBoundingClientRect())
        const outOfBoundX = duck.x < 0 || duck.x + width > window.innerWidth;
        const outOfBoundY = duck.y < 0 || duck.y + height > window.innerHeight;

        if (outOfBoundX) {
            duck.speedX *= -1;
        }
        if (outOfBoundY) {
            duck.speedY *= -1;
        }
        duck.x = left + duck.speedX;
        duck.y = top + duck.speedY;
        duckElem.style.left = `${duck.x}px`;
        duckElem.style.top = `${duck.y}px`;
        duckElem.style.backgroundImage = getDuckBackgroundImage(duck, duckElem);
        
    }

    shootDuck = (event) => {
        const duckElem = event.target;
        duckElem.style.transition = 'top 2s';
        duckElem.style.top = `${window.innerHeight}px`
        clearInterval(duckElem.interval);
        setTimeout(() => {
            document.body.removeChild(duckElem);
            const duck = document.querySelector('.duck');
            if (!duck) {
                const winningElem = document.createElement('h1');
                const winningElemText = document.createTextNode('YOU WIN!')
                winningElem.className = 'winning';
                winningElem.appendChild(winningElemText);
                document.body.appendChild(winningElem);
            }
        }, 2000)
    } 
    

    run = () => {
        const startElem = document.getElementById('start');
        document.addEventListener('click', ()=>{
            document.body.removeChild(startElem);

            const ducks = createDucks(); 
            const duckElems = ducks.map(setupDuckElement)

            duckElems.forEach( ({ duck, duckElem }) => {
                duckElem.interval = setInterval(() => moveDuck(duck, duckElem),100);
                duckElem.addEventListener('click', shootDuck);
            });
        })
        
    }

    run()

})();
