'use client';

import { useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'

const CreatePrompt = () => {
    const router = useRouter()
    const { data: session } = useSession()

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: 'Inspirational',
        description: '',
        showEmail: true,
        author: ''
    })

    const createPrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetch('/api/prompt/new',
            {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag,
                    description: post.description,
                    date: Date.now(),
                    showEmail: post.showEmail,
                    author: post.author,
                })
            })

            if(response.ok){
                router.push('/');
            }



        }catch (error) {

            console.log(error)

        } finally {
            setSubmitting(false)
        }

    }

  return (
    <Form
    type="Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt