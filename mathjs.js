const http = require('http')
const math = require('mathjs')

http.createServer(function (req, res) {
    let result = ''
    let expression = ''
    req.on('data', function(data) {
        expression += data
        result += math.evaluate(expression)
    })
    req.on('end', function() {
        res.end(result)
    })
}).listen(8080)