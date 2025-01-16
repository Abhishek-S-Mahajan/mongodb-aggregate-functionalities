import { Schema, model } from "mongoose";

const user_schema = new Schema({});

const User = model("User", user_schema);

export default User;