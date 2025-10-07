const mongoose = require('mongoose');

const listItemSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    phone: {
      type: String, 
      required: true,
    },
    notes: {
      type: String,
    },
    
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', 
    },
  },
  {
    timestamps: true,
  }
);

const ListItem = mongoose.model('ListItem', listItemSchema);

module.exports = ListItem;