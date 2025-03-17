import React from "react"
import QRCode from "react-qr-code"

interface QrCodeGeneratorProps{
    payload:string
}


const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({payload}) =>{

    const qrPayloads = payload.split("|_|")

    return( 
            qrPayloads.map((payload,index) =>
                <div className='qr-container'key={"qr-container:" + index} >
                    <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={payload}
                    viewBox={`0 0 256 256`}
                    className=''
                    />
                </div> 
            )
            )
}

export default QrCodeGenerator
