/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link"
import { toast, Toaster } from "sonner";


export const ButtonDelete=( props:{
    api:string,
    item:any,
    onDeleteSuccess:(id:string)=>void,
    content:any

})=>
{

    const {api,item,onDeleteSuccess,content=""}=props;

    const handleDelete=()=>
    {
        const confirm=window.confirm(content +( item.title|| item.jobTitle))
        if(confirm)
        {
           fetch(api,{
            method:"DELETE",
            credentials:'include'
           })
            .then(res=>res.json())
            .then(data=>
            {
                if(data.code=="success")
                {
                      toast.success(data.message);
                        onDeleteSuccess(item.id);
                }
                 else if(data.code == "error") {
                    toast.error(data.message);
                }

            }
            )
        }

    }
    return(<>
      <Toaster position="top-right" richColors />
        <Link
        href="#"
        className="bg-[#FF0000] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px]"
        onClick={handleDelete}
        >
        Xóa
        </Link>
    </>)
}