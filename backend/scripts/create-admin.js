const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Define User schema inline (since we can't easily import TypeScript)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6, select: false },
  phone: { type: String, trim: true },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eversol';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Admin credentials
    const adminData = {
      name: 'Admin User',
      email: 'admin@mangala.com',
      password: 'Admin@123',
      role: 'admin',
      isActive: true,
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      // Update existing admin with plain text password
      existingAdmin.password = adminData.password;
      await existingAdmin.save();
      console.log('✅ Admin account updated successfully!');
      console.log('\n📧 Admin Credentials:');
      console.log('Email:', adminData.email);
      console.log('Password:', adminData.password);
      console.log('\n⚠️  Password stored as plain text in database.');
      await mongoose.disconnect();
      return;
    }

    // Store password as-is (plain text)
    // Create admin user
    const admin = await User.create({
      name: adminData.name,
      email: adminData.email,
      password: adminData.password, // Store password exactly as provided
      role: adminData.role,
      isActive: adminData.isActive,
    });

    console.log('✅ Admin account created successfully!');
    console.log('\n📧 Admin Credentials:');
    console.log('Email:', adminData.email);
    console.log('Password:', adminData.password);
    console.log('\n⚠️  Please change the password after first login!');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

createAdmin();

