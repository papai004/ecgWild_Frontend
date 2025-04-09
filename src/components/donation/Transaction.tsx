import React from 'react';
import { Button, QRCode } from 'antd';
import Styles from '../../styles/transaction.module.css';

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
        <QRCode value='#'/>
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