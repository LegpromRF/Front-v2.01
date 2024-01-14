import { useDispatch, useSelector } from "react-redux";
import SelectItem from "../../FormItems/SelectItem";
import { updateFormData } from "@store/orders/form.slice";
import { useEffect } from "react";
import { getFormField } from "../../../../store/orders/form.slice";

import styles from "../../CreateOrder.module.scss";

const StatusItem = ({ control, formOptions }) => {
  const dispatch = useDispatch();
  const { isEditMode } = useSelector((state) => state.form);
  const { isAdmin } = useSelector((state) => state.admindata);

  const statusDefaultValue = formOptions.length
    ? Object.entries(
        formOptions.find((formOption) => formOption.propName == "status")
          .options
      ).find(([name, value]) => name == "Черновик")[1]
    : null;

  useEffect(() => {
    if (statusDefaultValue  && !isEditMode && !isAdmin) {
      dispatch(updateFormData({ status: statusDefaultValue }));
    }
  }, [statusDefaultValue, isEditMode, isAdmin]);

  if (!isAdmin && !isEditMode) return ''
  
  return (
    <SelectItem
      control={control}
      formOptions={formOptions ?? []}
      title="Статус"
      propName="status"
      extraClassName="-status"
      disabled={!isAdmin}
      isNotClearable={true}
      required
    />
  );
};
export default StatusItem;
