const math = require('mathjs')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const expression = []
const result = { result : '' }

app.post("/calculate", (req, res) => {
    expression.push(req.body)
    result.result = math.evaluate(expression[0].expression)
    res.status(200)
    res.send(result)
})

app.listen(8080)