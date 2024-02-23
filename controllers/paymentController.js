import Stripe from "stripe";
const stripe = new Stripe("sk_test_51N55v0SG4487ZVYHPGAAx9068xxjQu6YzDjUJX4u6MRPCxqGWBvUbAKbBRHXVX26ahTp2vMOwgY287c0NKhDbuv700Tq9HPoMK"); 
export const payment = async(req , res)=>{
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"] , 
        line_items:[{
            price_data:{
                currency:"inr" , 
                product_data:{
                    name:req.body.name , 
                    user:req.body.userName
                } , 
                unit_amount:req.body.price*100
            } , 
            quantity:1
        }] , 
        mode:"payment" , 
        success_url:"https://movies-media-client.vercel.app/" , 
        cancel_url:"https://movies-media-client.vercel.app/cancel"
    });
    res.json({id:session.id});
}