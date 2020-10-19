const express = require('express')
const router = express.Router()
const Question = require('./models/Question')

// getting all questions
router.get('/questions', async (req, res) => {
	try {
		const questions = await Question.find()
		return res.status(200).json(questions)
	}catch (error) {
		return res.status(500).json({"error": error})
	}
})

// getting only one question
router.get('/questions/:id', async (req, res) => {
	try {
		const _id = req.params.id

		const question = await Question.findOne({_id})

		if(!question) {
			return res.status(404).json({})
		}
		else {
			return res.status(200).json(question)
		}
	}catch (error) {
		return res.status(500).json({"error": error})
	}
})

// creating one question
router.post('/questions', async (req, res) => {
	try {
		const { description } = req.body
		const { alternatives } = req.body

		const question = await Question.create({
			description,
			alternatives
		})
		return res.status(201).json(question)
	}catch (error) {
		return res.status(500).json({"error": error})
	}
})

// updating one question (not a part of the project)
router.put('/questions/:id', async (req, res) => {
	try {
		const _id = req.params.id
		const { description, alternatives } = req.body

		let question = await Question.findOne({_id})

		if (!question) {
			question = await Question.create({
				description,
				alternatives
			})
			return res.status(201).json(question)
		}
		else {
			question.description = description
			question.alternatives = alternatives
			await question.save()

			return res.status(200).json(question)
		}
	}catch(error) {
		return res.status(500).json({"error": error})
	}
})

// deleting one question
router.delete('/questions/:id', async (req, res) => {
	try {
		const _id = req.params.id

		const question = await Question.deleteOne({_id})

		if (question.deletedCount === 0) {
			return res.status(404).json()
		}
		else {
			return res.status(204).json()
		}
	}catch(error) {
		return res.status(500).json({"error": error})
	}
})

// testing
router.get('/', (req, res) => {
	res.send("OMG...!!! It's working...!!!")
})

module.exports = router