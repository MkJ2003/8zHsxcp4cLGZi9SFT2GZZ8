const Places = require("../models/place.js");

class placeController {
    static allPlaces= async (req, res) => {
        let places = await Places.find({});
        
        res.send(places);
    };
    static newPlaces =  async (req, res) => {
        let products = await Places.find({});
        let arr = products.slice(0).slice(-8);
        
        res.send(arr);
      };
    static popularPlaces = async (req, res) => {
        const places = await Places.find({}); 
        const shuffledPlaces = places.sort(() => 0.5 - Math.random()); 
      
        
        const selectedPlaces = shuffledPlaces.slice(0, 4);
      
      
        res.send(selectedPlaces);
      };
    static relatedPlaces = async (req, res) => {

        const {
          category
        } = req.body;
        const products = await Places.find({
          category
        });
        const arr = products.slice(0, 4);
        res.send(arr);
      };        
}

module.exports = placeController;