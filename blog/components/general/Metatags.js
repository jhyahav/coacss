import Head from 'next/head';

export default function Metatags({ title, description, image }) {
    return (
        <Head>
            <title>{`${title} - COACSS`}</title>
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="confessions of a computer science student" />
            <meta name="twitter:title" content={`${title} - COACSS`} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            <meta property="og:title" content={`${title} - COACSS`} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
        </Head>
    );
}