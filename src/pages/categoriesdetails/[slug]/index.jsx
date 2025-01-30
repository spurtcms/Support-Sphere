
import Help_center_detail_component from '@/components/help_center/help_center_detail_component'
import PageNotFound from '@/pages/404'
import { fetchGraphQl } from '@/pages/api/graphicql'
import { GET_POSTS_CATEGORYLIST_QUERY, GET_POSTS_SLUG_QUERY } from '@/pages/api/query'
import { defaultCategorySlug } from '@/pages/api/url'
// import PageNotFound from '@/pages/404'
import React from 'react'




export default  function Help_Center_Detail_Page({ categoryList, detailData, params }) {

    if (!detailData) {
        return <PageNotFound/>;
    }

    

    return (
        <> 
            <Help_center_detail_component detailData={detailData} categoryList={categoryList} params={params?.slug} />
        </>
    )
}

// This function runs server-side at request time.
export async function getServerSideProps(context) {
    const { slug } = context.params; // Access the route parameters.
    // const defaultCategorySlug = "example-slug"; // Replace with your actual default slug.

    // Define the variables for your queries.
    let variable_category = {
        commonFilter: {
            limit: 50,
            offset: 0,
        },
        categoryFilter: {
            categoryGroupSlug: defaultCategorySlug,
            excludeGroup: true,
        },
    };

    let variable_slug = {
        slug: slug,
        AdditionalData: {
            authorDetails: true,
            memberProfile: false,
            additionalFields: false,
            categories: true,
        },
    };

    try {
        // Fetch the data.
        const [categoryList, detailData] = await Promise.all([
            fetchGraphQl(GET_POSTS_CATEGORYLIST_QUERY, variable_category),
            fetchGraphQl(GET_POSTS_SLUG_QUERY, variable_slug),
        ]);

        // If no detailData, return a 404.
        if (!detailData) {
            return {
                notFound: true,
            };
        }

        // Pass data as props to the page component.
        return {
            props: {
                categoryList,
                detailData,
                params: { slug }, // Pass the slug as part of the props
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);

        // Return a 404 if there’s an error.
        return {
            notFound: true,
        };
    }
}
