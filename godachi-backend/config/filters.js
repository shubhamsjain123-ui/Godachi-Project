const filterConfig = {
    priceFilter:[
        {label:"Up to ₹2,000", value:"0-2000"},
        {label:"₹2,000 - ₹5,000", value:"2000-5000"},
        {label:"₹5,000 - ₹10,000", value:"5000-10000"},
        {label:"₹10,000 - ₹25,000", value:"10000-25000"},
        {label:"₹25,000 - ₹50,000", value:"25000-50000"},
        {label:"₹50,000 - ₹1,00,000", value:"50000-100000"},
        {label:"₹1,00,000 to ₹2,00,000", value:"100000-200000"},
        {label:"2,00,000 & above", value:"200000-0"},
    ],
    shopForFilter:[
        {label:"Men", value:"men"},
        {label:"Women", value:"women"},
        {label:"Kids", value:"kids"},
    ],
    offerFilter:[
        {label:"10% and above", value:"10"},
        {label:"20% and above", value:"20"},
        {label:"30% and above", value:"30"},
        {label:"40% and above", value:"40"},
        {label:"50% and above", value:"50"}
    ],
    trendingFilter:[
        {label:"Best Seller", value:"bestSeller"},
        {label:"New Arrivals", value:"newArrival"},
        {label:"Sale", value:"sale"},
        {label:"Premium Products", value:"premium"},
    ],
    virtualTryFilter:[
        {label:"Virtual Try On", value:true}
    ],
    ratingFilter:[
        {label:"5 Star", value:"5"},
        {label:"4 Star and above", value:"4"},
        {label:"3 Star and above", value:"3"},
        {label:"2 Star and above", value:"2"}
    ],
    weightFilter:[
        {label:"Upto 2 Gms", value:"0-2"},
        {label:"2 Gms - 4 Gms", value:"2-4"},
        {label:"4 Gms - 6 Gms", value:"4-6"},
        {label:"6 Gms - 8 Gms", value:"6-8"},
        {label:"8 Gms - 16 Gms", value:"8-16"},
        {label:"16 Gms - 32 Gms", value:"16-32"},
        {label:"32 Gms & Above", value:"32-0"}
    ]
}

module.exports = filterConfig