import React, {useState} from "react";
import Button from '@mui/material/Button';
import {useIntl} from "react-intl";
import {Link} from "react-router-dom";
import TablePaginationButtons from "../TablePaginationButtons";


const dummy = [
  {tableNum: 0, time: '17:03', order: ['떡볶이 M', '순대', '볶음밥', '양념치킨'], cost: '34'},
  {tableNum: 0, time: '17:03', order: ['떡볶이 M', '순대', '볶음밥', '양념치킨'], cost: '34'},
  {tableNum: 0, time: '17:03', order: ['떡볶이 M', '순대', '볶음밥', '양념치킨'], cost: '34'},
  {tableNum: 0, time: '17:03', order: ['떡볶이 M', '순대', '볶음밥', '양념치킨'], cost: '34'},
  {tableNum: 0, time: '17:03', order: ['떡볶이 M', '순대', '볶음밥', '양념치킨'], cost: '34'},
  {tableNum: 0, time: '17:03', order: ['떡볶이 M', '순대', '볶음밥', '양념치킨'], cost: '34'},
  {tableNum: 4, time: '17:03', order: ['떡볶이 M', '순대', '볶음밥', '양념치킨'], cost: '34'},
  {tableNum: 3, time: '17:03', order: ['떡볶이 M', '순대', '볶음밥', '양념치킨'], cost: '34'},
  {tableNum: 2, time: '17:03', order: ['떡볶이 M', '순대', '볶음밥', '양념치킨'], cost: '34'},
  {tableNum: 1, time: '17:03', order: ['떡볶이 M', '순대', '볶음밥', '양념치킨'], cost: '34'},
  {tableNum: 3, time: '17:03', order: ['떡볶이 M', '순대', '볶음밥', '양념치킨'], cost: '34'},
  {tableNum: 2, time: '17:03', order: ['떡볶이 M', '순대', '볶음밥', '양념치킨'], cost: '34'},
  {tableNum: 1, time: '17:03', order: ['떡볶이 M', '순대', '볶음밥', '양념치킨'], cost: '34'}
]


const CurrentCustomeTable: React.FC = () => {

  let col = 5 // 5개 고정
  let row = 2

  const intl = useIntl();
  const [test, setTest] = useState(0)
  const [page, setPage] = useState(0)
  const [tablePerPage] = useState(col * row) // 한페이지 보여줄 테이블의 갯수, row*col


  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };


  const dineInTable = () => {

    return dummy.slice(page * tablePerPage, page * tablePerPage + tablePerPage).map((table, index) => (
        <Link to={'/order'} key={index}>
          <div className={'border-2 h-full w-full rounded flex flex-col justify-between'}>
            <div className={'flex flex-row justify-between'}>
              <div>
                {table.tableNum}
              </div>
              <div>
                {table.time}
              </div>
            </div>

            <div>
              <div> 떡볶이:M,사리추가</div>
              <div> 순대</div>
              <div> 볶음밥: L</div>
              <div> 양념치킨: M</div>
            </div>

            <div className={'flex flex-row-reverse'}>
              43$
            </div>
          </div>
        </Link>
      )
    )
  }

  const ShowTableStatus = ({children, col, row, style}: any) => {
    return (
      <div className={`h-full w-full grid grid-cols-${col} grid-rows-${row}`}
           style={style}>
        {children}
      </div>
    )
  }


  const
    SwitchViewOtpion = () => {


      switch (test) {
        case 0:
          return (
            <ShowTableStatus col={col} row={row}>
              {dineInTable()}
            </ShowTableStatus>
          );
        case 1:
          return (
            <div className={'flex flex-row h-full w-full'}>
              <ShowTableStatus col={col} row={row} style={{width: '60%'}}>
                {dineInTable()}
              </ShowTableStatus>
              <div className={'border-2'} style={{width: '40%'}}>
                배달
              </div>
            </div>
          )
        case 2:
          return (
            <div className={'flex flex-row h-full w-full'}>
              <ShowTableStatus col={col} row={row} style={{width: '60%'}}>
                {dineInTable()}
              </ShowTableStatus>
              <div className={'h-full border-2 grid grid-rows-2'} style={{width: '40%'}}>
                <div className={'border text-center'}>배달</div>
                <div className={'border text-center'}>테이블주문</div>
              </div>
            </div>
          )
        default:
          return
      }

    }

  return (
    <div style={{height: '92.9999%'}}>
      <div style={{height: '90%'}}>
        {SwitchViewOtpion()}
      </div>
      <div className={'flex flex-row w-full items-center'}>
        <div className={'w-2/5 flex flex-row justify-around'}>
          <TablePaginationButtons onPageChange={handleChangePage} page={page} tablePerPage={tablePerPage}
                                  totalTable={dummy.length}/>
        </div>
        <div className={'py-2 w-3/5 grid grid-cols-4 gap-2'} style={{height: '10%'}}>
          <Button variant="outlined">Text</Button>
          <Button variant="outlined" onClick={() => setTest(0)}>Text</Button>
          <Button variant="outlined" onClick={() => setTest(1)}>Text</Button>
          <Button variant="outlined" onClick={() => setTest(2)}>Text</Button>
        </div>
      </div>

    </div>
  );
};

export default CurrentCustomeTable;
