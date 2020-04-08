(()=>{
    let timePassed = 0
    const stopwatch = document.getElementById('stopwatch')
    stopwatch.innerText = timePassed
    setInterval(() => {
        timePassed += 1
        stopwatch.innerText = timePassed
        console.log(timePassed + ' sec has passed.')
    }, 1000);
    
    //Promise
    function consoleLogTimeout(text,timeout) {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                if (text === 'Test Error') {
                    return reject('Rejected!!')
                }
                console.log(text)
                resolve()
            }, timeout)
        })
        
    }
    console.log('Promise, like Callback, help to excute code in order. It fixes \'Callback Hell\' problem.')
    consoleLogTimeout('A - Show this first | This command must appear after 5 sec', 5000)
        .then(()=>{
            return consoleLogTimeout('B - Show this second | This command must appear after the command before finished 2 sec', 2000)
        })
        .then(()=>{
            return consoleLogTimeout('C - Show this third | This command must appear after the command before finished 3 sec', 3000)
        })
        .then(()=>{
            return consoleLogTimeout('Test Error', 2000)
        })
        .catch(error =>{
            console.error(error)
        })
    
    
})();