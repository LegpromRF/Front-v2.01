import EditOrder from '@screens/Profile/EditOrder/EditOrder'
import { useParams } from 'react-router-dom';

export default function EditOrderPage() {
  const params = useParams();
  
  return (
    <EditOrder id={params.id} />
  )
}