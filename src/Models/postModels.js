const mongoose = require('mongoose');
const User = require('../Models/userModel')

const postItSchema = new mongoose.Schema({
    title: { type: String, 
        required: true 
    },
    content: { type: String, 
        required: true 
    },
    author: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId,
         ref: 'Comment' 
        }],
    deleted: { type: Boolean,
         default: false 
        },
  }, { timestamps: true });
  
  const PostIt = mongoose.model('PostIt', postItSchema);

  module.exports = PostIt;