import { fetchGraphQl } from '@/pages/api/graphicql';
import { GET_HEADER_QUERY, GET_POSTS_CATEGORYLIST_QUERY, GET_POSTS_LIST_QUERY } from '@/pages/api/query';
import { defaultCategorySlug, image_url } from '@/pages/api/url';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export const Header_component = () => {

    const [header_api_result, setheader_api_result] = useState(null);
    const [categoryEntries, setCategoryEntries] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchCategoryList = async () => {
            const variable_category = {
                tenantId: categoryEntries?.ChannelEntriesList?.channelEntriesList?.[0].tenantId

            };

            try {
                const fetchedCategoryList = await fetchGraphQl(GET_HEADER_QUERY, variable_category);
                setheader_api_result(fetchedCategoryList);
            } catch (err) {
                console.error("Error fetching category list:", err);
                setError(err.message);
            }
        };

        fetchCategoryList();
    }, [categoryEntries]); // Fetch the category list only once on component mount

    useEffect(() => {
        const fetchCategoryEntries = async () => {
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
                const fetchedCategoryEntries = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list);
                setCategoryEntries(fetchedCategoryEntries);
            } catch (err) {
                console.error("Error fetching category entries:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryEntries();
    }, []); // Fetch the category entries only once on component mount

    console.log("categoryLi2st", header_api_result?.GeneralInformation?.logoPath, header_api_result)

    return (
        <>
            <header className="p-0 sticky top-0 z-[200] bg-white border border-[#231F201F]">
                <div className="flex items-center gap-4 h-16 bg-white max-w-[1280px] mx-auto p-2.5 px-4">
                    <Link href={`/`} legacyBehavior>
                        <a className='max-w-[35%]'>
                            <img src={![undefined, null, ""].includes(header_api_result?.GeneralInformation?.logoPath) ? image_url + header_api_result?.GeneralInformation?.logoPath : "/images/helpCenter-logo.svg"}
                                alt="logo" />
                        </a>

                    </Link>
                    <Link href={`/`} legacyBehavior>
                        <h2 className='text-base font-semibold leading-[19.5px] border-l border-[#D8D8D8] pl-2.5 h-full items-center flex cursor-pointer'>Help Center</h2>
                    </Link>
                    <a href="https://spurtcms.com/" target="_blank" className='group hover:underline text-sm font-semibold leading-[17.07px] text-[#1B1B20] flex items-center ml-auto'>
                        <p>Visit <span className='max-sm:hidden'>Spurtcommerce.com</span></p>
                        <img src="/images/showall-arrow.svg" alt="arrow" className='group-hover:translate-x-1 ml-1 transition-all duration-200 ease-in-out' />
                    </a>
                </div>
            </header>

        </>
    )
}

