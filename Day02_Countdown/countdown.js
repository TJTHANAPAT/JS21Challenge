(()=>{
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    function setElementInnerText(id, text) {
        const element = document.getElementById(id);
        element.innerText = text
    }
    function countdown(){
        const now = new Date().getTime();
        const HNY2021 = new Date('December 31, 2020 23:59:59').getTime();
        const timeLeft = HNY2021 - now;
        setElementInnerText('days', Math.floor(timeLeft / day))
        setElementInnerText('hours', Math.floor(timeLeft % day / hour))
        setElementInnerText('minutes', Math.floor(timeLeft % hour / minute))
        setElementInnerText('seconds', Math.floor(timeLeft % minute / second))
    }
    function run(){
        countdown();
        setInterval(countdown,second)
    }
    run();
})();