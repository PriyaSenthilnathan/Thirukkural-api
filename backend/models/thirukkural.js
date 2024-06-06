const mongoose = require('mongoose');

const thirukkuralSchema = mongoose.Schema({
    KuralEn: Number,
    Kural: String,
    KuralVilakkam: String
})

const thirukkuralModel = mongoose.model("thirukkurals", thirukkuralSchema);
module.exports = thirukkuralModel;