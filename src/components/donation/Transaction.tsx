import React from "react";
import { Button } from "antd";
import Styles from "../../styles/transaction.module.css";
import { QRCode } from "../../assets/data";

type Props = {
  prevBtn: (data: boolean) => void;
};

const Transaction: React.FC<Props> = ({ prevBtn }) => {
  const prevBtnHandler = () => {
    prevBtn(true);
  };

  // const handleQRDownload = async () => {
  //   try {
  //     const response = await fetch(QRCode);
  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = 'ecg-qr-code.png';
  //     document.body.appendChild(link);
  //     link.click();

  //     document.body.removeChild(link);
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error('Download failed:', error);
  //     window.open(QRCode, '_blank');
  //   }
  // }

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent("Here's my QR code for payment");
    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}%20${encodeURIComponent(
      QRCode
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div>
      <p>
        Tap the QR code to download, open it in your UPI app, and pay as you wish.
      </p>
      <div className={Styles.container}>
        <img src={QRCode} className={Styles.qrCode} width="70%" />
        <div className={Styles.border}></div>
        <div className={Styles.btn_container}>
          {/* <Button className={Styles.btn} onClick={handleQRDownload}>
          Download QR
        </Button> */}
          <Button className={Styles.btn} onClick={handleWhatsAppShare}>
            Share on WhatsApp
          </Button>
          <Button className={Styles.btn} onClick={prevBtnHandler}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
