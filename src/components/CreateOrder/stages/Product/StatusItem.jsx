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

  const statusInitialValue = getFormField("status");

  useEffect(() => {
    if (statusInitialValue && !isEditMode && !isAdmin)
      dispatch(updateFormData({ status: statusInitialValue }));
  }, [isEditMode, statusInitialValue, isAdmin]);

  if (!isAdmin)
    return (
      <div className={styles.form__item}>
        <h3 className={styles.form__itemLabel}>
          <span>Статус</span>
        </h3>
        <div className={styles.form__textField}>
          <input type="text" disabled value={isEditMode ? statusInitialValue : "Черновик"} />
        </div>
      </div>
    );

  return (
    <SelectItem
      control={control}
      formOptions={formOptions ?? []}
      title="Статус"
      propName="status"
      extraClassName="-status"
      required
    />
  );
};
export default StatusItem;
