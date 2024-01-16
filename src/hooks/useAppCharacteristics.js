import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useAppCharacteristics = () => {
  const { technology, other, requirements } = useSelector(
    (state) => state.viewTz
  );

  const [firstCharact, setFirstCharact] = useState([]);
  const [secondCharact, setSecondCharact] = useState([]);
  const [thirdCharact, setThirdCharact] = useState([]);
  const [fourthCharact, setFourthCharact] = useState([]);

  useEffect(() => {
    if (!technology) return;

    setFirstCharact([
      {
        parameter: "Заказчик предоставляет образец",
        value: technology.providing_a_sample || undefined,
      },
      {
        parameter: "Требуется пошив образца",
        value: technology.sewing_a_sample || undefined,
      },
      {
        parameter: "Образец из материалов заказчика",
        value: technology.sewing_a_sample || undefined,
      },
      {
        parameter: "Заказчик оплачивает пошив образца",
        value: technology.payment_for_ss || undefined,
      },
      {
        parameter: "Конструкторская документация",
        value: technology.pattern_doc || undefined,
        type: "link",
      },
      {
        parameter: "Технологическая документация",
        value: technology.technological_doc || undefined,
      },
      {
        parameter: "Дополнительные услуги",
        value: technology.additional_services || undefined,
      },
      {
        parameter: "Нанесение лого / принта",
        value: technology.type_of_application || undefined,
      },
    ]);

    setSecondCharact([
      {
        parameter: "Вид ткани",
        value: technology.material_type || undefined,
      },
      {
        parameter: "Состав ткани",
        value: technology.material_structure || undefined,
      },
      {
        parameter: "Плотность ткани",
        value: technology.fabric_density || undefined,
      },
      {
        parameter: "Комментарий по сырью",
        value: technology.raw_materials || undefined,
      },
    ]);

    setThirdCharact([
      {
        parameter: "Взять в производство не позднее",
        value: other.start_date ? new Date(other.start_date).toLocaleDateString() : undefined,
      },
      {
        parameter: "Срок поставки не позднее",
        value: undefined,
      },
      {
        parameter: "Срок исполнения заказа с момента поставки сырья",
        value: other.order_lead_time || undefined,
      },
      {
        parameter: "Возможность взять заказ частично от (штук)",
        value: other.minimum_quantity || undefined,
      },
      {
        parameter: "Доступ на производство для ОТК заказчика",
        value: other.special_account || undefined,
      },
      {
        parameter: "Цена с НДС/Без НДС",
        value: other.price_nds,
      },
    ]);

    setFourthCharact([
      {
        parameter: "Условия оплаты",
        value: requirements.payment_conditions || undefined,
      },
      {
        parameter: "Условия приемки",
        value: requirements.acceptance_conditions || undefined,
      },
      {
        parameter: "Условия доставки",
        value: requirements.delivery_conditions || undefined,
      },
      {
        parameter: "Требования к упаковке",
        value: requirements.packaging_requirements || undefined,
      },
      {
        parameter: "Требования к маркировке",
        value: requirements.labeling_requirements || undefined,
      },
      {
        parameter: "Требования к персоналу",
        value: requirements.personnel__requirement || undefined,
      },
      {
        parameter: "Требования к оборудованию",
        value: requirements.equipment_requirements || undefined,
      },
    ]);
  }, [technology, other, requirements]);

  return {
    firstCharact,
    secondCharact,
    thirdCharact,
    fourthCharact,
  };
};
