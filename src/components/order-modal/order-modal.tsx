import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { PerfumeProps } from "../../types/perfume";
import axios from "axios";
import { Button } from "..";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

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
    <>
      {isOpen && (
        <div
          className="fixed inset-0 h-screen bg-black bg-opacity-50 z-[50] overflow-hidden flex justify-center items-center"
          onClick={onClose}
        >
          <div
            className="bg-white rounded-lg p-6 w-[500px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl text-left font-bold mb-4">
              {t("order.order_window")}
            </h2>

            <div className="mb-4">
              {perfumes.map((perfume, index) => (
                <div
                  key={perfume.id}
                  className="w-full flex justify-between items-center mb-2"
                >
                  <span className="text-left">
                    {index + 1}) {perfume.name}
                  </span>
                  <span>{perfume.cost} KZT</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center font-bold border-t pt-2 mb-4">
              <span>{t("order.total")}:</span>
              <span>{total_price} KZT</span>
            </div>

            <div className="mb-4">
              <input
                type="text"
                className="w-full border rounded-lg p-2 mb-2 outline-yellow-600"
                placeholder={t("order.client_name")}
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
              <input
                type="email"
                className="w-full border rounded-lg p-2 mb-2 outline-yellow-600"
                placeholder={t("order.client_email")}
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />
              <input
                type="tel"
                className="w-full border rounded-lg p-2 mb-2 outline-yellow-600"
                placeholder={t("order.client_phone")}
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
              />
              <input
                type="text"
                className="w-full border rounded-lg p-2 mb-1 outline-yellow-600"
                placeholder={t("order.client_address")}
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
              />
              <span className="flex items-center gap-1 mb-4">
                <ExclamationCircleIcon className="w-5 h-5" />
                {t("order.attention")}
              </span>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                className="bg-gray-300 text-gray-700 hover:bg-red-700"
                onClick={onClose}
              >
                {t("order.cancel")}
              </Button>
              <Button onClick={handleConfirm}>{t("order.submit")}</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderModal;
