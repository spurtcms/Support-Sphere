import React, { useEffect, useState } from 'react'
import { Header_component } from '../header/header_component'
import Link from 'next/link'
import Nodata_Message from '../No_Data/No_data_Meassage'

const All_categories_component = ({ CategoryList, CategoryEntries, params }) => {

    console.log("qwqwwq1212deee", CategoryList, CategoryEntries, params)

    const [categoryList, setCategoryList] = useState()
    const [categoryEntries, setCategoryEntries] = useState(CategoryEntries)

    console.log("ssasaasweewew", categoryList)
    useEffect(() => {

        window.scrollTo(0, 0);


        const filteredData = CategoryList?.CategoryList?.categorylist && CategoryList?.CategoryList?.categorylist
            .filter(d => d?.categorySlug === params).map(data => {
                const matchingEntries = categoryEntries?.ChannelEntriesList?.channelEntriesList
                    .filter(res => res?.categories?.some(val => val?.some(s => s?.categorySlug === data?.categorySlug)));
                return { ...data, filterData: matchingEntries };
            });

        if (filteredData) {
            setCategoryList(filteredData)
        }
        else (
            setCategoryList(CategoryList?.CategoryList?.categorylist)
        )
    }, [])

    return (
        <>
            <div>
                {/* <Header_component /> */}

                <section className="max-w-[1068px] mx-auto py-[70px] px-[16px] max-[1300px]:p-[16px]">
                    <ul className="flex items-center mb-[26px]">
                        <li className='text-[14px] font-semibold leading-[17.07px] text-left mr-[8px] text-[#1B1B20] overflow-hidden line-clamp-2 '>
                            <Link href={`/`} legacyBehavior>
                                <a className='text-[#1B1B20C2] text-[14px] font-semibold leading-[17.07px] text-left mr-[8px] hover:text-[#2D47DA]  '>Home</a>

                            </Link>
                        </li>
                        <li className='text-[14px] font-semibold leading-[17.07px] text-left mr-[8px] text-[#1B1B20] overflow-hidden line-clamp-2 '>
                            <img src="/images/search-resultArrow.svg" alt="arrow" className='h-[16px]' />
                        </li>
                        <li className='text-[14px] font-semibold leading-[17.07px] text-left mr-[8px] text-[#1B1B20] overflow-hidden line-clamp-2  '>
                            {categoryList?.[0]?.categoryName}
                        </li>
                    </ul>

                    <h1 className='text-[30px] font-bold leading-[36.57px] text-[#1B1B20] text-left mb-[20px]'>
                        {categoryList?.[0]?.categoryName}
                    </h1>

                    <ul>
                        {console.log("vasl", categoryList?.[0]?.filterData.length)}
                        {categoryList?.[0]?.filterData.length !== 0 ? <>
                            {categoryList?.[0]?.filterData?.map((val, i) => (
                                <>

                                    <Link href={`/categoriesdetails/${val?.slug}`} legacyBehavior>
                                        <li><a href="/help_center_detail" className="grid grid-cols-[1fr_auto] gap-[1rem] py-[20px] border-b border-[#231F201F] group">
                                            <p className='text-base font-medium leading-[19.5px] text-[#4F4F53] group-hover:text-[#2D47DA]'>
                                                {val?.title}</p>
                                            <div className="grid">
                                                <img src="/images/search-resultArrow.svg" alt="arrow" className='group-hover:hidden w-[24px] ' />
                                                <img src="/images/helpCenter-arrowActive.svg" alt="arrow" className='group-hover:inline-block hidden w-[24px]' />
                                            </div>
                                        </a>
                                        </li>

                                    </Link>

                                </>
                            ))}
                        </> : <>
                            <Nodata_Message />
                        </>}
                    </ul>
                </section>

            </div>

        </>

    )
}

export default All_categories_component