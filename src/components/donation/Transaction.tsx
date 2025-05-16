import React from 'react';
import { Button } from 'antd';
import Styles from '../../styles/transaction.module.css';
import QRCode from '../../assets/QR.pdf';

type Props = {
  prevBtn: (data: boolean) => void,
}

const Transaction: React.FC<Props> = ({prevBtn}) => {

  const prevBtnHandler = () => {
    prevBtn(true);
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.qrCode}>
      <object data={QRCode} type="application/pdf" width='100%' height='100%'></object>
      </div>
      <div className={Styles.border}></div>
      <div className={Styles.btn_container}>
      <Button className={Styles.btn}>UPI Payment</Button>
      <Button className={Styles.btn} onClick={prevBtnHandler}>Go Back</Button>
      </div>
    </div>
  );
};

export default Transaction;