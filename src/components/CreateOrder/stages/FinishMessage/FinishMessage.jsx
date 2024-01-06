import { useSelector } from "react-redux";

const FinishMessage = () => {
  const stage = useSelector((state) => state.form.currentStage);
  console.log(stage);
  const isHide = stage != 6
  
   return (
      isHide ? null : <div>Форма отправлена!</div>
   )
}
export default FinishMessage