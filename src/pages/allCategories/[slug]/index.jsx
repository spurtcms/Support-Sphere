import All_categories_component from '@/components/help_center/All_categories_component';
import { fetchGraphQl } from '@/pages/api/graphicql';
import { GET_POSTS_CATEGORYLIST_QUERY, GET_POSTS_LIST_QUERY } from '@/pages/api/query';
import { defaultCategorySlug } from '@/pages/api/url';
import React from 'react';

const AllCategories_Page = ({ CategoryList, CategoryEntries, params }) => {
    if (!CategoryList || !CategoryEntries) {
        return <div>Error loading data</div>; // Show an error if data is missing
    }

    return (
        <>
            <All_categories_component CategoryList={CategoryList} CategoryEntries={CategoryEntries} params={params?.slug} />
        </>
    );
};

export default AllCategories_Page;

// Server-side function
export async function getServerSideProps(context) {
    const { slug } = context.params; // Access the route parameters.
    // const defaultCategorySlug = "example-slug"; // Replace with your actual default slug.

    if (!slug) {
        // If slug is missing, return a 404
        return {
            notFound: true,
        };
    }

    // Define the variables for your queries.
    const variable_category = {
        commonFilter: {
            limit: 50,
            offset: 0,
        },
        categoryFilter: {
            categoryGroupSlug: defaultCategorySlug,
            excludeGroup: true,
        },
    };

    const variable_list = {
        commonFilter: {
            offset: 0,
            keyword: "",
        },
        entryFilter: {
            Status: "Publish",
            categorySlug: defaultCategorySlug,
        },
        AdditionalData: {
            categories: true,
        },
    };

    try {
        // Fetch the data in parallel
        const [CategoryList, CategoryEntries] = await Promise.all([
            fetchGraphQl(GET_POSTS_CATEGORYLIST_QUERY, variable_category),
            fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list),
        ]);

        // If either CategoryList or CategoryEntries are missing, return 404
        if (!CategoryList || !CategoryEntries) {
            return {
                notFound: true,
            };
        }

        // Pass data as props to the page component
        return {
            props: {
                CategoryList,
                CategoryEntries,
                params: { slug }, // Pass the slug as part of the props
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);

        // Return a 404 if an error occurs during the fetch
        return {
            notFound: true,
        };
    }
}
