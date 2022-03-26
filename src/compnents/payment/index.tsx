import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { checkedCartState } from "../../recoils/cart";
import WillPay from "../willPay";
import { PaymentModal } from "./modal";

export const Payment = () => {
  const navigate = useNavigate();
  const [checkedCartData, setCheckedCartData] =
    useRecoilState(checkedCartState);
  const [modalShown, toggleModal] = useState(false);
  const showModal = () => {
    toggleModal(true);
  };

  const proceed = () => {
    setCheckedCartData([]);
    navigate("/products", { replace: true });
  };

  const cancel = () => {
    toggleModal(false);
  };
  return (
    <>
      <WillPay submitTitle="결제하기" handleSubmit={showModal} />
      <PaymentModal show={modalShown} proceed={proceed} cancel={cancel} />
    </>
  );
};
