const {Router} = require('express');

const router = Router();

router.use((req,res,next)=>{
    if(req.session.user){
        next();
    }else{
        res.send(401);
    }
})


const groceriesList = [
    {
        item: 'milk',
        quantity: 2
    },
    {
        item: 'cereal',
        quantity: 1
    },
    {
        item: 'banana',
        quantity: 9
    },
]


router.get('',(req,res)=>{
    res.cookie('visited',true,{
        maxAge: 10000,
    })
    res.send(groceriesList);
    console.log(req.cookies);
});

// ROUTE PARAMETERS
router.get('/:item',(req,res)=>{
    // console.log(req.params);
    // console.log(req.params.item);
    const {item} = req.params;
    const groceryItem = groceriesList.find((e)=>e.item ===item);
    res.send(groceryItem);

});

router.post('',(req,res)=>{
    console.log(req.body);
    groceriesList.push(req.body);
    res.send(201);
})

router.get('/shopping/cart',(req,res)=>{
    const {cart} = req.session;
    if(!cart){
        res.send("No items in cart");
    }else{
        res.send(cart);
    }
})

router.post('/shopping/cart/item',(req,res)=>{
    const {item,quantity} = req.body;
    const cartItem = {item,quantity};
    // console.log(cartItem);
    const {cart} = req.session;
    if(cart){
        const {items } = cart;
        req.session.cart.items.push(cartItem);
    }else{
        req.session.cart = {
            item: [cartItem],
        };
    }
    res.send(201);
})

module.exports = router;