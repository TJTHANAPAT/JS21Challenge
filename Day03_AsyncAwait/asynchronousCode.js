(()=>{
    let timePassed = 0
    const stopwatch = document.getElementById('stopwatch')
    stopwatch.innerText = timePassed
    setInterval(() => {
        timePassed += 1
        stopwatch.innerText = timePassed
        console.log(timePassed + ' sec has passed.')
    }, 1000);
    
    //Asynchronous Code
    function consoleLogTimeout(text,timeout) {
        setTimeout(()=>{
            console.log(text)
        }, timeout)
    }
    console.log('Asynchronous Code is the way each command can execute independently and does not have to wait until command that come before completing execution.')
    consoleLogTimeout('A | This command was at Line 8 and must appear after 5 sec', 5000)
    consoleLogTimeout('B | This command was at Line 9 and must appear after 2 sec', 2000)
    
})();