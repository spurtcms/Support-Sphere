"use client"
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { Header_component } from '../header/header_component';

const Help_center_component = ({ CategoryList, CategoryEntries }) => {

    const [open, setOpen] = useState(false);

    const [keyword, setkeyword] = useState("")

    const [searchData, SetSearchData] = useState(CategoryList?.CategoryList?.categorylist)

    const [CategoryList_arr, setCategoryList_arr] = useState();
    const [categoryEntries, setCategoryEntries] = useState(CategoryEntries);
    const [loader, setLoader] = useState(true);

    const [isClickedInside, setIsClickedInside] = useState(false);
    const divRef = useRef(null);

    useEffect(() => {
        const handleClick = (event) => {
            // Check if the clicked element is inside the div
            if (divRef.current && divRef.current.contains(event.target)) {
                setIsClickedInside(true);
            } else {
                setIsClickedInside(false);
            }
        };

        // Add event listener to the document
        document.addEventListener("click", handleClick);

        // Cleanup the event listener
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);
    console.log("isClickedInside", isClickedInside)



    useEffect(() => {
        window.scrollTo(0, 0);

        let FindData =
            CategoryList?.CategoryList?.categorylist &&
            CategoryList?.CategoryList?.categorylist.map((data) => {
                let Arr = [];
                categoryEntries?.ChannelEntriesList?.channelEntriesList.map((res) => {
                    let dd = res?.categoriesId.split(",");
                    if (dd.includes(data?.id.toString())) {
                        Arr.push(res);
                    }
                });
                data.filterData = Arr;

                return data;
            });
        if (FindData) {
            setCategoryList_arr(FindData);
            setLoader(false);
        } else {
            setCategoryList_arr(CategoryList?.CategoryList?.categorylist);
            setLoader(false);
        }
    }, []);
    console.log("CategoryList_arr", CategoryList_arr)


    const searchApiCall = async () => {

        let valuesFilter = CategoryList_arr && CategoryList_arr.length > 0
            ? CategoryList_arr.filter(d =>
                d.categoryName.toLowerCase().includes(keyword.toLowerCase()) ||
                (d.filterData && d.filterData.some(s => s.title.toLowerCase().includes(keyword.toLowerCase()))))
            : [];
        SetSearchData(valuesFilter)


    }

    useEffect(() => {
        if (keyword != "") {
            searchApiCall()
        }
    }, [keyword])

    console.log("keyword", keyword, searchData)

    const handleclick_filterDropdown = (e) => {
        e.stopPropagation()
        setIsClickedInside(true)
    }

    const handleclick_dropdown_homebutton=(e)=>{
        e.stopPropagation()
        setIsClickedInside(false)

    }

    return (
        <>
            <div>
                {/* <Header_component /> */}


                <div className="min-h-[466px] grid place-items-center gap-8 p-4 bg-center bg-cover bg-[#004827] relative
                 max-[1300px]:min-h-[300px]">
                    <img src="/images/banner-left.svg" alt="" className="absolute left-0 h-full" />
                    <img src="/images/banner-right.svg" alt="" className="absolute right-0 h-full" />

                    <div className="relative">
                        <h1 className='text-[42px] font-bold text-white leading-[51px] mb-8 text-center max-sm:text-start'>Hey, what answer do you need?</h1>
                        <div className="w-full max-w-[480px] mx-auto relative flex items-center" onClick={(e) => open ? setOpen(false) : setOpen(true)}
                            ref={divRef}
                        >
                            <img src="/images/askQuestion.svg" alt="search" className='absolute right-[20px]' />
                            <input
                                type="text"
                                id="search"
                                placeholder="Ask a question"
                                className='h-14 shadow-[0_4px_12px_0px_#00000026] bg-white rounded-[10px] border-0 w-full block text-base font-medium p-[18px_20px]'
                                value={keyword}
                                onChange={(e) => setkeyword(e.target.value)}

                            />
                        </div>



                        {isClickedInside == true &&
                            <div className="bg-white max-w-[676px] rounded-[8px] mt-1.5 absolute transform -translate-x-1/2 left-1/2 w-full shadow-[0_6px_10px_0px_#0000001A]"
                                onClick={(e) => handleclick_filterDropdown(e)}
                            >
                                {searchData.length > 0 ? <>
                                    <h2 className='text-[14px] font-semibold leading-[17.07px] text-left text-[#1B1B20] p-[30px_30px_15px_30px]'>Search results</h2>
                                    <ul className='max-h-[300px] overflow-auto'>
                                        {searchData.map((data, i) => (
                                            <>
                                                <li>
                                                    <a className='hover:bg-[#F9F9F9] p-[15px_30px_30px_30px] grid grid-cols-[1fr_auto] gap-4 border-t border-[#1B1B201F] items-center'>
                                                        <div>
                                                            <h3 className="text-base font-semibold leading-[19.5px] text-[#1B1B20] mb-4">
                                                                {data?.categoryName}

                                                            </h3>
                                                            {data?.filterData?.map((data2, i2) => (
                                                                <>
                                                                    <Link
                                                                        href={`/categoriesdetails/${data2?.slug}`}
                                                                    >


                                                                        <div className='grid grid-cols-[1fr_auto] gap-4 mb-4'>
                                                                            <p className="text-[14px] font-medium leading-[24px] text-left text-[#1B1B20] max-w-[500px] display[-webkit-box] -webkit-box-orient[vertical] overflow-hidden  line-clamp-2">
                                                                                {data2.title}

                                                                            </p>

                                                                            <div className="w-[24px] h-[24px]">
                                                                                <img src="/images/search-resultArrow.svg" alt="arrow" className="w-[24px]" />
                                                                            </div>
                                                                        </div>


                                                                    </Link>
                                                                </>
                                                            ))}

                                                            <ul className="flex items-center">
                                                                <li className='text-[12px] font-semibold leading-[14.63px] text-left text-[#1B1B20C2] mr-2 cursor-pointer'
                                                                    onClick={(e) => handleclick_dropdown_homebutton(e)}
                                                                >
                                                                    Home
                                                                </li>
                                                                <li className='text-[12px] font-semibold leading-[14.63px] text-left text-[#1B1B20C2] mr-2'>
                                                                    <img src="/images/search-resultArrow.svg" alt="arrow" />
                                                                </li>
                                                                <Link
                                                                    href={`/allCategories/${data?.categorySlug}`} legacyBehavior >
                                                                    <li className='text-[12px] font-semibold leading-[14.63px] text-left text-[#1B1B20C2] mr-2 cursor-pointer'>
                                                                        {data?.categoryName}
                                                                    </li>
                                                                </Link>
                                                            </ul>
                                                        </div>


                                                    </a>

                                                </li >

                                            </>
                                        ))}
                                    </ul>

                                </> : <>
                                    <div className="p-4 flex items-center justify-center">
                                        <p className="text-sm font-medium text-black" >{"No data found"}</p>
                                    </div>


                                </>}
                            </div>
                        }




                    </div>
                </div>

                <div className="max-w-[1148px] mx-auto p-[161px_16px] max-[1300px]:p-[32px_16px]">
                    <h2 className='leading-[36px] text-[30px] font-bold text-[#1B1B20] mb-[47px] max-[1300px]:mb-[32px]'>Browse by category</h2>

                    <div className="grid grid-cols-3 gap-[30px] max-[1300px]:gap-[16px] max-md:grid-cols-2 max-sm:grid-cols-1">

                        {CategoryList_arr?.map((val, i) => (
                            <>
                                <div className="bg-[#F5F5F5] p-[25px_30px] rounded-[12px] border border-transparent flex flex-col min-h-[460px] max-[1300px]:p-[16px] ">
                                    <h3 className='text-[22px] font-semibold text-[#1B1B20] mb-[11px] max-[992px]:text-[18px] '>{val?.categoryName}</h3>
                                    <p className="text-[14px] font-medium text-[#1B1B20C2] mb-[38px]">{val?.filterData?.length} {val?.filterData?.length > 1 ? <>Articles</> : "Article"}</p>
                                    <ul className='m-[0_-30px_30px] max-[1300px]:m-[0_-16px_16px] '>
                                        {val?.filterData?.map((val2, index2) => (
                                            <>
                                                {index2 < 3 ? <>
                                                    <Link
                                                        href={`/categoriesdetails/${val2?.slug}`}
                                                        // onClick={() =>
                                                        //     handleRoute(response?.categorySlug)
                                                        // }
                                                        className="text-gray-500 text-base font-medium group hover:text-blue-600"
                                                    >

                                                        <li>
                                                            <a href="" className='flex items-center justify-between text-[16px] font-semibold leading-[24px] text-[#1B1B20] p-[16px_30px] border-b border-[#1B1B201A] group'>
                                                                <span className="group-hover:text-[#2D47DA] max-[992px]:text-[14px]">
                                                                    {val2?.title}
                                                                </span>
                                                                <span className="min-w-[18px] grid">
                                                                    <img src="/images/helpCenter-arrow.svg" alt="arrow" className='group-hover:hidden' />
                                                                    <img src="/images/helpCenter-arrowActive.svg" alt="arrow" className='hidden group-hover:inline-block' />
                                                                </span>
                                                            </a>
                                                        </li>
                                                    </Link>
                                                </> : <></>}
                                            </>

                                        ))
                                        }
                                    </ul>
                                    <Link
                                        href={`/allCategories/${val?.categorySlug}`} legacyBehavior >

                                        <a href="" className="border border-[#1B1B2026] bg-[#FFFFFF] p-[10px_20px] rounded-[8px] inline-flex items-center text-[14px] font-semibold leading-[17.07px] text-[#1B1B20] h-[37px] mt-auto w-fit group hover:bg-[#1B1B20] hover:text-[#FFFFFF]  ">Show all
                                            <span className="inline-flex ml-[4px]" >
                                                <img src="/images/showall-arrow.svg" alt="arrow" className='group-hover:hidden' />
                                                <img src="/images/showall-arrowLight.svg" alt="arrow" className='hidden group-hover:inline-block' />
                                            </span></a>
                                    </Link>
                                </div>

                            </>
                        ))}


                    </div>
                </div>
            </div >

        </>
    )
}
export default Help_center_component