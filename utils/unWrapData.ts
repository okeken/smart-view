

const unWrapData = (data: any) => {
    console.log("aray", Array.isArray(data));
    console.log("data objectj", typeof data === 'object');
    console.log("data raw", data);
   if(typeof data === 'object' || Array.isArray(data)) {
    return  JSON.parse(JSON.stringify(data));
    }
    return;

}


export default unWrapData;