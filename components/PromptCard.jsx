"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";


const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) =>{
  
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  //this code only works for pc
  // const handleCopy = () => {
  //   setCopied(post.prompt);
  //   navigator.clipboard?.writeText(post.prompt);
  //   // setTimeout(() => setCopied(false), 3000);
  // };

  // this works for both pc as well as mobile devices
  const handleCopy = () => {
    const promptText = post.prompt;
  
    if (navigator.clipboard) {
      navigator.clipboard.writeText(promptText)
        .then(() => {
          setCopied(promptText);
          console.log('Prompt copied to clipboard');
        })
        .catch((error) => {
          console.error('Failed to copy prompt:', error);
        });
    } else {
      // Fallback for browsers that do not support the Clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = promptText;
      textArea.style.position = 'fixed';
      textArea.style.opacity = 0;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
  
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopied(promptText);
          console.log('Prompt copied to clipboard');
        } else {
          console.error('Failed to copy prompt');
        }
      } catch (error) {
        console.error('Failed to copy prompt:', error);
      }
  
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
        <Image
            // src={post.creator.image}
            // src="/assets/images/logo.svg"
            src={post.creator?.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className="flex flex-col">
            <h3 className="font-sathoshi font-semibold text-gray-900">
              {post.creator}</h3>
            
            <p className="font-inter text-sm text-gray-500">
              {post.creator?.email}</p>
              

          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image 
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700"> {post.prompt}</p>

      <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={()=> handleTagClick && handleTagClick(post.tag)}
      >{post.tag}</p>

    </div>
  )
}

export default PromptCard