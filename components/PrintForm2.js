"use client";
import React, { useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import bottom from "../public/images/bottom.png";
import Image from "next/image";
import Barcode from "react-barcode";
const PrintComponentPages = ({ setFormOne, data, session }) => {
  const [gender,setGender] = useState(data.gender)
  const componentRef = useRef();
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
  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/\//g, '-');
  };
  const getCurrentDate = () => {
    const today = new Date();
    return formatDate(today);
  }

  return (
    <div className="print-form overflow-y-auto max-h-full overflow-x-hidden">
      <div className="flex w-full justify-end ">
        {" "}
        <div className="flex">
          <button
            onClick={() => setFormOne(false)}
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
      <div
        ref={componentRef}
        style={{ direction: "rtl", fontFamily: "arabic" }}
        className="w-[1200px] flex flex-col gap-24 pt-10 px-4 "
      >
        {/* page 1 */}
        <div className="flex  flex-col py-10 px-4 border-4 h-[900px] border-[#348eca]">
          {" "}
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
              <div className="arabic text-sm flex justify-end text-[#348eca]">
                نموذج طلب دخول للعلاج
              </div>
              <div className="arabic text-sm flex justify-end text-[#348eca] ">
                و الفحوصات الطبية{" "}
              </div>
            </div>
          </div>
          <div className="justify-between items-center flex">

          </div>
          <div className="w-full my-2 border-t-8 gap-4 px-2  flex   border-t-gray-600 " />
          <div className="w-full py-1 flex   gap-4 px-2 ">
            <div className="w-1/2  gap-1 flex flex-col">
              <input
                className="border px-1 text-[#348eca] border-[#348eca] placeholder:text-[#348eca] text-[10px] py-1 w-full  arabic"
                placeholder="اسم المصحة"
                value={session?.user.name}
              />
              <input
                className="border px-1 text-[#348eca] border-[#348eca] placeholder:text-[#348eca] w-full text-[10px] py-1 arabic"
                placeholder="التاريخ"
                value={getCurrentDate()}
              />
              <div className="flex">
                <input
                  className="border w-1/2  border-l-0 px-1 text-[#348eca] border-[#348eca] placeholder:text-[#348eca]  text-[10px] py-1 arabic"
                  placeholder="الجنس"
                />
                <div className="flex text-[#348eca] arabic text-xs px-6 items-center border w-1/2 border-[#348eca] border-r-0">
                  ذكر
                  <input
                    type="checkbox"
                    id="vehicle3"
                    name="vehicle3"
                    value="Male"
                    checked={gender== "Male"}
                    onClick={()=>setGender("Male")}
                    className="ml-5 w-1/2 h-3"
                  />{" "}
                  أنتي
                  <input
                    type="checkbox"
                    id="vehicle3"
                    name="vehicle3"
                    value="Female"
                    checked={gender == "Female"}
                    onClick={()=>setGender("Female")}
                    className="ml-5 w-1/2 h-3"
                  />{" "}
                </div>
              </div>
              <input
                className="border px-1 text-[#348eca] border-[#348eca] placeholder:text-[#348eca] w-full text-[10px] py-1 arabic"
                placeholder="التشخيص الأولي للحالة "
              />
            </div>
            <div className="w-1/2  gap-1 flex flex-col">
              <input
                className="border text-[#348eca] px-1 border-[#348eca] placeholder:text-[#348eca] w-full text-[10px] py-1 arabic"
                placeholder="اسم المؤمن"
                value={data?.assuredName}
              />
              <input
                className="border px-1 text-[#348eca] border-[#348eca] placeholder:text-[#348eca] w-full text-[10px] py-1 arabic"
                placeholder="رقم بطاقة التأمين"
                value={data?.assuredID}
              />
              <input
                className="border px-1 text-[#348eca] border-[#348eca] placeholder:text-[#348eca] w-full text-[10px] py-1 arabic"
                placeholder="العمر"
                value={getAge()}
              />
              <input
                className="border px-1 text-[#348eca] border-[#348eca] placeholder:text-[#348eca] w-full text-[10px] py-1 arabic"
                placeholder="تاريخ الدخول "
              />
            </div>{" "}
          </div>{" "}
          <div className="w-full flex-col gap-1 flex px-2">
            <input
              className="border px-1 text-[#348eca] border-[#348eca] placeholder:text-[#348eca] w-full text-[10px] py-1 arabic"
              placeholder="التشخيص الأولي للحالة "
            />{" "}
            <div className="flex ">
              <input
                className="border px-1 text-[#348eca] border-[#348eca] placeholder:text-[#348eca] border-l-0 w-1/4 text-[10px] py-1 arabic"
                placeholder="نوع الإجراء المطلوب "
              />
              <div className="flex w-full items-center gap-36 border border-[#348eca] border-r-0 ">
                <div className="arabic gap-2 mr-2 flex justify-center items-end text-[#348eca] text-xs">
                  ايواء - علاج
                  <input
                    type="checkbox"
                    id="vehicle3"
                    name="vehicle3"
                    value="Boat"
                    className=""
                  />
                </div>
                <div className="arabic  gap-2 mr-2 flex justify-center items-end text-[#348eca] text-xs">
                  إيواء + عملية
                  <input
                    type="checkbox"
                    id="vehicle3"
                    name="vehicle3"
                    value="Boat"
                  />{" "}
                </div>
                <div className="arabic  gap-2 mr-2 flex justify-center items-end text-[#348eca] text-xs">
                  علاج خارجي
                  <input
                    type="checkbox"
                    id="vehicle3"
                    name="vehicle3"
                    value="Boat"
                    className="ml-5"
                  />{" "}
                </div>
              </div>
            </div>
            <div className="w-full  flex mt-2 arabic">
              <table className="w-full border-collapse border h-fit border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-[#348eca] font-light text-[10px] py-1 w-1/4 text-[#348eca] ">
                      الإجراء{" "}
                    </th>
                    <th className="border border-[#348eca] font-light text-[#348eca]  w-1/2 text-[10px]">
                      {" "}
                      الوصف{" "}
                    </th>
                    <th className="border border-[#348eca]  w-1/4 font-light text-[#348eca] text-[10px]">
                      السعر{" "}
                    </th>
                  </tr>
                </thead>
                <tbody className="arabic text-xs text-[#348eca]">
                  <tr>
                    <td className="justify-center border-[#348eca]  flex h-4 ">
                      اسم العملية
                    </td>
                    <td className="border border-[#348eca] ">
                      <input className="w-full px-2 h-4  border " type="text" />
                    </td>
                    <td className="border border-[#348eca] ">
                      <input className="w-full px-2 h-4  border " type="text" />
                    </td>
                  </tr>{" "}
                  <tr>
                    <td className="justify-center flex h-4  border-[#348eca] border-t border-0 ">
                      مدة الاقامة{" "}
                    </td>
                    <td className="border border-[#348eca] ">
                      <input className="w-full px-2 h-4  border " type="text" />
                    </td>
                    <td className="border border-[#348eca] ">
                      <input className="w-full px-2 h-4  border " type="text" />
                    </td>
                  </tr>{" "}
                  <tr>
                    <td className="justify-center flex h-4  border-[#348eca] border-t border-0 ">
                      الاستشارات الطبية{" "}
                    </td>
                    <td className="border border-[#348eca] ">
                      <input className="w-full px-2 h-4  border " type="text" />
                    </td>
                    <td className="border border-[#348eca] ">
                      <input className="w-full px-2 h-4  border " type="text" />
                    </td>
                  </tr>{" "}
                  <tr>
                    <td className="justify-center flex h-4  border-[#348eca] border-t border-0 ">
                      المحاليل و الادوية{" "}
                    </td>
                    <td className="border border-[#348eca] ">
                      <input className="w-full px-2 h-4  border " type="text" />
                    </td>
                    <td className="border border-[#348eca] ">
                      <input className="w-full px-2 h-4  border " type="text" />
                    </td>
                  </tr>{" "}
                  <tr>
                    <td className="justify-center flex h-4  border-[#348eca] border-t border-0 ">
                      التحاليل الطبية{" "}
                    </td>
                    <td className="border border-[#348eca] ">
                      <input className="w-full px-2 h-4  border " type="text" />
                    </td>
                    <td className="border border-[#348eca] ">
                      <input className="w-full px-2 h-4  border " type="text" />
                    </td>
                  </tr>{" "}
                  <tr>
                    <td className="justify-center flex h-4  border-[#348eca] border-t border-0 ">
                      الرعاية والمستلزمات الطبية{" "}
                    </td>
                    <td className="border border-[#348eca] ">
                      <input className="w-full px-2 h-4  border " type="text" />
                    </td>
                    <td className="border border-[#348eca] ">
                      <input className="w-full px-2 h-4  border " type="text" />
                    </td>
                  </tr>{" "}
                  <tr>
                    <td className="justify-center flex h-4  border-[#348eca] border-t border-0 ">
                      الاجهزة والاشعة{" "}
                    </td>
                    <td className="border border-[#348eca] ">
                      <input className="w-full px-2 h-4  border " type="text" />
                    </td>
                    <td className="border border-[#348eca] ">
                      <input className="w-full px-2 h-4  border " type="text" />
                    </td>
                  </tr>{" "}
                  <tr>
                    <td className="justify-center flex h-4  border-[#348eca] border-t border-0 ">
                      أخرى{" "}
                    </td>
                    <td className="border border-[#348eca] ">
                      <input className="w-full px-2 h-4  border " type="text" />
                    </td>
                    <td className="border border-[#348eca] ">
                      <input className="w-full px-2 h-4  border " type="text" />
                    </td>
                  </tr>{" "}
                  <tr>
                    <td className="justify-center flex h-4  border-[#348eca] border-t border-0 ">
                      الاجمالي المتوقع{" "}
                    </td>
                    <td className="border border-[#348eca] ">
                      <input className="w-full px-2 h-4  border " type="text" />
                    </td>
                    <td className="border border-[#348eca] ">
                      <input className="w-full px-2 h-4  border " type="text" />
                    </td>
                  </tr>{" "}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between mt-2.5">
              <div>
                {" "}
                <input
                  className="border px-1 text-[#348eca] bg-transparent placeholder:text-[#348eca] w-full text-[10px] py-1 arabic"
                  placeholder="توقيع الطبيب  "
                />{" "}
              </div>{" "}
              <div>
                {" "}
                <input
                  className="border px-1 bg-transparent text-[#348eca] placeholder:text-[#348eca] w-full text-[10px] py-1 arabic"
                  placeholder="اعتماد المصحة أو قسم الشركات  "
                />{" "}
              </div>
            </div>
            <div className="arabic gap-0.5 mt-2 text-[#348eca] text-sm flex flex-col leading-5">
              <p>
                @ان الموافقة على إدخال الحالة للمصحة يعتمد على استكمال المعلومات
                المطلوبة أعلاه و بشكل كامل و بوضوح مع ضرورة إرفاق صورة عن نتائج
                الفحوصات و الاجراءات التشخصية التي أجريت للمريض مع طلب إدخاله
                للمصحة
              </p>
              <p className="mt-1">
                * إن الموافقة على دخول المريض أو القيام بإجراء طبي ما ، صالحة
                لمعالجة الحالة المرضية أو القيام بالإجراء وفق التشخيص المذكور
                أعلاه و أي إجراءات طبية أخرى يلزم أحد الموافقة
              </p>
              <p>
                * ضرورة إرفاق صورة عن بطاقة التأمين الصحي للمريض مع طلب إجراء
                الخدمات المسبقة عليها
              </p>
              <p>
                * في حالة الضرورة القصوى و خارج ساعات دوام الشركة الرسمي يرجى
                الاتصال على الرقم التالي: 0920085775/0920075775
              </p>
              <div className="flex mt-1">
                {" "}
                <p>
                  * يرسل طلب الإيواء و الخدمات الي الشركة على البريد الالكتروني
                </p>
                <input className="border px-1 bg-transparent text-[#348eca] mr-2 h-5 placeholder:text-[#348eca] w-[150px] text-[10px] py-1 arabic" />{" "}
              </div>
            </div>
          </div>
        </div>
        {/* page 2 */}
        <div className="flex flex-col  py-10 h-[900px] px-4 border-4 border-[#348eca]">
          <div className="w-full py-1 h-[40px] gap-4 px-2  flex  text-[#348eca] bg-[#afb2b4] arabic text-sm justify-between items-center">
            <div>تصريح من قبل العربي أو عن يمثله.</div>
            <div>Declaration by the patient/Representative</div>
          </div>
          <div className="flex w-full  gap-6  mt-2">
            <div className="flex flex-col w-1/2 ">
              <div className="flex border-2 border-[#dbdddd] ">
                <ul className="list-decimal gap-5 flex flex-col px-2 py-5 list-inside">
                  <li className="text-sm arabic text-[#348eca]">
                    أسمح للمستشفى بتقديم كل المستندات الأصلية المتعلقة بالإيواء
                    أوافق على توقيع الفاتورة النهائية و ورقة الخروج الشركة
                    النقاء الليبية للتأمين بعد الخروج، كما
                  </li>{" "}
                  <li className="text-sm arabic text-[#348eca]">
                    كل المصاريف الغير طبية والغير متعلقة بالإيواء الحالي وتكاليف
                    الخدمات الإضافية الغير مشمولة بجدول المنافع والتكاليف
                    المتجاوزة الأسقف الوثيقة سيتم دفعها من قبلي
                  </li>{" "}
                  <li className="text-sm arabic text-[#348eca]">
                    أقر بأني سألتزم بالقوانين والشروط الواردة بالوثيقة وجدول
                    منافعها وفي حالة اكتشاف معلومات خاطئة قدمت من قبلي فإني
                    أوافق على إيقاف المطالبة وسأقوم بدفع كافة المصاريف التي
                    ترتبت على تقديمي للمعلومات الخاطئة
                  </li>{" "}
                  <li className="text-sm arabic text-[#348eca]">
                    أنا الفهم بأن شركة النماء الليبية للتأمين غير مسؤولة عن نوع
                    وجودة الخدمة الطبية المقدمة من قبل المرفق الصحي والأخطاء
                    الطبية التي قد تحدث في أثناء تلقي العلاج
                  </li>
                </ul>
              </div>
              <div className="flex text-[#348eca] text-sm mt-3 arabic">
                اسم المريض / المؤمن
              </div>
              <div className="flex pt-3 text-[#348eca] text-sm arabic">
                التوقيع{" "}
                <input className="text-sm  py-1 border  px-1 text-[#348eca] arabic w-44 mr-2 placeholder:text-[#348eca]" />
              </div>
            </div>
            <div className="flex flex-col w-1/2  mb-12">
              <div className="flex border-2 border-[#dbdddd] ">
                <ul
                  style={{ direction: "ltr" }}
                  className="list-decimal gap-[14.5px] flex flex-col px-2 py-5 list-inside"
                >
                  <li className="text-sm arabic text-[#348eca]">
                    l agree to allow the hospital to submit all original
                    documents pertaining to hospitalization to the ALNAMAA after
                    the discharge; I agree to sign on the final bill & the
                    discharge summary
                  </li>{" "}
                  <li className="text-sm arabic text-[#348eca]">
                    All non-medical expenses & expenses not relevant to current
                    hospitalization & above the limit of the table of benefits
                    of the policy will be paid by me
                  </li>{" "}
                  <li className="text-sm arabic text-[#348eca]">
                    Thereby declare to abide by the terms & condition of the
                    policy & if at any time the facts disclosed by me are found
                    to be false or incorrect | forfeit my claim & agree to
                    indemnify ALNAMAA
                  </li>{" "}
                  <li className="text-sm arabic text-[#348eca]">
                    I agree & understand that ALNAMAA is in no way warranting
                    the service of the hospital & that ALNAMAA is in no way
                    guaranteeing that the services provided by the hospital will
                    be of a particular quality or standard.
                  </li>
                </ul>
              </div>
              <div
                style={{ direction: "ltr" }}
                className="flex text-[#348eca] text-sm mt-3 arabic"
              >
                Insured/Patient Name.{" "}
              </div>
              <div
                style={{ direction: "ltr" }}
                className="flex pt-3 items-center  text-[#348eca] text-sm arabic"
              >
                Signature{" "}
                <input className="text-sm ml-2 py-1 border  px-1 text-[#348eca] arabic w-44  placeholder:text-[#348eca]" />
              </div>
            </div>
          </div>
          <div className="w-full py-1 h-[40px] gap-4 px-2  flex  text-[#348eca] bg-[#afb2b4] arabic text-sm justify-between items-center">
            <div>مستندات المطلوبة.</div>
            <div>Required Documents</div>
          </div>
          <div className="flex w-full  gap-6  mt-2">
            <div className="flex flex-col w-1/2 ">
              <div className="flex border-2 border-[#dbdddd] ">
                <ul className="list-decimal gap-5 flex flex-col px-2 py-5 list-inside">
                  <li className="text-sm arabic text-[#348eca]">
                    صورة من بطاقة تأمين المريض.
                  </li>{" "}
                  <li className="text-sm arabic text-[#348eca]">
                    إثبات هوية بالصورة الشخصية (مستند ضروري ){" "}
                  </li>{" "}
                  <li className="text-sm arabic text-[#348eca]">
                    تاريخ طبي كامل مع تقرير بنتائج التحاليل الطبية
                  </li>{" "}
                  <li className="text-sm arabic text-[#348eca]">
                    كل المستندات المذكورة أعلاه يجب أن ترفق مع نموذج طلب
                    الموافقة
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col w-1/2 ">
              <div className="flex border-2 border-[#dbdddd] ">
                <ul
                  style={{ direction: "ltr" }}
                  className="list-decimal gap-[14.5px] flex flex-col px-2 py-5 list-inside"
                >
                  <li className="text-sm arabic text-[#348eca]">
                    Copy of patient insurance card.
                  </li>{" "}
                  <li className="text-sm arabic text-[#348eca]">
                    Photo ID proof (Mandatory document).
                  </li>{" "}
                  <li className="text-sm arabic text-[#348eca]">
                    Complete medical history with medical investigation report.
                  </li>{" "}
                  <li className="text-sm arabic text-[#348eca]">
                    All documents mentioned above submitted along with the
                    Completed pre-authorization form
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* page 3 */}
        <div className=" relative flex flex-col h-[900px]  py-10  border-4 border-[#348eca]">
          <div className="px-4">
            {" "}
            <div className="w-full py-1 h-[40px] gap-4 px-2  flex  text-[#348eca] bg-[#afb2b4] arabic text-xs justify-between items-center">
              <div>تصريح المستشفى</div>
              <div>Hospital Declaration</div>
            </div>
            <div className="flex w-full  gap-6  mt-2">
              <div className="flex flex-col w-1/2 ">
                <div className="flex border-2 border-[#dbdddd] ">
                  <ul className="list-decimal gap-5 flex flex-col px-2 py-5 list-inside">
                    <li className="text-sm arabic text-[#348eca]">
                      ليس لدينا اعتراض بالسماح لشركة النماء الليبية للتأمين أو
                      أي شخص مخول من طرفها بالتأكد من صحة البيانات والمستدات
                      المتعلقة بحالة الإيواء
                    </li>{" "}
                    <li className="text-sm arabic text-[#348eca]">
                      كل المصاريف الغير طبية والغير متعلقة بالإيواء الحالي
                      والمصاريف الغير مشمولة في رسالة الموافقة الصادرة من شركة
                      النعاء الليبية للتأمين أو التكاليف المترتبة على معلومات
                      خاطئة في نموذج طلب الموافقة سيتم تحصيتها من قبل العريض{" "}
                    </li>{" "}
                    <li className="text-sm arabic text-[#348eca]">
                      توافق على أن شركة النقاء الليبية للتأمين ليست مطالبة بدفع
                      أي تكاليف في حالة وجود تعارض بين البيانات الواردة في
                      النموذج <br></br>وبين ورقة الخروج والمستندات المتعلقة
                      بحالة الإيواء.
                    </li>{" "}
                    <li className="text-sm arabic text-[#348eca]">
                      ة - التصريح من قبل المريض قد تم توقيعه من قبل المريض
                      شخصياً أو من يمثله وذلك في حضورنا{" "}
                    </li>
                    <li className="text-sm arabic text-[#348eca]">
                      - تقر بأننا ستعلن عن كافة التوضيحات والتكاليف الالصافية
                      المتعلقة بحالة الإيواء وستتحمل كافة المسؤولية عن التأخير{" "}
                    </li>
                  </ul>
                </div>
                <div className="flex text-[#348eca] justify-between text-sm mt-3 arabic">
                  <p> اسم الطبيب </p>
                  <p className="ml-10"> ختم المستشفى.</p>
                </div>
                <div className="flex pt-3 text-[#348eca] text-sm arabic">
                  التوقيع{" "}
                  <input className="text-xs  py-1 border  px-1 text-[#348eca] arabic w-44 mr-2 placeholder:text-[#348eca]" />
                </div>
              </div>
              <div className="flex flex-col w-1/2  mb-12">
                <div className="flex border-2 border-[#dbdddd] ">
                  <ul
                    style={{ direction: "ltr" }}
                    className="list-decimal gap-[14.5px] flex flex-col px-2 py-5 list-inside"
                  >
                    <li className="text-sm arabic text-[#348eca]">
                      We have no objection to any authorized ALNAMAA verifying
                      documents pertaining to hospitalization of the patient's
                    </li>{" "}
                    <li className="text-sm arabic text-[#348eca]">
                      All non-medical expenses or expenses not relevant to
                      hospitalization or illness, or expenses disallowed in the
                      authorization letter of ALNAMAA, or arising out of
                      incorrect information in the pre-authorization form will
                      be collected from the patient
                    </li>{" "}
                    <li className="text-sm arabic text-[#348eca]">
                      We agree that ALNAMAA will not be liable to make the
                      payment in the event of any discrepancy between the facts
                      in this form & discharge summary or other documents.
                    </li>{" "}
                    <li className="text-sm arabic text-[#348eca]">
                      The patient declaration has been signed by the patient or
                      his representative in our presence.
                    </li>
                    <li className="text-sm arabic mb-5 text-[#348eca]">
                      We agree to provide clarifications for the queries raised
                      regarding this hospitalization & we take the sole
                      responsibly for any delay in offering clarification.
                    </li>
                  </ul>
                </div>
                <div
                  style={{ direction: "ltr" }}
                  className="flex text-[#348eca] justify-between text-sm mt-3 arabic"
                >
                  <p> Doctor's Name </p>
                  <p className="mr-10"> Stamp</p>
                </div>
                <div
                  style={{ direction: "ltr" }}
                  className="flex pt-3 items-center  text-[#348eca] text-sm arabic"
                >
                  Signature{" "}
                  <input className="text-xs ml-2 py-1 border  px-1 text-[#348eca] arabic w-44  placeholder:text-[#348eca]" />
                </div>
              </div>
            </div>
          </div>
          <div className="z-50   absolute bottom-4 w-full m-auto align-middle justify-center h-[40px]   flex     ">
            <div className="z-50  bg-[#afb2b4] w-[97%] "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintComponentPages;
