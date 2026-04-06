const generateOtp = () =>{
    //return 123456;
    return Math.floor(100000 + Math.random() * 900000)
}

const generateGiftCode=(length) =>{
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        if(counter%4==0 && counter>0)
            result+="-";
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
const orderStatus = [
    {id:1, name: "Pending"},
    {id:2, name: "Confirmed"},
    {id:3, name: "Packed"},
    {id:4, name: "Dispatched"},
    {id:5, name: "Delivered"},
    {id:6, name: "Canceled"},
];
const returnStatus = [
    {id:1, name: "Initiated"},
    {id:2, name: "Approved"},
    {id:3, name: "Canceled"},
    {id:4, name: "Completed"},
]

module.exports = {
    generateOtp,
    orderStatus,
    returnStatus,
    generateGiftCode
}