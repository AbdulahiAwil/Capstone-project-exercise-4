import User from "../model/User.js";
import { generateToken } from "../utility/generateToken.js";


// Auth Register

export const register = async (req, res, next) =>{
    let { name, email, password, role, profilePicture } = req.body;

    try {
        email = email.toLowerCase();
        const exists = await User.findOne({ email })

        if(exists) return res.status(400).json({message: 'Email already in use'})

        const user = await User.create({ name, email, password, role, profilePicture })

        const token = generateToken(user._id)
        res.status(201).json({token})


        
    } catch (err) {
        console.log("error", err)
        next(err);
    }
}

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
        console.log("User info", user)
    const token = generateToken(user._id);
    res.json({ token, user });
  } catch (err) {
    next(err);
  }
};

// Get all users – Admin only
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password'); // Ka saar password-ka
    res.status(200).json(users);
  } catch (err) {
    console.log('Error getting users', err);
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Fields la oggol yahay in la update gareeyo
    const { name, email, profilePicture, role } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update fields hadba kii la keenay
    if (name) user.name = name;
    if (email) user.email = email.toLowerCase();
    if (profilePicture) user.profilePicture = profilePicture;
    if (role) user.role = role; // Optional: oggolow in admin kaliya uu role update-gareeyo

    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    console.log('Error updating user', err);
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.deleteOne(); // ama: await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.log('Error deleting user', err);
    next(err);
  }
};



