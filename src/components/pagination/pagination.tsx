import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "..";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="pagination flex justify-center items-center gap-4 mt-6">
      <Button
        className="w-[50px] rounded-full"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon className="h-full w-full" />
      </Button>
      <span>
        {t("catalog.page")} {currentPage} {t("catalog.of")} {totalPages}
      </span>
      <Button
        className="w-[50px] rounded-full"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ArrowRightIcon className="h-full w-full" />
      </Button>
    </div>
  );
};

export default Pagination;
