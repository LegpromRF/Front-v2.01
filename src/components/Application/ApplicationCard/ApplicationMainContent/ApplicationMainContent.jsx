import { useSelector } from "react-redux";
import ApplicationContacts from "../ApplicationContacts/ApplicationContacts";
import ApplicationStats from "../ApplicationStats/ApplicationStats";
import MainCharacteristics from "../MainCharacteristics/MainCharacteristics";
import UnavailableСontacts from "../UnavailableСontacts/UnavailableСontacts";

const ApplicationMainContent = () => {
  const { customerError } = useSelector((state) => state.viewTz);

  return (
    <div>
      <ApplicationStats />

      <MainCharacteristics />

      {customerError ? (
        <UnavailableСontacts style={{ marginTop: "22px" }} />
      ) : (
        <ApplicationContacts style={{ marginTop: "22px" }} />
      )}
    </div>
  );
};

export default ApplicationMainContent;
