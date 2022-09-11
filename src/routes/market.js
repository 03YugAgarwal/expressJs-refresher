const {Router, response} = require('express');

const router = Router();

router.use((req,res,next)=>{
    if(req.session.user){
        next();
    }else{
        res.send(401);
    }
})

const supermarkets = [
    {
        id: 1, 
        store: "Whole foods",
        miles: 2.5
    },
    {
        id: 2, 
        store: 'Trader Joes',
        miles: 0.2
    },
]

router.get('',(req,res)=>{
    const {miles} = req.query;
    const parsedMiles = parseInt(miles);
    // console.log(miles);
    if(!isNaN(parsedMiles)){
        const filteredStores = supermarkets.filter((s)=>s.miles <= parsedMiles);
        res.send(filteredStores)
    }else{
        res.send(supermarkets);
    }
})

module.exports = router;