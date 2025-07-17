import mongoose from 'mongoose';

const localizedString = {
  en: { type: String},
  hi: { type: String },
};

const ProductSchema = new mongoose.Schema({
  name: localizedString,
  description: localizedString,
  image: String,
  link: Boolean
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
