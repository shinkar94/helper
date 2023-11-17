

export const GetWebPack = async (url: string) =>{
    const response = await fetch(`${url}`)
    console.log(response)
    // if(response.ok){
    //     return response
    // }

}