"use client"
import Modal from "react-responsive-modal";
import PrintComponentPages from "./PrintForm2";
import { useState } from "react";
import { Button } from "antd";
import PrintComponent from "./PrintForm";

function PrintParentComponent({ setPrintClaim, data, session }) {
    const [formOne, setFormOne] = useState(false)
    const [formTwo, setFormTwo] = useState(false)
    return (
        <>
            <Button
                onClick={() => setFormOne(true)}
                type="primary"
                htmlType="submit"
                className="bg-[#11349326] w-[160px] border-none ml-2.5 text-black h-[48px] font-inter font-semibold text-base"
            >
                Open Form 1
            </Button>
            <Button
                onClick={() => setFormTwo(true)}
                type="primary"
                htmlType="submit"
                className="bg-[#11349326] w-[160px] border-none ml-2.5 text-black h-[48px] font-inter font-semibold text-base"
            >
                Open Form 2
            </Button>
            <Button
                onClick={() => setPrintClaim(false)}
                type="primary"
                htmlType="submit"
                className="bg-[#11349326] w-[160px] border-none ml-2.5 text-black h-[48px] font-inter font-semibold text-base"
            >
                Cancel
            </Button>
            <Modal
                open={formOne}
                center
                closeOnOverlayClick={false}
                onClose={() => setFormOne(false)}
            >
                <PrintComponentPages session={session} setFormOne={setFormOne} data={data} />
            </Modal>
            <Modal
                open={formTwo}
                center
                closeOnOverlayClick={false}
                onClose={() => setFormTwo(false)}
            >
                <PrintComponent setFormTwo={setFormTwo} data={data} />
            </Modal>
        </>
    )
}
export default PrintParentComponent;