import { MenuItem, Select } from '@mui/material'
import { useEffect, useState } from 'react'
import { orderStatusConverter, orderStatusTitles } from '../constants'
import { changeOrderStatus } from '@store/session/admindata.slice';
import { useDispatch } from 'react-redux';
import styles from '../Tables.module.scss'

const StatusChangableField = ({ className, initialValue, orderId }) => {
  const [value, setValue] = useState(initialValue)
  const dispatch = useDispatch()
  
  useEffect(() => setValue(initialValue), [initialValue])
  
  const handleChange = (event) => {
    const statusStr = event.target.value
    setValue(statusStr)
    const convertedStatus = orderStatusConverter[statusStr]
    if (convertedStatus) dispatch(changeOrderStatus({ id: orderId, status: convertedStatus }))
  }
  
   return (
      <li className={className}>
        <Select value={value} onChange={handleChange} className={styles[`table__MuiSelect-select`] + ' ' + styles[`table__MuiSelect-select_${value == 'Оплачен' ? 'succeeded' : 'pending'}`]}>
          <MenuItem value={orderStatusTitles.succeeded} className={styles['table__MuiSelect-menu-item']}>{orderStatusTitles.succeeded}</MenuItem>
          <MenuItem value={orderStatusTitles.pending} className={styles['table__MuiSelect-menu-item']}>{orderStatusTitles.pending}</MenuItem>
        </Select>
      </li>
   )
}
export default StatusChangableField