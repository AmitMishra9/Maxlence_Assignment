const Users = require('../models/Users');

const getallUsers = async(req,res)=>{
    try {
        const users = await Users.findAll();
        //console.log(users);
        res.send(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const updateUser = async(req,res)=>{
    const { id, fullname, email } = req.body; 

    try {
        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.fullname = fullname; 
        user.email = email;
       
        

       
        await user.save();

        return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


const  deleteUser= async(req,res)=>{
    const userId = req.body.id; 

    try {
        // Check if the user exists
        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user
        await user.destroy();

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const  getuserByid = async (req, res) => {
    const userId = req.body.id; 

    try {
        // Find the user by ID
        const user = await Users.findByPk(userId);
        console.log(user); // Log user object
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const updateuserImage= async(req,res)=>{
    const userId = req.body.id; 
    const  image  = req.file.path; 
    console.log(req.file);
    try {
    
        const user = await Users.findByPk(userId);

        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

       
        user.image = image;

        
        await user.save();

    
        return res.status(200).json({ message: 'User image updated successfully' });
    } catch (error) {
        console.error('Error updating user image:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports={
    getallUsers,
    deleteUser,
    updateUser,
    getuserByid,
    updateuserImage,
}
