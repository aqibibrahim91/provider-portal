"use client";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import bottom from "../public/images/bottom.png";
import Image from "next/image";
import Barcode from "react-barcode";
const PrintComponent = ({ setFormTwo, data }) => {
  const componentRef = useRef();

  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/\//g, '-');
  };
  const getCurrentDate = () => {
    const today = new Date();
    return formatDate(today);
  }
  const getAge = () => {
    const birthDate = new Date(data?.birthDate)
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  return (
    <div className="print-form overflow-y-auto max-h-full overflow-x-hidden">
      <div className="flex w-full justify-end ">
        {" "}
        <div className="flex">
          <button
            onClick={() => setFormTwo(false)}
            className="mt-[25px] hover:border-[#3056D3] border border-red hover:border font-inter rounded-lg mr-4 flex text-center justify-center font-semibold items-center  bg-[#113493] w-[200px] border-none text-white h-12 "
          >
            Cancel
          </button>
        </div>
        <ReactToPrint
          trigger={() => (
            <div className="flex  ">
              {" "}
              <button className="mt-[25px] hover:border-[#3056D3] hover:border font-inter rounded-lg mr-4 flex text-center justify-center font-semibold items-center w-[200px] bg-[#113493] border-none text-white h-12 ">
                Print
              </button>
            </div>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div ref={componentRef} className="flex  flex-col bg-white ">
        <div
          className="w-[1200px] flex flex-col px-10 pt-3 "
          style={{ direction: "rtl", fontFamily: "inter" }}
        >
          <div className="flex w-full justify-between items-center flex">
            <div className="flex">
              <div className="arabic text-sm text-[#348eca] mt-[26px]">
                {data?.batchNumber}
              </div>
              <div className="text-[#348eca]">
                <Barcode value={data?.claimNumber} className="h-[80px] w-[200px] barcode" />
              </div>
            </div>
            <div className="flex-1">
              <div className="arabic text-xs flex justify-end text-[#348eca]">
                نموذج معالجة
              </div>
              <div className="arabic text-xs flex justify-end text-[#348eca]">
                على المريض ابراز الهوية الشخصية
              </div>
              <div className="justify-end flex gap-2 py-1 items-end">
                <div className="flex-2 arabic text-[10px] text-[#348eca] pb-[5px]">
                  الرقم التسلسلي
                </div>
                <div className="">
                  <input className=" border text-[#348eca] arabic w-[200px] h-4 border-blue-400" />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex w-full  justify-end">
            <div>
              
            </div>
          </div> */}
          <div className="w-full py-1 border-t-8 gap-4 px-2 border flex border-[#348eca] placeholder:text-[#348eca] border-t-gray-600 ">
            <div className="w-1/2  gap-1 flex flex-col">
              <input
                className="border px-1 text-[#348eca] border-[#348eca] placeholder:text-[#348eca] text-[10px] py-1 w-full  arabic"
                placeholder="اسم الطبيب المعتمد"
              />
              <input
                className="border px-1 text-[#348eca] border-[#348eca] placeholder:text-[#348eca] w-full text-[10px] py-1 arabic"
                placeholder="اسم المشترك"
                value={data?.assuredName}
              />
              <input
                className="border px-1 text-[#348eca] border-[#348eca] placeholder:text-[#348eca] w-full text-[10px] py-1 arabic"
                placeholder="اسم المريض"
                value={data?.assuredName + "-" + data?.assuredID}
              />
              <input
                className="border px-1 text-[#348eca] border-[#348eca] placeholder:text-[#348eca] w-full text-[10px] py-1 arabic"
                placeholder="الرقم الوطني "
              />
            </div>
            <div className="w-1/2  gap-1 flex flex-col">
              <input
                className="border text-[#348eca] px-1 border-[#348eca] placeholder:text-[#348eca] w-full text-[10px] py-1 arabic"
                placeholder="زمر الطبيب"
              />
              <input
                className="border px-1 text-[#348eca] border-[#348eca] placeholder:text-[#348eca] w-full text-[10px] py-1 arabic"
                placeholder="تاريخ زيارة الطبيب."
                value={getCurrentDate()}
              />
              <input
                className="border px-1 text-[#348eca] border-[#348eca] placeholder:text-[#348eca] w-full text-[10px] py-1 arabic"
                placeholder="عمر المريض"
                value={getAge()}
              />
              <input
                className="border px-1 text-[#348eca] border-[#348eca] placeholder:text-[#348eca] w-full text-[10px] py-1 arabic"
                placeholder="الحالة الاجتماعية. "
              />
            </div>{" "}
          </div>
          <div className="w-full py-1  flex-col   px-2 border flex border-[#348eca] placeholder:text-[#348eca] mt-1">
            <div>
              <input
                placeholder="التشخيص المبدئي."
                className="text-[10px] py-1 border px-1 text-[#348eca] arabic w-full border-blue-400 placeholder:text-[#348eca]"
              />
            </div>{" "}
            <div>
              <input
                placeholder="الاعراض المبدئية والاجراءات."
                className="text-[10px] py-1 border  px-1 text-[#348eca] arabic w-full border-blue-400 placeholder:text-[#348eca]"
              />
            </div>{" "}
            <div>
              <input
                placeholder="تاريخ ظهور المرض أو اعراضه لأول مرة."
                className="text-[10px] py-1 border  px-1 text-[#348eca] arabic w-full border-blue-400 placeholder:text-[#348eca]"
              />
            </div>{" "}
            <div>
              <input
                placeholder="التشخيص 10 - 10"
                className="text-[10px] py-1 border  px-1 text-[#348eca] arabic w-full border-blue-400 placeholder:text-[#348eca]"
              />
            </div>
            <div className="flex w-full">
              <div className="flex flex-col ">
                <div className="flex w-1/2 gap-32">
                  <div className="w-1/4">
                    <div className="arabic w-20  text-[#348eca] text-[10px] mt-3">
                      توقيع المريض
                    </div>
                    <div>
                      <input className="py-5 text-[10px] flex w-[150px] mt-2 border border-[#348eca]" />
                    </div>
                  </div>
                  <div className="w-1/4">
                    <div className="arabic w-20 text-[#348eca] text-[10px] mt-3">
                      توقيع الطبيب{" "}
                    </div>
                    <div>
                      <input className="py-4 w-[150px] mt-2 flex border border-[#348eca]" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end ml-48 ">
                  <div className="w-1/4 ">
                    <div className="arabic w-20 text-[#348eca] text-[10px] mt-2">
                      ختم الطبيب{" "}
                    </div>
                    <div>
                      <input className="py-9 w-[150px] mt-2 flex border border-[#348eca]" />
                    </div>
                  </div>
                </div>
                <div className="arabic text-[10px] mt-5 flex flex-col gap-2 text-[#348eca]">
                  <p>
                    لا تصرف المطالبة بدون كتابة الطبيب ترمز CD وبدون توقيع
                    المريض
                  </p>
                  <p>يجب ادخال المطالبة على الانظمة المعتمدة للشركة</p>
                </div>
              </div>
              <div className="w-1/2  flex mt-1 arabic">
                <table className="w-full border-collapse border h-fit border-gray-400">
                  <thead>
                    <tr>
                      <th className="border border-[#348eca] font-light text-[10px] py-1 w-1/4 text-[#348eca] ">
                        السعر
                      </th>
                      <th className="border border-[#348eca] font-light text-[#348eca]  w-1/4 text-[10px]">
                        {" "}
                        الكمية كتابة
                      </th>
                      <th className="border border-[#348eca]  w-1/2 font-light text-[#348eca] text-[10px]">
                        Related Medicines
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-6 border "
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center text-[#348eca] arabic text-xs py-2">
            تبقى هذه النسخة لدى الطبيب لغرض المحاسبة.
          </div>
          <div className="w-full flex  arabic">
            <div className="flex flex-col w-1/2 ">
              {" "}
              <div className=" border  border-[#348eca] ">
                <div className="flex px-2 mt-1">
                  <div className="text-[10px]  text-[#348eca] ">
                    <p>الفحوصات المخبرية المطلوبة</p>
                    <p>يحب ادخال الاجراءات على الانظمة المعتمدة للشركة</p>
                    <p className="mt-2">الجهة المؤمنة للنفقات</p>
                  </div>
                  <div className="mr-4">
                    {" "}
                    <input className=" border text-[#348eca] arabic w-[150px] border-blue-400" />
                  </div>
                </div>
                <div className="px-2 flex flex-col gap-1">
                  {" "}
                  <input
                    className=" border text-[#348eca] arabic w-full  border-blue-400 placeholder:text-[#348eca] text-[10px] px-1 py-1 "
                    placeholder="اسم المشترك"
                  />
                  <div className="flex gap-1">
                    <input
                      className="w-1/2 border text-[#348eca] arabic  border-blue-400 placeholder:text-[#348eca]  text-[10px] px-1 py-1 "
                      placeholder="اسم المريض"
                    />
                    <input
                      className="w-1/2 border text-[#348eca] arabic  border-blue-400 placeholder:text-[#348eca]  text-[10px] px-1 py-1 "
                      placeholder="تاريخ اجراء الطلب"
                    />
                  </div>{" "}
                  <input
                    className=" border text-[#348eca] arabic w-full border-blue-400 placeholder:text-[#348eca]  text-[10px] px-1 py-1 "
                    placeholder="التشخيص"
                  />
                  <input
                    className=" border text-[#348eca] arabic w-full border-blue-400 placeholder:text-[#348eca]  text-[10px] px-1 py-1 "
                    placeholder="رقم البطاقة"
                  />
                </div>
                <div className="w-full flex justify-start px-2 text-[#348eca] arabic text-[10px] py-1">
                  تبقى هذه النسخة لدى الطبيب لغرض المحاسبة.
                </div>
                <table className="w-[98%] border-collapse border h-fit m-auto   border-gray-400 ">
                  <thead>
                    <tr className="w-full">
                      <th className="border border-[#348eca] font-light text-[10px] py-1 w-12  text-[#348eca]">
                        القيمة
                      </th>
                      <th className="border border-[#348eca] font-light text-[#348eca]  text-[10px]"></th>
                      <th className="border border-[#348eca]  font-light text-[#348eca] w-12 text-[10px]">
                        القيمة
                      </th>
                      <th className="border border-[#348eca] font-light text-[#348eca]  text-[10px]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex mt-2 mb-[1.5px] px-2">
                  <div className="text-[10px] text-[#348eca] flex">
                    توقيع المريض
                    <input
                      className=" px-2  border w-[120px] h-5 text-[#348eca]"
                      type="text"
                    />
                  </div>
                  <div className="text-[10px] flex text-[#348eca]">
                    توقيع المختبر
                    <input
                      className=" px-2  border w-[120px] h-5 text-[#348eca]"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="flex mt-2 mb-1 px-2">
                <div className="text-[9px] text-[#348eca] flex">
                  تاريخ اجراء الفحوصات{" "}
                  <input
                    className=" px-2  border w-[200px] text-[#348eca]"
                    type="text"
                  />
                </div>
                <div className="text-[9px] flex text-[#348eca]">
                  توالية وختم الطبيب{" "}
                </div>
              </div>{" "}
              <div className="flex text-[10px] align-middle items-center flex-col  w-full arabic justify-center mt-3 text-[#348eca]">
                <p> تبقى هذه النسخة لدى المختبر الأغراض المحاسبة</p>
                <p>وتبقى صالحة لمدة ثلاثة أيام من تاريخ اجراء الاختبار</p>
              </div>
            </div>
            <div className="flex flex-col w-1/2 ">
              {" "}
              <div className=" border  border-[#348eca] border-r-0">
                <div className="flex px-2 mt-1">
                  <div className="text-[10px]  text-[#348eca] ">
                    <p>الفحوصات المخبرية المطلوبة</p>
                    <p>يحب ادخال الاجراءات على الانظمة المعتمدة للشركة</p>
                  </div>
                  <div className="mr-4">
                    {" "}
                    <input className=" border text-[#348eca] arabic w-[150px] border-blue-400" />
                  </div>
                </div>
                <div className="px-2 mt-[22px] flex flex-col gap-1">
                  {" "}
                  <input
                    className=" border text-[#348eca] arabic w-full  border-blue-400 placeholder:text-[#348eca] text-[10px] px-1 py-1 "
                    placeholder="اسم المشترك"
                  />
                  <div className="flex gap-1">
                    <input
                      className="w-1/2 border text-[#348eca] arabic  border-blue-400 placeholder:text-[#348eca]  text-[10px] px-1 py-1 "
                      placeholder="اسم المريض"
                    />
                    <input
                      className="w-1/2 border text-[#348eca] arabic  border-blue-400 placeholder:text-[#348eca]  text-[10px] px-1 py-1 "
                      placeholder="تاريخ اجراء الطلب"
                    />
                  </div>{" "}
                  <input
                    className=" border text-[#348eca] arabic w-full border-blue-400 placeholder:text-[#348eca]  text-[10px] px-1 py-1 "
                    placeholder="التشخيص"
                  />
                  <input
                    className=" border text-[#348eca] arabic w-full border-blue-400 placeholder:text-[#348eca]  text-[10px] px-1 py-1 "
                    placeholder="رقم البطاقة"
                  />
                </div>
                <div className="w-full flex justify-start px-2 text-[#348eca] arabic text-[10px] py-1">
                  تبقى هذه النسخة لدى الطبيب لغرض المحاسبة.
                </div>
                <table className="w-[98%] border-collapse border h-fit m-auto   border-gray-400 ">
                  <thead>
                    <tr className="w-full">
                      <th className="border border-[#348eca] font-light text-[10px] py-1 w-12  text-[#348eca]">
                        القيمة
                      </th>
                      <th className="border border-[#348eca] font-light text-[#348eca]  text-[10px]"></th>
                      <th className="border border-[#348eca]  font-light text-[#348eca] w-12 text-[10px]">
                        القيمة
                      </th>
                      <th className="border border-[#348eca] font-light text-[#348eca]  text-[10px]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border  border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border border-[#348eca]  ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-4 border text-[#348eca]"
                          type="text"
                        />
                      </td>
                      <td className="border border-[#348eca] ">
                        <input
                          className="w-full px-2 h-6  border "
                          type="text"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex mt-2 mb-[2.8px] px-2">
                  <div className="text-[10px] text-[#348eca] flex">
                    توقيع المريض
                    <input
                      className=" px-2  h-5 border w-[120px] text-[#348eca]"
                      type="text"
                    />
                  </div>
                  <div className="text-[10px] flex text-[#348eca]">
                    توقيع المختبر
                    <input
                      className=" px-2 h-5 border w-[120px] text-[#348eca]"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="flex mt-2 mb-1 px-2">
                <div className="text-[9px]  text-[#348eca] flex">
                  تاريخ اجراء الفحوصات{" "}
                  <input
                    className=" px-2 h-4  border w-[200px] text-[#348eca]"
                    type="text"
                  />
                </div>
                <div className="text-[9px] flex text-[#348eca]">
                  توالية وختم الطبيب{" "}
                </div>
              </div>{" "}
              <div className="flex text-[10px] align-middle items-center flex-col  w-full arabic justify-center mt-3 text-[#348eca]">
                <p> تبقى هذه النسخة لدى المختبر الأغراض المحاسبة</p>
                <p>وتبقى صالحة لمدة ثلاثة أيام من تاريخ اجراء الاختبار</p>
              </div>
            </div>{" "}
          </div>
        </div>
        <Image src={bottom} className="w-full flex justify-end " />
      </div>
    </div>
  );
};

export default PrintComponent;
