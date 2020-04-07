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
            const speedXmin = -3;
            const speedXmax = 3;
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
                opacity: Math.random(),
                radius: random(15,100),
                speedX: speedX,
                speedY: random(-2,-1),
                color: random(0,3)
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
                canvasContext.fillStyle = `rgba(255, 51, 0, ${snowBall.opacity})`; //red
            } else if(snowBall.color === 1) {
                canvasContext.fillStyle = `rgba(30, 199, 120, ${snowBall.opacity})`; //green
            } else if(snowBall.color === 2) {
                canvasContext.fillStyle = `rgba(0, 166, 255, ${snowBall.opacity})`; //blue
            } else if(snowBall.color === 3) {
                canvasContext.fillStyle = `rgba(255, 233, 64, ${snowBall.opacity})`; //yellow
            }
            canvasContext.fill();
        };
    }

    function createSnowBallMover(canvas) {
        return snowBall => {
            snowBall.x += snowBall.speedX;
            snowBall.y += snowBall.speedY;

            //NormalMover (No Bounce)
            /*if (snowBall.x - snowBall.radius > canvas.width) {
                snowBall.x = - snowBall.radius;
            } else if (snowBall.x + snowBall.radius < 0) {
                snowBall.x = canvas.width + snowBall.radius;
            }*/

            //Bounce SnowBall when it reaches edge
            if ((snowBall.speedX > 0) && (snowBall.x + snowBall.radius > canvas.width)) {
                snowBall.speedX = -snowBall.speedX;
            } else if ((snowBall.speedX < 0) && (snowBall.x - snowBall.radius < 0)) {
                snowBall.speedX = -snowBall.speedX;
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