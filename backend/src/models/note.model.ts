import { InferSchemaType, Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
  },
  { timestamps: true }
);

//create a type for our note so that later we have type safety and auto-completion in our code
type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema);
