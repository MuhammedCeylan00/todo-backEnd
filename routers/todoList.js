import express from 'express'
import postgresClient from '../config/db.js'
const router = express.Router()


//Create List
router.get('/', async(req, res) => {
    try {
        const text = 'SELECT * FROM todolist ORDER BY id ASC'
        const { rows } = await postgresClient.query(text)
        return res.status(200).json(rows)
    } catch (error) {
        console.log("Error occured", error.message);
        return res.status(400).json({ message: error.message })
    }
})

router.post('/', async(req, res) => {
    try {
        const text = "INSERT INTO todolist (data) VALUES ($1) RETURNING *"
        const values = [req.body.data]
        const { rows } = await postgresClient.query(text, values)
        return res.status(200).json(rows);
        console.log(rows);
    } catch (error) {
        console.log("Error occured", error.message);
        return res.status(400).json({ message: error.message })
    }
})

router.put('/update/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const text = "UPDATE todolist SET data=$1 WHERE id=$2 RETURNING *"
        const values = [req.body.data, id]
        const { rows } = await postgresClient.query(text, values);
        console.log(rows);
    } catch (error) {
        console.log('error occured', error.message)
        return res.status(400).json({ message: error.message });
    }
})
router.delete('/:id', async(req, res) => {
    console.log("sssasa");
    const { id } = req.params;
    try {
        const text = "DELETE FROM todolist WHERE id=$1 RETURNING *"
        const values = [id]
        const { rows } = await postgresClient.query(text, values);
        if (!rows.length) {
            return res.status(404).json({ message: 'User not found.' })
        } else {
            return res.status(200).json({ deletedData: rows[0] })
        }
    } catch (error) {
        console.log("Error occured", error.message);
        return res.status(400).json({ message: error.message })
    }
})


export default router