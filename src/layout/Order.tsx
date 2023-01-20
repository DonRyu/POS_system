import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useIntl} from "react-intl";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import OptionModal from "../components/order/OptionModal";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import {ClickAwayListener} from "@mui/material";

//24개
const dummy = [
  {productId: '1sdfqe', menu: '떡볶이', price: 35, option: true},
  {productId: '2dfwear', menu: '짜장', price: 35, option: false},
  {productId: '2dfwear2', menu: '치킨', price: 35, option: false},
  {productId: '2df3wear2', menu: '라면', price: 35, option: false}

]

interface selectedItem {
  group_index: number
  item_index: number
}


const Order: React.FC = () => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<selectedItem | null>(null) // 유저가 선택한 아이탬
  const [orders, setOrders] = useState([]) // [ [그룹1이 주문함], [그룹2가 주문함]] 으로 되어 있다


  const removeRow = () => {

    let {group_index, item_index} = selectedItem

    if (orders[group_index].length === 1) {
      orders.splice(group_index, 1)
    } else {
      orders[group_index].splice(item_index, 1)
    }

    setOrders([...orders])


  }


  return (
    <div className='viewHeightNoBtn w-full grid grid-cols-2'>
      <OptionModal open={open} setOpen={setOpen} orders={orders} selectedItem={selectedItem}
                   setOrders={setOrders}/>
      <div className={'h-full '}>
        {/*주문 테이블*/}
        <div className={'h-2/3'}>
          <div className={'flex flex-row justify-between'} style={{height: '5%'}}>
            <div>
              홀01
            </div>
            <div>
              사람수:3명
              17:01
            </div>
          </div>

          <TableContainer component={Paper} style={{height: '80%', maxHeight: 398}}>
            <Table>
              <TableHead>
                <TableRow sx={{color: 'white'}}>
                  <TableCell align="center">No</TableCell>
                  <TableCell align="center">{intl.formatMessage({id: 'menu'})}</TableCell>
                  <TableCell align="center">{intl.formatMessage({id: 'quantity'})}</TableCell>
                  <TableCell align="center">{intl.formatMessage({id: 'discount'})}</TableCell>
                  <TableCell align="center">{intl.formatMessage({id: 'price'})}</TableCell>
                  <TableCell align="center">{intl.formatMessage({id: 'remark'})}</TableCell>
                </TableRow>
              </TableHead>
              <ClickAwayListener onClickAway={() => !open && setSelectedItem(null)}>
                <TableBody>
                  {orders?.map((group: any, group_index: number) => {
                    return group.map((item: any, item_index: number) => {
                      return (

                        <TableRow key={`${group_index}-${item_index}`}
                                  onClick={() => setSelectedItem({group_index, item_index})}
                                  selected={`${group_index}-${item_index}` === `${selectedItem?.group_index}-${selectedItem?.item_index}`}
                        >
                          {/*보여지는건 1부터 시작합니다 그러나 내부적으로 group,item 인덱스는 0부터 시작합니다*/}
                          <TableCell align="center">{`${group_index + 1}-${item_index + 1}`}</TableCell>
                          <TableCell align="center">{item.menu}</TableCell>
                          <TableCell align="center">{item.quantity}</TableCell>
                          <TableCell align="center">{item.discount}</TableCell>
                          <TableCell align="center">{item.price}</TableCell>
                          <TableCell align="center">{item.remark}</TableCell>
                        </TableRow>
                      )
                    })
                  })}
                </TableBody>
              </ClickAwayListener>
            </Table>
          </TableContainer>


          <div style={{height: '15%'}} className={'w-full grid grid-cols-2'}>
            <div className={' grid grid-cols-3 gap-2'}>
              <button onClick={() => {
                setOrders([])
                setSelectedItem(null)
              }}>
                {intl.formatMessage({id: 'cancel_all'})}
              </button>
              <button onClick={removeRow}>{intl.formatMessage({id: 'cancel'})}</button>
              <button>{intl.formatMessage({id: 'comment'})}</button>
            </div>
            <div className={'grid grid-cols-4 gap-2'}>
              <button><AddIcon/></button>
              <button><RemoveIcon/></button>
              <button
                // onClick={(event) =>
                //   selectedTableChangePagination(event, page + 1)}
              >
                <ArrowDropUpIcon/>
              </button>
              <button
                // onClick={(event) =>
                // selectedTableChangePagination(event, page - 1)}
              >
                <ArrowDropDownIcon/>
              </button>
            </div>

          </div>
        </div>
        {/*계산 부분*/}
        <div className={'h-1/3 bg-red-800'}>
          a
        </div>
      </div>

      <div className={'h-full bg-red-100'}>
        <div style={{height: '80%'}} className={'border-2'}>

          <div style={{height: '30%'}} className={'relative w-full grid grid-cols-5 grid-rows-2 gap-2 border-2 p-2'}>
            {categories()}
          </div>

          <div style={{height: '70%'}} className={'relative w-full grid grid-cols-5 grid-rows-5 gap-2 border-2 p-2'}>
            <Items setOpen={setOpen} orders={orders} selectedItem={selectedItem}
                   setOrders={setOrders}/>
          </div>

        </div>

        <div className={'bg-emerald-300'} style={{height: '20%'}}>
          <Link to={'/dashboard'}>
            <button>주문완료</button>
          </Link>
        </div>
      </div>
    </div>
  );
};


const Items = ({setOpen, selectedItem, orders, setOrders}: any) => {

  const itemSelect = (item: any) => {

    if (item.option) {
      setOpen(true)

    } else {
      if (selectedItem) {

        orders[selectedItem?.group_index]?.push(item)
        setOrders([...orders])

      } else {

        setOrders([...orders, [item]])
      }

    }
  }


  return (
    <>
      {dummy.map((item, index) => {
        return (
          <button key={index} className={'bg-white border-1'} onClick={() => itemSelect(item)}>
            {item.menu}
          </button>
        )
      })}
      <div className={'absolute bottom-2 right-2 bg-white border-1 grid grid-cols-2'}
           style={{width: 91, height: 73.64}}>
        <button className={'border'}><ArrowBackIosIcon/></button>
        <button className={'border'}><ArrowForwardIosIcon/></button>
      </div>
    </>
  )
}


const categories = () => {

  return (
    <>
      {
        Array(2).fill(1).map((_, index) => {
          return (
            <button className={'bg-white border-1'}>
              식사
            </button>
          )
        })
      }
      <div className={'absolute bottom-2 right-2 bg-white border-1 grid grid-cols-2'}
           style={{width: 91, height: 73.64}}>
        <button className={'border'}><ArrowBackIosIcon/></button>
        <button className={'border'}><ArrowForwardIosIcon/></button>
      </div>
    </>
  )
}


export default Order;
