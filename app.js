const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// const users = [{
//     name: 'Ihor',
//     age: 38
// }, {
//     name: 'Marina',
//     age: 39
// }, {
//     name: 'David',
//     age: 14
// }];

app.get('/users', (req, res) => {
    // res.json(users)
});

app.get('/users:userId', (req, res) => {
   const { userId } = req.params;
});

app.post('/users', (req, res) => {
    console.log(req.body)
    res.json({})
});

app.get('/welcome', (req, res) => {
    res.send('welcome');
});

const PORT = 5100;

app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`)
})
