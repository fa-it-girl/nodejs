const express = require('express')
const bodyParser = require('body-parser')
const adminRouter = require('./routes/admin')
const shopRouter = require('./routes/shop')
const path = require('path')
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(adminRouter)
app.use(shopRouter)

app.use((req, res, next) => {
   res.status(404).sendFile(path.join(__dirname, 'views', 'error-page.html'))
});

app.listen(8080)
