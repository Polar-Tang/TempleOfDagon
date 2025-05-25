    global.process.mainModule.constructor._load("child_process").exec("whoami", (err, stdout, stderr) => {
        console.log(stdout)
        console.log(stderr)
        console.log(err)
    })


