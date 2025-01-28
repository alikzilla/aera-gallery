import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { PerfumeProps } from "../../types/perfume";
import axios from "axios";

interface OrderModalProps {
  perfumes: PerfumeProps[];
  isOpen: boolean;
  total_price: number;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({
  perfumes,
  isOpen,
  total_price,
  onClose,
}) => {
  const { t } = useTranslation();

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientAddress, setClientAddress] = useState("");

  const handleConfirm = async () => {
    if (!clientName || !clientEmail || !clientPhone || !clientAddress) {
      alert(t("Please fill in all the required fields."));
      return;
    }

    try {
      const order = await axios.post(
        "https://aera-admin.vercel.app/api/orders",
        {
          client_name: clientName,
          client_email: clientEmail,
          client_phone: clientPhone,
          client_address: clientAddress,
          total_price: total_price,
          perfumes: perfumes,
        }
      );
      console.log(order);
    } catch (error) {
      console.log(error);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-[50] top-0 bottom-0 left-0 right-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">{t("Order Summary")}</h2>

        <div className="mb-4">
          {perfumes.map((perfume) => (
            <div
              key={perfume.id}
              className="flex justify-between items-center mb-2"
            >
              <span>
                {t("Perfume")} #{perfume.id} ({t("Type")}: {perfume.type})
              </span>
              <span>${perfume.cost.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center font-bold border-t pt-2 mb-4">
          <span>{t("Total")}:</span>
          <span>${total_price.toFixed(2)}</span>
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="w-full border rounded-lg p-2 mb-2"
            placeholder={t("Your Name")}
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
          <input
            type="email"
            className="w-full border rounded-lg p-2 mb-2"
            placeholder={t("Your Email")}
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
          <input
            type="tel"
            className="w-full border rounded-lg p-2 mb-2"
            placeholder={t("Your Phone")}
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
          />
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            placeholder={t("Your Address")}
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2"
            onClick={onClose}
          >
            {t("Cancel")}
          </button>
          <button
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
            onClick={handleConfirm}
          >
            {t("Confirm Order")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
