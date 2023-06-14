
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
    tag: {
        type: String,
        reqired: [true, 'tag is reqired.'],
    }
})

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;