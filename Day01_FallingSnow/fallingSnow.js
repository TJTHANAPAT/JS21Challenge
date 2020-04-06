(() => {
    function setup() {
        const canvas = document.getElementById('falling-snow-canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        return {
            canvas,
            canvasContext: canvas.getContext('2d'),
            numberOfSnowBalls: 70
        }
    }

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function createSnowBalls(canvas, numberOfSnowBalls) {
        return [...Array(numberOfSnowBalls)].map(()=>{
            const speedXmin = -2;
            const speedXmax = 2;
            let speedX = random(speedXmin,speedXmax);
            while(speedX == 0) {
                speedX = random(speedXmin,speedXmax);
                if( speedX != 0) {
                    break;
                }
            }
            return {
                x: random(0,canvas.width),
                y: random(0,canvas.height),
                opacity: random(0.5,1),
                radius: random(4,50),
                speedX: speedX,
                speedY: random(-2,-1),
                color: random(0,2)
            }
        });
    }

    function createSnowBallDrawer(canvasContext) {
        return snowBall => {
            canvasContext.beginPath();
            canvasContext.arc(
                snowBall.x, 
                snowBall.y, 
                snowBall.radius, 
                0, 
                Math.PI*2
            );
            
            if (snowBall.color === 0) {
                canvasContext.fillStyle = `rgba(0, 255, 166, ${snowBall.opacity})`;
            } else if(snowBall.color === 1) {
                canvasContext.fillStyle = `rgba(255, 0, 72, ${snowBall.opacity})`;
            } else if(snowBall.color === 2) {
                canvasContext.fillStyle = `rgba(0, 119, 255, ${snowBall.opacity})`;
            }
            canvasContext.fill();
        };
    }

    function createSnowBallMover(canvas) {
        return snowBall => {
            snowBall.x += snowBall.speedX;
            snowBall.y += snowBall.speedY;

            if (snowBall.x - snowBall.radius > canvas.width) {
                snowBall.x = - snowBall.radius;
            } else if (snowBall.x + snowBall.radius < 0) {
                snowBall.x = canvas.width + snowBall.radius;
            }
            
            if (snowBall.y - snowBall.radius > canvas.height) {
                snowBall.y = -snowBall.radius;
            } else if (snowBall.y + snowBall.radius < 0) {
                snowBall.y = canvas.height + snowBall.radius;
            }
        };
        

    }

    function run() {
        const {
            canvas,
            canvasContext,
            numberOfSnowBalls
        } = setup();

        const snowBalls = createSnowBalls(canvas, numberOfSnowBalls);
        const moveSnowBall = createSnowBallMover(canvas)
        const drawSnowBall = createSnowBallDrawer(canvasContext)
        
        setInterval(()=>{
            canvasContext.clearRect(0,0,canvas.width,canvas.height)
            snowBalls.forEach(drawSnowBall);
            snowBalls.forEach(moveSnowBall);
        }, 50)

        /*setInterval(()=>{
            console.log("Random " + random(0,3))
        }, 1000)*/
    }

    run();
})();