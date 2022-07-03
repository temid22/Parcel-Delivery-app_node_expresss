import mongoose from 'mongoose';


const CartSchema = new mongoose.Schema(
{
    id: { type: String, required: true },
    parcel: [
        {
            parcelId: {
                type: String,
            },
            
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required : true },
    status: { type: String, default: 'pending... you gotta chill...'}
}, { timestamps: true });


export default mongoose.model('Cart', CartSchema)