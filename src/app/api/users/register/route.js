import User from '@/models/user';
import bcryptjs from 'bcryptjs';
import dbConnect from '@/database/config';

dbConnect();

export const POST = async(NextRequest) => {
    try {
        const body = await NextRequest.json();
        console.log(body);
        const{name, email, password, role} = body;

        if(!name || !email || !password || !role){
            return new Response("Please Fill all the fields",{status:401});
        }

        const user = await User.findOne({email});

        if(user){
            return new Response("Email already exist", {status: 400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPasword = await bcryptjs.hash(password,salt);

        const newUser = new User({
            name,
            email,
            password:hashedPasword,
            role
        })

        await newUser.save();

        return new Response("User Registered Successfully...",{status:200});
    } catch (error) {
        console.log(error);
        return new Response("Something Went Wrong",{status:500})
    }
}

