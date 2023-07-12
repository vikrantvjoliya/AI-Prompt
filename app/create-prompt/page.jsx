'use client'

import {useState} from 'react';
import {useSession} from 'next-auth/react';
import { useRouter } from 'next/router';

import Form from '@components/Form';


const CreatePrompt = () => {
  const [submitting, setSubmittting] = useState(false);
  const [post, setPost] = useState({
    prompt:'',
    tag:'',
  });

  const createPrompt = async(e) =>{
    e.preventDefault();
    setSubmittting(true);

    try{
        const response = await fetch('/api/prompt/new',{
            method: 'POST',
            body: JSON.stringify({
                prompt: post.prompt,
                userId: session?.user.id,
                tag: post.tag
            })
        })

        if(response.ok){
            router.push('/')
        }
    }
    catch(error){
        console.log(error);
    } finally{
        setSubmittting(false);
    }
  }


    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={CreatePrompt}
        />    
    )
}

export default CreatePrompt
