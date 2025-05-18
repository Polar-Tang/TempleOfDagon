global.process.mainModule.constructor._load("child_process").exec("ping -c 10 127.0.0.1", (err, stdout, stderr) => {
    console.log(stdout)
    console.log(stderr)
    console.log(err)
})

