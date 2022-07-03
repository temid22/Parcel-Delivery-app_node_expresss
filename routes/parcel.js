import express from "express";
import Parcel from '../models/Parcel.js';

import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from './verifyToken.js';

const router = express.Router();

//CREATE

router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newParcel = new Parcel(req.body)

    try{
        const savedParcel = await newParcel.save();
        res.status(200).send(savedParcel)

    }catch(err){
        res.status(500).send(err);
    }
});


//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedParcel = await Parcel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).send(updatedParcel);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  //DELETE
  router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Parcel.findByIdAndDelete(req.params.id);
      res.status(200).send("Parcel deleted...");
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  //GET PRODUCT
  router.get("/find/:id", async (req, res) => {
    try {
      const parcel = await Parcel.findById(req.params.id);
      res.status(200).send(parcel);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  //GET ALL PRODUCTS
  router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let parcel;
  
      if (qNew) {
        parcel = await Parcel.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        parcel = await Parcel.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        parcel = await Parcel.find();
      }
  
      res.status(200).send(parcel);
    } catch (err) {
      res.status(500).send(err);
    }
  });




export default router;