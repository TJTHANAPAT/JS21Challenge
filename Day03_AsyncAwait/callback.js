(()=>{
    let timePassed = 0
    const stopwatch = document.getElementById('stopwatch')
    stopwatch.innerText = timePassed
    setInterval(() => {
        timePassed += 1
        stopwatch.innerText = timePassed
        console.log(timePassed + ' sec has passed.')
    }, 1000);
    
    //Callback
    function consoleLogTimeout(text,timeout,callback) {
        setTimeout(()=>{
            console.log(text)
            callback()
        }, timeout)
    }
    
    console.log('Callback help to excute code in order. The command runs after the before command has finished.')
    consoleLogTimeout('A - Show this first | This command must appear after 5 sec', 5000, ()=>{
        consoleLogTimeout('B - Show this second | This command must appear after the command before finished 2 sec', 2000, ()=>{
            consoleLogTimeout('C - Show this third | This command must appear after the command before finished 3 sec', 3000, ()=>{})
        })
    })
    
    
})();