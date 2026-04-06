const WebSections = [
    {
        section:"slider",
        title: "Banner Slider",
        headingRequired: false,
        mediaDetails:{
            width:"1920",
            height: "670",
            allowedExtensions:["image/jpeg", "image/png", "image/jpg"],
            maxSize:"200"
        }
    },
    {
        section:"video",
        title: "Video",
        headingRequired: false,
        numOfMedia: 1,
        mediaDetails:{
            width:"100",
            height: "80",
            allowedExtensions:["video/mp4"],
            maxSize:"200"
        }
    },
    {
        section:"newArrival",
        title: "New Arrival",
        headingRequired: true,
        numOfMedia: 5,
        media:[
            {width:"390",height: "180",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"390",height: "180",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"390",height: "380",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"390",height: "180",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"390",height: "180",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
        ]
    },
    {
        section:"trending",
        title: "Trending",
        headingRequired: true,
        numOfMedia: 6,
        media:[
            {width:"490",height: "435",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"380",height: "200",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"340",height: "200",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"210",height: "240",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"235",height: "240",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"210",height: "240",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
        ]
    },
    {
        section:"bestSeller",
        title: "Best Seller",
        headingRequired: true,
        extraData: true,
        mediaDetails:{
            width:"270",
            height: "385",
            allowedExtensions:["image/jpeg", "image/png", "image/jpg"],
            maxSize:"200",
            title: true,
            sub_title: true
        }
    },
    {
        section:"explore",
        title: "Explore",
        headingRequired: true,
        numOfMedia: 4,
        media:[
            {width:"605",height: "480",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"270",height: "225",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"270",height: "225",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"570",height: "225",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
        ]
    },
    {
        section:"offers",
        title: "Best Offers",
        headingRequired: true,
        mediaDetails:{
            width:"185",
            height: "185",
            allowedExtensions:["image/jpeg", "image/png", "image/jpg"],
            maxSize:"200"
        }
    },
    {
        section:"listing",
        title: "Listing",
        headingRequired: false,
        numOfMedia: 1,
        media:[
            {width:"540",height: "425",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200",title: true, sub_title: true},
            
        ]
    },
];
const AppSections = [
    {
        section:"slider",
        title: "Banner Slider",
        headingRequired: false,
        mediaDetails:{
            width:"800",
            height: "600",
            allowedExtensions:["image/jpeg", "image/png", "image/jpg"],
            maxSize:"200"
        }
    },
    {
        section:"video",
        title: "Video",
        headingRequired: false,
        numOfMedia: 1,
        mediaDetails:{
            width:"100",
            height: "80",
            allowedExtensions:["video/mp4"],
            maxSize:"200"
        }
    },
    {
        section:"newArrival",
        title: "New Arrival",
        headingRequired: true,
        numOfMedia: 5,
        media:[
            {width:"250",height: "250",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"250",height: "250",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"250",height: "250",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"250",height: "250",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"250",height: "250",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
        ]
    },
    {
        section:"trending",
        title: "Trending",
        headingRequired: true,
        numOfMedia: 6,
        media:[
            {width:"250",height: "305",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"250",height: "305",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"250",height: "305",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"250",height: "305",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"250",height: "305",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"250",height: "305",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
        ]
    },
    {
        section:"bestSeller",
        title: "Best Seller",
        headingRequired: true,
        extraData: true,
        mediaDetails:{
            width:"270",
            height: "385",
            allowedExtensions:["image/jpeg", "image/png", "image/jpg"],
            maxSize:"200",
            title: true,
            sub_title: true
        }
    },
    {
        section:"explore",
        title: "Explore",
        headingRequired: true,
        numOfMedia: 4,
        media:[
            {width:"200",height: "200",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"200",height: "200",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"200",height: "200",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
            {width:"200",height: "200",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200"},
        ]
    },
    {
        section:"offers",
        title: "Best Offers",
        headingRequired: true,
        mediaDetails:{
            width:"185",
            height: "185",
            allowedExtensions:["image/jpeg", "image/png", "image/jpg"],
            maxSize:"200"
        }
    },
    {
        section:"listing",
        title: "Listing",
        headingRequired: false,
        numOfMedia: 1,
        media:[
            {width:"540",height: "425",allowedExtensions:["image/jpeg", "image/png", "image/jpg"],maxSize:"200",title: true, sub_title: true},
            
        ]
    },
];
const CommonSections = [
    {
        section:"news",
        title: "News",
        headingRequired: true,
        mediaDetails:{
            width:"85",
            height: "85",
            allowedExtensions:["image/jpeg", "image/png", "image/jpg"],
            maxSize:"200"
        }
    },
    {
        section:"brands",
        title: "Brands",
        headingRequired: true,
        mediaDetails:{
            width:"234",
            height: "48",
            allowedExtensions:["image/jpeg", "image/png", "image/jpg"],
            maxSize:"200"
        }
    }
];

module.exports = {
    web: WebSections,
    app: AppSections,
    common: CommonSections
}