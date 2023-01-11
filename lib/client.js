import sanityClient from '@sanity/client';
import imageurlBuilder from '@sanity/image-url';
export const client = sanityClient({
    projectId:'0n85eypv',
    dataset:'production',
    apiVersion:'2023-01-10',
    useCdn:true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageurlBuilder(client);

export const urlFor =(source)=> builder.image(source);