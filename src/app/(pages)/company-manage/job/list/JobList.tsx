/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBriefcase, FaLocationDot, FaUserTie } from "react-icons/fa6";
import { positionList ,workingFromList} from "@/config/variables";
import { ButtonDelete } from "@/app/components/buttons/ButtonDelete";

export const JobList = () => {
  const [totalPage, settotalPage] = useState<any>(1);
  const [jobList, setJobList] = useState<any[]>([]);
  const [page,Setpage]=useState<number>(1);
  const [count,Setcount]=useState<number>(1);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/job/list?page=${page}`, {
      method: "GET",
      credentials: "include", // Gửi kèm cookie
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == "success") {
          setJobList(data.jobList);
          settotalPage(data.totalPage);
        }
      });
  }, [page,count]);


  const handlePanigation=(event:any)=>
  {
      const value=event.target.value;
      Setpage(parseInt(value));
  }
 
  const handleDeleteSuccess=()=>
  {
      Setcount(count+1);
  }
  return (
    <>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
        {jobList ? (
          <>
            {jobList.map((item: any, index: any) => {
              const ipos=positionList.find((itemPos)=>itemPos.value==item.position)?.label
              const iwork=workingFromList.find((itemWok)=>itemWok.value==item.workingForm)?.label
              return (
                
                  <div
                    key={item.id}
                    className="border border-[#DEDEDE] rounded-[8px] flex flex-col relative truncate"
                    style={{
                      background:
                        "linear-gradient(180deg, #F6F6F6 2.38%, #FFFFFF 70.43%)",
                    }}
                  >
                    <img
                      src="/assets/images/card-bg.svg"
                      alt=""
                      className="absolute top-[0px] left-[0px] w-[100%] h-auto"
                    />
                    <div
                      className="relative mt-[20px] w-[116px] h-[116px] bg-white mx-auto rounded-[8px] p-[10px]"
                      style={{
                        boxShadow: "0px 4px 24px 0px #0000001F",
                      }}
                    >
                      <img
                        src={item.companyLogo}
                        alt={item.title}
                        className="w-[100%] h-[100%] object-contain"
                      />
                    </div>
                    <h3 className="mt-[20px] mx-[16px] font-[700] text-[18px] text-[#121212] text-center flex-1 whitespace-normal line-clamp-2">
                     {item.title}
                    </h3>
                    <div className="mt-[6px] text-center font-[400] text-[14px] text-[#121212]">
                      {item.companyName}
                    </div>
                    <div className="mt-[12px] text-center font-[600] text-[16px] text-[#0088FF]">
                      {item.salaryMin.toLocaleString("vi-VN")}$ -   {item.salaryMax.toLocaleString("vi-VN")}$
                    </div>
                    <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                      <FaUserTie className="text-[16px]" /> {ipos}
                    </div>
                    <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                      <FaBriefcase className="text-[16px]" /> {iwork}
                    </div>
                    <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                      <FaLocationDot className="text-[16px]" /> {item.companyCity}
                    </div>
                    <div className="mt-[12px] mb-[20px] mx-[16px] flex flex-wrap justify-center gap-[8px]">
                      {item.technologies?(<>
                      {  item.technologies.map((itemTech:any,index:any)=>{

                        return(
                        <div
                          key={index+1}
                        className="border border-[#DEDEDE] rounded-[20px] py-[6px] px-[16px] font-[400] text-[12px] text-[#414042]">
                            {itemTech}
                          </div>
                        )
                      })}
                      </>):(<></>)}
                    </div>
                    <div className="flex items-center justify-center gap-[12px] mb-[20px]">
                      <Link
                        href={`/company-manage/job/edit/${item.id}`}
                        className="bg-[#FFB200] rounded-[4px] font-[400] text-[14px] text-black inline-block py-[8px] px-[20px]"
                      >
                        Sửa
                      </Link>
                      <ButtonDelete api={`${process.env.NEXT_PUBLIC_API_URL}/company/job/delete/${item.id}`}
                          item={item}
                          onDeleteSuccess={handleDeleteSuccess}
                          content="Bạn có muốn xóa công việc này không?"
                      />
                    </div>
                  </div>
              
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
        {totalPage>0?(<>
        <div className="mt-[30px]">
          <select onChange={(event)=>handlePanigation(event)} name="" className=" cursor-pointer  border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042]">
            {Array(totalPage).fill("").map((_,index)=><option className=" cursor-pointer" key={index+1} value={index+1}>Trang {index+1} </option>)}
          </select>
        </div>
        </>):(<></>)}
    </>
  );
};
