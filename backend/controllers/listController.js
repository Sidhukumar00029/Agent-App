const asyncHandler = require('express-async-handler');
const fs = require('fs');
const csv = require('csv-parser');
const User = require('../models/userModel');
const ListItem = require('../models/listModel');

const uploadList = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload a file');
  }

  
  const agents = await User.find({ role: 'Agent' }).limit(5);
  if (agents.length === 0) {
    res.status(400);
    throw new Error('No agents found to distribute the list to.');
  }

  const results = [];
  const filePath = req.file.path;

  
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        
        const listItemsToSave = results.map((item, index) => {
          const agentForThisItem = agents[index % agents.length]; 
          return {
            firstName: item.FirstName,
            phone: item.Phone,
            notes: item.Notes,
            assignedAgent: agentForThisItem._id,
          };
        });

        await ListItem.insertMany(listItemsToSave);

        fs.unlinkSync(filePath);

        res.status(201).json({
          message: `${results.length} items successfully uploaded and distributed among ${agents.length} agents.`,
        });
      } catch (dbError) {
        fs.unlinkSync(filePath);
        res.status(500);
        throw new Error('Failed to save list items to database.');
      }
    });
});

const getListItems = asyncHandler(async (req, res) => {
  const items = await ListItem.find({}).populate('assignedAgent', 'name email');
  res.status(200).json(items);
});


module.exports = {
  uploadList,
  getListItems, 
};