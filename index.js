const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const validator = require('validator');
const sanitizeHtml = require('sanitize-html');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config()

app.use(express.static(path.join(__dirname, 'crossFile')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// ============================================
// RATE LIMITING
// ============================================

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 100 requests per windowMs
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter for admin login
const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 5 login attempts per 15 minutes
  message: { success: false, message: 'Too many login attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
});

// Strict rate limiter for admin mutations (create/update/delete)
const adminMutationLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50, // Limit each IP to 20 mutations per minute
  message: { success: false, message: 'Too many requests. Please slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use('/api/', apiLimiter); // Apply to all API routes

// Serve static files from the directory
app.use('/', express.static(path.join(__dirname, 'homePage')));
app.use('/community-events', express.static(path.join(__dirname, 'communityPage')));
app.use('/about/members', express.static(path.join(__dirname, 'memberPage')));
app.use('/about', express.static(path.join(__dirname, 'aboutPage')));
app.use('/vegfest', express.static(path.join(__dirname, 'vegfestPage')));
app.use('/contact', express.static(path.join(__dirname, 'contactPage')));
app.use('/membership-donate', express.static(path.join(__dirname, 'donatePage')));
app.use('/meetup', express.static(path.join(__dirname, 'meetupPage')));
app.use('/gallery', express.static(path.join(__dirname, 'galleryPage')));
app.use('/admin', express.static(path.join(__dirname, 'adminPage')));


// Contact form submission route
app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // Validate required fields
    if (!firstName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (First Name, Email, and Message).'
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.'
      });
    }

    // Sanitize inputs
    const sanitizedData = {
      firstName: sanitizeHtml(firstName.trim()),
      lastName: sanitizeHtml(lastName ? lastName.trim() : ''),
      email: sanitizeHtml(email.trim()),
      phone: sanitizeHtml(phone ? phone.trim() : ''),
      message: sanitizeHtml(message.trim())
    };

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'domnetjavor@gmail.com, vvoa780@gmail.com',
      subject: 'New Contact Form Submission - VVoA Website',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Information:</h3>
            <p><strong>Name:</strong> ${sanitizedData.firstName} ${sanitizedData.lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></p>
            ${sanitizedData.phone ? `<p><strong>Phone:</strong> ${sanitizedData.phone}</p>` : ''}
          </div>

          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #4CAF50; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${sanitizedData.message}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This email was sent from the VVoA website contact form.</p>
            <p>Submitted on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again later.'
    });
  }
});







///////////////////////
// MongoDB Database Schema & Connection
///////////////////////

// Define Event Schema
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true,
    enum: ['potluck', 'brunch', 'diners-club', 'market', 'activism', 'social', 'other']
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  endTime: {
    type: String
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  province: {
    type: String,
    default: 'Alberta'
  },
  venue: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  organizer: {
    type: String,
    default: 'VVoA'
  },
  isVVoAEvent: {
    type: Boolean,
    default: true
  },
  registrationLink: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  cost: {
    type: String,
    trim: true
  },
  memberCost: {
    type: String,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  recurring: {
    isRecurring: {
      type: Boolean,
      default: false
    },
    frequency: {
      type: String,
      enum: ['weekly', 'monthly', 'yearly', 'none'],
      default: 'none'
    },
    recurringPattern: {
      type: String
    }
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying
eventSchema.index({ date: 1, city: 1 });
eventSchema.index({ eventType: 1 });

// Create the Event model
const Event = mongoose.model('Event', eventSchema);

// ============================================
// GALLERY AND VSM SCHEMAS
// ============================================

// Gallery Schema
const gallerySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['photo', 'video']
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  caption: {
    type: String,
    trim: true,
    default: ''
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const Gallery = mongoose.model('Gallery', gallerySchema);

// Vegan Social Meetups Schema
const vsmSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    default: "We are all about building a vegan social community where folks who are vegan or interested in veganism can connect and build meaningful lifelong friendships and connections. We do this through in-person vegan events in Calgary and Edmonton."
  },
  items: [{
    type: {
      type: String,
      required: true,
      enum: ['photo', 'video']
    },
    url: {
      type: String,
      required: true,
      trim: true
    },
    caption: {
      type: String,
      trim: true,
      default: ''
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const VSM = mongoose.model('VeganSocialMeetups', vsmSchema);

// Initialize VSM document if it doesn't exist
async function initializeVSM() {
  const existing = await VSM.findOne();
  if (!existing) {
    const defaultVSM = new VSM({
      description: "We are all about building a vegan social community where folks who are vegan or interested in veganism can connect and build meaningful lifelong friendships and connections. We do this through in-person vegan events in Calgary and Edmonton.",
      items: []
    });
    await defaultVSM.save();
    console.log('Initialized Vegan Social Meetups document');
  }
}

// Call after MongoDB connects
mongoose.connect(process.env.MONGODB_KEY)
  .then(() => {
    console.log('MongoDB connected successfully');
    initializeVSM(); // Initialize VSM document
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_KEY)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Admin authentication middleware
const adminAuth = (req, res, next) => {
  const adminPassword = req.headers['x-admin-password'];

  if (adminPassword === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    console.log('Auth failed - Password mismatch');
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

// ============================================
// EVENT API ROUTES
// ============================================

// GET all events
app.get('/api/events', async (req, res) => {
  try {
    const { city, month, year, type, startDate, endDate } = req.query;

    let query = {};

    // Filter by city
    if (city && city !== 'all') {
      query.city = new RegExp(city, 'i');
    }

    // Filter by event type
    if (type && type !== 'all') {
      query.eventType = type;
    }

    // Filter by date range
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    } else if (month && year) {
      const startOfMonth = new Date(year, month - 1, 1);
      const endOfMonth = new Date(year, month, 0, 23, 59, 59);
      query.date = {
        $gte: startOfMonth,
        $lte: endOfMonth
      };
    }

    const events = await Event.find(query)
      .sort({ date: 1 })
      .lean();

    res.json({
      success: true,
      events: events
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching events'
    });
  }
});

// GET single event
app.get('/api/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      event: event
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching event'
    });
  }
});

// GET cities with events
app.get('/api/events/cities/list', async (req, res) => {
  try {
    const cities = await Event.distinct('city');
    res.json({
      success: true,
      cities: cities.sort()
    });
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cities'
    });
  }
});

// Admin password verification endpoint
  app.post('/api/admin/verify', adminLoginLimiter, adminAuth, (req, res) => {
    res.json({
    success: true,
    message: 'Admin authenticated'
  });
});

// CREATE new event (admin only)
app.post('/api/events', adminMutationLimiter, adminAuth, async (req, res) => {
  try {
    // Helper function to format time
    function formatTime(timeString) {
      if (!timeString) return undefined;

      // If already in 12-hour format with AM/PM, return as is
      if (timeString.includes('AM') || timeString.includes('PM')) {
        return timeString;
      }

      // If in 24-hour format (HH:MM), convert to 12-hour
      if (timeString.includes(':')) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
      }

      return timeString;
    }

    // Fix date timezone issue - create at noon UTC
    const dateParts = req.body.date.split('-');
    const eventDate = new Date(Date.UTC(
      parseInt(dateParts[0]), // year
      parseInt(dateParts[1]) - 1, // month (0-indexed)
      parseInt(dateParts[2]), // day
      12, 0, 0 // Set to noon UTC
    ));

    const eventData = {
      title: sanitizeHtml(req.body.title),
      description: sanitizeHtml(req.body.description),
      eventType: req.body.eventType,
      date: eventDate, // Use the fixed date
      time: formatTime(req.body.time),
      endTime: formatTime(req.body.endTime),
      city: sanitizeHtml(req.body.city),
      province: req.body.province || 'Alberta',
      venue: req.body.venue ? sanitizeHtml(req.body.venue) : undefined,
      address: req.body.address ? sanitizeHtml(req.body.address) : undefined,
      organizer: req.body.organizer || 'VVoA',
      isVVoAEvent: req.body.isVVoAEvent !== undefined ? req.body.isVVoAEvent : true,
      registrationLink: req.body.registrationLink ? sanitizeHtml(req.body.registrationLink) : undefined,
      imageUrl: req.body.imageUrl ? sanitizeHtml(req.body.imageUrl) : undefined,
      cost: req.body.cost ? sanitizeHtml(req.body.cost) : undefined,
      memberCost: req.body.memberCost ? sanitizeHtml(req.body.memberCost) : undefined,
      featured: req.body.featured || false,
      recurring: req.body.recurring || { isRecurring: false, frequency: 'none' },
      status: req.body.status || 'upcoming'
    };

    const newEvent = new Event(eventData);
    await newEvent.save();

    res.json({
      success: true,
      message: 'Event created successfully',
      event: newEvent
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating event',
      error: error.message
    });
  }
});

// UPDATE event (admin only)
app.put('/api/events/:id', adminMutationLimiter, adminAuth, async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Fix date if it's being updated
    if (updateData.date) {
      const dateParts = updateData.date.split('-');
      updateData.date = new Date(Date.UTC(
        parseInt(dateParts[0]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[2]),
        12, 0, 0
      ));
    }

    updateData.updatedAt = Date.now();

    // Sanitize string fields
    const stringFields = ['title', 'description', 'time', 'endTime', 'city', 'venue', 'address', 'organizer', 'registrationLink', 'imageUrl', 'cost', 'memberCost'];
    stringFields.forEach(field => {
      if (updateData[field]) {
        updateData[field] = sanitizeHtml(updateData[field]);
      }
    });

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      message: 'Event updated successfully',
      event: updatedEvent
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating event',
      error: error.message
    });
  }
});

// DELETE event (admin only)
app.delete('/api/events/:id', adminMutationLimiter, adminAuth, async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting event'
    });
  }
});

// BULK CREATE events (admin only)
app.post('/api/events/bulk', adminMutationLimiter, adminAuth, async (req, res) => {
  try {
    const events = req.body.events;

    if (!Array.isArray(events)) {
      return res.status(400).json({
        success: false,
        message: 'Events must be an array'
      });
    }

    // Process each event to fix timezone issues
    const processedEvents = events.map(event => {
      // Create date at noon UTC to avoid timezone shifts
      const dateParts = event.date.split('-');
      const eventDate = new Date(Date.UTC(
        parseInt(dateParts[0]), // year
        parseInt(dateParts[1]) - 1, // month (0-indexed)
        parseInt(dateParts[2]), // day
        12, 0, 0 // Set to noon UTC
      ));

      return {
        ...event,
        date: eventDate
      };
    });

    const createdEvents = await Event.insertMany(processedEvents);

    res.json({
      success: true,
      message: `${createdEvents.length} events created successfully`,
      events: createdEvents
    });
  } catch (error) {
    console.error('Error bulk creating events:', error);
    res.status(500).json({
      success: false,
      message: 'Error bulk creating events',
      error: error.message
    });
  }
});

// ============================================
// GALLERY API ROUTES
// ============================================

// GET all gallery items (public)
app.get('/api/gallery', async (req, res) => {
  try {
    const galleryItems = await Gallery.find().sort({ addedAt: -1 });

    res.json({
      success: true,
      items: galleryItems
    });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching gallery items'
    });
  }
});

// POST new gallery item (admin only)
app.post('/api/admin/gallery', adminMutationLimiter, adminAuth, async (req, res) => {
  try {
    const { type, url, caption } = req.body;

    if (!type || !url) {
      return res.status(400).json({
        success: false,
        message: 'Type and URL are required'
      });
    }

    const newItem = new Gallery({
      type: sanitizeHtml(type),
      url: sanitizeHtml(url),
      caption: caption ? sanitizeHtml(caption) : ''
    });

    await newItem.save();

    res.json({
      success: true,
      message: 'Gallery item added successfully',
      item: newItem
    });
  } catch (error) {
    console.error('Error adding gallery item:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding gallery item',
      error: error.message
    });
  }
});

// DELETE gallery item (admin only)
app.delete('/api/admin/gallery/:index', adminMutationLimiter, adminAuth, async (req, res) => {
  try {
    const index = parseInt(req.params.index);

    // Get all items sorted by addedAt
    const allItems = await Gallery.find().sort({ addedAt: -1 });

    if (index < 0 || index >= allItems.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid index'
      });
    }

    // Delete the item at the specified index
    await Gallery.findByIdAndDelete(allItems[index]._id);

    res.json({
      success: true,
      message: 'Gallery item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting gallery item'
    });
  }
});

// ============================================
// VEGAN SOCIAL MEETUPS API ROUTES
// ============================================

// GET VSM content (public)
app.get('/api/vegan-social-meetups', async (req, res) => {
  try {
    let vsm = await VSM.findOne();

    // If no document exists, create default one
    if (!vsm) {
      vsm = new VSM({
        description: "We are all about building a vegan social community where folks who are vegan or interested in veganism can connect and build meaningful lifelong friendships and connections. We do this through in-person vegan events in Calgary and Edmonton.",
        items: []
      });
      await vsm.save();
    }

    res.json({
      success: true,
      description: vsm.description,
      items: vsm.items
    });
  } catch (error) {
    console.error('Error fetching VSM:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching VSM content'
    });
  }
});

// PUT VSM description (admin only)
app.put('/api/admin/vegan-social-meetups/description', adminMutationLimiter, adminAuth, async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({
        success: false,
        message: 'Description is required'
      });
    }

    let vsm = await VSM.findOne();

    if (!vsm) {
      vsm = new VSM({ description: sanitizeHtml(description), items: [] });
    } else {
      vsm.description = sanitizeHtml(description);
      vsm.updatedAt = Date.now();
    }

    await vsm.save();

    res.json({
      success: true,
      message: 'Description updated successfully'
    });
  } catch (error) {
    console.error('Error updating VSM description:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating description',
      error: error.message
    });
  }
});

// POST new VSM media item (admin only)
app.post('/api/admin/vegan-social-meetups/media', adminMutationLimiter, adminAuth, async (req, res) => {
  try {
    const { type, url, caption } = req.body;

    if (!type || !url) {
      return res.status(400).json({
        success: false,
        message: 'Type and URL are required'
      });
    }

    let vsm = await VSM.findOne();

    if (!vsm) {
      vsm = new VSM({
        description: "We are all about building a vegan social community where folks who are vegan or interested in veganism can connect and build meaningful lifelong friendships and connections. We do this through in-person vegan events in Calgary and Edmonton.",
        items: []
      });
    }

    vsm.items.push({
      type: sanitizeHtml(type),
      url: sanitizeHtml(url),
      caption: caption ? sanitizeHtml(caption) : ''
    });

    vsm.updatedAt = Date.now();
    await vsm.save();

    res.json({
      success: true,
      message: 'Media item added successfully'
    });
  } catch (error) {
    console.error('Error adding VSM media:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding media item',
      error: error.message
    });
  }
});

// DELETE VSM media item (admin only)
app.delete('/api/admin/vegan-social-meetups/media/:index', adminMutationLimiter, adminAuth, async (req, res) => {
  try {
    const index = parseInt(req.params.index);

    const vsm = await VSM.findOne();

    if (!vsm) {
      return res.status(404).json({
        success: false,
        message: 'VSM document not found'
      });
    }

    if (index < 0 || index >= vsm.items.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid index'
      });
    }

    vsm.items.splice(index, 1);
    vsm.updatedAt = Date.now();
    await vsm.save();

    res.json({
      success: true,
      message: 'Media item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting VSM media:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting media item'
    });
  }
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});