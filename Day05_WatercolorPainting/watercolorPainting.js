(()=>{

    const canvas = document.getElementById('painting');

    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let previousPoint = { };

    getDistance = (previousPoint, currentPoint) => {
        return Math.sqrt((previousPoint.x - currentPoint.x)**2 + (previousPoint.y - currentPoint.y)**2)
    }
    onMouseMove = ({ pageX, pageY }) => {
        const currentPoint = { x: pageX, y: pageY};

        const distance = getDistance(previousPoint, currentPoint);
        const opacity = Math.min(0.5, 1/distance);

        context.beginPath();
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.lineWidth = Math.random()/ distance * 40 + 5;
        context.strokeStyle = `rgba(255, 157, 0, ${opacity})`;
        context.moveTo(previousPoint.x, previousPoint.y);
        context.lineTo(currentPoint.x, currentPoint.y);

        context.stroke();
        context.closePath();

        previousPoint = currentPoint;
    }

    onMouseEnter = ({ pageX, pageY }) => {
        previousPoint.x = pageX;
        previousPoint.y = pageY;
    }

    run = () => {
        canvas.addEventListener('mouseEnter', onMouseEnter);
        canvas.addEventListener('mousemove', onMouseMove);
        
    }

    run();
})();