import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PerfumeProps } from "../../types/perfume";
import axios from "axios";
import { Button } from "..";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { InputMask } from "@react-input/mask";
import { useFavoritesStore } from "../../hooks/use-favorites-store";
import { Player } from "@lordicon/react";

const ICON = require("../../assets/system-regular-716-spinner-three-dots-hover-trapdoor.json");

interface OrderModalProps {
  perfumes: PerfumeProps[];
  isOpen: boolean;
  total_price: number;
  onClose: () => void;
  onSuccessOpen: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({
  perfumes,
  isOpen,
  total_price,
  onClose,
  onSuccessOpen,
}) => {
  const { t } = useTranslation();

  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientAddress, setClientAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { clearFavorites } = useFavoritesStore();
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  const handleConfirm = async () => {
    if (!clientName || !clientEmail || !clientPhone || !clientAddress) {
      alert(t("order.please_fill_all_fields"));
      return;
    }
    setLoading(true);
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
      onClose();
      clearFavorites();
      onSuccessOpen();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 h-screen bg-black bg-opacity-50 z-[50] overflow-hidden flex justify-center items-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-lg md:max-w-xl lg:max-w-2xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl text-left font-bold mb-4">
          {t("order.order_window")}
        </h2>

        <div className="mb-4 max-h-60 overflow-y-auto">
          {perfumes.map((perfume, index) => (
            <div
              key={perfume.perfume_id}
              className="flex justify-between items-center mb-2"
            >
              <span className="text-left">
                {index + 1}) {perfume.perfume_name}
              </span>
              <span>{perfume.perfume_cost} KZT</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center font-bold border-t pt-2 mb-4">
          <span>{t("order.total")}:</span>
          <span>{total_price} KZT</span>
        </div>

        <div className="mb-4 space-y-2">
          <input
            type="text"
            className="w-full border rounded-lg p-2 outline-yellow-600"
            placeholder={t("order.client_name")}
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
          <input
            type="email"
            className="w-full border rounded-lg p-2 outline-yellow-600"
            placeholder={t("order.client_email")}
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
          <InputMask
            mask="+7 (___) ___-__-__"
            replacement={{ _: /\d/ }}
            className="w-full border rounded-lg p-2 outline-yellow-600"
            placeholder={t("order.client_phone")}
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
          />
          <input
            type="text"
            className="w-full border rounded-lg p-2 outline-yellow-600"
            placeholder={t("order.client_address")}
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
          />
          <span className="flex items-start justify-start text-left gap-1 mb-4">
            <div className="w-5 h-5 flex items-center justify-center pt-2">
              <ExclamationCircleIcon width={20} height={20} />
            </div>
            {t("order.attention")}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          <Button
            className="bg-gray-300 text-gray-700 hover:bg-red-700 w-full sm:w-auto"
            onClick={onClose}
            disabled={loading}
          >
            {t("order.cancel")}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={loading}
            className="relative flex items-center justify-center w-full sm:w-[150px]"
          >
            {loading ? (
              <Player
                ref={playerRef}
                icon={ICON}
                onComplete={() => playerRef.current?.playFromBeginning()}
              />
            ) : (
              t("order.submit")
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
