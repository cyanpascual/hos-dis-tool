const router = require('express').Router();
let Hospital = require('../models/newhospital.model');

function kmeans(dictSupN, dictSupC, dictLabN, dictLabC){

  var arrNeed = [];
  var arrCurr = [];
  var AN = [];
  var AC = [];
  var ratio = [];
  var ratio_val = 0;
  var distL = 0;
  var distCL = 0;
  var distWS = 0;
  var L = "Low";
  var CL = "Critically Low";
  var WS = "Well Stocked";
  
  for (var key in dictSupN) {
    if (dictSupN.hasOwnProperty(key)) {
      arrNeed.push(dictSupN[key]);
    }
  }
  for (var key in dictSupC) {
    if (dictSupC.hasOwnProperty(key)) {
      if(key !== "other"){arrCurr.push(dictSupC[key]);}
      else if(key == "other"){}
    }
  }

  for (var key in dictLabN) {
    if (dictLabN.hasOwnProperty(key)) {
      if(key !== "rtpcr" && key !== "rna_extraction"){arrNeed.push(dictLabN[key]);}
      else if(key == "rtpcr" || key == "rna_extraction"){}
    }
  }
  for (var key in dictLabC) {
    if (dictLabC.hasOwnProperty(key)) {
      if(key !== "rtpcr" && key !== "rna_extraction" && key !== "other"){arrCurr.push(dictLabC[key]);}
      else if(key == "rtpcr" || key == "rna_extraction" || key == "other"){}
    }
  }

  for(var i = 0; i<arrNeed.length; i++){
    if(arrNeed[i] !== 0){
      AN.push(arrNeed[i]);
      AC.push(arrCurr[i]);
    }
    }

  for(var j = 0; j<AN.length; j++){
    ratio_val = (AC[j]/AN[j]);
    if(ratio_val > 1){
      ratio_val = 0.8;
    }
    ratio.push(ratio_val);
    distL = parseFloat(distL) + ((0.5 - ratio[j])**2);
    distCL = parseFloat(distCL) + ((0.2 - ratio[j])**2);
    distWS = parseFloat(distWS) + ((0.8 - ratio[j])**2);
  }

  distL = Math.sqrt(distL);
  distCL = Math.sqrt(distCL);
  distWS = Math.sqrt(distWS);

  if(distCL <= distL && distCL < distWS){
    return CL;
  }else if (distL < distCL && distL <= distWS){
    return L;
  }else if (distWS < distCL && distWS < distL){
    return WS;
  }
}

router.route('/').get((req, res) => {
  Hospital.find()
    .then(hospitals => res.json(hospitals))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const type = req.body.type;
  const typeOfFeat = req.body.typeOfFeat;
  const data_drop = req.body.data_drop;
  const priority = req.body.priority;
  const test_center = req.body.test_center;
  const numbers = req.body.numbers;
  const properties = req.body.properties;
  const score = kmeans(req.body.properties.supply_need,
                          req.body.properties.supply_cur,
                          req.body.properties.lab_need,
                          req.body.properties.lab_cur);
  const geometry = req.body.geometry;

  const newHospital = new Hospital({
    type,
    typeOfFeat,
    data_drop,
    priority,
    test_center,
    numbers,
    properties,
    score,
    geometry
});

  newHospital.save()
    .then(() => res.json('Hospital added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Hospital.findById(req.params.id) //5f1020d7923171ba7ce60ea8
    .then(hospitals => res.json(hospitals))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Hospital.findByIdAndDelete(req.params.id)
    .then(() => res.json('Hospital deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => { // 5f1020d7923171ba7ce60ea8 Sample Hospital
  Hospital.findById(req.params.id)
    .then(hospital => {
      hospital.type = req.body.type;
      hospital.typeOfFeat = req.body.typeOfFeat;
      hospital.data_drop = req.body.data_drop;
      hospital.priority = req.body.priority;
      hospital.test_center = req.body.test_center;
      hospital.numbers = req.body.numbers;
      hospital.properties = req.body.properties;
      hospital.geometry = req.body.geometry;
      hospital.score = kmeans(req.body.properties.supply_need,
                              req.body.properties.supply_cur,
                              req.body.properties.lab_need,
                              req.body.properties.lab_cur);
      
      hospital.save()
        .then(() => res.json('Hospital updated!' + req.body))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
