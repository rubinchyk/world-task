'use client';
import styles from './Posts.module.scss';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export type PostsProps = {
  res: string
  message: string
  data: Post[]
}

export type Post = {
  id: number
  title: string
  content: string
}

const initialData: Post[] = [];

export default function Posts({ res, data: initialData }: PostsProps) {
  const [data, setData] = useState(initialData);

  const removePost = async (id: number) => {
    const res = await fetch(`http://localhost:8000/delete_post/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });
    const d = await res.json();

    if (d.res === 'OK') {
      setData(data.filter(post => post.id !== id));
    }
  }

  // Используйте useEffect, чтобы синхронизировать состояние данных с пропсами
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <>
      <div className={styles['posts-wrapper']}>
        {res === 'OK' && data.map((post) => (
          <div className={styles['post-wrapper']}>
            <Link key={post.id} href={`/posts/${post.id}`}>
              <div className={styles.post}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
            </Link>
            <div onClick={() => removePost(post.id)} className={styles['remove-icon']}></div>
          </div>
        ))}
      </div>
    </>
  );
}