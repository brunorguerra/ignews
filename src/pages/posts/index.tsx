import { GetStaticProps } from "next";
import Head from "next/head";

import { getPrismicClient } from "../../services/prismic";
import * as prismicH from "@prismicio/helpers";

import styles from "./styles/styles.module.scss";
import Link from "next/link";

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
};

interface PostsProps {
    posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map((post) => (
                        <Link href={`/posts/${post.slug}`} key={post.slug}>
                            <a href="">
                                <time>{post.updatedAt}</time>
                                <strong>{post.title}</strong>
                                <p>{post.excerpt}</p>
                            </a>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.getAllByType("publication", {
        pageSize: 10,
    });

    const posts = response.map((post) => {
        return {
            slug: post.uid,
            title: prismicH.asText(post.data.title),
            excerpt:
                post.data.content.find(
                    (content: { type: string }) => content.type === "paragraph"
                )?.text ?? "",
            updatedAt: new Date(post.last_publication_date).toLocaleDateString(
                "pt-BR",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                }
            ),
        };
    });

    return {
        props: {
            posts,
        },
        redirect: 60 * 60 * 1, // 1 hour
    };
};
