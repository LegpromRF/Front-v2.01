import EditOrder from '@screens/Profile/EditOrder/EditOrder'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function EditOrderPage() {
  const isAdmin = useSelector(store => store.admindata.isAdmin)
  const params = useParams();
  
  return (
    <EditOrder id={params.id} />
  )
}