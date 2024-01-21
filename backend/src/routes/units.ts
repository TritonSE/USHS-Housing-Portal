import express from "express";
const router = express.Router();

router.get('/units/:id', (req, res) => {

});

/*
const Unit = require("../models/UnitModel");
router.get('/units/:id', (req, res) => {
    Unit.findById(req.params.id)
    .then((unit) => res.json(unit))
    .catch(errorHandler(res))
    }
  );
*/

export default router;
