import Image from "next/image";

export default function Overview() {
    return (
        <>
            <div className="section relative">
                <div className="w-[4rem] h-[100%]">
                    <Image src="/profile-icon.svg" alt="profile" width={40} height={40}></Image>
                </div>
                <div className="info">
                    <h1 className="name text-5xl">John Doe, 47 M</h1>
                    <h1 className="text-[#AFAFAF] text-lg">123 Jane Street</h1>
                    <h1 className="text-[#AFAFAF] text-lg">Waterloo, Ontario</h1>
                </div>
                <Image src="/edit.svg" alt="edit" width={30} height={30} className="absolute right-7 top-7"></Image>
            </div>

            <div className="section relative">
                <div className="info">
                    <h1 className="name text-3xl">Medical History</h1>
                    <p className="text-[#AFAFAF] text-lg">
                    John Doe is a 47-year-old male with a medical history of heart complications. He has been diagnosed with coronary artery disease (CAD), characterized by the narrowing of coronary arteries leading to reduced blood flow to the heart muscle.</p>
                    <br></br>
                    <p className="text-[#AFAFAF] text-lg">
                    His medical history includes:</p>

                    <ul className="text-[#AFAFAF] text-lg">
                        <li>Hypertension: Managed with medication.</li>
                        <li>Hyperlipidemia: Elevated cholesterol levels, treated with statins.</li>
                        <li>Myocardial Infarction (Heart Attack): Experienced a myocardial infarction two years ago; received angioplasty and stent placement.</li>
                        <li>Angina: Occasional chest pain, managed with nitroglycerin and lifestyle modifications.</li>
                    </ul>
                    
                    <br></br>
                    <p className="text-[#AFAFAF] text-lg">
                        John has a history of smoking, but he quit five years ago. He maintains a balanced diet and engages in regular exercise as part of his heart disease management plan. Regular follow-up visits with a cardiologist are part of his ongoing care to monitor heart function and adjust treatment as needed.
                    </p>
                </div>
                <Image src="/edit.svg" alt="edit" width={30} height={30} className="absolute right-7 top-7"></Image>
            </div>

            <div className="section relative">
                <div className="info">
                    <h1 className="name text-3xl">Auto emergency calling</h1>
                    <ul className="text-[#AFAFAF] text-lg">
                        <li>Local emergency services (911)</li>
                        <li>Hospital:</li>
                        <li>Emergency contact:</li>
                    </ul>
                </div>
                <Image src="/edit.svg" alt="edit" width={30} height={30} className="absolute right-7 top-7"></Image>
            </div>
        </>
    );
}