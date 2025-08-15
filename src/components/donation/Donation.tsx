import { useState } from "react";
import { Modal, Steps, Flex, theme } from "antd";
import Styles from "../../styles/donation.module.css";
import { donationlogo } from "../../assets/data";
import DonationForm from "./DonationForm";
import Transaction from "./Transaction";

type Props = {
  open: boolean;
  close: (data: boolean) => void;
};

const Donation: React.FC<Props> = ({ open, close }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const donationHandler = (data: object) => {
    if (data !== null) {
      setCurrent(current + 1);
    }
  };
  const prevBtnHandler = (data: boolean) => {
    if (data) {
      setCurrent(current - 1);
    }
  };

  const steps = [
    {
      title: "Step1",
      content: (
        <div className={Styles.container}>
          <div className={Styles.left_container}>
            <img
              src={donationlogo}
              className={Styles.donation_svg}
              width={100}
              height={100}
            />
            <h2>Save Nature and Life</h2>
            <p>
              Join our mission to document and address climate change through
              various participation options
            </p>
          </div>
          <div className={Styles.right_container}>
            <DonationForm formData={donationHandler} />
          </div>
        </div>
      ),
    },
    {
      title: "Step2",
      content: (
        <div>
          <Transaction prevBtn={prevBtnHandler} />
        </div>
      ),
    },
    // {
    //   title: "Step3",
    //   content: <div>This is 3rd content</div>,
    // },
  ];

  const handleCancel = () => {
    setIsModalOpen(false);
    close(isModalOpen);
  };

  // const prev = () => {
  //   setCurrent(current - 1);
  // };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const contentStyle: React.CSSProperties = {
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  // const btnStyle: React.CSSProperties = {
  //   backgroundColor: "#15803D",
  //   border: "none",
  //   color: "white"
  // }

  return (
    <Flex vertical gap="middle" align="flex-start">
      <Modal
        open={open}
        onCancel={handleCancel}
        footer={null}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <Steps current={current} items={items} style={{ marginTop: 20 }} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {/* {current < steps.length - 1 && (
            <Button style={btnStyle} onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button style={btnStyle} onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px', border: "1px solid #15803D", color: "black" }} onClick={() => prev()}>
              Previous
            </Button>
          )} */}
        </div>
      </Modal>
    </Flex>
  );
};

export default Donation;
