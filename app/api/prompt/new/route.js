import { connectToDB } from "@util/database";


export const POST = async (req, res) => {
    const {userId, prompt,tag} = await res.json();

    try{
        await connectToDB();

    }catch(error){
        
    }
}