import CreateOrder from "../../../components/CreateOrder/CreateOrder"

const EditOrder = ({ id }) => {
   
   return (
      <CreateOrder editMode={true} orderId={id} />
   )
}
export default EditOrder