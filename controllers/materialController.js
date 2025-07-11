
const Material = require('../models/Material');

exports.addMaterial = async (req, res) => {
  const material = await Material.create(req.body);
  const io = req.app.get('socketio');
  io.emit('material-updated', material);
  res.redirect('/');
};

exports.useMaterial = async (req, res) => {
  const material = await Material.findById(req.params.id);
  const amount = req.body.amount;
  material.quantity -= amount;
  material.usage.push({ amount });
  await material.save();
  const io = req.app.get('socketio');
  io.emit('material-updated', material);
  res.redirect('/');
};
