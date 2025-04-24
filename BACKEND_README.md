# LinkUp Chat Backend Architecture

This document outlines the backend architecture for implementing real-time chat functionality in the LinkUp application using MongoDB and Socket.io, tailored specifically to work with the existing frontend components.

## Table of Contents
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Socket Events](#socket-events)
- [Authentication & Authorization](#authentication--authorization)
- [Implementation Guide](#implementation-guide)
- [Deployment Considerations](#deployment-considerations)
- [Integration with Frontend](#integration-with-frontend)

## Database Schema

### MongoDB Collections

#### Users Collection
```js
{
  _id: ObjectId,
  username: String,
  name: String,
  email: String,
  password: String, // Hashed
  avatar: String,
  status: String, // "online", "offline", "away"
  lastSeen: Date,
  friends: [ObjectId], // References to User documents
  bio: String,
  score: Number, // For leaderboard functionality
  interests: [String],
  location: String,
  occupation: String,
  joinedDate: Date,
  compatibility: Number, // Optional, can be calculated
  settings: {
    notifications: Boolean,
    privacy: String // "public", "friends-only", "private"
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### Conversations Collection
```js
{
  _id: ObjectId,
  name: String, // Optional, for group chats
  type: String, // "direct" or "group"
  participants: [ObjectId], // References to User documents
  lastMessage: {
    content: String,
    sender: ObjectId, // Reference to User
    timestamp: Date
  },
  activityId: ObjectId, // Optional, reference to Activity if chat is related to activity
  createdAt: Date,
  updatedAt: Date,
  isActive: Boolean
}
```

#### Messages Collection
```js
{
  _id: ObjectId,
  conversationId: ObjectId, // Reference to Conversation
  sender: ObjectId, // Reference to User
  content: String,
  contentType: String, // "text", "image", "file"
  attachmentUrl: String, // Optional, for images/files
  readBy: [
    {
      userId: ObjectId,
      readAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date,
  isDeleted: Boolean
}
```

#### Activities Collection (existing or new)
```js
{
  _id: ObjectId,
  hostId: ObjectId, // Reference to User
  title: String,
  description: String,
  activityType: String, // "academic", "hobby", "wellness", "social"
  locationType: String,
  dateTime: Date,
  duration: Number, // in minutes
  maxParticipants: Number,
  participants: [ObjectId], // References to Users
  compatibility: Number, // Optional, for recommending activities
  conversationId: ObjectId, // Reference to Conversation for activity chat
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Authentication Endpoints

```
POST /api/auth/register
Description: Register a new user
Body: { name, email, password }
Response: { user, token }
```

```
POST /api/auth/login
Description: Log in an existing user
Body: { email, password }
Response: { user, token }
```

```
GET /api/auth/me
Description: Get the current user's information
Response: User object
```

### User Endpoints

```
GET /api/users
Description: Get all users (with optional filtering)
Query Parameters: search, limit, page
Response: Array of user objects
```

```
GET /api/users/:id
Description: Get a specific user by ID
Response: User object
```

```
PUT /api/users/:id
Description: Update a user's information
Body: { name, bio, avatar, interests, etc. }
Response: Updated user object
```

```
GET /api/users/:id/friends
Description: Get a user's friends
Response: Array of user objects
```

```
POST /api/users/:id/friends/:friendId
Description: Add a friend
Response: Updated user object
```

```
DELETE /api/users/:id/friends/:friendId
Description: Remove a friend
Response: Updated user object
```

### Conversation Endpoints

```
GET /api/conversations
Description: Get all conversations for the current user
Response: Array of conversation objects with last message and unread count
```

```
GET /api/conversations/:id
Description: Get a specific conversation by ID with messages
Query Parameters: page, limit
Response: Conversation object with messages array
```

```
POST /api/conversations
Description: Create a new conversation
Body: { participants: [userId1, userId2, ...], name (optional for group), activityId (optional) }
Response: Created conversation object
```

```
PUT /api/conversations/:id
Description: Update a conversation (e.g., rename group, add/remove participants)
Body: { name, participants, etc. }
Response: Updated conversation object
```

```
DELETE /api/conversations/:id
Description: Archive a conversation (soft delete)
Response: Success status
```

### Message Endpoints

```
POST /api/conversations/:id/messages
Description: Send a new message to a conversation
Body: { content, contentType, attachmentUrl (optional) }
Response: Created message object
```

```
PUT /api/messages/:id/read
Description: Mark a message as read
Response: Updated message object
```

```
DELETE /api/messages/:id
Description: Delete a message (mark as deleted)
Response: Success status
```

```
GET /api/conversations/:id/messages
Description: Get messages for a conversation with pagination
Query Parameters: page, limit, before (timestamp)
Response: Array of message objects
```

### Activity-related Chat Endpoints

```
GET /api/activities/:id/conversation
Description: Get or create a conversation for an activity
Response: Conversation object with messages
```

## Socket Events

### Server Events (emitted from server to client)

```
user:status
Description: User status changed
Payload: { userId, status, lastSeen }
```

```
message:new
Description: New message created
Payload: Message object with sender and conversation data
```

```
message:read
Description: Message read receipt
Payload: { messageId, userId, conversationId, readAt }
```

```
conversation:typing
Description: User is typing in a conversation
Payload: { conversationId, userId, isTyping }
```

```
conversation:update
Description: Conversation updated (new participant, name change, etc.)
Payload: Updated conversation object
```

```
activity:join
Description: User joined an activity
Payload: { activityId, userId, updatedParticipants }
```

```
activity:leave
Description: User left an activity
Payload: { activityId, userId, updatedParticipants }
```

### Client Events (emitted from client to server)

```
user:connect
Description: User connects to socket server
Payload: { token }
```

```
message:send
Description: Send a new message
Payload: { conversationId, content, contentType, attachmentUrl (optional) }
```

```
message:read
Description: Mark message as read
Payload: { messageId, conversationId }
```

```
conversation:typing
Description: User starts/stops typing
Payload: { conversationId, isTyping }
```

```
user:status
Description: Update user status
Payload: { status }
```

## Authentication & Authorization

### JWT Authentication
- Use JWT tokens for both API and Socket.io authentication
- Include token in HTTP Authorization header for API requests
- Include token in handshake for socket connections

### Socket.io Authentication Process
```js
// Server-side Socket.io authentication
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database to ensure they exist and are active
    User.findById(decoded.userId)
      .then(user => {
        if (!user) {
          return next(new Error('User not found'));
        }
        socket.user = user;
        next();
      })
      .catch(err => {
        return next(new Error('Database error'));
      });
  } catch (err) {
    return next(new Error('Authentication error'));
  }
});
```

### Authorization Middleware for API
```js
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

## Implementation Guide

### Project Structure
```
/backend
  /config
    - db.js
    - socket.js
  /models
    - User.js
    - Conversation.js
    - Message.js
    - Activity.js
  /controllers
    - authController.js
    - userController.js
    - conversationController.js
    - messageController.js
    - activityController.js
  /routes
    - auth.routes.js
    - user.routes.js
    - conversation.routes.js
    - message.routes.js
    - activity.routes.js
  /middleware
    - auth.middleware.js
    - error.middleware.js
    - upload.middleware.js
  /services
    - socketService.js
    - chatService.js
    - userService.js
  /utils
    - helpers.js
    - validators.js
  server.js
```

### Core Implementation Steps

1. **Setup Express Server and MongoDB Connection**
```js
// server.js
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const socketService = require('./services/socketService');

dotenv.config();
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Initialize Socket.io
socketService.initialize(server);

// API Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/conversations', require('./routes/conversation.routes'));
app.use('/api/messages', require('./routes/message.routes'));
app.use('/api/activities', require('./routes/activity.routes'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

2. **Socket Service Implementation**
```js
// services/socketService.js
const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const chatService = require('./chatService');

let io;

const initialize = (server) => {
  io = socketIO(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true
    }
  });
  
  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error('Authentication error'));
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      
      if (!user) return next(new Error('User not found'));
      
      socket.user = user;
      next();
    } catch (err) {
      return next(new Error('Authentication error'));
    }
  });

  io.on('connection', handleConnection);
  
  return io;
};

// Handle socket connection
const handleConnection = async (socket) => {
  const user = socket.user;
  
  // Update user status to online
  await User.findByIdAndUpdate(user._id, { 
    status: 'online',
    lastSeen: new Date()
  });
  
  // Join user's personal room
  socket.join(user._id.toString());
  
  // Join rooms for user's conversations
  const conversations = await Conversation.find({
    participants: user._id
  });
  
  conversations.forEach(conversation => {
    socket.join(`conversation:${conversation._id}`);
  });
  
  // Notify friends that user is online
  for (const friendId of user.friends) {
    io.to(friendId.toString()).emit('user:status', {
      userId: user._id,
      status: 'online',
      lastSeen: new Date()
    });
  }

  // Handle message sending
  socket.on('message:send', async (data) => {
    try {
      const { conversationId, content, contentType = 'text', attachmentUrl } = data;
      
      // Create message
      const newMessage = await chatService.createMessage({
        conversationId,
        sender: user._id,
        content,
        contentType,
        attachmentUrl,
      });
      
      // Emit to all participants in the conversation
      io.to(`conversation:${conversationId}`).emit('message:new', newMessage);
      
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  // Handle typing indicators
  socket.on('conversation:typing', ({ conversationId, isTyping }) => {
    socket.to(`conversation:${conversationId}`).emit('conversation:typing', {
      conversationId,
      userId: user._id,
      isTyping
    });
  });
  
  // Handle read receipts
  socket.on('message:read', async ({ messageId, conversationId }) => {
    try {
      const updatedMessage = await chatService.markMessageAsRead(messageId, user._id);
      
      // Broadcast to conversation participants
      socket.to(`conversation:${conversationId}`).emit('message:read', {
        messageId,
        userId: user._id,
        conversationId,
        readAt: new Date()
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  });

  // Handle disconnection
  socket.on('disconnect', async () => {
    const lastSeen = new Date();
    
    // Update user status
    await User.findByIdAndUpdate(user._id, {
      status: 'offline',
      lastSeen
    });
    
    // Notify friends
    for (const friendId of user.friends) {
      io.to(friendId.toString()).emit('user:status', {
        userId: user._id,
        status: 'offline',
        lastSeen
      });
    }
  });
};

// Get io instance
const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = {
  initialize,
  getIO
};
```

3. **Chat Service Implementation**
```js
// services/chatService.js
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');
const mongoose = require('mongoose');

// Create a new conversation
async function createConversation(data) {
  const { participants, name = null, type = 'direct', activityId = null } = data;
  
  // For direct messages, check if conversation already exists
  if (type === 'direct' && participants.length === 2) {
    const existingConversation = await Conversation.findOne({
      type: 'direct',
      participants: { 
        $all: participants,
        $size: 2
      }
    });
    
    if (existingConversation) {
      return existingConversation;
    }
  }
  
  const newConversation = new Conversation({
    name,
    type,
    participants,
    activityId,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
  });
  
  await newConversation.save();
  return newConversation;
}

// Get conversations for a user
async function getUserConversations(userId) {
  const conversations = await Conversation.find({
    participants: userId,
    isActive: true
  })
  .sort({ updatedAt: -1 })
  .lean();
  
  // Get last message and unread count for each conversation
  const conversationsWithDetails = await Promise.all(
    conversations.map(async (conversation) => {
      const lastMessage = await Message.findOne({
        conversationId: conversation._id
      })
      .sort({ createdAt: -1 })
      .lean();
      
      const unreadCount = await Message.countDocuments({
        conversationId: conversation._id,
        'readBy.userId': { $ne: userId },
        sender: { $ne: userId }
      });
      
      // Get participant details
      const participantDetails = await User.find(
        { _id: { $in: conversation.participants } },
        'name avatar status'
      ).lean();
      
      return {
        ...conversation,
        lastMessage,
        unreadCount,
        participants: participantDetails
      };
    })
  );
  
  return conversationsWithDetails;
}

// Get or create conversation for an activity
async function getOrCreateActivityConversation(activityId, participants) {
  let conversation = await Conversation.findOne({ activityId });
  
  if (!conversation) {
    conversation = await createConversation({
      type: 'group',
      participants,
      activityId,
      name: 'Activity Chat' // This could be replaced with actual activity name
    });
  }
  
  return conversation;
}

// Get messages for a conversation
async function getConversationMessages(conversationId, page = 1, limit = 20) {
  const skip = (page - 1) * limit;
  
  const messages = await Message.find({
    conversationId,
    isDeleted: { $ne: true }
  })
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit)
  .populate('sender', 'name avatar')
  .lean();
  
  return messages.reverse();
}

// Create a new message
async function createMessage(data) {
  const { conversationId, sender, content, contentType, attachmentUrl } = data;
  
  // Create the message
  const message = new Message({
    conversationId,
    sender,
    content,
    contentType,
    attachmentUrl,
    readBy: [{ userId: sender, readAt: new Date() }],
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  await message.save();
  
  // Update conversation's last message
  await Conversation.findByIdAndUpdate(conversationId, {
    lastMessage: {
      content,
      sender,
      timestamp: new Date()
    },
    updatedAt: new Date()
  });
  
  // Return populated message
  const populatedMessage = await Message.findById(message._id)
    .populate('sender', 'name avatar')
    .lean();
  
  return populatedMessage;
}

// Mark message as read
async function markMessageAsRead(messageId, userId) {
  const message = await Message.findOneAndUpdate(
    { 
      _id: messageId,
      'readBy.userId': { $ne: userId }
    },
    { 
      $addToSet: { 
        readBy: { 
          userId: userId, 
          readAt: new Date() 
        } 
      } 
    },
    { new: true }
  );
  
  return message;
}

// Delete message (soft delete)
async function deleteMessage(messageId, userId) {
  const message = await Message.findOne({ _id: messageId });
  
  if (!message || message.sender.toString() !== userId.toString()) {
    throw new Error('Unauthorized or message not found');
  }
  
  message.isDeleted = true;
  message.updatedAt = new Date();
  await message.save();
  
  return { success: true };
}

module.exports = {
  createConversation,
  getUserConversations,
  getOrCreateActivityConversation,
  getConversationMessages,
  createMessage,
  markMessageAsRead,
  deleteMessage
};
```

## Integration with Frontend

### Current Message Page Integration

The existing message page (`/app/message/[id]/page.jsx`) can be enhanced to use Socket.io for real-time updates:

1. Create a client-side Socket.io connection service:

```js
// hooks/useSocket.js
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '@/hooks/useAuth'; // You'll need to implement this auth hook

let socket = null;

export const useSocket = () => {
  const { token } = useAuth();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!token) return;
    
    // Initialize socket connection
    socket = io(process.env.NEXT_PUBLIC_API_URL, {
      auth: { token }
    });

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  const sendMessage = (conversationId, content) => {
    if (!socket) return;
    socket.emit('message:send', {
      conversationId,
      content
    });
  };

  const markAsRead = (messageId, conversationId) => {
    if (!socket) return;
    socket.emit('message:read', { messageId, conversationId });
  };

  const typingIndicator = (conversationId, isTyping) => {
    if (!socket) return;
    socket.emit('conversation:typing', { conversationId, isTyping });
  };

  const subscribeToMessages = (callback) => {
    if (!socket) return;
    socket.on('message:new', callback);
    return () => socket.off('message:new', callback);
  };

  const subscribeToTyping = (callback) => {
    if (!socket) return;
    socket.on('conversation:typing', callback);
    return () => socket.off('conversation:typing', callback);
  };

  const subscribeToReadReceipts = (callback) => {
    if (!socket) return;
    socket.on('message:read', callback);
    return () => socket.off('message:read', callback);
  };

  return {
    isConnected,
    sendMessage,
    markAsRead,
    typingIndicator,
    subscribeToMessages,
    subscribeToTyping,
    subscribeToReadReceipts
  };
};
```

2. Create components for chat functionality:

```jsx
// components/MessageInput.jsx (client component)
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useSocket } from '@/hooks/useSocket';

export default function MessageInput({ conversationId, receiverName }) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { sendMessage, typingIndicator } = useSocket();
  const typingTimeoutRef = useRef(null);
  
  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      typingIndicator(conversationId, true);
    }
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      typingIndicator(conversationId, false);
    }, 2000);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Send message via socket
    sendMessage(conversationId, message);
    setMessage('');
    
    // Stop typing indicator
    setIsTyping(false);
    typingIndicator(conversationId, false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);
  
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
      <Input 
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          handleTyping();
        }}
        placeholder={`Message ${receiverName}...`} 
        className="flex-1" 
      />
      <Button type="submit" size="icon" disabled={!message.trim()}>
        <Send size={18} />
      </Button>
    </form>
  );
}
```

3. Enhance the Message page to use real-time functionality:

```jsx
// app/message/[id]/page-client.jsx (client component)
"use client";

import { useState, useEffect, useRef } from 'react';
import { useSocket } from '@/hooks/useSocket';
import MessageInput from '@/components/MessageInput';
import { cn } from "@/lib/utils";
import { formatMessageTime } from '@/lib/dateUtils';

export default function MessageClient({ initialMessages, conversation, currentUser }) {
  const [messages, setMessages] = useState(initialMessages || []);
  const [typingUsers, setTypingUsers] = useState({});
  const messageEndRef = useRef(null);
  
  const { 
    subscribeToMessages, 
    subscribeToTyping, 
    subscribeToReadReceipts,
    markAsRead
  } = useSocket();
  
  // Subscribe to new messages
  useEffect(() => {
    const unsubscribe = subscribeToMessages((newMessage) => {
      if (newMessage.conversationId === conversation._id) {
        setMessages(prev => [...prev, newMessage]);
        
        // Mark as read if it's from someone else
        if (newMessage.sender._id !== currentUser.id) {
          markAsRead(newMessage._id, conversation._id);
        }
      }
    });
    
    return unsubscribe;
  }, [conversation._id, currentUser.id, subscribeToMessages, markAsRead]);
  
  // Subscribe to typing indicators
  useEffect(() => {
    const unsubscribe = subscribeToTyping(({ conversationId, userId, isTyping }) => {
      if (conversationId === conversation._id && userId !== currentUser.id) {
        setTypingUsers(prev => ({
          ...prev,
          [userId]: isTyping ? new Date() : null
        }));
      }
    });
    
    return unsubscribe;
  }, [conversation._id, currentUser.id, subscribeToTyping]);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Mark all unread messages as read
  useEffect(() => {
    messages.forEach(message => {
      if (
        message.sender._id !== currentUser.id &&
        !message.readBy?.some(read => read.userId === currentUser.id)
      ) {
        markAsRead(message._id, conversation._id);
      }
    });
  }, [messages, currentUser.id, conversation._id, markAsRead]);
  
  // Check if someone is typing
  const isAnyoneTyping = Object.values(typingUsers).some(timestamp => timestamp);
  
  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length > 0 ? (
          messages.map((message) => {
            const isCurrentUser = message.sender._id === currentUser.id;
            
            return (
              <div
                key={message._id}
                className={cn(
                  "flex",
                  isCurrentUser ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    isCurrentUser
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted rounded-bl-none"
                  )}
                >
                  <p>{message.content}</p>
                  <p
                    className={cn(
                      "text-xs mt-1",
                      isCurrentUser
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    )}
                  >
                    {formatMessageTime(message.createdAt)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <p>No messages yet</p>
            <p className="text-sm">Start the conversation with {conversation.participants.find(p => p._id !== currentUser.id)?.name}</p>
          </div>
        )}
        
        {isAnyoneTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-2 px-3 text-sm text-muted-foreground">
              Typing...
            </div>
          </div>
        )}
        
        <div ref={messageEndRef} />
      </div>
      
      <div className="border-t p-4">
        <MessageInput 
          conversationId={conversation._id}
          receiverName={conversation.participants.find(p => p._id !== currentUser.id)?.name}
        />
      </div>
    </>
  );
}
```

## Deployment Considerations

### Scalability
- Use MongoDB Atlas for managed database hosting
- Scale Socket.io with Redis adapter for horizontally scaled services:

```js
// Scaling Socket.io with Redis
const socketIO = require('socket.io');
const redisAdapter = require('socket.io-redis');
const Redis = require('ioredis');

const pubClient = new Redis(process.env.REDIS_URL);
const subClient = new Redis(process.env.REDIS_URL);

const io = socketIO(server);
io.adapter(redisAdapter({ pubClient, subClient }));
```

### Performance Optimization
- Create appropriate indexes on MongoDB collections:

```js
// Example indexes for messages collection
Message.createIndex({ conversationId: 1, createdAt: -1 }); // For retrieving messages
Message.createIndex({ sender: 1 }); // For queries by sender
Message.createIndex({ 'readBy.userId': 1 }); // For unread message queries

// Example indexes for conversations collection
Conversation.createIndex({ participants: 1 }); // For finding user's conversations
Conversation.createIndex({ activityId: 1 }); // For activity-related conversations
```

- Use pagination for message retrieval
- Implement caching for frequently accessed data using Redis
- Consider implementing message read cursors instead of storing read receipts for each message

### Security Considerations
- Implement rate limiting for messaging to prevent spam
- Validate message content and sanitize input
- Set up proper CORS configuration
- Regularly rotate JWT secrets
- Implement timeout for inactive connections

### Monitoring
- Set up logging for Socket.io events:

```js
// Middleware to log socket events
io.use((socket, next) => {
  const originalEmit = socket.emit;
  socket.emit = function() {
    console.log(`SOCKET EMIT: ${arguments[0]}`);
    originalEmit.apply(socket, arguments);
  };
  next();
});
```

- Monitor server health metrics using tools like Prometheus and Grafana
- Set up error tracking with services like Sentry

### High Availability
- Deploy multiple instances behind a load balancer
- Use PM2 or container orchestration to ensure process reliability
- Implement graceful shutdown handling for socket connections

## Getting Started

1. Create a `.env` file with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/linkup
JWT_SECRET=your_jwt_secret_key
PORT=5000
CLIENT_URL=http://localhost:3000
REDIS_URL=redis://localhost:6379
```

2. Install dependencies:
```
npm install express mongoose socket.io jsonwebtoken bcrypt cors dotenv socket.io-redis ioredis
```

3. Start the development server:
```
npm run dev
```

4. Connect your frontend by updating the Socket.io connection URL in your hooks.

This architecture gives you a solid foundation for implementing a scalable, real-time chat system for the LinkUp application that integrates seamlessly with your existing features and UI components.
