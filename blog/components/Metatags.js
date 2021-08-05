import Head from 'next/head';

export default function Metatags({ title, description, image }) {
    return (
        <Head>
            <title>{`${title} - jonblog`}</title>
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="jonblog" />
            <meta name="twitter:title" content={`${title} - jonblog`} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            <meta property="og:title" content={`${title} - jonblog`} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
        </Head>
    );
}