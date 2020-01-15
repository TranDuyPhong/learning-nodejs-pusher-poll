const express = require('express');
const Pusher = require('pusher');

const VoteModel = require('../models/Vote');

const router = express.Router();

const pusher = new Pusher({
    appId: '932057',
    key: '15c582b23992bcac3a50',
    secret: '3c0b8b8db867fa37f190',
    cluster: 'ap1',
    encrypted: true
});

router.get('/', (req, res) => {
    VoteModel.find().then(votes => {
        res.json({
            success: true,
            votes: votes
        });
    }).catch(err => {
        console.error(err);
        res.json({
            success: false,
            votes: []
        });
    });
});

router.post('/', (req, res) => {
    const os = req.body.os;
    const points = 1;

    const newVote = {
        os: os,
        points: points
    };

    new VoteModel(newVote)
    .save()
    .then(vote => {
        pusher.trigger('os-poll', 'os-vote', {
            points: parseInt(vote.points),
            os: vote.os
        });
        return res.json({
            success: true,
            message: 'Thank you for voting'
        });
    })
    .catch(err => {
        console.error(err);
        return res.json({
            success: false,
            message: 'Occurs'
        });
    });
});

module.exports = router;