const math = require('mathjs')
const express = require('express')
const rateLimit = require("express-rate-limit")
const app = express()

const expression = []
const result = { result : '' }

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const bodyLimiter = (req, res, next) => {
    if (Object.keys(req.body).length <= 1) {
        expression.push(req.body)
        result.result = math.evaluate(expression[0].expression)
        next()
    } else {
        res.status(500)
        res.send('The body size is too long!')
        res.end()
    }
}

const connectionLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20
})

app.use(bodyLimiter)

app.post("/calculate", connectionLimiter, (req, res) => {
    res.status(200)
    res.send(result)
})

app.listen(8080)