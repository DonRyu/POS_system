import * as React from "react";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function TablePaginationButtons(props: any) {

  const {page, onPageChange, totalTable, tablePerPage} = props;
  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };
  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  return (
    <>
      <Button
        onClick={handleBackButtonClick}
        variant="contained"
        disabled={page === 0}
        className={'w-1/5 '}
      >
        <ArrowBackIosIcon/>
      </Button>
      <Button
        onClick={handleNextButtonClick}
        variant="contained"
        disabled={page >= Math.ceil(totalTable / tablePerPage) - 1}
        className={'w-1/5 '}
      >
        <ArrowForwardIosIcon/>
      </Button>
    </>
  );
}

export default TablePaginationButtons
