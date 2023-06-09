import React from 'react';
import styles from './AddPost.module.scss';
import { useRouter } from 'next/router';

export default function AddPost() {
    const router = useRouter();

    const add_post = async (ev: any) => {
        ev.preventDefault();
        const form = ev.target;
        const title = form.title.value;
        const content = form.content.value;

        const params = {
            title: title,
            content: content
        };

        const res = await fetch(`http://localhost:8000/add_post?title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}`, {
            method: 'POST',
        });

        const response = await res.json();

        if (response.res === 'OK') {
            router.push("/");
        }
    }

    return (
        <>
            <form className={styles['form']} onSubmit={add_post}>
                <input type="text" name="title" placeholder="Title" />
                <textarea name="content" placeholder="Content"></textarea>
                <button type="submit">Add post</button>
            </form>
        </>
    )
}
