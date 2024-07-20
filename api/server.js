const express = require('express');
const cors = require('cors');
const app = express();
// const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let votingData = {
    teamA: {
        q1: { true: 0, false: 0 },
        q2: { true: 0, false: 0 },
        q3: { true: 0, false: 0 },
        q4: { true: 0, false: 0 },
        q5: { true: 0, false: 0 }
    }, teamB: {
        q1: { true: 0, false: 0 },
        q2: { true: 0, false: 0 },
        q3: { true: 0, false: 0 },
        q4: { true: 0, false: 0 },
        q5: { true: 0, false: 0 }
    }
};

app.post('/vote', (req, res) => {
    const { teamQuestion, answer } = req.body;
    debugger
    const teamQuestionSplitted = teamQuestion.split('-');
    const team = teamQuestionSplitted[0];
    const question = teamQuestionSplitted[1]
    if (votingData[team][question]) {
        votingData[team][question][!answer]=0;
        votingData[team][question][answer]=0;
        votingData[team][question][answer]++;
        res.status(200).send(votingData);
    } else {
        res.status(400).send('Invalid question');
    }
});

app.get('/results', (req, res) => {
    res.status(200).send(votingData);
});

module.exports = app;


// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

