import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "..";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 h-screen flex items-center justify-center bg-black bg-opacity-50 z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">{t("order.congratulations")}</h2>
        <Button className="w-full bg-yellow-600 text-white" onClick={onClose}>
          {t("order.close")}
        </Button>
      </div>
    </div>
  );
};

export default SuccessModal;
