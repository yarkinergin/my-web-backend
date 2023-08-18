const express = require('express')
const router = express.Router()
const Skill = require('../models/skills')

const middleware = require('../middlewares')

router.post('/skills', (req, res) => {
    Skill.find({})
    .then(skill => {
        if(!skill) res.status(404).json({error: 'no user with that email found'})
        else res.status(200).json({skill})
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.post('/skills-reg', (req, res) => {
    Skill.findOne({email: req.body.email, header: req.body.header})
    .then(skill => {
        if(!skill) {
            res.status(404).json({error: 'No skill found with that header.'})
        }
        else {
            skill.header = req.body.header
            skill.text = req.body.text
            skill.save()
            .then(skill => {
                res.status(200).json({email: req.body.email, header: skill.header, text: skill.text})
            })
            .catch(error => {
                res.status(500).json(error)
            })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

router.post('/skills-add', (req, res) => {
    Skill.findOne({email: req.body.email, header: req.body.header})
    .then(skill => {
        if(!skill) {
            const newSkill =  Skill({email: req.body.email, header: req.body.header, text: req.body.text})
            newSkill.save()
            .then(skill => {
                res.status(200).json({email: req.body.email, header: req.body.header, text: req.body.text})
            })
            .catch(error => {
                res.status(500).json(error)
            })
        }
        else {
            res.status(400).json({error: 'Skill header already exists'})
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.post('/skills-del', (req, res) => {
    Skill.deleteOne({email: req.body.email, header: req.body.header})
    .then(skill =>{
        res.status(200).json("Data deleted")
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

module.exports = router
