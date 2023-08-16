const express = require('express')
const router = express.Router()
const About = require('../models/about')

const middleware = require('../middlewares')

router.get('/about', (req, res) => {
    About.findOne({})
    .then(about => {
        if(!about) res.status(404).json({error: 'no user with that email found'})
        else{
            res.status(200).json({
                name: about.name,
                info: about.info,
                aboutme: about.aboutme,
                location: about.location,
                nationality: about.nationality,
                study: about.study,
                age: about.age,
                interests: about.interests,
                employment: about.employment
            })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.post('/about-reg', (req, res) => {
    About.findOne({email: req.body.email})
    .then(about => {
        if(!about) {
            const newAbout = About({ 
                email: req.body.email,
                name: req.body.name, 
                info: req.body.info, 
                aboutme: req.body.aboutme,
                location: req.body.location,
                nationality: req.body.nationality,
                study: req.body.study,
                age: req.body.age,
                interests: req.body.interests,
                employment: req.body.employment
            })
        
            newAbout.save()
            .then(about => {
                res.status(200).json({
                    email: req.body.email,
                    name: req.body.name, 
                    info: req.body.info, 
                    aboutme: req.body.aboutme,
                    location: req.body.location,
                    nationality: req.body.nationality,
                    study: req.body.study,
                    age: req.body.age,
                    interests: req.body.interests,
                    employment: req.body.employment
                })
            })
            .catch(error => {
                res.status(500).json(error)
            })
        }
        else {
            about.name = req.body.name === '' ? about.name : req.body.name
            about.info = req.body.info === '' ? about.info : req.body.info
            about.aboutme = req.body.aboutme === '' ? about.aboutme : req.body.aboutme
            about.location = req.body.location === '' ? about.location : req.body.location
            about.nationality = req.body.nationality === '' ? about.nationality : req.body.nationality
            about.study = req.body.study === '' ? about.study : req.body.study
            about.age = req.body.age === '' ? about.age : req.body.age
            about.interests = req.body.interests === '' ? about.interests : req.body.interests
            about.employment = req.body.employment === '' ? about.employment : req.body.employment

            about.save()
            .then(about => {
                res.status(200).json({
                    name: about.name,
                    info: about.info,
                    aboutme: about.aboutme,
                    location: about.location,
                    nationality: about.nationality,
                    study: about.study,
                    age: about.age,
                    interests: about.interests,
                    employment: about.employment
                })
            })
            .catch(error => {
                res.status(500).json(error)
            })
        }
    })
    
})

module.exports = router