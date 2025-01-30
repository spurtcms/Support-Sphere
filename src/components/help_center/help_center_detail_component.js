import moment from 'moment'
import React, { useState } from 'react'
import { Header_component } from '../header/header_component'
import Link from 'next/link'
import Categories_Detail_skeleton from '../skeleton_loader/Categoried_detail_skeleton'

const Help_center_detail_component = ({ detailData, categoryList, params }) => {

    console.log("wqwqw122", detailData, categoryList, params)

    console.log("wqwqw12ass2", detailData?.ChannelEntryDetail)
    const [activeButton, setActiveButton] = useState(null);

    const handleClick = (response) => {
        setActiveButton(response); // Store the button clicked
        setTimeout(() => setActiveButton(null), 2000); // Reset after 1 second
    };

    return (
        <>
            <div>
                {/* <Header_component /> */}
                {[undefined, null, ""].includes(detailData) ? <>
                    <section class="max-w-[1060px] p-[70px_16px] mx-auto max-[1300px]:p-[32px_16px] max-sm:p-[16px]">
                        <Categories_Detail_skeleton />
                    </section>
                </> : <>

                    <section class="max-w-[1060px] p-[70px_16px] mx-auto max-[1300px]:p-[32px_16px] max-sm:p-[16px]">
                        <ul class="flex items-center mb-[30px]">
                            <li className='text-[14px] font-semibold leading-[17.07px] text-left mr-[8px] text-[#1B1B20] overflow-hidden line-clamp-2 max-[425px]:mr-[4px]'>
                                <Link href={`/`} legacyBehavior>

                                    <a className='text-[#1B1B20C2] text-[14px] font-semibold leading-[17.07px] text-left mr-[8px] max-[425px]:text-[13px] max-[425px]:mr-[4px]'>Home</a>
                                </Link>
                            </li>
                            <li className='text-[14px] font-semibold leading-[17.07px] text-left mr-[8px] text-[#1B1B20] overflow-hidden line-clamp-2 max-[425px]:mr-[4px]'>
                                <img src="/images/search-resultArrow.svg" alt="arrow" className='h-[16px]' />
                            </li>
                            <Link href={`/allCategories/${detailData?.ChannelEntryDetail?.categories?.[0]?.[0]?.categorySlug}`} legacyBehavior>
                                <li className='text-[14px] font-semibold leading-[17.07px] text-left mr-[8px] text-[#1B1B20] overflow-hidden line-clamp-2 max-[425px]:mr-[4px]'>
                                    <a href="" className='text-[#1B1B20C2] text-[14px] font-semibold leading-[17.07px] text-left mr-[8px] max-[425px]:text-[13px] max-[425px]:mr-[4px] '>{detailData?.ChannelEntryDetail?.categories?.[0]?.[0]?.categoryName}</a>
                                </li>

                            </Link>
                            <li className='text-[14px] font-semibold leading-[17.07px] text-left mr-[8px] text-[#1B1B20] overflow-hidden line-clamp-2 max-[425px]:mr-[4px]'>
                                <img src="/images/search-resultArrow.svg" alt="arrow" className='h-[16px]' />
                            </li>
                            <li className='text-[14px] font-semibold leading-[17.07px] text-left mr-[8px] text-[#1B1B20] overflow-hidden line-clamp-2 max-[425px]:text-[13px] max-[425px]:mr-0'>
                                {detailData?.ChannelEntryDetail?.title}
                            </li>
                        </ul>
                        <h1 className='text-[36px] font-extrabold leading-[43.88px] text-[#1B1B20] mb-[26px]'>

                            {detailData?.ChannelEntryDetail?.title}
                        </h1>

                        <ul className="flex items-center mb-[30px]">
                            <li className='text-[#1B1B20C2] text-[14px] font-medium leading-[17.07px] mr-[30px] flex items-center'>
                                <img src="/images/helpCenter-duration.svg" alt="duration" className='mr-[4px]' />
                                <span className='text-[#1B1B20C2] text-[14px] font-medium leading-[17.07px] max-sm:text-[12px]'>
                                    {/* 2 min. read */}
                                    {/* {moment(detailData?.ChannelEntryDetail?.createdOn).format("h:mm A")} */}
                                    {detailData?.ChannelEntryDetail?.readingTime} min. read


                                </span>
                            </li>

                            <li className='text-[#1B1B20C2] text-[14px] font-medium leading-[17.07px] mr-[30px] flex items-center'>
                                <img src="/images/helpCenter-updation.svg" alt="duration" className='mr-[4px]' />
                                <span className='text-[#1B1B20C2] text-[14px] font-medium leading-[17.07px] max-sm:text-[12px]'>Last Updated: {" "}
                                    {moment(detailData?.ChannelEntryDetail?.createdOn).format("MMMM Do, YYYY")}
                                </span>
                            </li>
                        </ul>

                        <div className="flex flex-col gap-6 mb-6">

                            <div className=""
                                dangerouslySetInnerHTML={{ __html: detailData?.ChannelEntryDetail?.description?.replaceAll("<br>", " ").replace(/p-\[24px_60px_10px\]/g, "") }} />
                        </div>



                        <div class="bg-[#F6F6F7] grid place-items-center h-[246px] rounded-[8px] p-[16px]">
                            <div>
                                <h4 className='text-[24px] font-bold leading-[30px] text-[#231F20] text-center'>Was this article helpfull?</h4>
                                <ul class="flex items-center justify-center mt-[30px] mb-[30px]">
                                    <li>
                                        <a
                                            class=
                                            {activeButton == "yes" ? "border-[#1B1B2026] h-[37px] flex items-center justify-center rounded-[8px] w-[81px] text-[#1B1B20] text-[14px] font-semibold leading-[17.07px] mr-[16px] group hover:bg-[#231F20] hover:text-[#ffffff] hover:border-[#231F20] cursor-pointer  bg-[#231F20] text-[#ffffff] border-[#231F20]" :
                                                "bg-white border border-[#1B1B2026] h-[37px] flex items-center justify-center rounded-[8px] w-[81px] text-[#1B1B20] text-[14px] font-semibold leading-[17.07px] mr-[16px] group hover:bg-[#231F20] hover:text-[#ffffff] hover:border-[#231F20] cursor-pointer "}
                                            onClick={() => handleClick('yes')}
                                        >
                                            <span className='mr-[4px]'>Yes</span>
                                            <span class="thumb">
                                                <img class="rotate-180 group-hover:hidden" src="/images/thumb-no.svg" alt="no" />
                                                <img src="/images/thumb-yes.svg" alt="not" className='hidden group-hover:inline-block ' />
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            class={activeButton == "no" ? " border border-[#1B1B2026] h-[37px] flex items-center justify-center rounded-[8px] w-[81px] text-[#1B1B20] text-[14px] font-semibold leading-[17.07px] mr-[16px] group hover:bg-[#231F20] hover:text-[#ffffff] hover:border-[#231F20] cursor-pointer  bg-[#231F20] text-[#ffffff] border-[#231F20]" :
                                                "bg-white border border-[#1B1B2026] h-[37px] flex items-center justify-center rounded-[8px] w-[81px] text-[#1B1B20] text-[14px] font-semibold leading-[17.07px] mr-[16px] group hover:bg-[#231F20] hover:text-[#ffffff] hover:border-[#231F20] cursor-pointer "}

                                            onClick={() => handleClick('no')}
                                        ><span className='mr-[4px]'>No</span>
                                            <span class="thumb">
                                                <img src="/images/thumb-no.svg" alt="no" className={`${activeButton === 'no' ? 'filter invert group-hover:hidden' : ' group-hover:hidden'}`} />
                                                <img class="rotate-180 hidden group-hover:inline-block" src="/images/thumb-yes.svg" alt="yes" />
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </section>





                </>}
            </div>

        </>
    )
}
export default Help_center_detail_component