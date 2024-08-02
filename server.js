const express = require('express');
const mailgun = require('mailgun-js');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const api_key = '5b035e628620d9e59092a111a44e420d-afce6020-cf84356d';
const domain = 'sandbox6664d355822c43fc9619f8e690fc4a8d.mailgun.org';
const mg = mailgun({ apiKey: api_key, domain: domain });

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).send('Email is required');
    }

    const data = {
        from: 'Excited User <nimeshmakevitage@gmail.com>',
        to: 'nimeshmakevitage@gmail.com', 
        subject: 'Welcome email!',
        text: 'Hello subscribers\nWelcome To Daily Insider.'
    };

    mg.messages().send(data, function (error, body) {
        if (error) {
            console.log(error);
            return res.status(500).send('Failed to send email');
        } else {
            console.log(body);
            return res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
