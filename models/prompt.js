
import mongoose, {Schema, model, models} from 'mongoose'

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        reqired: [true, 'Prompt is reqired,'],

    },
    description: {
        type: String,
        reqired: [false, 'description optional reqired.'],
    },
    tag: {
        type: String,
        reqired: [true, 'tag is reqired.'],
    },
    date: {
        type: Number,
        reqired: [true, 'date is reqired']
    },
    showEmail: {
        type: Boolean,
        reqired: [true, 'option reqired']
    },
    author: {
        type: String,
        reqired: [true, 'author is reqired']
    }

})

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;