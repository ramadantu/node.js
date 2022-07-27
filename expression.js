const http = require('http')

function evil(fn) {
    return new Function('return ' + fn)()
}

http.createServer(function (req, res) {
    let result = ''
    let expression = ''
    req.on('data', function(data) {
        expression += data
        result += evil(expression)
    })
    req.on('end', function() {
        res.end(result)
    })
}).listen(8080)