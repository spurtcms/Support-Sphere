import React from 'react'
import Help_center_component from '../../components/help_center/help_center_component'
import { fetchGraphQl } from '../api/graphicql'
import { GET_POSTS_CATEGORYLIST_QUERY, GET_POSTS_LIST_QUERY } from '../api/query'
import { defaultCategorySlug } from '../api/url'


let variable_category = {

    "commonFilter": {
        "limit": 10,
        "offset": 0
    },
    "categoryFilter": {
        // "hierarchyLevel": 2,
        "categoryGroupSlug": defaultCategorySlug,
        "excludeGroup": true,
    }
}
let variable_list = {
    "commonFilter": {
        // "limit": 10,
        "offset": 0,
        "keyword": ""
    },
    "entryFilter": {
        "Status": "Publish",
        "categorySlug": defaultCategorySlug
    },
    "AdditionalData": {
        "categories": true
    }
}


const [CategoryList, CategoryEntries] = await Promise.all([fetchGraphQl(GET_POSTS_CATEGORYLIST_QUERY, variable_category), fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list)])


const HelpCenter_page = () => {
    return (
        <>
            <Help_center_component CategoryList={CategoryList} CategoryEntries={CategoryEntries} />
        </>
    )
}
export default HelpCenter_page