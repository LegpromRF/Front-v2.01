import ApplicationCard from "../../components/Application/ApplicationCard/ApplicationCard";
import ApplicationItemHeader from "../../components/Application/ApplicationItemHeader/ApplicationItemHeader";
import HeaderApplication from "../../layout/HeaderApplication/HeaderApplication";

const Application = () => {
  return (
    <div className="page application application__container">
      <HeaderApplication />

      <ApplicationItemHeader />

      <ApplicationCard />
    </div>
  );
};

export default Application;
